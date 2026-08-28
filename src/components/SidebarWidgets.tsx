'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Calendar as CalendarIcon,
  Quote,
  Loader2,
  X
} from 'lucide-react';
import { ALL_DIOCESES, DIOCESE_WEBSITES } from '@/lib/dioceses';
import { getScrapedLiturgicalDay, LiturgicalDayDetail } from '@/lib/liturgicalData';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface DailyGospelData {
  date: string;
  feast: string;
  rank: string;
  color: string;
  colorHex: string;
  readings: string;
  gospelRef: string;
  gospelQuote: string;
  gospelExcerpt: string;
  sourceUrl: string;
}

const ALL_WEBSITES = [
  { name: 'TNTT Giáo Phận Mỹ Tho', url: 'https://tnttgioitremytho.com/' },
  { name: 'Tổng Liên Đoàn TNTT VN (Anrê Phú Yên)', url: 'https://tntt.vn/' },
  { name: 'Hội Đồng Giám Mục Việt Nam', url: 'https://hdgmvietnam.com' },
  { name: 'Vatican News (Tiếng Việt)', url: 'https://www.vaticannews.va/vi.html' },
  { name: 'Giáo phận Mỹ Tho', url: 'https://giaophanmytho.net' },
  { name: 'Tổng Giáo phận Hà Nội', url: 'https://tonggiaophanhanoi.org' },
  { name: 'Tổng Giáo phận Huế', url: 'https://tonggiaophanhue.org' },
  { name: 'Tổng Giáo phận Sài Gòn', url: 'https://tgpsaigon.net' },
  { name: 'Giáo phận Ban Mê Thuột', url: 'https://gpbanmethuot.net' },
  { name: 'Giáo phận Bà Rịa', url: 'https://giaophanbaria.org' },
  { name: 'Giáo phận Bùi Chu', url: 'https://gpbuichu.org' },
  { name: 'Giáo phận Bắc Ninh', url: 'https://giaophanbacninh.org' },
  { name: 'Giáo phận Cần Thơ', url: 'https://giaophancantho.org' },
  { name: 'Giáo phận Đà Lạt', url: 'https://giaophandalat.net' },
  { name: 'Giáo phận Đà Nẵng', url: 'https://giaophandanang.org' },
  { name: 'Giáo phận Hà Tĩnh', url: 'https://giaophanhatinh.com' },
  { name: 'Giáo phận Hải Phòng', url: 'https://gphaiphong.org' },
  { name: 'Giáo phận Hưng Hoá', url: 'https://giaophanhunghoa.org' },
  { name: 'Giáo phận Kon Tum', url: 'https://giaophankontum.com' },
  { name: 'Giáo phận Lạng Sơn và Cao Bằng', url: 'https://giaophanlangson.net' },
  { name: 'Giáo phận Long Xuyên', url: 'https://giaophanlongxuyen.org' },
  { name: 'Giáo phận Nha Trang', url: 'https://giaophannhatrang.org' },
  { name: 'Giáo phận Phan Thiết', url: 'https://gpphanthiet.com' },
  { name: 'Giáo phận Phát Diệm', url: 'https://phatdiem.org' },
  { name: 'Giáo phận Phú Cường', url: 'https://giaophanphucuong.org' },
  { name: 'Giáo phận Quy Nhơn', url: 'https://gpquinhon.org' },
  { name: 'Giáo phận Thái Bình', url: 'https://giaophanthaibinh.net' },
  { name: 'Giáo phận Thanh Hoá', url: 'https://giaophanthanhhoa.net' },
  { name: 'Giáo phận Vinh', url: 'https://giaophanvinh.org' },
  { name: 'Giáo phận Vĩnh Long', url: 'https://giaophanvinhlong.net' },
  { name: 'Giáo phận Xuân Lộc', url: 'https://giaophanxuanloc.net' }
];

const MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
  'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
  'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

const DAY_LABELS = [
  { short: 'MO', full: 'Thứ Hai' },
  { short: 'TU', full: 'Thứ Ba' },
  { short: 'WE', full: 'Thứ Tư' },
  { short: 'TH', full: 'Thứ Năm' },
  { short: 'FR', full: 'Thứ Sáu' },
  { short: 'SA', full: 'Thứ Bảy', isWeekend: true },
  { short: 'SU', full: 'Chúa Nhật', isWeekend: true }
];

