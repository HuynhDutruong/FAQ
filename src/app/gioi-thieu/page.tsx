'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  MapPin,
  ChevronRight,
  ChevronLeft,
  X,
  Flame,
  Users,
  Heart,
  BookOpen,
  Compass,
  Award,
  Sparkles,
  ShieldCheck,
  Sun,
  Target,
  Clock,
  CheckCircle2,
  Church,
  Globe,
  Cross,
  Calendar,
  Layers,
  Info,
  Maximize2
} from 'lucide-react';

const BISHOPS = [
  {
    name: 'Đức Cha Giuse Trần Văn Thiện',
    role: 'Giám mục Tiên khởi (1960 – 1989)',
    motto: '“Phần rỗi linh hồn là luật tối thượng”',
    desc: 'Được Tòa Thánh bổ nhiệm làm Giám mục Tiên khởi ngày 24/11/1960 khi Giáo phận Mỹ Tho vừa được thành lập theo Tông hiến Venerabilium Nostrorum. Ngài có công lao to lớn trong việc đặt nền móng cơ sở hạ tầng, thành lập Tiểu Chủng viện Gioan XXIII, quy tụ linh mục đoàn và kiến thiết giáo phận trong những năm tháng đầu tiên đầy gian khó.',
    years: '1960 – 1989',
    image: '/images/bishop_1_tran_van_thien.jpg'
  },
  {
    name: 'Đức Cha Anrê Nguyễn Văn Nam',
    role: 'Giám mục Chính tòa thứ II (1989 – 1999)',
    motto: '“Vui mừng trong Thánh Giá Chúa Kitô”',
    desc: 'Coi sóc giáo phận trong giai đoạn chuyển mình của đất nước. Ngài hết lòng củng cố sự hiệp thông, chăm lo đời sống thiêng liêng cho bà con giáo dân và xây dựng tình bác ái huynh đệ khắp các giáo xứ vùng sông nước Tiền Giang, Long An và Đồng Tháp.',
    years: '1989 – 1999',
    image: '/images/bishop_nguyen_van_nam.jpg'
  },
  {
    name: 'Đức Hồng Y Gioan Baotixita Phạm Minh Mẫn',
    role: 'Giám mục Phó Giáo phận Mỹ Tho (1993 – 1998)',
    motto: '“Như Thầy yêu thương”',
    desc: 'Trong 5 năm phục vụ với cương vị Giám mục Phó, Ngài đồng hành đắc lực với Đức Cha Anrê trong công tác đào tạo chủng sinh, linh mục và xây dựng các chương trình mục vụ bác ái, trước khi được Tòa Thánh tấn phong Tổng Giám mục Tổng Giáo phận Sài Gòn và phong tước Hồng Y.',
    years: '1993 – 1998',
    image: '/images/bishop_3_pham_minh_man.jpg'
  },
  {
    name: 'Đức Tổng Giám Mục Phaolô Bùi Văn Đọc',
    role: 'Giám mục Chính tòa thứ III (1999 – 2013)',
    motto: '“Chúa là nguồn vui của con”',
    desc: 'Thời kỳ Ngài coi sóc đã ghi dấu những bước phát triển vượt bậc: xây dựng Tòa Giám mục mới, thiết lập Trung tâm Mục vụ khang trang, cử hành Lễ Cung Hiến Nhà thờ Chánh Tòa vào Năm Thánh 2000 và thúc đẩy mạnh mẽ công cuộc loan báo Tin Mừng tại vùng sâu Đồng Tháp Mười.',
    years: '1999 – 2013',
    image: '/images/bishop_4_bui_van_doc.jpg'
  },
  {
    name: 'Đức Cha Phêrô Nguyễn Văn Khảm',
    role: 'Giám mục Chính tòa đương nhiệm (2014 – nay)',
    motto: '“Hãy theo Thầy” (Sequere Me)',
    desc: 'Được Đức Giáo hoàng bổ nhiệm làm Giám mục Chính tòa Mỹ Tho vào ngày 26/07/2014. Với tâm hồn mục tử sâu sắc, kiến thức thần học uyên bác và tài thuyết giảng truyền cảm hứng, Ngài không ngừng định hướng đường hướng mục vụ phụng vụ, đào tạo đức tin giáo dân và chăm lo ơn gọi linh mục, tu sĩ toàn giáo phận.',
    years: '2014 – nay',
    image: '/images/bishop_5_nguyen_van_kham.jpg'
  }
];

const DIOCESES_3_PROVINCES = [
  {
    province: 'Giáo tỉnh Hà Nội (Bắc Bộ)',
    count: '11 Giáo phận',
    list: 'Tổng Giáo phận Hà Nội, Bắc Ninh, Bùi Chu, Hải Phòng, Hà Tĩnh, Hưng Hóa, Lạng Sơn & Cao Bằng, Phát Diệm, Thái Bình, Thanh Hóa, Vinh.'
  },
  {
    province: 'Giáo tỉnh Huế (Trung Bộ & Tây Nguyên)',
    count: '6 Giáo phận',
    list: 'Tổng Giáo phận Huế, Ban Mê Thuột, Đà Nẵng, Kon Tum, Nha Trang, Quy Nhơn.'
  },
  {
    province: 'Giáo tỉnh Sài Gòn (Nam Bộ)',
    count: '10 Giáo phận',
    list: 'Tổng Giáo phận Sài Gòn - TP.HCM, Bà Rịa, Cần Thơ, Đà Lạt, Long Xuyên, Mỹ Tho, Phan Thiết, Phú Cường, Vĩnh Long, Xuân Lộc.'
  }
];

