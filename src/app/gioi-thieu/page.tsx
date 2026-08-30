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
  ChevronLeft,
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
  Eye,
  FileText,
  Scroll
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import PopesContinuousMarquee from '@/components/PopesContinuousMarquee';

/**
 * Khung chân dung nhân vật. Nhiều cha sở thời sơ khai (1860–1956) không còn
 * ảnh tư liệu nào trong kho lưu trữ MEP/IRFA; những trường hợp đó hiển thị ô
 * trống có chú thích thay vì mượn ảnh nhà thờ làm ảnh chân dung.
 */
function PortraitFrame({
  src,
  name,
  width,
  height
}: {
  src?: string;
  name: string;
  width: number;
  height: number;
}) {
  const frameStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: width > 100 ? '10px' : '8px',
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
    border: '1.5px solid #B45309',
    backgroundColor: 'var(--color-input-bg)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  if (src) {
    return (
      <div style={frameStyle}>
        <Image
          src={src}
          alt={`Chân dung ${name}`}
          fill
          sizes={`${width}px`}
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        ...frameStyle,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '6px',
        textAlign: 'center',
        backgroundColor: 'rgba(180, 83, 9, 0.06)'
      }}
      role="img"
      aria-label={`Chưa có ảnh tư liệu của ${name}`}
      title="Chưa tìm được ảnh tư liệu xác thực"
    >
      <Cross size={width > 100 ? 28 : 22} color="#B45309" strokeWidth={1.6} />
      <span
        style={{
          fontSize: width > 100 ? '0.62rem' : '0.55rem',
          fontWeight: 700,
          lineHeight: 1.25,
          color: 'var(--color-subtle)'
        }}
      >
        Chưa có ảnh tư liệu
      </span>
    </div>
  );
}

export interface DetailedBioRecord {
  id: string;
  name: string;
  saintName: string;
  role: string;
  period: string;
  birth?: string;
  death?: string;
  origin: string;
  motto?: string;
  mottoLatin?: string;
  priestOrdination?: string;
  bishopConsecration?: string;
  consecrator?: string;
  /** Bỏ trống khi không có ảnh tư liệu xác thực — KHÔNG dùng ảnh thay thế. */
  image?: string;
  /** Một dòng dấu ấn mục vụ, hiển thị ở bảng niên biểu cha sở. */
  tableNote?: string;
  /** Xuất xứ thông tin, hiện dưới cột dấu ấn để người đọc tự thẩm định. */
  source?: string;
  shortDesc: string;
  chronology: { time: string; title: string; content: string }[];
  milestones: string[];
  quotes?: string;
}

const BISHOPS_EXTENDED_DATA: DetailedBioRecord[] = [
  {
    id: 'duc-cha-tran-van-thien',
    name: 'Đức Cha Giuse Trần Văn Thiện',
    saintName: 'Thánh Giuse (Joseph)',
    role: 'Giám mục Tiên khởi Giáo phận Mỹ Tho',
    period: '1960 – 1989 (29 năm Giám mục)',
    birth: '01/10/1908 tại Ngũ Hiệp, huyện Cai Lậy, tỉnh Tiền Giang',
    death: '24/02/1989 tại Tòa Giám Mục Mỹ Tho (Hưởng thọ 81 tuổi)',
    origin: 'Cái Nhum, Vĩnh Long',
    motto: '“Phần rỗi trong Thánh Giá”',
    mottoLatin: 'Salus Animarum Suprema Lex',
    priestOrdination: '21/09/1935',
    bishopConsecration: '22/01/1961 tại Nhà thờ Đức Bà Sài Gòn',
    consecrator: 'Đức Tổng Giám Mục Phêrô Máctinô Ngô Đình Thục (Chủ phong)',
    image: '/images/bishop_1_tran_van_thien.jpg',
    shortDesc: 'Được Thánh Giáo hoàng Gioan XXIII bổ nhiệm làm Giám mục Tiên khởi ngày 24/11/1960. Ngài đặt nền móng cơ sở hạ tầng, thành lập Tiểu Chủng viện Gioan XXIII, quy tụ linh mục đoàn và kiến thiết giáo phận trong thời kỳ sơ khai đầy gian khó.',
    chronology: [
      {
        time: '1908 – 1928',
        title: 'Tu học và thụ phong Linh mục',
        content: 'Sinh trưởng trong một gia đình đạo đức tại Cái Nhum. Ngài gia nhập Tiểu Chủng viện Sài Gòn từ nhỏ, sau đó tiếp tục học triết học và thần học tại Đại Chủng viện Thánh Giuse Sài Gòn. Thụ phong linh mục ngày 21/09/1928 khi mới 20 tuổi (được Tòa Thánh chuẩn miễn tuổi).'
      },
      {
        time: '1928 – 1960',
        title: 'Mục vụ truyền giáo và Giáo sư Chủng viện',
        content: 'Phục vụ tại các họ đạo miền Tây Nam Bộ, làm giáo sư Chủng viện Sài Gòn, đào tạo nhiều thế hệ linh mục ưu tú cho Giáo hội Việt Nam.'
      },
      {
        time: '24/11/1960',
        title: 'Bổ nhiệm Giám mục Tiên khởi Mỹ Tho',
        content: 'Thánh Giáo hoàng Gioan XXIII ban hành Tông hiến Venerabilium Nostrorum thiết lập Giáo phận Mỹ Tho và bổ nhiệm Linh mục Giuse Trần Văn Thiện làm Giám mục Tiên khởi coi sóc tân giáo phận gồm 3 tỉnh Tiền Giang, Long An và Đồng Tháp.'
      },
      {
        time: '1961 – 1989',
        title: '29 năm kiên cường lèo lái Giáo phận',
        content: 'Thành lập Tiểu Chủng viện Gioan XXIII tại Mỹ Tho, thiết lập Dòng Nữ Tu Mến Thánh Giá Mỹ Tho, Dòng Con Đức Mẹ và hiệp nhất đoàn chiên vượt qua giai đoạn chiến tranh và thời kỳ khó khăn sau năm 1975.'
      }
    ],
    milestones: [
      'Sáng lập Tiểu Chủng viện Gioan XXIII Mỹ Tho.',
      'Thành lập và định hướng linh đạo Dòng Mến Thánh Giá Mỹ Tho.',
      'Phân chia 6 giáo hạt và quy hoạch mạng lưới các giáo xứ nông thôn.',
      'Giữ vững đức tin và phụng vụ thánh thiện cho cộng đoàn trong suốt 29 năm biến động lịch sử.'
    ]
  },
  {
    id: 'duc-cha-nguyen-van-nam',
    name: 'Đức Cha Anrê Nguyễn Văn Nam',
    saintName: 'Thánh Anrê Tông Đồ (Andrew)',
    role: 'Giám mục Chính tòa thứ II Giáo phận Mỹ Tho',
    period: '1989 – 1999 (Kế vị từ 1989, Giám mục Phó từ 1975)',
    birth: '22/02/1922 tại Thạnh Mỹ, Gia Định (Sài Gòn)',
    death: '16/03/2006 tại TP. Hồ Chí Minh (Hưởng thọ 84 tuổi)',
    origin: 'Thới Lai, Cần Thơ',
    motto: '“Vui mừng trong Thánh Giá Chúa Kitô”',
    mottoLatin: 'Crux Spes Unica',
    priestOrdination: '29/03/1952',
    bishopConsecration: '10/06/1975 (Giám mục phó Mỹ Tho); kế vị Giám mục chánh tòa 24/02/1989; nghỉ hưu 15/04/1999',
    consecrator: 'Đức Cha Giuse Trần Văn Thiện (Chủ phong)',
    image: '/images/bishop_nguyen_van_nam.jpg',
    shortDesc: 'Coi sóc giáo phận trong giai đoạn đất nước Đổi Mới. Ngài hết lòng củng cố sự hiệp thông, chăm lo đời sống thiêng liêng cho bà con giáo dân và xây dựng tình bác ái huynh đệ khắp các giáo xứ vùng sông nước miền Tây.',
    chronology: [
      {
        time: '1922 – 1953',
        title: 'Tu học và thụ phong Linh mục',
        content: 'Tu học tại Tiểu Chủng viện Cù Lao Giêng và Đại Chủng viện Thánh Giuse Sài Gòn. Thụ phong linh mục ngày 29/03/1953.'
      },
      {
        time: '24/07/1975',
        title: 'Bổ nhiệm Giám mục Phó Mỹ Tho',
        content: 'Đức Giáo hoàng Phaolô VI bổ nhiệm ngài làm Giám mục Phó Giáo phận Mỹ Tho với quyền kế vị để trợ giúp Đức Cha Giuse Trần Văn Thiện.'
      },
      {
        time: '1989 – 1999',
        title: 'Kế vị Giám mục Chính tòa Mỹ Tho',
        content: 'Kế vị chính thức ngày 24/02/1989. Ngài củng cố tinh thần hiệp nhất, mở lại các lớp huấn giáo đào tạo ơn gọi linh mục, tu sĩ và chăm lo cho các giáo điểm nghèo vùng sâu Đồng Tháp Mười.'
      },
      {
        time: '1999 – 2006',
        title: 'Nghỉ hưu và cầu nguyện',
        content: 'Trao quyền coi sóc cho Đức Cha Phaolô Bùi Văn Đọc vào năm 1999, ngài sống đời cầu nguyện âm thầm và an nghỉ trong Chúa ngày 16/03/2006.'
      }
    ],
    milestones: [
      'Gắn kết sự hiệp thông bền chặt giữa giáo sĩ và giáo dân sau năm 1975.',
      'Khôi phục các khóa tĩnh tâm, đào tạo tu sĩ và tái thiết cơ sở tôn giáo.',
      'Gương mẫu đời sống mục tử khó nghèo, hiền hòa và đầy tình phụ tử.'
    ]
  },
  {
    id: 'duc-hong-y-pham-minh-man',
    name: 'Đức Hồng Y Gioan Baotixita Phạm Minh Mẫn',
    saintName: 'Thánh Gioan Baotixita (John the Baptist)',
    role: 'Giám mục Phó Giáo phận Mỹ Tho (1993 – 1998) • Nguyên Tổng Giám Mục TGP Sài Gòn',
    period: '1993 – 1998 (Tại Mỹ Tho)',
    birth: '05/03/1934 tại Hòa Thành, Cà Mau',
    origin: 'Cà Mau',
    motto: '“Như Thầy yêu thương”',
    mottoLatin: 'Sicut Dilexi Vos (Ga 13,34)',
    priestOrdination: '25/05/1965 tại Nhà thờ Lớn Cần Thơ',
    bishopConsecration: '11/08/1993 tại Cần Thơ',
    consecrator: 'Đức Giám mục Emmanuel Lê Phong Thuận (Chủ phong)',
    image: '/images/bishop_3_pham_minh_man.jpg',
    shortDesc: 'Trong 5 năm phục vụ với cương vị Giám mục Phó Giáo phận Mỹ Tho, Ngài phụ trách công tác đào tạo chủng sinh, linh mục và xây dựng các chương trình bác ái Caritas trước khi được Tòa Thánh tấn phong Tổng Giám mục TGP Sài Gòn và thăng tước Hồng Y.',
    chronology: [
      {
        time: '1934 – 1965',
        title: 'Thời niên thiếu và tu nghiệp quốc tế',
        content: 'Tu học tại Tiểu Chủng viện Cù Lao Giêng, Chủng viện Nam Vang (Campuchia) và Đại học Loyola (Hoa Kỳ) chuyên ngành Sư phạm Giáo dục. Thụ phong linh mục ngày 25/05/1965.'
      },
      {
        time: '1993 – 1998',
        title: 'Giám mục Phó Giáo phận Mỹ Tho',
        content: 'Đức Giáo hoàng Gioan Phaolô II bổ nhiệm làm Giám mục Phó Mỹ Tho. Ngài đẩy mạnh công tác đào tạo thần học, phụ trách Giám đốc Đại Chủng viện Thánh Quý (Cần Thơ) và xây dựng mạng lưới bác ái xã hội.'
      },
      {
        time: '1998 – 2014',
        title: 'Tổng Giám Mục Tổng Giáo Phận Sài Gòn - TP.HCM',
        content: 'Chính thức nhậm chức Tổng Giám mục TGP Sài Gòn ngày 01/03/1998, lãnh đạo giáo phận lớn nhất cả nước trong giai đoạn hội nhập quốc tế.'
      },
      {
        time: '21/10/2003',
        title: 'Thăng tước Hồng Y Đẳng Linh Mục',
        content: 'Đức Thánh Cha Gioan Phaolô II vinh thăng ngài làm Hồng Y tước hiệu San Giustino, trở thành vị Hồng Y thứ 5 trong lịch sử Giáo hội Công giáo Việt Nam.'
      }
    ],
    milestones: [
      'Đặt nền tảng sư phạm thần học hiện đại cho Đại Chủng viện Thánh Quý.',
      'Xây dựng các nhịp cầu đối thoại văn hóa, giáo dục và bác ái giữa Giáo hội và Xã hội.',
      'Vị Hồng Y đầy lòng nhân ái, luôn kiên trì sống theo châm ngôn “Như Thầy yêu thương”.'
    ]
  },
  {
    id: 'duc-tgm-bui-van-doc',
    name: 'Đức Tổng Giám Mục Phaolô Bùi Văn Đọc',
    saintName: 'Thánh Phaolô Tông Đồ (Paul)',
    role: 'Giám mục Chính tòa thứ III Giáo phận Mỹ Tho (1999 – 2013) • Nguyên Chủ tịch HĐGMVN',
    period: '1999 – 2013 (Tại Mỹ Tho)',
    birth: '11/11/1944 tại Đà Lạt, Lâm Đồng',
    death: '06/03/2018 tại Rôma, Vatican (Hưởng thọ 74 tuổi)',
    origin: 'Đà Lạt (Gốc Quảng Bình)',
    motto: '“Chúa là nguồn vui của con”',
    mottoLatin: 'Dominus Lux Mea (Tv 27,1)',
    priestOrdination: '17/12/1970 tại Nhà thờ Chính Tòa Đà Lạt',
    bishopConsecration: '20/05/1999 tại Nhà thờ Chính Tòa Đà Lạt (bổ nhiệm 26/03/1999, nhận giáo phận 27/05/1999)',
    consecrator: 'Đức Tổng Giám mục Gioan Baotixita Phạm Minh Mẫn (Chủ phong)',
    image: '/images/bishop_4_bui_van_doc.jpg',
    shortDesc: 'Thời kỳ Ngài coi sóc ghi dấu những bước phát triển vượt bậc: xây dựng Tòa Giám mục mới, Trung tâm Mục vụ khang trang, cử hành Lễ Cung Hiến Nhà thờ Chánh Tòa Năm Thánh 2000 và truyền giáo mạnh mẽ tại Đồng Tháp Mười.',
    chronology: [
      {
        time: '1944 – 1970',
        title: 'Tu học thần học tại Rôma (Đại học Urbaniana)',
        content: 'Theo học tại Tiểu Chủng viện Thánh Giuse Sài Gòn và được cử sang Rôma du học tại Đại học Giáo hoàng Urbaniana, đạt thủ khoa Thần học Triết học. Thụ phong linh mục ngày 17/12/1970.'
      },
      {
        time: '1975 – 1999',
        title: 'Giám đốc Đại Chủng viện Minh Hòa Đà Lạt',
        content: 'Chuyên gia thần học hàng đầu, giáo sư tín lý tại các Đại Chủng viện Sài Gòn, Huế, Hà Nội và Giám đốc Chủng viện Minh Hòa.'
      },
      {
        time: '1999 – 2013',
        title: '14 năm Giám mục Chính tòa Giáo phận Mỹ Tho',
        content: 'Chính thức nhậm chức ngày 26/03/1999. Ngài xây dựng Tòa Giám mục mới, thiết lập Trung tâm Mục vụ, cử hành Lễ Cung Hiến Nhà thờ Chánh Tòa Năm Thánh 2000 và thành lập hàng loạt giáo xứ tại vùng Đồng Tháp Mười.'
      },
      {
        time: '2013 – 2018',
        title: 'Tổng Giám Mục Sài Gòn & Chủ tịch Hội Đồng Giám Mục',
        content: 'Đức Thánh Cha Phanxicô bổ nhiệm làm Tổng Giám mục TGP Sài Gòn và giữ trọng trách Chủ tịch HĐGMVN nhiệm kỳ 2013 – 2016.'
      }
    ],
    milestones: [
      'Xây dựng Tòa Giám Mục và Trung tâm Mục vụ Giáo phận Mỹ Tho bề thế.',
      'Cung hiến Nhà thờ Chính Tòa Mỹ Tho vào Năm Thánh 2000.',
      'Khai phá và gieo mầm Tin Mừng trên toàn vùng trũng Đồng Tháp Mười.',
      'Nhà thần học lỗi lạc với phong thái mục tử hân hoan, vui tươi đầy bình an.'
    ]
  },
  {
    id: 'duc-cha-nguyen-van-kham',
    name: 'Đức Cha Phêrô Nguyễn Văn Khảm',
    saintName: 'Thánh Phêrô Tông Đồ (Peter)',
    role: 'Giám mục Chính tòa đương nhiệm Giáo phận Mỹ Tho (từ 2014)',
    period: '2014 – nay',
    birth: '02/10/1952 tại Hà Đông, Hà Nội',
    origin: 'Hà Đông (Hà Nội)',
    motto: '“Hãy theo Thầy”',
    mottoLatin: 'Sequere Me (Ga 21,22)',
    priestOrdination: '28/02/1980 tại Sài Gòn',
    bishopConsecration: '15/11/2008 tại Nhà thờ Đức Bà Sài Gòn',
    consecrator: 'Đức Hồng Y Gioan Baotixita Phạm Minh Mẫn (Chủ phong)',
    image: '/images/bishop_5_nguyen_van_kham.jpg',
    shortDesc: 'Được bổ nhiệm làm Giám mục Chính tòa Mỹ Tho ngày 26/07/2014. Với tâm hồn mục tử sâu sắc, kiến thức thần học uyên bác và tài thuyết giảng truyền cảm hứng, Ngài không ngừng định hướng phụng vụ, đào tạo giáo dân và chăm lo ơn gọi toàn giáo phận.',
    chronology: [
      {
        time: '1952 – 1980',
        title: 'Tu học và thụ phong Linh mục',
        content: 'Tu học tại Tiểu Chủng viện Thánh Giuse Sài Gòn và Đại Chủng viện Thánh Giuse. Thụ phong linh mục ngày 28/02/1980.'
      },
      {
        time: '2000 – 2004',
        title: 'Tiến sĩ Thần học Mục vụ tại Hoa Kỳ (CUA)',
        content: 'Du học tại Đại học Công giáo Hoa Kỳ (Catholic University of America) tại Washington D.C., bảo vệ xuất sắc luận án Tiến sĩ Thần học Mục vụ.'
      },
      {
        time: '2008 – 2014',
        title: 'Giám mục Phụ tá Tổng Giáo Phận Sài Gòn',
        content: 'Đức Giáo hoàng Bênêđictô XVI bổ nhiệm làm Giám mục Phụ tá Sài Gòn tước hiệu Troyna, Giám đốc Trung tâm Mục vụ TGP Sài Gòn.'
      },
      {
        time: '26/07/2014 – nay',
        title: 'Giám mục Chính tòa Giáo phận Mỹ Tho',
        content: 'Chính thức nhậm chức Giám mục Chính tòa Mỹ Tho. Ngài kiêm nhiệm Tổng Thư ký HĐGMVN (2016 – 2022) và được Tòa Thánh bổ nhiệm làm Thành viên Bộ Truyền Thông Vatican (Dicastery for Communication) từ năm 2019.'
      }
    ],
    milestones: [
      'Định hình nền tảng mục vụ phụng vụ và loan báo Tin Mừng sâu sắc cho Giáo phận.',
      'Thúc đẩy phong trào Thiếu Nhi Thánh Thể, Huynh Trưởng và Giới trẻ phát triển mạnh mẽ.',
      'Thành viên Bộ Truyền Thông Tòa Thánh Vatican đại diện cho Giáo hội Việt Nam.',
      'Nhà thuyết giảng thần học và Huấn giáo Kinh Thánh uyên bác hàng đầu Việt Nam.'
    ]
  }
];

