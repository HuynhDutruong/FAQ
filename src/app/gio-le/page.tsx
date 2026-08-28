'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Navigation,
  Search,
  Loader2,
  MapPin,
  Clock,
  Check,
  Edit3,
  PlusCircle,
  Sparkles,
  Compass,
  ChevronRight,
  SlidersHorizontal,
  Church,
  X,
  Zap,
  Car,
  Globe,
  Sun,
  Sunset
} from 'lucide-react';
import { MassTime, Bucket, getFacets, getByDiocese, removeAccents } from '@/lib/massTimes';
import {
  ALL_DIOCESES,
  dioceseLabel,
  getNearestDiocese,
  getNearbyDioceses,
  calculateDistance
} from '@/lib/dioceses';
import MassTimeFeedbackModal from '@/components/MassTimeFeedbackModal';

interface ChurchWithDistance extends MassTime {
  _distance?: number;
}

/**
 * Tính trạng thái thánh lễ hôm nay và tìm lễ sắp diễn ra
 */
function computeLiveMassInfo(church: MassTime) {
  const now = new Date();
  const currentDay = now.getDay(); // 0: Chúa Nhật, 1: T2, ..., 6: T7
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let todayTimes: string[] = [];
  let dayLabel = 'Hôm nay';

  if (currentDay === 0) {
    todayTimes = church.sundayMass || [];
    dayLabel = 'Chúa Nhật';
  } else if (currentDay === 6) {
    todayTimes = [
      ...(church.weekdayMass || []),
      ...(church.saturdayMass || [])
    ];
    dayLabel = 'Thứ Bảy';
  } else {
    todayTimes = church.weekdayMass || [];
    const dayNames = ['Chúa Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    dayLabel = dayNames[currentDay];
  }

  // Loại bỏ trùng lặp và sắp xếp theo giờ
  const uniqueTimes = Array.from(new Set(todayTimes.filter(Boolean))).sort();

  let upcomingMass: { time: string; diffMins: number; isOngoing: boolean } | null = null;

  for (const t of uniqueTimes) {
    const parts = t.trim().split(/[:hH]/);
    if (parts.length >= 2) {
      const h = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      if (!isNaN(h) && !isNaN(m)) {
        const massMinutes = h * 60 + m;
        const diff = massMinutes - currentMinutes;

        if (diff >= 0 && (!upcomingMass || diff < upcomingMass.diffMins)) {
          upcomingMass = { time: t, diffMins: diff, isOngoing: false };
        } else if (diff < 0 && diff >= -45 && !upcomingMass) {
          upcomingMass = { time: t, diffMins: Math.abs(diff), isOngoing: true };
        }
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
  const [locationNotice, setLocationNotice] = useState<string>('Đang tự động xác định vị trí GPS...');
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
      setLocationNotice('Thiết bị không hỗ trợ định vị GPS');
      setLocating(false);
      fetchChurchesForDioceses(['Mỹ Tho']);
      return;
    }

    setLocating(true);
    setLocationNotice('Đang tự động tìm nhà thờ gần vị trí của bạn...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uLat = pos.coords.latitude;
        const uLng = pos.coords.longitude;
        setUserLocation({ lat: uLat, lng: uLng });

        // Tìm 3 giáo phận gần nhất với toạ độ người dùng để bao quát toàn bộ nhà thờ xung quanh
        const nearby = getNearbyDioceses(uLat, uLng, 3);
        const primaryDiocese = nearby[0]?.diocese || 'Mỹ Tho';
        setActiveDiocese(primaryDiocese);

        const dioceseNames = nearby.map((n) => n.diocese);
        setLocationNotice(`Vị trí của bạn: Gần ${dioceseLabel(primaryDiocese)}`);
        setLocating(false);

        fetchChurchesForDioceses(dioceseNames, { lat: uLat, lng: uLng });
      },
      (err) => {
        console.warn('GPS không khả dụng hoặc bị từ chối:', err.message);
        setLocating(false);
        setLocationNotice('Vị trí GPS chưa bật. Hiển thị mặc định Giáo phận Mỹ Tho.');
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

  // Chuyển giáo phận thủ công khi người dùng muốn tra cứu tỉnh/giáo phận khác
  const handleSelectDiocese = (dName: string) => {
    setActiveDiocese(dName);
    setDioceseModalOpen(false);
    setRadiusFilter('all');
    fetchChurchesForDioceses([dName], userLocation);
  };

  // =========================================================================
  // 3. BỘ LỌC TỰ ĐỘNG & BÁN KÍNH
  // =========================================================================
  const filteredChurches = useMemo(() => {
    let list = allChurches;

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm.trim()) {
      const q = removeAccents(searchTerm.trim());
      list = list.filter(
        (c) =>
          removeAccents(c.parish).includes(q) ||
          removeAccents(c.address || '').includes(q) ||
          removeAccents(c.deanery || '').includes(q) ||
          removeAccents(c.diocese || '').includes(q)
      );
    }

    // Lọc theo bán kính khoảng cách khi có vị trí GPS
    if (userLocation) {
      if (radiusFilter === '5km') {
        list = list.filter((c) => (c._distance ?? Infinity) <= 5);
      } else if (radiusFilter === '15km') {
        list = list.filter((c) => (c._distance ?? Infinity) <= 15);
      } else if (radiusFilter === '30km') {
        list = list.filter((c) => (c._distance ?? Infinity) <= 30);
      } else if (radiusFilter === 'nearest') {
        // Mặc định lấy các nhà thờ gần nhất (tối đa trong phạm vi lân cận)
        list = list.filter((c) => (c._distance ?? Infinity) !== Infinity);
      }
    }

    // Lọc theo buổi trong ngày
    if (timeOfDayFilter !== 'all') {
      list = list.filter((c) => {
        const { todayTimes } = computeLiveMassInfo(c);
        if (timeOfDayFilter === 'morning') {
          return todayTimes.some((t) => {
            const h = parseInt(t.split(/[:hH]/)[0], 10);
            return !isNaN(h) && h < 12;
          });
        }
        if (timeOfDayFilter === 'evening') {
          return todayTimes.some((t) => {
            const h = parseInt(t.split(/[:hH]/)[0], 10);
            return !isNaN(h) && h >= 12;
          });
        }
        return true;
      });
    }

    return list;
  }, [allChurches, searchTerm, radiusFilter, timeOfDayFilter, userLocation]);

  const nearestDistance = useMemo(() => {
    const valid = filteredChurches.find((c) => typeof c._distance === 'number' && c._distance < 9999);
    return valid?._distance;
  }, [filteredChurches]);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg)',
        color: 'var(--color-dark)'
      }}
    >
      {/* ========================================================================= */}
      {/* 1. COMPACT HEADER */}
      {/* ========================================================================= */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: 'var(--color-card-bg)',
          borderBottom: '1px solid var(--color-border-subtle)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-btn-subtle-bg)',
                color: 'var(--color-dark)',
                textDecoration: 'none',
                flexShrink: 0
              }}
              title="Quay lại Trang Chủ"
            >
              <ArrowLeft size={18} />
            </Link>

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  color: 'var(--color-red)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Church size={18} />
                <span>TRA CỨU GIỜ LỄ</span>
              </h1>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-subtle)', fontWeight: 600 }}>
                Tự động tìm nhà thờ gần vị trí của bạn nhất
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              onClick={() => autoDetectLocation()}
              disabled={locating}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 10px',
                borderRadius: '8px',
                backgroundColor: locating ? 'var(--color-btn-subtle-bg)' : 'rgba(183, 28, 28, 0.1)',
                color: 'var(--color-red)',
                border: '1px solid rgba(183, 28, 28, 0.2)',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
              title="Tự động định vị lại GPS"
            >
              {locating ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}
              <span className="hide-mobile">{locating ? 'Đang tìm...' : 'Định vị GPS'}</span>
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
                borderRadius: '8px',
                backgroundColor: 'var(--color-red)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(183, 28, 28, 0.25)'
              }}
            >
              <PlusCircle size={14} />
              <span className="hide-mobile">Đóng góp</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. AUTO-GPS STATUS BAR & SEARCH FILTER */}
      {/* ========================================================================= */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
          padding: '12px 12px 6px'
        }}
      >
        {/* GPS Location Banner */}
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '12px',
            backgroundColor: userLocation ? 'rgba(16, 185, 129, 0.08)' : 'rgba(234, 179, 8, 0.08)',
            border: `1px solid ${userLocation ? 'rgba(16, 185, 129, 0.25)' : 'rgba(234, 179, 8, 0.25)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: userLocation ? 'rgba(16, 185, 129, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                color: userLocation ? '#059669' : '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {locating ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <MapPin size={15} />
              )}
            </div>

            <div style={{ fontSize: '0.82rem', lineHeight: 1.35 }}>
              <div style={{ fontWeight: 800, color: userLocation ? '#065F46' : '#92400E' }}>
                {locationNotice}
              </div>
              {userLocation && typeof nearestDistance === 'number' && (
                <div style={{ fontSize: '0.74rem', color: '#047857', marginTop: '1px' }}>
                  Nhà thờ gần nhất cách bạn: <strong>{nearestDistance < 1 ? `${Math.round(nearestDistance * 1000)} m` : `${nearestDistance} km`}</strong>.
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              onClick={() => setDioceseModalOpen(true)}
              style={{
                background: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-dark)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Compass size={13} />
              <span>Đổi Giáo phận ({activeDiocese})</span>
            </button>
          </div>
        </div>

        {/* Live Search Box */}
        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
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
              padding: '10px 34px 10px 36px',
              borderRadius: '10px',
              border: '1px solid var(--color-input-border)',
              backgroundColor: 'var(--color-card-bg)',
              fontSize: '0.88rem',
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
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--color-text-subtle)',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Radius & Time Filter Pills with 2D Icons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto',
            paddingBottom: '6px',
            scrollbarWidth: 'none'
          }}
        >
          {userLocation && (
            <>
              <button
                type="button"
                onClick={() => setRadiusFilter('nearest')}
                style={{
                  padding: '5px 10px',
                  borderRadius: '16px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: radiusFilter === 'nearest' ? 'var(--color-red)' : 'var(--color-card-bg)',
                  color: radiusFilter === 'nearest' ? '#FFFFFF' : 'var(--color-dark)',
                  border: `1px solid ${radiusFilter === 'nearest' ? 'var(--color-red)' : 'var(--color-border-subtle)'}`
                }}
              >
                <Navigation size={12} />
                <span>Gần nhất</span>
              </button>

              <button
                type="button"
                onClick={() => setRadiusFilter('5km')}
                style={{
                  padding: '5px 10px',
                  borderRadius: '16px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: radiusFilter === '5km' ? 'var(--color-red)' : 'var(--color-card-bg)',
                  color: radiusFilter === '5km' ? '#FFFFFF' : 'var(--color-dark)',
                  border: `1px solid ${radiusFilter === '5km' ? 'var(--color-red)' : 'var(--color-border-subtle)'}`
                }}
              >
                <Zap size={12} />
                <span>&lt; 5 km</span>
              </button>

              <button
                type="button"
                onClick={() => setRadiusFilter('15km')}
                style={{
                  padding: '5px 10px',
                  borderRadius: '16px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: radiusFilter === '15km' ? 'var(--color-red)' : 'var(--color-card-bg)',
                  color: radiusFilter === '15km' ? '#FFFFFF' : 'var(--color-dark)',
                  border: `1px solid ${radiusFilter === '15km' ? 'var(--color-red)' : 'var(--color-border-subtle)'}`
                }}
              >
                <Car size={12} />
                <span>&lt; 15 km</span>
              </button>

              <button
                type="button"
                onClick={() => setRadiusFilter('30km')}
                style={{
                  padding: '5px 10px',
                  borderRadius: '16px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: radiusFilter === '30km' ? 'var(--color-red)' : 'var(--color-card-bg)',
                  color: radiusFilter === '30km' ? '#FFFFFF' : 'var(--color-dark)',
                  border: `1px solid ${radiusFilter === '30km' ? 'var(--color-red)' : 'var(--color-border-subtle)'}`
                }}
              >
                <Church size={12} />
                <span>&lt; 30 km</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setRadiusFilter('all')}
            style={{
              padding: '5px 10px',
              borderRadius: '16px',
              fontSize: '0.76rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: radiusFilter === 'all' ? 'var(--color-red)' : 'var(--color-card-bg)',
              color: radiusFilter === 'all' ? '#FFFFFF' : 'var(--color-dark)',
              border: `1px solid ${radiusFilter === 'all' ? 'var(--color-red)' : 'var(--color-border-subtle)'}`
            }}
          >
            <Globe size={12} />
            <span>Tất cả ({allChurches.length})</span>
          </button>

          <span style={{ color: 'var(--color-border-subtle)' }}>|</span>

          {/* Time Filter */}
          <button
            type="button"
            onClick={() => setTimeOfDayFilter(timeOfDayFilter === 'morning' ? 'all' : 'morning')}
            style={{
              padding: '5px 10px',
              borderRadius: '16px',
              fontSize: '0.76rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: timeOfDayFilter === 'morning' ? '#0284C7' : 'var(--color-card-bg)',
              color: timeOfDayFilter === 'morning' ? '#FFFFFF' : 'var(--color-dark)',
              border: `1px solid ${timeOfDayFilter === 'morning' ? '#0284C7' : 'var(--color-border-subtle)'}`
            }}
          >
            <Sun size={12} />
            <span>Lễ Sáng</span>
          </button>

          <button
            type="button"
            onClick={() => setTimeOfDayFilter(timeOfDayFilter === 'evening' ? 'all' : 'evening')}
            style={{
              padding: '5px 10px',
              borderRadius: '16px',
              fontSize: '0.76rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: timeOfDayFilter === 'evening' ? '#D97706' : 'var(--color-card-bg)',
              color: timeOfDayFilter === 'evening' ? '#FFFFFF' : 'var(--color-dark)',
              border: `1px solid ${timeOfDayFilter === 'evening' ? '#D97706' : 'var(--color-border-subtle)'}`
            }}
          >
            <Sunset size={12} />
            <span>Lễ Chiều/Tối</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. PARISHES LIST (AUTOMATICALLY SORTED BY CLOSEST DISTANCE) */}
      {/* ========================================================================= */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
          padding: '4px 12px 48px',
          flex: 1
        }}
      >
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: 'var(--color-card-bg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className="skeleton" style={{ width: '45%', height: '18px', borderRadius: '4px' }} />
                  <div className="skeleton" style={{ width: '18%', height: '18px', borderRadius: '8px' }} />
                </div>
                <div className="skeleton" style={{ width: '70%', height: '14px', borderRadius: '4px' }} />
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <div className="skeleton" style={{ width: '80px', height: '24px', borderRadius: '6px' }} />
                  <div className="skeleton" style={{ width: '80px', height: '24px', borderRadius: '6px' }} />
                  <div className="skeleton" style={{ width: '80px', height: '24px', borderRadius: '6px' }} />
                </div>
              </div>
            ))}
          </div>
        ) : filteredChurches.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 16px',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '16px',
              border: '1px solid var(--color-border-subtle)',
              marginTop: '12px'
            }}
          >
            <MapPin size={36} style={{ margin: '0 auto 10px', color: 'var(--color-red)', opacity: 0.8 }} />
            <h3 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 800 }}>
              Không tìm thấy nhà thờ phù hợp
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.82rem', color: 'var(--color-text-subtle)' }}>
              Hãy thử mở rộng bán kính tìm kiếm hoặc đổi giáo phận khác.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setRadiusFilter('all')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Xem tất cả ({allChurches.length})
              </button>
              <button
                type="button"
                onClick={() => setDioceseModalOpen(true)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-red)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Chọn Giáo Phận Khác
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredChurches.map((church) => {
              const distanceVal = church._distance;
              const hasDistance = typeof distanceVal === 'number' && distanceVal < 9999;
              const { dayLabel, todayTimes, upcomingMass } = computeLiveMassInfo(church);

              const churchImageUrl = `/api/church-image?id=${encodeURIComponent(church.id)}&name=${encodeURIComponent(church.parish)}&diocese=${encodeURIComponent(church.diocese || '')}&lat=${church.lat || ''}&lng=${church.lng || ''}&address=${encodeURIComponent(church.address || '')}`;

              // Google Maps turn-by-turn navigation URL
              const mapsUrl =
                church.lat && church.lng
                  ? `https://www.google.com/maps/dir/?api=1&destination=${church.lat},${church.lng}`
                  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.parish + ' ' + (church.address || ''))}`;

              return (
                <div
                  key={church.id}
                  style={{
                    backgroundColor: 'var(--color-card-bg)',
                    borderRadius: '16px',
                    border: '1px solid var(--color-border-subtle)',
                    padding: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                  }}
                  className="church-card-hover"
                >
                  {/* Church Photo Banner (Google / Wikimedia image) */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '145px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: '#0F172A'
                    }}
                  >
                    <img
                      src={churchImageUrl}
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
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.2) 50%, rgba(15, 23, 42, 0.4) 100%)'
                      }}
                    />

                    {/* Top Overlay Badges */}
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
                          textTransform: 'uppercase',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(183, 28, 28, 0.9)',
                          color: '#FFFFFF',
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        GP {church.diocese} {church.deanery ? `· Hạt ${church.deanery}` : ''}
                      </span>

                      {hasDistance && (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            backgroundColor: distanceVal <= 3 ? 'rgba(16, 185, 129, 0.92)' : 'rgba(0,0,0,0.72)',
                            color: '#FFFFFF',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            backdropFilter: 'blur(4px)'
                          }}
                        >
                          <Navigation size={11} />
                          <span>{distanceVal < 1 ? `${Math.round(distanceVal * 1000)} m` : `${distanceVal} km`}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Title on Image */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '10px',
                        right: '10px',
                        color: '#FFFFFF'
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          fontSize: '1.02rem',
                          fontWeight: 900,
                          textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        <Link
                          href={`/gio-le/${church.id}`}
                          style={{ color: '#FFFFFF', textDecoration: 'none' }}
                        >
                          {church.parish}
                        </Link>
                      </h3>
                    </div>
                  </div>

                  {/* Address */}
                  {church.address && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '5px',
                        fontSize: '0.78rem',
                        color: 'var(--color-text-subtle)',
                        lineHeight: 1.35
                      }}
                    >
                      <MapPin size={13} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-red)' }} />
                      <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {church.address}
                      </span>
                    </div>
                  )}

                  {/* Live Mass Status (Today & Upcoming) */}
                  {upcomingMass && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        backgroundColor: upcomingMass.isOngoing ? 'rgba(234, 179, 8, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                        color: upcomingMass.isOngoing ? '#B45309' : '#047857',
                        fontSize: '0.76rem',
                        fontWeight: 800
                      }}
                    >
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          backgroundColor: upcomingMass.isOngoing ? '#F59E0B' : '#10B981',
                          display: 'inline-block'
                        }}
                      />
                      <span>
                        {upcomingMass.isOngoing
                          ? `Đang diễn ra Thánh Lễ (${upcomingMass.time})`
                          : `Lễ tiếp theo (${dayLabel}): ${upcomingMass.time} (còn ${upcomingMass.diffMins} phút)`}
                      </span>
                    </div>
                  )}

                  {/* Mass Schedule Grid */}
                  <div
                    style={{
                      padding: '8px 10px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--color-btn-subtle-bg)',
                      border: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                      fontSize: '0.78rem'
                    }}
                  >
                    {/* Sunday Mass */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--color-red)', minWidth: '76px' }}>
                        Chúa Nhật:
                      </span>
                      {church.sundayMass && church.sundayMass.length > 0 ? (
                        church.sundayMass.map((t) => (
                          <span
                            key={t}
                            style={{
                              padding: '2px 7px',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(183, 28, 28, 0.12)',
                              color: 'var(--color-red)',
                              fontWeight: 800,
                              fontSize: '0.75rem'
                            }}
                          >
                            {t}
                          </span>
                        ))
                      ) : (
                        <span style={{ color: 'var(--color-text-subtle)', fontStyle: 'italic' }}>
                          Đang cập nhật
                        </span>
                      )}
                    </div>

                    {/* Saturday Evening Mass if distinct */}
                    {church.saturdayMass && church.saturdayMass.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, color: 'var(--color-dark)', minWidth: '76px' }}>
                          Chiều Thứ 7:
                        </span>
                        {church.saturdayMass.map((t) => (
                          <span
                            key={t}
                            style={{
                              padding: '2px 7px',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(217, 119, 6, 0.12)',
                              color: '#B45309',
                              fontWeight: 700,
                              fontSize: '0.75rem'
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Weekday Mass */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, color: 'var(--color-text-subtle)', minWidth: '76px' }}>
                        Ngày thường:
                      </span>
                      {church.weekdayMass && church.weekdayMass.length > 0 ? (
                        church.weekdayMass.map((t) => (
                          <span
                            key={t}
                            style={{
                              padding: '2px 7px',
                              borderRadius: '6px',
                              backgroundColor: 'var(--color-card-bg)',
                              color: 'var(--color-dark)',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              border: '1px solid var(--color-border-subtle)'
                            }}
                          >
                            {t}
                          </span>
                        ))
                      ) : (
                        <span style={{ color: 'var(--color-text-subtle)', fontStyle: 'italic' }}>
                          Đang cập nhật
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      paddingTop: '6px',
                      borderTop: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-red)',
                        color: '#FFFFFF',
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        textDecoration: 'none',
                        boxShadow: '0 2px 6px rgba(183, 28, 28, 0.25)'
                      }}
                    >
                      <Navigation size={12} />
                      <span>Chỉ đường</span>
                    </a>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedParishForEdit(church);
                          setFeedbackOpen(true);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-text-subtle)',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          padding: '4px'
                        }}
                        title="Báo sai hoặc cập nhật giờ lễ"
                      >
                        <Edit3 size={12} />
                        <span>Báo sửa</span>
                      </button>

                      <Link
                        href={`/gio-le/${church.id}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          color: 'var(--color-red)',
                          fontSize: '0.76rem',
                          fontWeight: 800,
                          textDecoration: 'none',
                          padding: '4px 6px'
                        }}
                      >
                        <span>Chi tiết</span>
                        <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Subtle Non-clickable Footer Note */}
        <div
          style={{
            marginTop: '36px',
            padding: '16px 0 24px',
            textAlign: 'center',
            fontSize: '0.74rem',
            fontStyle: 'italic',
            color: 'var(--color-text-subtle)',
            opacity: 0.7,
            lineHeight: 1.55,
            borderTop: '1px dashed var(--color-border-subtle)'
          }}
        >
          * Dữ liệu giờ lễ được tổng hợp từ nguồn chính thống các Giáo phận &amp; đóng góp của cộng đoàn Dân Chúa.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. DIOCESE SELECTOR MODAL (CHO KHI MUỐN CHỌN TỈNH/GIÁO PHẬN KHÁC) */}
      {/* ========================================================================= */}
      {dioceseModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setDioceseModalOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '16px',
              maxWidth: '520px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              border: '1px solid var(--color-border-subtle)'
            }}
          >
            <div
              style={{
                padding: '14px 18px',
                borderBottom: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ fontSize: '0.98rem', fontWeight: 800 }}>
                Chọn Giáo Phận Tra Cứu (27 Giáo Phận)
              </div>
              <button
                type="button"
                onClick={() => setDioceseModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-subtle)',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 800
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                padding: '12px 14px',
                overflowY: 'auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '8px'
              }}
            >
              {ALL_DIOCESES.map((dName) => {
                const count = dioceseBuckets.find((b) => b.name === dName)?.count ?? 0;
                const isSelected = activeDiocese === dName;
                return (
                  <button
                    key={dName}
                    type="button"
                    onClick={() => handleSelectDiocese(dName)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '10px',
                      textAlign: 'left',
                      border: `1px solid ${isSelected ? 'var(--color-red)' : 'var(--color-border-subtle)'}`,
                      backgroundColor: isSelected ? 'rgba(183, 28, 28, 0.1)' : 'var(--color-card-bg)',
                      color: isSelected ? 'var(--color-red)' : 'var(--color-dark)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px'
                    }}
                  >
                    <span style={{ fontSize: '0.84rem', fontWeight: 800 }}>{dName}</span>
                    <span style={{ fontSize: '0.68rem', opacity: 0.75 }}>
                      {count > 0 ? `${count} nhà thờ` : 'Đang cập nhật'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. FEEDBACK & EDIT MODAL */}
      {/* ========================================================================= */}
      {feedbackOpen && (
        <MassTimeFeedbackModal
          isOpen={feedbackOpen}
          onClose={() => {
            setFeedbackOpen(false);
            setSelectedParishForEdit(null);
          }}
          targetParish={selectedParishForEdit}
          defaultDiocese={activeDiocese}
        />
      )}
    </main>
  );
}
