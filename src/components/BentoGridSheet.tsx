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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark)' }}>
              Khám Phá & Tiện Ích
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.74rem', color: 'var(--color-subtle)' }}>
              Các tính năng và chuyên mục mở rộng của xứ đoàn
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
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
            <X size={16} />
          </button>
        </div>

        {/* Bento Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {BENTO_EXTENDED_ITEMS.map((item) => {
            const IconComp = item.icon;
            const title = item.titleKey && (t as any)[item.titleKey] ? (t as any)[item.titleKey] : item.defaultTitle;
            const desc = item.descKey && (t as any)[item.descKey] ? (t as any)[item.descKey] : item.defaultDesc;

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  style={{
                    gridColumn: item.isFullWidth ? 'span 2' : 'span 1',
                    display: 'flex',
                    flexDirection: item.isFullWidth ? 'row' : 'column',
                    alignItems: item.isFullWidth ? 'center' : 'flex-start',
                    justifyContent: 'space-between',
                    padding: item.isFullWidth ? '14px 16px' : '12px 14px',
                    borderRadius: item.isFullWidth ? '16px' : '14px',
                    background: item.isFullWidth
                      ? 'linear-gradient(135deg, rgba(183, 28, 28, 0.08) 0%, rgba(220, 38, 38, 0.03) 100%)'
                      : 'var(--color-input-bg)',
                    border: item.isFullWidth ? '1px solid rgba(220, 38, 38, 0.2)' : '1px solid var(--color-border-subtle)',
                    textDecoration: 'none',
                    minHeight: item.isFullWidth ? 'auto' : '94px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: item.isFullWidth ? '42px' : '34px',
                        height: item.isFullWidth ? '42px' : '34px',
                        borderRadius: item.isFullWidth ? '12px' : '10px',
                        backgroundColor: item.isFullWidth ? item.color : item.bgLight,
                        color: item.isFullWidth ? '#FFFFFF' : item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: item.isFullWidth ? `0 4px 12px ${item.color}40` : 'none',
                        marginBottom: item.isFullWidth ? 0 : '8px'
                      }}
                    >
                      <IconComp size={item.isFullWidth ? 22 : 18} />
                    </div>
                    <div>
                      <div style={{ fontSize: item.isFullWidth ? '0.92rem' : '0.84rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                        {title}
                      </div>
                      <div style={{ fontSize: item.isFullWidth ? '0.72rem' : '0.68rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                        {desc}
                      </div>
                    </div>
                  </div>
                  {item.isFullWidth && <ChevronRight size={18} color="var(--color-red)" />}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleAction(item)}
                style={{
                  gridColumn: item.isFullWidth ? 'span 2' : 'span 1',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-input-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  minHeight: '94px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    backgroundColor: item.bgLight,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px'
                  }}
                >
                  <IconComp size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                    {title}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--color-subtle)', marginTop: '1px' }}>
                    {desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