const MILESTONES = [
  {
    year: 'Thế kỷ XVII - XIX',
    title: 'Gieo mầm hạt giống Tin Mừng',
    desc: 'Các vị thừa sai Dòng Phanxicô và Hội Thừa sai Paris (MEP) đặt chân đến vùng đất Mỹ Tho, lập họ đạo đầu tiên dâng kính Thánh Phanxicô Xaviê.'
  },
  {
    year: '1866',
    title: 'Nhà thờ Vĩnh Tường (Thánh Tâm)',
    desc: 'Đức Giám mục Miche cho xây dựng nhà thờ Vĩnh Tường theo lối kiến trúc Hy Lạp - Rôma thời Phục Hưng để đáp ứng nhu cầu tôn giáo ngày càng tăng của giáo dân.'
  },
  {
    year: '11/08/1906',
    title: 'Khởi công ngôi Thánh Đường hiện nay',
    desc: 'Linh mục Régnier (cố Gẫm) bắt đầu xây dựng ngôi nhà thờ thứ ba bên đại lộ Bourdais (nay là đường Hùng Vương) và hoàn thành vào năm 1910.'
  },
  {
    year: '24/11/1960',
    title: 'Thành lập Giáo phận Mỹ Tho',
    desc: 'Thánh Giáo hoàng Gioan XXIII ban hành Sắc chỉ Venerabilium Nostrorum thiết lập Hàng Giáo phẩm Việt Nam và Giáo phận Mỹ Tho, nâng nhà thờ lên hàng Nhà thờ Chánh Tòa với tước hiệu Đức Mẹ Vô Nhiễm Nguyên Tội.'
  },
  {
    year: 'Năm Thánh 2000',
    title: 'Cung Hiến Nhà thờ Chánh Tòa',
    desc: 'Đức Cha Phaolô Bùi Văn Đọc long trọng cử hành Lễ Cung Hiến Nhà thờ Chánh Tòa và nhận Lễ Đức Mẹ Hồn Xác Lên Trời (15/08) làm Bổn mạng thứ hai.'
  },
  {
    year: '2006',
    title: 'Đại trùng tu Kỷ niệm 100 năm',
    desc: 'Cha sở Giacôbê Hà Văn Xung tiến hành đại trùng tu: nới rộng cung thánh, lợp lại mái ngói, nâng cấp tháp chuông độc lập và thiết lập 14 Đàng Thánh Giá quanh khuôn viên.'
  }
];

interface RealPhoto {
  src: string;
  title: string;
  desc: string;
  category: 'vatican' | 'vietnam' | 'exterior' | 'interior' | 'liturgy' | 'community';
  categoryLabel: string;
  source: string;
}

