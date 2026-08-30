'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  BookOpen,
  HelpCircle,
  Clock,
  Landmark,
  FileText,
  Link as LinkIcon,
  Sparkles,
  ArrowRight,
  CornerDownLeft,
  History,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { PRAYERS } from '@/lib/prayersData';
import { FAITH_FAQS } from '@/lib/faithFAQs';
import { ECCLESIASTICAL_PROVINCES, ALL_DIOCESES } from '@/lib/dioceses';
import { removeAccents } from '@/lib/textUtils';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { BIBLE_BOOKS } from '@/lib/bible';

export type SearchCategory = 'all' | 'library' | 'prayers' | 'faq' | 'mass' | 'intro' | 'articles' | 'links';

export interface SearchResultItem {
  id: string;
  category: SearchCategory;
  categoryLabel: string;
  categoryIcon: React.ReactNode;
  badgeColor: { bg: string; text: string; border: string };
  title: string;
  subtitle?: string;
  snippet?: string;
  url: string;
  isExternal?: boolean;
  keywords: string[];
}

// Danh mục tài liệu giới thiệu & lịch sử cố định
const INTRO_STATIC_ITEMS: SearchResultItem[] = [
  {
    id: 'intro-vatican-pope',
    category: 'intro',
    categoryLabel: 'Tòa Thánh & Giáo Hoàng',
    categoryIcon: <Landmark size={15} />,
    badgeColor: { bg: 'rgba(217, 119, 6, 0.12)', text: '#D97706', border: 'rgba(217, 119, 6, 0.3)' },
    title: 'Đức Giáo Hoàng Lêô XIV (Leo XIV) & Tòa Thánh Vatican',
    subtitle: 'Vị Giáo Hoàng thứ 267 của Giáo Hội Công Giáo Rôma (Dòng Augustinô OSA)',
    snippet: 'Đức Thánh Cha Lêô XIV (Robert Francis Prevost OSA) tựu nhiệm ngày 08/05/2025. Khẩu hiệu "In illo uno unum". Vương Cung Thánh Đường Thánh Phêrô Vatican.',
    url: '/gioi-thieu#vatican',
    keywords: ['giao hoang leo xiv', 'duc thanh cha', 'leo 14', 'vatican', 'robert francis prevost', 'toa thanh', 'thanh phero', 'giao hoi toan cau', 'hoan vu']
  },
  {
    id: 'intro-hdgmvn',
    category: 'intro',
    categoryLabel: 'Giáo Hội Việt Nam',
    categoryIcon: <Landmark size={15} />,
    badgeColor: { bg: 'rgba(220, 38, 38, 0.12)', text: '#DC2626', border: 'rgba(220, 38, 38, 0.3)' },
    title: 'Giáo Hội Công Giáo Việt Nam & Hội Đồng Giám Mục (HĐGMVN)',
    subtitle: 'Lịch sử 400 năm Tin Mừng, 3 Giáo tỉnh (Hà Nội, Huế, Sài Gòn), 27 Giáo phận',
    snippet: 'Cơ quan lãnh đạo mục vụ của Giáo Hội Việt Nam, 117 Thánh Tử Đạo, Đức Mẹ La Vang, các giáo phận toàn quốc.',
    url: '/gioi-thieu#hdgmvn',
    keywords: ['hdgmvn', 'hoi dong giam muc viet nam', 'giao hoi viet nam', '3 giao tinh', '27 giao phan', 'la vang', 'tu dao']
  },
  {
    id: 'intro-mytho-history',
    category: 'intro',
    categoryLabel: 'Giáo Phận Mỹ Tho',
    categoryIcon: <Landmark size={15} />,
    badgeColor: { bg: 'rgba(37, 99, 235, 0.12)', text: '#2563EB', border: 'rgba(37, 99, 235, 0.3)' },
    title: 'Lịch Sử Giáo Phận Mỹ Tho & Giáo Xứ Chánh Tòa',
    subtitle: 'Thành lập ngày 24/11/1960 bởi Thánh Giáo hoàng Gioan XXIII',
    snippet: 'Địa bàn gồm 3 tỉnh Tiền Giang, Long An, Đồng Tháp. Nhà thờ Chánh Tòa Mỹ Tho tọa lạc tại 32 Hùng Vương, Phường 7, TP. Mỹ Tho.',
    url: '/gioi-thieu#history',
    keywords: ['giao phan my tho', 'chanh toa my tho', 'lich su', 'gioan xxiii', 'hung vuong', 'tien giang', 'long an', 'dong thap']
  },
  {
    id: 'intro-bishops',
    category: 'intro',
    categoryLabel: 'Các Đời Giám Mục',
    categoryIcon: <Landmark size={15} />,
    badgeColor: { bg: 'rgba(147, 51, 234, 0.12)', text: '#9333EA', border: 'rgba(147, 51, 234, 0.3)' },
    title: '5 Vị Giám Mục Giáo Phận Mỹ Tho (1960 — Hiện Tại)',
    subtitle: 'Đức Cha Thiện, Đức Cha Nam, ĐHY Mẫn, Đức Tổng Đọc, Đức Cha Khảm',
    snippet: 'Đức Cha Giuse Trần Văn Thiện (1960-1989), Đức Cha André Nguyễn Văn Nam (1989-1999), ĐHY Gioan Baotixita Phạm Minh Mẫn (1993-1998), Đức Tổng Phaolô Bùi Văn Đọc (1999-2014), Đức Cha Phêrô Nguyễn Văn Khảm (2014-nay).',
    url: '/gioi-thieu#bishops',
    keywords: ['giam muc my tho', 'duc cha kham', 'nguyen van kham', 'tran van thien', 'nguyen van nam', 'pham minh man', 'bui van doc']
  },
  {
    id: 'intro-architecture',
    category: 'intro',
    categoryLabel: 'Kiến Trúc Chánh Tòa',
    categoryIcon: <Landmark size={15} />,
    badgeColor: { bg: 'rgba(5, 150, 105, 0.12)', text: '#059669', border: 'rgba(5, 150, 105, 0.3)' },
    title: 'Kiến Trúc & Không Gian Nhà Thờ Chánh Tòa Mỹ Tho',
    subtitle: 'Chiều dài 53m, rộng 17m, cao 24m, tháp chuông 32m phong cách Gothic Phục Hưng',
    snippet: 'Nhà thờ thứ ba của họ đạo Mỹ Tho xây dựng từ năm 1906 bởi Cha G. Thiriet. Tháp chuông uy nghiêm và cung thánh trang trọng.',
    url: '/gioi-thieu#architecture',
    keywords: ['kien truc', 'nha tho chanh toa', 'thap chuong', 'gothic', 'thiriet', '53m', 'kich thuoc']
  },
  {
    id: 'intro-gallery',
    category: 'intro',
    categoryLabel: 'Hình Ảnh & Thư Viện',
    categoryIcon: <Landmark size={15} />,
    badgeColor: { bg: 'rgba(234, 88, 12, 0.12)', text: '#EA580C', border: 'rgba(234, 88, 12, 0.3)' },
    title: 'Thư Viện Hình Ảnh Giáo Xứ & Xứ Đoàn',
    subtitle: 'Bộ sưu tập ảnh kiến trúc, phụng vụ, sinh hoạt Huynh trưởng & Thiếu nhi Thánh Thể',
    snippet: 'Hình ảnh Chánh Tòa ban đêm, Lễ Giáng Sinh, Tuần Thánh, Đại hội TNTT, Giờ chầu Thánh Thể.',
    url: '/gioi-thieu#gallery',
    keywords: ['hinh anh', 'thu vien anh', 'gallery', 'anh nha tho', 'anh xu doan', 'tntt']
  }
];

