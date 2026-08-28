'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Film, Play } from 'lucide-react';
import { useFacebookPosts } from '@/lib/useFacebookPosts';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { translateClientBatch } from '@/lib/clientTranslator';
import { PostThumb, thumbOf } from './PostMedia';

const MAX_VIDEOS = 6;

const shortTitle = (message: string) => {
  const line = (message || '').split('\n')[0].trim();
  return line.length > 72 ? line.slice(0, 72).trim() + '…' : line || 'Video Xứ Đoàn';
};

const formatDate = (s: string) =>
  new Date(s).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

/**
 * Video do Xứ Đoàn tự đăng (post.video là tệp trên CDN Facebook).
 * Video chia sẻ lại từ nơi khác không đưa vào đây.
 */
export default function VideoWidget() {
  const { posts, loading } = useFacebookPosts();
  const { t, lang } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [translatedTitles, setTranslatedTitles] = useState<Record<string, string>>({});

  const videos = useMemo(() => posts.filter(p => p.video).slice(0, MAX_VIDEOS), [posts]);

  useEffect(() => {
    if (lang === 'vi' || videos.length === 0) return;
    let isCancelled = false;
    const titles = videos.map(v => shortTitle(v.message));
    translateClientBatch(titles, lang).then(res => {
      if (isCancelled) return;
      const map: Record<string, string> = {};
      videos.forEach((v, i) => {
        if (res[i]) map[`${v.id}_${lang}`] = res[i];
      });
      setTranslatedTitles(prev => ({ ...prev, ...map }));
    });
    return () => { isCancelled = true; };
  }, [videos, lang]);

  const getVideoTitle = (v: (typeof videos)[0]) => {
    if (lang !== 'vi' && translatedTitles[`${v.id}_${lang}`]) {
      return translatedTitles[`${v.id}_${lang}`];
    }
    return shortTitle(v.message);
  };

  if (loading || videos.length === 0) return null;

  const active = videos.find(v => v.id === activeId) || videos[0];
  const rest = videos.filter(v => v.id !== active.id);

  return (
    <section style={{
      backgroundColor: 'var(--color-card-bg)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: '10px',
      padding: '18px 20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '1px solid var(--color-border-subtle)',
        paddingBottom: '10px',
        marginBottom: '12px'
      }}>
        <Film size={17} style={{ color: 'var(--color-red)' }} />
        <h2 style={{
          margin: 0,
          fontSize: '1.05rem',
          fontWeight: 800,
          color: 'var(--color-red)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}>
          {t.chapterVideos || t.videoTitle || 'Video Xứ Đoàn'}
        </h2>
      </div>

      {/* Video đang chọn — key theo id để đổi bài là dừng trình phát cũ */}
      <PostThumb key={active.id} post={active} height="170px" radius="8px" />

      <Link
        href={`/bai-viet/${encodeURIComponent(active.id)}`}
        style={{ display: 'block', textDecoration: 'none', margin: '10px 0 4px' }}
      >
        <h3 style={{
          margin: 0,
          fontSize: '0.9rem',
          fontWeight: 700,
          lineHeight: 1.45,
          color: 'var(--color-dark)'
        }} className="news-row-title">
          {getVideoTitle(active)}
        </h3>
      </Link>
      <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)' }}>{formatDate(active.created_time)}</div>

      {rest.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px' }}>
          {rest.map(v => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveId(v.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px',
                borderRadius: '8px',
                border: '1px solid transparent',
                backgroundColor: 'transparent',
                textAlign: 'left',
                cursor: 'pointer'
              }}
              className="post-link-btn"
            >
              <span style={{ position: 'relative', flexShrink: 0, width: '76px', height: '48px', borderRadius: '6px', overflow: 'hidden', backgroundColor: 'var(--color-btn-subtle-bg)' }}>
                <img
                  src={thumbOf(v)}
                  alt=""
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <span style={{
                  position: 'absolute',
                  inset: 0,
                  margin: 'auto',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.55)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Play size={11} fill="#FFFFFF" strokeWidth={0} style={{ marginLeft: '1px' }} />
                </span>
              </span>

              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  lineHeight: 1.4,
                  color: 'var(--color-dark)'
                }}>
                  {getVideoTitle(v)}
                </span>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                  {formatDate(v.created_time)}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
