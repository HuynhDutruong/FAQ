import { vi } from './locales/vi';

export type Language =
  | 'vi' | 'en' | 'zh' | 'fr' | 'es' | 'ja' | 'ko'
  | 'ru' | 'de' | 'pt' | 'it' | 'ar' | 'hi';

export const LANGUAGES: Language[] = [
  'vi', 'en', 'zh', 'fr', 'es', 'ja', 'ko', 'ru', 'de', 'pt', 'it', 'ar', 'hi'
];

/** Bộ chuỗi gốc, luôn có sẵn trong bundle. */
export { vi };

export type Dictionary = typeof vi;

/**
 * 12 ngôn ngữ còn lại nặng khoảng 100KB. Trước đây tất cả nằm trong bundle
 * khởi động dù phần lớn khách chỉ đọc tiếng Việt — nay nạp theo yêu cầu.
 */
const loaders: Record<Exclude<Language, 'vi'>, () => Promise<{ default: Partial<Dictionary> }>> = {
  en: () => import('./locales/en'),
  zh: () => import('./locales/zh'),
  fr: () => import('./locales/fr'),
  es: () => import('./locales/es'),
  ja: () => import('./locales/ja'),
  ko: () => import('./locales/ko'),
  ru: () => import('./locales/ru'),
  de: () => import('./locales/de'),
  pt: () => import('./locales/pt'),
  it: () => import('./locales/it'),
  ar: () => import('./locales/ar'),
  hi: () => import('./locales/hi')
};

const cache = new Map<Language, Partial<Dictionary>>();

export async function loadDictionary(lang: Language): Promise<Partial<Dictionary>> {
  if (lang === 'vi') return vi;
  const hit = cache.get(lang);
  if (hit) return hit;
  try {
    const mod = await loaders[lang]();
    cache.set(lang, mod.default);
    return mod.default;
  } catch {
    return {}; // hỏng mạng — giữ nguyên tiếng Việt thay vì vỡ giao diện
  }
}

/** Giữ tương thích với mã cũ dùng `translations.vi`. */
export const translations = { vi };
