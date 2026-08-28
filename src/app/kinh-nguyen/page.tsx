'use client';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useState, useMemo } from 'react';

const PRAYERS = [
  {
    id: 'kinh-cha-tao',
    title: 'Kinh Cha Tạo',
    category: 'Co-ban',
    content: 'Lạy Cha ơi, tôi tâu: Cha yêu thương Cha trong trời thứ mười, xin thánh danh Cha được tôn; xin nước Cha đến; xin ý muốn Cha được thành trên đất như nó được thành trong trời. Xin ban cho chúng con hôm nay bánh chúng con hằng ngày; xin tha cho chúng con những tội lỗi chúng con, như chúng con cũng tha cho những kẻ mắc lỗi với chúng con; xin chớ để chúng con sa vào cám dỗ, nhưng xin cứu chúng con khỏi điều dữ. A-men.'
  },
  {
    id: 'kinh-kính-mừng',
    title: 'Kinh Kính Mừng',
    category: 'Co-ban',
    content: 'Kính mừng bà Maria, Ngài đầy ơn phúc, Chúa ở cùng Ngài, Ngài là đứa trẻ có phúc lạc nhất giữa các phụ nữ, và Chúa Giêsu, quả tim của Ngài, là có phúc lạc. Thánh Maria, Mẹ Thiên Chúa, cầu thay cho chúng con là những tội nhân, bây giờ và trong giờ chúng con chết. A-men.'
  },
  {
    id: 'kinh-tin-kinh',
    title: 'Kinh Tin Kính',
    category: 'Co-ban',
    content: 'Tôi tin Thiên Chúa Cha toàn năng, Tạo hóa trời đất và mọi vật hữu hình vô hình. Tôi tin Chúa Giêsu Ki-to, là Con một của Thiên Chúa, sinh từ Cha từ trước mọi đời; là Thiên Chúa từ Thiên Chúa, Sáng từ Sáng, Thiên Chúa thật từ Thiên Chúa thật... A-men.'
  },
  {
    id: 'kinh-man-coi',
    title: 'Kinh Mân Côi (Hạt)',
    category: 'Cau-nguyen',
    content: 'Kính mừng bà Maria (10 lần). Tôi tâu Cha (1 lần). Mầu nhiệm Vui: Lạy Cha yêu thương (10 lần) × 5 mầu. Mầu nhiệm Sáng: × 5 mầu. Mầu nhiệm Thương: × 5 mầu. Mầu nhiệm Mừng: × 5 mầu.'
  },
  {
    id: 'kinh-de-thanh-khanh',
    title: 'Kinh Dâng Thánh Khánh',
    category: 'Cau-nguyen',
    content: 'Lạy Chúa, xin nhân danh Chúa Giêsu Ki-to, bởi công lao Chúa, chúng con dâng Chúa cơm bánh thánh này là bách hợp xóa sạch tội lỗi thế gian. Xin Chúa nhân danh Chúa Giêsu, nhân công lao của Chúa, cũng ban ơn bình an cho chúng con. A-men.'
  },
  {
    id: 'kinh-tạ-on',
    title: 'Kinh Tạ Ơn Sau Lễ',
    category: 'Cau-nguyen',
    content: 'Lạy Chúa Giêsu Ki-to, bởi công lao Chúa, bởi nỗi đau thương của Chúa, xin bỏ lửa chân nguyện của những thánh nhân, chúng con khẩn cầu để hàn gắn tội lỗi của chúng con... A-men.'
  }
];

const CATEGORIES = [
  { id: 'Co-ban', label: 'Cơ Bản' },
  { id: 'Cau-nguyen', label: 'Cầu Nguyện' }
];

export default function KinhNguyenPage() {
  const [selectedCategory, setSelectedCategory] = useState('Co-ban');
  const [expandedId, setExpandedId] = useState<string | null>(PRAYERS[0].id);

  const filtered = useMemo(() =>
    PRAYERS.filter(p => p.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-gradient)' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-btn-subtle-bg)', color: 'var(--color-dark)' }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)', margin: 0, flex: 1, textAlign: 'center' }}>
          Kinh Nguyện
        </h1>
        <div style={{ width: '40px' }} />
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', maxWidth: '900px', margin: '0 auto', width: '100%', gap: '16px' }}>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: selectedCategory === cat.id ? 'var(--color-red)' : 'rgba(211, 47, 47, 0.1)',
                color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--color-dark)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Prayers List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(prayer => (
            <div
              key={prayer.id}
              className="liquid-glass"
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(211, 47, 47, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.4)'
              }}
            >
              <button
                onClick={() => setExpandedId(expandedId === prayer.id ? null : prayer.id)}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.3 }}>
                    📖 {prayer.title}
                  </h3>
                </div>
                <div style={{ flexShrink: 0, color: 'var(--color-red)', fontWeight: 700 }}>
                  {expandedId === prayer.id ? '−' : '+'}
                </div>
              </button>

              {expandedId === prayer.id && (
                <div style={{ padding: '0 14px 14px', borderTop: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <p style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    color: 'var(--color-dark)',
                    lineHeight: 1.8,
                    fontStyle: 'italic',
                    
                  }}>
                    {prayer.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
