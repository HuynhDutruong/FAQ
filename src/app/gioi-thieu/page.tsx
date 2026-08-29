'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  MapPin,
  Church,
  Calendar,
  Layers,
  BookOpen,
  Users,
  Info,
  Maximize2,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Quote,
  ShieldCheck,
  Search,
  Globe,
  Award,
  Clock,
  Cross,
  Sparkles,
  Heart,
  Flame,
  CheckCircle2,
  X,
  Crown
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface BishopRecord {
  name: string;
  role: string;
  motto: string;
  period: string;
  desc: string;
  image: string;
}

const BISHOPS_DATA: BishopRecord[] = [
  {
    name: 'Đức Cha Giuse Trần Văn Thiện',
    role: 'Giám mục Tiên khởi Giáo phận Mỹ Tho',
    motto: '“Phần rỗi linh hồn là luật tối thượng” (Salus Animarum Suprema Lex)',
    period: '1960 – 1989',
    desc: 'Được Đức Thánh Cha Gioan XXIII bổ nhiệm làm Giám mục Tiên khởi ngày 24/11/1960 khi Giáo phận Mỹ Tho vừa được thành lập theo Tông hiến Venerabilium Nostrorum. Ngài có công lao to lớn trong việc đặt nền móng cơ sở hạ tầng, thành lập Tiểu Chủng viện Gioan XXIII, quy tụ linh mục đoàn và kiến thiết giáo phận trong những năm tháng đầu tiên đầy gian khó.',
    image: '/images/bishop_1_tran_van_thien.jpg'
  },
  {
    name: 'Đức Cha Anrê Nguyễn Văn Nam',
    role: 'Giám mục Chính tòa thứ II Giáo phận Mỹ Tho',
    motto: '“Vui mừng trong Thánh Giá Chúa Kitô” (Crux Spes Unica)',
    period: '1989 – 1999',
    desc: 'Coi sóc giáo phận trong giai đoạn chuyển mình của đất nước. Ngài hết lòng củng cố sự hiệp thông, chăm lo đời sống thiêng liêng cho bà con giáo dân và xây dựng tình bác ái huynh đệ khắp các giáo xứ vùng sông nước Tiền Giang, Long An và Đồng Tháp.',
    image: '/images/bishop_nguyen_van_nam.jpg'
  },
  {
    name: 'Đức Hồng Y Gioan Baotixita Phạm Minh Mẫn',
    role: 'Giám mục Phó Giáo phận Mỹ Tho (1993 – 1998)',
    motto: '“Như Thầy yêu thương” (Sicut Dilexi Vos)',
    period: '1993 – 1998',
    desc: 'Trong 5 năm phục vụ với cương vị Giám mục Phó, Ngài đồng hành đắc lực với Đức Cha Anrê trong công tác đào tạo chủng sinh, linh mục và xây dựng các chương trình mục vụ bác ái, trước khi được Tòa Thánh tấn phong Tổng Giám mục Tổng Giáo phận Sài Gòn và thăng tước Hồng Y.',
    image: '/images/bishop_3_pham_minh_man.jpg'
  },
  {
    name: 'Đức Tổng Giám Mục Phaolô Bùi Văn Đọc',
    role: 'Giám mục Chính tòa thứ III Giáo phận Mỹ Tho',
    motto: '“Chúa là nguồn vui của con” (Dominus Lux Mea)',
    period: '1999 – 2013',
    desc: 'Thời kỳ Ngài coi sóc ghi dấu những bước phát triển vượt bậc: xây dựng Tòa Giám mục mới, thiết lập Trung tâm Mục vụ khang trang, long trọng cử hành Lễ Cung Hiến Nhà thờ Chánh Tòa vào Năm Thánh 2000 và thúc đẩy mạnh mẽ công cuộc loan báo Tin Mừng tại vùng sâu Đồng Tháp Mười.',
    image: '/images/bishop_4_bui_van_doc.jpg'
  },
  {
    name: 'Đức Cha Phêrô Nguyễn Văn Khảm',
    role: 'Giám mục Chính tòa đương nhiệm (từ 2014)',
    motto: '“Hãy theo Thầy” (Sequere Me)',
    period: '2014 – nay',
    desc: 'Được Đức Giáo hoàng Phanxicô bổ nhiệm làm Giám mục Chính tòa Mỹ Tho vào ngày 26/07/2014. Với tâm hồn mục tử sâu sắc, kiến thức thần học uyên bác và tài thuyết giảng truyền cảm hứng, Ngài không ngừng định hướng đường hướng mục vụ phụng vụ, đào tạo đức tin giáo dân và chăm lo ơn gọi linh mục, tu sĩ toàn giáo phận.',
    image: '/images/bishop_5_nguyen_van_kham.jpg'
  }
];