// Danh mục tiện ích & liên kết nhanh
const QUICK_LINK_ITEMS: SearchResultItem[] = [
  {
    id: 'link-tntt-mytho',
    category: 'links',
    categoryLabel: 'Thiếu Nhi Thánh Thể',
    categoryIcon: <LinkIcon size={15} />,
    badgeColor: { bg: 'rgba(220, 38, 38, 0.12)', text: '#DC2626', border: 'rgba(220, 38, 38, 0.3)' },
    title: 'TNTT Giáo Phận Mỹ Tho (tnttgioitremytho.com)',
    subtitle: 'Trang thông tin & sinh hoạt Thiếu Nhi Thánh Thể và Giới Trẻ Giáo Phận Mỹ Tho',
    snippet: 'Tài liệu sinh hoạt, khóa huấn luyện Huynh Trưởng, phong trào TNTT Giáo phận.',
    url: 'https://tnttgioitremytho.com/',
    isExternal: true,
    keywords: ['tntt my tho', 'tnttgioitremytho', 'thieu nhi thanh the my tho', 'gioi tre my tho', 'huynh truong']
  },
  {
    id: 'link-tntt-vn',
    category: 'links',
    categoryLabel: 'Tổng Liên Đoàn TNTT',
    categoryIcon: <LinkIcon size={15} />,
    badgeColor: { bg: 'rgba(217, 119, 6, 0.12)', text: '#D97706', border: 'rgba(217, 119, 6, 0.3)' },
    title: 'Tổng Liên Đoàn TNTT VN — Anrê Phú Yên (tntt.vn)',
    subtitle: 'Website chính thức của Phong trào Thiếu Nhi Thánh Thể Việt Nam',
    snippet: 'Nội quy, thủ bản, tài liệu huấn luyện Đoàn sinh, Huynh trưởng, Trợ tá cấp Tổng Liên Đoàn.',
    url: 'https://tntt.vn/',
    isExternal: true,
    keywords: ['tntt vn', 'tong lien doan tntt', 'anre phu yen', 'tntt.vn', 'thu ban', 'noi quy']
  },
  {
    id: 'link-hdgmvn-web',
    category: 'links',
    categoryLabel: 'Hội Đồng Giám Mục',
    categoryIcon: <LinkIcon size={15} />,
    badgeColor: { bg: 'rgba(37, 99, 235, 0.12)', text: '#2563EB', border: 'rgba(37, 99, 235, 0.3)' },
    title: 'Hội Đồng Giám Mục Việt Nam (hdgmvietnam.com)',
    subtitle: 'Tiếng nói chính thức của Giáo Hội Công Giáo tại Việt Nam',
    snippet: 'Thư mục vụ, văn kiện Tòa Thánh, thông cáo phụng vụ, tin tức Công giáo toàn quốc.',
    url: 'https://hdgmvietnam.com',
    isExternal: true,
    keywords: ['hdgmvietnam.com', 'hoi dong giam muc', 'thu muc vu', 'van kien']
  },
  {
    id: 'link-vatican-news',
    category: 'links',
    categoryLabel: 'Vatican News',
    categoryIcon: <LinkIcon size={15} />,
    badgeColor: { bg: 'rgba(217, 119, 6, 0.12)', text: '#D97706', border: 'rgba(217, 119, 6, 0.3)' },
    title: 'Vatican News Tiếng Việt',
    subtitle: 'Cổng thông tin chính thức của Tòa Thánh Vatican dành cho người Việt',
    snippet: 'Lời nhắn nhủ của Đức Giáo Hoàng Lêô XIV, sứ điệp Angelus, tin tức Giáo hội năm châu.',
    url: 'https://www.vaticannews.va/vi.html',
    isExternal: true,
    keywords: ['vatican news', 'tieng viet', 'duc giao hoang', 'toa thanh', 'angelus']
  },
  {
    id: 'page-home',
    category: 'links',
    categoryLabel: 'Trang Chủ',
    categoryIcon: <Sparkles size={15} />,
    badgeColor: { bg: 'rgba(16, 185, 129, 0.12)', text: '#10B981', border: 'rgba(16, 185, 129, 0.3)' },
    title: 'Trang Chủ Xứ Đoàn Các Thánh Tử Đạo Việt Nam',
    subtitle: 'Bảng tin Facebook, Lịch Phụng Vụ hằng ngày, Giờ Lễ Chánh Tòa, Liên kết',
    snippet: 'Cập nhật tin tức sinh hoạt mới nhất, Lời Chúa hôm nay, gửi câu hỏi FAQ và ý kiến phản hồi.',
    url: '/',
    keywords: ['trang chu', 'home', 'bang tin', 'lich phung vu', 'loi chua']
  },
  {
    id: 'page-mass-times',
    category: 'links',
    categoryLabel: 'Tra Cứu Giờ Lễ',
    categoryIcon: <Clock size={15} />,
    badgeColor: { bg: 'rgba(217, 119, 6, 0.12)', text: '#D97706', border: 'rgba(217, 119, 6, 0.3)' },
    title: 'Tra Cứu Giờ Lễ 27 Giáo Phận Toàn Quốc',
    subtitle: 'Hệ thống tra cứu thông minh giờ lễ Chúa Nhật, ngày thường, giải tội toàn quốc',
    snippet: 'Tìm kiếm nhà thờ theo tỉnh thành, giáo phận, định vị GPS gần bạn, gửi đóng góp giờ lễ mới.',
    url: '/gio-le',
    keywords: ['gio le', 'tra cuu gio le', '27 giao phan', 'gio le toan quoc', 'nha tho', 'gps']
  },
  {
    id: 'page-prayers',
    category: 'links',
    categoryLabel: 'Kinh Nguyện',
    categoryIcon: <BookOpen size={15} />,
    badgeColor: { bg: 'rgba(37, 99, 235, 0.12)', text: '#2563EB', border: 'rgba(37, 99, 235, 0.3)' },
    title: 'Kho Tàng 39 Bản Kinh Công Giáo & Mân Côi',
    subtitle: 'Kinh Hằng Ngày, Đức Mẹ, Thánh Giuse, Thánh Thể, Lòng Thương Xót, 14 Đàng Thánh Giá',
    snippet: 'Đầy đủ chữ to, chế độ đọc kinh, chia sẻ, lưu kinh yêu thích, tra cứu theo danh mục.',
    url: '/kinh-nguyen',
    keywords: ['kinh nguyen', 'kinh cong giao', 'man coi', 'chuoi long thuong xot', '14 dang thanh gia']
  },
  {
    id: 'page-faq-faith',
    category: 'links',
    categoryLabel: 'Vấn Đáp Giáo Lý',
    categoryIcon: <HelpCircle size={15} />,
    badgeColor: { bg: 'rgba(147, 51, 234, 0.12)', text: '#9333EA', border: 'rgba(147, 51, 234, 0.3)' },
    title: 'Vấn Đáp Giáo Lý & Đức Tin Công Giáo',
    subtitle: 'Giải đáp thắc mắc Giáo Lý Hội Thánh Công Giáo, Phụng Vụ, 7 Bí Tích, Luân Lý',
    snippet: 'Tra cứu câu hỏi đức tin, Youcat, GLHTCG, mục vụ hôn nhân gia đình và giới trẻ.',
    url: '/van-dap',
    keywords: ['van dap', 'giao ly', 'hoi dap', 'duc tin', 'youcat', 'glhtcg', 'bi tich']
  }
];

