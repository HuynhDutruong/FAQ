import { NextResponse } from 'next/server';
import { getFacebookCredentials } from '@/lib/facebookHelper';

interface FBComment {
  id: string;
  message?: string;
  created_time: string;
  from?: { name?: string; id?: string };
  like_count?: number;
  comments?: { data?: FBComment[] };
}

const POST_FIELDS =
  'id,message,story,created_time,full_picture,permalink_url,attachments{media_type,media,subattachments},shares,reactions.summary(total_count).limit(0),comments.summary(total_count).limit(0)';

const COMMENT_FIELDS = 'id,message,created_time,from,like_count,comments{id,message,created_time,from}';

// Chi tiết một bài viết + bình luận, công khai cho người đọc trên web.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let pageToken: string;
  try {
    ({ pageToken } = await getFacebookCredentials());
  } catch {
    return NextResponse.json({ error: 'Chưa kết nối Fanpage.' }, { status: 503 });
  }

  const [postRes, commentRes] = await Promise.all([
    fetch(
      `https://graph.facebook.com/v20.0/${id}?fields=${encodeURIComponent(POST_FIELDS)}&access_token=${pageToken}`,
      { next: { revalidate: 300 } }
    ),
    fetch(
      `https://graph.facebook.com/v20.0/${id}/comments?fields=${encodeURIComponent(COMMENT_FIELDS)}&order=reverse_chronological&limit=50&access_token=${pageToken}`,
      { next: { revalidate: 120 } }
    )
  ]);

  const post = await postRes.json();
  if (post.error) {
    return NextResponse.json({ error: post.error.message }, { status: 404 });
  }

  const commentData = await commentRes.json();
  const rawComments: FBComment[] = commentData.error ? [] : commentData.data || [];

  // Ảnh trong album: Graph trả nhiều ảnh con qua subattachments
  const attachment = post.attachments?.data?.[0];
  const images: string[] = attachment?.subattachments?.data?.length
    ? attachment.subattachments.data
        .map((a: { media?: { image?: { src?: string } } }) => a.media?.image?.src)
        .filter(Boolean)
    : post.full_picture
      ? [post.full_picture]
      : [];

  return NextResponse.json({
    success: true,
    post: {
      id: post.id,
      message: post.message || post.story || '',
      created_time: post.created_time,
      images,
      permalink_url: post.permalink_url || `https://facebook.com/${post.id}`,
      likesCount: post.reactions?.summary?.total_count || 0,
      commentsCount: post.comments?.summary?.total_count || 0,
      sharesCount: post.shares?.count || 0
    },
    comments: rawComments.map(c => ({
      id: c.id,
      message: c.message || '',
      created_time: c.created_time,
      author: c.from?.name || 'Ẩn danh',
      likeCount: c.like_count || 0,
      replies: (c.comments?.data || []).map(r => ({
        id: r.id,
        message: r.message || '',
        created_time: r.created_time,
        author: r.from?.name || 'Ẩn danh'
      }))
    }))
  });
}
