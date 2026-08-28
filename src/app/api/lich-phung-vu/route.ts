import { NextResponse } from 'next/server';
import { getLiturgicalDay, COLOR_HEX, LiturgicalColor } from '@/lib/liturgicalCalendar';

/**
 * Lịch phụng vụ hôm nay, lấy từ calapi.inadiutorium.cz (lịch chung nghi lễ Rôma).
 * API đó chỉ có tiếng Anh nên phần tên mùa/màu được dịch tại đây.
 * API chỉ chạy HTTP, nên khi hỏng thì rơi về bản tự tính trong liturgicalCalendar.ts.
 */

const SEASONS: Record<string, string> = {
  advent: 'Mùa Vọng',
  christmas: 'Mùa Giáng Sinh',
  lent: 'Mùa Chay',
  easter: 'Mùa Phục Sinh',
  ordinary: 'Mùa Thường Niên'
};

const COLORS: Record<string, LiturgicalColor> = {
  white: 'trắng',
  red: 'đỏ',
  green: 'xanh lục',
  violet: 'tím',
  purple: 'tím',
  rose: 'hồng'
};

const RANKS: Record<string, string> = {
  solemnity: 'Lễ trọng',
  feast: 'Lễ kính',
  memorial: 'Lễ nhớ',
  'optional memorial': 'Lễ nhớ tuỳ ý',
  'ferial': 'Ngày thường',
  'primary liturgical days': 'Lễ trọng',
  'easter triduum': 'Tam Nhật Vượt Qua',
  'sunday': 'Chúa nhật'
};

/**
 * calapi không có locale tiếng Việt. Dịch các từ mô tả chức vụ/bậc lễ,
 * giữ nguyên tên riêng của thánh theo lối viết gốc.
 * ponytail: chỉ đổi từ mô tả. Muốn tên thánh thuần Việt thì cần bảng tên riêng.
 */
const TERMS: [RegExp, string][] = [
  // Lễ lớn phải đặt trước các quy tắc chung (Sunday, Saint...) vì thay thế chạy theo thứ tự.
  [/\bEaster Sunday\b/gi, 'Chúa nhật Phục Sinh'],
  [/\bEaster Vigil\b/gi, 'Canh thức Vượt Qua'],
  [/\bPalm Sunday\b/gi, 'Chúa nhật Lễ Lá'],
  [/\bAsh Wednesday\b/gi, 'Thứ Tư Lễ Tro'],
  [/\bHoly Thursday\b/gi, 'Thứ Năm Tuần Thánh'],
  [/\bGood Friday\b/gi, 'Thứ Sáu Tuần Thánh'],
  [/\bHoly Saturday\b/gi, 'Thứ Bảy Tuần Thánh'],
  [/\bNativity of the Lord\b/gi, 'Lễ Giáng Sinh'],
  [/\bChristmas\b/gi, 'Lễ Giáng Sinh'],
  [/\bEpiphany( of the Lord)?\b/gi, 'Lễ Hiển Linh'],
  [/\bBaptism of the Lord\b/gi, 'Chúa Giêsu chịu phép rửa'],
  [/\bPresentation of the Lord\b/gi, 'Dâng Chúa vào Đền Thánh'],
  [/\bAnnunciation( of the Lord)?\b/gi, 'Lễ Truyền Tin'],
  [/\bTransfiguration( of the Lord)?\b/gi, 'Chúa Hiển Dung'],
  [/\bAscension( of the Lord)?\b/gi, 'Chúa Thăng Thiên'],
  [/\bPentecost\b/gi, 'Chúa Thánh Thần Hiện Xuống'],
  [/\b(Most )?Holy Trinity\b/gi, 'Chúa Ba Ngôi'],
  [/\bCorpus Christi\b/gi, 'Mình và Máu Thánh Chúa'],
  [/\b(Most Holy )?Body and Blood of Christ\b/gi, 'Mình và Máu Thánh Chúa'],
  [/\bSacred Heart of Jesus\b/gi, 'Thánh Tâm Chúa Giêsu'],
  [/\bChrist the King\b/gi, 'Chúa Kitô Vua'],
  [/\bHoly Family\b/gi, 'Thánh Gia'],
  [/\bAssumption( of the Blessed Virgin Mary)?\b/gi, 'Đức Mẹ Lên Trời'],
  [/\bImmaculate Conception\b/gi, 'Đức Mẹ Vô Nhiễm Nguyên Tội'],
  [/\bAll Saints\b/gi, 'Các Thánh Nam Nữ'],
  [/\bAll Souls\b/gi, 'Cầu cho các tín hữu đã qua đời'],
  [/\bExaltation of the Holy Cross\b/gi, 'Suy tôn Thánh Giá'],
  [/\bMother of God\b/gi, 'Mẹ Thiên Chúa'],
  [/\bSaints\b/g, 'Các Thánh'],
  [/\bSaint\b/g, 'Thánh'],
  [/\bBlessed\b/g, 'Chân phước'],
  [/\band his companions\b/gi, 'và các bạn'],
  [/\band companions\b/gi, 'và các bạn'],
  [/\bbishops?\b/gi, 'giám mục'],
  [/\barchbishops?\b/gi, 'tổng giám mục'],
  [/\bpopes?\b/gi, 'giáo hoàng'],
  [/\bpriests?\b/gi, 'linh mục'],
  [/\bdeacons?\b/gi, 'phó tế'],
  [/\bdoctors? of the Church\b/gi, 'tiến sĩ Hội Thánh'],
  [/\band\b/g, 'và'],
  [/\bmartyrs?\b/gi, 'tử đạo'],
  [/\bvirgins?\b/gi, 'trinh nữ'],
  [/\babbots?\b/gi, 'viện phụ'],
  [/\bapostles?\b/gi, 'tông đồ'],
  [/\bevangelists?\b/gi, 'thánh sử'],
  [/\breligious\b/gi, 'tu sĩ'],
  [/\bhermits?\b/gi, 'ẩn sĩ'],
  [/\bmonks?\b/gi, 'đan sĩ'],
  [/\bfounders?\b/gi, 'đấng sáng lập'],
  [/\bBlessed Virgin Mary\b/gi, 'Đức Trinh Nữ Maria'],
  [/\bOur Lady\b/gi, 'Đức Mẹ'],
  [/\bOur Lord Jesus Christ\b/gi, 'Chúa Giêsu Kitô'],
  [/\bSunday\b/gi, 'Chúa nhật'],
  [/\bin Ordinary Time\b/gi, 'Thường Niên'],
  [/\bof Lent\b/gi, 'Mùa Chay'],
  [/\bof Easter\b/gi, 'Mùa Phục Sinh'],
  [/\bof Advent\b/gi, 'Mùa Vọng']
];

