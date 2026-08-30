import { NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import sharp from 'sharp';
import { withRole } from '@/lib/serverAuth';

/** Chỉ Ban Truyền Thông (và super admin) được đụng tới ảnh nội dung. */
const CONTENT_ROLES = ['truyen_thong'];

const MAX_UPLOAD_BYTES = 12 * 1024 * 1024; // 12MB đầu vào, sẽ nén xuống nhiều
const MAX_WIDTH = 1600;

export const POST = withRole(CONTENT_ROLES, async (request, { email }) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Chưa cấu hình BLOB_READ_WRITE_TOKEN. Vào Vercel → Storage → Blob để tạo và thêm vào biến môi trường.' },
      { status: 503 }
    );
  }

  const form = await request.formData();
  const file = form.get('file');
  const folder = String(form.get('folder') || 'noi-dung');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Thiếu tệp ảnh.' }, { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Chỉ nhận tệp ảnh (JPG, PNG, WebP, HEIC).' }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: `Ảnh quá lớn (${(file.size / 1048576).toFixed(1)}MB). Giới hạn 12MB.` },
      { status: 413 }
    );
  }

  // Nén ngay tại máy chủ: ảnh điện thoại thường 3–8MB, đưa về 1600px/JPEG q84
  // giúp trang công khai nhẹ và tiết kiệm hạn mức Blob.
  const input = Buffer.from(await file.arrayBuffer());
  let output: Buffer;
  let width = 0;
  let height = 0;
  try {
    const pipeline = sharp(input).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
    output = await pipeline.jpeg({ quality: 84, mozjpeg: true }).toBuffer();
    const meta = await sharp(output).metadata();
    width = meta.width ?? 0;
    height = meta.height ?? 0;
  } catch {
    return NextResponse.json({ error: 'Không đọc được tệp ảnh. Thử lưu lại dạng JPG rồi tải lên.' }, { status: 400 });
  }

  const safeFolder = folder.replace(/[^a-z0-9-]/gi, '').slice(0, 40) || 'noi-dung';
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  const path = `${safeFolder}/${stamp}-${rand}.jpg`;

  const blob = await put(path, output, {
    access: 'public',
    contentType: 'image/jpeg',
    addRandomSuffix: false
  });

  return NextResponse.json({
    url: blob.url,
    blobPath: blob.pathname,
    width,
    height,
    bytes: output.length,
    uploadedBy: email
  });
});

export const DELETE = withRole(CONTENT_ROLES, async (request) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Chưa cấu hình BLOB_READ_WRITE_TOKEN.' }, { status: 503 });
  }
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'Thiếu tham số url.' }, { status: 400 });
  try {
    await del(url);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Không xoá được tệp.' },
      { status: 500 }
    );
  }
});
