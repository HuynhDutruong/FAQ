'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ALL_POPES, PopeRecord } from '@/lib/vatican/popes';
import { X, Calendar, MapPin, Award } from 'lucide-react';

/**
 * Biểu tượng Logo Giáo Hoàng / Tòa Thánh Vatican (2D Flat Vector SVG):
 * Hai Chìa Khóa Nước Trời của Thánh Phêrô đan chéo cùng Thánh Giá Tông Tòa.
 */
function PapalLogo({ size = 20, color = 'var(--color-red)' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      {/* Thánh Giá Tông Tòa Giáo Hoàng */}
      <path d="M12 2v7" />
      <path d="M9 4.5h6" />
      <path d="M10 6.5h4" />
      {/* Hai Chìa Khóa Nước Trời Thánh Phêrô đan chéo */}
      <path d="M6.5 17.5L17.5 6.5" />
      <path d="M17.5 17.5L6.5 6.5" />
      {/* Tay cầm chìa khóa hình tròn */}
      <circle cx="5.5" cy="18.5" r="2.2" />
      <circle cx="18.5" cy="18.5" r="2.2" />
      {/* Răng chìa khóa */}
      <path d="M16 8l2-2" />
      <path d="M17.5 9.5l1.5-1.5" />
      <path d="M8 8L6 6" />
      <path d="M6.5 9.5L5 8" />
    </svg>
  );
}

