/**
 * Đẩy public/giole.json lên Firestore (collection `massTimes` + doc đếm `massTimesMeta/dioceses`).
 * Làm đúng việc mà nút "Nhập từ giole.json" trong /admin làm, chỉ khác là chạy từ terminal.
 *
 *   node scripts/seed-firestore.mjs           # xem trước, không ghi gì
 *   node scripts/seed-firestore.mjs --write   # ghi thật
 *
 * Dùng id sẵn có trong file làm document id => chạy lại nhiều lần không nhân bản.
 */
import { readFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, writeBatch, setDoc, getDocs, collection } from 'firebase/firestore';

const cfg = {
  apiKey: 'AIzaSyADDC3-1BYxJX5hs-ofxUmM9lHiXbmk3zo',
  authDomain: 'faqfeedback-d3653.firebaseapp.com',
  projectId: 'faqfeedback-d3653',
  storageBucket: 'faqfeedback-d3653.firebasestorage.app',
  messagingSenderId: '291729919545',
  appId: '1:291729919545:web:10c3aed11820ab5085c7e8',
};

const rows = JSON.parse(readFileSync(new URL('../public/giole.json', import.meta.url), 'utf8'));
const write = process.argv.includes('--write');

const db = getFirestore(initializeApp(cfg));
const col = collection(db, 'massTimes');

const before = await getDocs(col);
console.log(`massTimes hiện có: ${before.size} document`);
console.log(`giole.json:        ${rows.length} nhà thờ`);

if (!write) {
  console.log('\n(xem trước — thêm --write để ghi thật)');
  process.exit(0);
}

// Firestore giới hạn 500 thao tác/batch
for (let i = 0; i < rows.length; i += 400) {
  const batch = writeBatch(db);
  for (const { id, ...data } of rows.slice(i, i + 400)) {
    batch.set(doc(col, id), data, { merge: true });
  }
  await batch.commit();
  console.log(`  ghi ${Math.min(i + 400, rows.length)}/${rows.length}`);
}

// Dọn document mồ côi: bản ghi của lần seed trước đã bị gộp vào nguồn khác nên
// không còn trong giole.json — để lại sẽ thành nhà thờ trùng trên trang.
const wanted = new Set(rows.map(r => r.id));
const stale = (await getDocs(col)).docs.filter(d => !wanted.has(d.id));
if (stale.length) {
  console.log(`  dọn ${stale.length} document mồ côi (đã bị gộp ở lần cào mới)`);
  for (let i = 0; i < stale.length; i += 400) {
    const batch = writeBatch(db);
    stale.slice(i, i + 400).forEach(d => batch.delete(d.ref));
    await batch.commit();
  }
}

// doc meta: danh sách giáo phận + số nhà thờ (trang công khai đọc 1 doc này thay vì quét cả collection)
const after = await getDocs(col);
const tally = (pick, fallback) => {
  const counts = new Map();
  after.docs.forEach(d => {
    const name = pick(d.data()) || fallback;
    counts.set(name, (counts.get(name) ?? 0) + 1);
  });
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, 'vi'));
};
const provinces = tally(d => d.province, 'Chưa rõ tỉnh/thành');
const list = tally(d => d.diocese, 'Chưa rõ giáo phận');
await setDoc(doc(db, 'massTimesMeta', 'dioceses'), { provinces, list, total: after.size, updatedAt: Date.now() });

console.log(`\nXong. massTimes: ${after.size} document, ${provinces.length} tỉnh/thành, ${list.length} nhóm giáo phận.`);
process.exit(0);
