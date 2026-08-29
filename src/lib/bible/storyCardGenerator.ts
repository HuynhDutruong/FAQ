import { BibleBookInfo } from '@/lib/bible/types';
import { BibleArtwork } from '@/lib/bible/bibleArtworks';
import { CatholicBookIntro } from '@/lib/bible/bibleIntroductions';

/**
 * Tự động tạo ảnh Thẻ Lời Chúa chuẩn tỷ lệ 9:16 Full HD (1080 x 1920)
 * Dành riêng cho việc Up Story (Facebook Story, Instagram Story, Zalo Story, TikTok...)
 */
export async function generateStoryCardBlob(
  book: BibleBookInfo,
  artwork: BibleArtwork,
  intro: CatholicBookIntro,
  siteUrl: string
): Promise<File> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Cannot create canvas 2d context');

  // 1. NỀN HOÀNG GIA SANG TRỌNG (Royal Deep Midnight Gradient)
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
  bgGrad.addColorStop(0, '#1E1710');
  bgGrad.addColorStop(0.3, '#120D08');
  bgGrad.addColorStop(0.7, '#0B0805');
  bgGrad.addColorStop(1, '#050302');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  // 2. KHUNG VIỀN VÀNG KIM ĐÔI (Double Gold Borders)
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 6;
  ctx.strokeRect(36, 36, 1080 - 72, 1920 - 72);

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 48, 1080 - 96, 1920 - 96);

  // 3. HOA VĂN GÓC THÁNH THIỆN
  ctx.fillStyle = '#FDE68A';
  ctx.font = '32px serif';
  ctx.fillText('⚜', 64, 94);
  ctx.fillText('⚜', 1080 - 94, 94);
  ctx.fillText('⚜', 64, 1920 - 74);
  ctx.fillText('⚜', 1080 - 94, 1920 - 74);

  // 4. HEADER GIÁO XỨ & XỨ ĐOÀN
  ctx.textAlign = 'center';
  ctx.fillStyle = '#D4AF37';
  ctx.font = 'bold 30px "Cinzel", "Times New Roman", serif';
  ctx.fillText('✠ GIÁO XỨ CHÁNH TÒA MỸ THO ✠', 540, 120);

  ctx.fillStyle = '#FDE68A';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.fillText('XỨ ĐOÀN CÁC THÁNH TỬ ĐẠO VIỆT NAM', 540, 160);

  // 5. BANNER TÊN SÁCH & PHÂN LOẠI
  ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
  ctx.fillRect(180, 190, 720, 64);
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(180, 190, 720, 64);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
  ctx.fillText(`SÁCH ${book.name.toUpperCase()} (${book.code}) • ${book.groupLabel.toUpperCase()}`, 540, 232);

  // 6. TRANH NGHỆ THUẬT THÁNH (Vẽ hình ảnh trung tâm)
  const imgY = 280;
  const imgW = 920;
  const imgH = 620;
  const imgX = (1080 - imgW) / 2;

  try {
    const img = await loadImage(artwork.imageUrl);
    // Khung ảnh nền tối
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(imgX, imgY, imgW, imgH, 20);
    ctx.clip();
    
    // Draw image maintaining aspect ratio
    const scale = Math.max(imgW / img.width, imgH / img.height);
    const sw = imgW / scale;
    const sh = imgH / scale;
    const sx = (img.width - sw) / 2;
    const sy = (img.height - sh) / 2;
    ctx.drawImage(img, sx, sy, sw, sh, imgX, imgY, imgW, imgH);

    // Gradient overlay dưới ảnh
    const imgGrad = ctx.createLinearGradient(0, imgY + imgH - 180, 0, imgY + imgH);
    imgGrad.addColorStop(0, 'rgba(0,0,0,0)');
    imgGrad.addColorStop(1, 'rgba(10,8,5,0.95)');
    ctx.fillStyle = imgGrad;
    ctx.fillRect(imgX, imgY + imgH - 180, imgW, 180);

    ctx.restore();

    // Viền vàng quanh tranh
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(imgX, imgY, imgW, imgH, 20);
    ctx.stroke();

    // Caption tác phẩm
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
    ctx.fillText(artwork.title, 540, imgY + imgH - 45);

    ctx.fillStyle = '#FDE68A';
    ctx.font = 'italic 20px Georgia, serif';
    ctx.fillText(`Họa sĩ ${artwork.artist}${artwork.year ? ` • ${artwork.year}` : ''}`, 540, imgY + imgH - 18);
  } catch (err) {
    console.warn('Cannot render artwork to canvas:', err);
  }

  // 7. HỘP CÂU KINH THÁNH CỐT LÕI (Scripture Verse Box)
  const verseBoxY = 940;
  const verseBoxW = 920;
  const verseBoxH = 480;
  const verseBoxX = 80;

  ctx.fillStyle = 'rgba(212, 175, 55, 0.08)';
  ctx.beginPath();
  ctx.roundRect(verseBoxX, verseBoxY, verseBoxW, verseBoxH, 24);
  ctx.fill();

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Dải ruy băng đỏ
  ctx.fillStyle = '#B71C1C';
  ctx.beginPath();
  ctx.roundRect(verseBoxX + 30, verseBoxY - 20, 320, 42, 8);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('📖 LỜI CHÚA TRỌNG TÂM', verseBoxX + 48, verseBoxY + 8);

  // Câu Lời Chúa (Italic Serif)
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFDF7';
  ctx.font = 'italic 34px "Georgia", "Times New Roman", serif';
  
  const verseLines = wrapText(ctx, `“${intro.keyVerse}”`, 820);
  let vY = verseBoxY + 80;
  for (const line of verseLines.slice(0, 5)) {
    ctx.fillText(line, 540, vY);
    vY += 46;
  }

  // Đường phân cách mảnh
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(180, verseBoxY + 310);
  ctx.lineTo(900, verseBoxY + 310);
  ctx.stroke();

  // Sứ Điệp Thần Học
  ctx.fillStyle = '#FDE68A';
  ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
  ctx.fillText('SỨ ĐIỆP CỦA SÁCH', 540, verseBoxY + 348);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '24px system-ui, -apple-system, sans-serif';
  const msgLines = wrapText(ctx, intro.coreMessage, 820);
  let mY = verseBoxY + 386;
  for (const line of msgLines.slice(0, 2)) {
    ctx.fillText(line, 540, mY);
    mY += 34;
  }

  // 8. FOOTER LINK & QR CALL TO ACTION
  const footY = 1560;
  ctx.fillStyle = 'rgba(212, 175, 55, 0.12)';
  ctx.beginPath();
  ctx.roundRect(140, footY, 800, 160, 20);
  ctx.fill();
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#FDE68A';
  ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
  ctx.fillText('ĐỌC TOÀN BỘ 73 SÁCH KINH THÁNH TẠI:', 540, footY + 50);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px monospace';
  ctx.fillText(siteUrl.replace(/^https?:\/\//, ''), 540, footY + 95);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '20px system-ui, -apple-system, sans-serif';
  ctx.fillText('Ứng dụng Công Giáo Xứ Đoàn Các Thánh Tử Đạo Chánh Tòa', 540, footY + 135);

  // 9. BẢN QUYỀN CUỐI THẺ
  ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
  ctx.font = 'italic 18px Georgia, serif';
  ctx.fillText('Thư Viện Nghệ Thuật Thánh & Lời Chúa • Giáo Phận Mỹ Tho', 540, 1850);

  // Chuyển Canvas thành File Blob (JPEG chất lượng 0.95)
  return new Promise<File>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `the_loi_chua_${book.id}_story_9x16.jpg`, {
            type: 'image/jpeg'
          });
          resolve(file);
        } else {
          reject(new Error('Canvas to Blob failed'));
        }
      },
      'image/jpeg',
      0.95
    );
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}
