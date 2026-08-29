'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ALL_POPES, PopeRecord } from '@/lib/vatican/popes';
import { Sparkles, X, Calendar, MapPin, Award } from 'lucide-react';

/**
 * Biểu tượng Logo Giáo Hoàng / Tòa Thánh Vatican (2D Flat Vector SVG):
 * Hai Chìa Khóa Nước Trời của Thánh Phêrô đan chéo cùng Thánh Giá Tông Tòa / Mũ Ba Tầng.
 */
function PapalLogo({ size = 22, color = 'var(--color-red)' }: { size?: number; color?: string }) {
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

  // Duplicate for continuous seamless infinite loop
  const marqueeList = [...ALL_POPES, ...ALL_POPES];

  return (
    <div
      style={{
        margin: '24px 0 32px',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '14px',
        border: '1px solid var(--color-border-subtle)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Header Bar Tinh Gọn, Bố Cục Thông Minh */}
      <div
        style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--color-border-subtle)',
          backgroundColor: 'rgba(153, 27, 27, 0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Title + Logo Giáo Hoàng */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'rgba(153, 27, 27, 0.08)',
              border: '1px solid rgba(153, 27, 27, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <PapalLogo size={22} color="var(--color-red)" />
          </div>

          <div>
            <div style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.3 }}>
              Biên Niên Sử 267 Vị Giáo Hoàng (Từ Thánh Phêrô Đến Đức Lêô XIV)
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
              Danh xưng tiếng Việt • Tông hiệu chính thức tiếng Latinh • Dấu mốc lịch sử
            </div>
          </div>
        </div>

        {/* Badge Thông Tin & Chế Độ Tự Động */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              backgroundColor: 'rgba(153, 27, 27, 0.08)',
              color: 'var(--color-red)',
              padding: '4px 12px',
              borderRadius: '20px',
              border: '1px solid rgba(153, 27, 27, 0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Sparkles size={12} />
            <span>267 Triều Đại Tông Truyền</span>
          </span>
        </div>
      </div>

      {/* Marquee Track Tự Động Chạy (Auto Continuous Scroll) */}
      <div
        style={{
          padding: '20px 0',
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
            width: '45px',
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
            width: '45px',
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
                width: '165px',
                padding: '14px 10px',
                borderRadius: '12px',
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
                  width: '80px',
                  height: '80px',
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
                    sizes="80px"
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
                    <PapalLogo size={24} color="#B45309" />
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

      {/* Footer Info Tinh Gọn */}
      <div
        style={{
          padding: '9px 18px',
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
          <span>Tự động cuộn liên tục • Nhấn vào từng vị để xem tiểu sử &amp; dấu ấn lịch sử</span>
        </div>
        <div style={{ fontWeight: 700, color: 'var(--color-dark)' }}>
          Toàn bộ 267 Vị Giáo Hoàng
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
                    <PapalLogo size={36} color="#B45309" />
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

            {/* Dấu mốc & Di sản Lịch sử nổi bật (Chỉ hiển thị khi có thông tin, không có thì ẩn gọn gàng) */}
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
