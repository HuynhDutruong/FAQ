'use client';

import { useState, useEffect } from 'react';
import { Language } from './i18n/translations';
import { GOSPEL_VERSES } from './gospelVerses';

// In-memory cache for fast instant lookups during user session
const memoryCache: Record<string, string> = {};

// Helper to hash string for localStorage key
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

/**
 * TỪ ĐIỂN THUẬT NGỮ CÔNG GIÁO CHUẨN XÁC (CATHOLIC ECCLESIASTICAL GLOSSARY)
 * Đảm bảo các danh xưng, phụng vụ, bí tích và tổ chức luôn được dịch chuẩn xác theo Hội Thánh.
 */
const CATHOLIC_TERMS: Record<string, Record<Language, string>> = {
  'xứ đoàn các thánh tử đạo việt nam': {
    vi: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam',
    en: 'Vietnamese Martyrs Chapter',
    zh: '越南殉道圣人善会',
    fr: 'Chapitre des Martyrs du Vietnam',
    es: 'Capítulo de los Mártires de Vietnam',
    ja: 'ベトナム殉教者使徒会',
    ko: '베트남 순교성인 선교회',
    ru: 'Община Мучеников Вьетнама',
    de: 'Gemeinschaft der Märtyrer Vietnams',
    pt: 'Capítulo dos Mártires do Vietnã',
    it: 'Capitolo dei Martiri del Vietnam',
    ar: 'رعية شهداء فيتنام',
    hi: 'वियतनाम के शहीद संघ'
  },
  'giáo xứ chánh tòa': {
    vi: 'Giáo xứ Chánh Tòa',
    en: 'Cathedral Parish',
    zh: '主教座堂堂区',
    fr: 'Paroisse Cathédrale',
    es: 'Parroquia Catedral',
    ja: '司教座聖堂小教区',
    ko: '주교좌 대성당 본당',
    ru: 'Приход Кафедрального собора',
    de: 'Kathedralpfarrei',
    pt: 'Paróquia Catedral',
    it: 'Parrocchia Cattedrale',
    ar: 'رعية الكاتدرائية',
    hi: 'कैथेड्रल पल्ली'
  },
  'giáo phận mỹ tho': {
    vi: 'Giáo phận Mỹ Tho',
    en: 'Diocese of My Tho',
    zh: '美湫教区',
    fr: 'Diocèse de My Tho',
    es: 'Diócesis de My Tho',
    ja: 'ミトー教区',
    ko: '미토 교구',
    ru: 'Епархия Митхо',
    de: 'Diözese My Tho',
    pt: 'Diocese de My Tho',
    it: 'Diocesi di My Tho',
    ar: 'أبرشية مي ثو',
    hi: 'माई थो धर्मप्रांत'
  },
  'hội đồng giám mục việt nam': {
    vi: 'Hội Đồng Giám Mục Việt Nam',
    en: 'Catholic Bishops’ Conference of Vietnam',
    zh: '越南天主教主教团',
    fr: 'Conférence Épiscopale du Vietnam',
    es: 'Conferencia Episcopal de Vietnam',
    ja: 'ベトナム司教協議会',
    ko: '베트남 주교회의',
    ru: 'Конференция Католических Епископов Вьетнама',
    de: 'Bischofskonferenz von Vietnam',
    pt: 'Conferência Episcopal do Vietnã',
    it: 'Conferenza Episcopale del Vietnam',
    ar: 'مجلس أساقفة فيتنام الكاثوليك',
    hi: 'वियतनाम कैथोलिक धर्माध्यक्षीय परिषद'
  },
  'thiếu nhi thánh thể': {
    vi: 'Thiếu Nhi Thánh Thể',
    en: 'Eucharistic Youth Movement',
    zh: '圣体善会',
    fr: 'Mouvement Eucharistique des Jeunes',
    es: 'Movimiento Eucarístico Juvenil',
    ja: '聖体青年会',
    ko: '성체 유소년회',
    ru: 'Евхаристическое движение молодежи',
    de: 'Eucharistische Jugendbewegung',
    pt: 'Movimento Eucarístico Jovem',
    it: 'Movimento Eucaristico Giovanile',
    ar: 'حركة القربان الأقدس للشباب',
    hi: 'यूकेरिस्टिक यूथ मूवमेंट'
  },
  'thánh lễ': {
    vi: 'Thánh Lễ',
    en: 'Holy Mass',
    zh: '圣弥撒',
    fr: 'Sainte Messe',
    es: 'Santa Misa',
    ja: '聖なるミサ',
    ko: '거룩한 미사',
    ru: 'Святая Месса',
    de: 'Heilige Messe',
    pt: 'Santa Missa',
    it: 'Santa Messa',
    ar: 'القداس الإلهي',
    hi: 'पवित्र मिस्सा'
  },
  'tin mừng': {
    vi: 'Tin Mừng',
    en: 'Holy Gospel',
    zh: '圣福音',
    fr: 'Évangile',
    es: 'Santo Evangelio',
    ja: '福音',
    ko: '복음',
    ru: 'Святое Евангелие',
    de: 'Evangelium',
    pt: 'Santo Evangelho',
    it: 'Santo Vangelo',
    ar: 'الإنجيل المقدس',
    hi: 'पवित्र सुसमाचार'
  },
  'lời chúa': {
    vi: 'Lời Chúa',
    en: 'Word of God',
    zh: '天主圣言',
    fr: 'Parole de Dieu',
    es: 'Palabra de Dios',
    ja: '神のみ言葉',
    ko: '하느님 말씀',
    ru: 'Слово Божие',
    de: 'Wort Gottes',
    pt: 'Palavra de Deus',
    it: 'Parola di Dio',
    ar: 'كلمة الله',
    hi: 'ईश्वर का वचन'
  },
  'bí tích thánh thể': {
    vi: 'Bí tích Thánh Thể',
    en: 'Sacrament of the Holy Eucharist',
    zh: '圣体圣事',
    fr: 'Sacrement de l’Eucharistie',
    es: 'Sacramento de la Eucaristía',
    ja: '聖体の秘跡',
    ko: '성체성사',
    ru: 'Таинство Евхаристии',
    de: 'Sakrament der Eucharistie',
    pt: 'Sacramento da Eucaristia',
    it: 'Sacramento dell’Eucaristia',
    ar: 'سر القربان الأقدس',
    hi: 'पवित्र यूकेरिस्ट का संस्कार'
  },
  'bí tích giải tội': {
    vi: 'Bí tích Giải Tội',
    en: 'Sacrament of Reconciliation (Confession)',
    zh: '修和圣事（告解）',
    fr: 'Sacrement de Réconciliation (Confession)',
    es: 'Sacramento de la Reconciliación (Confesión)',
    ja: 'ゆるしの秘跡（告解）',
    ko: '고해성사 (화해의 성사)',
    ru: 'Таинство Исповеди',
    de: 'Sakrament der Versöhnung (Beichte)',
    pt: 'Sacramento da Reconciliação (Confissão)',
    it: 'Sacramento della Riconciliazione (Confessione)',
    ar: 'سر الاعتراف والمصالحة',
    hi: 'पाप स्वीकार और मेल-मिलाप का संस्कार'
  },
  'đức giám mục': {
    vi: 'Đức Giám Mục',
    en: 'Bishop',
    zh: '主教',
    fr: 'Évêque',
    es: 'Obispo',
    ja: '司教',
    ko: '주교',
    ru: 'Епископ',
    de: 'Bischof',
    pt: 'Bispo',
    it: 'Vescovo',
    ar: 'الأسقف',
    hi: 'धर्माध्यक्ष'
  },
  'linh mục': {
    vi: 'Linh Mục',
    en: 'Priest',
    zh: '司铎',
    fr: 'Prêtre',
    es: 'Sacerdote',
    ja: '司祭',
    ko: '사제',
    ru: 'Священник',
    de: 'Priester',
    pt: 'Sacerdote',
    it: 'Sacerdote',
    ar: 'الكاهن',
    hi: 'याजक'
  },
  'cha sở': {
    vi: 'Cha Sở',
    en: 'Parish Priest (Pastor)',
    zh: '本堂神父',
    fr: 'Curé de la Paroisse',
    es: 'Párroco',
    ja: '主任司祭',
    ko: '주임신부',
    ru: 'Настоятель прихода',
    de: 'Pfarrer',
    pt: 'Pároco',
    it: 'Parroco',
    ar: 'كاهن الرعية',
    hi: 'पल्ली पुरोहित'
  },
  'kinh mân côi': {
    vi: 'Kinh Mân Côi',
    en: 'The Holy Rosary',
    zh: '玫瑰经',
    fr: 'Le Saint Rosaire',
    es: 'El Santo Rosario',
    ja: 'ロザリオの祈り',
    ko: '묵주기도',
    ru: 'Святой Розарий',
    de: 'Der Heilige Rosenkranz',
    pt: 'O Santo Terço / Rosário',
    it: 'Il Santo Rosario',
    ar: 'المسبحة الوردية المقدسة',
    hi: 'पवित्र रोजरी माला'
  }
};

