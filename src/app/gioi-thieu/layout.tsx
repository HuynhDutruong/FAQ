import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giới Thiệu Xứ Đoàn Các Thánh Tử Đạo Việt Nam & Giáo Xứ Chánh Tòa Mỹ Tho',
  description: 'Giới thiệu về Xứ Đoàn Các Thánh Tử Đạo Việt Nam (Giáo Xứ Chánh Tòa Giáo Phận Mỹ Tho), lịch sử họ đạo Chánh Tòa từ năm 1861, 5 vị Giám mục, Tòa Thánh Vatican & Đức Giáo Hoàng Lêô XIV, Giáo Hội Việt Nam.',
  alternates: {
    canonical: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu',
  },
  openGraph: {
    title: 'Giới Thiệu Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Chánh Tòa Mỹ Tho',
    description: 'Tìm hiểu về Xứ Đoàn Các Thánh Tử Đạo Việt Nam, lịch sử Giáo xứ Chánh Tòa & Giáo phận Mỹ Tho, Đức Thánh Cha Lêô XIV, Tòa Thánh Vatican và HĐGMVN.',
    url: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giới Thiệu Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Chánh Tòa Mỹ Tho',
    description: 'Giới thiệu về Xứ Đoàn Các Thánh Tử Đạo Việt Nam và Giáo Xứ Chánh Tòa Mỹ Tho.',
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
