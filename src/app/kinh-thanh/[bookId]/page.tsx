import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BIBLE_BOOKS, getBibleBookArtwork } from '@/lib/bible';
import { getCatholicBookIntro } from '@/lib/bible/bibleIntroductions';
import BookDetailClient from './BookDetailClient';

interface Props {
  params: Promise<{ bookId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bookId } = await params;
  const book = BIBLE_BOOKS.find((b) => b.id === bookId);

  if (!book) {
    return {
      title: 'Không tìm thấy sách Kinh Thánh'
    };
  }

  const artwork = getBibleBookArtwork(book.id, book.group);
  const intro = getCatholicBookIntro(book.id, book.name, book.groupLabel, book.totalChapters);

  const title = `Sách ${book.name} (${book.code}) • Bộ Sưu Tập Nghệ Thuật Thánh Công Giáo`;
  const description = `"${intro.keyVerse}" — Tác phẩm: ${artwork.title} (Họa sĩ ${artwork.artist}). Dẫn nhập thần học & trọn bộ ${book.totalChapters} chương tại Chánh Tòa Mỹ Tho.`;
  const pageUrl = `https://chanhtoa.tnttgiaophanmytho.online/kinh-thanh/${book.id}`;
  const imageUrl = `https://chanhtoa.tnttgiaophanmytho.online${artwork.imageUrl}`;

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
      siteName: 'Bộ Sưu Tập Lời Chúa & Nghệ Thuật Thánh • Chánh Tòa Mỹ Tho',
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: `${artwork.title} - ${book.name}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `"${intro.keyVerse}"`,
      images: [imageUrl]
    }
  };
}

export default async function BookDetailPage({ params }: Props) {
  const { bookId } = await params;
  const book = BIBLE_BOOKS.find((b) => b.id === bookId);

  if (!book) {
    notFound();
  }

  const artwork = getBibleBookArtwork(book.id, book.group);
  const intro = getCatholicBookIntro(book.id, book.name, book.groupLabel, book.totalChapters);

  return <BookDetailClient book={book} artwork={artwork} intro={intro} />;
}
