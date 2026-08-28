'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Globe,
  X,
  Layers,
  Flame,
  Bookmark,
  Compass,
  ArrowRight
} from 'lucide-react';
import { BIBLE_BOOKS, BIBLE_SUMMARY_INFO, BibleBookInfo, Testament, BibleBookGroup, getBibleBookArtwork } from '@/lib/bible';
import { removeAccents } from '@/lib/massTimes';

type CategoryFilter = 'all' | 'old' | 'new' | BibleBookGroup;

const CATEGORY_TABS: { id: CategoryFilter; label: string; count?: number; icon?: React.ReactNode }[] = [
  { id: 'all', label: 'Tất Cả 73 Sách', count: 73 },
  { id: 'old', label: 'Cựu Ước', count: 46 },
  { id: 'new', label: 'Tân Ước', count: 27 },
  { id: 'pentateuch', label: 'Ngũ Thư', count: 5 },
  { id: 'historical_ot', label: 'Lịch Sử Cựu Ước', count: 16 },
  { id: 'wisdom', label: 'Giáo Huấn & Thi Văn', count: 7 },
  { id: 'prophets_major', label: 'Sách Ngôn Sứ', count: 18 },
  { id: 'gospels', label: 'Bốn Tin Mừng (Phúc Âm)', count: 4 },
  { id: 'acts', label: 'Công Vụ Tông Đồ', count: 1 },
  { id: 'pauline', label: 'Thư Thánh Phaolô', count: 14 },
  { id: 'catholic_letters', label: 'Thư Chung Tông Đồ', count: 7 },
  { id: 'revelation', label: 'Khải Huyền', count: 1 }
];

