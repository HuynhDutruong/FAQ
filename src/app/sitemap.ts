import { MetadataRoute } from 'next';
import { PRAYERS } from '@/lib/prayersData';
import { BIBLE_BOOKS } from '@/lib/bible';
import { getParishIdIndex } from '@/lib/massTimes';

const BASE_URL = 'https://chanhtoa.tnttgiaophanmytho.online';

// Sitemap dựng lại mỗi ngày và chỉ tốn ĐÚNG 1 lượt đọc Firestore nhờ đọc
// document chỉ mục massTimesMeta/parishIndex.
//
// Bản trước quét toàn bộ 27 giáo phận bằng getByDiocese, tức ~3.300 lượt đọc
// MỖI LẦN dựng lại. Vì sitemap dựng lại ở mọi lần build chứ không phải mỗi
// ngày, chỉ vài chục lần build là hết hạn mức 50.000 lượt/ngày của gói Spark
// và toàn bộ tính năng dùng Firestore ngừng hoạt động.
export const revalidate = 86400;

/**
 * Trang chi tiết từng giáo xứ — nguồn traffic tự nhiên lớn nhất của site
 * ("giờ lễ nhà thờ X"). Lỗi Firestore không được làm hỏng cả sitemap.
 */
async function parishRoutes(currentDate: Date): Promise<MetadataRoute.Sitemap> {
  try {
    const ids = await getParishIdIndex();
    return ids.map((id) => ({
      url: `${BASE_URL}/gio-le/${id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error('sitemap: không tải được danh sách giáo xứ', err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // Core Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/kinh-thanh`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${BASE_URL}/gioi-thieu`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/gio-le`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/kinh-nguyen`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/van-dap`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    }
  ];

  // 73 Bible Books Routes
  const bibleRoutes: MetadataRoute.Sitemap = BIBLE_BOOKS.map(b => ({
    url: `${BASE_URL}/kinh-thanh/${b.id}/1`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Trang riêng của từng bản kinh (URL tĩnh, thay cho ?id= mà Google index rất kém)
  const prayerRoutes: MetadataRoute.Sitemap = PRAYERS.map(p => ({
    url: `${BASE_URL}/kinh-nguyen/${p.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: p.isPopular ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...bibleRoutes, ...prayerRoutes, ...(await parishRoutes(currentDate))];
}
