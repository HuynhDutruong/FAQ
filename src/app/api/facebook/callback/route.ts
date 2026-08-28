import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/admin?error=facebook_auth_failed', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/admin?error=no_code', request.url));
  }

  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  const url = new URL(request.url);
  const redirectUri = `${url.origin}/api/facebook/callback`;

  try {
    // 1. Đổi Code lấy User Access Token
    const tokenResponse = await fetch(`https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${appSecret}&code=${code}`);
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('FB Token Error:', tokenData.error);
      return NextResponse.redirect(new URL('/admin?error=token_exchange_failed', request.url));
    }

    const userAccessToken = tokenData.access_token;

    // 2. Dùng User Token để lấy danh sách Fanpage và Page Access Token
    const pagesResponse = await fetch(`https://graph.facebook.com/v20.0/me/accounts?access_token=${userAccessToken}`);
    const pagesData = await pagesResponse.json();

    if (pagesData.error) {
      console.error('FB Pages Error:', pagesData.error);
      return NextResponse.redirect(new URL('/admin?error=pages_fetch_failed', request.url));
    }

    // Tạm thời log ra terminal để debug
    console.log("=== THÔNG TIN CÁC FANPAGE CỦA BẠN ===");
    console.log(JSON.stringify(pagesData.data, null, 2));

    // Ở bản MVP này, ta chuyển hướng về lại Admin kèm cờ thành công
    return NextResponse.redirect(new URL('/admin?facebook_success=true', request.url));

  } catch (err) {
    console.error('Lỗi khi xử lý Facebook Callback:', err);
    return NextResponse.redirect(new URL('/admin?error=server_error', request.url));
  }
}
