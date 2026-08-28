'use client';
import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{
      width: '100%',
      padding: '12px 24px',
      marginTop: 'auto',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
      fontSize: '0.8rem',
      color: 'var(--color-dark)',
      opacity: 0.8
    }}>
      <div style={{ fontWeight: '500' }}>
        &copy; {new Date().getFullYear()} {t.footerCopyright}
      </div>
      
      <div style={{ display: 'none', margin: '0 8px', opacity: 0.5 }} className="separator">|</div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span>{t.footerBy}</span>
        <a 
          href="https://www.hugowishpax.studio" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            textDecoration: 'none',
            fontWeight: '900',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            padding: '4px 8px',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ color: 'var(--color-dark)' }}>Hugo Studio</span>
          <span style={{ color: 'var(--color-red)', fontSize: '20px', lineHeight: 0, marginTop: '2px' }}>•</span>
        </a>
      </div>
    </footer>
  );
}
