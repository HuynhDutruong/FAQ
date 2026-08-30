'use client';
import React, { createContext, useContext, useState, useEffect, useSyncExternalStore } from 'react';
import { Language, LANGUAGES, vi, loadDictionary, type Dictionary } from './translations';

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'vi';
  const pathname = window.location.pathname;
  const pathLangMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
  const urlParams = new URLSearchParams(window.location.search);
  const queryLang = urlParams.get('lang');
  const storedLang = localStorage.getItem('app_lang') as Language;

  if (pathLangMatch && LANGUAGES.includes(pathLangMatch[1] as Language)) {
    return pathLangMatch[1] as Language;
  } else if (queryLang && LANGUAGES.includes(queryLang as Language)) {
    return queryLang as Language;
  } else if (storedLang && LANGUAGES.includes(storedLang)) {
    return storedLang;
  }
  return 'vi';
}

const emptySubscribe = () => () => {};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const detectedLang = useSyncExternalStore(
    emptySubscribe,
    detectLanguage,
    () => 'vi' as Language
  );
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [langOverride, setLangOverride] = useState<Language | null>(null);
  const lang = langOverride ?? detectedLang;

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = lang;
      document.documentElement.setAttribute('data-lang', lang);

      const googleLang = lang === 'zh' ? 'zh-CN' : lang;
      if (lang === 'vi') {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      } else {
        const val = `/vi/${googleLang}`;
        document.cookie = `googtrans=${val}; path=/;`;
        document.cookie = `googtrans=${val}; path=/; domain=.${window.location.hostname};`;
        document.cookie = `googtrans=${val}; path=/; domain=${window.location.hostname};`;
      }

      try {
        const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (selectEl && selectEl.value !== googleLang) {
          selectEl.value = googleLang;
          selectEl.dispatchEvent(new Event('change'));
        }
      } catch {}
    }
  }, [lang, mounted]);

  const setLang = (newLang: Language) => {
    setLangOverride(newLang);
    localStorage.setItem('app_lang', newLang);

    const googleLang = newLang === 'zh' ? 'zh-CN' : newLang;
    if (newLang === 'vi') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    } else {
      const val = `/vi/${googleLang}`;
      document.cookie = `googtrans=${val}; path=/;`;
      document.cookie = `googtrans=${val}; path=/; domain=.${window.location.hostname};`;
      document.cookie = `googtrans=${val}; path=/; domain=${window.location.hostname};`;
    }

    try {
      const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectEl) {
        selectEl.value = googleLang;
        selectEl.dispatchEvent(new Event('change'));
      }
    } catch {}
    
    // Cập nhật URL trình duyệt (chèn locale vào path)
    const pathname = window.location.pathname;
    const pathLangMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
    
    let newPathname = pathname;
    if (pathLangMatch) {
      newPathname = pathname.replace(/^\/[a-z]{2}/, `/${newLang}`);
    } else {
      newPathname = `/${newLang}${pathname === '/' ? '' : pathname}`;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('lang');
    const newSearch = urlParams.toString() ? `?${urlParams.toString()}` : '';
    
    window.history.pushState(null, '', newPathname + newSearch);
  };

  // Bộ chuỗi của ngôn ngữ khác tiếng Việt được nạp động; trong lúc chờ vẫn
  // hiển thị tiếng Việt thay vì để trống.
  const [dict, setDict] = useState<Partial<Dictionary>>({});
  useEffect(() => {
    if (lang === 'vi') { setDict({}); return; }
    let cancelled = false;
    loadDictionary(lang).then((d) => { if (!cancelled) setDict(d); });
    return () => { cancelled = true; };
  }, [lang]);

  const t = { ...vi, ...dict } as Dictionary;

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
