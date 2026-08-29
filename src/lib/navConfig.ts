import {
  Home,
  BookOpen,
  Church,
  Clock,
  Heart,
  HelpCircle,
  FilePlus,
  MessageSquare,
  Star,
  LucideIcon
} from 'lucide-react';

export interface NavItemConfig {
  id: string;
  href: string;
  labelKey: string;
  defaultLabel: string;
  icon: LucideIcon;
}

export interface BentoItemConfig {
  id: string;
  href?: string;
  actionId?: 'open-submission' | 'open-feedback' | 'open-ratings';
  titleKey?: string;
  defaultTitle: string;
  descKey?: string;
  defaultDesc: string;
  icon: LucideIcon;
  color: string;
  bgLight: string;
  isFullWidth?: boolean;
}

/** 4 Tính năng chính hiển thị trên thanh Bottom Navigation Bar Mobile */
export const MOBILE_PRIMARY_NAV: NavItemConfig[] = [
  { id: 'home', href: '/', labelKey: 'navHome', defaultLabel: 'Trang Chủ', icon: Home },
  { id: 'mass-times', href: '/gio-le', labelKey: 'navMassTimes', defaultLabel: 'Giờ Lễ', icon: Clock },
  { id: 'bible', href: '/kinh-thanh', labelKey: 'navBible', defaultLabel: 'Kinh Thánh', icon: BookOpen },
  { id: 'prayers', href: '/kinh-nguyen', labelKey: 'navPrayers', defaultLabel: 'Kinh Nguyện', icon: Heart }
];

/** Danh sách các tiện ích mở rộng trong Bento Grid Modal */
export const BENTO_EXTENDED_ITEMS: BentoItemConfig[] = [
  {
    id: 'intro',
    href: '/gioi-thieu',
    defaultTitle: 'Giới Thiệu Xứ Đoàn',
    defaultDesc: 'Lịch sử Chánh Tòa, Cha Linh hướng & Ban Trị sự',
    icon: Church,
    color: '#B71C1C',
    bgLight: 'rgba(183, 28, 28, 0.08)',
    isFullWidth: true
  },
  {
    id: 'faq',
    href: '/van-dap',
    defaultTitle: 'Vấn Đáp Mục Vụ',
    defaultDesc: 'Hỏi đáp đức tin & giáo lý',
    icon: HelpCircle,
    color: '#2563EB',
    bgLight: 'rgba(37, 99, 235, 0.12)'
  },
  {
    id: 'submission',
    actionId: 'open-submission',
    defaultTitle: 'Đóng Góp Bài Viết',
    defaultDesc: 'Gửi tin ảnh & sinh hoạt',
    icon: FilePlus,
    color: '#059669',
    bgLight: 'rgba(16, 185, 129, 0.12)'
  },
  {
    id: 'feedback',
    actionId: 'open-feedback',
    defaultTitle: 'Góp Ý & Phản Hồi',
    defaultDesc: 'Xây dựng website xứ đoàn',
    icon: MessageSquare,
    color: '#D97706',
    bgLight: 'rgba(217, 119, 6, 0.12)'
  },
  {
    id: 'ratings',
    actionId: 'open-ratings',
    defaultTitle: 'Đánh Giá & Lượt Xem',
    defaultDesc: 'Thống kê & cảm nhận cộng đoàn',
    icon: Star,
    color: '#DB2777',
    bgLight: 'rgba(236, 72, 153, 0.12)'
  }
];
