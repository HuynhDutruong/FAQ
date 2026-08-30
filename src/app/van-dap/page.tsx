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
  BookOpen,
  MessageCircleQuestion,
  HelpCircle,
  Sparkles,
  Lightbulb,
  BookMarked
} from 'lucide-react';
import { FAITH_FAQS, FAITH_CATEGORIES, FaithFAQ } from '@/lib/faithFAQs';
import { removeAccents } from '@/lib/textUtils';
import Modal from '@/components/Modal';
import FAQForm from '@/components/FAQForm';
import Rating from '@/components/Rating';

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
    const text = `📖 ${faq.question}\n\n💡 ${faq.shortAnswer}\n\n📚 Nguồn: ${faq.reference || 'Sách Giáo Lý Hội Thánh Công Giáo'}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: faq.question, text });
      } catch { /* noop */ }
    } else {
      await navigator.clipboard.writeText(text).then(() => showToast('📋 Đã sao chép câu trả lời!'));
    }
  };

  // Filter FAQs based on search and category
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
        f.tags.some(tag => removeAccents(tag).includes(q)) ||
        (f.reference && removeAccents(f.reference).includes(q))
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const handleRatingSubmit = async (rating: number) => {
    try {
      await fetch('/api/danh-gia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stars: rating, comment: 'Đánh giá chuyên mục Vấn đáp' })
      });
    } catch (err) {
      console.error('Lỗi gửi đánh giá:', err);
    }
    setStep('success');
    setTimeout(() => { setModalOpen(false); setStep('form'); }, 2500);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-gradient)' }}>
      {/* Toast Notification */}
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
          maxWidth: '90vw',
          boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
        }}>
          <Check size={16} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Hero Banner */}
      <div style={{
        position: 'relative',
        backgroundImage: 'linear-gradient(180deg, rgba(15, 8, 8, 0.82) 0%, rgba(45, 15, 15, 0.70) 50%, rgba(15, 8, 8, 0.92) 100%), url("/images/vatican_basilica_interior.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        color: '#FFFFFF',
        padding: '32px 16px 36px',
        borderBottom: '1px solid rgba(217, 119, 6, 0.35)',
        boxShadow: 'inset 0 -12px 30px rgba(0,0,0,0.6)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#FFFFFF',
                border: '1px solid rgba(253, 230, 138, 0.3)',
                backdropFilter: 'blur(6px)'
              }}
            >
              <ArrowLeft size={18} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#FDE68A', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
              <Link href="/" style={{ opacity: 0.9 }}>Trang chủ</Link>
              <span>/</span>
              <span style={{ fontWeight: 700, color: '#FFFFFF' }}>Vấn Đáp Giáo Lý</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#FDE68A',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '4px'
              }}>
                SÁCH GIÁO LÝ HỘI THÁNH CÔNG GIÁO • TOÁT YẾU CCC
              </div>
              <h1 style={{
                fontSize: 'clamp(1.35rem, 3.8vw, 2rem)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                margin: 0,
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(217, 119, 6, 0.4)'
              }}>
                Hỏi Đáp Giáo Lý & Thắc Mắc Đức Tin
              </h1>
              <p style={{
                margin: '6px 0 0',
                fontSize: '0.92rem',
                color: '#F3F4F6',
                lineHeight: 1.5,
                maxWidth: '720px',
                textShadow: '0 1px 4px rgba(0,0,0,0.8)'
              }}>
                Giải đáp mọi thắc mắc về Giáo Lý, 7 Bí Tích, Phụng Vụ, Luân Lý, Hôn Nhân và Đời Sống Đức Tin dựa trên Sách Giáo Lý Hội Thánh Công Giáo.
              </p>
            </div>

            <button
              onClick={() => { setModalOpen(true); setStep('form'); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
                color: '#FFFFFF',
                border: '1px solid rgba(253, 230, 138, 0.4)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(211, 47, 47, 0.4)'
              }}
            >
              <MessageCircleQuestion size={16} />
              <span>Gửi Câu Hỏi / Thắc Mắc</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 16px 48px', maxWidth: '1000px', margin: '0 auto', width: '100%', gap: '18px' }}>

        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-subtle)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi giáo lý, từ khóa (VD: rước lễ, rửa tội, sống thử, 10 điều răn)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px 12px 42px',
              borderRadius: '10px',
              border: '1px solid var(--color-input-border)',
              backgroundColor: 'var(--color-input-bg)',
              fontSize: '0.95rem',
              outline: 'none',
              color: 'var(--color-dark)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--color-subtle)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              Xóa
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}>
          {FAITH_CATEGORIES.map(cat => {
            const count = cat.id === 'all'
              ? FAITH_FAQS.length
              : FAITH_FAQS.filter(f => f.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  backgroundColor: selectedCategory === cat.id ? '#B71C1C' : 'var(--color-btn-subtle-bg)',
                  color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--color-dark)',
                  transition: 'all 0.15s ease',
                  boxShadow: selectedCategory === cat.id ? '0 2px 6px rgba(183, 28, 28, 0.3)' : 'none'
                }}
              >
                <span>{cat.label}</span>
                <span style={{
                  marginLeft: '6px',
                  fontSize: '0.72rem',
                  opacity: selectedCategory === cat.id ? 0.9 : 0.6,
                  fontWeight: 600
                }}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Count & Current Page Status */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.84rem',
          color: 'var(--color-subtle)',
          padding: '0 4px'
        }}>
          <div>
            Tìm thấy <strong>{filteredFAQs.length}</strong> câu hỏi giáo lý
            {selectedCategory !== 'all' && ` trong mục này`}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredFAQs.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '48px 20px',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '12px',
              border: '1px solid var(--color-border-subtle)'
            }}>
              <BookOpen size={44} style={{ margin: '0 auto 12px', color: 'var(--color-subtle)', opacity: 0.6 }} />
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '4px' }}>
                Không tìm thấy câu hỏi phù hợp
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-subtle)', margin: 0 }}>
                Bạn có thể thử tìm với từ khóa khác hoặc bấm nút bên dưới để gửi câu hỏi mới.
              </p>
              <button
                onClick={() => { setModalOpen(true); setStep('form'); }}
                style={{
                  marginTop: '16px',
                  padding: '8px 18px',
                  borderRadius: '8px',
                  background: '#B71C1C',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Gửi câu hỏi của bạn
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => {
              const isExpanded = expandedId === faq.id;
              const globalIndex = index + 1;

              return (
                <div
                  key={faq.id}
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: isExpanded ? '1px solid rgba(183, 28, 28, 0.4)' : '1px solid var(--color-border-subtle)',
                    backgroundColor: 'var(--color-card-bg)',
                    boxShadow: isExpanded ? '0 4px 14px rgba(183, 28, 28, 0.08)' : '0 1px 3px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`faq-panel-${faq.id}`}
                    style={{
                      width: '100%',
                      padding: '16px 18px',
                      background: isExpanded ? 'rgba(183, 28, 28, 0.02)' : 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
                      <div style={{
                        flexShrink: 0,
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        backgroundColor: isExpanded ? '#B71C1C' : 'var(--color-btn-subtle-bg)',
                        color: isExpanded ? '#FFFFFF' : 'var(--color-dark)',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {globalIndex}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B71C1C', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.04em' }}>
                          {faq.categoryLabel}
                        </div>
                        <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.45 }}>
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div style={{ flexShrink: 0, marginTop: '4px' }}>
                      {isExpanded ? (
                        <ChevronUp size={20} color="#B71C1C" />
                      ) : (
                        <ChevronDown size={20} color="var(--color-subtle)" />
                      )}
                    </div>
                  </button>

                  {/* Luôn nằm trong DOM để bộ máy tìm kiếm đọc được; đóng/mở bằng CSS */}
                  <div
                    id={`faq-panel-${faq.id}`}
                    style={{
                      display: isExpanded ? 'block' : 'none',
                      padding: '0 18px 18px',
                      borderTop: '1px solid rgba(0, 0, 0, 0.06)'
                    }}
                  >
                      {/* Short Answer Summary Box */}
                      <div style={{
                        marginTop: '14px',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(217, 119, 6, 0.08)',
                        borderLeft: '4px solid #D97706',
                        fontSize: '0.93rem',
                        color: 'var(--color-dark)',
                        lineHeight: 1.6
                      }}>
                        <strong style={{ color: '#B45309', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Lightbulb size={15} strokeWidth={2} /> Tóm tắt cốt lõi:</strong> {faq.shortAnswer}
                      </div>

                      {/* Detailed Answer Paragraphs */}
                      {faq.detailedAnswer && faq.detailedAnswer.length > 0 && (
                        <div style={{ marginTop: '12px', fontSize: '0.92rem', color: 'var(--color-dark)', lineHeight: 1.75 }}>
                          {faq.detailedAnswer.map((para, i) => (
                            <p key={i} style={{ margin: '8px 0', lineHeight: 1.75 }}>
                              • {para}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Reference Citation */}
                      {faq.reference && (
                        <div style={{
                          marginTop: '14px',
                          fontSize: '0.82rem',
                          color: '#4B5563',
                          fontStyle: 'italic',
                          paddingTop: '10px',
                          borderTop: '1px dashed var(--color-border-subtle)'
                        }}>
                          <BookMarked size={14} strokeWidth={2} style={{ verticalAlign: '-2px', marginRight: '5px' }} />
                          <strong>Trích dẫn Giáo lý:</strong> {faq.reference}
                        </div>
                      )}

                      {/* Action Bar: Copy / Share */}
                      <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                        <button
                          onClick={() => handleShareFAQ(faq)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '6px',
                            border: '1px solid rgba(183, 28, 28, 0.2)',
                            background: 'rgba(183, 28, 28, 0.05)',
                            color: '#B71C1C',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Share2 size={14} />
                          <span>Chia sẻ / Sao chép</span>
                        </button>
                      </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Modal: Gửi Thắc Mắc & Đánh Giá */}
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Gửi Câu Hỏi / Thắc Mắc Giáo Lý">
          {step === 'form' && (
            <FAQForm
              onSuccess={() => setStep('rating')}
            />
          )}

          {step === 'rating' && (
            <Rating
              onSubmit={handleRatingSubmit}
            />
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Check size={28} />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                Đã ghi nhận câu hỏi!
              </h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-subtle)', lineHeight: 1.5 }}>
                Câu hỏi của bạn đã được gửi đến ban mục vụ để giải đáp trong thời gian sớm nhất.
              </p>
            </div>
          )}
        </Modal>
      )}
    </main>
  );
}
