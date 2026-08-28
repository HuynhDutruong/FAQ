import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import Footer from '@/components/Footer';

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
  metadataBase: new URL('https://xudoancacthanhtudaovietnam.web.app'),
  title: {
    default: "Tra Cứu Giờ Lễ Toàn Quốc & Vấn Đáp Công Giáo | Xứ Đoàn CTTĐVN",
    template: "%s | Xứ Đoàn Các Thánh Tử Đạo Việt Nam"
  },
  description: "Cổng thông tin tra cứu giờ lễ hơn 3.300 nhà thờ thuộc 27 giáo phận toàn quốc, chỉ đường Google Maps, tìm nhà thờ gần nhất và gửi câu hỏi vấn đáp Công giáo trực tuyến.",
  keywords: [
    "giờ lễ", "tra cứu giờ lễ", "giờ thánh lễ", "nhà thờ công giáo", "giờ lễ chúa nhật",
    "tìm nhà thờ gần đây", "27 giáo phận việt nam", "giáo xứ sài gòn", "giáo phận mỹ tho",
    "vấn đáp công giáo", "xứ đoàn các thánh tử đạo việt nam"
  ],
  authors: [{ name: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam" }],
  creator: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam",
    title: "Tra Cứu Giờ Lễ Toàn Quốc & Vấn Đáp Công Giáo",
    description: "Tra cứu giờ lễ hơn 3.300 nhà thờ thuộc 27 giáo phận tại Việt Nam, chỉ đường GPS và gửi thắc mắc đức tin Công giáo.",
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
    title: "Tra Cứu Giờ Lễ Toàn Quốc & Vấn Đáp Công Giáo",
    description: "Tra cứu nhanh giờ lễ 3.300+ nhà thờ trên toàn quốc, chỉ đường Google Maps và gửi phản hồi, vấn đáp.",
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
    "@type": "WebSite",
    "name": "Tra Cứu Giờ Lễ Toàn Quốc - Xứ Đoàn CTTĐVN",
    "url": "https://xudoancacthanhtudaovietnam.web.app",
    "description": "Tra cứu giờ lễ hơn 3.300 nhà thờ thuộc 27 giáo phận tại Việt Nam.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://xudoancacthanhtudaovietnam.web.app/gio-le?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
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
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
