'use client';

/**
 * Bốn chương của bản khảo cứu, và cách lật từ chương này sang chương kia.
 *
 * Việc nối bốn chương thành một quyển sách được làm bằng văn xuôi ngay trong
 * từng chương — mỗi chương tự kể phần của mình rồi dẫn người đọc sang chương
 * kế tiếp bằng câu chữ, không bằng bảng biểu. File này chỉ giữ những gì cả
 * bốn trang cùng cần: tên chương, thứ tự chương, và chân trang lật chương.
 */

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type Tang = 'hoan-vu' | 'giao-phan' | 'giao-xu' | 'tntt';

export const TANG: Record<Tang, { nhan: string; ngan: string; href: string; mau: string }> = {
  'hoan-vu': {
    nhan: 'Giáo Hội Hoàn Vũ',
    ngan: 'Giáo Hội',
    href: '/gioi-thieu/giao-hoi',
    mau: 'var(--tang-hoan-vu)'
  },
  'giao-phan': {
    nhan: 'Giáo Phận Mỹ Tho',
    ngan: 'Giáo Phận',
    href: '/gioi-thieu/giao-phan',
    mau: 'var(--tang-giao-phan)'
  },
  'giao-xu': {
    nhan: 'Giáo Xứ Chánh Tòa',
    ngan: 'Giáo Xứ',
    href: '/gioi-thieu/giao-xu',
    mau: 'var(--tang-giao-xu)'
  },
  tntt: {
    nhan: 'Xứ Đoàn TNTT',
    ngan: 'Xứ Đoàn',
    href: '/gioi-thieu/xu-doan',
    mau: 'var(--tang-tntt)'
  }
};

export const CHUONG: { so: string; tang: Tang }[] = [
  { so: 'I', tang: 'hoan-vu' },
  { so: 'II', tang: 'giao-phan' },
  { so: 'III', tang: 'giao-xu' },
  { so: 'IV', tang: 'tntt' }
];

/** Chân trang lật chương, như lật sang trang sau của một quyển sách. */
export function ChuyenChuong({ tang }: { tang: Tang }) {
  const i = CHUONG.findIndex((c) => c.tang === tang);
  const truoc = i > 0 ? CHUONG[i - 1] : null;
  const sau = i >= 0 && i < CHUONG.length - 1 ? CHUONG[i + 1] : null;

  return (
    <nav className="dtg-lat" aria-label="Chuyển chương">
      {truoc ? (
        <Link href={TANG[truoc.tang].href} className="dtg-lat-o">
          <span className="dtg-lat-nhan">
            <ChevronLeft size={13} aria-hidden="true" /> Chương {truoc.so} — trước đó
          </span>
          <span className="dtg-lat-ten" style={{ color: TANG[truoc.tang].mau }}>
            {TANG[truoc.tang].nhan}
          </span>
        </Link>
      ) : (
        <span className="dtg-lat-o dtg-lat-trong">
          <span className="dtg-lat-nhan">Mở đầu quyển sách</span>
          <span className="dtg-lat-ten">Đây là chương thứ nhất</span>
        </span>
      )}

      {sau ? (
        <Link href={TANG[sau.tang].href} className="dtg-lat-o dtg-lat-sau">
          <span className="dtg-lat-nhan">
            Chương {sau.so} — đọc tiếp <ChevronRight size={13} aria-hidden="true" />
          </span>
          <span className="dtg-lat-ten" style={{ color: TANG[sau.tang].mau }}>
            {TANG[sau.tang].nhan}
          </span>
        </Link>
      ) : (
        <Link href="/gioi-thieu/tu-lieu" className="dtg-lat-o dtg-lat-sau">
          <span className="dtg-lat-nhan">
            Hết bốn chương <ChevronRight size={13} aria-hidden="true" />
          </span>
          <span className="dtg-lat-ten">Phụ lục — Tư liệu tham khảo</span>
        </Link>
      )}
    </nav>
  );
}
