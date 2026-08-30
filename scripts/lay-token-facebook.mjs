#!/usr/bin/env node
/**
 * Đổi User Access Token ngắn hạn (lấy từ Graph API Explorer) thành Page Access
 * Token dài hạn, rồi ghi thẳng vào .env.local.
 *
 * Cách dùng:
 *   node scripts/lay-token-facebook.mjs "EAAX...token-ngan-han..."
 *
 * Vì sao cần: token lấy trực tiếp từ Explorer chỉ sống 1–2 giờ. Sau khi đổi
 * qua hai bước dưới đây, Page Token gần như không hết hạn.
 */
import { readFile, writeFile, copyFile } from 'node:fs/promises';

const shortToken = (process.argv[2] || '').trim().replace(/^["']|["']$/g, '');
if (!shortToken) {
  console.error('Thiếu token. Dùng: node scripts/lay-token-facebook.mjs "EAAX..."');
  process.exit(1);
}

const ENV = '.env.local';
const env = await readFile(ENV, 'utf8');
const read = (k) => (env.match(new RegExp(`^${k}=(.*)$`, 'm'))?.[1] || '').trim().replace(/^["']|["']$/g, '');

const appId = read('NEXT_PUBLIC_FACEBOOK_APP_ID');
const appSecret = read('FACEBOOK_APP_SECRET');
const wantPageId = read('FACEBOOK_PAGE_ID');

if (!appId || !appSecret) {
  console.error('Thiếu NEXT_PUBLIC_FACEBOOK_APP_ID hoặc FACEBOOK_APP_SECRET trong .env.local');
  process.exit(1);
}

const api = async (path, params) => {
  const url = new URL(`https://graph.facebook.com/v20.0/${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url);
  const data = await res.json();
  if (data.error) throw new Error(`${data.error.message} (mã ${data.error.code})`);
  return data;
};

console.log('1/3  Đổi sang User Token dài hạn…');
const longLived = await api('oauth/access_token', {
  grant_type: 'fb_exchange_token',
  client_id: appId,
  client_secret: appSecret,
  fb_exchange_token: shortToken
});

console.log('2/3  Lấy danh sách Trang bạn quản lý…');
const accounts = await api('me/accounts', {
  access_token: longLived.access_token,
  fields: 'id,name,access_token'
});

const pages = accounts.data || [];
if (!pages.length) {
  console.error('Không thấy Trang nào. Kiểm tra bạn đã cấp quyền pages_show_list khi tạo token chưa.');
  process.exit(1);
}

console.log('     Các Trang tìm được:');
pages.forEach((p) => console.log(`       - ${p.name}  (id ${p.id})${p.id === wantPageId ? '   ← Trang trong cấu hình' : ''}`));

const page = pages.find((p) => p.id === wantPageId) || pages[0];
if (!page.access_token) {
  console.error('Trang không trả về Page Token. Cần thêm quyền pages_read_engagement.');
  process.exit(1);
}

console.log(`3/3  Ghi Page Token của "${page.name}" vào ${ENV}…`);
await copyFile(ENV, `${ENV}.truoc-khi-ghi-token`);

const setKey = (text, key, value) =>
  new RegExp(`^${key}=.*$`, 'm').test(text)
    ? text.replace(new RegExp(`^${key}=.*$`, 'm'), `${key}=${value}`)
    : `${text.trimEnd()}\n${key}=${value}\n`;

let out = env;
out = setKey(out, 'FACEBOOK_PAGE_ACCESS_TOKEN', page.access_token);
out = setKey(out, 'FACEBOOK_PAGE_ID', page.id);
out = setKey(out, 'FACEBOOK_PAGE_NAME', page.name);
await writeFile(ENV, out);

console.log('\n✓ Xong. Đã sao lưu bản cũ thành .env.local.truoc-khi-ghi-token');
console.log('  Khởi động lại server để áp dụng.');
console.log('\n  Nhớ thêm cùng ba biến này vào Vercel → Settings → Environment Variables');
console.log('  thì bản chạy thật mới có token (hiện dự án Vercel đang không có biến nào).');
