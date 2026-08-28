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
  subsets: ["latin"], // next/font automatically handles Chinese subsets for Noto Sans SC
  weight: ['400', '500', '700', '900']
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Xứ Đoàn Các Thánh Tử Đạo Việt Nam",
  description: "Hệ thống Vấn đáp và Phản hồi dành cho Xứ Đoàn Các Thánh Tử Đạo Việt Nam.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${beVietnamPro.variable} ${inter.variable} ${notoSansSC.variable}`} suppressHydrationWarning>
      <body>
        <LanguageProvider>
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
