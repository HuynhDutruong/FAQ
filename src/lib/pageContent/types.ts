/**
 * Mô hình nội dung trang Giới Thiệu cho phép Admin sửa toàn bộ trang.
 *
 * Trang được mô tả thành một chuỗi "khối" (block). Mỗi khối là một loại nội
 * dung có cấu trúc rõ ràng, thay vì một ô HTML tự do — nhờ vậy giao diện công
 * khai luôn giữ đúng bố cục, đúng thẻ heading cho SEO, và Admin không thể vô
 * tình làm vỡ trang bằng thẻ sai.
 */

export type BlockKind =
  | 'heading'
  | 'paragraph'
  | 'quote'
  | 'gallery'
  | 'specs'
  | 'timeline'
  | 'bioList'
  | 'callout';

interface BaseBlock {
  id: string;
  kind: BlockKind;
  /** Ẩn tạm khối mà không xoá — hữu ích khi đang soạn dở. */
  hidden?: boolean;
}

/** Tiêu đề mục. level 2 = mục lớn (2., 3.), level 3 = mục con (2.1, 2.2). */
export interface HeadingBlock extends BaseBlock {
  kind: 'heading';
  level: 2 | 3;
  text: string;
  /** id neo dùng cho mục lục và liên kết trực tiếp. */
  anchor?: string;
}

/** Đoạn văn. Cho phép <strong>, <em>, <a>, <br> — lọc sạch trước khi lưu. */
export interface ParagraphBlock extends BaseBlock {
  kind: 'paragraph';
  html: string;
}

/** Trích dẫn tư liệu, có nguồn. */
export interface QuoteBlock extends BaseBlock {
  kind: 'quote';
  label?: string;
  html: string;
  source?: string;
}

/**
 * Ảnh trong thư viện. Admin KHÔNG tải ảnh lên qua giao diện — `src` trỏ tới
 * tệp đã có sẵn trong public/images. Admin sửa được chú thích, thứ tự và ẩn/hiện.
 */
export interface GalleryImage {
  id: string;
  src: string;
  caption: string;
  hidden?: boolean;
}

export interface GalleryBlock extends BaseBlock {
  kind: 'gallery';
  intro?: string;
  images: GalleryImage[];
  note?: string;
}

/** Bảng thông số hai cột (nhãn — giá trị). */
export interface SpecsBlock extends BaseBlock {
  kind: 'specs';
  rows: { id: string; label: string; value: string }[];
}

/** Một dòng niên biểu: mốc thời gian + nội dung + nguồn. */
export interface TimelineRow {
  id: string;
  period: string;
  title: string;
  note?: string;
  source?: string;
  /** Trỏ tới một lý lịch trong bioList để bấm mở chi tiết. */
  bioId?: string;
}

export interface TimelineBlock extends BaseBlock {
  kind: 'timeline';
  intro?: string;
  columns: [string, string, string, string];
  rows: TimelineRow[];
  note?: string;
}

/** Nhúng danh sách lý lịch (cha sở / Đức Cha) đã lưu riêng. */
export interface BioListBlock extends BaseBlock {
  kind: 'bioList';
  collection: 'pastors' | 'bishops';
  intro?: string;
}

/** Khung nhấn mạnh: danh sách gạch đầu dòng trong hộp màu. */
export interface CalloutBlock extends BaseBlock {
  kind: 'callout';
  title?: string;
  items: { id: string; html: string }[];
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | QuoteBlock
  | GalleryBlock
  | SpecsBlock
  | TimelineBlock
  | BioListBlock
  | CalloutBlock;

/** Một mục lớn của trang (tương ứng <section> và một mục trong mục lục). */
export interface PageSection {
  id: string;
  anchor: string;
  title: string;
  hidden?: boolean;
  blocks: ContentBlock[];
}

export interface PageDocument {
  slug: string;
  title: string;
  intro?: string;
  sections: PageSection[];
  /** Ghi vết để minh bạch: ai sửa, lúc nào. */
  updatedAt?: string;
  updatedBy?: string;
  version?: number;
}

/** Lý lịch nhân vật — dùng chung cho cha sở và Đức Cha. */
export interface BioRecord {
  id: string;
  collection: 'pastors' | 'bishops';
  order: number;
  name: string;
  saintName?: string;
  role: string;
  period: string;
  birth?: string;
  death?: string;
  origin?: string;
  motto?: string;
  mottoLatin?: string;
  priestOrdination?: string;
  bishopConsecration?: string;
  consecrator?: string;
  /** Đường dẫn ảnh có sẵn trong public/images; để trống nếu chưa có tư liệu. */
  image?: string;
  shortDesc: string;
  tableNote?: string;
  /** Xuất xứ thông tin — hiển thị công khai để người đọc tự thẩm định. */
  source?: string;
  chronology: { id: string; time: string; title: string; content: string }[];
  milestones: string[];
  hidden?: boolean;
}
