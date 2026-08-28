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
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck
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

Tra cứu giờ lễ tại: ${shareUrl}`;

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
      showToast('Đã sao chép liên kết vào bộ nhớ tạm!');
    } catch {
      showToast('Không thể sao chép liên kết.');
    }
  };

  const mapNavUrl = item.lat && item.lng
    ? `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.parish}, ${item.address || ''}`)}`;

  const hasSunday = item.sundayMass && item.sundayMass.length > 0;
  const hasSaturday = item.saturdayMass && item.saturdayMass.length > 0;
  const hasWeekday = item.weekdayMass && item.weekdayMass.length > 0;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)' }}>
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
            color: '#FFFFFF',
            padding: '10px 22px',
            borderRadius: '999px',
            fontSize: '0.88rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
        >
          <Check size={16} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Sticky Navigation */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'var(--color-card-bg)',
          borderBottom: '1px solid var(--color-border-subtle)',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '920px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/gio-le"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-btn-subtle-bg)',
              color: 'var(--color-dark)',
              textDecoration: 'none'
            }}
            title="Quay lại danh sách giờ lễ"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-subtle)', textTransform: 'uppercase' }}>
              Tra Cứu Giờ Lễ
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-dark)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '240px' }}>
              {item.parish}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setFeedbackOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-btn-subtle-bg)',
              color: 'var(--color-dark)',
              border: '1px solid var(--color-border-subtle)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Edit3 size={14} />
            <span className="hidden-mobile">Sửa giờ lễ</span>
          </button>

          <button
            onClick={handleShare}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-red)',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Share2 size={14} />
            <span>Chia sẻ</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '920px', margin: '0 auto', width: '100%', padding: '24px 16px 60px', display: 'flex', flexDirection: 'column', gap: '20px', boxSizing: 'border-box' }}>
        
        {/* 1. Header Card - Church Identity */}
        <div
          className="liquid-glass"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--color-border-subtle)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'var(--glass-shadow)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(211, 47, 47, 0.08)', color: 'var(--color-red)', fontSize: '0.78rem', fontWeight: 700, marginBottom: '8px' }}>
                <ShieldCheck size={14} />
                <span>Giáo phận {item.diocese ? dioceseLabel(item.diocese) : 'Việt Nam'}</span>
                {item.deanery && <span>• Hạt {item.deanery}</span>}
              </div>

              <h1 style={{ margin: 0, fontSize: 'clamp(1.35rem, 3.5vw, 1.85rem)', fontWeight: 900, color: 'var(--color-dark)', lineHeight: 1.25 }}>
                {item.parish}
              </h1>

              {item.address && (
                <p style={{ margin: '8px 0 0', fontSize: '0.92rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'flex-start', gap: '6px', lineHeight: 1.4 }}>
                  <MapPin size={16} strokeWidth={2.2} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-red)' }} />
                  <span>{item.address}</span>
                </p>
              )}
            </div>

            {/* Google Maps Button */}
            <a
              href={mapNavUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                backgroundColor: '#1E40AF',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(30, 64, 175, 0.25)',
                whiteSpace: 'nowrap'
              }}
            >
              <Navigation size={16} />
              <span>Chỉ Đường Maps</span>
            </a>
          </div>
        </div>

        {/* 2. Mass Times Schedule Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          
          {/* Sunday Mass (Prominent) */}
          <div
            className="liquid-glass"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '14px',
              border: '1px solid var(--color-border-subtle)',
              borderTop: '4px solid var(--color-red)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-red)', fontWeight: 800, fontSize: '0.95rem' }}>
                <Calendar size={18} />
                <span>CHÚA NHẬT (LỄ CHÍNH)</span>
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(211, 47, 47, 0.1)', color: 'var(--color-red)' }}>
                Trọng Thể
              </span>
            </div>

            {hasSunday && item.sundayMass ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '4px' }}>
                {item.sundayMass.map((time, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(211, 47, 47, 0.08)',
                      color: 'var(--color-red)',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Clock size={16} strokeWidth={2.5} />
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-subtle)', fontStyle: 'italic' }}>
                Chưa có thông tin giờ lễ Chúa Nhật
              </p>
            )}
          </div>

          {/* Saturday Mass (Vigil) */}
          <div
            className="liquid-glass"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '14px',
              border: '1px solid var(--color-border-subtle)',
              borderTop: '4px solid #D97706',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D97706', fontWeight: 800, fontSize: '0.95rem' }}>
                <Calendar size={18} />
                <span>THỨ BẢY (LỄ VỌNG)</span>
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(217, 119, 6, 0.1)', color: '#D97706' }}>
                Chiều Tối
              </span>
            </div>

            {hasSaturday && item.saturdayMass ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '4px' }}>
                {item.saturdayMass.map((time, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(217, 119, 6, 0.1)',
                      color: '#B45309',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Clock size={16} strokeWidth={2.5} />
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-subtle)', fontStyle: 'italic' }}>
                Chưa có thông tin lễ vọng Thứ Bảy
              </p>
            )}
          </div>

          {/* Weekday Mass */}
          <div
            className="liquid-glass"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '14px',
              border: '1px solid var(--color-border-subtle)',
              borderTop: '4px solid #2563EB',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563EB', fontWeight: 800, fontSize: '0.95rem' }}>
                <Clock size={18} />
                <span>NGÀY TRONG TUẦN (THỨ 2 - THỨ 6)</span>
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(37, 99, 235, 0.1)', color: '#2563EB' }}>
                Thường Niên
              </span>
            </div>

            {hasWeekday && item.weekdayMass ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '4px' }}>
                {item.weekdayMass.map((time, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(37, 99, 235, 0.08)',
                      color: '#1D4ED8',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Clock size={16} strokeWidth={2.5} />
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-subtle)', fontStyle: 'italic' }}>
                Chưa có thông tin giờ lễ ngày thường
              </p>
            )}
          </div>
        </div>

        {/* 3. Detailed Weekly Schedule Breakdown Table */}
        <div
          className="liquid-glass"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--color-border-subtle)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '12px' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} color="var(--color-red)" />
              <span>Lịch Chi Tiết Từng Ngày</span>
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-subtle)', fontWeight: 600 }}>
              Cập nhật thường xuyên
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {DAY_ORDER.map((day) => {
              const times =
                day === 'Chúa Nhật'
                  ? item.sundayMass
                  : day === 'Thứ Bảy'
                  ? (item.saturdayMass && item.saturdayMass.length > 0 ? item.saturdayMass : item.weekdayMass)
                  : item.weekdayMass;

              const isSunday = day === 'Chúa Nhật';
              const isSaturday = day === 'Thứ Bảy';

              return (
                <div
                  key={day}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: isSunday
                      ? 'rgba(211, 47, 47, 0.04)'
                      : isSaturday
                      ? 'rgba(217, 119, 6, 0.04)'
                      : 'var(--color-btn-subtle-bg)',
                    border: isSunday
                      ? '1px solid rgba(211, 47, 47, 0.12)'
                      : isSaturday
                      ? '1px solid rgba(217, 119, 6, 0.12)'
                      : '1px solid transparent'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        fontSize: '0.92rem',
                        fontWeight: isSunday || isSaturday ? 800 : 700,
                        color: isSunday
                          ? 'var(--color-red)'
                          : isSaturday
                          ? '#D97706'
                          : 'var(--color-dark)'
                      }}
                    >
                      {day}
                    </span>
                    {isSunday && (
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px', backgroundColor: 'var(--color-red)', color: '#FFFFFF' }}>
                        Chính Lễ
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'flex-end' }}>
                    {times && times.length > 0 ? (
                      times.map((t, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            backgroundColor: isSunday ? 'var(--color-red)' : 'var(--color-card-bg)',
                            color: isSunday ? '#FFFFFF' : 'var(--color-dark)',
                            border: isSunday ? 'none' : '1px solid var(--color-border-subtle)',
                            fontWeight: 700,
                            fontSize: '0.88rem'
                          }}
                        >
                          {t}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: 'var(--color-subtle)', fontSize: '0.85rem' }}>—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Bottom Action Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
            paddingTop: '8px'
          }}
        >
          <button
            onClick={() => setFeedbackOpen(true)}
            style={{
              flex: '1 1 200px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 18px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-dark)',
              border: '1px solid var(--color-border-subtle)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <Edit3 size={16} color="var(--color-red)" />
            <span>Báo sai / Cập nhật giờ lễ</span>
          </button>

          <Link
            href="/gio-le"
            style={{
              flex: '1 1 200px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 18px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-dark)',
              border: '1px solid var(--color-border-subtle)',
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none'
            }}
          >
            <Search size={16} color="#2563EB" />
            <span>Tìm Nhà Thờ Khác</span>
          </Link>

          <Link
            href="/"
            style={{
              flex: '1 1 200px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 18px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-dark)',
              border: '1px solid var(--color-border-subtle)',
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none'
            }}
          >
            <Home size={16} />
            <span>Trang Chủ Xứ Đoàn</span>
          </Link>
        </div>

      </div>

      {/* Edit / Feedback Modal */}
      {feedbackOpen && (
        <MassTimeFeedbackModal
          isOpen={feedbackOpen}
          onClose={() => setFeedbackOpen(false)}
          targetParish={item}
          defaultDiocese={item.diocese}
        />
      )}
    </main>
  );
}
