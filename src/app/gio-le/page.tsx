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
  Check,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MassTime, Bucket, getFacets, getByDiocese, removeAccents } from '@/lib/massTimes';
import { ALL_DIOCESES, dioceseLabel } from '@/lib/dioceses';
import MassTimeFeedbackModal from '@/components/MassTimeFeedbackModal';

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '12px',
  border: '1px solid var(--color-input-border)',
  backgroundColor: 'var(--color-input-bg)',
  fontSize: '0.92rem',
  color: 'var(--color-input-text)',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  transition: 'all 0.2s ease',
  appearance: 'none',
  WebkitAppearance: 'none'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 700,
  fontSize: '0.78rem',
  color: 'var(--color-dark)',
  textTransform: 'uppercase',
  letterSpacing: '0.4px',
  opacity: 0.9
};

const DAY_ORDER = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chúa Nhật'];

const POPULAR_DIOCESES = ['Sài Gòn', 'Mỹ Tho', 'Xuân Lộc', 'Hà Nội', 'Đà Lạt', 'Huế', 'Bùi Chu', 'Bắc Ninh'];

function TimeChips({ times, color, bg }: { times: string[]; color: string; bg: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      {times.map(t => (
        <span key={t} style={{
          background: bg, color, padding: '3px 8px', borderRadius: '999px',
          fontSize: '0.8rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums'
        }}>{t}</span>
      ))}
    </div>
  );
}

