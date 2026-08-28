import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBibleBook, getLiveBibleChapter, BIBLE_BOOKS } from '@/lib/bible';
import BibleReader from '@/components/BibleReader';

interface Props {
  params: Promise<{ bookId: string; chapter: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bookId, chapter } = await params;
  const book = getBibleBook(bookId);
  const chapterNumber = parseInt(chapter, 10) || 1;

  if (!book) {
    return { title: 'Không tìm thấy sách Kinh Thánh' };
  }

  return {
    title: `${book.name} - Chương ${chapterNumber} | Kinh Thánh Trọn Bộ (KTCGKPV)`,
    description: `Đọc toàn văn ${book.name} Chương ${chapterNumber} (Bản dịch của Nhóm Các Giờ Kinh Phụng Vụ & HĐGMVN) tại Cổng thông tin Giáo xứ Chánh Tòa Mỹ Tho.`,
    alternates: {
      canonical: `https://augustino.net/${book.augustinoSlug}${chapterNumber > 1 ? `-chuong-${chapterNumber}` : ''}`
    }
  };
}

export default async function BibleChapterPage({ params }: Props) {
  const { bookId, chapter } = await params;
  const book = getBibleBook(bookId);
  const chapterNumber = parseInt(chapter, 10) || 1;

  if (!book) {
    notFound();
  }

  const chapterData = await getLiveBibleChapter(book.id, chapterNumber);
  if (!chapterData) {
    notFound();
  }

  return <BibleReader initialData={chapterData} />;
}
