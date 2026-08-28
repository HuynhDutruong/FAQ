import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface FacebookCredentials {
  pageId: string;
  pageToken: string;
  pageName: string;
  source: 'firestore' | 'env';
}

export async function getFacebookCredentials(): Promise<FacebookCredentials> {
  // 1. Kiểm tra trong Firestore
  try {
    const fbDoc = await getDoc(doc(db, 'settings', 'facebook'));
    if (fbDoc.exists()) {
      const data = fbDoc.data();
      if (data?.selectedPageId && data?.selectedPageToken) {
        return {
          pageId: data.selectedPageId as string,
          pageToken: data.selectedPageToken as string,
          pageName: (data.selectedPageName as string) || 'Fanpage Xứ Đoàn',
          source: 'firestore'
        };
      }
    }
  } catch (e) {
    console.warn('Cannot read firestore facebook doc:', e);
  }

  // 2. Tự động kiểm tra các biến môi trường ENV (Vercel Environment Variables)
  const envToken =
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN ||
    process.env.FACEBOOK_PAGE_TOKEN ||
    process.env.FACEBOOK_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_FACEBOOK_PAGE_TOKEN;

  const envPageId =
    process.env.FACEBOOK_PAGE_ID ||
    process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID;

  if (envToken) {
    let resolvedPageId = envPageId ? envPageId.trim() : '';
    let resolvedName = process.env.FACEBOOK_PAGE_NAME || 'Fanpage Xứ Đoàn';

    // Nếu chưa có Page ID thì gọi Graph API /me để tự lấy
    try {
      const meRes = await fetch(`https://graph.facebook.com/v20.0/me?fields=id,name&access_token=${envToken.trim()}`);
      const meData = await meRes.json();
      if (!meData.error && meData.id) {
        resolvedPageId = meData.id;
        resolvedName = meData.name || resolvedName;

        // Đồng bộ ngược vào Firestore để toàn bộ Admin cùng dùng
        await setDoc(doc(db, 'settings', 'facebook'), {
          connected: true,
          connectedAt: new Date().toISOString(),
          selectedPageId: resolvedPageId,
          selectedPageName: resolvedName,
          selectedPageToken: envToken.trim(),
          source: 'env_auto_sync'
        }, { merge: true });
      }
    } catch (err) {
      console.warn('Error verifying env token:', err);
    }

    if (resolvedPageId) {
      return {
        pageId: resolvedPageId,
        pageToken: envToken.trim(),
        pageName: resolvedName,
        source: 'env'
      };
    }
  }

  throw new Error('Chưa cấu hình Fanpage Facebook (trong Database hoặc Biến môi trường ENV).');
}
