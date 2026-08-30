'use client';

/**
 * Trang cổng của bản khảo cứu lịch sử.
 *
 * Bản gốc dồn khoảng 17.500 chữ vào một địa chỉ: Google không biết xếp trang
 * vào đâu, và ai chỉ muốn tra một cha sở cũng phải tải hết. Nay tách thành bốn
 * gian riêng; trang này chỉ giới thiệu và dẫn đường.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Globe, ChevronRight } from 'lucide-react';

const GIAN = [
  {
    href: '/gioi-thieu/giao-hoi',
    ten: 'Giáo Hội Hoàn Vũ',
    mo: 'Tòa Thánh Vatican, Đức Thánh Cha Lêô XIV và biên niên sử 267 vị Giáo hoàng từ Thánh Phêrô đến nay.',
    anh: '/images/vatican_st_peter.jpg',
    diem: ['Thành quốc Vatican', 'Đức Thánh Cha Lêô XIV', '267 vị Giáo hoàng']
  },
  {
    href: '/gioi-thieu/giao-phan',
    ten: 'Giáo Phận Mỹ Tho',
    mo: 'Từ thời Địa phận Tây Đàng Trong với chín Đấng Bản Quyền, qua ngày tách khỏi Sài Gòn năm 1960, đến năm đời Giám mục hôm nay.',
    anh: '/images/gpmt_linh_muc_doan_1961.jpg',
    diem: ['9 Đấng Bản Quyền 1844 – 1960', 'Sắc chỉ khai sinh giáo phận', '5 đời Giám mục Chính tòa']
  },
  {
    href: '/gioi-thieu/giao-xu',
    ten: 'Giáo Xứ Chánh Tòa',
    mo: 'Lịch sử họ đạo từ năm 1861, ba lần dựng nhà thờ, niên biểu các đời linh mục chánh sở và kho ảnh tư liệu qua các thời kỳ.',
    anh: '/images/lichsu_dai_lo_hung_vuong_xua.jpg',
    diem: ['Ba ngôi nhà thờ 1861 – 1910', 'Niên biểu 13 đời cha sở', 'Ảnh tư liệu & bản khắc 1877']
  },
  {
    href: '/gioi-thieu/xu-doan',
    ten: 'Xứ Đoàn TNTT',
    mo: 'Bản chất và tôn chỉ Phong trào Thiếu Nhi Thánh Thể, hệ thống khăn quàng, mười đời cha tuyên uý và ngày tái lập năm 2005.',
    anh: '/images/tntt2005_doan_sinh_trong_nha_tho.jpg',
    diem: ['Tôn chỉ & 4 phương thế', 'Hệ thống khăn quàng', '10 đời Cha Tuyên Uý']
  }
];

export default function TrangCong() {
  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--color-dark)', minHeight: '100vh', paddingBottom: '80px' }}>
      <div style={{ borderBottom: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-card-bg)', padding: '12px 20px' }}>
        <div style={{ maxWidth: '1220px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontSize: '0.82rem', color: 'var(--color-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href="/" style={{ color: 'var(--color-red)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ArrowLeft size={14} /> Trang Chủ
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--color-dark)', fontWeight: 700 }}>Bản Nghiên Cứu Lịch Sử</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
            <Globe size={14} color="var(--color-red)" />
            <span>Bản nghiên cứu lịch sử</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1220px', margin: '0 auto', padding: '26px 16px 0' }}>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, fontFamily: 'serif', margin: '0 0 10px', lineHeight: 1.2, color: 'var(--color-dark)' }}>
          Giáo Xứ Chánh Tòa Mỹ Tho &amp; Xứ Đoàn Các Thánh Tử Đạo Việt Nam
        </h1>
        <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-subtle)', margin: '0 0 10px', textAlign: 'justify', maxWidth: '780px' }}>
          Một bản khảo cứu lịch sử có dẫn nguồn, không phải bài giới thiệu. Mỗi mốc đều truy về hồ sơ gốc: văn khố Hội
          Thừa Sai Paris, tuần báo <em>Les Missions Catholiques</em> tại Thư viện Quốc gia Pháp, Công báo Toà Thánh, và
          tài liệu của Giáo phận Mỹ Tho. Chỗ nào các nguồn mâu thuẫn thì ghi rõ là mâu thuẫn; chỗ nào chưa tra được thì
          ghi <em>chưa cập nhật</em> thay vì suy đoán.
        </p>
        <p style={{ fontSize: '0.86rem', lineHeight: 1.75, color: 'var(--color-subtle)', margin: '0 0 24px', fontStyle: 'italic', maxWidth: '780px' }}>
          Bản khảo cứu chia làm bốn gian. Chọn một gian để bắt đầu.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '26px'
          }}
        >
          {GIAN.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              style={{
                display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit',
                border: '1px solid var(--color-border-subtle)', borderRadius: '12px', overflow: 'hidden',
                backgroundColor: 'var(--color-card-bg)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', backgroundColor: 'rgba(153,27,27,0.05)' }}>
                <Image
                  src={g.anh}
                  alt={g.ten}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1000px) 46vw, 290px"
                  style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
                />
              </div>
              <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-red)' }}>{g.ten}</div>
                <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--color-subtle)', textAlign: 'justify', flex: 1 }}>
                  {g.mo}
                </p>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', lineHeight: 1.7, color: 'var(--color-dark)' }}>
                  {g.diem.map((d) => <li key={d}>{d}</li>)}
                </ul>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-red)', marginTop: '2px' }}>
                  Xem gian này <ChevronRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ border: '1px solid var(--color-border-subtle)', borderRadius: '12px', padding: '14px 16px', backgroundColor: 'var(--color-card-bg)' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '6px' }}>
            Tư Liệu Tham Khảo
          </div>
          <p style={{ margin: '0 0 8px', fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--color-subtle)', textAlign: 'justify' }}>
            Toàn bộ nguồn của bản khảo cứu, kèm mã hồ sơ lưu trữ để mở lại đúng trang gốc — và cả những nơi đã tìm mà
            không thấy, ghi lại để người sau khỏi mất công tìm lại.
          </p>
          <Link href="/gioi-thieu/tu-lieu" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-red)', textDecoration: 'none' }}>
            Mở trang tư liệu <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
