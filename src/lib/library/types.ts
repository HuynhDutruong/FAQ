export type BookCategory = 'tntt' | 'saints' | 'bible' | 'meditation';

export interface BookChapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  summary?: string;
  content: string[]; // Các đoạn văn / câu văn bản
  scriptureRefs?: string[];
}

export interface Book {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  category: BookCategory;
  categoryLabel: string;
  coverColor: string;
  coverImage?: string;
  badge?: string;
  summary: string;
  description: string;
  totalChapters: number;
  estimatedReadingMinutes: number;
  publishYear?: string;
  chapters: BookChapter[];
  tags: string[];
  featured?: boolean;
}

export interface ReaderSettings {
  fontSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fontFamily: 'serif' | 'sans';
  theme: 'light' | 'sepia' | 'dark';
  lineHeight: 'normal' | 'relaxed' | 'loose';
}

export interface ReadingProgress {
  bookId: string;
  chapterId: string;
  chapterNumber: number;
  percentage: number;
  lastReadAt: string;
}
