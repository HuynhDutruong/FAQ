import { NextRequest, NextResponse } from 'next/server';

// Bộ nhớ đệm trong RAM (In-Memory Cache) giúp phản hồi 0ms
const imageCache = new Map<string, string>();

/**
 * Node.js API endpoint cung cấp hình ảnh thực tế của từng Giáo xứ / Nhà thờ
 * Tìm kiếm hình ảnh thực tế qua Wikimedia / Google Maps và dự phòng ảnh bản đồ vệ tinh toạ độ GPS
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = (searchParams.get('name') || '').trim();
  const address = (searchParams.get('address') || '').trim();
  const diocese = (searchParams.get('diocese') || '').trim();
  const latStr = searchParams.get('lat');
  const lngStr = searchParams.get('lng');
  const id = searchParams.get('id') || name;

  if (!name && !latStr) {
    return NextResponse.redirect('https://images.unsplash.com/photo-1548625361-195fe57876a4?w=600&auto=format&fit=crop&q=80');
  }

  const cacheKey = `${id}_${name}`;
  if (imageCache.has(cacheKey)) {
    const cachedUrl = imageCache.get(cacheKey)!;
    return NextResponse.redirect(cachedUrl, {
      headers: {
        'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400'
      }
    });
  }

  let finalImageUrl: string | null = null;

  try {
    // 1. Tìm kiếm ảnh thực tế nhà thờ trên Wikimedia Commons
    const cleanName = name
      .replace(/^Nhà\s+Thờ\s+Giáo\s+Xứ\s+/i, '')
      .replace(/^Nhà\s+Thờ\s+/i, '')
      .replace(/^Giáo\s+Xứ\s+/i, '')
      .replace(/^GX\s+/i, '')
      .trim();

    const searchTerms = [
      `Nhà thờ ${cleanName}`,
      `Nhà thờ Giáo xứ ${cleanName}`,
      `Giáo xứ ${cleanName}`,
      name
    ];

    for (const q of searchTerms) {
      if (finalImageUrl) break;
      const wikiUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srsearch=${encodeURIComponent(q)}&format=json`;
      const res = await fetch(wikiUrl, {
        headers: { 'User-Agent': 'CatholicChurchFinder/1.0 (contact@xu-doan.org)' },
        next: { revalidate: 86400 }
      });

      if (!res.ok) continue;
      const data = await res.json();

      if (data.query?.search?.length > 0) {
        for (const item of data.query.search) {
          const title = item.title;
          if (title.endsWith('.pdf') || title.endsWith('.djvu') || title.endsWith('.tif')) continue;

          const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=640&format=json`;
          const infoRes = await fetch(infoUrl, {
            headers: { 'User-Agent': 'CatholicChurchFinder/1.0 (contact@xu-doan.org)' },
            next: { revalidate: 86400 }
          });

          if (!infoRes.ok) continue;
          const infoData = await infoRes.json();
          const pages = infoData.query?.pages;

          for (const k in pages) {
            const img = pages[k]?.imageinfo?.[0];
            if (img && (img.thumburl || img.url)) {
              finalImageUrl = img.thumburl || img.url;
              break;
            }
          }
          if (finalImageUrl) break;
        }
      }
    }
  } catch (err) {
    console.error('Error fetching church image:', err);
  }

  // 2. Dự phòng: Nếu chưa có ảnh chụp riêng, dùng hình bản đồ vệ tinh / địa điểm GPS Google
  if (!finalImageUrl) {
    const lat = parseFloat(latStr || '');
    const lng = parseFloat(lngStr || '');
    if (!isNaN(lat) && !isNaN(lng)) {
      finalImageUrl = `https://static-maps.yandex.ru/1.x/?ll=${lng},${lat}&z=16&l=sat,skl&size=600,340&pt=${lng},${lat},pm2rdm`;
    } else {
      // Default Sacred Catholic Church Architecture Banner
      finalImageUrl = '/images/jesus_antique_banner.jpg';
    }
  }

  // Lưu vào cache
  imageCache.set(cacheKey, finalImageUrl);

  return NextResponse.redirect(finalImageUrl, {
    headers: {
      'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400'
    }
  });
}
