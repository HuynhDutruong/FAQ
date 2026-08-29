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

// Khăn Quàng Thiếu Nhi Thánh Thể Việt Nam
const TNTT_SCARVES = [
  {
    id: 'au-nhi',
    name: 'Khăn Ngành Ấu Nhi (Chiên Con)',
    age: '4 – 9 tuổi',
    motto: 'Vâng Lời',
    colorName: 'Màu Xanh Lá Mạ',
    mainColor: '#16A34A',
    borderColor: '#FBBF24',
    crossColor: '#FBBF24',
    symbolism: 'Màu của chồi non xanh tươi, tượng trưng cho tâm hồn đơn sơ, ngây thơ, luôn biết lắng nghe và vâng lời cha mẹ như Chúa Giêsu thời thơ ấu tại Nadarét.',
    badgeLabel: 'ẤU NHI'
  },
  {
    id: 'thieu-nhi',
    name: 'Khăn Ngành Thiếu Nhi',
    age: '10 – 12 tuổi',
    motto: 'Hy Sinh',
    colorName: 'Màu Xanh Dương (Viền Vàng)',
    mainColor: '#1D4ED8',
    borderColor: '#FBBF24',
    crossColor: '#FBBF24',
    symbolism: 'Màu xanh dương của bầu trời bao la và biển rộng, viền vàng của ánh sáng. Tượng trưng cho tâm hồn trong trắng, tinh thần vui tươi, cởi mở và sẵn sàng hy sinh vì tha nhân.',
    badgeLabel: 'THIẾU NHI'
  },
  {
    id: 'nghia-si',
    name: 'Khăn Ngành Nghĩa Sĩ',
    age: '13 – 15 tuổi',
    motto: 'Chinh Phục',
    colorName: 'Màu Vàng Tươi (Viền Đỏ)',
    mainColor: '#FACC15',
    borderColor: '#DC2626',
    crossColor: '#DC2626',
    textColor: '#991B1B',
    symbolism: 'Màu vàng tươi của ánh bình minh rực rỡ và mùa gặt lúa chín, viền màu đỏ của lửa nhiệt huyết. Tượng trưng cho ý chí kiên định, lòng dũng cảm chinh phục thử thách và làm chứng cho Chân Lý.',
    badgeLabel: 'NGHĨA SĨ'
  },
  {
    id: 'hiep-si',
    name: 'Khăn Ngành Hiệp Sĩ',
    age: '16 – 18 tuổi',
    motto: 'Dấn Thân',
    colorName: 'Màu Nâu Đất (Viền Vàng)',
    mainColor: '#78350F',
    borderColor: '#FBBF24',
    crossColor: '#FBBF24',
    symbolism: 'Màu của đất mẹ phì nhiêu, viền vàng của ánh sáng. Biểu thị đức tính khiêm tốn, bền bỉ, kiên nhẫn và tinh thần dấn thân phục vụ Giáo xứ và xã hội.',
    badgeLabel: 'HIỆP SĨ'
  },
  {
    id: 'huynh-truong',
    name: 'Khăn Huynh Trưởng & Dự Trưởng',
    age: 'Từ 18 tuổi',
    motto: 'Phụng Sự',
    colorName: 'Màu Đỏ Tươi (Viền Vàng)',
    mainColor: '#B71C1C',
    borderColor: '#FBBF24',
    crossColor: '#FBBF24',
    symbolism: 'Màu đỏ của Máu Thánh Tử Đạo và Lửa Thánh Thần, viền vàng của vinh quang Nước Chúa. Biểu trưng cho lòng mến nồng nàn, tinh thần lãnh đạo đầy tinh thần phục vụ và hy sinh vô vị lợi.',
    badgeLabel: 'HUYNH TRƯỞNG'
  },
  {
    id: 'tro-ta',
    name: 'Khăn Trợ Tá (Phụ Huynh & Cố Vấn)',
    age: 'Phụ huynh & Ân nhân',
    motto: 'Nhiệt Thành',
    colorName: 'Màu Đỏ Tươi (Viền Trắng)',
    mainColor: '#B71C1C',
    borderColor: '#FFFFFF',
    crossColor: '#FFFFFF',
    symbolism: 'Màu đỏ nhiệt thành của tình yêu thương gia đình, viền trắng của lòng vị tha trong sáng, luôn đồng hành nâng đỡ phong trào về mọi mặt.',
    badgeLabel: 'TRỢ TÁ'
  },
  {
    id: 'tuyen-uy',
    name: 'Khăn Tuyên Úy & Trợ Úy',
    age: 'Linh mục & Tu sĩ',
    motto: 'Tận Tụy',
    colorName: 'Màu Trắng (Viền Vàng)',
    mainColor: '#FFFFFF',
    borderColor: '#D97706',
    crossColor: '#D97706',
    textColor: '#1E293B',
    symbolism: 'Màu trắng tinh tuyền của Chúa Kitô Linh Mục và Bánh Thánh Thể, viền vàng của vương quyền mục tử. Đại diện Chúa Kitô chăm sóc và nuôi dưỡng đoàn chiên.',
    badgeLabel: 'TUYÊN ÚY'
  }
];

