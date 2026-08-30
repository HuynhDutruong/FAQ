import { db } from './firebase';
import {
  collection, doc, getDocs, query, where, addDoc, updateDoc, deleteDoc, getDoc, setDoc, serverTimestamp, Timestamp
} from 'firebase/firestore';

export interface MassTime {
  id: string;
  parish: string;
  diocese: string;
  deanery: string;
  province: string;
  address: string;
  weekdayMass: string[];
  /** Lễ chiều Thứ Bảy (lễ vọng Chúa Nhật) — giole.vn tách riêng bucket này. */
  saturdayMass?: string[];
  sundayMass: string[];
  /**
   * Giờ lễ chi tiết theo từng thứ — chỉ có ở nhà thờ lấy từ gioleconggiao.com.
   * null = admin đã sửa tay và chọn dùng cặp ngày thường / Chúa Nhật thay thế.
   */
  byDay?: Record<string, string[]> | null;
  lat?: number | null;
  lng?: number | null;
  source?: string;
}

export interface MassTimeFeedback {
  id: string;
  type: 'suggest_new' | 'suggest_edit';
  targetMassTimeId?: string;
  parish: string;
  diocese: string;
  deanery?: string;
  province: string;
  address: string;
  weekdayMass: string[];
  saturdayMass?: string[];
  sundayMass: string[];
  note?: string;
  contactName?: string;
  contactPhone?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectReason?: string;
  createdAt?: Timestamp;
  reviewedAt?: Timestamp;
  reviewedBy?: string;
}

export const massCol = collection(db, 'massTimes');
export const massFeedbackCol = collection(db, 'massTimeFeedback');
const metaRef = doc(db, 'massTimesMeta', 'dioceses');

export interface Bucket { name: string; count: number }

/**
 * Thông tin & Giờ lễ Nhà Thờ Chánh Tòa Mỹ Tho mặc định (đồng bộ Firestore).
 */
export const DEFAULT_CHANH_TOA_INFO: MassTime = {
  id: 'mt-my-tho-chanh-toa',
  parish: 'Giáo xứ Chánh Tòa',
  diocese: 'Mỹ Tho',
  deanery: 'Mỹ Tho',
  province: 'Tiền Giang',
  address: '32 Hùng Vương, Phường 7, TP. Mỹ Tho, Tiền Giang',
  weekdayMass: ['05:00', '17:30'],
  saturdayMass: [],
  sundayMass: ['05:30', '07:00', '16:00', '18:00'],
  source: 'GP Mỹ Tho'
};

/**
 * Lấy thông tin & Giờ lễ Nhà Thờ Chánh Tòa Mỹ Tho từ Firestore.
 */
export async function getChanhToaMassInfo(): Promise<MassTime> {
  try {
    const snap = await getDoc(doc(massCol, 'mt-my-tho-chanh-toa'));
    if (snap.exists()) {
      return { ...(snap.data() as Omit<MassTime, 'id'>), id: snap.id };
    }
    const qSnap = await getDocs(query(massCol, where('parish', '==', 'Giáo xứ Chánh Tòa'), where('diocese', '==', 'Mỹ Tho')));
    if (!qSnap.empty) {
      const d = qSnap.docs[0];
      return { ...(d.data() as Omit<MassTime, 'id'>), id: d.id };
    }
  } catch (err) {
    console.error('Error fetching Chanh Toa mass info:', err);
  }
  return DEFAULT_CHANH_TOA_INFO;
}

/** Xoá dấu tiếng Việt để tìm kiếm không cần gõ dấu. Đ/đ không tách được bằng NFD nên xử lý riêng. */
export { removeAccents } from './textUtils';

/**
 * Danh sách tỉnh/thành + giáo phận kèm số nhà thờ.
 * Gói trong 1 document => 1 lượt đọc, thay vì quét cả collection 3600+ document.
 */
