import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pageId, pageToken, pageName } = body;

    if (!pageId || !pageId.trim() || !pageToken || !pageToken.trim()) {
      return NextResponse.json({ error: 'Vui lòng nhập đầy đủ Page ID và Page Access Token.' }, { status: 400 });
    }

    const cleanPageId = pageId.trim();
    const cleanToken = pageToken.trim();

    // 1. Kiểm tra Token và thông tin Page qua Meta Graph API
    const testRes = await fetch(`https://graph.facebook.com/v20.0/${cleanPageId}?fields=id,name,category&access_token=${cleanToken}`);
    const testData = await testRes.json();

    if (testData.error) {
      console.error('FB Token Verify Error:', testData.error);
      return NextResponse.json({
        error: `Facebook báo lỗi: ${testData.error.message || 'Token hoặc Page ID không hợp lệ'}`
      }, { status: 400 });
    }

    const resolvedName = testData.name || pageName || 'Fanpage Xứ Đoàn';

    // 2. Lưu cấu hình Fanpage vào Firestore
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
