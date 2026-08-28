'use client';
import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Language } from '@/lib/i18n/translations';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      borderRadius: '20px',
    }} className="liquid-glass">
      <Globe size={18} />
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value as Language)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'inherit',
          fontSize: '14px',
          fontWeight: 'bold',
          outline: 'none',
          cursor: 'pointer'
        }}
      >
        <option value="vi">VN</option>
        <option value="en">EN</option>
        <option value="zh">ZH</option>
        <option value="fr">FR</option>
        <option value="es">ES</option>
        <option value="ja">JA</option>
        <option value="ko">KO</option>
        <option value="ru">RU</option>
        <option value="de">DE</option>
        <option value="pt">PT</option>
        <option value="it">IT</option>
        <option value="ar">AR</option>
        <option value="hi">HI</option>
      </select>
    </div>
  );
}
