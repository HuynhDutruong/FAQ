import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '216 Bản Kinh Công Giáo & Mân Côi | Đầy Đủ Chữ To Sốt Sắng',
  description: 'Kho tàng 216 kinh nguyện Công giáo chuẩn phụng vụ: Kinh Lạy Cha, Kính Mừng, Sáng Danh, Chuỗi Mân Côi, Lòng Thương Xót, 14 Đàng Thánh Giá, Kinh Thánh Giuse, Các Thánh Tử Đạo Việt Nam, chế độ đọc kinh to rõ.',
  keywords: [
    '216 kinh cong giao', 'kinh nguyen cong giao', 'kinh lay cha', 'kinh kinh mung',
    'kinh sang danh', 'chuoi man coi', 'long thuong xot', '14 dang thanh gia',
    'kinh thanh giuse', 'cac thanh tu dao viet nam', 'kinh hang ngay'
  ],
  alternates: {
    canonical: 'https://chanhtoa.tnttgiaophanmytho.online/kinh-nguyen',
  },
  openGraph: {
    title: 'Kho Tàng 216 Bản Kinh Công Giáo & Mân Côi',
    description: 'Tổng hợp 216 bản kinh nguyện Công giáo đầy đủ chuẩn phụng vụ, chế độ đọc kinh sốt sắng, lưu kinh yêu thích và đếm hạt mân côi.',
    url: 'https://chanhtoa.tnttgiaophanmytho.online/kinh-nguyen',
    type: 'website',
    images: [
      {
        url: '/images/jesus_antique_banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Kho tàng 216 Kinh Nguyện Công Giáo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kho Tàng 216 Bản Kinh Công Giáo & Mân Côi',
    description: 'Tổng hợp 216 bản kinh nguyện Công giáo đầy đủ chuẩn phụng vụ, chữ to rõ ràng, chế độ đọc kinh sốt sắng.',
    images: ['/images/jesus_antique_banner.jpg'],
  },
};

export default function KinhNguyenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
