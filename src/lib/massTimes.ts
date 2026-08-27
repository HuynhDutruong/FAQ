import { db } from './firebase';
import {
  collection, doc, getDocs, query, where, addDoc, updateDoc, deleteDoc, getDoc, setDoc
} from 'firebase/firestore';

export interface MassTime {
  id: string;
  parish: string;
  diocese: string;
  deanery: string;
  province: string;
  address: string;
  weekdayMass: string[];
  sundayMass: string[];
  lat?: number | null;
  lng?: number | null;
  source?: string;
}

export const massCol = collection(db, 'massTimes');
const metaRef = doc(db, 'massTimesMeta', 'dioceses');

/** Xoá dấu tiếng Việt để tìm kiếm không cần gõ dấu. Đ/đ không tách được bằng NFD nên xử lý riêng. */
export const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/đ/g, 'd');

/** Danh sách giáo phận + số nhà thờ. 1 document => 1 lượt đọc, thay vì quét cả collection. */
export async function getDioceses(): Promise<{ name: string; count: number }[]> {
  const snap = await getDoc(metaRef);
  return snap.exists() ? (snap.data().list as { name: string; count: number }[]) : [];
}

/**
 * Chỉ tải nhà thờ của 1 giáo phận. Toàn quốc là 548+ document — tải hết mỗi lượt
 * truy cập sẽ đốt quota đọc của Firestore rất nhanh.
 * Sắp xếp ở client để khỏi phải tạo composite index trên Firebase Console.
 */
export async function getByDiocese(diocese: string): Promise<MassTime[]> {
  const snap = await getDocs(query(massCol, where('diocese', '==', diocese)));
  return snap.docs
    .map(d => ({ ...(d.data() as Omit<MassTime, 'id'>), id: d.id }))
    .sort((a, b) => a.parish.localeCompare(b.parish, 'vi'));
}

export const createMass = (data: Omit<MassTime, 'id'>) => addDoc(massCol, data);
export const updateMass = (id: string, data: Partial<MassTime>) => updateDoc(doc(massCol, id), data);
export const deleteMass = (id: string) => deleteDoc(doc(massCol, id));

/** Đếm lại số nhà thờ mỗi giáo phận rồi ghi vào document meta. Gọi sau khi CRUD/import. */
export async function refreshDioceseMeta() {
  const snap = await getDocs(massCol);
  const counts = new Map<string, number>();
  snap.docs.forEach(d => {
    const name = (d.data().diocese as string) || 'Chưa rõ giáo phận';
    counts.set(name, (counts.get(name) ?? 0) + 1);
  });
  const list = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  await setDoc(metaRef, { list, total: snap.size, updatedAt: Date.now() });
  return list;
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
  await refreshDioceseMeta();
  return rows.length;
}
