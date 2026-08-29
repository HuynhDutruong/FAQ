'use client';

import { useState, type CSSProperties } from 'react';
import { Play, MonitorPlay, Video, ExternalLink, Radio } from 'lucide-react';
import type { PostMediaInfo } from '@/lib/postIntel';
import { useLanguage } from '@/lib/i18n/LanguageContext';

type MediaPost = PostMediaInfo & { full_picture?: string | null };

export const thumbOf = (p: MediaPost) =>
  p.full_picture ||
  (p.youtube[0] ? `https://img.youtube.com/vi/${p.youtube[0]}/hqdefault.jpg` : null) ||
  '/logo.jpg';

/** Nguồn phát ưu tiên: YouTube → video trực tiếp → iframe Facebook. */
export function playerSrc(p: MediaPost, skipFile = false): { type: 'video' | 'iframe'; src: string } | null {
  if (p.youtube[0]) return { type: 'iframe', src: `https://www.youtube.com/embed/${p.youtube[0]}?autoplay=1&rel=0` };
  if (p.video && !skipFile) return { type: 'video', src: p.video };
  if (p.videoEmbed) return { type: 'iframe', src: p.videoEmbed };
  return null;
}

export const isPlayable = (p: MediaPost) => !!playerSrc(p);

/** Chặn thẻ Link bao ngoài điều hướng khi người xem thao tác với trình phát. */
const swallow = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

/**
 * Ảnh đại diện bài viết, bấm nút play là xem ngay tại chỗ, không rời trang.
 */
export function PostThumb({
  post,
  height,
  eager,
  imgClassName,
  radius
}: {
  post: MediaPost;
  height?: string;
  eager?: boolean;
  imgClassName?: string;
  radius?: string;
}) {
  const [playing, setPlaying] = useState(false);
  // Link tệp video của Facebook có hạn dùng — hỏng thì chuyển sang iframe nhúng
  const [fileFailed, setFileFailed] = useState(false);
  const player = playerSrc(post, fileFailed);

  const frame: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: height || '100%',
    overflow: 'hidden',
    borderRadius: radius,
    backgroundColor: playing ? '#000' : 'var(--color-input-bg)'
  };

  if (playing && player) {
    return (
      <div style={frame} onClick={swallow}>
        {player.type === 'video' ? (
          <video
            src={player.src}
            controls
            autoPlay
            playsInline
            onError={() => setFileFailed(true)}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        ) : (
          <iframe
            src={player.src}
            title="Trình phát video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
          />
        )}
      </div>
    );
  }

  return (
    <div style={frame}>
      <img
        src={thumbOf(post)}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        className={imgClassName}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 25%',
          display: 'block',
          transition: 'transform 0.3s ease'
        }}
      />
      {player && (
        <button
          type="button"
          aria-label="Phát video"
          onClick={e => { swallow(e); setPlaying(true); }}
          style={{
            position: 'absolute',
            inset: 0,
            margin: 'auto',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.85)',
            backgroundColor: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, background-color 0.15s ease'
          }}
          className="post-play-btn"
        >
          <Play size={24} fill="#FFFFFF" strokeWidth={0} style={{ marginLeft: '3px' }} />
        </button>
      )}
    </div>
  );
}

const CHIP: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '3px',
  fontSize: '0.64rem',
  fontWeight: 700,
  padding: '1px 6px',
  borderRadius: '4px',
  letterSpacing: '0.01em'
};

/** Nhãn nhanh cho biết bài có video, YouTube hay liên kết trực tuyến. */
export function MediaChips({ post }: { post: MediaPost }) {
  const { t } = useLanguage();
  const chips: React.ReactNode[] = [];

  if (post.youtube.length)
    chips.push(
      <span key="yt" style={{ ...CHIP, backgroundColor: 'rgba(225,29,72,0.1)', color: '#E11D48' }}>
        <MonitorPlay size={10} /> YouTube
      </span>
    );
  else if (post.video || post.videoEmbed)
    chips.push(
      <span key="vid" style={{ ...CHIP, backgroundColor: 'rgba(37,99,235,0.1)', color: '#2563EB' }}>
        <Video size={10} /> Video
      </span>
    );

  if (post.links.length)
    chips.push(
      <span key="link" style={{ ...CHIP, backgroundColor: 'rgba(15,118,110,0.1)', color: '#0F766E' }}>
        <Radio size={10} /> {t.liveStream || 'Trực tuyến'}
      </span>
    );

  if (!chips.length) return null;
  return <span style={{ display: 'inline-flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center' }}>{chips}</span>;
}

/**
 * Nút mở liên kết trong bài. Dùng button thay vì thẻ a để đặt được
 * bên trong Link của thẻ bài mà vẫn hợp lệ.
 */
export function LinkButtons({ links, compact }: { links: MediaPost['links']; compact?: boolean }) {
  const { t } = useLanguage();
  if (!links.length) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: compact ? '4px' : '8px' }}>
      {links.map(l => (
        <button
          key={l.url}
          type="button"
          title={l.url}
          onClick={e => { swallow(e); window.open(l.url, '_blank', 'noopener,noreferrer'); }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: compact ? '3px 7px' : '4px 9px',
            borderRadius: '4px',
            border: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-input-bg)',
            color: 'var(--color-nav-active-text)',
            fontSize: compact ? '0.68rem' : '0.74rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
          className="post-link-btn"
        >
          <ExternalLink size={compact ? 10 : 12} />
          <span>{l.label?.includes('Trang tin') ? (t.catholicNews || l.label) : l.label}</span>
        </button>
      ))}
    </div>
  );
}
