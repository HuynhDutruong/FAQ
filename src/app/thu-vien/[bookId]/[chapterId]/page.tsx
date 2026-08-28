'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getChapter } from '@/lib/library';
import BookReader from '@/components/BookReader';

export default function ChapterReaderPage({ params }: { params: Promise<{ bookId: string; chapterId: string }> }) {
  const { bookId, chapterId } = use(params);
  const data = getChapter(bookId, chapterId);

  if (!data) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.4rem', color: 'var(--color-red)' }}>Không tìm thấy chương sách</h1>
        <p style={{ color: 'var(--color-subtle)', marginBottom: '20px' }}>Chương sách này không tồn tại hoặc đã được chuyển dời.</p>
        <Link
          href={`/thu-vien/${bookId}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-red)',
            color: '#FFFFFF',
            fontWeight: 700,
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={16} />
          <span>Xem mục lục sách</span>
        </Link>
      </main>
    );
  }

  const { book, chapter, prevChapter, nextChapter } = data;

  return (
    <BookReader
      book={book}
      chapter={chapter}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
    />
  );
}
