'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Flame,
  Users,
  Heart,
  BookOpen,
  Compass,
  Tent,
  Award,
  Sparkles,
  ShieldCheck,
  Sun,
  Target,
  Clock,
  CheckCircle2
} from 'lucide-react';

const BISHOPS = [
  {
    name: 'Đức Cha Giuse Trần Văn Thiện',
    role: 'Giám mục Tiên khởi (1960 – 1989)',
    motto: '“Phần rỗi linh hồn là luật tối thượng”',
    desc: 'Được Tòa Thánh bổ nhiệm làm Giám mục Tiên khởi ngày 24/11/1960 khi Giáo phận Mỹ Tho vừa được thành lập. Ngài có công lao to lớn trong việc đặt nền móng cơ sở hạ tầng, thành lập Tiểu Chủng viện Gioan XXIII, quy tụ linh mục đoàn và kiến thiết giáo phận trong những năm tháng đầu tiên đầy gian khó.',
    years: '1960 – 1989',
    image: '/images/bishop_1_tran_van_thien.jpg'
  },
  {
    name: 'Đức Cha Anrê Nguyễn Văn Nam',
    role: 'Giám mục Chính tòa thứ II (1989 – 1999)',
    motto: '“Vui mừng trong Thánh Giá Chúa Kitô”',
    desc: 'Coi sóc giáo phận trong giai đoạn chuyển mình của đất nước. Ngài hết lòng củng cố sự hiệp thông, chăm lo đời sống thiêng liêng cho bà con giáo dân và xây dựng tình bác ái huynh đệ khắp các giáo xứ vùng sông nước.',
    years: '1989 – 1999',
    image: '/images/bishop_nguyen_van_nam.jpg'
  },
  {
    name: 'Đức Hồng Y Gioan Baotixita Phạm Minh Mẫn',
    role: 'Giám mục Phó Giáo phận Mỹ Tho (1993 – 1998)',
    motto: '“Như Thầy yêu thương”',
    desc: 'Trong 5 năm phục vụ với cương vị Giám mục Phó, Ngài đồng hành đắc lực trong công tác đào tạo chủng sinh, linh mục và xây dựng các chương trình mục vụ bác ái, trước khi được Tòa Thánh tấn phong Tổng Giám mục Tổng Giáo phận Sài Gòn và Hồng Y.',
    years: '1993 – 1998',
    image: '/images/bishop_3_pham_minh_man.jpg'
  },
  {
    name: 'Đức Tổng Giám Mục Phaolô Bùi Văn Đọc',
    role: 'Giám mục Chính tòa thứ III (1999 – 2013)',
    motto: '“Chúa là nguồn vui của con”',
    desc: 'Thời kỳ Ngài coi sóc đã ghi dấu những bước phát triển vượt bậc: xây dựng Tòa Giám mục mới, thiết lập Trung tâm Mục vụ khang trang, cử hành Lễ Cung Hiến Nhà thờ Chánh Tòa vào Năm Thánh 2000 và thúc đẩy mạnh mẽ công cuộc truyền giáo tại Đồng Tháp Mười.',
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
  category: 'vatican' | 'vietnam' | 'exterior' | 'interior' | 'liturgy' | 'grounds' | 'community';
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
    title: 'Hội Đồng Giám Mục Việt Nam',
    desc: 'Huy hiệu chính thức của Hội Đồng Giám Mục Việt Nam hiệp thông 27 Giáo phận.',
    category: 'vietnam',
    categoryLabel: 'Giáo Hội Việt Nam',
    source: 'HĐGMVN'
  },
  {
    src: '/images/la_vang_shrine.jpg',
    title: 'Linh Đài Đức Mẹ La Vang - Quảng Trị',
    desc: 'Trung tâm Hành hương toàn quốc của Giáo Hội Công Giáo Việt Nam.',
    category: 'vietnam',
    categoryLabel: 'Giáo Hội Việt Nam',
    source: 'Tổng Giáo phận Huế'
  },
  {
    src: '/images/nha_tho_duc_ba.jpg',
    title: 'Vương Cung Thánh Đường Đức Bà Sài Gòn',
    desc: 'Nhà thờ Chánh Tòa của Tổng Giáo phận Sài Gòn - Giáo tỉnh Sài Gòn.',
    category: 'vietnam',
    categoryLabel: 'Giáo Hội Việt Nam',
    source: 'TGP Sài Gòn'
  },
  {
    src: '/images/nhatho1.jpg',
    title: 'Mặt Tiền Nhà Thờ Chánh Tòa Mỹ Tho',
    desc: 'Kiến trúc Gothic - Roman thanh thoát với vòm cửa sổ kính màu và hàng cột cổ điển xây dựng từ năm 1906.',
    category: 'exterior',
    categoryLabel: 'Kiến Trúc & Ngoại Thất',
    source: 'Tư liệu Giáo xứ Chánh Tòa'
  },
  {
    src: '/images/nhatho2.jpg',
    title: 'Cung Thánh Trang Nghiêm',
    desc: 'Không gian vòm cung thánh bên trong nhà thờ rực rỡ ánh sáng tự nhiên với các đường nét chạm trổ tinh xảo.',
    category: 'interior',
    categoryLabel: 'Cung Thánh & Nội Thất',
    source: 'Tư liệu Giáo xứ Chánh Tòa'
  },
  {
    src: '/images/nhatho3.jpg',
    title: 'Tháp Chuông Độc Lập',
    desc: 'Tháp chuông vươn cao kiêu hãnh xây dựng độc lập bên hông nhà thờ từ năm 1995 trong khuôn viên rợp bóng cây.',
    category: 'exterior',
    categoryLabel: 'Kiến Trúc & Ngoại Thất',
    source: 'Tư liệu Giáo xứ Chánh Tòa'
  },
  {
    src: '/images/nhatho4.jpg',
    title: 'Tượng Đài Lòng Chúa Thương Xót',
    desc: 'Trung tâm chiêm niệm và cầu nguyện linh thiêng trong khuôn viên thánh đường, nơi giáo dân tìm về mỗi ngày.',
    category: 'grounds',
    categoryLabel: 'Khuôn Viên & Đền Đài',
    source: 'Tư liệu Giáo xứ Chánh Tòa'
  },
  {
    src: '/images/nhatho_dai_duc_me.jpg',
    title: 'Đài Đức Mẹ Vô Nhiễm Nguyên Tội',
    desc: 'Đài Đức Mẹ trong khuôn viên Tòa Giám mục và Nhà thờ Chánh Tòa Mỹ Tho, rợp bóng mát thanh bình.',
    category: 'grounds',
    categoryLabel: 'Khuôn Viên & Đền Đài',
    source: 'Wikimedia Commons / GP Mỹ Tho'
  },
  {
    src: '/images/nhatho_bung_binh.jpg',
    title: 'Toàn Cảnh Từ Giao Lộ Hùng Vương',
    desc: 'Góc nhìn toàn cảnh Nhà thờ Chánh Tòa Mỹ Tho từ bùng binh đường Hùng Vương – Nguyễn Trãi trung tâm thành phố.',
    category: 'exterior',
    categoryLabel: 'Kiến Trúc & Ngoại Thất',
    source: 'Wikimedia Commons'
  },
  {
    src: '/images/nhatho_thanh_le.jpg',
    title: 'Thánh Lễ Bên Trong Nhà Thờ Chánh Tòa',
    desc: 'Cộng đoàn dân Chúa sốt sắng tham dự thánh lễ bên trong thánh đường Chánh Tòa Mỹ Tho.',
    category: 'liturgy',
    categoryLabel: 'Phụng Vụ & Thánh Lễ',
    source: 'Wikimedia Commons'
  },
  {
    src: '/images/nhatho_mat_tien_vintage.jpg',
    title: 'Di Sản Kiến Trúc Thời Pháp',
    desc: 'Nét kiến trúc Roman - Gothic cổ kính hơn 100 năm tuổi lưu dấu thời gian của Nhà thờ Chánh Tòa Mỹ Tho.',
    category: 'exterior',
    categoryLabel: 'Kiến Trúc & Ngoại Thất',
    source: 'Wikimedia Commons'
  },
  {
    src: '/images/thanh_le_dong_te_my_tho.jpg',
    title: 'Thánh Lễ Đồng Tế Tạ Ơn Giáo Phận',
    desc: 'Đức Cha Phêrô Nguyễn Văn Khảm chủ tế Thánh lễ Tạ ơn cùng Linh mục đoàn Giáo phận Mỹ Tho tại Cung thánh.',
    category: 'liturgy',
    categoryLabel: 'Phụng Vụ & Thánh Lễ',
    source: 'Trang thông tin Giáo phận Mỹ Tho (giaophanmytho.net)'
  },
  {
    src: '/images/duc_cha_giang_thuyet.jpg',
    title: 'Đức Cha Phêrô Nguyễn Văn Khảm Giảng Thuyết',
    desc: 'Vị chủ chăn giáo phận chia sẻ Lời Chúa đầy tâm huyết, sâu sắc và truyền cảm hứng cho cộng đoàn.',
    category: 'liturgy',
    categoryLabel: 'Phụng Vụ & Thánh Lễ',
    source: 'Trang thông tin Giáo phận Mỹ Tho (giaophanmytho.net)'
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
  },
  {
    src: '/images/chuc_mung_giam_muc.jpg',
    title: 'Tri Ân Vị Chủ Chăn Giáo Phận',
    desc: 'Đại diện linh mục đoàn và cộng đoàn giáo dân dâng lời chúc mừng và tâm tình tri ân lên Đức Giám mục.',
    category: 'community',
    categoryLabel: 'Sinh Hoạt Cộng Đoàn',
    source: 'Trang thông tin Giáo phận Mỹ Tho (giaophanmytho.net)'
  },
  {
    src: '/images/hiep_thong_giao_dan.jpg',
    title: 'Niềm Vui Hiệp Thông Giáo Phận',
    desc: 'Bầu không khí chan hòa, vui tươi và tràn đầy ân sủng tình Chúa trong đời sống sinh hoạt đức tin giáo phận.',
    category: 'community',
    categoryLabel: 'Sinh Hoạt Cộng Đoàn',
    source: 'Trang thông tin Giáo phận Mỹ Tho (giaophanmytho.net)'
  }
];

