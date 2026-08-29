import type { Metadata } from 'next';
import { FAITH_FAQS } from '@/lib/faithFAQs';

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

const BASE_URL = 'https://chanhtoa.tnttgiaophanmytho.online';

export default function VanDapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // FAQPage schema: đưa trọn 40 câu hỏi + câu trả lời đầy đủ vào dữ liệu có
  // cấu trúc để Google và các công cụ tìm kiếm AI đọc được nguyên vẹn.
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/van-dap#faq`,
    name: 'Vấn Đáp Giáo Lý Hội Thánh Công Giáo',
    inLanguage: 'vi-VN',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    mainEntity: FAITH_FAQS.map((faq) => ({
      '@type': 'Question',
      '@id': `${BASE_URL}/van-dap#${faq.id}`,
      name: faq.question,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: [faq.shortAnswer, ...(faq.detailedAnswer ?? [])].join(' '),
        ...(faq.reference ? { citation: faq.reference } : {})
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      {children}
    </>
  );
}
