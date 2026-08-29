'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Search,
  Check,
  Share2,
  Copy,
  Maximize2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Bookmark,
  BookmarkCheck,
  X,
  Sparkles,
  Heart,
  Flame,
  Sun,
  Award,
  Church,
  Cross,
  BookOpen,
  Layers,
  ShieldCheck,
  Users
} from 'lucide-react';
import { PRAYERS, PRAYER_CATEGORIES, Prayer } from '@/lib/prayersData';
import { removeAccents } from '@/lib/massTimes';

const FAVORITES_STORAGE_KEY = 'catholic_favorite_prayers_v2';

// Convert markdown bold/italics to HTML with dynamic theme color
function formatInlineMarkdown(text: string): string {
  let res = text;
  // bold: **text**
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--color-dark); font-weight: 800;">$1</strong>');
  // italics: *text*
  res = res.replace(/\*(.*?)\*/g, '<em style="opacity: 0.9;">$1</em>');
  // Liturgical cues (Đ., Thưa., X:, Đ:)
  res = res.replace(/^((?:Đ\.|Thưa\.|X:|Đ:))\s*/, '<strong style="color: var(--color-red); font-weight: 800;">$1 </strong>');
  return res;
}

// Elegant Stanza Formatter with clean, solemn spacing
function PrayerStanzaViewer({ content, fontSize = 16 }: { content: string; fontSize?: number }) {
  const stanzas = content.split(/\n\s*\n/);

  return (
    <div style={{ fontSize: `${fontSize}px`, lineHeight: 1.8, color: 'var(--color-dark)', letterSpacing: '0.01em' }}>
      {stanzas.map((stanza, sIdx) => {
        const lines = stanza.split('\n').map((l) => l.trim()).filter(Boolean);
        if (lines.length === 0) return null;

        // Section header inside content
        if (lines[0].startsWith('### ')) {
          return (
            <div key={sIdx} style={{ margin: '20px 0 10px' }}>
              <h4
                style={{
                  fontSize: `${fontSize * 1.1}px`,
                  fontWeight: 800,
                  color: 'var(--color-red)',
                  margin: 0,
                  paddingBottom: '4px',
                  borderBottom: '1px dashed var(--color-border-subtle)'
                }}
              >
                {lines[0].replace(/^###\s*/, '')}
              </h4>
              {lines.slice(1).map((l, lIdx) => (
                <div key={lIdx} style={{ margin: '4px 0' }} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(l) }} />
              ))}
            </div>
          );
        }

        // Bullet point list stanza
        if (lines[0].startsWith('• ') || lines[0].startsWith('- ')) {
          return (
            <div key={sIdx} style={{ margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {lines.map((l, lIdx) => {
                const cleanText = l.replace(/^[•\-]\s*/, '');
                return (
                  <div key={lIdx} style={{ display: 'flex', gap: '8px', paddingLeft: '4px' }}>
                    <span style={{ color: 'var(--color-red)', fontWeight: 800 }}>•</span>
                    <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cleanText) }} />
                  </div>
                );
              })}
            </div>
          );
        }

        // Standard poetic verse stanza
        return (
          <div key={sIdx} style={{ marginBottom: '1.25rem' }}>
            {lines.map((line, lIdx) => (
              <div
                key={lIdx}
                style={{
                  minHeight: '1.5em',
                  fontStyle: line.startsWith('*') && line.endsWith('*') ? 'italic' : 'normal'
                }}
                dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default function KinhNguyenPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('kinh-lay-cha');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState<number>(16);
  const [beadCount, setBeadCount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [fullscreenPrayer, setFullscreenPrayer] = useState<Prayer | null>(null);

  // Mầu nhiệm Mân Côi theo ngày trong tuần (100% 2D vector icons)
  const todayMysteryInfo = useMemo(() => {
    const d = new Date().getDay(); // 0: CN, 1: T2, 2: T3, 3: T4, 4: T5, 5: T6, 6: T7
    switch (d) {
      case 1:
      case 6:
        return {
          name: 'NĂM SỰ VUI',
          sub: 'Mùa Vui (Thứ Hai & Thứ Bảy)',
          id: 'ngam-5-su-vui',
          color: '#BE185D',
          badgeBg: 'rgba(236, 72, 153, 0.12)',
          badgeText: '#BE185D',
          icon: Sparkles
        };
      case 2:
      case 5:
        return {
          name: 'NĂM SỰ THƯƠNG',
          sub: 'Mùa Thương (Thứ Ba & Thứ Sáu)',
          id: 'ngam-5-su-thuong',
          color: '#DC2626',
          badgeBg: 'rgba(220, 38, 38, 0.12)',
          badgeText: '#DC2626',
          icon: Heart
        };
      case 4:
        return {
          name: 'NĂM SỰ SÁNG',
          sub: 'Mùa Sáng (Thứ Năm)',
          id: 'ngam-5-su-sang',
          color: '#D97706',
          badgeBg: 'rgba(217, 119, 6, 0.12)',
          badgeText: '#D97706',
          icon: Sun
        };
      case 3:
      case 0:
      default:
        return {
          name: 'NĂM SỰ MỪNG',
          sub: 'Mùa Mừng (Thứ Tư & Chúa Nhật)',
          id: 'ngam-5-su-mung',
          color: '#1D4ED8',
          badgeBg: 'rgba(37, 99, 235, 0.12)',
          badgeText: '#1D4ED8',
          icon: Award
        };
    }
  }, []);

  const openRosaryMystery = (prayerId: string) => {
    setSelectedCategory('all');
    setSearchQuery('');
    setExpandedId(prayerId);
    setTimeout(() => {
      const el = document.getElementById(prayerId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  // Load favorites
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch {
      // noop
    }
  }, []);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let next: string[];
    if (favorites.includes(id)) {
      next = favorites.filter((favId) => favId !== id);
      showToast('Đã bỏ lưu kinh');
    } else {
      next = [...favorites, id];
      showToast('Đã lưu vào danh sách kinh');
    }
    setFavorites(next);
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // noop
    }
  };

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  const handleCopyPrayer = async (prayer: Prayer, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const textToCopy = `${prayer.title.toUpperCase()}\n\n${prayer.content.replace(/###\s*/g, '')}\n\n(Giáo phận Mỹ Tho / Kinh Nguyện Công Giáo)`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast('Đã sao chép nội dung kinh');
    } catch {
      showToast('Không thể sao chép');
    }
  };

  const handleSharePrayer = async (prayer: Prayer, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const shareData = {
      title: prayer.title,
      text: `${prayer.title}\n\n${prayer.content.slice(0, 200)}...`,
      url: typeof window !== 'undefined' ? window.location.href : ''
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    } else {
      handleCopyPrayer(prayer);
    }
  };

  // Filter prayers
  const filteredPrayers = useMemo(() => {
    let list = PRAYERS;

    // Filter by category
    if (selectedCategory === 'favorites') {
      list = list.filter((p) => favorites.includes(p.id));
    } else if (selectedCategory === 'popular') {
      list = list.filter((p) => p.isPopular);
    } else if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = removeAccents(searchQuery.trim());
      list = list.filter((p) => {
        const titleMatch = removeAccents(p.title).includes(q);
        const latinMatch = p.latinTitle ? removeAccents(p.latinTitle).includes(q) : false;
        const contentMatch = removeAccents(p.content).includes(q);
        return titleMatch || latinMatch || contentMatch;
      });
    }

    return list;
  }, [selectedCategory, searchQuery, favorites]);

  // Counts by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: PRAYERS.length,
      popular: PRAYERS.filter((p) => p.isPopular).length
    };
    PRAYER_CATEGORIES.forEach((c) => {
      if (c.id !== 'all' && c.id !== 'popular') {
        counts[c.id] = PRAYERS.filter((p) => p.category === c.id).length;
      }
    });
    return counts;
  }, []);

  const MysteryIcon = todayMysteryInfo.icon;

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-dark)'
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '24px',
            fontSize: '0.86rem',
            fontWeight: 700,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Check size={16} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HERO HEADER (RESPONSIVE & CLEAN) */}
      {/* ========================================================================= */}
      <header
        style={{
          position: 'relative',
          backgroundImage:
            'linear-gradient(180deg, rgba(15, 8, 8, 0.82) 0%, rgba(45, 15, 15, 0.70) 50%, rgba(15, 8, 8, 0.92) 100%), url("/images/bible/david_psalms.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          color: '#FFFFFF',
          padding: '16px 12px 20px',
          borderBottom: '1px solid rgba(217, 119, 6, 0.35)',
          boxShadow: 'inset 0 -10px 24px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#FFFFFF',
                border: '1px solid rgba(253, 230, 138, 0.3)',
                backdropFilter: 'blur(6px)',
                textDecoration: 'none',
                flexShrink: 0
              }}
              title="Về Trang Chủ"
            >
              <ArrowLeft size={16} />
            </Link>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: '#FDE68A',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <Link href="/" style={{ color: '#FDE68A', textDecoration: 'none', opacity: 0.9 }}>
                Trang chủ
              </Link>
              <span>/</span>
              <span style={{ fontWeight: 700, color: '#FFFFFF' }}>Kinh Nguyện Công Giáo</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#FDE68A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '2px'
                }}
              >
                KHO TÀNG KINH NGUYỆN CHÍNH THỐNG
              </div>
              <h1
                style={{
                  fontSize: 'clamp(1.15rem, 4vw, 1.65rem)',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  margin: 0,
                  color: '#FFFFFF',
                  lineHeight: 1.25,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                }}
              >
                Kinh Nguyện Cốt Lõi
              </h1>
              <p
                style={{
                  margin: '3px 0 0',
                  fontSize: '0.78rem',
                  color: '#E2E8F0',
                  lineHeight: 1.4,
                  opacity: 0.95
                }}
              >
                Các bản kinh truyền thống chuẩn mực của Hội Thánh Công Giáo Việt Nam, Kinh Mân Côi và Lòng Thương Xót.
              </p>
            </div>

            {/* Quick Favorites count pill */}
            <button
              type="button"
              onClick={() => setSelectedCategory('favorites')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '16px',
                background: selectedCategory === 'favorites' ? 'var(--color-red)' : 'rgba(0, 0, 0, 0.55)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.76rem',
                border: '1px solid rgba(253, 230, 138, 0.35)',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)'
              }}
            >
              {favorites.length > 0 ? <BookmarkCheck size={14} color="#FDE68A" /> : <Bookmark size={14} color="#FDE68A" />}
              <span>Đã lưu ({favorites.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', marginTop: '12px' }}>
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#FDE68A'
              }}
            />
            <input
              type="text"
              placeholder="Tìm theo tên kinh hoặc nội dung (Lạy Cha, Kính Mừng, Mân Côi, Thương Xót...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 34px 9px 34px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                fontSize: '0.85rem',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  padding: '4px',
                  color: '#FDE68A',
                  cursor: 'pointer'
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. STICKY CATEGORY PILLS (SMOOTH HORIZONTAL SCROLL) */}
      {/* ========================================================================= */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backgroundColor: 'var(--color-card-bg)',
          borderBottom: '1px solid var(--color-border-subtle)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '8px 10px',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Favorite Tab */}
          <button
            type="button"
            onClick={() => setSelectedCategory('favorites')}
            style={{
              padding: '6px 12px',
              borderRadius: '16px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
              backgroundColor: selectedCategory === 'favorites' ? 'var(--color-red)' : 'var(--color-btn-subtle-bg)',
              color: selectedCategory === 'favorites' ? '#FFFFFF' : 'var(--color-dark)',
              border: `1px solid ${selectedCategory === 'favorites' ? 'var(--color-red)' : 'var(--color-border-subtle)'}`
            }}
          >
            <Bookmark size={12} />
            <span>Đã lưu ({favorites.length})</span>
          </button>

          {/* Categories */}
          {PRAYER_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  flexShrink: 0,
                  backgroundColor: active ? 'var(--color-red)' : 'var(--color-btn-subtle-bg)',
                  color: active ? '#FFFFFF' : 'var(--color-dark)',
                  border: `1px solid ${active ? 'var(--color-red)' : 'var(--color-border-subtle)'}`,
                  boxShadow: active ? '0 2px 6px rgba(183, 28, 28, 0.25)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    padding: '1px 5px',
                    borderRadius: '8px',
                    backgroundColor: active ? 'rgba(255,255,255,0.25)' : 'var(--color-card-bg)',
                    color: 'inherit'
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN PRAYER LIST & DIGITAL BEAD COUNTER */}
      {/* ========================================================================= */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
          padding: '12px 10px 48px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {/* Rosary Mystery Spotlight */}
        <div
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '14px',
            padding: '12px 14px',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(183, 28, 28, 0.1)',
                  color: 'var(--color-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Sparkles size={16} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 900, color: 'var(--color-dark)' }}>
                  Tràng Hạt Mân Côi &amp; 20 Mầu Nhiệm
                </h3>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-subtle)' }}>
                  Lần hạt kính Đức Mẹ chiêm ngắm cuộc đời Chúa Cứu Thế
                </div>
              </div>
            </div>

            {/* Today's mystery button */}
            <button
              type="button"
              onClick={() => openRosaryMystery(todayMysteryInfo.id)}
              style={{
                padding: '5px 10px',
                borderRadius: '8px',
                backgroundColor: todayMysteryInfo.badgeBg,
                color: todayMysteryInfo.badgeText,
                border: `1px solid ${todayMysteryInfo.badgeText}30`,
                fontWeight: 800,
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <MysteryIcon size={13} />
              <span>Hôm nay: {todayMysteryInfo.name}</span>
            </button>
          </div>

          {/* Quick Rosary Mystery Selector */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '6px'
            }}
          >
            {[
              { id: 'ngam-5-su-vui', name: 'Năm Sự Vui', sub: 'Thứ 2 & Thứ 7', color: '#BE185D', icon: Sparkles },
              { id: 'ngam-5-su-sang', name: 'Năm Sự Sáng', sub: 'Thứ 5', color: '#B45309', icon: Sun },
              { id: 'ngam-5-su-thuong', name: 'Năm Sự Thương', sub: 'Thứ 3 & Thứ 6', color: '#DC2626', icon: Heart },
              { id: 'ngam-5-su-mung', name: 'Năm Sự Mừng', sub: 'Thứ 4 & Chúa Nhật', color: '#1D4ED8', icon: Award }
            ].map((m) => {
              const MIcon = m.icon;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => openRosaryMystery(m.id)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-btn-subtle-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 800, color: m.color }}>
                    <MIcon size={12} />
                    <span>{m.name}</span>
                  </div>
                  <div style={{ fontSize: '0.66rem', color: 'var(--color-text-subtle)' }}>{m.sub}</div>
                </button>
              );
            })}
          </div>

          {/* Digital Rosary Bead Counter */}
          <div
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-btn-subtle-bg)',
              border: '1px solid var(--color-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                Đếm hạt: <strong>{beadCount % 10}/10</strong> · Chục thứ: <strong>{Math.floor(beadCount / 10) + 1}/5</strong>
              </div>
              <button
                type="button"
                onClick={() => setBeadCount(0)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-subtle)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                title="Đặt lại bộ đếm hạt"
              >
                <RotateCcw size={13} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="button"
                onClick={() => setBeadCount((prev) => (prev > 0 ? prev - 1 : 0))}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                - 1 Hạt
              </button>
              <button
                type="button"
                onClick={() => {
                  setBeadCount((prev) => prev + 1);
                  if ((beadCount + 1) % 10 === 0) {
                    showToast(`Đã hoàn thành Chục thứ ${(beadCount + 1) / 10}! Sáng Danh Đức Chúa Cha...`);
                  }
                }}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-red)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                + 1 Hạt (Kính Mừng)
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PRAYER CARDS LIST */}
        {/* ========================================================================= */}
        {filteredPrayers.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '36px 16px',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '14px',
              border: '1px solid var(--color-border-subtle)'
            }}
          >
            <BookOpen size={32} style={{ color: 'var(--color-red)', margin: '0 auto 8px', opacity: 0.8 }} />
            <h3 style={{ margin: '0 0 4px', fontSize: '0.96rem', fontWeight: 800 }}>
              Không tìm thấy bản kinh phù hợp
            </h3>
            <p style={{ margin: '0 0 12px', fontSize: '0.78rem', color: 'var(--color-text-subtle)' }}>
              Hãy thử tìm kiếm với từ khóa khác hoặc chọn mục Tất Cả.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-red)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Xem Tất Cả Các Kinh
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredPrayers.map((prayer) => {
              const isExpanded = expandedId === prayer.id;
              const isFav = favorites.includes(prayer.id);

              return (
                <div
                  key={prayer.id}
                  id={prayer.id}
                  style={{
                    backgroundColor: 'var(--color-card-bg)',
                    borderRadius: '14px',
                    border: `1px solid ${isExpanded ? 'rgba(183, 28, 28, 0.35)' : 'var(--color-border-subtle)'}`,
                    boxShadow: isExpanded ? '0 4px 12px rgba(183, 28, 28, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
                    overflow: 'hidden',
                    transition: 'border-color 0.15s ease'
                  }}
                >
                  {/* Card Header (Accordion Clickable) */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : prayer.id)}
                    style={{
                      padding: '12px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      userSelect: 'none'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '2px' }}>
                        {prayer.isPopular && (
                          <span
                            style={{
                              fontSize: '0.64rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              padding: '1px 5px',
                              borderRadius: '4px',
                              backgroundColor: 'rgba(183, 28, 28, 0.1)',
                              color: 'var(--color-red)'
                            }}
                          >
                            Phổ biến
                          </span>
                        )}
                        {prayer.latinTitle && (
                          <span style={{ fontSize: '0.68rem', fontStyle: 'italic', color: 'var(--color-text-subtle)' }}>
                            {prayer.latinTitle}
                          </span>
                        )}
                      </div>

                      <h3
                        style={{
                          margin: 0,
                          fontSize: '0.98rem',
                          fontWeight: 800,
                          color: isExpanded ? 'var(--color-red)' : 'var(--color-dark)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {prayer.title}
                      </h3>
                    </div>

                    {/* Quick action buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                      <Link
                        href={`/kinh-nguyen/${prayer.id}`}
                        onClick={(e) => e.stopPropagation()}
                        title={`Mở trang riêng: ${prayer.title}`}
                        aria-label={`Mở trang riêng của ${prayer.title}`}
                        style={{ display: 'inline-flex', color: 'var(--color-text-subtle)', padding: '4px' }}
                      >
                        <ExternalLink size={15} />
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(prayer.id, e)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: isFav ? 'var(--color-red)' : 'var(--color-text-subtle)',
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                        title={isFav ? 'Bỏ lưu' : 'Lưu kinh'}
                      >
                        {isFav ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                      </button>

                      <div style={{ color: 'var(--color-text-subtle)' }}>
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Prayer Content */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: '12px 14px 14px',
                        borderTop: '1px solid var(--color-border-subtle)',
                        backgroundColor: 'var(--color-card-bg)'
                      }}
                    >
                      {/* Font size & Read Mode Control Bar */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                          paddingBottom: '10px',
                          marginBottom: '12px',
                          borderBottom: '1px dashed var(--color-border-subtle)',
                          fontSize: '0.74rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ color: 'var(--color-text-subtle)', fontWeight: 600 }}>Cỡ chữ:</span>
                          <button
                            type="button"
                            onClick={() => setFontSize((prev) => Math.max(14, prev - 1))}
                            style={{
                              padding: '2px 7px',
                              borderRadius: '4px',
                              backgroundColor: 'var(--color-btn-subtle-bg)',
                              border: '1px solid var(--color-border-subtle)',
                              cursor: 'pointer',
                              fontWeight: 700
                            }}
                          >
                            A-
                          </button>
                          <button
                            type="button"
                            onClick={() => setFontSize((prev) => Math.min(24, prev + 1))}
                            style={{
                              padding: '2px 7px',
                              borderRadius: '4px',
                              backgroundColor: 'var(--color-btn-subtle-bg)',
                              border: '1px solid var(--color-border-subtle)',
                              cursor: 'pointer',
                              fontWeight: 700
                            }}
                          >
                            A+
                          </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={(e) => handleCopyPrayer(prayer, e)}
                            style={{
                              padding: '3px 8px',
                              borderRadius: '6px',
                              backgroundColor: 'var(--color-btn-subtle-bg)',
                              border: '1px solid var(--color-border-subtle)',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}
                          >
                            <Copy size={12} />
                            <span>Sao chép</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleSharePrayer(prayer, e)}
                            style={{
                              padding: '3px 8px',
                              borderRadius: '6px',
                              backgroundColor: 'var(--color-btn-subtle-bg)',
                              border: '1px solid var(--color-border-subtle)',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}
                          >
                            <Share2 size={12} />
                            <span>Chia sẻ</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setFullscreenPrayer(prayer)}
                            style={{
                              padding: '3px 8px',
                              borderRadius: '6px',
                              backgroundColor: 'var(--color-red)',
                              color: '#FFFFFF',
                              border: 'none',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}
                          >
                            <Maximize2 size={12} />
                            <span>Đọc toàn màn hình</span>
                          </button>
                        </div>
                      </div>

                      {/* Formatted Text Content */}
                      <PrayerStanzaViewer content={prayer.content} fontSize={fontSize} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Subtle Non-clickable Footer Note */}
        <div
          style={{
            marginTop: '24px',
            padding: '12px 0 18px',
            textAlign: 'center',
            fontSize: '0.72rem',
            fontStyle: 'italic',
            color: 'var(--color-text-subtle)',
            opacity: 0.7,
            lineHeight: 1.5,
            borderTop: '1px dashed var(--color-border-subtle)'
          }}
        >
          * Bản văn kinh nguyện trích từ Sách Kinh Giáo Phận &amp; Nghi Thức Phụng Vụ Hội Đồng Giám Mục Việt Nam.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. FULLSCREEN SOLEMN READING MODAL */}
      {/* ========================================================================= */}
      {fullscreenPrayer && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px'
          }}
          onClick={() => setFullscreenPrayer(null)}
        >
          <div
            style={{
              maxWidth: '680px',
              width: '100%',
              margin: 'auto',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '16px',
              border: '1px solid var(--color-border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '14px 16px',
                borderBottom: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px'
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-red)' }}>
                  {fullscreenPrayer.title}
                </h2>
                {fullscreenPrayer.latinTitle && (
                  <div style={{ fontSize: '0.72rem', fontStyle: 'italic', color: 'var(--color-text-subtle)' }}>
                    {fullscreenPrayer.latinTitle}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setFontSize((prev) => Math.max(14, prev - 1))}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--color-btn-subtle-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.78rem'
                  }}
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize((prev) => Math.min(26, prev + 1))}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--color-btn-subtle-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.78rem'
                  }}
                >
                  A+
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreenPrayer(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-subtle)',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '18px 20px', overflowY: 'auto', flex: 1 }}>
              <PrayerStanzaViewer content={fullscreenPrayer.content} fontSize={fontSize + 2} />
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '10px 16px',
                borderTop: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px'
              }}
            >
              <button
                type="button"
                onClick={(e) => handleCopyPrayer(fullscreenPrayer, e)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Copy size={13} />
                <span>Sao chép</span>
              </button>

              <button
                type="button"
                onClick={() => setFullscreenPrayer(null)}
                style={{
                  padding: '5px 14px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-red)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
