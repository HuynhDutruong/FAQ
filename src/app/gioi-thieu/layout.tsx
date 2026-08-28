import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giới Thiệu Xứ Đoàn CTTĐVN, Lịch Sử Chánh Tòa Mỹ Tho & Tòa Thánh Vatican',
  description: 'Tìm hiểu lịch sử Giáo xứ Chánh Tòa & Giáo phận Mỹ Tho, Đức Thánh Cha Lêô XIV (Leo XIV), Tòa Thánh Vatican, Hội Đồng Giám Mục Việt Nam (HĐGMVN), 5 vị Giám mục và kiến trúc Gothic 53m x 17m.',
  alternates: {
    canonical: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu',
  },
  openGraph: {
    title: 'Giới Thiệu Xứ Đoàn CTTĐVN & Lịch Sử Giáo Phận Mỹ Tho',
    description: 'Lịch sử Giáo phận Mỹ Tho, Đức Giáo Hoàng Lêô XIV, Tòa Thánh Vatican, HĐGMVN, 5 vị Giám mục và Kiến trúc Nhà thờ Chánh Tòa.',
    url: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu',
    type: 'website',
    images: [
      {
        url: '/images/nhatho1.jpg',
        width: 1200,
        height: 630,
        alt: 'Mặt tiền Nhà Thờ Chánh Tòa Mỹ Tho',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giới Thiệu Xứ Đoàn CTTĐVN & Lịch Sử Giáo Phận Mỹ Tho',
    description: 'Lịch sử Giáo phận Mỹ Tho, Đức Giáo Hoàng Lêô XIV, Tòa Thánh Vatican, HĐGMVN và Kiến trúc Nhà thờ Chánh Tòa.',
    images: ['/images/nhatho1.jpg'],
  },
};

export default function GioiThieuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
