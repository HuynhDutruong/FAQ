/**
 * Lịch phụng vụ Công giáo (nghi lễ Rôma) tính tại chỗ, không cần gọi API ngoài.
 * Đủ cho widget trang chủ: mùa phụng vụ, tuần, màu áo lễ, năm A/B/C.
 *
 * ponytail: chỉ tính mùa + các lễ trọng cố định phổ biến, không tra cứu
 * lễ nhớ các thánh theo ngày. Cần đầy đủ thì đổi sang dữ liệu lịch riêng.
 */

export type LiturgicalColor = 'trắng' | 'đỏ' | 'xanh lục' | 'tím' | 'hồng';

export interface LiturgicalDay {
  season: string;
  week: number | null;
  color: LiturgicalColor;
  cycle: 'A' | 'B' | 'C';
  feast: string | null;
}

const DAY = 86400000;
const atMidnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * DAY);
const daysBetween = (a: Date, b: Date) => Math.round((atMidnight(a).getTime() - atMidnight(b).getTime()) / DAY);

/** Ngày Phục Sinh theo thuật toán Meeus/Jones/Butcher (lịch Gregorian). */
export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

/** Chúa nhật thứ nhất Mùa Vọng: Chúa nhật thứ tư trước lễ Giáng Sinh. */
export function firstSundayOfAdvent(year: number): Date {
  const christmas = new Date(year, 11, 25);
  return addDays(christmas, -(christmas.getDay() === 0 ? 7 : christmas.getDay()) - 21);
}

const FIXED_FEASTS: Record<string, { name: string; color: LiturgicalColor }> = {
  '12-25': { name: 'Lễ Giáng Sinh', color: 'trắng' },
  '01-01': { name: 'Đức Maria, Mẹ Thiên Chúa', color: 'trắng' },
  '01-06': { name: 'Lễ Hiển Linh', color: 'trắng' },
  '03-19': { name: 'Thánh Giuse', color: 'trắng' },
  '03-25': { name: 'Truyền Tin', color: 'trắng' },
  '06-29': { name: 'Thánh Phêrô và Phaolô', color: 'đỏ' },
  '08-15': { name: 'Đức Mẹ Lên Trời', color: 'trắng' },
  '11-01': { name: 'Các Thánh Nam Nữ', color: 'trắng' },
  '11-02': { name: 'Cầu cho các tín hữu đã qua đời', color: 'tím' },
  '11-24': { name: 'Các Thánh Tử Đạo Việt Nam', color: 'đỏ' },
  '12-08': { name: 'Đức Mẹ Vô Nhiễm Nguyên Tội', color: 'trắng' }
};

export function getLiturgicalDay(date: Date = new Date()): LiturgicalDay {
  const today = atMidnight(date);
  const year = today.getFullYear();

  const easter = easterSunday(year);
  const ashWednesday = addDays(easter, -46);
  const palmSunday = addDays(easter, -7);
  const holyThursday = addDays(easter, -3);
  const pentecost = addDays(easter, 49);
  const adventThisYear = firstSundayOfAdvent(year);
  const adventLastYear = firstSundayOfAdvent(year - 1);

  // Năm phụng vụ bắt đầu từ Mùa Vọng nên chu kỳ A/B/C tính theo mốc đó.
  const liturgicalYear = today >= adventThisYear ? year + 1 : year;
  const cycle = (['C', 'A', 'B'] as const)[liturgicalYear % 3];

  const key = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const fixed = FIXED_FEASTS[key] || null;

  const build = (season: string, week: number | null, color: LiturgicalColor): LiturgicalDay => ({
    season,
    week,
    color: fixed ? fixed.color : color,
    cycle,
    feast: fixed ? fixed.name : null
  });

  // Giáng Sinh cắt ngang Mùa Vọng nên phải xét trước.
  if (today >= new Date(year, 11, 25)) {
    return build('Mùa Giáng Sinh', null, 'trắng');
  }
  if (today >= adventThisYear) {
    return build('Mùa Vọng', Math.floor(daysBetween(today, adventThisYear) / 7) + 1, 'tím');
  }
  // Mùa Giáng Sinh kéo tới lễ Chúa Giêsu chịu phép rửa (Chúa nhật sau 06/01).
  const epiphany = new Date(year, 0, 6);
  const baptism = addDays(epiphany, epiphany.getDay() === 0 ? 7 : 7 - epiphany.getDay());
  if (today <= baptism && today >= adventLastYear) {
    return build('Mùa Giáng Sinh', null, 'trắng');
  }
  if (today >= ashWednesday && today < palmSunday) {
    return build('Mùa Chay', Math.floor(daysBetween(today, ashWednesday) / 7) + 1, 'tím');
  }
  if (today >= palmSunday && today < holyThursday) {
    return build('Tuần Thánh', null, 'đỏ');
  }
  if (today >= holyThursday && today < easter) {
    return build('Tam Nhật Vượt Qua', null, 'trắng');
  }
  if (today >= easter && today <= pentecost) {
    return build('Mùa Phục Sinh', Math.floor(daysBetween(today, easter) / 7) + 1, 'trắng');
  }

  // Thường Niên: đoạn đầu từ sau lễ Chúa chịu phép rửa, đoạn sau nối tiếp từ sau Hiện Xuống.
  if (today < ashWednesday) {
    return build('Mùa Thường Niên', Math.floor(daysBetween(today, baptism) / 7) + 1, 'xanh lục');
  }
  const weeksBeforeAdvent = Math.floor(daysBetween(adventThisYear, today) / 7);
  return build('Mùa Thường Niên', 34 - weeksBeforeAdvent, 'xanh lục');
}

export const COLOR_HEX: Record<LiturgicalColor, string> = {
  'trắng': '#E8E8E8',
  'đỏ': '#D32F2F',
  'xanh lục': '#2E7D32',
  'tím': '#6A1B9A',
  'hồng': '#EC407A'
};
