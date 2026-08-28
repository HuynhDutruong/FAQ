'use client';
import { useEffect, useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Calendar,
  Search,
  Loader2,
  Church,
  Edit3,
  PlusCircle,
  Share2,
  Navigation,
  Check
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MassTime, Bucket, getFacets, getByDiocese, removeAccents } from '@/lib/massTimes';
import { ALL_DIOCESES, dioceseLabel } from '@/lib/dioceses';
import MassTimeFeedbackModal from '@/components/MassTimeFeedbackModal';

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  fontSize: '0.95rem',
  color: 'var(--color-dark)',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  transition: 'all 0.2s ease'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: 700,
  fontSize: '0.82rem',
  color: 'var(--color-dark)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const DAY_ORDER = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chúa Nhật'];

function TimeChips({ times, color, bg }: { times: string[]; color: string; bg: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {times.map(t => (
        <span key={t} style={{
          background: bg, color, padding: '4px 9px', borderRadius: '999px',
          fontSize: '0.82rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums'
        }}>{t}</span>
      ))}
    </div>
  );
}

// Tính khoảng cách giữa 2 toạ độ GPS theo công thức Haversine (km)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Bán kính Trái Đất (km)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function MassTimesPage() {
  const { t } = useLanguage();
  const [dioceseBuckets, setDioceseBuckets] = useState<Bucket[]>([]);
  const [selectedDiocese, setSelectedDiocese] = useState('');
  const [selectedDeanery, setSelectedDeanery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState<MassTime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Time filter: 'all' | 'sunday' | 'morning' | 'evening'
  const [timeFilter, setTimeFilter] = useState<'all' | 'sunday' | 'morning' | 'evening'>('all');

  // GPS Nearest state
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);

  // Toast message
  const [toast, setToast] = useState<string | null>(null);

  // Feedback modal state
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackTarget, setFeedbackTarget] = useState<MassTime | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  }, []);

  useEffect(() => {
    let ignore = false;
    getFacets()
      .then(f => {
        if (!ignore) setDioceseBuckets(f.dioceses);
      })
      .catch(e => {
        if (!ignore) setError(e.message);
      });
    return () => {
      ignore = true;
    };
  }, []);

  // Xếp theo đúng thứ tự 27 giáo phận chính thức
  const dioceses = useMemo(() => {
    const counts = new Map(dioceseBuckets.map(b => [b.name, b.count]));
    return ALL_DIOCESES
      .map(d => ({ value: d, label: dioceseLabel(d), count: counts.get(d) ?? 0 }))
      .filter(d => d.count > 0);
  }, [dioceseBuckets]);

  const totalChurches = useMemo(
    () => dioceseBuckets.reduce((acc, b) => acc + (b.count || 0), 0),
    [dioceseBuckets]
  );

  const handleSelectDiocese = (val: string) => {
    setSelectedDiocese(val);
    setSelectedDeanery('');
    if (!val) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    getByDiocese(val)
      .then(setRows)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  const deaneries = useMemo(
    () => Array.from(new Set(rows.map(r => r.deanery).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'vi')),
    [rows]
  );

  // Lọc theo từ khoá, giáo hạt, khung giờ và khoảng cách GPS
  const filtered = useMemo(() => {
    const q = removeAccents(searchTerm.trim());
    let list = rows.filter(r => {
      if (selectedDeanery && r.deanery !== selectedDeanery) return false;
      if (q && !removeAccents(r.parish).includes(q) && !removeAccents(r.address).includes(q)) return false;

      // Filter by time of day
      if (timeFilter === 'sunday') {
        if (!r.sundayMass || r.sundayMass.length === 0) return false;
      } else if (timeFilter === 'morning') {
        const allTimes = [...(r.weekdayMass || []), ...(r.sundayMass || [])];
        const hasEarly = allTimes.some(time => {
          const hour = parseInt(time.split(':')[0], 10);
          return hour >= 4 && hour <= 8;
        });
        if (!hasEarly) return false;
      } else if (timeFilter === 'evening') {
        const allTimes = [...(r.weekdayMass || []), ...(r.sundayMass || []), ...(r.saturdayMass || [])];
        const hasEve = allTimes.some(time => {
          const hour = parseInt(time.split(':')[0], 10);
          return hour >= 16 && hour <= 21;
        });
        if (!hasEve) return false;
      }

      return true;
    });

    // Nếu người dùng đã cấp quyền định vị, tính khoảng cách và sắp xếp gần nhất lên đầu
    if (userLocation) {
      list = list.map(item => {
        if (item.lat && item.lng) {
          const dist = calculateDistance(userLocation.lat, userLocation.lng, item.lat, item.lng);
          return { ...item, _distance: dist };
        }
        return { ...item, _distance: Infinity };
      }).sort((a, b) => (a._distance ?? Infinity) - (b._distance ?? Infinity));
    }

    return list;
  }, [rows, selectedDeanery, searchTerm, timeFilter, userLocation]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Trình duyệt của bạn không hỗ trợ định vị GPS.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setLocating(false);
        showToast('📍 Đã định vị thành công! Đang xếp nhà thờ gần nhất lên đầu.');
      },
      (err) => {
        console.error(err);
        setLocating(false);
        alert('Không thể lấy vị trí GPS. Vui lòng kiểm tra quyền truy cập vị trí trên trình duyệt.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleShare = async (item: MassTime) => {
    const text = `⛪ ${item.parish} - ${item.diocese ? dioceseLabel(item.diocese) : ''}
📍 Địa chỉ: ${item.address || 'Đang cập nhật'}
⏰ Giờ lễ Chúa Nhật: ${item.sundayMass?.join(', ') || 'Chưa có thông tin'}
⏰ Ngày thường: ${item.weekdayMass?.join(', ') || 'Chưa có thông tin'}

Tra cứu thêm giờ lễ 3.300+ nhà thờ toàn quốc tại:
${window.location.origin}/gio-le`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Giờ Lễ ${item.parish}`,
          text: text,
          url: `${window.location.origin}/gio-le`
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      showToast(' Đã sao chép thông tin giờ lễ vào bộ nhớ tạm!');
    } catch {
      showToast('Không thể sao chép tự động.');
    }
  };

  const handleOpenAdd = () => {
    setFeedbackTarget(null);
    setFeedbackOpen(true);
  };

  const handleOpenEdit = (item: MassTime) => {
    setFeedbackTarget(item);
    setFeedbackOpen(true);
  };

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Toast Notification Banner */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 99999,
            backgroundColor: 'rgba(17, 24, 39, 0.92)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '0.9rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <Check size={16} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <header className="liquid-glass" style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none',
        padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" aria-label={t.backToHome} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.05)', color: 'var(--color-dark)', flexShrink: 0
          }}>
            <ArrowLeft size={20} />
          </Link>

          <div style={{ position: 'relative', width: '36px', height: '36px', mixBlendMode: 'multiply', flexShrink: 0 }}>
            <Image src="/logo.jpg" alt="Logo" fill sizes="36px" style={{ objectFit: 'contain' }} />
          </div>

          <div>
            <h1 style={{
              fontSize: 'clamp(0.95rem, 3.5vw, 1.3rem)', fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '0.5px', color: 'var(--color-red)', lineHeight: 1.2
            }}>
              {t.massTimesTitle}
            </h1>
            <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600 }}>
              {totalChurches > 0 ? `${totalChurches.toLocaleString('vi-VN')} Nhà Thờ • 27 Giáo Phận` : 'Toàn Quốc'}
            </span>
          </div>
        </div>

        {/* Nút Đóng góp giáo xứ mới */}
        <button
          onClick={handleOpenAdd}
          style={{
            padding: '8px 14px',
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            color: 'var(--color-red)',
            border: '1px solid rgba(211, 47, 47, 0.25)',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            flexShrink: 0,
            transition: 'all 0.2s'
          }}
        >
          <PlusCircle size={16} />
          <span style={{ display: 'inline' }}>{t.btnContributeParish}</span>
        </button>
      </header>

      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '20px 16px 48px' }}>

        {/* Filter Box */}
        <div className="liquid-glass" style={{
          padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '16px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="diocese" style={labelStyle}>{t.filterDiocese}</label>
              <select id="diocese" value={selectedDiocese}
                onChange={e => handleSelectDiocese(e.target.value)} style={fieldStyle}>
                <option value="">{t.allDioceses}</option>
                {dioceses.map(d => (
                  <option key={d.value} value={d.value}>{d.label} ({d.count})</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="deanery" style={labelStyle}>{t.filterDeanery}</label>
              <select id="deanery" value={selectedDeanery} onChange={e => setSelectedDeanery(e.target.value)}
                disabled={!deaneries.length}
                style={{ ...fieldStyle, opacity: deaneries.length ? 1 : 0.5, cursor: deaneries.length ? 'pointer' : 'not-allowed' }}>
                <option value="">{t.allDeaneries}</option>
                {deaneries.map(d => <option key={d} value={d}>Hạt {d}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="q" style={labelStyle}>{t.filterSearch}</label>
              <div style={{ position: 'relative' }}>
                <Search size={18} color="var(--color-dark)" style={{
                  position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4
                }} />
                <input id="q" type="text" placeholder={t.filterSearchPlaceholder} value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)} disabled={!selectedDiocese}
                  style={{ ...fieldStyle, padding: '12px 16px 12px 46px', opacity: selectedDiocese ? 1 : 0.5 }} />
              </div>
            </div>
          </div>

          {/* Quick Filters Bar & GPS Nearby Action */}
          {selectedDiocese && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(0,0,0,0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', marginRight: '4px' }}>
                  Lọc giờ:
                </span>
                {(
                  [
                    { id: 'all', label: 'Tất cả' },
                    { id: 'sunday', label: 'Lễ Chúa Nhật' },
                    { id: 'morning', label: 'Lễ Sáng' },
                    { id: 'evening', label: 'Lễ Chiều Tối' }
                  ] as const
                ).map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setTimeFilter(chip.id)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      border: 'none',
                      backgroundColor: timeFilter === chip.id ? 'var(--color-red)' : 'rgba(0,0,0,0.06)',
                      color: timeFilter === chip.id ? 'white' : '#4B5563',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* GPS Button */}
              <button
                onClick={handleGetLocation}
                disabled={locating}
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  backgroundColor: userLocation ? '#ECFDF5' : 'rgba(0,0,0,0.05)',
                  color: userLocation ? '#065F46' : '#374151',
                  border: userLocation ? '1px solid #A7F3D0' : '1px solid rgba(0,0,0,0.08)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: locating ? 'wait' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {locating ? (
                  <>
                    <Loader2 size={13} className="spin" /> Đang định vị...
                  </>
                ) : (
                  <>
                    <MapPin size={13} color={userLocation ? '#10B981' : '#DC2626'} />
                    {userLocation ? 'Đang lọc gần bạn nhất' : 'Tìm gần vị trí của tôi'}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="liquid-glass" style={{ padding: '20px', color: 'var(--color-red)', fontWeight: 600 }}>
            {error}
          </div>
        )}

        {!error && !selectedDiocese && (
          <div className="liquid-glass" style={{ padding: '48px 24px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(251, 192, 45, 0.2)',
              color: '#B45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Church size={36} />
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '8px' }}>
              Chọn Giáo Phận để tra cứu giờ lễ
            </h2>
            <p style={{ color: 'var(--color-dark)', opacity: 0.7, maxWidth: '460px', margin: '0 auto 20px', lineHeight: 1.5 }}>
              Hệ thống tổng hợp đầy đủ hơn 3.300 giáo xứ thuộc 27 giáo phận trên toàn quốc kèm giờ lễ chi tiết và chỉ đường GPS.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={handleOpenAdd}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'rgba(211, 47, 47, 0.1)',
                  color: 'var(--color-red)',
                  border: '1px solid rgba(211, 47, 47, 0.25)',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <PlusCircle size={16} /> {t.btnContributeParish}
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="liquid-glass" style={{
            padding: '48px 24px', textAlign: 'center', color: 'var(--color-dark)', opacity: 0.6,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
          }}>
            <Loader2 size={22} className="spin" /> {t.loadingMassTimes}
          </div>
        )}

        {!loading && selectedDiocese && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4B5563' }}>
                Hiển thị <strong>{filtered.length}</strong> giáo xứ
              </span>
            </div>

            {filtered.map(item => {
              const distanceNum = (item as MassTime & { _distance?: number })._distance;
              const hasDistance = typeof distanceNum === 'number' && isFinite(distanceNum);
              const mapNavUrl = item.lat && item.lng
                ? `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`
                : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.address || item.parish)}`;

              return (
                <article key={item.id} className="liquid-glass" style={{ padding: '20px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                    <div>
                      <div style={{
                        fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.5px', color: 'var(--color-yellow)', marginBottom: '4px',
                        display: 'flex', alignItems: 'center', gap: '8px'
                      }}>
                        <span>{[item.diocese && dioceseLabel(item.diocese), item.deanery && `Hạt ${item.deanery}`, item.province].filter(Boolean).join(' · ')}</span>
                        {hasDistance && (
                          <span style={{
                            backgroundColor: '#D1FAE5',
                            color: '#065F46',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            fontSize: '0.7rem',
                            fontWeight: 800
                          }}>
                            Cách {distanceNum < 1 ? `${Math.round(distanceNum * 1000)}m` : `${distanceNum.toFixed(1)}km`}
                          </span>
                        )}
                      </div>

                      <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-red)', lineHeight: 1.3 }}>
                        {item.parish}
                      </h2>
                    </div>

                    {/* Action buttons (Share & Report) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => handleShare(item)}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          color: '#374151',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          flexShrink: 0
                        }}
                        title="Chia sẻ giờ lễ"
                      >
                        <Share2 size={13} />
                        <span style={{ display: 'inline' }}>Chia sẻ</span>
                      </button>

                      <button
                        onClick={() => handleOpenEdit(item)}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          color: '#374151',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          flexShrink: 0
                        }}
                        title="Báo sai hoặc cập nhật giờ lễ cho giáo xứ này"
                      >
                        <Edit3 size={13} />
                        <span>{t.btnReportError}</span>
                      </button>
                    </div>
                  </div>

                  {item.address && (
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
                      marginTop: '8px', fontSize: '0.88rem', color: 'var(--color-dark)', opacity: 0.8
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', maxWidth: '75%' }}>
                        <MapPin size={15} style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{item.address}</span>
                      </div>

                      {/* Direction Button */}
                      <a
                        href={mapNavUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '4px 10px',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          color: '#1D4ED8',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          textDecoration: 'none',
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}
                      >
                        <Navigation size={12} /> Chỉ đường
                      </a>
                    </div>
                  )}

                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px',
                    marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(44,44,44,0.08)'
                  }}>
                    {item.byDay ? (
                      <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {DAY_ORDER.filter(d => item.byDay?.[d]?.length).map(d => (
                          <div key={d} style={{
                            display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap'
                          }}>
                            <span style={{
                              ...labelStyle, minWidth: '92px', flexShrink: 0,
                              color: d === 'Chúa Nhật' ? 'var(--color-red)' : 'var(--color-dark)',
                              opacity: d === 'Chúa Nhật' ? 1 : 0.65
                            }}>
                              {t.dayNames[d] ?? d}
                            </span>
                            <TimeChips
                              times={item.byDay![d]}
                              color={d === 'Chúa Nhật' ? 'var(--color-red)' : 'var(--color-dark)'}
                              bg={d === 'Chúa Nhật' ? 'rgba(211,47,47,0.1)' : 'rgba(251,192,45,0.25)'}
                            />
                          </div>
                        ))}
                      </div>
                    ) : <>
                    {item.weekdayMass?.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={14} /> {t.colWeekday}
                        </span>
                        <TimeChips times={item.weekdayMass} color="var(--color-dark)" bg="rgba(251,192,45,0.25)" />
                      </div>
                    )}
                    {(item.saturdayMass?.length ?? 0) > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={14} /> {t.dayNames['Thứ Bảy'] ?? 'Thứ Bảy'}
                        </span>
                        <TimeChips times={item.saturdayMass!} color="var(--color-dark)" bg="rgba(251,192,45,0.25)" />
                      </div>
                    )}
                    {item.sundayMass?.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Calendar size={14} /> {t.colSunday}
                        </span>
                        <TimeChips times={item.sundayMass} color="var(--color-red)" bg="rgba(211,47,47,0.1)" />
                      </div>
                    )}
                    {!item.weekdayMass?.length && !item.saturdayMass?.length && !item.sundayMass?.length && (
                      <div style={{ gridColumn: '1 / -1', fontSize: '0.88rem', color: 'var(--color-dark)', opacity: 0.5 }}>
                        {t.noMassTimes}
                      </div>
                    )}
                    </>}
                  </div>
                </article>
              );
            })}

            {filtered.length === 0 && (
              <div className="liquid-glass" style={{
                padding: '48px 24px', textAlign: 'center', color: 'var(--color-dark)', opacity: 0.8
              }}>
                <p style={{ marginBottom: '14px', fontSize: '1rem', fontWeight: 600 }}>{t.noResults}</p>
                <button
                  onClick={handleOpenAdd}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'var(--color-red)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(211, 47, 47, 0.25)'
                  }}
                >
                  <PlusCircle size={16} /> {t.btnContributeParish}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Đóng góp & Báo sai */}
      <MassTimeFeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        targetParish={feedbackTarget}
        defaultDiocese={selectedDiocese}
      />
    </main>
  );
}
