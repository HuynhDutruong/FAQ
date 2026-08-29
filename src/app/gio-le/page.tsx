'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Search,
  MapPin,
  Clock,
  Navigation,
  Sparkles,
  Share2,
  ExternalLink,
  Loader2,
  Calendar,
  X,
  Compass,
  CheckCircle2,
  Car,
  Zap,
  Globe,
  Sun,
  Sunset,
  Church,
  PlusCircle,
  Eye,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import {
  MassTime,
  Bucket,
  getByDiocese,
  getFacets,
  removeAccents
} from '@/lib/massTimes';
import {
  calculateDistance,
  getNearbyDioceses,
  dioceseLabel
} from '@/lib/dioceses';
import MassTimeFeedbackModal from '@/components/MassTimeFeedbackModal';

function formatDistance(dist: number): string {
  if (dist < 1) {
    return `${Math.round(dist * 1000)} m`;
  }
  return `${dist.toFixed(1)} km`;
}

interface ChurchWithDistance extends MassTime {
  _distance?: number;
}

// Tính toán trạng thái lễ hôm nay & lễ tiếp theo
function getTodayMassSchedule(church: MassTime) {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0: CN, 1: T2, ..., 6: T7
  const currentMins = now.getHours() * 60 + now.getMinutes();

  let todayTimes: string[] = [];
  let dayLabel = '';

  if (dayOfWeek === 0) {
    dayLabel = 'Chúa Nhật';
    todayTimes = church.sundayMass || [];
  } else if (dayOfWeek === 6) {
    dayLabel = 'Thứ Bảy';
    todayTimes = church.saturdayMass && church.saturdayMass.length > 0 ? church.saturdayMass : church.weekdayMass || [];
  } else {
    const days = ['Chúa Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    dayLabel = days[dayOfWeek];
    todayTimes = church.weekdayMass || [];
  }

  // Lọc các giờ hợp lệ
  const uniqueTimes = Array.from(
    new Set(
      todayTimes
        .flatMap((t) => t.split(/[,\s-]+/))
        .map((t) => t.trim())
        .filter((t) => /^\d{1,2}:\d{2}$/.test(t))
    )
  ).sort((a, b) => {
    const [hA, mA] = a.split(':').map(Number);
    const [hB, mB] = b.split(':').map(Number);
    return hA * 60 + mA - (hB * 60 + mB);
  });

  // Tìm thánh lễ tiếp theo gần nhất
  let upcomingMass: { time: string; diffMins: number; isOngoing?: boolean } | null = null;
  for (const t of uniqueTimes) {
    const [h, m] = t.split(':').map(Number);
    if (!isNaN(h) && !isNaN(m)) {
      const massMins = h * 60 + m;
      const diff = massMins - currentMins;

      if (diff >= 0 && (!upcomingMass || diff < upcomingMass.diffMins)) {
        upcomingMass = { time: t, diffMins: diff, isOngoing: false };
      } else if (diff < 0 && diff >= -45 && !upcomingMass) {
        upcomingMass = { time: t, diffMins: Math.abs(diff), isOngoing: true };
      }
    }
  }

  return {
    dayLabel,
    todayTimes: uniqueTimes,
    upcomingMass
  };
}

export default function GioLePage() {
  const [dioceseBuckets, setDioceseBuckets] = useState<Bucket[]>([]);
  const [allChurches, setAllChurches] = useState<ChurchWithDistance[]>([]);
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationNotice, setLocationNotice] = useState<string>('Đang tự động xác định GPS...');
  const [activeDiocese, setActiveDiocese] = useState<string>('Mỹ Tho');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [radiusFilter, setRadiusFilter] = useState<'nearest' | '5km' | '15km' | '30km' | 'all'>('nearest');
  const [timeOfDayFilter, setTimeOfDayFilter] = useState<'all' | 'morning' | 'evening'>('all');
  const [dioceseModalOpen, setDioceseModalOpen] = useState(false);

  // Modals
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedParishForEdit, setSelectedParishForEdit] = useState<MassTime | null>(null);

  // =========================================================================
  // 1. TẢI DỮ LIỆU NHÀ THỜ THEO DANH SÁCH GIÁO PHẬN
  // =========================================================================
  const fetchChurchesForDioceses = useCallback(
    async (dioceses: string[], userCoords?: { lat: number; lng: number } | null) => {
      setLoading(true);
      try {
        const results = await Promise.all(dioceses.map((d) => getByDiocese(d)));
        const mapById = new Map<string, ChurchWithDistance>();

        results.flat().forEach((c) => {
          if (!mapById.has(c.id)) {
            let dist = Infinity;
            if (userCoords && c.lat && c.lng) {
              dist = calculateDistance(userCoords.lat, userCoords.lng, c.lat, c.lng);
            }
            mapById.set(c.id, { ...c, _distance: dist });
          }
        });

        const list = Array.from(mapById.values());

        if (userCoords) {
          list.sort((a, b) => (a._distance ?? Infinity) - (b._distance ?? Infinity));
        }

        setAllChurches(list);
      } catch (err) {
        console.error('Lỗi tải dữ liệu giờ lễ:', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // =========================================================================
  // 2. TỰ ĐỘNG ĐỊNH VỊ GPS VÀ TÌM NHÀ THỜ GẦN NHẤT KHI MỞ TRANG
  // =========================================================================
  const autoDetectLocation = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setLocationNotice('Thiết bị không hỗ trợ GPS');
      setLocating(false);
      fetchChurchesForDioceses(['Mỹ Tho']);
      return;
    }

    setLocating(true);
    setLocationNotice('Đang tự động tìm vị trí...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uLat = pos.coords.latitude;
        const uLng = pos.coords.longitude;
        setUserLocation({ lat: uLat, lng: uLng });

        const nearby = getNearbyDioceses(uLat, uLng, 3);
        const primaryDiocese = nearby[0]?.diocese || 'Mỹ Tho';
        setActiveDiocese(primaryDiocese);

        const dioceseNames = nearby.map((n) => n.diocese);
        setLocationNotice(`Vị trí: Gần ${dioceseLabel(primaryDiocese)}`);
        setLocating(false);

        fetchChurchesForDioceses(dioceseNames, { lat: uLat, lng: uLng });
      },
      (err) => {
        console.warn('GPS không khả dụng:', err.message);
        setLocating(false);
        setLocationNotice('Chưa bật GPS. Hiển thị Giáo phận Mỹ Tho.');
        fetchChurchesForDioceses(['Mỹ Tho']);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 120000 }
    );
  }, [fetchChurchesForDioceses]);

  useEffect(() => {
    getFacets()
      .then((f) => setDioceseBuckets(f.dioceses))
      .catch(console.error);

    autoDetectLocation();
  }, [autoDetectLocation]);

  // =========================================================================
  // 3. LỌC VÀ TÌM KIẾM
  // =========================================================================
  const filteredChurches = useMemo(() => {
    let list = allChurches;

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm.trim()) {
      const q = removeAccents(searchTerm.trim());
      list = list.filter((c) => {
        const parishMatch = removeAccents(c.parish || '').includes(q);
        const addressMatch = removeAccents(c.address || '').includes(q);
        const deaneryMatch = removeAccents(c.deanery || '').includes(q);
        const dioceseMatch = removeAccents(c.diocese || '').includes(q);
        return parishMatch || addressMatch || deaneryMatch || dioceseMatch;
      });
    }

    // Lọc theo bán kính khoảng cách
    if (userLocation) {
      if (radiusFilter === '5km') {
        list = list.filter((c) => (c._distance ?? Infinity) <= 5);
      } else if (radiusFilter === '15km') {
        list = list.filter((c) => (c._distance ?? Infinity) <= 15);
      } else if (radiusFilter === '30km') {
        list = list.filter((c) => (c._distance ?? Infinity) <= 30);
      }
    }

    // Lọc theo thời gian trong ngày (Sáng / Tối)
    if (timeOfDayFilter !== 'all') {
      list = list.filter((c) => {
        const { todayTimes } = getTodayMassSchedule(c);
        if (todayTimes.length === 0) return true;

        if (timeOfDayFilter === 'morning') {
          return todayTimes.some((t) => {
            const h = parseInt(t.split(':')[0], 10);
            return h < 12;
          });
        }
        if (timeOfDayFilter === 'evening') {
          return todayTimes.some((t) => {
            const h = parseInt(t.split(':')[0], 10);
            return h >= 12;
          });
        }
        return true;
      });
    }

    return list;
  }, [allChurches, searchTerm, radiusFilter, timeOfDayFilter, userLocation]);

  const nearestDistance = useMemo(() => {
    if (!userLocation || allChurches.length === 0) return null;
    const first = allChurches.find((c) => typeof c._distance === 'number' && c._distance < Infinity);
return first ? Math.round(first._distance! * 10) / 10 : null;
  }, [userLocation, allChurches]);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-dark)'
      }}
    >
      {/* ========================================================================= */}
      {/* 1. HERO HEADER (UNIFIED SACRED BANNER) */}
      {/* ========================================================================= */}
      <header
        style={{
          position: 'relative',
          backgroundImage:
            'linear-gradient(180deg, rgba(15, 8, 8, 0.82) 0%, rgba(45, 15, 15, 0.70) 50%, rgba(15, 8, 8, 0.92) 100%), url("/images/thanh_le_dong_te_my_tho.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          color: '#FFFFFF',
          padding: '20px 14px 26px',
          borderBottom: '1px solid rgba(217, 119, 6, 0.35)',
          boxShadow: 'inset 0 -12px 28px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(253, 230, 138, 0.3)',
                  backdropFilter: 'blur(6px)',
                  textDecoration: 'none',
                  flexShrink: 0
                }}
                title="Về Trang Chủ"
              >
                <ArrowLeft size={16} />
              </Link>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  color: '#FDE68A',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                <Link href="/" style={{ color: '#FDE68A', textDecoration: 'none', opacity: 0.9 }}>
                  Trang chủ
                </Link>
                <span>/</span>
                <span style={{ fontWeight: 700, color: '#FFFFFF' }}>Tra Cứu Giờ Lễ</span>
              </div>
            </div>

            {/* Quick Actions (GPS & Đóng góp) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="button"
                onClick={() => autoDetectLocation()}
                disabled={locating}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: '#FDE68A',
                  border: '1px solid rgba(253, 230, 138, 0.3)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {locating ? <Loader2 size={13} className="animate-spin" /> : <Navigation size={13} />}
                <span>{locating ? 'Tìm...' : 'GPS'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedParishForEdit(null);
                  setFeedbackOpen(true);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  borderRadius: '10px',
                  backgroundColor: '#B71C1C',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                <PlusCircle size={13} />
                <span>Đóng góp</span>
              </button>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: '#FDE68A',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '3px'
              }}
            >
              27 GIÁO PHẬN TOÀN QUỐC • ĐỊNH VỊ NHÀ THỜ GẦN NHẤT
            </div>
            <h1
              style={{
                fontSize: 'clamp(1.25rem, 4.2vw, 1.85rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                margin: 0,
                color: '#FFFFFF',
                lineHeight: 1.25,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
              }}
            >
              Tra Cứu Giờ Lễ Toàn Quốc
            </h1>
            <p
              style={{
                margin: '6px 0 0',
                fontSize: '0.84rem',
                color: '#E2E8F0',
                lineHeight: 1.45,
                maxWidth: '760px',
                opacity: 0.95
              }}
            >
              Tự động định vị GPS tìm nhà thờ gần nhất và cập nhật lịch cử hành Thánh Lễ Chúa Nhật, ngày thường.
            </p>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. COMPACT AUTO-GPS STATUS BAR & SEARCH FILTER */}
      {/* ========================================================================= */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
          padding: '8px 10px 4px'
        }}
      >
        {/* Sleek GPS Location Status Card */}
        <div
          style={{
            padding: '7px 10px',
            borderRadius: '10px',
            backgroundColor: userLocation ? 'rgba(16, 185, 129, 0.08)' : 'rgba(234, 179, 8, 0.08)',
            border: `1px solid ${userLocation ? 'rgba(16, 185, 129, 0.25)' : 'rgba(234, 179, 8, 0.25)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '6px',
            marginBottom: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, flex: 1 }}>
            {locating ? (
              <Loader2 size={14} className="animate-spin" style={{ color: '#D97706', flexShrink: 0 }} />
            ) : (
              <MapPin size={14} style={{ color: userLocation ? '#059669' : '#D97706', flexShrink: 0 }} />
            )}

            <div
              style={{
                fontSize: '0.76rem',
                lineHeight: 1.3,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <span style={{ fontWeight: 800, color: userLocation ? '#065F46' : '#92400E' }}>
                {userLocation ? `Gần ${activeDiocese}` : locationNotice}
              </span>
              {userLocation && typeof nearestDistance === 'number' && (
                <span style={{ color: '#047857', marginLeft: '6px', fontSize: '0.72rem' }}>
                  · Cách gần nhất: <strong>{nearestDistance < 1 ? `${Math.round(nearestDistance * 1000)} m` : `${nearestDistance} km`}</strong>
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDioceseModalOpen(true)}
            style={{
              background: 'var(--color-card-bg)',
              border: '1px solid var(--color-border-subtle)',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--color-dark)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <Compass size={12} />
            <span>Đổi GP</span>
          </button>
        </div>

        {/* Live Search Box */}
        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-subtle)'
            }}
          />
          <input
            type="text"
            placeholder="Tìm theo tên Nhà thờ, Giáo xứ, Đường, Huyện..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 30px 8px 32px',
              borderRadius: '8px',
              border: '1px solid var(--color-input-border)',
              backgroundColor: 'var(--color-card-bg)',
              fontSize: '0.84rem',
              color: 'var(--color-dark)',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--color-text-subtle)',
                cursor: 'pointer',
                padding: '3px'
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Radius & Time Filter Pills with 2D Icons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            overflowX: 'auto',
            paddingBottom: '4px',
            scrollbarWidth: 'none'
          }}
        >
          {userLocation && (
            <>
              <button
                type="button"
                onClick={() => setRadiusFilter('nearest')}
                style={{
                  padding: '4px 9px',
                  borderRadius: '14px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  backgroundColor: radiusFilter === 'nearest' ? 'var(--color-red)' : 'var(--color-card-bg)',
                  color: radiusFilter === 'nearest' ? '#FFFFFF' : 'var(--color-dark)',
                  border: `1px solid ${radiusFilter === 'nearest' ? 'var(--color-red)' : 'var(--color-border-subtle)'}`
                }}
              >
                <Navigation size={11} />
                <span>Gần nhất</span>
              </button>

              <button
                type="button"
                onClick={() => setRadiusFilter('5km')}
                style={{
                  padding: '4px 9px',
                  borderRadius: '14px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  backgroundColor: radiusFilter === '5km' ? 'var(--color-red)' : 'var(--color-card-bg)',
                  color: radiusFilter === '5km' ? '#FFFFFF' : 'var(--color-dark)',
                  border: `1px solid ${radiusFilter === '5km' ? 'var(--color-red)' : 'var(--color-border-subtle)'}`
                }}
              >
                <Zap size={11} />
                <span>&lt; 5 km</span>
              </button>

              <button
                type="button"
                onClick={() => setRadiusFilter('15km')}
                style={{
                  padding: '4px 9px',
                  borderRadius: '14px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  backgroundColor: radiusFilter === '15km' ? 'var(--color-red)' : 'var(--color-card-bg)',
                  color: radiusFilter === '15km' ? '#FFFFFF' : 'var(--color-dark)',
                  border: `1px solid ${radiusFilter === '15km' ? 'var(--color-red)' : 'var(--color-border-subtle)'}`
                }}
              >
                <Car size={11} />
                <span>&lt; 15 km</span>
              </button>

              <button
                type="button"
                onClick={() => setRadiusFilter('30km')}
                style={{
                  padding: '4px 9px',
                  borderRadius: '14px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  backgroundColor: radiusFilter === '30km' ? 'var(--color-red)' : 'var(--color-card-bg)',
                  color: radiusFilter === '30km' ? '#FFFFFF' : 'var(--color-dark)',
                  border: `1px solid ${radiusFilter === '30km' ? 'var(--color-red)' : 'var(--color-border-subtle)'}`
                }}
              >
                <Church size={11} />
                <span>&lt; 30 km</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setRadiusFilter('all')}
            style={{
              padding: '4px 9px',
              borderRadius: '14px',
              fontSize: '0.74rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              backgroundColor: radiusFilter === 'all' ? 'var(--color-red)' : 'var(--color-card-bg)',
              color: radiusFilter === 'all' ? '#FFFFFF' : 'var(--color-dark)',
              border: `1px solid ${radiusFilter === 'all' ? 'var(--color-red)' : 'var(--color-border-subtle)'}`
            }}
          >
            <Globe size={11} />
            <span>Tất cả</span>
          </button>

          <span style={{ color: 'var(--color-border-subtle)', padding: '0 2px' }}>|</span>

          {/* Time Filters */}
          <button
            type="button"
            onClick={() => setTimeOfDayFilter(timeOfDayFilter === 'morning' ? 'all' : 'morning')}
            style={{
              padding: '4px 9px',
              borderRadius: '14px',
              fontSize: '0.74rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              backgroundColor: timeOfDayFilter === 'morning' ? '#D97706' : 'var(--color-card-bg)',
              color: timeOfDayFilter === 'morning' ? '#FFFFFF' : 'var(--color-dark)',
              border: `1px solid ${timeOfDayFilter === 'morning' ? '#D97706' : 'var(--color-border-subtle)'}`
            }}
          >
            <Sun size={11} />
            <span>Lễ Sáng</span>
          </button>

          <button
            type="button"
            onClick={() => setTimeOfDayFilter(timeOfDayFilter === 'evening' ? 'all' : 'evening')}
            style={{
              padding: '4px 9px',
              borderRadius: '14px',
              fontSize: '0.74rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              backgroundColor: timeOfDayFilter === 'evening' ? '#4F46E5' : 'var(--color-card-bg)',
              color: timeOfDayFilter === 'evening' ? '#FFFFFF' : 'var(--color-dark)',
              border: `1px solid ${timeOfDayFilter === 'evening' ? '#4F46E5' : 'var(--color-border-subtle)'}`
            }}
          >
            <Sunset size={11} />
            <span>Lễ Chiều/Tối</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CHURCH CARDS LIST */}
      {/* ========================================================================= */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
          padding: '6px 10px 48px',
          flex: 1
        }}
      >
        {loading ? (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 16px',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '12px',
              border: '1px solid var(--color-border-subtle)'
            }}
          >
            <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-red)', margin: '0 auto 12px' }} />
            <div style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--color-dark)' }}>
              Đang tải danh sách nhà thờ và giờ lễ...
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--color-text-subtle)', marginTop: '4px' }}>
              Vui lòng chờ trong giây lát
            </div>
          </div>
        ) : filteredChurches.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '36px 16px',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '12px',
              border: '1px solid var(--color-border-subtle)'
            }}
          >
            <Church size={36} style={{ color: 'var(--color-red)', margin: '0 auto 8px', opacity: 0.7 }} />
            <h3 style={{ margin: '0 0 4px', fontSize: '0.96rem', fontWeight: 800 }}>
              Không tìm thấy nhà thờ phù hợp
            </h3>
            <p style={{ margin: '0 0 12px', fontSize: '0.76rem', color: 'var(--color-text-subtle)' }}>
              Hãy thử tìm kiếm với từ khóa khác hoặc nới rộng bán kính tìm kiếm.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setRadiusFilter('all');
                setTimeOfDayFilter('all');
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-red)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Hiển Thị Tất Cả Nhà Thờ
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2px' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-text-subtle)' }}>
                Tìm thấy <strong>{filteredChurches.length}</strong> nhà thờ {userLocation && radiusFilter !== 'all' ? `(sắp xếp từ gần đến xa)` : ''}
              </div>
            </div>

            {filteredChurches.map((church) => {
              const { dayLabel, todayTimes, upcomingMass } = getTodayMassSchedule(church);
              const hasGps = typeof church._distance === 'number' && church._distance < Infinity;

              return (
                <div
                  key={church.id}
                  style={{
                    backgroundColor: 'var(--color-card-bg)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border-subtle)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Church Photo Banner */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '110px',
                      backgroundColor: '#1E293B'
                    }}
                  >
                    <img
                      src={`/api/church-image?name=${encodeURIComponent(church.parish)}&diocese=${encodeURIComponent(church.diocese || '')}&lat=${church.lat || ''}&lng=${church.lng || ''}`}
                      alt={church.parish}
                      loading="lazy"
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
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)'
                      }}
                    />

                    {/* Top distance & diocese badges */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        right: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '6px'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '2px 7px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(0,0,0,0.65)',
                          color: '#FFFFFF',
                          backdropFilter: 'blur(4px)',
                          border: '1px solid rgba(255,255,255,0.2)'
                        }}
                      >
                        {dioceseLabel(church.diocese || '')}
                      </span>

                      {hasGps && (
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 900,
                            padding: '2px 8px',
                            borderRadius: '12px',
                            backgroundColor: '#059669',
                            color: '#FFFFFF',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                        >
                          <Navigation size={11} />
                          <span>{formatDistance(church._distance!)}</span>
                        </span>
                      )}
                    </div>

                    {/* Bottom Title on Image */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '10px',
                        right: '10px'
                      }}
                    >
                      <Link
                        href={`/gio-le/${church.id}`}
                        style={{
                          color: '#FFFFFF',
                          textDecoration: 'none',
                          fontSize: '0.98rem',
                          fontWeight: 900,
                          lineHeight: 1.25,
                          display: 'block',
                          textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                        }}
                      >
                        {church.parish}
                      </Link>
                      {church.address && (
                        <div
                          style={{
                            fontSize: '0.68rem',
                            color: '#E2E8F0',
                            marginTop: '2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                        >
                          <MapPin size={11} style={{ flexShrink: 0 }} />
                          <span>{church.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Church Card Body */}
                  <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Today Live Mass Status */}
                    <div
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        backgroundColor: upcomingMass?.isOngoing
                          ? 'rgba(234, 179, 8, 0.1)'
                          : upcomingMass
                            ? 'rgba(16, 185, 129, 0.08)'
                            : 'var(--color-btn-subtle-bg)',
                        border: `1px solid ${
                          upcomingMass?.isOngoing
                            ? 'rgba(234, 179, 8, 0.25)'
                            : upcomingMass
                              ? 'rgba(16, 185, 129, 0.2)'
                              : 'var(--color-border-subtle)'
                        }`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '6px',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Clock
                          size={13}
                          color={upcomingMass?.isOngoing ? '#D97706' : upcomingMass ? '#059669' : 'var(--color-text-subtle)'}
                        />
                        <span style={{ fontSize: '0.74rem', fontWeight: 800 }}>
                          {upcomingMass?.isOngoing
                            ? `Đang diễn ra Thánh Lễ (${upcomingMass.time})`
                            : upcomingMass
                              ? `Lễ tiếp theo (${dayLabel}): ${upcomingMass.time} (${
                                  upcomingMass.diffMins < 60
                                    ? `còn ${upcomingMass.diffMins} phút`
                                    : `còn ${Math.floor(upcomingMass.diffMins / 60)}h${upcomingMass.diffMins % 60 ? ` ${upcomingMass.diffMins % 60}p` : ''}`
                                })`
                              : `Hôm nay (${dayLabel}): Chưa có lễ sắp tới`}
                        </span>
                      </div>

                      {/* Today All Times */}
                      <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                        {todayTimes.map((t, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              padding: '1px 5px',
                              borderRadius: '4px',
                              backgroundColor: t === upcomingMass?.time ? 'var(--color-red)' : 'var(--color-card-bg)',
                              color: t === upcomingMass?.time ? '#FFFFFF' : 'var(--color-dark)',
                              border: `1px solid ${t === upcomingMass?.time ? 'var(--color-red)' : 'var(--color-border-subtle)'}`
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Weekday & Sunday Timetable Strip */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      <div
                        style={{
                          padding: '6px 8px',
                          borderRadius: '6px',
                          backgroundColor: 'var(--color-btn-subtle-bg)',
                          border: '1px solid var(--color-border-subtle)'
                        }}
                      >
                        <div style={{ fontSize: '0.64rem', fontWeight: 800, color: 'var(--color-text-subtle)', textTransform: 'uppercase' }}>
                          Ngày Thường (T2 - T7)
                        </div>
                        <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-dark)', marginTop: '2px' }}>
                          {church.weekdayMass && church.weekdayMass.length > 0 ? church.weekdayMass.join(', ') : 'Đang cập nhật'}
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '6px 8px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(183, 28, 28, 0.05)',
                          border: '1px solid rgba(183, 28, 28, 0.15)'
                        }}
                      >
                        <div style={{ fontSize: '0.64rem', fontWeight: 800, color: 'var(--color-red)', textTransform: 'uppercase' }}>
                          Chúa Nhật
                        </div>
                        <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-red)', marginTop: '2px' }}>
                          {church.sundayMass && church.sundayMass.length > 0 ? church.sundayMass.join(', ') : 'Đang cập nhật'}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '6px',
                        paddingTop: '6px',
                        borderTop: '1px dashed var(--color-border-subtle)'
                      }}
                    >
                      <Link
                        href={`/gio-le/${church.id}`}
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          color: 'var(--color-red)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <span>Chi tiết &amp; Bản đồ</span>
                        <ChevronRight size={13} />
                      </Link>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        {church.lat && church.lng && (
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${church.lat},${church.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(5, 150, 105, 0.1)',
                              color: '#059669',
                              border: '1px solid rgba(5, 150, 105, 0.25)',
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              textDecoration: 'none'
                            }}
                          >
                            <Navigation size={11} />
                            <span>Chỉ đường</span>
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedParishForEdit(church);
                            setFeedbackOpen(true);
                          }}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: 'var(--color-btn-subtle-bg)',
                            border: '1px solid var(--color-border-subtle)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: 'var(--color-text-subtle)',
                            cursor: 'pointer'
                          }}
                        >
                          Sửa giờ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. MODAL CHỌN GIÁO PHẬN TOÀN QUỐC */}
      {/* ========================================================================= */}
      {dioceseModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px'
          }}
          onClick={() => setDioceseModalOpen(false)}
        >
          <div
            style={{
              maxWidth: '540px',
              width: '100%',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '14px',
              border: '1px solid var(--color-border-subtle)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '85vh',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: '12px 14px',
                borderBottom: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ fontSize: '0.96rem', fontWeight: 900, color: 'var(--color-red)' }}>
                Chọn Giáo Phận Tra Cứu
              </div>
              <button
                type="button"
                onClick={() => setDioceseModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-subtle)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {dioceseBuckets.map((bucket) => {
                const isCurrent = activeDiocese === bucket.name;
                return (
                  <button
                    key={bucket.name}
                    type="button"
                    onClick={() => {
                      setActiveDiocese(bucket.name);
                      setDioceseModalOpen(false);
                      fetchChurchesForDioceses([bucket.name], userLocation);
                    }}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '8px',
                      backgroundColor: isCurrent ? 'rgba(183, 28, 28, 0.08)' : 'var(--color-btn-subtle-bg)',
                      border: `1px solid ${isCurrent ? 'rgba(183, 28, 28, 0.3)' : 'var(--color-border-subtle)'}`,
                      color: isCurrent ? 'var(--color-red)' : 'var(--color-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 800 }}>
                        {dioceseLabel(bucket.name)}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-subtle)' }}>
                        {bucket.count} nhà thờ / giáo xứ
                      </div>
                    </div>

                    {isCurrent && <CheckCircle2 size={16} color="var(--color-red)" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. FEEDBACK / SỬA GIỜ LỄ MODAL */}
      {/* ========================================================================= */}
      <MassTimeFeedbackModal
        isOpen={feedbackOpen}
        onClose={() => {
          setFeedbackOpen(false);
          setSelectedParishForEdit(null);
        }}
        targetParish={selectedParishForEdit}
        defaultDiocese={activeDiocese}
      />
    </main>
  );
}