const REAL_GALLERY_IMAGES: RealPhoto[] = [
  {
    src: '/images/vatican_st_peter.jpg',
    title: 'Đền Thờ & Quảng Trường Thánh Phêrô',
    desc: 'Trung tâm tối cao của Tòa Thánh Vatican và Giáo Hội Công Giáo hoàn vũ tại Rôma.',
    category: 'vatican',
    categoryLabel: 'Tòa Thánh Vatican',
    source: 'Vatican News'
  },
  {
    src: '/images/pope_leo_xiv.jpg',
    title: 'Đức Thánh Cha Lêô XIV',
    desc: 'Giáo hoàng thứ 267 của Giáo Hội Công Giáo Rôma (Tựu nhiệm: 08/05/2025).',
    category: 'vatican',
    categoryLabel: 'Tòa Thánh Vatican',
    source: 'Tư liệu Tòa Thánh'
  },
  {
    src: '/images/hdgmvn_banner.jpg',
    title: 'Huy Hiệu Hội Đồng Giám Mục Việt Nam',
    desc: 'HĐGMVN là cơ quan lãnh đạo mục vụ tối cao của 27 Giáo phận trên toàn lãnh thổ Việt Nam.',
    category: 'vietnam',
    categoryLabel: 'Giáo Hội Việt Nam',
    source: 'HĐGMVN (hdgmvietnam.com)'
  },
  {
    src: '/images/nhatho1.jpg',
    title: 'Mặt Tiền Nhà Thờ Chánh Tòa Mỹ Tho',
    desc: 'Kiến trúc Gothic - Rôma Phục Hưng uy nghiêm với tháp chuông cao vút tại trung tâm thành phố Mỹ Tho.',
    category: 'exterior',
    categoryLabel: 'Kiến Trúc Ngoại Thất',
    source: 'Tư liệu Giáo xứ Chánh Tòa'
  },
  {
    src: '/images/nhatho_thanh_le.jpg',
    title: 'Cung Thánh Trang Nghiêm',
    desc: 'Không gian cung thánh lộng lẫy, nơi cử hành các đại lễ phụng vụ của Giáo phận và Giáo xứ.',
    category: 'interior',
    categoryLabel: 'Nội Thất Thánh Đường',
    source: 'Tư liệu Giáo xứ Chánh Tòa'
  },
  {
    src: '/images/linh_muc_doan_my_tho.jpg',
    title: 'Linh Mục Đoàn Giáo Phận Mỹ Tho',
    desc: 'Quý Cha trong linh mục đoàn toàn giáo phận tề tựu đồng tế phụng vụ trong tinh thần hiệp thông huynh đệ.',
    category: 'community',
    categoryLabel: 'Sinh Hoạt Cộng Đoàn',
    source: 'Trang thông tin Giáo phận Mỹ Tho (giaophanmytho.net)'
  },
  {
    src: '/images/cong_doan_phung_vu.jpg',
    title: 'Cộng Đoàn Dân Chúa Hiệp Thông',
    desc: 'Đông đảo quý tu sĩ nam nữ, chủng sinh và bà con giáo dân tham dự thánh lễ tạ ơn Thiên Chúa.',
    category: 'community',
    categoryLabel: 'Sinh Hoạt Cộng Đoàn',
    source: 'Trang thông tin Giáo phận Mỹ Tho (giaophanmytho.net)'
  },
  {
    src: '/images/ruoc_le_cung_thanh.jpg',
    title: 'Nghi Thức Phụng Vụ Trang Nghiêm',
    desc: 'Nghi thức phụng vụ Lời Chúa và Thánh Thể diễn ra sốt sắng, trang nghiêm theo quy chuẩn Phụng vụ Tòa Thánh.',
    category: 'liturgy',
    categoryLabel: 'Phụng Vụ & Thánh Lễ',
    source: 'Trang thông tin Giáo phận Mỹ Tho (giaophanmytho.net)'
  },
  {
    src: '/images/ca_doan_phung_vu.jpg',
    title: 'Ca Đoàn Phụng Vụ Thánh Ca',
    desc: 'Ca đoàn cất cao lời ca tiếng hát du dương, thánh thót dâng lên Thiên Chúa và Mẹ Maria trong thánh lễ.',
    category: 'community',
    categoryLabel: 'Sinh Hoạt Cộng Đoàn',
    source: 'Trang thông tin Giáo phận Mỹ Tho (giaophanmytho.net)'
  }
];

const SECTIONS = [
  { id: 'vatican', label: 'Tòa Thánh Vatican', icon: Globe },
  { id: 'vietnam', label: 'Giáo Hội Việt Nam', icon: Cross },
  { id: 'diocese', label: 'Giáo Phận Mỹ Tho', icon: ShieldCheck },
  { id: 'bishops', label: '5 Đời Giám Mục', icon: Award },
  { id: 'cathedral', label: 'Chánh Tòa Mỹ Tho', icon: Church },
  { id: 'tntt', label: 'TNTT Việt Nam', icon: Flame },
  { id: 'gallery', label: 'Thư Viện Ảnh', icon: Layers }
];