/**
 * Trích dẫn Lời Chúa: Kiểm tra xem đoạn văn có khớp với các câu Lời Chúa chuẩn trong hệ thống không.
 */
function findCanonicalGospel(text: string, targetLang: Language): string | null {
  const clean = text.toLowerCase().trim();
  for (const v of GOSPEL_VERSES) {
    if (v.texts.vi && clean.includes(v.texts.vi.toLowerCase().slice(0, 30))) {
      return v.texts[targetLang] || v.texts.en;
    }
  }
  return null;
}

/**
 * Thay thế thuật ngữ chuyên ngành Công Giáo sau khi dịch
 */
function applyCatholicGlossary(translatedText: string, targetLang: Language): string {
  let result = translatedText;
  
  // Áp dụng thuật ngữ chuẩn xác
  for (const [termVi, translations] of Object.entries(CATHOLIC_TERMS)) {
    const correctTarget = translations[targetLang];
    if (!correctTarget) continue;

    // Regex case-insensitive để sửa các từ dịch thô sang thuật ngữ Công Giáo chuẩn
    const enTerm = translations.en;
    if (targetLang === 'en' && enTerm) {
      result = result.replace(new RegExp(`\\b(${termVi}|parish chapter|martyrs team)\\b`, 'gi'), correctTarget);
    }
  }

  return result;
}

