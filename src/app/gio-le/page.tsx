'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Navigation, Search, Loader2, MapPin, Clock, Check, Edit3, PlusCircle, ExternalLink } from 'lucide-react';
import { MassTime, Bucket, getFacets, getByDiocese, removeAccents } from '@/lib/massTimes';
import { ALL_DIOCESES, dioceseLabel, getNearestDiocese, calculateDistance } from '@/lib/dioceses';
import MassTimeFeedbackModal from '@/components/MassTimeFeedbackModal';

const DAY_ORDER = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chúa Nhật'];

export default function GioLePage() {
  const [dioceseBuckets, setDioceseBuckets] = useState<Bucket[]>([]);
  const [selectedDiocese, setSelectedDiocese] = useState('');
  const [selectedDeanery, setSelectedDeanery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState<MassTime[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Modal đóng góp / yêu cầu chỉnh sửa giờ lễ
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedParishForEdit, setSelectedParishForEdit] = useState<MassTime | null>(null);

  const loadDiocese = useCallback((diocese: string) => {
    setSelectedDiocese(diocese);
    setSelectedDeanery('');
    if (!diocese) {
      setRows([]);
      return;
    }
    setLoading(true);
    getByDiocese(diocese)
      .then(setRows)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleGPS = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      alert('Thiết bị này không hỗ trợ GPS.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uLat = pos.coords.latitude;
        const uLng = pos.coords.longitude;
        setUserLocation({ lat: uLat, lng: uLng });
        const nearest = getNearestDiocese(uLat, uLng);
        loadDiocese(nearest.diocese);
        setToast(`Đã định vị! Gần ${dioceseLabel(nearest.diocese)} (~${nearest.distanceKm} km)`);
        setLocating(false);
      },
      () => {
        alert('Không thể lấy vị trí GPS. Vui lòng cho phép quyền truy cập Vị trí trên trình duyệt.');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }, [loadDiocese]);

  useEffect(() => {
    getFacets().then(f => setDioceseBuckets(f.dioceses)).catch(console.error);

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('gps') === '1' || params.get('nearest') === '1') {
        setTimeout(() => {
          handleGPS();
        }, 200);
      }
    }
  }, [handleGPS]);

  const dioceses = useMemo(() => {
    const counts = new Map(dioceseBuckets.map(b => [b.name, b.count]));
    return ALL_DIOCESES
      .map(d => ({ value: d, label: dioceseLabel(d), count: counts.get(d) ?? 0 }))
      .filter(d => d.count > 0);
  }, [dioceseBuckets]);

  const deaneries = useMemo(() =>
    Array.from(new Set(rows.map(r => r.deanery).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'vi')),
    [rows]
  );

  const filtered = useMemo(() => {
    let list = rows;
    if (selectedDeanery) list = list.filter(r => r.deanery === selectedDeanery);
    if (searchTerm.trim()) {
      const q = removeAccents(searchTerm.trim());
      list = list.filter(r => removeAccents(r.parish).includes(q) || removeAccents(r.address).includes(q));
    }
    if (userLocation) {
      list = list.map(item => {
        const dist = item.lat && item.lng ? calculateDistance(userLocation.lat, userLocation.lng, item.lat, item.lng) : Infinity;
        return { ...item, _distance: dist };
      }).sort((a, b) => ((a as MassTime & { _distance?: number })._distance ?? Infinity) - ((b as MassTime & { _distance?: number })._distance ?? Infinity));
    }
    return list;
  }, [rows, selectedDeanery, searchTerm, userLocation]);

  const handleOpenEdit = (church: MassTime) => {
    setSelectedParishForEdit(church);
    setFeedbackOpen(true);
  };

  const handleOpenAddNew = () => {
    setSelectedParishForEdit(null);
    setFeedbackOpen(true);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-gradient)' }}>
      {toast && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 999999,
          backgroundColor: 'rgba(17, 24, 39, 0.95)', color: '#FFFFFF', padding: '8px 18px', borderRadius: '999px',
          fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px'
        }}>
          <Check size={16} color="#10B981" /> {toast}
        </div>
      )}

      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px',
        borderBottom: '1px solid var(--color-border-subtle)', maxWidth: '1060px', margin: '0 auto', width: '100%'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-btn-subtle-bg)', color: 'var(--color-dark)' }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-dark)', margin: 0, flex: 1, textTransform: 'uppercase', letterSpacing: '0.02em', textAlign: 'center' }}>
          Tra Cứu Giờ Lễ
        </h1>
        <button
          onClick={handleOpenAddNew}
          title="Đóng góp hoặc thêm giờ lễ mới"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '7px 12px', borderRadius: '8px', border: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-card-bg)', color: 'var(--color-red)',
            fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer'
          }}
        >
          <PlusCircle size={15} />
          <span className="hidden-mobile">Đóng góp</span>
        </button>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', maxWidth: '1060px', margin: '0 auto', width: '100%', gap: '16px' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '6px', textTransform: 'uppercase' }}>Chọn Giáo Phận</label>
            <select
              value={selectedDiocese}
              onChange={(e) => loadDiocese(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '10px',
                border: '1px solid var(--color-input-border)', backgroundColor: 'var(--color-input-bg)',
                fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-dark)', outline: 'none', cursor: 'pointer'
              }}
            >
              <option value="">-- Chọn giáo phận --</option>
              {dioceses.map(d => <option key={d.value} value={d.value}>{d.label} ({d.count})</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '6px', textTransform: 'uppercase' }}>Chọn Giáo Hạt</label>
              <select
                value={selectedDeanery}
                onChange={(e) => setSelectedDeanery(e.target.value)}
                disabled={!selectedDiocese || deaneries.length === 0}
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: '10px',
                  border: '1px solid var(--color-input-border)', backgroundColor: 'var(--color-input-bg)',
                  fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-dark)', outline: 'none', cursor: 'pointer',
                  opacity: !selectedDiocese || deaneries.length === 0 ? 0.5 : 1
                }}
              >
                <option value="">-- Tất cả giáo hạt --</option>
                {deaneries.map(deanery => <option key={deanery} value={deanery}>Hạt {deanery}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                onClick={handleGPS}
                disabled={locating}
                style={{
                  height: '42px', padding: '0 16px', borderRadius: '10px',
                  backgroundColor: 'var(--color-red)', color: '#FFFFFF', fontWeight: 700, fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(220, 38, 38, 0.25)'
                }}
              >
                {locating ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16} />}
                Định vị GPS
              </button>
            </div>
          </div>

          <div>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-subtle)' }} />
              <input
                type="text"
                placeholder="Tìm tên nhà thờ, địa chỉ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%', padding: '10px 12px 10px 38px', borderRadius: '10px',
                  border: '1px solid var(--color-input-border)', backgroundColor: 'var(--color-input-bg)',
                  fontSize: '0.95rem', color: 'var(--color-dark)', outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-card-bg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div className="skeleton" style={{ width: '45%', height: '20px' }} />
                <div className="skeleton" style={{ width: '70%', height: '14px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                  <div className="skeleton" style={{ width: '90%', height: '12px' }} />
                  <div className="skeleton" style={{ width: '85%', height: '12px' }} />
                  <div className="skeleton" style={{ width: '75%', height: '12px' }} />
                </div>
              </div>
            ))}
          </div>
        ) : selectedDiocese ? (
          filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-subtle)' }}>
              <MapPin size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <p>Không tìm thấy nhà thờ nào.</p>
              <button
                onClick={handleOpenAddNew}
                style={{
                  marginTop: '12px', padding: '8px 16px', borderRadius: '8px',
                  backgroundColor: 'var(--color-red)', color: '#fff', border: 'none',
                  fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer'
                }}
              >
                + Gửi bổ sung nhà thờ này
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.map(item => {
                const distanceVal = (item as MassTime & { _distance?: number })._distance;
                return (
                  <div key={item.id} className="liquid-glass" style={{
                    padding: '16px', borderRadius: '12px',
                    border: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-card-bg)',
                    display: 'flex', flexDirection: 'column', gap: '10px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                      <div>
                        <Link href={`/gio-le/${item.id}`} style={{ textDecoration: 'none' }}>
                          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            {item.parish}
                            <ExternalLink size={14} style={{ opacity: 0.5 }} />
                          </h3>
                        </Link>
                        <p style={{ margin: '3px 0 0', fontSize: '0.85rem', color: 'var(--color-subtle)' }}>
                          <MapPin size={13} strokeWidth={2} style={{ verticalAlign: '-2px', marginRight: '4px' }} />{item.address}
                        </p>
                        {typeof distanceVal === 'number' && distanceVal !== Infinity && (
                          <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--color-red)', fontWeight: 700 }}>
                            ~{Math.round(distanceVal * 10) / 10} km
                          </p>
                        )}
                      </div>

                      {/* Nút yêu cầu chỉnh sửa */}
                      <button
                        onClick={() => handleOpenEdit(item)}
                        title="Yêu cầu chỉnh sửa / Báo sai giờ lễ"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '5px',
                          padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--color-border-subtle)',
                          backgroundColor: 'var(--color-btn-subtle-bg)', color: 'var(--color-muted)',
                          fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap'
                        }}
                      >
                        <Edit3 size={13} />
                        <span>Sửa giờ lễ</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.82rem', color: 'var(--color-dark)', paddingTop: '6px', borderTop: '1px dashed var(--color-border-subtle)' }}>
                      {DAY_ORDER.map(day => {
                        const dayTimes = day === 'Chúa Nhật' ? item.sundayMass : day === 'Thứ Bảy' ? item.saturdayMass : item.weekdayMass;
                        return (
                          <div key={day} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 700, minWidth: '70px' }}>{day}:</span>
                            <span style={{ color: dayTimes?.length ? 'var(--color-red)' : 'var(--color-subtle)', fontWeight: dayTimes?.length ? 600 : 400 }}>
                              {dayTimes?.join(', ') || '—'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-subtle)' }}>
            <Clock size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <p>Chọn Giáo Phận để xem giờ lễ</p>
          </div>
        )}
      </div>

      {/* Modal yêu cầu chỉnh sửa giờ lễ */}
      {feedbackOpen && (
        <MassTimeFeedbackModal
          isOpen={feedbackOpen}
          onClose={() => {
            setFeedbackOpen(false);
            setSelectedParishForEdit(null);
          }}
          targetParish={selectedParishForEdit}
          defaultDiocese={selectedDiocese}
        />
      )}
    </main>
  );
}
