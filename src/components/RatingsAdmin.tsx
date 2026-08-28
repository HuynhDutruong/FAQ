'use client';

import { useCallback, useEffect, useState } from 'react';
import { Star, Trash2, Eye, Loader2, RefreshCw } from 'lucide-react';
import { authedFetch } from '@/lib/authedFetch';

interface RatingItem {
  id: string;
  stars: number;
  comment: string;
  createdAt: string | null;
}

interface DayStat {
  date: string;
  total: number;
  hours: number[];
}

interface RatingsPayload {
  visits: number;
  visitsReal: number;
  visitsSeed: number;
  today: number;
  days: DayStat[];
  count: number;
  average: number;
  stars: Record<string, number>;
  ratings: RatingItem[];
}

const STAR_COLOR = (n: number) => (n >= 4 ? '#0F766E' : n === 3 ? '#B45309' : '#B91C1C');

const dayLabel = (iso: string) => {
  const [, m, d] = iso.split('-');
  return `${d}/${m}`;
};

/**
 * Cột đơn sắc, chiều cao tỉ lệ theo mốc lớn nhất — chỉ ghi số ở cột cao nhất
 * để hàng cột không biến thành bảng số.
 */
function Bars({ data, height, labelEvery, format }: {
  data: { key: string; label: string; value: number; title: string }[];
  height: number;
  labelEvery?: number;
  format?: (v: number) => string;
}) {
  const peak = Math.max(1, ...data.map(d => d.value));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: `${height}px` }}>
        {data.map((d, i) => (
          <div key={d.key} title={d.title} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '3px' }}>
            {d.value === peak && peak > 0 && (
              <div style={{ fontSize: '0.66rem', fontWeight: 800, color: 'var(--color-red)', textAlign: 'center' }}>
                {(format || String)(d.value)}
              </div>
            )}
            <div
              style={{
                height: `${Math.max(d.value > 0 ? 4 : 2, (d.value / peak) * (height - 16))}px`,
                borderRadius: '4px 4px 0 0',
                backgroundColor: d.value > 0 ? 'var(--color-red)' : 'var(--color-border-subtle)',
                opacity: d.value > 0 ? (0.45 + 0.55 * (d.value / peak)) : 1
              }}
            />
            <div style={{ fontSize: '0.62rem', color: 'var(--color-subtle)', textAlign: 'center', height: '12px' }}>
              {!labelEvery || i % labelEvery === 0 ? d.label : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RatingsAdmin() {
  const [data, setData] = useState<RatingsPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<number | null>(null);
  const [seed, setSeed] = useState('');

  const load = useCallback(
    () =>
      authedFetch('/api/danh-gia?list=1')
        .then(async res => {
          const payload = await res.json();
          if (!res.ok) throw new Error(payload.error || 'Không tải được đánh giá');
          setData(payload);
          setSeed(String(payload.visitsSeed ?? 0));
          setError(null);
        })
        .catch(err => setError(err instanceof Error ? err.message : 'Lỗi tải dữ liệu'))
        .finally(() => setLoading(false)),
    []
  );

  useEffect(() => {
    load();
  }, [load]);

  const refresh = () => {
    setLoading(true);
    load();
  };

  const saveSeed = async () => {
    try {
      const res = await authedFetch('/api/danh-gia', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seed: Number(seed) })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Không lưu được');
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Lỗi khi lưu số mồi');
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Xoá vĩnh viễn đánh giá này? Điểm trung bình sẽ được tính lại.')) return;
    try {
      const res = await authedFetch(`/api/danh-gia?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Không xoá được');
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Lỗi khi xoá');
    }
  };

  if (loading && !data) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
        <Loader2 size={20} className="spin" style={{ verticalAlign: '-4px', marginRight: '8px' }} />
        Đang tải đánh giá...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#FEE2E2', color: '#B91C1C', borderRadius: '12px' }}>
        <strong>Lỗi:</strong> {error}
      </div>
    );
  }

  const ratings = (data?.ratings || []).filter(r => filter === null || r.stars === filter);
  const days = data?.days || [];
  const todayStat = days[days.length - 1];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Tổng hợp */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px'
      }}>
        <div className="admin-stat-card">
          <div className="admin-stat-value"><Eye size={20} /> {(data?.visits || 0).toLocaleString('vi-VN')}</div>
          <div className="admin-stat-label">Lượt truy cập</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {data?.count ? data.average.toFixed(1) : '—'} <Star size={18} fill="#F4B400" strokeWidth={0} />
          </div>
          <div className="admin-stat-label">{data?.count || 0} lượt đánh giá</div>
        </div>
        {[5, 4, 3, 2, 1].map(n => (
          <button
            key={n}
            onClick={() => setFilter(filter === n ? null : n)}
            className="admin-stat-card"
            style={{
              cursor: 'pointer',
              borderColor: filter === n ? 'var(--color-red)' : undefined
            }}
          >
            <div className="admin-stat-value" style={{ color: STAR_COLOR(n) }}>
              {data?.stars?.[n] || 0}
            </div>
            <div className="admin-stat-label">{n} sao</div>
          </button>
        ))}
      </div>

      <button
        onClick={refresh}
        style={{
          alignSelf: 'flex-start',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '7px 14px',
          borderRadius: '8px',
          border: '1px solid var(--color-border-subtle)',
          backgroundColor: 'var(--color-card-bg)',
          color: 'var(--color-dark)',
          fontWeight: 700,
          fontSize: '0.84rem',
          cursor: 'pointer'
        }}
      >
        <RefreshCw size={14} className={loading ? 'spin' : undefined} /> Tải lại
      </button>

      {/* Lượt truy cập theo giờ và theo ngày (giờ Việt Nam) */}
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: '14px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)' }}>
            Lượt truy cập theo thời gian
          </h3>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-subtle)' }}>
            Hôm nay <strong style={{ color: 'var(--color-dark)' }}>{(data?.today || 0).toLocaleString('vi-VN')}</strong>
            {' · '}máy chủ đếm được <strong style={{ color: 'var(--color-dark)' }}>{(data?.visitsReal || 0).toLocaleString('vi-VN')}</strong>
            {' · '}mồi <strong style={{ color: 'var(--color-dark)' }}>{(data?.visitsSeed || 0).toLocaleString('vi-VN')}</strong>
          </div>
        </div>

        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-subtle)', marginBottom: '6px' }}>
          24 giờ hôm nay
        </div>
        <Bars
          height={84}
          labelEvery={6}
          data={(todayStat?.hours || Array(24).fill(0)).map((v, h) => ({
            key: `h${h}`,
            label: `${h}h`,
            value: v,
            title: `${h}h: ${v} lượt`
          }))}
        />

        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-subtle)', margin: '18px 0 6px' }}>
          7 ngày gần nhất
        </div>
        <Bars
          height={96}
          data={days.map(d => ({
            key: d.date,
            label: dayLabel(d.date),
            value: d.total,
            title: `${dayLabel(d.date)}: ${d.total} lượt`
          }))}
        />

        {/* Số mồi cho giai đoạn trước khi có bộ đếm */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--color-border-subtle)' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-dark)' }}>
            Lượt truy cập mồi:
          </label>
          <input
            type="number"
            min={0}
            value={seed}
            onChange={e => setSeed(e.target.value)}
            style={{
              width: '140px',
              padding: '7px 10px',
              borderRadius: '8px',
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: 'var(--color-input-bg)',
              color: 'var(--color-dark)',
              fontSize: '0.85rem'
            }}
          />
          <button
            onClick={saveSeed}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'var(--color-red)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Lưu
          </button>
          <span style={{ fontSize: '0.76rem', color: 'var(--color-subtle)' }}>
            Cộng vào số hiển thị ngoài trang chủ, không đụng tới số máy chủ đếm được.
          </span>
        </div>
      </div>

      {ratings.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#6B7280',
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '16px',
          border: '1px solid var(--color-border-subtle)'
        }}>
          {filter ? `Chưa có đánh giá ${filter} sao.` : 'Chưa có đánh giá nào.'}
        </div>
      ) : (
        ratings.map(r => (
          <div
            key={r.id}
            style={{
              backgroundColor: 'var(--color-card-bg)',
              padding: '16px 20px',
              borderRadius: '14px',
              border: '1px solid var(--color-border-subtle)',
              borderLeft: `4px solid ${STAR_COLOR(r.stars)}`,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', gap: '2px' }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <Star
                      key={n}
                      size={15}
                      fill={n <= r.stars ? '#F4B400' : 'transparent'}
                      color={n <= r.stars ? '#F4B400' : '#9CA3AF'}
                      strokeWidth={1.8}
                    />
                  ))}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-subtle)' }}>
                  {r.createdAt ? new Date(r.createdAt).toLocaleString('vi-VN') : 'Vừa gửi'}
                </span>
              </div>

              {r.comment && (
                <div style={{
                  marginTop: '10px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-input-bg)',
                  color: 'var(--color-dark)',
                  fontSize: '0.9rem',
                  lineHeight: 1.55,
                  whiteSpace: 'pre-wrap'
                }}>
                  {r.comment}
                </div>
              )}
            </div>

            <button
              onClick={() => remove(r.id)}
              title="Xoá đánh giá"
              style={{
                padding: '7px 12px',
                backgroundColor: '#FEE2E2',
                color: '#B91C1C',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                flexShrink: 0
              }}
            >
              <Trash2 size={14} /> Xoá
            </button>
          </div>
        ))
      )}
    </div>
  );
}
