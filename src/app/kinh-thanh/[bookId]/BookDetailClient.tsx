'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  Layers,
  Share2,
  Quote
} from 'lucide-react';
import { BibleBookInfo } from '@/lib/bible/types';
import { BibleArtwork } from '@/lib/bible/bibleArtworks';
import { CatholicBookIntro } from '@/lib/bible/bibleIntroductions';
import BibleCardShareModal from '@/components/BibleCardShareModal';

interface Props {
  book: BibleBookInfo;
  artwork: BibleArtwork;
  intro: CatholicBookIntro;
}

export default function BookDetailClient({ book, artwork, intro }: Props) {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* 1. TOP HEADER & BREADCRUMB */}
      <div
        style={{
          borderBottom: '1px solid var(--color-border-subtle)',
          backgroundColor: 'var(--color-card-bg)',
          padding: '16px 0',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backdropFilter: 'blur(10px)'
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          {/* Back link */}
          <Link
            href="/kinh-thanh"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-red)',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: 700
            }}
          >
            <ArrowLeft size={16} />
            <span>Thư Viện 73 Sách</span>
          </Link>

          {/* Book Badges & Share Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '12px',
                backgroundColor: book.testament === 'old' ? 'rgba(183, 28, 28, 0.1)' : 'rgba(30, 64, 175, 0.1)',
                color: book.testament === 'old' ? 'var(--color-red)' : '#1E40AF'
              }}
            >
              {book.testament === 'old' ? 'Cựu Ước' : 'Tân Ước'}
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-subtle)',
                border: '1px solid var(--color-border-subtle)'
              }}
            >
              {book.groupLabel}
            </span>

            {/* Share Card Button */}
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(217, 119, 6, 0.4)',
                background: 'linear-gradient(135deg, #B45309 0%, #D97706 100%)',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              <Share2 size={13} />
              <span>Chia Sẻ Lời Chúa</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT & CHAPTERS DIRECTORY */}
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 16px 64px' }}>
        {/* Sacred Renaissance Artwork Banner (FULL COVER, NO BLACK LETTERBOXING) */}
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
            {/* Full Artwork Image Container */}
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
                src={artwork.imageUrl}
                alt={artwork.title}
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
                  bottom: '14px',
                  left: '16px',
                  right: '16px'
                }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 5px rgba(0,0,0,0.9)' }}>
                  {artwork.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#F3E5AB', opacity: 0.95, marginTop: '3px' }}>
                  Họa sĩ: {artwork.artist} {artwork.year ? `• ${artwork.year}` : ''}
                </div>
              </div>
            </div>

            {/* Banner Bottom Sub-bar */}
            <div
              style={{
                padding: '14px 20px',
                backgroundColor: 'var(--color-card-bg)',
                borderTop: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    backgroundColor: '#B71C1C',
                    color: '#FFF',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    padding: '3px 10px',
                    borderRadius: '8px'
                  }}
                >
                  {book.code}
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                  {book.name}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShareOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
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
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DẪN NHẬP KINH THÁNH CÔNG GIÁO CHUẨN MỰC */}
        {/* ========================================================================= */}
        <div
          style={{
            backgroundColor: 'var(--color-card-bg)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: '16px',
            padding: '20px 22px',
            marginBottom: '28px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <BookOpen size={20} color="var(--color-red)" />
            <h2 style={{ margin: 0, fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-dark)' }}>
              Dẫn Nhập Sách &amp; Sứ Điệp Thần Học Công Giáo
            </h2>
          </div>

          {/* Key Verse Highlight */}
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(212, 175, 55, 0.08)',
              borderLeft: '4px solid #D4AF37',
              marginBottom: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', fontWeight: 800, color: '#B45309', marginBottom: '4px' }}>
              <Quote size={13} /> CÂU KINH THÁNH TÂM ĐẮC
            </div>
            <p style={{ margin: 0, fontSize: '0.92rem', fontStyle: 'italic', color: 'var(--color-dark)', lineHeight: 1.55 }}>
              &ldquo;{intro.keyVerse}&rdquo;
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {/* Author & Context */}
            <div style={{ padding: '12px 14px', borderRadius: '12px', backgroundColor: 'var(--color-input-bg)', border: '1px solid var(--color-border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-red)', marginBottom: '5px' }}>
                <BookOpen size={14} />
                <span>Bối Cảnh Lịch Sử &amp; Tác Giả</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--color-dark)', lineHeight: 1.5 }}>
                {intro.authorContext}
              </p>
            </div>

            {/* Core Message */}
            <div style={{ padding: '12px 14px', borderRadius: '12px', backgroundColor: 'var(--color-input-bg)', border: '1px solid var(--color-border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', fontWeight: 800, color: '#059669', marginBottom: '5px' }}>
                <Sparkles size={14} />
                <span>Sứ Điệp Cốt Lõi &amp; Ơn Cứu Độ</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--color-dark)', lineHeight: 1.5 }}>
                {intro.coreMessage}
              </p>
            </div>

            {/* Structure */}
            <div style={{ gridColumn: '1 / -1', padding: '12px 14px', borderRadius: '12px', backgroundColor: 'var(--color-input-bg)', border: '1px solid var(--color-border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', fontWeight: 800, color: '#2563EB', marginBottom: '5px' }}>
                <Layers size={14} />
                <span>Bố Cục &amp; Nội Dung Chính</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--color-dark)', lineHeight: 1.5 }}>
                {intro.structure}
              </p>
            </div>
          </div>
        </div>

        {/* Chapters Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-dark)' }}>
              Mục Lục Toàn Bộ Các Chương ({book.totalChapters} Chương)
            </h2>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-subtle)' }}>
              Chọn chương bất kỳ để đọc trực tiếp bản dịch KTCGKPV &amp; HĐGMVN:
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

        {/* Church Attribution Notice */}
        <div
          style={{
            marginTop: '32px',
            padding: '16px 0 24px',
            textAlign: 'center',
            fontSize: '0.74rem',
            fontStyle: 'italic',
            color: 'var(--color-subtle)',
            opacity: 0.8,
            lineHeight: 1.55,
            borderTop: '1px dashed var(--color-border-subtle)'
          }}
        >
          * Bản văn Lời Chúa &amp; Kinh Thánh: Bản dịch Nhóm Phiên Dịch Các Giờ Kinh Phụng Vụ (KTCGKPV) &amp; Hội Đồng Giám Mục Việt Nam.
        </div>
      </main>

      {/* Share Collectible Art Card Modal */}
      {artwork && (
        <BibleCardShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          book={book}
          artwork={artwork}
          intro={intro}
        />
      )}
    </div>
  );
}