/**
 * Dịch hàng loạt (Batch translation) giúp dịch cùng lúc nhiều bài viết chỉ với 1 lượt gọi API duy nhất!
 * Kiểm tra cache siêu tốc trong RAM và LocalStorage trước khi gửi request.
 */
export async function translateClientBatch(texts: string[], targetLang: Language): Promise<string[]> {
  if (!texts || texts.length === 0) return [];
  if (targetLang === 'vi') return texts;

  const results: (string | null)[] = new Array(texts.length).fill(null);
  const uncachedIndices: number[] = [];
  const uncachedTexts: string[] = [];

  // 1. Kiểm tra cache RAM, Thuật ngữ Công Giáo, và LocalStorage
  texts.forEach((txt, idx) => {
    if (!txt || !txt.trim()) {
      results[idx] = txt;
      return;
    }

    const trimmed = txt.trim();
    const cacheKey = `tr_${targetLang}_${hashString(trimmed)}`;

    // Memory cache
    if (memoryCache[cacheKey]) {
      results[idx] = memoryCache[cacheKey];
      return;
    }

    // Canonical Gospel
    const canonical = findCanonicalGospel(trimmed, targetLang);
    if (canonical) {
      memoryCache[cacheKey] = canonical;
      results[idx] = canonical;
      return;
    }

    // Exact Catholic Term
    const lowerTrimmed = trimmed.toLowerCase();
    if (CATHOLIC_TERMS[lowerTrimmed] && CATHOLIC_TERMS[lowerTrimmed][targetLang]) {
      const term = CATHOLIC_TERMS[lowerTrimmed][targetLang];
      memoryCache[cacheKey] = term;
      results[idx] = term;
      return;
    }

    // LocalStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(cacheKey);
        if (stored) {
          memoryCache[cacheKey] = stored;
          results[idx] = stored;
          return;
        }
      } catch {}
    }

    uncachedIndices.push(idx);
    uncachedTexts.push(trimmed);
  });

  // Nếu tất cả đã có trong cache thì trả về ngay 0ms!
  if (uncachedTexts.length === 0) {
    return results as string[];
  }

  // 2. Gửi các chuỗi chưa có trong cache lên máy chủ API dịch lô
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        texts: uncachedTexts,
        targetLang
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.translations) && data.translations.length === uncachedTexts.length) {
        data.translations.forEach((tr: string, i: number) => {
          const enriched = applyCatholicGlossary(tr, targetLang);
          const orig = uncachedTexts[i];
          const cacheKey = `tr_${targetLang}_${hashString(orig)}`;
          memoryCache[cacheKey] = enriched;
          if (typeof window !== 'undefined') {
            try { localStorage.setItem(cacheKey, enriched); } catch {}
          }
          results[uncachedIndices[i]] = enriched;
        });
      }
    }
  } catch (err) {
    console.warn('Batch translation error, fallback to single translation:', err);
  }

  // Điền nốt nếu còn sót bằng bản dịch đơn lẻ hoặc gốc
  return Promise.all(
    results.map((r, i) => (r !== null ? r : translateClientText(texts[i], targetLang)))
  );
}

