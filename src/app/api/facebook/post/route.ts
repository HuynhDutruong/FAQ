import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, link } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Nội dung bài viết không được để trống' }, { status: 400 });
    }

    // 1. Lấy Token của Fanpage đã lưu trong Firestore
    const fbDoc = await getDoc(doc(db, 'settings', 'facebook'));
    if (!fbDoc.exists() || !fbDoc.data()?.connected) {
      return NextResponse.json({ error: 'Chưa kết nối Fanpage Facebook. Vui lòng kết nối trước.' }, { status: 400 });
    }

    const data = fbDoc.data();
    const pageId = data.selectedPageId;
    const pageToken = data.selectedPageToken;

    if (!pageId || !pageToken) {
      return NextResponse.json({ error: 'Không tìm thấy thông tin Page ID hoặc Page Token.' }, { status: 400 });
    }

    // 2. Gửi bài đăng lên Fanpage qua Meta Graph API
    const formData = new URLSearchParams();
    formData.append('message', message.trim());
    formData.append('access_token', pageToken);
    if (link) {
      formData.append('link', link);
    }

    const postResponse = await fetch(`https://graph.facebook.com/v20.0/${pageId}/feed`, {
      method: 'POST',
      body: formData
    });

    const postResult = await postResponse.json();

    if (postResult.error) {
      console.error('FB Post Error:', postResult.error);
      return NextResponse.json({ error: postResult.error.message || 'Đăng bài thất bại' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      postId: postResult.id,
      pageName: data.selectedPageName
    });

  } catch (err: unknown) {
    console.error('Lỗi khi đăng bài Facebook:', err);
    const msg = err instanceof Error ? err.message : 'Lỗi server';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
