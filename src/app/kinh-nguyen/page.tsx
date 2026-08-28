'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
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
  X
} from 'lucide-react';
import { PRAYERS, PRAYER_CATEGORIES, Prayer } from '@/lib/prayersData';
import { removeAccents } from '@/lib/massTimes';

const FAVORITES_STORAGE_KEY = 'catholic_favorite_prayers_v1';

// Convert markdown bold/italics to HTML
function formatInlineMarkdown(text: string): string {
  let res = text;
  // bold: **text**
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #111827; font-weight: 700;">$1</strong>');
  // italics: *text*
  res = res.replace(/\*(.*?)\*/g, '<em style="opacity: 0.9;">$1</em>');
  // Liturgical cues (Đ., Thưa., X:, Đ:)
  res = res.replace(/^((?:Đ\.|Thưa\.|X:|Đ:))\s*/, '<strong style="color: #B71C1C; font-weight: 800;">$1 </strong>');
  return res;
}

// Elegant Stanza Formatter with clean, solemn spacing
function PrayerStanzaViewer({ content, fontSize = 17 }: { content: string; fontSize?: number }) {
  const stanzas = content.split(/\n\s*\n/);

  return (
    <div style={{ fontSize: `${fontSize}px`, lineHeight: 1.85, color: '#1F2937', letterSpacing: '0.01em' }}>
      {stanzas.map((stanza, sIdx) => {
        const lines = stanza.split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length === 0) return null;

        // Section header inside content
        if (lines[0].startsWith('### ')) {
          return (
            <div key={sIdx} style={{ margin: '24px 0 12px' }}>
              <h4 style={{
                fontSize: `${fontSize * 1.12}px`,
                fontWeight: 800,
                color: '#B71C1C',
                margin: 0,
                paddingBottom: '6px',
                borderBottom: '1px dashed #E5E7EB'
              }}>
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
            <div key={sIdx} style={{ margin: '14px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {lines.map((l, lIdx) => {
                const cleanText = l.replace(/^[•\-]\s*/, '');
                return (
                  <div key={lIdx} style={{ display: 'flex', gap: '8px', paddingLeft: '4px' }}>
                    <span style={{ color: '#B71C1C', fontWeight: 800 }}>•</span>
                    <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cleanText) }} />
                  </div>
                );
              })}
            </div>
          );
        }

        // Standard poetic verse stanza
        return (
          <div key={sIdx} style={{ marginBottom: '1.5rem' }}>
            {lines.map((line, lIdx) => (
              <div
                key={lIdx}
                style={{
                  minHeight: '1.6em',
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('kinh-sang-danh');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [focusPrayer, setFocusPrayer] = useState<Prayer | null>(null);
  const [fontSize, setFontSize] = useState<number>(17);
  const [beadCount, setBeadCount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
      next = favorites.filter(favId => favId !== id);
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
      text: `${prayer.title}\n\n${prayer.content.slice(0, 300)}...`,
      url: typeof window !== 'undefined' ? window.location.href : ''
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // noop
      }
    } else {
      handleCopyPrayer(prayer);
    }
  };

  // Filter prayers with multi-word search
  const filteredPrayers = useMemo(() => {
    let list = PRAYERS;

    if (selectedCategory === 'favorites') {
      list = list.filter(p => favorites.includes(p.id));
    } else if (selectedCategory === 'popular') {
      list = list.filter(p => p.isPopular);
    } else if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = removeAccents(searchQuery.trim());
      const words = q.split(/\s+/).filter(Boolean);
      list = list.filter(p => {
        const titleNorm = removeAccents(p.title);
        const contentNorm = removeAccents(p.content);
        return words.every(w => titleNorm.includes(w) || contentNorm.includes(w));
      });
    }

    return list;
  }, [selectedCategory, searchQuery, favorites]);

  // Counts map for category badges
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {
      all: PRAYERS.length,
      popular: PRAYERS.filter(p => p.isPopular).length,
      favorites: favorites.length
    };
    for (const cat of PRAYER_CATEGORIES) {
      if (cat.id !== 'all' && cat.id !== 'popular') {
        map[cat.id] = PRAYERS.filter(p => p.category === cat.id).length;
      }
    }
    return map;
  }, [favorites]);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-gradient)' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(22, 24, 29, 0.95)',
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '30px',
            fontSize: '0.9rem',
            fontWeight: 600,
            zIndex: 9999,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          <Check size={16} color="#4ADE80" />
          {toastMessage}
        </div>
      )}

      {/* Hero Header with Antique Jesus Painting Background */}
      <div style={{
        position: 'relative',
        backgroundImage: 'linear-gradient(180deg, rgba(15, 8, 8, 0.72) 0%, rgba(45, 15, 15, 0.60) 50%, rgba(15, 8, 8, 0.85) 100%), url("/images/jesus_antique_banner.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 22%',
        color: '#FFFFFF',
        padding: '32px 16px 40px',
        borderBottom: '1px solid rgba(217, 119, 6, 0.35)',
        boxShadow: 'inset 0 -12px 30px rgba(0,0,0,0.6)'
      }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#FFFFFF',
                border: '1px solid rgba(253, 230, 138, 0.3)',
                backdropFilter: 'blur(6px)'
              }}
            >
              <ArrowLeft size={18} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#FDE68A', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
              <Link href="/" style={{ opacity: 0.9 }}>Trang chủ</Link>
              <span>/</span>
              <span style={{ fontWeight: 700, color: '#FFFFFF' }}>Kinh Nguyện Công Giáo</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{
                fontSize: 'clamp(1.15rem, 2.6vw, 1.45rem)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                margin: 0,
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(217, 119, 6, 0.4)'
              }}>
                Tất Cả Các Kinh Nguyện
              </h1>
              <p style={{
                margin: '4px 0 0',
                fontSize: '0.85rem',
                color: '#F3F4F6',
                lineHeight: 1.4,
                textShadow: '0 1px 4px rgba(0,0,0,0.8)'
              }}>
                Tổng hợp {PRAYERS.length} bản kinh nguyện chuẩn phụng vụ, kinh gia đình, kinh kính Đức Mẹ, Thánh Giuse và các thánh.
              </p>
            </div>

            {/* Quick Favorites count pill */}
            <button
              onClick={() => setSelectedCategory('favorites')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                background: selectedCategory === 'favorites' ? '#B71C1C' : 'rgba(0, 0, 0, 0.55)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: '1px solid rgba(253, 230, 138, 0.4)',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              {favorites.length > 0 ? <BookmarkCheck size={16} color="#FDE68A" /> : <Bookmark size={16} color="#FDE68A" />}
              <span>Đã lưu ({favorites.length})</span>
            </button>
          </div>

          {/* Search Box - Fast & Accurate */}
          <div style={{ position: 'relative', marginTop: '20px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9CA3AF'
              }}
            />
            <input
              type="text"
              placeholder="Tìm kiếm kinh theo tên hoặc nội dung (vd: Sáng Danh, Lạy Cha, Kính Mừng, Mân Côi, 14 Đàng Thánh Giá...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 44px 14px 46px',
                borderRadius: '10px',
                border: '1px solid rgba(253, 230, 138, 0.3)',
                fontSize: '0.98rem',
                backgroundColor: 'rgba(255, 255, 255, 0.96)',
                color: '#111827',
                outline: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                backdropFilter: 'blur(10px)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '4px',
                  color: '#6B7280'
                }}
                title="Xóa tìm kiếm"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '20px 16px 40px', maxWidth: '1060px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Solemn Categories Navigation Bar (no emojis) */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '6px',
          scrollbarWidth: 'thin'
        }}>
          {/* Favorite tab */}
          <button
            onClick={() => setSelectedCategory('favorites')}
            style={{
              padding: '8px 14px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: selectedCategory === 'favorites' ? '#B71C1C' : '#FFFFFF',
              color: selectedCategory === 'favorites' ? '#FFFFFF' : '#1F2937',
              border: `1px solid ${selectedCategory === 'favorites' ? '#B71C1C' : 'rgba(0, 0, 0, 0.08)'}`,
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <span>Kinh Đã Lưu</span>
            <span style={{
              fontSize: '0.75rem',
              padding: '1px 6px',
              borderRadius: '10px',
              backgroundColor: selectedCategory === 'favorites' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.06)',
              color: 'inherit'
            }}>
              {favorites.length}
            </span>
          </button>

          {/* Clean text category pills */}
          {PRAYER_CATEGORIES.map(cat => {
            const active = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: active ? '#B71C1C' : '#FFFFFF',
                  color: active ? '#FFFFFF' : '#1F2937',
                  border: `1px solid ${active ? '#B71C1C' : 'rgba(0, 0, 0, 0.08)'}`,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                <span>{cat.label}</span>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  backgroundColor: active ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.06)',
                  color: 'inherit'
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results summary & Font Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontSize: '0.9rem', color: '#4B5563', fontWeight: 600 }}>
            {searchQuery ? (
              <span>Tìm thấy <strong>{filteredPrayers.length}</strong> kết quả cho &ldquo;{searchQuery}&rdquo;</span>
            ) : (
              <span>Hiển thị <strong>{filteredPrayers.length}</strong> kinh nguyện</span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Global font size adjuster */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '6px', padding: '2px 4px' }}>
              <span style={{ fontSize: '0.75rem', color: '#6B7280', padding: '0 4px', fontWeight: 600 }}>Cỡ chữ:</span>
              <button
                onClick={() => setFontSize(prev => Math.max(14, prev - 1))}
                style={{ padding: '2px 6px', fontSize: '0.8rem', fontWeight: 800, color: '#111827' }}
                title="Giảm cỡ chữ"
              >
                A-
              </button>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0 2px', minWidth: '22px', textAlign: 'center' }}>
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize(prev => Math.min(26, prev + 1))}
                style={{ padding: '2px 6px', fontSize: '0.85rem', fontWeight: 800, color: '#111827' }}
                title="Tăng cỡ chữ"
              >
                A+
              </button>
            </div>

            <button
              onClick={() => {
                if (expandedId === null && filteredPrayers.length > 0) {
                  setExpandedId(filteredPrayers[0].id);
                } else {
                  setExpandedId(null);
                }
              }}
              style={{
                fontSize: '0.8rem',
                color: '#4B5563',
                fontWeight: 600,
                textDecoration: 'underline',
                padding: '4px 6px'
              }}
            >
              {expandedId ? 'Thu gọn tất cả' : 'Mở kinh đầu tiên'}
            </button>
          </div>
        </div>

        {/* Prayers List */}
        {filteredPrayers.length === 0 ? (
          <div
            style={{
              padding: '48px 20px',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid rgba(0, 0, 0, 0.08)'
            }}
          >
            <h3 style={{ fontSize: '1.1rem', color: '#111827', marginBottom: '6px' }}>
              {selectedCategory === 'favorites' ? 'Chưa có kinh nào được lưu' : 'Không tìm thấy kinh nguyện phù hợp'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#6B7280', maxWidth: '420px', margin: '0 auto' }}>
              {selectedCategory === 'favorites'
                ? 'Hãy bấm vào nút Lưu kinh ở mỗi bản kinh để lưu lại kinh bạn thường đọc.'
                : 'Vui lòng thử tìm kiếm bằng từ khoá khác hoặc chọn lại danh mục kinh.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredPrayers.map(prayer => {
              const isExpanded = expandedId === prayer.id;
              const isFav = favorites.includes(prayer.id);
              const catMeta = PRAYER_CATEGORIES.find(c => c.id === prayer.category);

              return (
                <article
                  key={prayer.id}
                  id={prayer.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.2s ease, border-color 0.2s ease'
                  }}
                >
                  {/* Clickable Header matching user screenshot */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : prayer.id)}
                    style={{
                      padding: '20px 24px 16px',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    {/* Eyebrow Label: Solemn text */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#B45309',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px'
                    }}>
                      <span>{catMeta?.label ? `KINH NGUYỆN • ${catMeta.label}` : 'KINH NGUYỆN CÔNG GIÁO'}</span>
                      {prayer.isPopular && (
                        <span style={{
                          color: '#B71C1C',
                          background: 'rgba(183, 28, 28, 0.08)',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontSize: '0.65rem'
                        }}>
                          PHỔ BIẾN
                        </span>
                      )}
                    </div>

                    {/* Big Bold Title + Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                      <h2 style={{
                        margin: 0,
                        fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                        fontWeight: 700,
                        color: '#111827',
                        lineHeight: 1.35,
                        letterSpacing: '-0.01em'
                      }}>
                        {prayer.title}
                      </h2>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                        <button
                          title={isFav ? 'Bỏ lưu kinh' : 'Lưu kinh'}
                          onClick={e => toggleFavorite(prayer.id, e)}
                          style={{
                            padding: '8px',
                            borderRadius: '50%',
                            color: isFav ? '#B71C1C' : '#9CA3AF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 0.2s ease'
                          }}
                        >
                          {isFav ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                        </button>

                        <button
                          title="Đọc toàn màn hình / Chế độ sốt sắng"
                          onClick={e => {
                            e.stopPropagation();
                            setFocusPrayer(prayer);
                            setBeadCount(0);
                          }}
                          style={{
                            padding: '8px',
                            borderRadius: '50%',
                            color: '#9CA3AF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Maximize2 size={18} />
                        </button>

                        <div style={{ color: isExpanded ? '#B71C1C' : '#9CA3AF', padding: '4px', display: 'flex', alignItems: 'center' }}>
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>
                    </div>

                    {/* Subtle Horizontal Divider below title (matching user image) */}
                    <div style={{
                      height: '1px',
                      backgroundColor: '#F3F4F6',
                      marginTop: '16px',
                      width: '100%'
                    }} />
                  </div>

                  {/* Expanded Stanza Body */}
                  {isExpanded && (
                    <div style={{
                      padding: '0 24px 24px'
                    }}>
                      <PrayerStanzaViewer content={prayer.content} fontSize={fontSize} />

                      {/* Card Bottom Toolbar */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                        paddingTop: '16px',
                        borderTop: '1px solid #F3F4F6',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}>
                        <button
                          onClick={() => {
                            setFocusPrayer(prayer);
                            setBeadCount(0);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            backgroundColor: '#B71C1C',
                            color: '#FFFFFF',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          <Maximize2 size={15} />
                          <span>Chế Độ Đọc Sốt Sắng / Toàn Màn Hình</span>
                        </button>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={e => handleCopyPrayer(prayer, e)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              backgroundColor: '#F3F4F6',
                              color: '#374151',
                              fontSize: '0.85rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            <Copy size={15} />
                            <span>Sao chép</span>
                          </button>

                          <button
                            onClick={e => handleSharePrayer(prayer, e)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              backgroundColor: '#F3F4F6',
                              color: '#374151',
                              fontSize: '0.85rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            <Share2 size={15} />
                            <span>Chia sẻ</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Focus / Fullscreen Reading Modal */}
      {focusPrayer && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9990,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setFocusPrayer(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              color: '#1F2937',
              width: '100%',
              maxWidth: '820px',
              maxHeight: '92vh',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FAFAFA'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#B45309',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '4px'
                }}>
                  <span>KINH NGUYỆN CÔNG GIÁO</span>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.18rem', fontWeight: 700, color: '#111827' }}>
                  {focusPrayer.title}
                </h3>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Font size buttons */}
                <div style={{ display: 'flex', alignItems: 'center', background: '#E5E7EB', borderRadius: '6px', padding: '2px' }}>
                  <button
                    onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                    style={{ padding: '6px 10px', fontSize: '0.85rem', fontWeight: 800, color: '#1F2937' }}
                    title="Giảm cỡ chữ"
                  >
                    A-
                  </button>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0 4px', color: '#4B5563' }}>
                    {fontSize}px
                  </span>
                  <button
                    onClick={() => setFontSize(prev => Math.min(30, prev + 2))}
                    style={{ padding: '6px 10px', fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}
                    title="Tăng cỡ chữ"
                  >
                    A+
                  </button>
                </div>

                <button
                  onClick={() => setFocusPrayer(null)}
                  style={{
                    padding: '8px',
                    borderRadius: '50%',
                    background: '#E5E7EB',
                    color: '#374151',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Đóng"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body - Stanzas View */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '28px 32px'
            }}>
              <PrayerStanzaViewer content={focusPrayer.content} fontSize={fontSize} />
            </div>

            {/* Modal Footer - Rosary Bead Counter & Quick Actions */}
            <div style={{
              padding: '14px 24px',
              borderTop: '1px solid #E5E7EB',
              background: '#FAFAFA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              {/* Bead / Prayer Counter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4B5563' }}>
                  Đếm chuỗi hạt / Lần đọc:
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={() => setBeadCount(prev => prev + 1)}
                    style={{
                      padding: '6px 16px',
                      borderRadius: '20px',
                      backgroundColor: '#B71C1C',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      boxShadow: '0 2px 6px rgba(183, 28, 28, 0.3)'
                    }}
                  >
                    +1 Lần ({beadCount})
                  </button>
                  {beadCount > 0 && (
                    <button
                      onClick={() => setBeadCount(0)}
                      title="Đặt lại đếm"
                      style={{
                        padding: '6px 8px',
                        borderRadius: '50%',
                        backgroundColor: '#E5E7EB',
                        color: '#6B7280'
                      }}
                    >
                      <RotateCcw size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => toggleFavorite(focusPrayer.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    backgroundColor: '#F3F4F6',
                    color: favorites.includes(focusPrayer.id) ? '#B71C1C' : '#374151',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}
                >
                  {favorites.includes(focusPrayer.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  <span>{favorites.includes(focusPrayer.id) ? 'Đã lưu' : 'Lưu kinh'}</span>
                </button>

                <button
                  onClick={() => handleCopyPrayer(focusPrayer)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    backgroundColor: '#F3F4F6',
                    color: '#374151',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}
                >
                  <Copy size={16} />
                  <span>Sao chép</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
