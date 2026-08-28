/**
 * Nhận diện nội dung bài Facebook: bài nào là Thông báo, bài nào có video /
 * YouTube / liên kết trực tuyến. Thuần TypeScript nên dùng chung được cho
 * API (server) lẫn giao diện (client).
 */

export type PostKind = 'notice' | 'news';

export interface PostMediaInfo {
  kind: PostKind;
  /** Tệp video Xứ Đoàn tự đăng (mp4/HLS). Video chia sẻ lại không tính vào đây. */
  video: string | null;
  /** iframe dự phòng của Facebook khi không có URL trực tiếp. */
  videoEmbed: string | null;
  youtube: string[];
  links: { url: string; label: string }[];
}

export interface FeedPost extends PostMediaInfo {
  id: string;
  message: string;
  created_time: string;
  full_picture: string | null;
  permalink_url: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

const bare = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/đ/g, 'd');

/** Cụm từ chỉ đích danh một bản thông báo — cố ý hẹp để không nuốt bài chia sẻ. */
const STRONG = [
  'thong bao', 'thong cao', 'thong tri', 'thu moi', 'kinh moi', 'kinh bao', 'kinh gui',
  'v/v', 'trieu tap', 'tuyen sinh', 'chieu sinh', 'ghi danh', 'tb:', 'tb/', '[tb]',
  'dang ky', 'khai giang', 'be giang', 'lich sinh hoat', 'lich hoc',
  'phan cong', 'tam ngung', 'tam nghi', 'tam hoan', 'doi lich', 'thay doi gio',
  'hop mat', 'gay quy', 'quyen gop', 'tin bao'
];

/** Chỉ tính khi nằm ở tiêu đề: giữa thân bài đây là chữ thường ngày. */
const HEAD_ONLY = ['truc tiep', 'truc tuyen', 'chuong trinh'];

/** Dấu hiệu phụ — một mình chưa đủ, cộng dồn mới thành thông báo. */
const MEDIUM = [
  'vui long', 'yeu cau', 'co mat', 'tap trung', 'han chot', 'bat buoc',
  'le phi', 'diem danh', 'mang theo', 'trang phuc', 'dung gio', 'dia diem'
];

const DATE_HINT = /(\b\d{1,2}\s?[hg]\d{0,2}\b)|(\b\d{1,2}\/\d{1,2}(\/\d{2,4})?\b)|(ngay\s+\d{1,2})/;

/**
 * Chấm điểm để tách Thông báo khỏi bài viết thường. Thông báo trên Fanpage
 * gần như luôn nêu ngay ở dòng đầu, nên vị trí xuất hiện nặng ký hơn số lần.
 * Ngưỡng 3 — nới xuống nữa là bài suy niệm, giáo lý bị kéo nhầm sang đây.
 */
