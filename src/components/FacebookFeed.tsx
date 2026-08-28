'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Loader2,
  Calendar,
  Heart,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { translateClientText } from '@/lib/clientTranslator';

interface FBPost {
  id: string;
  message?: string;
  story?: string;
  created_time: string;
  full_picture?: string | null;
  permalink_url: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

function splitPost(post: FBPost) {
  const text = (post.message || post.story || '').trim();
  if (!text) return { title: 'Thông báo / Sinh hoạt Xứ Đoàn', excerpt: '' };
  
  const nl = text.indexOf('\n');
  if (nl > 0 && nl <= 140) {
    return {
      title: text.slice(0, nl).trim(),
      excerpt: text.slice(nl).trim().replace(/\n+/g, ' ').slice(0, 160)
    };
  }
  
  const cut = Math.min(text.length, 110);
  const space = text.lastIndexOf(' ', cut);
  const end = space > 40 ? space : cut;
  
  return {
    title: text.slice(0, end).trim() + (text.length > end ? '...' : ''),
    excerpt: text.slice(end).trim().replace(/\n+/g, ' ').slice(0, 160)
  };
}

const href = (post: FBPost) => `/bai-viet/${encodeURIComponent(post.id)}`;

const POSTS_PER_PAGE = 7;

/**
 * Rút gọn dãy số trang: luôn giữ trang đầu, trang cuối và 2 trang quanh trang hiện tại.
 * null nghĩa là chỗ hiển thị dấu "…".
 */
function pageNumbers(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, total, current]);
  for (let d = 1; d <= 1; d++) {
    if (current - d > 1) pages.add(current - d);
    if (current + d < total) pages.add(current + d);
  }
  // Giữ dãy luôn đủ rộng khi đang ở gần hai đầu
  if (current <= 3) [2, 3, 4].forEach(n => n < total && pages.add(n));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach(n => n > 1 && pages.add(n));

  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | null)[] = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) out.push(null);
    out.push(n);
  });
  return out;
}

