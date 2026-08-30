'use client';

/**
 * Dữ liệu và thành phần dùng chung cho bộ trang khảo cứu lịch sử.
 *
 * Trang gốc dài khoảng 17.500 chữ trên một địa chỉ nên được tách thành bốn
 * trang: Giáo Hội, Giáo Phận, Giáo Xứ và Xứ Đoàn. Toàn bộ dữ liệu gom về đây
 * để cả bốn trang cùng dùng, tránh chép lặp và tránh lệch nhau về sau.
 */

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
import { useChanhToaMassTimes } from '@/lib/useChanhToaMassTimes';
import PopesContinuousMarquee from '@/components/PopesContinuousMarquee';

/**
 * Khung chân dung nhân vật. Nhiều cha sở thời sơ khai (1860–1956) không còn
 * ảnh tư liệu nào trong kho lưu trữ MEP/IRFA; những trường hợp đó hiển thị ô
 * trống có chú thích thay vì mượn ảnh nhà thờ làm ảnh chân dung.
 */
export function PortraitFrame({
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
  /**
   * Công trình nổi bật do vị đó chủ trì hoặc khởi xướng. Chỉ ghi khi có tư
   * liệu xác thực — vị nào chưa tra được thì bỏ trống và khối này tự ẩn, thà
   * thiếu còn hơn gán cho một vị công trình không phải của mình.
   */
  /** Các chức vụ đã và đang đảm nhiệm — ghi rõ để người đọc không phải suy đoán. */
  offices?: string[];
  works?: {
    time: string;
    name: string;
    detail: string;
    /** Công trình đó ngày nay là gì / nằm ở đâu — giúp người đọc hình dung ngay. */
    now?: string;
  }[];
  quotes?: string;
}

export const BISHOPS_EXTENDED_DATA: DetailedBioRecord[] = [
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
    offices: [
      'Giám mục Tiên khởi Giáo phận Mỹ Tho (1960 – 1989)',
      'Đấng sáng lập Tiểu Chủng viện Gioan XXIII Mỹ Tho',
      'Đấng thiết lập Dòng Mến Thánh Giá Mỹ Tho'
    ],
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
    ],
    works: [
      {
        time: 'Thập niên 1960',
        name: 'Tiểu Chủng viện Gioan XXIII',
        detail:
          'Cơ sở đào tạo linh mục đầu tiên của Giáo phận Mỹ Tho non trẻ, mang tên vị Giáo hoàng đã ký sắc chỉ thành lập giáo phận năm 1960. Đây là nền móng cho hàng giáo sĩ bản xứ của giáo phận.'
      },
      {
        time: 'Thập niên 1960',
        name: 'Dòng Mến Thánh Giá Mỹ Tho',
        now: 'Hội dòng Mến Thánh Giá Mỹ Tho, vẫn đang phục vụ giáo phận',
        detail:
          'Thiết lập và định hướng linh đạo cho hội dòng nữ tu riêng của giáo phận, lực lượng nòng cốt trong giáo dục, y tế và mục vụ giáo xứ suốt các thập niên sau.'
      },
      {
        time: '1960 – 1989',
        name: 'Quy hoạch 6 giáo hạt',
        now: 'khung 6 giáo hạt mà Giáo phận Mỹ Tho về căn bản vẫn dùng',
        detail:
          'Phân chia toàn giáo phận thành 6 giáo hạt và quy hoạch mạng lưới giáo xứ nông thôn — khung tổ chức mục vụ mà Giáo phận Mỹ Tho về căn bản vẫn dùng đến nay.'
      }
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
    offices: [
      'Giám mục Phó Giáo phận Mỹ Tho (bổ nhiệm 06/06/1975, tấn phong 10/06/1975)',
      'Giám mục Chính tòa Giáo phận Mỹ Tho (24/02/1989 – 15/04/1999)',
      'Nghỉ hưu từ năm 1999'
    ],
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
    offices: [
      'Giám mục Phó Giáo phận Mỹ Tho (1993 – 1998)',
      'Tổng Giám mục Tổng Giáo phận TP. Hồ Chí Minh (1998 – 2014)',
      'Hồng Y (được vinh thăng năm 2003)'
    ],
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
    offices: [
      'Giám mục Chính tòa Giáo phận Mỹ Tho (1999 – 2013)',
      'Tổng Giám mục Tổng Giáo phận TP. Hồ Chí Minh (bổ nhiệm 28/09/2013)',
      'Chủ tịch Hội đồng Giám mục Việt Nam (2013 – 2016)'
    ],
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
    ],
    works: [
      {
        time: '1999 – 2013',
        name: 'Tòa Giám Mục & Trung tâm Mục vụ Giáo phận',
        now: 'Tòa Giám mục và Trung tâm Mục vụ Giáo phận, 32 Hùng Vương',
        detail:
          'Xây dựng cơ sở điều hành và trung tâm huấn luyện của giáo phận tại 32 Hùng Vương, ngay bên cạnh Nhà thờ Chính Tòa — nơi quy tụ các khoá thường huấn linh mục, tu sĩ và giáo lý viên.'
      },
      {
        time: 'Năm Thánh 2000',
        name: 'Cung hiến Nhà thờ Chính Tòa Mỹ Tho',
        now: 'ngày cung hiến vẫn được Giáo xứ Chánh Tòa mừng hằng năm',
        detail:
          'Chủ sự nghi thức cung hiến ngôi thánh đường xây năm 1906 – 1910, chính thức thánh hiến nhà thờ mẹ của giáo phận đúng vào Đại Năm Thánh 2000.'
      }
    ]
  },
  {
    id: 'duc-cha-nguyen-van-kham',
    name: 'Đức Cha Phêrô Nguyễn Văn Khảm',
    saintName: 'Thánh Phêrô Tông Đồ (Peter)',
    role: 'Giám mục Chính tòa đương nhiệm Giáo phận Mỹ Tho (từ 2014)',
    period: '2014 – nay',
    source: 'Tiểu sử theo TGP Sài Gòn (tgpsaigon.net) — bài "Đức Giám mục Phêrô Nguyễn Văn Khảm nhận Giáo phận Mỹ Tho", 30/08/2014.',
    birth: '02/10/1952 tại Đàn Giản, Hà Đông (nay thuộc Hà Nội)',
    origin: 'Đàn Giản, Hà Đông (nay thuộc Hà Nội)',
    motto: '“Hãy theo Thầy”',
    mottoLatin: 'Sequere Me (Ga 21,22)',
    priestOrdination: '30/08/1980',
    bishopConsecration:
      'Bổ nhiệm Giám mục Phụ tá TGP TP.HCM 15/10/2008; tấn phong 15/11/2008 tại Đại Chủng viện Thánh Giuse TP.HCM',
    consecrator: 'Đức Hồng Y Gioan Baotixita Phạm Minh Mẫn (Chủ phong)',
    offices: [
      'Giám mục Chính tòa Giáo phận Mỹ Tho (bổ nhiệm 26/07/2014, nhận giáo phận 30/08/2014) — đương nhiệm',
      'Viện trưởng Học viện Công giáo Việt Nam (Toà Thánh bổ nhiệm, công bố ngày 14/09/2024) — đương nhiệm',
      'Chủ tịch Uỷ ban Tu sĩ trực thuộc Hội đồng Giám mục Việt Nam — đương nhiệm',
      'Thành viên Bộ Truyền Thông Toà Thánh Vatican',
      'Nguyên Tổng Thư ký Hội đồng Giám mục Việt Nam',
      'Nguyên Phó Tổng Thư ký HĐGMVN (2010 – 2013 và 2013 – 2016)',
      'Nguyên Chủ tịch Uỷ ban Giáo dục Công giáo (2009 – 2010) và Chủ tịch Uỷ ban Truyền thông Xã hội',
      'Nguyên Giám mục Phụ tá Tổng Giáo phận TP. Hồ Chí Minh (2008 – 2014), Giám đốc Trung tâm Mục vụ TGP Sài Gòn'
    ],
    image: '/images/bishop_5_nguyen_van_kham.jpg',
    shortDesc: 'Được bổ nhiệm làm Giám mục Chính tòa Mỹ Tho ngày 26/07/2014. Với tâm hồn mục tử sâu sắc, kiến thức thần học uyên bác và tài thuyết giảng truyền cảm hứng, Ngài không ngừng định hướng phụng vụ, đào tạo giáo dân và chăm lo ơn gọi toàn giáo phận.',
    chronology: [
      {
        time: '1952 – 1980',
        title: 'Tu học và thụ phong Linh mục',
        content:
          'Tu học tại Tiểu Chủng viện Thánh Giuse Sài Gòn và Đại Chủng viện Thánh Giuse. Thụ phong linh mục ngày 30/08/1980, sau đó làm linh mục phụ tá Giáo xứ Hà Đông, hạt Xóm Mới (1980 – 1983).'
      },
      {
        time: '2000 – 2004',
        title: 'Tiến sĩ Thần học Mục vụ tại Hoa Kỳ (CUA)',
        content: 'Du học tại Đại học Công giáo Hoa Kỳ (Catholic University of America) tại Washington D.C., bảo vệ xuất sắc luận án Tiến sĩ Thần học Mục vụ.'
      },
      {
        time: '2008 – 2014',
        title: 'Giám mục Phụ tá Tổng Giáo Phận Sài Gòn',
        content:
          'Tháng 3/2008 làm Thư ký điều hành Hội đồng Giám mục Việt Nam. Ngày 15/10/2008, Đức Giáo hoàng Bênêđictô XVI bổ nhiệm làm Giám mục Phụ tá Tổng Giáo phận TP.HCM; tấn phong ngày 15/11/2008 tại Đại Chủng viện Thánh Giuse TP.HCM do Đức Hồng Y Gioan Baotixita Phạm Minh Mẫn chủ phong. Ngài đồng thời làm Giám đốc Trung tâm Mục vụ TGP Sài Gòn.'
      },
      {
        time: '26/07/2014 – nay',
        title: 'Giám mục Chính tòa Giáo phận Mỹ Tho',
        content:
          'Ngày 26/07/2014, Đức Giáo hoàng Phanxicô bổ nhiệm ngài làm Giám mục Giáo phận Mỹ Tho; ngày 30/08/2014 ngài chính thức nhận giáo phận — cũng là ngày kỷ niệm 34 năm linh mục. Trong Hội đồng Giám mục Việt Nam, ngài từng là Phó Tổng Thư ký (2010 – 2013 và 2013 – 2016), Chủ tịch Uỷ ban Giáo dục Công giáo (2009 – 2010) và Chủ tịch Uỷ ban Truyền thông Xã hội, sau đó là Tổng Thư ký. Ngài được Tòa Thánh bổ nhiệm làm Thành viên Bộ Truyền Thông Vatican.'
      }
    ],
    milestones: [
      'Định hình nền tảng mục vụ phụng vụ và loan báo Tin Mừng sâu sắc cho Giáo phận.',
      'Thúc đẩy phong trào Thiếu Nhi Thánh Thể, Huynh Trưởng và Giới trẻ phát triển mạnh mẽ.',
      'Thành viên Bộ Truyền Thông Tòa Thánh Vatican đại diện cho Giáo hội Việt Nam.',
      'Nhà thuyết giảng thần học và Huấn giáo Kinh Thánh uyên bác hàng đầu Việt Nam.'
    ],
    works: [
      {
        time: 'Đặt viên đá 12/05/2023',
        name: 'Trung tâm Hành hương Ba Giồng',
        now: 'Trung tâm Hành hương Ba Giồng, nơi hành hương chính của Giáo phận Mỹ Tho',
        detail:
          'Công trình mới của trung tâm hành hương kính các Thánh Tử Đạo, tổng diện tích xây dựng khoảng 3.500 m², gồm một tầng trệt và hai tầng lầu mái ngói, có nhà nguyện kính Cha Phêrô Nguyễn Văn Lựu cùng hội trường và phòng triển lãm. Ba Giồng được nâng lên hàng trung tâm hành hương của giáo phận từ năm 2004; sau hơn hai mươi năm, nhà thờ cũ xuống cấp và không còn đủ chỗ đón khách hành hương.'
      }
    ]
  }
];

