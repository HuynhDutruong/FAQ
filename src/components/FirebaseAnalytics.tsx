'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { app } from '@/lib/firebase';

/**
 * Khởi tạo Google Analytics 4 (qua Firebase Analytics) và ghi nhận page_view
 * mỗi khi điều hướng nội bộ. Import động để ~50KB SDK analytics không nằm
 * trong bundle khởi động.
 */
export default function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    import('firebase/analytics')
      .then(async ({ isSupported, getAnalytics, logEvent }) => {
        if (cancelled || !(await isSupported())) return;
        logEvent(getAnalytics(app), 'page_view', {
          page_path: pathname,
          page_location: window.location.href,
          page_title: document.title
        });
      })
      .catch(() => { /* trình duyệt chặn analytics — bỏ qua */ });

    return () => { cancelled = true; };
  }, [pathname]);

  return null;
}
