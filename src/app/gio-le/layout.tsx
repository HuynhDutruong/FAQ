import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tra Cứu Giờ Lễ 27 Giáo Phận Toàn Quốc & Định Vị GPS',
  description: 'Hệ thống tra cứu thông minh giờ lễ Chúa Nhật, ngày thường, giải tội hơn 3.300 nhà thờ thuộc 27 giáo phận Công giáo Việt Nam (Mỹ Tho, Sài Gòn, Hà Nội, Huế, Đà Lạt, Ban Mê Thuột...) kèm định vị GPS gần bạn và chỉ đường Google Maps.',
  keywords: [
    'tra cuu gio le', 'gio le toan quoc', 'gio le chanh toa my tho', 'gio le 27 giao phan',
    'gio le nha tho duc ba', 'gio le nha tho lon ha noi', 'gio le la vang', 'gio le chúa nhật',
    'tim nha tho gan nhat', 'dinh vi gps nha tho'
  ],
  alternates: {
    canonical: 'https://chanhtoa.tnttgiaophanmytho.online/gio-le',
  },
  openGraph: {
    title: 'Tra Cứu Giờ Lễ 27 Giáo Phận Toàn Quốc & Định Vị GPS',
    description: 'Tra cứu nhanh giờ lễ 3.300+ nhà thờ trên toàn quốc, chỉ đường Google Maps, tìm nhà thờ gần nhất và đóng góp dữ liệu giờ lễ mới.',
    url: 'https://chanhtoa.tnttgiaophanmytho.online/gio-le',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tra Cứu Giờ Lễ 27 Giáo Phận Toàn Quốc & Định Vị GPS',
    description: 'Hệ thống tra cứu thông minh giờ lễ hơn 3.300 nhà thờ thuộc 27 giáo phận Công giáo Việt Nam.',
    images: ['/images/nha_tho_duc_ba.jpg'],
  },
};

export default function GioLeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