const POPE_LEO_XIV_BIO: DetailedBioRecord = {
  id: 'duc-thanh-cha-leo-xiv',
  name: 'Đức Giáo Hoàng Lêô XIV (Pope Leo XIV)',
  saintName: 'Thánh Lêô Cả (Leo I Magnus)',
  role: 'Vị Giáo hoàng thứ 267 của Giáo hội Công giáo Hoàn Vũ (Đương nhiệm)',
  period: '2024 – nay',
  birth: 'Roma, Italia',
  origin: 'Roma, Italia',
  motto: '“Trong Chân Lý và Đức Ái”',
  mottoLatin: 'In Veritate et Caritate',
  priestOrdination: 'Thụ phong Linh mục tại Roma',
  bishopConsecration: 'Tấn phong Giám mục tại Roma',
  image: '/images/pope_leo_xiv.jpg',
  shortDesc: 'Đức Thánh Cha đương kim thứ 267 của Giáo hội Công giáo Hoàn Vũ. Ngài kế vị Ngai Tòa Thánh Phêrô, tiếp nối truyền thống canh tân giáo lý, bảo vệ sự hiệp nhất và tình huynh đệ nhân loại.',
  chronology: [
    {
      time: 'Tu học & Nghiên cứu',
      title: 'Đào tạo Thần học & Triết học Cổ điển',
      content: 'Chuyên gia uyên bác về Thần học Tín lý, Giáo luật và Lịch sử Giáo hội Rôma.'
    },
    {
      time: 'Phục vụ Tông Tòa',
      title: 'Phụng sự Giáo triều Rôma',
      content: 'Đảm nhận nhiều trọng trách trong các Bộ và Hội đồng Tòa Thánh Vatican.'
    },
    {
      time: '2024 – nay',
      title: 'Đắc cử Giáo hoàng thứ 267',
      content: 'Đắc cử tại Mật viện Hồng Y, chọn tông hiệu Lêô XIV, tiếp nối sứ mạng vĩ đại của Thánh Lêô Cả và Đức Lêô XIII trong việc dẫn dắt Giáo hội thời đại mới.'
    }
  ],
  milestones: [
    'Bảo vệ sự hiệp nhất và tinh thần phụng vụ thánh thiện của Giáo hội hoàn vũ.',
    'Tăng cường sự hiệp thông trực tiếp với các Giáo hội địa phương, trong đó có Giáo hội Việt Nam.',
    'Thúc đẩy đối thoại hòa bình, bảo vệ gia đình và giới trẻ Kitô giáo.'
  ]
};

/**
 * Cha sở họ đạo / Nhà thờ Chánh Tòa Mỹ Tho qua các thời kỳ — 1861 đến nay,
 * chuỗi liền mạch không còn khoảng trống.
 *
 * QUY TẮC: mỗi mục phải kèm trường `source` nói rõ thông tin lấy từ đâu.
 * Không đưa tên vào danh sách nếu không có nguồn — thà để "Chưa cập nhật".
 *
 * NGUỒN ĐÃ ĐỐI CHIẾU (tra cứu 2026-08):
 *  - IRFA / Hội Thừa Sai Paris — irfa.paris/missionnaire/<mã>-<họ>-<tên>/
 *  - giaophanmytho.net: "Lịch sử Khai Sinh Giáo Phận", "Tổ chức Giáo phận"
 *    (tài liệu chính thức soạn 03/2009 cho Kỷ Yếu Năm Thánh 2010 HĐGMVN),
 *    và bài "Giáo xứ Bình Tạo".
 *  - gxhanhthongtay.net (danh sách các đời cha xứ Hạnh Thông Tây).
 *  - Gallica/BNF, Wikipedia tiếng Việt, cgvdt.vn, hdgmvietnam.com.
 *
 * CHUỖI THỪA SAI PHÁP — mỗi mắt xích xác nhận chéo bởi hồ sơ người kế nhiệm:
 *    Guillou (1861–1865) → Lizé (từ 1864) và Marc-Dassa (1866–1870, hồ sơ
 *    ghi nguyên văn "chargé d'abord avec Lizé, et ensuite seul, de la
 *    paroisse de Mi-tho") → Sorel (1870–1872, khởi công nhà thờ Vĩnh Tường)
 *    → Moulins (1873–1899, hoàn tất nhà thờ Vĩnh Tường, 27 năm) →
 *    Rénier (1899–1922, xây Nhà thờ Chánh Tòa hiện nay) → Bar (~1922–1948,
 *    mất tại nhiệm sở).
 *  Hồ sơ Rénier: "Mgr Mossard l'envoyait à Mytho remplacer M. Moulins, qui
 *  était appelé à la cathédrale de Saïgon... M. Moulins était à Mytho depuis
 *  25 ans". Hồ sơ Moulins: ngài "hoàn tất ngôi nhà thờ do Sorel khởi công".
 *
 * PHÂN BIỆT HAI DANH XƯNG "TIÊN KHỞI" (không mâu thuẫn nhau):
 *  - Cha Guillou: cha sở tiên khởi của HỌ ĐẠO Mỹ Tho (1861).
 *  - Cha Nguyễn Khoa Học: cha sở tiên khởi của NHÀ THỜ CHÁNH TÒA — nhà thờ
 *    chỉ được nâng lên hàng chánh tòa cuối năm 1960. Cha Nguyễn Minh Chiếu
 *    là vị cha sở cuối cùng khi nơi đây còn là giáo xứ thuộc GP Sài Gòn.
 *  Mốc kết thúc 1965 của Cha Nguyễn Khoa Học lấy theo bài Giáo xứ Bình Tạo:
 *  "Năm 1965 Cha Phêrô Niềm được sai đi làm Cha Chánh Xứ Nhà Thờ Chánh Tòa
 *  Mỹ Tho". Ngài về Hạnh Thông Tây năm 1968 (gxhanhthongtay.net), nên giai
 *  đoạn 1965 – 1968 của ngài chưa rõ nhiệm sở.
 *
 * ĐÃ GỠ KHỎI DANH SÁCH:
 *  - Eugène FARON (IRFA 1189): KHÔNG phải cha sở mà là "aumônier de l'hôpital
 *    militaire", confrère được gửi đến giúp cha sở Moulins từ 1874.
 *  - Charles-Émile BOUILLEVAUX (IRFA 0573): chỉ ở Sài Gòn/Chợ Quán
 *    (1849–1855, 1866–1873), chưa từng làm cha sở Mỹ Tho.
 *  - GB. HUỲNH KIM DO: không tìm được trong bất kỳ nguồn công khai nào.
 *  Ảnh cha_faron.jpg và cha_bouillevaux.jpg vẫn giữ trong repo (đúng người,
 *  chỉ là đặt sai chỗ) nếu muốn nêu các ngài ở mục khác.
 *
 * ẢNH CHÂN DUNG (ảnh lưu trữ thật, đã tải về public/images/):
 *  - Sorel (IRFA 0869, bút tích "Sorel, Coch. Occid."), Moulins (IRFA 1056),
 *    Rénier (IRFA 1502, bút tích "Rénier, Cochinchine occid."),
 *    Bar (IRFA 2241, ảnh chụp cuối đời tại Mỹ Tho).
 *  - Nguyễn Khoa Học: ảnh lấy từ trang "Các đời Cha xứ" của gxhanhthongtay.net
 *    (tên file gốc c.micaenguyenkhoahoc.jpg, chú thích "Cha Micae NGUYỄN KHOA
 *    HỌC, (1968-1974)").
 *  - Guillou (0682), Lizé (0792), Marc-Dassa (0657): IRFA KHÔNG có ảnh —
 *    trang hồ sơ chỉ có empty_thumbnail, đường dẫn ảnh trả về 404. Cả ba mất
 *    rất sớm (1866, 1887, 1870) nên nhiều khả năng chưa từng được chụp ảnh.
 *  - Nguyễn Văn Chúc, Hồ Bản Chánh: ảnh do giáo xứ cung cấp (2026-08).
 *    Ảnh Cha Chúc là ảnh kỷ niệm ngày thụ phong, chụp lại từ ảnh lộng khung,
 *    nên phản ánh thời điểm ngài mới chịu chức chứ không phải thời kỳ làm
 *    cha sở 1975–1999.
 *  - Nguyễn Minh Chiếu, Nguyễn Văn Niềm: đã tra giaophanmytho.net,
 *    vietcatholic.net, gxhanhthongtay.net và tìm kiếm chung — không có ảnh
 *    trên Internet. Cần xin từ văn phòng giáo xứ.
 *  Mục thiếu ảnh để trống `image` và hiện ô "Chưa có ảnh tư liệu".
 *
 * CÒN TỒN, CẦN ĐỐI CHIẾU SỔ SÁCH HỌ ĐẠO:
 *  - Mốc 1948 (Cha Nguyễn Minh Chiếu nhận sở) và 1975 (Cha Nguyễn Văn Chúc
 *    nhận sở) theo tư liệu giáo xứ, chưa có nguồn công khai xác nhận.
 *  - Cha Phêrô HỒ BẢN CHÁNH (1999 – 2005): nhiệm kỳ tại Chánh Tòa theo tư
 *    liệu giáo xứ, chưa có nguồn công khai xác nhận trực tiếp. Nhưng nhân
 *    vật thì đã xác minh được: danh sách GP Mỹ Tho 2009 ghi ngài là Tổng
 *    Đại Diện Giáo phận kiêm Phó Chủ tịch Hội đồng Mục vụ; bài trên
 *    giaophanmytho.net (03/2011) gọi ngài là "nguyên Tổng Đại Diện", sau
 *    coi sóc Giáo xứ Thủ Ngữ.
 *    (Bản trước đây ghi nhầm là "Cha Phêrô Nguyễn Vĩnh Sang" — tên này
 *    không có trong bất kỳ nguồn nào, kể cả danh sách linh mục đoàn 2009.)
 *  - Chuỗi 1975 – nay khớp nhau ở mọi mốc kiểm chứng được: Cha Chúc xây
 *    tháp chuông 1995 trong nhiệm kỳ (1975–1999); Cha Hồ Bản Chánh coi sóc
 *    dịp Lễ Cung hiến 21/01/2000; Cha Xung ở Tòa Giám mục 1999–2005 (thụ
 *    phong 27/06/1992, phó biệt cư Tân Phước 2 năm, du học Pháp từ 1994,
 *    về TGM 1999 làm thư ký Đức Cha Phaolô Bùi Văn Đọc, sáu năm sau nhận
 *    Chánh Tòa) rồi khởi công trùng tu 14/06/2006.
 *  - Năm Cha Bar nhận sở (~1922) không có trong hồ sơ IRFA; suy ra vì ngài
 *    kế nhiệm Cha Rénier, mốc có ngày tháng sớm nhất tại Mỹ Tho là 1929.
 *  - Tư liệu giáo xứ nêu giai đoạn 1975–1992 Cha Nguyễn Văn Chúc cùng Cha
 *    Phêrô Trần Xuân Lộc và Cha Đôminicô Lê Văn Bền phụ trách giáo xứ; hai
 *    tên sau chưa tìm được nguồn công khai nên chưa lập mục riêng.
 *  - cgvdt.vn: giai đoạn 1866–1960 họ đạo trải qua hơn 80 linh mục, nên đây
 *    là niên biểu các vị chánh sở, không phải toàn bộ linh mục từng phục vụ.
 */
