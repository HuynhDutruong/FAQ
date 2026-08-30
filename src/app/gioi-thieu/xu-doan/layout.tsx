import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Thiếu Nhi Thánh Thể Chánh Tòa Mỹ Tho',
  description:
    'Xứ Đoàn Các Thánh Tử Đạo Việt Nam, Giáo xứ Chánh Tòa Mỹ Tho: bản chất và tôn chỉ Phong trào Thiếu Nhi Thánh Thể, hệ thống khăn quàng các ngành, mười đời cha tuyên uý và ngày tái lập năm 2005.',
  alternates: { canonical: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/xu-doan' },
  openGraph: {
    title: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Thiếu Nhi Thánh Thể Chánh Tòa Mỹ Tho',
    description: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam, Giáo xứ Chánh Tòa Mỹ Tho: bản chất và tôn chỉ Phong trào Thiếu Nhi Thánh Thể, hệ thống khăn quàng các ngành, mười đời cha tuyên uý và ngày tái lập năm 2005.',
    url: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/xu-doan',
    type: 'article'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