export function classifyPost(message: string): { kind: PostKind; score: number } {
  const text = bare(message || '');
  if (!text.trim()) return { kind: 'news', score: 0 };

  const head = bare((message || '').split('\n').slice(0, 2).join(' '));
  let score = 0;

  if (/#\s*thong[ _-]?bao/.test(text)) score += 4;

  const headHits = [...STRONG, ...HEAD_ONLY].filter(k => head.includes(k));
  const hits = new Set([...headHits, ...STRONG.filter(k => text.includes(k))]);
  if (headHits.length) score += 4;
  else if (hits.size) score += 2;
  if (hits.size >= 2) score += 1; // nhắc lại nhiều từ khoá khác nhau thì khó là trùng hợp

  // Bài không nêu chữ "thông báo" vẫn lộ ra qua giọng nhắn việc: dồn đủ 3 dấu hiệu là đủ nặng
  const mediumHits = MEDIUM.filter(k => text.includes(k)).length;
  score += Math.min(mediumHits, 3);
  if (mediumHits >= 3) score += 1;
  else if (mediumHits > 0 && DATE_HINT.test(text)) score += 1;

  return { kind: score >= 3 ? 'notice' : 'news', score };
}

const URL_RE = /https?:\/\/[^\s<>"'\]]+/g;
const YT_RE =
  /(?:youtube\.com\/(?:watch\?(?:[^\s]*&)?v=|embed\/|live\/|shorts\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/g;

/** Gỡ lớp chuyển hướng l.facebook.com và dấu câu dính đuôi URL. */
export function cleanUrl(raw: string): string {
  const trimmed = raw.replace(/[.,;:!?)\]]+$/, '');
  try {
    const u = new URL(trimmed);
    if (u.pathname === '/l.php') {
      const target = u.searchParams.get('u');
      if (target) return decodeURIComponent(target);
    }
  } catch {
    // URL không hợp lệ thì giữ nguyên
  }
  return trimmed;
}

const LINK_LABELS: [RegExp, string][] = [
  [/zoom\.us/, 'Phòng họp Zoom'],
  [/meet\.google\.com/, 'Google Meet'],
  [/(docs\.google\.com\/forms|forms\.gle)/, 'Biểu mẫu đăng ký'],
  [/(drive|docs)\.google\.com/, 'Tài liệu Google'],
  [/fb\.watch|facebook\.com\/[^\s]*\/videos/, 'Video Facebook'],
  [/facebook\.com\/events/, 'Sự kiện Facebook'],
  [/(zalo\.me|chat\.zalo\.me)/, 'Nhóm Zalo'],
  [/t\.me/, 'Telegram'],
  [/tiktok\.com/, 'TikTok'],
  [/\.pdf($|\?)/i, 'Tệp PDF'],
  [/(hdgmvietnam|giaophanmytho|vaticannews)/, 'Trang tin Công Giáo']
];

const labelFor = (url: string) => {
  const found = LINK_LABELS.find(([re]) => re.test(url));
  if (found) return found[1];
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'Mở liên kết';
  }
};

export const youtubeIds = (text: string): string[] =>
  [...(text || '').matchAll(YT_RE)].map(m => m[1]);

interface RawAttachment {
  media_type?: string;
  type?: string;
  url?: string;
  unshimmed_url?: string;
  target?: { url?: string; id?: string };
  media?: { source?: string; image?: { src?: string } };
  subattachments?: { data?: RawAttachment[] };
}

/** Bóc video, YouTube và liên kết bấm được ra khỏi nội dung + attachments. */
export function extractPostMedia(
  message: string,
  permalink: string,
  attachments: RawAttachment[] = []
): PostMediaInfo {
  const flat: RawAttachment[] = [];
  const walk = (list: RawAttachment[]) =>
    list.forEach(a => {
      if (!a) return;
      flat.push(a);
      if (a.subattachments?.data?.length) walk(a.subattachments.data);
    });
  walk(attachments);

  const attachUrls = flat
    .flatMap(a => [a.unshimmed_url, a.url, a.target?.url])
    .filter((u): u is string => !!u)
    .map(cleanUrl);

  const videoAttachment = flat.find(a => (a.media_type || a.type || '').includes('video'));
  const source = videoAttachment?.media?.source || null;

  // Video tự đăng trả về tệp trên CDN của Facebook; video chia sẻ trả về link nhúng
  const video = source && /fbcdn\.net|\.(mp4|m3u8)(\?|$)/.test(source) ? source : null;

  const haystack = [message || '', ...attachUrls, source || ''].join(' ');
  const youtube = [...new Set(youtubeIds(haystack))];

  const isSelf = (u: string) =>
    /facebook\.com\/(photo|permalink)\.php|fbid=|\/photos\/|\/posts\/|story_fbid=/.test(u) ||
    (!!permalink && permalink.startsWith(u));

  const links = [...new Set([...(message || '').match(URL_RE) || [], ...attachUrls].map(cleanUrl))]
    .filter(u => !/(youtube\.com|youtu\.be)/.test(u) && !isSelf(u))
    .slice(0, 5)
    .map(url => ({ url, label: labelFor(url) }));

  return {
    kind: classifyPost(message).kind,
    video,
    // Luôn dựng sẵn iframe: link tệp của Facebook có hạn dùng, hết hạn thì rơi về đây
    videoEmbed:
      (videoAttachment || /fb\.watch|\/videos\//.test(haystack)) && permalink
        ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(permalink)}&show_text=false`
        : null,
    youtube,
    links
  };
}

/** Bài trong cache cũ chưa có nhãn — gắn lại để giao diện không trống. */
export function ensureIntel<T extends { message?: string; permalink_url?: string }>(post: T): T & PostMediaInfo {
  const p = post as T & Partial<PostMediaInfo>;
  if (p.kind) return p as T & PostMediaInfo;
  return { ...p, ...extractPostMedia(p.message || '', p.permalink_url || '', []) } as T & PostMediaInfo;
}
