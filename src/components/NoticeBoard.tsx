'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Megaphone,
  Calendar,
  Heart,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  Flame,
  Clock
} from 'lucide-react';
import { useFacebookPosts } from '@/lib/useFacebookPosts';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { translateClientBatch } from '@/lib/clientTranslator';
import type { FeedPost } from '@/lib/postIntel';
import { PostThumb, MediaChips, LinkButtons } from './PostMedia';

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

function splitNotice(post: FeedPost) {
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

interface NoticeBoardProps {
  onSelectNoticeFilter?: () => void;
}

export default function NoticeBoard({ onSelectNoticeFilter }: NoticeBoardProps) {
  const { posts, loading } = useFacebookPosts();
  const { t, lang } = useLanguage();
  const [translatedMap, setTranslatedMap] = useState<Record<string, { title: string; excerpt: string }>>({});

  // Tự động "soi" lọc tất cả các bài có tiêu đề hoặc nội dung Thông Báo
  const noticePosts = useMemo(() => {
    return posts.filter(p => {
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
    });
  }, [posts]);

  // Lấy 3 bài thông báo mới nhất
  const topNotices = useMemo(() => noticePosts.slice(0, 3), [noticePosts]);

  // Dịch thuật hàng loạt nếu ngôn ngữ khác tiếng Việt
  useEffect(() => {
    if (lang === 'vi' || topNotices.length === 0) return;

    let isCancelled = false;
    const items = topNotices.map(post => {
      const orig = splitNotice(post);
      const combined = orig.title + (orig.excerpt ? '\n\n' + orig.excerpt : '');
      return { postId: post.id, orig, combined };
    });

    translateClientBatch(items.map(i => i.combined), lang).then(translatedArray => {
      if (isCancelled) return;
      const newMap: Record<string, { title: string; excerpt: string }> = {};
      items.forEach((item, idx) => {
        const tr = translatedArray[idx] || item.combined;
        const parts = tr.split('\n\n');
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
  }, [topNotices, lang]);

  const getNoticeContent = (post: FeedPost) => {
    if (lang !== 'vi' && translatedMap[`${post.id}_${lang}`]) {
      return translatedMap[`${post.id}_${lang}`];
    }
    return splitNotice(post);
  };

  if (loading) {
    return (
      <section style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
        <div className="hdgm-section-head">
          <h2 className="hdgm-section-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Megaphone size={18} color="var(--color-red)" />
            <span>{t.noticeTitle || 'Bài Viết Thông Báo'}</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-border-subtle)' }}>
              <div className="skeleton" style={{ width: '100%', height: '160px', borderRadius: 0 }} />
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="skeleton" style={{ width: '80px', height: '18px' }} />
                <div className="skeleton" style={{ width: '95%', height: '20px' }} />
                <div className="skeleton" style={{ width: '60%', height: '14px' }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (noticePosts.length === 0) {
    return null;
  }

  const [leadNotice, ...otherNotices] = topNotices;

  return (
    <section
      aria-label="Bài Viết Thông Báo Xứ Đoàn"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginTop: '8px'
      }}
    >
      {/* HDGM SECTION HEADER */}
      <div
        className="hdgm-section-head"
        style={{
          borderBottom: '2px solid var(--color-red)',
          paddingBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            backgroundColor: 'var(--color-red)',
            color: '#FFFFFF'
          }}>
            <Megaphone size={16} />
          </span>
          <h2
            className="hdgm-section-title"
            style={{
              margin: 0,
              color: 'var(--color-red)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{t.noticeTitle || 'Bài Viết Thông Báo'}</span>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#EF4444',
              boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.25)'
            }} />
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            padding: '3px 10px',
            borderRadius: '12px',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            color: 'var(--color-red)'
          }}>
            {noticePosts.length} bài thông báo
          </span>

          {onSelectNoticeFilter && (
            <button
              onClick={onSelectNoticeFilter}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-red)',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '6px',
                transition: 'background-color 0.15s ease'
              }}
            >
              <span>Xem tất cả</span>
              <ChevronRight size={15} />
            </button>
          )}
        </div>
      </div>

      {/* 1. LEAD FEATURED NOTICE CARD */}
      {leadNotice && (() => {
        const { title, excerpt } = getNoticeContent(leadNotice);
        return (
          <article
            style={{
              borderRadius: '14px',
              overflow: 'hidden',
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              boxShadow: '0 4px 18px rgba(220, 38, 38, 0.08)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            className="news-lead-hover"
          >
            <Link
              href={`/bai-viet/${encodeURIComponent(leadNotice.id)}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              {/* Cover Image / Video Player */}
              <div style={{ position: 'relative' }}>
                <PostThumb post={leadNotice} height="clamp(210px, 34vw, 300px)" eager />

                {/* Badge Tag in Header */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  zIndex: 5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{
                    backgroundColor: 'rgba(220, 38, 38, 0.95)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.25)'
                  }}>
                    <Megaphone size={12} />
                    <span>Thông Báo Mới Nhất</span>
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div style={{ padding: '18px 20px' }}>
                <h3 style={{
                  margin: '0 0 8px',
                  fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
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
                    margin: '0 0 12px',
                    fontSize: '0.88rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.55,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {excerpt}
                  </p>
                )}

                {/* Meta footer bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--color-border-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.78rem', color: 'var(--color-subtle)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} />
                      {formatDate(leadNotice.created_time)}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#E11D48', fontWeight: 600 }}>
                      <Heart size={13} fill="#E11D48" />
                      {leadNotice.likesCount}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <MessageCircle size={13} />
                      {leadNotice.commentsCount}
                    </span>
                  </div>

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <MediaChips post={leadNotice} />
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.84rem',
                      fontWeight: 800,
                      color: 'var(--color-red)'
                    }}>
                      <span>Xem toàn văn</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>

                <LinkButtons links={leadNotice.links} compact />
              </div>
            </Link>
          </article>
        );
      })()}

      {/* 2. SUPPORTING 2-COLUMN NOTICES GRID */}
      {otherNotices.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {otherNotices.map(post => {
            const { title, excerpt } = getNoticeContent(post);
            return (
              <article
                key={post.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                className="news-card-hover"
              >
                <Link
                  href={`/bai-viet/${encodeURIComponent(post.id)}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <PostThumb post={post} height="150px" imgClassName="news-card-img" />
                    <span style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(220, 38, 38, 0.9)',
                      backdropFilter: 'blur(4px)',
                      color: '#FFFFFF',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      <Megaphone size={10} />
                      <span>Thông Báo</span>
                    </span>
                  </div>

                  <div style={{
                    padding: '14px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
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
                          color: 'var(--color-muted)',
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

                    <div>
                      <MediaChips post={post} />

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.75rem',
                        color: 'var(--color-subtle)',
                        marginTop: '12px',
                        paddingTop: '8px',
                        borderTop: '1px solid var(--color-border-subtle)'
                      }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={12} />
                          {formatDate(post.created_time)}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#E11D48', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <Heart size={12} fill="#E11D48" />
                            {post.likesCount}
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <MessageCircle size={12} />
                            {post.commentsCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
