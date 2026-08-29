#!/usr/bin/env node
/**
 * Sinh ảnh đại diện 192px (bản 2x của khung 96px) cho 267 Giáo hoàng.
 * Marquee hiển thị ở kích thước cố định nên không cần srcset của next/image.
 * Chạy lại sau khi thêm/đổi ảnh trong public/images/popes.
 */
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const SRC = 'public/images/popes';
const OUT = join(SRC, 'thumb');
await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /^pope_\d+\.jpg$/i.test(f));
let total = 0;

for (const f of files) {
  const dest = join(OUT, f.replace(/\.jpg$/i, '.webp'));
  await sharp(join(SRC, f))
    .resize(192, 192, { fit: 'cover', position: 'top' })
    .webp({ quality: 78 })
    .toFile(dest);
  total += (await stat(dest)).size;
}

console.log(`${files.length} ảnh đại diện -> ${OUT} (${(total / 1024).toFixed(0)} KB tổng)`);