// SVG Icon mô phỏng Khăn Quàng TNTT chuẩn mực
function ScarfVisualBadge({
  mainColor,
  borderColor,
  crossColor,
  size = 56
}: {
  mainColor: string;
  borderColor: string;
  crossColor: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 100 85" fill="none" style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.15))' }}>
      {/* Thân khăn tam giác */}
      <polygon points="10,10 90,10 50,78" fill={mainColor} stroke={borderColor} strokeWidth="6" strokeLinejoin="round" />
      {/* Thánh Giá biểu tượng sau lưng khăn */}
      <rect x="46" y="24" width="8" height="24" rx="2" fill={crossColor} />
      <rect x="38" y="30" width="24" height="8" rx="2" fill={crossColor} />
    </svg>
  );
}

interface RealPhoto {
  src: string;
  title: string;
  desc: string;
  category: 'cathedral' | 'vatican' | 'liturgy' | 'community';
  categoryLabel: string;
  source: string;
}

const REAL_GALLERY_IMAGES: RealPhoto[] = [
  // 1. Giáo Xứ Chánh Tòa Mỹ Tho
  {
    src: '/images/nhatho1.jpg',
    title: 'Mặt Tiền Nhà Thờ Chánh Tòa Mỹ Tho',
    desc: 'Kiến trúc Gothic - Rôma Phục Hưng uy nghiêm với tháp chuông cao vút tại trung tâm số 32 đường Hùng Vương, TP. Mỹ Tho.',
    category: 'cathedral',
    categoryLabel: 'Chánh Tòa Mỹ Tho',
    source: 'Tư liệu Giáo xứ Chánh Tòa'
  },
  {
    src: '/images/nhatho2.jpg',
    title: 'Toàn Cảnh Thánh Đường Chánh Tòa (Góc Nghiêng)',
    desc: 'Toàn cảnh ngôi Thánh Đường cổ kính hơn 115 năm tuổi rợp bóng mát cây xanh bên bờ sông Tiền hiền hòa.',
    category: 'cathedral',
    categoryLabel: 'Chánh Tòa Mỹ Tho',
    source: 'Tư liệu Giáo phận Mỹ Tho'
  },
  {
    src: '/images/nhatho_thanh_le.jpg',
    title: 'Cung Thánh & Bàn Thờ Tôn Nghiêm',
    desc: 'Không gian cung thánh trang nghiêm, nơi Đức Giám Mục Giáo phận và các Linh mục cử hành các đại lễ phụng vụ trọng thể.',
    category: 'cathedral',
    categoryLabel: 'Chánh Tòa Mỹ Tho',
    source: 'Tư liệu Giáo xứ Chánh Tòa'
  },
  {
    src: '/images/nhatho3.jpg',
    title: 'Khung Vòm Kiến Trúc Gothic - Phục Hưng',
    desc: 'Hệ thống cửa sổ vòm cuốn cùng các bức tranh kính màu nghệ thuật diễn tả cuộc đời Chúa Giêsu và Mẹ Maria.',
    category: 'cathedral',
    categoryLabel: 'Chánh Tòa Mỹ Tho',
    source: 'Tư liệu Giáo xứ Chánh Tòa'
  },
  {
    src: '/images/nhatho4.jpg',
    title: 'Khuôn Viên & Tháp Chuông Nhà Thờ Chánh Tòa',
    desc: 'Tháp chuông độc lập cao 24m ngân vang từng hồi chuông trầm bổng báo hiệu giờ lễ và kinh nguyện cho toàn thành phố.',
    category: 'cathedral',
    categoryLabel: 'Chánh Tòa Mỹ Tho',
    source: 'Tư liệu Giáo xứ Chánh Tòa'
  },
  {
    src: '/images/nhatho_dai_duc_me.jpg',
    title: 'Đài Đức Mẹ Trong Khuôn Viên Chánh Tòa',
    desc: 'Nơi cộng đoàn giáo dân và khách hành hương đến dâng hoa, đọc kinh Mân Côi và khấn xin cùng Mẹ Maria.',
    category: 'cathedral',
    categoryLabel: 'Chánh Tòa Mỹ Tho',
    source: 'Tư liệu Giáo xứ Chánh Tòa'
  },
  {
    src: '/images/nhatho_bung_binh.jpg',
    title: 'Ngã Ba Hùng Vương Trước Cổng Nhà Thờ',
    desc: 'Vị trí đắc địa tại giao lộ trung tâm thành phố Mỹ Tho, biểu tượng văn hóa tôn giáo trăm năm của địa phương.',
    category: 'cathedral',
    categoryLabel: 'Chánh Tòa Mỹ Tho',
    source: 'Tư liệu Giáo xứ Chánh Tòa'
  },
  {
    src: '/images/nhatho_mat_tien_vintage.jpg',
    title: 'Tư Liệu Ảnh Cổ Nhà Thờ Chánh Tòa (Thế Kỷ XX)',
    desc: 'Hình ảnh tư liệu lịch sử quý giá ghi lại diện mạo Nhà Thờ Chánh Tòa qua các giai đoạn thăng trầm của lịch sử.',
    category: 'cathedral',
    categoryLabel: 'Chánh Tòa Mỹ Tho',
    source: 'Lưu trữ Giáo phận Mỹ Tho'
  },

  // 2. Phụng Vụ & Thánh Lễ
  {
    src: '/images/thanh_le_dong_te_my_tho.jpg',
    title: 'Đại Lễ Đồng Tế Linh Mục Đoàn Tại Cung Thánh',
    desc: 'Đức Cha Phêrô Nguyễn Văn Khảm cùng linh mục đoàn toàn giáo phận dâng Thánh lễ Tạ ơn và Truyền Dầu.',
    category: 'liturgy',
    categoryLabel: 'Phụng Vụ & Thánh Lễ',
    source: 'giaophanmytho.net'
  },
  {
    src: '/images/ruoc_le_cung_thanh.jpg',
    title: 'Nghi Thức Rước Lễ Phụng Vụ Trang Nghiêm',
    desc: 'Nghi thức phụng vụ Lời Chúa và Thánh Thể diễn ra sốt sắng theo quy chuẩn Phụng vụ Tòa Thánh.',
    category: 'liturgy',
    categoryLabel: 'Phụng Vụ & Thánh Lễ',
    source: 'giaophanmytho.net'
  },
  {
    src: '/images/duc_cha_giang_thuyet.jpg',
    title: 'Đức Giám Mục Chủ Tế & Giảng Thuyết',
    desc: 'Đức Cha Phêrô Nguyễn Văn Khảm chia sẻ Lời Chúa, nuôi dưỡng đức tin cho cộng đoàn phụng vụ.',
    category: 'liturgy',
    categoryLabel: 'Phụng Vụ & Thánh Lễ',
    source: 'giaophanmytho.net'
  },

  // 3. Sinh Hoạt Cộng Đoàn & TNTT
  {
    src: '/images/hiep_thong_giao_dan.jpg',
    title: 'Cộng Đoàn Hiệp Thông & Đời Sống Đức Tin',
    desc: 'Bà con giáo dân, huynh trưởng và thiếu nhi các hội đoàn tề tựu tham dự các sự kiện mục vụ và học hỏi giáo lý.',
    category: 'community',
    categoryLabel: 'Sinh Hoạt Giáo Xứ',
    source: 'Tư liệu Giáo phận Mỹ Tho'
  },
  {
    src: '/images/chuc_mung_giam_muc.jpg',
    title: 'Cộng Đoàn Chúc Mừng Đức Giám Mục',
    desc: 'Đại diện các hội đoàn và thiếu nhi trong giáo xứ chúc mừng Đức Cha nhân dịp đại lễ bổn mạng.',
    category: 'community',
    categoryLabel: 'Sinh Hoạt Giáo Xứ',
    source: 'giaophanmytho.net'
  },
  {
    src: '/images/ca_doan_phung_vu.jpg',
    title: 'Ca Đoàn Phụng Vụ Thánh Ca Chánh Tòa',
    desc: 'Ca đoàn cất cao lời ca tiếng hát du dương dâng lên Thiên Chúa và Mẹ Maria trong các Thánh Lễ.',
    category: 'community',
    categoryLabel: 'Sinh Hoạt Giáo Xứ',
    source: 'Ca đoàn Chánh Tòa Mỹ Tho'
  },
  {
    src: '/images/cong_doan_phung_vu.jpg',
    title: 'Cộng Đoàn Dân Chúa Hiệp Thông Sốt Sắng',
    desc: 'Đông đảo quý tu sĩ nam nữ, chủng sinh và bà con giáo dân tham dự thánh lễ tạ ơn Thiên Chúa.',
    category: 'community',
    categoryLabel: 'Sinh Hoạt Giáo Xứ',
    source: 'giaophanmytho.net'
  },
  {
    src: '/images/linh_muc_doan_my_tho.jpg',
    title: 'Linh Mục Đoàn Giáo Phận Mỹ Tho',
    desc: 'Quý Cha trong linh mục đoàn toàn giáo phận tề tựu trong tinh thần hiệp thông huynh đệ.',
    category: 'community',
    categoryLabel: 'Sinh Hoạt Giáo Xứ',
    source: 'giaophanmytho.net'
  },

  // 4. Tòa Thánh & Giáo Hội
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
    category: 'vatican',
    categoryLabel: 'Giáo Hội Việt Nam',
    source: 'HĐGMVN (hdgmvietnam.com)'
  }
];

