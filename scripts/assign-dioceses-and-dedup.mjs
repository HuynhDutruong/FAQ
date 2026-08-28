import { readFileSync, writeFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, writeBatch, setDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';

const cfg = {
  apiKey: 'AIzaSyADDC3-1BYxJX5hs-ofxUmM9lHiXbmk3zo',
  authDomain: 'faqfeedback-d3653.firebaseapp.com',
  projectId: 'faqfeedback-d3653',
  storageBucket: 'faqfeedback-d3653.firebasestorage.app',
  messagingSenderId: '291729919545',
  appId: '1:291729919545:web:10c3aed11820ab5085c7e8',
};

function cleanStr(s) {
  if (!s) return '';
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/^(giao xu|nha tho|gx|giao ho|gh|nha nguyen|giao diem)\s+/i, '')
    .replace(/[^a-z0-9]/g, '');
}

function inferDiocese(parish, address, province) {
  const p = (province || '').trim();
  const a = (address || '').trim();
  const n = (parish || '').trim();
  const text = `${n} ${a} ${p}`.toLowerCase();

  if (text.includes('bà rịa') || text.includes('vũng tàu')) return 'Bà Rịa';
  if (text.includes('ban mê thuột') || text.includes('buôn ma thuột') || text.includes('đắk lắk') || text.includes('dak lak') || text.includes('đắk nông') || text.includes('dak nong')) return 'Ban Mê Thuột';
  if (text.includes('bắc ninh') || text.includes('bắc giang') || text.includes('bắc kạn') || text.includes('thái nguyên') || text.includes('vĩnh phúc')) return 'Bắc Ninh';
  if (text.includes('bùi chu') || text.includes('xuân trường') || text.includes('hải hậu') || text.includes('giao thủy') || text.includes('nghĩa hưng') || text.includes('trực ninh')) return 'Bùi Chu';
  if (text.includes('cần thơ') || text.includes('hậu giang') || text.includes('sóc trăng') || text.includes('bạc liêu') || text.includes('cà mau')) return 'Cần Thơ';
  if (text.includes('đà lạt') || text.includes('lâm đồng') || text.includes('bảo lộc') || text.includes('đơn dương') || text.includes('đức trọng') || text.includes('di linh')) return 'Đà Lạt';
  if (text.includes('đà nẵng') || text.includes('quảng nam') || text.includes('hội an') || text.includes('tam kỳ')) return 'Đà Nẵng';
  if (text.includes('hà tĩnh') || text.includes('quảng bình') || text.includes('đồng hới') || text.includes('kỳ anh') || text.includes('hương khê')) return 'Hà Tĩnh';
  if (text.includes('hải phòng') || text.includes('hải dương') || text.includes('quảng ninh') || text.includes('hạ long') || text.includes('uông bí') || text.includes('móng cái')) return 'Hải Phòng';
  if (text.includes('hưng hóa') || text.includes('phú thọ') || text.includes('yên bái') || text.includes('lào cai') || text.includes('lai châu') || text.includes('điện biên') || text.includes('sơn la') || text.includes('hòa bình') || text.includes('sơn tây') || text.includes('ba vì') || text.includes('phúc thọ')) return 'Hưng Hóa';
  if (text.includes('lạng sơn') || text.includes('cao bằng') || text.includes('hà giang')) return 'Lạng Sơn - Cao Bằng';
  if (text.includes('long xuyên') || text.includes('an giang') || text.includes('kiên giang') || text.includes('rạch giá') || text.includes('phú quốc') || text.includes('châu đốc') || text.includes('long xuyên') || text.includes('sa đéc') || text.includes('lấp vò') || text.includes('lai vung')) return 'Long Xuyên';
  if (text.includes('mỹ tho') || text.includes('tiền giang') || text.includes('gò công') || text.includes('cái bè') || text.includes('cai lậy') || text.includes('tân an') || text.includes('thủ thừa') || text.includes('bến lức') || text.includes('đức hòa') || text.includes('tân thạnh') || text.includes('mộc hóa') || text.includes('kiến tường') || text.includes('cao lãnh') || text.includes('tháp mười') || text.includes('tam nông') || text.includes('thanh bình') || text.includes('hồng ngự') || text.includes('tân hồng')) return 'Mỹ Tho';
  if (text.includes('nha trang') || text.includes('khánh hòa') || text.includes('ninh thuận') || text.includes('phan rang') || text.includes('cam ranh')) return 'Nha Trang';
  if (text.includes('phan thiết') || text.includes('bình thuận') || text.includes('hàm tân') || text.includes('la gi') || text.includes('bắc bình') || text.includes('tánh linh') || text.includes('đức linh')) return 'Phan Thiết';
  if (text.includes('phát diệm') || text.includes('ninh bình') || text.includes('kim sơn') || text.includes('yên khánh') || text.includes('nho quan') || text.includes('gia viễn') || text.includes('tam điệp') || text.includes('nga sơn')) return 'Phát Diệm';
  if (text.includes('phú cường') || text.includes('bình dương') || text.includes('tây ninh') || text.includes('củ chi') || text.includes('thủ dầu một') || text.includes('thuận an') || text.includes('dĩ an') || text.includes('bến cát') || text.includes('tân uyên') || text.includes('trảng bàng') || text.includes('bàu bàng')) return 'Phú Cường';
  if (text.includes('quy nhơn') || text.includes('bình định') || text.includes('quảng ngãi') || text.includes('phú yên') || text.includes('tuy hòa') || text.includes('sông cầu')) return 'Quy Nhơn';
  if (text.includes('thái bình') || text.includes('hưng yên') || text.includes('khoái châu') || text.includes('tiên lữ') || text.includes('mỹ hào') || text.includes('yên mỹ') || text.includes('kiến xương') || text.includes('tiền hải') || text.includes('quỳnh phụ')) return 'Thái Bình';
  if (text.includes('thanh hóa') || text.includes('sầm sơn') || text.includes('bỉm sơn') || text.includes('thọ xuân') || text.includes('tĩnh gia') || text.includes('nghi sơn') || text.includes('hà trung')) return 'Thanh Hóa';
  if (text.includes('vinh') || text.includes('nghệ an') || text.includes('nghi lộc') || text.includes('hưng nguyên') || text.includes('diễn châu') || text.includes('quỳnh lưu') || text.includes('đô lương') || text.includes('cửa lò') || text.includes('nam đàn')) return 'Vinh';
  if (text.includes('vĩnh long') || text.includes('bến tre') || text.includes('trà vinh') || text.includes('ba tri') || text.includes('mỏ cày') || text.includes('chợ lách') || text.includes('bình đại') || text.includes('càng long') || text.includes('tiểu cần') || text.includes('mang thít') || text.includes('tam bình')) return 'Vĩnh Long';
  if (text.includes('xuân lộc') || text.includes('đồng nai') || text.includes('biên hòa') || text.includes('long khánh') || text.includes('trảng bom') || text.includes('thống nhất') || text.includes('định quán') || text.includes('tân phú') || text.includes('long thành') || text.includes('nhơn trạch') || text.includes('vĩnh cửu') || text.includes('cẩm mỹ') || text.includes('gia kiệm')) return 'Xuân Lộc';
  if (text.includes('kon tum') || text.includes('gia lai') || text.includes('pleiku') || text.includes('an khê') || text.includes('chư sê') || text.includes('ayun pa') || text.includes('đắk hà')) return 'Kon Tum';
  if (text.includes('huế') || text.includes('thừa thiên') || text.includes('quảng trị') || text.includes('đông hà') || text.includes('la vang') || text.includes('hương thủy') || text.includes('hương trà') || text.includes('triệu phong') || text.includes('hải lăng')) return 'Huế';
  if (text.includes('sài gòn') || text.includes('hồ chí minh') || text.includes('quận ') || text.includes('q.') || text.includes('thủ đức') || text.includes('bình thạnh') || text.includes('gò vấp') || text.includes('tân bình') || text.includes('tân phú') || text.includes('bình tân') || text.includes('phú nhuận') || text.includes('bình chánh') || text.includes('hóc môn') || text.includes('nhà bè') || text.includes('cần giờ')) return 'Sài Gòn';
  if (text.includes('hà nội') || text.includes('hà nam') || text.includes('phủ lý') || text.includes('duy tiên') || text.includes('kim bảng') || text.includes('thanh liêm') || text.includes('bình lục') || text.includes('lý nhân') || text.includes('hoàn kiếm') || text.includes('ba đình') || text.includes('đống đa') || text.includes('hai bà trưng') || text.includes('thanh xuân') || text.includes('cầu giấy') || text.includes('hoàng mai') || text.includes('long biên') || text.includes('hà đông') || text.includes('nam từ liêm') || text.includes('bắc từ liêm') || text.includes('thường tín') || text.includes('phú xuyên') || text.includes('thanh oai') || text.includes('ứng hòa') || text.includes('mỹ đức') || text.includes('chương mỹ') || text.includes('thạch thất') || text.includes('quốc oai') || text.includes('hoài đức') || text.includes('đan phượng')) return 'Hà Nội';

  const provMap = {
    'Đồng Nai': 'Xuân Lộc',
    'Lâm Đồng': 'Đà Lạt',
    'Ninh Bình': 'Phát Diệm',
    'Phú Thọ': 'Hưng Hóa',
    'Hà Nội': 'Hà Nội',
    'Bắc Ninh': 'Bắc Ninh',
    'Tuyên Quang': 'Bắc Ninh',
    'Thái Nguyên': 'Bắc Ninh',
    'Hải Phòng': 'Hải Phòng',
    'Hải Dương': 'Hải Phòng',
    'Hưng Yên': 'Thái Bình',
    'Thái Bình': 'Thái Bình',
    'Cà Mau': 'Cần Thơ',
    'Cần Thơ': 'Cần Thơ',
    'Sóc Trăng': 'Cần Thơ',
    'Bạc Liêu': 'Cần Thơ',
    'Hậu Giang': 'Cần Thơ',
    'Đồng Tháp': 'Mỹ Tho',
    'Tiền Giang': 'Mỹ Tho',
    'Long An': 'Mỹ Tho',
    'Vĩnh Long': 'Vĩnh Long',
    'Bến Tre': 'Vĩnh Long',
    'Trà Vinh': 'Vĩnh Long',
    'Thừa Thiên Huế': 'Huế',
    'Huế': 'Huế',
    'Quảng Trị': 'Huế',
    'Hà Nam': 'Hà Nội',
    'Hoà Bình': 'Hưng Hóa',
    'Hòa Bình': 'Hưng Hóa',
    'Nam Định': 'Bùi Chu',
    'Hà Tĩnh': 'Hà Tĩnh',
    'Quảng Bình': 'Hà Tĩnh',
    'Lào Cai': 'Hưng Hóa',
    'Sơn La': 'Hưng Hóa',
    'Lai Châu': 'Hưng Hóa',
    'Điện Biên': 'Hưng Hóa',
    'Yên Bái': 'Hưng Hóa',
    'Quảng Ninh': 'Hải Phòng',
    'Quảng Ngãi': 'Quy Nhơn',
    'Bình Định': 'Quy Nhơn',
    'Phú Yên': 'Quy Nhơn',
    'Kon Tum': 'Kon Tum',
    'Gia Lai': 'Kon Tum',
    'An Giang': 'Long Xuyên',
    'Kiên Giang': 'Long Xuyên',
    'Hà Giang': 'Lạng Sơn - Cao Bằng',
    'Lạng Sơn': 'Lạng Sơn - Cao Bằng',
    'Cao Bằng': 'Lạng Sơn - Cao Bằng',
    'Khánh Hòa': 'Nha Trang',
    'Ninh Thuận': 'Nha Trang',
    'Bình Thuận': 'Phan Thiết',
    'Bình Dương': 'Phú Cường',
    'Tây Ninh': 'Phú Cường',
    'Bình Phước': 'Phú Cường',
    'Thanh Hóa': 'Thanh Hóa',
    'Nghệ An': 'Vinh',
    'Đà Nẵng': 'Đà Nẵng',
    'Quảng Nam': 'Đà Nẵng',
    'Bà Rịa - Vũng Tàu': 'Bà Rịa',
    'Đắk Lắk': 'Ban Mê Thuột',
    'Đắk Nông': 'Ban Mê Thuột',
    'Hồ Chí Minh': 'Sài Gòn',
    'TP. Hồ Chí Minh': 'Sài Gòn'
  };

  return provMap[p] || 'Sài Gòn';
}

