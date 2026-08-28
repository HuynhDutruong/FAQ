'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Type,
  Sun,
  Moon,
  Coffee,
  Bookmark,
  Share2,
  Check,
  Search,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Volume2
} from 'lucide-react';
import { BibleBookInfo, BibleChapterContent, BibleReaderSettings, BIBLE_BOOKS, getBibleBookArtwork } from '@/lib/bible';

interface BibleReaderProps {
  initialData: BibleChapterContent;
}

const DEFAULT_SETTINGS: BibleReaderSettings = {
  fontSize: 'md',
  fontFamily: 'serif',
  theme: 'light',
  lineHeight: 'relaxed'
};

export default function BibleReader({ initialData }: BibleReaderProps) {
  const router = useRouter();
  const [data, setData] = useState<BibleChapterContent>(initialData);
  const [settings, setSettings] = useState<BibleReaderSettings>(DEFAULT_SETTINGS);
  const [tocOpen, setTocOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchBookQuery, setSearchBookQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  // 1. Fetch live chapter data from API
  const fetchLiveChapter = async (bId: string, chNum: number) => {
    setIsLoadingApi(true);
    try {
      const res = await fetch(`/api/kinh-thanh?book=${encodeURIComponent(bId)}&chapter=${chNum}`);
      if (res.ok) {
        const json = await res.json();
        if (json.book && json.paragraphs) {
          setData(json);
        }
      }
    } catch (err) {
      console.warn('Lỗi khi tải dữ liệu chương:', err);
    } finally {
      setIsLoadingApi(false);
    }
  };

  useEffect(() => {
    setData(initialData);
    fetchLiveChapter(initialData.book.id, initialData.chapterNumber);
  }, [initialData.book.id, initialData.chapterNumber]);

  // 2. Load and save settings
  useEffect(() => {
    try {
      const stored = localStorage.getItem('bible_reader_settings');
      if (stored) setSettings(prev => ({ ...prev, ...JSON.parse(stored) }));
    } catch {}
  }, []);

  const updateSettings = (newSettings: Partial<BibleReaderSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('bible_reader_settings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // 3. Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      if (total > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (el.scrollTop / total) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 4. Filter Books for TOC Drawer
  const filteredBooks = useMemo(() => {
    if (!searchBookQuery.trim()) return BIBLE_BOOKS;
    const q = searchBookQuery.toLowerCase().trim();
    return BIBLE_BOOKS.filter(
      b => b.name.toLowerCase().includes(q) || b.shortName.toLowerCase().includes(q) || b.code.toLowerCase().includes(q)
    );
  }, [searchBookQuery]);

  // 5. Theme Styling
  const themeStyles = useMemo(() => {
    switch (settings.theme) {
      case 'sepia':
        return {
          bg: '#FBF0D9',
          color: '#382718',
          subtle: '#7C6752',
          cardBg: '#F4E4C1',
          border: 'rgba(124, 103, 82, 0.25)',
          headerBg: 'rgba(251, 240, 217, 0.95)',
          accent: '#9A3412',
          verseNum: '#B45309'
        };
      case 'dark':
        return {
          bg: '#0F172A',
          color: '#E2E8F0',
          subtle: '#94A3B8',
          cardBg: '#1E293B',
          border: 'rgba(148, 163, 184, 0.2)',
          headerBg: 'rgba(15, 23, 42, 0.95)',
          accent: '#EF4444',
          verseNum: '#F87171'
        };
      case 'light':
      default:
        return {
          bg: '#FFFFFF',
          color: '#1E293B',
          subtle: '#64748B',
          cardBg: '#F8FAFC',
          border: 'rgba(0, 0, 0, 0.08)',
          headerBg: 'rgba(255, 255, 255, 0.96)',
          accent: '#B71C1C',
          verseNum: '#DC2626'
        };
    }
  }, [settings.theme]);

  // Font Size
  const fontSizeStyle = useMemo(() => {
    switch (settings.fontSize) {
      case 'sm': return '1.02rem';
      case 'md': return '1.14rem';
      case 'lg': return '1.28rem';
      case 'xl': return '1.42rem';
      case '2xl': return '1.6rem';
      default: return '1.14rem';
    }
  }, [settings.fontSize]);

  const fontFamilyStyle = settings.fontFamily === 'serif'
    ? 'Georgia, Cambria, "Times New Roman", "Noto Serif", serif'
    : 'var(--font-be-vietnam-pro), var(--font-inter), system-ui, sans-serif';

  const artwork = useMemo(() => getBibleBookArtwork(data.book.id, data.book.group), [data.book.id, data.book.group]);

  // Share
  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `📖 ${data.title}\nBản dịch KTCGKPV - HĐGMVN\nĐọc tại: ${url}`;
    if (navigator.share) {
      try { await navigator.share({ title: data.title, text: shareText, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentBook = data.book;
  const currentChapter = data.chapterNumber;

  return (
    <div
      style={{
        backgroundColor: themeStyles.bg,
        color: themeStyles.color,
        minHeight: '100vh',
        fontFamily: fontFamilyStyle,
        transition: 'background-color 0.2s ease, color 0.2s ease'
      }}
    >
      {/* 1. PROGRESS BAR */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '3.5px',
          backgroundColor: themeStyles.accent,
          zIndex: 10001,
          transition: 'width 0.1s linear'
        }}
      />

      {/* 2. TOP READER CONTROLS HEADER */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 9999,
          backgroundColor: themeStyles.headerBg,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${themeStyles.border}`,
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px'
        }}
      >
        {/* Back Link to 73-book list */}
        <Link
          href="/kinh-thanh"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            color: themeStyles.color,
            fontSize: '0.84rem',
            fontWeight: 700,
            padding: '6px 10px',
            borderRadius: '8px',
            backgroundColor: themeStyles.cardBg,
            border: `1px solid ${themeStyles.border}`,
            flexShrink: 0
          }}
        >
          <ArrowLeft size={15} />
          <span className="hide-mobile">73 Sách</span>
        </Link>

        {/* Center: Current Book & Chapter Navigator */}
        <div style={{ textAlign: 'center', minWidth: 0, flex: 1, padding: '0 6px' }}>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            color: themeStyles.subtle,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {currentBook.testament === 'old' ? 'Cựu Ước' : 'Tân Ước'} · {currentBook.groupLabel} [{currentBook.code}]
          </div>
          <div style={{
            fontSize: '0.92rem',
            fontWeight: 900,
            color: themeStyles.color,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {currentBook.name} — Chương {currentChapter}
          </div>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {/* Reader Settings Popover */}
          <button
            type="button"
            onClick={() => setSettingsOpen(prev => !prev)}
            title="Tùy chỉnh cỡ chữ & màu nền"
            style={{
              padding: '7px 10px',
              borderRadius: '8px',
              border: `1px solid ${themeStyles.border}`,
              backgroundColor: settingsOpen ? themeStyles.accent : themeStyles.cardBg,
              color: settingsOpen ? '#FFFFFF' : themeStyles.color,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8rem',
              fontWeight: 700
            }}
          >
            <Type size={15} />
            <span className="hide-mobile">Aa</span>
          </button>

          {/* TOC Drawer Button (73 Books & Chapters) */}
          <button
            type="button"
            onClick={() => setTocOpen(true)}
            title="Danh sách 73 Sách Kinh Thánh"
            style={{
              padding: '7px 10px',
              borderRadius: '8px',
              border: `1px solid ${themeStyles.border}`,
              backgroundColor: themeStyles.cardBg,
              color: themeStyles.color,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.8rem',
              fontWeight: 700
            }}
          >
            <Menu size={15} />
            <span className="hide-mobile">{currentChapter}/{currentBook.totalChapters}</span>
          </button>
        </div>
      </header>

      {/* 3. SETTINGS POPOVER */}
      {settingsOpen && (
        <div
          style={{
            position: 'fixed',
            top: '56px',
            right: '16px',
            zIndex: 9998,
            width: '290px',
            backgroundColor: themeStyles.cardBg,
            border: `1px solid ${themeStyles.border}`,
            borderRadius: '14px',
            padding: '16px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 800 }}>Tùy Chỉnh Trình Đọc</span>
            <button onClick={() => setSettingsOpen(false)} style={{ background: 'none', border: 'none', color: themeStyles.subtle, cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>

          {/* Theme */}
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: themeStyles.subtle, marginBottom: '6px' }}>MÀU NỀN TRANG ĐỌC</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              <button
                type="button"
                onClick={() => updateSettings({ theme: 'light' })}
                style={{
                  padding: '8px 4px',
                  borderRadius: '8px',
                  border: `2px solid ${settings.theme === 'light' ? '#B71C1C' : 'rgba(0,0,0,0.1)'}`,
                  backgroundColor: '#FFFFFF',
                  color: '#1E293B',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Sun size={15} />
                <span>Sáng</span>
              </button>

              <button
                type="button"
                onClick={() => updateSettings({ theme: 'sepia' })}
                style={{
                  padding: '8px 4px',
                  borderRadius: '8px',
                  border: `2px solid ${settings.theme === 'sepia' ? '#9A3412' : 'rgba(0,0,0,0.1)'}`,
                  backgroundColor: '#FBF0D9',
                  color: '#382718',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Coffee size={15} />
                <span>Giấy Cũ</span>
              </button>

              <button
                type="button"
                onClick={() => updateSettings({ theme: 'dark' })}
                style={{
                  padding: '8px 4px',
                  borderRadius: '8px',
                  border: `2px solid ${settings.theme === 'dark' ? '#EF4444' : 'rgba(255,255,255,0.2)'}`,
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Moon size={15} />
                <span>Ban Đêm</span>
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontWeight: 700, color: themeStyles.subtle, marginBottom: '6px' }}>
              <span>CỠ CHỮ</span>
              <span style={{ textTransform: 'uppercase' }}>{settings.fontSize}</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: themeStyles.bg, padding: '4px', borderRadius: '8px', border: `1px solid ${themeStyles.border}` }}>
              {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => updateSettings({ fontSize: size })}
                  style={{
                    flex: 1,
                    padding: '6px 0',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: settings.fontSize === size ? themeStyles.accent : 'transparent',
                    color: settings.fontSize === size ? '#FFFFFF' : themeStyles.color,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {size === 'sm' ? 'A-' : size === 'md' ? 'A' : size === 'lg' ? 'A+' : size === 'xl' ? 'A++' : 'Max'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. TABLE OF CONTENTS DRAWER (73 SÁCH & CHƯƠNG) */}
      {tocOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'flex-start'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setTocOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '380px',
              height: '100%',
              backgroundColor: themeStyles.cardBg,
              color: themeStyles.color,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '16px 18px', borderBottom: `1px solid ${themeStyles.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>73 Sách Kinh Thánh</h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.74rem', color: themeStyles.subtle }}>
                  Đang đọc: {currentBook.name} (Chương {currentChapter})
                </p>
              </div>
              <button onClick={() => setTocOpen(false)} style={{ background: 'none', border: 'none', color: themeStyles.subtle, cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Search */}
            <div style={{ padding: '10px 18px', borderBottom: `1px solid ${themeStyles.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', borderRadius: '8px', backgroundColor: themeStyles.bg, border: `1px solid ${themeStyles.border}` }}>
                <Search size={14} style={{ color: themeStyles.subtle }} />
                <input
                  type="text"
                  value={searchBookQuery}
                  onChange={(e) => setSearchBookQuery(e.target.value)}
                  placeholder="Tìm tên sách (St, Mt, Tv)..."
                  style={{ border: 'none', background: 'none', outline: 'none', fontSize: '0.84rem', color: themeStyles.color, width: '100%' }}
                />
              </div>
            </div>

            {/* Current Book Chapter Jump List */}
            <div style={{ padding: '12px 18px', borderBottom: `1px solid ${themeStyles.border}`, backgroundColor: 'rgba(183, 28, 28, 0.05)' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: themeStyles.accent, marginBottom: '8px' }}>
                CÁC CHƯƠNG CỦA {currentBook.name.toUpperCase()} ({currentBook.totalChapters} CHƯƠNG):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '110px', overflowY: 'auto' }}>
                {Array.from({ length: currentBook.totalChapters }, (_, i) => i + 1).map(ch => (
                  <Link
                    key={ch}
                    href={`/kinh-thanh/${currentBook.id}/${ch}`}
                    onClick={() => setTocOpen(false)}
                    style={{
                      padding: '4px 9px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      backgroundColor: ch === currentChapter ? themeStyles.accent : themeStyles.bg,
                      color: ch === currentChapter ? '#FFFFFF' : themeStyles.color,
                      border: `1px solid ${themeStyles.border}`
                    }}
                  >
                    {ch}
                  </Link>
                ))}
              </div>
            </div>

            {/* All 73 Books List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
              {filteredBooks.map(b => {
                const isActive = b.id === currentBook.id;
                return (
                  <Link
                    key={b.id}
                    href={`/kinh-thanh/${b.id}/1`}
                    onClick={() => setTocOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: isActive ? themeStyles.accent : themeStyles.color,
                      backgroundColor: isActive ? 'rgba(183, 28, 28, 0.12)' : 'transparent',
                      fontWeight: isActive ? 800 : 500,
                      marginBottom: '2px'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.86rem' }}>{b.name}</div>
                      <div style={{ fontSize: '0.72rem', color: themeStyles.subtle }}>
                        {b.testament === 'old' ? 'Cựu Ước' : 'Tân Ước'} · [{b.code}] · {b.totalChapters} Chương
                      </div>
                    </div>
                    <ChevronRight size={14} style={{ opacity: 0.5 }} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MAIN NATIVE READER VIEW (PURE TEXT WITH SACRED ARTWORK & SOURCE CREDIT) */}
      {/* ========================================================================= */}
      <main
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          padding: '24px 16px 72px',
          lineHeight: settings.lineHeight === 'loose' ? 2 : settings.lineHeight === 'relaxed' ? 1.85 : 1.65,
          fontSize: fontSizeStyle,
          fontFamily: fontFamilyStyle
        }}
      >
        {/* Sacred Renaissance Artwork Illustration Banner */}
        {artwork && (
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '28px',
              border: `1px solid ${themeStyles.border}`,
              backgroundColor: themeStyles.cardBg,
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
            }}
          >
            {/* Full Image Container */}
            <div
              style={{
                width: '100%',
                backgroundColor: '#0B0F19',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                maxHeight: '360px'
              }}
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '360px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>

            {/* Caption & Description Box */}
            <div
              style={{
                padding: '14px 18px',
                backgroundColor: themeStyles.cardBg,
                borderTop: `1px solid ${themeStyles.border}`
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginBottom: '4px'
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(183, 28, 28, 0.1)',
                    color: 'var(--color-red)'
                  }}
                >
                  <Sparkles size={11} /> TRANH MINH HỌA PHỤC HƯNG
                </div>
                <div style={{ fontSize: '0.74rem', opacity: 0.85 }}>
                  Họa sĩ: <strong>{artwork.artist}</strong> {artwork.year ? `• ${artwork.year}` : ''}
                </div>
              </div>

              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: themeStyles.color,
                  lineHeight: 1.3,
                  marginTop: '4px'
                }}
              >
                {artwork.title}
              </div>

              {artwork.description && (
                <div
                  style={{
                    fontSize: '0.82rem',
                    opacity: 0.85,
                    lineHeight: 1.5,
                    marginTop: '6px'
                  }}
                >
                  {artwork.description}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chapter Header */}
        <div style={{
          textAlign: 'center',
          paddingBottom: '20px',
          marginBottom: '28px',
          borderBottom: `2px solid ${themeStyles.border}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '3px 10px',
              borderRadius: '20px',
              backgroundColor: currentBook.testament === 'new' ? 'rgba(30, 58, 138, 0.12)' : 'rgba(153, 27, 27, 0.12)',
              color: currentBook.testament === 'new' ? '#1E3A8A' : '#991B1B'
            }}>
              {currentBook.testament === 'old' ? 'Cựu Ước' : 'Tân Ước'} · {currentBook.groupLabel}
            </span>
          </div>

          <h1 style={{
            margin: '0 0 6px',
            fontSize: 'clamp(1.4rem, 3.5vw, 2.1rem)',
            fontWeight: 900,
            lineHeight: 1.25,
            color: themeStyles.color,
            fontFamily: 'Georgia, serif'
          }}>
            {currentBook.name}
          </h1>

          <div style={{
            fontSize: '1.08rem',
            fontWeight: 800,
            color: themeStyles.accent,
            marginBottom: '6px'
          }}>
            Chương {currentChapter}
          </div>

          {data.heading && (
            <div style={{
              fontSize: '0.98rem',
              fontWeight: 800,
              color: themeStyles.color,
              marginTop: '8px',
              textTransform: 'uppercase'
            }}>
              {data.heading}
            </div>
          )}

          {data.subheading && (
            <p style={{
              margin: '4px auto 0',
              maxWidth: '640px',
              fontSize: '0.92rem',
              fontStyle: 'italic',
              color: themeStyles.subtle
            }}>
              {data.subheading}
            </p>
          )}

          {/* Quick Chapter Navigation Pill Bar */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: `1px dashed ${themeStyles.border}` }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              fontSize: '0.78rem',
              color: themeStyles.subtle,
              fontWeight: 700
            }}>
              <span>CHUYỂN NHANH CHƯƠNG ({currentBook.totalChapters} CHƯƠNG):</span>
              <Link
                href={`/kinh-thanh/${currentBook.id}`}
                style={{
                  color: themeStyles.accent,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                <span>Xem mục lục</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                overflowX: 'auto',
                paddingBottom: '8px',
                scrollbarWidth: 'thin'
              }}
            >
              {Array.from({ length: currentBook.totalChapters }, (_, i) => i + 1).map((ch) => {
                const isActive = ch === currentChapter;
                return (
                  <Link
                    key={ch}
                    href={`/kinh-thanh/${currentBook.id}/${ch}`}
                    style={{
                      flexShrink: 0,
                      minWidth: '38px',
                      height: '36px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      backgroundColor: isActive ? themeStyles.accent : themeStyles.cardBg,
                      color: isActive ? '#FFFFFF' : themeStyles.color,
                      border: `1px solid ${isActive ? themeStyles.accent : themeStyles.border}`,
                      fontSize: '0.86rem',
                      fontWeight: isActive ? 900 : 700,
                      textDecoration: 'none',
                      boxShadow: isActive ? '0 2px 8px rgba(183, 28, 28, 0.3)' : 'none'
                    }}
                  >
                    {ch}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chapter Verses / Paragraphs Body */}
        <article style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {data.verses && data.verses.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {data.verses.map((v) => (
                <p key={v.number} style={{ margin: 0, textAlign: 'justify', textJustify: 'inter-word' }}>
                  <sup
                    style={{
                      color: themeStyles.verseNum,
                      fontWeight: 900,
                      fontSize: '0.78em',
                      marginRight: '6px',
                      userSelect: 'none'
                    }}
                  >
                    {v.number}
                  </sup>
                  {v.text}
                </p>
              ))}
            </div>
          ) : (
            data.paragraphs.map((p, idx) => (
              <p key={idx} style={{ margin: 0, textAlign: 'justify', textJustify: 'inter-word' }}>
                {p}
              </p>
            ))
          )}
        </article>

        {/* Subtle Italicized Source Attribution Note (Non-clickable, Small & Muted) */}
        <div
          style={{
            marginTop: '36px',
            padding: '14px 0 20px',
            textAlign: 'center',
            fontSize: '0.74rem',
            fontStyle: 'italic',
            color: themeStyles.subtle,
            opacity: 0.7,
            lineHeight: 1.55,
            borderTop: `1px dashed ${themeStyles.border}`
          }}
        >
          * Nguồn trích lục bản văn Kinh Thánh: augustino.net — Bản dịch Nhóm Phiên Dịch Các Giờ Kinh Phụng Vụ (KTCGKPV) &amp; Hội Đồng Giám Mục Việt Nam.
        </div>

        {/* Bottom Navigation */}
        <div style={{
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: `1px solid ${themeStyles.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: themeStyles.subtle, fontWeight: 600 }}>
              Đã đọc xong {currentBook.shortName} {currentChapter} · Bản dịch KTCGKPV
            </span>

            <button
              type="button"
              onClick={handleShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: `1px solid ${themeStyles.border}`,
                backgroundColor: themeStyles.cardBg,
                color: themeStyles.color,
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={14} color="#16A34A" /> : <Share2 size={14} />}
              <span>{copied ? 'Đã sao chép' : 'Chia sẻ chương'}</span>
            </button>
          </div>

          {/* Prev / Next Chapter Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: data.prevChapter && data.nextChapter ? '1fr 1fr' : '1fr',
            gap: '12px'
          }}>
            {data.prevChapter && (
              <Link
                href={`/kinh-thanh/${data.prevChapter.bookId}/${data.prevChapter.chapter}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  backgroundColor: themeStyles.cardBg,
                  border: `1px solid ${themeStyles.border}`,
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', fontWeight: 800, color: themeStyles.subtle, textTransform: 'uppercase' }}>
                  <ChevronLeft size={14} /> Chương trước
                </span>
                <span style={{ fontSize: '0.92rem', fontWeight: 800 }}>
                  Chương {data.prevChapter.chapter}
                </span>
              </Link>
            )}

            {data.nextChapter && (
              <Link
                href={`/kinh-thanh/${data.nextChapter.bookId}/${data.nextChapter.chapter}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  backgroundColor: themeStyles.cardBg,
                  border: `1px solid ${themeStyles.border}`,
                  textDecoration: 'none',
                  color: 'inherit',
                  textAlign: 'right'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', fontWeight: 800, color: themeStyles.accent, textTransform: 'uppercase' }}>
                  Chương tiếp theo <ChevronRight size={14} />
                </span>
                <span style={{ fontSize: '0.92rem', fontWeight: 800 }}>
                  Chương {data.nextChapter.chapter}
                </span>
              </Link>
            )}
          </div>

          {/* Book All Chapters Button */}
          <Link
            href={`/kinh-thanh/${currentBook.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: themeStyles.cardBg,
              border: `1px solid ${themeStyles.border}`,
              color: themeStyles.accent,
              fontSize: '0.86rem',
              fontWeight: 800,
              textDecoration: 'none',
              textAlign: 'center'
            }}
          >
            <BookOpen size={16} />
            <span>Xem Toàn Bộ Mục Lục {currentBook.name} ({currentBook.totalChapters} Chương)</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