// Tính khoảng cách GPS theo công thức Haversine (km)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
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

  // 27 giáo phận chính thức
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
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 99999,
            backgroundColor: 'rgba(17, 24, 39, 0.94)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: 'white',
            padding: '9px 18px',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            animation: 'fadeIn 0.2s ease-out',
            maxWidth: '90vw',
            textAlign: 'center'
          }}
        >
          <Check size={16} color="#10B981" style={{ flexShrink: 0 }} />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Mobile-Friendly */}
      <header className="liquid-glass giole-header" style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
          <Link href="/" aria-label={t.backToHome} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'var(--color-btn-subtle-bg)', color: 'var(--color-dark)', flexShrink: 0
          }}>
            <ArrowLeft size={18} />
          </Link>

          <div style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(255, 69, 58, 0.25), 0 0 0 2px rgba(251, 192, 45, 0.6)',
            padding: '2px',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
              <Image src="/logo.jpg" alt="Logo Xứ Đoàn" fill sizes="38px" style={{ objectFit: 'contain' }} priority />
            </div>
          </div>

          <div style={{ minWidth: 0, flex: 1 }}>
            <h1 style={{
              fontSize: 'clamp(0.92rem, 3.8vw, 1.25rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              color: 'var(--color-red)',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {t.massTimesTitle}
            </h1>
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--color-subtle)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {totalChurches > 0 ? `${totalChurches.toLocaleString('vi-VN')} Nhà Thờ • 27 Giáo Phận` : 'Toàn Quốc'}
            </div>
          </div>
        </div>

        {/* Nút Đóng góp giáo xứ */}
        <button
          onClick={handleOpenAdd}
          className="giole-btn-contribute"
          title="Đóng góp hoặc báo sai giáo xứ"
        >
          <PlusCircle size={16} />
          <span className="giole-btn-text">{t.btnContributeParish}</span>
        </button>
      </header>

      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '16px 12px 48px' }}>

        {/* Search & Filter Box */}
        <div className="liquid-glass" style={{
          padding: '16px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '14px',
          borderRadius: '20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            {/* Dropdown Giáo Phận */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="diocese" style={labelStyle}>{t.filterDiocese}</label>
              <div style={{ position: 'relative' }}>
                <select id="diocese" value={selectedDiocese}
                  onChange={e => handleSelectDiocese(e.target.value)} style={{ ...fieldStyle, paddingRight: '36px' }}>
                  <option value="">-- {t.allDioceses} --</option>
                  {dioceses.map(d => (
                    <option key={d.value} value={d.value}>{d.label} ({d.count})</option>
                  ))}
                </select>
                <ChevronDown size={16} style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  pointerEvents: 'none', color: 'var(--color-subtle)'
                }} />
              </div>
            </div>

            {/* Dropdown Giáo Hạt */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="deanery" style={labelStyle}>{t.filterDeanery}</label>
              <div style={{ position: 'relative' }}>
                <select id="deanery" value={selectedDeanery} onChange={e => setSelectedDeanery(e.target.value)}
                  disabled={!deaneries.length}
                  style={{
                    ...fieldStyle,
                    paddingRight: '36px',
                    opacity: deaneries.length ? 1 : 0.5,
                    cursor: deaneries.length ? 'pointer' : 'not-allowed'
                  }}>
                  <option value="">-- {t.allDeaneries} --</option>
                  {deaneries.map(d => <option key={d} value={d}>Hạt {d}</option>)}
                </select>
                <ChevronDown size={16} style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  pointerEvents: 'none', color: 'var(--color-subtle)'
                }} />
              </div>
            </div>

            {/* Ô Tìm Kiếm */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="q" style={labelStyle}>{t.filterSearch}</label>
              <div style={{ position: 'relative' }}>
                <Search size={17} color="var(--color-subtle)" style={{
                  position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)'
                }} />
                <input id="q" type="text" placeholder={t.filterSearchPlaceholder} value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)} disabled={!selectedDiocese}
                  style={{ ...fieldStyle, padding: '11px 14px 11px 38px', opacity: selectedDiocese ? 1 : 0.5 }} />
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
              gap: '8px',
              paddingTop: '10px',
              borderTop: '1px solid var(--color-border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                {(
                  [
                    { id: 'all', label: 'Tất cả' },
                    { id: 'sunday', label: 'Chúa Nhật' },
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
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: 'none',
                      backgroundColor: timeFilter === chip.id ? 'var(--color-red)' : 'var(--color-btn-subtle-bg)',
                      color: timeFilter === chip.id ? 'white' : 'var(--color-btn-subtle-text)',
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
                  padding: '5px 12px',
                  borderRadius: '999px',
                  backgroundColor: userLocation ? 'rgba(16, 185, 129, 0.15)' : 'var(--color-btn-subtle-bg)',
                  color: userLocation ? '#10B981' : 'var(--color-btn-subtle-text)',
                  border: userLocation ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--color-border-subtle)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: locating ? 'wait' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                {locating ? (
                  <>
                    <Loader2 size={13} className="spin" /> Đang định vị...
                  </>
                ) : (
                  <>
                    <MapPin size={13} color={userLocation ? '#10B981' : 'var(--color-red)'} />
                    {userLocation ? 'Gần bạn nhất' : 'Tìm gần vị trí của tôi'}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="liquid-glass" style={{ padding: '16px', color: 'var(--color-red)', fontWeight: 600, borderRadius: '16px' }}>
            {error}
          </div>
        )}

        {/* Empty State / Welcome Screen */}
        {!error && !selectedDiocese && (
          <div className="liquid-glass" style={{ padding: '36px 18px', textAlign: 'center', borderRadius: '20px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(251, 192, 45, 0.15)',
              color: 'var(--color-yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px'
            }}>
              <Church size={30} />
            </div>

            <h2 style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'var(--color-dark)',
              marginBottom: '6px',
              lineHeight: 1.3
            }}>
              Chọn Giáo Phận để tra cứu giờ lễ
            </h2>
            <p style={{
              color: 'var(--color-dark)',
              opacity: 0.75,
              maxWidth: '480px',
              margin: '0 auto 20px',
              fontSize: '0.9rem',
              lineHeight: 1.5
            }}>
              Hệ thống tổng hợp đầy đủ hơn 3.300 giáo xứ thuộc 27 giáo phận tại Việt Nam kèm giờ lễ và chỉ đường GPS.
            </p>

            {/* Quick Diocese Selection Pills on Mobile */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              maxWidth: '550px',
              margin: '0 auto 24px'
            }}>
              {POPULAR_DIOCESES.map((d) => (
                <button
                  key={d}
                  onClick={() => handleSelectDiocese(d)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    backgroundColor: 'var(--color-input-bg)',
                    border: '1px solid var(--color-input-border)',
                    color: 'var(--color-dark)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {dioceseLabel(d)}
                </button>
              ))}
            </div>

            <div>
              <button
                onClick={handleOpenAdd}
                style={{
                  padding: '9px 18px',
                  backgroundColor: 'rgba(211, 47, 47, 0.1)',
                  color: 'var(--color-red)',
                  border: '1px solid rgba(211, 47, 47, 0.25)',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <PlusCircle size={15} /> Đóng góp thêm giáo xứ mới
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="liquid-glass" style={{
            padding: '36px 18px', textAlign: 'center', color: 'var(--color-dark)', opacity: 0.6,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            borderRadius: '20px'
          }}>
            <Loader2 size={20} className="spin" /> {t.loadingMassTimes}
          </div>
        )}

        {!loading && selectedDiocese && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-subtle)' }}>
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
                <article key={item.id} className="liquid-glass card-appear" style={{
                  padding: '16px', position: 'relative', borderRadius: '18px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{
                        fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.4px', color: 'var(--color-yellow)', marginBottom: '3px',
                        display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap'
                      }}>
                        <span>{[item.diocese && dioceseLabel(item.diocese), item.deanery && `Hạt ${item.deanery}`, item.province].filter(Boolean).join(' · ')}</span>
                        {hasDistance && (
                          <span style={{
                            backgroundColor: 'rgba(16, 185, 129, 0.18)',
                            color: '#10B981',
                            padding: '1px 6px',
                            borderRadius: '999px',
                            fontSize: '0.68rem',
                            fontWeight: 800
                          }}>
                            Cách {distanceNum < 1 ? `${Math.round(distanceNum * 1000)}m` : `${distanceNum.toFixed(1)}km`}
                          </span>
                        )}
                      </div>

                      <h2 style={{
                        fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-red)', lineHeight: 1.25
                      }}>
                        {item.parish}
                      </h2>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                      <button
                        onClick={() => handleShare(item)}
                        style={{
                          padding: '5px 8px',
                          backgroundColor: 'var(--color-btn-subtle-bg)',
                          color: 'var(--color-btn-subtle-text)',
                          border: '1px solid var(--color-border-subtle)',
                          borderRadius: '8px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                        title="Chia sẻ giờ lễ"
                      >
                        <Share2 size={12} />
                        <span>Chia sẻ</span>
                      </button>

                      <button
                        onClick={() => handleOpenEdit(item)}
                        style={{
                          padding: '5px 8px',
                          backgroundColor: 'var(--color-btn-subtle-bg)',
                          color: 'var(--color-btn-subtle-text)',
                          border: '1px solid var(--color-border-subtle)',
                          borderRadius: '8px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                        title="Báo sai hoặc cập nhật"
                      >
                        <Edit3 size={12} />
                        <span>Sửa</span>
                      </button>
                    </div>
                  </div>

                  {item.address && (
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px',
                      marginTop: '6px', fontSize: '0.84rem', color: 'var(--color-muted)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', minWidth: 0, flex: 1 }}>
                        <MapPin size={14} style={{ marginTop: '2px', flexShrink: 0, opacity: 0.7 }} />
                        <span style={{ lineHeight: 1.35 }}>{item.address}</span>
                      </div>

                      <a
                        href={mapNavUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '3px 8px',
                          backgroundColor: 'rgba(59, 130, 246, 0.15)',
                          color: '#3B82F6',
                          borderRadius: '6px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          textDecoration: 'none',
                          border: '1px solid rgba(59, 130, 246, 0.25)',
                          flexShrink: 0
                        }}
                      >
                        <Navigation size={11} /> Chỉ đường
                      </a>
                    </div>
                  )}

                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px',
                    marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--color-border-subtle)'
                  }}>
                    {item.byDay ? (
                      <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {DAY_ORDER.filter(d => item.byDay?.[d]?.length).map(d => (
                          <div key={d} style={{
                            display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap'
                          }}>
                            <span style={{
                              ...labelStyle, minWidth: '80px', flexShrink: 0, marginBottom: 0,
                              color: d === 'Chúa Nhật' ? 'var(--color-red)' : 'var(--color-dark)',
                              opacity: d === 'Chúa Nhật' ? 1 : 0.8
                            }}>
                              {t.dayNames[d] ?? d}
                            </span>
                            <TimeChips
                              times={item.byDay![d]}
                              color={d === 'Chúa Nhật' ? 'var(--color-chip-sunday-text)' : 'var(--color-chip-weekday-text)'}
                              bg={d === 'Chúa Nhật' ? 'var(--color-chip-sunday-bg)' : 'var(--color-chip-weekday-bg)'}
                            />
                          </div>
                        ))}
                      </div>
                    ) : <>
                    {item.weekdayMass?.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: 0 }}>
                          <Clock size={13} /> {t.colWeekday}
                        </span>
                        <TimeChips times={item.weekdayMass} color="var(--color-chip-weekday-text)" bg="var(--color-chip-weekday-bg)" />
                      </div>
                    )}
                    {(item.saturdayMass?.length ?? 0) > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: 0 }}>
                          <Clock size={13} /> {t.dayNames['Thứ Bảy'] ?? 'Thứ Bảy'}
                        </span>
                        <TimeChips times={item.saturdayMass!} color="var(--color-chip-weekday-text)" bg="var(--color-chip-weekday-bg)" />
                      </div>
                    )}
                    {item.sundayMass?.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: 0 }}>
                          <Calendar size={13} /> {t.colSunday}
                        </span>
                        <TimeChips times={item.sundayMass} color="var(--color-chip-sunday-text)" bg="var(--color-chip-sunday-bg)" />
                      </div>
                    )}
                    {!item.weekdayMass?.length && !item.saturdayMass?.length && !item.sundayMass?.length && (
                      <div style={{ gridColumn: '1 / -1', fontSize: '0.82rem', color: 'var(--color-subtle)' }}>
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
                padding: '36px 18px', textAlign: 'center', color: 'var(--color-dark)', opacity: 0.8,
                borderRadius: '18px'
              }}>
                <p style={{ marginBottom: '12px', fontSize: '0.95rem', fontWeight: 600 }}>{t.noResults}</p>
                <button
                  onClick={handleOpenAdd}
                  style={{
                    padding: '9px 18px',
                    backgroundColor: 'var(--color-red)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(211, 47, 47, 0.25)'
                  }}
                >
                  <PlusCircle size={15} /> {t.btnContributeParish}
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

