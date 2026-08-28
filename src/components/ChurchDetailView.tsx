'use client';
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Edit3,
  Home,
  MapPin,
  Navigation,
  Search,
  Share2,
  Sparkles
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
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://chanhtoa.tnttgiaophanmytho.online/gio-le/${item.id}`;
    const text = `⛪ ${item.parish} - ${item.diocese ? dioceseLabel(item.diocese) : ''}
📍 Địa chỉ: ${item.address || 'Đang cập nhật'}
⏰ Chúa Nhật: ${item.sundayMass?.join(', ') || 'Chưa có thông tin'}
⏰ Ngày thường: ${item.weekdayMass?.join(', ') || 'Chưa có thông tin'}

Xem thẻ giờ lễ chi tiết tại:
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
      showToast('Đã sao chép liên kết thẻ giờ lễ vào bộ nhớ tạm!');
    } catch {
      showToast('Không thể sao chép liên kết tự động.');
    }
  };

  const mapNavUrl = item.lat && item.lng
    ? `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.parish}, ${item.address || ''}`)}`;

  const ticketCode = `VN-MASS-${(item.id || 'CHURCH').slice(0, 8).toUpperCase()}`;

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', background: 'var(--bg-gradient)' }}>
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
            padding: '9px 20px',
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
              Thẻ Giờ Lễ
            </h1>
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--color-subtle)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {item.diocese ? `Giáo Phận ${dioceseLabel(item.diocese)}` : 'Giáo Hội Việt Nam'}
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
              padding: '8px 16px',
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
            <span className="giole-btn-text">Chia Sẻ Thẻ</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{ width: '100%', maxWidth: '680px', margin: '0 auto', padding: '24px 16px 60px' }}>
        
        {/* ==================== THE MASS TICKET CARD ==================== */}
        <div style={{
          position: 'relative',
          backgroundColor: '#FFFFFF',
          borderRadius: '26px',
          boxShadow: '0 25px 60px -15px rgba(211, 47, 47, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden'
        }}>

          {/* Ticket Header Banner (Catholic Gold & Red Theme) */}
          <div style={{
            background: 'linear-gradient(135deg, #991b1b 0%, #b91c1c 40%, #d32f2f 80%, #dc2626 100%)',
            color: '#FFFFFF',
            padding: '24px 22px 20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Decorative Halos */}
            <div style={{
              position: 'absolute',
              right: '-30px',
              top: '-30px',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(251, 192, 45, 0.35) 0%, rgba(251, 192, 45, 0) 70%)',
              pointerEvents: 'none'
            }} />

            {/* Top Badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  padding: '3px 10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(251, 192, 45, 0.6)',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#FEF08A',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Sparkles size={11} color="#FDE047" /> THẺ THÁNH LỄ CHÍNH THỨC
                </span>
              </div>

              <span style={{
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.85)',
                letterSpacing: '0.5px'
              }}>
                {ticketCode}
              </span>
            </div>

            {/* Church Name & Diocese */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(251, 192, 45, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden',
                padding: '2px'
              }}>
                <Image src="/logo.jpg" alt="Logo Xứ Đoàn" width={44} height={44} style={{ borderRadius: '50%', objectFit: 'contain' }} />
              </div>

              <div style={{ minWidth: 0, flex: 1 }}>
                <h2 style={{
                  fontSize: 'clamp(1.25rem, 4.2vw, 1.7rem)',
                  fontWeight: 900,
                  margin: 0,
                  lineHeight: 1.25,
                  color: '#FFFFFF',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {item.parish}
                </h2>
                <div style={{
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: '#FDE047',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>Giáo phận {item.diocese ? dioceseLabel(item.diocese) : 'Việt Nam'}</span>
                  {item.deanery && <span>• Hạt {item.deanery}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Upper Body (Location & Info) */}
          <div style={{ padding: '20px 22px 14px' }}>
            {item.address && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
                padding: '12px 14px',
                backgroundColor: '#F9FAFB',
                borderRadius: '14px',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1, minWidth: '200px' }}>
                  <MapPin size={18} color="#d32f2f" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase' }}>Địa Chỉ Giáo Xứ</div>
                    <div style={{ fontSize: '0.9rem', color: '#1F2937', fontWeight: 600, lineHeight: 1.35, marginTop: '2px' }}>
                      {item.address}
                    </div>
                  </div>
                </div>

                <a
                  href={mapNavUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '8px 14px',
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)',
                    flexShrink: 0
                  }}
                >
                  <Navigation size={13} /> Chỉ Đường Maps
                </a>
              </div>
            )}
          </div>

          {/* TICKET PERFORATED TEAR-OFF LINE WITH NOTCHES */}
          <div style={{ position: 'relative', margin: '6px 0 16px' }}>
            {/* Left Notch */}
            <div style={{
              position: 'absolute',
              left: '-14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#FFFDF9',
              boxShadow: 'inset -3px 0 4px rgba(0,0,0,0.06)',
              zIndex: 10
            }} />

            {/* Dashed Line */}
            <div style={{
              borderTop: '2px dashed #E5E7EB',
              margin: '0 24px'
            }} />

            {/* Right Notch */}
            <div style={{
              position: 'absolute',
              right: '-14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#FFFDF9',
              boxShadow: 'inset 3px 0 4px rgba(0,0,0,0.06)',
              zIndex: 10
            }} />
          </div>

          {/* Ticket Lower Body (MASS SCHEDULE) */}
          <div style={{ padding: '4px 22px 22px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={18} color="#d32f2f" />
                <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  Lịch Giờ Thánh Lễ
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '6px' }}>
                <Check size={12} strokeWidth={3} style={{ verticalAlign: '-2px', marginRight: '3px' }} />Đang Áp Dụng
              </span>
            </div>

            {/* Chúa Nhật Section - Big Ticket Focus */}
            <div style={{
              padding: '16px 18px',
              borderRadius: '16px',
              backgroundColor: '#FEF2F2',
              border: '1.5px solid #FCA5A5',
              marginBottom: '14px',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={16} color="#DC2626" />
                  <span style={{ fontWeight: 900, color: '#B91C1C', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                    Chúa Nhật (Lễ Trọng)
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#DC2626', backgroundColor: 'rgba(239, 68, 68, 0.12)', padding: '2px 8px', borderRadius: '999px' }}>
                  CHÍNH LỄ
                </span>
              </div>

              {item.sundayMass && item.sundayMass.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.sundayMass.map(time => (
                    <div
                      key={time}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#DC2626',
                        color: '#FFFFFF',
                        borderRadius: '12px',
                        fontSize: '1.05rem',
                        fontWeight: 900,
                        fontVariantNumeric: 'tabular-nums',
                        boxShadow: '0 3px 8px rgba(220, 38, 38, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Clock size={13} color="#FCA5A5" />
                      <span>{time}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#9CA3AF' }}>Chưa có thông tin giờ lễ Chúa Nhật</p>
              )}
            </div>

            {/* Thứ Bảy Section (If present) */}
            {item.saturdayMass && item.saturdayMass.length > 0 && (
              <div style={{
                padding: '14px 16px',
                borderRadius: '14px',
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Calendar size={15} color="#D97706" />
                  <span style={{ fontWeight: 800, color: '#B45309', fontSize: '0.88rem', textTransform: 'uppercase' }}>
                    Chiều Thứ Bảy (Lễ Vọng Chúa Nhật)
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.saturdayMass.map(time => (
                    <span
                      key={time}
                      style={{
                        padding: '6px 14px',
                        backgroundColor: '#F59E0B',
                        color: '#FFFFFF',
                        borderRadius: '10px',
                        fontSize: '0.92rem',
                        fontWeight: 800,
                        fontVariantNumeric: 'tabular-nums',
                        boxShadow: '0 2px 6px rgba(245, 158, 11, 0.25)'
                      }}
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Ngày Thường Section */}
            <div style={{
              padding: '14px 16px',
              borderRadius: '14px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              marginBottom: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Calendar size={15} color="#2563EB" />
                <span style={{ fontWeight: 800, color: '#1D4ED8', fontSize: '0.88rem', textTransform: 'uppercase' }}>
                  Ngày Trong Tuần (Thứ Hai – Thứ Bảy)
                </span>
              </div>
              {item.weekdayMass && item.weekdayMass.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.weekdayMass.map(time => (
                    <span
                      key={time}
                      style={{
                        padding: '6px 14px',
                        backgroundColor: '#2563EB',
                        color: '#FFFFFF',
                        borderRadius: '10px',
                        fontSize: '0.92rem',
                        fontWeight: 800,
                        fontVariantNumeric: 'tabular-nums',
                        boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
                      }}
                    >
                      {time}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#9CA3AF' }}>Chưa có thông tin giờ lễ ngày thường</p>
              )}
            </div>

            {/* Chi tiết từng thứ trong tuần nếu có */}
            {item.byDay && (
              <div style={{
                padding: '14px 16px',
                borderRadius: '14px',
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#4B5563', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Lịch Chi Tiết Từng Ngày
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {DAY_ORDER.filter(d => item.byDay?.[d]?.length).map(d => (
                    <div key={d} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dashed #E5E7EB' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.84rem', color: d === 'Chúa Nhật' ? '#DC2626' : '#374151' }}>
                        {d}
                      </span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {item.byDay![d].map(t => (
                          <span key={t} style={{
                            padding: '2px 8px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            backgroundColor: d === 'Chúa Nhật' ? 'rgba(220, 38, 38, 0.12)' : 'rgba(37, 99, 235, 0.12)',
                            color: d === 'Chúa Nhật' ? '#DC2626' : '#2563EB'
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

            {/* Ticket Stub Barcode Footer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px dashed #E5E7EB',
              marginTop: '10px'
            }}>
              <div>
                <div style={{
                  fontSize: '1.2rem',
                  fontFamily: 'monospace',
                  letterSpacing: '2px',
                  color: '#4B5563',
                  fontWeight: 900,
                  userSelect: 'none'
                }}>
                  ||| | || ||||| | ||| |||| |
                </div>
                <div style={{ fontSize: '0.68rem', color: '#9CA3AF', fontWeight: 600, marginTop: '2px' }}>
                  Xứ Đoàn Các Thánh Tử Đạo Việt Nam
                </div>
              </div>

              <button
                onClick={handleShare}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 3px 10px rgba(211, 47, 47, 0.3)'
                }}
              >
                <Share2 size={15} /> Chia Sẻ Thẻ
              </button>
            </div>
          </div>
        </div>

        {/* Action Row Under Ticket */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '16px'
        }}>
          <button
            onClick={() => setFeedbackOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              color: '#4B5563',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              backdropFilter: 'blur(8px)'
            }}
          >
            <Edit3 size={14} /> Báo sai / Cập nhật giờ lễ này
          </button>

          <span style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600 }}>
            Cập nhật thường xuyên
          </span>
        </div>

        {/* Quick Navigation Cards */}
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
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--color-dark)',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              textDecoration: 'none',
              backdropFilter: 'blur(10px)'
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
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--color-dark)',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              textDecoration: 'none',
              backdropFilter: 'blur(10px)'
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
