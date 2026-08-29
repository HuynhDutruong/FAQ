'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  Share2,
  Calendar,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Maximize2,
  X,
  Sparkles,
  Tag
} from 'lucide-react';
import { playerSrc, LinkButtons } from '@/components/PostMedia';
import { cleanUrl } from '@/lib/postIntel';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useClientTranslation } from '@/lib/clientTranslator';
import type { PostDetail } from '@/lib/fetchPostDetail';

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

type Block =
  | { kind: 'heading'; text: string }
  | { kind: 'para'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'byline'; text: string };

const formatDateTime = (s: string) => {
  try {
    return new Date(s).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return s;
  }
};

const BYLINE = /^(bài viết|hình ảnh|ảnh|nguồn|tác giả|biên tập|thực hiện|chuyển ngữ|xem thêm|nguồn tin|source|author|photo|by)\b/i;
const BULLET = /^\s*[-–—•*+▪➤👉✅]\s+/;

const isHeading = (line: string) =>
  line.length <= 120 && line === line.toUpperCase() && /[A-ZÀ-Ỹ]/.test(line) && !line.endsWith('.');

function parseBody(message: string): Block[] {
  const lines = message.split('\n');
  const body = lines.slice(1);
  const blocks: Block[] = [];
  let buffer: string[] = [];
  let bullets: string[] = [];

  const flushPara = () => {
    if (buffer.length) {
      blocks.push({ kind: 'para', text: buffer.join(' ') });
      buffer = [];
    }
  };
  const flushList = () => {
    if (bullets.length) {
      blocks.push({ kind: 'list', items: bullets });
      bullets = [];
    }
  };

  for (const raw of body) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }

    if (BULLET.test(line)) {
      flushPara();
      bullets.push(line.replace(BULLET, ''));
      continue;
    }
    flushList();

    if (BYLINE.test(line)) {
      flushPara();
      blocks.push({ kind: 'byline', text: line });
      continue;
    }
    if (isHeading(line)) {
      flushPara();
      blocks.push({ kind: 'heading', text: line });
      continue;
    }

    buffer.push(line);
  }
  flushPara();
  flushList();
  return blocks;
}

function linkify(text: string) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={i}
        href={cleanUrl(part)}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'var(--color-primary)',
          textDecoration: 'underline',
          wordBreak: 'break-all',
          fontWeight: 500
        }}
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

const readingMinutes = (text: string) => Math.max(1, Math.round(text.split(/\s+/).length / 200));

