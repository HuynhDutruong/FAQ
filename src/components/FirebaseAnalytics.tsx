'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { firebaseConfig } from '@/lib/firebaseConfig';

/**
 * Ghi nhận page_view qua Google Analytics 4 (Firebase Analytics).
 *
 * Toàn bộ Firebase SDK được nạp động và chỉ khi trình duyệt rảnh. Nếu import
 * tĩnh `@/lib/firebase` ở đây thì cả chunk Firebase (~555KB) sẽ bị kéo vào
 * bundle khởi động của MỌI trang, kể cả những trang không dùng Firestore.
 */
export default function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      try {
        const [{ initializeApp, getApps, getApp }, analytics] = await Promise.all([
          import('firebase/app'),
          import('firebase/analytics')
        ]);
        if (cancelled || !(await analytics.isSupported())) return;
        const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
        analytics.logEvent(analytics.getAnalytics(app), 'page_view', {
          page_path: pathname,
          page_location: window.location.href,
          page_title: document.title
        });
      } catch {
        /* trình duyệt chặn analytics hoặc mất mạng — bỏ qua */
      }
    };

    const ric = (window as any).requestIdleCallback;
    const handle = ric ? ric(start, { timeout: 10000 }) : window.setTimeout(start, 4000);

    return () => {
      cancelled = true;
      const cic = (window as any).cancelIdleCallback;
      if (cic && ric) cic(handle);
      else clearTimeout(handle as number);
    };
  }, [pathname]);

  return null;
}
