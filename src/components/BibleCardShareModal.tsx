'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  Share2,
  Copy,
  Check,
  Church,
  Quote,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { BibleBookInfo } from '@/lib/bible/types';
import { BibleArtwork } from '@/lib/bible/bibleArtworks';
import { CatholicBookIntro } from '@/lib/bible/bibleIntroductions';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  book: BibleBookInfo;
  artwork: BibleArtwork;
  intro: CatholicBookIntro;
}

export default function BibleCardShareModal({
  isOpen,
  onClose,
  book,
  artwork,
  intro
}: Props) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/kinh-thanh/${book.id}`
    : `https://faqfeedback.web.app/kinh-thanh/${book.id}`;

  const shareTitle = `Sách ${book.name} (${book.code}) • Bộ Sưu Tập Nghệ Thuật Thánh Công Giáo`;
  const shareText = `[BỘ SƯU TẬP NGHỆ THUẬT THÁNH CÔNG GIÁO]
Sách: ${book.name} (${book.code}) - ${book.groupLabel}
Kiệt tác: ${artwork.title} (Họa sĩ ${artwork.artist}${artwork.year ? ` • ${artwork.year}` : ''})

LỜI CHÚA:
"${intro.keyVerse}"

SỨ ĐIỆP CỐT LÕI:
${intro.coreMessage}

Xem chi tiết và đọc toàn bộ sách tại:
${currentUrl}`;

  // Kích hoạt bảng chia sẻ mặc định của thiết bị người dùng
  const handleDeviceShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `"${intro.keyVerse}"\n\nSứ điệp: ${intro.coreMessage}\n\nĐọc toàn văn sách ${book.name} tại:`,
          url: currentUrl
        });
      } catch {
        // Người dùng hủy chia sẻ
      }
    } else {
      // Fallback sao chép liên kết trên thiết bị không hỗ trợ Web Share API
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch {
        // noop
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // noop
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100005,
        backgroundColor: 'rgba(5, 3, 2, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          maxHeight: '92vh',
          backgroundColor: '#120E0A',
          borderRadius: '20px',
          border: '1.5px solid rgba(212, 175, 55, 0.45)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85), 0 0 35px rgba(212, 175, 55, 0.15)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, rgba(28, 21, 14, 0.98) 0%, rgba(18, 14, 10, 0.98) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Church size={16} color="#D4AF37" />
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#FDE68A', letterSpacing: '0.3px' }}>
                THẺ LỜI CHÚA NGHỆ THUẬT THÁNH
              </div>
              <div style={{ fontSize: '0.66rem', color: '#CBD5E1', opacity: 0.9 }}>
                Giáo Xứ Chánh Tòa Mỹ Tho
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: '#FDE68A',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s ease'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* THẺ LỜI CHÚA SẮC NÉT (CLICK VÀO ĐỂ CHUYỂN TRANG WEB) */}
        <div style={{ padding: '16px' }}>
          <Link
            href={`/kinh-thanh/${book.id}`}
            onClick={onClose}
            style={{
              textDecoration: 'none',
              display: 'block',
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'linear-gradient(165deg, #1F1810 0%, #140F0A 50%, #0D0A07 100%)',
              color: '#FFFFFF',
              border: '1.5px solid #D4AF37',
              boxShadow: '0 12px 35px rgba(0,0,0,0.6), inset 0 0 15px rgba(212, 175, 55, 0.15)',
              position: 'relative',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            {/* Hoa văn góc hoàng gia ⚜ */}
            <div style={{ position: 'absolute', top: '6px', left: '8px', color: '#D4AF37', fontSize: '11px', opacity: 0.85, zIndex: 10 }}>⚜</div>
            <div style={{ position: 'absolute', top: '6px', right: '8px', color: '#D4AF37', fontSize: '11px', opacity: 0.85, zIndex: 10 }}>⚜</div>
            <div style={{ position: 'absolute', bottom: '6px', left: '8px', color: '#D4AF37', fontSize: '11px', opacity: 0.85, zIndex: 10 }}>⚜</div>
            <div style={{ position: 'absolute', bottom: '6px', right: '8px', color: '#D4AF37', fontSize: '11px', opacity: 0.85, zIndex: 10 }}>⚜</div>

            {/* Thẻ Header */}
            <div
              style={{
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
                background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.03) 100%)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Church size={12} color="#D4AF37" />
                <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.4px', color: '#FDE68A' }}>
                  XỨ ĐOÀN CÁC THÁNH TỬ ĐẠO
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  color: '#FDE68A',
                  border: '1px solid rgba(212, 175, 55, 0.35)'
                }}
              >
                {book.groupLabel}
              </span>
            </div>

            {/* Tranh Nghệ Thuật Thánh */}
            <div
              style={{
                width: '100%',
                position: 'relative',
                aspectRatio: '16 / 10',
                overflow: 'hidden',
                backgroundColor: '#0F0C08'
              }}
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(13, 10, 7, 0.95) 0%, rgba(13, 10, 7, 0.15) 45%, rgba(212, 175, 55, 0.1) 100%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '12px',
                  right: '12px'
                }}
              >
                <div style={{ fontSize: '0.94rem', fontWeight: 900, color: '#FFFFFF', textShadow: '0 2px 5px rgba(0,0,0,0.9)' }}>
                  {artwork.title}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#FDE68A', opacity: 0.95, marginTop: '1px' }}>
                  Họa sĩ {artwork.artist} {artwork.year ? `• ${artwork.year}` : ''}
                </div>
              </div>
            </div>

            {/* Trích Dẫn Lời Chúa & Sứ Điệp */}
            <div style={{ padding: '12px 14px', background: 'radial-gradient(ellipse at top, rgba(35, 27, 18, 0.5) 0%, rgba(13, 10, 7, 0.95) 100%)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '8px'
                }}
              >
                <span
                  style={{
                    backgroundColor: '#B71C1C',
                    color: '#FFF',
                    fontWeight: 900,
                    fontSize: '0.7rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {book.code}
                </span>
                <span style={{ fontSize: '0.96rem', fontWeight: 900, color: '#FFFFFF' }}>
                  {book.name}
                </span>
              </div>

              {/* Câu Kinh Thánh */}
              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderLeft: '3.5px solid #D4AF37',
                  marginBottom: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.66rem', fontWeight: 800, color: '#FDE68A', marginBottom: '2px' }}>
                  <Quote size={10} /> CÂU KINH THÁNH TÂM ĐẮC
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.82rem',
                    lineHeight: 1.45,
                    fontStyle: 'italic',
                    color: '#FFFDF7',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  &ldquo;{intro.keyVerse}&rdquo;
                </p>
              </div>

              {/* Sứ Điệp */}
              <p style={{ margin: '0 0 10px', fontSize: '0.74rem', color: '#E2E8F0', lineHeight: 1.4 }}>
                {intro.coreMessage}
              </p>

              {/* Click to Open Website indicator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#FDE68A',
                  opacity: 0.9,
                  borderTop: '1px dashed rgba(212, 175, 55, 0.25)',
                  paddingTop: '8px'
                }}
              >
                <ExternalLink size={12} />
                <span>Nhấn để đọc toàn văn sách trên website</span>
              </div>
            </div>
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* NÚT CHIA SẺ THIẾT BỊ DUY NHẤT & TIỆN ÍCH */}
        {/* ========================================================================= */}
        <div
          style={{
            padding: '14px 18px',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            backgroundColor: '#0E0B08',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {/* Nút Chia Sẻ Mặc Định Của Thiết Bị */}
          <button
            type="button"
            onClick={handleDeviceShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1.5px solid #F59E0B',
              background: 'linear-gradient(135deg, #B45309 0%, #D97706 50%, #B45309 100%)',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: '0.92rem',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(217, 119, 6, 0.45)',
              transition: 'transform 0.15s ease'
            }}
          >
            <Share2 size={18} />
            <span>Chia Sẻ Lời Chúa</span>
          </button>

          {/* Nút Sao Chép Văn Bản & Liên Kết */}
          <button
            type="button"
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: '100%',
              padding: '9px',
              borderRadius: '10px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              color: copied ? '#34D399' : '#FDE68A',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>{copied ? 'Đã sao chép nội dung & liên kết!' : 'Sao chép nội dung & liên kết Thẻ'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
