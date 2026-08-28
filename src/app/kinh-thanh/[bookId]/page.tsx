import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Calendar,
  Layers,
  Compass
} from 'lucide-react';
import { getBibleBook, getBibleBookArtwork, BIBLE_BOOKS } from '@/lib/bible';

interface Props {
  params: Promise<{ bookId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { bookId } = await params;
  const book = getBibleBook(bookId);
  if (!book) return { title: 'Kinh Thánh Công Giáo Trọn Bộ' };
  return {
    title: `${book.name} (${book.totalChapters} Chương) - Kinh Thánh Công Giáo Trọn Bộ`,
    description: `${book.summary} - Bản dịch chuẩn KTCGKPV & Hội Đồng Giám Mục Việt Nam (HĐGMVN).`
  };
}

export default async function BookOverviewPage({ params }: Props) {
  const { bookId } = await params;
  const book = getBibleBook(bookId);
  if (!book) notFound();

  const artwork = getBibleBookArtwork(book.id, book.group);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* 1. TOP HEADER BANNER */}
      <div
        style={{
          position: 'relative',
          padding: '16px 16px 28px',
          backgroundImage: 'url(/images/jesus_antique_banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          color: '#FFFFFF',
          borderBottom: '2px solid rgba(217, 119, 6, 0.4)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 20, 10, 0.82) 100%)'
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '960px', margin: '0 auto' }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Link
              href="/kinh-thanh"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#FFFFFF',
                border: '1px solid rgba(253, 230, 138, 0.3)',
                backdropFilter: 'blur(6px)',
                textDecoration: 'none'
              }}
              title="Danh mục 73 Sách"
            >
              <ArrowLeft size={16} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#FDE68A' }}>
              <Link href="/" style={{ opacity: 0.9 }}>Trang chủ</Link>
              <span>/</span>
              <Link href="/kinh-thanh" style={{ opacity: 0.9 }}>Kinh Thánh</Link>
              <span>/</span>
              <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{book.name}</span>
            </div>
          </div>

          {/* Book Header Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: '16px',
                    backgroundColor: book.testament === 'new' ? '#1E3A8A' : '#991B1B',
                    color: '#FFFFFF'
                  }}
                >
                  {book.testament === 'new' ? 'Tân Ước' : 'Cựu Ước'} · {book.groupLabel}
                </span>
                <span style={{ fontSize: '0.74rem', color: '#FDE68A', fontWeight: 700 }}>
                  [{book.code}] · {book.totalChapters} Chương
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
                  fontWeight: 900,
                  margin: '0 0 6px',
                  color: '#FFFFFF',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                }}
              >
                {book.name}
              </h1>

              <p
                style={{
                  margin: 0,
                  fontSize: '0.86rem',
                  color: '#F3F4F6',
                  lineHeight: 1.45,
                  maxWidth: '680px',
                  textShadow: '0 1px 4px rgba(0,0,0,0.8)'
                }}
              >
                {book.summary}
              </p>
            </div>

            {/* Direct Reading Button */}
            <Link
              href={`/kinh-thanh/${book.id}/1`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-red)',
                color: '#FFFFFF',
                fontSize: '0.88rem',
                fontWeight: 800,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(183, 28, 28, 0.4)',
                flexShrink: 0
              }}
            >
              <BookOpen size={16} />
              <span>Bắt Đầu Đọc (Chương 1)</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT & CHAPTERS DIRECTORY */}
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 16px 64px' }}>
        {/* Sacred Renaissance Artwork Banner */}
        {artwork && (
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '28px',
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: '0 4px 18px rgba(0,0,0,0.06)'
            }}
          >
            {/* Full Artwork Image */}
            <div
              style={{
                width: '100%',
                backgroundColor: '#0B0F19',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                maxHeight: '380px'
              }}
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '380px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>

            {/* Information & Description Box Below */}
            <div
              style={{
                padding: '16px 20px',
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
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '12px', backgroundColor: 'rgba(183, 28, 28, 0.1)', color: 'var(--color-red)' }}>
                  <Sparkles size={12} /> TRANH NGHỆ THUẬT PHỤC HƯNG & CỔ ĐIỂN
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-text-subtle)', fontWeight: 700 }}>
                  Họa sĩ: <strong style={{ color: 'var(--color-dark)' }}>{artwork.artist}</strong> {artwork.year ? `• ${artwork.year}` : ''}
                </div>
              </div>

              <h2
                style={{
                  margin: '8px 0 6px',
                  fontSize: 'clamp(1.05rem, 3vw, 1.25rem)',
                  fontWeight: 900,
                  color: 'var(--color-dark)',
                  lineHeight: 1.3
                }}
              >
                {artwork.title}
              </h2>

              {artwork.description && (
                <div
                  style={{
                    fontSize: '0.86rem',
                    color: 'var(--color-text-subtle)',
                    lineHeight: 1.55,
                    marginTop: '6px'
                  }}
                >
                  {artwork.description}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chapters Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-dark)' }}>
              Mục Lục Toàn Bộ Các Chương ({book.totalChapters} Chương)
            </h2>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-subtle)' }}>
              Chọn chương bất kỳ để đọc trực tiếp bản dịch KTCGKPV & HĐGMVN:
            </p>
          </div>
        </div>

        {/* Chapters Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
            gap: '8px',
            marginBottom: '36px'
          }}
        >
          {Array.from({ length: book.totalChapters }, (_, i) => i + 1).map((chNum) => (
            <Link
              key={chNum}
              href={`/kinh-thanh/${book.id}/${chNum}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 6px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                color: 'var(--color-dark)',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
              className="chapter-btn-hover"
            >
              <span style={{ fontSize: '0.66rem', color: 'var(--color-subtle)', fontWeight: 600 }}>Chương</span>
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-red)' }}>{chNum}</span>
            </Link>
          ))}
        </div>

        {/* Subtle Italicized Source Attribution Note (Non-clickable, Small & Muted) */}
        <div
          style={{
            marginTop: '32px',
            padding: '16px 0 24px',
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
      </main>
    </div>
  );
}
