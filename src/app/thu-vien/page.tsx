'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Sparkles,
  Flame,
  Bookmark,
  Clock,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  BookMarked
} from 'lucide-react';
import { ALL_BOOKS, BOOK_CATEGORIES, BookCategory, Book } from '@/lib/library';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { removeAccents } from '@/lib/massTimes';
import Book3DCover from '@/components/Book3DCover';

export default function ThuVienPage() {
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentProgress, setRecentProgress] = useState<any[]>([]);

  // Load reading progress from localStorage
  useEffect(() => {
    try {
      const items: any[] = [];
      ALL_BOOKS.forEach(b => {
        const stored = localStorage.getItem(`reading_progress_${b.id}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          const ch = b.chapters.find(c => c.id === parsed.chapterId) || b.chapters[0];
          items.push({
            book: b,
            chapter: ch,
            percentage: parsed.percentage,
            lastReadAt: parsed.lastReadAt
          });
        }
      });
      items.sort((a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime());
      setRecentProgress(items.slice(0, 3));
    } catch {
      // Ignore
    }
  }, []);

  // Filter books based on search and category
  const filteredBooks = useMemo(() => {
    const cleanQ = removeAccents(searchQuery.toLowerCase().trim());
    return ALL_BOOKS.filter(book => {
      const matchCategory = selectedCategory === 'all' || book.category === selectedCategory;
      if (!matchCategory) return false;
      if (!cleanQ) return true;

      const matchTitle = removeAccents(book.title.toLowerCase()).includes(cleanQ);
      const matchAuthor = removeAccents(book.author.toLowerCase()).includes(cleanQ);
      const matchSummary = removeAccents(book.summary.toLowerCase()).includes(cleanQ);
      const matchTags = book.tags.some(t => removeAccents(t.toLowerCase()).includes(cleanQ));
      const matchChapter = book.chapters.some(c =>
        removeAccents(c.title.toLowerCase()).includes(cleanQ)
      );

      return matchTitle || matchAuthor || matchSummary || matchTags || matchChapter;
    });
  }, [selectedCategory, searchQuery]);

  const featuredBook = useMemo(() => {
    return ALL_BOOKS.find(b => b.featured) || ALL_BOOKS[0];
  }, []);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-main-bg)', paddingBottom: '64px' }}>
      {/* ========================================================================= */}
      {/* 1. HERO HEADER BANNER */}
      {/* ========================================================================= */}
      <section
        style={{
          background: 'linear-gradient(135deg, #7F1D1D 0%, #450A0A 50%, #1E1B4B 100%)',
          color: '#FFFFFF',
          padding: '48px 16px 42px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 16px',
            borderRadius: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.18)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            <Sparkles size={14} style={{ color: '#FDE68A' }} />
            <span>Thư Viện Điện Tử 3D & Sách Thiêng Liêng</span>
          </span>

          <h1 style={{
            margin: '0 0 12px',
            fontSize: 'clamp(1.7rem, 4vw, 2.5rem)',
            fontWeight: 900,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            fontFamily: 'Georgia, serif'
          }}>
            Thư Viện Công Giáo & Thiếu Nhi Thánh Thể
          </h1>

          <p style={{
            margin: '0 auto 26px',
            fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
            opacity: 0.9,
            lineHeight: 1.6,
            maxWidth: '680px'
          }}>
            Trực tiếp đọc sách chia chương với trải nghiệm 3D sống động: Toàn bộ Nghi thức TNTT, Hạnh Các Thánh Tử Đạo, 73 Sách Kinh Thánh, Gương Chúa Giêsu và Đường Hy Vọng.
          </p>

          {/* Search Box */}
          <div style={{
            maxWidth: '560px',
            margin: '0 auto',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', color: '#94A3B8', pointerEvents: 'none' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên sách, tác giả, tài liệu TNTT, Kinh Thánh..."
              style={{
                width: '100%',
                padding: '14px 18px 14px 46px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                backgroundColor: '#FFFFFF',
                color: '#1E293B',
                fontSize: '0.94rem',
                fontWeight: 600,
                outline: 'none',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 16px' }}>
        {/* ========================================================================= */}
        {/* 2. RECENT READING PROGRESS (NẾU CÓ SÁCH ĐỌC DỞ) */}
        {/* ========================================================================= */}
        {recentProgress.length > 0 && !searchQuery && (
          <section style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <BookMarked size={18} color="var(--color-red)" />
              <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                Tiếp Tục Đọc Gần Đây
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
              {recentProgress.map(({ book, chapter, percentage }) => (
                <Link
                  key={book.id}
                  href={`/thu-vien/${book.id}/${chapter.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--color-card-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  className="book-card-container"
                >
                  <div style={{ flexShrink: 0, transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                    <Book3DCover book={book} size="sm" showRibbon={false} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-red)', textTransform: 'uppercase' }}>
                      {book.categoryLabel}
                    </span>
                    <h3 style={{
                      margin: '2px 0 4px',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      color: 'var(--color-dark)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {book.title}
                    </h3>
                    <p style={{
                      margin: '0 0 8px',
                      fontSize: '0.78rem',
                      color: 'var(--color-subtle)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      Chương {chapter.number}: {chapter.title.replace(/^Chương \d+:\s*/i, '')}
                    </p>

                    {/* Progress bar */}
                    <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--color-btn-subtle-bg)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage || 15}%`, height: '100%', backgroundColor: 'var(--color-red)' }} />
                    </div>
                  </div>

                  <ArrowRight size={16} color="var(--color-subtle)" style={{ flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 3. CATEGORY TABS */}
        {/* ========================================================================= */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '10px',
          marginBottom: '24px',
          scrollbarWidth: 'none'
        }}>
          {BOOK_CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '24px',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: `1px solid ${isActive ? 'var(--color-red)' : 'var(--color-border-subtle)'}`,
                  backgroundColor: isActive ? 'var(--color-red)' : 'var(--color-card-bg)',
                  color: isActive ? '#FFFFFF' : 'var(--color-dark)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isActive ? '0 4px 12px rgba(220,38,38,0.25)' : 'none',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{cat.label}</span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '2px 7px',
                  borderRadius: '10px',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'var(--color-btn-subtle-bg)',
                  color: 'inherit'
                }}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 4. FEATURED HERO 3D BOOK (HIỂN THỊ KHI KHÔNG SEARCH) */}
        {/* ========================================================================= */}
        {!searchQuery && selectedCategory === 'all' && featuredBook && (
          <section
            style={{
              marginBottom: '36px',
              borderRadius: '24px',
              overflow: 'hidden',
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
              padding: '32px 24px',
              gap: '32px'
            }}
          >
            {/* 3D Realistic Hero Book Showcase */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px 0' }}>
              <Book3DCover book={featuredBook} size="hero" />
            </div>

            {/* Description & Action Details */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  color: 'var(--color-red)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '8px'
                }}>
                  <Sparkles size={14} /> Sách Khuyên Đọc Tiêu Biểu
                </span>

                <h2 style={{
                  margin: '0 0 8px',
                  fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
                  fontWeight: 900,
                  color: 'var(--color-dark)',
                  lineHeight: 1.3,
                  fontFamily: 'Georgia, serif'
                }}>
                  {featuredBook.title}
                </h2>

                <p style={{ margin: '0 0 14px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-subtle)' }}>
                  ✍️ Tác giả: {featuredBook.author}
                </p>

                <p style={{ margin: '0 0 20px', fontSize: '0.92rem', color: 'var(--color-muted)', lineHeight: 1.65 }}>
                  {featuredBook.description}
                </p>

                {/* Chapter list preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  {featuredBook.chapters.slice(0, 3).map(c => (
                    <div key={c.id} style={{ fontSize: '0.86rem', color: 'var(--color-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-red)', flexShrink: 0 }} />
                      <span style={{ fontWeight: 700 }}>Chương {c.number}:</span>
                      <span style={{ color: 'var(--color-subtle)' }}>{c.title.replace(/^Chương \d+:\s*/i, '')}</span>
                    </div>
                  ))}
                  {featuredBook.chapters.length > 3 && (
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', fontStyle: 'italic', paddingLeft: '14px' }}>
                      + {featuredBook.chapters.length - 3} chương mục tiếp theo...
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link
                  href={`/thu-vien/${featuredBook.id}/${featuredBook.chapters[0].id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-red)',
                    color: '#FFFFFF',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(220,38,38,0.35)',
                    transition: 'transform 0.15s ease'
                  }}
                >
                  <BookOpen size={18} />
                  <span>Bắt đầu đọc ngay</span>
                </Link>

                <Link
                  href={`/thu-vien/${featuredBook.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border-subtle)',
                    backgroundColor: 'var(--color-card-bg)',
                    color: 'var(--color-dark)',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <span>Xem mục lục</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 5. MAIN 3D BOOKS GRID */}
        {/* ========================================================================= */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-dark)' }}>
              {selectedCategory === 'all' ? 'Toàn Bộ Tác Phẩm' : BOOK_CATEGORIES.find(c => c.id === selectedCategory)?.label} ({filteredBooks.length})
            </h2>
          </div>

          {filteredBooks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 16px', backgroundColor: 'var(--color-card-bg)', borderRadius: '16px', border: '1px solid var(--color-border-subtle)' }}>
              <BookOpen size={40} style={{ color: 'var(--color-subtle)', opacity: 0.5, marginBottom: '10px' }} />
              <p style={{ margin: 0, color: 'var(--color-subtle)', fontWeight: 600 }}>
                Không tìm thấy sách nào phù hợp với từ khóa "{searchQuery}".
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '24px'
            }}>
              {filteredBooks.map(book => (
                <article
                  key={book.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-card-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.05)',
                    padding: '24px 20px',
                    transition: 'all 0.25s ease'
                  }}
                  className="book-card-container"
                >
                  {/* Top 3D Book Showcase */}
                  <Link
                    href={`/thu-vien/${book.id}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '14px 0 20px',
                      textDecoration: 'none'
                    }}
                  >
                    <Book3DCover book={book} size="md" />
                  </Link>

                  {/* Book Metadata & Title */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          color: 'var(--color-red)',
                          textTransform: 'uppercase'
                        }}>
                          {book.categoryLabel}
                        </span>

                        <span style={{ fontSize: '0.74rem', color: 'var(--color-subtle)', fontWeight: 600 }}>
                          {book.totalChapters} Chương
                        </span>
                      </div>

                      <h3 style={{
                        margin: '0 0 6px',
                        fontSize: '1.05rem',
                        fontWeight: 900,
                        lineHeight: 1.35,
                        color: 'var(--color-dark)',
                        fontFamily: 'Georgia, serif'
                      }}>
                        <Link href={`/thu-vien/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {book.title}
                        </Link>
                      </h3>

                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-subtle)', marginBottom: '8px' }}>
                        {book.author}
                      </div>

                      <p style={{
                        margin: 0,
                        fontSize: '0.84rem',
                        color: 'var(--color-muted)',
                        lineHeight: 1.55,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {book.summary}
                      </p>
                    </div>

                    {/* Bottom Action Footer */}
                    <div style={{
                      marginTop: '20px',
                      paddingTop: '14px',
                      borderTop: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-subtle)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> ~{book.estimatedReadingMinutes} phút
                      </span>

                      <Link
                        href={`/thu-vien/${book.id}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.84rem',
                          fontWeight: 800,
                          color: 'var(--color-red)',
                          textDecoration: 'none'
                        }}
                      >
                        <span>Mục lục & Đọc</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