export const PASTORS_EXTENDED_DATA: DetailedBioRecord[] = [
  {
    id: 'cha-marc-guillou',
    source: 'Hồ sơ lưu trữ IRFA 0682',
    tableNote: 'Cha sở tiên khởi. Cộng đoàn Công giáo Mỹ Tho hình thành năm 1861 khi giáo dân các tỉnh miền Tây về đây lánh nạn bách hại; ngài quy tụ và dựng ngôi nhà thờ đầu tiên kính Thánh Phanxicô Xaviê.',
    name: 'Lm. Jean-Marie Guillou (MEP)',
    saintName: 'Thánh Gioan Maria (Jean-Marie)',
    role: 'Linh mục Quản xứ Tiên khởi Họ đạo Mỹ Tho (1861 – 1865)',
    period: '1861 – 1865',
    birth: '22/10/1828 tại Prat, Giáo phận Saint-Brieuc, Pháp',
    death: '16/03/1866 tại Sài Gòn (Hưởng dương 37 tuổi), an táng tại Lăng Cha Cả',
    priestOrdination: 'Thụ phong Linh mục ngày 17/12/1853',
    origin: 'Hội Thừa Sai Paris (Missions Étrangères de Paris - MEP) — Hồ sơ lưu trữ IRFA số 0682',
    shortDesc: 'Vị mục tử đầu tiên đến coi sóc cộng đoàn Công giáo Mỹ Tho thời kỳ sơ khai sau biến cố phân sáp và cuộc tử đạo của Cha Thánh Phêrô Nguyễn Văn Lựu (1861). Ngài có công quy tụ giáo dân, thiết lập các sổ sách bí tích đầu tiên và dựng ngôi nhà nguyện đầu tiên kính Thánh Phanxicô Xaviê tại đồn Mỹ Tho.',
    chronology: [
      {
        time: '1856 – 1860',
        title: 'Thừa sai vùng người Stiêng',
        content: 'Lên đường sang Đàng Trong ngày 23/01/1856 giữa thời kỳ bách hại; truyền giáo cho người Stiêng và đồng sáng lập cộng đoàn Bro-lam.'
      },
      {
        time: '1861',
        title: 'Coi sóc địa hạt Mỹ Tho',
        content: 'Được cử làm bề trên địa hạt Mỹ Tho, đúng năm nhiều giáo dân từ các tỉnh miền Tây chạy về Mỹ Tho lánh nạn bách hại và hình thành cộng đoàn Công giáo đầu tiên tại đây.'
      },
      {
        time: '1863 – 1864',
        title: 'Cái Mơn rồi trở lại Mỹ Tho',
        content: 'Chuyển sang coi sóc địa hạt Cái Mơn năm 1863; năm 1864 được đặt làm Phó Đại diện Tông tòa và trở lại Mỹ Tho.'
      },
      {
        time: '1861',
        title: 'Thời kỳ thử thách & Chứng nhân tử đạo',
        content: 'Đồng hành nâng đỡ đức tin cho giáo dân trong giai đoạn bách hại; ghi nhận và tôn kính cuộc tử đạo của Cha Thánh Phêrô Nguyễn Văn Lựu tại Mỹ Tho (07/04/1861).'
      },
      {
        time: '1865 – 1866',
        title: 'Thủ Dầu Một & Những ngày cuối',
        content: 'Được điều về Thủ Dầu Một năm 1865. Ngài qua đời tại Sài Gòn ngày 16/03/1866 khi mới 37 tuổi và được an táng tại Lăng Cha Cả.'
      }
    ],
    milestones: [
      'Vị mục tử tiên khởi của Họ đạo Mỹ Tho, coi sóc địa hạt từ năm 1861.',
      'Đồng sáng lập cộng đoàn Kitô hữu Bro-lam giữa người Stiêng.',
      'Phó Đại diện Tông tòa Giáo phận Tây Đàng Trong (1864).'
    ]
  },
  {
    id: 'cha-lize',
    name: 'Lm. François-René Lizé (MEP)',
    saintName: 'Thánh Phanxicô',
    role: 'Linh mục coi sóc Họ đạo Mỹ Tho & Vĩnh Tường (1864 – 1874)',
    period: '1864 – 1869',
    birth: '08/06/1838 tại Châteaugiron, Giáo phận Rennes, Pháp',
    death: '08/02/1887 tại nhà an dưỡng Béthanie, Hồng Kông',
    priestOrdination: 'Thụ phong Linh mục ngày 25/05/1861',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 0792',
    source: 'Hồ sơ lưu trữ IRFA 0792',
    tableNote: 'Về Mỹ Tho năm 1864, giúp các Nữ tu Thánh Phaolô thành Chartres lập cơ sở Thánh Nhi (Sainte-Enfance). Từ năm 1866 cùng Cha Marc phụ trách họ đạo. Khoảng 1869 chuyển hẳn về Vĩnh Tường — khi đó còn là họ nhánh của Mỹ Tho — và lập tại đó một bệnh viện bản xứ.',
    shortDesc: 'Vị thừa sai gắn bó với Mỹ Tho suốt mười năm. Ngài về đây năm 1864 và giúp các Nữ tu Thánh Phaolô thành Chartres thiết lập cơ sở Thánh Nhi. Từ năm 1866 ngài cùng Cha Marc phụ trách họ đạo Mỹ Tho. Khoảng năm 1869 ngài chuyển hẳn sang Vĩnh Tường — lúc bấy giờ còn là họ nhánh của Mỹ Tho — và lập ở đó một bệnh viện bản xứ do các Nữ tu đảm nhiệm. Được đặt làm Phó Đại diện Tông tòa khoảng năm 1872.',
    chronology: [
      {
        time: '1861 – 1864',
        title: 'Thụ phong & Những năm đầu tại Nam Kỳ',
        content: 'Thụ phong linh mục ngày 25/05/1861 và lên đường sang Giáo phận Tây Đàng Trong ngày 09/08/1861. Khởi đầu tại Bưng trước khi về Mỹ Tho năm 1864.'
      },
      {
        time: '1864 – 1866',
        title: 'Lập cơ sở Thánh Nhi tại Mỹ Tho',
        content: 'Giúp các Nữ tu Thánh Phaolô thành Chartres thiết lập cơ sở Thánh Nhi (Sainte-Enfance) tại Mỹ Tho, chăm sóc trẻ mồ côi và trẻ bị bỏ rơi.'
      },
      {
        time: '1866 – 1869',
        title: 'Cùng Cha Marc phụ trách họ đạo',
        content: 'Kho lưu trữ MEP ghi từ năm 1866 ngài cùng Cha Marc-Dassa đảm trách giáo xứ Mỹ Tho.'
      },
      {
        time: 'khoảng 1869 – 1874',
        title: 'Về Vĩnh Tường & lập bệnh viện bản xứ',
        content: 'Chuyển hẳn về Vĩnh Tường, khi ấy còn là họ nhánh của Mỹ Tho, và lập tại đó một bệnh viện bản xứ. Được đặt làm Phó Đại diện Tông tòa khoảng năm 1872. Bệnh nặng, ngài về Pháp năm 1874.'
      },
      {
        time: '1878 – 1887',
        title: 'Trở lại Nam Kỳ & những năm cuối',
        content: 'Bình phục, ngài trở lại Tây Đàng Trong năm 1878, làm tuyên úy cơ sở Thánh Nhi Sài Gòn; năm 1881 Đức cha Colombert trao cho ngài địa hạt Vĩnh Long, nơi ngài lập nhiều họ đạo và nhà nguyện. Ngài qua đời ngày 08/02/1887 tại Hồng Kông.'
      }
    ],
    milestones: [
      'Về Mỹ Tho năm 1864; cùng Cha Marc phụ trách họ đạo từ 1866.',
      'Giúp các Nữ tu Thánh Phaolô thành Chartres lập cơ sở Thánh Nhi tại Mỹ Tho.',
      'Lập bệnh viện bản xứ tại Vĩnh Tường (khoảng 1869).',
      'Phó Đại diện Tông tòa Giáo phận Tây Đàng Trong (khoảng 1872).'
    ]
  },
  {
    id: 'cha-marc-dassa',
    name: 'Lm. François-Timothée Marc-Dassa (MEP)',
    saintName: 'Thánh Phanxicô',
    role: 'Linh mục phụ trách Giáo xứ Mỹ Tho (1866 – 1870)',
    period: '1866 – 1870',
    birth: '22/01/1826 tại La Grâce-Dieu, Giáo phận Toulouse, Pháp',
    death: '11/04/1870 tại La Grâce-Dieu, Pháp',
    priestOrdination: 'Thụ phong Linh mục ngày 23/05/1850',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 0657. Thường được gọi vắn tắt là "Cha Marc"',
    source: 'Hồ sơ lưu trữ IRFA 0657 — nguyên văn: "De 1866 à 1870, il fut chargé d\'abord avec Lizé, et ensuite seul, de la paroisse de Mi-tho"',
    tableNote: 'Phụ trách giáo xứ Mỹ Tho, ban đầu cùng Cha Lizé rồi sau đó một mình. Ngài xin được ân xá cho một số nghĩa quân; những người này về sau theo đạo và lập nên họ đạo An Đức.',
    shortDesc: 'Thường được gọi vắn tắt là "Cha Marc". Ngài truyền giáo tại Bắc Kỳ từ năm 1854 nhưng cuộc bách hại buộc ngài rời nhiệm sở; năm 1860 ngài lánh về Sài Gòn và gia nhập địa phận Tây Đàng Trong, vừa coi sóc một số họ đạo vừa làm thông ngôn. Từ 1866 đến 1870 ngài phụ trách giáo xứ Mỹ Tho — ban đầu cùng Cha Lizé, sau đó một mình. Dấu ấn đặc biệt của ngài là xin được ân xá cho một số nghĩa quân; những người này sau đó theo đạo và lập nên họ đạo An Đức.',
    chronology: [
      {
        time: '1850 – 1860',
        title: 'Thừa sai Bắc Kỳ giữa cơn bách hại',
        content: 'Thụ phong linh mục tại Toulouse ngày 23/05/1850, vào Chủng viện Thừa Sai Paris năm 1853 và lên đường sang Bắc Kỳ ngày 22/03/1854. Cuộc bách hại buộc ngài rời nhiệm sở; năm 1860 ngài lánh về Sài Gòn và được sáp nhập vào địa phận Tây Đàng Trong.'
      },
      {
        time: '1860 – 1866',
        title: 'Coi sóc các họ đạo & làm thông ngôn',
        content: 'Vừa coi sóc một số họ đạo vừa làm thông ngôn cho đoàn quân viễn chinh và những viên chức đầu tiên của chính quyền thuộc địa.'
      },
      {
        time: '1866 – 1870',
        title: 'Phụ trách giáo xứ Mỹ Tho',
        content: 'Đảm trách giáo xứ Mỹ Tho, ban đầu cùng Cha Lizé rồi sau đó một mình. Ngài xin được ân xá cho một số nghĩa quân; những người này về sau đón nhận đức tin và lập nên họ đạo An Đức.'
      },
      {
        time: '1870',
        title: 'Trở về Pháp & qua đời',
        content: 'Lâm bệnh nặng năm 1870, ngài về Pháp và qua đời ngày 11/04/1870 ngay tại quê nhà La Grâce-Dieu.'
      }
    ],
    milestones: [
      'Phụ trách giáo xứ Mỹ Tho 1866 – 1870.',
      'Xin được ân xá cho một số nghĩa quân, những người sau đó lập nên họ đạo An Đức.',
      'Thừa sai Bắc Kỳ 1854 – 1860 giữa thời kỳ bách hại.'
    ]
  },
  {
    id: 'cha-sorel',
    source: 'Hồ sơ lưu trữ IRFA 0869',
    name: 'Lm. Constant-Joseph Sorel (MEP)',
    saintName: 'Thánh Giuse',
    role: 'Linh mục Chánh sở Họ đạo Mỹ Tho • Khởi công Nhà thờ Vĩnh Tường (1870 – 1872)',
    period: '1870 – 1872',
    birth: '14/04/1840 tại Bulles, Giáo phận Beauvais, Pháp',
    death: '26/02/1873 tại Nice, Pháp; an táng tại Marseille',
    priestOrdination: 'Thụ phong Linh mục ngày 17/12/1864',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 0869',
    image: '/images/cha_sorel.jpg',
    tableNote: 'Khởi công xây ngôi nhà thờ thứ hai của họ đạo — Nhà thờ Vĩnh Tường — mà người kế nhiệm là Cha Moulins hoàn tất.',
    shortDesc: 'Trước khi về Mỹ Tho, ngài phục vụ tại Thủ Dầu Một và dựng ở đó một ngôi nhà thờ khiêm tốn nhưng nhiều năm liền được coi là đẹp nhất địa phận. Tháng 7/1868 ngài theo đoàn quân cứu giáo dân Thị Tính nhưng đến nơi sau khi cuộc thảm sát đã xảy ra. Năm 1870 ngài về Mỹ Tho và khởi công xây ngôi nhà thờ thứ hai của họ đạo — Nhà thờ Vĩnh Tường — công trình sau này được Cha Moulins hoàn tất. Ngã bệnh, ngài về Pháp năm 1872 và qua đời năm sau.',
    chronology: [
      {
        time: '1861 – 1865',
        title: 'Vào Chủng viện Thừa Sai & Lên đường',
        content: 'Vào Chủng viện Hội Thừa Sai Paris ngày 02/09/1861, thụ phong linh mục ngày 17/12/1864 và lên đường sang Giáo phận Tây Đàng Trong ngày 15/02/1865.'
      },
      {
        time: '1865 – 1870',
        title: 'Nhiệm sở Thủ Dầu Một',
        content: 'Xây tại Thủ Dầu Một một ngôi nhà thờ khiêm tốn nhưng trong nhiều năm được xem là đẹp nhất địa phận. Tháng 7/1868 ngài tháp tùng đoàn quân đi cứu giáo dân Thị Tính, đến nơi thì cuộc thảm sát đã xảy ra.'
      },
      {
        time: '1870 – 1872',
        title: 'Về Mỹ Tho & khởi công Nhà thờ Vĩnh Tường',
        content: 'Nhận họ đạo Mỹ Tho năm 1870 và khởi công xây ngôi nhà thờ thứ hai của họ đạo. Công trình do người kế nhiệm là Cha Moulins hoàn tất, được Đức cha Colombert thánh hiến năm 1876 với tên Nhà thờ Vĩnh Tường. Ngôi nhà thờ này nay không còn.'
      },
      {
        time: '1872 – 1873',
        title: 'Trở về Pháp & qua đời',
        content: 'Ngã bệnh nặng, ngài về Pháp năm 1872 và qua đời ngày 26/02/1873 tại Nice, được an táng tại Marseille.'
      }
    ],
    milestones: [
      'Chánh sở họ đạo Mỹ Tho 1870 – 1872.',
      'Khởi công ngôi nhà thờ thứ hai của họ đạo (Nhà thờ Vĩnh Tường).',
      'Xây nhà thờ Thủ Dầu Một, nhiều năm được coi là đẹp nhất địa phận Tây Đàng Trong.'
    ]
  },
  {
    id: 'cha-moulins',
    source: 'Hồ sơ lưu trữ IRFA 1056',
    name: 'Lm. Pierre-Henri Moulins (MEP)',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Linh mục Chánh sở Họ đạo Mỹ Tho (1873 – 1899), sau là Chánh sở Nhà thờ Chánh Tòa Sài Gòn',
    period: '1873 – 1899',
    birth: '19/09/1844 tại Les Cabannes, Ariège, Pháp',
    death: '22/01/1900 tại nhà an dưỡng Béthanie, Hồng Kông',
    priestOrdination: 'Thụ phong Linh mục ngày 22/05/1869',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 1056',
    image: '/images/cha_moulins.jpg',
    tableNote: 'Coi sóc họ đạo suốt 27 năm — nhiệm kỳ dài nhất trong lịch sử. Hoàn tất Nhà thờ Vĩnh Tường do Cha Sorel khởi công, tái lập họ đạo Xoài Mút và lập địa hạt Bình Đại. Năm 1899 được gọi về làm Chánh sở Nhà thờ Chánh Tòa Sài Gòn.',
    shortDesc: 'Vị chánh sở gắn bó với Mỹ Tho lâu nhất trong lịch sử họ đạo — 27 năm liên tục. Ngài hoàn tất ngôi Nhà thờ Vĩnh Tường do Cha Sorel khởi công, phát triển giáo xứ, tái lập họ đạo Xoài Mút và thành lập địa hạt Bình Đại; xây nhiều nhà xứ và nhà nguyện tại Xoài Mút, An Đức và Bình Đại. Dưới thời ngài, Mỹ Tho trở thành nơi dừng chân của các thừa sai từ các tỉnh miền dưới, Campuchia và Lào. Năm 1899 Đức cha Mossard mời ngài nhận chức Chánh sở Nhà thờ Chánh Tòa Sài Gòn, nhưng ngài chỉ đảm nhiệm được vài tháng thì qua đời.',
    chronology: [
      {
        time: '1869 – 1873',
        title: 'Thụ phong & Những nhiệm sở đầu',
        content: 'Thụ phong linh mục ngày 22/05/1869, vào Chủng viện Thừa Sai Paris và lên đường sang Tây Đàng Trong ngày 06/07/1870. Khởi đầu tại chủng viện Sài Gòn, tạm thay quản lý địa phận, rồi về Lái Thiêu; hoàn tất giai đoạn đào tạo tại Cái Mơn, nơi ngài phụ giúp Cha Gernot xây nhà thờ.'
      },
      {
        time: '1873',
        title: 'Nhận họ đạo Mỹ Tho',
        content: 'Được trao coi sóc họ đạo Mỹ Tho và hoàn tất ngôi nhà thờ do Cha Sorel khởi công — sau này mang tên Nhà thờ Vĩnh Tường, được Đức cha Colombert thánh hiến năm 1876.'
      },
      {
        time: '1873 – 1899',
        title: 'Phát triển họ đạo & mở rộng địa bàn',
        content: 'Tái lập họ đạo Xoài Mút, thành lập địa hạt Bình Đại, xây nhiều nhà xứ và nhà nguyện tại Xoài Mút, An Đức, Bình Đại. Ngài có ba đến bốn linh mục Việt Nam làm phó xứ thường trú tại các họ đạo xa và được ghi nhận là điều hành khéo léo, tế nhị.'
      },
      {
        time: '1899 – 1900',
        title: 'Về Nhà thờ Chánh Tòa Sài Gòn & qua đời',
        content: 'Sau 27 năm tại Mỹ Tho, Đức cha Mossard mời ngài nhận chức Chánh sở Nhà thờ Chánh Tòa Sài Gòn — Cha Rénier được cử về Mỹ Tho thay ngài. Ngài chỉ đảm nhiệm được vài tháng rồi qua đời ngày 22/01/1900 tại nhà an dưỡng Béthanie, Hồng Kông.'
      }
    ],
    milestones: [
      'Chánh sở họ đạo Mỹ Tho suốt 27 năm (1873 – 1899) — nhiệm kỳ dài nhất trong lịch sử họ đạo.',
      'Hoàn tất ngôi Nhà thờ Vĩnh Tường do Cha Sorel khởi công.',
      'Tái lập họ đạo Xoài Mút và thành lập địa hạt Bình Đại.',
      'Chánh sở Nhà thờ Chánh Tòa Sài Gòn (1899 – 1900).'
    ]
  },
  {
    id: 'cha-regnier-co-gam',
    source: 'Hồ sơ lưu trữ IRFA 1502',
    tableNote: 'Đặt viên đá đầu tiên ngày 11/08/1906 và khánh thành năm 1910 ngôi Nhà thờ Chánh Tòa hiện nay; xây trường của các Sư huynh Lasan, nội trú các Nữ tu Thánh Phaolô, nhà thờ Ngũ Hiệp.',
    name: 'Lm. Jean-Marie Rénier (Cố Gẫm - MEP)',
    saintName: 'Thánh Gioan Maria (Jean-Marie)',
    role: 'Linh mục Chánh sở Họ đạo Mỹ Tho • Người kiến thiết Nhà thờ Chánh Tòa (1899 – 1922)',
    period: '1899 – 1922',
    birth: '29/10/1853 tại Challain-la-Potherie, Giáo phận Angers, Pháp',
    death: '24/04/1922 tại Sài Gòn (Hưởng thọ 68 tuổi, 41 năm truyền giáo)',
    priestOrdination: 'Thụ phong Linh mục ngày 23/12/1876',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 1502',
    shortDesc: 'Vị chánh sở coi sóc họ đạo Mỹ Tho suốt hơn hai mươi năm và là người kiến thiết ngôi Nhà thờ Chánh Tòa hiện nay. Ngày 11/08/1906 ngài đặt viên đá đầu tiên trên đại lộ Bourdais (nay là đại lộ Hùng Vương), hoàn thành năm 1910. Ngài còn mở trường học do các Sư huynh Lasan điều hành, nội trú do các Nữ tu Thánh Phaolô đảm trách, xây nhà thờ Ngũ Hiệp và tái thiết nguyện đường Thánh Anna. Kho lưu trữ MEP ghi lại ngài là "một mục tử thông minh, tận tụy, không mệt mỏi", dáng cao lớn, tóc bạc, tính tình vui vẻ hiếu khách, có uy tín đạo đức lớn trong cả tỉnh.',
    image: '/images/cha_renier_co_gam.jpg',
    chronology: [
      {
        time: '1876 – 1881',
        title: 'Thụ phong & Lên đường Thừa sai',
        content: 'Thụ phong linh mục ngày 23/12/1876 tại Pháp; lên đường sang Giáo phận Tây Đàng Trong (Cochinchine occidentale) ngày 26/10/1881.'
      },
      {
        time: '1881 – 1899',
        title: 'Các nhiệm sở đầu tiên',
        content: 'Phụ tá tại Mặc Bắc (1881 – 1883), coi sóc Đá Trắng (1883 – 1887), Biên Hòa (1887 – 1889) rồi Chợ Đũi (1891 – 1899) trước khi về Mỹ Tho.'
      },
      {
        time: '1899',
        title: 'Về nhận họ đạo Mỹ Tho',
        content: 'Được bổ nhiệm chánh sở họ đạo Mỹ Tho, khởi đầu hơn hai thập kỷ gắn bó cho đến khi qua đời.'
      },
      {
        time: '1906',
        title: 'Đặt viên đá đầu tiên (11/08/1906)',
        content: 'Khởi công ngôi nhà thờ thứ ba trên khu đất sình lầy đại lộ Bourdais, thay cho Nhà thờ Vĩnh Tường đã chật hẹp.'
      },
      {
        time: '1910',
        title: 'Khánh thành ngôi Thánh đường',
        content: 'Hoàn thành ngôi nhà thờ bề thế bậc nhất tỉnh Mỹ Tho lúc bấy giờ — chính là Nhà thờ Chánh Tòa hiện nay.'
      },
      {
        time: '1910 – 1922',
        title: 'Giáo dục & Bác ái',
        content: 'Mở trường học do các Sư huynh Lasan điều hành và nội trú do các Nữ tu Thánh Phaolô đảm trách; xây nhà thờ Ngũ Hiệp và tái thiết nguyện đường Thánh Anna. Ngài qua đời tại Sài Gòn ngày 24/04/1922.'
      }
    ],
    milestones: [
      'Chánh sở họ đạo Mỹ Tho suốt 23 năm (1899 – 1922).',
      'Khởi công (11/08/1906) và hoàn thành (1910) ngôi Nhà thờ Chánh Tòa Mỹ Tho hiện hữu.',
      'Mở trường học của các Sư huynh Lasan và nội trú của các Nữ tu Thánh Phaolô tại Mỹ Tho.',
      'Xây nhà thờ Ngũ Hiệp và tái thiết nguyện đường Thánh Anna.',
      'Vị chủ chăn được giáo dân kính trọng gọi là "Cố Gẫm".'
    ]
  },
  {
    id: 'cha-bar-co-bach',
    source: 'Hồ sơ lưu trữ IRFA 2241',
    tableNote: 'Đón Đệ tử các Sư huynh Lasan (1929); năm 1930 trường Sư huynh có 400 học sinh, trường Nữ tu Thánh Phaolô 300 nữ sinh; lập ba họ đạo Bàn Hạn, Thược, Phú Vang (1933). Qua đời ngay tại nhiệm sở.',
    name: 'Lm. Henri Bar (Cố Bạch - MEP)',
    saintName: 'Thánh Giuse (tên rửa tội: Henri Edmond Joseph)',
    role: 'Linh mục Chánh sở Họ đạo Mỹ Tho (khoảng 1922 – 1948)',
    period: 'khoảng 1922 – 1948',
    birth: '29/04/1870 tại Flines-lez-Raches, Giáo phận Cambrai, Pháp',
    death: '19/03/1948 tại Mỹ Tho, đúng ngày lễ Thánh Giuse bổn mạng (hưởng thọ 78 tuổi, 52 năm truyền giáo)',
    priestOrdination: 'Thụ phong Linh mục ngày 28/06/1896',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 2241',
    image: '/images/cha_bar_co_bach.jpg',
    shortDesc: 'Kế nhiệm Cha Rénier, ngài gắn bó với họ đạo Mỹ Tho cho đến hơi thở cuối cùng và là vị kỳ cựu nhất của địa phận khi qua đời. Kho lưu trữ MEP mô tả ngài là "một thừa sai khiêm nhường, làm việc trong thinh lặng và kín đáo". Năm 1929 ngài đón nhóm Đệ tử các Sư huynh Lasan, nhường một phần nhà xứ làm chỗ ở; đến 1930 trường của các Sư huynh nuôi dạy 400 học sinh và các Nữ tu Thánh Phaolô 300 nữ sinh. Năm 1933 ngài ghi nhận 642 lượt rửa tội và lập ba họ đạo mới. Ngài qua đời vì ung thư vòm họng sau khi lãnh Bí tích Xức Dầu trước mặt cộng đoàn và ngỏ lời từ biệt lần cuối.',
    chronology: [
      {
        time: '1896 – 1899',
        title: 'Thụ phong & Sang Đàng Trong',
        content: 'Thụ phong linh mục ngày 28/06/1896, lên đường sang Giáo phận Tây Đàng Trong ngày 26/08/1896. Dạy triết học tại Đại Chủng viện Sài Gòn và làm tuyên úy Dòng Kín Carmel năm 1899.'
      },
      {
        time: 'trước 1922',
        title: 'Địa hạt Bái Xan',
        content: 'Phục vụ tại họ đạo và địa hạt Bái Xan, một trong những cộng đoàn Kitô hữu lâu đời nhất vùng ruộng vườn Nam Bộ.'
      },
      {
        time: '1929 – 1930',
        title: 'Đón các Sư huynh Lasan & mở rộng trường học',
        content: 'Đón nhóm Đệ tử các Sư huynh Lasan về Mỹ Tho, nhường một phần nhà xứ làm nơi ở. Đến năm 1930, trường của các Sư huynh đón 400 học sinh và các Nữ tu Thánh Phaolô đón 300 nữ sinh.'
      },
      {
        time: '1933',
        title: 'Mùa gặt đức tin & lập họ đạo mới',
        content: 'Ghi nhận 642 lượt rửa tội trong địa hạt; lập ba họ đạo mới Bàn Hạn, Thược và Phú Vang — họ Phú Vang được trao cho Cha Tôma Kỳ coi sóc.'
      },
      {
        time: '1941 – 1945',
        title: 'Che chở giáo dân thời loạn lạc',
        content: 'Cùng Cha Ad. Keller đón nhận giáo dân chạy nạn trong thời kỳ biến động; chứng kiến tại chỗ giai đoạn kết thúc chiếm đóng của quân đội Nhật và những xáo trộn sau đó.'
      },
      {
        time: '19/03/1948',
        title: 'Qua đời giữa lòng họ đạo',
        content: 'Sau thời gian dài chống chọi ung thư vòm họng, ngài lãnh Bí tích Xức Dầu trước mặt cộng đoàn, xin lỗi vì những điều có thể đã làm phiền lòng giáo dân và khuyên họ trung thành với bổn phận Kitô hữu. Ngài qua đời ngay tại Mỹ Tho đúng ngày lễ Thánh Giuse.'
      }
    ],
    milestones: [
      'Chánh sở họ đạo Mỹ Tho khoảng một phần tư thế kỷ, qua đời ngay tại nhiệm sở (1948).',
      'Đón các Sư huynh Lasan về Mỹ Tho (1929); đến 1930 trường Sư huynh có 400 học sinh, trường Nữ tu Thánh Phaolô 300 nữ sinh.',
      'Lập ba họ đạo mới Bàn Hạn, Thược và Phú Vang (1933).',
      'Che chở giáo dân chạy nạn trong thời kỳ loạn lạc 1941 – 1945.'
    ]
  },
  {
    id: 'cha-nguyen-minh-chieu',
    image: '/images/cha_nguyen_minh_chieu.png',
    source: 'giaophanmytho.net (xác nhận ngài là cha sở năm 1958); niên hiệu 1948 – 1960 theo tư liệu giáo xứ',
    tableNote: 'Kế nhiệm Cha Henri Bar, và là vị cha sở cuối cùng coi sóc Mỹ Tho khi nơi đây còn là một giáo xứ thuộc Giáo phận Sài Gòn. Năm 1958 cho dời quả chuông từ tháp bên hông nữ lên tháp cao bên nam.',
    name: 'Lm. Phaolô Nguyễn Minh Chiếu',
    saintName: 'Thánh Phaolô Tông Đồ',
    role: 'Linh mục Chánh xứ Họ đạo Mỹ Tho (1948 – 1960)',
    period: '1948 – 1960',
    origin: 'Giáo phận Sài Gòn / Giáo hạt Mỹ Tho',
    shortDesc: 'Kế nhiệm Cha Henri Bar sau khi ngài qua đời ngay tại nhiệm sở năm 1948. Ngài coi sóc họ đạo suốt hơn một thập kỷ và là vị cha sở cuối cùng của Mỹ Tho khi nơi đây còn là một giáo xứ thuộc Giáo phận Sài Gòn — trước khi Tòa Thánh thành lập Giáo phận Mỹ Tho năm 1960 và nhà thờ được nâng lên hàng Chánh Tòa. Dấu ấn còn lại đến nay là công trình dời quả chuông lớn từ tháp bên hông nữ lên tháp cao bên nam vào năm 1958.',
    chronology: [
      {
        time: '1948',
        title: 'Kế nhiệm Cha Henri Bar',
        content: 'Nhận coi sóc họ đạo Mỹ Tho sau khi Cha Henri Bar (Cố Bạch) qua đời ngay tại nhiệm sở ngày 19/03/1948.'
      },
      {
        time: '1956',
        title: 'Chính thức nhậm chức Cha sở người Việt đầu tiên',
        content: 'Tiếp quản họ đạo từ các linh mục thừa sai Pháp MEP, mở ra kỷ nguyên tự quản của giáo sĩ bản xứ.'
      },
      {
        time: '1957',
        title: 'Kiện toàn sổ sách & Ban Quới Chức',
        content: 'Tổ chức lại các khu họ nhánh và đào tạo giáo lý phụng vụ.'
      },
      {
        time: '1960',
        title: 'Chuyển giao khi Giáo phận Mỹ Tho được thành lập',
        content: 'Cuối năm 1960 Tòa Thánh thành lập Giáo phận Mỹ Tho và nâng nhà thờ họ đạo lên hàng Nhà thờ Chánh Tòa với tước hiệu Đức Mẹ Vô Nhiễm Nguyên Tội. Ngài là vị cha sở cuối cùng của họ đạo dưới danh nghĩa một giáo xứ thuộc Giáo phận Sài Gòn, trước khi Cha Micae Nguyễn Khoa Học trở thành cha sở tiên khởi của Nhà thờ Chánh Tòa.'
      },
      {
        time: '1958',
        title: 'Di dời chuông lớn lên tháp Nam',
        content: 'Tháp chuông đầu tiên vốn dựng bên hông nữ của nhà thờ. Năm 1958 ngài tổ chức công trình dời quả chuông đồng cổ kính lên tháp cao bên nam.'
      }
    ],
    milestones: [
      'Linh mục người Việt Nam đầu tiên làm Chánh xứ Họ đạo Mỹ Tho (1956).',
      'Chủ trì công trình di dời chuông nhà thờ lên tháp cao phía Nam (1958).',
      'Đặt nền móng quản trị họ đạo bản xứ trước khi Giáo phận Mỹ Tho được thành lập.'
    ]
  },
  {
    id: 'cha-nguyen-khoa-hoc',
    image: '/images/cha_nguyen_khoa_hoc.jpg',
    source: 'giaophanmytho.net (cha sở tiên khởi Nhà thờ Chánh Tòa; bài Giáo xứ Bình Tạo cho biết Cha Phêrô Niềm kế nhiệm năm 1965) + gxhanhthongtay.net (cha sở Hạnh Thông Tây 1968 – 1974; ảnh chân dung lấy từ trang Các đời Cha xứ của giáo xứ này)',
    name: 'Lm. Micae Nguyễn Khoa Học',
    saintName: 'Thánh Micae Tổng lãnh Thiên thần',
    role: 'Linh mục Chánh sở Tiên khởi của Nhà thờ Chánh Tòa Mỹ Tho (1960 – 1965)',
    period: '1960 – 1965',
    origin: 'Giáo phận Mỹ Tho',
    tableNote: 'Cha sở tiên khởi của Nhà thờ Chánh Tòa sau khi giáo phận được thành lập (1960). Đảm trách xây dựng Tòa Giám Mục, Nhà Tĩnh Tâm, Nghênh Đài Đức Mẹ và Nhà Cha Sở trong khuôn viên cạnh nhà thờ; thành lập Trường Tiểu học Thánh Giuse tại giáo xứ. Rời Chánh Tòa năm 1965; từ 1968 đến 1974 làm cha sở Giáo xứ Hạnh Thông Tây (Sài Gòn).',
    shortDesc: 'Khi Giáo phận Mỹ Tho được thành lập năm 1960, giáo phận chưa có Tòa Giám Mục; Đức Cha Giuse Trần Văn Thiện phải tạm trú tại một ngôi nhà trên đường Lê Lợi, đối diện Bưu điện Mỹ Tho. Là cha sở tiên khởi của Nhà thờ Chánh Tòa, ngài đảm trách xây dựng cả cụm công trình trong khuôn viên cạnh nhà thờ — Tòa Giám Mục, Nhà Tĩnh Tâm, Nghênh Đài Đức Mẹ và Nhà Cha Sở — vẫn còn đến ngày nay. Chỉ sau khi Tòa Giám Mục hoàn thành, Đức Cha Giuse mới chính thức về thường trú.',
    chronology: [
      {
        time: '1960',
        title: 'Cha sở tiên khởi Nhà thờ Chánh Tòa',
        content: 'Sau khi Tòa Thánh nâng nhà thờ họ đạo Mỹ Tho lên hàng Nhà thờ Chánh Tòa với tước hiệu Đức Mẹ Vô Nhiễm Nguyên Tội, ngài trở thành vị chánh sở tiên khởi của ngôi thánh đường ở cương vị mới này.'
      },
      {
        time: 'sau 1960',
        title: 'Xây dựng cụm công trình Tòa Giám Mục',
        content: 'Đảm trách xây dựng Tòa Giám Mục, Nhà Tĩnh Tâm, Nghênh Đài Đức Mẹ và Nhà Cha Sở trong cùng khuôn viên cạnh Nhà thờ Chánh Tòa. Nhờ đó Đức Giám mục tiên khởi mới có nơi ở và làm việc chính thức của giáo phận.'
      },
      {
        time: 'thập niên 1960',
        title: 'Thành lập Trường Tiểu học Thánh Giuse',
        content: 'Thành lập Trường Tiểu học Thánh Giuse ngay tại giáo xứ Chánh Tòa, mở rộng công cuộc giáo dục cho con em trong họ đạo.'
      },
      {
        time: '1965',
        title: 'Bàn giao Nhà thờ Chánh Tòa',
        content: 'Năm 1965 Cha Phêrô Nguyễn Văn Niềm được sai về làm Chánh xứ Nhà thờ Chánh Tòa Mỹ Tho, kế nhiệm ngài.'
      },
      {
        time: '1968 – 1974',
        title: 'Chánh sở Giáo xứ Hạnh Thông Tây',
        content: 'Làm Chánh sở Giáo xứ Hạnh Thông Tây (Gò Vấp, Sài Gòn) từ 1968 đến 1974, kế nhiệm Cha Anrê Nguyễn Văn Đại. Giai đoạn này ngài lo trùng tu thánh đường sau những thiệt hại của chiến cuộc.'
      }
    ],
    milestones: [
      'Linh mục Chánh sở tiên khởi của Nhà thờ Chánh Tòa Mỹ Tho (1960 – 1965).',
      'Đảm trách xây dựng Tòa Giám Mục Mỹ Tho đầu tiên, Nhà Tĩnh Tâm, Nghênh Đài Đức Mẹ và Nhà Cha Sở.',
      'Thành lập Trường Tiểu học Thánh Giuse tại giáo xứ Chánh Tòa.',
      'Chánh sở Giáo xứ Hạnh Thông Tây, Gò Vấp (1968 – 1974).'
    ]
  },
  {
    id: 'cha-nguyen-van-niem',
    name: 'Lm. Phêrô Nguyễn Văn Niềm',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Linh mục Chánh sở Nhà thờ Chánh Tòa Mỹ Tho (1965 – đầu 1975)',
    period: '1965 – 1975',
    origin: 'Giáo phận Mỹ Tho',
    source: 'giaophanmytho.net, bài Giáo xứ Bình Tạo: "Năm 1965 Cha Phêrô Niềm được sai đi làm Cha Chánh Xứ Nhà Thờ Chánh Tòa Mỹ Tho"',
    tableNote: 'Trước đó là Cha Sở Giáo xứ An Đức (1959 – 1965), kiêm nhiệm cả họ đạo Bình Tạo. Về Chánh Tòa năm 1965, coi sóc họ đạo qua giai đoạn chiến sự ác liệt từ biến cố Mậu Thân 1968; giữ vững sinh hoạt phụng vụ và tổ chức công tác bác ái trợ giúp đồng bào di tản đổ về thành phố Mỹ Tho.',
    shortDesc: 'Kế nhiệm trực tiếp Cha Micae Nguyễn Khoa Học, ngài gánh vác họ đạo Chánh Tòa qua một giai đoạn đầy thử thách. Nhận nhiệm sở đúng lúc chiến sự trở nên ác liệt từ biến cố Mậu Thân 1968, sứ vụ của ngài tập trung vào việc giữ vững sinh hoạt phụng vụ, ổn định đời sống đức tin và tổ chức công tác bác ái trợ giúp làn sóng đồng bào di tản từ vùng chiến sự đổ về trung tâm thành phố. Ngài cũng là cộng sự đắc lực bên cạnh Đức Cha tiên khởi Giuse Trần Văn Thiện trong việc kiện toàn cơ cấu của một giáo phận còn non trẻ.',
    chronology: [
      {
        time: '1959 – 1965',
        title: 'Cha Sở Giáo xứ An Đức',
        content: 'Coi sóc Giáo xứ An Đức và kiêm nhiệm họ đạo Bình Tạo từ năm 1959 đến 1965, khi số giáo dân Bình Tạo đã trên 160 người.'
      },
      {
        time: '1965',
        title: 'Về nhận Nhà thờ Chánh Tòa',
        content: 'Được sai đi làm Cha Chánh Xứ Nhà thờ Chánh Tòa Mỹ Tho; Cha Tađêô Võ Thành Tích thay ngài coi sóc Giáo xứ An Đức và kiêm nhiệm Bình Tạo.'
      },
      {
        time: '1968 – 1975',
        title: 'Giữ vững đời sống đức tin & công tác bác ái',
        content: 'Duy trì các sinh hoạt phụng vụ tại nhà thờ mẹ của giáo phận, ổn định đời sống đức tin cộng đoàn và tổ chức trợ giúp đồng bào di tản từ các vùng chiến sự về trung tâm thành phố Mỹ Tho.'
      },
      {
        time: '1968 – 1975',
        title: 'Cộng sự của Đức Cha tiên khởi',
        content: 'Sát cánh cùng Đức Cha Giuse Trần Văn Thiện trong việc phát triển cơ cấu hành chính và mục vụ của Giáo phận Mỹ Tho còn non trẻ.'
      },
      {
        time: 'đầu 1975',
        title: 'Bàn giao sứ vụ',
        content: 'Hoàn thành nhiệm kỳ và trao lại quyền chánh sở cho Cha Giuse Nguyễn Văn Chúc.'
      }
    ],
    milestones: [
      'Chánh sở Nhà thờ Chánh Tòa Mỹ Tho 1965 – đầu 1975.',
      'Cha Sở Giáo xứ An Đức kiêm nhiệm họ đạo Bình Tạo (1959 – 1965).',
      'Giữ vững sinh hoạt phụng vụ tại nhà thờ mẹ của giáo phận suốt thời chiến.',
      'Tổ chức công tác bác ái trợ giúp đồng bào di tản về thành phố Mỹ Tho.'
    ]
  },
  {
    id: 'cha-nguyen-van-chuc',
    image: '/images/cha_nguyen_van_chuc.jpg',
    source: 'Ảnh do giáo xứ cung cấp (ảnh kỷ niệm ngày thụ phong, không phải thời kỳ làm cha sở). giaophanmytho.net (xác nhận ngài cho xây tháp chuông năm 1995, tức trong nhiệm kỳ; bài Gx. Tân Long: "Từ năm 1975 đến 1992, các cha thuộc Giáo xứ Chánh Tòa phụ trách gồm có: cha Giuse Nguyễn Văn Chúc, cha Phêrô Trần Xuân Lộc, và cha Đôminicô Lê Văn Bền") + tư liệu giáo xứ (nhiệm kỳ tại Chánh Tòa 1975 – 1999)',
    tableNote: 'Nhận xứ ngay trước biến cố tháng 4/1975, giữ vững sinh hoạt phụng vụ qua giai đoạn biến động nhất. Đầu năm 1975 ngài cùng giáo dân mua một căn nhà lá làm nhà nguyện, đặt nền móng cho Họ đạo Tân Long; từ 1975 đến 1992 ngài cùng Cha Phêrô Trần Xuân Lộc và Cha Đôminicô Lê Văn Bền — đều thuộc Giáo xứ Chánh Tòa — phụ trách họ đạo Tân Long. Năm 1995 ngài chủ trì xây tháp chuông tách rời khỏi thánh đường: đặt viên đá 16/02/1995, khánh thành 30/11/1995.',
    name: 'Lm. Giuse Nguyễn Văn Chúc',
    saintName: 'Thánh Giuse (Joseph)',
    role: 'Linh mục Chánh xứ Nhà thờ Chánh Tòa Mỹ Tho (1975 – 1999)',
    period: '1975 – 1999',
    death: '14/12/1999 tại Tiền Giang',
    origin: 'Giáo phận Mỹ Tho',
    shortDesc: 'Vị mục tử nhân hiền, hiền hòa và tận tụy phục vụ giáo xứ Chánh Tòa suốt hơn 20 năm qua giai đoạn đầy gian khó sau năm 1975. Dấu ấn kiến trúc lớn nhất của ngài là tháp chuông tách rời hẳn khỏi nhà thờ (1995): vì lo tiếng chuông rung chấn làm hư hại ngôi thánh đường xây từ 1906, ngài cho dựng một tháp chuông riêng — Đức Cha Anrê Nguyễn Văn Nam đặt viên đá đầu tiên ngày 16/02/1995, công trình khánh thành sau hơn 9 tháng vào ngày 30/11/1995.',
    chronology: [
      {
        time: '1975 – 1992',
        title: 'Giữ vững đức tin qua giai đoạn biến động',
        content: 'Nhận xứ ngay trước biến cố tháng 4/1975, ngài kiên trì ở lại, duy trì các thánh lễ và ổn định đời sống tinh thần cho giáo dân giữa bối cảnh xã hội đổi thay sâu sắc. Cùng thời gian này, ngài và Cha Phêrô Trần Xuân Lộc, Cha Đôminicô Lê Văn Bền — đều thuộc Giáo xứ Chánh Tòa — phụ trách họ đạo Tân Long cho đến năm 1992.'
      },
      {
        time: 'đầu 1975',
        title: 'Đặt nền móng Họ đạo Tân Long',
        content: 'Dù hoàn cảnh kinh tế xã hội hết sức thắt ngặt, ngài cùng giáo dân vẫn mua một căn nhà lá làm nhà nguyện — nền móng đầu tiên hình thành Họ đạo Tân Long sau này.'
      },
      {
        time: '1975 – 1985',
        title: 'Dẫn dắt họ đạo qua thời kỳ gian nan',
        content: 'Kiên trì dâng thánh lễ hằng ngày, giữ vững sự hiệp nhất trong cộng đoàn giáo xứ và duy trì các lớp giáo lý bí tích.'
      },
      {
        time: '1995',
        title: 'Xây dựng Tháp chuông tách rời (16/02 – 30/11/1995)',
        content: 'Để tránh rung chấn làm hư hại vòm và tường gạch cổ của nhà thờ xây từ năm 1906, ngài cho dựng một tháp chuông tách hẳn khỏi thánh đường. Đức Cha Anrê Nguyễn Văn Nam đặt viên đá đầu tiên ngày 16/02/1995; sau hơn 9 tháng thi công, tháp chuông mới được khánh thành ngày 30/11/1995 và trở thành biểu tượng của Chánh Tòa Mỹ Tho.'
      },
      {
        time: '1998 – 1999',
        title: 'Phục vụ tại Bà Tồn và an nghỉ trong Chúa',
        content: 'Tiếp tục dấn thân mục vụ tại Giáo xứ Bà Tồn cho đến khi được Chúa gọi về ngày 14/12/1999.'
      }
    ],
    milestones: [
      'Chủ trì xây dựng tháp chuông tách rời khỏi nhà thờ (đặt viên đá 16/02/1995, khánh thành 30/11/1995) để bảo vệ ngôi thánh đường cổ.',
      'Đặt nền móng cho Họ đạo Tân Long (đầu năm 1975).',
      'Mục tử nhân ái gìn giữ sự bình an và đức tin kiên trung của Giáo xứ Chánh Tòa suốt hơn 20 năm.',
      'Thành lập họ đạo Tân Long và chăm lo đời sống người nghèo khó.'
    ]
  },
  {
    id: 'cha-ho-ban-chanh',
    image: '/images/cha_ho_ban_chanh.jpg',
    name: 'Lm. Phêrô Hồ Bản Chánh',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Linh mục Chánh sở Nhà thờ Chánh Tòa Mỹ Tho (1999 – 2005), sau là Tổng Đại Diện Giáo phận',
    period: '1999 – 2005',
    origin: 'Giáo phận Mỹ Tho',
    source: 'Ảnh do giáo xứ cung cấp. Tư liệu giáo xứ (nhiệm kỳ 1999 – 2005 tại Chánh Tòa). Đã xác nhận được: danh sách GP Mỹ Tho 2009 ghi ngài là Tổng Đại Diện Giáo phận; giaophanmytho.net (03/2011) gọi ngài là "nguyên Tổng Đại Diện", sau coi sóc Giáo xứ Thủ Ngữ.',
    tableNote: 'Kế nhiệm Cha Giuse Nguyễn Văn Chúc, coi sóc họ đạo Chánh Tòa qua thời kỳ Đại Năm Thánh 2000 — dịp Đức Cha Phaolô Bùi Văn Đọc cử hành Lễ Cung hiến Nhà thờ Chánh Tòa ngày 21/01/2000. Về sau ngài được đặt làm Tổng Đại Diện Giáo phận Mỹ Tho.',
    shortDesc: 'Kế nhiệm Cha Giuse Nguyễn Văn Chúc năm 1999, ngài coi sóc họ đạo Chánh Tòa qua thời kỳ Đại Năm Thánh 2000 — giai đoạn ngôi thánh đường được Đức Cha Phaolô Bùi Văn Đọc long trọng cử hành Lễ Cung hiến ngày 21/01/2000 và nhận Lễ Đức Mẹ Hồn Xác Lên Trời làm lễ Bổn mạng thứ hai. Năm 2005 ngài chuyển giao giáo xứ cho Cha Giacôbê Hà Văn Xung. Về sau ngài được đặt làm Tổng Đại Diện Giáo phận Mỹ Tho, rồi xin thôi chức và về coi sóc Giáo xứ Thủ Ngữ.',
    chronology: [
      {
        time: '1999',
        title: 'Nhận Nhà thờ Chánh Tòa',
        content: 'Được bổ nhiệm làm Cha sở Nhà thờ Chánh Tòa Mỹ Tho sau khi Cha Giuse Nguyễn Văn Chúc mãn nhiệm.'
      },
      {
        time: '2000',
        title: 'Đại Năm Thánh & Lễ Cung hiến',
        content: 'Coi sóc họ đạo trong dịp Đại Năm Thánh 2000. Ngày 21/01/2000 Đức Cha Phaolô Bùi Văn Đọc cử hành Lễ Cung hiến Nhà thờ Chánh Tòa Mỹ Tho và chọn Lễ Đức Mẹ Hồn Xác Lên Trời làm lễ Bổn mạng thứ hai của nhà thờ.'
      },
      {
        time: '2005',
        title: 'Chuyển giao sứ vụ',
        content: 'Trao lại quyền chánh sở cho Cha Giacôbê Hà Văn Xung.'
      },
      {
        time: 'sau 2005',
        title: 'Tổng Đại Diện Giáo phận Mỹ Tho',
        content: 'Được đặt làm Tổng Đại Diện Giáo phận Mỹ Tho, đồng thời là Phó Chủ tịch Hội đồng Mục vụ Giáo phận. Đến năm 2011 ngài xin thôi chức Tổng Đại Diện và về coi sóc Giáo xứ Thủ Ngữ.'
      }
    ],
    milestones: [
      'Chánh sở Nhà thờ Chánh Tòa Mỹ Tho 1999 – 2005.',
      'Coi sóc họ đạo trong dịp Lễ Cung hiến Nhà thờ Chánh Tòa, Đại Năm Thánh 2000.',
      'Tổng Đại Diện Giáo phận Mỹ Tho.'
    ]
  },
  {
    id: 'cha-ha-van-xung',
    priestOrdination: 'Thụ phong Linh mục ngày 27/06/1992',
    source: 'Tư liệu giáo xứ (thụ phong 27/06/1992; về Tòa Giám mục năm 1999, sáu năm sau được trao giáo xứ Chánh Tòa) + giaophanmytho.net (chủ trì trùng tu khởi công 14/06/2006; danh sách linh mục đoàn 2009 ghi ngài ở Chánh Tòa)',
    tableNote: 'Thụ phong 27/06/1992, làm phó biệt cư họ đạo Tân Phước hai năm, du học Pháp về mục vụ giáo lý từ 1994, về Tòa Giám mục năm 1999 làm thư ký Đức Cha Phaolô Bùi Văn Đọc và đặc trách giáo lý toàn giáo phận; sáu năm sau được trao giáo xứ Chánh Tòa. Chủ trì đợt trùng tu 100 năm (khởi công 14/06/2006, lễ tạ ơn 21/05/2007), xây Đài Đức Mẹ (2009) và Nhà Mục vụ Giáo xứ (2020).',
    name: 'Linh mục Giacôbê Hà Văn Xung',
    saintName: 'Thánh Giacôbê Tông Đồ (James / Jacob)',
    role: 'Linh mục Trưởng Hạt (Hạt Trưởng) Giáo hạt Mỹ Tho • Linh mục Chánh xứ Nhà thờ Chánh Tòa Mỹ Tho',
    period: '2005 – nay',
    birth: 'Giáo phận Mỹ Tho',
    origin: 'Giáo phận Mỹ Tho',
    motto: '“Tôi tớ trung tín phục vụ Dân Chúa”',
    mottoLatin: 'In Caritate et Ministerio',
    image: '/images/cha_so_ha_van_xung.jpg',
    shortDesc: 'Linh mục Trưởng Hạt (Hạt Trưởng) Giáo hạt Mỹ Tho kiêm Linh mục Chánh xứ Nhà thờ Chánh Tòa Mỹ Tho. Ngài luôn đồng hành chặt chẽ cùng Đức Giám mục Giáo phận, điều phối sứ vụ mục tử liên xứ trong giáo hạt, chăm lo đời sống thiêng liêng cho cộng đoàn Chánh Tòa và dẫn dắt các phong trào hội đoàn giáo dân.',
    chronology: [
      {
        time: '1992 – 1994',
        title: 'Thụ phong Linh mục & Bài sai đầu tiên',
        content: 'Thụ phong linh mục ngày 27/06/1992. Bài sai đầu tiên là phó biệt cư tại họ đạo Tân Phước, phục vụ ở đó hai năm.'
      },
      {
        time: '1994 – 1999',
        title: 'Du học Pháp về Mục vụ Giáo lý',
        content: 'Được bề trên cử đi du học tại Pháp, chuyên ngành mục vụ giáo lý.'
      },
      {
        time: '1999 – 2005',
        title: 'Thư ký Đức Giám mục & Đặc trách Giáo lý Giáo phận',
        content: 'Về công tác tại Tòa Giám mục Giáo phận Mỹ Tho, làm thư ký cho Đức Cha Phaolô Bùi Văn Đọc và đặc trách các hoạt động giáo lý trong toàn giáo phận.'
      },
      {
        time: '2005',
        title: 'Nhận coi sóc Giáo xứ Chánh Tòa',
        content: 'Sáu năm sau khi về Tòa Giám mục, ngài được trao phó trông coi giáo xứ Chánh Tòa, kế nhiệm Cha Phêrô Hồ Bản Chánh, và gắn bó với "nhà thờ mẹ" của giáo phận từ đó đến nay.'
      },
      {
        time: '2009',
        title: 'Tôn tạo Đài Đức Mẹ',
        content: 'Xây dựng lại Đài Đức Mẹ quy mô và trang nghiêm hơn ngay giữa khuôn viên nhà thờ.'
      },
      {
        time: 'Trọng trách Giáo Hạt',
        title: 'Linh mục Trưởng Hạt (Hạt Trưởng) Giáo hạt Mỹ Tho',
        content: 'Được Đức Giám mục Giáo phận tín nhiệm giao phó trọng trách Linh mục Trưởng Hạt (Hạt Trưởng) Giáo hạt Mỹ Tho. Ngài chịu trách nhiệm điều phối công tác mục vụ giữa các giáo xứ trong hạt, chủ tọa các phiên họp linh mục hạt, tổ chức các cuộc hành hương Năm Thánh, đại lễ liên xứ và gắn kết sự hiệp thông với Tòa Giám mục.'
      },
      {
        time: 'Mục tử Chánh xứ',
        title: 'Cha Sở Nhà thờ Chánh Tòa Mỹ Tho',
        content: 'Trực tiếp coi sóc ngôi Thánh đường Mẹ của Giáo phận Mỹ Tho. Ngài đã xin ý kiến Đức Giám mục để trùng tu và nới rộng nhà thờ nhân 100 năm xây dựng: lễ khởi công ngày 14/06/2006, gồm thay mái ngói, nới rộng hai bên hông, xây lại phòng thánh, cải tạo tháp chuông và đặt 14 chặng Đàng Thánh Giá quanh nhà thờ. Sau 9 tháng thi công, ngày 21/05/2007 Đức Giám mục dâng lễ tạ ơn và khai mạc Năm Thánh mừng 100 năm. Ngài còn khánh thành Nhà Mục vụ Giáo xứ (2020) và công trình Lễ đài Đức Mẹ.'
      },
      {
        time: 'Sứ vụ Mục vụ',
        title: 'Cử hành Phụng vụ & Đồng hành Đoàn thể',
        content: 'Chủ tế và đồng tế trong các thánh lễ đại triều của Giáo phận, cử hành các bí tích, giải tội, xức dầu bệnh nhân, chăm sóc người cao tuổi, và linh hướng cho các đoàn thể nòng cốt như Xứ Đoàn Thiếu Nhi Thánh Thể Các Thánh Tử Đạo Việt Nam, Huynh Trưởng và Hội Các Bà Mẹ Công Giáo.'
      }
    ],
    milestones: [
      'Linh mục Trưởng Hạt Giáo hạt Mỹ Tho, điều phối và gắn kết các linh mục cùng các cộng đoàn giáo xứ trong hạt.',
      'Linh mục Chánh xứ Nhà thờ Chánh Tòa Mỹ Tho, ngôi Thánh đường Mẹ của Giáo phận.',
      'Chủ trì công trình Đại trùng tu Bách Chu Niên Nhà thờ Chánh Tòa (2006 – 2007) và xây dựng Nhà Mục vụ Giáo xứ (2020).',
      'Mục tử tận tụy trong việc cử hành bí tích, chăm sóc mục vụ bệnh nhân và nâng đỡ các đoàn thể đức tin.'
    ]
  }
];

