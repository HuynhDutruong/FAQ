import { NextResponse } from 'next/server';
import {
  FacebookPageRecord,
  deleteFacebookSettings,
  getFacebookSettings,
  saveFacebookSettings
} from '@/lib/facebookHelper';
import { withAdmin } from '@/lib/serverAuth';

// 1. Lưu Access Token do Admin dán trực tiếp (không cần đăng nhập qua App Facebook)
export const POST = withAdmin(async (request: Request) => {
  const body = await request.json();
  const { pageId, pageToken, pageName } = body;

  if (!pageToken || !pageToken.trim()) {
    return NextResponse.json({ error: 'Vui lòng nhập Token Facebook.' }, { status: 400 });
  }

  // Làm sạch Token (loại bỏ khoảng trắng thừa, tiền tố Bearer, dấu ngoặc kép...)
  let cleanToken = pageToken.trim();
  if (cleanToken.toLowerCase().startsWith('bearer ')) {
    cleanToken = cleanToken.substring(7).trim();
  }
  cleanToken = cleanToken.replace(/^["']|["']$/g, '');

  let cleanPageId = pageId ? pageId.trim() : '';

  // Nếu là User Token ngắn hạn: đổi sang Token dài hạn để Page Token lấy ra dùng được vĩnh viễn
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  if (appId && appSecret) {
    try {
      const llRes = await fetch(
        `https://graph.facebook.com/v20.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${cleanToken}`
      );
      const llData = await llRes.json();
      if (!llData.error && llData.access_token) {
        cleanToken = llData.access_token;
      }
    } catch (e) {
      // ponytail: token vẫn dùng được, chỉ là hạn ngắn hơn
      console.warn('Cannot exchange long-lived token:', e);
    }
  }

  // BƯỚC 1: Kiểm tra xem đây có phải là USER Access Token không (để tự động lấy Page Token)
  try {
    const userAccountsRes = await fetch(`https://graph.facebook.com/v20.0/me/accounts?access_token=${cleanToken}`);
    const userAccountsData = await userAccountsRes.json();

    if (!userAccountsData.error && userAccountsData.data && userAccountsData.data.length > 0) {
      const pages: FacebookPageRecord[] = userAccountsData.data;
      // Nếu người dùng có chỉ định Page ID thì tìm page đó, còn không thì lấy page đầu tiên
      const targetPage = cleanPageId
        ? pages.find(p => p.id === cleanPageId) || pages[0]
        : pages[0];

      await saveFacebookSettings({
        connected: true,
        connectedAt: new Date().toISOString(),
        selectedPageId: targetPage.id,
        selectedPageName: targetPage.name,
        selectedPageToken: targetPage.access_token,
        pages: pages.map(p => ({
          id: p.id,
          name: p.name,
          category: p.category || '',
          access_token: p.access_token
        }))
      });

      return NextResponse.json({
        success: true,
        pageId: targetPage.id,
        pageName: targetPage.name,
        detectedMode: 'user_token_auto_resolved'
      });
    }
  } catch (e) {
    console.warn('Check user accounts failed, trying direct page token...', e);
  }

  // BƯỚC 2: Nếu là trực tiếp PAGE Access Token
  if (!cleanPageId) {
    // Thử gọi /me để tự lấy id của Page
    const meRes = await fetch(`https://graph.facebook.com/v20.0/me?fields=id,name,category&access_token=${cleanToken}`);
    const meData = await meRes.json();
    if (!meData.error && meData.id) {
      cleanPageId = meData.id;
    } else {
      return NextResponse.json({
        error: 'Vui lòng nhập thêm Facebook Page ID (hoặc kiểm tra lại mã Token của bạn).'
      }, { status: 400 });
    }
  }

  const testRes = await fetch(`https://graph.facebook.com/v20.0/${cleanPageId}?fields=id,name,category&access_token=${cleanToken}`);
  const testData = await testRes.json();

  if (testData.error) {
    console.error('FB Token Verify Error:', testData.error);
    return NextResponse.json({
      error: `Facebook báo lỗi: ${testData.error.message || 'Token không hợp lệ. Token phải bắt đầu bằng EAA...'}`
    }, { status: 400 });
  }

  const resolvedName = testData.name || pageName || 'Fanpage Xứ Đoàn';

  await saveFacebookSettings({
    connected: true,
    connectedAt: new Date().toISOString(),
    selectedPageId: cleanPageId,
    selectedPageName: resolvedName,
    selectedPageToken: cleanToken,
    pages: [{
      id: cleanPageId,
      name: resolvedName,
      category: testData.category || '',
      access_token: cleanToken
    }]
  });

  return NextResponse.json({
    success: true,
    pageId: cleanPageId,
    pageName: resolvedName
  });
});

// 2. Chuyển sang Fanpage khác trong danh sách đã kết nối
export const PATCH = withAdmin(async (request: Request) => {
  const { pageId } = await request.json();
  if (!pageId) {
    return NextResponse.json({ error: 'Thiếu pageId' }, { status: 400 });
  }

  const data = await getFacebookSettings();
  const pages = (data?.pages as FacebookPageRecord[] | undefined) || [];
  const target = pages.find(p => p.id === pageId);
  if (!target) {
    return NextResponse.json({ error: 'Không tìm thấy Fanpage này trong danh sách đã kết nối.' }, { status: 404 });
  }

  await saveFacebookSettings({
    selectedPageId: target.id,
    selectedPageName: target.name,
    selectedPageToken: target.access_token
  });

  return NextResponse.json({ success: true, pageId: target.id, pageName: target.name });
});

// 3. Huỷ kết nối Fanpage (xoá sạch Token khỏi hệ thống)
export const DELETE = withAdmin(async () => {
  await deleteFacebookSettings();
  return NextResponse.json({ success: true });
});
