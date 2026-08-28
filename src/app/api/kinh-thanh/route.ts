import { NextResponse } from 'next/server';
import { BIBLE_BOOKS, BIBLE_SUMMARY_INFO, getBibleBook, getLiveBibleChapter } from '@/lib/bible';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookParam = searchParams.get('book') || searchParams.get('bookId');
    const chapterParam = searchParams.get('chapter');
    const testamentParam = searchParams.get('testament'); // 'old' | 'new'

    // 1. Lấy chi tiết chương cụ thể
    if (bookParam && chapterParam) {
      const chapterNumber = parseInt(chapterParam, 10) || 1;
      const chapterData = await getLiveBibleChapter(bookParam, chapterNumber);
      if (!chapterData) {
        return NextResponse.json({ error: 'Không tìm thấy sách hoặc chương' }, { status: 404 });
      }

      return NextResponse.json(chapterData, {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
          'CDN-Cache-Control': 'public, s-maxage=86400'
        }
      });
    }

    // 2. Lấy thông tin một cuốn sách cụ thể
    if (bookParam) {
      const book = getBibleBook(bookParam);
      if (!book) {
        return NextResponse.json({ error: 'Không tìm thấy sách' }, { status: 404 });
      }
      return NextResponse.json({ book }, {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800'
        }
      });
    }

    // 3. Lọc theo Cựu Ước / Tân Ước hoặc lấy toàn bộ 73 sách
    let books = BIBLE_BOOKS;
    if (testamentParam === 'old' || testamentParam === 'new') {
      books = BIBLE_BOOKS.filter(b => b.testament === testamentParam);
    }

    return NextResponse.json({
      summary: BIBLE_SUMMARY_INFO,
      total: books.length,
      books
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800'
      }
    });
  } catch (error: any) {
    console.error('Lỗi API Kinh Thánh:', error);
    return NextResponse.json({ error: error?.message || 'Lỗi máy chủ' }, { status: 500 });
  }
}
