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
const MAX_RECORDED_VISITS_KEY = 'catholic_max_visits_recorded_v1';

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
  const [mounted, setMounted] = useState(false);
  const [picked, setPicked] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    let guaranteedVisits = 0;
    try {
      guaranteedVisits = parseInt(localStorage.getItem(MAX_RECORDED_VISITS_KEY) || '0', 10);
      if (guaranteedVisits > 0) {
        setStats({ visits: guaranteedVisits, count: 0, average: 0, stars: {} });
      }
    } catch {
      // noop
    }

    let firstVisit = false;
    try {
      firstVisit = !sessionStorage.getItem(VISIT_KEY);
      if (firstVisit) sessionStorage.setItem(VISIT_KEY, '1');
    } catch {
      // Trình duyệt chặn storage thì bỏ qua
    }

    fetch(`/api/danh-gia${firstVisit ? '?visit=1' : ''}`)
      .then((res) => res.json())
      .then((data: Stats) => {
        let guaranteedVisits = Number(data.visits || 0);
        try {
          const prevMax = parseInt(localStorage.getItem(MAX_RECORDED_VISITS_KEY) || '0', 10);
          // Lượt truy cập CHỈ ĐƯỢC ĐỨNG YÊN HOẶC TĂNG, TUYỆT ĐỐI KHÔNG GIẢM
          guaranteedVisits = Math.max(prevMax, guaranteedVisits);
          if (guaranteedVisits > prevMax) {
            localStorage.setItem(MAX_RECORDED_VISITS_KEY, String(guaranteedVisits));
          }
        } catch {
          // noop
        }

        setStats({ ...data, visits: guaranteedVisits });

        try {
          const rated = localStorage.getItem(RATED_KEY);
          if (rated) setDone(Number(rated));
        } catch {
          // Bỏ qua
        }
      })
      .catch(() => {
        // Khi lỗi mạng, giữ nguyên số lượt lớn nhất đã biết, TUYỆT ĐỐI KHÔNG reset về 0
        setStats((prev) => {
          const fallbackMax = typeof window !== 'undefined'
            ? parseInt(localStorage.getItem(MAX_RECORDED_VISITS_KEY) || '0', 10)
            : 0;
          return {
            visits: Math.max(prev?.visits || 0, fallbackMax),
            count: prev?.count || 0,
            average: prev?.average || 0,
            stars: prev?.stars || {}
          };
        });
      });
  }, []);

  const needComment = picked > 0 && picked < 3;

  if (stats?.unavailable && (!stats.visits || stats.visits === 0)) return null;

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

      // Giữ nguyên tính chất không giảm của lượt truy cập
      const prevVisits = stats?.visits || 0;
      const finalVisits = Math.max(prevVisits, Number(data.visits || 0));
      setStats({ ...data, visits: finalVisits });
      setDone(picked);

      try {
        localStorage.setItem(RATED_KEY, String(picked));
        localStorage.setItem(MAX_RECORDED_VISITS_KEY, String(finalVisits));
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
    <section
      style={{
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: '10px',
        padding: '18px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: '10px',
          marginBottom: '14px'
        }}
      >
        <MessageSquareHeart size={17} style={{ color: 'var(--color-red)' }} />
        <h2
          style={{
            margin: 0,
            fontSize: '1.05rem',
            fontWeight: 800,
            color: 'var(--color-red)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          {t.ratingWidgetTitle || 'Cảm Nhận Của Bạn'}
        </h2>
      </div>

      {/* Lượt truy cập & điểm trung bình */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <div className="stat-tile">
          <div className="stat-value">
            {mounted && stats && stats.visits > 0 ? stats.visits.toLocaleString('vi-VN') : '—'}
          </div>
          <div className="stat-label">
            <Eye size={12} /> {t.ratingVisits || 'Lượt truy cập'}
          </div>
        </div>

        <div className="stat-tile">
          <div className="stat-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            {mounted && stats && stats.count > 0 ? stats.average.toFixed(1) : '—'}
            <Star size={15} fill="#F4B400" strokeWidth={0} />
          </div>
          <div className="stat-label">
            {mounted && stats && stats.count > 0
              ? `${stats.count} ${t.ratingCountLabel || 'lượt đánh giá'}`
              : t.ratingBeFirst || 'Hãy là người đầu tiên'}
          </div>
        </div>
      </div>

      {done !== null ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0F766E', fontWeight: 700, fontSize: '0.88rem' }}>
            <CheckCircle2 size={18} />
            <span>{(t.ratingThanks || 'Cảm ơn bạn đã đánh giá!').replace('{n}', String(done))}</span>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--color-subtle)', lineHeight: 1.4 }}>
            Đóng góp của bạn giúp chúng tôi phục vụ cộng đoàn tốt hơn mỗi ngày.
          </div>

          {stats?.fbReviewUrl && (
            <a
              href={stats.fbReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '4px',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #1877F2',
                color: '#1877F2',
                fontSize: '0.8rem',
                fontWeight: 700,
                textDecoration: 'none',
                backgroundColor: 'rgba(24, 119, 242, 0.05)'
              }}
            >
              <ThumbsUp size={14} />
              <span>{t.ratingShareFb || 'Đánh giá Fanpage trên Facebook'}</span>
            </a>
          )}
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-subtle)', marginBottom: '8px' }}>
            {t.ratingAsk || 'Xin cho biết mức độ hài lòng của bạn về website:'}
          </div>

          {/* 5 ngôi sao */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
            {[1, 2, 3, 4, 5].map((star) => {
              const active = (hover || picked) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setPicked(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`${star} sao`}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '4px',
                    cursor: 'pointer',
                    transform: active ? 'scale(1.15)' : 'scale(1)',
                    transition: 'transform 0.12s ease'
                  }}
                >
                  <Star
                    size={26}
                    fill={active ? '#F4B400' : 'none'}
                    color={active ? '#F4B400' : 'var(--color-border-subtle)'}
                    strokeWidth={active ? 0 : 1.5}
                  />
                </button>
              );
            })}
          </div>

          {/* Ô góp ý khi người dùng chọn 1-2 sao hoặc tuỳ chọn */}
          {picked > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.ratingCommentPlaceholder || 'Xin góp ý để chúng tôi cải thiện...'}
                rows={2}
                maxLength={800}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: '0.82rem',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  backgroundColor: 'var(--color-input-bg)',
                  color: 'var(--color-dark)',
                  boxSizing: 'border-box'
                }}
              />

              {error && (
                <div style={{ fontSize: '0.78rem', color: '#B91C1C', fontWeight: 600 }}>
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={submit}
                disabled={sending || (needComment && comment.trim().length < 10)}
                style={{
                  alignSelf: 'flex-start',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--color-red)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: sending || (needComment && comment.trim().length < 10) ? 'not-allowed' : 'pointer',
                  opacity: sending || (needComment && comment.trim().length < 10) ? 0.6 : 1
                }}
              >
                {sending ? <Loader2 size={14} className="spin" /> : null}
                <span>{t.ratingSubmitText || 'Gửi Đánh Giá'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
