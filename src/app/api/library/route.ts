import { NextResponse } from 'next/server';
import { getAllBooks, getBookById, getBooksByCategory, getChapter, searchBooks, BookCategory } from '@/lib/library';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');
    const chapterId = searchParams.get('chapterId');
    const category = searchParams.get('category') as BookCategory | 'all' | null;
    const query = searchParams.get('q');

    // 1. Lấy chi tiết một chương cụ thể
    if (bookId && chapterId) {
      const chapterData = getChapter(bookId, chapterId);
      if (!chapterData) {
        return NextResponse.json({ error: 'Không tìm thấy chương sách' }, { status: 404 });
      }
      return NextResponse.json(chapterData, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        }
      });
    }

    // 2. Lấy thông tin một cuốn sách cụ thể
    if (bookId) {
      const book = getBookById(bookId);
      if (!book) {
        return NextResponse.json({ error: 'Không tìm thấy sách' }, { status: 404 });
      }
      return NextResponse.json({ book }, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        }
      });
    }

    // 3. Tìm kiếm hoặc lọc theo danh mục
    let books = getAllBooks();
    if (query) {
      books = searchBooks(query, category || 'all');
    } else if (category && category !== 'all') {
      books = getBooksByCategory(category);
    }

    // Trả về danh sách sách rút gọn (không bao gồm full content của từng chương để tiết kiệm băng thông)
    const sanitizedBooks = books.map(b => ({
      id: b.id,
      title: b.title,
      originalTitle: b.originalTitle,
      author: b.author,
      category: b.category,
      categoryLabel: b.categoryLabel,
      coverColor: b.coverColor,
      coverImage: b.coverImage,
      badge: b.badge,
      summary: b.summary,
      totalChapters: b.totalChapters,
      estimatedReadingMinutes: b.estimatedReadingMinutes,
      publishYear: b.publishYear,
      featured: b.featured,
      tags: b.tags,
      chaptersList: b.chapters.map(c => ({
        id: c.id,
        number: c.number,
        title: c.title,
        subtitle: c.subtitle,
        summary: c.summary
      }))
    }));

    return NextResponse.json({
      total: sanitizedBooks.length,
      books: sanitizedBooks
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Lỗi xử lý thư viện' }, { status: 500 });
  }
}
