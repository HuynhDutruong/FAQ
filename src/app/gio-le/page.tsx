'use client';
import { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Clock, Calendar, ArrowLeft, Church, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getFacets, getByDiocese, removeAccents, MassTime, Bucket } from '@/lib/massTimes';
import { ALL_DIOCESES, dioceseLabel } from '@/lib/dioceses';

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '14px',
  border: '1px solid rgba(255,255,255,0.7)',
  background: 'rgba(255,255,255,0.6)',
  outline: 'none',
  fontSize: '1rem',
  fontFamily: 'inherit',
  color: 'var(--color-dark)',
  boxSizing: 'border-box'
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  color: 'var(--color-dark)',
  opacity: 0.65
};

const UNKNOWN_DIOCESE = 'Chưa rõ giáo phận';

const DAY_ORDER = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chúa Nhật'];

function TimeChips({ times, color, bg }: { times: string[]; color: string; bg: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {times.map(t => (
        <span key={t} style={{
          background: bg, color, padding: '5px 10px', borderRadius: '999px',
          fontSize: '0.85rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums'
        }}>{t}</span>
      ))}
    </div>
  );
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

  // Xếp theo đúng thứ tự 27 giáo phận chính thức; nhóm chưa gắn nhãn xuống cuối
  const dioceses = useMemo(() => {
    const counts = new Map(dioceseBuckets.map(b => [b.name, b.count]));
    const known = ALL_DIOCESES.filter(d => counts.has(d))
      .map(d => ({ value: d, label: dioceseLabel(d), count: counts.get(d)! }));
    const rest = dioceseBuckets.filter(b => !ALL_DIOCESES.includes(b.name))
      .map(b => ({ value: b.name, label: b.name, count: b.count }));
    return [...known, ...rest];
  }, [dioceseBuckets]);

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
    getByDiocese(val === UNKNOWN_DIOCESE ? '' : val)
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
    return rows.filter(r => {
      if (selectedDeanery && r.deanery !== selectedDeanery) return false;
      if (q && !removeAccents(r.parish).includes(q) && !removeAccents(r.address).includes(q)) return false;
      return true;
    });
  }, [rows, selectedDeanery, searchTerm]);

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <header className="liquid-glass" style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none',
        padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px'
      }}>
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

        <h1 style={{
          fontSize: 'clamp(1rem, 4vw, 1.4rem)', fontWeight: 900, textTransform: 'uppercase',
          letterSpacing: '0.5px', color: 'var(--color-red)', lineHeight: 1.2
        }}>
          {t.massTimesTitle}
        </h1>
      </header>

      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '24px 20px 48px' }}>

        <div className="liquid-glass" style={{
          padding: '20px', marginBottom: '24px', display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="diocese" style={labelStyle}>{t.filterDiocese}</label>
            <select id="diocese" value={selectedDiocese}
              onChange={e => handleSelectDiocese(e.target.value)} style={fieldStyle}>
              <option value="">{t.allDioceses}</option>
              {dioceses.map(d => (
                <option key={d.value} value={d.value}>{d.label} ({d.count})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="deanery" style={labelStyle}>{t.filterDeanery}</label>
            <select id="deanery" value={selectedDeanery} onChange={e => setSelectedDeanery(e.target.value)}
              disabled={!deaneries.length}
              style={{ ...fieldStyle, opacity: deaneries.length ? 1 : 0.5, cursor: deaneries.length ? 'pointer' : 'not-allowed' }}>
              <option value="">{t.allDeaneries}</option>
              {deaneries.map(d => <option key={d} value={d}>Hạt {d}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

        {error && (
          <div className="liquid-glass" style={{ padding: '20px', color: 'var(--color-red)', fontWeight: 600 }}>
            {error}
          </div>
        )}

        {!error && !selectedDiocese && (
          <div className="liquid-glass" style={{ padding: '48px 24px', textAlign: 'center' }}>
            <Church size={44} style={{ color: 'var(--color-yellow)', margin: '0 auto 12px' }} />
            <p style={{ color: 'var(--color-dark)', opacity: 0.7 }}>{t.selectDiocesePrompt}</p>
          </div>
        )}

        {loading && (
          <div className="liquid-glass" style={{
            padding: '48px 24px', textAlign: 'center', color: 'var(--color-dark)', opacity: 0.6,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
          }}>
            <Loader2 size={20} className="spin" /> {t.loadingMassTimes}
          </div>
        )}

        {!loading && selectedDiocese && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filtered.map(item => (
              <article key={item.id} className="liquid-glass" style={{ padding: '20px' }}>
                <div style={{
                  fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.5px', color: 'var(--color-yellow)', marginBottom: '4px'
                }}>
                  {[item.diocese && dioceseLabel(item.diocese), item.deanery && `Hạt ${item.deanery}`, item.province].filter(Boolean).join(' · ')}
                </div>

                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-red)', lineHeight: 1.3 }}>
                  {item.parish}
                </h2>

                {item.address && (
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: '6px', marginTop: '6px',
                    fontSize: '0.9rem', color: 'var(--color-dark)', opacity: 0.7
                  }}>
                    <MapPin size={15} style={{ marginTop: '3px', flexShrink: 0 }} />
                    {item.lat ? (
                      <a href={`https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`}
                        target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                        {item.address}
                      </a>
                    ) : <span>{item.address}</span>}
                  </div>
                )}

                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px',
                  marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(44,44,44,0.08)'
                }}>
                  {/* Có giờ lễ chi tiết theo từng thứ thì hiện bảng đó — chính xác hơn
                      cặp "ngày thường / Chúa Nhật" vốn là gộp chung. */}
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} /> {t.colWeekday}
                      </span>
                      <TimeChips times={item.weekdayMass} color="var(--color-dark)" bg="rgba(251,192,45,0.25)" />
                    </div>
                  )}
                  {(item.saturdayMass?.length ?? 0) > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} /> {t.dayNames['Thứ Bảy'] ?? 'Thứ Bảy'}
                      </span>
                      <TimeChips times={item.saturdayMass!} color="var(--color-dark)" bg="rgba(251,192,45,0.25)" />
                    </div>
                  )}
                  {item.sundayMass?.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={14} /> {t.colSunday}
                      </span>
                      <TimeChips times={item.sundayMass} color="var(--color-red)" bg="rgba(211,47,47,0.1)" />
                    </div>
                  )}
                  {/* CSDL của HĐGM có ~1000 nhà thờ chưa khai giờ lễ — vẫn liệt kê
                      để danh bạ đủ giáo xứ toàn quốc, nhưng nói rõ là chưa có. */}
                  {!item.weekdayMass?.length && !item.saturdayMass?.length && !item.sundayMass?.length && (
                    <div style={{ gridColumn: '1 / -1', fontSize: '0.9rem', color: 'var(--color-dark)', opacity: 0.5 }}>
                      {t.noMassTimes}
                    </div>
                  )}
                  </>}
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="liquid-glass" style={{
                padding: '48px 24px', textAlign: 'center', color: 'var(--color-dark)', opacity: 0.6
              }}>
                {t.noResults}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
