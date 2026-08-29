import { NextResponse } from 'next/server';
import { getFacebookCredentials } from '@/lib/facebookHelper';
import { withAdmin } from '@/lib/serverAuth';

export const dynamic = 'force-dynamic';

export const POST = withAdmin(async (request: Request) => {
  const body = await request.json();
  const { message, link, photoUrl, videoUrl } = body;

  if (!message || !message.trim()) {
    return NextResponse.json({ error: 'Nội dung bài viết không được để trống' }, { status: 400 });
  }

  const { pageId, pageToken, pageName } = await getFacebookCredentials();

  if (!pageId || !pageToken) {
    return NextResponse.json({ error: 'Chưa cấu hình hoặc kết nối Fanpage Facebook' }, { status: 400 });
  }

  let endpoint = `https://graph.facebook.com/v20.0/${pageId}/feed`;
  const formData = new URLSearchParams();
  formData.append('access_token', pageToken);

  if (photoUrl && photoUrl.trim()) {
    // Đăng dạng bài kèm ảnh trực tiếp
    endpoint = `https://graph.facebook.com/v20.0/${pageId}/photos`;
    formData.append('caption', message.trim());
    formData.append('url', photoUrl.trim());
  } else if (videoUrl && videoUrl.trim()) {
    // Đăng dạng video trực tiếp
    endpoint = `https://graph.facebook.com/v20.0/${pageId}/videos`;
    formData.append('description', message.trim());
    formData.append('file_url', videoUrl.trim());
  } else {
    // Đăng bài viết thông thường hoặc kèm link bài viết Website
    formData.append('message', message.trim());
    if (link && link.trim()) {
      formData.append('link', link.trim());
    }
  }

  const postResponse = await fetch(endpoint, {
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
    postId: postResult.id || postResult.post_id,
    pageName
  });
});
