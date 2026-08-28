import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Server-side in-memory translation cache to avoid hitting external APIs repeatedly
const serverTranslationCache = new Map<string, string>();
const MAX_CACHE_SIZE = 5000;

function getCacheKey(text: string, targetLang: string): string {
  return `${targetLang}:::${text.trim()}`;
}

async function translateSingleGoogle(text: string, targetLang: string, sourceLang = 'vi'): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed || targetLang === sourceLang) return trimmed;

  const key = getCacheKey(trimmed, targetLang);
  if (serverTranslationCache.has(key)) {
    return serverTranslationCache.get(key)!;
  }

  let tl = targetLang;
  if (tl === 'zh') tl = 'zh-CN';

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sourceLang)}&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(trimmed)}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return trimmed;
    }

    const data = await res.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const translated = data[0]
        .map((chunk: any) => (Array.isArray(chunk) && chunk[0] ? chunk[0] : ''))
        .join('');

      if (translated) {
        if (serverTranslationCache.size > MAX_CACHE_SIZE) {
          const firstKey = serverTranslationCache.keys().next().value;
          if (firstKey) serverTranslationCache.delete(firstKey);
        }
        serverTranslationCache.set(key, translated);
        return translated;
      }
    }
  } catch (err) {
    // Timeout or network error, fallback to original
  } finally {
    clearTimeout(timeoutId);
  }

  return trimmed;
}

/**
 * Dịch một cụm nhiều văn bản cùng lúc bằng cách gộp nhóm với dấu phân cách độc nhất
 * Giúp giảm từ N lượt gọi HTTP xuống chỉ còn 1 lượt gọi duy nhất!
 */
async function translateBatchGoogle(texts: string[], targetLang: string, sourceLang = 'vi'): Promise<string[]> {
  if (texts.length === 0) return [];
  if (targetLang === sourceLang) return texts;

  const results: (string | null)[] = new Array(texts.length).fill(null);
  const uncachedIndices: number[] = [];
  const uncachedTexts: string[] = [];

  // 1. Kiểm tra bộ nhớ đệm máy chủ trước
  texts.forEach((txt, idx) => {
    const trimmed = (txt || '').trim();
    if (!trimmed) {
      results[idx] = txt;
      return;
    }
    const key = getCacheKey(trimmed, targetLang);
    if (serverTranslationCache.has(key)) {
      results[idx] = serverTranslationCache.get(key)!;
    } else {
      uncachedIndices.push(idx);
      uncachedTexts.push(trimmed);
    }
  });

  if (uncachedTexts.length === 0) {
    return results as string[];
  }

  // 2. Gom tối đa 10 chuỗi vào 1 yêu cầu để dịch siêu nhanh
  const BATCH_SIZE = 10;
  const DELIMITER = ' ___TR_SEP___ ';

  for (let i = 0; i < uncachedTexts.length; i += BATCH_SIZE) {
    const chunkTexts = uncachedTexts.slice(i, i + BATCH_SIZE);
    const chunkIndices = uncachedIndices.slice(i, i + BATCH_SIZE);

    const combinedText = chunkTexts.join(DELIMITER);
    
    // Nếu quá dài (> 2000 ký tự) thì dịch từng cái một để không bị giới hạn URL
    if (combinedText.length > 2000) {
      await Promise.all(
        chunkTexts.map(async (txt, subIdx) => {
          const res = await translateSingleGoogle(txt, targetLang, sourceLang);
          results[chunkIndices[subIdx]] = res;
        })
      );
      continue;
    }

    try {
      const translatedCombined = await translateSingleGoogle(combinedText, targetLang, sourceLang);
      const splitParts = translatedCombined.split(/___tr_sep___|___TR_SEP___/i);

      if (splitParts.length === chunkTexts.length) {
        splitParts.forEach((part, subIdx) => {
          const cleanPart = part.trim();
          const origText = chunkTexts[subIdx];
          const key = getCacheKey(origText, targetLang);
          serverTranslationCache.set(key, cleanPart);
          results[chunkIndices[subIdx]] = cleanPart;
        });
      } else {
        // Nếu bộ phân tách bị Google gom lại sai, dịch dự phòng từng chuỗi
        await Promise.all(
          chunkTexts.map(async (txt, subIdx) => {
            const res = await translateSingleGoogle(txt, targetLang, sourceLang);
            results[chunkIndices[subIdx]] = res;
          })
        );
      }
    } catch {
      chunkTexts.forEach((txt, subIdx) => {
        results[chunkIndices[subIdx]] = txt;
      });
    }
  }

  return results.map((r, i) => (r !== null ? r : texts[i]));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { texts, text, targetLang, sourceLang = 'vi' } = body;

    if (!targetLang) {
      return NextResponse.json({ error: 'Thiếu targetLang' }, { status: 400 });
    }

    if (Array.isArray(texts)) {
      const translations = await translateBatchGoogle(texts, targetLang, sourceLang);
      return NextResponse.json(
        { success: true, translations },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800'
          }
        }
      );
    }

    if (typeof text === 'string') {
      const translated = await translateSingleGoogle(text, targetLang, sourceLang);
      return NextResponse.json(
        { success: true, translation: translated },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800'
          }
        }
      );
    }

    return NextResponse.json({ error: 'Cần cung cấp text hoặc texts' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Translation error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const tl = searchParams.get('tl');
  const sl = searchParams.get('sl') || 'vi';

  if (!q || !tl) {
    return NextResponse.json({ error: 'Thiếu tham số q hoặc tl' }, { status: 400 });
  }

  const translation = await translateSingleGoogle(q, tl, sl);
  return NextResponse.json(
    { success: true, translation },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800'
      }
    }
  );
}
