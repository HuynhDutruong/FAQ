import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { withRole } from '@/lib/serverAuth';
import type { PageDocument } from '@/lib/pageContent/types';

const CONTENT_ROLES = ['truyen_thong'];

/** Các trang cho phép sửa qua Admin. */
const EDITABLE_SLUGS = new Set(['gioi-thieu']);

function badSlug(slug: string | null): slug is null {
  return !slug || !EDITABLE_SLUGS.has(slug);
}

/** Đọc bản nội dung hiện hành. Công khai để trang tĩnh dựng lại được. */
export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get('slug');
  if (badSlug(slug)) {
    return NextResponse.json({ error: 'Trang không hợp lệ.' }, { status: 400 });
  }
  try {
    const { adminDb } = await import('@/lib/firebaseAdmin');
    const snap = await adminDb().collection('pageContent').doc(slug).get();
    if (!snap.exists) return NextResponse.json({ doc: null });
    return NextResponse.json({ doc: snap.data() as PageDocument });
  } catch (err) {
    console.error('Không đọc được nội dung trang:', err);
    return NextResponse.json({ doc: null, error: 'Không đọc được nội dung.' }, { status: 200 });
  }
}

/**
 * Lưu bản mới. Mỗi lần lưu ghi thêm một bản sao vào pageContentHistory để có
 * thể đối chiếu và khôi phục — yêu cầu minh bạch về ai sửa gì, lúc nào.
 */
export const PUT = withRole(CONTENT_ROLES, async (request, { email, role }) => {
  const slug = new URL(request.url).searchParams.get('slug');
  if (badSlug(slug)) {
    return NextResponse.json({ error: 'Trang không hợp lệ.' }, { status: 400 });
  }

  let body: PageDocument;
  try {
    body = (await request.json()) as PageDocument;
  } catch {
    return NextResponse.json({ error: 'Dữ liệu gửi lên không đọc được.' }, { status: 400 });
  }
  if (!body || !Array.isArray(body.sections)) {
    return NextResponse.json({ error: 'Thiếu danh sách mục nội dung.' }, { status: 400 });
  }

  try {
    const { adminDb } = await import('@/lib/firebaseAdmin');
    const db = adminDb();
    const ref = db.collection('pageContent').doc(slug);
    const prev = await ref.get();
    const version = ((prev.data()?.version as number) || 0) + 1;

    const doc: PageDocument = {
      ...body,
      slug,
      version,
      updatedAt: new Date().toISOString(),
      updatedBy: email
    };

    await ref.set(doc);

    // Lưu vết bản cũ để đối chiếu; giữ tách khỏi bản đang dùng.
    if (prev.exists) {
      await db
        .collection('pageContentHistory')
        .doc(`${slug}_v${prev.data()?.version || 0}_${Date.now()}`)
        .set({ ...prev.data(), archivedAt: new Date().toISOString(), archivedBy: email, byRole: role });
    }

    // Trang công khai dùng ISR — buộc dựng lại ngay để người xem thấy bản mới.
    revalidatePath('/gioi-thieu');

    return NextResponse.json({ ok: true, version, updatedAt: doc.updatedAt });
  } catch (err) {
    console.error('Không lưu được nội dung trang:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Không lưu được nội dung.' },
      { status: 500 }
    );
  }
});
