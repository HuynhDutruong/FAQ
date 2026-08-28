// Kiểm tra: mọi API Facebook phải được bọc withAdmin, và client không được
// đọc/ghi thẳng settings/facebook trong Firestore.
// Chạy: node scripts/check-facebook-auth.mjs
import { readFileSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const API_DIR = 'src/app/api/facebook';

for (const name of readdirSync(API_DIR)) {
  const file = `${API_DIR}/${name}/route.ts`;
  const src = readFileSync(file, 'utf8');
  const handlers = [...src.matchAll(/export\s+(?:const|async function)\s+(GET|POST|PATCH|PUT|DELETE)\b/g)];

  assert.ok(handlers.length > 0, `${file}: không tìm thấy handler nào`);
  for (const [line, method] of handlers.map(m => [m[0], m[1]])) {
    assert.ok(
      new RegExp(`export const ${method} = withAdmin\\(`).test(src),
      `${file}: ${method} chưa được bọc withAdmin (đang là "${line}")`
    );
  }
}

const client = readFileSync('src/components/FacebookAdmin.tsx', 'utf8');
assert.ok(!/firebase\/firestore/.test(client), 'FacebookAdmin.tsx không được truy cập Firestore trực tiếp');
assert.ok(!/selectedPageToken|access_token/.test(client), 'FacebookAdmin.tsx không được chạm tới Page Access Token');
assert.ok(!/[^d]\bfetch\('\/api\/facebook/.test(client), 'FacebookAdmin.tsx phải dùng authedFetch cho mọi API Facebook');

console.log('OK: tất cả API Facebook đều yêu cầu quyền quản trị, client không giữ token.');
