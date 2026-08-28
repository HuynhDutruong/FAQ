export type Testament = 'old' | 'new';

export type BibleBookGroup =
  | 'pentateuch'       // Ngũ Thư
  | 'historical_ot'   // Lịch Sử Cựu Ước
  | 'wisdom'          // Giáo Huấn & Thi Văn
  | 'prophets_major'  // Đại Ngôn Sứ
  | 'prophets_minor'  // Tiểu Ngôn Sứ
  | 'gospels'         // Tin Mừng (Phúc Âm)
  | 'acts'            // Công Vụ Tông Đồ
  | 'pauline'         // Thư Thánh Phaolô
  | 'catholic_letters'// Thư Chung Tông Đồ
  | 'revelation';     // Khải Huyền

export interface BibleBookInfo {
  id: string;              // e.g. 'sang-the', 'tin-mung-mat-theu'
  augustinoSlug: string;   // e.g. 'sach-sang-the', 'tin-mung-theo-thanh-mat-theu'
  code: string;            // e.g. 'St', 'Mt'
  name: string;            // e.g. 'Sách Sáng Thế', 'Tin Mừng Theo Thánh Mát-thêu'
  shortName: string;       // e.g. 'Sáng Thế', 'Mát-thêu'
  testament: Testament;    // 'old' | 'new'
  group: BibleBookGroup;
  groupLabel: string;
  totalChapters: number;
  summary: string;
  onlineUrl: string;       // Link gốc từ augustino.net
  iframeUrl: string;       // Link nhúng iframe
}

export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapterContent {
  book: BibleBookInfo;
  chapterNumber: number;
  title: string;
  heading?: string;
  subheading?: string;
  paragraphs: string[];
  verses: BibleVerse[];
  onlineUrl: string;
  iframeUrl: string;
  prevChapter?: { bookId: string; chapter: number };
  nextChapter?: { bookId: string; chapter: number };
}

export interface BibleReaderSettings {
  fontSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fontFamily: 'serif' | 'sans';
  theme: 'light' | 'sepia' | 'dark';
  lineHeight: 'normal' | 'relaxed' | 'loose';
}