export default function KinhThanhPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBookModal, setActiveBookModal] = useState<BibleBookInfo | null>(null);

  // Filter books
  const filteredBooks = useMemo(() => {
    const cleanQ = removeAccents(searchQuery.toLowerCase().trim());
    return BIBLE_BOOKS.filter(b => {
      // Category filter
      let matchCat = true;
      if (selectedCategory === 'old') matchCat = b.testament === 'old';
      else if (selectedCategory === 'new') matchCat = b.testament === 'new';
      else if (selectedCategory === 'prophets_major') matchCat = b.group === 'prophets_major' || b.group === 'prophets_minor';
      else if (selectedCategory !== 'all') matchCat = b.group === selectedCategory;

      if (!matchCat) return false;
      if (!cleanQ) return true;

      const matchName = removeAccents(b.name.toLowerCase()).includes(cleanQ);
      const matchShort = removeAccents(b.shortName.toLowerCase()).includes(cleanQ);
      const matchCode = b.code.toLowerCase().includes(cleanQ);
      const matchGroup = removeAccents(b.groupLabel.toLowerCase()).includes(cleanQ);
      const matchSummary = removeAccents(b.summary.toLowerCase()).includes(cleanQ);

      return matchName || matchShort || matchCode || matchGroup || matchSummary;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-beige)' }}>
      {/* ========================================================================= */}
      {/* 1. CLASSICAL SOLEMN HERO BANNER (ĐỒNG BỘ 100% GIAO DIỆN) */}
      {/* ========================================================================= */}
      <div
        style={{
          position: 'relative',
          backgroundImage: 'linear-gradient(180deg, rgba(15, 8, 8, 0.72) 0%, rgba(45, 15, 15, 0.60) 50%, rgba(15, 8, 8, 0.85) 100%), url("/images/jesus_antique_banner.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 22%',
          color: '#FFFFFF',
          padding: '24px 10px 30px',
          borderBottom: '1px solid rgba(217, 119, 6, 0.35)',
          boxShadow: 'inset 0 -12px 30px rgba(0,0,0,0.6)'
        }}
      >
        <div style={{ maxWidth: '1060px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumbs Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
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
                backdropFilter: 'blur(6px)'
              }}
              title="Quay lại Trang Chủ"
            >
              <ArrowLeft size={16} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#FDE68A', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
              <Link href="/" style={{ opacity: 0.9 }}>Trang chủ</Link>
              <span>/</span>
              <span style={{ fontWeight: 700, color: '#FFFFFF' }}>Kinh Thánh Trọn Bộ</span>
            </div>
          </div>

          {/* Title & Quick Read Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div>
              <h1
                style={{
                  fontSize: 'clamp(1.15rem, 3.5vw, 1.45rem)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  margin: 0,
                  color: '#FFFFFF',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(217, 119, 6, 0.4)'
                }}
              >
                Kinh Thánh Công Giáo Trọn Bộ
              </h1>
              <p
                style={{
                  margin: '3px 0 0',
                  fontSize: '0.8rem',
                  color: '#F3F4F6',
                  lineHeight: 1.35,
                  textShadow: '0 1px 4px rgba(0,0,0,0.8)'
                }}
              >
                Trọn bộ 73 cuốn Sách Thánh (46 Cựu Ước & 27 Tân Ước) • Bản dịch chuẩn KTCGKPV & HĐGMVN.
              </p>
            </div>

            {/* Quick Action Pill */}
            <Link
              href="/kinh-thanh/tin-mung-mat-theu/1"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '16px',
                background: 'rgba(0, 0, 0, 0.55)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.78rem',
                border: '1px solid rgba(253, 230, 138, 0.4)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                textDecoration: 'none'
              }}
            >
              <BookOpen size={14} color="#FDE68A" />
              <span>Đọc Tân Ước (Mát-thêu 1)</span>
            </Link>
          </div>

          {/* Liquid Glass Search Box */}
          <div style={{ position: 'relative', marginTop: '14px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#FDE68A',
                zIndex: 2
              }}
            />
            <input
              type="text"
              placeholder="Tìm kiếm sách (Sáng Thế, Mát-thêu, Thánh Vịnh...), mã (St, Mt, Tv)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 36px 10px 36px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.28)',
                fontSize: '0.88rem',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                outline: 'none',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '4px',
                  background: 'none',
                  border: 'none',
                  color: '#FDE68A',
                  cursor: 'pointer',
                  zIndex: 2
                }}
                title="Xóa tìm kiếm"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BODY CONTENT & TAB-BAR GOM THÀNH 1 HÀNG DUY NHẤT */}
      {/* ========================================================================= */}
      <div style={{ flex: 1, padding: '14px 8px 40px', maxWidth: '1060px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* TAB-BAR GOM THÀNH 1 HÀNG DUY NHẤT */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '6px',
            overflowX: 'auto',
            paddingBottom: '4px',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {CATEGORY_TABS.map(tab => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: isActive ? 'var(--color-red)' : 'var(--color-card-bg)',
                  color: isActive ? '#FFFFFF' : 'var(--color-dark)',
                  border: `1px solid ${isActive ? 'var(--color-red)' : 'var(--color-border-subtle)'}`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'var(--color-btn-subtle-bg)',
                      color: 'inherit'
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 3. GRID OF 73 BOOKS WITH RENAISSANCE ARTWORKS */}
        <div
          className="bible-books-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '14px',
            marginTop: '8px'
          }}
        >
            {filteredBooks.map((b) => {
              const art = getBibleBookArtwork(b.id, b.group);
              return (
                <div
                  key={b.id}
                  style={{
                    backgroundColor: 'var(--color-card-bg)',
                    borderRadius: '14px',
                    border: '1px solid var(--color-border-subtle)',
                    padding: '10px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                  }}
                  className="bible-card-hover"
                >
                  <div>
                    {/* Renaissance Masterpiece Card Image (Enlarged) */}
                    <div
                      onClick={() => setActiveBookModal(b)}
                      className="bible-book-img"
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '150px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        marginBottom: '10px',
                        backgroundColor: '#0F172A',
                        cursor: 'pointer',
                        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
                      }}
                    >
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          objectPosition: 'center 25%',
                          display: 'block'
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.2) 50%, transparent 100%)'
                        }}
                      />

                      {/* Top Badges */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          right: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '6px'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.66rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            backgroundColor: b.testament === 'new' ? 'rgba(30, 58, 138, 0.88)' : 'rgba(153, 27, 27, 0.88)',
                            color: '#FFFFFF',
                            backdropFilter: 'blur(4px)'
                          }}
                        >
                          {b.testament === 'new' ? 'Tân Ước' : 'Cựu Ước'} · {b.groupLabel}
                        </span>

                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(0,0,0,0.65)',
                            color: '#FDE047',
                            backdropFilter: 'blur(4px)'
                          }}
                        >
                          {b.totalChapters} Chương
                        </span>
                      </div>

                      {/* Bottom Artwork Info */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '6px',
                          left: '8px',
                          right: '8px',
                          color: '#FFFFFF'
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.76rem',
                            fontWeight: 800,
                            textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          [{b.code}] {art.title}
                        </div>
                        <div
                          style={{
                            fontSize: '0.64rem',
                            opacity: 0.85,
                            textShadow: '0 1px 2px rgba(0,0,0,0.9)'
                          }}
                        >
                          Họa sĩ: {art.artist}
                        </div>
                      </div>
                    </div>

                    {/* Book Name */}
                    <h3
                      style={{
                        margin: '0 0 4px',
                        fontSize: '0.98rem',
                        fontWeight: 900,
                        color: 'var(--color-dark)',
                        lineHeight: 1.3
                      }}
                    >
                      <Link
                        href={`/kinh-thanh/${b.id}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {b.name}
                      </Link>
                    </h3>

                    {/* Summary */}
                    <p
                      className="hide-mobile-summary"
                      style={{
                        margin: 0,
                        fontSize: '0.78rem',
                        color: 'var(--color-text-subtle)',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {b.summary}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '10px',
                      paddingTop: '8px',
                      borderTop: '1px solid var(--color-border-subtle)',
                      gap: '6px'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveBookModal(b)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-red)',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        padding: '4px 2px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>Mục lục ({b.totalChapters})</span>
                    </button>

                    <Link
                      href={`/kinh-thanh/${b.id}/1`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-red)',
                        color: '#FFFFFF',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        textDecoration: 'none',
                        boxShadow: '0 2px 6px rgba(183, 28, 28, 0.25)'
                      }}
                    >
                      <span>Đọc</span>
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Subtle Italicized Source Attribution Note (Non-clickable, Small & Muted) */}
        <div
          style={{
            marginTop: '36px',
            padding: '16px 0 28px',
            textAlign: 'center',
            fontSize: '0.74rem',
            fontStyle: 'italic',
            color: 'var(--color-text-subtle)',
            opacity: 0.7,
            lineHeight: 1.55,
            borderTop: '1px dashed var(--color-border-subtle)'
          }}
        >
          * Nguồn trích lục bản văn Kinh Thánh: augustino.net — Bản dịch Nhóm Phiên Dịch Các Giờ Kinh Phụng Vụ (KTCGKPV) &amp; Hội Đồng Giám Mục Việt Nam.
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .bible-books-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .bible-book-img {
            height: 125px !important;
          }
          .hide-mobile-summary {
            display: none !important;
          }
        }
        @media (min-width: 641px) {
          .bible-card-hover:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.09) !important;
          }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 5. CHAPTER SELECTOR MODAL */}
      {/* ========================================================================= */}
      {activeBookModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveBookModal(null);
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '85vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
              border: '1px solid var(--color-border-subtle)'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                backgroundColor: activeBookModal.testament === 'new' ? '#1E3A8A' : '#991B1B',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.85 }}>
                  {activeBookModal.groupLabel} · [{activeBookModal.code}]
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.25rem', fontWeight: 800 }}>
                  {activeBookModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveBookModal(null)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 800
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Artwork Banner & Chapter Grid */}
            <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1 }}>
              {(() => {
                const modalArt = getBibleBookArtwork(activeBookModal.id, activeBookModal.group);
                return (
                  <div
                    style={{
                      borderRadius: '14px',
                      overflow: 'hidden',
                      marginBottom: '18px',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'var(--color-card-bg)',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
                    }}
                  >
                    {/* Full Artwork Image Container (No Cropping) */}
                    <div
                      style={{
                        width: '100%',
                        backgroundColor: '#0B0F19',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        maxHeight: '340px'
                      }}
                    >
                      <img
                        src={modalArt.imageUrl}
                        alt={modalArt.title}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '340px',
                          objectFit: 'contain',
                          display: 'block'
                        }}
                      />
                    </div>

                    {/* Artwork Information Box (High Contrast) */}
                    <div
                      style={{
                        padding: '12px 16px',
                        backgroundColor: 'var(--color-card-bg)',
                        borderTop: '1px solid var(--color-border-subtle)'
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
                            fontSize: '0.94rem',
                            fontWeight: 800,
                            color: 'var(--color-dark)'
                          }}
                        >
                          {modalArt.title}
                        </div>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '10px',
                            backgroundColor: 'rgba(183, 28, 28, 0.1)',
                            color: 'var(--color-red)'
                          }}
                        >
                          Tranh Phục Hưng
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: '0.76rem',
                          color: 'var(--color-red)',
                          fontWeight: 700,
                          marginBottom: '6px'
                        }}
                      >
                        Họa sĩ: {modalArt.artist} {modalArt.year ? `• ${modalArt.year}` : ''}
                      </div>

                      {modalArt.description && (
                        <div
                          style={{
                            fontSize: '0.8rem',
                            color: 'var(--color-text-subtle)',
                            lineHeight: 1.5,
                            marginTop: '4px'
                          }}
                        >
                          {modalArt.description}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              <p style={{ margin: '0 0 12px', fontSize: '0.84rem', color: 'var(--color-text-subtle)', fontWeight: 600 }}>
                Chọn chương bạn muốn đọc ({activeBookModal.totalChapters} chương):
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(48px, 1fr))',
                  gap: '6px'
                }}
              >
                {Array.from({ length: activeBookModal.totalChapters }, (_, i) => i + 1).map((chNum) => (
                  <Link
                    key={chNum}
                    href={`/kinh-thanh/${activeBookModal.id}/${chNum}`}
                    onClick={() => setActiveBookModal(null)}
                    style={{
                      padding: '10px 0',
                      textAlign: 'center',
                      borderRadius: '10px',
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-dark)',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {chNum}
                  </Link>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '14px 24px',
                backgroundColor: 'var(--color-bg)',
                borderTop: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <a
                href={activeBookModal.onlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--color-red)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ExternalLink size={13} />
                <span>Nguồn gốc augustino.net</span>
              </a>

              <button
                type="button"
                onClick={() => setActiveBookModal(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: 'var(--color-card-bg)',
                  color: 'var(--color-dark)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
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
