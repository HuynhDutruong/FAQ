import { NextRequest, NextResponse } from 'next/server';
import { getScrapedLiturgicalDay } from '@/lib/liturgicalData';
import { getLiturgicalDay } from '@/lib/liturgicalCalendar';
import { parseReadings, type ReadingSection } from '@/lib/dailyReadings';

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
    let sections: ReadingSection[] = [];
    // Nguồn tra cứu nội bộ — không trả về cho trình duyệt, không hiển thị cho người đọc
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

        // Toàn văn Lời Chúa: Bài Đọc I, Đáp Ca, Bài Đọc II, Alleluia, Tin Mừng
        sections = parseReadings(html);

        const gospel = sections.find(sec => sec.kind === 'gospel');
        if (gospel) {
          gospelRef = gospel.ref;
          gospelQuote = gospel.summary || gospel.paragraphs[1] || gospel.paragraphs[0] || '';
          gospelExcerpt = gospel.paragraphs.join('\n\n');
        }

        // Danh sách trích dẫn của bộ lễ đầu tiên, gọn hơn chuỗi lấy từ khối dsbd
        const firstGroup = sections.filter(sec => sec.group === 0 && sec.kind !== 'alleluia');
        if (firstGroup.length) {
          readings = firstGroup.map(sec => sec.ref).filter(Boolean).join('; ');
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
      sections
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
        readings: ''
      },
      { status: 200 }
    );
  }
}
