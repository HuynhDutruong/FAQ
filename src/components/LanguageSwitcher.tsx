'use client';
import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Language } from '@/lib/i18n/translations';
import { Globe } from 'lucide-react';

const languages: { code: Language; label: string }[] = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'ru', label: 'Русский' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
  { code: 'it', label: 'Italiano' },
  { code: 'ar', label: 'العربية' },
  { code: 'hi', label: 'हिन्दी' }
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div style={{
      position: 'absolute',
      top: '18px',
      right: '18px',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '7px 12px',
      borderRadius: '999px',
      color: 'var(--color-dark)'
    }} className="liquid-glass">
      <Globe size={16} />
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value as Language)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--color-dark)',
          fontSize: '13px',
          fontWeight: 700,
          outline: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit'
        }}
      >
        {languages.map(item => (
          <option
            key={item.code}
            value={item.code}
            style={{
              backgroundColor: 'var(--color-modal-bg)',
              color: 'var(--color-dark)'
            }}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
