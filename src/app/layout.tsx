import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import Footer from '@/components/Footer';
import ChatBubble from '@/components/ChatBubble';
import SiteHeader from '@/components/SiteHeader';

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
    default: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Chánh Tòa Mỹ Tho | Tra Cứu Giờ Lễ, Kinh Nguyện & Giáo Lý",
    template: "%s | Xứ Đoàn Các Thánh Tử Đạo Việt Nam"
  },
  description: "Cổng thông tin chính thức của Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Giáo Phận Mỹ Tho. Tra cứu giờ lễ 27 giáo phận toàn quốc, 216 bản kinh Công giáo, vấn đáp giáo lý và tin tức sinh hoạt giới trẻ.",
  keywords: [
    "xứ đoàn các thánh tử đạo việt nam", "giáo xứ chánh tòa mỹ tho", "giáo phận mỹ tho",
    "tntt giáo phận mỹ tho", "tntt mỹ tho", "tổng liên đoàn tntt vn", "đức cha phêrô nguyễn văn khảm",
    "giờ lễ chánh tòa mỹ tho", "tra cứu giờ lễ", "216 kinh công giáo", "vấn đáp giáo lý",
    "đức giáo hoàng lêô xiv", "tòa thánh vatican", "hội đồng giám mục việt nam", "hdgmvn"
  ],
  authors: [{ name: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam", url: "https://chanhtoa.tnttgiaophanmytho.online" }],
  creator: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam",
  publisher: "Giáo Xứ Chánh Tòa Mỹ Tho",
  alternates: {
    canonical: 'https://chanhtoa.tnttgiaophanmytho.online',
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://chanhtoa.tnttgiaophanmytho.online",
    siteName: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Chánh Tòa Mỹ Tho",
    title: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Mỹ Tho",
    description: "Cổng thông tin tra cứu giờ lễ 27 giáo phận toàn quốc, 216 kinh nguyện Công giáo, vấn đáp giáo lý và sinh hoạt phong trào Thiếu Nhi Thánh Thể.",
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
    description: "Tra cứu nhanh giờ lễ 3.300+ nhà thờ trên toàn quốc, 216 kinh nguyện Công giáo và sinh hoạt Xứ Đoàn.",
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
        "@type": "WebSite",
        "@id": "https://chanhtoa.tnttgiaophanmytho.online/#website",
        "name": "Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Chánh Tòa Mỹ Tho",
        "url": "https://chanhtoa.tnttgiaophanmytho.online",
        "description": "Cổng thông tin tra cứu giờ lễ 27 giáo phận toàn quốc, 216 kinh nguyện Công giáo và giải đáp giáo lý.",
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
      },
      {
        "@type": "CatholicChurch",
        "@id": "https://chanhtoa.tnttgiaophanmytho.online/#church",
        "name": "Nhà Thờ Chánh Tòa Mỹ Tho",
        "alternateName": "Giáo Xứ Chánh Tòa Giáo Phận Mỹ Tho",
        "url": "https://chanhtoa.tnttgiaophanmytho.online",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "32 Hùng Vương, Phường 7",
          "addressLocality": "TP. Mỹ Tho",
          "addressRegion": "Tiền Giang",
          "addressCountry": "VN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 10.3548,
          "longitude": 106.3639
        },
        "telephone": "",
        "email": "notification2411.huynhdutruong@gmail.com",
        "openingHours": [
          "Mo-Sa 05:00-06:00",
          "Mo-Sa 17:30-18:30",
          "Su 05:30-06:30",
          "Su 07:00-08:00",
          "Su 16:00-17:00",
          "Su 18:00-19:00"
        ]
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
          <SiteHeader />
          {children}
          <Footer />
          <ChatBubble />
        </LanguageProvider>
      </body>
    </html>
  );
}
