import { adminDb } from '@/lib/firebaseAdmin';

const SETTINGS_DOC = () => adminDb().collection('settings').doc('facebook');

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

export async function getFacebookSettings(): Promise<Record<string, unknown> | null> {
  const snap = await SETTINGS_DOC().get();
  return snap.exists ? (snap.data() as Record<string, unknown>) : null;
}

export async function saveFacebookSettings(data: Record<string, unknown>): Promise<void> {
  await SETTINGS_DOC().set(data, { merge: true });
}

export async function deleteFacebookSettings(): Promise<void> {
  await SETTINGS_DOC().delete();
}

/** Danh sách Fanpage để hiển thị cho Admin chọn — KHÔNG kèm access_token. */
export async function listFacebookPages(): Promise<{ id: string; name: string }[]> {
  const data = await getFacebookSettings();
  const pages = (data?.pages as FacebookPageRecord[] | undefined) || [];
  return pages.map(p => ({ id: p.id, name: p.name }));
}

export async function getFacebookCredentials(): Promise<FacebookCredentials> {
  // 1. Cấu hình đã lưu trong Firestore (chỉ server đọc được qua Admin SDK)
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

  // 2. Dự phòng: Token đặt sẵn trong biến môi trường
  const envToken =
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN ||
    process.env.FACEBOOK_PAGE_TOKEN ||
    process.env.FACEBOOK_ACCESS_TOKEN;

  const envPageId = process.env.FACEBOOK_PAGE_ID;

  if (envToken) {
    let resolvedPageId = envPageId ? envPageId.trim() : '';
    let resolvedName = process.env.FACEBOOK_PAGE_NAME || 'Fanpage Xứ Đoàn';

    // Chưa có Page ID thì gọi Graph API /me để tự lấy
    if (!resolvedPageId) {
      try {
        const meRes = await fetch(
          `https://graph.facebook.com/v20.0/me?fields=id,name&access_token=${envToken.trim()}`
        );
        const meData = await meRes.json();
        if (!meData.error && meData.id) {
          resolvedPageId = meData.id;
          resolvedName = meData.name || resolvedName;
        }
      } catch (err) {
        console.warn('Error verifying env token:', err);
      }
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

  throw new Error('Chưa cấu hình Fanpage Facebook. Vui lòng dán Access Token trong trang Quản trị.');
}
