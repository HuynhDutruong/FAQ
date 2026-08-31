'use client';

/**
 * Khung chung cho bộ bốn trang khảo cứu.
 *
 * Mỗi trang con chỉ lo phần nội dung của mình; khung này lo phần lặp lại:
 * đường dẫn phân cấp, số chương và chân trang lật chương. Nhờ vậy bốn trang
 * đọc như bốn chương của một quyển sách chứ không phải bốn bài rời: người đọc
 * luôn biết mình đang ở chương nào và lật tiếp thì gặp gì.
 *
 * Việc nối bốn chương với nhau được làm bằng văn xuôi trong từng chương, không
 * bằng bảng biểu. Trang Tư liệu không phải một chương mà là phụ lục cuối sách.
 */

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe } from 'lucide-react';
import { ChuyenChuong, TANG, CHUONG } from './dongThoiGian';
import type { Tang } from './dongThoiGian';

export const CAC_GIAN = CHUONG.map((c) => ({
  href: TANG[c.tang].href,
  nhan: TANG[c.tang].nhan,
  ngan: TANG[c.tang].ngan,
  so: c.so,
  tang: c.tang
}));

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
  const chuong = CAC_GIAN.find((g) => g.href === duongDan);
  const tang: Tang | null = chuong ? chuong.tang : null;

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
            <span style={{ color: 'var(--color-dark)', fontWeight: 700 }}>
              {chuong ? `Chương ${chuong.so} — ${tieuDe}` : tieuDe}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
            <Globe size={14} color="var(--color-red)" />
            <span>Bản nghiên cứu lịch sử</span>
          </div>
        </div>
      </div>

      {/* Dải chuyển nhanh giữa bốn chương */}
      <nav
        aria-label="Bốn chương của bản nghiên cứu"
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
                <span style={{ opacity: dangXem ? 0.85 : 0.55, fontWeight: 800, marginRight: '5px' }}>{g.so}.</span>
                {g.nhan}
              </Link>
            );
          })}
          <Link
            href="/gioi-thieu/tu-lieu"
            aria-current={duongDan === '/gioi-thieu/tu-lieu' ? 'page' : undefined}
            style={{
              flex: '0 0 auto', padding: '7px 14px', borderRadius: '20px',
              fontSize: '0.83rem', fontWeight: duongDan === '/gioi-thieu/tu-lieu' ? 800 : 600, whiteSpace: 'nowrap',
              textDecoration: 'none',
              color: duongDan === '/gioi-thieu/tu-lieu' ? '#FFFFFF' : 'var(--color-subtle)',
              backgroundColor: duongDan === '/gioi-thieu/tu-lieu' ? 'var(--color-red)' : 'var(--color-card-bg)',
              border: '1px solid var(--color-border-subtle)'
            }}
          >
            Phụ lục — Tư liệu
          </Link>
        </div>
      </nav>

      <div className="wiki-container main-layout">
        <article style={{ flex: 1, minWidth: 0 }}>
          {chuong && (
            <div style={{ fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: TANG[chuong.tang].mau, marginBottom: '6px' }}>
              Chương {chuong.so} trong bốn chương
            </div>
          )}
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

          {tang && <ChuyenChuong tang={tang} />}

          <p style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.7, marginTop: '28px', paddingTop: '14px', borderTop: '1px solid var(--color-border-subtle)' }}>
            Nguồn tra cứu của toàn bộ bản khảo cứu — kèm mã hồ sơ lưu trữ và cả những chỗ đã tìm mà không thấy — được ghi
            chi tiết ở <Link href="/gioi-thieu/tu-lieu" style={{ color: 'var(--color-red)', fontWeight: 700 }}>trang Tư liệu tham khảo</Link>.
          </p>
        </article>
      </div>
    </div>
  );
}
