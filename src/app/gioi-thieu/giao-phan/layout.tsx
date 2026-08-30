import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giáo Phận Mỹ Tho — 9 Đấng Bản Quyền & 5 Đời Giám Mục',
  description:
    'Lịch sử Giáo phận Mỹ Tho: chín Đấng Bản Quyền thời Địa phận Tây Đàng Trong 1844–1960, sắc chỉ Quod Venerabiles Fratres khai sinh giáo phận năm 1960, và năm đời Giám mục Chính tòa.',
  alternates: { canonical: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/giao-phan' },
  openGraph: {
    title: 'Giáo Phận Mỹ Tho — 9 Đấng Bản Quyền & 5 Đời Giám Mục',
    description: 'Lịch sử Giáo phận Mỹ Tho: chín Đấng Bản Quyền thời Địa phận Tây Đàng Trong 1844–1960, sắc chỉ Quod Venerabiles Fratres khai sinh giáo phận năm 1960, và năm đời Giám mục Chính tòa.',
    url: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/giao-phan',
    type: 'article'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
