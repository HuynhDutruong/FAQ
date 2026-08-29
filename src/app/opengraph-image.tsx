import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Mỹ Tho';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/logo.jpg'));
  const logoSrc = `data:image/jpeg;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #7F1D1D 0%, #D32F2F 55%, #8B1A1A 100%)',
          color: '#FFFFFF',
          padding: '64px',
          textAlign: 'center'
        }}
      >
        <img
          src={logoSrc}
          width={190}
          height={190}
          style={{ borderRadius: '50%', border: '6px solid rgba(253, 230, 138, 0.9)' }}
          alt=""
        />
        <div style={{ display: 'flex', fontSize: 60, fontWeight: 800, marginTop: 34, lineHeight: 1.15 }}>
          Xứ Đoàn Các Thánh Tử Đạo Việt Nam
        </div>
        <div style={{ display: 'flex', fontSize: 34, marginTop: 16, color: '#FDE68A' }}>
          Giáo Xứ Chánh Tòa — Giáo Phận Mỹ Tho
        </div>
        <div style={{ display: 'flex', fontSize: 25, marginTop: 30, opacity: 0.9 }}>
          Giờ lễ · Kinh Thánh · Kinh nguyện · Vấn đáp giáo lý
        </div>
      </div>
    ),
    size
  );
}
