import { cert, getApps, initializeApp, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import type { Auth } from 'firebase-admin/auth';

/**
 * Firebase Admin SDK: chỉ chạy phía server, bỏ qua Firestore Rules.
 * Nhờ vậy Page Access Token của Facebook không cần cho client đọc được nữa.
 *
 * Cần biến môi trường FIREBASE_SERVICE_ACCOUNT_KEY chứa nội dung file
 * Service Account JSON (dạng JSON thô hoặc đã mã hoá base64).
 */
function loadServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error(
      'Thiếu biến môi trường FIREBASE_SERVICE_ACCOUNT_KEY (Service Account JSON của Firebase).'
    );
  }

  let text = raw.trim();
  // Bỏ bọc dấu ngoặc kép nếu Vercel vô tình bọc cả chuỗi
  if (text.startsWith('"') && text.endsWith('"')) {
    text = text.slice(1, -1);
  }

  const jsonStr = text.startsWith('{')
    ? text
    : Buffer.from(text, 'base64').toString('utf8');

  const json = JSON.parse(jsonStr);
  // Private key dán qua ENV thường bị escape thành \n
  if (typeof json.private_key === 'string') {
    json.private_key = json.private_key.replace(/\\n/g, '\n');
  }
  return json;
}

let app: App | null = null;

function getAdminApp(): App {
  if (app) return app;
  const existing = getApps();
  if (existing.length) {
    app = existing[0];
    return app;
  }
  app = initializeApp({ credential: cert(loadServiceAccount()) });
  return app;
}

export function adminDb(): Firestore {
  return getFirestore(getAdminApp());
}

/**
 * firebase-admin/auth kéo theo jwks-rsa → jose (chỉ có bản ESM). Node của Vercel
 * require() module ESM sẽ nổ ERR_REQUIRE_ESM và làm hỏng luôn cả Firestore nếu
 * nạp sẵn ở đầu tệp — nên chỉ nạp khi thật sự cần xác thực ID Token.
 */
export async function adminAuth(): Promise<Auth> {
  const { getAuth } = await import('firebase-admin/auth');
  return getAuth(getAdminApp());
}
