'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Layers,
  ChevronRight,
  Bookmark,
  Share2,
  Check,
  Sparkles,
  Calendar
} from 'lucide-react';
import { getBookById } from '@/lib/library';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Book3DCover from '@/components/Book3DCover';

export default function BookDetailPage({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = use(params);
  const { t } = useLanguage();
  const book = getBookById(bookId);
  const [readingProgress, setReadingProgress] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!book) return;
    try {
      const stored = localStorage.getItem(`reading_progress_${book.id}`);
      if (stored) {
        setReadingProgress(JSON.parse(stored));
      }
    } catch {}
  }, [book]);

  const handleShare = async () => {
    if (!book) return;
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = `📖 ${book.title} — ${book.author}\n${book.summary}\n\nĐọc tại: ${url}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: book.title, text, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!book) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.4rem', color: 'var(--color-red)' }}>Không tìm thấy cuốn sách này</h1>
        <p style={{ color: 'var(--color-subtle)', marginBottom: '20px' }}>Tác phẩm có thể đã được cập nhật hoặc không tồn tại trong hệ thống.</p>
        <Link
          href="/thu-vien"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-red)',
            color: '#FFFFFF',
            fontWeight: 700,
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={16} />
          <span>Quay lại Thư Viện</span>
        </Link>
      </main>
    );
  }

  const continueChapter = readingProgress?.chapterId
    ? book.chapters.find(c => c.id === readingProgress.chapterId) || book.chapters[0]
    : book.chapters[0];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-main-bg)', paddingBottom: '64px' }}>
      {/* 1. TOP BOOK HERO BANNER */}
      <section
        style={{
          background: `linear-gradient(135deg, ${book.coverColor} 0%, #0F172A 100%)`,
          color: '#FFFFFF',
          padding: '36px 16px 44px',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          {/* Breadcrumb back */}
          <Link
            href="/thu-vien"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '0.84rem',
              fontWeight: 700,
              textDecoration: 'none',
              marginBottom: '24px'
            }}
          >
            <ArrowLeft size={16} />
            <span>Thư Viện Sách</span>
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '36px', alignItems: 'center' }}>
            {/* 3D Realistic Book Cover Showcase */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Book3DCover book={book} size="lg" />
            </div>

            {/* Book Meta Details & CTAs */}
            <div>
              <span style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#FDE68A',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '8px'
              }}>
                {book.categoryLabel}
              </span>

              <h1 style={{
                margin: '0 0 8px',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                fontWeight: 900,
                lineHeight: 1.25,
                fontFamily: 'Georgia, serif'
              }}>
                {book.title}
              </h1>

              {book.originalTitle && (
                <p style={{ margin: '0 0 14px', fontSize: '0.94rem', opacity: 0.88, fontStyle: 'italic' }}>
                  {book.originalTitle}
                </p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.84rem', opacity: 0.9, marginBottom: '18px', flexWrap: 'wrap' }}>
                <span>✍️ <strong>{book.author}</strong></span>
                <span>📖 <strong>{book.totalChapters}</strong> Chương mục</span>
                <span>⏱ ~<strong>{book.estimatedReadingMinutes}</strong> phút đọc</span>
              </div>

              <p style={{ margin: '0 0 24px', fontSize: '0.94rem', opacity: 0.95, lineHeight: 1.65 }}>
                {book.description}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link
                  href={`/thu-vien/${book.id}/${continueChapter.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    fontSize: '0.96rem',
                    fontWeight: 800,
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(220,38,38,0.4)',
                    transition: 'transform 0.15s ease'
                  }}
                >
                  <BookOpen size={18} />
                  <span>{readingProgress ? `Đọc tiếp (Chương ${continueChapter.number})` : 'Bắt đầu đọc (Chương 1)'}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleShare}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {copied ? <Check size={16} color="#4ADE80" /> : <Share2 size={16} />}
                  <span>{copied ? 'Đã sao chép' : 'Chia sẻ'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABLE OF CONTENTS SECTION */}
      <div style={{ maxWidth: '980px', margin: '32px auto 0', padding: '0 16px' }}>
        <div style={{
          backgroundColor: 'var(--color-card-bg)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid var(--color-red)',
            paddingBottom: '14px',
            marginBottom: '20px'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'var(--color-red)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Layers size={20} />
              <span>Mục Lục Toàn Bộ Tác Phẩm ({book.chapters.length} Chương)</span>
            </h2>
          </div>

          {/* Chapters List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {book.chapters.map(c => (
              <Link
                key={c.id}
                href={`/thu-vien/${book.id}/${c.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.15s ease'
                }}
                className="news-card-hover"
              >
                {/* Chapter Number Badge */}
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-red)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.94rem',
                  fontWeight: 900,
                  flexShrink: 0
                }}>
                  {c.number}
                </div>

                {/* Chapter Title & Summary */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{
                    margin: '0 0 4px',
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: 'var(--color-dark)',
                    lineHeight: 1.35
                  }}>
                    {c.title}
                  </h3>

                  {c.subtitle && (
                    <p style={{
                      margin: 0,
                      fontSize: '0.84rem',
                      color: 'var(--color-muted)',
                      lineHeight: 1.45,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {c.subtitle}
                    </p>
                  )}
                </div>

                {/* Right Action */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  color: 'var(--color-red)',
                  flexShrink: 0
                }}>
                  <span className="hide-mobile">Đọc chương</span>
                  <ChevronRight size={16} />
                </div>
              </Link>
            ))}
          </div>

          {/* Tags */}
          {book.tags.length > 0 && (
            <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-subtle)' }}>Từ khóa:</span>
              {book.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-btn-subtle-bg)',
                    color: 'var(--color-dark)'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
