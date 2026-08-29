import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vấn Đáp Giáo Lý Hội Thánh Công Giáo & 7 Bí Tích (GLHTCG & Youcat)',
  description: 'Giải đáp thắc mắc Giáo Lý Công Giáo, 7 Bí Tích, Phụng Vụ, Luân Lý, Hôn Nhân Gia Đình và Giới Trẻ dựa trên Giáo Lý Hội Thánh Công Giáo & Toát Yếu CCC. Gửi câu hỏi thắc mắc đức tin trực tuyến.',
  keywords: [
    'van dap giao ly', 'hoi dap cong giao', 'giao ly hoi thanh cong giao', '7 bi tich',
    'youcat', 'glhtcg', 'bi tich giai toi', 'bi tich rua toi', 'bi tich thanh the',
    'hon nhan cong giao', 'thac mac duc tin'
  ],
  alternates: {
    canonical: 'https://chanhtoa.tnttgiaophanmytho.online/van-dap',
  },
  openGraph: {
    title: 'Vấn Đáp Giáo Lý Hội Thánh Công Giáo & 7 Bí Tích',
    description: 'Giải đáp mọi thắc mắc về Giáo Lý, 7 Bí Tích, Phụng Vụ, Luân Lý, Hôn Nhân và Đời Sống Đức Tin dựa trên Sách Giáo Lý Hội Thánh Công Giáo.',
    url: 'https://chanhtoa.tnttgiaophanmytho.online/van-dap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vấn Đáp Giáo Lý Hội Thánh Công Giáo & 7 Bí Tích',
    description: 'Giải đáp thắc mắc Giáo Lý Công Giáo, 7 Bí Tích, Phụng Vụ và Luân Lý.',
  },
};

export default function VanDapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
