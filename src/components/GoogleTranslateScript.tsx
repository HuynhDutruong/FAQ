'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

/**
 * Google Translate nặng ~95KB và site đã có hệ i18n riêng, nên chỉ nạp khi thực
 * sự cần: người dùng chọn ngôn ngữ khác tiếng Việt, hoặc chạm vào trang lần đầu.
 * Sự kiện `app:need-translate` cho phép LanguageSwitcher kích hoạt sớm.
 */
export default function GoogleTranslateScript() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Đã từng đổi ngôn ngữ trong phiên trước → nạp ngay
    try {
      const saved = localStorage.getItem('app_lang');
      if (saved && saved !== 'vi') { setEnabled(true); return; }
    } catch { /* localStorage bị chặn — bỏ qua */ }

    const turnOn = () => setEnabled(true);
    window.addEventListener('app:need-translate', turnOn, { once: true });

    // Nạp trễ khi trình duyệt rảnh, để không tranh băng thông lúc dựng trang
    const ric: typeof requestIdleCallback | undefined =
      typeof window !== 'undefined' ? (window as any).requestIdleCallback : undefined;
    const id = ric
      ? ric(turnOn, { timeout: 8000 })
      : window.setTimeout(turnOn, 6000);

    return () => {
      window.removeEventListener('app:need-translate', turnOn);
      if (ric && (window as any).cancelIdleCallback) (window as any).cancelIdleCallback(id);
      else clearTimeout(id as number);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'vi',
              includedLanguages: 'vi,en,zh-CN,fr,es,ja,ko,ru,de,pt,it,ar,hi',
              autoDisplay: false
            },
            'google_translate_element'
          );
        }
      } catch (err) {
        console.warn('Google Translate initialization:', err);
      }
    };
  }, [enabled]);

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none', position: 'absolute', top: '-9999px', left: '-9999px' }} />
      {enabled && (
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
