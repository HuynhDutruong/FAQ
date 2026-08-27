import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tạo Ứng dụng Next.js",
  description: "Được tạo bởi create next app",
};

export default function ViLayout({ children }: LayoutProps<"/vi">) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
