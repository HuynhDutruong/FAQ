#!/usr/bin/env node
/**
 * Bảo trì ảnh tĩnh trong public/images.
 *
 *   node scripts/optimize-images.mjs           # chỉ báo cáo, không sửa gì
 *   node scripts/optimize-images.mjs --apply   # nén và ghi đè
 *
 * Ảnh gốc nằm trong git nên luôn khôi phục được bằng `git checkout`.
 * Chạy lại nhiều lần không hại: ảnh đã đạt chuẩn sẽ bị bỏ qua.
 */
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/images';
const MAX_WIDTH = 1600;      // không màn hình nào cần ảnh nội dung rộng hơn
const QUALITY = 82;
const SIZE_THRESHOLD = 300 * 1024;
const APPLY = process.argv.includes('--apply');

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(p);
  }
  return out;
}

const files = await walk(ROOT);
let before = 0, after = 0, touched = 0;

for (const file of files) {
  const { size } = await stat(file);
  before += size;

  const meta = await sharp(file).metadata();
  const tooHeavy = size > SIZE_THRESHOLD;
  const tooWide = (meta.width ?? 0) > MAX_WIDTH;

  if (!tooHeavy && !tooWide) { after += size; continue; }

  let pipeline = sharp(file).rotate();
  if (tooWide) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  pipeline = extname(file).toLowerCase() === '.png'
    ? pipeline.png({ compressionLevel: 9, palette: true })
    : pipeline.jpeg({ quality: QUALITY, mozjpeg: true });

  const buf = await pipeline.toBuffer();

  // Chỉ ghi khi thực sự nhỏ hơn — tránh làm ảnh phình lên
  if (buf.length >= size) { after += size; continue; }

  console.log(
    `${file}  ${(size / 1024).toFixed(0)}KB -> ${(buf.length / 1024).toFixed(0)}KB` +
    (tooWide ? `  (${meta.width}px -> ${MAX_WIDTH}px)` : '')
  );
  if (APPLY) await writeFile(file, buf);
  after += buf.length;
  touched++;
}

console.log(
  `\n${files.length} ảnh | ${touched} ảnh cần nén\n` +
  `${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB ` +
  `(giảm ${(100 - (after / before) * 100).toFixed(0)}%)`
);
if (!APPLY && touched) console.log('\nChạy lại với --apply để ghi đè.');