const TNTT_RANKS = [
  {
    id: 'au-nhi',
    name: 'Khăn Ngành Ấu Nhi (Chiên Con)',
    age: '4 – 9 tuổi',
    motto: 'Vâng Lời',
    colorName: 'Xanh Lá Mạ (Viền Vàng)',
    mainColor: '#16A34A',
    borderColor: '#FBBF24',
    symbolism: 'Màu của chồi non xanh biếc, tượng trưng cho tâm hồn đơn sơ, trong trắng, luôn biết lắng nghe và vâng phục cha mẹ như Chúa Giêsu thời thơ ấu tại Nadarét.'
  },
  {
    id: 'thieu-nhi',
    name: 'Khăn Ngành Thiếu Nhi',
    age: '10 – 12 tuổi',
    motto: 'Hy Sinh',
    colorName: 'Xanh Dương Đậm (Viền Vàng)',
    mainColor: '#1D4ED8',
    borderColor: '#FBBF24',
    symbolism: 'Màu của bầu trời bao la và biển cả. Tượng trưng cho tâm hồn cởi mở, lòng trung thực, tinh thần vui tươi và sẵn sàng hy sinh phục vụ bạn bè, gia đình.'
  },
  {
    id: 'nghia-si',
    name: 'Khăn Ngành Nghĩa Sĩ',
    age: '13 – 15 tuổi',
    motto: 'Chinh Phục',
    colorName: 'Vàng Nghệ (Viền Đỏ)',
    mainColor: '#D97706',
    borderColor: '#DC2626',
    symbolism: 'Màu của bình minh rực rỡ và lúa chín trĩu hạt. Tượng trưng cho độ tuổi trưởng thành đức tin, khao khát dấn thân, chinh phục lý tưởng yêu thương của Phúc Âm.'
  },
  {
    id: 'hiep-si',
    name: 'Khăn Ngành Hiệp Sĩ',
    age: '16 – 17 tuổi',
    motto: 'Dấn Thân',
    colorName: 'Màu Nâu Đất (Viền Vàng)',
    mainColor: '#78350F',
    borderColor: '#FBBF24',
    symbolism: 'Màu của mảnh đất màu mỡ phù sa sông Tiền. Tượng trưng cho tinh thần vững chãi, khiêm tốn, sẵn sàng đem sức trẻ và tài năng gieo rắc Tin Mừng giữa đời.'
  },
  {
    id: 'huynh-truong',
    name: 'Khăn Huynh Trưởng',
    age: 'Từ 18 tuổi trở lên',
    motto: 'Phụng Sự',
    colorName: 'Đỏ Thắm (Viền Vàng)',
    mainColor: '#DC2626',
    borderColor: '#FBBF24',
    symbolism: 'Màu máu Tử Đạo và Lửa Thánh Thể. Tượng trưng cho lòng nhiệt huyết tông đồ, đức ái hy sinh vô điều kiện để hướng dẫn các em đoàn sinh đến với Chúa Kitô.'
  }
];

