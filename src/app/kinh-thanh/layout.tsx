import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bộ Sưu Tập 73 Sách Kinh Thánh & Kiệt Tác Nghệ Thuật Thánh Công Giáo',
  description: 'Khám phá trọn bộ 73 Sách Cựu Ước & Tân Ước (Bản dịch KTCGKPV & HĐGMVN) cùng 73 kiệt tác hội họa Phục Hưng kinh điển và dẫn nhập thần học chuẩn mực tại Xứ Đoàn Các Thánh Tử Đạo - Giáo Xứ Chánh Tòa Mỹ Tho.',
  alternates: {
    canonical: 'https://chanhtoa.tnttgiaophanmytho.online/kinh-thanh'
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://chanhtoa.tnttgiaophanmytho.online/kinh-thanh',
    siteName: 'Bộ Sưu Tập Lời Chúa & Nghệ Thuật Thánh • Chánh Tòa Mỹ Tho',
    title: 'Bộ Sưu Tập 73 Sách Kinh Thánh & Kiệt Tác Nghệ Thuật Thánh Công Giáo',
    description: 'Trọn bộ 73 Sách Cựu Ước & Tân Ước kèm 73 kiệt tác nghệ thuật thánh kinh điển và dẫn nhập thần học tại Chánh Tòa Mỹ Tho.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bộ Sưu Tập 73 Sách Kinh Thánh & Kiệt Tác Nghệ Thuật Thánh Công Giáo',
    description: 'Khám phá trọn bộ 73 Sách Kinh Thánh và 73 kiệt tác hội họa Phục Hưng kinh điển tại Chánh Tòa Mỹ Tho.',
    images: ['https://chanhtoa.tnttgiaophanmytho.online/images/bible/creation_of_adam.jpg']
  }
};

export default function BibleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
