import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { withRole } from '@/lib/serverAuth';
import { sanitizeRichText, type OverrideMap, type PageOverrideDoc } from '@/lib/pageContent/overrides';

/** Sửa nội dung trang là việc của Ban Truyền Thông; super admin luôn qua được. */
const CONTENT_ROLES = ['truyen_thong'];

const EDITABLE_SLUGS = new Set(['gioi-thieu']);
const MAX_KEYS = 600;
const MAX_LEN = 6000;

function invalidSlug(slug: string | null): slug is null {
  return !slug || !EDITABLE_SLUGS.has(slug);
}

/** Đọc bản ghi đè hiện hành. Công khai vì trang tĩnh cần lấy khi dựng lại. */
export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get('slug');
  if (invalidSlug(slug)) {
    return NextResponse.json({ error: 'Trang không hợp lệ.' }, { status: 400 });
  }
  try {
    const { adminDb } = await import('@/lib/firebaseAdmin');
    const snap = await adminDb().collection('pageContent').doc(slug).get();
    return NextResponse.json({ doc: snap.exists ? (snap.data() as PageOverrideDoc) : null });
  } catch (err) {
    // Chưa cấu hình Firebase Admin hoặc mạng lỗi: trang vẫn dùng bản gốc.
    console.warn('Không đọc được bản ghi đè nội dung:', err);
    return NextResponse.json({ doc: null });
  }
}

export const PUT = withRole(CONTENT_ROLES, async (request, { email, role }) => {
  const slug = new URL(request.url).searchParams.get('slug');
  if (invalidSlug(slug)) {
    return NextResponse.json({ error: 'Trang không hợp lệ.' }, { status: 400 });
  }

  let body: { overrides?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Dữ liệu gửi lên không đọc được.' }, { status: 400 });
  }

  const raw = body.overrides;
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return NextResponse.json({ error: 'Thiếu danh sách nội dung đã sửa.' }, { status: 400 });
  }

  const entries = Object.entries(raw as Record<string, unknown>);
  if (entries.length > MAX_KEYS) {
    return NextResponse.json({ error: `Quá nhiều mục (${entries.length}/${MAX_KEYS}).` }, { status: 413 });
  }

  const overrides: OverrideMap = {};
  for (const [key, value] of entries) {
    if (typeof value !== 'string') continue;
    const clean = sanitizeRichText(value).trim();
    if (clean === '') continue; // bỏ trống = quay về bản gốc trong mã nguồn
    if (clean.length > MAX_LEN) {
      return NextResponse.json({ error: `Mục "${key}" dài quá ${MAX_LEN} ký tự.` }, { status: 413 });
    }
    overrides[key] = clean;
  }

  try {
    const { adminDb } = await import('@/lib/firebaseAdmin');
    const db = adminDb();
    const ref = db.collection('pageContent').doc(slug);
    const prev = await ref.get();
    const version = ((prev.data()?.version as number) || 0) + 1;

    const doc: PageOverrideDoc = {
      slug,
      overrides,
      version,
      updatedAt: new Date().toISOString(),
      updatedBy: email
    };
    await ref.set(doc);

    // Giữ bản cũ để đối chiếu và khôi phục khi cần.
    if (prev.exists) {
      await db
        .collection('pageContentHistory')
        .doc(`${slug}_v${prev.data()?.version ?? 0}_${Date.now()}`)
        .set({ ...prev.data(), archivedAt: new Date().toISOString(), archivedBy: email, byRole: role });
    }

    revalidatePath(`/${slug}`);
    return NextResponse.json({ ok: true, version, count: Object.keys(overrides).length, updatedAt: doc.updatedAt });
  } catch (err) {
    console.error('Không lưu được nội dung:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Không lưu được nội dung.' },
      { status: 500 }
    );
  }
});
