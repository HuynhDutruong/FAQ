// Kiểm tra nhanh: node --experimental-strip-types src/lib/postIntel.test.mjs
import assert from 'node:assert';
import { classifyPost, extractPostMedia, cleanUrl } from './postIntel.ts';

// --- Phân loại Thông báo ---
assert.equal(classifyPost('THÔNG BÁO: Nghỉ sinh hoạt tuần này').kind, 'notice');
assert.equal(classifyPost('Thong bao ve viec ghi danh').kind, 'notice');
assert.equal(classifyPost('Trân trọng kính mời quý phụ huynh dự lễ 19h30 ngày 24/11').kind, 'notice');
assert.equal(classifyPost('#thongbao Danh sách phân đội').kind, 'notice');
assert.equal(classifyPost('Các em vui lòng có mặt đúng giờ, mang theo khăn quàng').kind, 'notice');

// Bài tường thuật / suy niệm không được rơi vào Thông báo
assert.equal(classifyPost('Hình ảnh thánh lễ mừng bổn mạng Xứ Đoàn sáng nay thật sốt sắng.').kind, 'news');
assert.equal(classifyPost('Chúa nhật hôm nay Hội Thánh mời gọi ta sống tinh thần phù hợp Tin Mừng.').kind, 'news');

// --- Gỡ lớp chuyển hướng của Facebook ---
assert.equal(
  cleanUrl('https://l.facebook.com/l.php?u=https%3A%2F%2Fmeet.google.com%2Fabc-defg-hij&h=AT1'),
  'https://meet.google.com/abc-defg-hij'
);
assert.equal(cleanUrl('https://zoom.us/j/123456.'), 'https://zoom.us/j/123456');

// --- Bóc video, YouTube và liên kết ---
const yt = extractPostMedia(
  'Xem lại thánh lễ: https://youtu.be/dQw4w9WgXcQ và đăng ký tại https://forms.gle/abc123',
  'https://facebook.com/1/posts/2'
);
assert.deepEqual(yt.youtube, ['dQw4w9WgXcQ']);
assert.deepEqual(yt.links, [{ url: 'https://forms.gle/abc123', label: 'Biểu mẫu đăng ký' }]);
assert.equal(yt.video, null);

// Tự đăng: tệp trên CDN Facebook
const vid = extractPostMedia('Video sinh hoạt', 'https://facebook.com/1/videos/9', [
  { media_type: 'video', media: { source: 'https://scontent.fsgn19-1.fna.fbcdn.net/o1/v/t2/f2/abc' } }
]);
assert.ok(vid.video);
assert.ok(vid.videoEmbed.startsWith('https://www.facebook.com/plugins/video.php?href='));

// Chia sẻ lại video YouTube: không phải video tự đăng, nhưng vẫn xem được
const shared = extractPostMedia('Xem lại', 'https://facebook.com/1/posts/9', [
  { media_type: 'video', media: { source: 'https://www.youtube.com/embed/GPG_F_sHYc8?autoplay=1' } }
]);
assert.equal(shared.video, null);
assert.deepEqual(shared.youtube, ['GPG_F_sHYc8']);

// Không có media thì không dựng trình phát
const plain = extractPostMedia('Bài viết thường không kèm gì', 'https://facebook.com/1/posts/2');
assert.equal(plain.videoEmbed, null);
assert.deepEqual(plain.youtube, []);
assert.deepEqual(plain.links, []);

console.log('postIntel: OK');