export default function PopesContinuousMarquee() {
  const [selectedPope, setSelectedPope] = useState<PopeRecord | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  // Nhân bản mảng để cuộn liên tục vô tận mượt mà
  const marqueeList = [...ALL_POPES, ...ALL_POPES];

  return (
    <div
      style={{
        margin: '20px 0 36px',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {/* Gradient Fade Masks Hai Bên Tạo Chiều Sâu */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '60px',
          background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 100%)',
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
          background: 'linear-gradient(to left, var(--color-bg) 0%, transparent 100%)',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      />

      {/* Dải Băng Chuyền Chân Dung 267 Giáo Triều Chạy Trực Tiếp (Không Dùng Khung Card) */}
      <div
        className="popes-stream-track"
        style={{
          display: 'flex',
          gap: '24px',
          width: 'max-content',
          padding: '16px 20px 24px'
        }}
      >
        {marqueeList.map((pope, idx) => (
          <div
            key={`${pope.num}-${idx}`}
            onClick={() => setSelectedPope(pope)}
            className="pope-stream-item"
          >
            {/* Huy Hiệu Chân Dung Tròn Lớn Với Viền Hoàng Kim Cao Cấp */}
            <div className="pope-avatar-ring">
              {!failedImages[pope.num] ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={`/images/popes/thumb/pope_${pope.num}.webp`}
                  alt={pope.nameVi}
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className="pope-avatar-img"
                  onError={() => setFailedImages((prev) => ({ ...prev, [pope.num]: true }))}
                />
              ) : (
                <div className="pope-avatar-fallback">
                  <PapalLogo size={28} color="#B45309" />
                  <span>#{pope.num}</span>
                </div>
              )}
            </div>

            {/* Thứ tự Giáo Triều */}
            <span className="pope-order-badge">Giáo Triều {pope.num}</span>

            {/* Tên tiếng Việt */}
            <div className="pope-name-vi">{pope.nameVi}</div>

            {/* Tên Latinh chính thức */}
            <div className="pope-name-latin">{pope.nameLatin}</div>

            {/* Niên hiệu trị vì */}
            <div className="pope-reign">{pope.reign}</div>
          </div>
        ))}
      </div>

      {/* Modal Chi Tiết Giáo Triều & Dấu Mốc Lịch Sử */}
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
              maxWidth: '520px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '18px',
              border: '1.5px solid var(--color-border-subtle)',
              boxShadow: '0 25px 70px rgba(0,0,0,0.55)',
              padding: '26px',
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
              <X size={22} />
            </button>

            {/* Profile Header */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '18px' }}>
              <div
                style={{
                  width: '116px',
                  height: '116px',
                  borderRadius: '50%',
                  border: '3.5px solid #D97706',
                  marginBottom: '12px',
                  boxShadow: '0 8px 24px rgba(217, 119, 6, 0.3)',
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
                    sizes="116px"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <PapalLogo size={36} color="#B45309" />
                    <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-dark)', marginTop: '2px' }}>
                      #{selectedPope.num}
                    </div>
                  </div>
                )}
              </div>

              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  backgroundColor: 'rgba(153, 27, 27, 0.08)',
                  color: 'var(--color-red)',
                  padding: '3px 14px',
                  borderRadius: '20px',
                  border: '1px solid rgba(153, 27, 27, 0.2)'
                }}
              >
                GIÁO TRIỀU THỨ {selectedPope.num}
              </span>

              <h3 style={{ margin: '8px 0 2px', fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-dark)' }}>
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
                borderRadius: '12px',
                padding: '12px 16px',
                border: '1px solid var(--color-border-subtle)',
                fontSize: '0.86rem',
                marginBottom: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '7px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={15} color="var(--color-red)" />
                <span>
                  <strong style={{ color: 'var(--color-dark)' }}>Niên hiệu Giáo Triều:</strong> {selectedPope.reign}
                </span>
              </div>

              {selectedPope.birthPlace && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={15} color="#B45309" />
                  <span>
                    <strong style={{ color: 'var(--color-dark)' }}>Quê quán:</strong> {selectedPope.birthPlace}
                  </span>
                </div>
              )}
            </div>

            {/* Dấu ấn Lịch sử Giáo Triều */}
            {selectedPope.notes && (
              <div
                style={{
                  backgroundColor: 'rgba(153, 27, 27, 0.04)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  border: '1px solid var(--color-border-subtle)',
                  borderLeft: '4px solid var(--color-red)',
                  marginBottom: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-red)', marginBottom: '6px' }}>
                  <Award size={16} />
                  <span>Dấu ấn Lịch sử Giáo Triều:</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--color-dark)', lineHeight: 1.6, textAlign: 'justify' }}>
                  {selectedPope.notes}
                </p>
              </div>
            )}

            <button
              onClick={() => setSelectedPope(null)}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-red)',
                color: '#FFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.86rem',
                cursor: 'pointer'
              }}
            >
              Đóng Cửa Sổ
            </button>
          </div>
        </div>
      )}

      {/* Marquee Animation & Hover Glow Effects */}
      <style jsx global>{`
        @keyframes popesStreamScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .popes-stream-track {
          animation: popesStreamScroll 260s linear infinite;
        }

        .popes-stream-track:hover {
          animation-play-state: paused !important;
        }

        .pope-stream-item {
          flex-shrink: 0;
          width: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          user-select: none;
          transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .pope-avatar-ring {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          border: 3px solid #D97706;
          box-shadow: 0 6px 20px rgba(217, 119, 6, 0.22), 0 2px 8px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
          background-color: var(--color-input-bg);
          margin-bottom: 10px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .pope-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }

        .pope-avatar-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--color-dark);
        }

        .pope-avatar-fallback span {
          font-size: 0.68rem;
          font-weight: 800;
          margin-top: 2px;
          color: var(--color-subtle);
        }

        .pope-order-badge {
          font-size: 0.66rem;
          font-weight: 800;
          color: var(--color-red);
          background-color: rgba(153, 27, 27, 0.08);
          padding: 2px 9px;
          border-radius: 12px;
          border: 1px solid rgba(153, 27, 27, 0.18);
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }

        .pope-name-vi {
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--color-dark);
          line-height: 1.25;
          min-height: 2.2em;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pope-name-latin {
          font-size: 0.74rem;
          font-weight: 700;
          font-style: italic;
          color: #B45309;
          margin-top: 2px;
        }

        .pope-reign {
          font-size: 0.7rem;
          color: var(--color-subtle);
          margin-top: 3px;
          font-weight: 600;
        }

        .pope-stream-item:hover {
          transform: translateY(-8px);
        }

        .pope-stream-item:hover .pope-avatar-ring {
          transform: scale(1.1);
          border-color: #F59E0B !important;
          box-shadow: 0 10px 28px rgba(245, 158, 11, 0.4), 0 2px 10px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>
    </div>
  );
}
