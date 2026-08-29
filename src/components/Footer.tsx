'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DEFAULT_CHANH_TOA_INFO, MassTime } from '@/lib/massTimes';

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [chanhToa, setChanhToa] = useState<MassTime>(DEFAULT_CHANH_TOA_INFO);

  // Lắng nghe dữ liệu Giờ Lễ & Địa chỉ Nhà Thờ Chánh Tòa Mỹ Tho trực tiếp từ Firestore
  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, 'massTimes', 'mt-my-tho-chanh-toa'), (snap) => {
        if (snap.exists()) {
          const data = snap.data() as Omit<MassTime, 'id'>;
          setChanhToa({
            ...data,
            id: snap.id
          });
        }
      }, (error) => {
        console.warn('Firestore snapshot error in Footer:', error);
      });

      return () => unsub();
    } catch (e) {
      console.warn('Error setting up Footer snapshot:', e);
    }
  }, []);

  // Hide footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Format giờ lễ
  const weekdayStr = chanhToa.weekdayMass && chanhToa.weekdayMass.length > 0
    ? chanhToa.weekdayMass.join(' | ')
    : '05:00 | 17:30';

  const saturdayStr = chanhToa.saturdayMass && chanhToa.saturdayMass.length > 0
    ? chanhToa.saturdayMass.join(' | ')
    : null;

  const sundayStr = chanhToa.sundayMass && chanhToa.sundayMass.length > 0
    ? chanhToa.sundayMass.join(' | ')
    : '05:30 | 07:00 | 16:00 | 18:00';

  const addressStr = chanhToa.address || '32 Hùng Vương, Phường 7, TP. Mỹ Tho, Tiền Giang';

  return (
    <footer style={{
      width: '100%',
      backgroundColor: 'var(--color-card-bg)',
      borderTop: '1px solid var(--color-border-subtle)',
      color: 'var(--color-dark)',
      fontSize: '0.85rem',
      marginTop: 'auto'
    }}>
      {/* Subtle Top Red Accent Line */}
      <div style={{
        height: '2px',
        width: '100%',
        backgroundColor: 'var(--color-red)'
      }} />

      {/* Main Content Container */}
      <div style={{
        maxWidth: '1060px',
        width: '100%',
        margin: '0 auto',
        padding: '30px 16px 20px',
        boxSizing: 'border-box'
      }}>
        <div className="footer-grid">
          
          {/* CỘT 1: THÔNG TIN XỨ ĐOÀN */}
          <div>
            <div style={{
              fontSize: '0.92rem',
              fontWeight: 800,
              color: 'var(--color-red)',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              marginBottom: '4px'
            }}>
              {t.footerChapterName || 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam'}
            </div>
            <div style={{
              fontSize: '0.78rem',
              color: 'var(--color-subtle)',
              fontWeight: 600,
              marginBottom: '10px'
            }}>
              {t.subtitle || 'Giáo Xứ Chánh Tòa — Giáo Phận Mỹ Tho'}
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '0.82rem',
              color: 'var(--color-muted)',
              lineHeight: 1.5
            }}>
              <div>{addressStr}</div>
              <div>
                <a
                  href="mailto:notification2411.huynhdutruong@gmail.com"
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                >
                  Email: notification2411.huynhdutruong@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* CỘT 2: GIỜ THÁNH LỄ (ĐỒNG BỘ CƠ SỞ DỮ LIỆU CHÁNH TÒA MỸ THO) */}
          <div>
            <div style={{
              fontSize: '0.92rem',
              fontWeight: 800,
              color: 'var(--color-red)',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              marginBottom: '10px'
            }}>
              {t.footerMassTimesTitle || 'Giờ Thánh Lễ'}
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              fontSize: '0.82rem',
              color: 'var(--color-muted)',
              lineHeight: 1.5
            }}>
              <div>
                <strong>{t.footerWeekday || 'Ngày thường'}:</strong> {weekdayStr}
              </div>
              {saturdayStr && (
                <div>
                  <strong>Thứ Bảy:</strong> {saturdayStr}
                </div>
              )}
              <div>
                <strong>{t.footerSunday || 'Chúa Nhật'}:</strong> {sundayStr}
              </div>
              <div style={{ color: 'var(--color-subtle)', fontSize: '0.76rem', fontStyle: 'italic', marginTop: '2px' }}>
                {t.footerConfession || 'Bí tích Giải tội: Trước và sau các Thánh lễ'}
              </div>
            </div>
          </div>

          {/* CỘT 3: MỤC VỤ & TRA CỨU */}
          <div>
            <div style={{
              fontSize: '0.92rem',
              fontWeight: 800,
              color: 'var(--color-red)',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              marginBottom: '10px'
            }}>
              {t.footerPastoralTitle || 'Mục Vụ & Tra Cứu'}
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '0.82rem'
            }}>
              <Link
                href="/kinh-thanh"
                style={{
                  color: 'var(--color-dark)',
                  textDecoration: 'none',
                  fontWeight: 700,
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark)'}
              >
                Kinh Thánh Trọn Bộ (73 Sách Cựu & Tân Ước)
              </Link>
              <Link
                href="/gioi-thieu"
                style={{
                  color: 'var(--color-dark)',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark)'}
              >
                {t.footerCathedralHistory || 'Giới thiệu Xứ Đoàn & Lịch sử Chánh Tòa'}
              </Link>
              <Link
                href="/gio-le"
                style={{
                  color: 'var(--color-dark)',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark)'}
              >
                {t.footerLookupMass || 'Tra cứu giờ lễ 27 Giáo phận toàn quốc'}
              </Link>
              <Link
                href="/kinh-nguyen"
                style={{
                  color: 'var(--color-dark)',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark)'}
              >
                {t.footer216Prayers || '216 Kinh Nguyện & Mân Côi'}
              </Link>
              <Link
                href="/van-dap"
                style={{
                  color: 'var(--color-dark)',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark)'}
              >
                {t.footerGLHTCG || 'Vấn đáp Giáo Lý Hội Thánh'}
              </Link>
            </div>
          </div>

          {/* CỘT 4: LIÊN KẾT CHÍNH THỨC */}
          <div>
            <div style={{
              fontSize: '0.92rem',
              fontWeight: 800,
              color: 'var(--color-red)',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              marginBottom: '10px'
            }}>
              {t.footerOfficialLinksTitle || 'Liên Kết Chính Thức'}
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '0.82rem'
            }}>
              <a
                href="https://tnttgioitremytho.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--color-dark)',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark)'}
              >
                TNTT Giáo Phận Mỹ Tho
              </a>
              <a
                href="https://tntt.vn/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--color-dark)',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark)'}
              >
                Tổng Liên Đoàn TNTT VN (Anrê Phú Yên)
              </a>
              <a
                href="https://giaophanmytho.net"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--color-dark)',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark)'}
              >
                {t.footerDioceseMyTho || 'Giáo Phận Mỹ Tho'}
              </a>
              <a
                href="https://hdgmvietnam.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--color-dark)',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark)'}
              >
                {t.footerHdgmvn || 'Hội Đồng Giám Mục Việt Nam'}
              </a>
              <a
                href="https://www.vaticannews.va/vi.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--color-dark)',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark)'}
              >
                {t.footerVaticanNews || 'Vatican News'}
              </a>
            </div>
          </div>

        </div>

        {/* DÒNG BẢN QUYỀN & CHỮ KÝ */}
        <div style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '0.78rem',
          color: 'var(--color-subtle)'
        }}>
          <div>
            &copy; {new Date().getFullYear()} {t.footerCopyrightText || 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Mỹ Tho.'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>{t.footerDevelopedBy || 'Thực hiện bởi'}</span>
            <a
              href="https://www.hugowishpax.studio"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-dark)',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              <span>Hugo Studio</span>
              <span style={{ color: 'var(--color-red)', fontSize: '14px', lineHeight: 1 }}>•</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
