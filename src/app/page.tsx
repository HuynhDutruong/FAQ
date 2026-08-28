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
  ArrowRight,
  Compass
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
        
        {/* ==================== 1. BRAND HERO SECTION ==================== */}
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '4px'
        }}>
          {/* Logo */}
          <div
            className="logo-floating"
            style={{
              position: 'relative',
              width: '76px',
              height: '76px',
              marginBottom: '10px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(255, 69, 58, 0.22), 0 0 0 3px rgba(251, 192, 45, 0.7)',
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
                sizes="76px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>

          {/* Titles */}
          <h1 style={{
            fontSize: 'clamp(1.25rem, 3.8vw, 1.85rem)',
            fontWeight: 900,
            color: 'var(--color-red)',
            marginBottom: '3px',
            lineHeight: 1.25,
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
          }}>
            {t.title}
          </h1>

          <h2 style={{
            fontSize: 'clamp(0.82rem, 2.4vw, 1.05rem)',
            fontWeight: 700,
            color: 'var(--color-yellow)',
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}>
            {t.subtitle}
          </h2>

          {/* Slim Gospel Verse */}
          <p
            suppressHydrationWarning
            style={{
              margin: 0,
              color: 'var(--color-dark)',
              fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
              lineHeight: 1.55,
              fontStyle: 'italic',
              opacity: 0.88,
              maxWidth: '620px'
            }}
          >
            &ldquo;{verseText}&rdquo;
          </p>
        </div>

        {/* ==================== 2. PRIMARY ACTION: TRA CỨU GIỜ LỄ TOÀN QUỐC ==================== */}
        <div
          onClick={() => router.push('/gio-le?gps=1')}
          className="liquid-glass"
          style={{
            width: '100%',
            padding: '16px 20px',
            borderRadius: '20px',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.12) 0%, rgba(245, 158, 11, 0.12) 100%)',
            border: '1.5px solid rgba(220, 38, 38, 0.32)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 6px 20px rgba(220, 38, 38, 0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1 }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(211, 47, 47, 0.35)'
            }}>
              <Clock size={24} />
            </div>

            <div style={{ minWidth: 0 }}>
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
                  backgroundColor: 'var(--color-red)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  fontSize: '0.68rem',
                  fontWeight: 900
                }}>
                  3.300+ NHÀ THỜ
                </span>
              </div>
              <div style={{
                fontSize: '0.82rem',
                color: 'var(--color-subtle)',
                marginTop: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Compass size={13} color="var(--color-red)" />
                <span>Tự động định vị GPS tìm nhà thờ gần bạn • 27 Giáo phận</span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: 800,
            color: 'var(--color-red)',
            flexShrink: 0
          }}>
            <span className="hide-on-mobile">Tra Cứu</span>
            <ArrowRight size={18} />
          </div>
        </div>

        {/* ==================== 3. 2x2 ACTION TILES (EXPANDS HARMONIOUSLY ON DESKTOP) ==================== */}
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '12px'
        }}>
          
          {/* Tile 1: Vấn Đáp Giáo Lý (Page /van-dap) */}
          <div
            onClick={() => router.push('/van-dap')}
            className="liquid-glass"
            style={{
              padding: '15px 18px',
              borderRadius: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1.5px solid rgba(37, 99, 235, 0.22)',
              background: 'linear-gradient(145deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.03) 100%)'
            }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: 'rgba(37, 99, 235, 0.14)',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <BookOpen size={22} />
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.2 }}>
                Vấn Đáp Giáo Lý
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-subtle)', marginTop: '3px' }}>
                Hỏi đáp đức tin, bí tích & phụng vụ
              </div>
            </div>

            <ArrowRight size={16} color="#2563EB" style={{ opacity: 0.6, flexShrink: 0 }} />
          </div>

          {/* Tile 2: Gửi Thắc Mắc Cho Ban Mục Vụ */}
          <div
            onClick={() => { setStep('form'); setActiveModal('faq'); }}
            className="liquid-glass"
            style={{
              padding: '15px 18px',
              borderRadius: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid var(--glass-border)'
            }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: 'rgba(220, 38, 38, 0.12)',
              color: 'var(--color-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <MessageCircleQuestion size={22} />
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.2 }}>
                Gửi Thắc Mắc
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-subtle)', marginTop: '3px' }}>
                Nhận hồi đáp riêng từ Ban Mục Vụ
              </div>
            </div>

            <ArrowRight size={16} color="var(--color-red)" style={{ opacity: 0.5, flexShrink: 0 }} />
          </div>

          {/* Tile 3: Ý Kiến Góp Ý */}
          <div
            onClick={() => { setStep('form'); setActiveModal('feedback'); }}
            className="liquid-glass"
            style={{
              padding: '15px 18px',
              borderRadius: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid var(--glass-border)'
            }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: 'rgba(217, 119, 6, 0.12)',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <MessageSquarePlus size={22} />
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.2 }}>
                Ý Kiến Góp Ý
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-subtle)', marginTop: '3px' }}>
                Đóng góp ý kiến xây dựng xứ đoàn
              </div>
            </div>

            <ArrowRight size={16} color="#D97706" style={{ opacity: 0.5, flexShrink: 0 }} />
          </div>

          {/* Tile 4: Chánh Tòa Mỹ Tho */}
          <div
            onClick={() => setActiveModal('intro')}
            className="liquid-glass"
            style={{
              padding: '15px 18px',
              borderRadius: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid var(--glass-border)'
            }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: 'rgba(5, 150, 105, 0.12)',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Info size={22} />
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.2 }}>
                Chánh Tòa Mỹ Tho
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-subtle)', marginTop: '3px' }}>
                Lịch sử 130 năm & Bản đồ chỉ đường
              </div>
            </div>

            <ArrowRight size={16} color="#059669" style={{ opacity: 0.5, flexShrink: 0 }} />
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
