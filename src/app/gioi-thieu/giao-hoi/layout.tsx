import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giáo Hội Hoàn Vũ — Tòa Thánh Vatican & 267 Vị Giáo Hoàng',
  description:
    'Tòa Thánh Vatican, Thành quốc Vatican và Đền thờ Thánh Phêrô, tiểu sử Đức Thánh Cha Lêô XIV, cùng biên niên sử đầy đủ 267 vị Giáo hoàng từ Thánh Phêrô đến nay.',
  alternates: { canonical: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/giao-hoi' },
  openGraph: {
    title: 'Giáo Hội Hoàn Vũ — Tòa Thánh Vatican & 267 Vị Giáo Hoàng',
    description: 'Tòa Thánh Vatican, Thành quốc Vatican và Đền thờ Thánh Phêrô, tiểu sử Đức Thánh Cha Lêô XIV, cùng biên niên sử đầy đủ 267 vị Giáo hoàng từ Thánh Phêrô đến nay.',
    url: 'https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/giao-hoi',
    type: 'article'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
