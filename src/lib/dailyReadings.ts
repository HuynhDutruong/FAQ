/**
 * Bóc trọn phần Lời Chúa trong ngày (Bài Đọc I, Đáp Ca, Bài Đọc II, Alleluia,
 * Tin Mừng) từ trang loichuahomnay.vn. Thuần chuỗi nên kiểm thử được rời.
 */

export type ReadingKind = 'reading1' | 'psalm' | 'reading2' | 'alleluia' | 'gospel';

export interface ReadingSection {
  kind: ReadingKind;
  label: string;
  /** Trích dẫn Kinh Thánh, ví dụ "Mt 25, 1-13". */
  ref: string;
  /** Câu in nghiêng tóm ý bài đọc. */
  summary?: string;
  /** Câu Đáp của Thánh Vịnh. */
  response?: string;
  paragraphs: string[];
  /** Ngày có nhiều bộ lễ (Giáng Sinh, Phục Sinh) thì đánh số từ 0. */
  group: number;
  /** Tên bộ lễ, ví dụ "Lễ Nửa Đêm Giáng Sinh". */
  mass?: string;
}

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&amp;/g, '&');

const clean = (raw: string) =>
  decode(raw.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();

/** Đ và Ð (chữ Đ kiểu cũ trên trang nguồn) là hai ký tự khác nhau. */
const HEADER =
  /^(bài\s*[đð]ọc\s*(i{1,2}|1|2)|[đð]áp\s*ca|alleluia|phúc\s*âm|tin\s*mừng)\s*[::]?\s*(.*)$/i;

const KINDS: Record<string, { kind: ReadingKind; label: string }> = {
  'bai doc i': { kind: 'reading1', label: 'Bài Đọc I' },
  'bai doc 1': { kind: 'reading1', label: 'Bài Đọc I' },
  'bai doc ii': { kind: 'reading2', label: 'Bài Đọc II' },
  'bai doc 2': { kind: 'reading2', label: 'Bài Đọc II' },
  'dap ca': { kind: 'psalm', label: 'Đáp Ca' },
  alleluia: { kind: 'alleluia', label: 'Alleluia' },
  'phuc am': { kind: 'gospel', label: 'Tin Mừng' },
  'tin mung': { kind: 'gospel', label: 'Tin Mừng' }
};

const bare = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[đð]/gi, 'd').replace(/\s+/g, ' ').trim();

export function parseReadings(html: string): ReadingSection[] {
  // Chỉ lấy khối "LỜI CHÚA (BÀI ĐỌC & TIN MỪNG)", cắt trước phần Suy Niệm
  const start = html.search(/L[ỜO]I\s*CH[ÚU]A[^<]*?(B[ÀA]I\s*[ĐÐD]|TIN\s*M)/i);
  const from = start >= 0 ? start : 0;
  const hr = html.indexOf('<hr', from);
  const body = html.slice(from, hr > 0 ? hr : undefined);

  const sections: ReadingSection[] = [];
  let current: ReadingSection | null = null;
  let group = 0;
  let mass: string | undefined;

  for (const m of body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const raw = m[1];
    const text = clean(raw);
    if (!text) continue;

    // Trang nguồn luôn in đậm dòng tiêu đề — nhờ vậy câu "Tin Mừng Chúa Giêsu
    // Kitô theo Thánh Matthêu" hay "Alleluia, alleluia!" không bị nhận nhầm.
    // Trang nguồn ngăn các bộ lễ trong ngày bằng một dòng dấu cộng
    if (/^\+{3,}$/.test(text)) {
      current = null;
      continue;
    }

    const bold = /<(strong|b)[\s>]/i.test(raw);
    const head = bold ? text.match(HEADER) : null;

    // Dòng in đậm ngắn, không phải tiêu đề bài đọc → tên một bộ lễ khác trong ngày
    if (bold && !head && text.length <= 80 && !/^[đð]áp/i.test(text) && !/[.:;,]$/.test(text)) {
      group++;
      mass = text;
      current = null;
      continue;
    }

    if (head) {
      const key = bare(head[1]);
      const meta = KINDS[key];
      if (meta) {
        current = { kind: meta.kind, label: meta.label, ref: head[3].trim(), paragraphs: [], group, mass };
        sections.push(current);
        continue;
      }
    }

    if (!current) continue;

    const dap = text.match(/^[đð]áp\s*[::]?\s*(.+)$/i);
    if (dap && current.kind === 'psalm' && !current.response) {
      current.response = dap[1].trim();
      continue;
    }

    if (/<em[\s>]/i.test(raw) && !current.summary && current.paragraphs.length === 0) {
      current.summary = text.replace(/^"|"$/g, '');
      continue;
    }

    current.paragraphs.push(text);
  }

  // Alleluia không có câu trích thì bỏ, tránh mục rỗng trong danh sách
  const kept = sections.filter(s => s.paragraphs.length > 0 || s.response || s.summary);

  // Đánh số lại bộ lễ liên tục từ 0 (các dòng in đậm phụ có thể làm nhảy số)
  const order = [...new Set(kept.map(s => s.group))];
  return kept.map(s => ({ ...s, group: order.indexOf(s.group) }));
}
