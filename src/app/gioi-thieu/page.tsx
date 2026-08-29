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
  FileText
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import PopesContinuousMarquee from '@/components/PopesContinuousMarquee';

export interface DetailedBioRecord {
  id: string;
  name: string;
  saintName: string;
  role: string;
  period: string;
  birth: string;
  death?: string;
  origin: string;
  motto: string;
  mottoLatin?: string;
  priestOrdination: string;
  bishopConsecration: string;
  consecrator?: string;
  image: string;
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
    birth: '01/10/1908 tại Cái Nhum, Chợ Lách, Vĩnh Long',
    death: '24/02/1989 tại Tòa Giám Mục Mỹ Tho (Hưởng thọ 81 tuổi)',
    origin: 'Cái Nhum, Vĩnh Long',
    motto: '“Phần rỗi linh hồn là luật tối thượng”',
    mottoLatin: 'Salus Animarum Suprema Lex',
    priestOrdination: '21/09/1928 tại Nhà thờ Đức Bà Sài Gòn',
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
    birth: '24/02/1922 tại Thới Lai, Cần Thơ',
    death: '16/03/2006 tại Tòa Giám Mục Mỹ Tho (Hưởng thọ 84 tuổi)',
    origin: 'Thới Lai, Cần Thơ',
    motto: '“Vui mừng trong Thánh Giá Chúa Kitô”',
    mottoLatin: 'Crux Spes Unica',
    priestOrdination: '29/03/1953 tại Sài Gòn',
    bishopConsecration: '26/10/1975 tại Nhà thờ Chính Tòa Mỹ Tho',
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
    bishopConsecration: '02/06/1999 tại Nhà thờ Chính Tòa Đà Lạt',
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
              display: 'inline-block',
              minWidth: '300px',
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
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '14px',
                margin: '18px 0'
              }}
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
              style={{
                float: 'right',
                width: '270px',
                margin: '8px 0 16px 20px',
                padding: '8px',
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
              className="wiki-thumb"
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
              style={{
                float: 'right',
                width: '290px',
                margin: '8px 0 16px 20px',
                padding: '8px',
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
              className="wiki-thumb"
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

            <h3 id="lich-su-chinh-toa" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
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
                backgroundColor: 'rgba(153, 27, 27, 0.04)',
                borderLeft: '3.5px solid var(--color-red)',
                padding: '14px 18px',
                borderRadius: '0 10px 10px 0',
                margin: '18px 0',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                color: 'var(--color-dark)'
              }}
            >
              <Quote size={16} color="var(--color-red)" style={{ verticalAlign: '-3px', marginRight: '6px' }} />
              &ldquo;Nguyện xin Thiên Chúa làm cho Giáo phận Mỹ Tho trở nên muối men của tình yêu thương và ánh sáng Phúc Âm
              giữa lòng đồng bằng sông Cửu Long trù phú.&rdquo;
              <div style={{ textAlign: 'right', fontSize: '0.78rem', fontStyle: 'normal', color: 'var(--color-subtle)', marginTop: '4px', fontWeight: 700 }}>
                — Trích Sắc chỉ Tông hiến Venerabilium Nostrorum (24/11/1960)
              </div>
            </div>

            <h3 id="lich-su-cung-hien" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
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
              3.1. Mặt tiền Phục Hưng và Tháp chuông 24 mét
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Nhà thờ mang phong cách kiến trúc Phục Hưng (Renaissance) uy nghiêm với chiều dài 53 mét, chiều rộng 17 mét và
              chiều cao nóc giáo đường đạt 16 mét. Mặt tiền nhà thờ được chia thành 3 nhịp cân xứng với các cột thức Corinthian
              được đắp nổi hoa văn tinh tế. Tháp chuông kiên cố cao 24 mét được đặt tách biệt bên hông thánh đường, lưu giữ
              bộ chuông đồng đúc cổ truyền mang âm sắc trầm hùng ngân vang khắp trung tâm thành phố Mỹ Tho mỗi dịp lễ trọng.
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
                onClick={() => setLightboxImage({ src: '/images/thanh_le_dong_te_my_tho.jpg', caption: 'Thánh lễ đồng tế đại triều tại Cung thánh Nhà thờ Chính Tòa Mỹ Tho.' })}
              >
                <div style={{ position: 'relative', width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden', marginBottom: '6px' }}>
                  <Image src="/images/thanh_le_dong_te_my_tho.jpg" alt="Thánh Lễ Đồng Tế" fill sizes="240px" style={{ objectFit: 'cover' }} />
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
                  {/* Khung ảnh chân dung dọc (Aspect Ratio 3:4) - Luôn hiển thị trọn vẹn đầu & khuôn mặt */}
                  <div
                    style={{
                      width: '85px',
                      height: '110px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      flexShrink: 0,
                      border: '1.5px solid #B45309',
                      backgroundColor: 'var(--color-input-bg)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Image
                      src={b.image}
                      alt={b.name}
                      fill
                      sizes="85px"
                      style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: '220px' }}>
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
                        width: '16px',
                        height: '16px',
                        borderRadius: '4px',
                        backgroundColor: r.mainColor,
                        border: `2px solid ${r.borderColor}`
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-dark)' }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
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
            width: '330px',
            flexShrink: 0,
            backgroundColor: 'var(--color-card-bg)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            fontSize: '0.84rem'
          }}
          className="wiki-infobox"
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
                <div
                  style={{
                    width: '110px',
                    height: '150px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                    border: '1.5px solid #B45309',
                    backgroundColor: 'var(--color-input-bg)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <Image
                    src={selectedBio.image}
                    alt={selectedBio.name}
                    fill
                    sizes="110px"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: '240px' }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                    {selectedBio.name}
                  </h3>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-red)', marginBottom: '4px' }}>
                    {selectedBio.role}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginBottom: '8px' }}>
                    Tên Thánh: <strong>{selectedBio.saintName}</strong> • {selectedBio.period}
                  </div>

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
                <div>
                  <strong>Sinh ngày / Nơi sinh:</strong> {selectedBio.birth}
                </div>
                {selectedBio.death && (
                  <div>
                    <strong>Qua đời:</strong> {selectedBio.death}
                  </div>
                )}
                <div>
                  <strong>Thụ phong Linh mục:</strong> {selectedBio.priestOrdination}
                </div>
                <div>
                  <strong>Tấn phong Giám mục:</strong> {selectedBio.bishopConsecration}
                </div>
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

        .bishop-card-hover:hover {
          border-color: #B45309 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.06) !important;
        }
      `}</style>
    </div>
  );
}
