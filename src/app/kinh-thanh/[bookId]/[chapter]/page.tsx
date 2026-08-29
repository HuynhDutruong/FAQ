import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBibleBook, getLiveBibleChapter, BIBLE_BOOKS } from '@/lib/bible';
import BibleReader from '@/components/BibleReader';

interface Props {
  params: Promise<{ bookId: string; chapter: string }>;
}

/** Chương 1 của 73 sách được prerender sẵn — đây là các URL nằm trong sitemap. */
export function generateStaticParams() {
  return BIBLE_BOOKS.map((b) => ({ bookId: b.id, chapter: '1' }));
}

// Nội dung Kinh Thánh gần như bất biến; cache 7 ngày trùng với TTL của fetcher.
export const revalidate = 604800;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bookId, chapter } = await params;
  const book = getBibleBook(bookId);
  const chapterNumber = parseInt(chapter, 10) || 1;

  if (!book) {
    return { title: 'Không tìm thấy sách Kinh Thánh' };
  }

  const title = `${book.name} - Chương ${chapterNumber} | Kinh Thánh Trọn Bộ (KTCGKPV)`;
  const description = `Đọc toàn văn ${book.name} Chương ${chapterNumber} (Bản dịch của Nhóm Các Giờ Kinh Phụng Vụ & HĐGMVN) tại Cổng thông tin Giáo xứ Chánh Tòa Mỹ Tho.`;
  const pageUrl = `https://chanhtoa.tnttgiaophanmytho.online/kinh-thanh/${book.id}/${chapterNumber}`;
  const imageUrl = `https://chanhtoa.tnttgiaophanmytho.online/images/bible/book_${book.id}.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      type: 'article',
      locale: 'vi_VN',
      url: pageUrl,
      siteName: 'Kinh Thánh Công Giáo • Giáo Xứ Chánh Tòa Mỹ Tho',
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: `${book.name} - Chương ${chapterNumber}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
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