export async function getFacets(): Promise<{ provinces: Bucket[]; dioceses: Bucket[] }> {
  const snap = await getDoc(metaRef);
  const d = snap.data();
  return { provinces: (d?.provinces ?? []) as Bucket[], dioceses: (d?.list ?? []) as Bucket[] };
}

/**
 * Chỉ tải nhà thờ của 1 tỉnh/thành. Toàn quốc là 3600+ document — tải hết mỗi lượt
 * truy cập sẽ đốt quota đọc của Firestore rất nhanh.
 * Sắp xếp ở client để khỏi phải tạo composite index trên Firebase Console.
 */
export async function getByProvince(province: string): Promise<MassTime[]> {
  const snap = await getDocs(query(massCol, where('province', '==', province)));
  return snap.docs
    .map(d => ({ ...(d.data() as Omit<MassTime, 'id'>), id: d.id }))
    .sort((a, b) => a.parish.localeCompare(b.parish, 'vi'));
}

/** Như getByProvince nhưng lọc theo giáo phận. '' = nhóm chưa gắn nhãn giáo phận. */
export async function getByDiocese(diocese: string): Promise<MassTime[]> {
  const snap = await getDocs(query(massCol, where('diocese', '==', diocese)));
  return snap.docs
    .map(d => ({ ...(d.data() as Omit<MassTime, 'id'>), id: d.id }))
    .sort((a, b) => a.parish.localeCompare(b.parish, 'vi'));
}

export const createMass = (data: Omit<MassTime, 'id'>) => addDoc(massCol, data);
export const updateMass = (id: string, data: Partial<MassTime>) => updateDoc(doc(massCol, id), data);
export const deleteMass = (id: string) => deleteDoc(doc(massCol, id));

/** Lấy thông tin chi tiết 1 nhà thờ theo ID */
export async function getMassTimeById(id: string): Promise<MassTime | null> {
  try {
    const snap = await getDoc(doc(massCol, id));
    if (!snap.exists()) return null;
    return { ...(snap.data() as Omit<MassTime, 'id'>), id: snap.id };
  } catch (err) {
    console.error('Error fetching mass time by id:', err);
    return null;
  }
}

/** Gửi yêu cầu phản hồi / đóng góp từ người dùng công khai. */
export async function submitMassTimeFeedback(
  data: Omit<MassTimeFeedback, 'id' | 'status' | 'createdAt' | 'reviewedAt' | 'reviewedBy'>
) {
  const payload: Record<string, unknown> = {
    type: data.type || 'suggest_new',
    parish: (data.parish || '').trim(),
    diocese: (data.diocese || '').trim(),
    deanery: (data.deanery || '').trim(),
    province: (data.province || '').trim(),
    address: (data.address || '').trim(),
    weekdayMass: Array.isArray(data.weekdayMass) ? data.weekdayMass : [],
    saturdayMass: Array.isArray(data.saturdayMass) ? data.saturdayMass : [],
    sundayMass: Array.isArray(data.sundayMass) ? data.sundayMass : [],
    note: (data.note || '').trim(),
    contactName: (data.contactName || '').trim(),
    contactPhone: (data.contactPhone || '').trim(),
    status: 'pending',
    createdAt: serverTimestamp()
  };

  if (data.targetMassTimeId) {
    payload.targetMassTimeId = data.targetMassTimeId;
  }

  return addDoc(massFeedbackCol, payload);
}

