// Kiểm tra nhanh: node --experimental-strip-types src/lib/dailyReadings.test.mjs
import assert from 'node:assert';
import { parseReadings } from './dailyReadings.ts';

// Rút gọn đúng theo cách loichuahomnay.vn dựng trang
const html = `
<h2>LỜI CHÚA (BÀI ĐỌC &amp; TIN MỪNG) - NGÀY 28/08/2026</h2>
<p><strong>Bài Ðọc I: 1 Cr 1, 17-25</strong></p>
<p><em>"Chúng tôi rao giảng Chúa Kitô chịu đóng đinh".</em></p>
<p>Trích thư thứ nhất của Thánh Phaolô Tông đồ gửi tín hữu Côrintô.</p>
<p>Anh em thân mến, Ðức Kitô không sai tôi đi rửa tội.</p>
<p>Ðó là lời Chúa.</p>
<p><strong>Ðáp Ca: Tv 32, 1-2</strong></p>
<p><strong>Ðáp:&nbsp;Ðịa cầu đầy ân sủng của Chúa (c. 5b).</strong></p>
<p>1. Người hiền đức, hãy hân hoan trong Chúa!</p>
<p><strong>Alleluia: Lc 21:36</strong></p>
<p>Alleluia, alleluia! - Anh em hãy tỉnh thức. - Alleluia.</p>
<p><strong>Phúc Âm: Mt 25, 1-13</strong></p>
<p><em>"Kìa chàng rể đến, hãy ra đón người".</em></p>
<p>Tin Mừng Chúa Giêsu Kitô theo Thánh Matthêu.</p>
<p>Khi ấy, Chúa Giêsu phán cùng các môn đệ dụ ngôn này.</p>
<p>Ðó là lời Chúa.</p>
<p><span class="text-danger"><strong>Lễ Nửa Ðêm Giáng Sinh</strong></span></p>
<p><strong>Bài Ðọc I: Is 9, 2-4</strong></p>
<p>Trích sách Tiên tri Isaia.</p>
<p><strong>Phúc Âm: Lc 2, 1-14</strong></p>
<p>Tin Mừng Chúa Giêsu Kitô theo Thánh Luca.</p>
<hr />
<h2>SUY NIỆM LỜI CHÚA NGÀY 28/08/2026</h2>
<p><strong>Bài Ðọc I: KHÔNG ĐƯỢC LẤY</strong></p>
`;

const secs = parseReadings(html);
assert.deepEqual(secs.map(s => s.kind), [
  'reading1', 'psalm', 'alleluia', 'gospel', 'reading1', 'gospel'
]);

// Phần Suy Niệm nằm sau <hr> không được lọt vào
assert.equal(secs.filter(s => s.ref.includes('KHÔNG')).length, 0);

const [reading1, psalm, , gospel] = secs;
assert.equal(reading1.ref, '1 Cr 1, 17-25');
assert.ok(reading1.summary.startsWith('Chúng tôi rao giảng'));
assert.equal(reading1.paragraphs.length, 3);

assert.equal(psalm.response, 'Ðịa cầu đầy ân sủng của Chúa (c. 5b).');

// "Tin Mừng Chúa Giêsu Kitô theo..." là câu mở, không phải tiêu đề mục mới
assert.equal(gospel.ref, 'Mt 25, 1-13');
assert.equal(gospel.paragraphs.length, 3);

// Bộ lễ thứ hai trong ngày được tách và đặt tên
assert.equal(secs[0].group, 0);
assert.equal(secs[4].group, 1);
assert.equal(secs[4].mass, 'Lễ Nửa Ðêm Giáng Sinh');

console.log('dailyReadings: OK');
