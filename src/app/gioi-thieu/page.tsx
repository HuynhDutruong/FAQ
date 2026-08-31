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
    so: 'Chương I',
    ten: 'Giáo Hội Hoàn Vũ',
    mo: 'Hai ngàn năm từ bờ hồ Galilê đến Đức Lêô XIV — và đoạn cuối chương kể Tin Mừng đã đến Việt Nam bằng đường nào, từ mốc 1533 cho tới tông sắc năm 1659 lập hai Phủ Doãn Tông Toà.',
    anh: '/images/vatican_st_peter.jpg',
    diem: ['267 vị Giáo hoàng', 'Mốc 1533 và những tranh cãi quanh nó', 'Tông sắc 1659 mở đường xuống Nam Kỳ']
  },
  {
    href: '/gioi-thieu/giao-phan',
    so: 'Chương II',
    ten: 'Giáo Phận Mỹ Tho',
    mo: 'Bắt đầu chỉ bốn năm sau tông sắc ấy, ở những ngôi mộ khắc thập giá tại Ba Giồng — qua máu các vị tử đạo, tới sắc chỉ khai sinh giáo phận năm 1960.',
    anh: '/images/gpmt_linh_muc_doan_1961.jpg',
    diem: ['Mộ cổ Ba Giồng 1663 – 1664', '27 vị tử đạo và Cha Phêrô Nguyễn Văn Lựu', '9 Đấng Bản Quyền, 5 đời Giám mục']
  },
  {
    href: '/gioi-thieu/giao-xu',
    so: 'Chương III',
    ten: 'Giáo Xứ Chánh Tòa',
    mo: 'Mở ra một tháng sau pháp trường của Chương II, cách mười hai cây số: những người sống sót dựng một họ đạo trong ngôi chùa bỏ hoang bên chợ, rồi ba lần dựng nhà thờ.',
    anh: '/images/lichsu_dai_lo_hung_vuong_xua.jpg',
    diem: ['Ba ngôi nhà thờ 1861 – 1910', 'Niên biểu các đời cha sở', 'Ảnh tư liệu & bản khắc 1877']
  },
  {
    href: '/gioi-thieu/xu-doan',
    so: 'Chương IV',
    ten: 'Xứ Đoàn TNTT',
    mo: 'Chương cuối. Vì sao đoàn thiếu nhi tái lập năm 2005 lại mang tên các vị đã chết năm 1861, và vì sao một phong trào Thánh Thể cho trẻ em chỉ có thể ra đời sau năm 1910.',
    anh: '/images/tntt2005_doan_sinh_trong_nha_tho.jpg',
    diem: ['Tôn chỉ & 4 phương thế', 'Hệ thống khăn quàng', '20 năm tái lập 2005 – 2025']
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
        <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-subtle)', margin: '0 0 12px', textAlign: 'justify', maxWidth: '780px' }}>
          Bốn chương dưới đây là <strong style={{ color: 'var(--color-dark)' }}>một câu chuyện duy nhất kể ở bốn độ
          cao</strong>, không phải bốn bài rời. Cùng một năm 1861 xuất hiện ở Chương II như ngày một linh mục bị chém, và
          ở Chương III như ngày một họ đạo ra đời từ chính đám người chạy loạn ấy. Cùng một lễ tôn phong năm 1988 ở
          Chương I trở thành Bổn mạng của giáo phận ở Chương II, rồi thành tên của một xứ đoàn thiếu nhi ở Chương IV.
          Cùng một năm 1910 vừa là năm ngôi thánh đường hoàn thành, vừa là năm Toà Thánh cho phép trẻ em rước lễ sớm —
          điều kiện để bảy mươi năm sau có một Phong trào Thiếu Nhi Thánh Thể.
        </p>
        <p style={{ fontSize: '0.86rem', lineHeight: 1.75, color: 'var(--color-subtle)', margin: '0 0 24px', fontStyle: 'italic', maxWidth: '780px' }}>
          Đọc theo thứ tự Chương I đến Chương IV thì thấy được cả dòng chảy; đọc riêng một chương thì vẫn trọn vẹn. Mỗi
          chương đều dẫn ngược về những chương kia ở đúng chỗ hai câu chuyện gặp nhau.
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
                <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-subtle)' }}>{g.so}</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-red)', marginTop: '-4px' }}>{g.ten}</div>
                <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--color-subtle)', textAlign: 'justify', flex: 1 }}>
                  {g.mo}
                </p>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', lineHeight: 1.7, color: 'var(--color-dark)' }}>
                  {g.diem.map((d) => <li key={d}>{d}</li>)}
                </ul>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-red)', marginTop: '2px' }}>
                  Đọc chương này <ChevronRight size={15} />
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
