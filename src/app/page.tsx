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
import {
  MessageCircleQuestion,
  MessageSquarePlus,
  CheckCircle,
  Clock,
  Info,
  Sparkles,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { db } from '@/lib/firebase';
import IntroModalContent from '@/components/IntroModalContent';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import confetti from 'canvas-confetti';
import { GOSPEL_VERSES, getRandomGospelVerseIndex } from '@/lib/gospelVerses';

type Step = 'form' | 'rating' | 'success';

export default function Home() {
  const [activeModal, setActiveModal] = useState<'faq' | 'feedback' | 'intro' | null>(null);
  const [step, setStep] = useState<Step>('form');
  const [verseIndex] = useState(() => getRandomGospelVerseIndex());
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
      padding: '12px 14px 48px',
      background: 'var(--bg-gradient)',
      justifyContent: 'center',
      boxSizing: 'border-box'
    }}>
      {/* Top Utility Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '680px',
        margin: '0 auto 10px',
        zIndex: 50
      }}>
        <span style={{
          padding: '3px 10px',
          borderRadius: '999px',
          backgroundColor: 'var(--color-btn-subtle-bg)',
          border: '1px solid var(--color-border-subtle)',
          fontSize: '0.72rem',
          fontWeight: 800,
          color: 'var(--color-dark)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Sparkles size={11} color="var(--color-red)" />
          <span>PHỤNG VỤ 2026</span>
        </span>

        <LanguageSwitcher />
      </div>

      {/* Main Container */}
      <div style={{
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        
        {/* ==================== 1. BRAND HEADER (COMPACT & CLEAN) ==================== */}
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '4px 0 6px'
        }}>
          {/* Logo */}
          <div
            className="logo-floating"
            style={{
              position: 'relative',
              width: '74px',
              height: '74px',
              marginBottom: '10px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 6px 20px rgba(255, 69, 58, 0.2), 0 0 0 2.5px rgba(251, 192, 45, 0.65)',
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
                sizes="74px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>

          {/* Titles */}
          <h1 style={{
            fontSize: 'clamp(1.15rem, 4.4vw, 1.6rem)',
            fontWeight: 900,
            color: 'var(--color-red)',
            marginBottom: '2px',
            lineHeight: 1.25,
            textTransform: 'uppercase',
            letterSpacing: '0.2px'
          }}>
            {t.title}
          </h1>

          <h2 style={{
            fontSize: 'clamp(0.78rem, 2.8vw, 0.95rem)',
            fontWeight: 700,
            color: 'var(--color-yellow)',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
          }}>
            {t.subtitle}
          </h2>

          {/* Slim Gospel Verse */}
          <div style={{
            padding: '6px 14px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-btn-subtle-bg)',
            border: '1px solid var(--color-border-subtle)',
            maxWidth: '500px',
            width: '100%'
          }}>
            <p style={{
              margin: 0,
              color: 'var(--color-dark)',
              fontSize: '0.8rem',
              lineHeight: 1.45,
              fontStyle: 'italic',
              opacity: 0.9
            }}>
              &ldquo;{verseText}&rdquo;
            </p>
          </div>
        </div>

        {/* ==================== 2. PRIMARY HERO: TRA CỨU GIỜ LỄ (SLIM WIDGET) ==================== */}
        <div
          onClick={() => router.push('/gio-le')}
          className="liquid-glass"
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
            border: '1.5px solid rgba(220, 38, 38, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            boxShadow: '0 6px 20px rgba(220, 38, 38, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 10px rgba(211, 47, 47, 0.3)'
            }}>
              <Clock size={22} />
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1px' }}>
                <span style={{
                  padding: '1px 6px',
                  backgroundColor: 'var(--color-red)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  fontSize: '0.62rem',
                  fontWeight: 900
                }}>
                  3.300+ NHÀ THỜ
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--color-subtle)', fontWeight: 700 }}>
                  27 GIÁO PHẬN
                </span>
              </div>
              <h3 style={{
                margin: 0,
                fontSize: '1rem',
                fontWeight: 900,
                color: 'var(--color-dark)',
                lineHeight: 1.2
              }}>
                Tra Cứu Giờ Lễ Toàn Quốc
              </h3>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                Định vị GPS tự động • Tìm nhà thờ gần bạn
              </div>
            </div>
          </div>

          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-card-bg)',
            border: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-red)',
            flexShrink: 0
          }}>
            <ChevronRight size={18} />
          </div>
        </div>

        {/* ==================== 3. COMPACT BENTO GRID (2x2) ==================== */}
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px'
        }}>
          
          {/* Tile 1: Vấn Đáp Giáo Lý (Page /van-dap) */}
          <div
            onClick={() => router.push('/van-dap')}
            className="liquid-glass"
            style={{
              padding: '14px',
              borderRadius: '18px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '8px',
              minHeight: '92px',
              border: '1px solid var(--glass-border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                backgroundColor: 'rgba(37, 99, 235, 0.12)',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={18} />
              </div>
              <ChevronRight size={15} color="var(--color-subtle)" />
            </div>

            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.2 }}>
                Vấn Đáp Giáo Lý
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle)', marginTop: '2px', lineHeight: 1.3 }}>
                Giải đáp đức tin & bí tích
              </div>
            </div>
          </div>

          {/* Tile 2: Gửi Câu Hỏi Cho Ban Mục Vụ */}
          <div
            onClick={() => { setStep('form'); setActiveModal('faq'); }}
            className="liquid-glass"
            style={{
              padding: '14px',
              borderRadius: '18px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '8px',
              minHeight: '92px',
              border: '1px solid var(--glass-border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                backgroundColor: 'rgba(220, 38, 38, 0.12)',
                color: 'var(--color-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageCircleQuestion size={18} />
              </div>
              <ChevronRight size={15} color="var(--color-subtle)" />
            </div>

            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.2 }}>
                Gửi Thắc Mắc
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle)', marginTop: '2px', lineHeight: 1.3 }}>
                Nhận hồi đáp từ Cha Xứ
              </div>
            </div>
          </div>

          {/* Tile 3: Ý Kiến Đóng Góp */}
          <div
            onClick={() => { setStep('form'); setActiveModal('feedback'); }}
            className="liquid-glass"
            style={{
              padding: '14px',
              borderRadius: '18px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '8px',
              minHeight: '92px',
              border: '1px solid var(--glass-border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                backgroundColor: 'rgba(217, 119, 6, 0.12)',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageSquarePlus size={18} />
              </div>
              <ChevronRight size={15} color="var(--color-subtle)" />
            </div>

            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.2 }}>
                Ý Kiến Góp Ý
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle)', marginTop: '2px', lineHeight: 1.3 }}>
                Xây dựng & phản hồi
              </div>
            </div>
          </div>

          {/* Tile 4: Chánh Tòa Mỹ Tho */}
          <div
            onClick={() => setActiveModal('intro')}
            className="liquid-glass"
            style={{
              padding: '14px',
              borderRadius: '18px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '8px',
              minHeight: '92px',
              border: '1px solid var(--glass-border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                backgroundColor: 'rgba(5, 150, 105, 0.12)',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Info size={18} />
              </div>
              <ChevronRight size={15} color="var(--color-subtle)" />
            </div>

            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.2 }}>
                Chánh Tòa Mỹ Tho
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle)', marginTop: '2px', lineHeight: 1.3 }}>
                Lịch sử & Bản đồ Maps
              </div>
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
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-red)' }}>
            <CheckCircle size={64} style={{ margin: '0 auto 16px', color: '#10B981' }} />
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
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-yellow)' }}>
            <CheckCircle size={64} style={{ margin: '0 auto 16px', color: '#10B981' }} />
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