export const POPE_LEO_XIV_BIO: DetailedBioRecord = {
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
 *  - ẢNH CHÂN DUNG: kho IRFA lưu ảnh theo mã số tại
 *    irfa.paris/wp-content/uploads/2021/12/<mã>.jpg. Đã kiểm từng mã:
 *    CÓ ảnh 0869 (Sorel), 1056 (Moulins), 1502 (Renier), 2241 (Bar);
 *    KHÔNG có ảnh 0682 (Guillou), 0792 (Lizé), 0657 (Marc-Dassa) — cả ba
 *    trang notice đều hiện empty_thumbnail.jpg và mọi biến thể tên file
 *    đều trả về 404. Ba vị này mất năm 1866, 1887 và 1870, trước thời chân
 *    dung thừa sai được chụp và lưu trữ có hệ thống. Đừng tìm lại nữa trừ
 *    khi có nguồn ngoài MEP.
 *  - Les Missions Catholiques 1877, tr.595 & 598 (Gallica ark:/12148/
 *    bpt6k105617d): bài "Variétés: Mytho, Cochinchine occidentale" của thừa
 *    sai Le Mée, KÈM BẢN KHẮC mặt tiền ngôi nhà thờ thứ hai — tư liệu hình
 *    ảnh xưa nhất tìm được về ngôi thánh đường này.
 *  - cgvdt.vn "Dấu ấn họ đạo Chánh tòa Mỹ Tho theo dòng lịch sử": dẫn BẢN
 *    BÁO CÁO VIẾT TAY của Cha Renier hiện lưu tại Tòa TGM TGP. TP.HCM —
 *    "Trước năm 1861 chưa có cộng đoàn Công giáo Mỹ Tho... Đến ngày
 *    28.1.1862, họ đạo Mỹ Tho có 1986 giáo dân"; Nữ tu Thánh Phaolô có mặt
 *    từ 1864 (bề trên đầu tiên: dì Liziong); Sư huynh Lasan đến năm 1868.
 *
 * BA NGÔI NHÀ THỜ CỦA HỌ ĐẠO:
 *  1. 1861 — nhà thờ nhỏ LỢP LÁ, kính Thánh Phanxicô Xaviê, do Cha Guillou
 *     và các thừa sai dựng. Vì là nhà lá dựng tạm giữa thời loạn nên gần như
 *     chắc chắn KHÔNG có ảnh chụp; nguồn 1877 xác nhận Cha Marc vẫn phải
 *     dâng lễ trong "une chapelle en paille".
 *  2. 1866–1876 — Đức cha Miche đặt viên đá 1866; Cha Sorel xây từ 1870;
 *     Cha Moulins hoàn tất; Đức cha Colombert làm phép 12/03/1876. Tư liệu
 *     Pháp gọi "église de Mytho", tư liệu Việt gọi "nhà thờ Vĩnh Tường"
 *     (kính Thánh Tâm) — CÙNG MỘT NGÔI. Tháo dỡ khoảng 1900.
 *  3. 1906–1910 — ngôi hiện nay, tước hiệu Đức Mẹ Vô Nhiễm, do Cha Renier.
 *
 * ĐIỂM CÒN BỎ NGỎ: hồ sơ Renier (IRFA) nói ngôi nhà thờ bị tháo dỡ nằm ở
 *  BAS-MY-THO (Hạ Mỹ Tho), còn VINH-TUONG là tên của HAUT-MY-THO (Thượng Mỹ
 *  Tho) — khu có nhà thờ riêng và bệnh viện bản xứ. Nếu vậy thì tên gọi
 *  "nhà thờ Vĩnh Tường" trong tư liệu Việt và vị trí Hạ Mỹ Tho trong hồ sơ
 *  Pháp chưa khớp nhau. Chưa có nguồn nào giải quyết dứt điểm nên trang giữ
 *  cả hai cách gọi và ghi rõ mâu thuẫn này thay vì chọn bừa một bên.
 *
 * CHUỖI THỪA SAI PHÁP — mỗi mắt xích xác nhận chéo bởi hồ sơ người kế nhiệm:
 *    Guillou (1861–1865) → Lizé (từ 1864) và Marc-Dassa (1866–1870, hồ sơ
 *    ghi nguyên văn "chargé d'abord avec Lizé, et ensuite seul, de la
 *    paroisse de Mi-tho") → Sorel (1870–1872, xây ngôi nhà thờ thứ hai)
 *    → Moulins (1873–1899, hoàn tất, làm phép 12/03/1876, 27 năm) →
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
    source:
      'Hồ sơ lưu trữ IRFA 0682 — nguyên văn: "En 1861, il eut à diriger le district de Mi-tho ; en 1863, celui de Cai-mong. Nommé provicaire en 1864, il revint à Mi-tho, et, en 1865, il passa à Thu-dau-mot."',
    tableNote: 'Cha sở tiên khởi. Coi sóc địa hạt Mỹ Tho từ 1861; năm 1863 chuyển sang địa hạt Cái Mơn, được đặt làm Phó Đại diện Tông tòa năm 1864 rồi trở lại Mỹ Tho, đến 1865 đi Thủ Dầu Một. Cộng đoàn Công giáo Mỹ Tho hình thành năm 1861 khi giáo dân các tỉnh miền Tây về đây lánh nạn bách hại; ngài quy tụ và dựng ngôi nhà thờ đầu tiên kính Thánh Phanxicô Xaviê.',
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
        content:
          'Được cử làm bề trên địa hạt Mỹ Tho. Bản báo cáo viết tay của Cha Renier, hiện lưu trữ tại Tòa Tổng Giám mục TGP. TP.HCM, ghi rõ: "Trước năm 1861 chưa có cộng đoàn Công giáo Mỹ Tho. Chỉ có những người Công giáo bị lính An Nam giam giữ trong đồn. Những người này thuộc bổn đạo của họ Thủ Ngữ, Ba Giồng hay những họ đạo khác." Cũng theo bản báo cáo ấy, đến ngày 28/01/1862 họ đạo Mỹ Tho đã có 1.986 giáo dân — một sự gia tăng đột biến mà tài liệu giáo xứ gắn với gương tử đạo của Cha Thánh Phêrô Nguyễn Văn Lựu tháng 4/1861, vị vẫn thường vào đồn thăm viếng và an ủi các bổn đạo bị giam.'
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
      'Dựng ngôi nhà thờ đầu tiên của họ đạo — một nhà thờ nhỏ lợp lá, kính Thánh Phanxicô Xaviê.',
      'Dưới thời ngài, vùng Mỹ Tho từ chỗ chưa có cộng đoàn Công giáo lên 1.986 giáo dân chỉ trong vòng một năm (28/01/1862).',
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
    source:
      'Hồ sơ lưu trữ IRFA 0792 và bài cáo phó của Hội Thừa Sai Paris (Đức cha Colombert, thư ngày 11/02/1887)',
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
        content: 'Chuyển hẳn về Vĩnh Tường, khi ấy còn là họ nhánh của Mỹ Tho, và lập tại đó một bệnh viện bản xứ. Được đặt làm Phó Đại diện Tông tòa khoảng năm 1872.'
      },
      {
        time: '1866 – 1867',
        title: 'Mùa gặt lớn nhất của họ đạo',
        content:
          'Cáo phó của Hội Thừa Sai ghi rõ con số: riêng năm 1866 ngài rửa tội cho 385 người lớn, năm 1867 vượt quá 400 — mức cao nhất trong lịch sử buổi đầu của họ đạo Mỹ Tho.'
      },
      {
        time: '1874 – 1878',
        title: 'Rời Hội Thừa Sai rồi trở lại',
        content:
          'Bệnh nặng buộc ngài về Pháp năm 1874. Ngài rời Hội Thừa Sai Paris, nhận mục vụ tại giáo phận quê nhà và làm cha sở La Selle-Guerchaise. Bình phục, năm 1878 ngài xin đi lại Nam Kỳ và được đặt làm tuyên uý cơ sở Thánh Nhi tại Sài Gòn.'
      },
      {
        time: '1881 – 1887',
        title: 'Địa hạt Vĩnh Long',
        content:
          'Đức cha Colombert trao cho ngài địa hạt Vĩnh Long. Ngài lập nhiều họ đạo, dựng vài nhà nguyện, mở trường; số người lớn được rửa tội mỗi năm từ 156 đến 267, có năm địa hạt của ngài đứng đầu toàn giáo phận. Ngài qua đời đột ngột vì tai biến tại nhà an dưỡng Béthanie, Hồng Kông, rạng sáng 08/02/1887.'
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
    ],
    works: [
      {
        time: 'Khoảng 1866 – 1869',
        name: 'Cơ sở Thánh Nhi (Sainte-Enfance) của các Nữ tu Thánh Phaolô thành Chartres',
        detail:
          'Giúp các nữ tu lập cơ sở nuôi dạy trẻ tại Mỹ Tho — công trình bác ái đầu tiên của họ đạo.'
      },
      {
        time: 'Khoảng 1869',
        name: 'Bệnh viện bản xứ Vĩnh Tường',
        detail:
          'Lập bệnh viện dành cho người bản xứ tại Vĩnh Tường, mở đầu hoạt động y tế của họ đạo Mỹ Tho.'
      }
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
    source:
      'Hồ sơ lưu trữ IRFA 0657 — nguyên văn: "De 1866 à 1870, il fut chargé d\'abord avec Lizé, et ensuite seul, de la paroisse de Mi-tho"; và bài "Variétés: Mytho" trên Les Missions Catholiques 1877, tr.598',
    tableNote: 'Trước khi vào Nam Kỳ, ngài truyền giáo ở Nam Đàng Ngoài và phải lánh về Sài Gòn năm 1860 vì bách hại; tại đây ngài làm thông ngôn cho đoàn quân viễn chinh và các quan cai trị đầu tiên của thuộc địa. Phụ trách giáo xứ Mỹ Tho, ban đầu cùng Cha Lizé rồi sau đó một mình, với chức Phó Đại diện Tông tòa. Ngài xin được ân xá cho một số nghĩa quân; những người này về sau theo đạo và lập nên họ đạo An Đức. Suốt nhiệm kỳ ngài phải dâng lễ trong một nhà nguyện lợp lá vì công trình nhà thờ bị đình lại.',
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
      'Vận động và chứng kiến Đức cha Miche đặt viên đá đầu tiên ngôi nhà thờ họ đạo năm 1866.',
      'Làm thông ngôn cho đoàn quân viễn chinh và các quan cai trị đầu tiên của thuộc địa.',
      'Thừa sai Bắc Kỳ 1854 – 1860 giữa thời kỳ bách hại.'
    ]
  },
  {
    id: 'cha-sorel',
    source: 'Hồ sơ lưu trữ IRFA 0869',
    name: 'Lm. Constant-Joseph Sorel (MEP)',
    saintName: 'Thánh Giuse',
    role: 'Linh mục Chánh sở Họ đạo Mỹ Tho • Người xây ngôi nhà thờ thứ hai (1870 – 1872)',
    period: '1870 – 1872',
    birth: '14/04/1840 tại Bulles, Giáo phận Beauvais, Pháp',
    death: '26/02/1873 tại Nice, Pháp; an táng tại Marseille',
    priestOrdination: 'Thụ phong Linh mục ngày 17/12/1864',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 0869',
    image: '/images/cha_sorel.jpg',
    tableNote: 'Vốn có kiến thức kiến trúc, ngài tự vẽ đồ án, mua vật liệu, thuê thợ và nhiều khi cầm bay xây như một người thợ lành nghề, dựng lên ngôi nhà thờ thứ hai của họ đạo mà Cha Marc chỉ mới đặt được viên đá năm 1866. Ngã bệnh khi mặt tiền và cung thánh còn dang dở; Cha Moulins hoàn tất.',
    shortDesc: 'Trước khi về Mỹ Tho, ngài phục vụ tại Thủ Dầu Một và dựng ở đó một ngôi nhà thờ gạch khiêm tốn nhưng nhiều năm liền được coi là đẹp nhất địa phận, được các sĩ quan công binh Pháp đánh giá cao. Tháng 7/1868 ngài theo cánh quân của thiếu tá Darros đi cứu giáo dân Thị Tính nhưng đến nơi sau khi cuộc thảm sát đã xảy ra. Năm 1870 ngài về Mỹ Tho, nơi công trình nhà thờ do Cha Marc khởi xướng đã ngưng từ lâu, tường mới cao một mét. Vốn am hiểu kiến trúc, ngài tự nghiên cứu đồ án, xin ngân khoản, mua vật liệu, thuê thợ, trực tiếp chỉ huy thợ nề thợ mộc và nhiều khi cầm bay làm việc như một người thợ lành nghề. Tường lên đủ độ cao, mái đã lợp, ngài đang làm mặt tiền và cung thánh thì kiệt sức; phải sang nhà hưu Hồng Kông rồi về Nice, qua đời ngày 26/02/1873 tại nhà các Sư huynh Thánh Gioan Thiên Chúa.',
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
        title: 'Về Mỹ Tho & dựng ngôi nhà thờ thứ hai của họ đạo',
        content:
          'Nhận họ đạo Mỹ Tho năm 1870 và bắt tay xây dựng ngôi nhà thờ mà Đức cha Miche đã đặt viên đá năm 1866 rồi phải bỏ dở. Công trình được Cha Moulins hoàn tất và Đức cha Colombert làm phép trọng thể ngày 12/03/1876. Ngôi nhà thờ này bị tháo dỡ khoảng năm 1900 và nay không còn — chính là ngôi thánh đường trong bản khắc năm 1877 và trong tấm ảnh cũ đề "Cathédrale de My Tho".'
      },
      {
        time: '1872 – 1873',
        title: 'Trở về Pháp & qua đời',
        content: 'Ngã bệnh nặng, ngài về Pháp năm 1872 và qua đời ngày 26/02/1873 tại Nice, được an táng tại Marseille.'
      }
    ],
    milestones: [
      'Chánh sở họ đạo Mỹ Tho 1870 – 1872.',
      'Xây dựng ngôi nhà thờ thứ hai của họ đạo Mỹ Tho, tự tay chỉ huy công trường.',
      'Xây nhà thờ Thủ Dầu Một, nhiều năm được coi là đẹp nhất địa phận Tây Đàng Trong.'
    ],
    works: [
      {
        time: '1870 – 1872 (làm phép 12/03/1876)',
        name: 'Ngôi nhà thờ thứ hai của họ đạo — quen gọi là Nhà thờ Vĩnh Tường',
        now: 'không còn — bị tháo dỡ khoảng năm 1900; ngôi Chánh Tòa 1906 – 1910 thay thế',
        detail:
          'Tư liệu Pháp gọi đơn giản là "église de Mytho", tư liệu Việt quen gọi là Nhà thờ Vĩnh Tường, kính Thánh Tâm — cùng một ngôi nhà thờ. Đó là một thánh đường Baroque bề thế: dài 42 m, rộng 18 m, cao 36 m; lòng chính rộng 9,40 m; 32 cột Corinthiên cao 8 m; trần vòm cuốn; toàn bộ phào chỉ và trang trí bằng vữa stuc kiểu Hoa, do một người thợ Hoa đắp tay tại chỗ; 16 cửa sổ kính màu và một cửa kính hậu cung sáu huy hiệu kể các mầu nhiệm chính của đạo. Đức cha Colombert làm phép ngày 12/03/1876 trước sự hiện diện của đại tá Trève cùng toàn thể binh sĩ đồn trú, các Sư huynh Lasan và các Nữ tu Thánh Phaolô.'
      },
      {
        time: 'Sau 1872',
        name: 'Nhà thờ Thủ Dầu Một',
        detail:
          'Xây dựng ngôi thánh đường mà trong nhiều năm được xem là đẹp nhất địa phận Tây Đàng Trong.'
      }
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
    tableNote: 'Coi sóc họ đạo suốt 27 năm — nhiệm kỳ dài nhất trong lịch sử. Trong ba năm, ngài vừa lo kinh phí vừa tự làm thợ chạm, thợ mộc, thợ trang trí để hoàn tất ngôi nhà thờ Cha Sorel bỏ dở; tái lập họ đạo Xoài Mút và lập địa hạt Bình Đại. Năm 1899 được gọi về làm Chánh sở Nhà thờ Chánh Tòa Sài Gòn.',
    shortDesc: 'Vị chánh sở gắn bó với Mỹ Tho lâu nhất trong lịch sử họ đạo — 27 năm liên tục. Trước khi về Mỹ Tho ngài tập sự tại Chủng viện Sài Gòn, Lái Thiêu, rồi Cái Mơn — nơi ngài phụ giúp Cha Gernot xây nhà thờ. Ngài hoàn tất ngôi nhà thờ do Cha Sorel bỏ dở, phát triển giáo xứ, tái lập họ đạo Xoài Mút và thành lập địa hạt Bình Đại; xây nhiều nhà xứ và nhà nguyện tại Xoài Mút, An Đức và Bình Đại. Dưới thời ngài, Mỹ Tho trở thành nơi dừng chân của các thừa sai từ các tỉnh miền dưới, Campuchia và Lào. Năm 1899 Đức cha Mossard mời ngài nhận chức Chánh sở Nhà thờ Chánh Tòa Sài Gòn, nhưng ngài chỉ đảm nhiệm được vài tháng thì qua đời.',
    chronology: [
      {
        time: '1869 – 1873',
        title: 'Thụ phong & Những nhiệm sở đầu',
        content: 'Thụ phong linh mục ngày 22/05/1869, vào Chủng viện Thừa Sai Paris và lên đường sang Tây Đàng Trong ngày 06/07/1870. Khởi đầu tại chủng viện Sài Gòn, tạm thay quản lý địa phận, rồi về Lái Thiêu; hoàn tất giai đoạn đào tạo tại Cái Mơn, nơi ngài phụ giúp Cha Gernot xây nhà thờ.'
      },
      {
        time: '1873',
        title: 'Nhận họ đạo Mỹ Tho',
        content:
          'Được trao coi sóc họ đạo Mỹ Tho. Trong ba năm, ngài lo được nguồn kinh phí và tự mình làm thợ chạm, thợ mộc, thợ trang trí để đưa công trình dang dở của Cha Sorel đến đích. Đức cha Colombert làm phép trọng thể ngôi nhà thờ ngày 12/03/1876.'
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
      'Hoàn tất ngôi nhà thờ thứ hai của họ đạo, làm phép ngày 12/03/1876.',
      'Tái lập họ đạo Xoài Mút và thành lập địa hạt Bình Đại.',
      'Chánh sở Nhà thờ Chánh Tòa Sài Gòn (1899 – 1900).'
    ],
    works: [
      {
        time: 'Hoàn tất dưới thời 1873 – 1899',
        name: 'Hoàn tất ngôi nhà thờ thứ hai — Nhà thờ Vĩnh Tường, kính Thánh Tâm',
        now: 'không còn — tháo dỡ khoảng năm 1900; ngôi Chánh Tòa 1906 – 1910 thay thế',
        detail:
          'Ba năm ròng vừa lo kinh phí vừa đích thân làm thợ chạm, thợ mộc và thợ trang trí. Đức cha Colombert làm phép ngày 12/03/1876. Ngôi thánh đường phục vụ họ đạo hai mươi lăm năm, đến khoảng năm 1900 thì được tháo dỡ vì hư hỏng nặng và vì giáo dân đã dời lên khu Thượng Mỹ Tho.'
      },
      {
        time: '1873 – 1899',
        name: 'Tái lập họ đạo Xoài Mút và lập địa hạt Bình Đại',
        detail:
          'Mở rộng địa bàn mục vụ của họ đạo Mỹ Tho ra các vùng lân cận trong suốt nhiệm kỳ 27 năm — nhiệm kỳ dài nhất trong lịch sử họ đạo.'
      }
    ]
  },
  {
    id: 'cha-regnier-co-gam',
    source:
      'Hồ sơ lưu trữ IRFA 1502 và bài cáo phó của Hội Thừa Sai Paris năm 1922. Hồ sơ gốc viết tên là RENIER (không dấu); giáo dân Mỹ Tho quen gọi ngài là "Cố Gẫm".',
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
      'Vị chủ chăn được giáo dân kính trọng gọi là "Cố Gẫm".',
      'Trông coi việc tháo dỡ ngôi nhà thờ cũ ở Hạ Mỹ Tho và dời trung tâm họ đạo lên Thượng Mỹ Tho.',
      'Chứng kiến trại phong Cù Lao Rồng và bệnh viện của Nhà nước được trao cho các Nữ tu Thánh Phaolô.',
      'Là cha sở có uy tín và là chỗ dựa tinh thần lớn của cả tỉnh lỵ Mỹ Tho suốt 23 năm.'
    ],
    works: [
      {
        time: '1899 – khoảng 1900',
        name: 'Dời trung tâm họ đạo lên Thượng Mỹ Tho',
        now: 'khu vực nhà thờ và Tòa Giám mục ngày nay, 32 Hùng Vương',
        detail:
          'Trận bão lớn năm 1904 được báo cáo thường niên của Hội Thừa Sai ghi lại: "Le typhon a causé, à Mytho et dans tous les villages de la contrée, des pertes considérables" — bão gây thiệt hại nặng cho Mỹ Tho và mọi làng mạc quanh vùng; cơ sở Thánh Nhi hư hỏng và không được dựng lại, nhà nuôi trẻ phải dời về Vĩnh Tường. Khi ngài về nhận họ đạo, cộng đoàn chia làm hai khu vốn từng là hai họ đạo riêng: Thượng Mỹ Tho (Vĩnh Tường) có nhà xứ cho cha phó, một nhà thờ và bệnh viện bản xứ do các Nữ tu Thánh Phaolô coi sóc; Hạ Mỹ Tho là nơi cha sở ở, có ngôi nhà thờ lớn cùng cơ sở Thánh Nhi và nhà nuôi trẻ. Người Pháp đến ngày một đông khiến giáo dân dời dần lên Thượng Mỹ Tho, trong khi ngôi nhà thờ lớn và tháp chuông ở Hạ Mỹ Tho — vốn là niềm tự hào của khu phố — hư hỏng nặng. Sau khi Nhà nước và Đức Giám mục bàn bạc, người ta quyết định tháo dỡ ngôi nhà thờ ấy vì thấy không nên dồn tiền của vào nơi giáo dân đã rời đi. Ngài rời căn phòng trên phòng thánh lớn, lên ở nhờ căn nhà lá của cha phó, rồi lần lượt ở hai căn chòi lá cho tới ngày khánh thành nhà xứ mới — nơi ngài sống mười sáu năm cuối đời.'
      },
      {
        time: 'Khởi công 11/08/1906 — hoàn thành 1910',
        name: 'NHÀ THỜ CHÁNH TÒA MỸ THO hiện hữu',
        now: 'chính ngôi nhà thờ đang đứng tại 32 Hùng Vương, Phường 7, TP. Mỹ Tho',
        detail:
          'Công trình lớn nhất trong lịch sử họ đạo: ngôi thánh đường đang đứng tại 32 Hùng Vương ngày nay, cũng là nhà thờ mẹ của Giáo phận Mỹ Tho từ năm 1960. Ngôi nhà thờ này được cung hiến vào Đại Năm Thánh 2000 và đại trùng tu nhân dịp bách chu niên 2006 – 2007.'
      },
      {
        time: '1899 – 1922',
        name: 'Trường Sư huynh Lasan và nội trú Nữ tu Thánh Phaolô',
        detail:
          'Mở hai cơ sở giáo dục Công giáo tại Mỹ Tho, đặt nền cho mạng lưới trường học của họ đạo phát triển mạnh dưới thời Cha Bar.'
      },
      {
        time: '1899 – 1922',
        name: 'Nhà thờ Ngũ Hiệp và nguyện đường Thánh Anna',
        detail:
          'Xây mới nhà thờ Ngũ Hiệp và tái thiết nguyện đường Thánh Anna trong địa hạt mục vụ của họ đạo Mỹ Tho.'
      }
    ]
  },
  {
    id: 'cha-bar-co-bach',
    source:
      'Hồ sơ lưu trữ IRFA 2241. Giáo dân Mỹ Tho quen gọi ngài là "Cố Bạch".',
    tableNote: 'Trước khi về Mỹ Tho, ngài dạy triết tại Chủng viện Sài Gòn, làm tuyên uý Dòng Kín Cát Minh (1899) rồi coi địa hạt Bãi Xan. Tại Mỹ Tho: đón Đệ tử các Sư huynh Lasan (1929); năm 1930 trường Sư huynh có 400 học sinh, trường Nữ tu Thánh Phaolô 300 nữ sinh; năm 1933 ghi nhận 642 người được rửa tội và lập ba họ đạo Bàn Hạn, Thược, Phú Vang — họ Phú Vang trao cho cha Tôma Kỳ. Mang bệnh ung thư vòm họng, ngài qua đời ngay tại nhiệm sở sau khi lãnh Xức Dầu trước mặt giáo dân và nói lời từ biệt cuối cùng.',
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
      'Năm 1941, cùng cha Ad. Keller đón nhận giáo dân chạy loạn về nương náu tại họ đạo.',
      'Năm 1933 ghi nhận 642 người được rửa tội trong toàn địa hạt.',
      'Dạy triết học tại Chủng viện Sài Gòn và làm tuyên uý Dòng Kín Cát Minh (1899) trước khi về Mỹ Tho.',
      'Trước lúc qua đời, ngài xin lỗi giáo dân và nhắn nhủ họ giữ trọn bổn phận người Kitô hữu.'
    ],
    works: [
      {
        time: '1929 – 1930',
        name: 'Hệ thống trường học Công giáo Mỹ Tho',
        detail:
          'Đón các Sư huynh Lasan về Mỹ Tho năm 1929. Đến năm 1930 trường Sư huynh đã có 400 học sinh và trường Nữ tu Thánh Phaolô 300 nữ sinh — quy mô giáo dục lớn nhất của họ đạo tính đến thời điểm đó.'
      },
      {
        time: '1933',
        name: 'Ba họ đạo Bàn Hạn, Thược và Phú Vang',
        detail:
          'Thành lập cùng lúc ba họ đạo mới, mở rộng đáng kể địa bàn Công giáo quanh Mỹ Tho.'
      }
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
    ],
    works: [
      {
        time: '1958',
        name: 'Di dời chuông nhà thờ lên tháp cao phía Nam',
        now: 'bộ chuông sau này được chuyển sang tháp chuông riêng do Cha Chúc xây năm 1995',
        detail:
          'Đưa bộ chuông lên tháp cao phía Nam của ngôi thánh đường, thay đổi rõ rệt diện mạo mặt tiền nhà thờ. Đây là công trình cải tạo lớn đầu tiên do một linh mục người Việt chủ trì tại họ đạo.'
      }
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
    ],
    works: [
      {
        time: '1960 – 1965',
        name: 'Tòa Giám Mục Mỹ Tho đầu tiên',
        now: 'khuôn viên Tòa Giám mục Mỹ Tho, 32 Hùng Vương — sát bên nhà thờ',
        detail:
          'Xây dựng trụ sở điều hành cho giáo phận vừa được thành lập năm 1960 — công trình bản lề biến khuôn viên Chánh Tòa thành trung tâm của cả giáo phận.'
      },
      {
        time: '1960 – 1965',
        name: 'Nhà Tĩnh Tâm, Nghênh Đài Đức Mẹ và Nhà Cha Sở',
        detail:
          'Ba hạng mục hoàn thiện khuôn viên nhà thờ: nơi tĩnh tâm cho giáo sĩ và giáo dân, đài kính Đức Mẹ, và nhà ở của cha sở.'
      },
      {
        time: '1960 – 1965',
        name: 'Trường Tiểu học Thánh Giuse',
        now: 'không còn hoạt động dưới danh nghĩa trường Công giáo',
        detail:
          'Thành lập trường tiểu học của giáo xứ Chánh Tòa, nối tiếp truyền thống giáo dục Công giáo có từ thời Cha Rénier và Cha Bar.'
      }
    ]
  },
  {
    id: 'cha-nguyen-van-niem',
    name: 'Lm. Phêrô Nguyễn Văn Niềm',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Linh mục Chánh sở Nhà thờ Chánh Tòa Mỹ Tho (1965 – đầu 1975)',
    period: '1965 – 1975',
    image: '/images/cha_nguyen_van_niem.jpg',
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
    ],
    works: [
      {
        time: 'Đặt viên đá 16/02/1995 — khánh thành 30/11/1995',
        name: 'Tháp chuông tách rời Nhà thờ Chánh Tòa',
        now: 'tháp chuông đứng riêng bên cạnh nhà thờ, nhìn thấy ngay từ đường Hùng Vương',
        detail:
          'Dựng tháp chuông thành một khối riêng, tách khỏi thân nhà thờ, nhằm gỡ tải trọng và rung chấn của bộ chuông khỏi ngôi thánh đường đã gần chín mươi tuổi. Đây là lý do Nhà thờ Chánh Tòa Mỹ Tho có tháp chuông đứng riêng như hiện nay.'
      },
      {
        time: 'Đầu năm 1975',
        name: 'Họ đạo Tân Long',
        detail:
          'Đặt nền móng và thành lập họ đạo Tân Long ngay trong giai đoạn biến động nhất của lịch sử giáo phận.'
      }
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
    ],
    works: [
      {
        time: '2006 – 2007',
        name: 'Đại trùng tu Bách Chu Niên Nhà thờ Chánh Tòa',
        now: 'diện mạo Nhà thờ Chánh Tòa mà giáo dân thấy hiện nay',
        detail:
          'Trùng tu toàn diện ngôi thánh đường đúng dịp tròn một trăm năm ngày khởi công (11/08/1906), giữ nguyên kiến trúc gốc thời Cha Rénier.'
      },
      {
        time: '2020',
        name: 'Nhà Mục vụ Giáo xứ',
        now: 'Nhà Mục vụ trong khuôn viên Giáo xứ Chánh Tòa, nơi Xứ Đoàn sinh hoạt',
        detail:
          'Xây dựng nhà mục vụ phục vụ giáo lý, sinh hoạt đoàn thể và các lớp huấn luyện của giáo xứ, trong đó có Xứ Đoàn Thiếu Nhi Thánh Thể.'
      }
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
export const PASTOR_GAPS: PastorTimelineRow[] = [];

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
export interface TnttScarf {
  id: string;
  name: string;
  /** Tuyên Uý không có khẩu hiệu riêng nên để trống. */
  motto?: string;
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
export function ScarfIcon({ scarf }: { scarf: TnttScarf }) {
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

export const TNTT_NGANH: TnttScarf[] = [
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

export const TNTT_HUYNH_TRUONG: TnttScarf[] = [
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

/**
 * Các đời cha tuyên uý Xứ Đoàn, tính từ ngày tái lập năm 2005.
 * Nguồn: ghi chép của Xứ Đoàn, do Ban Điều Hành cung cấp.
 */

/**
 * Ghi chú riêng của từng thánh lễ Chúa Nhật tại Chánh Tòa. Khoá theo giờ: Admin
 * đổi giờ thì ghi chú tự biến mất, không dán nhầm sang thánh lễ khác.
 */
export const SUNDAY_MASS_NOTES: Record<string, string> = {
  '05:30': 'Thánh lễ sáng sớm',
  '07:00': 'Lễ dành cho Thiếu nhi & Giới trẻ',
  '16:00': 'Lễ chiều',
  '18:00': 'Lễ chiều tối'
};

export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

/**
 * Lý lịch các đời cha tuyên uý Xứ Đoàn.
 *
 * Nguồn gốc dữ liệu:
 *  - Năm sinh, năm chịu chức và nhiệm sở: danh sách Linh mục đương nhiệm Giáo
 *    phận Mỹ Tho cập nhật 11.2024 (giaophanmytho.net).
 *  - Ngày sinh, ngày chịu chức và quê quán: thông báo và bản tin phong chức
 *    của Toà Giám mục Mỹ Tho, chỉ có cho các khoá 2017, 2022 và 2024.
 *  - Nhiệm kỳ tuyên uý: ghi chép của Xứ Đoàn do Ban Điều Hành cung cấp.
 *
 * Những mục chưa tra được nguồn thì bỏ trống để hiển thị "chưa cập nhật" —
 * không suy đoán. Chưa vị nào có ảnh tư liệu nên đều để trống trường image.
 */
export const CHAPLAINS_EXTENDED_DATA: DetailedBioRecord[] = [
  {
    id: 'tuyen-uy-nguyen-ngoc-long',
    name: 'Lm. Phêrô Nguyễn Ngọc Long',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (2005 – 2009)',
    period: '2005 – 2009',
    birth: 'Sinh năm 1977',
    origin: 'Giáo phận Mỹ Tho',
    priestOrdination: 'Thụ phong linh mục năm 2004',
    image: '/images/tuyen_uy_nguyen_ngoc_long.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024 và bài "Gx. Lương Hoà Hạ: Thánh lễ nhận xứ của cha Phêrô Nguyễn Ngọc Long", giaophanmytho.net, 01/08/2023',
    shortDesc:
      'Vị tuyên uý đầu tiên của Xứ Đoàn sau ngày tái lập năm 2005. Ngài đồng hành với Xứ Đoàn ngay từ khoá huấn luyện Huynh Trưởng đầu tiên, đặt nền cho sinh hoạt Thiếu Nhi Thánh Thể tại Giáo xứ Chánh Tòa. Từ năm 2023 ngài là cha sở Giáo xứ Lương Hoà Hạ, Giáo hạt Đức Hoà.',
    chronology: [
      { time: '2004', title: 'Thụ phong linh mục', content: 'Chịu chức linh mục thuộc Giáo phận Mỹ Tho.' },
      {
        time: '2005 – 2009',
        title: 'Cha Tuyên Uý Xứ Đoàn Các Thánh Tử Đạo Việt Nam',
        content:
          'Linh hướng Xứ Đoàn trong bốn năm đầu tiên sau ngày tái lập, giai đoạn hình thành ban điều hành và các ngành.'
      },
      {
        time: '19/06/2023',
        title: 'Bổ nhiệm cha sở Giáo xứ Lương Hoà Hạ',
        content:
          'Đức Cha Phêrô Nguyễn Văn Khảm ký văn thư bổ nhiệm ngài làm cha sở Giáo xứ Lương Hoà Hạ, Giáo hạt Đức Hoà.'
      },
      {
        time: '31/07/2023',
        title: 'Thánh lễ nhận xứ Lương Hoà Hạ',
        content:
          'Lúc 09g30 ngày 31/07/2023, Đức Cha Phêrô Nguyễn Văn Khảm chủ sự thánh lễ nhận xứ tại Giáo xứ Lương Hoà Hạ, toạ lạc Ấp 7, xã Lương Hoà, huyện Bến Lức, tỉnh Long An. Cha Gabriel Nguyễn Tấn Di — Hạt trưởng Hạt Đức Hoà — công bố văn thư bổ nhiệm.'
      }
    ],
    milestones: ['Cha Tuyên Uý tiên khởi của Xứ Đoàn sau ngày tái lập năm 2005.']
  },
  {
    id: 'tuyen-uy-nguyen-nhut-cuong',
    name: 'Lm. Gioan Baotixita Nguyễn Nhựt Cương',
    saintName: 'Thánh Gioan Baotixita',
    role: 'Cha Tuyên Uý Xứ Đoàn (2010 – 2013)',
    period: '2010 – 2013',
    birth: 'Sinh năm 1976',
    origin: 'Giáo phận Mỹ Tho',
    priestOrdination: 'Thụ phong linh mục năm 2008',
    image: '/images/tuyen_uy_nguyen_nhut_cuong.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024 và bài "Cha Gioan Baotixita Nguyễn Nhựt Cương nhận xứ Tân Quới", giaophanmytho.net, 28/07/2023',
    shortDesc:
      'Cha Tuyên Uý thứ hai của Xứ Đoàn, đồng hành trong giai đoạn Xứ Đoàn kiện toàn hệ thống ngành và đội sau những năm đầu tái lập. Từ năm 2023 ngài là cha sở Giáo xứ Tân Quới, Giáo hạt Cù Lao Tây.',
    chronology: [
      { time: '2008', title: 'Thụ phong linh mục', content: 'Chịu chức linh mục thuộc Giáo phận Mỹ Tho.' },
      {
        time: '2010 – 2013',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: '19/06/2023',
        title: 'Bổ nhiệm cha sở Giáo xứ Tân Quới',
        content:
          'Đức Cha Phêrô Nguyễn Văn Khảm bổ nhiệm ngài làm cha sở Giáo xứ Tân Quới, kế nhiệm cha Inhaxiô Võ Viết Chuyên.'
      },
      {
        time: '28/07/2023',
        title: 'Thánh lễ nhận xứ Tân Quới',
        content:
          'Lúc 09g30 ngày 28/07/2023, cha Tổng Đại Diện Phaolô Trần Kỳ Minh chủ sự thánh lễ tạ ơn và nghi thức nhận xứ, cùng 24 linh mục hạt Cù Lao Tây và hạt Cái Bè đồng tế.'
      },
      {
        time: 'Nhiệm sở hiện nay',
        title: 'Giáo xứ Tân Quới, Giáo hạt Cù Lao Tây',
        content:
          'Nhà thờ Tân Quới toạ lạc tại xã Tân Quới, huyện Thanh Bình, tỉnh Đồng Tháp. Giáo xứ thành lập từ năm 1862, trước năm 1974 gọi là Họ đạo Cù Lao Tây, hiện có 2.562 giáo dân và 682 gia đình công giáo.'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-tran-trong-khuong',
    name: 'Lm. Phêrô Trần Trọng Khương',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (giữa 2013 – đầu 2016)',
    period: 'Giữa 2013 – đầu 2016',
    birth: 'Sinh năm 1981',
    origin: 'Giáo phận Mỹ Tho',
    priestOrdination: 'Thụ phong linh mục năm 2011',
    image: '/images/tuyen_uy_tran_trong_khuong.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho, cập nhật 11.2024 (giaophanmytho.net)',
    shortDesc:
      'Cha Tuyên Uý thứ ba của Xứ Đoàn. Theo danh sách linh mục đoàn cập nhật tháng 11/2024, hiện ngài đang trong thời gian nghỉ bệnh.',
    chronology: [
      { time: '2011', title: 'Thụ phong linh mục', content: 'Chịu chức linh mục thuộc Giáo phận Mỹ Tho.' },
      {
        time: 'Giữa 2013 – đầu 2016',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: 'Khoảng 2013 – 2016',
        title: 'Cha phó Giáo xứ Chánh Tòa Mỹ Tho',
        content:
          'Trong chính giai đoạn làm tuyên uý, ngài phục vụ với tư cách cha phó Giáo xứ Chánh Tòa. Bản tin của giáo phận ghi nhận ngài trong các sinh hoạt của giáo xứ như Đại hội Các Bà Mẹ Công Giáo năm 2013 và cuộc rước kiệu tôn vinh Mẹ Maria năm 2016.'
      },
      {
        time: 'Hiện nay',
        title: 'Tình trạng',
        content: 'Nghỉ bệnh (theo danh sách linh mục đoàn 11.2024). Xin cộng đoàn cầu nguyện cho ngài.'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-nguyen-thanh-danh',
    name: 'Lm. Phêrô Nguyễn Thành Danh',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (cuối 2016 – 2019)',
    period: 'Cuối 2016 – 2019',
    birth: 'Sinh năm 1978',
    origin: 'Giáo phận Mỹ Tho',
    priestOrdination: 'Thụ phong linh mục năm 2013',
    image: '/images/tuyen_uy_nguyen_thanh_danh.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024 và bài "Gx. An Thái Trung: Thánh lễ Tạ ơn và nhận sở mới của cha Phêrô Nguyễn Thành Danh", giaophanmytho.net, 31/08/2023',
    shortDesc:
      'Cha Tuyên Uý thứ tư của Xứ Đoàn, đồng hành gần ba năm trong giai đoạn Xứ Đoàn mở rộng số đoàn sinh và củng cố đội ngũ Huynh Trưởng. Từ năm 2023 ngài là cha sở Giáo xứ An Thái Trung, Giáo hạt Cái Bè.',
    chronology: [
      { time: '2013', title: 'Thụ phong linh mục', content: 'Chịu chức linh mục thuộc Giáo phận Mỹ Tho.' },
      {
        time: 'Cuối 2016 – 2019',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: '31/08/2023',
        title: 'Thánh lễ tạ ơn và nhận sở mới tại Giáo xứ An Thái Trung',
        content:
          'Đức Cha Phêrô Nguyễn Văn Khảm chủ sự thánh lễ nhận sở tại Giáo xứ An Thái Trung, Ấp 2, xã An Thái Trung, huyện Cái Bè, tỉnh Tiền Giang. Đồng tế có cha Tổng Đại Diện Phaolô Trần Kỳ Minh, quý cha Hạt trưởng hạt Mỹ Tho và hạt Cái Bè cùng 66 linh mục trong và ngoài giáo phận.'
      },
      {
        time: 'Nhiệm sở hiện nay',
        title: 'Giáo xứ An Thái Trung, Giáo hạt Cái Bè',
        content:
          'Giáo xứ do các thừa sai Dòng Chúa Cứu Thế (Cái Nhum) khai mở, công cuộc truyền giáo bắt đầu trong hai năm 1958 – 1959 tại vùng phía tây Mỹ Tho.'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-phan-van-dai',
    name: 'Lm. Antôn Phan Văn Đại',
    saintName: 'Thánh Antôn',
    role: 'Cha Tuyên Uý Xứ Đoàn (2019 – 2020)',
    period: '2019 – 2020',
    birth: 'Sinh năm 1984',
    origin: 'Giáo xứ Anrê, Thanh Bình, Đồng Tháp',
    priestOrdination: 'Thụ phong linh mục ngày 21/04/2017 tại Nhà thờ Chánh Tòa Mỹ Tho',
    image: '/images/tuyen_uy_phan_van_dai.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo thông báo phong chức linh mục của Toà Giám mục Mỹ Tho ngày 04/02/2017 và danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024',
    shortDesc:
      'Cha Tuyên Uý thứ năm của Xứ Đoàn. Sau nhiệm kỳ tuyên uý, ngài được cử đi du học tại Philippines.',
    chronology: [
      {
        time: '21/04/2017',
        title: 'Thụ phong linh mục',
        content:
          'Chịu chức linh mục lúc 09g30 tại Nhà thờ Chánh Tòa Mỹ Tho, cùng khoá với sáu tân linh mục khác của giáo phận.'
      },
      {
        time: '2019 – 2020',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: 'Hiện nay',
        title: 'Du học',
        content: 'Đang du học tại Philippines (theo danh sách linh mục đoàn 11.2024).'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-truong-ngoc-duc',
    name: 'Lm. Phêrô Trương Ngọc Đức',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (cuối 2020 – đầu 2022)',
    period: 'Cuối 2020 – đầu 2022',
    birth: 'Sinh năm 1986',
    origin: 'Giáo phận Mỹ Tho',
    priestOrdination: 'Thụ phong linh mục năm 2019',
    image: '/images/tuyen_uy_truong_ngoc_duc.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024 và bài "Cha Phêrô Trương Ngọc Đức – Tân chánh xứ Giáo xứ Mỹ Điền", giaophanmytho.net, 04/08/2023',
    shortDesc:
      'Cha Tuyên Uý thứ sáu của Xứ Đoàn, đồng hành đúng vào giai đoạn đại dịch khi mọi sinh hoạt tập trung của Xứ Đoàn bị gián đoạn. Nguyên cha phó Giáo xứ Tân An, từ năm 2023 ngài là chánh xứ Giáo xứ Mỹ Điền.',
    chronology: [
      { time: '2019', title: 'Thụ phong linh mục', content: 'Chịu chức linh mục thuộc Giáo phận Mỹ Tho.' },
      {
        time: 'Cuối 2020 – đầu 2022',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content:
          'Linh hướng Xứ Đoàn trong giai đoạn dịch bệnh, khi các buổi sinh hoạt và thánh lễ tập trung phải tạm ngưng nhiều đợt.'
      },
      {
        time: 'Trước 2023',
        title: 'Cha phó Giáo xứ Tân An',
        content: 'Phục vụ với tư cách cha phó Giáo xứ Tân An trước khi được bổ nhiệm làm chánh xứ.'
      },
      {
        time: '04/08/2023',
        title: 'Tân chánh xứ Giáo xứ Mỹ Điền',
        content:
          'Đức Cha Phêrô Nguyễn Văn Khảm chủ sự thánh lễ nhận xứ tại Nhà thờ Mỹ Điền, xã Long Hựu Tây, huyện Cần Đước, tỉnh Long An, thuộc Giáo hạt Đức Hoà.'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-tran-anh-duy',
    name: 'Lm. Phêrô Trần Anh Duy',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (đầu 2022 – 2023)',
    period: 'Đầu 2022 – 2023',
    birth: 'Sinh năm 1985',
    origin: 'Giáo phận Mỹ Tho',
    priestOrdination: 'Thụ phong linh mục năm 2019',
    image: '/images/tuyen_uy_tran_anh_duy.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024 và bài "Giáo xứ Gò Da: Cha Tổng Đại Diện chủ sự thánh lễ nhận xứ", giaophanmytho.net, 10/08/2023',
    shortDesc:
      'Cha Tuyên Uý thứ bảy của Xứ Đoàn, đồng hành trong giai đoạn Xứ Đoàn khôi phục sinh hoạt sau đại dịch. Từ năm 2023 ngài là cha sở Giáo xứ Gò Da, Giáo hạt Cù Lao Tây.',
    chronology: [
      { time: '2019', title: 'Thụ phong linh mục', content: 'Chịu chức linh mục thuộc Giáo phận Mỹ Tho.' },
      {
        time: 'Đầu 2022 – 2023',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: '10/08/2023',
        title: 'Thánh lễ nhận xứ Gò Da',
        content:
          'Cha Tổng Đại Diện Phaolô Trần Kỳ Minh chủ sự thánh lễ nhận xứ tại Nhà thờ Gò Da, xã Bình Phú, huyện Tân Hồng, tỉnh Đồng Tháp, thuộc Giáo hạt Cù Lao Tây, cùng 20 linh mục trong giáo phận đồng tế.'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-nguyen-hoang-anh',
    name: 'Lm. Phêrô Nguyễn Hoàng Anh',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (2023 – 2024)',
    period: '2023 – 2024',
    birth: '02/04/1987',
    origin: 'Giáo xứ Thiên Phước, Đồng Tháp',
    priestOrdination: 'Thụ phong linh mục ngày 29/12/2022 tại Nhà thờ Chánh Tòa Mỹ Tho',
    image: '/images/tuyen_uy_nguyen_hoang_anh.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo thông báo phong chức linh mục của Toà Giám mục Mỹ Tho ngày 22/11/2022, bản tin Thánh lễ phong chức 29/12/2022 (giaophanmytho.net), danh sách Linh mục đương nhiệm 11.2024 và Danh sách thuyên chuyển và bổ nhiệm Linh mục Gp. Mỹ Tho tháng 06.2026',
    shortDesc:
      'Cha Tuyên Uý thứ tám của Xứ Đoàn, nhận nhiệm vụ ngay trong năm đầu tiên sau khi thụ phong linh mục. Từ tháng 06/2026 ngài là chánh xứ Giáo xứ Vĩnh Kim, Giáo hạt Cái Bè.',
    chronology: [
      {
        time: '29/12/2022',
        title: 'Thụ phong linh mục',
        content:
          'Chịu chức linh mục lúc 09g30 tại Nhà thờ Chánh Tòa Mỹ Tho do Đức Cha Phêrô Nguyễn Văn Khảm chủ phong, cùng bảy tân linh mục khác của giáo phận.'
      },
      {
        time: '2023 – 2024',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: '2023 – 2024',
        title: 'Cha phó Giáo xứ Chánh Tòa Mỹ Tho',
        content:
          'Ngài phục vụ tại chính Giáo xứ Chánh Tòa trong thời gian làm tuyên uý Xứ Đoàn — nhờ vậy đồng hành sát sao với các em đoàn sinh và anh chị Huynh Trưởng.'
      },
      {
        time: 'Đến 06/2026',
        title: 'Phó xứ Giáo xứ Nữ Vương Hoà Bình, Giáo hạt Mỹ Tho',
        content:
          'Giáo xứ Nữ Vương Hoà Bình trải trên địa bàn các phường 6, 5, 4 và 1 của thành phố Mỹ Tho, tỉnh Tiền Giang, có khoảng 2.301 giáo dân.'
      },
      {
        time: '06/2026 – nay',
        title: 'Chánh xứ Giáo xứ Vĩnh Kim, Giáo hạt Cái Bè',
        content:
          'Theo danh sách thuyên chuyển và bổ nhiệm linh mục Giáo phận Mỹ Tho tháng 06/2026, ngài rời chức phó xứ Nữ Vương Hoà Bình để nhận nhiệm sở mới làm chánh xứ Giáo xứ Vĩnh Kim, Giáo hạt Cái Bè.'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-nguyen-ngoc',
    name: 'Lm. Phêrô Nguyễn Ngọc',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (2024 – 2026)',
    period: '2024 – 2026',
    birth: '30/05/1987',
    origin: 'Giáo xứ Lập Điền, Long An',
    priestOrdination: 'Thụ phong linh mục ngày 29/12/2022 tại Nhà thờ Chánh Tòa Mỹ Tho',
    image: '/images/tuyen_uy_nguyen_ngoc.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo thông báo phong chức linh mục của Toà Giám mục Mỹ Tho ngày 22/11/2022 và bản tin Thánh lễ phong chức 29/12/2022 (giaophanmytho.net); danh sách Linh mục đương nhiệm 11.2024',
    shortDesc:
      'Cha Tuyên Uý thứ chín của Xứ Đoàn. Ngài phục vụ ngay tại Giáo xứ Chánh Tòa, cùng khoá thụ phong với Cha Phêrô Nguyễn Hoàng Anh — vị tuyên uý tiền nhiệm.',
    chronology: [
      {
        time: '29/12/2022',
        title: 'Thụ phong linh mục',
        content:
          'Chịu chức linh mục lúc 09g30 tại Nhà thờ Chánh Tòa Mỹ Tho do Đức Cha Phêrô Nguyễn Văn Khảm chủ phong.'
      },
      {
        time: '2024 – 2026',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: '2024 – nay',
        title: 'Phục vụ tại Giáo xứ Chánh Tòa, Giáo hạt Mỹ Tho',
        content:
          'Danh sách linh mục đoàn cập nhật tháng 11/2024 ghi nhận ngài phục vụ tại Giáo xứ Chánh Tòa — cùng nhiệm sở với nhiệm kỳ tuyên uý Xứ Đoàn. Lưu ý: danh sách của giáo phận in tên ngài là "Phêrô Nguyên Ngọc", trong khi thông báo và bản tin phong chức năm 2022 đều ghi "Phêrô Nguyễn Ngọc"; trang này theo văn bản phong chức.'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-nguyen-van-thanh',
    name: 'Lm. Emmanuel Nguyễn Văn Thành',
    saintName: 'Emmanuel',
    role: 'Cha Tuyên Uý Xứ Đoàn đương nhiệm (2026 – nay)',
    period: '2026 – nay',
    birth: 'Sinh năm 1987',
    origin: 'Giáo xứ Bến Dinh, Đồng Tháp',
    priestOrdination: 'Thụ phong linh mục ngày 30/08/2024 tại Nhà thờ Chánh Tòa Mỹ Tho',
    image: '/images/tuyen_uy_nguyen_van_thanh.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo bản tin Thánh lễ truyền chức linh mục ngày 30/08/2024 (giaophanmytho.net), danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024 và Danh sách thuyên chuyển và bổ nhiệm Linh mục Gp. Mỹ Tho tháng 06.2026',
    shortDesc:
      'Cha Tuyên Uý đương nhiệm của Xứ Đoàn Các Thánh Tử Đạo Việt Nam. Ngài được điều về làm phó xứ Giáo xứ Chánh Toà trong đợt thuyên chuyển tháng 06/2026.',
    chronology: [
      {
        time: '30/08/2024',
        title: 'Thụ phong linh mục',
        content:
          'Chịu chức linh mục tại Nhà thờ Chánh Tòa Mỹ Tho do Đức Cha Phêrô Nguyễn Văn Khảm chủ phong, cùng năm tân linh mục khác. Thánh lễ đồng thời mừng Đức Cha Phêrô kỷ niệm 44 năm linh mục và 10 năm nhận Giáo phận Mỹ Tho.'
      },
      {
        time: '2024 – 2026',
        title: 'Phục vụ tại Giáo hạt Đức Hoà',
        content:
          'Ngay sau khi thụ phong, ngài được sai về Giáo hạt Đức Hoà: danh sách linh mục đoàn tháng 11/2024 ghi nhiệm sở Cần Giuộc, đến trước tháng 06/2026 ngài phục vụ tại Giáo xứ Lương Hoà Thượng cùng giáo hạt.'
      },
      {
        time: '06/2026',
        title: 'Phó xứ Giáo xứ Chánh Toà, Giáo hạt Mỹ Tho',
        content:
          'Danh sách thuyên chuyển và bổ nhiệm linh mục Giáo phận Mỹ Tho tháng 06/2026 điều ngài từ Giáo xứ Lương Hoà Thượng về làm phó xứ Giáo xứ Chánh Toà — cũng chính là nhiệm sở gắn ngài với sứ vụ Tuyên Uý Xứ Đoàn.'
      },
      {
        time: '2026 – nay',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Đương nhiệm linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      }
    ],
    milestones: []
  }
];

/**
 * Bảng ghi công: các linh mục từng phục vụ họ đạo Mỹ Tho ngoài hàng chánh sở.
 *
 * Tài liệu Giáo phận Mỹ Tho ghi giai đoạn 1866 – 1960 có hơn 80 linh mục,
 * khoảng 30 vị là thừa sai. Danh sách dưới đây tra từ hồ sơ lưu trữ IRFA của
 * Hội Thừa Sai Paris — mỗi tên đều kèm mã hồ sơ để kiểm chứng được.
 *
 * Phần linh mục Việt Nam (khoảng 50 vị) chưa có nguồn số hoá công khai; tên
 * các ngài nằm trong sổ bộ họ đạo và văn khố Tòa Giám mục. Để trống còn hơn
 * ghi sai tên người đã phục vụ.
 */
/**
 * Các Đấng Bản Quyền coi sóc vùng Mỹ Tho TRƯỚC năm 1960.
 *
 * Trước Tông hiến Venerabilium Nostrorum, Mỹ Tho thuộc địa phận Tây Đàng
 * Trong (sau gọi là Sài Gòn). Chín vị Đại diện Tông toà kế tiếp nhau từ 1844
 * đến 1960 chính là các Đấng Bản Quyền của họ đạo Mỹ Tho suốt hơn một thế kỷ.
 *
 * Tiểu sử tra từ notice lưu trữ IRFA của Hội Thừa Sai Paris; chân dung sáu vị
 * lấy từ cùng văn khố, ba vị còn lại do Giáo xứ cung cấp.
 */
export const PRE1960_ORDINARIES: DetailedBioRecord[] = [
  {
    id: 'dgm-lefebvre',
    name: 'Đức cha Dominique Lefebvre',
    saintName: 'Cố Ngãi',
    role: 'Đại diện Tông toà Tây Đàng Trong (1844 – 1864)',
    period: '1844 – 1864',
    birth: '01/08/1810 tại Courtonne-la-Meurdrac, Calvados, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 0418',
    priestOrdination: 'Thụ phong linh mục ngày 20/12/1834',
    bishopConsecration: 'Tấn phong Giám mục hiệu toà Isauropolis tại Gò Thị ngày 01/08/1841',
    image: '/images/dgm_lefebvre.jpg',
    source: 'Hồ sơ lưu trữ IRFA 0418. Chân dung do Giáo xứ Chánh Tòa Mỹ Tho cung cấp.',
    shortDesc:
      'Đấng Bản Quyền trong chính những năm cộng đoàn Công giáo Mỹ Tho hình thành. Ngài học tiếng Việt bên cạnh Cha Borie — vị sau này được tôn phong hiển thánh — và vào Đàng Trong đúng lúc cuộc bách hại lên cao.',
    chronology: [
      { time: '1810 – 1834', title: 'Thời niên thiếu và ơn gọi', content: 'Sinh ngày 01/08/1810 tại Courtonne-la-Meurdrac (Calvados), học tại tiểu chủng viện Lisieux và đại chủng viện Bayeux. Vào Chủng viện Thừa Sai Paris với chức phó tế đầu tháng 9/1833, thụ phong linh mục ngày 20/12/1834.' },
      { time: '1835 – 1840', title: 'Sang Đàng Trong giữa cơn bách hại', content: 'Lên đường ngày 15/03/1835. Cập bến Bắc Kỳ, học tiếng bên cạnh Cha Borie tại Bố Chính, rồi vào Đàng Trong đúng lúc bách hại lên cao. Ngài coi tiểu chủng viện ở Hạ Đàng Trong, thường trú tại Cái Nhum và Cái Mơn thuộc tỉnh Vĩnh Long, nhiều phen phải lánh đi để thoát các cuộc lục soát.' },
      { time: '1841', title: 'Tấn phong Giám mục', content: 'Được chọn làm Phó Đại diện Tông toà năm 1840, rồi làm Giám mục phó cho Đức cha Cuénot. Chiếu theo đoản sắc ngày 10/12/1839, ngài được tấn phong Giám mục hiệu toà Isauropolis tại Gò Thị ngày 01/08/1841. Đoản sắc Pastorale officium ngày 26/02/1841 đặt ngài kế vị Đức cha Cuénot nếu vị này qua đời — Rôma khi ấy không thể nắm tin tức kịp thời từ các địa phận An Nam.' },
      { time: '1861 – 1864', title: 'Với họ đạo Mỹ Tho', content: 'Là Đấng Bản Quyền khi giáo dân các tỉnh miền Tây chạy về Mỹ Tho lánh nạn và hình thành cộng đoàn đầu tiên. Chính ngài nhận bản tường trình năm 1863 của Cha Charles Gernot về nhu cầu của họ đạo — bản tường trình dẫn tới việc các Nữ tu Thánh Phaolô thành Chartres đến Mỹ Tho năm 1864.' }
    ],
    milestones: [
      'Đấng Bản Quyền của họ đạo Mỹ Tho trong những năm cộng đoàn hình thành (1861 – 1864).',
      'Nhận bản tường trình 1863 của Cha Gernot, mở đường cho các Nữ tu Thánh Phaolô đến Mỹ Tho.'
    ]
  },
  {
    id: 'dgm-miche',
    name: 'Đức cha Jean-Claude Miche',
    saintName: 'Cố Mịch',
    role: 'Đại diện Tông toà Tây Đàng Trong (1864 – 1873)',
    period: '1864 – 1873',
    birth: '09/08/1805 tại Bruyères, Vosges, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 0423',
    priestOrdination: 'Thụ phong linh mục ngày 05/06/1830 tại Saint-Dié',
    image: '/images/dgm_miche.jpg',
    source: 'Hồ sơ lưu trữ IRFA 0423',
    shortDesc:
      'Vị Giám mục đã long trọng đặt viên đá đầu tiên xây ngôi nhà thờ thứ hai của họ đạo Mỹ Tho năm 1866 — ngôi thánh đường có trong bản khắc năm 1877.',
    chronology: [
      { time: '1805 – 1835', title: 'Xuất thân và ơn gọi', content: 'Sinh ngày 09/08/1805 tại Bruyères (Vosges) trong một gia đình khiêm tốn. Học tiểu chủng viện Sénaide rồi đại chủng viện Foucharupt, thụ phong linh mục ngày 05/06/1830 tại Saint-Dié. Làm cha phó trong giáo xứ của người anh ruột là Cha Joseph, rồi theo anh về Fraize năm 1832.' },
      { time: '1836 – 1841', title: 'Ba lần vào Đàng Trong', content: 'Vào Chủng viện Thừa Sai ngày 10/09/1835. Chuyến đi đầu bị bão lớn ở vịnh Gascogne chặn lại; ngài rời Pháp ngày 15/04/1836 trên tàu Denise. Vì cuộc bách hại của vua Minh Mạng, ngài không vào được nhiệm sở nên phải học tiếng Việt tại Chủng viện chung, nơi ngài dạy thần học luân lý. Mãi ngày 19/06/1841 ngài mới vào được Đàng Trong.' },
      { time: '1841 – 1864', title: 'Phó Đại diện Tông toà', content: 'Đến ở Gò Thị gần Quy Nhơn bên cạnh Đức cha Cuénot và được đặt làm Phó Đại diện Tông toà. Với chức vụ này, ngài dự phần vào một công đồng bàn về việc ban các bí tích và cách hành xử của các thừa sai.' },
      { time: '1866', title: 'Đặt viên đá nhà thờ Mỹ Tho', content: 'Ngài long trọng đặt viên đá đầu tiên xây ngôi nhà thờ kiên cố cho họ đạo Mỹ Tho. Công trình bị đình lại khi tường mới cao một mét; Cha Sorel tiếp tục từ 1870 và Cha Moulins hoàn tất, làm phép năm 1876.' }
    ],
    milestones: [
      'Đặt viên đá đầu tiên ngôi nhà thờ thứ hai của họ đạo Mỹ Tho năm 1866.',
      'Từng bị cuộc bách hại của vua Minh Mạng chặn lại năm năm mới vào được nhiệm sở.'
    ],
    works: [
      {
        time: '1866',
        name: 'Ngôi nhà thờ thứ hai của họ đạo Mỹ Tho',
        now: 'không còn — tháo dỡ khoảng năm 1900',
        detail:
          'Đặt viên đá đầu tiên. Công trình do Cha Sorel dựng từ năm 1870 và Cha Moulins hoàn tất, được Đức cha Colombert làm phép ngày 12/03/1876.'
      }
    ]
  },
  {
    id: 'dgm-colombert',
    name: 'Đức cha Isidore Colombert',
    saintName: 'Cố Mỹ',
    role: 'Đại diện Tông toà Tây Đàng Trong (1873 – 1894)',
    period: '1873 – 1894',
    birth: '19/03/1838 tại Sainte-Marie-du-Bois, Mayenne, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 0830',
    priestOrdination: 'Thụ phong linh mục ngày 30/05/1863',
    bishopConsecration: 'Đoản sắc 06/02/1872 đặt làm Giám mục hiệu toà Samosate; tấn phong tại Sài Gòn ngày 25/07/1872',
    image: '/images/dgm_colombert.jpg',
    source: 'Hồ sơ lưu trữ IRFA 0830',
    shortDesc:
      'Vị Giám mục làm phép ngôi nhà thờ Mỹ Tho ngày 12/03/1876, trước sự hiện diện của đại tá Trève cùng toàn thể binh sĩ đồn trú, các Sư huynh Lasan và các Nữ tu Thánh Phaolô.',
    chronology: [
      { time: '1838 – 1863', title: 'Học vấn và ơn gọi', content: 'Sinh ngày 19/03/1838 tại Sainte-Marie-du-Bois (Mayenne). Học trường trung học Laval, tiểu chủng viện Précigné (1856 – 1858) và đại chủng viện Le Mans. Vào Chủng viện Thừa Sai ngày 04/10/1860, thụ phong linh mục ngày 30/05/1863 và lên đường sang Nam Kỳ ngày 16/07 cùng năm.' },
      { time: '1864 – 1872', title: 'Từ Cái Nhum tới Toà Giám mục', content: 'Học tiếng tại Mặc Bắc. Năm 1864 coi địa hạt Cái Nhum tỉnh Vĩnh Long, nơi ngài dựng một nhà nguyện và một nhà xứ. Năm 1866 làm thư ký riêng của Đức cha Miche tại Sài Gòn kiêm quản lý địa phận; tài quản trị của ngài bộc lộ rõ trong các chức vụ này, đến mức Đức cha Miche lúc cuối đời đã chọn ngài làm Giám mục phó.' },
      { time: '12/03/1876', title: 'Làm phép nhà thờ Mỹ Tho', content: 'Chủ sự nghi thức làm phép trọng thể ngôi nhà thờ Mỹ Tho do Cha Sorel dựng và Cha Moulins hoàn tất. Tường thuật năm 1877 ghi rõ có mặt đại tá hải quân lục chiến Trève, các quan cai trị hạt, sĩ quan và công chức, toàn thể binh sĩ đồn trú, các Sư huynh Lasan và các Nữ tu Thánh Phaolô cùng học sinh, và toàn thể giáo dân.' },
      { time: '1879 – 1894', title: 'Chăm lo mục vụ Mỹ Tho', content: 'Đặt các cha tuyên uý cho quân y viện Mỹ Tho — Cha Hirbec năm 1879, trước đó là Cha Faron và Cha Launay. Năm 1881 trao địa hạt Vĩnh Long cho Cha Lizé, vị thừa sai từng phục vụ Mỹ Tho mười lăm năm.' }
    ],
    milestones: [
      'Làm phép ngôi nhà thờ thứ hai của họ đạo Mỹ Tho ngày 12/03/1876.',
      'Đặt các cha tuyên uý cho quân y viện Mỹ Tho.',
      'Dưới thời ngài, các Sư huynh Lasan được mời vào thuộc địa và hệ thống chủng viện địa phận được kiện toàn.'
    ]
  },
  {
    id: 'dgm-depierre',
    name: 'Đức cha Jean-Marie Dépierre',
    saintName: 'Cố Đễ',
    role: 'Đại diện Tông toà Tây Đàng Trong (1895 – 1898)',
    period: '1895 – 1898',
    birth: '18/01/1855 tại Thoiry, Savoie, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 1442',
    priestOrdination: 'Thụ phong linh mục ngày 20/09/1879',
    bishopConsecration: 'Đắc cử Giám mục hiệu toà Benda ngày 12/04/1895; tấn phong tại Sài Gòn ngày 25/07/1895',
    image: '/images/dgm_depierre.jpg',
    source: 'Hồ sơ lưu trữ IRFA 1442',
    shortDesc:
      'Nhà thần học của địa phận: giáo sư chủng viện Sài Gòn, soạn và cho in một sách giáo khoa triết học cùng một sách thần học. Chính ngài giao cho Cha Quinton lập chủng viện tại An Đức gần Mỹ Tho năm 1896.',
    chronology: [
      { time: '1855 – 1879', title: 'Học vấn', content: 'Sinh ngày 18/01/1855 tại Thoiry (Savoie). Học tiểu chủng viện Saint-Pierre d’Albigny, vài tháng ở đại chủng viện Chambéry, vào Chủng viện Thừa Sai ngày 08/09/1876 với tư cách giáo dân. Thụ phong linh mục ngày 20/09/1879.' },
      { time: '1879 – 1895', title: 'Giáo sư và tác giả', content: 'Lên đường sang Nam Kỳ ngày 26/11/1879. Sau một thời gian ngắn ở Biên Hoà, ngài được đặt làm giáo sư Chủng viện Sài Gòn, lần lượt dạy tu từ học, triết học và thần học tín lý. Trong giai đoạn này ngài soạn và cho in một sách giáo khoa triết học và một sách thần học.' },
      { time: '1895 – 1898', title: 'Đại diện Tông toà', content: 'Đắc cử Giám mục hiệu toà Benda ngày 12/04/1895, tấn phong tại Sài Gòn ngày 25/07/1895. Ngài tách tiểu chủng viện khỏi đại chủng viện — việc phân chia này không kéo dài được lâu.' },
      { time: '1896', title: 'Chủng viện tại An Đức, gần Mỹ Tho', content: 'Khi tách tiểu chủng viện khỏi đại chủng viện, ngài giao cho Cha Victor Quinton lập một cơ sở mới tại An Đức thuộc vùng phụ cận Mỹ Tho. Vài năm sau, khí hậu không lành ở đó buộc phải chuyển các chủng sinh về Tân Định.' }
    ],
    milestones: [
      'Soạn và cho in một sách giáo khoa triết học và một sách thần học cho chủng viện.',
      'Tách tiểu chủng viện khỏi đại chủng viện và lập tiểu chủng viện tại An Đức, gần Mỹ Tho (1896).'
    ]
  },
  {
    id: 'dgm-mossard',
    name: 'Đức cha Lucien Mossard',
    saintName: 'Cố Mão',
    role: 'Đại diện Tông toà Tây Đàng Trong (1899 – 1920)',
    period: '1899 – 1920',
    birth: '24/10/1851 tại Dampierre-sur-le-Doubs, giáo phận Besançon, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 1299',
    priestOrdination: 'Thụ phong linh mục ngày 23/09/1876',
    image: '/images/dgm_mossard.jpg',
    source: 'Hồ sơ lưu trữ IRFA 1299',
    shortDesc:
      'Chính ngài cử Cha Renier về Mỹ Tho năm 1899 — vị sẽ xây ngôi thánh đường hiện nay. Trước khi sang Nam Kỳ, ngài được gửi sang Pondichéry học tiếng Tamil vì Sài Gòn khi ấy có đông người Ấn.',
    chronology: [
      { time: '1851 – 1876', title: 'Ơn gọi từ một giáo xứ nhỏ', content: 'Sinh ngày 24/10/1851 tại Dampierre-sur-le-Doubs trong một gia đình đạo đức sâu sắc. Cha sở giáo xứ là Cha Piquet gửi ngài vào tiểu chủng viện Marnay học trung học từ 1866 đến 1872, rồi một năm triết học tại Vesoul. Vào Chủng viện Thừa Sai ngày 23/09/1873, thụ phong linh mục ngày 23/09/1876 và hôm sau nhận bài sai đi Nam Kỳ.' },
      { time: '1876 – 1877', title: 'Một năm ở Ấn Độ học tiếng Tamil', content: 'Trước khi tới nhiệm sở, ngài được gửi sang Pondichéry học tiếng Tamil, vì nhiều người Ấn sinh sống tại Sài Gòn và vùng phụ cận. Ngài ở Ấn Độ khoảng một năm và tới Sài Gòn năm 1877.' },
      { time: '1899', title: 'Cử Cha Renier về Mỹ Tho', content: 'Ngài mời Cha Moulins — sau 27 năm ở Mỹ Tho — về nhận chức chánh sở Nhà thờ Chánh Tòa Sài Gòn, và cử Cha Renier từ Chợ Đũi về thay. Cha Renier chính là vị sẽ khởi công ngôi thánh đường hiện nay ngày 11/08/1906.' },
      { time: '1899 – 1920', title: 'Trường Lasan tại Mỹ Tho', content: 'Dưới thời ngài, các Sư huynh Lasan lập một trường tại Mỹ Tho và mở nội trú, số học sinh tăng nhanh. Trường Taberd tại Sài Gòn cũng tiếp tục phát triển.' }
    ],
    milestones: [
      'Cử Cha Renier về Mỹ Tho năm 1899 — vị xây ngôi Nhà thờ Chánh Tòa hiện nay.',
      'Dưới thời ngài, các Sư huynh Lasan lập trường và mở nội trú tại Mỹ Tho.'
    ]
  },
  {
    id: 'dgm-quinton',
    name: 'Đức cha Victor Quinton',
    saintName: 'Cố Tôn',
    role: 'Đại diện Tông toà Tây Đàng Trong (1920 – 1924)',
    period: '1920 – 1924',
    birth: '04/11/1866 tại xóm La Cointerie, giáo xứ Gorron, Mayenne, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 1880',
    image: '/images/dgm_quinton.jpg',
    source: 'Hồ sơ lưu trữ IRFA 1880',
    shortDesc:
      'Trước khi làm Giám mục, chính ngài được Đức cha Dépierre giao lập tiểu chủng viện tại An Đức gần Mỹ Tho năm 1896 — họ đạo do các nghĩa quân được Cha Marc xin ân xá lập nên.',
    chronology: [
      { time: '1866', title: 'Gia đình', content: 'Sinh ngày 04/11/1866 tại xóm La Cointerie thuộc giáo xứ Gorron (Mayenne), rửa tội ngay hôm sau. Ngài là con thứ tư của ông Joseph Quinton và bà Victoire Garnier; một người chị hơn ngài hai tuổi tên Léonie đi tu dòng Bác Ái Évron.' },
      { time: 'Trước 1896', title: 'Học tiếng Việt và dạy chủng viện', content: 'Sau một thời gian ở Bà Rịa học tiếng Việt dưới sự hướng dẫn của Cha Combalbert, ngài được đặt về Chủng viện Sài Gòn.' },
      { time: '1896', title: 'Lập tiểu chủng viện tại An Đức, gần Mỹ Tho', content: 'Đức cha Dépierre tách tiểu chủng viện khỏi đại chủng viện và giao cho ngài lập một cơ sở mới tại An Đức thuộc vùng phụ cận Mỹ Tho. Vài năm sau, khí hậu không lành ở đó buộc ngài phải chuyển các chủng sinh đi nơi khác. Về Tân Định, nơi ngài tự tay dựng một khuôn viên đẹp đẽ, ngài sống những năm hạnh phúc nhất, yêu mến học trò và được các chủng sinh cùng anh em linh mục quý mến.' },
      { time: '1920 – 1924', title: 'Đại diện Tông toà', content: 'Kế vị Đức cha Mossard, coi sóc địa phận Tây Đàng Trong trong đó có họ đạo Mỹ Tho, cho tới khi qua đời.' }
    ],
    milestones: [
      'Lập tiểu chủng viện của địa phận tại An Đức, vùng phụ cận Mỹ Tho, năm 1896.',
      'Gây dựng cơ sở chủng viện tại Tân Định sau khi rời An Đức.'
    ],
    works: [
      {
        time: '1896',
        name: 'Tiểu chủng viện tại An Đức',
        now: 'không còn ở An Đức — chủng sinh đã chuyển về Tân Định vì khí hậu không lành',
        detail:
          'Cơ sở đào tạo do Đức cha Dépierre giao cho ngài lập tại An Đức, họ đạo gần Mỹ Tho do các nghĩa quân được Cha Marc xin ân xá lập nên. Đây là lần đầu vùng Mỹ Tho có một chủng viện của địa phận.'
      }
    ]
  },
  {
    id: 'dgm-dumortier',
    name: 'Đức cha Isidore Dumortier',
    saintName: 'Cố Đượm',
    role: 'Đại diện Tông toà Tây Đàng Trong (1926 – 1941)',
    period: '1926 – 1941',
    birth: '06/04/1869 tại Halluin, Nord, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 2406',
    priestOrdination: 'Thụ phong linh mục ngày 27/05/1893',
    image: '/images/dgm_dumortier.jpg',
    source: 'Hồ sơ lưu trữ IRFA 2406. Chân dung do Giáo xứ Chánh Tòa Mỹ Tho cung cấp.',
    shortDesc:
      'Tiến sĩ triết học và thần học tại Đại học Grêgôriô ở Rôma. Ngài làm cha phó rồi kế nhiệm Cha Gernot tại Cái Mơn suốt 26 năm trước khi lên Giám mục.',
    chronology: [
      { time: '1869 – 1893', title: 'Học tại Rôma', content: 'Sinh ngày 06/04/1869 tại Halluin (Nord). Theo học Đại học Grêgôriô, đậu tiến sĩ triết học và tiến sĩ thần học trước khi thụ phong linh mục ngày 27/05/1893.' },
      { time: '1898 – 1924', title: 'Hai mươi sáu năm tại Cái Mơn', content: 'Vào Chủng viện Thừa Sai năm 1897, lên đường sang Nam Kỳ ngày 23/11/1898. Sau khi học tiếng Việt tại Sài Gòn, ngài được gửi tới Cái Mơn ở với Cha Gernot, làm cha phó rồi năm 1912 kế nhiệm. Ngài ở Cái Mơn 26 năm, đi khắp địa hạt thăm viếng giáo dân.' },
      { time: '1926 – 1941', title: 'Đại diện Tông toà', content: 'Sau khi Đức cha Quinton qua đời, ngài được đặt làm Giám mục hiệu toà Lipara và Đại diện Tông toà Tây Đàng Trong. Trong nhiệm kỳ, ngài lo nâng trình độ học vấn cho các nữ tu Mến Thánh Giá và vận động các Sư huynh Lasan lập Trường Taberd tại Sài Gòn.' },
      { time: '1929 – 1941', title: 'Với họ đạo Mỹ Tho', content: 'Là Đấng Bản Quyền suốt phần lớn nhiệm kỳ của Cha Bar tại Mỹ Tho: năm 1929 các Đệ tử Sư huynh Lasan về Mỹ Tho, đến 1930 trường Sư huynh có 400 học sinh và trường Nữ tu Thánh Phaolô 300 nữ sinh; năm 1933 địa hạt ghi nhận 642 người được rửa tội và ba họ đạo mới được lập.' }
    ],
    milestones: [
      'Tiến sĩ triết học và thần học tại Đại học Grêgôriô, Rôma.',
      'Nâng trình độ học vấn cho các nữ tu Mến Thánh Giá.',
      'Vận động các Sư huynh Lasan lập Trường Taberd Sài Gòn.'
    ]
  },
  {
    id: 'dgm-cassaigne',
    name: 'Đức cha Jean Cassaigne',
    saintName: 'Cố Sanh',
    role: 'Đại diện Tông toà Sài Gòn (1941 – 1955)',
    period: '1941 – 1955',
    birth: '30/01/1895 tại Grenade-sur-l’Adour, Landes, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 3300',
    priestOrdination: 'Thụ phong linh mục ngày 19/12/1925 do Đức cha de Guébriant',
    image: '/images/dgm_cassaigne.jpg',
    source: 'Hồ sơ lưu trữ IRFA 3300',
    shortDesc:
      'Vị tông đồ của người phong. Sau nhiệm kỳ Giám mục, ngài xin về sống giữa các bệnh nhân phong tại Di Linh và qua đời ở đó.',
    chronology: [
      { time: '1895 – 1920', title: 'Từ nghề buôn rượu vang tới ơn gọi', content: 'Sinh ngày 30/01/1895 tại Grenade-sur-l’Adour (Landes). Học với các Sư huynh Lasan tại Lez, Tây Ban Nha, rồi năm 1911 bắt đầu học nghề buôn rượu vang với thân phụ. Được nhận vào Hội Thừa Sai ngày 07/09/1920.' },
      { time: '1925 – 1926', title: 'Thụ phong và lên đường', content: 'Thụ phong linh mục ngày 19/12/1925 do Đức cha de Guébriant, khi ấy là Bề trên Tổng quyền. Ngày 10/02/1926 nhận bài sai đi địa phận Sài Gòn và lên đường ngày 06/04 cùng năm.' },
      { time: '1941 – 1955', title: 'Đại diện Tông toà Sài Gòn', content: 'Coi sóc địa phận qua thời kỳ Nhật chiếm đóng và những năm biến động sau đó. Chính ngài phân bổ các thừa sai về Mỹ Tho trong giai đoạn này — hồ sơ Cha René Detry ghi ngài từng cho vị này chọn giữa Đà Lạt và Mỹ Tho.' },
      { time: 'Sau 1955', title: 'Trở về với người phong Di Linh', content: 'Sau khi từ nhiệm, ngài xin về sống giữa các bệnh nhân phong tại Di Linh — công cuộc ngài đã khởi sự từ khi còn là linh mục — và qua đời ở đó.' }
    ],
    milestones: [
      'Vị tông đồ của người phong tại Di Linh.',
      'Đấng Bản Quyền của họ đạo Mỹ Tho qua thời kỳ Nhật chiếm đóng và những năm cuối đời Cha Bar.'
    ]
  },
  {
    id: 'dgm-nguyen-van-hien',
    name: 'Đức cha Simon Hòa Nguyễn Văn Hiền',
    saintName: 'Thánh Simon',
    role: 'Đại diện Tông toà Sài Gòn (1955 – 1960) — vị người Việt đầu tiên',
    period: '1955 – 1960',
    origin: 'Việt Nam',
    image: '/images/dgm_nguyen_van_hien.jpg',
    source: 'Chân dung do Giáo xứ Chánh Tòa Mỹ Tho cung cấp.',
    shortDesc:
      'Vị Đại diện Tông toà người Việt Nam đầu tiên của địa phận Sài Gòn, và là Đấng Bản Quyền cuối cùng của họ đạo Mỹ Tho trước khi Giáo phận Mỹ Tho được khai sinh.',
    chronology: [
      { time: '1955 – 1960', title: 'Đại diện Tông toà người Việt đầu tiên', content: 'Ngài là người Việt Nam đầu tiên coi sóc địa phận Sài Gòn, kế nhiệm Đức cha Cassaigne. Suốt nhiệm kỳ này, họ đạo Mỹ Tho vẫn thuộc quyền ngài.' },
      { time: '24/11/1960', title: 'Bước ngoặt', content: 'Tông hiến Venerabilium Nostrorum thiết lập Hàng Giáo Phẩm Việt Nam: Sài Gòn được nâng lên Tổng Giáo phận, bốn tỉnh Định Tường, Long An, Kiến Tường và Kiến Phong tách ra lập Giáo phận Mỹ Tho. Từ đây họ đạo Mỹ Tho có Đấng Bản Quyền riêng là Đức cha Giuse Trần Văn Thiện.' },
      { time: '1960', title: 'Giám mục tiên khởi Đà Lạt', content: 'Cùng năm ấy, ngài được đặt làm Giám mục Chính tòa tiên khởi Giáo phận Đà Lạt.' }
    ],
    milestones: [
      'Vị Đại diện Tông toà người Việt Nam đầu tiên của địa phận Sài Gòn.',
      'Đấng Bản Quyền cuối cùng của họ đạo Mỹ Tho trước ngày lập Giáo phận Mỹ Tho.',
      'Giám mục Chính tòa tiên khởi Giáo phận Đà Lạt (1960).'
    ]
  }
];

export const PRIESTS_SERVED: { name: string; note: string; ma: string }[] = [
  { name: 'Cha Phanxicô Isiđôrê Gagelin', note: 'quản các địa hạt Mỹ Tho, Vĩnh Long và Châu Đốc từ năm 1828; sau là vị tử đạo được tôn phong hiển thánh', ma: 'IRFA 0342' },
  { name: 'Cha Charles Gernot', note: 'về Mỹ Tho năm 1862, khi ấy là lỵ sở một địa hạt 2.300 giáo dân; bản tường trình ngài gửi Đức cha Lefebvre năm 1863 đưa tới việc các Nữ tu Thánh Phaolô thành Chartres đến Mỹ Tho', ma: 'IRFA 0794' },
  { name: 'Cha Jean-Joseph Barou', note: 'coi họ đạo Thủ Ngữ gần Mỹ Tho trong cơn loạn tháng 12/1862', ma: 'IRFA 0738' },
  { name: 'Cha Théodule Hamon', note: 'học tiếng Việt tại Mỹ Tho rồi quyền coi họ đạo; sang Ba Giồng tháng 02/1870. Chính ngài viết bài tường thuật cuộc bách hại Ba Giồng đăng năm 1882', ma: 'IRFA 1002' },
  { name: 'Cha Jean Piault', note: 'khởi đầu sứ vụ tại Mỹ Tho tháng 6/1871 trước khi làm giáo sư Chủng viện Sài Gòn', ma: 'IRFA 1078' },
  { name: 'Cha Jules Leprince', note: 'lần lượt coi sóc các họ đạo Mỹ Tho, Thủ Dầu Một và Giồng Rùm', ma: 'IRFA 1009' },
  { name: 'Cha Émile Moreau', note: 'coi hai họ đạo Thủ Ngữ và Tân Xuân ngay ngoài Mỹ Tho, xây nhà thờ mới cho họ đạo', ma: 'IRFA 1012' },
  { name: 'Cha Eugène Faron', note: 'khởi đầu tại Mỹ Tho làm tuyên uý quân y viện; trở lại Mỹ Tho năm 1882 và tiếp tục coi sóc quân y viện', ma: 'IRFA 1189' },
  { name: 'Cha Adrien Launay', note: 'cha phó kiêm tuyên uý quân y viện Mỹ Tho hai năm 1878 – 1879; về sau là sử gia của Hội Thừa Sai Paris', ma: 'IRFA 1325' },
  { name: 'Cha Jacques Hirbec', note: 'Đức cha Colombert đặt làm tuyên uý quân y viện Mỹ Tho năm 1879; sau một thời gian dưỡng bệnh lại trở về chính nhiệm sở này', ma: 'IRFA 1061' },
  { name: 'Cha Alphonse Thévenin', note: 'trông coi một công trình xây dựng lớn tại Mỹ Tho', ma: 'IRFA 1761' },
  { name: 'Cha Joseph Guillot', note: 'lâm bệnh nặng trên đường về Sài Gòn và qua đời tại Mỹ Tho ngày 27/6/1894', ma: 'IRFA 1686' },
  { name: 'Cha Victor Quinton', note: 'được chỉ định lập cơ sở mới tại An Đức, vùng phụ cận Mỹ Tho', ma: 'IRFA 1880' },
  { name: 'Cha Ernest Hay', note: 'coi sóc An Đức cùng bốn họ đạo tách từ địa hạt Mỹ Tho, làm nguồn nuôi Trường Giáo Lý Viên', ma: 'IRFA 1987' },
  { name: 'Cha Henri Hay', note: 'phụ tá rồi kế nhiệm anh mình tại Trường Giáo Lý Viên An Đức', ma: 'IRFA 2126' },
  { name: 'Cha Jean Benoit', note: 'được đặt tại Tân An, một họ đạo thuộc địa hạt Mỹ Tho', ma: 'IRFA 1844' },
  { name: 'Cha Joseph Villeneuve', note: 'năm 1910 chứng kiến phong trào trở lại đạo tại địa hạt Mỹ Tho, sáu bảy họ đạo mới hình thành dọc sông Tiền', ma: 'IRFA 2520' },
  { name: 'Cha Marcel Piquet', note: 'học tiếng Việt tại Mỹ Tho và ở tại một họ nhánh của Mỹ Tho; về sau là Giám mục Nha Trang', ma: 'IRFA 3141' },
  { name: 'Cha René Detry', note: 'được Đức cha Cassaigne cho chọn giữa Đà Lạt và Mỹ Tho; ngài chọn Mỹ Tho và làm cha sở tại đây', ma: 'IRFA 3246' },
  { name: 'Cha Robert Seminel', note: 'cuối năm 1943 làm cha sở họ đạo cổ Thủ Ngữ, cách Mỹ Tho tám cây số; trải qua thời kỳ quân đội Nhật chiếm đóng Mỹ Tho', ma: 'IRFA 3365' }
];

/** Các Đức Giám mục có dấu ấn trực tiếp trên họ đạo Mỹ Tho. */
export const BISHOPS_LINKED: { name: string; note: string; ma: string }[] = [
  { name: 'Đức cha Dominique Lefebvre', note: 'Đại diện Tông tòa Tây Đàng Trong, nhận bản tường trình năm 1863 của Cha Gernot về nhu cầu của họ đạo Mỹ Tho', ma: '' },
  { name: 'Đức cha Jean-Claude Miche', note: 'đặt viên đá đầu tiên ngôi nhà thờ thứ hai năm 1866', ma: 'IRFA 0423' },
  { name: 'Đức cha Isidore Colombert', note: 'làm phép ngôi nhà thờ thứ hai ngày 12/03/1876; đặt các cha tuyên uý quân y viện Mỹ Tho', ma: 'IRFA 0830' },
  { name: 'Đức cha Lucien Mossard', note: 'điều Cha Moulins về Sài Gòn và cử Cha Renier về Mỹ Tho năm 1899; dưới thời ngài các Sư huynh Lasan lập trường và nội trú tại Mỹ Tho', ma: 'IRFA 1299' }
];

export const TNTT_CHAPLAINS = CHAPLAINS_EXTENDED_DATA.map((c) => ({ period: c.period, bio: c }));
