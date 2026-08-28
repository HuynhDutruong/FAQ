import { NextResponse } from 'next/server';
import { extractPostMedia, type FeedPost } from '@/lib/postIntel';

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
  attachments?: { data?: any[] };
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** Toàn bộ lịch sử bài viết khá nặng nên giữ lại trong bộ nhớ giữa các lượt gọi. */
const CACHE_TTL = 10 * 60 * 1000; // 10 phút bộ nhớ đệm
const BUDGET_MS = 3500; // Tối đa 3.5 giây để không làm chậm người dùng
let cache: { at: number; posts: FeedPost[] } | null = null;

async function resolveFacebookCredentials(): Promise<{ pageId: string; pageToken: string }> {
  // 1. Trực tiếp từ biến môi trường
  const envToken =
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN ||
    process.env.FACEBOOK_PAGE_TOKEN ||
    process.env.FACEBOOK_ACCESS_TOKEN;
  const envPageId = process.env.FACEBOOK_PAGE_ID;

  if (envToken && envToken.trim()) {
    let resolvedPageId = (envPageId || '').trim();
    if (!resolvedPageId) {
      try {
        const meRes = await fetch(
          `https://graph.facebook.com/v20.0/me?fields=id&access_token=${envToken.trim()}`
        );
        const meData = await meRes.json();
        if (meData.id) resolvedPageId = meData.id;
      } catch {
        // Ignore
      }
    }
    if (resolvedPageId) {
      return { pageId: resolvedPageId, pageToken: envToken.trim() };
    }
  }

  // 2. Từ Firestore nếu chưa có ENV
  try {
    const { getFacebookCredentials } = await import('@/lib/facebookHelper');
    const creds = await getFacebookCredentials();
    return { pageId: creds.pageId, pageToken: creds.pageToken };
  } catch {
    return { pageId: '', pageToken: '' };
  }
}

// 1. Lấy danh sách bài viết trên Fanpage kèm thống kê (public - hiển thị trên trang chủ)
export async function GET() {
  try {
    const { pageId, pageToken } = await resolveFacebookCredentials();

    if (!pageId || !pageToken) {
      return NextResponse.json({ success: true, posts: [] });
    }

    const headers = {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400'
    };

    if (cache && Date.now() - cache.at < CACHE_TTL) {
      return NextResponse.json({ success: true, posts: cache.posts, cached: true }, { headers });
    }

    const fields =
      'id,message,story,created_time,full_picture,permalink_url,' +
      'attachments{media_type,title,url,unshimmed_url,target,media,subattachments},' +
      'shares,reactions.summary(total_count).limit(0),comments.summary(total_count).limit(0)';

    // Lấy bài viết nhanh với limit=60 ở trang đầu, dừng khi chạm 3.5s
    const MAX_PAGES = 5;
    const startedAt = Date.now();
    let url =
      `https://graph.facebook.com/v20.0/${pageId}/published_posts` +
      `?fields=${encodeURIComponent(fields)}&limit=60&access_token=${pageToken}`;

    const rawPosts: FBPostRaw[] = [];
    for (let i = 0; i < MAX_PAGES; i++) {
      if (Date.now() - startedAt > BUDGET_MS) break;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const response = await fetch(url, {
          cache: 'no-store',
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          console.warn(`Facebook Graph API responded with status ${response.status}`);
          break;
        }
        const data = await response.json();

        if (data.error) {
          console.error('FB Get Posts Error:', data.error);
          if (rawPosts.length > 0) break;
          if (cache) return NextResponse.json({ success: true, posts: cache.posts, cached: true }, { headers });
          return NextResponse.json({ success: true, posts: [], error: data.error.message }, { headers });
        }

        rawPosts.push(...(data.data || []));
        if (!data.paging?.next) break;
        url = data.paging.next;
      } catch (fetchErr) {
        console.error('Error fetching Facebook page chunk:', fetchErr);
        break;
      }
    }

    if (rawPosts.length === 0 && cache) {
      return NextResponse.json({ success: true, posts: cache.posts, cached: true }, { headers });
    }

    const posts: FeedPost[] = rawPosts.map((p) => {
      const message = p.message || p.story || '(Không có văn bản)';
      const permalink = p.permalink_url || `https://facebook.com/${p.id}`;
      return {
        id: p.id,
        message,
        created_time: p.created_time,
        full_picture: p.full_picture || null,
        permalink_url: permalink,
        likesCount: p.reactions?.summary?.total_count || 0,
        commentsCount: p.comments?.summary?.total_count || 0,
        sharesCount: p.shares?.count || 0,
        ...extractPostMedia(message, permalink, p.attachments?.data || [])
      };
    });

    if (posts.length > 0) {
      cache = { at: Date.now(), posts };
    }

    return NextResponse.json({ success: true, posts }, { headers });
  } catch (err: any) {
    console.error('Fatal error in /api/facebook/posts:', err);
    if (cache) {
      return NextResponse.json({ success: true, posts: cache.posts, cached: true });
    }
    return NextResponse.json({ success: true, posts: [], error: err?.message || 'Server error' });
  }
}

// 2. Chỉnh sửa nội dung bài viết
export async function PATCH(request: Request) {
  const { withAdmin } = await import('@/lib/serverAuth');
  return withAdmin(async (req: Request) => {
    const { pageToken } = await resolveFacebookCredentials();
    const { postId, message } = await req.json();

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

    cache = null;
    return NextResponse.json({ success: true, postId });
  })(request);
}

// 3. Xoá bài viết trên Fanpage
export async function DELETE(request: Request) {
  const { withAdmin } = await import('@/lib/serverAuth');
  return withAdmin(async (req: Request) => {
    const { pageToken } = await resolveFacebookCredentials();
    const { searchParams } = new URL(req.url);
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

    cache = null;
    return NextResponse.json({ success: true, postId });
  })(request);
}
