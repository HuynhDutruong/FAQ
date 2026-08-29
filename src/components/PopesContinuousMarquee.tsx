'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ALL_POPES, PopeRecord } from '@/lib/vatican/popes';
import { Crown, Sparkles, Search, Pause, Play, Eye, X, Globe, Church, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

export default function PopesContinuousMarquee() {
  const [selectedPope, setSelectedPope] = useState<PopeRecord | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const filteredPopes = useMemo(() => {
    if (!searchQuery.trim()) return ALL_POPES;
    const q = searchQuery.toLowerCase().trim();
    return ALL_POPES.filter(
      (p) =>
        p.nameVi.toLowerCase().includes(q) ||
        p.nameLatin.toLowerCase().includes(q) ||
        p.reign.toLowerCase().includes(q) ||
        (p.notes && p.notes.toLowerCase().includes(q)) ||
        (p.birthPlace && p.birthPlace.toLowerCase().includes(q)) ||
        p.num.toString() === q
    );
  }, [searchQuery]);

  // Duplicate for seamless infinite loop if not filtering
  const marqueeList = useMemo(() => {
    if (searchQuery.trim()) return filteredPopes;
    return [...ALL_POPES, ...ALL_POPES];
  }, [searchQuery, filteredPopes]);

  return (
    <div
      style={{
        margin: '28px 0',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '12px',
        border: '1px solid var(--color-border-subtle)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Header Bar đồng bộ chuẩn phong cách Bách Khoa */}
      <div
        style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--color-border-subtle)',
          backgroundColor: 'rgba(153, 27, 27, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'rgba(153, 27, 27, 0.08)',
              border: '1px solid rgba(153, 27, 27, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-red)'
            }}
          >
            <Crown size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-dark)' }}>
              Biên niên sử 267 Vị Giáo Hoàng (Từ Thánh Phêrô đến Đức Lêô XIV)
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)' }}>
              Chân dung đầy đủ 267 Vị Giáo Hoàng • Danh xưng tiếng Việt • Tông hiệu tiếng Latinh • Dấu mốc lịch sử
            </div>
          </div>
        </div>

        {/* Search & Pause Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Search size={14} color="var(--color-subtle)" style={{ position: 'absolute', left: '10px' }} />
            <input
              type="text"
              placeholder="Tìm Giáo Hoàng (tên, Latinh, năm, dấu ấn)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '6px 12px 6px 30px',
                borderRadius: '8px',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-input-bg)',
                color: 'var(--color-dark)',
                fontSize: '0.78rem',
                width: '210px',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: isPaused ? 'rgba(153, 27, 27, 0.1)' : 'var(--color-input-bg)',
              color: isPaused ? 'var(--color-red)' : 'var(--color-dark)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
            <span>{isPaused ? 'Chạy tiếp' : 'Tạm dừng'}</span>
          </button>
        </div>
      </div>

      {/* Marquee Track Container */}
      <div
        style={{
          padding: '20px 0',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--color-card-bg)'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (!searchQuery) setIsPaused(false);
        }}
      >
        {/* Left & Right Gradient fade masks */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '40px',
            background: 'linear-gradient(to right, var(--color-card-bg) 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '40px',
            background: 'linear-gradient(to left, var(--color-card-bg) 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />

        <div
          className={`popes-marquee-track ${isPaused || searchQuery ? 'paused' : ''}`}
          style={{
            display: 'flex',
            gap: '14px',
            width: 'max-content',
            padding: '0 16px'
          }}
        >
          {marqueeList.map((pope, idx) => (
            <div
              key={`${pope.num}-${idx}`}
              onClick={() => setSelectedPope(pope)}
              style={{
                flexShrink: 0,
                width: '165px',
                padding: '14px 10px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-input-bg)',
                border: '1px solid var(--color-border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                position: 'relative'
              }}
              className="pope-medallion-card"
            >
              {/* Huy Hiệu Tròn Chân Dung Của Từng Vị Giáo Hoàng */}
              <div
                style={{
                  width: '78px',
                  height: '78px',
                  borderRadius: '50%',
                  border: '2px solid #B45309',
                  backgroundColor: 'var(--color-card-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {!failedImages[pope.num] ? (
                  <Image
                    src={`/images/popes/pope_${pope.num}.jpg`}
                    alt={pope.nameVi}
                    fill
                    sizes="78px"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    onError={() => setFailedImages((prev) => ({ ...prev, [pope.num]: true }))}
                  />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-dark)'
                    }}
                  >
                    <Crown size={22} color="#B45309" />
                    <span style={{ fontSize: '0.64rem', fontWeight: 800, marginTop: '2px', color: 'var(--color-subtle)' }}>
                      #{pope.num}
                    </span>
                  </div>
                )}
              </div>

              {/* Thứ tự triều đại */}
              <span
                style={{
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  backgroundColor: 'rgba(153, 27, 27, 0.08)',
                  color: 'var(--color-red)',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  border: '1px solid rgba(153, 27, 27, 0.15)',
                  marginBottom: '6px'
                }}
              >
                Vị thứ {pope.num}
              </span>

              {/* Tên tiếng Việt */}
              <div
                style={{
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  color: 'var(--color-dark)',
                  lineHeight: 1.25,
                  minHeight: '2.2em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {pope.nameVi}
              </div>

              {/* Tên Latinh chính thức */}
              <div
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  color: '#B45309',
                  marginTop: '2px'
                }}
              >
                {pope.nameLatin}
              </div>

              {/* Năm trị vì */}
              <div
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--color-subtle)',
                  marginTop: '4px',
                  fontWeight: 600
                }}
              >
                {pope.reign}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div
        style={{
          padding: '10px 18px',
          borderTop: '1px solid var(--color-border-subtle)',
          backgroundColor: 'rgba(153, 27, 27, 0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.74rem',
          color: 'var(--color-subtle)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={13} color="var(--color-red)" />
          <span>Nhấn vào bất kỳ vị nào để xem chân dung sắc nét và toàn bộ dấu mốc lịch sử</span>
        </div>
        <div style={{ fontWeight: 700, color: 'var(--color-dark)' }}>
          Tổng cộng: 267 Triều Đại Giáo Hoàng
        </div>
      </div>

      {/* Modal Popup Chi Tiết Giáo Hoàng & Dấu Mốc Lịch Sử */}
      {selectedPope && (
        <div
          onClick={() => setSelectedPope(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100020,
            backgroundColor: 'rgba(5, 3, 2, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '540px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '16px',
              border: '1.5px solid var(--color-border-subtle)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              padding: '24px',
              color: 'var(--color-dark)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setSelectedPope(null)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'none',
                border: 'none',
                color: 'var(--color-subtle)',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>

            {/* Profile Header */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '16px' }}>
              {/* Medallion Avatar */}
              <div
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  border: '3px solid #B45309',
                  marginBottom: '12px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-input-bg)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {!failedImages[selectedPope.num] ? (
                  <Image
                    src={`/images/popes/pope_${selectedPope.num}.jpg`}
                    alt={selectedPope.nameVi}
                    fill
                    sizes="110px"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <Crown size={34} color="#B45309" />
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-dark)', marginTop: '2px' }}>
                      #{selectedPope.num}
                    </div>
                  </div>
                )}
              </div>

              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  backgroundColor: 'rgba(153, 27, 27, 0.08)',
                  color: 'var(--color-red)',
                  padding: '3px 12px',
                  borderRadius: '20px',
                  border: '1px solid rgba(153, 27, 27, 0.2)'
                }}
              >
                VỊ GIÁO HOÀNG THỨ {selectedPope.num}
              </span>

              <h3 style={{ margin: '10px 0 2px', fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                {selectedPope.nameVi}
              </h3>

              <div style={{ fontSize: '0.94rem', fontStyle: 'italic', color: '#B45309', fontWeight: 700 }}>
                Nomina Latina: {selectedPope.nameLatin}
              </div>
            </div>

            {/* Thông tin triều đại & Quê quán */}
            <div
              style={{
                backgroundColor: 'var(--color-input-bg)',
                borderRadius: '10px',
                padding: '12px 16px',
                border: '1px solid var(--color-border-subtle)',
                fontSize: '0.84rem',
                marginBottom: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={14} color="var(--color-red)" />
                <span>
                  <strong style={{ color: 'var(--color-dark)' }}>Triều đại:</strong> {selectedPope.reign}
                </span>
              </div>

              {selectedPope.birthPlace && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={14} color="#B45309" />
                  <span>
                    <strong style={{ color: 'var(--color-dark)' }}>Quê quán:</strong> {selectedPope.birthPlace}
                  </span>
                </div>
              )}
            </div>

            {/* Dấu mốc & Di sản Lịch sử nổi bật (Nếu có hiển thị chi tiết, nếu không có để trống tinh tế) */}
            {selectedPope.notes && (
              <div
                style={{
                  backgroundColor: 'rgba(153, 27, 27, 0.04)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  border: '1px solid var(--color-border-subtle)',
                  borderLeft: '3.5px solid var(--color-red)',
                  marginBottom: '18px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.86rem', color: 'var(--color-red)', marginBottom: '6px' }}>
                  <Award size={15} />
                  <span>Dấu mốc &amp; Di sản Lịch sử nổi bật:</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--color-dark)', lineHeight: 1.6, textAlign: 'justify' }}>
                  {selectedPope.notes}
                </p>
              </div>
            )}

            <button
              onClick={() => setSelectedPope(null)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-red)',
                color: '#FFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer'
              }}
            >
              Đóng Cửa Sổ
            </button>
          </div>
        </div>
      )}

      {/* Marquee Animation Styles */}
      <style jsx global>{`
        @keyframes popesMarqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .popes-marquee-track {
          animation: popesMarqueeScroll 290s linear infinite;
        }

        .popes-marquee-track.paused {
          animation-play-state: paused !important;
        }

        .pope-medallion-card:hover {
          transform: translateY(-2px);
          border-color: #B45309 !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06) !important;
        }
      `}</style>
    </div>
  );
}
