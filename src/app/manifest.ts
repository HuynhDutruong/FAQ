import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Chánh Tòa Mỹ Tho',
    short_name: 'Xứ Đoàn CTTĐVN',
    description: 'Cổng thông tin tra cứu giờ lễ 27 giáo phận, 39 kinh nguyện Công giáo, vấn đáp giáo lý và sinh hoạt giới trẻ.',
    start_url: '/',
    display: 'standalone',
    background_color: '#121316',
    theme_color: '#D32F2F',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