const giolePath = new URL('../public/giole.json', import.meta.url);
const currentGiole = JSON.parse(readFileSync(giolePath, 'utf8'));

// 1. Assign diocese to all
const assigned = currentGiole.map(item => {
  let dio = (item.diocese || '').trim();
  if (!dio || dio === 'Chưa rõ giáo phận') {
    dio = inferDiocese(item.parish, item.address, item.province);
  }
  return { ...item, diocese: dio };
});

// 2. Deduplicate
const userSources = new Set(['TGP Sài Gòn', 'GP Mỹ Tho']);
const dedupMap = new Map();

for (const it of assigned) {
  const isUserSource = userSources.has(it.source);
  const key = `${cleanStr(it.parish)}__${cleanStr(it.diocese)}`;

  if (!dedupMap.has(key)) {
    dedupMap.set(key, it);
  } else {
    const existing = dedupMap.get(key);
    if (!userSources.has(existing.source) && isUserSource) {
      dedupMap.set(key, it);
    } else if (!userSources.has(existing.source) && !isUserSource) {
      const existingMassCount = (existing.weekdayMass?.length || 0) + (existing.sundayMass?.length || 0);
      const currentMassCount = (it.weekdayMass?.length || 0) + (it.sundayMass?.length || 0);
      if (currentMassCount > existingMassCount || (!existing.lat && it.lat)) {
        dedupMap.set(key, { ...existing, ...it });
      }
    }
  }
}