const toVietnamese = (title: string) =>
  TERMS.reduce((acc, [re, vi]) => acc.replace(re, vi), title);

interface CalApiCelebration { title: string; colour: string; rank: string }

export async function GET(request: Request) {
  // ?date=YYYY-MM-DD để tra ngày bất kỳ; không truyền thì lấy hôm nay.
  const param = new URL(request.url).searchParams.get('date');
  const parsed = param && /^\d{4}-\d{2}-\d{2}$/.test(param) ? new Date(`${param}T12:00:00`) : null;
  const today = parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date();
  const ymd = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

  try {
    const res = await fetch(`http://calapi.inadiutorium.cz/api/v0/en/calendars/default/${ymd}`, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(6000)
    });
    if (!res.ok) throw new Error(`calapi ${res.status}`);

    const data = await res.json();
    const main: CalApiCelebration | undefined = data.celebrations?.[0];
    const color = COLORS[main?.colour ?? ''] || 'xanh lục';

    return NextResponse.json({
      source: 'calapi',
      date: data.date,
      season: SEASONS[data.season] || data.season,
      week: data.season_week ?? null,
      color,
      colorHex: COLOR_HEX[color],
      celebration: main?.title ? toVietnamese(main.title) : null,
      rank: RANKS[(main?.rank || '').toLowerCase()] || main?.rank || null,
      cycle: getLiturgicalDay(today).cycle
    });
  } catch {
    // Dự phòng: tự tính tại chỗ, vẫn đúng mùa và màu áo lễ.
    const d = getLiturgicalDay(today);
    return NextResponse.json({
      source: 'local',
      date: today.toISOString().slice(0, 10),
      season: d.season,
      week: d.week,
      color: d.color,
      colorHex: COLOR_HEX[d.color],
      celebration: d.feast,
      rank: d.feast ? 'Lễ trọng' : null,
      cycle: d.cycle
    });
  }
}
