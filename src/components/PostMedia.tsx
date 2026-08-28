'use client';

import { useState, type CSSProperties } from 'react';
import { Play, MonitorPlay, Video, ExternalLink, Radio } from 'lucide-react';
import type { PostMediaInfo } from '@/lib/postIntel';

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
  height: string;
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
    height,
    overflow: 'hidden',
    borderRadius: radius,
    backgroundColor: playing ? '#000' : 'var(--color-btn-subtle-bg)'
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
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
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
  gap: '4px',
  fontSize: '0.7rem',
  fontWeight: 800,
  padding: '2px 8px',
  borderRadius: '20px',
  letterSpacing: '0.02em'
};

/** Nhãn nhanh cho biết bài có video, YouTube hay liên kết trực tuyến. */
export function MediaChips({ post }: { post: MediaPost }) {
  const chips: React.ReactNode[] = [];

  if (post.youtube.length)
    chips.push(
      <span key="yt" style={{ ...CHIP, backgroundColor: 'rgba(225,29,72,0.12)', color: '#E11D48' }}>
        <MonitorPlay size={12} /> YouTube
      </span>
    );
  else if (post.video || post.videoEmbed)
    chips.push(
      <span key="vid" style={{ ...CHIP, backgroundColor: 'rgba(37,99,235,0.12)', color: '#2563EB' }}>
        <Video size={12} /> Video
      </span>
    );

  if (post.links.length)
    chips.push(
      <span key="link" style={{ ...CHIP, backgroundColor: 'rgba(15,118,110,0.12)', color: '#0F766E' }}>
        <Radio size={12} /> Trực tuyến
      </span>
    );

  if (!chips.length) return null;
  return <span style={{ display: 'inline-flex', gap: '6px', flexWrap: 'wrap' }}>{chips}</span>;
}

/**
 * Nút mở liên kết trong bài. Dùng button thay vì thẻ a để đặt được
 * bên trong Link của thẻ bài mà vẫn hợp lệ.
 */
export function LinkButtons({ links, compact }: { links: MediaPost['links']; compact?: boolean }) {
  if (!links.length) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: compact ? '6px' : '12px' }}>
      {links.map(l => (
        <button
          key={l.url}
          type="button"
          title={l.url}
          onClick={e => { swallow(e); window.open(l.url, '_blank', 'noopener,noreferrer'); }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: compact ? '5px 10px' : '8px 14px',
            borderRadius: '8px',
            border: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-card-bg)',
            color: 'var(--color-nav-active-text)',
            fontSize: compact ? '0.74rem' : '0.84rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
          className="post-link-btn"
        >
          <ExternalLink size={compact ? 12 : 14} />
          {l.label}
        </button>
      ))}
    </div>
  );
}