/**
 * Một dòng của bảng niên biểu cha sở: hoặc trỏ tới lý lịch đã có, hoặc là
 * khoảng trống lịch sử chưa tra được nguồn.
 */
export interface PastorTimelineRow {
  period: string;
  bioId?: string;
  name?: string;
  note?: string;
  source?: string;
  sortKey?: number;
}

/**
 * Các khoảng thời gian chưa xác định được ai coi sóc họ đạo. Giữ lại trong
 * bảng để người đọc thấy rõ đâu là chỗ còn thiếu tư liệu, thay vì kéo dài
 * niên hiệu của vị trước cho liền mạch một cách sai lệch.
 */
const PASTOR_GAPS: PastorTimelineRow[] = [];

/** Năm bắt đầu của một mốc thời gian, dùng để xếp bảng theo đúng niên đại. */
function startYear(period: string): number | null {
  const m = period.match(/\d{4}/);
  return m ? Number(m[0]) : null;
}

/**
 * PASTORS_EXTENDED_DATA vốn đã xếp đúng niên đại. Mục nào chưa xác định được
 * năm (ví dụ Cha Huỳnh Kim Do) thì thừa kế năm của vị liền trước cộng một
 * phần nhỏ, để giữ nguyên vị trí trong chuỗi thay vì rơi xuống cuối bảng.
 */
