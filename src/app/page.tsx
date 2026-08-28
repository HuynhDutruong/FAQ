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
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { db } from '@/lib/firebase';
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
      padding: '20px 24px 60px',
      background: 'var(--bg-gradient)',
      boxSizing: 'border-box'
    }}>
      {/* Top Floating Language Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        maxWidth: '1060px',
        margin: '0 auto 16px',
        zIndex: 50
      }}>
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <div style={{
        width: '100%',
        maxWidth: '1060px',
        margin: '0 auto 28px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div
          className="logo-floating"
          style={{
            position: 'relative',
            width: '88px',
            height: '88px',
            marginBottom: '14px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 10px 30px rgba(255, 69, 58, 0.25), 0 0 0 3px rgba(251, 192, 45, 0.7)',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
            <Image src="/logo.jpg" alt="Logo Xứ Đoàn" fill sizes="88px" style={{ objectFit: 'contain' }} priority />
          </div>
        </div>

        <h1 style={{
          fontSize: 'clamp(1.4rem, 4vw, 2.3rem)',
          fontWeight: 900,
          color: 'var(--color-red)',
          marginBottom: '4px',
          lineHeight: 1.25,
          textTransform: 'uppercase',
          letterSpacing: '0.3px'
        }}>
          {t.title}
        </h1>

        <h2 style={{
          fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
          fontWeight: 700,
          color: 'var(--color-yellow)',
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {t.subtitle}
        </h2>

        <p
          suppressHydrationWarning
          style={{
            margin: 0,
            color: 'var(--color-dark)',
            fontSize: 'clamp(0.88rem, 2vw, 1.02rem)',
            maxWidth: '680px',
            lineHeight: 1.6,
            fontStyle: 'italic',
            opacity: 0.9
          }}
        >
          &ldquo;{verseText}&rdquo;
        </p>
      </div>

      {/* SECTION 1: TRA CỨU GIỜ LỄ - HERO CARD */}
      <div style={{
        width: '100%',
        maxWidth: '1060px',
        margin: '0 auto 32px'
      }}>
        <div
          onClick={() => router.push('/gio-le')}
          className="liquid-glass"
          style={{
            padding: 'clamp(24px, 5vw, 40px)',
            borderRadius: '28px',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.1) 0%, rgba(211, 47, 47, 0.05) 100%)',
            border: '1.5px solid rgba(211, 47, 47, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'clamp(18px, 4vw, 28px)',
            minHeight: '200px',
            boxShadow: '0 12px 32px rgba(211, 47, 47, 0.12)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', justifyContent: 'space-between' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #D32F2F, #C62828)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(211, 47, 47, 0.3)',
              flexShrink: 0
            }}>
              <Clock size={32} strokeWidth={1.8} />
            </div>

            <span style={{
              padding: '6px 16px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 800,
              backgroundColor: 'var(--color-red)',
              color: '#FFFFFF',
              letterSpacing: '0.4px',
              whiteSpace: 'nowrap'
            }}>
              3.300+ NHÀ THỜ
            </span>
          </div>

          <div>
            <h2 style={{
              margin: '0 0 12px',
              fontSize: 'clamp(1.4rem, 4vw, 1.9rem)',
              fontWeight: 900,
              color: 'var(--color-dark)',
              lineHeight: 1.3
            }}>
              Tra Cứu Giờ Lễ Toàn Quốc
            </h2>

            <p style={{
              margin: 0,
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              color: 'var(--color-subtle)',
              lineHeight: 1.6,
              maxWidth: '600px'
            }}>
              Tìm giờ lễ Chúa Nhật & ngày thường của 27 Giáo phận Việt Nam. Hệ thống GPS tự động định vị nhà thờ gần nhất.
            </p>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            fontWeight: 800,
            color: 'var(--color-red)',
            marginTop: '8px'
          }}>
            <span>Mở Bản Đồ Ngay</span>
            <ArrowRight size={20} />
          </div>
        </div>
      </div>

      {/* SECTION 2: VẤN ĐÁP GIÁO LÝ - DETAILED FEATURE */}
      <div style={{
        width: '100%',
        maxWidth: '1060px',
        margin: '0 auto 32px'
      }}>
        <div
          onClick={() => router.push('/van-dap')}
          className="liquid-glass"
          style={{
            padding: 'clamp(24px, 5vw, 36px)',
            borderRadius: '28px',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.04) 100%)',
            border: '1.5px solid rgba(37, 99, 235, 0.2)',
            boxShadow: '0 12px 32px rgba(37, 99, 235, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', marginBottom: '20px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'rgba(37, 99, 235, 0.12)',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <BookOpen size={28} strokeWidth={1.8} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Chi Tiết & Trích Dẫn
                </span>
              </div>

              <h2 style={{
                margin: '0 0 8px',
                fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
                fontWeight: 900,
                color: 'var(--color-dark)',
                lineHeight: 1.3
              }}>
                Vấn Đáp Giáo Lý & Đức Tin
              </h2>

              <p style={{
                margin: 0,
                fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                color: 'var(--color-subtle)',
                lineHeight: 1.6
              }}>
                Hỏi đáp chi tiết với trích dẫn Kinh Thánh về phụng vụ, bí tích, hôn nhân, gia đình & đời sống hôn nhân. Tất cả câu trả lời đều từ Ban Mục Vụ.
              </p>
            </div>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            fontWeight: 800,
            color: '#2563EB'
          }}>
            <span>Xem Giải Đáp Chi Tiết</span>
            <ArrowRight size={20} />
          </div>
        </div>
      </div>

      {/* SECTION 3: ACTION TILES - FAQ, FEEDBACK, INFO */}
      <div style={{
        width: '100%',
        maxWidth: '1060px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '18px'
      }}>

        {/* Tile A: Gửi Câu Hỏi */}
        <div
          onClick={() => { setStep('form'); setActiveModal('faq'); }}
          className="liquid-glass"
          style={{
            padding: 'clamp(20px, 4vw, 28px)',
            borderRadius: '24px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            border: '1px solid rgba(211, 47, 47, 0.15)',
            background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.06) 0%, rgba(211, 47, 47, 0.02) 100%)'
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            backgroundColor: 'rgba(211, 47, 47, 0.14)',
            color: 'var(--color-red)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MessageCircleQuestion size={24} strokeWidth={1.8} />
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 4px', lineHeight: 1.3 }}>
              Gửi Thắc Mắc
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-subtle)', margin: 0, lineHeight: 1.5 }}>
              Đặt câu hỏi trực tiếp đến Ban Mục Vụ, nhận hồi đáp chi tiết trong vài ngày.
            </p>
          </div>
        </div>

        {/* Tile B: Góp Ý */}
        <div
          onClick={() => { setStep('form'); setActiveModal('feedback'); }}
          className="liquid-glass"
          style={{
            padding: 'clamp(20px, 4vw, 28px)',
            borderRadius: '24px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            border: '1px solid rgba(217, 119, 6, 0.15)',
            background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.06) 0%, rgba(217, 119, 6, 0.02) 100%)'
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            backgroundColor: 'rgba(217, 119, 6, 0.14)',
            color: '#D97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MessageSquarePlus size={24} strokeWidth={1.8} />
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 4px', lineHeight: 1.3 }}>
              Ý Kiến & Góp Ý
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-subtle)', margin: 0, lineHeight: 1.5 }}>
              Đóng góp ý tưởng giúp cộng đoàn phát triển. Ý kiến bạn rất quan trọng.
            </p>
          </div>
        </div>

        {/* Tile C: Lịch Sử */}
        <div
          onClick={() => setActiveModal('intro')}
          className="liquid-glass"
          style={{
            padding: 'clamp(20px, 4vw, 28px)',
            borderRadius: '24px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            border: '1px solid rgba(5, 150, 105, 0.15)',
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.06) 0%, rgba(5, 150, 105, 0.02) 100%)'
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            backgroundColor: 'rgba(5, 150, 105, 0.14)',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Info size={24} strokeWidth={1.8} />
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 4px', lineHeight: 1.3 }}>
              Chánh Tòa Mỹ Tho
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-subtle)', margin: 0, lineHeight: 1.5 }}>
              Tìm hiểu lịch sử 130 năm và vị trí Chánh Tòa trên bản đồ.
            </p>
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
