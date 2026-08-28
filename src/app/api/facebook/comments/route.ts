import { NextResponse } from 'next/server';
import { getFacebookCredentials } from '@/lib/facebookHelper';

interface FBCommentRaw {
  id: string;
  message: string;
  created_time: string;
  from?: { name?: string; id?: string };
  like_count?: number;
  comments?: { data?: FBCommentRaw[] };
}

// 1. Lấy danh sách bình luận của 1 bài viết
export async function GET(request: Request) {
  try {
    const { pageToken } = await getFacebookCredentials();
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ error: 'Thiếu postId' }, { status: 400 });
    }

    const fields = 'id,message,created_time,from,like_count,comments{id,message,created_time,from}';
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${postId}/comments?fields=${encodeURIComponent(fields)}&limit=50&access_token=${pageToken}`
    );
    const data = await response.json();

    if (data.error) {
      console.error('FB Get Comments Error:', data.error);
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    const comments: FBCommentRaw[] = data.data || [];
    return NextResponse.json({ success: true, comments });

  } catch (err: unknown) {
    console.error('Lỗi khi tải bình luận:', err);
    const msg = err instanceof Error ? err.message : 'Lỗi server';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// 2. Gửi bình luận hoặc trả lời bình luận (Reply) dưới danh nghĩa Fanpage
export async function POST(request: Request) {
  try {
    const { pageToken } = await getFacebookCredentials();
    const body = await request.json();
    const { targetId, message } = body; // targetId có thể là postId hoặc commentId

    if (!targetId || !message || !message.trim()) {
      return NextResponse.json({ error: 'Thiếu targetId hoặc nội dung bình luận' }, { status: 400 });
    }

    const formData = new URLSearchParams();
    formData.append('message', message.trim());
    formData.append('access_token', pageToken);

    const response = await fetch(`https://graph.facebook.com/v20.0/${targetId}/comments`, {
      method: 'POST',
      body: formData
    });
    const result = await response.json();

    if (result.error) {
      console.error('FB Post Comment Error:', result.error);
      return NextResponse.json({ error: result.error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      commentId: result.id
    });

  } catch (err: unknown) {
    console.error('Lỗi khi gửi bình luận:', err);
    const msg = err instanceof Error ? err.message : 'Lỗi server';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