let lastKnownYear = 0;
export const PASTOR_TIMELINE: PastorTimelineRow[] = [
  ...PASTORS_EXTENDED_DATA.map((p, i) => {
    const y = startYear(p.period);
    if (y !== null) lastKnownYear = y;
    return {
      period: p.period,
      bioId: p.id,
      name: p.name,
      note: p.tableNote,
      source: p.source,
      sortKey: (y ?? lastKnownYear) + i / 1000
    };
  }),
  ...PASTOR_GAPS.map((g) => ({ ...g, sortKey: startYear(g.period) ?? 0 }))
].sort((a, b) => a.sortKey - b.sortKey);

export const ALL_COMMUNITY_BIOS: DetailedBioRecord[] = [
  ...BISHOPS_EXTENDED_DATA,
  ...PASTORS_EXTENDED_DATA,
  POPE_LEO_XIV_BIO
];

/**
 * Khăn quàng TNTT theo bảng "Mẫu khăn quàng và các cấp hiệu trong Phong trào
 * Thiếu Nhi Thánh Thể Việt Nam" của Liên đoàn Các Thánh Tử Đạo Việt Nam —
 * Giáo phận Mỹ Tho.
 *
 * LƯU Ý QUAN TRỌNG: khăn của các NGÀNH (Chiên Con, Ấu Nhi, Thiếu Nhi, Nghĩa
 * Sĩ, Hiệp Sĩ) đều KHÔNG CÓ VIỀN. Viền chỉ dành riêng cho đội trưởng và đội
 * phó. Bản dữ liệu trước đây gán viền cho mọi ngành là sai.
 */
interface TnttScarf {
  id: string;
  name: string;
  motto: string;
  age?: string;
  /** Màu khăn */
  scarf: string;
  scarfName: string;
  /** Màu Thánh Giá sau chéo */
  cross: string;
  crossName: string;
  /** Viền khăn — chỉ đặt khi cấp bậc đó thực sự có viền */
  trim?: string;
  trimName?: string;
  /** Quy định viền riêng cho đội trưởng / đội phó của ngành */
  leaderTrim?: string;
  symbolism: string;
}

