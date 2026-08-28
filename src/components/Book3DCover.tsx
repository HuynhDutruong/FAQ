'use client';

import React from 'react';
import { Book } from '@/lib/library/types';

interface Book3DCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showRibbon?: boolean;
}

export default function Book3DCover({ book, size = 'md', showRibbon = true }: Book3DCoverProps) {
  // Dimension setups
  const dimensions = {
    sm: { width: 140, height: 195, spineWidth: 14, pageThickness: 12, titleSize: '0.78rem', authorSize: '0.62rem' },
    md: { width: 190, height: 265, spineWidth: 18, pageThickness: 16, titleSize: '0.96rem', authorSize: '0.72rem' },
    lg: { width: 230, height: 320, spineWidth: 22, pageThickness: 20, titleSize: '1.12rem', authorSize: '0.8rem' },
    hero: { width: 260, height: 360, spineWidth: 24, pageThickness: 24, titleSize: '1.25rem', authorSize: '0.86rem' }
  }[size];

  // Specific leather styles and emblems per book
  const getBookCoverTheme = (b: Book) => {
    switch (b.id) {
      case 'nghi-thuc-dieu-le-tntt-vn':
        return {
          leatherGradient: 'linear-gradient(145deg, #991B1B 0%, #7F1D1D 45%, #450A0A 100%)',
          accentColor: '#FDE68A',
          emblem: '✠',
          subtitleText: 'TỔNG LIÊN ĐOÀN VIỆT NAM',
          ribbonColor: '#DC2626',
          gildedPages: '#F59E0B'
        };
      case 'cam-nang-huynh-truong-tntt':
        return {
          leatherGradient: 'linear-gradient(145deg, #B45309 0%, #92400E 50%, #451A03 100%)',
          accentColor: '#FEF08A',
          emblem: '☧',
          subtitleText: 'HUẤN LUYỆN HUYNH TRƯỞNG',
          ribbonColor: '#D97706',
          gildedPages: '#F59E0B'
        };
      case 'lich-su-phong-trao-tntt-vn':
        return {
          leatherGradient: 'linear-gradient(145deg, #0F766E 0%, #115E59 50%, #042F2E 100%)',
          accentColor: '#CCFBF1',
          emblem: '⚜',
          subtitleText: 'KỶ YẾU 100 NĂM PHONG TRÀO',
          ribbonColor: '#0D9488',
          gildedPages: '#E6D7B9'
        };
      case '117-thanh-tu-dao-viet-nam':
        return {
          leatherGradient: 'linear-gradient(145deg, #881337 0%, #4C0519 50%, #25020D 100%)',
          accentColor: '#FDE68A',
          emblem: '✝',
          subtitleText: 'CHỨNG NHÂN ĐỨC TIN HÀO HÙNG',
          ribbonColor: '#BE123C',
          gildedPages: '#F59E0B'
        };
      case 'guong-cac-thanh-365-ngay':
        return {
          leatherGradient: 'linear-gradient(145deg, #1E3A8A 0%, #172554 50%, #080D1A 100%)',
          accentColor: '#93C5FD',
          emblem: '✨',
          subtitleText: 'HẠNH TÍCH CÁC THÁNH TOÀN NIÊN',
          ribbonColor: '#2563EB',
          gildedPages: '#E2E8F0'
        };
      case 'kinh-thanh-cuu-uoc-ngu-thu':
        return {
          leatherGradient: 'linear-gradient(145deg, #78350F 0%, #451A03 50%, #1F0D02 100%)',
          accentColor: '#FDE68A',
          emblem: '✡',
          subtitleText: 'VETUS TESTAMENTUM • BỘ NGŨ THƯ',
          ribbonColor: '#B45309',
          gildedPages: '#F59E0B'
        };
      case 'kinh-thanh-tan-uoc-tin-mung-cong-vu':
        return {
          leatherGradient: 'linear-gradient(145deg, #1E293B 0%, #0F172A 50%, #020617 100%)',
          accentColor: '#FDE68A',
          emblem: '☧',
          subtitleText: 'NOVUM TESTAMENTUM • 4 TIN MỪNG',
          ribbonColor: '#DC2626',
          gildedPages: '#F59E0B'
        };
      case 'guong-chua-giesu':
        return {
          leatherGradient: 'linear-gradient(145deg, #581C87 0%, #3B0764 50%, #1E0338 100%)',
          accentColor: '#E9D5FF',
          emblem: '✝',
          subtitleText: 'DE IMITATIONE CHRISTI',
          ribbonColor: '#7E22CE',
          gildedPages: '#F59E0B'
        };
      case 'duong-hy-vong':
        return {
          leatherGradient: 'linear-gradient(145deg, #064E3B 0%, #022C22 50%, #01140F 100%)',
          accentColor: '#A7F3D0',
          emblem: '⚓',
          subtitleText: '1001 CÂU SUY NIỆM TRONG TÙ',
          ribbonColor: '#059669',
          gildedPages: '#F59E0B'
        };
      default:
        return {
          leatherGradient: 'linear-gradient(145deg, #334155 0%, #1E293B 50%, #0F172A 100%)',
          accentColor: '#FDE68A',
          emblem: '✝',
          subtitleText: 'VĂN KIỆN CÔNG GIÁO',
          ribbonColor: '#DC2626',
          gildedPages: '#F59E0B'
        };
    }
  };

  const theme = getBookCoverTheme(book);

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        perspective: '1200px',
        width: `${dimensions.width + dimensions.pageThickness}px`,
        height: `${dimensions.height}px`,
        margin: '0 auto'
      }}
      className="book-3d-wrapper"
    >
      {/* 3D ROTATABLE CONTAINER */}
      <div
        style={{
          position: 'relative',
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-12deg) rotateX(3deg)',
          transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease',
          boxShadow: `
            -18px 24px 35px rgba(0, 0, 0, 0.45),
            -4px 8px 16px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset
          `,
          borderRadius: '4px 10px 10px 4px',
          cursor: 'pointer'
        }}
        className="book-3d-cover"
      >
        {/* ========================================================================= */}
        {/* 1. RIGHT SIDE: REALISTIC GILDED PAGES BLOCK (ĐỘ DÀY TRANG SÁCH 3D) */}
        {/* ========================================================================= */}
        <div
          style={{
            position: 'absolute',
            top: '3px',
            right: `-${dimensions.pageThickness - 2}px`,
            width: `${dimensions.pageThickness}px`,
            height: `${dimensions.height - 6}px`,
            background: `repeating-linear-gradient(
              to right,
              #F8FAFC 0px,
              #F8FAFC 1px,
              #E2E8F0 1.5px,
              #CBD5E1 2px,
              #E6D7B9 2.5px
            )`,
            boxShadow: `
              inset 0 0 6px rgba(0, 0, 0, 0.4),
              2px 3px 8px rgba(0, 0, 0, 0.35)
            `,
            transform: 'rotateY(90deg)',
            transformOrigin: 'left center',
            borderRadius: '0 3px 3px 0'
          }}
        />

        {/* ========================================================================= */}
        {/* 2. TOP & BOTTOM EDGES (MÉP TRANG TRÊN VÀ DƯỚI) */}
        {/* ========================================================================= */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: `${dimensions.spineWidth}px`,
            width: `${dimensions.width - dimensions.spineWidth}px`,
            height: `${dimensions.pageThickness}px`,
            background: 'linear-gradient(to bottom, #E2E8F0, #CBD5E1)',
            transform: 'rotateX(90deg)',
            transformOrigin: 'top center',
            boxShadow: 'inset 0 0 4px rgba(0,0,0,0.3)'
          }}
        />

        {/* ========================================================================= */}
        {/* 3. HARDCOVER FRONT SURFACE (BÌA DA CAO CẤP ÉP KIM VÀNG) */}
        {/* ========================================================================= */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: theme.leatherGradient,
            borderRadius: '4px 10px 10px 4px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: `${dimensions.height * 0.08}px ${dimensions.width * 0.08}px ${dimensions.height * 0.07}px ${dimensions.spineWidth + 12}px`,
            boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.6), inset 0 2px 2px rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Leather Grain Texture Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.12,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '4px 4px',
              pointerEvents: 'none'
            }}
          />

          {/* Spine Fold Shadow (Nếp gấp gáy sách chân thật) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${dimensions.spineWidth}px`,
              width: '10px',
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(0, 0, 0, 0.4) 100%)',
              boxShadow: '1px 0 3px rgba(0,0,0,0.4)',
              pointerEvents: 'none'
            }}
          />

          {/* Spine Left Edge Stitching Lines (Gân gáy sách dập chỉ) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: `${dimensions.spineWidth}px`,
              background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(255,255,255,0.08) 50%, rgba(0,0,0,0.5) 100%)',
              borderRight: '1px solid rgba(255,215,0,0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '16px 0'
            }}
          >
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                style={{
                  width: '80%',
                  height: '2.5px',
                  backgroundColor: 'rgba(253, 230, 138, 0.5)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.8)'
                }}
              />
            ))}
          </div>

          {/* Ornate Gold Filigree Border Frame (Khung viền mạ vàng) */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              right: '10px',
              left: `${dimensions.spineWidth + 8}px`,
              border: '2px solid rgba(253, 230, 138, 0.55)',
              borderRadius: '6px',
              pointerEvents: 'none',
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.4), 0 0 4px rgba(253, 230, 138, 0.3)'
            }}
          >
            {/* Inner Thin Border */}
            <div
              style={{
                position: 'absolute',
                inset: '3px',
                border: '1px solid rgba(253, 230, 138, 0.35)',
                borderRadius: '4px'
              }}
            />
            {/* Corner Filigree Accents */}
            <div style={{ position: 'absolute', top: '2px', left: '2px', width: '8px', height: '8px', borderTop: '2px solid #FDE68A', borderLeft: '2px solid #FDE68A' }} />
            <div style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', borderTop: '2px solid #FDE68A', borderRight: '2px solid #FDE68A' }} />
            <div style={{ position: 'absolute', bottom: '2px', left: '2px', width: '8px', height: '8px', borderBottom: '2px solid #FDE68A', borderLeft: '2px solid #FDE68A' }} />
            <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '8px', height: '8px', borderBottom: '2px solid #FDE68A', borderRight: '2px solid #FDE68A' }} />
          </div>

          {/* ========================================================================= */}
          {/* 4. EMBOSSED GOLD FOIL TEXT & EMBLEM (CHỮ NHŨ VÀNG KHẮC NỔI 100%) */}
          {/* ========================================================================= */}

          {/* Top Section: Emblem & Subtitle */}
          <div style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
            <div
              style={{
                fontSize: `${parseFloat(dimensions.titleSize) * 1.3}rem`,
                lineHeight: 1,
                color: '#FDE68A',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(253, 230, 138, 0.5)',
                marginBottom: '6px'
              }}
            >
              {theme.emblem}
            </div>

            <div
              style={{
                fontSize: `${parseFloat(dimensions.authorSize) * 0.8}rem`,
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FDE68A',
                opacity: 0.9,
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)'
              }}
            >
              {theme.subtitleText}
            </div>
          </div>

          {/* Center Section: Main Book Title (Khắc tên đúng 100%) */}
          <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', margin: 'auto 0' }}>
            <h3
              style={{
                margin: 0,
                fontFamily: 'Georgia, "Times New Roman", "Noto Serif", serif',
                fontSize: dimensions.titleSize,
                fontWeight: 900,
                lineHeight: 1.3,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 35%, #F59E0B 70%, #FEF08A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 1px rgba(253, 230, 138, 0.6))',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {book.title}
            </h3>

            {book.originalTitle && (
              <div
                style={{
                  marginTop: '6px',
                  fontFamily: 'Georgia, serif',
                  fontSize: `${parseFloat(dimensions.authorSize) * 0.85}rem`,
                  fontStyle: 'italic',
                  color: 'rgba(253, 230, 138, 0.85)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {book.originalTitle}
              </div>
            )}
          </div>

          {/* Bottom Section: Author & Imprimatur */}
          <div style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
            <div
              style={{
                fontSize: dimensions.authorSize,
                fontWeight: 700,
                color: '#FFFBEB',
                letterSpacing: '0.04em',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                marginBottom: '4px'
              }}
            >
              {book.author}
            </div>

            <div
              style={{
                fontSize: `${parseFloat(dimensions.authorSize) * 0.72}rem`,
                fontWeight: 800,
                color: 'rgba(253, 230, 138, 0.75)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textShadow: '0 1px 2px rgba(0,0,0,0.8)'
              }}
            >
              {book.totalChapters} CHƯƠNG • {book.publishYear || 'CÔNG GIÁO'}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. RIBBON BOOKMARK (DẢI RUY-BĂNG ĐÁNH DẤU SÁCH RŨ XUỐNG ĐÁY) */}
        {/* ========================================================================= */}
        {showRibbon && (
          <div
            style={{
              position: 'absolute',
              bottom: '-18px',
              right: `${dimensions.width * 0.28}px`,
              width: '14px',
              height: '32px',
              backgroundColor: theme.ribbonColor,
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 82%, 0% 100%)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
              zIndex: 4,
              borderTop: '1px solid rgba(255,255,255,0.3)'
            }}
          />
        )}
      </div>
    </div>
  );
}
