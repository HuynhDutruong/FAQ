/**
 * Lớp ghi đè văn bản cho các trang nội dung.
 *
 * Nguyên tắc: bản gốc của MỌI đoạn chữ vẫn nằm trong mã nguồn. Firestore chỉ
 * lưu những chỗ Admin đã sửa, dưới dạng `{ khoá: văn bản mới }`. Khi hiển thị,
 * trang lấy `bản sửa ?? bản gốc`.
 *
 * Lợi ích so với việc bê cả trang vào cơ sở dữ liệu:
 *  - Không cần migrate, không sợ mất nội dung.
 *  - Firestore lỗi hay chưa cấu hình thì trang vẫn hiện đầy đủ như cũ.
 *  - Admin chỉ sửa được chữ, không đụng được vào thẻ HTML nên bố cục và cấp
 *    heading (yếu tố SEO của trang này) không thể bị làm vỡ.
 */

export type OverrideMap = Record<string, string>;

export interface PageOverrideDoc {
  slug: string;
  overrides: OverrideMap;
  updatedAt?: string;
  updatedBy?: string;
  version?: number;
}

/** Mô tả một chỗ sửa được, dùng để dựng danh sách trong trang Admin. */
export interface EditableEntry {
  key: string;
  /** Nhóm hiển thị trong Admin, ví dụ "2. Lịch sử" hay "Lý lịch cha sở". */
  group: string;
  /** Nhãn ngắn cho ô nhập. */
  label: string;
  /** Văn bản gốc trong mã nguồn. */
  original: string;
  /** Nhiều dòng thì Admin hiện ô textarea thay vì input. */
  multiline?: boolean;
}

const registry = new Map<string, EditableEntry>();

/**
 * Đăng ký một chỗ sửa được và trả về văn bản sẽ hiển thị.
 *
 * Gọi ngay trong lúc render nên danh sách khoá luôn khớp với những gì thực sự
 * có trên trang — không sợ Admin thấy khoá đã bị xoá khỏi giao diện.
 */
export function registerEditable(entry: EditableEntry): void {
  const existing = registry.get(entry.key);
  // Giữ bản đăng ký đầu tiên; lần render sau không cần ghi đè.
  if (!existing) registry.set(entry.key, entry);
}

export function getRegistry(): EditableEntry[] {
  return [...registry.values()];
}

/** Tạo hàm lấy văn bản đã gắn sẵn bản ghi đè của trang. */
export function createTextGetter(overrides: OverrideMap | null | undefined) {
  return function text(key: string, original: string, meta?: Omit<EditableEntry, 'key' | 'original'>): string {
    registerEditable({
      key,
      original,
      group: meta?.group ?? 'Khác',
      label: meta?.label ?? key,
      multiline: meta?.multiline ?? original.length > 90
    });
    const edited = overrides?.[key];
    return edited != null && edited.trim() !== '' ? edited : original;
  };
}

/**
 * Chỉ giữ lại thẻ định dạng an toàn. Admin sửa chữ chứ không được chèn script,
 * iframe hay thuộc tính sự kiện.
 */
const ALLOWED_TAGS = /^(strong|em|b|i|br|u|sub|sup)$/i;

export function sanitizeRichText(input: string): string {
  return input
    .replace(/<\s*\/?\s*([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (tag, name: string) =>
      ALLOWED_TAGS.test(name) ? tag.replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '') : ''
    )
    .replace(/javascript:/gi, '');
}
