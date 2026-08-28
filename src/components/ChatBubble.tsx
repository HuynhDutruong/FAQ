'use client';
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import Modal from './Modal';
import FeedbackForm from './FeedbackForm';

type Step = 'form' | 'success';

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('form');

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setStep('form'), 300);
  };

  const handleSuccess = () => {
    setStep('success');
    setTimeout(() => handleClose(), 2500);
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#D32F2F',
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(211, 47, 47, 0.4)',
          zIndex: 999,
          transition: 'all 0.3s ease',
          fontSize: '24px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(211, 47, 47, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(211, 47, 47, 0.4)';
        }}
      >
        <MessageCircle size={28} />
      </button>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={step === 'form' ? 'Góp Ý Kiến' : 'Cảm Ơn'}
      >
        {step === 'form' && (
          <>
            <div style={{ marginBottom: '16px', fontSize: '0.95rem', color: 'var(--color-subtle)', lineHeight: 1.6 }}>
              Chia sẻ ý kiến của bạn giúp chúng tôi cải thiện website. Mọi góp ý đều quý báu! 💝
            </div>
            <FeedbackForm onSuccess={handleSuccess} />
          </>
        )}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🙏</div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-dark)' }}>Cảm Ơn!</h2>
            <p style={{ margin: '8px 0 0', fontSize: '0.95rem', color: 'var(--color-subtle)' }}>
              Ý kiến của bạn đã được ghi nhận.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
