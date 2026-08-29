import { MetadataRoute } from 'next';
import { ALL_DIOCESES } from '@/lib/dioceses';
import { PRAYERS } from '@/lib/prayersData';
import { BIBLE_BOOKS } from '@/lib/bible';
import { getByDiocese } from '@/lib/massTimes';

const BASE_URL = 'https://chanhtoa.tnttgiaophanmytho.online';

// Sitemap sinh lại mỗi ngày: ~3.300 lượt đọc Firestore/ngày, không đáng kể so
// với hạn mức, đổi lại toàn bộ trang giáo xứ được khai báo cho Google.
export const revalidate = 86400;

/**
 * Trang chi tiết từng giáo xứ — nguồn traffic tự nhiên lớn nhất của site
 * ("giờ lễ nhà thờ X"). Lỗi Firestore không được làm hỏng cả sitemap.
 */
async function parishRoutes(currentDate: Date): Promise<MetadataRoute.Sitemap> {
  try {
    const lists = await Promise.all(ALL_DIOCESES.map((d) => getByDiocese(d)));
    return lists.flat().map((m) => ({
      url: `${BASE_URL}/gio-le/${m.id}`,
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