const finalRows = Array.from(dedupMap.values());
console.log(`Đã gộp & khử trùng: ${currentGiole.length} -> ${finalRows.length} nhà thờ (loại bỏ ${currentGiole.length - finalRows.length} trùng).`);

// Save to public/giole.json
writeFileSync(giolePath, JSON.stringify(finalRows, null, 2), 'utf8');

const write = process.argv.includes('--write');

if (!write) {
  console.log('\n(Chạy với cờ --write để đồng bộ toàn bộ vào Firestore)');
  process.exit(0);
}

// 3. Connect to Firestore and sync
console.log('Đang kết nối Firestore...');
const db = getFirestore(initializeApp(cfg));
const massCol = collection(db, 'massTimes');

const snap = await getDocs(massCol);
console.log(`Hiện có ${snap.size} document trong Firestore.`);

const existingIds = new Set(snap.docs.map(d => d.id));
const finalIds = new Set(finalRows.map(r => r.id));

// Find docs to delete (exist in Firestore but not in finalRows)
const toDelete = snap.docs.filter(d => !finalIds.has(d.id));
console.log(`Cần xoá ${toDelete.length} document trùng/dư thừa khỏi Firestore...`);

for (let i = 0; i < toDelete.length; i += 400) {
  const batch = writeBatch(db);
  toDelete.slice(i, i + 400).forEach(d => batch.delete(d.ref));
  await batch.commit();
  console.log(`  Đã xoá ${Math.min(i + 400, toDelete.length)}/${toDelete.length}`);
}

// Batch upsert all finalRows
console.log(`Đang cập nhật ${finalRows.length} document chuẩn vào Firestore...`);
for (let i = 0; i < finalRows.length; i += 400) {
  const batch = writeBatch(db);
  for (const { id, ...data } of finalRows.slice(i, i + 400)) {
    const docData = { ...data };
    if (!docData.saturdayMass) delete docData.saturdayMass;
    batch.set(doc(massCol, id), docData);
  }
  await batch.commit();
  console.log(`  Đã ghi ${Math.min(i + 400, finalRows.length)}/${finalRows.length}`);
}

// Update massTimesMeta/dioceses
console.log('Đang tính toán lại thống kê metadata...');
const after = await getDocs(massCol);
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

console.log(`\n Hoàn tất! Tổng số document trong Firestore: ${after.size}. Không còn mục 'Chưa rõ giáo phận'.`);
process.exit(0);
