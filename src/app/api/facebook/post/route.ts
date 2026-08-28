import { NextResponse } from 'next/server';
import { getFacebookCredentials } from '@/lib/facebookHelper';
import { withAdmin } from '@/lib/serverAuth';

export const dynamic = 'force-dynamic';

export const POST = withAdmin(async (request: Request) => {
  const body = await request.json();
  const { message, link } = body;

  if (!message || !message.trim()) {
    return NextResponse.json({ error: 'Nội dung bài viết không được để trống' }, { status: 400 });
  }

  const { pageId, pageToken, pageName } = await getFacebookCredentials();

  // Gửi bài đăng lên Fanpage qua Meta Graph API
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
    pageName
  });
});
