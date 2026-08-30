'use client';

import { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, RefreshCw, XCircle } from 'lucide-react';
import { authedFetch } from '@/lib/authedFetch';

type Level = 'ok' | 'warn' | 'error';

interface Check {
  id: string;
  label: string;
  level: Level;
  message: string;
  action?: string;
}

interface HealthResponse {
  overall: Level;
  checkedAt: string;
  checks: Check[];
}

const TONE: Record<Level, { bg: string; border: string; fg: string; label: string }> = {
  ok: { bg: 'rgba(5, 150, 105, 0.08)', border: 'rgba(5, 150, 105, 0.25)', fg: '#047857', label: 'Bình thường' },
  warn: { bg: 'rgba(217, 119, 6, 0.08)', border: 'rgba(217, 119, 6, 0.28)', fg: '#B45309', label: 'Cần lưu ý' },
  error: { bg: 'rgba(220, 38, 38, 0.08)', border: 'rgba(220, 38, 38, 0.28)', fg: '#B91C1C', label: 'Đang có sự cố' }
};

function LevelIcon({ level }: { level: Level }) {
  const c = TONE[level].fg;
  if (level === 'ok') return <CheckCircle2 size={17} color={c} strokeWidth={2.3} />;
  if (level === 'warn') return <AlertTriangle size={17} color={c} strokeWidth={2.3} />;
  return <XCircle size={17} color={c} strokeWidth={2.3} />;
}

/**
 * Bảng chẩn đoán tình trạng hệ thống.
 *
 * Lý do có bảng này: các sự cố hạ tầng trước đây hỏng âm thầm. Hết hạn mức
 * Firestore làm chết cùng lúc phần đánh giá, feed Facebook và trang bài viết,
 * nhưng giao diện chỉ báo "không tìm thấy" hoặc "thử lại sau" — người quản trị
 * không có cách nào biết nguyên nhân nếu không đọc log máy chủ.
 */
export default function SystemHealthPanel() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authedFetch('/api/tinh-trang');
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Không kiểm tra được.');
      setData(json as HealthResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không kiểm tra được tình trạng hệ thống.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const overall = data?.overall ?? 'ok';
  const tone = TONE[overall];

  return (
    <section
      style={{
        border: `1px solid ${data ? tone.border : 'var(--color-border-subtle)'}`,
        backgroundColor: data ? tone.bg : 'var(--color-card-bg)',
        borderRadius: '12px',
        padding: '14px 16px',
        marginBottom: '18px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {data && <LevelIcon level={overall} />}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-dark)' }}>
            Tình trạng hệ thống
            {data && <span style={{ color: tone.fg }}> — {tone.label}</span>}
          </div>
          {data && (
            <div style={{ fontSize: '0.74rem', color: 'var(--color-text-subtle)', marginTop: '1px' }}>
              Kiểm tra lúc {new Date(data.checkedAt).toLocaleTimeString('vi-VN')}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={load}
          disabled={loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-card-bg)',
            color: 'var(--color-dark)',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          <RefreshCw size={13} className={loading ? 'spin' : undefined} />
          Kiểm tra lại
        </button>
      </div>

      {error && (
        <p style={{ margin: '10px 0 0', fontSize: '0.82rem', color: '#B91C1C' }}>{error}</p>
      )}

      {loading && !data && (
        <p style={{ margin: '10px 0 0', fontSize: '0.82rem', color: 'var(--color-text-subtle)' }}>
          Đang kiểm tra…
        </p>
      )}

      {data && (
        <div style={{ display: 'grid', gap: '8px', marginTop: '12px' }}>
          {data.checks.map((c) => {
            const t = TONE[c.level];
            return (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  gap: '9px',
                  alignItems: 'flex-start',
                  padding: '9px 11px',
                  borderRadius: '9px',
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                <span style={{ marginTop: '1px', flexShrink: 0 }}>
                  <LevelIcon level={c.level} />
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-dark)' }}>{c.label}</div>
                  <div style={{ fontSize: '0.8rem', lineHeight: 1.55, color: 'var(--color-text-subtle)', marginTop: '1px' }}>
                    {c.message}
                  </div>
                  {c.action && (
                    <div style={{ fontSize: '0.78rem', lineHeight: 1.55, color: t.fg, marginTop: '4px', fontWeight: 600 }}>
                      Cần làm: {c.action}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
