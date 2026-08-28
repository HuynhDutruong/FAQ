import { NextResponse } from 'next/server';
import { extractPostMedia } from '@/lib/postIntel';

interface FBComment {
  id: string;
  message?: string;
  created_time: string;
  from?: { name?: string; id?: string };
  like_count?: number;
  comments?: { data?: FBComment[] };
}

export const dynamic = 'force-dynamic';

const POST_FIELDS =
  'id,message,story,created_time,full_picture,permalink_url,' +
  'attachments{media_type,title,url,unshimmed_url,target,media,subattachments},' +
  'shares,reactions.summary(total_count).limit(0),comments.summary(total_count).limit(0)';

const COMMENT_FIELDS = 'id,message,created_time,from,like_count,comments{id,message,created_time,from}';

// Chi tiết một bài viết + bình luận, công khai cho người đọc trên web.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    let pageToken = (process.env.FACEBOOK_PAGE_ACCESS_TOKEN || process.env.FACEBOOK_PAGE_TOKEN || process.env.FACEBOOK_ACCESS_TOKEN || '').trim();
    if (!pageToken) {
      try {
        const { getFacebookCredentials } = await import('@/lib/facebookHelper');
        const creds = await getFacebookCredentials();
        pageToken = creds.pageToken;
      } catch {
        return NextResponse.json({ error: 'Chưa kết nối Fanpage.' }, { status: 503 });
      }
    }

    const [postRes, commentRes] = await Promise.all([
      fetch(
        `https://graph.facebook.com/v20.0/${id}?fields=${encodeURIComponent(POST_FIELDS)}&access_token=${pageToken}`,
        { cache: 'no-store' }
      ),
      fetch(
        `https://graph.facebook.com/v20.0/${id}/comments?fields=${encodeURIComponent(COMMENT_FIELDS)}&order=reverse_chronological&limit=50&access_token=${pageToken}`,
        { cache: 'no-store' }
      )
    ]);

    if (!postRes.ok) {
      return NextResponse.json({ error: 'Không tìm thấy bài viết' }, { status: 404 });
    }

    const post = await postRes.json();
    if (post.error) {
      return NextResponse.json({ error: post.error.message }, { status: 404 });
    }

    let rawComments: FBComment[] = [];
    if (commentRes.ok) {
      try {
        const commentData = await commentRes.json();
        rawComments = commentData.error ? [] : commentData.data || [];
      } catch {
        rawComments = [];
      }
    }

    // Ảnh trong album: Graph trả nhiều ảnh con qua subattachments
    const attachment = post.attachments?.data?.[0];
    const images: string[] = attachment?.subattachments?.data?.length
      ? attachment.subattachments.data
          .map((a: { media?: { image?: { src?: string } } }) => a.media?.image?.src)
          .filter(Boolean)
      : post.full_picture
        ? [post.full_picture]
        : [];

    const message = post.message || post.story || '';
    const permalink = post.permalink_url || `https://facebook.com/${post.id}`;

    return NextResponse.json({
      success: true,
      post: {
        id: post.id,
        message,
        created_time: post.created_time,
        images,
        permalink_url: permalink,
        likesCount: post.reactions?.summary?.total_count || 0,
        commentsCount: post.comments?.summary?.total_count || 0,
        sharesCount: post.shares?.count || 0,
        ...extractPostMedia(message, permalink, post.attachments?.data || [])
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
  } catch (err: any) {
    console.error('Error fetching single Facebook post:', err);
    return NextResponse.json({ error: err?.message || 'Lỗi tải bài viết' }, { status: 500 });
  }
}
