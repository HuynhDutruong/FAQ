import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tư Liệu Tham Khảo — Bản Nghiên Cứu Lịch Sử Giáo Xứ Chánh Tòa Mỹ Tho',
  description:
    'Thư mục nguồn của bản khảo cứu: văn khố Hội Thừa Sai Paris, tuần báo Les Missions Catholiques trên Gallica, Công báo Toà Thánh, tài liệu Giáo phận Mỹ Tho — kèm mã tra cứu.',
  alternates: { canonical: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/tu-lieu' },
  openGraph: {
    title: 'Tư Liệu Tham Khảo — Bản Nghiên Cứu Lịch Sử Giáo Xứ Chánh Tòa Mỹ Tho',
    description: 'Thư mục nguồn của bản khảo cứu: văn khố Hội Thừa Sai Paris, tuần báo Les Missions Catholiques trên Gallica, Công báo Toà Thánh, tài liệu Giáo phận Mỹ Tho — kèm mã tra cứu.',
    url: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/tu-lieu',
    type: 'article'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
