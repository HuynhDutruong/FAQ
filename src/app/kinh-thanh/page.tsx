'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Sparkles,
  ChevronRight,
  Globe,
  X,
  Layers,
  Flame,
  Bookmark,
  Compass,
  ArrowRight,
  Share2,
  Quote,
  User
} from 'lucide-react';
import { BIBLE_BOOKS, BIBLE_SUMMARY_INFO, BibleBookInfo, Testament, BibleBookGroup, getBibleBookArtwork } from '@/lib/bible';
import { getCatholicBookIntro } from '@/lib/bible/bibleIntroductions';
import { removeAccents } from '@/lib/textUtils';
import BibleCardShareModal from '@/components/BibleCardShareModal';

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
  const [activeTab, setActiveTab] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBookModal, setActiveBookModal] = useState<BibleBookInfo | null>(null);
  const [shareModalBook, setShareModalBook] = useState<BibleBookInfo | null>(null);

  // Lọc sách theo Tab & Ô Tìm kiếm
  const filteredBooks = useMemo(() => {
    let list = BIBLE_BOOKS;

    if (activeTab === 'old' || activeTab === 'new') {
      list = list.filter((b) => b.testament === activeTab);
    } else if (activeTab !== 'all') {
      list = list.filter((b) => b.group === activeTab);
    }

    if (searchQuery.trim()) {
      const q = removeAccents(searchQuery.trim().toLowerCase());
      list = list.filter((b) => {
        const nameMatch = removeAccents(b.name.toLowerCase()).includes(q);
        const codeMatch = removeAccents(b.code.toLowerCase()).includes(q);
        const shortNameMatch = removeAccents(b.shortName.toLowerCase()).includes(q);
        const groupMatch = removeAccents(b.groupLabel.toLowerCase()).includes(q);
        return nameMatch || codeMatch || shortNameMatch || groupMatch;
      });
    }

    return list;
  }, [activeTab, searchQuery]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* 1. HERO HEADER (UNIFIED SACRED BANNER) */}
      <header
        style={{
          position: 'relative',
          backgroundImage:
            'linear-gradient(180deg, rgba(15, 8, 8, 0.82) 0%, rgba(45, 15, 15, 0.70) 50%, rgba(15, 8, 8, 0.92) 100%), url("/images/bible/creation_of_adam.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          color: '#FFFFFF',
          padding: '20px 14px 26px',
          borderBottom: '1px solid rgba(217, 119, 6, 0.35)',
          boxShadow: 'inset 0 -12px 28px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
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
                fontSize: '0.78rem',
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
              <span style={{ fontWeight: 700, color: '#FFFFFF' }}>Kinh Thánh Trọn Bộ (73 Sách)</span>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: '#FDE68A',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '3px'
              }}
            >
              QUY ĐIỂN CÔNG GIÁO • 46 CỰU ƯỚC • 27 TÂN ƯỚC
            </div>
            <h1
              style={{
                fontSize: 'clamp(1.25rem, 4.2vw, 1.85rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                margin: 0,
                color: '#FFFFFF',
                lineHeight: 1.25,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
              }}
            >
              Kinh Thánh Trọn Bộ (73 Cuốn)
            </h1>
            <p
              style={{
                margin: '6px 0 14px',
                fontSize: '0.84rem',
                color: '#E2E8F0',
                lineHeight: 1.45,
                maxWidth: '760px',
                opacity: 0.95
              }}
            >
              Bản dịch chính thức của <strong>Nhóm Phiên Dịch Các Giờ Kinh Phụng Vụ (KTCGKPV)</strong> &amp; <strong>Hội Đồng Giám Mục Việt Nam</strong>.
            </p>

            {/* Quick Stats Badges */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <div
                style={{
                  padding: '4px 12px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(253, 230, 138, 0.25)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#FDE68A'
                }}
              >
                <Layers size={13} color="#FBBF24" />
                <span>46 Sách Cựu Ước (929 Chương)</span>
              </div>
              <div
                style={{
                  padding: '4px 12px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(253, 230, 138, 0.25)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#FDE68A'
                }}
              >
                <Flame size={13} color="#F87171" />
                <span>27 Sách Tân Ước (260 Chương)</span>
              </div>
              <div
                style={{
                  padding: '4px 12px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(253, 230, 138, 0.25)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#FDE68A'
                }}
              >
                <Sparkles size={13} color="#34D399" />
                <span>1.189 Chương Đầy Đủ</span>
              </div>
              <Link
                href="/kinh-thanh/nhan-vat"
                style={{
                  padding: '4px 12px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(217, 119, 6, 0.2)',
                  border: '1px solid rgba(217, 119, 6, 0.4)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#FDE68A',
                  textDecoration: 'none'
                }}
              >
                <User size={13} color="#FDE68A" />
                <span>Từ Điển Nhân Vật</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 2. SEARCH & FILTER SECTION */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backgroundColor: 'var(--color-card-bg)',
          borderBottom: '1px solid var(--color-border-subtle)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          padding: '12px 16px'
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-subtle)'
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sách Kinh Thánh (VD: Sáng Thế, Mát-thêu, St, Mt, Khải Huyền...)"
              style={{
                width: '100%',
                padding: '10px 38px 10px 42px',
                borderRadius: '10px',
                border: '1px solid var(--color-input-border)',
                backgroundColor: 'var(--color-input-bg)',
                color: 'var(--color-input-text)',
                fontSize: '0.9rem',
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
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-subtle)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Horizontal Scrollable Category Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '4px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-red)' : 'var(--color-border-subtle)',
                    backgroundColor: isActive ? 'var(--color-red)' : 'var(--color-bg)',
                    color: isActive ? '#FFFFFF' : 'var(--color-dark)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '1px 6px',
                        borderRadius: '10px',
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--color-card-bg)',
                        color: isActive ? '#FFFFFF' : 'var(--color-subtle)'
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. 73 BOOKS GRID LIST */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '24px 16px 64px' }}>
        {/* Results Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-dark)' }}>
            Danh Sách Sách ({filteredBooks.length} / 73 Sách)
          </div>
          {searchQuery && (
            <div style={{ fontSize: '0.8rem', color: 'var(--color-subtle)' }}>
              Kết quả tìm kiếm cho: &ldquo;<strong>{searchQuery}</strong>&rdquo;
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '16px',
              border: '1px dashed var(--color-border-subtle)'
            }}
          >
            <BookOpen size={48} color="var(--color-subtle)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 6px' }}>
              Không tìm thấy sách phù hợp
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-subtle)', margin: '0 0 16px' }}>
              Vui lòng thử tìm kiếm theo tên viết tắt (St, Mt, Mc, Lc, Ga...) hoặc chọn lại chuyên mục.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'var(--color-red)',
                color: '#FFF',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Xem Tất Cả 73 Sách
            </button>
          </div>
        )}

        {/* Grid of 73 Books */}
        <div
          className="bible-books-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px'
          }}
        >
          {filteredBooks.map((book) => {
            const artwork = getBibleBookArtwork(book.id, book.group);

            return (
              <div
                key={book.id}
                onClick={() => setActiveBookModal(book)}
                className="book-card-container"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border-subtle)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
              >
                {/* 1. Artwork Thumbnail */}
                <div
                  className="book-card-thumb-wrapper"
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 10',
                    backgroundColor: 'var(--color-bg)',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="bible-book-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    loading="lazy"
                  />
                  {/* Overlay Gradient for readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 50%)'
                    }}
                  />
                  {/* Top Testament Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      display: 'flex',
                      gap: '4px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: '6px',
                        backgroundColor: book.testament === 'old' ? '#B71C1C' : '#1D4ED8',
                        color: '#FFFFFF',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.25)'
                      }}
                    >
                      {book.testament === 'old' ? 'Cựu Ước' : 'Tân Ước'}
                    </span>
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(0,0,0,0.65)',
                        color: '#FFFFFF',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      {book.code}
                    </span>
                  </div>

                  {/* Bottom Artwork Title Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '8px',
                      right: '8px'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textShadow: '0 1px 3px rgba(0,0,0,0.9)'
                      }}
                    >
                      {artwork.title}
                    </div>
                  </div>
                </div>

                {/* 2. Book Info Details */}
                <div
                  className="book-card-info"
                  style={{
                    padding: '14px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-subtle)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {book.groupLabel}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          color: 'var(--color-red)',
                          padding: '1px 7px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(211, 47, 47, 0.08)',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {book.totalChapters} Chương
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 800,
                        color: 'var(--color-dark)',
                        margin: '0 0 4px',
                        lineHeight: 1.35
                      }}
                    >
                      {book.name}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--color-subtle)',
                        margin: 0,
                        lineHeight: 1.45,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {book.summary}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '12px',
                      paddingTop: '8px',
                      borderTop: '1px solid var(--color-border-subtle)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--color-red)'
                    }}
                  >
                    <span>Mở đọc &amp; Dẫn nhập</span>
                    <ChevronRight size={15} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Source Attribution Note */}
        <div
          style={{
            marginTop: '40px',
            padding: '16px 0',
            textAlign: 'center',
            fontSize: '0.76rem',
            fontStyle: 'italic',
            color: 'var(--color-subtle)',
            lineHeight: 1.55,
            borderTop: '1px dashed var(--color-border-subtle)'
          }}
        >
          * Bản văn Lời Chúa &amp; Kinh Thánh: Bản dịch Nhóm Phiên Dịch Các Giờ Kinh Phụng Vụ (KTCGKPV) &amp; Hội Đồng Giám Mục Việt Nam.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOOK OVERVIEW & CATHOLIC INTRODUCTION MODAL */}
      {/* ========================================================================= */}
      {activeBookModal && (
        <div
          onClick={() => setActiveBookModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '640px',
              maxHeight: '92vh',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '20px',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '14px 18px',
                backgroundColor: 'var(--color-card-bg)',
                borderBottom: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    backgroundColor: activeBookModal.testament === 'old' ? '#B71C1C' : '#1D4ED8',
                    color: '#FFF',
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {activeBookModal.code}
                </span>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                  {activeBookModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveBookModal(null)}
                style={{
                  background: 'var(--color-input-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  color: 'var(--color-dark)',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '16px', overflowY: 'auto', flex: 1 }}>
              {(() => {
                const modalArt = getBibleBookArtwork(activeBookModal.id, activeBookModal.group);
                const intro = getCatholicBookIntro(activeBookModal.id, activeBookModal.name, activeBookModal.groupLabel, activeBookModal.totalChapters);

                return (
                  <div>
                    {/* Full Artwork Banner */}
                    <div
                      style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        marginBottom: '14px',
                        border: '1px solid var(--color-border-subtle)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          position: 'relative',
                          aspectRatio: '16 / 9',
                          backgroundColor: 'var(--color-bg)',
                          overflow: 'hidden'
                        }}
                      >
                        <img
                          src={modalArt.imageUrl}
                          alt={modalArt.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 55%)'
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '12px',
                            right: '12px'
                          }}
                        >
                          <div style={{ fontSize: '0.98rem', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                            {modalArt.title}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#F3E5AB', opacity: 0.95, marginTop: '2px' }}>
                            Họa sĩ: {modalArt.artist} {modalArt.year ? `• ${modalArt.year}` : ''}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DẪN NHẬP KINH THÁNH CÔNG GIÁO */}
                    <div
                      style={{
                        backgroundColor: 'var(--color-input-bg)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '12px',
                        padding: '12px 14px',
                        marginBottom: '14px'
                      }}
                    >
                      {/* Key Verse */}
                      <div
                        style={{
                          padding: '8px 10px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(212, 175, 55, 0.1)',
                          borderLeft: '3px solid #D4AF37',
                          marginBottom: '10px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', fontWeight: 800, color: '#B45309', marginBottom: '2px' }}>
                          <Quote size={11} /> CÂU LỜI CHÚA TÂM ĐẮC
                        </div>
                        <p style={{ margin: 0, fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-dark)', lineHeight: 1.45 }}>
                          {intro.keyVerse}
                        </p>
                      </div>

                      {/* Author & Message Details */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-red)', marginBottom: '2px' }}>
                            <BookOpen size={12} />
                            <span>Bối Cảnh &amp; Tác Giả:</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--color-dark)', lineHeight: 1.4 }}>
                            {intro.authorContext}
                          </p>
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', fontWeight: 800, color: '#059669', marginBottom: '2px' }}>
                            <Sparkles size={12} />
                            <span>Sứ Điệp Ơn Cứu Độ:</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--color-dark)', lineHeight: 1.4 }}>
                            {intro.coreMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Chapters Selection Grid */}
              <p style={{ margin: '0 0 8px', fontSize: '0.82rem', color: 'var(--color-dark)', fontWeight: 800 }}>
                Chọn chương đọc ({activeBookModal.totalChapters} chương):
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(42px, 1fr))',
                  gap: '6px'
                }}
              >
                {Array.from({ length: activeBookModal.totalChapters }, (_, i) => i + 1).map((chNum) => (
                  <Link
                    key={chNum}
                    href={`/kinh-thanh/${activeBookModal.id}/${chNum}`}
                    onClick={() => setActiveBookModal(null)}
                    style={{
                      padding: '8px 0',
                      textAlign: 'center',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-input-bg)',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-dark)',
                      fontSize: '0.84rem',
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
                padding: '12px 16px',
                backgroundColor: 'var(--color-input-bg)',
                borderTop: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px'
              }}
            >
              {/* Share Card Button */}
              <button
                type="button"
                onClick={() => {
                  const target = activeBookModal;
                  setActiveBookModal(null);
                  setShareModalBook(target);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(217, 119, 6, 0.4)',
                  background: 'linear-gradient(135deg, #B45309 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                <Share2 size={14} />
                <span>Chia Sẻ Lời Chúa</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveBookModal(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: 'var(--color-card-bg)',
                  color: 'var(--color-dark)',
                  fontSize: '0.8rem',
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

      {/* Share Collectible Card Modal */}
      {shareModalBook && (() => {
        const shareArt = getBibleBookArtwork(shareModalBook.id, shareModalBook.group);
        const shareIntro = getCatholicBookIntro(shareModalBook.id, shareModalBook.name, shareModalBook.groupLabel, shareModalBook.totalChapters);
        return (
          <BibleCardShareModal
            isOpen={true}
            onClose={() => setShareModalBook(null)}
            book={shareModalBook}
            artwork={shareArt}
            intro={shareIntro}
          />
        );
      })()}

      <style jsx global>{`
        @media (max-width: 640px) {
          .bible-books-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .book-card-container {
            flex-direction: row !important;
            align-items: stretch !important;
            border-radius: 14px !important;
          }
          .book-card-thumb-wrapper {
            width: 120px !important;
            min-width: 120px !important;
            max-width: 120px !important;
            aspect-ratio: auto !important;
            height: 100% !important;
            min-height: 130px !important;
          }
          .book-card-info {
            padding: 10px 12px !important;
          }
        }
      `}</style>
    </main>
  );
}
