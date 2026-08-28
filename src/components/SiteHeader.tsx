'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import OmniSearch from './OmniSearch';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function SiteHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname.startsWith('/admin')) return null;

  const NAV = [
    { href: '/', label: t.navHome || 'Trang Chủ' },
    { href: '/thu-vien', label: t.navLibrary || 'Thư Viện' },
    { href: '/gioi-thieu', label: t.navIntro || 'Giới Thiệu' },
    { href: '/gio-le', label: t.navMassTimes || 'Giờ Lễ' },
    { href: '/kinh-nguyen', label: t.navPrayers || 'Kinh Nguyện' },
    { href: '/van-dap', label: t.navFAQ || 'Vấn Đáp' }
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 999, width: '100%' }}>
      {/* 1. TOP BRAND HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #B71C1C 0%, #881313 100%)',
        color: '#FFFFFF',
        borderBottom: '1px solid rgba(0,0,0,0.12)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
      }}>
        <div style={{
          maxWidth: '1060px',
          margin: '0 auto',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          {/* Logo & Entity Name */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minWidth: 0,
              flex: 1,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <span style={{
              position: 'relative',
              width: '28px',
              height: '28px',
              flexShrink: 0,
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#FFFFFF',
              border: '1.5px solid rgba(253, 230, 138, 0.7)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
            }}>
              <Image src="/logo.jpg" alt="Logo" fill sizes="28px" style={{ objectFit: 'contain' }} priority />
            </span>

            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontSize: 'clamp(0.76rem, 2.5vw, 0.92rem)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {t.headerChapter || 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam'}
              </span>
              <span style={{
                fontSize: '0.64rem',
                opacity: 0.85,
                lineHeight: 1.2,
                marginTop: '1px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {t.headerCathedral || 'Giáo Xứ Chánh Tòa — Giáo Phận Mỹ Tho'}
              </span>
            </span>
          </Link>

          {/* Liquid Glass Universal Search Button */}
          <div style={{ flexShrink: 0 }}>
            <OmniSearch />
          </div>

          {/* International Language Switcher Pill */}
          <div style={{ flexShrink: 0 }}>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* 2. LIQUID GLASS FIXED TAB-BAR (TỰ ĐỘNG ĐỒNG BỘ DARK / LIGHT MODE) */}
      <nav
        style={{
          width: '100%',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backgroundColor: 'var(--color-nav-glass)',
          borderBottom: '1px solid var(--color-nav-border)',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div style={{
          maxWidth: '1060px',
          margin: '0 auto',
          padding: '0 4px',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          alignItems: 'stretch'
        }}>
          {NAV.map(item => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '9px 2px',
                  fontSize: 'clamp(0.72rem, 2.7vw, 0.86rem)',
                  fontWeight: active ? 800 : 600,
                  whiteSpace: 'nowrap',
                  color: active ? 'var(--color-nav-active-text)' : 'var(--color-nav-text)',
                  backgroundColor: active ? 'var(--color-nav-active-bg)' : 'transparent',
                  borderBottom: active ? '2.5px solid var(--color-nav-active-bar)' : '2.5px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
