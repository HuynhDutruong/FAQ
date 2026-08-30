import { NextResponse } from 'next/server';
import { withAdmin } from '@/lib/serverAuth';

export const dynamic = 'force-dynamic';

type Level = 'ok' | 'warn' | 'error';

interface Check {
  id: string;
  label: string;
  level: Level;
  message: string;
  /** Việc cụ thể admin cần làm khi mục này không ổn. */
  action?: string;
}

/** Firestore: đọc thử một document nhỏ để biết còn hạn mức và còn kết nối không. */
async function checkFirestore(): Promise<Check> {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    return {
      id: 'firestore',
      label: 'Cơ sở dữ liệu Firestore',
      level: 'error',
      message: 'Chưa cấu hình FIREBASE_SERVICE_ACCOUNT_KEY.',
      action: 'Thêm biến FIREBASE_SERVICE_ACCOUNT_KEY vào môi trường triển khai.'
    };
  }
  try {
    const { adminDb } = await import('@/lib/firebaseAdmin');
    const t0 = Date.now();
    await adminDb().collection('stats').doc('site').get();
    const ms = Date.now() - t0;
    return {
      id: 'firestore',
      label: 'Cơ sở dữ liệu Firestore',
      level: ms > 2500 ? 'warn' : 'ok',
      message: `Kết nối bình thường (${ms}ms).`
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const quota = /RESOURCE_EXHAUSTED|Quota exceeded/i.test(msg);
    return {
      id: 'firestore',
      label: 'Cơ sở dữ liệu Firestore',
      level: 'error',
      message: quota
        ? 'Đã dùng hết hạn mức đọc/ghi trong ngày. Gói Spark cho 50.000 lượt đọc và 20.000 lượt ghi mỗi ngày.'
        : `Không kết nối được: ${msg.slice(0, 160)}`,
      action: quota
        ? 'Hạn mức tự đặt lại vào nửa đêm giờ Thái Bình Dương (khoảng 14–15h giờ Việt Nam). Trong lúc chờ, đánh giá và các tính năng ghi dữ liệu sẽ tạm ngừng.'
        : 'Kiểm tra Service Account và kết nối mạng của máy chủ.'
    };
  }
}