const SECTIONS = [
  { id: 'vatican', label: 'Tòa Thánh Vatican', icon: Globe },
  { id: 'vietnam', label: 'Giáo Hội Việt Nam', icon: Cross },
  { id: 'diocese', label: 'Giáo Phận Mỹ Tho', icon: ShieldCheck },
  { id: 'bishops', label: '5 Đời Giám Mục', icon: Award },
  { id: 'cathedral', label: 'Chánh Tòa Mỹ Tho', icon: Church },
  { id: 'tntt', label: 'Khăn Quàng TNTT', icon: Flame },
  { id: 'gallery', label: 'Thư Viện Ảnh (18)', icon: Layers }
];

export default function GioiThieuPage() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'cathedral' | 'liturgy' | 'community' | 'vatican'>('all');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredGallery = REAL_GALLERY_IMAGES.filter((p) => {
    if (galleryFilter === 'all') return true;
    return p.category === galleryFilter;
  });

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
      {/* 2. NAVIGATION PILLS (STICKY) */}
      {/* ========================================================================= */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backgroundColor: 'var(--color-card-bg)',
          borderBottom: '1px solid var(--color-border-subtle)',
          padding: '8px 12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto',
            scrollbarWidth: 'none'
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
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: 'var(--color-input-bg)',
                  color: 'var(--color-dark)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
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
      {/* 3. MAIN CONTENT BODY */}
      {/* ========================================================================= */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '20px 14px 64px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          width: '100%'
        }}
      >
        {/* ========================================================================= */}
        {/* PHẦN 1: TÒA THÁNH VATICAN */}
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
            TRUNG TÂM GIÁO HỘI TOÀN CẦU
          </div>
          <h2 style={{ margin: '0 0 14px', fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
            1. Tòa Thánh Vatican &amp; Đức Giáo Hoàng
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              alignItems: 'start'
            }}
          >
            {/* Ảnh St. Peter */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/10',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'var(--color-input-bg)',
                border: '1px solid var(--color-border-subtle)'
              }}
            >
              <Image
                src="/images/vatican_st_peter.jpg"
                alt="Quảng trường & Đền thờ Thánh Phêrô Vatican"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)'
                }}
              />
              <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px', color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 800 }}>
                Vương Cung Thánh Đường Thánh Phêrô (Rôma)
              </div>
            </div>

            {/* Bài viết */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', lineHeight: 1.7, color: 'var(--color-dark)' }}>
              <p style={{ margin: 0 }}>
                <strong>Thành quốc Vatican</strong> (Stato della Città del Vaticano) là quốc gia độc lập nhỏ nhất thế giới tọa lạc tại Rôma (Ý), là trung tâm đầu não thiêng liêng của hơn <strong>1,38 tỷ tín hữu Công giáo</strong> trên toàn địa cầu.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Vị thế Đức Thánh Cha:</strong> Đức Giáo hoàng là Giám mục Rôma, Đấng kế vị Thánh Phêrô Tông Đồ, là Thủ lãnh hữu hình của Hội Thánh hoàn vũ và là Cha chung của toàn thể Dân Chúa.
              </p>
              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  borderLeft: '3px solid #D4AF37',
                  fontSize: '0.8rem',
                  lineHeight: 1.5
                }}
              >
                <div style={{ fontWeight: 800, color: '#B45309', marginBottom: '2px' }}>Đức Thánh Cha Lêô XIV (Leo XIV)</div>
                <div>Vị Giáo hoàng thứ 267 của Giáo Hội Công Giáo Rôma (Tựu nhiệm: 08/05/2025).</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN 2: GIÁO HỘI CÔNG GIÁO VIỆT NAM */}
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
            HÀNG GIÁO PHẨM VIỆT NAM
          </div>
          <h2 style={{ margin: '0 0 14px', fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
            2. Giáo Hội Công Giáo Việt Nam &amp; 3 Giáo Tỉnh
          </h2>

          <div style={{ fontSize: '0.86rem', lineHeight: 1.7, color: 'var(--color-dark)', marginBottom: '14px' }}>
            Hạt giống Tin Mừng được gieo vào đất Việt từ thế kỷ XVI (năm 1533). Ngày <strong>24/11/1960</strong>, Thánh Giáo hoàng Gioan XXIII ban hành Tông hiến <em>Venerabilium Nostrorum</em> chính thức thiết lập <strong>Hàng Giáo phẩm Việt Nam</strong> với 3 Giáo tỉnh gồm 27 Giáo phận:
          </div>

          {/* 3 Giáo Tỉnh Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
            {DIOCESES_3_PROVINCES.map((prov, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-input-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 900, color: 'var(--color-red)' }}>
                    {prov.province}
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px', backgroundColor: 'rgba(183, 28, 28, 0.1)', color: 'var(--color-red)' }}>
                    {prov.count}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-dark)', lineHeight: 1.5 }}>
                  {prov.list}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN 3: GIÁO PHẬN MỸ THO */}
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
            GIÁO PHẬN ĐỊA PHƯƠNG
          </div>
          <h2 style={{ margin: '0 0 14px', fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
            3. Giáo Phận Mỹ Tho (Thành lập 1960)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', lineHeight: 1.7, color: 'var(--color-dark)' }}>
            <p style={{ margin: 0 }}>
              <strong>Địa bàn mục vụ:</strong> Giáo phận Mỹ Tho trải dài trên địa bàn 3 tỉnh Tây Nam Bộ: <strong>Tiền Giang, Long An</strong> và 2/3 tỉnh <strong>Đồng Tháp</strong>, với diện tích tự nhiên khoảng 9.262 km².
            </p>
            <p style={{ margin: 0 }}>
              <strong>Tổ chức hạt mục vụ:</strong> Toàn giáo phận hiện được chia thành <strong>6 Giáo hạt</strong>: Hạt Mỹ Tho, Hạt Cái Bè, Hạt Tân An, Hạt Đức Hòa, Hạt Thạnh Hóa và Hạt Cao Lãnh, quy tụ hơn 110 giáo xứ và hơn 130.000 tín hữu.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Bổn mạng Giáo phận:</strong> Thánh Giuse Bạn Trăm Năm Đức Maria (kính ngày 19/03).
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN 4: 5 ĐỜI GIÁM MỤC */}
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
            CÁC VỊ CHỦ CHĂN GIÁO PHẬN
          </div>
          <h2 style={{ margin: '0 0 14px', fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
            4. Năm Đời Giám Mục Giáo Phận Mỹ Tho (1960 – Nay)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {BISHOPS.map((b, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-input-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                {/* Bishop Portrait Image (FULL COVER, NO BLACK LETTERBOX) */}
                <div
                  style={{
                    position: 'relative',
                    width: '88px',
                    height: '115px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    backgroundColor: 'var(--color-bg)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  <Image
                    src={b.image}
                    alt={b.name}
                    fill
                    sizes="88px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
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
        {/* PHẦN 5: NHÀ THỜ CHÁNH TÒA MỸ THO (ALBUM ĐẶC SẮC) */}
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
            5. Nhà Thờ Chánh Tòa Đức Mẹ Vô Nhiễm Nguyên Tội Mỹ Tho
          </h2>

          {/* Ảnh lớn mặt tiền thánh đường (FULL COVER) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '14px',
              overflow: 'hidden',
              marginBottom: '16px',
              backgroundColor: 'var(--color-bg)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
            }}
          >
            <Image
              src="/images/nhatho1.jpg"
              alt="Nhà Thờ Chánh Tòa Mỹ Tho"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 900px"
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
              }}
            />
            <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px', color: '#FFFFFF' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FDE68A', textTransform: 'uppercase' }}>
                TRUNG TÂM PHỤNG VỤ &amp; HÀNH HƯƠNG TRĂM NĂM
              </div>
              <div style={{ fontSize: 'clamp(1.05rem, 3vw, 1.35rem)', fontWeight: 900 }}>
                Nhà Thờ Chánh Tòa Mỹ Tho (Khởi công 1906 – Hoàn thành 1910)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', lineHeight: 1.7, color: 'var(--color-dark)', marginBottom: '16px' }}>
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

          {/* Bộ sưu tập hình ảnh Chánh Tòa Mỹ Tho */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-red)', marginBottom: '8px' }}>
              📸 Bộ Sưu Tập Ảnh Thực Tế Giáo Xứ Chánh Tòa:
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '8px'
              }}
            >
              {[
                { src: '/images/nhatho1.jpg', title: 'Mặt Tiền Nhà Thờ Chánh Tòa' },
                { src: '/images/nhatho_thanh_le.jpg', title: 'Cung Thánh Trang Nghiêm' },
                { src: '/images/nhatho2.jpg', title: 'Toàn Cảnh Góc Nghiêng' },
                { src: '/images/nhatho3.jpg', title: 'Khung Vòm Cổ Kính' },
                { src: '/images/nhatho4.jpg', title: 'Tháp Chuông 24m' },
                { src: '/images/nhatho_dai_duc_me.jpg', title: 'Đài Đức Mẹ' },
                { src: '/images/hiep_thong_giao_dan.jpg', title: 'Cộng Đoàn Hiệp Thông' },
                { src: '/images/chuc_mung_giam_muc.jpg', title: 'Chúc Mừng Đức Giám Mục' },
                { src: '/images/ca_doan_phung_vu.jpg', title: 'Ca Đoàn Thánh Ca' },
                { src: '/images/thanh_le_dong_te_my_tho.jpg', title: 'Đại Lễ Đồng Tế' },
                { src: '/images/nhatho_bung_binh.jpg', title: 'Ngã Ba Hùng Vương' },
                { src: '/images/nhatho_mat_tien_vintage.jpg', title: 'Tư Liệu Ảnh Cổ 1910' }
              ].map((img, i) => (
                <div
                  key={i}
                  onClick={() => {
                    const foundIdx = REAL_GALLERY_IMAGES.findIndex((p) => p.src === img.src);
                    if (foundIdx !== -1) setSelectedPhotoIndex(foundIdx);
                  }}
                  style={{
                    position: 'relative',
                    aspectRatio: '4/3',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    backgroundColor: 'var(--color-bg)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="150px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '6px',
                      right: '6px',
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {img.title}
                  </div>
                </div>
              ))}
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
                    backgroundColor: 'var(--color-input-bg)',
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
        {/* PHẦN 6: PHONG TRÀO THIẾU NHI THÁNH THỂ (BẢNG KHĂN QUÀNG ĐẦY ĐỦ) */}
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', lineHeight: 1.7, color: 'var(--color-dark)', marginBottom: '16px' }}>
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
                    padding: '8px 10px',
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

          {/* ========================================================================= */}
          {/* CÁC MÀU KHĂN QUÀNG THIẾU NHI THÁNH THỂ VIỆT NAM */}
          {/* ========================================================================= */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <Flame size={16} color="var(--color-red)" />
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: 'var(--color-dark)' }}>
                Ý Nghĩa Màu Khăn Quàng Các Ngành &amp; Đẳng Cấp TNTT
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
              {TNTT_SCARVES.map((sc) => (
                <div
                  key={sc.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-input-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                  }}
                >
                  {/* Visual Khăn Quàng Tam Giác SVG */}
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <ScarfVisualBadge
                      mainColor={sc.mainColor}
                      borderColor={sc.borderColor}
                      crossColor={sc.crossColor}
                      size={52}
                    />
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 900,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        backgroundColor: sc.mainColor,
                        color: sc.textColor || '#FFFFFF',
                        border: `1px solid ${sc.borderColor}`
                      }}
                    >
                      {sc.badgeLabel}
                    </span>
                  </div>

                  {/* Chi tiết ý nghĩa */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 900, color: sc.mainColor === '#FFFFFF' ? '#B45309' : sc.mainColor }}>
                        {sc.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.66rem',
                          fontWeight: 800,
                          padding: '1px 6px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(212, 175, 55, 0.15)',
                          color: '#B45309'
                        }}
                      >
                        {sc.motto}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '3px' }}>
                      Độ tuổi: <strong style={{ color: 'var(--color-red)' }}>{sc.age}</strong> • Khăn: {sc.colorName}
                    </div>

                    <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--color-text-subtle)', lineHeight: 1.4 }}>
                      {sc.symbolism}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN 7: THƯ VIỆN ẢNH THỰC TẾ (18 ẢNH CHẤT LƯỢNG CAO) */}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', marginBottom: '2px' }}>
                TƯ LIỆU HÌNH ẢNH TOÀN DIỆN
              </div>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)' }}>
                7. Thư Viện Ảnh Lịch Sử &amp; Phụng Vụ ({REAL_GALLERY_IMAGES.length} Ảnh)
              </h2>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', scrollbarWidth: 'none' }}>
              {[
                { id: 'all', label: 'Tất Cả' },
                { id: 'cathedral', label: 'Chánh Tòa (9)' },
                { id: 'liturgy', label: 'Phụng Vụ (3)' },
                { id: 'community', label: 'Sinh Hoạt (4)' },
                { id: 'vatican', label: 'Tòa Thánh (3)' }
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setGalleryFilter(f.id as any)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: galleryFilter === f.id ? 'var(--color-red)' : 'var(--color-border-subtle)',
                    backgroundColor: galleryFilter === f.id ? 'var(--color-red)' : 'var(--color-input-bg)',
                    color: galleryFilter === f.id ? '#FFFFFF' : 'var(--color-dark)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid (FULL COVER, NO BLACK LETTERBOXING) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '8px'
            }}
          >
            {filteredGallery.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => {
                  const actualIdx = REAL_GALLERY_IMAGES.findIndex((p) => p.src === photo.src);
                  setSelectedPhotoIndex(actualIdx);
                }}
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-bg)',
                  aspectRatio: '4/3',
                  cursor: 'pointer',
                  border: '1px solid var(--color-border-subtle)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
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
                    left: '8px',
                    right: '8px'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.58rem',
                      fontWeight: 800,
                      padding: '1px 5px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(183, 28, 28, 0.85)',
                      color: '#FFFFFF'
                    }}
                  >
                    {photo.categoryLabel}
                  </span>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginTop: '2px'
                    }}
                  >
                    {photo.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 4. LIGHTBOX MODAL (FULL COVER IMAGE, NO BLACK BORDERS) */}
      {/* ========================================================================= */}
      {selectedPhotoIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100005,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '680px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--color-card-bg)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(183, 28, 28, 0.1)',
                    color: 'var(--color-red)'
                  }}
                >
                  {REAL_GALLERY_IMAGES[selectedPhotoIndex].categoryLabel}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', fontWeight: 600 }}>
                  ({selectedPhotoIndex + 1} / {REAL_GALLERY_IMAGES.length})
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                style={{
                  background: 'var(--color-input-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  color: 'var(--color-dark)',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Photo Container (FULL BLEED COVER) */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/10',
                maxHeight: '60vh',
                overflow: 'hidden',
                backgroundColor: 'var(--color-bg)'
              }}
            >
              <Image
                src={REAL_GALLERY_IMAGES[selectedPhotoIndex].src}
                alt={REAL_GALLERY_IMAGES[selectedPhotoIndex].title}
                fill
                sizes="(max-width: 768px) 100vw, 680px"
                style={{ objectFit: 'cover' }}
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
                  border: '1px solid rgba(255,255,255,0.3)',
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
                  border: '1px solid rgba(255,255,255,0.3)',
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
                padding: '14px 16px',
                backgroundColor: 'var(--color-card-bg)',
                borderTop: '1px solid var(--color-border-subtle)'
              }}
            >
              <div style={{ fontSize: '0.98rem', fontWeight: 900, color: 'var(--color-dark)', marginBottom: '4px' }}>
                {REAL_GALLERY_IMAGES[selectedPhotoIndex].title}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-subtle)', lineHeight: 1.5 }}>
                {REAL_GALLERY_IMAGES[selectedPhotoIndex].desc}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-subtle)', marginTop: '6px', fontStyle: 'italic' }}>
                Nguồn ảnh: {REAL_GALLERY_IMAGES[selectedPhotoIndex].source}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
