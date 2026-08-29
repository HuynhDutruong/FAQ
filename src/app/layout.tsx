import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import Footer from '@/components/Footer';
import ChatBubble from '@/components/ChatBubble';
import SiteHeader from '@/components/SiteHeader';
import MobileBottomNav from '@/components/MobileBottomNav';
import GoogleTranslateScript from '@/components/GoogleTranslateScript';

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ['400', '500', '600', '700', '800', '900']
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ['400', '500', '700', '900']
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#D32F2F'
};

export const metadata: Metadata = {
  metadataBase: new URL('https://chanhtoa.tnttgiaophanmytho.online'),
  title: {
    default: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Mỹ Tho",
    template: "%s | Xứ Đoàn Các Thánh Tử Đạo Việt Nam"
  },
  description: "Trang thông tin chính thức của Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Giáo Phận Mỹ Tho. Cập nhật tin tức hoạt động Thiếu Nhi Thánh Thể, thông báo phụng vụ xứ đoàn, Lời Chúa mỗi ngày, kinh nguyện và đời sống đức tin.",
  keywords: [
    "Xứ Đoàn Các Thánh Tử Đạo Việt Nam - Giáo Xứ Chánh toà Mỹ Tho",
    "xứ đoàn các thánh tử đạo việt nam",
    "giáo xứ chánh toà mỹ tho",
    "nhà thờ lớn mỹ tho",
    "nhà thờ chánh toà mỹ tho",
    "giáo phận mỹ tho",
    "thiếu nhi thánh thể mỹ tho",
    "tntt mỹ tho",
    "giờ lễ mỹ tho",
    "giờ lễ chánh toà mỹ tho",
    "tntt giáo phận mỹ tho",
    "xứ đoàn chánh tòa mỹ tho",
    "tổng liên đoàn tntt vn",
    "đức cha phêrô nguyễn văn khảm",
    "lời chúa hôm nay",
    "sinh hoạt xứ đoàn",
    "huynh trưởng mỹ tho",
    "phụng vụ chánh tòa"
  ],
  authors: [{ name: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam", url: "https://chanhtoa.tnttgiaophanmytho.online" }],
  creator: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam",
  publisher: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Mỹ Tho",
  alternates: {
    canonical: 'https://chanhtoa.tnttgiaophanmytho.online',
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://chanhtoa.tnttgiaophanmytho.online",
    siteName: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Chánh Tòa Mỹ Tho",
    title: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Mỹ Tho",
    description: "Trang thông tin chính thức của Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Giáo Phận Mỹ Tho. Nơi chia sẻ tin tức sinh hoạt, đào tạo Huynh trưởng - Đoàn sinh và học hỏi Lời Chúa.",
    images: [
      {
        url: "/logo.jpg",
        width: 600,
        height: 600,
        alt: "Logo Xứ Đoàn Các Thánh Tử Đạo Việt Nam"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Chánh Tòa Mỹ Tho",
    description: "Trang thông tin chính thức của Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Giáo Phận Mỹ Tho.",
    images: ["/logo.jpg"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: "/favicon.ico"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://chanhtoa.tnttgiaophanmytho.online/#organization",
        "name": "Xứ Đoàn Các Thánh Tử Đạo Việt Nam",
        "alternateName": "Xứ Đoàn TNTT Các Thánh Tử Đạo Việt Nam Chánh Tòa Mỹ Tho",
        "url": "https://chanhtoa.tnttgiaophanmytho.online",
        "logo": "https://chanhtoa.tnttgiaophanmytho.online/logo.jpg",
        "email": "notification2411.huynhdutruong@gmail.com",
        "parentOrganization": {
          "@type": "CatholicChurch",
          "name": "Giáo Xứ Chánh Tòa Mỹ Tho",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "32 Hùng Vương, Phường 7",
            "addressLocality": "TP. Mỹ Tho",
            "addressRegion": "Tiền Giang",
            "addressCountry": "VN"
          }
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://chanhtoa.tnttgiaophanmytho.online/#website",
        "name": "Trang Thông Tin Xứ Đoàn Các Thánh Tử Đạo Việt Nam",
        "url": "https://chanhtoa.tnttgiaophanmytho.online",
        "description": "Trang thông tin chính thức của Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Mỹ Tho.",
        "publisher": {
          "@id": "https://chanhtoa.tnttgiaophanmytho.online/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://chanhtoa.tnttgiaophanmytho.online/gio-le?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${inter.variable} ${notoSansSC.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <GoogleTranslateScript />
          <SiteHeader />
          {children}
          <Footer />
          <ChatBubble />
          <MobileBottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
