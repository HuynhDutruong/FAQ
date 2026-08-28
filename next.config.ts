import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Ảnh bài viết & avatar lấy từ CDN của Facebook. Không đặt `search: ''`
    // vì URL fbcdn bắt buộc kèm query string xác thực, đặt vào sẽ bị chặn 400.
    remotePatterns: [
      { protocol: 'https', hostname: '**.fbcdn.net' },
      { protocol: 'https', hostname: '**.fbsbx.com' },
      { protocol: 'https', hostname: 'graph.facebook.com' }
    ]
  }
};

export default nextConfig;