export default function SidebarWidgets({ verseText }: { verseText?: string }) {
  const { t, lang } = useLanguage();
  const [currentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [gospelData, setGospelData] = useState<DailyGospelData | null>(null);
  const [loadingGospel, setLoadingGospel] = useState(false);
  const [showGospelModal, setShowGospelModal] = useState(false);

  // Month & Year state for calendar navigation
  const [viewYear, setViewYear] = useState(() => currentDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => currentDate.getMonth()); // 0-indexed

  // Fetch Gospel Data from dynamic permanent API (/api/loi-chua-hom-nay)
  useEffect(() => {
    let isCancelled = false;
    setLoadingGospel(true);

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateParam = `${year}-${month}-${day}`;

    fetch(`/api/loi-chua-hom-nay?date=${dateParam}`)
      .then(res => res.json())
      .then(data => {
        if (!isCancelled) {
          setGospelData(data);
        }
      })
      .catch(err => {
        console.error('Error fetching daily gospel:', err);
      })
      .finally(() => {
        if (!isCancelled) setLoadingGospel(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedDate]);

  // Compute calendar grid days (Monday-based start)
  const calendarGrid = useMemo(() => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    const lastDayOfMonth = new Date(viewYear, viewMonth + 1, 0);

    // Monday = 0, Tuesday = 1 ... Sunday = 6
    let startingDay = firstDayOfMonth.getDay() - 1;
    if (startingDay < 0) startingDay = 6;

    const days = [];

    // Previous month overflow days
    const prevMonthLastDay = new Date(viewYear, viewMonth, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        date: new Date(viewYear, viewMonth - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
        isWeekend: false
      });
    }

    // Current month days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const d = new Date(viewYear, viewMonth, i);
      const dayOfWeek = d.getDay(); // 0 = Sun, 6 = Sat
      days.push({
        day: i,
        date: d,
        isCurrentMonth: true,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6
      });
    }

    // Next month overflow days to complete grid (42 cells = 6 rows)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        date: new Date(viewYear, viewMonth + 1, i),
        isCurrentMonth: false,
        isWeekend: false
      });
    }

    return days;
  }, [viewYear, viewMonth]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const isToday = (d: Date) => {
    const today = new Date();
    return d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();
  };

  const isSelected = (d: Date) => {
    return d.getDate() === selectedDate.getDate() &&
      d.getMonth() === selectedDate.getMonth() &&
      d.getFullYear() === selectedDate.getFullYear();
  };

  const rankBadgeStyle = (rank: string) => {
    const r = (rank || '').toLowerCase();
    if (r.includes('trọng')) {
      return { bg: 'rgba(220, 38, 38, 0.1)', text: '#DC2626', border: '1px solid rgba(220, 38, 38, 0.25)' };
    }
    if (r.includes('kính')) {
      return { bg: 'rgba(217, 119, 6, 0.1)', text: '#D97706', border: '1px solid rgba(217, 119, 6, 0.25)' };
    }
    if (r.includes('nhớ')) {
      return { bg: 'rgba(37, 99, 235, 0.1)', text: '#2563EB', border: '1px solid rgba(37, 99, 235, 0.25)' };
    }
    return { bg: 'var(--color-btn-subtle-bg)', text: 'var(--color-subtle)', border: '1px solid var(--color-border-subtle)' };
  };

  const badge = rankBadgeStyle(gospelData?.rank || '');

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ========================================================= */}
      {/* 1. LỜI CHÚA HÔM NAY (ĐỒNG BỘ THEO NGÀY ĐƯỢC CHỌN QUA API) */}
      {/* ========================================================= */}
      <section style={{
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: '10px',
        padding: '18px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '10px', marginBottom: '12px' }}>
          <h2 style={{
            margin: 0,
            fontSize: '1.05rem',
            fontWeight: 800,
            color: 'var(--color-red)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            {isToday(selectedDate) ? (t.gospelTodayTitle || 'Lời Chúa Hôm Nay') : `${t.gospelTodayPrefix || 'Lời Chúa'} ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}`}
          </h2>

          {loadingGospel && (
            <Loader2 size={15} className="spin" style={{ color: 'var(--color-red)' }} />
          )}
        </div>

        {gospelData ? (
          <div>
            {/* Câu Tin Mừng / Trích dẫn */}
            <p style={{
              margin: '0 0 10px',
              fontSize: '0.92rem',
              lineHeight: 1.65,
              fontStyle: 'italic',
              color: 'var(--color-dark)'
            }}>
              {gospelData.gospelQuote.startsWith('“') ? gospelData.gospelQuote : `“${gospelData.gospelQuote}”`}
              {gospelData.gospelRef && !gospelData.gospelQuote.includes(gospelData.gospelRef) && (
                <span style={{ fontStyle: 'normal', fontWeight: 700, color: 'var(--color-red)', marginLeft: '6px' }}>
                  ({gospelData.gospelRef})
                </span>
              )}
            </p>

            {/* Nút Xem Chi Tiết Tin Mừng */}
            {gospelData.gospelExcerpt && (
              <button
                onClick={() => setShowGospelModal(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-red)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: '4px 0',
                  textDecoration: 'underline'
                }}
              >
                <BookOpen size={14} />
                <span>{t.gospelReadFull || 'Đọc bài Tin Mừng & Suy Niệm'}</span>
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '4px 0' }}>
            <div className="skeleton" style={{ width: '100%', height: '16px' }} />
            <div className="skeleton" style={{ width: '85%', height: '16px' }} />
            <div className="skeleton" style={{ width: '60%', height: '14px', marginTop: '4px' }} />
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 2. LỊCH PHỤNG VỤ CHI TIẾT (TÍNH TOÁN VĨNH VIỄN KHÔNG RESET) */}
      {/* ========================================================= */}
      <section style={{
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: '10px',
        padding: '18px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        {/* Header Title */}
        <h2 style={{
          margin: '0 0 16px',
          fontSize: '1.08rem',
          fontWeight: 800,
          color: 'var(--color-red)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: '10px'
        }}>
          {t.liturgicalCalendarTitle || 'LỊCH PHỤNG VỤ'}
        </h2>

        {/* Month Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          padding: '0 8px'
        }}>
          <button
            onClick={handlePrevMonth}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-dark)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <div style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--color-dark)' }}>
            {MONTH_NAMES[viewMonth]} {viewYear}
          </div>

          <button
            onClick={handleNextMonth}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-dark)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Days of Week Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
          marginBottom: '10px'
        }}>
          {DAY_LABELS.map((d, i) => (
            <div
              key={i}
              style={{
                fontSize: '0.76rem',
                fontWeight: 800,
                color: d.isWeekend ? 'var(--color-red)' : 'var(--color-dark)',
                borderBottom: '1px dotted var(--color-border-subtle)',
                paddingBottom: '4px',
                margin: '0 4px'
              }}
            >
              {d.short}
            </div>
          ))}
        </div>

        {/* Calendar Grid Numbers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px 2px',
          textAlign: 'center'
        }}>
          {calendarGrid.map((item, idx) => {
            const selected = isSelected(item.date);
            const today = isToday(item.date);

            // Weekend dates in theme red
            const isRed = item.isWeekend && item.isCurrentMonth && !selected;
            const isMuted = !item.isCurrentMonth;

            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(item.date)}
                style={{
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: selected
                    ? 'linear-gradient(135deg, #d32f2f, #b71c1c)'
                    : today && !selected
                    ? 'rgba(211, 47, 47, 0.08)'
                    : 'transparent',
                  color: selected
                    ? '#FFFFFF'
                    : isRed
                    ? 'var(--color-red)'
                    : isMuted
                    ? 'var(--color-subtle)'
                    : 'var(--color-dark)',
                  fontSize: '0.92rem',
                  fontWeight: selected ? 800 : item.isCurrentMonth ? 600 : 400,
                  borderRadius: '6px',
                  border: today && !selected ? '1px dashed var(--color-red)' : 'none',
                  boxShadow: selected ? '0 2px 8px rgba(211, 47, 47, 0.35)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  opacity: isMuted ? 0.45 : 1
                }}
              >
                {item.day}
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* PHẦN HIỂN THỊ CHI TIẾT: HÔM NAY LỄ GÌ (ĐỒNG BỘ QUA API VĨNH VIỄN) */}
        {/* ================================================================= */}
        <div style={{
          marginTop: '16px',
          paddingTop: '14px',
          borderTop: '1px solid var(--color-border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/* Header Ngày đang xem */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: 'var(--color-subtle)'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <CalendarIcon size={13} />
              {selectedDate.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}
            </span>
            {gospelData?.rank && (
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '12px',
                backgroundColor: badge.bg,
                color: badge.text,
                border: badge.border
              }}>
                {gospelData.rank}
              </span>
            )}
          </div>

          {/* Tên Thánh Lễ / Lễ Kính trong ngày */}
          <div style={{
            fontSize: '0.96rem',
            fontWeight: 800,
            color: 'var(--color-red)',
            lineHeight: 1.45
          }}>
            {gospelData?.feast || 'Đang tra cứu lịch...'}
          </div>

          {/* Màu Áo Lễ Linh Mục */}
          {gospelData && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              color: 'var(--color-dark)'
            }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: gospelData.colorHex,
                display: 'inline-block',
                flexShrink: 0
              }} />
              <span>
                {t.priestVestmentColor || 'Áo Lễ Linh Mục'}: <strong>{gospelData.color}</strong>
              </span>
            </div>
          )}

          {/* Các Bài Đọc & Tin Mừng */}
          {gospelData?.readings && (
            <div style={{
              backgroundColor: 'var(--color-btn-subtle-bg)',
              padding: '8px 10px',
              borderRadius: '6px',
              border: '1px solid var(--color-border-subtle)',
              marginTop: '4px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.76rem',
                fontWeight: 700,
                color: 'var(--color-subtle)',
                textTransform: 'uppercase',
                marginBottom: '3px'
              }}>
                <BookOpen size={13} />
                <span>{t.readingsGospelTitle || 'Bài Đọc & Tin Mừng'}</span>
              </div>
              <div style={{
                fontSize: '0.86rem',
                fontWeight: 700,
                color: 'var(--color-dark)',
                lineHeight: 1.4
              }}>
                {gospelData.readings}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. LIÊN KẾT WEBSITE 27 GIÁO PHẬN & TÒA THÁNH */}
      {/* ========================================================= */}
      <section style={{
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: '10px',
        padding: '18px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <h2 style={{
          margin: '0 0 12px',
          fontSize: '1.08rem',
          fontWeight: 800,
          color: 'var(--color-red)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: '10px'
        }}>
          {t.websiteLinksTitle || 'LIÊN KẾT WEBSITE'}
        </h2>

        <div style={{
          maxHeight: '340px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          paddingRight: '6px'
        }}>
          {ALL_WEBSITES.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid var(--color-border-subtle)',
                textDecoration: 'none',
                color: 'var(--color-dark)',
                fontSize: '0.92rem',
                fontWeight: 700,
                transition: 'color 0.15s ease, padding-left 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-red)';
                e.currentTarget.style.paddingLeft = '4px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-dark)';
                e.currentTarget.style.paddingLeft = '0px';
              }}
            >
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* MODAL / POPUP XEM TOÀN VĂN TIN MỪNG & SUY NIỆM HÔM NAY */}
      {/* ========================================================= */}
      {showGospelModal && gospelData && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(5px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '14px',
            width: '100%',
            maxWidth: '640px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: '1px solid var(--color-border-subtle)',
            position: 'relative'
          }}>
            {/* Close button */}
            <button
              onClick={() => setShowGospelModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'var(--color-btn-subtle-bg)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-dark)'
              }}
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div style={{ marginBottom: '16px', paddingRight: '36px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-subtle)', fontWeight: 600 }}>
                {gospelData.date} • {gospelData.rank}
              </div>
              <h3 style={{ margin: '4px 0 0', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-red)' }}>
                {gospelData.feast}
              </h3>
            </div>

            {/* Gospel Details Box */}
            <div style={{
              backgroundColor: 'var(--color-btn-subtle-bg)',
              padding: '12px 14px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '0.86rem'
            }}>
              <div><strong>Các Bài Đọc:</strong> {gospelData.readings || 'Theo Lịch Phụng Vụ'}</div>
              <div><strong>Áo Lễ:</strong> Màu {gospelData.color}</div>
            </div>

            {/* Full Gospel Text */}
            <div style={{
              fontSize: '0.94rem',
              lineHeight: 1.75,
              color: 'var(--color-dark)',
              textAlign: 'justify'
            }}>
              <h4 style={{ margin: '0 0 10px', color: 'var(--color-red)', fontSize: '1rem', fontWeight: 800 }}>
                Tin Mừng: {gospelData.gospelRef}
              </h4>
              <p style={{ whiteSpace: 'pre-line', margin: 0 }}>
                {gospelData.gospelExcerpt}
              </p>
            </div>
          </div>
        </div>
      )}

    </aside>
  );
}
