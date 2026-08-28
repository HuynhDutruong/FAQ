'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Megaphone, Calendar, ArrowRight, ChevronRight, Bell } from 'lucide-react';
import { useFacebookPosts } from '@/lib/useFacebookPosts';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { FeedPost } from '@/lib/postIntel';

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

function extractNoticeTitleAndExcerpt(post: FeedPost) {
  const text = (post.message || '').trim();
  if (!text) return { title: 'Thông báo từ Xứ Đoàn', excerpt: '' };

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const title = lines[0] || 'Thông báo từ Xứ Đoàn';
  const excerpt = lines.slice(1).join(' ').slice(0, 140);

  return {
    title: title.length > 100 ? title.slice(0, 97) + '...' : title,
    excerpt: excerpt ? (excerpt.length > 130 ? excerpt.slice(0, 127) + '...' : excerpt) : ''
  };
}

interface NoticeBoardProps {
  onSelectNoticeFilter?: () => void;
}

export default function NoticeBoard({ onSelectNoticeFilter }: NoticeBoardProps) {
  const { posts, loading } = useFacebookPosts();
  const { t } = useLanguage();

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

  if (loading) {
    return (
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '12px',
        border: '1px solid var(--color-border-subtle)',
        padding: '16px 18px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-red)'
        }}>
          <Megaphone size={18} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ height: '14px', width: '120px', backgroundColor: 'var(--color-border-subtle)', borderRadius: '4px', marginBottom: '6px' }} />
          <div style={{ height: '12px', width: '240px', backgroundColor: 'var(--color-border-subtle)', borderRadius: '4px', opacity: 0.6 }} />
        </div>
      </div>
    );
  }

  if (noticePosts.length === 0) {
    return null; // Không có thông báo thì ẩn gọn gàng
  }

  // Lấy tối đa 3 thông báo mới nhất cho bảng thông báo trang chủ
  const displayNotices = noticePosts.slice(0, 3);

  return (
    <section
      aria-label="Bảng Thông Báo Xứ Đoàn"
      style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '14px',
        border: '1px solid rgba(220, 38, 38, 0.25)',
        boxShadow: '0 4px 16px rgba(220, 38, 38, 0.06)',
        overflow: 'hidden',
        marginBottom: '24px'
      }}
    >
      {/* Header Bar */}
      <div style={{
        padding: '12px 18px',
        backgroundColor: 'rgba(220, 38, 38, 0.05)',
        borderBottom: '1px solid rgba(220, 38, 38, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
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
            <Megaphone size={15} />
          </span>
          <h3 style={{
            margin: 0,
            fontSize: '0.95rem',
            fontWeight: 800,
            color: 'var(--color-red)',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>BẢNG THÔNG BÁO XỨ ĐOÀN</span>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#EF4444',
              boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.3)'
            }} />
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '12px',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            color: 'var(--color-red)'
          }}>
            {noticePosts.length} thông báo
          </span>

          {onSelectNoticeFilter && (
            <button
              onClick={onSelectNoticeFilter}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-red)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                padding: '2px 6px'
              }}
            >
              <span>Xem tất cả</span>
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Notices List */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {displayNotices.map((post, idx) => {
          const { title, excerpt } = extractNoticeTitleAndExcerpt(post);
          const isLast = idx === displayNotices.length - 1;

          return (
            <Link
              key={post.id}
              href={`/bai-viet/${encodeURIComponent(post.id)}`}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '14px 18px',
                textDecoration: 'none',
                color: 'inherit',
                borderBottom: isLast ? 'none' : '1px solid var(--color-border-subtle)',
                transition: 'background-color 0.15s ease'
              }}
              className="notice-item-hover"
            >
              {/* Badge Tag */}
              <div style={{
                flexShrink: 0,
                marginTop: '2px',
                padding: '4px 8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                color: 'var(--color-red)',
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap'
              }}>
                Thông Báo
              </div>

              {/* Title & Excerpt */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{
                  margin: '0 0 4px',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  color: 'var(--color-dark)',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {title}
                </h4>

                {excerpt && (
                  <p style={{
                    margin: '0 0 6px',
                    fontSize: '0.82rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {excerpt}
                  </p>
                )}

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.74rem',
                  color: 'var(--color-subtle)'
                }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    {formatDate(post.created_time)}
                  </span>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                    color: 'var(--color-red)',
                    fontWeight: 700
                  }}>
                    <span>Chi tiết</span>
                    <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
