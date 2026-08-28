import { BibleBookInfo, BibleChapterContent, BibleVerse } from './types';
import { BIBLE_BOOKS } from './bibleData';

// Global singleton cache cho Node.js
declare global {
  // eslint-disable-next-line no-var
  var __BIBLE_CACHE__: Map<string, { data: BibleChapterContent; timestamp: number }> | undefined;
}

const memoryCache = globalThis.__BIBLE_CACHE__ ?? new Map<string, { data: BibleChapterContent; timestamp: number }>();
if (process.env.NODE_ENV !== 'production') {
  globalThis.__BIBLE_CACHE__ = memoryCache;
}

const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // Lưu trữ 7 ngày

function fastDecodeHtml(str: string): string {
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8203;/g, '')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&amp;/g, '&');
}

/**
 * Tìm sách theo ID, slug hoặc mã viết tắt
 */
export function getBibleBook(identifier: string): BibleBookInfo | undefined {
  if (!identifier) return undefined;
  const clean = identifier.toLowerCase().trim();
  return (
    BIBLE_BOOKS.find(b => b.id.toLowerCase() === clean) ||
    BIBLE_BOOKS.find(b => b.augustinoSlug.toLowerCase() === clean) ||
    BIBLE_BOOKS.find(b => b.code.toLowerCase() === clean) ||
    BIBLE_BOOKS.find(b => b.name.toLowerCase().includes(clean) || b.shortName.toLowerCase().includes(clean))
  );
}

/**
 * Tạo URL chương tương ứng trên augustino.net
 */
export function getAugustinoChapterUrl(book: BibleBookInfo, chapter: number): string {
  if (book.id === 'thanh-vinh' || book.augustinoSlug === 'sach-thanh-vinh') {
    if (chapter <= 1) {
      return 'https://augustino.net/sach-thanh-vinh';
    }
    return `https://augustino.net/thanh-vinh-${chapter}`;
  }

  if (chapter <= 1) {
    return `https://augustino.net/${book.augustinoSlug}`;
  }
  return `https://augustino.net/${book.augustinoSlug}-chuong-${chapter}`;
}

/**
 * Bóc tách nội dung chương Kinh Thánh từ HTML của augustino.net
 */
export function parseAugustinoChapterHtml(html: string, book: BibleBookInfo, chapterNumber: number): BibleChapterContent {
  const chapterUrl = getAugustinoChapterUrl(book, chapterNumber);
  const match = html.match(/<div id="page-content"[^>]*>([\s\S]*?)<\/div>/i);
  const rawHtml = match ? match[1] : html;

  const decoded = fastDecodeHtml(rawHtml);

  // Lọc heading / tiêu đề đoạn
  const headingMatch = decoded.match(/<h3>([\s\S]*?)<\/h3>/i);
  const heading = headingMatch ? headingMatch[1].replace(/<[^>]*>/g, '').trim() : undefined;

  const subheadingMatch = decoded.match(/<p><strong><em>([\s\S]*?)<\/em><\/strong><\/p>/i);
  const subheading = subheadingMatch ? subheadingMatch[1].replace(/<[^>]*>/g, '').trim() : undefined;

  // Bóc tách từng câu (verses)
  const verses: BibleVerse[] = [];
  const verseMatches = Array.from(decoded.matchAll(/<sub id="(\d+)">\s*(\d+)\s*<\/sub>([\s\S]*?)(?=<sub id=|<\/div>|<\/p>|<hr|$)/gi));

  for (const vm of verseMatches) {
    const vNum = parseInt(vm[1], 10);
    const vText = vm[3].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (vNum && vText) {
      verses.push({ number: vNum, text: vText });
    }
  }

  // Tách các đoạn văn sạch
  const paragraphs = decoded
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .split(/<\/(?:p|div|h[1-6])>|<br\s*\/?>/i)
    .map(p => p.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim())
    .filter(p => p.length > 15 && !p.startsWith('Nguyên văn theo') && !p.startsWith('Phần audio do'));

  return {
    book,
    chapterNumber,
    title: `${book.name} - Chương ${chapterNumber}`,
    heading,
    subheading,
    paragraphs: paragraphs.length > 0 ? paragraphs : [`Nội dung Chương ${chapterNumber} của ${book.name}.`],
    verses,
    onlineUrl: chapterUrl,
    iframeUrl: chapterUrl,
    prevChapter: chapterNumber > 1 ? { bookId: book.id, chapter: chapterNumber - 1 } : undefined,
    nextChapter: chapterNumber < book.totalChapters ? { bookId: book.id, chapter: chapterNumber + 1 } : undefined
  };
}

/**
 * Cào động toàn văn chương Kinh Thánh thời gian thực từ augustino.net
 */
export async function getLiveBibleChapter(bookId: string, chapter: number = 1): Promise<BibleChapterContent | null> {
  const book = getBibleBook(bookId);
  if (!book) return null;

  const validChapter = Math.max(1, Math.min(book.totalChapters, chapter || 1));
  const cacheKey = `bible_${book.id}_ch${validChapter}`;
  const cached = memoryCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const url = getAugustinoChapterUrl(book, validChapter);

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8'
      },
      next: { revalidate: 86400 * 7 }
    });

    clearTimeout(timer);

    if (res.ok) {
      const html = await res.text();
      const data = parseAugustinoChapterHtml(html, book, validChapter);
      memoryCache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    }
  } catch (err) {
    console.warn(`[getLiveBibleChapter] Lỗi khi cào dữ liệu từ ${url}:`, err);
  }

  // Fallback an toàn nếu mạng bên ngoài chậm
  const fallbackData: BibleChapterContent = {
    book,
    chapterNumber: validChapter,
    title: `${book.name} - Chương ${validChapter}`,
    paragraphs: [
      `Toàn văn Chương ${validChapter} của ${book.name} (${book.shortName}) - Bản dịch Nhóm Các Giờ Kinh Phụng Vụ (KTCGKPV).`,
      `Nhấn "Xem iFrame Trực Tuyến" để đọc trực tiếp bản văn gốc có âm thanh giọng đọc từ augustino.net.`
    ],
    verses: [],
    onlineUrl: url,
    iframeUrl: url,
    prevChapter: validChapter > 1 ? { bookId: book.id, chapter: validChapter - 1 } : undefined,
    nextChapter: validChapter < book.totalChapters ? { bookId: book.id, chapter: validChapter + 1 } : undefined
  };

  return fallbackData;
}