/** Vẽ khăn quàng: hình tam giác đúng dáng khăn, có Thánh Giá chéo và viền nếu có. */
function ScarfIcon({ scarf }: { scarf: TnttScarf }) {
  const needsOutline = scarf.scarf.toUpperCase() === '#FFFFFF';
  return (
    <svg viewBox="0 0 48 34" width={48} height={34} role="img" aria-label={`Khăn ${scarf.scarfName}`} style={{ flexShrink: 0 }}>
      <polygon
        points="2,3 46,3 24,31"
        fill={scarf.scarf}
        stroke={scarf.trim ?? (needsOutline ? 'var(--color-border-subtle)' : 'none')}
        strokeWidth={scarf.trim ? 2.5 : 1}
        strokeLinejoin="round"
      />
      <g stroke={scarf.cross} strokeWidth="2.2" strokeLinecap="round">
        <line x1="24" y1="9" x2="24" y2="19" />
        <line x1="19" y1="13" x2="29" y2="13" />
      </g>
    </svg>
  );
}

const TNTT_NGANH: TnttScarf[] = [
  {
    id: 'chien-con',
    name: 'Chiên Con (Khai Tâm)',
    motto: 'Hiền Lành',
    age: '4 – 6 tuổi',
    scarf: '#F8A5C2',
    scarfName: 'Hồng',
    cross: '#DC2626',
    crossName: 'Thánh Giá đỏ, cỡ 4cm',
    leaderTrim: 'Đội trưởng và đội phó có 1 viền đỏ',
    symbolism: 'Màu hồng tượng trưng cho tâm hồn đơn sơ, trong trắng và vui tươi của các em.'
  },
  {
    id: 'au-nhi',
    name: 'Ấu Nhi',
    motto: 'Ngoan',
    age: '7 – 9 tuổi',
    scarf: '#4CAF50',
    scarfName: 'Xanh lá cây',
    cross: '#FBBF24',
    crossName: 'Thánh Giá vàng, cỡ 4cm',
    leaderTrim: 'Đội trưởng và đội phó có 1 viền đỏ',
    symbolism: 'Màu xanh mạ non diễn tả các em như một lá non trên cành cây đang vươn mình lớn dậy — màu của lứa tuổi hồn nhiên, ngây thơ, biểu tượng cho tâm tình luôn trông cậy vào cha mẹ và phó thác vào Chúa.'
  },
  {
    id: 'thieu-nhi',
    name: 'Thiếu Nhi',
    motto: 'Hy Sinh',
    age: '10 – 12 tuổi',
    scarf: '#1E3A8A',
    scarfName: 'Xanh dương',
    cross: '#FBBF24',
    crossName: 'Thánh Giá vàng, cỡ 5cm',
    leaderTrim: 'Đội trưởng và đội phó có 1 viền vàng',
    symbolism: 'Màu khăn xanh biển tượng trưng cho một sức sống mạnh mẽ như trời xanh biển rộng và một hy vọng lớn lao cho tương lai của Giáo Hội và quê hương.'
  },
  {
    id: 'nghia-si',
    name: 'Nghĩa Sĩ',
    motto: 'Chinh Phục',
    age: '13 – 15 tuổi',
    scarf: '#EAB308',
    scarfName: 'Vàng nghệ',
    cross: '#DC2626',
    crossName: 'Thánh Giá đỏ, cỡ 5cm',
    leaderTrim: 'Đội trưởng và đội phó có 1 viền đỏ',
    symbolism: 'Màu vàng nghệ tượng trưng cho bình minh đang ló dạng và toả sáng của lứa tuổi sắp vào đời, nhắc các em luôn thể hiện tinh thần vượt khó để chinh phục bản thân theo đường lối của Thiên Chúa.'
  },
  {
    id: 'hiep-si',
    name: 'Hiệp Sĩ',
    motto: 'Dấn Thân',
    age: '16 – 17 tuổi',
    scarf: '#6B4423',
    scarfName: 'Nâu đất',
    cross: '#FBBF24',
    crossName: 'Thánh Giá vàng, cỡ 5cm',
    leaderTrim: 'Đội trưởng và đội phó có 1 viền vàng',
    symbolism: 'Màu nâu như màu của đất, nơi dòng máu đức tin của các Thánh Tử Đạo Việt Nam đã đổ ra và chảy vào lòng đất mẹ — nói lên lòng trung thành với đất nước và tình yêu đối với Thiên Chúa, xứng đáng với tuổi hiệp sĩ hào hùng.'
  }
];

const TNTT_HUYNH_TRUONG: TnttScarf[] = [
  {
    id: 'du-truong',
    name: 'Dự Trưởng',
    motto: 'Phụng Sự',
    age: 'Giáo lý viên dự bị',
    scarf: '#DC2626',
    scarfName: 'Đỏ, không viền',
    cross: '#FBBF24',
    crossName: 'Thánh Giá cỡ 6cm',
    symbolism: 'Khăn đỏ không viền nói lên sự sửa soạn để trở thành Huynh Trưởng chính thức. Màu đỏ là màu của sự hy sinh và tràn đầy sức sống dám quên mình để tập phục vụ Chúa qua các em một cách vui tươi và hăng hái.'
  },
  {
    id: 'huynh-truong',
    name: 'Huynh Trưởng',
    motto: 'Phụng Sự',
    age: 'Giáo lý viên các cấp',
    scarf: '#DC2626',
    scarfName: 'Đỏ',
    cross: '#FBBF24',
    crossName: 'Thánh Giá vàng, cỡ 6cm',
    trim: '#FBBF24',
    trimName: '1 viền vàng',
    symbolism: 'Màu đỏ là màu của máu, tượng trưng cho sự hy sinh hiến tế và gian khổ mà người Huynh Trưởng phải chấp nhận để hướng dẫn và dìu dắt các em đến với Chúa. Viền vàng tượng trưng cho niềm vui mừng và hy vọng.'
  },
  {
    id: 'huan-luyen-vien',
    name: 'Huấn Luyện Viên',
    motto: 'Sẵn Sàng',
    age: 'Ban huấn luyện các sa mạc',
    scarf: '#7C3AED',
    scarfName: 'Tím',
    cross: '#FBBF24',
    crossName: 'Thánh Giá vàng, cỡ 6cm',
    trim: '#FBBF24',
    trimName: 'Viền vàng (cấp I), thêm viền xanh dương (cấp II), thêm viền xanh lá (cấp III)',
    symbolism: 'Màu tím là màu của sự hãm mình hy sinh trong vui tươi và tràn đầy hy vọng; màu của sự "sẵn sàng", tự thân và tự huấn luyện để nhắc nhớ người Huấn Luyện Viên phải biết mình luôn hy sinh, phục vụ không quản ngại khó khăn.'
  },
  {
    id: 'tro-ta',
    name: 'Trợ Tá',
    motto: 'Phục Vụ',
    age: 'Cộng tác viên giáo dân',
    scarf: '#DC2626',
    scarfName: 'Đỏ',
    cross: '#2563EB',
    crossName: 'Thánh Giá xanh dương, cỡ 6cm',
    trim: '#2563EB',
    trimName: 'Viền xanh dương',
    symbolism: 'Màu đỏ là màu của hy lễ và lòng hy sinh nhẫn nại phục vụ. Viền xanh nước biển — màu của Thiếu Nhi — nói lên lòng quảng đại phục vụ các em Thiếu Nhi của người Trợ Tá.'
  },
  {
    id: 'tro-uy',
    name: 'Trợ Uý',
    motto: 'Nhiệt Thành',
    age: 'Tu sĩ nam nữ',
    scarf: '#DC2626',
    scarfName: 'Đỏ',
    cross: '#FFFFFF',
    crossName: 'Thánh Giá trắng, cỡ 6cm',
    trim: '#FFFFFF',
    trimName: 'Viền trắng',
    symbolism: 'Màu đỏ là màu của hy lễ hiến tế và hy sinh phục vụ. Viền trắng — màu khăn của tuyên uý — tượng trưng sự trong sạch, sự nhẫn nại và lòng độ lượng của người Trợ Uý trong Phong trào.'
  },
  {
    id: 'tuyen-uy',
    name: 'Tuyên Uý',
    motto: 'Hiến Dâng',
    age: 'Linh mục',
    scarf: '#FFFFFF',
    scarfName: 'Trắng',
    cross: '#FBBF24',
    crossName: 'Thánh Giá vàng, cỡ 6cm',
    trim: '#FBBF24',
    trimName: 'Viền vàng',
    symbolism: 'Màu trắng là màu trong sạch, tượng trưng cho sự trong sáng tinh tuyền, niềm hy vọng và lòng cậy trông để dâng hiến cuộc đời làm hy tế và làm chứng tá cho Chúa và Giáo Hội. Vì vậy, Ngài sẽ là Người đại diện cho Chúa để hướng dẫn Đoàn Thiếu Nhi Thánh Thể.'
  }
];

