import { cert, getApps, initializeApp, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

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

export function adminAuth(): Auth {
  return getAuth(getAdminApp());
}
