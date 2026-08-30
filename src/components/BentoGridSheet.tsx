'use client';

import React from 'react';
import Link from 'next/link';
import { X, ChevronRight } from 'lucide-react';
import { BENTO_EXTENDED_ITEMS, BentoItemConfig } from '@/lib/navConfig';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface BentoGridSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSubmission: () => void;
}

export default function BentoGridSheet({
  isOpen,
  onClose,
  onOpenSubmission
}: BentoGridSheetProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleAction = (item: BentoItemConfig) => {
    onClose();
    if (item.actionId === 'open-submission') {
      onOpenSubmission();
    } else if (item.actionId === 'open-feedback') {
      const el = document.getElementById('footer-feedback') || document.querySelector('.chat-bubble-btn');
      if (el) {
        if (el instanceof HTMLElement) el.click?.();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.actionId === 'open-ratings') {
      const el = document.getElementById('footer-ratings');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 0,
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: 'var(--color-card-bg)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          borderTop: '1px solid var(--color-border-subtle)',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.25)',
          padding: '16px 16px max(env(safe-area-inset-bottom, 12px), 24px)',
          maxHeight: '85vh',
          overflowY: 'auto',
          animation: 'slideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Grabber */}
        <div style={{ width: '38px', height: '4px', borderRadius: '4px', backgroundColor: 'var(--color-border-subtle)', margin: '0 auto 14px' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-dark)' }}>
            Xem thêm
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-input-bg)',
              border: '1px solid var(--color-border-subtle)',
              color: 'var(--color-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Đóng"
          >
            <X size={22} />
          </button>
        </div>

        {/* Danh sách hàng lớn — mỗi mục một dòng, chữ to, vùng chạm rộng.
            Trước đây dùng lưới 2 cột với hai kiểu thẻ khác nhau và chữ mô tả
            0.74rem: người lớn tuổi khó đọc và khó đoán đâu là nút bấm. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {BENTO_EXTENDED_ITEMS.map((item) => {
            const IconComp = item.icon;
            const title = item.titleKey && (t as any)[item.titleKey] ? (t as any)[item.titleKey] : item.defaultTitle;
            const desc = item.descKey && (t as any)[item.descKey] ? (t as any)[item.descKey] : item.defaultDesc;

            const rowStyle: React.CSSProperties = {
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              width: '100%',
              minHeight: '72px',
              padding: '12px 14px',
              borderRadius: '14px',
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border-subtle)',
              textDecoration: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              font: 'inherit'
            };

            const inner = (
              <>
                <span
                  style={{
                    width: '48px',
                    height: '48px',
                    flexShrink: 0,
                    borderRadius: '14px',
                    backgroundColor: item.bgLight,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconComp size={26} strokeWidth={2} />
                </span>

                <span style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '1.02rem',
                      fontWeight: 800,
                      color: 'var(--color-dark)',
                      lineHeight: 1.3
                    }}
                  >
                    {title}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.86rem',
                      color: 'var(--color-subtle)',
                      lineHeight: 1.45,
                      marginTop: '2px'
                    }}
                  >
                    {desc}
                  </span>
                </span>

                <ChevronRight size={22} color="var(--color-subtle)" style={{ flexShrink: 0 }} />
              </>
            );

            return item.href ? (
              <Link key={item.id} href={item.href} onClick={onClose} style={rowStyle}>
                {inner}
              </Link>
            ) : (
              <button key={item.id} type="button" onClick={() => handleAction(item)} style={rowStyle}>
                {inner}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
