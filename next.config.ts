import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['firebase-admin', 'sharp'],
  images: {
    // Kích hoạt định dạng hình ảnh nén chất lượng cao AVIF và WebP
    formats: ['image/avif', 'image/webp'],
    // Độ phân giải hỗ trợ màn hình Retina 2x / 3x / 4K
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 1024],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: 'https', hostname: '**.fbcdn.net' },
      { protocol: 'https', hostname: '**.fbsbx.com' },
      { protocol: 'https', hostname: 'graph.facebook.com' },
      { protocol: 'https', hostname: 'images.giaophanmytho.net' },
      { protocol: 'https', hostname: 'images.hdgmvietnam.com' },
      { protocol: 'https', hostname: '**.giaophanmytho.net' },
      { protocol: 'https', hostname: '**.hdgmvietnam.com' },
      { protocol: 'https', hostname: '**.vaticannews.va' }
    ]
  }
};

export default nextConfig;
