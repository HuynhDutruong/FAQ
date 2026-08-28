'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Sliders,
  Sparkles
} from 'lucide-react';
import { Book, BookChapter, ReaderSettings, ReadingProgress } from '@/lib/library/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface BookReaderProps {
  book: Book;
  chapter: BookChapter;
  prevChapter?: BookChapter;
  nextChapter?: BookChapter;
}

const DEFAULT_SETTINGS: ReaderSettings = {
  fontSize: 'md',
  fontFamily: 'serif',
  theme: 'light',
  lineHeight: 'relaxed'
};

export default function BookReader({ book, chapter, prevChapter, nextChapter }: BookReaderProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [settings, setSettings] = useState<ReaderSettings>(DEFAULT_SETTINGS);
  const [tocOpen, setTocOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchChapterQuery, setSearchChapterQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load user reader settings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ebook_reader_settings');
      if (stored) {
        setSettings(prev => ({ ...prev, ...JSON.parse(stored) }));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save settings when changed
  const updateSettings = (newSettings: Partial<ReaderSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('ebook_reader_settings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Track and save reading progress for this book
  useEffect(() => {
    const saveProgress = (percentage: number) => {
      try {
        const progress: ReadingProgress = {
          bookId: book.id,
          chapterId: chapter.id,
          chapterNumber: chapter.number,
          percentage: Math.round(percentage),
          lastReadAt: new Date().toISOString()
        };
        localStorage.setItem(`reading_progress_${book.id}`, JSON.stringify(progress));
      } catch {}
    };

    const handleScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      if (total > 0) {
        const p = Math.min(100, Math.max(0, (el.scrollTop / total) * 100));
        setScrollProgress(p);
        saveProgress(p);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Check if bookmarked
    try {
      const bookmarks = JSON.parse(localStorage.getItem('ebook_bookmarks') || '[]');
      setBookmarked(bookmarks.some((b: any) => b.bookId === book.id && b.chapterId === chapter.id));
    } catch {}

    return () => window.removeEventListener('scroll', handleScroll);
  }, [book.id, chapter.id, chapter.number]);

  // Toggle Bookmark
  const toggleBookmark = () => {
    try {
      let bookmarks = JSON.parse(localStorage.getItem('ebook_bookmarks') || '[]');
      if (bookmarked) {
        bookmarks = bookmarks.filter((b: any) => !(b.bookId === book.id && b.chapterId === chapter.id));
        setBookmarked(false);
      } else {
        bookmarks.push({
          bookId: book.id,
          bookTitle: book.title,
          chapterId: chapter.id,
          chapterNumber: chapter.number,
          chapterTitle: chapter.title,
          savedAt: new Date().toISOString()
        });
        setBookmarked(true);
      }
      localStorage.setItem('ebook_bookmarks', JSON.stringify(bookmarks));
    } catch {}
  };

  // Copy or Share Chapter
  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `📖 ${book.title}\n📜 ${chapter.title}\n\nĐọc sách tại: ${url}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: chapter.title, text: shareText, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Filter chapters in Table of Contents drawer
  const filteredChapters = useMemo(() => {
    if (!searchChapterQuery.trim()) return book.chapters;
    const q = searchChapterQuery.toLowerCase();
    return book.chapters.filter(
      c => c.title.toLowerCase().includes(q) || (c.subtitle && c.subtitle.toLowerCase().includes(q))
    );
  }, [book.chapters, searchChapterQuery]);

  // Theme Styles
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
          accent: '#9A3412'
        };
      case 'dark':
        return {
          bg: '#0F172A',
          color: '#E2E8F0',
          subtle: '#94A3B8',
          cardBg: '#1E293B',
          border: 'rgba(148, 163, 184, 0.2)',
          headerBg: 'rgba(15, 23, 42, 0.95)',
          accent: '#EF4444'
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
          accent: '#B71C1C'
        };
    }
  }, [settings.theme]);

  // Font Size in Rem
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

  // Font Family String
  const fontFamilyStyle = settings.fontFamily === 'serif'
    ? 'Georgia, Cambria, "Times New Roman", "Noto Serif", serif'
    : 'var(--font-be-vietnam-pro), var(--font-inter), system-ui, sans-serif';

  return (
    <div
      style={{
        backgroundColor: themeStyles.bg,
        color: themeStyles.color,
        minHeight: '100vh',
        transition: 'background-color 0.2s ease, color 0.2s ease',
        fontFamily: fontFamilyStyle
      }}
    >
      {/* 1. SCROLL PROGRESS BAR (STICKY TOP) */}
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
        {/* Back Link */}
        <Link
          href={`/thu-vien/${book.id}`}
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
          <span className="hide-mobile">Mục lục sách</span>
        </Link>

        {/* Center Title Info */}
        <div style={{ textAlign: 'center', minWidth: 0, flex: 1, padding: '0 8px' }}>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: themeStyles.subtle,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {book.title}
          </div>
          <div style={{
            fontSize: '0.88rem',
            fontWeight: 800,
            color: themeStyles.color,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            Chương {chapter.number}: {chapter.title.replace(/^Chương \d+:\s*/i, '')}
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {/* Bookmark Button */}
          <button
            type="button"
            onClick={toggleBookmark}
            title={bookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu trang'}
            style={{
              padding: '7px',
              borderRadius: '8px',
              border: `1px solid ${themeStyles.border}`,
              backgroundColor: bookmarked ? 'rgba(220, 38, 38, 0.15)' : themeStyles.cardBg,
              color: bookmarked ? '#DC2626' : themeStyles.color,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Bookmark size={16} fill={bookmarked ? '#DC2626' : 'none'} />
          </button>

          {/* Reader Settings Button */}
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
            <Type size={16} />
            <span className="hide-mobile">Aa</span>
          </button>

          {/* Table of Contents Drawer Button */}
          <button
            type="button"
            onClick={() => setTocOpen(true)}
            title="Danh sách chương"
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
            <Menu size={16} />
            <span className="hide-mobile">{chapter.number}/{book.chapters.length}</span>
          </button>
        </div>
      </header>

      {/* 3. SETTINGS POPOVER PANEL */}
      {settingsOpen && (
        <div
          style={{
            position: 'fixed',
            top: '56px',
            right: '16px',
            zIndex: 9998,
            width: '300px',
            backgroundColor: themeStyles.cardBg,
            border: `1px solid ${themeStyles.border}`,
            borderRadius: '14px',
            padding: '16px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 800 }}>Tùy Chỉnh Trình Đọc</span>
            <button
              onClick={() => setSettingsOpen(false)}
              style={{ background: 'none', border: 'none', color: themeStyles.subtle, cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Theme Mode: Light / Sepia / Dark */}
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: themeStyles.subtle, marginBottom: '6px' }}>
              MÀU NỀN TRANG ĐỌC
            </label>
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

          {/* Font Size Selector */}
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

          {/* Font Family Selector: Serif vs Sans */}
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: themeStyles.subtle, marginBottom: '6px' }}>
              KIỂU CHỮ
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <button
                type="button"
                onClick={() => updateSettings({ fontFamily: 'serif' })}
                style={{
                  padding: '7px',
                  borderRadius: '8px',
                  border: `1px solid ${settings.fontFamily === 'serif' ? themeStyles.accent : themeStyles.border}`,
                  backgroundColor: settings.fontFamily === 'serif' ? 'rgba(220, 38, 38, 0.1)' : themeStyles.bg,
                  color: themeStyles.color,
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Serif (Cổ điển)
              </button>

              <button
                type="button"
                onClick={() => updateSettings({ fontFamily: 'sans' })}
                style={{
                  padding: '7px',
                  borderRadius: '8px',
                  border: `1px solid ${settings.fontFamily === 'sans' ? themeStyles.accent : themeStyles.border}`,
                  backgroundColor: settings.fontFamily === 'sans' ? 'rgba(220, 38, 38, 0.1)' : themeStyles.bg,
                  color: themeStyles.color,
                  fontFamily: 'sans-serif',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Sans (Hiện đại)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. TABLE OF CONTENTS DRAWER */}
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
            {/* Drawer Header */}
            <div style={{
              padding: '16px 18px',
              borderBottom: `1px solid ${themeStyles.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Mục Lục Cuốn Sách</h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: themeStyles.subtle }}>
                  {book.chapters.length} chương · {book.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTocOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: themeStyles.subtle,
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Chapter Search Input */}
            <div style={{ padding: '12px 18px', borderBottom: `1px solid ${themeStyles.border}` }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 10px',
                borderRadius: '8px',
                backgroundColor: themeStyles.bg,
                border: `1px solid ${themeStyles.border}`
              }}>
                <Search size={14} style={{ color: themeStyles.subtle }} />
                <input
                  type="text"
                  value={searchChapterQuery}
                  onChange={(e) => setSearchChapterQuery(e.target.value)}
                  placeholder="Tìm tên chương..."
                  style={{
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                    fontSize: '0.84rem',
                    color: themeStyles.color,
                    width: '100%'
                  }}
                />
              </div>
            </div>

            {/* Chapters List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
              {filteredChapters.map(c => {
                const isActive = c.id === chapter.id;
                return (
                  <Link
                    key={c.id}
                    href={`/thu-vien/${book.id}/${c.id}`}
                    onClick={() => setTocOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      color: isActive ? themeStyles.accent : themeStyles.color,
                      backgroundColor: isActive ? 'rgba(220, 38, 38, 0.12)' : 'transparent',
                      fontWeight: isActive ? 800 : 500,
                      marginBottom: '4px',
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      backgroundColor: isActive ? themeStyles.accent : themeStyles.bg,
                      color: isActive ? '#FFFFFF' : themeStyles.subtle,
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      {c.number}
                    </span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.88rem', lineHeight: 1.35 }}>
                        {c.title.replace(/^Chương \d+:\s*/i, '')}
                      </div>
                      {c.subtitle && (
                        <div style={{ fontSize: '0.74rem', color: themeStyles.subtle, marginTop: '2px', lineHeight: 1.3 }}>
                          {c.subtitle}
                        </div>
                      )}
                    </div>

                    {isActive && (
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: themeStyles.accent, marginTop: '8px', flexShrink: 0 }} />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 5. MAIN BOOK READING ARTICLE */}
      <main
        ref={contentRef}
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '32px 18px 64px',
          lineHeight: settings.lineHeight === 'loose' ? 2 : settings.lineHeight === 'relaxed' ? 1.85 : 1.65,
          fontSize: fontSizeStyle
        }}
      >
        {/* Chapter Header */}
        <div style={{
          textAlign: 'center',
          paddingBottom: '24px',
          marginBottom: '32px',
          borderBottom: `2px solid ${themeStyles.border}`
        }}>
          <span style={{
            display: 'inline-block',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '4px 12px',
            borderRadius: '20px',
            backgroundColor: 'rgba(220, 38, 38, 0.12)',
            color: themeStyles.accent,
            marginBottom: '12px'
          }}>
            Chương {chapter.number} / {book.chapters.length}
          </span>

          <h1 style={{
            margin: '0 0 10px',
            fontSize: 'clamp(1.4rem, 3.5vw, 1.95rem)',
            fontWeight: 800,
            lineHeight: 1.3,
            color: themeStyles.color
          }}>
            {chapter.title}
          </h1>

          {chapter.subtitle && (
            <p style={{
              margin: '0 auto',
              maxWidth: '600px',
              fontSize: '1rem',
              fontStyle: 'italic',
              color: themeStyles.subtle,
              lineHeight: 1.5
            }}>
              {chapter.subtitle}
            </p>
          )}
        </div>

        {/* Chapter Paragraphs Content */}
        <article style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {chapter.content.map((paragraph, idx) => {
            const isHeading = paragraph.length <= 90 && paragraph === paragraph.toUpperCase() && /[A-ZÀ-Ỹ]/.test(paragraph);
            const isQuote = paragraph.startsWith('“') || paragraph.startsWith('«') || paragraph.startsWith('"') || paragraph.startsWith('• Câu');

            if (!paragraph.trim()) {
              return <div key={idx} style={{ height: '12px' }} />;
            }

            if (isHeading) {
              return (
                <h3
                  key={idx}
                  style={{
                    margin: '18px 0 4px',
                    fontSize: '1.15em',
                    fontWeight: 800,
                    color: themeStyles.accent,
                    lineHeight: 1.4
                  }}
                >
                  {paragraph}
                </h3>
              );
            }

            if (isQuote) {
              return (
                <blockquote
                  key={idx}
                  style={{
                    margin: '8px 0',
                    padding: '12px 18px',
                    borderLeft: `4px solid ${themeStyles.accent}`,
                    backgroundColor: themeStyles.cardBg,
                    borderRadius: '0 8px 8px 0',
                    fontStyle: 'italic',
                    fontSize: '1.02em',
                    color: themeStyles.color,
                    lineHeight: 1.75
                  }}
                >
                  {paragraph}
                </blockquote>
              );
            }

            return (
              <p
                key={idx}
                style={{
                  margin: 0,
                  textAlign: 'justify',
                  textJustify: 'inter-word'
                }}
              >
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* 6. BOTTOM CHAPTER NAVIGATION FOOTER */}
        <div style={{
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: `1px solid ${themeStyles.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Share and Bookmark Action Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: themeStyles.subtle, fontWeight: 600 }}>
              Đã đọc xong chương {chapter.number} · {book.title}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={14} color="#16A34A" /> : <Share2 size={14} />}
                <span>{copied ? 'Đã sao chép' : 'Chia sẻ chương'}</span>
              </button>
            </div>
          </div>

          {/* Prev / Next Chapter Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: prevChapter && nextChapter ? '1fr 1fr' : '1fr',
            gap: '12px'
          }}>
            {prevChapter && (
              <Link
                href={`/thu-vien/${book.id}/${prevChapter.id}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  backgroundColor: themeStyles.cardBg,
                  border: `1px solid ${themeStyles.border}`,
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.15s ease'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', fontWeight: 800, color: themeStyles.subtle, textTransform: 'uppercase' }}>
                  <ChevronLeft size={14} /> Chương trước
                </span>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  Chương {prevChapter.number}: {prevChapter.title.replace(/^Chương \d+:\s*/i, '')}
                </span>
              </Link>
            )}

            {nextChapter && (
              <Link
                href={`/thu-vien/${book.id}/${nextChapter.id}`}
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
                  textAlign: 'right',
                  transition: 'transform 0.15s ease'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', fontWeight: 800, color: themeStyles.accent, textTransform: 'uppercase' }}>
                  Chương tiếp theo <ChevronRight size={14} />
                </span>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  Chương {nextChapter.number}: {nextChapter.title.replace(/^Chương \d+:\s*/i, '')}
                </span>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
