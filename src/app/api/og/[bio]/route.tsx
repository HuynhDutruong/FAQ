import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Import bio data - we need to duplicate the essential data here for server-side
const BIO_DATA: Record<string, { name: string; role: string; image?: string }> = {
  // BDH Bios
  'bdh-le-hoang-thien-phuc': { name: 'Matthêu Lê Hoàng Thiên Phúc', role: 'Xứ Đoàn Trưởng', image: '/images/bdh_le_hoang_thien_phuc.jpg' },
  'bdh-le-dang-thu-thao': { name: 'Maria Lê Đặng Thu Thảo', role: 'Xứ Đoàn Phó nội vụ' },
  'bdh-le-gia-huy': { name: 'Phêrô Lê Gia Huy', role: 'Xứ Đoàn Phó ngoại vụ' },
  'bdh-nguyen-phuc-khang': { name: 'Batôlômêô Nguyễn Phúc Khang', role: 'Thư Ký Đoàn' },
  'bdh-tran-thao-my': { name: 'Maria Trần Thảo My', role: 'Thủ Quỹ Đoàn' },
  'bdh-vo-tan-hoang-viet': { name: 'Thầy Augustinô Võ Tấn Hoàng Việt', role: 'Phụ trách Giáo Lý Viên', image: '/images/bdh_vo_tan_hoang_viet.jpg' },
  'bdh-le-thanh-nhan': { name: 'Têrêsa Lê Thanh Nhàn', role: 'Thư ký Liên đoàn', image: '/images/bdh_le_thanh_nhan.jpg' },
  // Chaplains
  'cha-nguyen-van-khuong': { name: 'Cha Nguyễn Văn Khuông', role: 'Tuyên uý Xứ Đoàn' },
  'cha-pham-minh-tuyen': { name: 'Cha Phạm Minh Tuyền', role: 'Tuyên uý Xứ Đoàn' },
  'cha-nguyen-huu-truong': { name: 'Cha Nguyễn Hữu Trường', role: 'Tuyên uý Xứ Đoàn' },
  'cha-phong': { name: 'Cha Phong', role: 'Tuyên uý Xứ Đoàn' },
  'cha-nguyen-ngoc': { name: 'Cha Phêrô Nguyễn Ngọc', role: 'Tuyên uý Xứ Đoàn' },
  // Popes
  'pope-leo-xiv': { name: 'Đức Thánh Cha Lêô XIV', role: 'Giáo hoàng' },
  // Bishops
  'duc-cha-tran-van-thien': { name: 'Đức Cha Giuse Trần Văn Thiện', role: 'Giám mục Tiên khởi' },
  'duc-cha-ta-phan-thuyen': { name: 'Đức Cha Tả Phan Thuyên', role: 'Giám mục Chính tòa' },
  'duc-cha-pierre': { name: 'Đức Cha Pierre', role: 'Giám mục' },
  'duc-cha-vu-duc-khoi': { name: 'Đức Cha Vũ Đức Khôi', role: 'Giám mục Chính tòa' },
  'duc-cha-paul': { name: 'Đức Cha Paul', role: 'Giám mục' },
  // Pastors
  'lm-do-van-kha': { name: 'Lm Đỗ Văn Kha', role: 'Chánh xứ' },
  'lm-nguyen-van-binh': { name: 'Lm Nguyễn Văn Bình', role: 'Chánh xứ' },
  'lm-tran-van-khanh': { name: 'Lm Trần Văn Khánh', role: 'Chánh xứ' },
  'lm-nguyen-van-hoa': { name: 'Lm Nguyễn Văn Hòa', role: 'Chánh xứ' },
  'lm-ha-van-xung': { name: 'Lm Hà Văn Xung', role: 'Chánh xứ' },
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ bio: string }> }
) {
  const { bio: bioId } = await params;
  const bio = BIO_DATA[bioId];

  if (!bio) {
    // Return default image if bio not found
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
          <div style={{ display: 'flex', fontSize: 48, fontWeight: 800, marginTop: 34, lineHeight: 1.15 }}>
            Xứ Đoàn Các Thánh Tử Đạo Việt Nam
          </div>
          <div style={{ display: 'flex', fontSize: 28, marginTop: 16, color: '#FDE68A' }}>
            Giáo Xứ Chánh Tòa — Giáo Phận Mỹ Tho
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  // Try to load person's image
  let personImageSrc = '';
  if (bio.image) {
    try {
      const imgData = await readFile(join(process.cwd(), 'public', bio.image));
      personImageSrc = `data:image/jpeg;base64,${imgData.toString('base64')}`;
    } catch {
      // Image not found, use default
    }
  }

  const logo = await readFile(join(process.cwd(), 'public/logo.jpg'));
  const logoSrc = `data:image/jpeg;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #7F1D1D 0%, #D32F2F 55%, #8B1A1A 100%)',
          color: '#FFFFFF',
          padding: '48px',
          gap: '40px'
        }}
      >
        {/* Left side - Person info */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '16px' }}>
          <div style={{ display: 'flex', fontSize: 22, color: '#FDE68A', fontWeight: 600 }}>
            {bio.role}
          </div>
          <div style={{ display: 'flex', fontSize: 42, fontWeight: 800, lineHeight: 1.2 }}>
            {bio.name}
          </div>
          <div style={{ display: 'flex', fontSize: 20, color: 'rgba(255,255,255,0.8)', marginTop: '8px' }}>
            Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Mỹ Tho
          </div>
        </div>

        {/* Right side - Portrait */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {personImageSrc ? (
            <img
              src={personImageSrc}
              width={280}
              height={280}
              style={{ borderRadius: '50%', border: '6px solid rgba(253, 230, 138, 0.9)', objectFit: 'cover' }}
              alt={bio.name}
            />
          ) : (
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: '50%',
                border: '6px solid rgba(253, 230, 138, 0.9)',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 80,
                fontWeight: 800,
                color: '#FDE68A'
              }}
            >
              {bio.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Logo */}
        <img
          src={logoSrc}
          width={60}
          height={60}
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            borderRadius: '50%',
            opacity: 0.8
          }}
          alt=""
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
