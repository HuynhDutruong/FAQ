import React from 'react';
import Image from 'next/image';
import { Star, MessageCircle } from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';

export default function IntroModalContent() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '8px 4px', lineHeight: '1.8', color: 'var(--color-dark)', textAlign: 'justify' }}>
      
      {/* 1. GIÁO PHẬN MỸ THO */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ color: 'var(--color-red)', marginBottom: '16px', fontSize: '1.3rem', fontWeight: 'bold', borderBottom: '2px solid rgba(211,47,47,0.2)', paddingBottom: '8px', textTransform: 'uppercase' }}>
          {t.introDioceseTitle}
        </h3>

        <div style={{ float: 'right', marginLeft: '16px', marginBottom: '8px', textAlign: 'center', width: '120px' }}>
          <div style={{ position: 'relative', width: '120px', height: '160px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <Image src="/images/bishop.jpg" alt={t.bishopName} fill sizes="120px" style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', marginTop: '8px', color: 'var(--color-dark)', lineHeight: '1.2' }}>{t.bishopTitle}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-subtle)', lineHeight: '1.2' }}>{t.bishopName}</div>
        </div>
        <p style={{ marginBottom: '16px' }}>
          {t.introDioceseDesc1}
        </p>
        <p style={{ marginBottom: '16px' }}>
          {t.introDioceseDesc2}
        </p>
      </div>

      {/* 2. GIÁO XỨ CHÁNH TOÀ */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ color: 'var(--color-red)', marginBottom: '16px', fontSize: '1.3rem', fontWeight: 'bold', borderBottom: '2px solid rgba(211,47,47,0.2)', paddingBottom: '8px', textTransform: 'uppercase' }}>
          {t.introParishTitle}
        </h3>
        
        <div style={{ float: 'left', marginRight: '16px', marginBottom: '8px', textAlign: 'center', width: '120px' }}>
          <div style={{ position: 'relative', width: '120px', height: '160px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <Image src="/images/priest.jpg" alt={t.priestName} fill sizes="120px" style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', marginTop: '8px', color: 'var(--color-dark)', lineHeight: '1.2' }}>{t.priestTitle}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-subtle)', lineHeight: '1.2' }}>{t.priestName}</div>
        </div>

        <p style={{ marginBottom: '16px' }}>
          {t.introParishDesc1}
        </p>
        <p style={{ marginBottom: '16px' }}>
          {t.introParishDesc2}
        </p>
      </div>

      {/* 3. THƯ VIỆN HÌNH ẢNH */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ color: 'var(--color-red)', marginBottom: '16px', fontSize: '1.3rem', fontWeight: 'bold', borderBottom: '2px solid rgba(211,47,47,0.2)', paddingBottom: '8px', textTransform: 'uppercase' }}>
          {t.galleryTitle}
        </h3>
        
        {/* Image Scroller */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '16px', 
          overflowX: 'auto', 
          paddingBottom: '16px',
          scrollSnapType: 'x mandatory'
        }}>
          {[
            { src: '/images/nhatho1.jpg', alt: 'Toàn cảnh Nhà thờ' },
            { src: '/images/nhatho3.jpg', alt: 'Tháp chuông độc lập' },
            { src: '/images/nhatho2.jpg', alt: 'Kiến trúc mái vòm bên trong' },
            { src: '/images/nhatho4.jpg', alt: 'Tượng Lòng Chúa Thương Xót' }
          ].map((img, i) => (
            <div key={i} style={{ 
              minWidth: '280px', 
              maxWidth: '320px', 
              height: '220px',
              flexShrink: 0, 
              scrollSnapAlign: 'start',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill
                sizes="320px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. BẢN ĐỒ */}
      <div>
        <h3 style={{ color: 'var(--color-red)', marginBottom: '16px', fontSize: '1.3rem', fontWeight: 'bold', borderBottom: '2px solid rgba(211,47,47,0.2)', paddingBottom: '8px', textTransform: 'uppercase' }}>
          {t.mapTitle}
        </h3>
        <p style={{ marginBottom: '12px' }}><strong>Địa chỉ:</strong> 32 Hùng Vương, Phường 7, TP. Mỹ Tho, tỉnh Tiền Giang</p>
        <div style={{ width: '100%', height: '280px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.3150242273614!2d106.35728341533256!3d10.356828592607063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aa588523b185b%3A0xe54ec99c64ef3cc4!2zTmjDoCB0aOG7nSBDaDkuaCB0w7JhIE3hu7kgVGhv!5e0!3m2!1svi!2s!4v1698765432100!5m2!1svi!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      
      {/* 5. ĐÁNH GIÁ TỪ GOOGLE */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ color: 'var(--color-red)', marginBottom: '16px', fontSize: '1.3rem', fontWeight: 'bold', borderBottom: '2px solid rgba(211,47,47,0.2)', paddingBottom: '8px', textTransform: 'uppercase' }}>
          {t.googleReviewTitle}
        </h3>
        
        <div style={{ 
          background: 'var(--color-input-bg)', 
          borderRadius: '12px', 
          padding: '20px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          border: '1px solid var(--color-border-subtle)'
        }}>
          {/* Header Reviews */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-dark)', lineHeight: 1 }}>4.8</div>
              <div>
                <div style={{ display: 'flex', color: '#fbbc04', gap: '2px', marginBottom: '4px' }}>
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-subtle)' }}>{t.googleReviewCount}</div>
              </div>
            </div>
            <a 
              href="https://search.google.com/local/writereview?placeid=ChIJWxhbUoilCjERxDzPZJzJT-U" 
              target="_blank" rel="noopener noreferrer"
              style={{ 
                background: '#1a73e8', color: 'white', padding: '8px 16px', 
                borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem',
                fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px'
              }}
            >
              <MessageCircle size={16} /> {t.googleReviewViewAll}
            </a>
          </div>

          {/* Review List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: t.testimonial1Name, time: '2025', text: t.testimonial1Text },
              { name: t.testimonial2Name, time: '2025', text: t.testimonial2Text }
            ].map((rv, idx) => (
              <div key={idx} style={{ paddingBottom: '16px', borderBottom: idx < 1 ? '1px solid var(--color-border-subtle)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-btn-subtle-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--color-subtle)' }}>
                    {rv.name ? rv.name.charAt(0) : 'M'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--color-dark)' }}>{rv.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-subtle)' }}>{rv.time}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', color: '#fbbc04', gap: '2px', marginBottom: '6px' }}>
                  <Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} />
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)', lineHeight: '1.5' }}>
                  &quot;{rv.text}&quot;
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
