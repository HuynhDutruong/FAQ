import { auth } from '@/lib/firebase';

/**
 * fetch() kèm Firebase ID Token của Admin đang đăng nhập.
 * Mọi API Facebook đều yêu cầu token này, nên client không cần (và không được)
 * đọc Page Access Token từ Firestore nữa.
 */
export async function authedFetch(input: string, init: RequestInit = {}): Promise<Response> {
  await auth.authStateReady();
  const idToken = await auth.currentUser?.getIdToken();

  return fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...(idToken ? { Authorization: `Bearer ${idToken}` } : {})
    }
  });
}
