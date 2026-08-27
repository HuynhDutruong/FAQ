'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from './translations';

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.vi;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('vi');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Đọc từ pathname (Ví dụ: /en, /zh/gio-le)
    const pathname = window.location.pathname;
    const pathLangMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
    
    // 2. Đọc từ query param do Middleware gửi về (?lang=en)
    const urlParams = new URLSearchParams(window.location.search);
    const queryLang = urlParams.get('lang');
    
    const storedLang = localStorage.getItem('app_lang') as Language;
    
    let initialLang: Language = 'vi'; // Mặc định là Tiếng Việt
    
    if (pathLangMatch && Object.keys(translations).includes(pathLangMatch[1])) {
      initialLang = pathLangMatch[1] as Language;
    } else if (queryLang && Object.keys(translations).includes(queryLang)) {
      initialLang = queryLang as Language;
    } else if (storedLang && Object.keys(translations).includes(storedLang)) {
      initialLang = storedLang;
    }

    setLangState(initialLang);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = lang;
      document.documentElement.setAttribute('data-lang', lang);
    }
  }, [lang, mounted]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('app_lang', newLang);
    
    // Cập nhật URL trình duyệt (chèn locale vào path)
    const pathname = window.location.pathname;
    const pathLangMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
    
    let newPathname = pathname;
    if (pathLangMatch) {
      // Thay thế locale cũ bằng locale mới
      newPathname = pathname.replace(/^\/[a-z]{2}/, `/${newLang}`);
    } else {
      // Thêm locale mới vào đầu chuỗi
      newPathname = `/${newLang}${pathname === '/' ? '' : pathname}`;
    }
    
    // Xoá tham số ?lang dư thừa nếu có trên URL bar (để trông sạch hơn)
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('lang');
    const newSearch = urlParams.toString() ? `?${urlParams.toString()}` : '';
    
    window.history.pushState(null, '', newPathname + newSearch);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div style={{ visibility: mounted ? 'visible' : 'hidden', display: 'contents' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
