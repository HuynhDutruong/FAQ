'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LiquidButton from '@/components/LiquidButton';
import Modal from '@/components/Modal';
import FAQForm from '@/components/FAQForm';
import FeedbackForm from '@/components/FeedbackForm';
import Rating from '@/components/Rating';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MessageCircleQuestion, MessageSquarePlus, CheckCircle, Clock, Info } from 'lucide-react';
import { db } from '@/lib/firebase';
import IntroModalContent from '@/components/IntroModalContent';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import confetti from 'canvas-confetti';

type Step = 'form' | 'rating' | 'success';

export default function Home() {
  const [activeModal, setActiveModal] = useState<'faq' | 'feedback' | 'intro' | null>(null);
  const [step, setStep] = useState<Step>('form');
  const router = useRouter();
  const { t } = useLanguage();

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
    setTimeout(() => setStep('form'), 300); // Reset after animation
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
      console.log('Rated:', rating);
    } catch (err) {
      console.error('Error saving rating', err);
    }
    
    setStep('success');
    
    // Auto close after 2.5s
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      padding: '24px',
      position: 'relative'
    }}>
      <LanguageSwitcher />
      
      <div style={{
        textAlign: 'center',
        marginBottom: '64px',
        maxWidth: '1000px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 16px'
      }}>
        {/* Logo */}
        <div style={{
          position: 'relative',
          width: '120px',
          height: '120px',
          marginBottom: '24px',
          mixBlendMode: 'multiply' /* Khử nền trắng của ảnh logo */
        }}>
          <Image 
            src="/logo.jpg" 
            alt="Logo Xứ Đoàn" 
            fill
            sizes="120px"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        <h1 style={{ 
          fontSize: 'clamp(1.5rem, 5vw, 2.8rem)', 
          fontWeight: '900',
          color: 'var(--color-red)',
          marginBottom: '8px',
          lineHeight: '1.3',
          textTransform: 'uppercase'
        }}>
          {t.title}
        </h1>
        <h2 style={{
          fontSize: 'clamp(1rem, 3vw, 1.4rem)',
          fontWeight: '600',
          color: 'var(--color-yellow)',
          marginBottom: '20px',
          textTransform: 'uppercase'
        }}>
          {t.subtitle}
        </h2>
        <p style={{ 
          color: 'var(--color-dark)', 
          opacity: 0.8, 
          fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          {t.description}
        </p>
      </div>

      <div className="action-grid">
        <LiquidButton 
          icon={MessageCircleQuestion} 
          label={t.btnFAQ} 
          variant="red"
          onClick={() => setActiveModal('faq')}
        />
        
        <LiquidButton 
          icon={MessageSquarePlus} 
          label={t.btnFeedback} 
          variant="yellow"
          onClick={() => setActiveModal('feedback')}
        />
        
        <LiquidButton 
          icon={Clock} 
          label={t.btnMassTimes} 
          variant="beige"
          onClick={() => router.push('/gio-le')}
        />
        
        <LiquidButton 
          icon={Info} 
          label={t.btnIntroDiocese} 
          variant="red"
          onClick={() => setActiveModal('intro')}
        />
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
            <CheckCircle size={64} style={{ margin: '0 auto 16px' }} />
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
            <CheckCircle size={64} style={{ margin: '0 auto 16px' }} />
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