export default function GioiThieuPage() {
  const { t } = useLanguage();
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption: string } | null>(null);
  const [selectedBio, setSelectedBio] = useState<DetailedBioRecord | null>(null);
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
            flexWrap: 'wrap',
            gap: '8px',
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
            <Globe size={14} color="var(--color-red)" />
            <span>Bách khoa toàn thư Công Giáo</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTAINER (WIKIPEDIA LAYOUT: ARTICLE BODY + INFOBOX)
          ========================================================================= */}
      <div
        style={{
          backgroundColor: 'transparent' // optional cleanup or just empty
        }}
        className="wiki-container main-layout"
      >
        {/* =======================================================================
            CỘT TRÁI: NỘI DUNG CHÍNH (MAIN ARTICLE CONTENT)
            ======================================================================= */}
        <article style={{ flex: 1, minWidth: 0 }}>
          {/* Article Title */}
          <h1
            style={{
              fontSize: '2.1rem',
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
          <p style={{ fontSize: '0.96rem', lineHeight: 1.75, margin: '0 0 16px', textAlign: 'justify' }}>
            <strong>Nhà thờ chính tòa Mỹ Tho</strong> (tên hiệu đầy đủ: <em>Nhà thờ chính tòa Đức Mẹ Vô Nhiễm Nguyên Tội</em>) là
            ngôi nhà thờ mẹ và là trung tâm hiệp thông phụng vụ của <strong>Giáo phận Mỹ Tho</strong>, tọa lạc tại số 32 đại lộ
            Hùng Vương, phường 7, thành phố Mỹ Tho, tỉnh Tiền Giang, thuộc Giáo tỉnh Sài Gòn, Việt Nam. Đây là trung tâm đầu não
            chăm sóc đời sống đức tin cho hơn 130.000 tín hữu Công giáo trên địa bàn ba tỉnh Tiền Giang, Long An và Đồng Tháp.
          </p>

          <p style={{ fontSize: '0.96rem', lineHeight: 1.75, margin: '0 0 20px', textAlign: 'justify' }}>
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
              borderRadius: '12px',
              padding: '16px 20px',
              margin: '20px 0 28px',
              display: 'block',
              maxWidth: '100%',
              boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
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
                  <a href="#vatican-popes" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Tòa Thánh Vatican, Đức Thánh Cha Lêô XIV &amp; 267 Vị Giáo Hoàng
                  </a>
                  <ol style={{ paddingLeft: '18px', color: 'var(--color-subtle)' }}>
                    <li>
                      <a href="#vatican-gioi-thieu" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Thành quốc Vatican &amp; Vương Cung Thánh Đường Thánh Phêrô
                      </a>
                    </li>
                    <li>
                      <a href="#vatican-dtc-leo-xiv" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Đức Thánh Cha đương kim Lêô XIV (Leo XIV)
                      </a>
                    </li>
                    <li>
                      <a href="#vatican-267-giao-hoang" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Biên niên sử Các Giáo Triều Roma (267 Vị Giáo Hoàng)
                      </a>
                    </li>
                  </ol>
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
                    <li>
                      <a href="#nien-bieu-cha-so" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Niên biểu các Đời Linh mục Chánh Sở Nhà thờ Chánh Tòa (1860 – Nay)
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
                        Mặt tiền Phục Hưng và Tháp chuông tách rời
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
                    Cơ cấu Giáo phận &amp; Các Đời Giám Mục Mỹ Tho (Tiểu Sử Chi Tiết)
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
              1. TÒA THÁNH VATICAN, ĐỨC THÁNH CHA LÊÔ XIV & 267 VỊ GIÁO HOÀNG
              ===================================================================== */}
          <section id="vatican-popes" style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--color-dark)',
                borderBottom: '1px solid var(--color-border-subtle)',
                paddingBottom: '6px',
                marginTop: '32px'
              }}
            >
              1. Tòa Thánh Vatican, Đức Thánh Cha Lêô XIV &amp; 267 Vị Giáo Hoàng
            </h2>

            <h3 id="vatican-gioi-thieu" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '18px 0 8px' }}>
              1.1. Thành quốc Vatican &amp; Vương Cung Thánh Đường Thánh Phêrô
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              <strong>Tòa Thánh Vatican</strong> (tiếng Latinh: <em>Sancta Sedes</em>) và <strong>Thành quốc Vatican</strong> (<em>Status Civitatis Vaticanae</em>)
              là trung tâm đầu não tối cao của Giáo hội Công giáo Rôma toàn cầu. Được thiết lập độc lập theo Hiệp ước Lateranô (1929),
              đây là quốc gia có chủ quyền nhỏ nhất thế giới (diện tích 0,49 km²) nằm trọn trong lòng thủ đô Rôma, Ý.
            </p>

            {/* BỘ SƯU TẬP HÌNH ẢNH TOÀ THÁNH VATICAN */}
            <div
              className="responsive-grid"
            >
              <div
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '12px',
                  padding: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
                }}
                onClick={() => setLightboxImage({ src: '/images/vatican_st_peter.jpg', caption: 'Quảng trường và Vương cung thánh đường Thánh Phêrô (Vatican) nhìn từ trên cao.' })}
              >
                <div style={{ position: 'relative', width: '100%', height: '160px', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' }}>
                  <Image src="/images/vatican_st_peter.jpg" alt="Vương cung thánh đường Thánh Phêrô" fill sizes="260px" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                  Vương Cung Thánh Đường Thánh Phêrô
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                  Kiệt tác kiến trúc Phục Hưng vĩ đại nhất nhân loại.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '12px',
                  padding: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
                }}
                onClick={() => setLightboxImage({ src: '/images/vatican_basilica_interior.jpg', caption: 'Gian Cung thánh uy nghiêm và Mái vòm Baldacchino bằng đồng của Bernini bên trong Đền thờ Thánh Phêrô.' })}
              >
                <div style={{ position: 'relative', width: '100%', height: '160px', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' }}>
                  <Image src="/images/vatican_basilica_interior.jpg" alt="Bên trong Đền thờ Thánh Phêrô" fill sizes="260px" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                  Bên trong Đền Thờ Thánh Phêrô
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                  Nơi Đức Thánh Cha cử hành các Đại Lễ Phụng vụ toàn cầu.
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Trọng tâm của Vatican là <strong>Vương cung thánh đường Thánh Phêrô</strong> (<em>Basilica Sancti Petri</em>) — ngôi thánh đường
              được xây dựng trên chính lăng mộ của Thánh Tông đồ Phêrô. Quần thể Vatican còn bao gồm: <em>Điện Tông Tòa</em> (nơi ở và làm việc
              của Đức Giáo hoàng), <em>Nhà nguyện Sistine</em> (nơi diễn ra Mật viện Hồng Y bầu chọn Giáo hoàng mới và lưu giữ bích họa bất hủ
              của Michelangelo), <em>Thư viện &amp; Viện Bảo tàng Vatican</em> và <em>Đội Cận vệ Thụy Sĩ</em> với bề dày lịch sử hơn 500 năm.
            </p>

            <h3 id="vatican-dtc-leo-xiv" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '24px 0 8px' }}>
              1.2. Đức Thánh Cha đương kim Lêô XIV (Leo XIV)
            </h3>

            {/* Thumbnail chân dung Đức Giáo hoàng Lêô XIV */}
            <div
              className="floating-img-270"
              style={{
                padding: '8px',
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '310px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-input-bg)'
                }}
                onClick={() => setSelectedBio(POPE_LEO_XIV_BIO)}
              >
                <Image
                  src="/images/pope_leo_xiv.jpg"
                  alt="Đức Giáo hoàng Lêô XIV"
                  fill
                  sizes="270px"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    color: '#FFF',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Eye size={12} /> Xem tiểu sử
                </div>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '6px', lineHeight: 1.4 }}>
                <strong>Đức Thánh Cha Lêô XIV</strong> (Leo XIV) — Đấng kế vị Thánh Phêrô, vị Giáo hoàng thứ 267 của Giáo hội Công giáo Hoàn Vũ.
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Người đứng đầu tối cao hiện nay của Giáo hội Công giáo hoàn vũ là <strong>Đức Giáo hoàng Lêô XIV</strong> (tiếng Latinh: <em>Leo XIV</em>).
              Ngài là vị Giáo hoàng thứ 267 trong dòng lịch sử tông truyền liên tục từ Thánh Tông đồ Phêrô. Chọn tông hiệu Lêô XIV, Ngài tiếp nối
              truyền thống của các bậc tiền nhân vĩ đại như Thánh Lêô Cả và Đức Lêô XIII trong công cuộc kiên trì bảo vệ đức tin, canh tân phụng vụ
              và thắt chặt tình huynh đệ Kitô giáo.
            </p>

            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 18px' }}>
              Khẩu hiệu triều đại Giáo hoàng của Ngài là: <em>“In Veritate et Caritate”</em> (tiếng Việt: <em>“Trong Chân Lý và Đức Ái”</em>). Ngài luôn
              dành sự quan tâm mục tử sâu sắc cho các cộng đoàn đức tin địa phương, tăng cường sự hiệp thông bền vững với Giáo hội tại Việt Nam và
              toàn thể Giáo phận Mỹ Tho.
            </p>

            {/* BĂNG CHUYỀN CHÂN DUNG 267 VỊ GIÁO HOÀNG CHẠY LIÊN TỤC */}
            <div id="vatican-267-giao-hoang" style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Church size={19} color="var(--color-red)" />
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                    1.3. Biên Niên Sử Các Giáo Triều (Từ Thánh Phêrô Đến Đức Lêô XIV)
                  </h3>
                </div>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-red)', backgroundColor: 'rgba(153, 27, 27, 0.08)', padding: '3px 10px', borderRadius: '16px', border: '1px solid rgba(153, 27, 27, 0.15)' }}>
                  267 Giáo Triều Tông Truyền
                </span>
              </div>

              {/* Component Marquee Hoàng Gia Chạy Trực Tiếp */}
              <PopesContinuousMarquee />
            </div>
          </section>

          {/* =====================================================================
              2. LỊCH SỬ HÌNH THÀNH & PHÁT TRIỂN
              ===================================================================== */}
          <section id="lich-su" style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: '1.4rem',
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
              className="floating-img-290"
              style={{
                padding: '8px',
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              <div
                style={{ position: 'relative', width: '100%', height: '185px', cursor: 'pointer', borderRadius: '8px', overflow: 'hidden' }}
                onClick={() => setLightboxImage({ src: '/images/nhatho2.jpg', caption: 'Toàn cảnh ngôi thánh đường Chánh Tòa Mỹ Tho cổ kính xây dựng năm 1906.' })}
              >
                <Image
                  src="/images/nhatho2.jpg"
                  alt="Nhà thờ Chánh Tòa Mỹ Tho xưa"
                  fill
                  sizes="290px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '6px', lineHeight: 1.4 }}>
                Toàn cảnh ngôi thánh đường Chánh Tòa Mỹ Tho cổ kính xây dựng năm 1906.
              </div>
            </div>

            <h3 id="lich-su-so-khai" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '18px 0 8px' }}>
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

            <h3 id="lich-su-xay-dung" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
              2.2. Xây dựng ngôi thánh đường hiện nay (1906 – 1910)
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Nhận thấy ngôi nhà thờ cũ đã xuống cấp và diện tích chật hẹp, ngày 11 tháng 8 năm 1906, Linh mục Régnier (thường
              được bà con giáo dân gọi thân mật là <em>cố Gẫm</em>) đã chính thức đặt viên đá đầu tiên khởi công xây dựng
              ngôi thánh đường thứ ba tại đại lộ Bourdais (nay là số 32 đường Hùng Vương). Sau 4 năm thi công kiên cố với vật
              liệu gạch ngói chuyển trực tiếp từ Pháp và thợ lành nghề miền Nam, nhà thờ được khánh thành trọng thể vào năm
              1910.
            </p>

            <h3 id="lich-su-chinh-toa" style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 10px' }}>
              2.3. Sắc Chỉ Tông Hiến Venerabilium Nostrorum &amp; Nâng Lên Chính Tòa (1960)
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 16px' }}>
              Ngày <strong>24 tháng 11 năm 1960</strong> là mốc son chói lọi trong lịch sử Giáo hội Công giáo Việt Nam khi <strong>Thánh Giáo hoàng Gioan XXIII</strong> (<em>Ioannes PP. XXIII</em>) ban hành Tông hiến lịch sử <strong>&ldquo;Venerabilium Nostrorum&rdquo;</strong> (<em>Chư Huynh Đáng Kính</em>). Văn kiện long trọng này chính thức thiết lập Hàng Giáo Phẩm Công Giáo Việt Nam, đồng thời khai sinh <strong>Giáo phận Mỹ Tho</strong> (<em>Dioecesis Mythoensis</em>) và nâng ngôi Thánh đường Mỹ Tho thành <strong>Nhà thờ Chính Tòa Đức Mẹ Vô Nhiễm Nguyên Tội</strong>.
            </p>

            {/* BỘ ĐÔI HÌNH ẢNH TƯ LIỆU LỊCH SỬ SẮC LỆNH 1960 */}
            <div
              className="responsive-grid"
            >
              <div
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'center',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
                }}
              >
                <div
                  style={{
                    width: '76px',
                    height: '100px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                    border: '1.5px solid #B45309'
                  }}
                >
                  <Image
                    src="/images/popes/pope_261.jpg"
                    alt="Thánh Giáo hoàng Gioan XXIII"
                    fill
                    sizes="76px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-red)' }}>
                    Thánh Giáo hoàng Gioan XXIII
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                    Đấng ban hành Sắc chỉ <em>Venerabilium Nostrorum</em> (24/11/1960) thiết lập Hàng Giáo Phẩm Việt Nam &amp; Giáo phận Mỹ Tho.
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'center',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
                }}
              >
                <div
                  style={{
                    width: '76px',
                    height: '100px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                    border: '1.5px solid #B45309'
                  }}
                >
                  <Image
                    src="/images/bishop_1_tran_van_thien.jpg"
                    alt="Đức Cha Giuse Trần Văn Thiện"
                    fill
                    sizes="76px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-red)' }}>
                    Đức Cha Giuse Trần Văn Thiện
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                    Giám mục Tiên khởi Giáo phận Mỹ Tho, được Tòa Thánh bổ nhiệm lãnh đạo tân giáo phận từ năm 1960.
                  </div>
                </div>
              </div>
            </div>

            {/* KHUNG TƯ LIỆU VĂN BẢN: BẢN GỐC LATIN & BẢN DỊCH TIẾNG VIỆT */}
            <div
              style={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '12px',
                padding: '18px',
                margin: '20px 0',
                wordBreak: 'break-word'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
                <div style={{ marginTop: '2px', flexShrink: 0 }}><Scroll size={18} color="var(--color-red)" /></div>
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-red)' }}>
                  Văn Khố Tòa Thánh: Trích Bản Gốc Tiếng Latinh (AAS 53, 1961, pp. 346–348)
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.86rem',
                  lineHeight: 1.7,
                  color: 'var(--color-dark)',
                  backgroundColor: 'rgba(180, 83, 9, 0.04)',
                  padding: '14px 16px',
                  borderRadius: '8px',
                  borderLeft: '3px solid #B45309',
                  marginBottom: '16px',
                  fontStyle: 'italic'
                }}
              >
                &ldquo;IOANNES EPISCOPUS SERVUS SERVORUM DEI AD PERPETUAM REI MEMORIAM.<br />
                <strong>CONSTITUTIO APOSTOLICA &ldquo;VENERABILIUM NOSTRORUM&rdquo;</strong><br /><br />
                In Vietnamia, post diuturnos labores et praeclara martyrum testimonia, christiana religio ad tantam maturitatem pervenit ut hierarchia episcopalis ibidem canonice erigi possit. Quapropter, audito Venerabili Fratre Nostro S.R.E. Cardinali Sacrae Congregationi de Propaganda Fide Praefecto, Nostra Apostolica Auctoritate, constituimus et decernimus:<br />
                Tres Ecclesiasticas Provincias in Vietnamia erigimus: Hanoiensem, Huensem, et Saigonensem... Novas autem dioeceses erigimus, inter quas Dioecesim Mythoensem, cuius Ecclesiam Cathedralem constituimus sub titulo Immaculatae Conceptionis Beatae Mariae Virginis...&rdquo;
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                <div style={{ marginTop: '2px', flexShrink: 0 }}><BookOpen size={16} color="var(--color-red)" /></div>
                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-dark)' }}>
                  Bản Dịch Việt Ngữ Chính Thức:
                </span>
              </div>

              <div
                style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.75,
                  color: 'var(--color-dark)',
                  textAlign: 'justify',
                  backgroundColor: 'var(--color-input-bg)',
                  padding: '14px 16px',
                  borderRadius: '8px'
                }}
              >
                &ldquo;GIOAN GIÁM MỤC, TÔI TỚ CÁC TÔI TỚ CỦA THIÊN CHÚA, ĐỂ GHI NHỚ MUÔN ĐỜI SỰ VIỆC.<br />
                Tại Việt Nam, sau những năm tháng lao nhọc trường kỳ và những chứng tá đức tin anh dũng rạng ngời của các bậc Tử Đạo, đạo Thánh Chúa Kitô nay đã đạt tới sự trưởng thành đức tin viên mãn để có thể chính thức thiết lập Hàng Giáo Phẩm Chính Tòa. Vì thế, sau khi lắng nghe ý kiến của Chư Huynh Đáng Kính là các Đấng Hồng Y thuộc Thánh Bộ Truyền Bá Đức Tin, với Quyền Bính Tông Tòa Tối Cao, Ta thiết lập và chuẩn định: Thiết lập 3 Giáo Tỉnh tại Việt Nam gồm Hà Nội, Huế và Sài Gòn... Đồng thời thành lập các Giáo phận mới, trong đó có <strong>Giáo phận Mỹ Tho</strong>, và nâng ngôi thánh đường tại Mỹ Tho làm <strong>Nhà thờ Chính Tòa</strong> dâng kính tước hiệu <strong>Đức Mẹ Vô Nhiễm Nguyên Tội</strong>.&rdquo;
              </div>
            </div>

            {/* TÓM TẮT 5 QUYẾT ĐỊNH LỊCH SỬ TRỌNG YẾU */}
            <div
              style={{
                backgroundColor: 'rgba(153, 27, 27, 0.03)',
                border: '1px solid rgba(153, 27, 27, 0.12)',
                borderRadius: '12px',
                padding: '16px 20px',
                margin: '18px 0 24px'
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--color-red)', marginBottom: '10px' }}>
                📌 Tóm Tắt 5 Quyết Định Lịch Sử Trọng Yếu Của Tông Hiến Venerabilium Nostrorum:
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--color-dark)' }}>
                <li>
                  <strong>Chấm dứt quy chế Thừa sai Đại diện Tông Tòa (Vicariatus Apostolicus)</strong>: Đánh dấu sự trưởng thành trọn vẹn của Giáo hội Việt Nam sau hơn 300 năm hình thành kể từ hai Địa phận tiên khởi Đàng Trong và Đàng Ngoài (1659).
                </li>
                <li>
                  <strong>Thiết lập 3 Tổng Giáo Phận (Giáo Tỉnh)</strong>: Giáo tỉnh Hà Nội (miền Bắc), Giáo tỉnh Huế (miền Trung) và Giáo tỉnh Sài Gòn (miền Nam).
                </li>
                <li>
                  <strong>Nâng cấp đồng loạt</strong>: Tất cả các Giáo phận Tông Tòa hiện hữu tại Việt Nam được nâng lên hàng Giáo phận Chính Tòa (Dioecesis).
                </li>
                <li>
                  <strong>Khai sinh Giáo phận Mỹ Tho (Dioecesis Mythoensis)</strong>: Tách các tỉnh Định Tường, Long An, Kiến Tường, Kiến Phong từ Tổng Giáo phận Sài Gòn để lập thành giáo phận độc lập thuộc Giáo tỉnh Sài Gòn (được cụ thể hóa bằng Sắc chỉ <em>Quod Venerabiles Fratres</em> ngày 27/11/1960).
                </li>
                <li>
                  <strong>Chính thức công nhận Nhà thờ Chính Tòa Mỹ Tho</strong>: Thánh đường tọa lạc trên đại lộ Bourdais (nay là Hùng Vương) chính thức mang tước hiệu Nhà thờ Chính Tòa Đức Mẹ Vô Nhiễm, đặt dưới quyền cai quản của Đức Giám mục Tiên khởi Giuse Trần Văn Thiện.
                </li>
              </ul>
            </div>

            <h3 id="lich-su-cung-hien" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
              2.4. Lễ Cung Hiến &amp; Đại trùng tu Bách chu niên (2000 – 2006)
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Nhân dịp Đại Năm Thánh 2000, ngày <strong>21/01/2000</strong>, Đức Giám mục Giáo phận Phaolô Bùi Văn Đọc đã
              long trọng cử hành <strong>Lễ Cung Hiến Nhà thờ Chánh Tòa Mỹ Tho</strong> và chọn ngày Lễ Đức Mẹ Hồn Xác
              Lên Trời (15 tháng 8) làm lễ Bổn mạng thứ hai của nhà thờ.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 16px' }}>
              Đến năm 2006, đánh dấu kỷ niệm 100 năm ngày khởi công xây dựng,{' '}
              <button
                type="button"
                onClick={() => {
                  const bio = ALL_COMMUNITY_BIOS.find((b) => b.id === 'cha-ha-van-xung');
                  if (bio) setSelectedBio(bio);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: 'var(--color-red)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontFamily: 'inherit'
                }}
              >
                Linh mục Chánh xứ Giacôbê Hà Văn Xung
              </button>{' '}
              (Linh mục Trưởng Hạt Giáo hạt Mỹ Tho) đã xin ý kiến Đức Giám mục để trùng tu và nới rộng nhà thờ. Lễ khởi
              công được cử hành ngày <strong>14/06/2006</strong>, gồm thay mái ngói, nới rộng hai bên hông nhà thờ, xây
              lại phòng thánh, cải tạo tháp chuông và đặt 14 chặng Đàng Thánh Giá xung quanh nhà thờ. Sau 9 tháng thi
              công, ngày <strong>21/05/2007</strong> Đức Giám mục Giáo phận đã dâng lễ tạ ơn và khai mạc Năm Thánh mừng
              kỷ niệm 100 năm xây dựng ngôi thánh đường.
            </p>

            {/* NIÊN BIỂU CÁC ĐỜI LINH MỤC CHÁNH SỞ HỌ ĐẠO CHÁNH TÒA MỸ THO */}
            <h3 id="nien-bieu-cha-so" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 10px' }}>
              2.5. Niên Biểu Các Đời Linh Mục Chánh Sở Nhà Thờ Chánh Tòa Mỹ Tho (1861 – Nay)
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-subtle)', margin: '0 0 6px' }}>
              Nhấn vào tên linh mục để xem lý lịch đầy đủ. Niên hiệu và tiểu sử các vị thừa sai
              Hội Thừa Sai Paris được đối chiếu với hồ sơ lưu trữ của Viện Nghiên cứu Pháp – Á (IRFA).
            </p>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-subtle)', fontStyle: 'italic', margin: '0 0 14px' }}>
              Đây là niên biểu các vị chánh sở tiêu biểu, không phải danh sách đầy đủ: riêng giai đoạn
              1866 – 1960 đã có hơn 80 linh mục phục vụ họ đạo. Những khoảng thời gian còn thiếu tư liệu
              được ghi rõ là <strong>chưa cập nhật</strong>.
            </p>

            <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
              <table className="pastor-timeline-table">
                <caption className="sr-only">
                  Niên biểu các đời linh mục chánh sở Nhà thờ Chánh Tòa Mỹ Tho
                </caption>
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '50px' }}>STT</th>
                    <th scope="col" style={{ width: '130px' }}>Thời Gian</th>
                    <th scope="col">Linh Mục Chánh Sở</th>
                    <th scope="col">Dấu Ấn Mục Vụ &amp; Lịch Sử</th>
                  </tr>
                </thead>
                <tbody>
                  {PASTOR_TIMELINE.map((row, idx) => {
                    const bio = row.bioId
                      ? ALL_COMMUNITY_BIOS.find((b) => b.id === row.bioId)
                      : undefined;
                    const isCurrent = row.period.includes('nay');

                    return (
                      <tr key={`${row.period}-${idx}`} className={bio ? undefined : 'pastor-row-empty'}>
                        <td style={{ fontWeight: 700 }}>{idx + 1}</td>
                        <td style={{ fontWeight: 600, color: isCurrent ? 'var(--color-red)' : 'var(--color-subtle)' }}>
                          {row.period}
                        </td>
                        <td>
                          {bio ? (
                            <button
                              type="button"
                              className="pastor-name-btn"
                              onClick={() => setSelectedBio(bio)}
                              aria-label={`Xem lý lịch ${bio.name}`}
                            >
                              {bio.name}
                            </button>
                          ) : (
                            <em style={{ color: 'var(--color-subtle)' }}>
                              {row.name ?? 'Chưa cập nhật'}
                            </em>
                          )}
                        </td>
                        <td style={{ color: bio ? 'var(--color-dark)' : 'var(--color-subtle)' }}>
                          {row.note ?? (
                            <em>Chưa cập nhật — còn thiếu tư liệu về giai đoạn này.</em>
                          )}
                          {row.source && (
                            <div className="pastor-source">Nguồn: {row.source}</div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* =====================================================================
              3. KIẾN TRÚC & NGHỆ THUẬT THÁNH
              ===================================================================== */}
          <section id="kien-truc" style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: '1.4rem',
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
              className="responsive-grid"
            >
              {[
                { src: '/images/thanh_le_dong_te_my_tho.jpg', title: 'Mặt tiền Phục Hưng', desc: 'Kiến trúc cột trụ đối xứng hài hòa' },
                { src: '/images/nhatho2.jpg', title: 'Gian Thánh Cung', desc: 'Vòm Romanesque & Bàn thờ cẩm thạch' },
                { src: '/images/nhatho3.jpg', title: 'Tháp Chuông', desc: 'Kiến trúc tách rời độc đáo' },
                { src: '/images/nhatho_dai_duc_me.jpg', title: 'Đài Đức Mẹ Lộ Đức', desc: 'Khuôn viên linh thiêng cầu nguyện' }
              ].map((img, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--color-card-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '10px',
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

            <h3 id="kien-truc-mat-tien" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '18px 0 8px' }}>
              3.1. Mặt tiền Phục Hưng và Tháp chuông tách rời
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Nhà thờ mang phong cách kiến trúc Phục Hưng (Renaissance) uy nghiêm, theo số liệu của Giáo phận Mỹ Tho:
              chiều cao 24 mét, chiều dài 53 mét, chiều rộng hơn 17 mét, gồm một gian chính và hai gian phụ hai bên.
              Kết cấu chính xây theo lối cột tròn chống đỡ, mái vòm trang trí nhiều hoa văn họa tiết tinh xảo; mặt tiền
              chia thành 3 nhịp cân xứng. Tháp chuông đầu tiên vốn dựng bên hông nữ; năm 1958 Cha sở Phaolô Nguyễn Minh
              Chiếu cho dời chuông lên tháp cao bên nam. Đến năm 1995, vì lo tiếng chuông rung chấn làm hư hại ngôi
              thánh đường cổ, Cha sở Giuse Nguyễn Văn Chúc cho xây một tháp chuông khác tách rời hẳn khỏi nhà thờ —
              chính là tháp chuông hiện nay.
            </p>

            <h3 id="kien-truc-cung-thanh" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
              3.2. Gian Cung Thánh &amp; Mái vòm Romanesque
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Bên trong thánh đường được thiết kế theo hình dạng Thánh Giá La-tinh gồm gian chính (nave) rộng rãi và hai gian
              phụ (aisles) phân cách bằng hai hàng cột đỡ vòm cung Romanesque liên hoàn. Trần giáo đường uốn cong kiểu vòm
              bán nguyệt dát viền vàng kim, kết hợp hệ thống cửa sổ kính màu thu nhận ánh sáng tự nhiên dịu nhẹ tạo nên bầu
              khí trang nghiêm, thánh thiện.
            </p>

            <h3 id="kien-truc-khuon-vien" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
              3.3. Đài Đức Mẹ Lộ Đức &amp; 14 Đàng Thánh Giá
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0' }}>
              Khuôn viên nhà thờ có diện tích rộng thoáng rợp bóng cây xanh. Phía bên phải là Đài Đức Mẹ Lộ Đức đá tự nhiên —
              nơi giáo dân và khách hành hương tề tựu lần hạt Mân Côi mỗi ngày. Chạy dọc bờ tường khuôn viên là 14 bức phù
              điêu Đàng Thánh Giá bằng đồng tái hiện cuộc khổ nạn của Chúa Giêsu Kitô trên đồi Can-vê.
            </p>
          </section>

          {/* =====================================================================
              4. CƠ CẤU GIÁO PHẬN & CÁC ĐỜI GIÁM MỤC MỸ THO (TIỂU SỬ CHI TIẾT)
              ===================================================================== */}
          <section id="giao-phan" style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: '1.4rem',
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
              className="responsive-grid"
            >
              <div
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '12px',
                  padding: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
                }}
                onClick={() => setLightboxImage({ src: '/images/linh_muc_doan_my_tho.jpg', caption: 'Linh mục đoàn Giáo phận Mỹ Tho cùng Đức Giám mục trong Thánh lễ Truyền Dầu.' })}
              >
                <div style={{ position: 'relative', width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden', marginBottom: '6px' }}>
                  <Image src="/images/linh_muc_doan_my_tho.jpg" alt="Linh Mục Đoàn Mỹ Tho" fill sizes="240px" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--color-dark)' }}>Linh Mục Đoàn Giáo Phận Mỹ Tho</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)' }}>Đồng tâm phụng sự cùng Đức Giám mục Chính tòa</div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '12px',
                  padding: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
                }}
                onClick={() => setLightboxImage({ src: '/images/nhatho_thanh_le.jpg', caption: 'Thánh lễ đồng tế đại triều tại Cung thánh Nhà thờ Chính Tòa Mỹ Tho.' })}
              >
                <div style={{ position: 'relative', width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden', marginBottom: '6px' }}>
                  <Image src="/images/nhatho_thanh_le.jpg" alt="Thánh Lễ Đồng Tế" fill sizes="240px" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--color-dark)' }}>Thánh Lễ Đại Triều Tại Chánh Tòa</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)' }}>Cử hành phụng vụ trọng thể Năm Thánh</div>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, margin: '0 0 18px', textAlign: 'justify' }}>
              Từ ngày thành lập năm 1960 đến nay, Giáo phận Mỹ Tho đã trải qua 5 đời Giám mục coi sóc. <em>(Nhấp vào từng vị để xem toàn văn tiểu sử &amp; dấu ấn mục vụ)</em>:
            </p>

            {/* DANH SÁCH GIÁM MỤC VỚI KHUNG ẢNH ĐỨNG CHUẨN KHÔNG BỊ CẮT ĐẦU */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {BISHOPS_EXTENDED_DATA.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBio(b)}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-card-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  className="bishop-card-hover"
                >
                  {/* Khung ảnh chân dung dọc (Aspect Ratio 3:4) */}
                  <PortraitFrame src={b.image} name={b.name} width={85} height={110} />

                  <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                        {b.name}
                      </h4>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          backgroundColor: 'rgba(153, 27, 27, 0.08)',
                          color: 'var(--color-red)',
                          padding: '2px 10px',
                          borderRadius: '20px',
                          border: '1px solid rgba(153, 27, 27, 0.15)'
                        }}
                      >
                        {b.period}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-red)', margin: '3px 0 4px' }}>
                      {b.role}
                    </div>

                    <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-subtle)', marginBottom: '6px' }}>
                      Khẩu hiệu: <strong style={{ color: 'var(--color-dark)' }}>{b.motto}</strong>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--color-subtle)', lineHeight: 1.5, textAlign: 'justify' }}>
                      {b.shortDesc}
                    </p>

                    <div
                      style={{
                        marginTop: '8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        color: 'var(--color-red)'
                      }}
                    >
                      <Eye size={13} />
                      <span>Xem toàn văn tiểu sử &amp; quá trình phục vụ ➔</span>
                    </div>
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
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--color-dark)',
                borderBottom: '1px solid var(--color-border-subtle)',
                paddingBottom: '6px',
                marginTop: '32px'
              }}
            >
              5. Xứ Đoàn Các Thánh Tử Đạo Việt Nam (TNTT)
            </h2>

            <h3 id="xu-doan-ton-chi" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '18px 0 8px' }}>
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
              className="responsive-grid"
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
                    backgroundColor: 'rgba(153, 27, 27, 0.04)',
                    border: '1px solid var(--color-border-subtle)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontWeight: 800, color: 'var(--color-red)', fontSize: '0.86rem', marginBottom: '4px' }}>
                    {idx + 1}. {k.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.4 }}>{k.desc}</div>
                </div>
              ))}
            </div>

            <h3 id="xu-doan-khan-quang" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
              5.2. Hệ thống Ngành &amp; Ý nghĩa Khăn Quàng TNTT
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Khăn quàng TNTT là biểu tượng của tinh thần dâng hiến và trách nhiệm tông đồ. Dưới đây là bảng phân cấp các
              ngành trong Xứ Đoàn:
            </p>

            <div className="scarf-list">
              {TNTT_NGANH.map((r) => (
                <div key={r.id} className="scarf-card">
                  <div className="scarf-card-head">
                    <ScarfIcon scarf={r} />
                    <div className="scarf-card-title">
                      <div className="scarf-name">
                        Khăn Ngành {r.name} — <span className="scarf-motto">{r.motto}</span>
                      </div>
                      <div className="scarf-meta">
                        {r.age} • Khăn {r.scarfName.toLowerCase()}, không viền • {r.crossName}
                      </div>
                    </div>
                  </div>
                  <p className="scarf-symbolism">{r.symbolism}</p>
                  {r.leaderTrim && <p className="scarf-trim-note">{r.leaderTrim}.</p>}
                </div>
              ))}
            </div>

            <h3 id="xu-doan-khan-huynh-truong" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 8px' }}>
              5.3. Khăn Quàng Huynh Trưởng &amp; Ban Điều Hành
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Ngoài khăn của các ngành, Phong trào còn quy định khăn riêng cho những người phục vụ và
              hướng dẫn Đoàn Thiếu Nhi Thánh Thể:
            </p>

            <div className="scarf-list">
              {TNTT_HUYNH_TRUONG.map((r) => (
                <div key={r.id} className="scarf-card">
                  <div className="scarf-card-head">
                    <ScarfIcon scarf={r} />
                    <div className="scarf-card-title">
                      <div className="scarf-name">
                        {r.name} — <span className="scarf-motto">{r.motto}</span>
                      </div>
                      <div className="scarf-meta">
                        {r.age} • Khăn {r.scarfName.toLowerCase()}
                        {r.trimName ? `, ${r.trimName}` : ''} • {r.crossName}
                      </div>
                    </div>
                  </div>
                  <p className="scarf-symbolism">{r.symbolism}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'var(--color-subtle)', margin: '14px 0 0', lineHeight: 1.6 }}>
              Nguồn: bảng &ldquo;Mẫu khăn quàng và các cấp hiệu trong Phong trào Thiếu Nhi Thánh Thể Việt Nam&rdquo; —
              Liên đoàn Các Thánh Tử Đạo Việt Nam, Giáo phận Mỹ Tho.
            </p>
          </section>

          {/* =====================================================================
              6. GIỜ PHỤNG VỤ & MỤC VỤ
              ===================================================================== */}
          <section id="phung-vu" style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: '1.4rem',
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
                boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
              }}
            >
              <div className="responsive-grid">
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--color-red)', fontSize: '0.9rem', marginBottom: '6px' }}>
                    CÁC NGÀY TRONG TUẦN
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                    • Thánh lễ Sáng: <strong>05:00</strong>
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                    • Thánh lễ Chiều: <strong>17:30</strong>
                  </div>
                </div>

                <div>
                  <div style={{ fontWeight: 800, color: 'var(--color-red)', fontSize: '0.9rem', marginBottom: '6px' }}>
                    CHÚA NHẬT (NGÀY CỦA CHÚA)
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                    • Lễ I: <strong>05:30</strong> (Thánh lễ sáng sớm)
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                    • Lễ II: <strong>07:00</strong> (Lễ dành cho Thiếu nhi &amp; Giới trẻ)
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                    • Lễ III: <strong>16:00</strong> (Lễ chiều)
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--color-dark)' }}>
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
                Bí tích Hòa Giải (Giải tội): Trước và sau tất cả các Thánh lễ trong tuần hoặc liên hệ trực tiếp văn phòng
                nhà xứ.
              </div>
            </div>
          </section>

          {/* =====================================================================
              7. CHÚ THÍCH & TÀI LIỆU THAM KHẢO
              ===================================================================== */}
          <section id="tai-lieu" style={{ marginTop: '40px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 10px' }}>
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
            backgroundColor: 'var(--color-card-bg)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            fontSize: '0.84rem'
          }}
          className="wiki-infobox wiki-sidebar"
        >
          {/* Infobox Header */}
          <div
            style={{
              backgroundColor: 'var(--color-red)',
              color: '#FFFFFF',
              padding: '12px 14px',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: '0.98rem',
              letterSpacing: '0.3px'
            }}
          >
            Nhà thờ chính tòa Mỹ Tho
          </div>

          <div
            style={{
              backgroundColor: 'rgba(153, 27, 27, 0.05)',
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
          <div style={{ padding: '8px', textAlign: 'center', backgroundColor: 'var(--color-input-bg)' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '200px',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '6px'
              }}
              onClick={() => setLightboxImage({ src: '/images/nhatho1.jpg', caption: 'Mặt tiền Nhà thờ Chánh Tòa Mỹ Tho' })}
            >
              <Image
                src="/images/nhatho1.jpg"
                alt="Nhà thờ Chính Tòa Mỹ Tho"
                fill
                sizes="330px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle)', marginTop: '6px', fontStyle: 'italic' }}>
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
                    backgroundColor: 'rgba(153, 27, 27, 0.08)',
                    color: 'var(--color-red)',
                    padding: '6px 10px',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    borderTop: '1px solid var(--color-border-subtle)',
                    borderBottom: '1px solid var(--color-border-subtle)'
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
                  <span
                    onClick={() => setSelectedBio(POPE_LEO_XIV_BIO)}
                    style={{ color: 'var(--color-red)', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Đức Giáo hoàng Lêô XIV (Leo XIV)
                  </span>
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
                    backgroundColor: 'rgba(153, 27, 27, 0.08)',
                    color: 'var(--color-red)',
                    padding: '6px 10px',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    borderTop: '1px solid var(--color-border-subtle)',
                    borderBottom: '1px solid var(--color-border-subtle)'
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
                    backgroundColor: 'rgba(153, 27, 27, 0.08)',
                    color: 'var(--color-red)',
                    padding: '6px 10px',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    borderTop: '1px solid var(--color-border-subtle)',
                    borderBottom: '1px solid var(--color-border-subtle)'
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
                  Chiều cao nhà thờ
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
                    backgroundColor: 'rgba(153, 27, 27, 0.08)',
                    color: 'var(--color-red)',
                    padding: '6px 10px',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    borderTop: '1px solid var(--color-border-subtle)',
                    borderBottom: '1px solid var(--color-border-subtle)'
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
                  <span
                    onClick={() => setSelectedBio(BISHOPS_EXTENDED_DATA[4])}
                    style={{ color: 'var(--color-red)', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Đức Cha Phêrô Nguyễn Văn Khảm
                  </span>
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
                  <button
                    type="button"
                    onClick={() => {
                      const bio = ALL_COMMUNITY_BIOS.find((b) => b.id === 'cha-ha-van-xung');
                      if (bio) setSelectedBio(bio);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--color-red)',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      textDecoration: 'underline',
                      fontFamily: 'inherit'
                    }}
                  >
                    Lm. Giacôbê Hà Văn Xung (Hạt trưởng)
                  </button>
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
          MODAL TIỂU SỬ CHI TIẾT BÁCH KHOA KHI NHẤP VÀO TỪNG VỊ GIÁM MỤC / GIÁO HOÀNG
          ========================================================================= */}
      {selectedBio && (
        <div
          onClick={() => setSelectedBio(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100015,
            backgroundColor: 'rgba(5, 3, 2, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '660px',
              maxHeight: '90vh',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '16px',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            {/* Top Modal Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(153, 27, 27, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cross size={18} color="var(--color-red)" />
                <div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--color-red)' }}>
                    TIỂU SỬ HÀNG GIÁO PHẨM CÔNG GIÁO
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle)' }}>
                    Tài liệu Bách khoa toàn thư Giáo phận Mỹ Tho
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBio(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-dark)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px' }}>
              {/* Header profile */}
              <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '20px' }}>
                {/* Ảnh chân dung đầy đủ không bị cắt đầu */}
                <PortraitFrame src={selectedBio.image} name={selectedBio.name} width={110} height={150} />

                <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                    {selectedBio.name}
                  </h3>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-red)', marginBottom: '4px' }}>
                    {selectedBio.role}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginBottom: '8px' }}>
                    Tên Thánh: <strong>{selectedBio.saintName}</strong> • {selectedBio.period}
                  </div>

                  {selectedBio.motto && (
                    <div
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(153, 27, 27, 0.04)',
                        border: '1px solid var(--color-border-subtle)',
                        fontSize: '0.82rem',
                        fontStyle: 'italic',
                        color: 'var(--color-dark)'
                      }}
                    >
                      Khẩu hiệu: <strong>{selectedBio.motto}</strong>
                      {selectedBio.mottoLatin && (
                        <span style={{ display: 'block', fontSize: '0.74rem', color: '#B45309' }}>
                          ({selectedBio.mottoLatin})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Thông tin trích ngang dạng bảng */}
              <div
                style={{
                  backgroundColor: 'var(--color-input-bg)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  marginBottom: '20px',
                  fontSize: '0.82rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '8px 16px'
                }}
              >
                {selectedBio.birth && (
                  <div>
                    <strong>Sinh ngày / Nơi sinh:</strong> {selectedBio.birth}
                  </div>
                )}
                {selectedBio.origin && (
                  <div>
                    <strong>Gốc / Tổ chức:</strong> {selectedBio.origin}
                  </div>
                )}
                {selectedBio.death && (
                  <div>
                    <strong>Qua đời / An nghỉ:</strong> {selectedBio.death}
                  </div>
                )}
                {selectedBio.priestOrdination && (
                  <div>
                    <strong>Thụ phong Linh mục:</strong> {selectedBio.priestOrdination}
                  </div>
                )}
                {selectedBio.bishopConsecration && (
                  <div>
                    <strong>Tấn phong Giám mục:</strong> {selectedBio.bishopConsecration}
                  </div>
                )}
                {selectedBio.consecrator && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <strong>Giám mục Chủ phong:</strong> {selectedBio.consecrator}
                  </div>
                )}
              </div>

              {/* Quá trình phục vụ theo thời gian (Timeline) */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-red)' }}>
                  Quá trình tu học &amp; Sứ vụ mục tử
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedBio.chronology.map((c, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        borderLeft: '3.5px solid var(--color-red)',
                        backgroundColor: 'var(--color-card-bg)',
                        border: '1px solid var(--color-border-subtle)',
                        borderLeftWidth: '3.5px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                          {c.title}
                        </span>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-red)' }}>
                          {c.time}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-subtle)', lineHeight: 1.5, textAlign: 'justify' }}>
                        {c.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dấu ấn và di sản */}
              <div>
                <h4 style={{ margin: '0 0 8px', fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-red)' }}>
                  Dấu ấn lịch sử &amp; Di sản để lại
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--color-dark)' }}>
                  {selectedBio.milestones.map((m, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Modal Close */}
            <div
              style={{
                padding: '12px 20px',
                borderTop: '1px solid var(--color-border-subtle)',
                display: 'flex',
                justifyContent: 'flex-end',
                backgroundColor: 'var(--color-input-bg)'
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedBio(null)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-red)',
                  color: '#FFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        </div>
      )}

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
        /* Bố cục chính (TOC & Article bên trái, Infobox bên phải) */
        .main-layout {
          max-width: 1220px;
          margin: 0 auto;
          padding: 24px 20px;
          display: flex;
          gap: 36px;
          align-items: flex-start;
          box-sizing: border-box;
          width: 100%;
          overflow-x: hidden;
        }

        .wiki-sidebar {
          width: 330px;
          flex-shrink: 0;
        }

        .responsive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px;
          margin: 18px 0;
        }

        /* Classes cho ảnh float */
        .floating-img-270 { float: right; width: 270px; margin-left: 20px; margin-bottom: 12px; }
        .floating-img-290 { float: right; width: 290px; margin-left: 20px; margin-bottom: 12px; }
        .floating-img-250 { float: right; width: 250px; margin-left: 20px; margin-bottom: 12px; }

        @media (max-width: 900px) {
          .main-layout {
            flex-direction: column-reverse;
            gap: 24px;
            padding: 16px 12px;
            /* Bắt buộc: flex column giữ align-items:flex-start sẽ khiến con co
               theo chiều rộng nội dung tối đa thay vì bằng khung, làm cả trang
               tràn ngang rồi bị overflow-x:hidden cắt cụt. */
            align-items: stretch;
          }
          .main-layout > * {
            width: 100%;
            min-width: 0;
            max-width: 100%;
          }
          .wiki-sidebar {
            width: 100%;
            margin-bottom: 24px;
          }
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
          
          /* Chống ép chữ bằng cách xóa float trên thiết bị di động */
          .floating-img-270, .floating-img-290, .floating-img-250, .wiki-thumb {
            float: none !important;
            width: 100% !important;
            max-width: 320px;
            margin: 16px auto !important;
            display: block;
          }
        }

        /* Chặn mọi phần tử con vượt khung trên màn hình hẹp */
        @media (max-width: 560px) {
          .main-layout { padding: 12px 10px; }
          .main-layout img,
          .main-layout svg,
          .main-layout table { max-width: 100%; }
          .main-layout p,
          .main-layout li,
          .main-layout h1,
          .main-layout h2,
          .main-layout h3,
          .main-layout h4 {
            overflow-wrap: anywhere;
          }
          .scarf-card-head { gap: 10px; }
          .scarf-symbolism { text-align: left; }
        }

        .bishop-card-hover:hover {
          border-color: #B45309 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.06) !important;
        }
      `}</style>
    </div>
  );
}
