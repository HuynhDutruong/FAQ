import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface FBPageAccount {
  id: string;
  name: string;
  category?: string;
  access_token: string;
}

export async function POST(request: Request) {
  try {
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

    // BƯỚC 1: Kiểm tra xem đây có phải là USER Access Token không (để tự động lấy Page Token cho người dùng)
    try {
      const userAccountsRes = await fetch(`https://graph.facebook.com/v20.0/me/accounts?access_token=${cleanToken}`);
      const userAccountsData = await userAccountsRes.json();

      if (!userAccountsData.error && userAccountsData.data && userAccountsData.data.length > 0) {
        const pages: FBPageAccount[] = userAccountsData.data;
        // Nếu người dùng có chỉ định Page ID thì tìm page đó, còn không thì lấy page đầu tiên
        const targetPage = cleanPageId
          ? pages.find(p => p.id === cleanPageId) || pages[0]
          : pages[0];

        await setDoc(doc(db, 'settings', 'facebook'), {
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
        }, { merge: true });

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

    // Lưu cấu hình Fanpage vào Firestore
    await setDoc(doc(db, 'settings', 'facebook'), {
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
    }, { merge: true });

    return NextResponse.json({
      success: true,
      pageId: cleanPageId,
      pageName: resolvedName
    });

  } catch (err: unknown) {
    console.error('Lỗi khi cấu hình Page Token:', err);
    const msg = err instanceof Error ? err.message : 'Lỗi server';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
