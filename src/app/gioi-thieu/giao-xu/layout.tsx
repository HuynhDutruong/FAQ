import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giáo Xứ Chánh Tòa Mỹ Tho — Lịch Sử Từ Năm 1861',
  description:
    'Lịch sử Giáo xứ Chánh Tòa Mỹ Tho từ năm 1861: ba lần dựng nhà thờ, niên biểu các đời linh mục chánh sở, ảnh tư liệu qua các thời kỳ và giờ thánh lễ.',
  alternates: { canonical: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/giao-xu' },
  openGraph: {
    title: 'Giáo Xứ Chánh Tòa Mỹ Tho — Lịch Sử Từ Năm 1861',
    description: 'Lịch sử Giáo xứ Chánh Tòa Mỹ Tho từ năm 1861: ba lần dựng nhà thờ, niên biểu các đời linh mục chánh sở, ảnh tư liệu qua các thời kỳ và giờ thánh lễ.',
    url: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/giao-xu',
    type: 'article'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
