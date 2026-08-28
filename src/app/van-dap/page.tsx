'use client';
import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Search,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Share2,
  BookOpen,
  Send,
  Sparkles,
  Check,
  Church,
  Home
} from 'lucide-react';
import { FAITH_FAQS, FAITH_CATEGORIES, FaithFAQ } from '@/lib/faithFAQs';
import { removeAccents } from '@/lib/massTimes';
import Modal from '@/components/Modal';
import FAQForm from '@/components/FAQForm';
import Rating from '@/components/Rating';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Step = 'form' | 'rating' | 'success';
type FontScale = 'normal' | 'large' | 'xlarge';

export default function VanDapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(FAITH_FAQS[0]?.id || null);
  const [fontScale, setFontScale] = useState<FontScale>('normal');
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<Step>('form');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleShareFAQ = async (faq: FaithFAQ) => {
    const text = `📖 VẤN ĐÁP CÔNG GIÁO:
❓ ${faq.question}

💡 Tóm tắt: ${faq.shortAnswer}
📚 Nguồn: ${faq.reference || 'Giáo lý Hội Thánh Công Giáo'}

Xem thêm giải đáp tại: https://xudoancacthanhtudaovietnam.web.app/van-dap`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: faq.question,
          text: text,
          url: window.location.href
        });
        return;
      } catch {
        // fallback
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      showToast('📋 Đã sao chép câu hỏi & giải đáp vào bộ nhớ tạm!');
    } catch {
      showToast('Không thể sao chép tự động.');
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
        f =>
          removeAccents(f.question).includes(q) ||
          removeAccents(f.shortAnswer).includes(q) ||
          f.tags.some(tag => removeAccents(tag).includes(q))
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const handleRatingSubmit = async (rating: number) => {
    try {
      await addDoc(collection(db, 'ratings'), {
        rating,
        type: 'van_dap_faq',
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error saving rating', err);
    }
    setStep('success');
    setTimeout(() => {
      setModalOpen(false);
      setStep('form');
    }, 2500);
  };

  // Font size multiplier
  const fontSizes = {
    normal: { title: '1.08rem', body: '0.94rem', small: '0.82rem', line: 1.6 },
    large: { title: '1.25rem', body: '1.1rem', small: '0.95rem', line: 1.7 },
    xlarge: { title: '1.42rem', body: '1.25rem', small: '1.08rem', line: 1.8 }
  }[fontScale];

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      background: 'var(--bg-gradient)'
    }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 999999,
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            padding: '10px 22px',
            borderRadius: '999px',
            fontSize: '0.88rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
            maxWidth: '90vw'
          }}
        >
          <Check size={16} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header
        className="giole-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
          <Link
            href="/"
            aria-label="Về trang chủ"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-btn-subtle-bg)',
              color: 'var(--color-dark)',
              flexShrink: 0
            }}
          >
            <ArrowLeft size={18} />
          </Link>

          <div style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(255, 69, 58, 0.25), 0 0 0 2px rgba(251, 192, 45, 0.6)',
            padding: '2px',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
              <Image src="/logo.jpg" alt="Logo Xứ Đoàn" fill sizes="38px" style={{ objectFit: 'contain' }} priority />
            </div>
          </div>

          <div style={{ minWidth: 0, flex: 1 }}>
            <h1 style={{
              fontSize: 'clamp(1rem, 3.8vw, 1.25rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: 'var(--color-red)',
              lineHeight: 1.2,
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              Vấn Đáp Giáo Lý
            </h1>
            <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)', fontWeight: 600 }}>
              Giải Đáp Đức Tin & Đời Sống Công Giáo
            </div>
          </div>
        </div>

        {/* Font Size Accessibility Controls (For Elderly Users) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'var(--color-btn-subtle-bg)',
              padding: '3px',
              borderRadius: '999px',
              border: '1px solid var(--color-border-subtle)'
            }}
          >
            <button
              onClick={() => setFontScale('normal')}
              style={{
                padding: '4px 8px',
                borderRadius: '999px',
                border: 'none',
                backgroundColor: fontScale === 'normal' ? 'var(--color-red)' : 'transparent',
                color: fontScale === 'normal' ? '#FFFFFF' : 'var(--color-dark)',
                fontSize: '0.75rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
              title="Cỡ chữ chuẩn"
            >
              A
            </button>
            <button
              onClick={() => setFontScale('large')}
              style={{
                padding: '4px 8px',
                borderRadius: '999px',
                border: 'none',
                backgroundColor: fontScale === 'large' ? 'var(--color-red)' : 'transparent',
                color: fontScale === 'large' ? '#FFFFFF' : 'var(--color-dark)',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
              title="Cỡ chữ lớn (dễ đọc)"
            >
              A+
            </button>
            <button
              onClick={() => setFontScale('xlarge')}
              style={{
                padding: '4px 8px',
                borderRadius: '999px',
                border: 'none',
                backgroundColor: fontScale === 'xlarge' ? 'var(--color-red)' : 'transparent',
                color: fontScale === 'xlarge' ? '#FFFFFF' : 'var(--color-dark)',
                fontSize: '0.95rem',
                fontWeight: 900,
                cursor: 'pointer'
              }}
              title="Cỡ chữ rất lớn (cho người cao tuổi)"
            >
              A++
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="bento-container">
        
        {/* =========================================================================
            BENTO HERO BANNER: TỔNG QUAN VẤN ĐÁP
            ========================================================================= */}
        <div
          className="liquid-glass"
          style={{
            padding: '24px 20px',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                padding: '4px 10px',
                backgroundColor: 'rgba(211, 47, 47, 0.12)',
                color: 'var(--color-red)',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Sparkles size={12} /> HỎI ĐÁP ĐỨC TIN
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', fontWeight: 600 }}>
                {FAITH_FAQS.length} câu hỏi đã được giải đáp
              </span>
            </div>

            {/* Button Đặt Câu Hỏi Mới */}
            <button
              onClick={() => { setStep('form'); setModalOpen(true); }}
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
                color: '#FFFFFF',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)'
              }}
            >
              <Send size={14} /> Đặt Câu Hỏi Mới
            </button>
          </div>

          <div>
            <h2 style={{
              margin: '0 0 6px',
              fontSize: 'clamp(1.15rem, 4vw, 1.55rem)',
              fontWeight: 900,
              color: 'var(--color-dark)',
              lineHeight: 1.3
            }}>
              Tìm Kiếm Lời Giải Đáp Đức Tin & Phụng Vụ
            </h2>
            <p style={{ margin: 0, fontSize: fontSizes.small, color: 'var(--color-subtle)', lineHeight: 1.5 }}>
              Mọi giải đáp được căn cứ trên Giáo Lý Hội Thánh Công Giáo, Giáo Luật và Lời Chúa, được trình bày rõ ràng, dễ hiểu cho mọi thế hệ.
            </p>
          </div>

          {/* Search Input in Glass Banner */}
          <div style={{ position: 'relative', marginTop: '4px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, color: 'var(--color-dark)' }} />
            <input
              type="text"
              placeholder="Tìm theo chủ đề: xưng tội, thánh lễ chúa nhật, giữ chay, hôn nhân..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: '16px',
                border: '1px solid var(--color-input-border)',
                backgroundColor: 'var(--color-input-bg)',
                color: 'var(--color-dark)',
                fontSize: fontSizes.body,
                outline: 'none',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)'
              }}
            />
          </div>
        </div>

        {/* =========================================================================
            BENTO CATEGORY PILLS
            ========================================================================= */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none'
        }}>
          {FAITH_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: isSelected ? '1px solid var(--color-red)' : '1px solid var(--color-border-subtle)',
                  backgroundColor: isSelected ? 'var(--color-red)' : 'var(--color-card-bg)',
                  color: isSelected ? '#FFFFFF' : 'var(--color-dark)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isSelected ? '0 4px 12px rgba(211, 47, 47, 0.3)' : 'var(--glass-shadow)',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            BENTO FAQ ACCORDION CARDS LIST
            ========================================================================= */}
        {filteredFAQs.length === 0 ? (
          <div className="liquid-glass" style={{ padding: '40px 20px', textAlign: 'center', borderRadius: '24px' }}>
            <HelpCircle size={44} style={{ margin: '0 auto 12px', opacity: 0.3, color: 'var(--color-red)' }} />
            <h3 style={{ color: 'var(--color-dark)', marginBottom: '6px' }}>Không tìm thấy câu hỏi phù hợp</h3>
            <p style={{ fontSize: fontSizes.small, color: 'var(--color-subtle)', marginBottom: '16px' }}>
              Bạn có thể gửi câu hỏi mới để Ban Mục Vụ Xứ Đoàn giải đáp cho bạn.
            </p>
            <button
              onClick={() => { setStep('form'); setModalOpen(true); }}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
                color: '#FFFFFF',
                borderRadius: '999px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Gửi Câu Hỏi Của Bạn
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredFAQs.map((faq) => {
              const isExpanded = expandedId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="liquid-glass"
                  style={{
                    borderRadius: '22px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    transition: 'all 0.3s ease',
                    border: isExpanded ? '1.5px solid rgba(211, 47, 47, 0.4)' : '1px solid var(--glass-border)'
                  }}
                >
                  {/* Category badge & Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '999px',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      backgroundColor: 'var(--color-btn-subtle-bg)',
                      color: 'var(--color-red)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span>{faq.categoryIcon}</span>
                      <span>{faq.categoryLabel}</span>
                    </span>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleShareFAQ(faq); }}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: 'transparent',
                        color: 'var(--color-subtle)',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title="Chia sẻ câu hỏi này"
                    >
                      <Share2 size={13} /> Chia sẻ
                    </button>
                  </div>

                  {/* Question Title (Click to toggle) */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <h3 style={{
                      margin: 0,
                      fontSize: fontSizes.title,
                      fontWeight: 800,
                      color: 'var(--color-dark)',
                      lineHeight: 1.4
                    }}>
                      {faq.question}
                    </h3>

                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isExpanded ? 'var(--color-red)' : 'var(--color-btn-subtle-bg)',
                      color: isExpanded ? '#FFFFFF' : 'var(--color-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>

                  {/* Short Highlighted Answer */}
                  <div style={{
                    padding: '12px 14px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(211, 47, 47, 0.08)',
                    borderLeft: '4px solid var(--color-red)',
                    fontSize: fontSizes.body,
                    fontWeight: 600,
                    color: 'var(--color-dark)',
                    lineHeight: fontSizes.line
                  }}>
                    💡 <strong>Trả lời nhanh:</strong> {faq.shortAnswer}
                  </div>

                  {/* Expanded Detailed Answer */}
                  {isExpanded && (
                    <div style={{
                      marginTop: '4px',
                      paddingTop: '12px',
                      borderTop: '1px dashed var(--color-border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-subtle)', textTransform: 'uppercase' }}>
                        📖 Lời Giải Đáp Chi Tiết:
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {faq.detailedAnswer.map((para, i) => (
                          <p key={i} style={{
                            margin: 0,
                            fontSize: fontSizes.body,
                            color: 'var(--color-dark)',
                            lineHeight: fontSizes.line,
                            opacity: 0.95
                          }}>
                            • {para}
                          </p>
                        ))}
                      </div>

                      {/* Canonical Reference */}
                      {faq.reference && (
                        <div style={{
                          marginTop: '6px',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          backgroundColor: 'var(--color-input-bg)',
                          fontSize: fontSizes.small,
                          color: 'var(--color-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          border: '1px solid var(--color-border-subtle)'
                        }}>
                          <BookOpen size={14} color="var(--color-red)" style={{ flexShrink: 0 }} />
                          <span><strong>Nguồn trích dẫn:</strong> {faq.reference}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            BOTTOM BENTO CARD: QUICK ACTIONS (TIỆN ÍCH LIÊN KẾT)
            ========================================================================= */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
          marginTop: '10px'
        }}>
          <Link
            href="/gio-le"
            style={{
              padding: '16px 20px',
              borderRadius: '20px',
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--color-dark)',
              fontWeight: 800,
              fontSize: '0.92rem',
              boxShadow: 'var(--glass-shadow)',
              textDecoration: 'none',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              backgroundColor: 'rgba(37, 99, 235, 0.12)', color: '#2563EB',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Church size={20} />
            </div>
            <div>
              <div>Tra Cứu Giờ Lễ Toàn Quốc</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-subtle)', fontWeight: 500 }}>Hơn 3.300+ nhà thờ tại 27 giáo phận</div>
            </div>
          </Link>

          <Link
            href="/"
            style={{
              padding: '16px 20px',
              borderRadius: '20px',
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--color-dark)',
              fontWeight: 800,
              fontSize: '0.92rem',
              boxShadow: 'var(--glass-shadow)',
              textDecoration: 'none',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              backgroundColor: 'rgba(211, 47, 47, 0.12)', color: 'var(--color-red)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Home size={20} />
            </div>
            <div>
              <div>Về Trang Chủ Xứ Đoàn</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-subtle)', fontWeight: 500 }}>Khám phá các hoạt động và liên hệ</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Modal Đặt Câu Hỏi Mới */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={step === 'form' ? 'Gửi Câu Hỏi / Vấn Đáp Mới' : step === 'rating' ? 'Đánh Giá Trải Nghiệm' : 'Thành Công'}
      >
        {step === 'form' && <FAQForm onSuccess={() => setStep('rating')} />}
        {step === 'rating' && <Rating onSubmit={handleRatingSubmit} />}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-red)' }}>
            <Check size={64} style={{ margin: '0 auto 16px', color: '#10B981' }} />
            <h2>Cảm Ơn Bạn!</h2>
            <p style={{ opacity: 0.8, marginTop: '8px' }}>
              Câu hỏi của bạn đã được gửi đến Ban Mục Vụ. Chúng tôi sẽ sớm hồi đáp!
            </p>
          </div>
        )}
      </Modal>
    </main>
  );
}