export default function GioiThieuPage() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + REAL_GALLERY_IMAGES.length) % REAL_GALLERY_IMAGES.length);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % REAL_GALLERY_IMAGES.length);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg)',
        color: 'var(--color-dark)'
      }}
    >
      {/* ========================================================================= */}
      {/* 1. HERO HEADER */}
      {/* ========================================================================= */}
      <header
        style={{
          position: 'relative',
          backgroundImage:
            'linear-gradient(180deg, rgba(15, 8, 8, 0.82) 0%, rgba(45, 15, 15, 0.70) 50%, rgba(15, 8, 8, 0.92) 100%), url("/images/jesus_antique_banner.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 22%',
          color: '#FFFFFF',
          padding: '20px 14px 26px',
          borderBottom: '1px solid rgba(217, 119, 6, 0.35)',
          boxShadow: 'inset 0 -12px 28px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#FFFFFF',
                border: '1px solid rgba(253, 230, 138, 0.3)',
                backdropFilter: 'blur(6px)',
                textDecoration: 'none',
                flexShrink: 0
              }}
              title="Về Trang Chủ"
            >
              <ArrowLeft size={16} />
            </Link>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                color: '#FDE68A',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <Link href="/" style={{ color: '#FDE68A', textDecoration: 'none', opacity: 0.9 }}>
                Trang chủ
              </Link>
              <span>/</span>
              <span style={{ fontWeight: 700, color: '#FFFFFF' }}>Lược Sử &amp; Giới Thiệu</span>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: '#FDE68A',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '3px'
              }}
            >
              GIÁO HỘI HOÀN VŨ • VIỆT NAM • GIÁO PHẬN MỸ THO • TNTT
            </div>
            <h1
              style={{
                fontSize: 'clamp(1.25rem, 4.2vw, 1.85rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                margin: 0,
                color: '#FFFFFF',
                lineHeight: 1.25,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
              }}
            >
              Lược Sử Giáo Hội &amp; Chánh Tòa Mỹ Tho
            </h1>
            <p
              style={{
                margin: '6px 0 0',
                fontSize: '0.84rem',
                color: '#E2E8F0',
                lineHeight: 1.45,
                maxWidth: '760px',
                opacity: 0.95
              }}
            >
              Hành trình dòng lịch sử đức tin sống động từ Tòa Thánh Vatican, Giáo Hội Công Giáo Việt Nam, Giáo phận Mỹ Tho đến Ngôi Thánh Đường Mẹ Chánh Tòa Đức Mẹ Vô Nhiễm Nguyên Tội.
            </p>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. STICKY QUICK JUMP PILLS (SMOOTH HORIZONTAL SCROLL) */}
      {/* ========================================================================= */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backgroundColor: 'var(--color-card-bg)',
          borderBottom: '1px solid var(--color-border-subtle)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '8px 10px',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  color: 'var(--color-dark)',
                  border: '1px solid var(--color-border-subtle)',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={13} color="var(--color-red)" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CONTINUOUS INTERLEAVED EDITORIAL SECTIONS (ẢNH VÀ BÀI VIẾT ĐAN XEN NHAU) */}
      {/* ========================================================================= */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
          padding: '14px 12px 60px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {/* Quick Statistics Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '6px'
          }}
        >
          {[
            { label: 'Thành Lập GP', value: '1960', sub: 'Sắc chỉ Gioan XXIII' },
            { label: 'Địa Giới GP', value: '3 Tỉnh', sub: 'TG, LA, ĐT' },
            { label: 'Quy Mô GP', value: '6 Hạt', sub: '114+ Giáo xứ' },
            { label: 'Xây Chánh Tòa', value: '1906', sub: 'Hoàn thành 1910' },
            { label: 'Bổn Mạng', value: 'Vô Nhiễm', sub: '08/12 & 15/08' },
            { label: 'Tín Hữu Toàn Cầu', value: '> 1,4 Tỷ', sub: 'Hiệp thông Vatican' }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: '10px',
                padding: '8px 6px',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  color: '#B45309',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {item.label}
              </div>
              <div style={{ fontSize: '0.98rem', fontWeight: 900, color: 'var(--color-red)', margin: '1px 0' }}>
                {item.value}
              </div>
              <div
                style={{
                  fontSize: '0.62rem',
                  color: 'var(--color-text-subtle)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* PHẦN 1: TÒA THÁNH VATICAN & ĐỨC GIÁO HOÀNG */}
        {/* ========================================================================= */}
        <section
          id="vatican"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--color-border-subtle)',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            scrollMarginTop: '60px'
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', marginBottom: '4px' }}>
            TÒA THÁNH VATICAN &amp; GIÁO HỘI TOÀN CẦU
          </div>
          <h2 style={{ margin: '0 0 14px', fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
            1. Tòa Thánh Vatican, Đức Thánh Cha Lêô XIV &amp; Giáo Hội Toàn Cầu
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              alignItems: 'start'
            }}
          >
            {/* Ảnh Đức Thánh Cha Lêô XIV */}
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: '#0F172A',
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '300px', backgroundColor: '#0F172A' }}>
                <Image
                  src="/images/pope_leo_xiv.jpg"
                  alt="Đức Giáo Hoàng Lêô XIV"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: '10px 12px', backgroundColor: 'var(--color-card-bg)', borderTop: '1px solid var(--color-border-subtle)' }}>
                <div style={{ fontSize: '0.92rem', fontWeight: 900, color: 'var(--color-dark)' }}>
                  Đức Giáo Hoàng Lêô XIV (Leo PP. XIV)
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-text-subtle)', marginTop: '2px' }}>
                  Giáo hoàng thứ 267 của Giáo Hội Công Giáo Rôma (Tựu nhiệm: 08/05/2025)
                </div>
              </div>
            </div>

            {/* Bài viết đan xen */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', lineHeight: 1.65, color: 'var(--color-dark)' }}>
              <div>
                <strong>Tòa Thánh (Santa Sede / Sancta Sedes):</strong> Chủ thể quyền lực tối cao của Giáo Hội Công Giáo hoàn vũ, có trụ sở tại Quốc gia Thành Vatican theo Hiệp ước Latêranô (11/02/1929).
              </div>
              <div>
                <strong>Đức Thánh Cha Lêô XIV (Robert Francis Prevost, OSA):</strong> Sinh ngày 14/09/1955 tại Chicago (Hoa Kỳ), thuộc Dòng Thánh Augustinô (OSA). Ngài đắc cử Giám mục Rôma và vị Giáo hoàng thứ 267 tại <strong>Mật nghị Hồng Y ngày 8 tháng 5 năm 2025</strong> (kế vị Đức Giáo hoàng Phanxicô).
              </div>
              <div>
                <strong>Khẩu hiệu Tông Tòa:</strong> <em>“In illo uno unum”</em> (Trong Đấng duy nhất, chúng ta là một — trích bài suy niệm của Thánh Augustinô về Thánh Vịnh 127).
              </div>
              <div>
                <strong>Giáo Hội Toàn Cầu (Ecclesia Catholica):</strong> Do Chúa Giêsu Kitô thiết lập trên nền tảng các Thánh Tông Đồ, mang 4 đặc tính: <strong>Duy Nhất — Thánh Thiện — Công Giáo — Tông Truyền</strong>. Toàn cầu hiện có hơn <strong>1,4 tỷ tín hữu</strong> (~17.7% dân số thế giới) thuộc 24 Giáo Hội tự trị (1 Latinh + 23 Đông Phương) cùng hiệp thông trọn vẹn dưới quyền Đức Giáo Hoàng.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN 2: GIÁO HỘI VIỆT NAM & HĐGMVN */}
        {/* ========================================================================= */}
        <section
          id="vietnam"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--color-border-subtle)',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            scrollMarginTop: '60px'
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', marginBottom: '4px' }}>
            GIÁO HỘI CÔNG GIÁO VIỆT NAM
          </div>
          <h2 style={{ margin: '0 0 14px', fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
            2. Lịch Sử Đón Nhận Tin Mừng &amp; Hội Đồng Giám Mục Việt Nam (HĐGMVN)
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              alignItems: 'start'
            }}
          >
            {/* Huy hiệu HĐGMVN */}
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-card-bg)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '240px', padding: '12px' }}>
                <Image
                  src="/images/hdgmvn_banner.jpg"
                  alt="Hội Đồng Giám Mục Việt Nam"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain', padding: '8px' }}
                />
              </div>
              <div style={{ padding: '8px 12px', backgroundColor: 'var(--color-btn-subtle-bg)', fontSize: '0.76rem', color: 'var(--color-text-subtle)', borderTop: '1px solid var(--color-border-subtle)' }}>
                Huy hiệu Hội Đồng Giám Mục Việt Nam — Cơ quan lãnh đạo mục vụ tối cao của 27 Giáo phận toàn quốc.
              </div>
            </div>

            {/* Bài viết lịch sử */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', lineHeight: 1.65, color: 'var(--color-dark)' }}>
              <div>
                <strong>Gần 500 năm truyền giáo:</strong> Khởi đầu từ năm <strong>1533</strong> (thời vua Lê Trang Tông với giáo sĩ I-nê-khu), phát triển qua các dòng tu Dòng Tên (Cha Alexandre de Rhodes sáng tạo chữ Quốc ngữ), Hội Thừa Sai Paris (MEP), Dòng Đa Minh.
              </div>
              <div>
                <strong>Hàng Giáo Phẩm (24/11/1960):</strong> Thánh Giáo hoàng Gioan XXIII ban Tông hiến <em>Venerabilium Nostrorum</em> thiết lập Hàng Giáo phẩm Việt Nam với 3 Giáo tỉnh: <strong>Hà Nội, Huế và Sài Gòn</strong>.
              </div>
              <div>
                <strong>117 Thánh Tử Đạo Việt Nam:</strong> Mảnh đất quê hương được thánh hóa bởi máu đào của các chứng nhân đức tin anh dũng, được Thánh Giáo hoàng Gioan Phaolô II tuyên thánh năm 1988.
              </div>
              <div>
                <strong>HĐGMVN Hiện Nay:</strong> Thành lập năm 1980 với định hướng: <em>“Sống Phúc Âm giữa lòng dân tộc để phục vụ hạnh phúc của đồng bào”</em>. Gồm 27 Giáo phận, hơn 7 triệu giáo dân, hơn 6.000 linh mục, 30.000 tu sĩ.
              </div>
            </div>
          </div>

          {/* Bảng 3 Giáo Tỉnh */}
          <div
            style={{
              marginTop: '14px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '10px'
            }}
          >
            {DIOCESES_3_PROVINCES.map((p, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  borderRadius: '10px',
                  padding: '12px',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                <div style={{ fontSize: '0.88rem', fontWeight: 900, color: 'var(--color-red)', marginBottom: '2px' }}>
                  {p.province}
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B45309', marginBottom: '4px' }}>
                  Quy mô: {p.count}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-dark)', lineHeight: 1.45 }}>
                  {p.list}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN 3: LƯỢC SỬ GIÁO PHẬN MỸ THO */}
        {/* ========================================================================= */}
        <section
          id="diocese"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--color-border-subtle)',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            scrollMarginTop: '60px'
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', marginBottom: '4px' }}>
            GIÁO PHẬN MỸ THO
          </div>
          <h2 style={{ margin: '0 0 14px', fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
            3. Lược Sử Hình Thành Giáo Phận Mỹ Tho
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              alignItems: 'start'
            }}
          >
            {/* Bài viết */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', lineHeight: 1.7, color: 'var(--color-dark)' }}>
              <p style={{ margin: 0 }}>
                <strong>Giáo phận Mỹ Tho</strong> (tiếng Latinh: <em>Dioecesis Mythoensis</em>) là một trong những giáo phận giàu truyền thống đức tin tại cửa ngõ miền Tây Nam Bộ, trực thuộc Giáo tỉnh Sài Gòn.
              </p>
              <p style={{ margin: 0 }}>
                Từ thế kỷ XVII và XVIII, hạt giống đức tin Kitô giáo đã được các vị linh mục thừa sai dòng Phanxicô và Hội Thừa sai Paris (MEP) gieo rắc dọc theo sông Tiền Giang. Các cộng đoàn đức tin tiên khởi như Chợ Quán, Ba Giồng, Mỹ Tho, Tân An, Cái Mơn đã hình thành và kiên cường vượt qua những thời kỳ bách hại cam go.
              </p>
              <p style={{ margin: 0 }}>
                Ngày <strong>24 tháng 11 năm 1960</strong>, Thánh Giáo hoàng Gioan XXIII ban hành Sắc chỉ lịch sử <em>Venerabilium Nostrorum</em>, chính thức thiết lập Hàng Giáo Phẩm Công Giáo Việt Nam và phân chia các giáo phận mới, trong đó Giáo phận Mỹ Tho được tách ra từ Giáo phận Sài Gòn.
              </p>
              <p style={{ margin: 0 }}>
                Hiện nay, địa bàn Giáo phận Mỹ Tho bao gồm trọn vẹn tỉnh <strong>Tiền Giang</strong>, tỉnh <strong>Long An</strong> và 2/3 diện tích tỉnh <strong>Đồng Tháp</strong> (phía Bắc sông Tiền), được phân bổ thành <strong>6 Giáo hạt</strong> với hơn 114 giáo xứ và khoảng 140.000 tín hữu.
              </p>
            </div>

            {/* Ảnh Linh mục đoàn & Đức Cha */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: '#0F172A'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                  <Image
                    src="/images/linh_muc_doan_my_tho.jpg"
                    alt="Linh Mục Đoàn Giáo Phận Mỹ Tho"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '8px 12px', backgroundColor: 'var(--color-btn-subtle-bg)', fontSize: '0.74rem', color: 'var(--color-text-subtle)' }}>
                  Linh mục đoàn Giáo phận Mỹ Tho đồng tế phụng vụ hiệp thông huynh đệ.
                </div>
              </div>

              {/* 6 Giáo Hạt List */}
              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--color-red)' }}>
                  6 Giáo Hạt Thuộc Giáo Phận Mỹ Tho:
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-dark)', lineHeight: 1.45 }}>
                  • <strong>Hạt Mỹ Tho:</strong> TP. Mỹ Tho, Chợ Gạo, Gò Công<br />
                  • <strong>Hạt Cái Bè:</strong> Cái Bè, Cai Lậy, Châu Thành<br />
                  • <strong>Hạt Tân An:</strong> TP. Tân An, Châu Thành, Tân Trụ (Long An)<br />
                  • <strong>Hạt Đức Hòa:</strong> Đức Hòa, Bến Lức, Cần Đước, Cần Giuộc<br />
                  • <strong>Hạt Cao Lãnh:</strong> TP. Cao Lãnh, Tháp Mười (Đồng Tháp)<br />
                  • <strong>Hạt Cù Lao Tây:</strong> Thanh Bình, Tam Nông, Hồng Ngự
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN 4: 5 ĐỜI GIÁM MỤC GIÁO PHẬN MỸ THO */}
        {/* ========================================================================= */}
        <section
          id="bishops"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--color-border-subtle)',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            scrollMarginTop: '60px'
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', marginBottom: '4px' }}>
            CÁC VỊ CHĂN DẮT GIÁO PHẬN
          </div>
          <h2 style={{ margin: '0 0 14px', fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
            4. Các Đời Giám Mục Giáo Phận Mỹ Tho (1960 – Nay)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {BISHOPS.map((b, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border-subtle)',
                  padding: '12px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '90px',
                    height: '118px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    backgroundColor: '#0F172A',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                  }}
                >
                  <Image
                    src={b.image}
                    alt={b.name}
                    fill
                    sizes="90px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-red)', textTransform: 'uppercase' }}>
                    {b.role}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 900, color: 'var(--color-dark)' }}>
                    {b.name}
                  </h3>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#B45309', fontStyle: 'italic', marginBottom: '2px' }}>
                    Khẩu hiệu: {b.motto}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-dark)', lineHeight: 1.45 }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN 5: NHÀ THỜ CHÁNH TÒA MỸ THO */}
        {/* ========================================================================= */}
        <section
          id="cathedral"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--color-border-subtle)',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            scrollMarginTop: '60px'
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', marginBottom: '4px' }}>
            NGÔI THÁNH ĐƯỜNG MẸ CỦA GIÁO PHẬN
          </div>
          <h2 style={{ margin: '0 0 14px', fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
            5. Nhà Thờ Chánh Tòa Đức Mẹ Vô Nhiễm Nguyên Tội
          </h2>

          {/* Ảnh lớn mặt tiền thánh đường */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(200px, 40vw, 320px)',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '14px',
              backgroundColor: '#0F172A'
            }}
          >
            <Image
              src="/images/nhatho1.jpg"
              alt="Nhà Thờ Chánh Tòa Mỹ Tho"
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 60%)'
              }}
            />
            <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px', color: '#FFFFFF' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#FDE68A', textTransform: 'uppercase' }}>
                TRUNG TÂM PHỤNG VỤ &amp; HÀNH HƯƠNG
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>
                Nhà Thờ Chánh Tòa Mỹ Tho (Khởi công 1906 – Hoàn thành 1910)
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              alignItems: 'start'
            }}
          >
            {/* Bài viết */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', lineHeight: 1.7, color: 'var(--color-dark)' }}>
              <p style={{ margin: 0 }}>
                <strong>Vị trí tọa lạc:</strong> Số 32 đường Hùng Vương, phường 7, thành phố Mỹ Tho, tỉnh Tiền Giang. Đây là ngôi thánh đường thứ ba của họ đạo Mỹ Tho, do Linh mục Régnier (cố Gẫm) khởi công xây dựng vào ngày <strong>11 tháng 8 năm 1906</strong> và hoàn thành vào năm 1910.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Kiến trúc nghệ thuật:</strong> Xây dựng theo phong cách kiến trúc Gothic - Rôma Phục Hưng với chiều dài 53m, rộng hơn 17m và tháp chuông cao 24m. Cung thánh được thiết kế trang nghiêm với hàng cột trụ vững chãi, hệ thống cửa vòm cuốn và các bức tranh kính màu tái hiện cuộc đời Chúa Cứu Thế.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Bổn mạng thánh đường:</strong> Lễ Đức Mẹ Vô Nhiễm Nguyên Tội (kính ngày 08/12) và Lễ Đức Mẹ Hồn Xác Lên Trời (kính ngày 15/08).
              </p>
            </div>

            {/* Ảnh cung thánh đan xen */}
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: '#0F172A'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <Image
                  src="/images/nhatho_thanh_le.jpg"
                  alt="Cung Thánh Nhà Thờ Chánh Tòa"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '8px 12px', backgroundColor: 'var(--color-btn-subtle-bg)', fontSize: '0.74rem', color: 'var(--color-text-subtle)' }}>
                Không gian cung thánh lộng lẫy trong các đại lễ phụng vụ long trọng.
              </div>
            </div>
          </div>

          {/* Dòng thời gian mốc son */}
          <div style={{ marginTop: '16px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '0.96rem', fontWeight: 900, color: 'var(--color-red)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} />
              <span>Dòng Thời Gian Các Mốc Son Lịch Sử</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MILESTONES.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--color-btn-subtle-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: 900, color: 'var(--color-red)' }}>
                      {m.year}
                    </span>
                    <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                      {m.title}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-text-subtle)', lineHeight: 1.45 }}>
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN 6: PHONG TRÀO THIẾU NHI THÁNH THỂ (TNTT) */}
        {/* ========================================================================= */}
        <section
          id="tntt"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--color-border-subtle)',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            scrollMarginTop: '60px'
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', marginBottom: '4px' }}>
            PHONG TRÀO THIẾU NHI THÁNH THỂ VIỆT NAM
          </div>
          <h2 style={{ margin: '0 0 14px', fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
            6. Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Chánh Tòa Mỹ Tho
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              alignItems: 'start'
            }}
          >
            {/* Bài viết TNTT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', lineHeight: 1.7, color: 'var(--color-dark)' }}>
              <p style={{ margin: 0 }}>
                Phong trào <strong>Thiếu Nhi Thánh Thể (TNTT)</strong> là đoàn thể Công giáo tiến hành đào luyện thiếu nhi về phương diện tự nhiên và siêu nhiên, lấy <strong>Chúa Giêsu Thánh Thể</strong> làm Trung Tâm, nguồn sống và lý tưởng để hướng dẫn các em nên người Kitô hữu hoàn thiện.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Tôn chỉ hoạt động:</strong> Sống Lời Chúa và kết hợp mật thiết với Chúa Giêsu Thánh Thể qua 4 khẩu hiệu cốt lõi: <strong>Cầu Nguyện – Rước Lễ – Hy Sinh – Làm Tông Đồ</strong>.
              </p>

              {/* 4 Khẩu Hiệu Box */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '6px',
                  marginTop: '4px'
                }}
              >
                {[
                  { label: 'CẦU NGUYỆN', desc: 'Gắn bó với Chúa qua lời kinh' },
                  { label: 'RƯỚC LỄ', desc: 'Kết hợp cùng Chúa Giêsu Thánh Thể' },
                  { label: 'HY SINH', desc: 'Vượt qua tính ích kỷ vì tha nhân' },
                  { label: 'LÀM TÔNG ĐỒ', desc: 'Loan truyền Tin Mừng bằng đời sống' }
                ].map((k, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(183, 28, 28, 0.08)',
                      border: '1px solid rgba(183, 28, 28, 0.2)'
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', fontWeight: 900, color: 'var(--color-red)' }}>
                      {idx + 1}. {k.label}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--color-dark)', marginTop: '2px', lineHeight: 1.3 }}>
                      {k.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Ngành Của Phong Trào */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                {
                  name: 'Ngành Ấu Nhi (4 – 9 tuổi)',
                  motto: 'Vâng Lời',
                  color: '#16A34A',
                  bg: 'rgba(22, 163, 74, 0.08)',
                  border: 'rgba(22, 163, 74, 0.25)',
                  scarf: 'Khăn Xanh Lá Mạ',
                  desc: 'Noi gương Chúa Giêsu thời thơ ấu tại Nadarét, luôn ngoan ngoãn và vâng lời cha mẹ.'
                },
                {
                  name: 'Ngành Thiếu Nhi (10 – 12 tuổi)',
                  motto: 'Hy Sinh',
                  color: '#0284C7',
                  bg: 'rgba(2, 132, 199, 0.08)',
                  border: 'rgba(2, 132, 199, 0.25)',
                  scarf: 'Khăn Xanh Biển',
                  desc: 'Học tập sự hy sinh quên mình của Chúa Giêsu, tích cực tham gia việc tông đồ.'
                },
                {
                  name: 'Ngành Nghĩa Sĩ (13 – 15 tuổi)',
                  motto: 'Chinh Phục',
                  color: '#D97706',
                  bg: 'rgba(217, 119, 6, 0.08)',
                  border: 'rgba(217, 119, 6, 0.25)',
                  scarf: 'Khăn Vàng',
                  desc: 'Chinh phục bản thân, trau dồi tri thức và đức tin để trở thành chứng nhân Tin Mừng.'
                },
                {
                  name: 'Ngành Hiệp Sĩ (16 – 18 tuổi)',
                  motto: 'Dấn Thân',
                  color: '#78350F',
                  bg: 'rgba(120, 53, 15, 0.08)',
                  border: 'rgba(120, 53, 15, 0.25)',
                  scarf: 'Khăn Nâu',
                  desc: 'Dấn thân vào đời, phục vụ Giáo xứ, cộng đoàn và xã hội trong tinh thần bác ái.'
                },
                {
                  name: 'Huynh Trưởng & Dự Trưởng',
                  motto: 'Phụng Sự',
                  color: '#B71C1C',
                  bg: 'rgba(183, 28, 28, 0.08)',
                  border: 'rgba(183, 28, 28, 0.25)',
                  scarf: 'Khăn Đỏ viền Vàng',
                  desc: 'Những người anh chị tận tụy đồng hành, dẫn dắt các em thiếu nhi đến với Thánh Thể.'
                }
              ].map((ng, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    backgroundColor: ng.bg,
                    border: `1px solid ${ng.border}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 900, color: ng.color }}>
                      {ng.name}
                    </span>
                    <span
                      style={{
                        fontSize: '0.66rem',
                        fontWeight: 800,
                        padding: '1px 5px',
                        borderRadius: '4px',
                        backgroundColor: ng.color,
                        color: '#FFFFFF'
                      }}
                    >
                      {ng.motto}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                    Khăn: {ng.scarf}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--color-dark)', lineHeight: 1.35 }}>
                    {ng.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN 7: THƯ VIỆN ẢNH THỰC TẾ (REAL GALLERY) */}
        {/* ========================================================================= */}
        <section
          id="gallery"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--color-border-subtle)',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            scrollMarginTop: '60px'
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', marginBottom: '4px' }}>
            TƯ LIỆU HÌNH ẢNH
          </div>
          <h2 style={{ margin: '0 0 14px', fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
            7. Thư Viện Hình Ảnh Lịch Sử &amp; Phụng Vụ
          </h2>

          {/* Gallery Grid (2 columns on mobile, 3 on desktop) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '8px'
            }}
          >
            {REAL_GALLERY_IMAGES.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhotoIndex(idx)}
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: '#0F172A',
                  aspectRatio: '4/3',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 300px"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '6px',
                    right: '6px',
                    color: '#FFFFFF'
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {photo.title}
                  </div>
                  <div style={{ fontSize: '0.62rem', color: '#FDE68A', opacity: 0.9 }}>
                    {photo.categoryLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Subtle Non-clickable Footer Note */}
        <div
          style={{
            marginTop: '20px',
            padding: '12px 0 18px',
            textAlign: 'center',
            fontSize: '0.72rem',
            fontStyle: 'italic',
            color: 'var(--color-text-subtle)',
            opacity: 0.7,
            lineHeight: 1.5,
            borderTop: '1px dashed var(--color-border-subtle)'
          }}
        >
          * Tài liệu lược sử được biên soạn từ các nguồn chính thống: Tòa Giám Mục Mỹ Tho, Hội Đồng Giám Mục Việt Nam &amp; Tư liệu Tòa Thánh Vatican.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. PHOTO LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {selectedPhotoIndex !== null && REAL_GALLERY_IMAGES[selectedPhotoIndex] && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px'
          }}
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '720px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhotoIndex(null)}
              style={{
                position: 'absolute',
                top: '-36px',
                right: '0',
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={24} />
            </button>

            {/* Photo Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 'min(65vh, 480px)',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#0F172A'
              }}
            >
              <Image
                src={REAL_GALLERY_IMAGES[selectedPhotoIndex].src}
                alt={REAL_GALLERY_IMAGES[selectedPhotoIndex].title}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                style={{ objectFit: 'contain' }}
              />

              {/* Prev / Next controls */}
              <button
                type="button"
                onClick={handlePrevPhoto}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={handleNextPhoto}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Caption */}
            <div
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.95)',
                borderRadius: '10px',
                padding: '12px 14px',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div style={{ fontSize: '0.96rem', fontWeight: 900, color: '#FDE68A', marginBottom: '2px' }}>
                {REAL_GALLERY_IMAGES[selectedPhotoIndex].title}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#E2E8F0', lineHeight: 1.4 }}>
                {REAL_GALLERY_IMAGES[selectedPhotoIndex].desc}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '4px', fontStyle: 'italic' }}>
                Nguồn: {REAL_GALLERY_IMAGES[selectedPhotoIndex].source}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
