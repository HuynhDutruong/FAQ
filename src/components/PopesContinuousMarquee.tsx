'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ALL_POPES, PopeRecord } from '@/lib/vatican/popes';
import { Crown, Sparkles, Search, Pause, Play, Eye, X, Globe, Church } from 'lucide-react';

export default function PopesContinuousMarquee() {
  const [selectedPope, setSelectedPope] = useState<PopeRecord | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPopes = useMemo(() => {
    if (!searchQuery.trim()) return ALL_POPES;
    const q = searchQuery.toLowerCase().trim();
    return ALL_POPES.filter(
      (p) =>
        p.nameVi.toLowerCase().includes(q) ||
        p.nameLatin.toLowerCase().includes(q) ||
        p.reign.toLowerCase().includes(q) ||
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
        margin: '32px 0',
        backgroundColor: '#0D0A07',
        borderRadius: '16px',
        border: '1.5px solid #D4AF37',
        boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
          background: 'linear-gradient(90deg, #1F1710 0%, #150F0A 100%)',
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
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(212, 175, 55, 0.2)',
              border: '1.5px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FDE68A'
            }}
          >
            <Crown size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FDE68A', letterSpacing: '0.4px' }}>
              BIÊN NIÊN SỬ 267 VỊ GIÁO HOÀNG (TỪ THÁNH PHÊRÔ ĐẾN ĐỨC LÊÔ XIV)
            </div>
            <div style={{ fontSize: '0.74rem', color: '#CBD5E1', opacity: 0.9 }}>
              Danh xưng tiếng Việt • Tông hiệu chính thức tiếng Latinh (Nomina Latina) • Triều đại lịch sử
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
            <Search size={14} color="#D4AF37" style={{ position: 'absolute', left: '10px' }} />
            <input
              type="text"
              placeholder="Tìm Giáo Hoàng (tên, Latinh, số thứ tự)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '6px 12px 6px 30px',
                borderRadius: '20px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: '#FFF',
                fontSize: '0.76rem',
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
              borderRadius: '20px',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              backgroundColor: isPaused ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              color: '#FDE68A',
              fontSize: '0.74rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
            <span>{isPaused ? 'Tiếp tục chạy' : 'Tạm dừng'}</span>
          </button>
        </div>
      </div>

      {/* Marquee Track Container */}
      <div
        style={{
          padding: '24px 0',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#090705'
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
            width: '60px',
            background: 'linear-gradient(to right, #090705 0%, transparent 100%)',
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
            width: '60px',
            background: 'linear-gradient(to left, #090705 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />

        <div
          className={`popes-marquee-track ${isPaused || searchQuery ? 'paused' : ''}`}
          style={{
            display: 'flex',
            gap: '18px',
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
                width: '175px',
                padding: '14px 10px',
                borderRadius: '16px',
                backgroundColor: 'rgba(28, 21, 14, 0.95)',
                border: '1.5px solid rgba(212, 175, 55, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
                position: 'relative'
              }}
              className="pope-medallion-card"
            >
              {/* Huy Hiệu Tròn Giáo Hoàng (Circular Medallion Frame) */}
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  border: '2.5px solid #D4AF37',
                  backgroundColor: '#1E1610',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                  boxShadow: '0 0 15px rgba(212, 175, 55, 0.35)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {pope.num === 267 ? (
                  <Image
                    src="/images/pope_leo_xiv.jpg"
                    alt={pope.nameVi}
                    fill
                    sizes="84px"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                ) : pope.num === 266 ? (
                  <Image
                    src="/images/pope_francis.jpg"
                    alt={pope.nameVi}
                    fill
                    sizes="84px"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                ) : pope.num === 256 ? (
                  <Image
                    src="/images/pope_leo_xiv.jpg"
                    alt={pope.nameVi}
                    fill
                    sizes="84px"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FDE68A'
                    }}
                  >
                    <Crown size={26} color="#D4AF37" />
                    <span style={{ fontSize: '0.62rem', fontWeight: 900, marginTop: '2px', color: '#FDE68A' }}>
                      #{pope.num}
                    </span>
                  </div>
                )}
              </div>

              {/* Thứ tự triều đại */}
              <span
                style={{
                  fontSize: '0.66rem',
                  fontWeight: 900,
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  color: '#FDE68A',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  marginBottom: '6px'
                }}
              >
                Vị thứ {pope.num}
              </span>

              {/* Tên tiếng Việt */}
              <div
                style={{
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
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
                  fontWeight: 700,
                  fontStyle: 'italic',
                  color: '#FDE68A',
                  marginTop: '2px'
                }}
              >
                {pope.nameLatin}
              </div>

              {/* Năm trị vì */}
              <div
                style={{
                  fontSize: '0.68rem',
                  color: '#94A3B8',
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
          padding: '10px 20px',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          backgroundColor: '#090705',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.74rem',
          color: '#94A3B8'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={13} color="#D4AF37" />
          <span>Rê chuột hoặc chạm vào bất kỳ vị nào để tạm dừng và xem chi tiết tiểu sử</span>
        </div>
        <div style={{ fontWeight: 700, color: '#FDE68A' }}>
          Tổng cộng: 267 Triều Đại Giáo Hoàng
        </div>
      </div>

      {/* Modal Popup Chi Tiết Giáo Hoàng */}
      {selectedPope && (
        <div
          onClick={() => setSelectedPope(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100020,
            backgroundColor: 'rgba(5, 3, 2, 0.85)',
            backdropFilter: 'blur(10px)',
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
              maxWidth: '480px',
              backgroundColor: '#17120C',
              borderRadius: '20px',
              border: '2px solid #D4AF37',
              boxShadow: '0 25px 70px rgba(0,0,0,0.85)',
              padding: '24px',
              color: '#FFF',
              position: 'relative',
              textAlign: 'center'
            }}
          >
            <button
              onClick={() => setSelectedPope(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                color: '#FDE68A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            {/* Medallion Avatar */}
            <div
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                border: '3px solid #D4AF37',
                margin: '0 auto 16px',
                boxShadow: '0 0 25px rgba(212, 175, 55, 0.4)',
                overflow: 'hidden',
                backgroundColor: '#261C14',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {selectedPope.num === 267 ? (
                <Image
                  src="/images/pope_leo_xiv.jpg"
                  alt={selectedPope.nameVi}
                  fill
                  sizes="110px"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
              ) : selectedPope.num === 266 ? (
                <Image
                  src="/images/pope_francis.jpg"
                  alt={selectedPope.nameVi}
                  fill
                  sizes="110px"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
              ) : selectedPope.num === 256 ? (
                <Image
                  src="/images/pope_leo_xiv.jpg"
                  alt={selectedPope.nameVi}
                  fill
                  sizes="110px"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Crown size={38} color="#D4AF37" />
                  <div style={{ fontSize: '0.74rem', fontWeight: 900, color: '#FDE68A', marginTop: '2px' }}>
                    #{selectedPope.num}
                  </div>
                </div>
              )}
            </div>

            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 900,
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                color: '#FDE68A',
                padding: '3px 12px',
                borderRadius: '12px',
                border: '1px solid rgba(212, 175, 55, 0.4)'
              }}
            >
              VỊ GIÁO HOÀNG THỨ {selectedPope.num}
            </span>

            <h3 style={{ margin: '10px 0 2px', fontSize: '1.35rem', fontWeight: 900, color: '#FFFFFF' }}>
              {selectedPope.nameVi}
            </h3>

            <div style={{ fontSize: '0.96rem', fontStyle: 'italic', color: '#FDE68A', fontWeight: 700, marginBottom: '14px' }}>
              Nomina Latina: {selectedPope.nameLatin}
            </div>

            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '12px',
                padding: '12px 16px',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                textAlign: 'left',
                fontSize: '0.84rem',
                marginBottom: '16px'
              }}
            >
              <div style={{ marginBottom: '6px' }}>
                <strong style={{ color: '#FDE68A' }}>Triều đại:</strong> {selectedPope.reign}
              </div>
              {selectedPope.birthPlace && (
                <div style={{ marginBottom: '6px' }}>
                  <strong style={{ color: '#FDE68A' }}>Quê quán:</strong> {selectedPope.birthPlace}
                </div>
              )}
              {selectedPope.notes && (
                <div>
                  <strong style={{ color: '#FDE68A' }}>Dấu ấn lịch sử:</strong> {selectedPope.notes}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedPope(null)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#B45309',
                color: '#FFF',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.85rem',
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
          transform: translateY(-4px) scale(1.03);
          border-color: #F59E0B !important;
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.35) !important;
          background-color: rgba(45, 34, 23, 0.98) !important;
        }
      `}</style>
    </div>
  );
}