export default function GioiThieuPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'vatican' | 'vietnam' | 'diocese' | 'cathedral' | 'bishops' | 'tntt' | 'gallery'>('overview');
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'vatican' | 'vietnam' | 'exterior' | 'interior' | 'liturgy' | 'grounds' | 'community'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos = galleryFilter === 'all'
    ? REAL_GALLERY_IMAGES
    : REAL_GALLERY_IMAGES.filter(p => p.category === galleryFilter);

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-gradient)' }}>
      {/* Hero Header with Antique Jesus Painting */}
      <div style={{
        position: 'relative',
        backgroundImage: 'linear-gradient(180deg, rgba(15, 8, 8, 0.75) 0%, rgba(45, 15, 15, 0.65) 50%, rgba(15, 8, 8, 0.88) 100%), url("/images/jesus_antique_banner.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 22%',
        color: '#FFFFFF',
        padding: '36px 16px 44px',
        borderBottom: '1px solid rgba(217, 119, 6, 0.35)',
        boxShadow: 'inset 0 -12px 30px rgba(0,0,0,0.6)'
      }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#FFFFFF',
                border: '1px solid rgba(253, 230, 138, 0.3)',
                backdropFilter: 'blur(6px)'
              }}
            >
              <ArrowLeft size={18} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#FDE68A', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
              <Link href="/" style={{ opacity: 0.9 }}>Trang chủ</Link>
              <span>/</span>
              <span style={{ fontWeight: 700, color: '#FFFFFF' }}>Lược Sử & Giới Thiệu</span>
            </div>
          </div>

          <div>
            <div style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#FDE68A',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '6px'
            }}>
              GIÁO HỘI TOÀN CẦU • GIÁO HỘI VIỆT NAM • GIÁO PHẬN MỸ THO
            </div>
            <h1 style={{
              fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              margin: 0,
              color: '#FFFFFF',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(217, 119, 6, 0.4)'
            }}>
              Lược Sử Giáo Hội & Chánh Tòa Mỹ Tho
            </h1>
            <p style={{
              margin: '8px 0 0',
              fontSize: '0.95rem',
              color: '#F3F4F6',
              lineHeight: 1.5,
              maxWidth: '820px',
              textShadow: '0 1px 4px rgba(0,0,0,0.8)'
            }}>
              Từ Tòa Thánh Vatican, Giáo Hội Hoàn Vũ, Giáo Hội Việt Nam, Giáo phận Mỹ Tho đến Ngôi Thánh Đường Mẹ Chánh Tòa Đức Mẹ Vô Nhiễm Nguyên Tội.
            </p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ flex: 1, padding: '24px 16px 48px', maxWidth: '1060px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Quick Statistics Overview Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px'
        }}>
          {[
            { label: 'Năm Thành Lập GP', value: '1960', sub: 'Sắc chỉ Gioan XXIII' },
            { label: 'Địa Giới Hành Chính', value: '3 Tỉnh', sub: 'Tiền Giang, Long An, Đồng Tháp' },
            { label: 'Giáo Hạt', value: '6 Giáo Hạt', sub: 'Mỹ Tho, Cái Bè, Tân An...' },
            { label: 'Giáo Xứ & Họ Đạo', value: '114+', sub: 'Giáo xứ đang sinh hoạt' },
            { label: 'Tín Hữu Toàn Cầu', value: '> 1,4 Tỷ', sub: '17.7% dân số thế giới' },
            { label: 'Bổn Mạng', value: 'Đức Mẹ Vô Nhiễm', sub: 'Kính ngày 08/12' }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: '10px',
                padding: '14px 16px',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#B71C1C', margin: '4px 0 2px' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle)' }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs Bar */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}>
          {[
            { id: 'overview', label: 'Tổng Quan' },
            { id: 'tntt', label: 'Phong Trào TNTT VN' },
            { id: 'vatican', label: 'Tòa Thánh & Giáo Hội Toàn Cầu' },
            { id: 'vietnam', label: 'Giáo Hội VN & HĐGMVN' },
            { id: 'diocese', label: 'Lược Sử Giáo Phận' },
            { id: 'cathedral', label: 'Nhà Thờ Chánh Tòa' },
            { id: 'bishops', label: 'Các Đời Giám Mục' },
            { id: 'gallery', label: `Thư Viện Ảnh (${REAL_GALLERY_IMAGES.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                backgroundColor: activeTab === tab.id ? '#B71C1C' : 'transparent',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--color-dark)',
                border: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* PHẦN THÊM MỚI 1: TÒA THÁNH VATICAN & ĐỨC THÁNH CHA LÊÔ XIV */}
        {/* ========================================================================= */}
        {(activeTab === 'overview' || activeTab === 'vatican') && (
          <section style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '12px',
            padding: '24px 28px',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#B45309',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px'
            }}>
              TÒA THÁNH VATICAN & GIÁO HỘI HOÀN VŨ
            </div>
            <h2 style={{
              margin: '0 0 16px',
              fontSize: 'clamp(1.25rem, 2.6vw, 1.65rem)',
              fontWeight: 800,
              color: 'var(--color-dark)',
              borderBottom: '1px solid var(--color-border-subtle)',
              paddingBottom: '12px'
            }}>
              1. Tòa Thánh Vatican, Đức Thánh Cha Lêô XIV & Giáo Hội Toàn Cầu
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              alignItems: 'start',
              marginBottom: '20px'
            }}>
              {/* Ảnh Chân Dung Đức Giáo Hoàng Lêô XIV */}
              <div style={{
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: '#0F172A',
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
              }}>
                <div style={{ position: 'relative', width: '100%', height: '340px', backgroundColor: '#0F172A', padding: '8px' }}>
                  <Image
                    src="/images/pope_leo_xiv.jpg"
                    alt="Đức Giáo Hoàng Lêô XIV"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-card-bg)', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                    Đức Giáo Hoàng Lêô XIV (Leo PP. XIV)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                    Giáo hoàng thứ 267 của Giáo Hội Công Giáo Rôma (Tựu nhiệm: 08/05/2025 – nay)
                  </div>
                </div>
              </div>

              {/* Thông tin chính thức 100% */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                fontSize: '0.92rem',
                lineHeight: 1.7,
                color: 'var(--color-dark)'
              }}>
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
        )}

        {/* ========================================================================= */}
        {/* PHẦN THÊM MỚI 2: GIÁO HỘI CÔNG GIÁO VIỆT NAM & HĐGMVN */}
        {/* ========================================================================= */}
        {(activeTab === 'overview' || activeTab === 'vietnam') && (
          <section style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '12px',
            padding: '24px 28px',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#B45309',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px'
            }}>
              GIÁO HỘI CÔNG GIÁO VIỆT NAM
            </div>
            <h2 style={{
              margin: '0 0 16px',
              fontSize: 'clamp(1.25rem, 2.6vw, 1.65rem)',
              fontWeight: 800,
              color: 'var(--color-dark)',
              borderBottom: '1px solid var(--color-border-subtle)',
              paddingBottom: '12px'
            }}>
              2. Lịch Sử Đón Nhận Tin Mừng & Hội Đồng Giám Mục Việt Nam (HĐGMVN)
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              alignItems: 'start',
              marginBottom: '20px'
            }}>
              {/* Huy hiệu HĐGMVN hiển thị full */}
              <div style={{
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-card-bg)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
              }}>
                <div style={{ position: 'relative', width: '100%', height: '280px', backgroundColor: 'var(--color-card-bg)', padding: '16px' }}>
                  <Image
                    src="/images/hdgmvn_banner.jpg"
                    alt="Hội Đồng Giám Mục Việt Nam"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'contain', padding: '12px' }}
                  />
                </div>
                <div style={{ padding: '10px 14px', backgroundColor: 'var(--color-card-bg)', fontSize: '0.8rem', color: 'var(--color-subtle)', borderTop: '1px solid var(--color-border-subtle)' }}>
                  Huy hiệu Hội Đồng Giám Mục Việt Nam — Cơ quan lãnh đạo mục vụ tối cao của 27 Giáo phận toàn quốc.
                </div>
              </div>

              {/* Thông tin lịch sử 100% */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '0.92rem',
                lineHeight: 1.7,
                color: 'var(--color-dark)'
              }}>
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
            <div style={{
              marginTop: '16px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '14px'
            }}>
              {DIOCESES_3_PROVINCES.map((p, idx) => (
                <div key={idx} style={{
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  border: '1px solid var(--color-border-subtle)'
                }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-red)', marginBottom: '4px' }}>
                    {p.province}
                  </div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-subtle)', marginBottom: '6px' }}>
                    Quy mô: {p.count}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-dark)', lineHeight: 1.5 }}>
                    {p.list}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHẦN GỐC 1: LƯỢC SỬ GIÁO PHẬN MỸ THO */}
        {/* ========================================================================= */}
        {(activeTab === 'overview' || activeTab === 'diocese') && (
          <section style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '12px',
            padding: '24px 28px',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#B45309',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px'
            }}>
              GIÁO PHẬN MỸ THO
            </div>
            <h2 style={{
              margin: '0 0 16px',
              fontSize: 'clamp(1.25rem, 2.6vw, 1.65rem)',
              fontWeight: 800,
              color: 'var(--color-dark)',
              borderBottom: '1px solid var(--color-border-subtle)',
              paddingBottom: '12px'
            }}>
              3. Lược Sử Hình Thành Giáo Phận Mỹ Tho
            </h2>

            {/* Content & Bishop Portrait side by side */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div style={{ flex: '1 1 500px', lineHeight: 1.85, color: 'var(--color-dark)', fontSize: '0.98rem' }}>
                  <p style={{ marginBottom: '14px' }}>
                    <strong>Giáo phận Mỹ Tho</strong> (tiếng Latinh: <em>Dioecesis Mythoensis</em>) là một trong những giáo phận giàu truyền thống đức tin tại cửa ngõ miền Tây Nam Bộ, trực thuộc Giáo tỉnh Sài Gòn.
                  </p>
                  <p style={{ marginBottom: '14px' }}>
                    Từ thế kỷ XVII và XVIII, hạt giống đức tin Kitô giáo đã được các vị linh mục thừa sai dòng Phanxicô và Hội Thừa sai Paris (MEP) gieo rắc dọc theo sông Tiền Giang. Các cộng đoàn đức tin tiên khởi như Chợ Quán, Ba Giồng, Mỹ Tho, Tân An, Cái Mơn đã hình thành và kiên cường vượt qua những thời kỳ bách hại cam go.
                  </p>
                  <p style={{ marginBottom: '14px' }}>
                    Ngày <strong>24 tháng 11 năm 1960</strong>, Thánh Giáo hoàng Gioan XXIII ban hành Sắc chỉ lịch sử <em>Venerabilium Nostrorum</em>, chính thức thiết lập Hàng Giáo Phẩm Công Giáo Việt Nam và phân chia các giáo phận mới, trong đó Giáo phận Mỹ Tho được tách ra từ Giáo phận Sài Gòn.
                  </p>
                  <p>
                    Hiện nay, địa bàn Giáo phận Mỹ Tho bao gồm trọn vẹn tỉnh <strong>Tiền Giang</strong>, tỉnh <strong>Long An</strong> và một phần tỉnh <strong>Đồng Tháp</strong> (phía Bắc sông Tiền), được phân bổ thành <strong>6 Giáo hạt</strong> với hơn 114 giáo xứ và khoảng 140.000 tín hữu.
                  </p>
                </div>

                {/* Bishop & Priest Card */}
                <div style={{
                  flex: '0 0 280px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  margin: '0 auto'
                }}>
                  <div style={{
                    backgroundColor: 'var(--color-btn-subtle-bg)',
                    borderRadius: '10px',
                    padding: '16px',
                    border: '1px solid var(--color-border-subtle)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      position: 'relative',
                      width: '130px',
                      height: '170px',
                      margin: '0 auto 12px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                      <Image
                        src="/images/bishop.jpg"
                        alt="Đức Cha Phêrô Nguyễn Văn Khảm"
                        fill
                        sizes="130px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B71C1C', textTransform: 'uppercase' }}>
                      Giám Mục Chính Tòa
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)', margin: '2px 0' }}>
                      Đức Cha Phêrô Nguyễn Văn Khảm
                    </div>
                    <div style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--color-subtle)' }}>
                      Khẩu hiệu: &ldquo;Hãy theo Thầy&rdquo;
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: 'var(--color-btn-subtle-bg)',
                    borderRadius: '10px',
                    padding: '16px',
                    border: '1px solid var(--color-border-subtle)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      position: 'relative',
                      width: '130px',
                      height: '170px',
                      margin: '0 auto 12px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                      <Image
                        src="/images/priest.jpg"
                        alt="Cha Sở Chánh Tòa"
                        fill
                        sizes="130px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B71C1C', textTransform: 'uppercase' }}>
                      Linh Mục Sở Chánh Tòa
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)', margin: '2px 0' }}>
                      Cha Giacôbê Hà Văn Xung
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-subtle)' }}>
                      Phục vụ và dẫn dắt đoàn chiên Chánh Tòa
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline of Major Milestones */}
              <div style={{ marginTop: '16px', paddingTop: '20px', borderTop: '1px solid var(--color-border-subtle)' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#B71C1C', marginBottom: '16px' }}>
                  Các Mốc Lịch Sử Tiêu Biểu
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                  {MILESTONES.map((m, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-btn-subtle-bg)',
                        borderLeft: '4px solid #B71C1C'
                      }}
                    >
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#B71C1C' }}>
                        {m.year}
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-dark)', margin: '2px 0 4px' }}>
                        {m.title}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                        {m.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHẦN GỐC 2: NHÀ THỜ CHÁNH TÒA MỸ THO (LỊCH SỬ & KIẾN TRÚC) */}
        {/* ========================================================================= */}
        {(activeTab === 'overview' || activeTab === 'cathedral') && (
          <section style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '12px',
            padding: '24px 28px',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#B45309',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px'
            }}>
              NGÔI THÁNH ĐƯỜNG MẸ CỦA GIÁO PHẬN
            </div>
            <h2 style={{
              margin: '0 0 16px',
              fontSize: 'clamp(1.25rem, 2.6vw, 1.65rem)',
              fontWeight: 800,
              color: 'var(--color-dark)',
              borderBottom: '1px solid var(--color-border-subtle)',
              paddingBottom: '12px'
            }}>
              4. Dấu Ấn Kiến Trúc & Lịch Sử Nhà Thờ Chánh Tòa Mỹ Tho
            </h2>

            <div style={{ lineHeight: 1.85, color: 'var(--color-dark)', fontSize: '0.98rem' }}>
              <p style={{ marginBottom: '14px' }}>
                Tọa lạc tại số <strong>32 Đại lộ Hùng Vương, Phường Mỹ Tho, Tỉnh Tiền Giang</strong>, Nhà thờ Chánh Tòa Mỹ Tho là trung tâm sinh hoạt phụng vụ và tôn giáo quan trọng bậc nhất của toàn giáo phận. Ngôi thánh đường có tước hiệu chính là <strong>Đức Mẹ Vô Nhiễm Nguyên Tội</strong> (Lễ Bổn Mạng 08/12) và tước hiệu thứ hai là <strong>Đức Mẹ Hồn Xác Lên Trời</strong> (Lễ Bổn Mạng 15/08).
              </p>

              {/* 2-Column feature highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', margin: '20px 0' }}>
                <div style={{
                  padding: '16px 20px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  border: '1px solid var(--color-border-subtle)'
                }}>
                  <h4 style={{ margin: '0 0 8px', color: '#B45309', fontWeight: 800, fontSize: '1rem' }}>
                    Quy Mô & Kích Thước
                  </h4>
                  <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.9rem', color: 'var(--color-muted)', lineHeight: 1.7 }}>
                    <li><strong>Chiều dài:</strong> 53 mét</li>
                    <li><strong>Chiều rộng:</strong> hơn 17 mét</li>
                    <li><strong>Chiều cao:</strong> 24 mét</li>
                    <li><strong>Mặt bằng:</strong> 1 gian chính giữa và 2 gian phụ hai bên</li>
                    <li><strong>Vật liệu:</strong> Gạch nung, vữa cổ điển, hệ mái ngói kiên cố</li>
                  </ul>
                </div>

                <div style={{
                  padding: '16px 20px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  border: '1px solid var(--color-border-subtle)'
                }}>
                  <h4 style={{ margin: '0 0 8px', color: '#B71C1C', fontWeight: 800, fontSize: '1rem' }}>
                    Phong Cách Kiến Trúc
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-muted)', lineHeight: 1.7 }}>
                    Nhà thờ mang đậm phong cách <strong>Roman - Gothic</strong> thời Phục Hưng với hệ thống cột tròn nâng đỡ vòm cung Gothic mềm mại. Mái vòm cung thánh được đắp nổi hoa văn tinh xảo, phối hợp hài hòa cùng các ô cửa kính màu lấy sáng tự nhiên lộng lẫy.
                  </p>
                </div>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#B71C1C', margin: '20px 0 10px' }}>
                Quá Trình Trùng Tu & Khuôn Viên Thánh Đường
              </h3>
              <p style={{ marginBottom: '14px' }}>
                Chuông nhà thờ ban đầu được dựng bên hông nữ. Đến năm 1958, Cha Phaolô Nguyễn Minh Chiếu đã cho di dời chuông lên tháp cao. Đến ngày 16/02/1995, Cha Giuse Nguyễn Văn Chúc cho xây dựng lại <strong>tháp chuông độc lập</strong> đứng riêng biệt, tạo nên nét chấm phá độc đáo cho tổng thể cảnh quan.
              </p>
              <p style={{ marginBottom: '14px' }}>
                Dịp <strong>Năm Thánh 2000</strong>, Đức Giám mục Phaolô Bùi Văn Đọc đã chủ sự Thánh lễ long trọng Cung Hiến Nhà thờ Chánh Tòa. Năm 2006, đánh dấu kỷ niệm 100 năm ngày khởi công xây dựng ngôi thánh đường, Cha sở Giacôbê Hà Văn Xung cùng cộng đoàn đã tiến hành cuộc đại trùng tu: mở rộng cung thánh, tái thiết phòng thánh, lát sàn đá hoa cương, gia cố tháp chuông và kiến tạo khuôn viên với 14 Chặng Đàng Thánh Giá trang nghiêm.
              </p>
              <p>
                Khuôn viên nhà thờ còn có <strong>Đài Đức Mẹ</strong> và <strong>Tượng đài Lòng Chúa Thương Xót</strong> rợp bóng cây xanh mát, luôn là điểm hẹn linh thiêng cho giáo dân và bà con lương giáo đến cầu nguyện, tìm sự bình an và tĩnh lặng giữa lòng thành phố Mỹ Tho.
              </p>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHẦN GỐC 3: CÁC ĐỜI GIÁM MỤC COI SÓC GIÁO PHẬN */}
        {/* ========================================================================= */}
        {(activeTab === 'overview' || activeTab === 'bishops') && (
          <section style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '12px',
            padding: '24px 28px',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#B45309',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px'
            }}>
              HÀNG GIÁO PHẨM GIÁO PHẬN
            </div>
            <h2 style={{
              margin: '0 0 16px',
              fontSize: 'clamp(1.25rem, 2.6vw, 1.65rem)',
              fontWeight: 800,
              color: 'var(--color-dark)',
              borderBottom: '1px solid var(--color-border-subtle)',
              paddingBottom: '12px'
            }}>
              5. Các Đời Giám Mục Coi Sóc Giáo Phận Mỹ Tho
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {BISHOPS.map((b, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    padding: '20px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-btn-subtle-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap'
                  }}
                >
                  {/* Bishop Portrait Photo */}
                  <div style={{
                    flexShrink: 0,
                    width: '110px',
                    height: '145px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    border: '1px solid var(--color-border-subtle)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                    backgroundColor: '#1E293B',
                    margin: '0 auto'
                  }}>
                    <Image
                      src={b.image || '/images/bishop.jpg'}
                      alt={b.name}
                      fill
                      sizes="110px"
                      style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    />
                  </div>

                  {/* Bishop Details */}
                  <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.3 }}>
                          {b.name}
                        </h3>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#B71C1C', marginTop: '2px' }}>
                          {b.role}
                        </div>
                      </div>
                      <div style={{
                        padding: '4px 12px',
                        borderRadius: '14px',
                        backgroundColor: 'rgba(183, 28, 28, 0.08)',
                        color: '#B71C1C',
                        fontSize: '0.78rem',
                        fontWeight: 700
                      }}>
                        {b.years}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#B45309', fontWeight: 600 }}>
                      Khẩu hiệu Giám mục: {b.motto}
                    </div>

                    <p style={{ margin: '4px 0 0', fontSize: '0.92rem', color: 'var(--color-muted)', lineHeight: 1.7 }}>
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHẦN MỚI: PHONG TRÀO THIẾU NHI THÁNH THỂ VIỆT NAM (LỊCH SỬ & TÔN CHỈ) */}
        {/* ========================================================================= */}
        {(activeTab === 'overview' || activeTab === 'tntt') && (
          <section style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '12px',
            padding: '24px 28px',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {/* Header Banner */}
            <div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#B45309',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '6px'
              }}>
                PHONG TRÀO GIÁO DỤC THANH THIẾU NHI CÔNG GIÁO
              </div>
              <h2 style={{
                margin: 0,
                fontSize: 'clamp(1.2rem, 3.2vw, 1.6rem)',
                fontWeight: 900,
                color: 'var(--color-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Flame size={24} color="#B71C1C" />
                <span>Phong Trào Thiếu Nhi Thánh Thể Việt Nam</span>
              </h2>
              <p style={{
                margin: '8px 0 0',
                fontSize: '0.95rem',
                color: 'var(--color-muted)',
                lineHeight: 1.6
              }}>
                Phong trào Thiếu Nhi Thánh Thể (TNTT) là một đoàn thể Công giáo Tiến hành trực thuộc Giáo hội, có mục đích đào tạo giới trẻ thành những con người kiện toàn về nhân bản và những Kitô hữu đích thực, lấy <strong>Chúa Giêsu Thánh Thể</strong> làm trung tâm và lý tưởng sống.
              </p>
            </div>

            {/* 1. Bốn Cột Mốc Lịch Sử Hình Thành & Phát Triển */}
            <div>
              <div style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#B71C1C',
                textTransform: 'uppercase',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Clock size={16} />
                <span>Lịch Sử & Các Giai Đoạn Phát Triển</span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '14px'
              }}>
                <div style={{
                  padding: '16px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderLeft: '4px solid #B45309'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#B45309' }}>1844 – 1915</div>
                  <h4 style={{ margin: '4px 0 6px', fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                    Cội Nguồn Nghĩa Binh
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                    Bắt nguồn từ Hội Cầu Nguyện của các linh mục Dòng Tên tại Pháp. Sau Sắc chỉ <em>Quam Singulari (1910)</em> của Thánh Giáo hoàng Piô X cho phép trẻ em rước lễ sớm, phong trào <strong>Nghĩa Binh Thánh Thể (Eucharistic Crusade)</strong> chính thức được thành lập năm 1915 tại Pháp.
                  </p>
                </div>

                <div style={{
                  padding: '16px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderLeft: '4px solid #B71C1C'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#B71C1C' }}>1929 – 1964</div>
                  <h4 style={{ margin: '4px 0 6px', fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                    Du Nhập Vào Việt Nam
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                    Năm 1929, hai linh mục Dòng Xuân Bích (Cha Léon Palliard và Cha Paul Nguyễn Văn Định) thành lập Xứ đoàn Nghĩa Binh Thánh Thể đầu tiên tại <strong>Giáo xứ Hàm Long, Hà Nội</strong>. Phong trào nhanh chóng lan rộng khắp các giáo phận miền Bắc và miền Nam.
                  </p>
                </div>

                <div style={{
                  padding: '16px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderLeft: '4px solid #1D4ED8'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1D4ED8' }}>1965 – 1975</div>
                  <h4 style={{ margin: '4px 0 6px', fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                    Đổi Tên Thành Phong Trào TNTT
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                    Năm 1965, Hội Đồng Giám Mục Việt Nam chính thức phê chuẩn Nội quy mới, đổi tên thành <strong>Phong Trào Thiếu Nhi Thánh Thể Việt Nam</strong>. Đại hội Toàn quốc <em>Về Đất Hứa 1</em> năm 1972 tại Bình Triệu (Sài Gòn) quy tụ hơn 2.000 Huynh Trưởng trên cả nước.
                  </p>
                </div>

                <div style={{
                  padding: '16px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderLeft: '4px solid #059669'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669' }}>1975 – Nay</div>
                  <h4 style={{ margin: '4px 0 6px', fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                    Tái Thiết Lập & Phát Triển
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                    Phong trào tiếp tục phát triển mạnh mẽ tại cộng đoàn hải ngoại và được tái lập vững mạnh tại cả 27 Giáo phận Việt Nam, dưới sự đồng hành của Tổng Liên Đoàn TNTT Việt Nam nhận Thánh Tử Đạo <strong>Chân Phước Anrê Phú Yên</strong> làm Quan Thầy Huynh Trưởng.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Tôn Chỉ & Mục Đích */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px'
            }}>
              <div style={{
                padding: '18px',
                borderRadius: '10px',
                backgroundColor: 'rgba(183, 28, 28, 0.04)',
                border: '1px solid rgba(183, 28, 28, 0.15)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B71C1C', fontWeight: 800, fontSize: '1rem', marginBottom: '8px' }}>
                  <Target size={18} />
                  <span>TÔN CHỈ PHONG TRÀO</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                  Sống Lời Chúa và kết hiệp mật thiết với Chúa Giêsu Thánh Thể trong đời sống cầu nguyện, rước lễ, hy sinh và làm tông đồ dưới sự hướng dẫn của Giáo hội.
                </p>
              </div>

              <div style={{
                padding: '18px',
                borderRadius: '10px',
                backgroundColor: 'rgba(37, 99, 235, 0.04)',
                border: '1px solid rgba(37, 99, 235, 0.15)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1D4ED8', fontWeight: 800, fontSize: '1rem', marginBottom: '8px' }}>
                  <Award size={18} />
                  <span>MỤC ĐÍCH ĐÀO TẠO</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                  <li><strong>Phương diện tự nhiên:</strong> Rèn luyện thể dục, trí dục, đức dục để trở thành những con người kiện toàn và công dân có ích cho xã hội.</li>
                  <li><strong>Phương diện siêu nhiên:</strong> Nuôi dưỡng đời sống ân sủng, đào tạo đức tin vững chắc để trở thành người Kitô hữu trưởng thành và tông đồ nhiệt thành.</li>
                </ul>
              </div>
            </div>

            {/* 3. Bốn Khẩu Hiệu Vàng */}
            <div>
              <div style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#B71C1C',
                textTransform: 'uppercase',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Sparkles size={16} />
                <span>Bốn Khẩu Hiệu Cốt Lõi Của Phong Trào</span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px'
              }}>
                <div style={{
                  padding: '14px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  textAlign: 'center',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>🕊️</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#B71C1C', marginBottom: '4px' }}>CẦU NGUYỆN</div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-subtle)', lineHeight: 1.4 }}>
                    Khởi đầu ngày sống và mọi hoạt động bằng việc kết hiệp tâm hồn cùng Chúa.
                  </p>
                </div>

                <div style={{
                  padding: '14px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  textAlign: 'center',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>🍞</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#D97706', marginBottom: '4px' }}>RƯỚC LỄ</div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-subtle)', lineHeight: 1.4 }}>
                    Tham dự Thánh lễ và đón rước Mình Thánh Chúa làm nguồn sống thiêng liêng.
                  </p>
                </div>

                <div style={{
                  padding: '14px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  textAlign: 'center',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>❤️</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#DC2626', marginBottom: '4px' }}>HY SINH</div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-subtle)', lineHeight: 1.4 }}>
                    Vui lòng đón nhận khó khăn, vác thập giá nhỏ mỗi ngày để phục vụ tha nhân.
                  </p>
                </div>

                <div style={{
                  padding: '14px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  textAlign: 'center',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>🌟</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2563EB', marginBottom: '4px' }}>LÀM TÔNG ĐỒ</div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-subtle)', lineHeight: 1.4 }}>
                    Làm chứng nhân Tin Mừng bằng đời sống gương mẫu nơi gia đình và trường lớp.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Cơ Cấu Phân Ngành & Khăn Quàng */}
            <div>
              <div style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#B71C1C',
                textTransform: 'uppercase',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Users size={16} />
                <span>Cơ Cấu Các Ngành & Ý Nghĩa Khăn Quàng</span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '10px'
              }}>
                <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'rgba(236, 72, 153, 0.08)', border: '1px solid rgba(236, 72, 153, 0.25)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ color: '#BE185D', fontSize: '0.92rem' }}>Ngành Chiên Con</strong>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#FDF2F8', color: '#BE185D' }}>4 – 6 tuổi</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-dark)', fontWeight: 600 }}>Khăn Hồng • Khẩu hiệu: <em>Hiền Lành</em></div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '2px' }}>Tượng trưng cho sự ngây thơ, đơn sơ và trong trắng của trẻ thơ.</div>
                </div>

                <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ color: '#047857', fontSize: '0.92rem' }}>Ngành Ấu Nhi</strong>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#ECFDF5', color: '#047857' }}>7 – 9 tuổi</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-dark)', fontWeight: 600 }}>Khăn Xanh Lá • Khẩu hiệu: <em>Vâng Lời</em></div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '2px' }}>Màu xanh tươi của mầm non đang vươn mình lớn lên trong tình thương.</div>
                </div>

                <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.25)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ color: '#1D4ED8', fontSize: '0.92rem' }}>Ngành Thiếu Nhi</strong>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>10 – 12 tuổi</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-dark)', fontWeight: 600 }}>Khăn Xanh Biển • Khẩu hiệu: <em>Hy Sinh</em></div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '2px' }}>Màu trời xanh rộng lớn biểu trưng cho lý tưởng cao đẹp và lòng kiên trì.</div>
                </div>

                <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'rgba(217, 119, 6, 0.08)', border: '1px solid rgba(217, 119, 6, 0.25)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ color: '#B45309', fontSize: '0.92rem' }}>Ngành Nghĩa Sĩ</strong>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#FFFBEB', color: '#B45309' }}>13 – 15 tuổi</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-dark)', fontWeight: 600 }}>Khăn Vàng Nghệ • Khẩu hiệu: <em>Chinh Phục</em></div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '2px' }}>Ánh bình minh rạng rỡ của tuổi trẻ dấn thân mở mang Nước Chúa.</div>
                </div>

                <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'rgba(120, 53, 15, 0.08)', border: '1px solid rgba(120, 53, 15, 0.25)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ color: '#78350F', fontSize: '0.92rem' }}>Ngành Hiệp Sĩ</strong>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#FEF3C7', color: '#78350F' }}>16 – 17 tuổi</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-dark)', fontWeight: 600 }}>Khăn Nâu Đất • Khẩu hiệu: <em>Dấn Thân</em></div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '2px' }}>Màu đất mẹ phù sa, sẵn sàng phục vụ và hòa mình vào đời sống xã hội.</div>
                </div>

                <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'rgba(183, 28, 28, 0.08)', border: '1px solid rgba(183, 28, 28, 0.25)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ color: '#B71C1C', fontSize: '0.92rem' }}>Huynh Trưởng / Trợ Tá</strong>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#FEF2F2', color: '#B71C1C' }}>18 tuổi trở lên</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-dark)', fontWeight: 600 }}>Khăn Đỏ Viền Vàng • Khẩu hiệu: <em>Phụng Sự</em></div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '2px' }}>Màu máu tử đạo và nhiệt huyết hy sinh vô vị lợi vì các em thiếu nhi.</div>
                </div>
              </div>
            </div>

            {/* 5. Xứ Đoàn Các Thánh Tử Đạo Việt Nam - Gx. Chánh Tòa Mỹ Tho */}
            <div style={{
              padding: '18px 20px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-btn-subtle-bg)',
              border: '1px solid var(--color-border-subtle)',
              borderLeft: '4px solid #B71C1C'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B71C1C', fontWeight: 800, fontSize: '1.05rem', marginBottom: '6px' }}>
                <ShieldCheck size={20} />
                <span>Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Gx. Chánh Tòa Mỹ Tho</span>
              </div>
              <p style={{ margin: '0 0 10px', fontSize: '0.92rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                Là chiếc nôi rèn luyện đức tin và nhân bản cho các thế hệ thanh thiếu nhi tại trung tâm Giáo phận Mỹ Tho. Xứ đoàn quy tụ hàng trăm đoàn sinh thuộc các ngành Chiên Con, Ấu Nhi, Thiếu Nhi, Nghĩa Sĩ cùng Ban Huynh Trưởng nhiệt thành dưới sự coi sóc trực tiếp của Cha Sở và Quý Cha Tuyên úy.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '3px 10px', borderRadius: '4px', backgroundColor: 'rgba(183, 28, 28, 0.08)', color: '#B71C1C' }}>
                  ⛪ Thánh lễ Thiếu Nhi Sáng Chúa Nhật
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '3px 10px', borderRadius: '4px', backgroundColor: 'rgba(183, 28, 28, 0.08)', color: '#B71C1C' }}>
                  📚 Huấn Luyện Giáo Lý & Nhân Bản
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '3px 10px', borderRadius: '4px', backgroundColor: 'rgba(183, 28, 28, 0.08)', color: '#B71C1C' }}>
                  ⛺ Sa Mạc & Trại Hè Rèn Luyện Kỹ Năng
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '3px 10px', borderRadius: '4px', backgroundColor: 'rgba(183, 28, 28, 0.08)', color: '#B71C1C' }}>
                  🤝 Hoạt Động Tông Đồ Bác Ái Xã Hội
                </span>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHẦN GỐC 4: THƯ VIỆN HÌNH ẢNH THỰC TẾ (100% ẢNH THẬT) */}
        {/* ========================================================================= */}
        {(activeTab === 'overview' || activeTab === 'gallery') && (
          <section style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '12px',
            padding: '24px 28px',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#B45309',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px'
            }}>
              TƯ LIỆU HÌNH ẢNH THỰC TẾ
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '12px' }}>
              <div>
                <h2 style={{
                  margin: 0,
                  fontSize: 'clamp(1.25rem, 2.6vw, 1.65rem)',
                  fontWeight: 800,
                  color: 'var(--color-dark)'
                }}>
                  6. Thư Viện Hình Ảnh Thực Tế Giáo Hội, Giáo Phận & Chánh Tòa Mỹ Tho
                </h2>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-subtle)', marginTop: '4px' }}>
                  Tổng hợp {REAL_GALLERY_IMAGES.length} hình ảnh tư liệu chân thực từ Tòa Thánh, HĐGMVN, Giáo phận Mỹ Tho & Giáo xứ Chánh Tòa.
                </div>
              </div>
            </div>

            {/* Gallery Category Filter Tabs */}
            <div style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '12px',
              marginBottom: '16px'
            }}>
              {[
                { id: 'all', label: `Tất Cả (${REAL_GALLERY_IMAGES.length})` },
                { id: 'vatican', label: 'Tòa Thánh' },
                { id: 'vietnam', label: 'Giáo Hội VN' },
                { id: 'exterior', label: 'Kiến Trúc & Ngoại Thất' },
                { id: 'interior', label: 'Cung Thánh & Nội Thất' },
                { id: 'liturgy', label: 'Phụng Vụ & Thánh Lễ' },
                { id: 'grounds', label: 'Khuôn Viên & Đền Đài' },
                { id: 'community', label: 'Sinh Hoạt Cộng Đoàn' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setGalleryFilter(f.id as any)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    backgroundColor: galleryFilter === f.id ? '#B71C1C' : 'var(--color-btn-subtle-bg)',
                    color: galleryFilter === f.id ? '#FFFFFF' : 'var(--color-dark)',
                    border: 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: '16px'
            }}>
              {filteredPhotos.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  style={{
                    backgroundColor: 'var(--color-card-bg)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border-subtle)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '180px', backgroundColor: '#1E293B' }}>
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 260px"
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      color: '#FFFFFF',
                      borderRadius: '4px',
                      padding: '2px 6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.7rem'
                    }}>
                      <Maximize2 size={12} />
                      <span>Xem</span>
                    </div>
                  </div>
                  <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B71C1C', textTransform: 'uppercase', marginBottom: '2px' }}>
                        {img.categoryLabel}
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.3 }}>
                        {img.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '4px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {img.desc}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--color-subtle)', marginTop: '8px', borderTop: '1px dashed var(--color-border-subtle)', paddingTop: '4px' }}>
                      Nguồn: {img.source}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHẦN GỐC 5: BẢN ĐỒ & THÔNG TIN LIÊN HỆ */}
        {/* ========================================================================= */}
        <section style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          padding: '24px 28px',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#B45309',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '6px'
          }}>
            CHỈ ĐƯỜNG & LIÊN HỆ
          </div>
          <h2 style={{
            margin: '0 0 16px',
            fontSize: 'clamp(1.25rem, 2.6vw, 1.65rem)',
            fontWeight: 800,
            color: 'var(--color-dark)',
            borderBottom: '1px solid var(--color-border-subtle)',
            paddingBottom: '12px'
          }}>
            7. Vị Trí & Bản Đồ Chỉ Đường
          </h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.95rem', color: 'var(--color-dark)' }}>
                <strong>Địa chỉ:</strong> 32 Hùng Vương, Phường Mỹ Tho, Tỉnh Tiền Giang
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                Cách trung tâm TP. Hồ Chí Minh khoảng 70 km theo Quốc lộ 1A hoặc Đường cao tốc Trung Lương.
              </div>
            </div>

            <a
              href="https://www.google.com/maps/place/Nh%C3%A0+th%E1%BB%9D+ch%C3%A1nh+t%C3%B2a+%C4%90%C6%B0%CC%81c+M%E1%BA%B9+V%C3%B4+Nhi%E1%BB%85m+Nguy%C3%AAn+T%E1%BB%99i-+Gia%CC%81o+ph%C3%A2%CC%A3n+M%E1%BB%B9+Tho/@10.3614549,106.3623779,17z"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
                color: '#ffffff',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(211, 47, 47, 0.3)'
              }}
            >
              <MapPin size={16} />
              <span>Mở Chỉ Đường Google Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div style={{ width: '100%', height: '360px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--color-border-subtle)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.755118502476!2d106.3623778754807!3d10.36145486670997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aafe61b74b32d%3A0xfe316f3333368f55!2zTmjDoCB0aOG7nSBjaMOhbmggdMOyYSDEkMawzIFjIE3hurkgVsO0IE5oaeG7hW0gTmd1ecOqbiBU4buZaS0gR2lhzIFvIHBow6LMo24gTeG7uSBUaG8!5e0!3m2!1svi!2s!4v1787901565429!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </section>

      </div>

      {/* FULLSCREEN PHOTO LIGHTBOX MODAL */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '920px',
              width: '100%',
              backgroundColor: '#111827',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            {/* Main Photo Display */}
            <div style={{ position: 'relative', width: '100%', height: 'min(65vh, 520px)', backgroundColor: '#000000' }}>
              <Image
                src={filteredPhotos[selectedPhotoIndex].src}
                alt={filteredPhotos[selectedPhotoIndex].title}
                fill
                sizes="920px"
                style={{ objectFit: 'contain' }}
              />

              {/* Prev / Next Navigation Buttons */}
              {filteredPhotos.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNextPhoto}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Photo Info Caption */}
            <div style={{ padding: '16px 20px', backgroundColor: '#1F2937', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: '#B71C1C',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textTransform: 'uppercase'
                }}>
                  {filteredPhotos[selectedPhotoIndex].categoryLabel}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>
                  {selectedPhotoIndex + 1} / {filteredPhotos.length}
                </div>
              </div>
              <h3 style={{ margin: '8px 0 4px', fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF' }}>
                {filteredPhotos[selectedPhotoIndex].title}
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#D1D5DB', lineHeight: 1.6 }}>
                {filteredPhotos[selectedPhotoIndex].desc}
              </p>
              <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '6px' }}>
                Nguồn ảnh: {filteredPhotos[selectedPhotoIndex].source}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