const POPULAR_SEARCH_KEYWORDS = [
  'Kinh Lạy Cha',
  'Lòng Thương Xót',
  'Kinh Mân Côi',
  'Giờ Lễ Chánh Tòa',
  'Bí Tích Giải Tội',
  'ĐGH Lêô XIV',
  'TNTT Mỹ Tho',
  'HĐGMVN',
  '14 Đàng Thánh Giá',
  'Đức Cha Khảm'
];

export default function OmniSearch() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [articles, setArticles] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('omni_recent_searches');
      if (stored) {
        setRecentSearches(JSON.parse(stored).slice(0, 5));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Fetch cached Facebook articles for searching
  useEffect(() => {
    let isCancelled = false;
    async function loadArticles() {
      try {
        const cached = localStorage.getItem('fb_feed_cache');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed.posts) && !isCancelled) {
            const mapped: SearchResultItem[] = parsed.posts.slice(0, 30).map((p: any) => ({
              id: `art-${p.id}`,
              category: 'articles',
              categoryLabel: 'Bảng Tin Xứ Đoàn',
              categoryIcon: <FileText size={15} />,
              badgeColor: { bg: 'rgba(37, 99, 235, 0.12)', text: '#2563EB', border: 'rgba(37, 99, 235, 0.3)' },
              title: p.message ? (p.message.length > 80 ? p.message.slice(0, 80) + '...' : p.message) : 'Bài viết thông báo Xứ Đoàn',
              subtitle: p.created_time ? new Date(p.created_time).toLocaleDateString('vi-VN') : 'Bài viết mới',
              snippet: p.message || '',
              url: `/bai-viet/${p.id}`,
              keywords: [removeAccents(p.message || '')]
            }));
            setArticles(mapped);
          }
        }
      } catch {
        // Ignore
      }
    }
    loadArticles();
    return () => { isCancelled = true; };
  }, []);

  // Global Keyboard Shortcut (Cmd+K, Ctrl+K, or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) &&
        e.target !== inputRef.current
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === '/' && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedIndex(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Index toàn bộ kinh nguyện
  const indexedPrayers: SearchResultItem[] = useMemo(() => {
    return PRAYERS.map(p => ({
      id: `prayer-${p.id}`,
      category: 'prayers',
      categoryLabel: 'Kinh Nguyện',
      categoryIcon: <BookOpen size={15} />,
      badgeColor: { bg: 'rgba(37, 99, 235, 0.12)', text: '#2563EB', border: 'rgba(37, 99, 235, 0.3)' },
      title: p.title,
      subtitle: p.category,
      snippet: p.content.slice(0, 160) + '...',
      url: `/kinh-nguyen?id=${p.id}`,
      keywords: [
        removeAccents(p.title),
        removeAccents(p.category),
        removeAccents(p.content.slice(0, 300))
      ]
    }));
  }, []);

  // Index Faith FAQs
  const indexedFAQs: SearchResultItem[] = useMemo(() => {
    return FAITH_FAQS.map(f => ({
      id: `faq-${f.id}`,
      category: 'faq',
      categoryLabel: 'Vấn Đáp Giáo Lý',
      categoryIcon: <HelpCircle size={15} />,
      badgeColor: { bg: 'rgba(147, 51, 234, 0.12)', text: '#9333EA', border: 'rgba(147, 51, 234, 0.3)' },
      title: f.question,
      subtitle: `${f.categoryLabel} ${f.reference ? `• ${f.reference}` : ''}`,
      snippet: f.shortAnswer || (f.detailedAnswer?.[0] || ''),
      url: `/van-dap?q=${encodeURIComponent(f.question)}`,
      keywords: [
        removeAccents(f.question),
        removeAccents(f.shortAnswer),
        removeAccents(f.categoryLabel),
        ...(f.tags || []).map(t => removeAccents(t))
      ]
    }));
  }, []);

  // Index 27 Dioceses & Special Parishes
  const indexedMassTimes: SearchResultItem[] = useMemo(() => {
    const dioceseItems: SearchResultItem[] = ALL_DIOCESES.map(d => ({
      id: `diocese-${d}`,
      category: 'mass',
      categoryLabel: 'Giờ Lễ Giáo Phận',
      categoryIcon: <Clock size={15} />,
      badgeColor: { bg: 'rgba(217, 119, 6, 0.12)', text: '#D97706', border: 'rgba(217, 119, 6, 0.3)' },
      title: `Giáo phận ${d} — Tra cứu giờ lễ`,
      subtitle: '27 Giáo phận Công giáo Việt Nam',
      snippet: `Xem lịch và giờ lễ các nhà thờ, giáo xứ thuộc Giáo phận ${d}.`,
      url: `/gio-le?q=${encodeURIComponent(d)}`,
      keywords: [removeAccents(d), `giao phan ${removeAccents(d)}`, `gio le ${removeAccents(d)}`]
    }));

    const specialChurches: SearchResultItem[] = [
      {
        id: 'parish-chanh-toa-my-tho',
        category: 'mass',
        categoryLabel: 'Giáo Xứ Chánh Tòa',
        categoryIcon: <Clock size={15} />,
        badgeColor: { bg: 'rgba(220, 38, 38, 0.12)', text: '#DC2626', border: 'rgba(220, 38, 38, 0.3)' },
        title: 'Giáo Xứ Chánh Tòa Mỹ Tho — Giờ Thánh Lễ',
        subtitle: '32 Hùng Vương, Phường 7, TP. Mỹ Tho',
        snippet: 'Ngày thường: 05:00 | 17:30. Chúa Nhật: 05:30 | 07:00 | 16:00 | 18:00. Giải tội: trước và sau các thánh lễ.',
        url: '/gio-le?q=Chánh Tòa Mỹ Tho',
        keywords: ['chanh toa my tho', 'hung vuong', 'nha tho chanh toa', 'gio le my tho']
      },
      {
        id: 'parish-duc-ba-saigon',
        category: 'mass',
        categoryLabel: 'Vương Cung Thánh Đường',
        categoryIcon: <Clock size={15} />,
        badgeColor: { bg: 'rgba(217, 119, 6, 0.12)', text: '#D97706', border: 'rgba(217, 119, 6, 0.3)' },
        title: 'Vương Cung Thánh Đường Đức Bà Sài Gòn',
        subtitle: 'Công xã Paris, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
        snippet: 'Tổng Giáo phận Sài Gòn. Giờ lễ Chúa Nhật: 05:30, 06:45, 08:00, 09:30 (tiếng Anh), 16:00, 17:15, 18:30.',
        url: '/gio-le?q=Đức Bà',
        keywords: ['duc ba', 'nha tho duc ba', 'sai gon', 'quan 1']
      },
      {
        id: 'parish-chanh-toa-ha-noi',
        category: 'mass',
        categoryLabel: 'Nhà Thờ Lớn Hà Nội',
        categoryIcon: <Clock size={15} />,
        badgeColor: { bg: 'rgba(217, 119, 6, 0.12)', text: '#D97706', border: 'rgba(217, 119, 6, 0.3)' },
        title: 'Nhà Thờ Lớn Hà Nội (Chánh Tòa Thánh Giuse)',
        subtitle: '40 Nhà Chung, Hàng Trống, Hoàn Kiếm, Hà Nội',
        snippet: 'Tổng Giáo phận Hà Nội. Giờ lễ sáng & chiều hàng ngày, Chúa Nhật nhiều khung giờ lễ.',
        url: '/gio-le?q=Hà Nội',
        keywords: ['nha tho lon', 'ha noi', 'nha chung', 'hoan kiem', 'thanh giuse']
      },
      {
        id: 'parish-la-vang',
        category: 'mass',
        categoryLabel: 'Trung Tâm Hành Hương',
        categoryIcon: <Clock size={15} />,
        badgeColor: { bg: 'rgba(217, 119, 6, 0.12)', text: '#D97706', border: 'rgba(217, 119, 6, 0.3)' },
        title: 'Trung Tâm Hành Hương Đức Mẹ La Vang',
        subtitle: 'Hải Phú, Hải Lăng, Quảng Trị (Tổng Giáo phận Huế)',
        snippet: 'Thánh địa hành hương Quốc gia của Giáo Hội Việt Nam, Thánh lễ hàng ngày và các dịp đại lễ.',
        url: '/gio-le?q=La Vang',
        keywords: ['la vang', 'duc me la vang', 'quang tri', 'hanh huong']
      }
    ];

    return [...specialChurches, ...dioceseItems];
  }, []);

  // Index 73 Holy Bible Books
  const indexedLibrary: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];
    BIBLE_BOOKS.forEach(b => {
      items.push({
        id: `bible-${b.id}`,
        category: 'library',
        categoryLabel: `Kinh Thánh • ${b.groupLabel}`,
        categoryIcon: <BookOpen size={15} />,
        badgeColor: {
          bg: b.testament === 'new' ? 'rgba(30, 58, 138, 0.12)' : 'rgba(153, 27, 27, 0.12)',
          text: b.testament === 'new' ? '#1E3A8A' : '#991B1B',
          border: b.testament === 'new' ? 'rgba(30, 58, 138, 0.3)' : 'rgba(153, 27, 27, 0.3)'
        },
        title: `📖 ${b.name} [${b.code}]`,
        subtitle: `${b.testament === 'old' ? 'Cựu Ước' : 'Tân Ước'} • ${b.totalChapters} Chương • Bản dịch KTCGKPV`,
        snippet: b.summary,
        url: `/kinh-thanh/${b.id}/1`,
        keywords: [
          removeAccents(b.name),
          removeAccents(b.shortName),
          b.code.toLowerCase(),
          removeAccents(b.groupLabel),
          removeAccents(b.summary),
          'kinh thanh',
          b.testament === 'old' ? 'cuu uoc' : 'tan uoc'
        ]
      });
    });
    return items;
  }, []);

  // Master Pool of all searchable items
  const allSearchableItems = useMemo(() => {
    return [
      ...QUICK_LINK_ITEMS,
      ...INTRO_STATIC_ITEMS,
      ...indexedLibrary,
      ...indexedPrayers,
      ...indexedFAQs,
      ...indexedMassTimes,
      ...articles
    ];
  }, [indexedLibrary, indexedPrayers, indexedFAQs, indexedMassTimes, articles]);

  // Filter and Rank Results
  const searchResults = useMemo(() => {
    const rawTrimmed = query.trim();
    if (!rawTrimmed) return [];

    const normQuery = removeAccents(rawTrimmed);
    const queryTokens = normQuery.split(/\s+/).filter(Boolean);

    let filtered = allSearchableItems.filter(item => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      const normTitle = removeAccents(item.title);
      const normSubtitle = removeAccents(item.subtitle || '');
      const normSnippet = removeAccents(item.snippet || '');
      const combinedKeywords = item.keywords.join(' ');

      return queryTokens.every(token =>
        normTitle.includes(token) ||
        normSubtitle.includes(token) ||
        normSnippet.includes(token) ||
        combinedKeywords.includes(token)
      );
    });

    filtered.sort((a, b) => {
      const normTitleA = removeAccents(a.title);
      const normTitleB = removeAccents(b.title);

      if (normTitleA === normQuery) return -1;
      if (normTitleB === normQuery) return 1;

      if (normTitleA.startsWith(normQuery) && !normTitleB.startsWith(normQuery)) return -1;
      if (!normTitleA.startsWith(normQuery) && normTitleB.startsWith(normQuery)) return 1;

      const catPriority: Record<SearchCategory, number> = {
        links: 1,
        intro: 2,
        library: 3,
        prayers: 4,
        faq: 5,
        mass: 6,
        articles: 7,
        all: 8
      };
      const pDiff = (catPriority[a.category] || 99) - (catPriority[b.category] || 99);
      if (pDiff !== 0) return pDiff;

      return 0;
    });

    return filtered.slice(0, 30);
  }, [allSearchableItems, query, activeCategory]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  const handleSelect = useCallback((item: SearchResultItem) => {
    try {
      const cleanQ = query.trim() || item.title;
      const updated = [cleanQ, ...recentSearches.filter(s => s !== cleanQ)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('omni_recent_searches', JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setIsOpen(false);

    if (item.isExternal) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      router.push(item.url);
    }
  }, [query, recentSearches, router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1 < searchResults.length ? prev + 1 : prev));
      scrollSelectedIntoView(selectedIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 >= 0 ? prev - 1 : 0));
      scrollSelectedIntoView(selectedIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        handleSelect(searchResults[selectedIndex]);
      }
    }
  };

  const scrollSelectedIntoView = (idx: number) => {
    if (!resultsContainerRef.current) return;
    const items = resultsContainerRef.current.querySelectorAll('[data-search-item]');
    if (items[idx]) {
      items[idx].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  };

  const CATEGORY_TABS: { id: SearchCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.tabAllPosts || 'Tất Cả', icon: <Sparkles size={14} /> },
    { id: 'library', label: `Kinh Thánh (73 Sách)`, icon: <BookOpen size={14} /> },
    { id: 'prayers', label: `${t.tabPrayers || 'Kinh Nguyện'} (${PRAYERS.length})`, icon: <BookOpen size={14} /> },
    { id: 'faq', label: t.tabFAQ || 'Vấn Đáp Giáo Lý', icon: <HelpCircle size={14} /> },
    { id: 'mass', label: t.tabMass || 'Giờ Lễ & Giáo Phận', icon: <Clock size={14} /> },
    { id: 'intro', label: t.tabIntro || 'Giới Thiệu & Lịch Sử', icon: <Landmark size={14} /> },
    { id: 'articles', label: t.tabArticles || 'Bảng Tin Xứ Đoàn', icon: <FileText size={14} /> },
    { id: 'links', label: t.tabLinks || 'Liên Kết & Tiện Ích', icon: <LinkIcon size={14} /> }
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. LIQUID GLASS HEADER TRIGGER BUTTON (LUÔN HIỂN THỊ TẠI SITE HEADER) */}
      {/* ========================================================================= */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Tìm kiếm thông tin trên toàn website"
        className="liquid-search-trigger"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.18)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          color: '#FFFFFF',
          fontSize: '0.82rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          userSelect: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.28)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.55)';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.4)';
        }}
      >
        <Search size={14} style={{ color: '#FDE68A', flexShrink: 0 }} />
        
        {/* Desktop Text */}
        <span className="desktop-search-label" style={{ opacity: 0.95 }}>
          {t.searchPlaceholder?.replace(' ⌘K', '') || 'Tìm kiếm kinh, giáo lý, giờ lễ...'}
        </span>

        {/* Keyboard shortcut indicator */}
        <span
          className="desktop-search-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '0.68rem',
            fontWeight: 800,
            padding: '1.5px 5px',
            borderRadius: '4px',
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#FDE68A',
            letterSpacing: '0.02em',
            marginLeft: '2px'
          }}
        >
          ⌘K
        </span>
      </button>

      {/* ========================================================================= */}
      {/* 2. LIQUID GLASS OMNISEARCH MODAL (COMMAND PALETTE) */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '16px 12px 24px',
            paddingTop: 'clamp(40px, 8vh, 80px)',
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          {/* Main Liquid Glass Search Window */}
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '18px',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Top Liquid Search Input Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                borderBottom: '1px solid var(--color-border-subtle)',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)'
              }}
            >
              <Search size={20} style={{ color: 'var(--color-red)', flexShrink: 0 }} />

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.omniInputPlaceholder || "Tìm kinh, vấn đáp giáo lý, giờ lễ 27 giáo phận, Vatican, TNTT..."}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1.02rem',
                  fontWeight: 600,
                  color: 'var(--color-dark)',
                  fontFamily: 'inherit'
                }}
              />

              {query && (
                <button
                  onClick={() => setQuery('')}
                  style={{
                    background: 'var(--color-btn-subtle-bg)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--color-subtle)'
                  }}
                  title="Xóa tìm kiếm"
                >
                  <X size={14} />
                </button>
              )}

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: 'var(--color-btn-subtle-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  color: 'var(--color-subtle)',
                  cursor: 'pointer'
                }}
              >
                ESC
              </button>
            </div>

            {/* Category Filter Chips (Liquid Glass Horizontal Scroll) */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                padding: '10px 16px',
                overflowX: 'auto',
                borderBottom: '1px solid var(--color-border-subtle)',
                background: 'var(--color-beige)',
                scrollbarWidth: 'none'
              }}
            >
              {CATEGORY_TABS.map(tab => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 11px',
                      borderRadius: '9999px',
                      fontSize: '0.78rem',
                      fontWeight: isActive ? 800 : 600,
                      whiteSpace: 'nowrap',
                      background: isActive ? 'var(--color-red)' : 'var(--color-card-bg)',
                      color: isActive ? '#FFFFFF' : 'var(--color-muted)',
                      border: isActive ? '1px solid var(--color-red)' : '1px solid var(--color-border-subtle)',
                      boxShadow: isActive ? '0 2px 6px rgba(211, 47, 47, 0.3)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.12s ease'
                    }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Results Body / Suggestions */}
            <div
              ref={resultsContainerRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                maxHeight: '52vh',
                padding: '12px 14px'
              }}
            >
              {/* IF QUERY IS EMPTY: SHOW SUGGESTIONS & RECENT SEARCHES */}
              {!query.trim() && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '6px 4px' }}>
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: 'var(--color-subtle)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        marginBottom: '8px'
                      }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          <History size={13} />
                          Tìm kiếm gần đây
                        </span>
                        <button
                          onClick={() => {
                            setRecentSearches([]);
                            localStorage.removeItem('omni_recent_searches');
                          }}
                          style={{
                            fontSize: '0.72rem',
                            color: 'var(--color-subtle)',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }}
                        >
                          Xóa lịch sử
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {recentSearches.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => setQuery(s)}
                            style={{
                              padding: '5px 12px',
                              borderRadius: '8px',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              background: 'var(--color-btn-subtle-bg)',
                              color: 'var(--color-dark)',
                              border: '1px solid var(--color-border-subtle)',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <span>{s}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Topics */}
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--color-subtle)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '8px'
                    }}>
                      <TrendingUp size={13} />
                      Gợi ý tìm kiếm nhanh
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {POPULAR_SEARCH_KEYWORDS.map((k, idx) => (
                        <button
                          key={idx}
                          onClick={() => setQuery(k)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            background: 'var(--color-btn-subtle-bg)',
                            color: 'var(--color-dark)',
                            border: '1px solid var(--color-border-subtle)',
                            cursor: 'pointer',
                            transition: 'all 0.12s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-red)';
                            e.currentTarget.style.color = 'var(--color-red)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                            e.currentTarget.style.color = 'var(--color-dark)';
                          }}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Feature Shortcuts */}
                  <div style={{ marginTop: '4px' }}>
                    <div style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--color-subtle)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '8px'
                    }}>
                      Lối tắt danh mục
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                      {QUICK_LINK_ITEMS.slice(0, 4).map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSelect(item)}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '10px',
                            background: 'var(--color-card-bg)',
                            border: '1px solid var(--color-border-subtle)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-red)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <div style={{ minWidth: 0, paddingRight: '8px' }}>
                            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.subtitle}
                            </div>
                          </div>
                          <ArrowRight size={14} style={{ color: 'var(--color-red)', flexShrink: 0 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* IF QUERY IS ENTERED BUT NO RESULTS */}
              {query.trim() && searchResults.length === 0 && (
                <div style={{
                  padding: '36px 16px',
                  textAlign: 'center',
                  color: 'var(--color-subtle)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '4px' }}>
                    Không tìm thấy kết quả phù hợp cho &quot;{query}&quot;
                  </div>
                  <div style={{ fontSize: '0.82rem', maxWidth: '420px', margin: '0 auto', lineHeight: 1.5 }}>
                    Thử tìm với từ khóa ngắn gọn hơn (vd: <em>lạy cha, giáo lý, giờ lễ, lêô xiv, tntt, chánh tòa</em>) hoặc chọn tab <strong>Tất Cả</strong>.
                  </div>
                </div>
              )}

              {/* IF SEARCH RESULTS EXIST */}
              {query.trim() && searchResults.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: 'var(--color-subtle)',
                    padding: '2px 6px 6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    Tìm thấy {searchResults.length} kết quả
                  </div>

                  {searchResults.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <div
                        key={item.id}
                        data-search-item
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '12px',
                          background: isSelected ? 'var(--color-btn-subtle-bg)' : 'transparent',
                          border: isSelected ? '1px solid var(--color-red)' : '1px solid transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '12px',
                          transition: 'all 0.1s ease'
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          {/* Category Badge & Subtitle */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              padding: '2px 7px',
                              borderRadius: '6px',
                              background: item.badgeColor.bg,
                              color: item.badgeColor.text,
                              border: `1px solid ${item.badgeColor.border}`
                            }}>
                              {item.categoryIcon}
                              <span>{item.categoryLabel}</span>
                            </span>

                            {item.subtitle && (
                              <span style={{
                                fontSize: '0.74rem',
                                color: 'var(--color-subtle)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {item.subtitle}
                              </span>
                            )}
                          </div>

                          {/* Item Title */}
                          <div style={{
                            fontSize: '0.94rem',
                            fontWeight: 800,
                            color: isSelected ? 'var(--color-red)' : 'var(--color-dark)',
                            lineHeight: 1.35,
                            marginBottom: item.snippet ? '3px' : '0'
                          }}>
                            {item.title}
                          </div>

                          {/* Snippet / Content preview */}
                          {item.snippet && (
                            <div style={{
                              fontSize: '0.8rem',
                              color: 'var(--color-muted)',
                              lineHeight: 1.45,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {item.snippet}
                            </div>
                          )}
                        </div>

                        {/* Action Icon */}
                        <div style={{ flexShrink: 0, paddingTop: '4px' }}>
                          {item.isExternal ? (
                            <ExternalLink size={15} style={{ color: isSelected ? 'var(--color-red)' : 'var(--color-subtle)' }} />
                          ) : (
                            <CornerDownLeft size={15} style={{ color: isSelected ? 'var(--color-red)' : 'var(--color-subtle)' }} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Hints */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 18px',
                borderTop: '1px solid var(--color-border-subtle)',
                background: 'var(--color-beige)',
                fontSize: '0.74rem',
                color: 'var(--color-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span><kbd style={{ fontWeight: 800 }}>↑↓</kbd> Di chuyển</span>
                <span><kbd style={{ fontWeight: 800 }}>↵</kbd> Mở</span>
                <span><kbd style={{ fontWeight: 800 }}>Esc</kbd> Đóng</span>
              </div>

              <div>
                <span>Tìm kiếm đa năng Công Giáo</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive adjustments for trigger button */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .desktop-search-label,
          .desktop-search-badge {
            display: none !important;
          }
          .liquid-search-trigger {
            padding: 6px 8px !important;
            border-radius: 50% !important;
            width: 32px !important;
            height: 32px !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </>
  );
}
