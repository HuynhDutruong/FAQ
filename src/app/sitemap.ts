import { MetadataRoute } from 'next';
import { ALL_DIOCESES } from '@/lib/dioceses';
import { PRAYERS } from '@/lib/prayersData';
import { BIBLE_BOOKS } from '@/lib/bible';

const BASE_URL = 'https://chanhtoa.tnttgiaophanmytho.online';

export default function sitemap(): MetadataRoute.Sitemap {
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

  // 27 Dioceses Mass Time Queries
  const dioceseRoutes = ALL_DIOCESES.map(d => ({
    url: `${BASE_URL}/gio-le?q=${encodeURIComponent(d)}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...bibleRoutes, ...dioceseRoutes, ...prayerRoutes];
}
