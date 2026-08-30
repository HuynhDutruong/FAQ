'use client';

/**
 * Khung chung cho bộ bốn trang khảo cứu.
 *
 * Mỗi trang con chỉ lo phần nội dung của mình; khung này lo phần lặp lại:
 * đường dẫn phân cấp, tiêu đề, và dải chuyển nhanh giữa bốn gian. Nhờ vậy
 * người đọc luôn biết mình đang ở gian nào và sang gian khác trong một cú bấm.
 */

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe } from 'lucide-react';

export const CAC_GIAN = [
  { href: '/gioi-thieu/giao-hoi', nhan: 'Giáo Hội Hoàn Vũ', ngan: 'Giáo Hội' },
  { href: '/gioi-thieu/giao-phan', nhan: 'Giáo Phận Mỹ Tho', ngan: 'Giáo Phận' },
  { href: '/gioi-thieu/giao-xu', nhan: 'Giáo Xứ Chánh Tòa', ngan: 'Giáo Xứ' },
  { href: '/gioi-thieu/xu-doan', nhan: 'Xứ Đoàn TNTT', ngan: 'Xứ Đoàn' }
];

export default function KhungTrang({
  tieuDe,
  phuDe,
  duongDan,
  children
}: {
  tieuDe: string;
  phuDe: string;
  duongDan: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--color-dark)', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Đường dẫn phân cấp */}
      <div style={{ borderBottom: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-card-bg)', padding: '12px 20px' }}>
        <div
          style={{
            maxWidth: '1220px', margin: '0 auto', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
            fontSize: '0.82rem', color: 'var(--color-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--color-red)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ArrowLeft size={14} /> Trang Chủ
            </Link>
            <span>/</span>
            <Link href="/gioi-thieu" style={{ color: 'inherit', textDecoration: 'none' }}>
              Bản Nghiên Cứu Lịch Sử
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--color-dark)', fontWeight: 700 }}>{tieuDe}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
            <Globe size={14} color="var(--color-red)" />
            <span>Bản nghiên cứu lịch sử</span>
          </div>
        </div>
      </div>

      {/* Dải chuyển nhanh giữa bốn gian */}
      <nav
        aria-label="Các gian của bản nghiên cứu"
        style={{ borderBottom: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--background)' }}
      >
        <div
          className="site-nav-scrollbar"
          style={{ maxWidth: '1220px', margin: '0 auto', display: 'flex', gap: '6px', padding: '8px 16px', overflowX: 'auto' }}
        >
          {CAC_GIAN.map((g) => {
            const dangXem = g.href === duongDan;
            return (
              <Link
                key={g.href}
                href={g.href}
                aria-current={dangXem ? 'page' : undefined}
                style={{
                  flex: '0 0 auto', padding: '7px 14px', borderRadius: '20px',
                  fontSize: '0.83rem', fontWeight: dangXem ? 800 : 600, whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  color: dangXem ? '#FFFFFF' : 'var(--color-dark)',
                  backgroundColor: dangXem ? 'var(--color-red)' : 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                {g.nhan}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="wiki-container main-layout">
        <article style={{ flex: 1, minWidth: 0 }}>
          <h1
            style={{
              fontSize: '2.1rem', fontWeight: 800, fontFamily: 'serif', margin: '0 0 8px',
              color: 'var(--color-dark)', borderBottom: '1.5px solid var(--color-border-subtle)',
              paddingBottom: '10px', lineHeight: 1.2
            }}
          >
            {tieuDe}
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-subtle)', fontStyle: 'italic', margin: '0 0 18px', lineHeight: 1.6 }}>
            {phuDe}
          </p>
          {children}

          <p style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.7, marginTop: '28px', paddingTop: '14px', borderTop: '1px solid var(--color-border-subtle)' }}>
            Nguồn tra cứu của toàn bộ bản khảo cứu — kèm mã hồ sơ lưu trữ và cả những chỗ đã tìm mà không thấy — được ghi
            chi tiết ở <Link href="/gioi-thieu/tu-lieu" style={{ color: 'var(--color-red)', fontWeight: 700 }}>trang Tư liệu tham khảo</Link>.
          </p>
        </article>
      </div>
    </div>
  );
}