/** Token Facebook: gọi thật lên Graph API để biết còn sống không và còn hạn bao lâu. */
async function checkFacebook(): Promise<Check> {
  const label = 'Kết nối Fanpage Facebook';
  try {
    const { getFacebookCredentials } = await import('@/lib/facebookHelper');
    const creds = await getFacebookCredentials();
    if (!creds?.pageToken) {
      return {
        id: 'facebook',
        label,
        level: 'error',
        message: 'Chưa có Page Access Token.',
        action: 'Vào tab Fanpage Facebook để dán Token, hoặc đặt biến FACEBOOK_PAGE_ACCESS_TOKEN.'
      };
    }

    const res = await fetch(
      `https://graph.facebook.com/v20.0/${creds.pageId}?fields=id,name&access_token=${creds.pageToken}`
    );
    const data = await res.json();
    if (data.error) {
      return {
        id: 'facebook',
        label,
        level: 'error',
        message: `Token không còn hiệu lực: ${data.error.message}`,
        action: 'Lấy Token mới rồi dán lại ở tab Fanpage Facebook.'
      };
    }

    // Xem hạn dùng nếu có App ID/Secret
    let expiryNote = 'Token không có hạn sử dụng.';
    let level: Level = 'ok';
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;
    if (appId && appSecret) {
      try {
        const dbg = await fetch(
          `https://graph.facebook.com/v20.0/debug_token?input_token=${creds.pageToken}&access_token=${appId}|${appSecret}`
        );
        const d = await dbg.json();
        const exp = Number(d?.data?.expires_at || 0);
        if (exp > 0) {
          const days = Math.floor((exp * 1000 - Date.now()) / 86400000);
          expiryNote = days > 0 ? `Token còn hạn ${days} ngày.` : 'Token đã hết hạn.';
          if (days <= 0) level = 'error';
          else if (days <= 7) level = 'warn';
        }
      } catch {
        /* không lấy được hạn thì bỏ qua */
      }
    }

    return {
      id: 'facebook',
      label,
      level,
      message: `Đang kết nối trang "${data.name}". ${expiryNote}`,
      action: level === 'ok' ? undefined : 'Lấy Token mới rồi dán lại ở tab Fanpage Facebook.'
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const quota = /RESOURCE_EXHAUSTED|Quota exceeded/i.test(msg);
    return {
      id: 'facebook',
      label,
      level: 'error',
      message: quota
        ? 'Không đọc được Token vì Firestore đã hết hạn mức trong ngày.'
        : `Không kiểm tra được: ${msg.slice(0, 160)}`,
      action: quota
        ? 'Đặt Token vào biến môi trường FACEBOOK_PAGE_ACCESS_TOKEN để không phụ thuộc Firestore.'
        : undefined
    };
  }
}

/** Chỉ mục giáo xứ cho sitemap — thiếu thì Google không thấy trang giáo xứ nào. */
async function checkSitemapIndex(): Promise<Check> {
  const label = 'Chỉ mục giáo xứ cho sitemap';
  try {
    const { adminDb } = await import('@/lib/firebaseAdmin');
    const snap = await adminDb().collection('massTimesMeta').doc('parishIndex').get();
    const ids = snap.data()?.ids;
    const n = Array.isArray(ids) ? ids.length : 0;
    if (!n) {
      return {
        id: 'sitemap',
        label,
        level: 'warn',
        message: 'Chưa có chỉ mục, nên sitemap chưa khai báo trang giáo xứ nào với Google.',
        action: 'Vào tab Quản Lý Giờ Lễ và bấm làm mới thống kê để tạo chỉ mục.'
      };
    }
    const updated = Number(snap.data()?.updatedAt || 0);
    const days = updated ? Math.floor((Date.now() - updated) / 86400000) : null;
    return {
      id: 'sitemap',
      label,
      level: days !== null && days > 60 ? 'warn' : 'ok',
      message: `Đang khai báo ${n.toLocaleString('vi-VN')} trang giáo xứ${
        days !== null ? `, cập nhật ${days} ngày trước` : ''
      }.`,
      action: days !== null && days > 60 ? 'Nên làm mới thống kê ở tab Quản Lý Giờ Lễ.' : undefined
    };
  } catch {
    return { id: 'sitemap', label, level: 'warn', message: 'Chưa kiểm tra được (Firestore không phản hồi).' };
  }
}

/** Biến môi trường bắt buộc — chỉ báo có hay không, không lộ giá trị. */
function checkEnv(): Check {
  const required = [
    ['FIREBASE_SERVICE_ACCOUNT_KEY', 'kết nối cơ sở dữ liệu'],
    ['NEXT_PUBLIC_FACEBOOK_APP_ID', 'kiểm tra hạn Token Facebook'],
    ['FACEBOOK_APP_SECRET', 'đổi Token ngắn hạn thành dài hạn']
  ] as const;
  const missing = required.filter(([k]) => !process.env[k]);
  return {
    id: 'env',
    label: 'Cấu hình môi trường',
    level: missing.length ? 'warn' : 'ok',
    message: missing.length
      ? `Thiếu ${missing.length} biến: ${missing.map(([k]) => k).join(', ')}.`
      : 'Đầy đủ các biến bắt buộc.',
    action: missing.length
      ? `Thiếu biến này sẽ mất chức năng: ${missing.map(([, why]) => why).join('; ')}.`
      : undefined
  };
}

export const GET = withAdmin(async () => {
  const [firestore, facebook, sitemap] = await Promise.all([
    checkFirestore(),
    checkFacebook(),
    checkSitemapIndex()
  ]);
  const checks: Check[] = [firestore, facebook, sitemap, checkEnv()];
  const worst: Level = checks.some((c) => c.level === 'error')
    ? 'error'
    : checks.some((c) => c.level === 'warn')
      ? 'warn'
      : 'ok';

  return NextResponse.json({ overall: worst, checkedAt: new Date().toISOString(), checks });
});
