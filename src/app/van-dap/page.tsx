'use client';
import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  Share2,
  Send,
  Check,
  BookOpen
} from 'lucide-react';
import { FAITH_FAQS, FAITH_CATEGORIES, FaithFAQ } from '@/lib/faithFAQs';
import { removeAccents } from '@/lib/massTimes';
import Modal from '@/components/Modal';
import FAQForm from '@/components/FAQForm';
import Rating from '@/components/Rating';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Step = 'form' | 'rating' | 'success';

export default function VanDapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<Step>('form');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleShareFAQ = async (faq: FaithFAQ) => {
    const text = `📖 ${faq.question}\n\n💡 ${faq.shortAnswer}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: faq.question, text });
      } catch { /* noop */ }
    } else {
      await navigator.clipboard.writeText(text).then(() => showToast('📋 Đã sao chép!'));
    }
  };

  const filteredFAQs = useMemo(() => {
    let list = FAITH_FAQS;
    if (selectedCategory !== 'all') {
      list = list.filter(f => f.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = removeAccents(searchQuery.trim());
      list = list.filter(
        f => removeAccents(f.question).includes(q) ||
        removeAccents(f.shortAnswer).includes(q) ||
        f.tags.some(tag => removeAccents(tag).includes(q))
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const handleRatingSubmit = async (rating: number) => {
    try {
      await addDoc(collection(db, 'ratings'), { rating, type: 'van_dap_faq', createdAt: serverTimestamp() });
    } catch (err) { console.error(err); }
    setStep('success');
    setTimeout(() => { setModalOpen(false); setStep('form'); }, 2500);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-gradient)' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999999,
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          color: '#FFFFFF',
          padding: '8px 18px',
          borderRadius: '999px',
          fontSize: '0.88rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          maxWidth: '90vw'
        }}>
          <Check size={16} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-btn-subtle-bg)', color: 'var(--color-dark)' }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-dark)', margin: 0, flex: 1, textAlign: 'center' }}>
          Vấn Đáp Giáo Lý
        </h1>
        <div style={{ width: '40px' }} />
      </header>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', maxWidth: '1000px', margin: '0 auto', width: '100%', gap: '20px' }}>

        {/* Search & Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-subtle)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Tìm câu hỏi, từ khóa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 42px',
                borderRadius: '12px',
                border: '1px solid var(--color-input-border)',
                backgroundColor: 'var(--color-input-bg)',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: selectedCategory === 'all' ? 'var(--color-red)' : 'rgba(211, 47, 47, 0.1)',
                color: selectedCategory === 'all' ? '#FFFFFF' : 'var(--color-dark)'
              }}
            >
              Tất Cả
            </button>
            {FAITH_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === cat.id ? 'var(--color-red)' : 'rgba(0, 0, 0, 0.05)',
                  color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--color-dark)'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredFAQs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-subtle)' }}>
              <BookOpen size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <p>Không tìm thấy câu hỏi nào. Vui lòng thử lại.</p>
            </div>
          ) : (
            filteredFAQs.map(faq => (
              <div
                key={faq.id}
                className="liquid-glass"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(211, 47, 47, 0.15)',
                  backgroundColor: 'rgba(255, 255, 255, 0.4)'
                }}
              >
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-red)', marginBottom: '4px' }}>
                      {faq.categoryIcon} {faq.categoryLabel}
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.4 }}>
                      {faq.question}
                    </h3>
                  </div>
                  <div style={{ flexShrink: 0, marginTop: '2px' }}>
                    {expandedId === faq.id ? (
                      <ChevronUp size={20} color="var(--color-red)" />
                    ) : (
                      <ChevronDown size={20} color="var(--color-subtle)" />
                    )}
                  </div>
                </button>

                {expandedId === faq.id && (
                  <div style={{ padding: '0 16px 16px', borderTop: '1px solid rgba(0, 0, 0, 0.05)' }}>
                    <div style={{ fontSize: '0.95rem', color: 'var(--color-dark)', lineHeight: 1.7, marginBottom: '12px' }}>
                      <strong>💡 Tóm tắt:</strong> {faq.shortAnswer}
                    </div>

                    {faq.detailedAnswer && faq.detailedAnswer.length > 0 && (
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-subtle)', lineHeight: 1.7, marginBottom: '12px' }}>
                        {faq.detailedAnswer.map((para, i) => (
                          <p key={i} style={{ margin: '8px 0', lineHeight: 1.7 }}>
                            • {para}
                          </p>
                        ))}
                      </div>
                    )}

                    {faq.reference && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-subtle)', fontStyle: 'italic', marginBottom: '12px', paddingTop: '8px', borderTop: '1px solid rgba(0, 0, 0, 0.05)' }}>
                        📚 <strong>Nguồn:</strong> {faq.reference}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                      <button
                        onClick={() => handleShareFAQ(faq)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid rgba(211, 47, 47, 0.2)',
                          background: 'rgba(211, 47, 47, 0.05)',
                          color: 'var(--color-red)',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Share2 size={14} />
                        Chia Sẻ
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* CTA: Ask Question */}
        <div style={{
          marginTop: '20px',
          padding: '24px',
          borderRadius: '16px',
          backgroundColor: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05))',
          border: '1.5px solid rgba(37, 99, 235, 0.2)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 8px' }}>
            Không tìm thấy câu trả lời?
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-subtle)', margin: '0 0 14px', lineHeight: 1.6 }}>
            Hãy gửi câu hỏi của bạn đến Ban Mục Vụ. Chúng tôi sẽ trả lời trong vài ngày.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              background: '#2563EB',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Send size={16} />
            Gửi Câu Hỏi
          </button>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setStep('form'); }}
        title={step === 'form' ? 'Gửi Câu Hỏi' : step === 'rating' ? 'Đánh Giá' : 'Cảm Ơn'}
      >
        {step === 'form' && <FAQForm onSuccess={() => setStep('rating')} />}
        {step === 'rating' && <Rating onSubmit={handleRatingSubmit} />}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-red)' }}>
            <Check size={64} style={{ margin: '0 auto 16px', color: '#10B981' }} />
            <h2>Cảm Ơn!</h2>
            <p style={{ opacity: 0.8, marginTop: '8px' }}>Chúng tôi sẽ trả lời trong vài ngày.</p>
          </div>
        )}
      </Modal>
    </main>
  );
}
