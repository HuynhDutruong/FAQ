'use client';
import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Language } from '@/lib/i18n/translations';
import { Globe, ChevronDown } from 'lucide-react';

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
  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <div style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center'
    }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: '5px 9px',
          borderRadius: '999px',
          backgroundColor: 'rgba(255, 255, 255, 0.16)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: '#FFFFFF',
          fontSize: '0.78rem',
          fontWeight: 800,
          letterSpacing: '0.04em',
          cursor: 'pointer'
        }}
      >
        <Globe size={14} style={{ opacity: 0.9 }} />
        <span style={{ textTransform: 'uppercase', lineHeight: 1 }}>
          {currentLang.code}
        </span>
        <ChevronDown size={12} style={{ opacity: 0.7 }} />

        {/* Native invisible select covering the whole pill */}
        <select
          value={lang}
          onChange={(e) => {
            // Báo cho GoogleTranslateScript nạp ngay thay vì chờ lúc rảnh
            if (e.target.value !== 'vi') {
              window.dispatchEvent(new Event('app:need-translate'));
            }
            setLang(e.target.value as Language);
          }}
          aria-label="Chọn ngôn ngữ"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {languages.map(item => (
            <option
              key={item.code}
              value={item.code}
              style={{
                backgroundColor: '#1E293B',
                color: '#FFFFFF',
                fontSize: '14px'
              }}
            >
              {item.code.toUpperCase()} — {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