export default function GioiThieuPage() {
  const { t } = useLanguage();
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption: string } | null>(null);
  const [tocOpen, setTocOpen] = useState(true);

  return (
    <div
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--color-dark)',
        minHeight: '100vh',
        paddingBottom: '80px'
      }}
    >
      {/* =========================================================================
          TOP BREADCRUMB & HEADER
          ========================================================================= */}
      <div
        style={{
          borderBottom: '1px solid var(--color-border-subtle)',
          backgroundColor: 'var(--color-card-bg)',
          padding: '12px 20px'
        }}
      >
        <div
          style={{
            maxWidth: '1220px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.82rem',
            color: 'var(--color-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link
              href="/"
              style={{
                color: 'var(--color-red)',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ArrowLeft size={14} /> Trang Chủ
            </Link>
            <span>/</span>
            <span>Tài Liệu Bách Khoa</span>
            <span>/</span>
            <span style={{ color: 'var(--color-dark)', fontWeight: 700 }}>Nhà Thờ Chính Tòa Mỹ Tho</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
            <Globe size={14} color="#D4AF37" />
            <span>Bách khoa toàn thư Công Giáo</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTAINER (WIKIPEDIA LAYOUT: ARTICLE BODY + INFOBOX)
          ========================================================================= */}
      <div
        style={{
          maxWidth: '1220px',
          margin: '0 auto',
          padding: '24px 20px',
          display: 'flex',
          gap: '36px',
          alignItems: 'flex-start',
          boxSizing: 'border-box'
        }}
        className="wiki-container"
      >
        {/* =======================================================================
            CỘT TRÁI: NỘI DUNG CHÍNH (MAIN ARTICLE CONTENT)
            ======================================================================= */}
        <article style={{ flex: 1, minWidth: 0 }}>
          {/* Article Title */}
          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              fontFamily: 'serif',
              margin: '0 0 8px',
              color: 'var(--color-dark)',
              borderBottom: '1.5px solid var(--color-border-subtle)',
              paddingBottom: '10px',
              lineHeight: 1.2
            }}
          >
            Nhà thờ chính tòa Mỹ Tho
          </h1>

          <div
            style={{
              fontSize: '0.86rem',
              color: 'var(--color-subtle)',
              fontStyle: 'italic',
              marginBottom: '18px'
            }}
          >
            Bách khoa toàn thư Công Giáo — Giáo xứ Chánh Tòa &amp; Xứ Đoàn Các Thánh Tử Đạo Việt Nam, Giáo phận Mỹ Tho.
          </div>

          {/* Dẫn nhập tổng quan (Lead Paragraph) */}
          <p style={{ fontSize: '0.98rem', lineHeight: 1.75, margin: '0 0 16px', textAlign: 'justify' }}>
            <strong>Nhà thờ chính tòa Mỹ Tho</strong> (tên hiệu đầy đủ: <em>Nhà thờ chính tòa Đức Mẹ Vô Nhiễm Nguyên Tội</em>) là
            ngôi nhà thờ mẹ và là trung tâm hiệp thông phụng vụ của <strong>Giáo phận Mỹ Tho</strong>, tọa lạc tại số 32 đại lộ
            Hùng Vương, phường 7, thành phố Mỹ Tho, tỉnh Tiền Giang, thuộc Giáo tỉnh Sài Gòn, Việt Nam. Đây là trung tâm đầu não
            chăm sóc đời sống đức tin cho hơn 130.000 tín hữu Công giáo trên địa bàn ba tỉnh Tiền Giang, Long An và Đồng Tháp.
          </p>

          <p style={{ fontSize: '0.98rem', lineHeight: 1.75, margin: '0 0 20px', textAlign: 'justify' }}>
            Ngôi thánh đường hiện nay được khởi công xây dựng vào ngày 11 tháng 8 năm 1906 bởi linh mục Régnier (cố Gẫm)
            và hoàn thành vào năm 1910 theo phong cách kiến trúc Phục Hưng (Renaissance) phối hợp các thức vòm Romanesque
            uy nghiêm. Ngày 24 tháng 11 năm 1960, Thánh Giáo hoàng Gioan XXIII ban hành Tông hiến <em>Venerabilium Nostrorum</em>{' '}
            chính thức nâng ngôi thánh đường lên hàng <strong>Nhà thờ Chính Tòa</strong>.
          </p>

          {/* =====================================================================
              MỤC LỤC BÁCH KHOA (TABLE OF CONTENTS)
              ===================================================================== */}
          <div
            style={{
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: '10px',
              padding: '16px 20px',
              margin: '24px 0 32px',
              display: 'inline-block',
              minWidth: '300px',
              maxWidth: '100%',
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '0.92rem',
                borderBottom: tocOpen ? '1px solid var(--color-border-subtle)' : 'none',
                paddingBottom: tocOpen ? '8px' : '0',
                marginBottom: tocOpen ? '10px' : '0'
              }}
              onClick={() => setTocOpen(!tocOpen)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={16} color="var(--color-red)" />
                <span>Mục lục nội dung</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-red)' }}>
                [{tocOpen ? 'ẩn' : 'hiện'}]
              </span>
            </div>

            {tocOpen && (
              <ol
                style={{
                  margin: 0,
                  paddingLeft: '22px',
                  fontSize: '0.88rem',
                  lineHeight: 1.8,
                  color: 'var(--color-red)'
                }}
              >
                <li>
                  <a href="#duc-thanh-cha" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Đức Thánh Cha đương kim &amp; Tòa Thánh Vatican
                  </a>
                </li>
                <li>
                  <a href="#lich-su" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Lịch sử hình thành và phát triển
                  </a>
                  <ol style={{ paddingLeft: '18px', color: 'var(--color-subtle)' }}>
                    <li>
                      <a href="#lich-su-so-khai" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Thời kỳ sơ khai &amp; Họ đạo Vĩnh Tường (Thế kỷ XVII – 1866)
                      </a>
                    </li>
                    <li>
                      <a href="#lich-su-xay-dung" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Xây dựng ngôi thánh đường hiện nay (1906 – 1910)
                      </a>
                    </li>
                    <li>
                      <a href="#lich-su-chinh-toa" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Tông hiến Venerabilium Nostrorum &amp; Nâng lên Chính Tòa (1960)
                      </a>
                    </li>
                    <li>
                      <a href="#lich-su-cung-hien" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Lễ Cung Hiến &amp; Đại trùng tu Bách chu niên (2000 – 2006)
                      </a>
                    </li>
                  </ol>
                </li>
                <li>
                  <a href="#kien-truc" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Kiến trúc &amp; Nghệ thuật Thánh
                  </a>
                  <ol style={{ paddingLeft: '18px', color: 'var(--color-subtle)' }}>
                    <li>
                      <a href="#kien-truc-mat-tien" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Mặt tiền Phục Hưng và Tháp chuông 24 mét
                      </a>
                    </li>
                    <li>
                      <a href="#kien-truc-cung-thanh" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Gian Cung Thánh &amp; Mái vòm Romanesque
                      </a>
                    </li>
                    <li>
                      <a href="#kien-truc-khuon-vien" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Đài Đức Mẹ Lộ Đức &amp; 14 Đàng Thánh Giá
                      </a>
                    </li>
                  </ol>
                </li>
                <li>
                  <a href="#giao-phan" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Cơ cấu Giáo phận &amp; Các Đời Giám Mục Mỹ Tho
                  </a>
                </li>
                <li>
                  <a href="#xu-doan" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Xứ Đoàn Các Thánh Tử Đạo Việt Nam (TNTT)
                  </a>
                  <ol style={{ paddingLeft: '18px', color: 'var(--color-subtle)' }}>
                    <li>
                      <a href="#xu-doan-ton-chi" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Tôn chỉ &amp; 4 Khẩu hiệu Phong trào
                      </a>
                    </li>
                    <li>
                      <a href="#xu-doan-khan-quang" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Hệ thống Ngành &amp; Ý nghĩa Khăn Quàng TNTT
                      </a>
                    </li>
                  </ol>
                </li>
                <li>
                  <a href="#phung-vu" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Giờ Thánh Lễ &amp; Lịch Mục Vụ
                  </a>
                </li>
                <li>
                  <a href="#tai-lieu" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Chú thích &amp; Tài liệu tham khảo
                  </a>
                </li>
              </ol>
            )}
          </div>

          {/* =====================================================================
              1. ĐỨC THÁNH CHA ĐƯƠNG KIM & TÒA THÁNH VATICAN
              ===================================================================== */}
          <section id="duc-thanh-cha" style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--color-dark)',
                borderBottom: '1px solid var(--color-border-subtle)',
                paddingBottom: '6px',
                marginTop: '32px'
              }}
            >
              1. Đức Thánh Cha đương kim &amp; Tòa Thánh Vatican
            </h2>

            {/* Thumbnail chân dung Đức Giáo hoàng Phanxicô */}
            <div
              style={{
                float: 'right',
                width: '280px',
                margin: '8px 0 16px 20px',
                padding: '8px',
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}
              className="wiki-thumb"
            >
              <div
                style={{ position: 'relative', width: '100%', height: '260px', cursor: 'pointer', borderRadius: '6px', overflow: 'hidden' }}
                onClick={() => setLightboxImage({ src: '/images/pope_francis.jpg', caption: 'Đức Thánh Cha Phanxicô (Pope Francis) — Vị Giáo hoàng thứ 266 của Giáo hội Công giáo Rôma.' })}
              >
                <Image
                  src="/images/pope_francis.jpg"
                  alt="Đức Giáo hoàng Phanxicô"
                  fill
                  sizes="280px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '6px', lineHeight: 1.4 }}>
                <strong>Đức Thánh Cha Phanxicô</strong> (Jorge Mario Bergoglio, S.J.) — Đấng kế vị Thánh Phêrô, vị Giáo hoàng thứ 266 của Giáo hội Công giáo hoàn vũ.
              </div>
            </div>

            <p style={{ fontSize: '0.96rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Người đứng đầu tối cao của Giáo hội Công giáo hoàn vũ hiện nay là <strong>Đức Giáo hoàng Phanxicô</strong> (tiếng
              Latinh: <em>Franciscus</em>, sinh ngày 17 tháng 12 năm 1936 tại Buenos Aires, Argentina). Ngài được Mật viện Hồng Y
              bầu chọn vào ngày 13 tháng 3 năm 2013, trở thành vị Giáo hoàng đầu tiên thuộc Dòng Tên (Dòng Chúa Giêsu - S.J.),
              vị Giáo hoàng đầu tiên đến từ Tân Thế Giới (châu Mỹ Latinh) và là vị Giáo hoàng đầu tiên chọn tông hiệu Phanxicô để
              tôn vinh Thánh Phanxicô thành Assisi — vị thánh của sự khó nghèo, hòa bình và bảo vệ thiên nhiên tạo thành.
            </p>

            <p style={{ fontSize: '0.96rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Khẩu hiệu triều đại Giáo hoàng của Ngài là: <em>“Miserando atque eligendo”</em> (tiếng Việt: <em>“Cảm thương và
              tuyển chọn”</em>), trích từ bài giảng của Thánh Bêđa Khả Kính về ơn gọi của Thánh Mátthêu. Triều đại của Đức Thánh
              Cha Phanxicô ghi dấu ấn sâu sắc với đường hướng mục vụ đưa Giáo hội đến với những người nghèo khổ nơi vùng ngoại vi,
              cổ võ tinh thần đối thoại liên tôn, lòng thương xót Chúa và cải cách Giáo triều Rôma qua Tông hiến <em>Praedicate
              Evangelium</em> (2022).
            </p>

            {/* Các thông điệp nổi bật & Vatican */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '12px',
                margin: '18px 0'
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  cursor: 'pointer'
                }}
                onClick={() => setLightboxImage({ src: '/images/vatican_st_peter.jpg', caption: 'Vương cung thánh đường Thánh Phêrô (Thánh địa Vatican) — Trung tâm đức tin Công giáo toàn cầu.' })}
              >
                <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: '6px', overflow: 'hidden', marginBottom: '8px' }}>
                  <Image src="/images/vatican_st_peter.jpg" alt="Vatican St. Peter" fill sizes="240px" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                  Vương Cung Thánh Đường Thánh Phêrô
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                  Trung tâm của Tòa Thánh Vatican và Giáo triều Rôma.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  cursor: 'pointer'
                }}
                onClick={() => setLightboxImage({ src: '/images/vatican_basilica_interior.jpg', caption: 'Kiến trúc tráng lệ bên trong Đền thờ Thánh Phêrô Vatican.' })}
              >
                <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: '6px', overflow: 'hidden', marginBottom: '8px' }}>
                  <Image src="/images/vatican_basilica_interior.jpg" alt="Vatican Interior" fill sizes="240px" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                  Đền Thờ Thánh Phêrô (Bên trong)
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                  Nơi Đức Thánh Cha chủ sự các Đại lễ Phụng vụ hoàn vũ.
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.96rem', lineHeight: 1.75, textAlign: 'justify', margin: '0' }}>
              <strong>Mối quan hệ với Giáo hội Việt Nam:</strong> Dưới triều đại Đức Thánh Cha Phanxicô, quan hệ giữa Tòa Thánh
              Vatican và Việt Nam đã đạt bước tiến lịch sử với việc ký kết <em>Thỏa thuận Quy chế Đại diện Thường trú của Tòa Thánh
              tại Việt Nam</em> (tháng 7/2023), giúp tăng cường sự hiệp thông trực tiếp giữa Tòa Thánh với Hội đồng Giám mục Việt
              Nam và 27 giáo phận, trong đó có Giáo phận Mỹ Tho.
            </p>
          </section>

          {/* =====================================================================
              2. LỊCH SỬ HÌNH THÀNH & PHÁT TRIỂN
              ===================================================================== */}
          <section id="lich-su" style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--color-dark)',
                borderBottom: '1px solid var(--color-border-subtle)',
                paddingBottom: '6px',
                marginTop: '32px'
              }}
            >
              2. Lịch sử hình thành và phát triển
            </h2>

            {/* Minh họa ảnh nổi bên phải chuẩn Wikipedia */}
            <div
              style={{
                float: 'right',
                width: '300px',
                margin: '8px 0 16px 20px',
                padding: '8px',
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}
              className="wiki-thumb"
            >
              <div
                style={{ position: 'relative', width: '100%', height: '190px', cursor: 'pointer', borderRadius: '6px', overflow: 'hidden' }}
                onClick={() => setLightboxImage({ src: '/images/nhatho2.jpg', caption: 'Toàn cảnh ngôi thánh đường Chánh Tòa Mỹ Tho cổ kính xây dựng năm 1906.' })}
              >
                <Image
                  src="/images/nhatho2.jpg"
                  alt="Nhà thờ Chánh Tòa Mỹ Tho xưa"
                  fill
                  sizes="300px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '6px', lineHeight: 1.4 }}>
                Toàn cảnh ngôi thánh đường Chánh Tòa Mỹ Tho cổ kính xây dựng năm 1906.
              </div>
            </div>

            <h3 id="lich-su-so-khai" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-red)', margin: '18px 0 8px' }}>
              2.1. Thời kỳ sơ khai &amp; Họ đạo Vĩnh Tường (Thế kỷ XVII – 1866)
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Hạt giống Tin Mừng được gieo vãi tại vùng đất Mỹ Tho từ rất sớm vào thế kỷ XVII nhờ bước chân truyền giáo của
              các vị thừa sai Dòng Phanxicô và Hội Thừa sai Paris (MEP). Họ đạo đầu tiên dâng kính Thánh Phanxicô Xaviê được
              hình thành tại họ Điều Hòa.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Đến năm 1866, Đức Giám mục Dominique Miche (đại diện Tông tòa Tây Đàng Trong) cho xây dựng ngôi nhà thờ
              Vĩnh Tường (tước hiệu Thánh Tâm Chúa Giêsu) tại vị trí gần chợ Cũ Mỹ Tho nhằm đáp ứng nhu cầu sinh hoạt tôn
              giáo ngày càng tăng của giáo dân địa phương.
            </p>

            <h3 id="lich-su-xay-dung" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
              2.2. Xây dựng ngôi thánh đường hiện nay (1906 – 1910)
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Nhận thấy ngôi nhà thờ cũ đã xuống cấp và diện tích chật hẹp, ngày 11 tháng 8 năm 1906, Linh mục Régnier (thường
              được bà con giáo dân gọi thân mật là <em>cố Gẫm</em>) đã chính thức đặt viên đá đầu tiên khởi công xây dựng
              ngôi thánh đường thứ ba tại đại lộ Bourdais (nay là số 32 đường Hùng Vương). Sau 4 năm thi công kiên cố với vật
              liệu gạch ngói chuyển trực tiếp từ Pháp và thợ lành nghề miền Nam, nhà thờ được khánh thành trọng thể vào năm
              1910.
            </p>

            <h3 id="lich-su-chinh-toa" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
              2.3. Tông hiến Venerabilium Nostrorum &amp; Nâng lên Chính Tòa (1960)
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Ngày 24 tháng 11 năm 1960, Thánh Giáo hoàng Gioan XXIII ban hành Tông hiến lịch sử <em>Venerabilium Nostrorum</em>{' '}
              thiết lập Hàng Giáo phẩm Việt Nam, đồng thời khai sinh <strong>Giáo phận Mỹ Tho</strong> (tách ra từ Giáo phận
              Sài Gòn). Nhà thờ Mỹ Tho được chọn làm Nhà thờ Chính Tòa của tân giáo phận dưới quyền coi sóc của Đức Giám
              mục Tiên khởi Giuse Trần Văn Thiện.
            </p>

            {/* Trích dẫn văn kiện giáo hội */}
            <div
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
                borderLeft: '4px solid #D4AF37',
                padding: '14px 18px',
                borderRadius: '0 10px 10px 0',
                margin: '18px 0',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                color: 'var(--color-dark)'
              }}
            >
              <Quote size={16} color="#D4AF37" style={{ verticalAlign: '-3px', marginRight: '6px' }} />
              &ldquo;Nguyện xin Thiên Chúa làm cho Giáo phận Mỹ Tho trở nên muối men của tình yêu thương và ánh sáng Phúc Âm
              giữa lòng đồng bằng sông Cửu Long trù phú.&rdquo;
              <div style={{ textAlign: 'right', fontSize: '0.78rem', fontStyle: 'normal', color: 'var(--color-subtle)', marginTop: '4px', fontWeight: 700 }}>
                — Trích Sắc chỉ Tông hiến Venerabilium Nostrorum (24/11/1960)
              </div>
            </div>

            <h3 id="lich-su-cung-hien" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
              2.4. Lễ Cung Hiến &amp; Đại trùng tu Bách chu niên (2000 – 2006)
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Nhân dịp Đại Năm Thánh 2000, Đức Tổng Giám mục Phaolô Bùi Văn Đọc đã long trọng cử hành <strong>Lễ Cung Hiến
              Nhà thờ Chính Tòa Mỹ Tho</strong> và nhận ngày Lễ Đức Mẹ Hồn Xác Lên Trời (15 tháng 8) làm Bổn mạng thứ hai của
              nhà thờ.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0' }}>
              Đến năm 2006, đánh dấu kỷ niệm 100 năm ngày khởi công xây dựng, Linh mục Chánh xứ Giacôbê Hà Văn Xung đã thực
              hiện đợt đại trùng tu toàn diện: gia cố nền móng, xây dựng tháp chuông độc lập cao 24m, nới rộng gian Cung
              Thánh, lát đá cẩm thạch và kiến thiết vườn hoa 14 Đàng Thánh Giá bao quanh khuôn viên thánh đường.
            </p>
          </section>

          {/* =====================================================================
              3. KIẾN TRÚC & NGHỆ THUẬT THÁNH
              ===================================================================== */}
          <section id="kien-truc" style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--color-dark)',
                borderBottom: '1px solid var(--color-border-subtle)',
                paddingBottom: '6px',
                marginTop: '32px'
              }}
            >
              3. Kiến trúc &amp; Nghệ thuật Thánh
            </h2>

            {/* Gallery ảnh kiến trúc */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px',
                margin: '18px 0'
              }}
            >
              {[
                { src: '/images/nhatho1.jpg', title: 'Mặt tiền Phục Hưng', desc: 'Kiến trúc cột trụ đối xứng hài hòa' },
                { src: '/images/nhatho3.jpg', title: 'Gian Thánh Cung', desc: 'Vòm Romanesque & Bàn thờ cẩm thạch' },
                { src: '/images/nhatho_dai_duc_me.jpg', title: 'Đài Đức Mẹ Lộ Đức', desc: 'Khuôn viên linh thiêng cầu nguyện' }
              ].map((img, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--color-card-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '8px',
                    padding: '8px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setLightboxImage({ src: img.src, caption: `${img.title} — ${img.desc}` })}
                >
                  <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: '6px', overflow: 'hidden' }}>
                    <Image src={img.src} alt={img.title} fill sizes="240px" style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.84rem', marginTop: '6px', color: 'var(--color-dark)' }}>
                    {img.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)' }}>{img.desc}</div>
                </div>
              ))}
            </div>

            <h3 id="kien-truc-mat-tien" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-red)', margin: '18px 0 8px' }}>
              3.1. Mặt tiền Phục Hưng và Tháp chuông 24 mét
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Nhà thờ mang phong cách kiến trúc Phục Hưng (Renaissance) uy nghiêm với chiều dài 53 mét, chiều rộng 17 mét và
              chiều cao nóc giáo đường đạt 16 mét. Mặt tiền nhà thờ được chia thành 3 nhịp cân xứng với các cột thức Corinthian
              được đắp nổi hoa văn tinh tế. Tháp chuông kiên cố cao 24 mét được đặt tách biệt bên hông thánh đường, lưu giữ
              bộ chuông đồng đúc cổ truyền mang âm sắc trầm hùng ngân vang khắp trung tâm thành phố Mỹ Tho mỗi dịp lễ trọng.
            </p>

            <h3 id="kien-truc-cung-thanh" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
              3.2. Gian Cung Thánh &amp; Mái vòm Romanesque
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Bên trong thánh đường được thiết kế theo hình dạng Thánh Giá La-tinh gồm gian chính (nave) rộng rãi và hai gian
              phụ (aisles) phân cách bằng hai hàng cột đỡ vòm cung Romanesque liên hoàn. Trần giáo đường uốn cong kiểu vòm
              bán nguyệt dát viền vàng kim, kết hợp hệ thống cửa sổ kính màu thu nhận ánh sáng tự nhiên dịu nhẹ tạo nên bầu
              khí trang nghiêm, thánh thiện.
            </p>

            <h3 id="kien-truc-khuon-vien" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
              3.3. Đài Đức Mẹ Lộ Đức &amp; 14 Đàng Thánh Giá
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0' }}>
              Khuôn viên nhà thờ có diện tích rộng thoáng rợp bóng cây xanh. Phía bên phải là Đài Đức Mẹ Lộ Đức đá tự nhiên —
              nơi giáo dân và khách hành hương tề tựu lần hạt Mân Côi mỗi ngày. Chạy dọc bờ tường khuôn viên là 14 bức phù
              điêu Đàng Thánh Giá bằng đồng tái hiện cuộc khổ nạn của Chúa Giêsu Kitô trên đồi Can-vê.
            </p>
          </section>

          {/* =====================================================================
              4. CƠ CẤU GIÁO PHẬN & CÁC ĐỜI GIÁM MỤC MỸ THO
              ===================================================================== */}
          <section id="giao-phan" style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--color-dark)',
                borderBottom: '1px solid var(--color-border-subtle)',
                paddingBottom: '6px',
                marginTop: '32px'
              }}
            >
              4. Cơ cấu Giáo phận &amp; Các Đời Giám Mục Mỹ Tho
            </h2>

            {/* Ảnh Linh mục đoàn & Thánh lễ đồng tế */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '12px',
                margin: '18px 0'
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '10px',
                  padding: '10px',
                  cursor: 'pointer'
                }}
                onClick={() => setLightboxImage({ src: '/images/linh_muc_doan_my_tho.jpg', caption: 'Linh mục đoàn Giáo phận Mỹ Tho cùng Đức Giám mục trong Thánh lễ Truyền Dầu.' })}
              >
                <div style={{ position: 'relative', width: '100%', height: '150px', borderRadius: '6px', overflow: 'hidden', marginBottom: '6px' }}>
                  <Image src="/images/linh_muc_doan_my_tho.jpg" alt="Linh Mục Đoàn Mỹ Tho" fill sizes="240px" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--color-dark)' }}>Linh Mục Đoàn Giáo Phận Mỹ Tho</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)' }}>Đồng tâm phụng sự cùng Đức Giám mục Chính tòa</div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '10px',
                  padding: '10px',
                  cursor: 'pointer'
                }}
                onClick={() => setLightboxImage({ src: '/images/thanh_le_dong_te_my_tho.jpg', caption: 'Thánh lễ đồng tế đại triều tại Cung thánh Nhà thờ Chính Tòa Mỹ Tho.' })}
              >
                <div style={{ position: 'relative', width: '100%', height: '150px', borderRadius: '6px', overflow: 'hidden', marginBottom: '6px' }}>
                  <Image src="/images/thanh_le_dong_te_my_tho.jpg" alt="Thánh Lễ Đồng Tế" fill sizes="240px" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--color-dark)' }}>Thánh Lễ Đại Triều Tại Chánh Tòa</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)' }}>Cử hành phụng vụ trọng thể Năm Thánh</div>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, margin: '0 0 18px', textAlign: 'justify' }}>
              Từ ngày thành lập năm 1960 đến nay, Giáo phận Mỹ Tho đã trải qua 5 đời Giám mục coi sóc Chính tòa và Giám mục Phó:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {BISHOPS_DATA.map((b, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-card-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  <div
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      position: 'relative',
                      flexShrink: 0,
                      border: '2px solid #D4AF37',
                      backgroundColor: '#1E1710'
                    }}
                  >
                    <Image src={b.image} alt={b.name} fill sizes="76px" style={{ objectFit: 'cover' }} />
                  </div>

                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                      <h4 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                        {b.name}
                      </h4>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          backgroundColor: 'rgba(212, 175, 55, 0.15)',
                          color: '#B45309',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: '1px solid rgba(212, 175, 55, 0.3)'
                        }}
                      >
                        {b.period}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-red)', margin: '2px 0 4px' }}>
                      {b.role}
                    </div>

                    <div style={{ fontSize: '0.78rem', fontStyle: 'italic', color: 'var(--color-subtle)', marginBottom: '6px' }}>
                      Khẩu hiệu mục tử: <strong style={{ color: 'var(--color-dark)' }}>{b.motto}</strong>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-subtle)', lineHeight: 1.5, textAlign: 'justify' }}>
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =====================================================================
              5. XỨ ĐOÀN CÁC THÁNH TỬ ĐẠO VIỆT NAM (TNTT)
              ===================================================================== */}
          <section id="xu-doan" style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--color-dark)',
                borderBottom: '1px solid var(--color-border-subtle)',
                paddingBottom: '6px',
                marginTop: '32px'
              }}
            >
              5. Xứ Đoàn Các Thánh Tử Đạo Việt Nam (TNTT)
            </h2>

            <h3 id="xu-doan-ton-chi" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-red)', margin: '18px 0 8px' }}>
              5.1. Tôn chỉ &amp; 4 Khẩu hiệu Phong trào
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              <strong>Xứ Đoàn Các Thánh Tử Đạo Việt Nam</strong> trực thuộc Giáo xứ Chánh Tòa Mỹ Tho là đoàn thể tông đồ
              hướng dẫn thanh thiếu nhi và giới trẻ theo tôn chỉ của <em>Phong trào Thiếu Nhi Thánh Thể Việt Nam</em>. Mục đích
              của Xứ Đoàn là giáo dục thanh thiếu niên về cả hai phương diện: <strong>Tự nhiên</strong> (trở thành công dân
              tốt cho xã hội) và <strong>Siêu nhiên</strong> (trở thành Kitô hữu đích thực, yêu mến Chúa Giêsu Thánh Thể).
            </p>

            {/* 4 Khẩu hiệu TNTT */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px',
                margin: '16px 0'
              }}
            >
              {[
                { title: 'CẦU NGUYỆN', desc: 'Nuôi dưỡng đời sống kết hiệp mật thiết với Chúa Giêsu Thánh Thể mỗi ngày.' },
                { title: 'RƯỚC LỄ', desc: 'Tham dự Thánh lễ sốt sắng và rước Mình Máu Thánh Chúa để được biến đổi.' },
                { title: 'HY SINH', desc: 'Vui vẻ chấp nhận gian khó, biết từ bỏ ý riêng và quảng đại vì tha nhân.' },
                { title: 'LÀM TÔNG ĐỒ', desc: 'Làm chứng cho Tin Mừng bằng đời sống gương mẫu, bác ái và yêu thương.' }
              ].map((k, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(220, 38, 38, 0.05)',
                    border: '1px solid rgba(220, 38, 38, 0.2)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontWeight: 900, color: '#DC2626', fontSize: '0.88rem', marginBottom: '4px' }}>
                    {idx + 1}. {k.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.4 }}>{k.desc}</div>
                </div>
              ))}
            </div>

            <h3 id="xu-doan-khan-quang" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
              5.2. Hệ thống Ngành &amp; Ý nghĩa Khăn Quàng TNTT
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Khăn quàng TNTT là biểu tượng của tinh thần dâng hiến và trách nhiệm tông đồ. Dưới đây là bảng phân cấp các
              ngành trong Xứ Đoàn:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {TNTT_RANKS.map((r) => (
                <div
                  key={r.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--color-card-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        backgroundColor: r.mainColor,
                        border: `2px solid ${r.borderColor}`
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-dark)' }}>
                        {r.name}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--color-subtle)' }}>
                        Độ tuổi: <strong>{r.age}</strong> • Khẩu hiệu: <strong>{r.motto}</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', flex: 1, minWidth: '220px', textAlign: 'right' }}>
                    {r.symbolism}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =====================================================================
              6. GIỜ PHỤNG VỤ & MỤC VỤ
              ===================================================================== */}
          <section id="phung-vu" style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--color-dark)',
                borderBottom: '1px solid var(--color-border-subtle)',
                paddingBottom: '6px',
                marginTop: '32px'
              }}
            >
              6. Giờ Thánh Lễ &amp; Lịch Mục Vụ
            </h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, margin: '0 0 14px' }}>
              Giờ phụng vụ tại Nhà Thờ Chính Tòa Mỹ Tho được cử hành đều đặn mỗi ngày (dữ liệu được đồng bộ trực tiếp từ cơ
              sở dữ liệu Giáo phận):
            </p>

            <div
              style={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '12px',
                padding: '16px 20px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--color-red)', fontSize: '0.92rem', marginBottom: '6px' }}>
                    📅 CÁC NGÀY TRONG TUẦN
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-dark)' }}>
                    • Thánh lễ Sáng: <strong>05:00</strong>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-dark)' }}>
                    • Thánh lễ Chiều: <strong>17:30</strong>
                  </div>
                </div>

                <div>
                  <div style={{ fontWeight: 800, color: 'var(--color-red)', fontSize: '0.92rem', marginBottom: '6px' }}>
                    ⛪ CHÚA NHẬT (NGÀY CỦA CHÚA)
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-dark)' }}>
                    • Lễ I: <strong>05:30</strong> (Thánh lễ sáng sớm)
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-dark)' }}>
                    • Lễ II: <strong>07:00</strong> (Lễ dành cho Thiếu nhi &amp; Giới trẻ)
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-dark)' }}>
                    • Lễ III: <strong>16:00</strong> (Lễ chiều)
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-dark)' }}>
                    • Lễ IV: <strong>18:00</strong> (Lễ chiều tối)
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: '14px',
                  paddingTop: '10px',
                  borderTop: '1px dashed var(--color-border-subtle)',
                  fontSize: '0.8rem',
                  fontStyle: 'italic',
                  color: 'var(--color-subtle)'
                }}
              >
                🕊️ Bí tích Hòa Giải (Giải tội): Trước và sau tất cả các Thánh lễ trong tuần hoặc liên hệ trực tiếp văn phòng
                nhà xứ.
              </div>
            </div>
          </section>

          {/* =====================================================================
              7. CHÚ THÍCH & TÀI LIỆU THAM KHẢO
              ===================================================================== */}
          <section id="tai-lieu" style={{ marginTop: '40px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 10px' }}>
              7. Chú thích &amp; Tài liệu tham khảo
            </h3>
            <ol style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.6, paddingLeft: '20px' }}>
              <li>
                Tòa Thánh Vatican, <em>Niên Giám Tòa Thánh (Annuario Pontificio 2024)</em>, Libreria Editrice Vaticana.
              </li>
              <li>
                Tòa Giám Mục Mỹ Tho, <em>Kỷ yếu 50 năm thành lập Giáo phận Mỹ Tho (1960 – 2010)</em>, Nhà xuất bản Tôn Giáo,
                2010.
              </li>
              <li>
                Hội Đồng Giám Mục Việt Nam, <em>Niên Giám Giáo Hội Công Giáo Việt Nam 2022</em>, NXB Tôn Giáo, 2022.
              </li>
              <li>
                Ban Truyền Thông Giáo Phận Mỹ Tho, <em>Lược sử Giáo xứ Chánh Tòa Mỹ Tho</em>, Cổng thông tin điện tử Giáo
                phận.
              </li>
              <li>
                Tổng Liên Đoàn Thiếu Nhi Thánh Thể Việt Nam, <em>Quy chế &amp; Nội quy Phong trào TNTT</em>, Ban Đào tạo
                Huynh Trưởng.
              </li>
            </ol>
          </section>
        </article>

        {/* =======================================================================
            CỘT PHẢI: INFOBOX BÁCH KHOA CHUẨN WIKIPEDIA (SIDEBAR INFOBOX)
            ======================================================================= */}
        <aside
          style={{
            width: '340px',
            flexShrink: 0,
            backgroundColor: 'var(--color-card-bg)',
            border: '1.5px solid var(--color-border-subtle)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            fontSize: '0.84rem'
          }}
          className="wiki-infobox"
        >
          {/* Infobox Header */}
          <div
            style={{
              backgroundColor: '#8B0000',
              color: '#FFFFFF',
              padding: '12px 14px',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '0.5px'
            }}
          >
            Nhà thờ chính tòa Mỹ Tho
          </div>

          <div
            style={{
              backgroundColor: 'rgba(139, 0, 0, 0.08)',
              color: 'var(--color-dark)',
              padding: '4px 8px',
              textAlign: 'center',
              fontSize: '0.74rem',
              fontStyle: 'italic',
              borderBottom: '1px solid var(--color-border-subtle)'
            }}
          >
            Nhà thờ Đức Mẹ Vô Nhiễm Nguyên Tội
          </div>

          {/* Infobox Main Image */}
          <div style={{ padding: '8px', textAlign: 'center', backgroundColor: '#000000' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '210px',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '4px'
              }}
              onClick={() => setLightboxImage({ src: '/images/nhatho1.jpg', caption: 'Mặt tiền Nhà thờ Chánh Tòa Mỹ Tho' })}
            >
              <Image
                src="/images/nhatho1.jpg"
                alt="Nhà thờ Chính Tòa Mỹ Tho"
                fill
                sizes="340px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '6px', fontStyle: 'italic' }}>
              Mặt tiền thánh đường nhìn từ đường Hùng Vương
            </div>
          </div>

          {/* Infobox Table Rows */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {/* TÒA THÁNH VATICAN & GIÁO HOÀNG */}
              <tr>
                <td
                  colSpan={2}
                  style={{
                    backgroundColor: '#8B0000',
                    color: '#FFFFFF',
                    padding: '6px 10px',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '0.82rem'
                  }}
                >
                  Giáo triều &amp; Tòa Thánh Vatican
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    width: '38%',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Đức Thánh Cha
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)', fontWeight: 800 }}>
                  Đức Giáo hoàng Phanxicô (từ 2013)
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Giáo triều
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  Tòa Thánh Vatican (Thành quốc Vatican)
                </td>
              </tr>

              {/* ĐỊA LÝ & GIÁO HẠT */}
              <tr>
                <td
                  colSpan={2}
                  style={{
                    backgroundColor: '#8B0000',
                    color: '#FFFFFF',
                    padding: '6px 10px',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '0.82rem'
                  }}
                >
                  Vị trí &amp; Địa hạt
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Tọa độ
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  10°21′25″B 106°21′45″Đ
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Địa chỉ
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  32 Hùng Vương, Phường 7, TP. Mỹ Tho, Tiền Giang, Việt Nam
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Giáo hội
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  Giáo hội Công giáo Rôma
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Giáo tỉnh
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  Giáo tỉnh Sài Gòn
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Giáo phận
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  Giáo phận Mỹ Tho
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Bổn mạng
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  Đức Mẹ Vô Nhiễm Nguyên Tội (8/12) &amp; Đức Mẹ Hồn Xác Lên Trời (15/8)
                </td>
              </tr>

              {/* Sub-header Kiến trúc */}
              <tr>
                <td
                  colSpan={2}
                  style={{
                    backgroundColor: '#8B0000',
                    color: '#FFFFFF',
                    padding: '6px 10px',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '0.82rem'
                  }}
                >
                  Thông tin kiến trúc
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Khởi công
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  11 tháng 8 năm 1906
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Hoàn thành
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  Năm 1910
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Cung hiến
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  Năm Thánh 2000
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Phong cách
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  Phục hưng (Renaissance) &amp; Romanesque
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Kích thước
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  Dài 53 m, rộng 17 m, cao 16 m
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Chiều cao tháp
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  24 mét
                </td>
              </tr>

              {/* Sub-header Quản xứ */}
              <tr>
                <td
                  colSpan={2}
                  style={{
                    backgroundColor: '#8B0000',
                    color: '#FFFFFF',
                    padding: '6px 10px',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '0.82rem'
                  }}
                >
                  Ban Chăm sóc Mục vụ
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Giám mục Chính tòa
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)', fontWeight: 700 }}>
                  Đức Cha Phêrô Nguyễn Văn Khảm
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Linh mục Chánh xứ
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  Lm. Giacôbê Hà Văn Xung
                </td>
              </tr>

              <tr>
                <th
                  style={{
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: 'var(--color-subtle)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    verticalAlign: 'top',
                    backgroundColor: 'var(--color-input-bg)'
                  }}
                >
                  Đoàn thể nòng cốt
                </th>
                <td style={{ padding: '8px 10px', color: 'var(--color-dark)' }}>
                  Xứ Đoàn Các Thánh Tử Đạo Việt Nam (TNTT)
                </td>
              </tr>
            </tbody>
          </table>
        </aside>
      </div>

      {/* =========================================================================
          LIGHTBOX MODAL XEM ẢNH PHÓNG TO
          ========================================================================= */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100010,
            backgroundColor: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <button
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: '#FFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={24} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '900px',
              width: '100%',
              maxHeight: '80vh',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '65vh' }}>
              <Image
                src={lightboxImage.src}
                alt="Phóng to"
                fill
                sizes="900px"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div
              style={{
                color: '#FFF',
                marginTop: '12px',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontStyle: 'italic'
              }}
            >
              {lightboxImage.caption}
            </div>
          </div>
        </div>
      )}

      {/* Responsive Style */}
      <style jsx global>{`
        @media (max-width: 860px) {
          .wiki-container {
            flex-direction: column-reverse !important;
          }
          .wiki-infobox {
            width: 100% !important;
            margin-bottom: 24px !important;
          }
          .wiki-thumb {
            float: none !important;
            width: 100% !important;
            margin: 14px 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
