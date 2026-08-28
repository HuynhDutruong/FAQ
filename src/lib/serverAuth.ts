import { NextResponse } from 'next/server';

// Danh sách các email Host / Admin mặc định (ưu tiên biến môi trường)
const PRIMARY_HOST_EMAILS = (
  process.env.ADMIN_EMAILS ||
  process.env.PRIMARY_HOST_EMAIL ||
  'notification2411.huynhdutruong@gmail.com,hugowishpax@gmail.com'
)
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean);

const FIREBASE_API_KEY =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  process.env.FIREBASE_API_KEY ||
  'AIzaSyADDC3-1BYxJX5hs-ofxUmM9lHiXbmk3zo';

export class AuthError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/**
 * Xác thực Firebase ID Token:
 * 1. Dùng Google Identity Toolkit REST API (chạy trực tiếp không cần private key, không sợ lỗi serverless bundling).
 * 2. Fallback sang Firebase Admin SDK nếu có cấu hình.
 */
async function verifyAdmin(request: Request): Promise<string> {
  const header = request.headers.get('authorization') || '';
  const idToken = header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : '';
  if (!idToken) {
    throw new AuthError(401, 'Bạn cần đăng nhập tài khoản quản trị.');
  }

  let email = '';

  // 1. Thử xác thực trực tiếp qua Google Identity Toolkit REST API
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      }
    );
    const data = await res.json();
    if (data.users && Array.isArray(data.users) && data.users[0]?.email) {
      email = (data.users[0].email as string).toLowerCase().trim();
    }
  } catch (e) {
    console.warn('Identity Toolkit verification request failed:', e);
  }

  // 2. Fallback sang Firebase Admin SDK nếu REST API chưa ra email
  if (!email && process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const { adminAuth } = await import('@/lib/firebaseAdmin');
      const decoded = await adminAuth().verifyIdToken(idToken);
      email = (decoded.email || '').toLowerCase().trim();
    } catch (e) {
      console.warn('Firebase Admin verifyIdToken failed:', e);
    }
  }

  if (!email) {
    throw new AuthError(401, 'Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.');
  }

  // Nếu thuộc danh sách Host / Super Admin
  if (PRIMARY_HOST_EMAILS.includes(email)) {
    return email;
  }

  // Kiểm tra quyền trong Firestore collection 'users' nếu có cấu hình Firebase Admin
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const { adminDb } = await import('@/lib/firebaseAdmin');
      const snap = await adminDb().collection('users').doc(email).get();
      if (!snap.exists || snap.data()?.status !== 'active') {
        throw new AuthError(403, 'Tài khoản của bạn chưa được cấp quyền quản trị.');
      }
    }
  } catch (err) {
    if (err instanceof AuthError) throw err;
    console.warn('Cannot check user permissions in Firestore:', err);
  }

  return email;
}

/** Bọc một route handler để bắt buộc đăng nhập quản trị trước khi chạy. */
export function withAdmin(handler: (request: Request, email: string) => Promise<NextResponse>) {
  return async (request: Request): Promise<NextResponse> => {
    try {
      const email = await verifyAdmin(request);
      return await handler(request, email);
    } catch (err: unknown) {
      if (err instanceof AuthError) {
        return NextResponse.json({ error: err.message }, { status: err.status });
      }
      console.error('Lỗi xác thực quản trị:', err);
      const msg = err instanceof Error ? err.message : 'Lỗi máy chủ';
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  };
}
