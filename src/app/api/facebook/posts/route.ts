import { NextResponse } from 'next/server';
import { getFacebookCredentials } from '@/lib/facebookHelper';

interface FBPostRaw {
  id: string;
  message?: string;
  story?: string;
  created_time: string;
  full_picture?: string;
  permalink_url?: string;
  shares?: { count?: number };
  likes?: { summary?: { total_count?: number } };
  comments?: { summary?: { total_count?: number } };
}

// 1. Lấy danh sách bài viết trên Fanpage kèm thống kê
export async function GET() {
  try {
    const { pageId, pageToken } = await getFacebookCredentials();

    const fields = 'id,message,story,created_time,full_picture,permalink_url,shares,reactions.summary(total_count).limit(0).as(likes),comments.summary(total_count).limit(0).as(comments)';
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${pageId}/published_posts?fields=${encodeURIComponent(fields)}&limit=20&access_token=${pageToken}`
    );
    const data = await response.json();

    if (data.error) {
      console.error('FB Get Posts Error:', data.error);
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    const rawPosts: FBPostRaw[] = data.data || [];
    const posts = rawPosts.map((p) => ({
      id: p.id,
      message: p.message || p.story || '(Không có văn bản)',
      created_time: p.created_time,
      full_picture: p.full_picture || null,
      permalink_url: p.permalink_url || `https://facebook.com/${p.id}`,
      likesCount: p.likes?.summary?.total_count || 0,
      commentsCount: p.comments?.summary?.total_count || 0,
      sharesCount: p.shares?.count || 0
    }));

    return NextResponse.json({ success: true, posts });

  } catch (err: unknown) {
    console.error('Lỗi khi tải bài viết Facebook:', err);
    const msg = err instanceof Error ? err.message : 'Lỗi server';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// 2. Chỉnh sửa nội dung bài viết
export async function PATCH(request: Request) {
  try {
    const { pageToken } = await getFacebookCredentials();
    const body = await request.json();
    const { postId, message } = body;

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

  } catch (err: unknown) {
    console.error('Lỗi khi chỉnh sửa bài viết:', err);
    const msg = err instanceof Error ? err.message : 'Lỗi server';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// 3. Xoá bài viết trên Fanpage
export async function DELETE(request: Request) {
  try {
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

  } catch (err: unknown) {
    console.error('Lỗi khi xoá bài viết:', err);
    const msg = err instanceof Error ? err.message : 'Lỗi server';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