/**
 * Translates a given Vietnamese text into the target language completely on the client-side.
 * Uses persistent localStorage caching + memory caching + Catholic Theological Glossary.
 */
export async function translateClientText(text: string, targetLang: Language): Promise<string> {
  if (!text || !text.trim() || targetLang === 'vi') {
    return text;
  }

  const trimmed = text.trim();
  const cacheKey = `tr_${targetLang}_${hashString(trimmed)}`;

  // 1. Check in-memory cache
  if (memoryCache[cacheKey]) {
    return memoryCache[cacheKey];
  }

  // 2. Check canonical Gospel scriptures
  const canonicalGospel = findCanonicalGospel(trimmed, targetLang);
  if (canonicalGospel) {
    memoryCache[cacheKey] = canonicalGospel;
    return canonicalGospel;
  }

  // 3. Check exact terminology match
  const lowerTrimmed = trimmed.toLowerCase();
  if (CATHOLIC_TERMS[lowerTrimmed] && CATHOLIC_TERMS[lowerTrimmed][targetLang]) {
    const term = CATHOLIC_TERMS[lowerTrimmed][targetLang];
    memoryCache[cacheKey] = term;
    return term;
  }

  // 4. Check localStorage cache
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(cacheKey);
      if (stored) {
        memoryCache[cacheKey] = stored;
        return stored;
      }
    } catch {}
  }

  try {
    let tl = targetLang as string;
    if (tl === 'zh') tl = 'zh-CN';

    // Thử qua endpoint máy chủ trước (nhanh & có cache chung)
    const serverRes = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmed, targetLang: tl })
    });

    if (serverRes.ok) {
      const serverData = await serverRes.json();
      if (serverData.translation) {
        const enriched = applyCatholicGlossary(serverData.translation, targetLang);
        memoryCache[cacheKey] = enriched;
        if (typeof window !== 'undefined') {
          try { localStorage.setItem(cacheKey, enriched); } catch {}
        }
        return enriched;
      }
    }

    // Dự phòng gọi trực tiếp Google Translate GTX
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(trimmed)}`;
    const response = await fetch(url);
    if (!response.ok) return trimmed;

    const data = await response.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const translated = data[0]
        .map((chunk: any) => (Array.isArray(chunk) && chunk[0] ? chunk[0] : ''))
        .join('');

      if (translated) {
        const enriched = applyCatholicGlossary(translated, targetLang);
        memoryCache[cacheKey] = enriched;
        if (typeof window !== 'undefined') {
          try { localStorage.setItem(cacheKey, enriched); } catch {}
        }
        return enriched;
      }
    }
  } catch (err) {
    console.warn('Client translation error, fallback to original:', err);
  }

  return trimmed;
}

/**
 * Custom React Hook to translate text dynamically in components
 */
export function useClientTranslation(originalText: string, targetLang: Language): { translatedText: string; isTranslating: boolean } {
  const [translatedText, setTranslatedText] = useState(originalText);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    if (!originalText || targetLang === 'vi') {
      setTranslatedText(originalText);
      setIsTranslating(false);
      return;
    }

    const cacheKey = `tr_${targetLang}_${hashString(originalText.trim())}`;
    if (memoryCache[cacheKey]) {
      setTranslatedText(memoryCache[cacheKey]);
      setIsTranslating(false);
      return;
    }

    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(cacheKey);
        if (stored) {
          memoryCache[cacheKey] = stored;
          setTranslatedText(stored);
          setIsTranslating(false);
          return;
        }
      } catch {}
    }

    setIsTranslating(true);
    translateClientText(originalText, targetLang).then(res => {
      if (!isCancelled) {
        setTranslatedText(res);
        setIsTranslating(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [originalText, targetLang]);

  return { translatedText, isTranslating };
}
