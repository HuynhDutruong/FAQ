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
    // 1. Đổi Code lấy User Access Token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${appSecret}&code=${code}`
    );
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('FB Token Error:', tokenData.error);
      return NextResponse.redirect(new URL('/admin?tab=facebook&error=token_exchange_failed', request.url));
    }

    const userAccessToken = tokenData.access_token;

    // 2. Dùng User Token để lấy danh sách Fanpage và Page Access Token
    const pagesResponse = await fetch(`https://graph.facebook.com/v20.0/me/accounts?access_token=${userAccessToken}`);
    const pagesData = await pagesResponse.json();

    if (pagesData.error) {
      console.error('FB Pages Error:', pagesData.error);
      return NextResponse.redirect(new URL('/admin?tab=facebook&error=pages_fetch_failed', request.url));
    }

    const pages: FacebookPageItem[] = pagesData.data || [];
    const firstPage = pages[0] || null;

    // 3. Lưu thông tin Fanpage và Token vào Firestore
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
      selectedPageId: firstPage?.id || '',
      selectedPageName: firstPage?.name || '',
      selectedPageToken: firstPage?.access_token || ''
    }, { merge: true });

    return NextResponse.redirect(new URL('/admin?tab=facebook&facebook_success=true', request.url));

  } catch (err: unknown) {
    console.error('Lỗi khi xử lý Facebook Callback:', err);
    return NextResponse.redirect(new URL('/admin?tab=facebook&error=server_error', request.url));
  }
}
