export interface FacebookPageRecord {
  id: string;
  name: string;
  category?: string;
  access_token: string;
}

export interface FacebookCredentials {
  pageId: string;
  pageToken: string;
  pageName: string;
  source: 'firestore' | 'env';
}

async function getAdminFirestore() {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const { adminDb } = await import('@/lib/firebaseAdmin');
      return adminDb();
    }
  } catch (e) {
    console.warn('Firebase Admin Firestore not available:', e);
  }
  return null;
}

export async function getFacebookSettings(): Promise<Record<string, unknown> | null> {
  try {
    const db = await getAdminFirestore();
    if (!db) return null;
    const snap = await db.collection('settings').doc('facebook').get();
    return snap.exists ? (snap.data() as Record<string, unknown>) : null;
  } catch (e) {
    console.warn('Cannot get Facebook settings from Firestore:', e);
    return null;
  }
}

export async function saveFacebookSettings(data: Record<string, unknown>): Promise<void> {
  try {
    const db = await getAdminFirestore();
    if (db) {
      await db.collection('settings').doc('facebook').set(data, { merge: true });
    }
  } catch (e) {
    console.warn('Cannot save Facebook settings to Firestore:', e);
  }
}

export async function deleteFacebookSettings(): Promise<void> {
  try {
    const db = await getAdminFirestore();
    if (db) {
      await db.collection('settings').doc('facebook').delete();
    }
  } catch (e) {
    console.warn('Cannot delete Facebook settings from Firestore:', e);
  }
}

/** Danh sách Fanpage để hiển thị cho Admin chọn — KHÔNG kèm access_token. */
export async function listFacebookPages(): Promise<{ id: string; name: string }[]> {
  try {
    const data = await getFacebookSettings();
    const pages = (data?.pages as FacebookPageRecord[] | undefined) || [];
    return pages.map(p => ({ id: p.id, name: p.name }));
  } catch {
    return [];
  }
}

export async function getFacebookCredentials(): Promise<FacebookCredentials> {
  // 1. Ưu tiên: Token và Page ID đặt trực tiếp trong biến môi trường (nhanh, độc lập, không phụ thuộc Firestore)
  const envToken =
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN ||
    process.env.FACEBOOK_PAGE_TOKEN ||
    process.env.FACEBOOK_ACCESS_TOKEN;

  const envPageId = process.env.FACEBOOK_PAGE_ID;

  if (envToken && envToken.trim()) {
    let resolvedPageId = envPageId ? envPageId.trim() : '';
    let resolvedName = process.env.FACEBOOK_PAGE_NAME || 'Fanpage Xứ Đoàn';

    if (resolvedPageId) {
      return {
        pageId: resolvedPageId,
        pageToken: envToken.trim(),
        pageName: resolvedName,
        source: 'env'
      };
    }

    // Chưa có Page ID thì gọi Graph API /me để tự lấy
    try {
      const meRes = await fetch(
        `https://graph.facebook.com/v20.0/me?fields=id,name&access_token=${envToken.trim()}`
      );
      const meData = await meRes.json();
      if (!meData.error && meData.id) {
        resolvedPageId = meData.id;
        resolvedName = meData.name || resolvedName;
        return {
          pageId: resolvedPageId,
          pageToken: envToken.trim(),
          pageName: resolvedName,
          source: 'env'
        };
      }
    } catch (err) {
      console.warn('Error verifying env token:', err);
    }
  }

  // 2. Dự phòng: Cấu hình đã lưu trong Firestore qua trang Quản trị Admin
  try {
    const data = await getFacebookSettings();
    if (data?.selectedPageId && data?.selectedPageToken) {
      return {
        pageId: data.selectedPageId as string,
        pageToken: data.selectedPageToken as string,
        pageName: (data.selectedPageName as string) || 'Fanpage Xứ Đoàn',
        source: 'firestore'
      };
    }
  } catch (e) {
    console.warn('Cannot read firestore facebook doc:', e);
  }

  throw new Error('Chưa cấu hình Fanpage Facebook. Vui lòng kiểm tra biến môi trường hoặc cấu hình trong trang Quản trị.');
}
