'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Star, Eye, Loader2, CheckCircle2, MessageSquareHeart, ThumbsUp } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface Stats {
  visits: number;
  count: number;
  average: number;
  stars: Record<string, number>;
  /** Facebook không có API ghi đánh giá, chỉ mời người dùng tự đăng lên Fanpage. */
  fbReviewUrl?: string | null;
  /** Máy chủ chưa có khoá Firebase Admin — ẩn hẳn thay vì hiện số 0. */
  unavailable?: boolean;
}

const VISIT_KEY = 'site_visit_counted';
const RATED_KEY = 'site_rated_stars';

/** Pháo hoa mừng khi gửi đánh giá xong. */
function celebrate() {
  const base = {
    spread: 80,
    ticks: 140,
    gravity: 0.9,
    colors: ['#B71C1C', '#F4B400', '#0F766E', '#FFFFFF']
  };
  confetti({ ...base, particleCount: 70, origin: { x: 0.5, y: 0.72 } });
  setTimeout(() => confetti({ ...base, particleCount: 45, angle: 60, origin: { x: 0.15, y: 0.85 } }), 160);
  setTimeout(() => confetti({ ...base, particleCount: 45, angle: 120, origin: { x: 0.85, y: 0.85 } }), 320);
}

export default function RatingWidget() {
  const { t, lang } = useLanguage();
  const [stats, setStats] = useState<Stats | null>(null);
  const [picked, setPicked] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<number | null>(null);

  useEffect(() => {
    let firstVisit = false;
    try {
      firstVisit = !sessionStorage.getItem(VISIT_KEY);
      if (firstVisit) sessionStorage.setItem(VISIT_KEY, '1');
    } catch {
      // Trình duyệt chặn storage thì bỏ qua, chỉ mất lượt đếm
    }

    fetch(`/api/danh-gia${firstVisit ? '?visit=1' : ''}`)
      .then(res => res.json())
      .then((data: Stats) => {
        setStats(data);
        try {
          const rated = localStorage.getItem(RATED_KEY);
          if (rated) setDone(Number(rated));
        } catch {
          // Bỏ qua
        }
      })
      .catch(() => setStats({ visits: 0, count: 0, average: 0, stars: {} }));
  }, []);

  const needComment = picked > 0 && picked < 3;

  if (stats?.unavailable) return null;

  const submit = async () => {
    if (!picked || sending) return;
    setSending(true);
    setError(null);

    try {
      const res = await fetch('/api/danh-gia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stars: picked, comment, lang })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Chưa gửi được, vui lòng thử lại.');
        return;
      }

      setStats(data);
      setDone(picked);
      try {
        localStorage.setItem(RATED_KEY, String(picked));
      } catch {
        // Bỏ qua
      }
      celebrate();
    } catch {
      setError('Không kết nối được máy chủ, vui lòng thử lại.');
    } finally {
      setSending(false);
    }
  };

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
        marginBottom: '14px'
      }}>
        <MessageSquareHeart size={17} style={{ color: 'var(--color-red)' }} />
        <h2 style={{
          margin: 0,
          fontSize: '1.05rem',
          fontWeight: 800,
          color: 'var(--color-red)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}>
          {t.ratingWidgetTitle || 'Cảm Nhận Của Bạn'}
        </h2>
      </div>

      {/* Lượt truy cập & điểm trung bình */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <div className="stat-tile">
          <div className="stat-value">
            {stats ? stats.visits.toLocaleString('vi-VN') : '—'}
          </div>
          <div className="stat-label">
            <Eye size={12} /> {t.ratingVisits || 'Lượt truy cập'}
          </div>
        </div>

        <div className="stat-tile">
          <div className="stat-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            {stats && stats.count > 0 ? stats.average.toFixed(1) : '—'}
            <Star size={15} fill="#F4B400" strokeWidth={0} />
          </div>
          <div className="stat-label">
            {stats && stats.count > 0
              ? `${stats.count} ${t.ratingCountLabel || 'lượt đánh giá'}`
              : (t.ratingBeFirst || 'Hãy là người đầu tiên')}
          </div>
        </div>
      </div>

      {done !== null ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0F766E', fontWeight: 700, fontSize: '0.88rem' }}>
            <CheckCircle2 size={18} />
            <span>{(t.ratingThanks || 'Cảm ơn bạn đã đánh giá {n} sao!').replace('{n}', String(done))}</span>
          </div>

          {/* Đánh giá bên Fanpage phải do chính người dùng đăng, Facebook không cho ghi qua API */}
          {done >= 4 && stats?.fbReviewUrl && (
            <a
              href={stats.fbReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-btn-subtle-bg)',
                color: '#1877F2',
                fontSize: '0.82rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <ThumbsUp size={14} /> {t.ratingShareFb || 'Đánh giá Fanpage trên Facebook'}
            </a>
          )}
        </div>
      ) : (
        <>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '8px' }}>
            {t.ratingAsk || 'Bạn thấy trang này thế nào?'}
          </div>

          <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }} onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                aria-label={`${star} sao`}
                onClick={() => { setPicked(star); setError(null); }}
                onMouseEnter={() => setHover(star)}
                className="star-btn"
              >
                <Star
                  size={26}
                  fill={(hover || picked) >= star ? '#F4B400' : 'transparent'}
                  color={(hover || picked) >= star ? '#F4B400' : 'var(--color-subtle)'}
                  strokeWidth={1.8}
                />
              </button>
            ))}
          </div>

          {/* Dưới 3 sao thì hỏi ngay điều chưa hài lòng */}
          {needComment && (
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              maxLength={800}
              rows={3}
              placeholder={t.ratingCommentPlaceholder || 'Điều gì làm bạn chưa hài lòng? Xin cho chúng tôi biết để sửa...'}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '8px',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-input-bg)',
                color: 'var(--color-dark)',
                fontSize: '0.85rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          )}

          {error && (
            <div style={{ fontSize: '0.8rem', color: '#B91C1C', marginBottom: '8px' }}>{error}</div>
          )}

          <button
            type="button"
            onClick={submit}
            disabled={!picked || sending}
            style={{
              width: '100%',
              padding: '9px 14px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: picked ? 'var(--color-red)' : 'var(--color-btn-subtle-bg)',
              color: picked ? '#FFFFFF' : 'var(--color-subtle)',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: picked && !sending ? 'pointer' : 'not-allowed',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {sending && <Loader2 size={14} className="spin" />}
            {t.ratingSubmitText || 'Gửi Đánh Giá'}
          </button>
        </>
      )}
    </section>
  );
}