export default function ArticleDetailView({
  post,
  postUrl
}: {
  post: PostDetail;
  postUrl: string;
}) {
  const { t, lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const rawTitle = (post.message || '').split('\n')[0]?.trim() || 'Bài viết Xứ Đoàn';
  const { translatedText: title } = useClientTranslation(rawTitle, lang);
  const { translatedText: translatedMessage } = useClientTranslation(post.message, lang);

  const parsedBlocks = React.useMemo(() => {
    return parseBody(translatedMessage || post.message);
  }, [translatedMessage, post.message]);

  const copyShareLink = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(postUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const shareToFacebook = () => {
    if (typeof window !== 'undefined') {
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
      window.open(fbUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
    }
  };

  const shareToZalo = () => {
    if (typeof window !== 'undefined') {
      const zaloUrl = `https://sp.zalo.me/plugins/share?url=${encodeURIComponent(postUrl)}`;
      window.open(zaloUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
    }
  };

  return (
    <article
      style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '24px 16px 64px 16px'
      }}
    >
      {/* Top Navigation & Breadcrumb */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '999px',
            color: 'var(--color-text)',
            fontSize: '0.875rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.2s'
          }}
        >
          <ArrowLeft size={16} />
          {t.backToHome || 'Quay lại Trang Chủ'}
        </Link>

        {/* Category badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {post.kind === 'notice' ? (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                backgroundColor: 'rgba(211, 47, 47, 0.12)',
                color: 'var(--color-primary)',
                border: '1px solid rgba(211, 47, 47, 0.3)',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 700
              }}
            >
              <Tag size={13} /> {t.tabNotices || 'THÔNG BÁO'}
            </span>
          ) : (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                backgroundColor: 'rgba(15, 118, 110, 0.12)',
                color: '#0F766E',
                border: '1px solid rgba(15, 118, 110, 0.3)',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 700
              }}
            >
              <Tag size={13} /> {t.tabActivities || 'TIN TỨC'}
            </span>
          )}
        </div>
      </div>

      {/* Main Article Container */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Article Header */}
        <header
          style={{
            padding: '24px 20px 16px 20px',
            borderBottom: '1px solid var(--color-border)'
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(1.4rem, 4vw, 1.85rem)',
              fontWeight: 800,
              lineHeight: 1.35,
              color: 'var(--color-text)',
              marginBottom: '16px',
              letterSpacing: '-0.01em'
            }}
          >
            {title}
          </h1>

          {/* Meta Info Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} style={{ color: 'var(--color-primary)' }} />
                {formatDateTime(post.created_time)}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} />
                {readingMinutes(post.message)} phút đọc
              </span>
              {post.likesCount > 0 && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: '#E11D48',
                    fontWeight: 600
                  }}
                >
                  <Heart size={14} fill="#E11D48" /> {post.likesCount.toLocaleString('vi-VN')}
                </span>
              )}
            </div>

            {/* Social Share Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={copyShareLink}
                title="Sao chép liên kết"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: copied ? '#ECFDF5' : 'var(--color-bg-secondary)',
                  color: copied ? '#059669' : 'var(--color-text)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Đã chép link' : 'Chép link'}
              </button>

              <button
                onClick={shareToFacebook}
                title="Chia sẻ lên Facebook"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#1877F2',
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <FacebookIcon size={14} />
                Share
              </button>

              <button
                onClick={shareToZalo}
                title="Chia sẻ qua Zalo"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid #0068FF',
                  backgroundColor: 'rgba(0, 104, 255, 0.08)',
                  color: '#0068FF',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Share2 size={14} />
                Zalo
              </button>
            </div>
          </div>
        </header>

        {/* Media Section: High-Res Photo Gallery / Full-Image Banner */}
        {post.images && post.images.length > 0 && (
          <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '12px' }}>
            {post.images.length === 1 ? (
              <div
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'zoom-in',
                  textAlign: 'center',
                  backgroundColor: 'var(--color-card-bg)'
                }}
                onClick={() => setLightbox(post.images[0])}
              >
                <img
                  src={post.images[0]}
                  alt={title}
                  style={{
                    width: '100%',
                    maxHeight: '640px',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                    borderRadius: '8px'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '6px 10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Maximize2 size={13} /> Phóng to
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      post.images.length === 2
                        ? 'repeat(2, 1fr)'
                        : 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '10px'
                  }}
                >
                  {post.images.map((src, index) => (
                    <div
                      key={index}
                      onClick={() => setLightbox(src)}
                      style={{
                        position: 'relative',
                        height: '240px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'zoom-in',
                        backgroundColor: 'var(--color-card-bg)'
                      }}
                    >
                      <img
                        src={src}
                        alt={`${title} - ảnh ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    paddingTop: '8px',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.75rem'
                  }}
                >
                  Album {post.images.length} ảnh — Nhấn vào bất kỳ ảnh nào để xem toàn màn hình
                </div>
              </div>
            )}
          </div>
        )}

        {/* Video Player Section */}
        {(() => {
          const mediaSource = playerSrc(post);
          if (!mediaSource) return null;
          return (
            <div style={{ padding: '16px 20px', backgroundColor: 'var(--color-bg-secondary)' }}>
              <div
                style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)'
                }}
              >
                {mediaSource.type === 'video' ? (
                  <video
                    src={mediaSource.src}
                    controls
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#000'
                    }}
                  />
                ) : (
                  <iframe
                    src={mediaSource.src}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          );
        })()}

        {/* Article Body Content */}
        <div
          style={{
            padding: '24px 20px',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: 'var(--color-text)'
          }}
        >
          {parsedBlocks.map((b, i) => {
            if (b.kind === 'heading') {
              return (
                <h2
                  key={i}
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    marginTop: '24px',
                    marginBottom: '12px',
                    paddingLeft: '12px',
                    borderLeft: '4px solid var(--color-primary)'
                  }}
                >
                  {b.text}
                </h2>
              );
            }
            if (b.kind === 'list') {
              return (
                <ul
                  key={i}
                  style={{
                    paddingLeft: '24px',
                    marginBottom: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  {b.items.map((it, j) => (
                    <li key={j} style={{ color: 'var(--color-text)' }}>
                      {linkify(it)}
                    </li>
                  ))}
                </ul>
              );
            }
            if (b.kind === 'byline') {
              return (
                <div
                  key={i}
                  style={{
                    marginTop: '16px',
                    paddingTop: '10px',
                    borderTop: '1px dashed var(--color-border)',
                    fontSize: '0.78rem',
                    fontStyle: 'italic',
                    color: 'var(--color-text-muted)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Sparkles size={12} style={{ color: 'var(--color-primary)', opacity: 0.8 }} />
                  <span>{b.text}</span>
                </div>
              );
            }
            return (
              <p
                key={i}
                style={{
                  marginBottom: '14px',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {linkify(b.text)}
              </p>
            );
          })}

          {/* Related Links & Action Buttons */}
          {post.links && post.links.length > 0 && (
            <div
              style={{
                marginTop: '16px',
                padding: '10px 14px',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--color-border)'
              }}
            >
              <div
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  marginBottom: '6px',
                  color: 'var(--color-text-muted)'
                }}
              >
                Nguồn & Liên kết đính kèm:
              </div>
              <LinkButtons links={post.links} compact />
            </div>
          )}
        </div>

        {/* Footer of Article: Official Source Link & 2-Way Marketing Banner */}
        <footer
          style={{
            padding: '20px',
            backgroundColor: 'var(--color-bg-secondary)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}
        >
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            <strong>Xứ Đoàn Các Thánh Tử Đạo Việt Nam</strong> — Giáo Xứ Chánh Tòa Mỹ Tho
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href={post.permalink_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <FacebookIcon size={15} />
              Xem & Bình luận trên Fanpage
              <ExternalLink size={14} />
            </a>
          </div>
        </footer>
      </div>

      {/* Lightbox Modal for Full Image Zoom */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>
          <img
            src={lightbox}
            alt="Phóng to ảnh"
            style={{
              maxWidth: '96vw',
              maxHeight: '92vh',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
            }}
          />
        </div>
      )}
    </article>
  );
}
