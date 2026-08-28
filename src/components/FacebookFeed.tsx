'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Heart,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Megaphone,
  BookOpen
} from 'lucide-react';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { translateClientText, translateClientBatch } from '@/lib/clientTranslator';
import { useFacebookPosts } from '@/lib/useFacebookPosts';
import type { FeedPost, PostKind } from '@/lib/postIntel';
import { PostThumb, MediaChips, LinkButtons } from './PostMedia';

type FBPost = FeedPost;

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

function splitPost(post: FBPost) {
  const text = (post.message || '').trim();
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
const NOTICES_PER_PAGE = 6;

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

export default function FacebookFeed({
  category = 'all',
  onCategoryChange
}: {
  category?: 'all' | 'notice' | 'news';
  onCategoryChange?: (cat: 'all' | 'notice' | 'news') => void;
}) {
  const { t, lang } = useLanguage();
  const { posts: allPosts, loading } = useFacebookPosts();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTab, setFilterTab] = useState<'all' | 'notice' | 'news'>(category);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [translatedMap, setTranslatedMap] = useState<Record<string, { title: string; excerpt: string }>>({});

  useEffect(() => {
    setFilterTab(category);
    setCurrentPage(1);
  }, [category]);

  const handleTabChange = (nextTab: 'all' | 'notice' | 'news') => {
    setFilterTab(nextTab);
    setCurrentPage(1);
    onCategoryChange?.(nextTab);
  };

  const isNoticePost = (p: FBPost) => {
    if (p.kind === 'notice') return true;
    const text = (p.message || '').toLowerCase();
    const firstLine = text.split('\n')[0] || '';
    return (
      firstLine.includes('thông báo') ||
      firstLine.includes('thong bao') ||
      firstLine.includes('thư mời') ||
      firstLine.includes('thu moi') ||
      firstLine.startsWith('tb:') ||
      firstLine.startsWith('[tb]') ||
      text.includes('#thongbao')
    );
  };

  const noticeCount = useMemo(() => allPosts.filter(isNoticePost).length, [allPosts]);
  const newsCount = useMemo(() => allPosts.filter(p => !isNoticePost(p)).length, [allPosts]);

  const isNoticeOnly = filterTab === 'notice';
  const perPage = isNoticeOnly ? NOTICES_PER_PAGE : POSTS_PER_PAGE;
  const feedId = isNoticeOnly ? 'facebook-notice-feed' : 'facebook-news-feed';

  const posts = useMemo(() => {
    if (filterTab === 'notice') {
      return allPosts.filter(isNoticePost);
    }
    if (filterTab === 'news') {
      return allPosts.filter(p => !isNoticePost(p));
    }
    return allPosts;
  }, [allPosts, filterTab]);

  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));

  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return posts.slice(start, start + perPage);
  }, [posts, currentPage, perPage]);

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

    const items = currentPosts.map(post => {
      const orig = splitPost(post);
      const combined = orig.title + (orig.excerpt ? '\n\n' + orig.excerpt : '');
      return { postId: post.id, orig, combined };
    });

    const toTranslate = items.map(i => i.combined);

    translateClientBatch(toTranslate, lang).then(translatedArray => {
      if (isCancelled) return;

      const newMap: Record<string, { title: string; excerpt: string }> = {};
      items.forEach((item, index) => {
        const translated = translatedArray[index] || item.combined;
        const parts = translated.split('\n\n');
        newMap[`${item.postId}_${lang}`] = {
          title: parts[0] || item.orig.title,
          excerpt: parts[1] || (item.orig.excerpt ? parts[0] : '')
        };
      });

      setTranslatedMap(prev => ({ ...prev, ...newMap }));
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
      const feedEl = document.getElementById(feedId);
      if (feedEl) {
        feedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Hero Card Skeleton */}
        {!isNoticeOnly && <div style={{
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
        </div>}

        {/* 2-Column Grid Skeletons */}
        {!isNoticeOnly && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
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
        </div>}

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

  const showHero = !isNoticeOnly && currentPage === 1;
  const gridCards = showHero ? currentPosts.slice(1, 3) : [];
  const listRows = showHero ? currentPosts.slice(3) : currentPosts;

  const renderTabs = () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      overflowX: 'auto',
      paddingBottom: '4px',
      scrollbarWidth: 'none'
    }}>
      <button
        type="button"
        onClick={() => handleTabChange('all')}
        style={{
          padding: '7px 15px',
          borderRadius: '20px',
          fontSize: '0.84rem',
          fontWeight: 700,
          cursor: 'pointer',
          border: `1px solid ${filterTab === 'all' ? 'var(--color-red)' : 'var(--color-border-subtle)'}`,
          backgroundColor: filterTab === 'all' ? 'var(--color-red)' : 'var(--color-card-bg)',
          color: filterTab === 'all' ? '#FFFFFF' : 'var(--color-dark)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: filterTab === 'all' ? '0 2px 6px rgba(211,47,47,0.25)' : '0 1px 2px rgba(0,0,0,0.03)',
          transition: 'all 0.15s ease'
        }}
      >
        <span>{t.tabAllPosts || 'Tất Cả Bài Viết'}</span>
        <span style={{
          fontSize: '0.72rem',
          padding: '1px 6px',
          borderRadius: '10px',
          backgroundColor: filterTab === 'all' ? 'rgba(255,255,255,0.25)' : 'var(--color-btn-subtle-bg)',
          color: 'inherit'
        }}>
          {allPosts.length}
        </span>
      </button>

      <button
        type="button"
        onClick={() => handleTabChange('notice')}
        style={{
          padding: '7px 15px',
          borderRadius: '20px',
          fontSize: '0.84rem',
          fontWeight: 700,
          cursor: 'pointer',
          border: `1px solid ${filterTab === 'notice' ? '#DC2626' : 'rgba(220, 38, 38, 0.35)'}`,
          backgroundColor: filterTab === 'notice' ? '#DC2626' : 'rgba(220, 38, 38, 0.06)',
          color: filterTab === 'notice' ? '#FFFFFF' : '#DC2626',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: filterTab === 'notice' ? '0 2px 6px rgba(220,38,38,0.25)' : 'none',
          transition: 'all 0.15s ease'
        }}
      >
        <Megaphone size={14} />
        <span>{t.tabNotices || 'Thông Báo'}</span>
        <span style={{
          fontSize: '0.72rem',
          padding: '1px 6px',
          borderRadius: '10px',
          backgroundColor: filterTab === 'notice' ? 'rgba(255,255,255,0.25)' : 'rgba(220, 38, 38, 0.15)',
          color: 'inherit'
        }}>
          {noticeCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => handleTabChange('news')}
        style={{
          padding: '7px 15px',
          borderRadius: '20px',
          fontSize: '0.84rem',
          fontWeight: 700,
          cursor: 'pointer',
          border: `1px solid ${filterTab === 'news' ? 'var(--color-red)' : 'var(--color-border-subtle)'}`,
          backgroundColor: filterTab === 'news' ? 'var(--color-red)' : 'var(--color-card-bg)',
          color: filterTab === 'news' ? '#FFFFFF' : 'var(--color-dark)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: filterTab === 'news' ? '0 2px 6px rgba(211,47,47,0.25)' : '0 1px 2px rgba(0,0,0,0.03)',
          transition: 'all 0.15s ease'
        }}
      >
        <span>{t.tabActivities || 'Sinh Hoạt & Tin Tức'}</span>
        <span style={{
          fontSize: '0.72rem',
          padding: '1px 6px',
          borderRadius: '10px',
          backgroundColor: filterTab === 'news' ? 'rgba(255,255,255,0.25)' : 'var(--color-btn-subtle-bg)',
          color: 'inherit'
        }}>
          {newsCount}
        </span>
      </button>
    </div>
  );

  if (posts.length === 0) {
    return (
      <div id={feedId} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {renderTabs()}
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          border: '1px solid var(--color-border-subtle)'
        }}>
          {isNoticeOnly
            ? <Megaphone size={40} style={{ margin: '0 auto 12px', color: 'var(--color-subtle)', opacity: 0.6 }} />
            : <BookOpen size={40} style={{ margin: '0 auto 12px', color: 'var(--color-subtle)', opacity: 0.6 }} />}
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-dark)' }}>
            {isNoticeOnly ? (t.noticeEmpty || 'Chưa có thông báo mới') : (t.newsEmpty || 'Chưa có bài viết mới')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id={feedId} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {renderTabs()}
      
      {/* 1. GPU-ACCELERATED HERO SLIDER (60FPS - KHÔNG GIẬT LAG) */}
      {featuredPosts.length > 0 && showHero && (
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
                      {/* Khung ảnh — có video thì phát ngay tại đây */}
                      <PostThumb post={post} height="clamp(200px, 36vw, 320px)" eager />

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

                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <MediaChips post={post} />
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-nav-active-text)' }}>
                              {t.newsReadMore || 'Đọc bài'}
                              <ArrowRight size={13} />
                            </span>
                          </div>
                        </div>

                        <LinkButtons links={post.links} compact />
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
                <PostThumb post={post} height="160px" imgClassName="news-card-img" />
                <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {isNoticePost(post) && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        color: 'var(--color-red)',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        marginBottom: '6px'
                      }}>
                        <Megaphone size={11} />
                        <span>Thông Báo</span>
                      </span>
                    )}
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

                  <MediaChips post={post} />

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
              <div style={{ flexShrink: 0, width: '120px' }} className="news-row-thumb-box">
                <PostThumb post={post} height="84px" radius="8px" imgClassName="news-row-img" />
              </div>

              {/* Text Info */}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  {isNoticePost(post) && (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                      color: 'var(--color-red)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      flexShrink: 0
                    }}>
                      <Megaphone size={10} />
                      <span>Thông Báo</span>
                    </span>
                  )}
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
                </div>

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
                  <MediaChips post={post} />
                </div>

                <LinkButtons links={post.links} compact />
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
