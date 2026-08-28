'use client';
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Calendar,
  Share2,
  Navigation,
  Edit3,
  Check,
  Search,
  Home
} from 'lucide-react';
import { MassTime } from '@/lib/massTimes';
import { dioceseLabel } from '@/lib/dioceses';
import MassTimeFeedbackModal from '@/components/MassTimeFeedbackModal';

const DAY_ORDER = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chúa Nhật'];

export default function ChurchDetailView({ item }: { item: MassTime }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  }, []);

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://xudoancacthanhtudaovietnam.web.app/gio-le/${item.id}`;
    const text = `⛪ ${item.parish} - ${item.diocese ? dioceseLabel(item.diocese) : ''}
📍 Địa chỉ: ${item.address || 'Đang cập nhật'}
⏰ Chúa Nhật: ${item.sundayMass?.join(', ') || 'Chưa có thông tin'}
⏰ Ngày thường: ${item.weekdayMass?.join(', ') || 'Chưa có thông tin'}

Tra cứu giờ lễ chi tiết tại:
${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Giờ Lễ ${item.parish}`,
          text: text,
          url: shareUrl
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('📋 Đã sao chép liên kết chia sẻ vào bộ nhớ tạm!');
    } catch {
      showToast('Không thể sao chép liên kết tự động.');
    }
  };

  const mapNavUrl = item.lat && item.lng
    ? `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.parish}, ${item.address || ''}`)}`;

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 999999,
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: '9px 18px',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            maxWidth: '90vw',
            textAlign: 'center'
          }}
        >
          <Check size={16} color="#10B981" style={{ flexShrink: 0 }} />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <header className="giole-header" style={{
        position: 'sticky', top: 0, zIndex: 100,
        borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
          <Link href="/gio-le" aria-label="Quay lại danh sách giờ lễ" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'var(--color-btn-subtle-bg)', color: 'var(--color-dark)', flexShrink: 0
          }}>
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
              fontSize: 'clamp(0.92rem, 3.8vw, 1.25rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              color: 'var(--color-red)',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {item.parish}
            </h1>
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--color-subtle)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {item.diocese ? `Giáo Phận ${dioceseLabel(item.diocese)}` : 'Giờ Lễ Toàn Quốc'}
            </div>
          </div>
        </div>

        {/* Action Buttons in Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleShare}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
              color: '#ffffff',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(211, 47, 47, 0.3)'
            }}
          >
            <Share2 size={15} />
            <span className="giole-btn-text">Chia sẻ</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '24px 16px 60px' }}>
        
        {/* Church Showcase Card */}
        <div className="liquid-glass" style={{ padding: '24px 20px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
          
          {/* Top Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
            {item.diocese && (
              <span style={{
                background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.12), rgba(211, 47, 47, 0.05))',
                color: 'var(--color-red)',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 800,
                border: '1px solid rgba(211, 47, 47, 0.2)'
              }}>
                ⛪ Giáo phận {dioceseLabel(item.diocese)}
              </span>
            )}
            {item.deanery && (
              <span style={{
                background: 'var(--color-btn-subtle-bg)',
                color: 'var(--color-dark)',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 700
              }}>
                Hạt {item.deanery}
              </span>
            )}
            {item.province && (
              <span style={{
                background: 'rgba(59, 130, 246, 0.12)',
                color: '#2563EB',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 700
              }}>
                📍 {item.province}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: 'clamp(1.35rem, 4vw, 1.85rem)',
            fontWeight: 900,
            color: 'var(--color-dark)',
            lineHeight: 1.25,
            marginBottom: '12px'
          }}>
            {item.parish}
          </h2>

          {/* Address & Navigation */}
          {item.address && (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
              padding: '12px 14px',
              backgroundColor: 'var(--color-input-bg)',
              borderRadius: '14px',
              border: '1px solid var(--color-border-subtle)',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1, minWidth: '220px' }}>
                <MapPin size={18} color="#d32f2f" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.92rem', color: 'var(--color-dark)', lineHeight: 1.4, fontWeight: 500 }}>
                  {item.address}
                </span>
              </div>

              <a
                href={mapNavUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '8px 14px',
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                  flexShrink: 0
                }}
              >
                <Navigation size={14} /> Mở Google Maps
              </a>
            </div>
          )}

          {/* MASS SCHEDULE SECTION */}
          <div style={{ marginTop: '20px' }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: 'var(--color-dark)',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Clock size={18} color="var(--color-red)" /> Lịch Thánh Lễ
            </h3>

            {/* Sunday Mass Highlights */}
            <div style={{
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: 'rgba(211, 47, 47, 0.06)',
              border: '1px solid rgba(211, 47, 47, 0.2)',
              marginBottom: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Calendar size={16} color="#d32f2f" />
                <span style={{ fontWeight: 800, color: '#d32f2f', fontSize: '0.95rem', textTransform: 'uppercase' }}>
                  Chúa Nhật
                </span>
              </div>
              {item.sundayMass && item.sundayMass.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.sundayMass.map(time => (
                    <span
                      key={time}
                      style={{
                        padding: '6px 14px',
                        backgroundColor: '#d32f2f',
                        color: '#FFFFFF',
                        borderRadius: '999px',
                        fontSize: '0.95rem',
                        fontWeight: 800,
                        boxShadow: '0 2px 6px rgba(211, 47, 47, 0.25)'
                      }}
                    >
                      {time}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-subtle)' }}>Chưa có thông tin giờ lễ Chúa Nhật</p>
              )}
            </div>

            {/* Saturday Mass (If exists) */}
            {item.saturdayMass && item.saturdayMass.length > 0 && (
              <div style={{
                padding: '14px 16px',
                borderRadius: '16px',
                backgroundColor: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                marginBottom: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Calendar size={15} color="#D97706" />
                  <span style={{ fontWeight: 800, color: '#D97706', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                    Thứ Bảy (Lễ Vọng)
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.saturdayMass.map(time => (
                    <span
                      key={time}
                      style={{
                        padding: '5px 12px',
                        backgroundColor: '#F59E0B',
                        color: '#FFFFFF',
                        borderRadius: '999px',
                        fontSize: '0.9rem',
                        fontWeight: 800
                      }}
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Weekday Mass */}
            <div style={{
              padding: '14px 16px',
              borderRadius: '16px',
              backgroundColor: 'rgba(59, 130, 246, 0.06)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              marginBottom: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Calendar size={15} color="#2563EB" />
                <span style={{ fontWeight: 800, color: '#2563EB', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                  Ngày Thường
                </span>
              </div>
              {item.weekdayMass && item.weekdayMass.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.weekdayMass.map(time => (
                    <span
                      key={time}
                      style={{
                        padding: '5px 12px',
                        backgroundColor: '#3B82F6',
                        color: '#FFFFFF',
                        borderRadius: '999px',
                        fontSize: '0.9rem',
                        fontWeight: 700
                      }}
                    >
                      {time}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-subtle)' }}>Chưa có thông tin giờ lễ ngày thường</p>
              )}
            </div>

            {/* By Day Timetable if available */}
            {item.byDay && (
              <div style={{
                marginTop: '16px',
                padding: '14px 16px',
                borderRadius: '16px',
                backgroundColor: 'var(--color-input-bg)',
                border: '1px solid var(--color-border-subtle)'
              }}>
                <span style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: 'var(--color-dark)', marginBottom: '10px', textTransform: 'uppercase' }}>
                  Chi Tiết Từng Ngày Trong Tuần
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {DAY_ORDER.filter(d => item.byDay?.[d]?.length).map(d => (
                    <div key={d} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dashed var(--color-border-subtle)' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', color: d === 'Chúa Nhật' ? '#d32f2f' : 'var(--color-dark)' }}>
                        {d}
                      </span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {item.byDay![d].map(t => (
                          <span key={t} style={{
                            padding: '2px 8px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            backgroundColor: d === 'Chúa Nhật' ? 'rgba(211, 47, 47, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                            color: d === 'Chúa Nhật' ? '#d32f2f' : '#2563EB'
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '28px',
            paddingTop: '18px',
            borderTop: '1px solid var(--color-border-subtle)'
          }}>
            <button
              onClick={() => setFeedbackOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: 'var(--color-btn-subtle-bg)',
                color: 'var(--color-dark)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '10px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Edit3 size={14} /> Báo sai / Cập nhật giờ lễ
            </button>

            <button
              onClick={handleShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: 'rgba(211, 47, 47, 0.12)',
                color: '#d32f2f',
                border: '1px solid rgba(211, 47, 47, 0.25)',
                borderRadius: '10px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Share2 size={14} /> Chia sẻ liên kết
            </button>
          </div>
        </div>

        {/* Quick Navigation Footers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginTop: '20px'
        }}>
          <Link
            href="/gio-le"
            style={{
              padding: '14px 18px',
              borderRadius: '16px',
              backgroundColor: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--color-dark)',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: 'var(--glass-shadow)',
              textDecoration: 'none'
            }}
          >
            <Search size={18} color="var(--color-red)" />
            <span>Tra Cứu 3.300+ Nhà Thờ Khác</span>
          </Link>

          <Link
            href="/"
            style={{
              padding: '14px 18px',
              borderRadius: '16px',
              backgroundColor: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--color-dark)',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: 'var(--glass-shadow)',
              textDecoration: 'none'
            }}
          >
            <Home size={18} color="var(--color-red)" />
            <span>Về Trang Chủ Xứ Đoàn</span>
          </Link>
        </div>
      </div>

      {/* Feedback Modal */}
      <MassTimeFeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        targetParish={item}
        defaultDiocese={item.diocese}
      />
    </main>
  );
}
