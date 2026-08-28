'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Modal from '@/components/Modal';
import FAQForm from '@/components/FAQForm';
import FeedbackForm from '@/components/FeedbackForm';
import Rating from '@/components/Rating';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { db } from '@/lib/firebase';
import FacebookFeed from '@/components/FacebookFeed';
import IntroModalContent from '@/components/IntroModalContent';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import confetti from 'canvas-confetti';
import { GOSPEL_VERSES, getDailyGospelVerseIndex } from '@/lib/gospelVerses';

type Step = 'form' | 'rating' | 'success';

export default function Home() {
  const [activeModal, setActiveModal] = useState<'faq' | 'feedback' | 'intro' | null>(null);
  const [step, setStep] = useState<Step>('form');
  const [verseIndex] = useState(() => getDailyGospelVerseIndex());
  const router = useRouter();
  const { t, lang } = useLanguage();

  useEffect(() => {
    if (step === 'success') {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: ReturnType<typeof setInterval> = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults, particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults, particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    }
  }, [step]);

  const handleClose = () => {
    setActiveModal(null);
    setTimeout(() => setStep('form'), 300);
  };

  const handleFormSuccess = () => {
    setStep('rating');
  };

  const handleRatingSubmit = async (rating: number) => {
    try {
      await addDoc(collection(db, 'ratings'), {
        rating,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error saving rating', err);
    }
    setStep('success');
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  const currentVerse = GOSPEL_VERSES[verseIndex] || GOSPEL_VERSES[0];
  const verseText = currentVerse?.texts[lang] || currentVerse?.texts.vi || t.description;

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      position: 'relative',
      padding: '24px 20px 48px',
      background: 'var(--bg-gradient)',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box'
    }}>
      {/* Top Floating Language Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        maxWidth: '840px',
        margin: '0 auto 12px',
        zIndex: 50
      }}>
        <LanguageSwitcher />
      </div>

      {/* Main Container */}
      <div style={{
        width: '100%',
        maxWidth: '840px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        
        {/* ==================== 1. BRAND HERO (MONOCHROMATIC & CLEAN) ==================== */}
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '4px'
        }}>
          {/* Logo */}
          <div
            style={{
              position: 'relative',
              width: '72px',
              height: '72px',
              marginBottom: '10px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              padding: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
              <Image
                src="/logo.jpg"
                alt="Logo Xứ Đoàn"
                fill
                sizes="72px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>

          {/* Titles (Monochromatic bold & refined) */}
          <h1 style={{
            fontSize: 'clamp(1.2rem, 3.6vw, 1.7rem)',
            fontWeight: 900,
            color: 'var(--color-dark)',
            marginBottom: '3px',
            lineHeight: 1.25,
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}>
            {t.title}
          </h1>

          <h2 style={{
            fontSize: 'clamp(0.8rem, 2.2vw, 0.95rem)',
            fontWeight: 600,
            color: 'var(--color-subtle)',
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}>
            {t.subtitle}
          </h2>

          {/* Gospel Verse */}
          <p
            suppressHydrationWarning
            style={{
              margin: 0,
              color: 'var(--color-dark)',
              fontSize: 'clamp(0.82rem, 2vw, 0.92rem)',
              lineHeight: 1.55,
              fontStyle: 'italic',
              opacity: 0.85,
              maxWidth: '600px'
            }}
          >
            &ldquo;{verseText}&rdquo;
          </p>
        </div>

        {/* ==================== 2. PRIMARY ACTION: TRA CỨU GIỜ LỄ TOÀN QUỐC (NO ICONS) ==================== */}
        <div
          onClick={() => router.push('/gio-le?gps=1')}
          className="liquid-glass"
          style={{
            width: '100%',
            padding: '18px 22px',
            borderRadius: '18px',
            cursor: 'pointer',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h3 style={{
                margin: 0,
                fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                fontWeight: 900,
                color: 'var(--color-dark)',
                lineHeight: 1.2
              }}>
                Tra Cứu Giờ Lễ Toàn Quốc
              </h3>
              <span style={{
                padding: '2px 8px',
                backgroundColor: 'rgba(0, 0, 0, 0.06)',
                color: 'var(--color-dark)',
                borderRadius: '999px',
                fontSize: '0.7rem',
                fontWeight: 800
              }}>
                3.300+ Nhà Thờ
              </span>
            </div>
            <div style={{
              fontSize: '0.82rem',
              color: 'var(--color-subtle)',
              marginTop: '4px'
            }}>
              Định vị GPS tự động • 27 Giáo phận tại Việt Nam
            </div>
          </div>

          <div style={{
            fontSize: '0.88rem',
            fontWeight: 800,
            color: 'var(--color-dark)',
            flexShrink: 0
          }}>
            Tra Cứu →
          </div>
        </div>

        {/* ==================== 3. 2x2 ACTION TILES (MONOCHROMATIC & NO ICONS) ==================== */}
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '12px'
        }}>
          
          {/* Tile 1: Vấn Đáp Giáo Lý */}
          <div
            onClick={() => router.push('/van-dap')}
            className="liquid-glass"
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '4px',
              border: '1px solid rgba(0, 0, 0, 0.09)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.2 }}>
                Vấn Đáp Giáo Lý
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-subtle)', fontWeight: 600 }}>→</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.35 }}>
              Hỏi đáp đức tin, bí tích & phụng vụ
            </div>
          </div>

          {/* Tile 2: Gửi Thắc Mắc Cho Ban Mục Vụ */}
          <div
            onClick={() => { setStep('form'); setActiveModal('faq'); }}
            className="liquid-glass"
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '4px',
              border: '1px solid rgba(0, 0, 0, 0.09)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.2 }}>
                Gửi Thắc Mắc
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-subtle)', fontWeight: 600 }}>→</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.35 }}>
              Nhận hồi đáp riêng từ Ban Mục Vụ
            </div>
          </div>

          {/* Tile 3: Ý Kiến Góp Ý */}
          <div
            onClick={() => { setStep('form'); setActiveModal('feedback'); }}
            className="liquid-glass"
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '4px',
              border: '1px solid rgba(0, 0, 0, 0.09)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.2 }}>
                Ý Kiến Góp Ý
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-subtle)', fontWeight: 600 }}>→</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.35 }}>
              Đóng góp ý kiến xây dựng xứ đoàn
            </div>
          </div>

          {/* Tile 4: Chánh Tòa Mỹ Tho */}
          <div
            onClick={() => setActiveModal('intro')}
            className="liquid-glass"
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '4px',
              border: '1px solid rgba(0, 0, 0, 0.09)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.2 }}>
                Chánh Tòa Mỹ Tho
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-subtle)', fontWeight: 600 }}>→</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.35 }}>
              Lịch sử 130 năm & Bản đồ chỉ đường
            </div>
          </div>
        </div>

      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'faq'}
        onClose={handleClose}
        title={step === 'form' ? t.modalFAQTitle : step === 'rating' ? t.modalRatingTitle : t.modalSuccessTitle}
      >
        {step === 'form' && <FAQForm onSuccess={handleFormSuccess} />}
        {step === 'rating' && <Rating onSubmit={handleRatingSubmit} />}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <h2>{t.thanksTitle}</h2>
            <p style={{ opacity: 0.8, marginTop: '8px' }}>{t.thanksDescFAQ}</p>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={activeModal === 'feedback'}
        onClose={handleClose}
        title={step === 'form' ? t.modalFeedbackTitle : step === 'rating' ? t.modalRatingTitle : t.modalSuccessTitle}
      >
        {step === 'form' && <FeedbackForm onSuccess={handleFormSuccess} />}
        {step === 'rating' && <Rating onSubmit={handleRatingSubmit} />}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <h2>{t.thanksTitle}</h2>
            <p style={{ opacity: 0.8, marginTop: '8px' }}>{t.thanksDescFeedback}</p>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={activeModal === 'intro'}
        onClose={handleClose}
        title={t.btnIntroDiocese}
      >
        <IntroModalContent />
      </Modal>
    </main>
  );
}
