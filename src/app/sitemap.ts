import { MetadataRoute } from 'next';
import { ALL_DIOCESES } from '@/lib/dioceses';
import { PRAYERS } from '@/lib/prayersData';

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

  // Popular Prayers Subroutes
  const popularPrayers = PRAYERS.filter(p => p.isPopular).slice(0, 30).map(p => ({
    url: `${BASE_URL}/kinh-nguyen?id=${p.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // 27 Dioceses Mass Time Queries
  const dioceseRoutes = ALL_DIOCESES.map(d => ({
    url: `${BASE_URL}/gio-le?q=${encodeURIComponent(d)}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...dioceseRoutes, ...popularPrayers];
}
