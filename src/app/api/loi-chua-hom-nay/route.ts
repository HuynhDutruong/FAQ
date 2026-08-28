import { NextRequest, NextResponse } from 'next/server';
import { getScrapedLiturgicalDay } from '@/lib/liturgicalData';
import { getLiturgicalDay } from '@/lib/liturgicalCalendar';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache 1 hour

// Simple in-memory cache for fast response
const cache = new Map<string, any>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    let targetDate: Date;
    if (dateParam) {
      targetDate = new Date(dateParam);
      if (isNaN(targetDate.getTime())) targetDate = new Date();
    } else {
      targetDate = new Date();
    }

    const day = String(targetDate.getDate()).padStart(2, '0');
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const year = String(targetDate.getFullYear());
    const cacheKey = `${year}-${month}-${day}`;

    if (cache.has(cacheKey)) {
      return NextResponse.json(cache.get(cacheKey));
    }

    // 1. Get base liturgical day details (calculated algorithmically & from liturgical data)
    const baseDetail = getScrapedLiturgicalDay(targetDate);
    const litAlgo = getLiturgicalDay(targetDate);

    let feast = baseDetail.title || litAlgo.feast || litAlgo.season;
    let rank = baseDetail.rank || (litAlgo.feast ? 'Lễ kính' : 'Ngày trong tuần');
    let color = baseDetail.color || litAlgo.color;
    let colorHex = baseDetail.colorHex || '#10B981';
    let readings = baseDetail.readings || '';
    let gospelQuote = '';
    let gospelRef = '';
    let gospelExcerpt = '';
    const sourceUrl = `https://loichuahomnay.vn/suy-niem-loi-chua-ngay-${day}-${month}-${year}`;

    // 2. Attempt live fetch from loichuahomnay.vn to get real-time Gospel verse & meditation
    try {
      const res = await fetch(sourceUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CatholicApp/1.0)' },
        next: { revalidate: 86400 } // Cache fetch for 24h
      });

      if (res.ok) {
        const html = await res.text();
        
        // Extract feast title if available
        const titleMatch = html.match(/<h3 class=['"]ttlcghn['"].*?>(.*?)<\/h3>/i) ||
                           html.match(/<h1 class=['"]post-title['"].*?>(.*?)<\/h1>/i);
        if (titleMatch) {
          const rawTitle = titleMatch[1].replace(/<.*?>/g, '').replace(/^\d{2}\/\d{2}\/\d{4}:\s*/, '').trim();
          if (rawTitle) feast = rawTitle;
        }

        // Extract readings
        const readingMatch = html.match(/<div class=['"]dsbd['"].*?>([\s\S]*?)<\/div>/i);
        if (readingMatch) {
          const rawRead = readingMatch[1].replace(/<p.*?>.*?<\/p>/gi, '').replace(/<.*?>/g, '').trim();
          if (rawRead) readings = rawRead;
        }

        // Extract Gospel paragraphs
        const paras = html.match(/<p.*?>([\s\S]*?)<\/p>/gi) || [];
        for (let i = 0; i < paras.length; i++) {
          const cleanP = paras[i].replace(/<.*?>/g, '').trim();
          if (/Phúc Âm:\s*([A-Za-z0-9,\s\-–]+)/i.test(cleanP)) {
            gospelRef = cleanP.replace(/^Phúc Âm:\s*/i, '').trim();
            // Next paragraphs usually contain the Gospel passage
            const nextPassages: string[] = [];
            for (let j = i + 1; j < Math.min(i + 5, paras.length); j++) {
              const text = paras[j].replace(/<.*?>/g, '').trim();
              if (text && !text.includes('Ðó là lời Chúa') && !text.includes('Bài Đọc')) {
                nextPassages.push(text);
              }
            }
            if (nextPassages.length > 0) {
              gospelExcerpt = nextPassages.join(' ');
              gospelQuote = nextPassages[0];
            }
            break;
          }
        }
      }
    } catch (err) {
      console.warn('Live fetch from loichuahomnay.vn had issue, using fallback:', err);
    }

    // 3. Fallback Gospel quotes if live fetch had no excerpt
    if (!gospelQuote) {
      if (readings) {
        gospelQuote = `“Lời Chúa là ngọn đèn soi cho con bước, là ánh sáng chỉ đường con đi.” (${readings.split(';').pop()?.trim() || 'Tv 119, 105'})`;
      } else {
        gospelQuote = '“Lời Chúa là ngọn đèn soi cho con bước, là ánh sáng chỉ đường con đi.” (Tv 119, 105)';
      }
    }

    const payload = {
      date: `${day}/${month}/${year}`,
      day,
      month,
      year,
      feast,
      rank,
      color,
      colorHex,
      readings,
      gospelRef: gospelRef || readings.split(';').pop()?.trim() || '',
      gospelQuote: gospelQuote.length > 250 ? gospelQuote.slice(0, 240) + '...' : gospelQuote,
      gospelExcerpt,
      sourceUrl
    };

    cache.set(cacheKey, payload);
    return NextResponse.json(payload);
  } catch (error) {
    console.error('Error in /api/loi-chua-hom-nay:', error);
    return NextResponse.json(
      {
        date: new Date().toLocaleDateString('vi-VN'),
        feast: 'Thường Niên',
        rank: 'Ngày thường',
        color: 'Xanh',
        colorHex: '#10B981',
        gospelQuote: '“Lời Chúa là ngọn đèn soi cho con bước, là ánh sáng chỉ đường con đi.” (Tv 119, 105)',
        gospelRef: 'Tv 119, 105',
        readings: '',
        sourceUrl: 'https://loichuahomnay.vn'
      },
      { status: 200 }
    );
  }
}
