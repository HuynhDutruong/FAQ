import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface FacebookPageItem {
  id: string;
  name: string;
  category?: string;
  access_token: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/admin?tab=facebook&error=facebook_auth_failed', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/admin?tab=facebook&error=no_code', request.url));
  }

  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  const url = new URL(request.url);
  const redirectUri = `${url.origin}/api/facebook/callback`;

  try {
    // 1. Đổi Code lấy Short-Lived User Access Token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${appSecret}&code=${code}`
    );
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('FB Token Error:', tokenData.error);
      return NextResponse.redirect(new URL('/admin?tab=facebook&error=token_exchange_failed', request.url));
    }

    let userAccessToken = tokenData.access_token;

    // 2. Nâng cấp sang Long-Lived User Token (Hạn 60 ngày) để lấy Permanent Page Token (Dùng vĩnh viễn)
    try {
      const longLivedRes = await fetch(
        `https://graph.facebook.com/v20.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${userAccessToken}`
      );
      const longLivedData = await longLivedRes.json();
      if (!longLivedData.error && longLivedData.access_token) {
        userAccessToken = longLivedData.access_token;
      }
    } catch (e) {
      console.warn('Cannot exchange long-lived token, using short-lived token:', e);
    }

    // 3. Dùng Token để lấy danh sách Fanpage và Permanent Page Access Token
    const pagesResponse = await fetch(`https://graph.facebook.com/v20.0/me/accounts?access_token=${userAccessToken}`);
    const pagesData = await pagesResponse.json();

    if (pagesData.error) {
      console.error('FB Pages Error:', pagesData.error);
      return NextResponse.redirect(new URL('/admin?tab=facebook&error=pages_fetch_failed', request.url));
    }

    const pages: FacebookPageItem[] = pagesData.data || [];

    if (pages.length === 0) {
      // Khi không tìm thấy page, thử kiểm tra thông tin user
      const meRes = await fetch(`https://graph.facebook.com/v20.0/me?access_token=${userAccessToken}`);
      const meData = await meRes.json();

      await setDoc(doc(db, 'settings', 'facebook'), {
        userToken: userAccessToken,
        userName: meData.name || '',
        userId: meData.id || '',
        lastAttempt: new Date().toISOString()
      }, { merge: true });

      return NextResponse.redirect(new URL('/admin?tab=facebook&error=no_pages_found', request.url));
    }

    const firstPage = pages[0];

    // 4. Lưu cấu hình Fanpage TOÀN HỆ THỐNG vào Firestore (Cho tất cả Admin dùng chung vĩnh viễn)
    await setDoc(doc(db, 'settings', 'facebook'), {
      connected: true,
      connectedAt: new Date().toISOString(),
      userToken: userAccessToken,
      pages: pages.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category || '',
        access_token: p.access_token
      })),
      selectedPageId: firstPage.id,
      selectedPageName: firstPage.name,
      selectedPageToken: firstPage.access_token
    }, { merge: true });

    return NextResponse.redirect(new URL('/admin?tab=facebook&facebook_success=true', request.url));

  } catch (err: unknown) {
    console.error('Lỗi khi xử lý Facebook Callback:', err);
    return NextResponse.redirect(new URL('/admin?tab=facebook&error=server_error', request.url));
  }
}
