import { NextResponse } from 'next/server';
import { getFacebookCredentials } from '@/lib/facebookHelper';
import { withAdmin } from '@/lib/serverAuth';

interface FBPostRaw {
  id: string;
  message?: string;
  story?: string;
  created_time: string;
  full_picture?: string;
  permalink_url?: string;
  shares?: { count?: number };
  reactions?: { summary?: { total_count?: number } };
  comments?: { summary?: { total_count?: number } };
}

// 1. Lấy danh sách bài viết trên Fanpage kèm thống kê (public - hiển thị trên trang chủ)
export async function GET() {
  try {
    let pageId: string, pageToken: string;
    try {
      ({ pageId, pageToken } = await getFacebookCredentials());
    } catch (credErr) {
      console.warn('Facebook credentials not configured or env missing:', credErr);
      return NextResponse.json({ success: true, posts: [] });
    }

    if (!pageId || !pageToken) {
      return NextResponse.json({ success: true, posts: [] });
    }

    const fields = 'id,message,story,created_time,full_picture,permalink_url,shares,reactions.summary(total_count).limit(0),comments.summary(total_count).limit(0)';

    // Lấy hết bài trên Fanpage bằng cách đi theo con trỏ paging.next của Graph API.
    const MAX_PAGES = 30;
    let url =
      `https://graph.facebook.com/v20.0/${pageId}/published_posts` +
      `?fields=${encodeURIComponent(fields)}&limit=100&access_token=${pageToken}`;

    const rawPosts: FBPostRaw[] = [];
    for (let i = 0; i < MAX_PAGES; i++) {
      try {
        const response = await fetch(url, { next: { revalidate: 300 } });
        if (!response.ok) {
          console.warn(`Facebook Graph API responded with status ${response.status}`);
          break;
        }
        const data = await response.json();

        if (data.error) {
          console.error('FB Get Posts Error:', data.error);
          if (rawPosts.length > 0) break;
          return NextResponse.json({ success: true, posts: [], error: data.error.message });
        }

        rawPosts.push(...(data.data || []));
        if (!data.paging?.next) break;
        url = data.paging.next;
      } catch (fetchErr) {
        console.error('Error fetching Facebook page chunk:', fetchErr);
        break;
      }
    }

    const posts = rawPosts.map((p) => ({
      id: p.id,
      message: p.message || p.story || '(Không có văn bản)',
      created_time: p.created_time,
      full_picture: p.full_picture || null,
      permalink_url: p.permalink_url || `https://facebook.com/${p.id}`,
      likesCount: p.reactions?.summary?.total_count || 0,
      commentsCount: p.comments?.summary?.total_count || 0,
      sharesCount: p.shares?.count || 0
    }));

    return NextResponse.json({ success: true, posts });
  } catch (err: any) {
    console.error('Fatal error in /api/facebook/posts:', err);
    return NextResponse.json({ success: true, posts: [], error: err?.message || 'Server error' });
  }
}

// 2. Chỉnh sửa nội dung bài viết
export const PATCH = withAdmin(async (request: Request) => {
  const { pageToken } = await getFacebookCredentials();
  const { postId, message } = await request.json();

  if (!postId || !message || !message.trim()) {
    return NextResponse.json({ error: 'Thiếu thông tin postId hoặc message' }, { status: 400 });
  }

  const formData = new URLSearchParams();
  formData.append('message', message.trim());
  formData.append('access_token', pageToken);

  const response = await fetch(`https://graph.facebook.com/v20.0/${postId}`, {
    method: 'POST',
    body: formData
  });
  const result = await response.json();

  if (result.error) {
    console.error('FB Update Post Error:', result.error);
    return NextResponse.json({ error: result.error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, postId });
});

// 3. Xoá bài viết trên Fanpage
export const DELETE = withAdmin(async (request: Request) => {
  const { pageToken } = await getFacebookCredentials();
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'Thiếu postId cần xoá' }, { status: 400 });
  }

  const response = await fetch(`https://graph.facebook.com/v20.0/${postId}?access_token=${pageToken}`, {
    method: 'DELETE'
  });
  const result = await response.json();

  if (result.error) {
    console.error('FB Delete Post Error:', result.error);
    return NextResponse.json({ error: result.error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, postId });
});
