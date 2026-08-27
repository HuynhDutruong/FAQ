'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import LiquidButton from '@/components/LiquidButton';
import Modal from '@/components/Modal';
import FAQForm from '@/components/FAQForm';
import FeedbackForm from '@/components/FeedbackForm';
import Rating from '@/components/Rating';
import { MessageCircleQuestion, MessageSquarePlus, CheckCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import confetti from 'canvas-confetti';

type Step = 'form' | 'rating' | 'success';

export default function Home() {
  const [activeModal, setActiveModal] = useState<'faq' | 'feedback' | null>(null);
  const [step, setStep] = useState<Step>('form');

  useEffect(() => {
    if (step === 'success') {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
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
          XỨ ĐOÀN CÁC THÁNH TỬ ĐẠO VIỆT NAM
        </h1>
        <h2 style={{
          fontSize: 'clamp(1rem, 3vw, 1.4rem)',
          fontWeight: '600',
          color: 'var(--color-yellow)',
          marginBottom: '20px',
          textTransform: 'uppercase'
        }}>
          Giáo Xứ Chánh Toà - Giáo Phận Mỹ Tho
        </h2>
        <p style={{ 
          color: 'var(--color-dark)', 
          opacity: 0.8, 
          fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Lắng nghe, thấu hiểu và đồng hành cùng bạn. Vui lòng chọn một trong hai lựa chọn bên dưới để bắt đầu.
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '40px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <LiquidButton 
          icon={MessageCircleQuestion} 
          label="Vấn Đáp" 
          variant="red"
          onClick={() => setActiveModal('faq')}
        />
        
        <LiquidButton 
          icon={MessageSquarePlus} 
          label="Phản Hồi" 
          variant="yellow"
          onClick={() => setActiveModal('feedback')}
        />
      </div>

      {/* Modals */}
      <Modal 
        isOpen={activeModal === 'faq'} 
        onClose={handleClose} 
        title={step === 'form' ? 'Gửi Câu Hỏi / Vấn Đáp' : step === 'rating' ? 'Đánh giá hệ thống' : 'Thành công!'}
      >
        {step === 'form' && <FAQForm onSuccess={handleFormSuccess} />}
        {step === 'rating' && <Rating onSubmit={handleRatingSubmit} />}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-red)' }}>
            <CheckCircle size={64} style={{ margin: '0 auto 16px' }} />
            <h2>Cảm ơn bạn!</h2>
            <p style={{ opacity: 0.8, marginTop: '8px' }}>Câu hỏi của bạn đã được ghi nhận.</p>
          </div>
        )}
      </Modal>

      <Modal 
        isOpen={activeModal === 'feedback'} 
        onClose={handleClose} 
        title={step === 'form' ? 'Gửi Phản Hồi / Góp Ý' : step === 'rating' ? 'Đánh giá hệ thống' : 'Thành công!'}
      >
        {step === 'form' && <FeedbackForm onSuccess={handleFormSuccess} />}
        {step === 'rating' && <Rating onSubmit={handleRatingSubmit} />}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-yellow)' }}>
            <CheckCircle size={64} style={{ margin: '0 auto 16px' }} />
            <h2>Cảm ơn bạn!</h2>
            <p style={{ opacity: 0.8, marginTop: '8px' }}>Góp ý của bạn đã được ghi nhận.</p>
          </div>
        )}
      </Modal>

    </main>
  );
}
