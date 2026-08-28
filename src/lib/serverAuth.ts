import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';

// Tài khoản Host gốc luôn có quyền (khớp với PRIMARY_HOST_EMAIL trong AuthContext)
const PRIMARY_HOST_EMAIL = 'notification2411.huynhdutruong@gmail.com';

export class AuthError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** Xác thực Firebase ID Token và kiểm tra tài khoản có quyền quản trị đang hoạt động. */
async function verifyAdmin(request: Request): Promise<string> {
  const header = request.headers.get('authorization') || '';
  const idToken = header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : '';
  if (!idToken) {
    throw new AuthError(401, 'Bạn cần đăng nhập tài khoản quản trị.');
  }

  let email = '';
  try {
    const decoded = await adminAuth().verifyIdToken(idToken);
    email = (decoded.email || '').toLowerCase();
  } catch {
    throw new AuthError(401, 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
  }

  if (!email) {
    throw new AuthError(403, 'Tài khoản không có địa chỉ email hợp lệ.');
  }
  if (email === PRIMARY_HOST_EMAIL) return email;

  const snap = await adminDb().collection('users').doc(email).get();
  if (!snap.exists || snap.data()?.status !== 'active') {
    throw new AuthError(403, 'Tài khoản của bạn không có quyền quản trị Fanpage.');
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
      const msg = err instanceof Error ? err.message : 'Lỗi server';
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  };
}