/** Admin duyệt và áp dụng ngay lập tức vào cơ sở dữ liệu massTimes. */
export async function approveMassTimeFeedback(
  feedbackId: string,
  data: Omit<MassTimeFeedback, 'id'>,
  reviewerName = 'Admin'
) {
  const massPayload = {
    parish: data.parish.trim(),
    diocese: data.diocese.trim(),
    deanery: (data.deanery || '').trim(),
    province: data.province.trim(),
    address: data.address.trim(),
    weekdayMass: data.weekdayMass || [],
    saturdayMass: data.saturdayMass && data.saturdayMass.length > 0 ? data.saturdayMass : [],
    sundayMass: data.sundayMass || [],
    byDay: null, // Xoá byDay để áp dụng giờ vừa được duyệt
    source: 'Đóng góp cộng đồng (Đã duyệt)'
  };

  if (data.type === 'suggest_edit' && data.targetMassTimeId) {
    await updateDoc(doc(massCol, data.targetMassTimeId), massPayload);
  } else {
    await addDoc(massCol, massPayload);
  }

  // Đánh dấu yêu cầu là đã duyệt
  await updateDoc(doc(massFeedbackCol, feedbackId), {
    status: 'approved',
    parish: massPayload.parish,
    diocese: massPayload.diocese,
    deanery: massPayload.deanery,
    province: massPayload.province,
    address: massPayload.address,
    weekdayMass: massPayload.weekdayMass,
    saturdayMass: massPayload.saturdayMass,
    sundayMass: massPayload.sundayMass,
    reviewedAt: serverTimestamp(),
    reviewedBy: reviewerName
  });

  // Cập nhật lại thống kê số lượng nhà thờ
  await refreshFacets();
}

/** Admin từ chối yêu cầu đóng góp. */
export async function rejectMassTimeFeedback(
  feedbackId: string,
  rejectReason = '',
  reviewerName = 'Admin'
) {
  await updateDoc(doc(massFeedbackCol, feedbackId), {
    status: 'rejected',
    rejectReason,
    reviewedAt: serverTimestamp(),
    reviewedBy: reviewerName
  });
}

/** Admin xoá vĩnh viễn yêu cầu đóng góp. */
export const deleteMassTimeFeedback = (feedbackId: string) =>
  deleteDoc(doc(massFeedbackCol, feedbackId));

/** Đếm lại số nhà thờ theo tỉnh/thành và theo giáo phận, ghi vào document meta. */
export async function refreshFacets() {
  const snap = await getDocs(massCol);
  const tally = (pick: (d: Record<string, unknown>) => string, fallback: string) => {
    const counts = new Map<string, number>();
    snap.docs.forEach(doc => {
      const name = pick(doc.data()) || fallback;
      counts.set(name, (counts.get(name) ?? 0) + 1);
    });
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  };
  const provinces = tally(d => d.province as string, 'Chưa rõ tỉnh/thành');
  const list = tally(d => d.diocese as string, 'Chưa rõ giáo phận');
  await setDoc(metaRef, { provinces, list, total: snap.size, updatedAt: Date.now() });
  return { provinces, dioceses: list };
}

/** Chuỗi "5:00, 17h30" -> ['05:00','17:30'] cho ô nhập giờ trong trang admin. */
export const parseTimes = (input: string): string[] => {
  const out = new Set<string>();
  for (const part of input.split(/[,;\s]+/)) {
    const m = part.trim().match(/^([0-2]?\d)[:hg.]([0-5]\d)$/);
    if (m && +m[1] <= 23) out.add(`${String(+m[1]).padStart(2, '0')}:${m[2]}`);
  }
  return [...out].sort();
};

/**
 * Nhập dữ liệu đã cào từ /giole.json vào Firestore.
 * Dùng chính id trong file làm document id => chạy lại nhiều lần chỉ ghi đè, không nhân bản.
 * Firestore giới hạn 500 thao tác/batch nên phải chia lô.
 */
export async function importFromJson(onProgress?: (done: number, total: number) => void) {
  const { writeBatch } = await import('firebase/firestore');
  const res = await fetch('/giole.json');
  if (!res.ok) throw new Error('Không đọc được /giole.json — hãy chạy: python3 scripts/scrape_giole.py');
  const rows: MassTime[] = await res.json();

  for (let i = 0; i < rows.length; i += 400) {
    const batch = writeBatch(db);
    for (const { id, ...data } of rows.slice(i, i + 400)) {
      batch.set(doc(massCol, id), data, { merge: true });
    }
    await batch.commit();
    onProgress?.(Math.min(i + 400, rows.length), rows.length);
  }
  await refreshFacets();
  return rows.length;
}
