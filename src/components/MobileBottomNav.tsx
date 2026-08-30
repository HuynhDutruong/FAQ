'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MOBILE_PRIMARY_NAV } from '@/lib/navConfig';
import PostSubmissionModal from '@/components/PostSubmissionModal';
import BentoGridSheet from '@/components/BentoGridSheet';
import Modal from '@/components/Modal';
import RatingWidget from '@/components/RatingWidget';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [bentoOpen, setBentoOpen] = useState(false);
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [ratingsOpen, setRatingsOpen] = useState(false);

  // Không hiển thị trên trang Admin
  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. THANH BOTTOM NAV CHÍNH (TỐI ĐA 5 NÚT: 4 CHÍNH + 1 NÚT THÊM) */}
      {/* ========================================================================= */}
      <nav
        className="mobile-bottom-nav"
        aria-label="Thanh điều hướng chính trên di động"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9990,
          borderTop: '1px solid var(--color-border-subtle)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
          paddingTop: '6px',
          paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 6px)',
          userSelect: 'none'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            alignItems: 'center',
            maxWidth: '540px',
            margin: '0 auto',
            padding: '0 4px'
          }}
        >
          {/* 4 Nút chức năng thường dùng từ navConfig */}
          {MOBILE_PRIMARY_NAV.map((item) => {
            const isActive =
              !bentoOpen &&
              (item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(item.href + '/'));

            const IconComponent = item.icon;
            const label = (t as any)[item.labelKey] || item.defaultLabel;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`mobile-bottom-nav-item ${isActive ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                  padding: '4px 2px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: isActive ? 'var(--color-red)' : 'var(--color-subtle)',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '26px',
                    borderRadius: '13px',
                    backgroundColor: isActive ? 'rgba(211, 47, 47, 0.12)' : 'transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <IconComponent
                    size={18}
                    strokeWidth={isActive ? 2.4 : 1.8}
                    color={isActive ? 'var(--color-red)' : 'currentColor'}
                  />
                </div>

                <span
                  style={{
                    fontSize: '0.66rem',
                    fontWeight: isActive ? 800 : 500,
                    lineHeight: 1.1,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                    color: isActive ? 'var(--color-red)' : 'var(--color-dark)'
                  }}
                >
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Nút Thứ 5: "Thêm" mở Bento Grid */}
          <button
            type="button"
            onClick={() => setBentoOpen(prev => !prev)}
            aria-label="Mở danh mục tiện ích mở rộng"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              padding: '4px 2px',
              borderRadius: '8px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: bentoOpen ? 'var(--color-red)' : 'var(--color-subtle)',
              transition: 'all 0.15s ease',
              position: 'relative'
            }}
          >
            {bentoOpen && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  width: '16px',
                  height: '3px',
                  borderRadius: '99px',
                  backgroundColor: 'var(--color-red)',
                  boxShadow: '0 1px 4px rgba(211, 47, 47, 0.5)'
                }}
              />
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '24px',
                borderRadius: '12px',
                backgroundColor: bentoOpen ? 'rgba(211, 47, 47, 0.12)' : 'transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <LayoutGrid
                size={18}
                strokeWidth={bentoOpen ? 2.4 : 1.8}
                color={bentoOpen ? 'var(--color-red)' : 'currentColor'}
              />
            </div>

            <span
              style={{
                fontSize: '0.66rem',
                fontWeight: bentoOpen ? 800 : 500,
                lineHeight: 1.1,
                textAlign: 'center',
                color: bentoOpen ? 'var(--color-red)' : 'var(--color-dark)'
              }}
            >
              {(t as any).navMore || 'Thêm'}
            </span>
          </button>
        </div>
      </nav>

      {/* 2. Bento Grid Sheet Modal */}
      <BentoGridSheet
        isOpen={bentoOpen}
        onClose={() => setBentoOpen(false)}
        onOpenSubmission={() => setSubmissionOpen(true)}
        onOpenRatings={() => setRatingsOpen(true)}
      />

      {/* 3. Modal đóng góp bài viết cộng tác viên */}
      <PostSubmissionModal
        isOpen={submissionOpen}
        onClose={() => setSubmissionOpen(false)}
      />

      {/* 4. Hộp thoại đánh giá.
             Trước đây nút "Đánh Giá & Lượt Xem" chỉ cuộn tới #footer-ratings —
             mà phần tử đó không tồn tại ở đâu trong mã nguồn, nên bấm vào không
             có gì xảy ra. Nay mở thẳng RatingWidget đã có sẵn đủ luồng chấm sao,
             viết nhận xét và gửi. */}
      {ratingsOpen && (
        <Modal
          isOpen={ratingsOpen}
          onClose={() => setRatingsOpen(false)}
          title="Đánh Giá & Lượt Xem"
        >
          <RatingWidget forceVisible />
        </Modal>
      )}

      <style jsx global>{`
        /* Ẩn hoàn toàn Bottom Nav trên màn hình Tablet & Desktop */
        @media (min-width: 768px) {
          .mobile-bottom-nav {
            display: none !important;
          }
        }
        /* Hiển thị trên Mobile */
        @media (max-width: 767px) {
          .mobile-bottom-nav {
            display: block !important;
          }
          /* Ẩn thanh tab cuộn ngang ở SiteHeader trên mobile để tránh trùng lặp */
          .site-header-nav-bar {
            display: none !important;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0.6;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