export default function FacebookFeed() {
  const { t, lang } = useLanguage();
  const [posts, setPosts] = useState<FBPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [translatedMap, setTranslatedMap] = useState<Record<string, { title: string; excerpt: string }>>({});

  useEffect(() => {
    fetch('/api/facebook/posts')
      .then(res => res.json())
      .then(data => { if (data.posts) setPosts(data.posts); })
      .catch(err => console.error('Error fetching Facebook posts:', err))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [posts, currentPage]);

  // Top 5 latest posts for the auto-sliding Hero Carousel
  const featuredPosts = useMemo(() => {
    return posts.slice(0, 5);
  }, [posts]);

  // Auto-rotate every 5 seconds (5000ms)
  useEffect(() => {
    if (featuredPosts.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % featuredPosts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredPosts.length, isPaused]);

  // Client-side translation of post titles & excerpts when language is not Vietnamese
  useEffect(() => {
    if (lang === 'vi' || currentPosts.length === 0) return;

    let isCancelled = false;

    currentPosts.forEach(post => {
      const orig = splitPost(post);
      const toTranslate = orig.title + (orig.excerpt ? '\n\n' + orig.excerpt : '');

      translateClientText(toTranslate, lang).then(translated => {
        if (!isCancelled) {
          const parts = translated.split('\n\n');
          setTranslatedMap(prev => ({
            ...prev,
            [`${post.id}_${lang}`]: {
              title: parts[0] || orig.title,
              excerpt: parts[1] || (orig.excerpt ? parts[0] : '')
            }
          }));
        }
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [currentPosts, lang]);

  const getPostContent = (post: FBPost) => {
    if (lang !== 'vi' && translatedMap[`${post.id}_${lang}`]) {
      return translatedMap[`${post.id}_${lang}`];
    }
    return splitPost(post);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const feedEl = document.getElementById('facebook-news-feed');
      if (feedEl) {
        feedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Hero Card Skeleton */}
        <div style={{
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: 'var(--color-card-bg)',
          border: '1px solid var(--color-border-subtle)',
          padding: '0'
        }}>
          <div className="skeleton" style={{ width: '100%', height: '240px', borderRadius: 0 }} />
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="skeleton" style={{ width: '75%', height: '24px' }} />
            <div className="skeleton" style={{ width: '100%', height: '14px' }} />
            <div className="skeleton" style={{ width: '85%', height: '14px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <div className="skeleton" style={{ width: '120px', height: '14px' }} />
              <div className="skeleton" style={{ width: '80px', height: '14px' }} />
            </div>
          </div>
        </div>

        {/* 2-Column Grid Skeletons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[1, 2].map(i => (
            <div key={i} style={{
              borderRadius: '10px',
              overflow: 'hidden',
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border-subtle)'
            }}>
              <div className="skeleton" style={{ width: '100%', height: '150px', borderRadius: 0 }} />
              <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="skeleton" style={{ width: '90%', height: '18px' }} />
                <div className="skeleton" style={{ width: '100%', height: '12px' }} />
                <div className="skeleton" style={{ width: '70%', height: '12px' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Row List Skeletons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border-subtle)'
            }}>
              <div className="skeleton" style={{ width: '120px', height: '84px', borderRadius: '8px', flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="skeleton" style={{ width: '80%', height: '18px' }} />
                <div className="skeleton" style={{ width: '95%', height: '12px' }} />
                <div className="skeleton" style={{ width: '40%', height: '10px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '12px',
        border: '1px solid var(--color-border-subtle)'
      }}>
        <BookOpen size={40} style={{ margin: '0 auto 12px', color: 'var(--color-subtle)', opacity: 0.6 }} />
        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-dark)' }}>
          {t.newsEmpty || 'Chưa có bài viết mới'}
        </div>
      </div>
    );
  }

  const isFirstPage = currentPage === 1;
  const lead = isFirstPage ? (featuredPosts[slideIndex] || featuredPosts[0]) : null;
  const gridCards = isFirstPage ? currentPosts.slice(1, 3) : [];
  const listRows = isFirstPage ? currentPosts.slice(3) : currentPosts;

  return (
    <div id="facebook-news-feed" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. GPU-ACCELERATED HERO SLIDER (60FPS - KHÔNG GIẬT LAG) */}
      {featuredPosts.length > 0 && isFirstPage && (
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: 'var(--color-card-bg)',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
          }}
          className="news-lead-hover"
        >
          {/* Sliding Track for 60fps Transitions */}
          <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
            <div style={{
              display: 'flex',
              width: `${featuredPosts.length * 100}%`,
              transform: `translate3d(-${(slideIndex * 100) / featuredPosts.length}%, 0, 0)`,
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
              willChange: 'transform'
            }}>
              {featuredPosts.map((post) => {
                const { title, excerpt } = getPostContent(post);
                return (
                  <div
                    key={post.id}
                    style={{
                      width: `${100 / featuredPosts.length}%`,
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Link
                      href={href(post)}
                      style={{
                        display: 'block',
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                    >
                      {/* Image Frame */}
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: 'clamp(200px, 36vw, 320px)',
                        backgroundColor: '#1E293B',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={post.full_picture || '/logo.jpg'}
                          alt=""
                          loading="eager"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                      </div>

                      {/* Content Info */}
                      <div style={{ padding: '16px 18px' }}>
                        <h3 style={{
                          margin: '0 0 8px',
                          fontSize: 'clamp(1.05rem, 2.4vw, 1.3rem)',
                          fontWeight: 800,
                          color: 'var(--color-dark)',
                          lineHeight: 1.35,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }} className="news-lead-title">
                          {title}
                        </h3>

                        {excerpt && (
                          <p style={{
                            margin: '0 0 10px',
                            fontSize: '0.86rem',
                            color: 'var(--color-subtle)',
                            lineHeight: 1.55,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {excerpt}
                          </p>
                        )}

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '8px',
                          paddingTop: '8px',
                          borderTop: '1px solid var(--color-border-subtle)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem', color: 'var(--color-subtle)' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Calendar size={13} />
                              {formatDate(post.created_time)}
                            </span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#E11D48', fontWeight: 600 }}>
                              <Heart size={13} fill="#E11D48" />
                              {post.likesCount}
                            </span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <MessageCircle size={13} />
                              {post.commentsCount}
                            </span>
                          </div>

                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-nav-active-text)' }}>
                            <span>{t.newsReadMore || 'Đọc bài'}</span>
                            <ArrowRight size={13} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badge Nổi Bật & Slide Counter */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 10,
            pointerEvents: 'none'
          }}>
            <div style={{
              backgroundColor: 'rgba(183, 28, 28, 0.92)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '20px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}>
              <Flame size={12} />
              <span>{t.newsFeatured || 'Nổi Bật'}</span>
            </div>

            {featuredPosts.length > 1 && (
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                color: '#FFFFFF',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '12px'
              }}>
                {slideIndex + 1}/{featuredPosts.length}
              </div>
            )}
          </div>

          {/* Manual Navigation Arrows (Prev / Next Buttons) */}
          {featuredPosts.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSlideIndex(prev => (prev - 1 + featuredPosts.length) % featuredPosts.length);
                }}
                aria-label="Bài trước"
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: 'clamp(90px, 16vw, 150px)',
                  transform: 'translateY(-50%)',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.55)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.15s ease'
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSlideIndex(prev => (prev + 1) % featuredPosts.length);
                }}
                aria-label="Bài tiếp theo"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: 'clamp(90px, 16vw, 150px)',
                  transform: 'translateY(-50%)',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.55)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.15s ease'
                }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      )}

      {/* 2. 2-COLUMN HIGHLIGHT GRID (Page 1 only) */}
      {gridCards.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {gridCards.map(post => {
            const { title, excerpt } = getPostContent(post);
            return (
              <Link
                key={post.id}
                href={href(post)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                className="news-card-hover"
              >
                <div style={{ position: 'relative', width: '100%', height: '160px', overflow: 'hidden', backgroundColor: 'var(--color-btn-subtle-bg)' }}>
                  <img
                    src={post.full_picture || '/logo.jpg'}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.3s ease'
                    }}
                    className="news-card-img"
                  />
                </div>
                <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{
                      margin: '0 0 6px',
                      fontSize: '0.96rem',
                      fontWeight: 800,
                      color: 'var(--color-dark)',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }} className="news-card-title">
                      {title}
                    </h4>
                    {excerpt && (
                      <p style={{
                        margin: 0,
                        fontSize: '0.82rem',
                        color: 'var(--color-subtle)',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {excerpt}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-subtle)', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--color-border-subtle)' }}>
                    <span>{formatDate(post.created_time)}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#E11D48', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Heart size={13} strokeWidth={2.2} /> {post.likesCount}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><MessageCircle size={13} strokeWidth={2.2} /> {post.commentsCount}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* 3. ELEGANT LIST ROWS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {listRows.map(post => {
          const { title, excerpt } = getPostContent(post);
          return (
            <Link
              key={post.id}
              href={href(post)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px',
                borderRadius: '10px',
                textDecoration: 'none',
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease'
              }}
              className="news-row-card"
            >
              {/* Thumbnail Container */}
              <div
                style={{
                  flexShrink: 0,
                  width: '120px',
                  height: '84px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: 'var(--color-btn-subtle-bg)'
                }}
                className="news-row-thumb-box"
              >
                <img
                  src={post.full_picture || '/logo.jpg'}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s ease'
                  }}
                  className="news-row-img"
                />
              </div>

              {/* Text Info */}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h4 style={{
                  margin: 0,
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  color: 'var(--color-dark)',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  transition: 'color 0.15s ease'
                }} className="news-row-title">
                  {title}
                </h4>

                {excerpt && (
                  <p style={{
                    margin: 0,
                    fontSize: '0.8rem',
                    color: 'var(--color-subtle)',
                    lineHeight: 1.45,
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {excerpt}
                  </p>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.74rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                  <span>{formatDate(post.created_time)}</span>
                  <span>•</span>
                  <span style={{ color: '#E11D48', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Heart size={13} strokeWidth={2.2} /> {post.likesCount}</span>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><MessageCircle size={13} strokeWidth={2.2} /> {post.commentsCount}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 4. PAGINATION CONTROLS ("- 1 2 3 -") */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          paddingTop: '12px',
          marginTop: '6px',
          flexWrap: 'wrap'
        }}>
          {/* Previous Button */}
          <button
            disabled={currentPage === 1}
            className="pager-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '7px 12px',
              borderRadius: '6px',
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: currentPage === 1 ? 'transparent' : 'var(--color-card-bg)',
              color: currentPage === 1 ? 'var(--color-subtle)' : 'var(--color-dark)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.4 : 1
            }}
          >
            <ChevronLeft size={15} />
            <span>{t.newsPrev || 'Trước'}</span>
          </button>

          {/* Number Buttons: 1 2 3 ... */}
          {pageNumbers(currentPage, totalPages).map((num, idx) => num === null ? (
            <span key={`gap-${idx}`} style={{ padding: '0 2px', color: 'var(--color-subtle)', fontWeight: 700 }}>…</span>
          ) : (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className="pager-btn"
              style={{
                minWidth: '34px',
                height: '34px',
                borderRadius: '6px',
                border: currentPage === num ? 'none' : '1px solid var(--color-border-subtle)',
                backgroundColor: currentPage === num ? '#B71C1C' : 'var(--color-card-bg)',
                color: currentPage === num ? '#FFFFFF' : 'var(--color-dark)',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: currentPage === num ? '0 2px 6px rgba(183, 28, 28, 0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {num}
            </button>
          ))}

          {/* Next Button */}
          <button
            disabled={currentPage === totalPages}
            className="pager-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '7px 12px',
              borderRadius: '6px',
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: currentPage === totalPages ? 'transparent' : 'var(--color-card-bg)',
              color: currentPage === totalPages ? 'var(--color-subtle)' : 'var(--color-dark)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.4 : 1
            }}
          >
            <span>{t.newsNext || 'Sau'}</span>
            <ChevronRight size={15} />
          </button>
        </div>
      )}

    </div>
  );
}
