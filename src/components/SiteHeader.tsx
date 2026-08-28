'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  Church,
  Clock,
  Heart,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import OmniSearch from './OmniSearch';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function SiteHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const navContainerRef = useRef<HTMLDivElement>(null);

  if (pathname.startsWith('/admin')) return null;

  const NAV = [
    { href: '/', label: t.navHome || 'Trang Chủ', icon: <Home size={14} /> },
    { href: '/kinh-thanh', label: 'Kinh Thánh', icon: <BookOpen size={14} /> },
    { href: '/gioi-thieu', label: t.navIntro || 'Giới Thiệu', icon: <Church size={14} /> },
    { href: '/gio-le', label: t.navMassTimes || 'Giờ Lễ', icon: <Clock size={14} /> },
    { href: '/kinh-nguyen', label: t.navPrayers || 'Kinh Nguyện', icon: <Heart size={14} /> },
    { href: '/van-dap', label: t.navFAQ || 'Vấn Đáp', icon: <HelpCircle size={14} /> }
  ];

  // Auto scroll active tab into view on mobile
  useEffect(() => {
    if (!navContainerRef.current) return;
    const activeEl = navContainerRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [pathname]);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 999, width: '100%' }}>
      {/* ========================================================================= */}
      {/* 1. TOP BRAND HEADER (SẮC NÉT, TINH TẾ TRÊN CẢ MOBILE & DESKTOP) */}
      {/* ========================================================================= */}
      <div
        style={{
          background: 'linear-gradient(135deg, #B71C1C 0%, #881313 100%)',
          color: '#FFFFFF',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
        }}
      >
        <div
          style={{
            maxWidth: '1060px',
            margin: '0 auto',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}
        >
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
            <span
              style={{
                position: 'relative',
                width: '32px',
                height: '32px',
                flexShrink: 0,
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#FFFFFF',
                border: '1.5px solid rgba(253, 230, 138, 0.8)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.25)'
              }}
            >
              <Image src="/logo.jpg" alt="Logo TNTT" fill sizes="32px" style={{ objectFit: 'contain' }} priority />
            </span>

            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: 'clamp(0.78rem, 2.8vw, 0.94rem)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.01em',
                  lineHeight: 1.15,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {t.headerChapter || 'Xứ Đoàn TNTT Chánh Tòa'}
              </span>
              <span
                style={{
                  fontSize: '0.66rem',
                  opacity: 0.88,
                  lineHeight: 1.2,
                  marginTop: '1px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {t.headerCathedral || 'Giáo Xứ Chánh Tòa — Gp. Mỹ Tho'}
              </span>
            </span>
          </Link>

          {/* Right Action Icons: Search & Language */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            {/* Universal Liquid Glass Search */}
            <OmniSearch />

            {/* Language Pill */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. RESPONSIVE LIQUID GLASS NAVIGATION BAR */}
      {/* ========================================================================= */}
      <nav
        style={{
          width: '100%',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backgroundColor: 'var(--color-nav-glass)',
          borderBottom: '1px solid var(--color-nav-border)',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden'
        }}
      >
        <div
          ref={navContainerRef}
          className="site-nav-scrollbar"
          style={{
            maxWidth: '1060px',
            margin: '0 auto',
            padding: '4px 6px',
            display: 'flex',
            alignItems: 'center',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {NAV.map(item => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                className={`site-nav-link ${active ? 'active' : ''}`}
                style={{
                  flex: '0 0 auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  padding: '7px 13px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: active ? 800 : 600,
                  whiteSpace: 'nowrap',
                  color: active ? '#FFFFFF' : 'var(--color-nav-text)',
                  backgroundColor: active ? 'var(--color-red)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                  userSelect: 'none',
                  margin: '0 2px'
                }}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <style jsx global>{`
        .site-nav-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 768px) {
          .site-nav-scrollbar {
            display: grid !important;
            grid-template-columns: repeat(6, 1fr) !important;
            padding: 0 4px !important;
          }
          .site-nav-link {
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 9px 4px !important;
            color: var(--color-nav-text) !important;
            background-color: transparent !important;
            border-bottom: 2.5px solid transparent !important;
          }
          .site-nav-link.active {
            color: var(--color-nav-active-text) !important;
            background-color: var(--color-nav-active-bg) !important;
            border-bottom: 2.5px solid var(--color-nav-active-bar) !important;
          }
        }
      `}</style>
    </header>
  );
}
