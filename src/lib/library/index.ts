import { Book, BookCategory, BookChapter } from './types';
import { TNTT_BOOKS } from './tnttBooks';
import { SAINTS_BOOKS } from './saintsBooks';
import { BIBLE_BOOKS } from './bibleBooks';
import { MEDITATION_BOOKS } from './meditationBooks';
import { removeAccents } from '@/lib/massTimes';

export * from './types';
export { TNTT_BOOKS, SAINTS_BOOKS, BIBLE_BOOKS, MEDITATION_BOOKS };

export const ALL_BOOKS: Book[] = [
  ...TNTT_BOOKS,
  ...SAINTS_BOOKS,
  ...BIBLE_BOOKS,
  ...MEDITATION_BOOKS
];

export const BOOK_CATEGORIES: { id: BookCategory | 'all'; label: string; count: number; description: string }[] = [
  { id: 'all', label: 'Tất Cả Sách', count: ALL_BOOKS.length, description: 'Toàn bộ kho tàng sách và tài liệu Công giáo & TNTT' },
  { id: 'tntt', label: 'Thiếu Nhi Thánh Thể', count: TNTT_BOOKS.length, description: 'Nghi thức, Điều lệ, Cẩm nang Huynh trưởng & Lịch sử phong trào' },
  { id: 'saints', label: 'Hạnh Các Thánh', count: SAINTS_BOOKS.length, description: '117 Thánh Tử Đạo Việt Nam & Gương Thánh Nhân 365 Ngày' },
  { id: 'bible', label: 'Kinh Thánh Trọn Bộ', count: BIBLE_BOOKS.length, description: '73 Sách Cựu Ước & Tân Ước đầy đủ chương mục và chú giải' },
  { id: 'meditation', label: 'Linh Đạo & Suy Niệm', count: MEDITATION_BOOKS.length, description: 'Gương Chúa Giêsu, Đường Hy Vọng & Phút Hồi Tâm mỗi ngày' }
];

export function getAllBooks(): Book[] {
  return ALL_BOOKS;
}

export function getBookById(id: string): Book | undefined {
  return ALL_BOOKS.find(b => b.id === id);
}

export function getBooksByCategory(category: BookCategory | 'all'): Book[] {
  if (category === 'all') return ALL_BOOKS;
  return ALL_BOOKS.filter(b => b.category === category);
}

export function getChapter(bookId: string, chapterId: string): { book: Book; chapter: BookChapter; prevChapter?: BookChapter; nextChapter?: BookChapter } | null {
  const book = getBookById(bookId);
  if (!book) return null;

  const index = book.chapters.findIndex(c => c.id === chapterId);
  if (index === -1) return null;

  const chapter = book.chapters[index];
  const prevChapter = index > 0 ? book.chapters[index - 1] : undefined;
  const nextChapter = index < book.chapters.length - 1 ? book.chapters[index + 1] : undefined;

  return { book, chapter, prevChapter, nextChapter };
}

export function searchBooks(query: string, category: BookCategory | 'all' = 'all'): Book[] {
  const cleanQ = removeAccents(query.toLowerCase().trim());
  let list = category === 'all' ? ALL_BOOKS : ALL_BOOKS.filter(b => b.category === category);

  if (!cleanQ) return list;

  return list.filter(b => {
    const matchTitle = removeAccents(b.title.toLowerCase()).includes(cleanQ);
    const matchAuthor = removeAccents(b.author.toLowerCase()).includes(cleanQ);
    const matchSummary = removeAccents(b.summary.toLowerCase()).includes(cleanQ);
    const matchTags = b.tags.some(t => removeAccents(t.toLowerCase()).includes(cleanQ));
    const matchChapter = b.chapters.some(c =>
      removeAccents(c.title.toLowerCase()).includes(cleanQ) ||
      (c.subtitle && removeAccents(c.subtitle.toLowerCase()).includes(cleanQ))
    );
    return matchTitle || matchAuthor || matchSummary || matchTags || matchChapter;
  });
}
