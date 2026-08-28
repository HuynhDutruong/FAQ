import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

const RATINGS = 'ratings';
const STATS_DOC = ['stats', 'site'] as const;
const VN_TZ = 'Asia/Ho_Chi_Minh';

async function statsRef() {
  const { adminDb } = await import('@/lib/firebaseAdmin');
  return adminDb().collection(STATS_DOC[0]).doc(STATS_DOC[1]);
}

/** Ngày và giờ theo múi giờ Việt Nam — máy chủ Vercel chạy giờ UTC. */
function vnNow(when = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: VN_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false
  }).formatToParts(when);
  const get = (type: string) => parts.find(p => p.type === type)?.value || '00';
  return { date: `${get('year')}-${get('month')}-${get('day')}`, hour: Number(get('hour')) % 24 };
}

/** Chuỗi ngày YYYY-MM-DD lùi về trước, dùng để đọc thống kê mấy ngày gần đây. */
function recentDates(days: number, from: string) {
  const anchor = new Date(`${from}T00:00:00Z`).getTime();
  return Array.from({ length: days }, (_, i) =>
    new Date(anchor - i * 86400000).toISOString().slice(0, 10)
  );
}

function summarise(data: Record<string, unknown> | undefined) {
  const count = Number(data?.ratingCount || 0);
  const sum = Number(data?.ratingSum || 0);
  return {
    // visitsSeed: số mồi do quản trị đặt cho giai đoạn trước khi có bộ đếm
    visits: Number(data?.visits || 0) + Number(data?.visitsSeed || 0),
    count,
    average: count > 0 ? Math.round((sum / count) * 10) / 10 : 0,
    stars: (data?.stars as Record<string, number>) || {}
  };
}

// 1. Số liệu công khai cho widget ngoài trang chủ (kèm cộng lượt truy cập nếu là phiên mới)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get('list') === '1') {
    const { withAdmin } = await import('@/lib/serverAuth');
    return withAdmin(async () => {
      const { adminDb } = await import('@/lib/firebaseAdmin');
      const ref = await statsRef();
      const dates = recentDates(7, vnNow().date);
      const [snap, stats, dayDocs] = await Promise.all([
        adminDb().collection(RATINGS).orderBy('createdAt', 'desc').limit(300).get(),
        ref.get(),
        ref.collection('days').where('date', 'in', dates).get()
      ]);

      const byDate = new Map(dayDocs.docs.map(d => [d.id, d.data()]));
      const days = dates
        .slice()
        .reverse()
        .map(date => {
          const d = byDate.get(date);
          return {
            date,
            total: Number(d?.total || 0),
            hours: Array.from({ length: 24 }, (_, h) => Number(d?.[`h${h}`] || 0))
          };
        });

      return NextResponse.json({
        ...summarise(stats.data()),
        visitsReal: Number(stats.data()?.visits || 0),
        visitsSeed: Number(stats.data()?.visitsSeed || 0),
        today: days[days.length - 1]?.total || 0,
        days,
        ratings: snap.docs.map(d => {
          const r = d.data();
          return {
            id: d.id,
            stars: r.stars,
            comment: r.comment || '',
            createdAt: r.createdAt?.toDate?.()?.toISOString() || null
          };
        })
      });
    })(request);
  }

  try {
    const ref = await statsRef();
    const { date, hour } = vnNow();
    const dayRef = ref.collection('days').doc(date);

    // ponytail: đếm theo phiên trình duyệt, đủ dùng cho trang giáo xứ; cần chính xác hơn thì chặn theo IP
    if (searchParams.get('visit') === '1') {
      await Promise.all([
        ref.set({ visits: FieldValue.increment(1) }, { merge: true }),
        dayRef.set({ date, total: FieldValue.increment(1), [`h${hour}`]: FieldValue.increment(1) }, { merge: true })
      ]);
    }

    const pageId = (process.env.FACEBOOK_PAGE_ID || '').trim();
    const snap = await ref.get();
    return NextResponse.json({
      ...summarise(snap.data()),
      fbReviewUrl: pageId ? `https://www.facebook.com/${pageId}/reviews` : null
    });
  } catch (err) {
    console.warn('Không đọc được số liệu đánh giá:', err);
    return NextResponse.json({ visits: 0, count: 0, average: 0, stars: {}, unavailable: true });
  }
}

// 2. Người dùng gửi đánh giá
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const stars = Number(body?.stars);
    const comment = String(body?.comment || '').trim().slice(0, 800);

    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
      return NextResponse.json({ error: 'Số sao không hợp lệ.' }, { status: 400 });
    }
    if (stars < 3 && comment.length < 10) {
      return NextResponse.json(
        { error: 'Xin cho biết điều chưa hài lòng (ít nhất 10 ký tự) để chúng tôi sửa.' },
        { status: 400 }
      );
    }

    const { adminDb } = await import('@/lib/firebaseAdmin');
    await adminDb().collection(RATINGS).add({
      stars,
      comment,
      lang: String(body?.lang || 'vi').slice(0, 5),
      createdAt: FieldValue.serverTimestamp()
    });

    const ref = await statsRef();
    await ref.set(
      {
        ratingCount: FieldValue.increment(1),
        ratingSum: FieldValue.increment(stars),
        stars: { [stars]: FieldValue.increment(1) }
      },
      { merge: true }
    );

    const snap = await ref.get();
    return NextResponse.json({ success: true, ...summarise(snap.data()) });
  } catch (err) {
    console.error('Lỗi lưu đánh giá:', err);
    return NextResponse.json({ error: 'Chưa gửi được đánh giá, vui lòng thử lại.' }, { status: 500 });
  }
}

// 3. Quản trị đặt số lượt truy cập mồi (giai đoạn trước khi có bộ đếm)
export async function PATCH(request: Request) {
  const { withAdmin } = await import('@/lib/serverAuth');
  return withAdmin(async (req: Request) => {
    const body = await req.json();
    const seed = Number(body?.seed);
    if (!Number.isFinite(seed) || seed < 0 || seed > 10_000_000) {
      return NextResponse.json({ error: 'Số lượt mồi không hợp lệ.' }, { status: 400 });
    }

    const ref = await statsRef();
    await ref.set({ visitsSeed: Math.round(seed) }, { merge: true });
    const snap = await ref.get();
    return NextResponse.json({ success: true, ...summarise(snap.data()) });
  })(request);
}

// 4. Quản trị xoá một đánh giá (số tổng hợp trừ lại tương ứng)
export async function DELETE(request: Request) {
  const { withAdmin } = await import('@/lib/serverAuth');
  return withAdmin(async (req: Request) => {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Thiếu id đánh giá cần xoá.' }, { status: 400 });

    const { adminDb } = await import('@/lib/firebaseAdmin');
    const docRef = adminDb().collection(RATINGS).doc(id);
    const snap = await docRef.get();
    if (!snap.exists) return NextResponse.json({ error: 'Đánh giá không còn tồn tại.' }, { status: 404 });

    const stars = Number(snap.data()?.stars || 0);
    await docRef.delete();

    if (stars >= 1 && stars <= 5) {
      await (await statsRef()).set(
        {
          ratingCount: FieldValue.increment(-1),
          ratingSum: FieldValue.increment(-stars),
          stars: { [stars]: FieldValue.increment(-1) }
        },
        { merge: true }
      );
    }

    return NextResponse.json({ success: true, id });
  })(request);
}
