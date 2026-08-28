// Kiểm tra nhanh: node --experimental-strip-types src/lib/liturgicalCalendar.test.mjs
import assert from 'node:assert';
import { easterSunday, firstSundayOfAdvent, getLiturgicalDay } from './liturgicalCalendar.ts';

const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Ngày Phục Sinh đã biết
assert.equal(iso(easterSunday(2024)), '2024-03-31');
assert.equal(iso(easterSunday(2025)), '2025-04-20');
assert.equal(iso(easterSunday(2026)), '2026-04-05');
assert.equal(iso(easterSunday(2027)), '2027-03-28');

// Chúa nhật I Mùa Vọng
assert.equal(iso(firstSundayOfAdvent(2025)), '2025-11-30');
assert.equal(iso(firstSundayOfAdvent(2026)), '2026-11-29');

// Mùa phụng vụ tại vài mốc của năm 2026 (Phục Sinh 05/04)
assert.equal(getLiturgicalDay(new Date(2026, 1, 18)).season, 'Mùa Chay');       // Thứ Tư Lễ Tro
assert.equal(getLiturgicalDay(new Date(2026, 2, 30)).season, 'Tuần Thánh');     // Thứ Hai Tuần Thánh
assert.equal(getLiturgicalDay(new Date(2026, 3, 5)).season, 'Mùa Phục Sinh');
assert.equal(getLiturgicalDay(new Date(2026, 4, 24)).season, 'Mùa Phục Sinh');  // Hiện Xuống
assert.equal(getLiturgicalDay(new Date(2026, 7, 28)).season, 'Mùa Thường Niên');
assert.equal(getLiturgicalDay(new Date(2026, 11, 6)).season, 'Mùa Vọng');
assert.equal(getLiturgicalDay(new Date(2026, 11, 27)).season, 'Mùa Giáng Sinh');

// Màu áo lễ và lễ trọng cố định
assert.equal(getLiturgicalDay(new Date(2026, 1, 18)).color, 'tím');
assert.equal(getLiturgicalDay(new Date(2026, 7, 28)).color, 'xanh lục');
assert.equal(getLiturgicalDay(new Date(2026, 10, 24)).feast, 'Các Thánh Tử Đạo Việt Nam');
assert.equal(getLiturgicalDay(new Date(2026, 10, 24)).color, 'đỏ');

// Chu kỳ A/B/C đổi tại Mùa Vọng: năm phụng vụ 2026 (từ 30/11/2025) là năm A,
// năm phụng vụ 2027 (từ 29/11/2026) là năm B.
assert.equal(getLiturgicalDay(new Date(2026, 7, 28)).cycle, 'A');
assert.equal(getLiturgicalDay(new Date(2026, 11, 6)).cycle, 'B');

console.log('liturgicalCalendar: tat ca kiem tra deu dat');
