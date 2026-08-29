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

  // Nhân bản mảng để cuộn vô tận mượt mà
  const marqueeList = [...ALL_POPES, ...ALL_POPES];

  return (
    <div
      style={{
        margin: '20px 0 28px',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '14px',
        border: '1px solid var(--color-border-subtle)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Thanh Tiêu Đề Hoàng Gia Trang Trọng, Gọn Gàng & Không Trùng Lặp */}
      <div
        style={{
          padding: '12px 18px',
          borderBottom: '1px solid var(--color-border-subtle)',
          backgroundColor: 'rgba(153, 27, 27, 0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
              flexShrink: 0
            }}
          >
            <PapalLogo size={19} color="var(--color-red)" />
          </div>
          <h4
            style={{
              margin: 0,
              fontSize: '0.98rem',
              fontWeight: 800,
              color: 'var(--color-dark)',
              letterSpacing: '-0.01em'
            }}
          >
            Biên Niên Sử Các Giáo Triều (Từ Thánh Phêrô Đến Đức Lêô XIV)
          </h4>
        </div>

        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            backgroundColor: 'rgba(153, 27, 27, 0.08)',
            color: 'var(--color-red)',
            padding: '3px 10px',
            borderRadius: '20px',
            border: '1px solid rgba(153, 27, 27, 0.15)',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          267 Giáo Triều
        </span>
      </div>

      {/* Marquee Track Tự Động Cuộn Mượt Mà (Auto Continuous Scroll) */}
      <div
        style={{
          padding: '18px 0',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--color-card-bg)'
        }}
      >
        {/* Gradient Fade Masks Hai Bên */}
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
          className="popes-marquee-track"
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
                width: '160px',
                padding: '12px 8px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-input-bg)',
                border: '1px solid var(--color-border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                position: 'relative'
              }}
              className="pope-medallion-card"
            >
              {/* Huy Hiệu Tròn Chân Dung */}
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  border: '2px solid #B45309',
                  backgroundColor: 'var(--color-card-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {!failedImages[pope.num] ? (
                  <Image
                    src={`/images/popes/pope_${pope.num}.jpg`}
                    alt={pope.nameVi}
                    fill
                    sizes="76px"
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
                    <PapalLogo size={22} color="#B45309" />
                    <span style={{ fontSize: '0.62rem', fontWeight: 800, marginTop: '2px', color: 'var(--color-subtle)' }}>
                      #{pope.num}
                    </span>
                  </div>
                )}
              </div>

              {/* Danh xưng chuẩn Giáo Triều */}
              <span
                style={{
                  fontSize: '0.64rem',
                  fontWeight: 800,
                  backgroundColor: 'rgba(153, 27, 27, 0.08)',
                  color: 'var(--color-red)',
                  padding: '2px 7px',
                  borderRadius: '20px',
                  border: '1px solid rgba(153, 27, 27, 0.15)',
                  marginBottom: '5px'
                }}
              >
                Giáo Triều thứ {pope.num}
              </span>

              {/* Tên tiếng Việt */}
              <div
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: 'var(--color-dark)',
                  lineHeight: 1.25,
                  minHeight: '2.1em',
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
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  color: '#B45309',
                  marginTop: '1px'
                }}
              >
                {pope.nameLatin}
              </div>

              {/* Niên hiệu trị vì */}
              <div
                style={{
                  fontSize: '0.66rem',
                  color: 'var(--color-subtle)',
                  marginTop: '3px',
                  fontWeight: 600
                }}
              >
                {pope.reign}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup Chi Tiết Giáo Triều & Dấu Mốc Lịch Sử */}
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
                  width: '106px',
                  height: '106px',
                  borderRadius: '50%',
                  border: '3px solid #B45309',
                  marginBottom: '10px',
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
                    sizes="106px"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <PapalLogo size={32} color="#B45309" />
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-dark)', marginTop: '2px' }}>
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
                GIÁO TRIỀU THỨ {selectedPope.num}
              </span>

              <h3 style={{ margin: '8px 0 2px', fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                {selectedPope.nameVi}
              </h3>

              <div style={{ fontSize: '0.92rem', fontStyle: 'italic', color: '#B45309', fontWeight: 700 }}>
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
                  <strong style={{ color: 'var(--color-dark)' }}>Niên hiệu Giáo Triều:</strong> {selectedPope.reign}
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

            {/* Dấu mốc & Di sản Lịch sử nổi bật (Chỉ hiển thị khi có thông tin, không có thì để trống tinh tế) */}
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
                  <span>Dấu ấn Lịch sử Giáo Triều:</span>
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
          animation: popesMarqueeScroll 280s linear infinite;
        }

        .popes-marquee-track:hover {
          animation-play-state: paused !important;
        }

        .pope-medallion-card:hover {
          transform: translateY(-2px);
          border-color: #B45309 !important;
          box-shadow: 0 4px 14px rgba(0,0,0,0.06) !important;
        }
      `}</style>
    </div>
  );
}
