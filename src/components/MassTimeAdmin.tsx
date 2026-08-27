'use client';
import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Download, Save, X, RefreshCw } from 'lucide-react';
import {
  MassTime, Bucket, getFacets, getByProvince, createMass, updateMass, deleteMass,
  refreshFacets, importFromJson, parseTimes, removeAccents
} from '@/lib/massTimes';
import { ECCLESIASTICAL_PROVINCES, ALL_DIOCESES, dioceseLabel } from '@/lib/dioceses';

type Draft = Omit<MassTime, 'id'> & { id?: string };

const EMPTY: Draft = {
  parish: '', diocese: '', deanery: '', province: '', address: '',
  weekdayMass: [], saturdayMass: [], sundayMass: []
};

const input: React.CSSProperties = {
  width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB',
  borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box'
};
const btn = (bg: string, color = 'white'): React.CSSProperties => ({
  padding: '8px 14px', backgroundColor: bg, color, border: 'none', borderRadius: '8px',
  cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
  display: 'inline-flex', alignItems: 'center', gap: '6px'
});
const card: React.CSSProperties = {
  backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

export default function MassTimeAdmin() {
  const [provinces, setProvinces] = useState<Bucket[]>([]);
  const [dioceses, setDioceses] = useState<Bucket[]>([]);
  const [province, setProvince] = useState('');
  const [rows, setRows] = useState<MassTime[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);

  const loadFacets = useCallback(() => {
    getFacets().then(f => { setProvinces(f.provinces); setDioceses(f.dioceses); })
      .catch((e: Error) => setError(e.message));
  }, []);

  const loadRows = useCallback((p: string) => {
    if (!p) { setRows([]); return; }
    setLoading(true);
    getByProvince(p).then(setRows).catch((e: Error) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  useEffect(loadFacets, [loadFacets]);
  useEffect(() => loadRows(province), [province, loadRows]);

  const run = async (label: string, fn: () => Promise<unknown>) => {
    setBusy(label);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  };

  const handleImport = () => run('import', async () => {
    const n = await importFromJson((done, total) => setBusy(`import ${done}/${total}`));
    loadFacets();
    loadRows(province);
    alert(`Đã nhập ${n} nhà thờ vào Firestore.`);
  });

  const handleSave = () => {
    if (!draft) return;
    if (!draft.parish.trim() || !draft.province.trim()) {
      setError('Bắt buộc nhập Tên nhà thờ và Tỉnh / Thành.');
      return;
    }
    run('save', async () => {
      // Admin bấm Lưu = khẳng định 2 ô giờ lễ bên dưới. Giữ lại byDay sẽ khiến
      // trang công khai hiện số liệu cũ đè lên bản sửa -> bỏ luôn.
      const { id, ...data } = { ...draft, byDay: null };
      if (id) await updateMass(id, data);
      else await createMass(data);
      await refreshFacets();
      setDraft(null);
      loadFacets();
      loadRows(province);
    });
  };

  const handleDelete = (m: MassTime) => {
    if (!confirm(`Xoá "${m.parish}"? Thao tác này không hoàn tác được.`)) return;
    run('delete', async () => {
      await deleteMass(m.id);
      await refreshFacets();
      loadFacets();
      loadRows(province);
    });
  };

  const term = removeAccents(q.trim());
  const shown = term
    ? rows.filter(r => removeAccents(r.parish).includes(term) || removeAccents(r.address).includes(term))
    : rows;
  const total = provinces.reduce((s, p) => s + p.count, 0);
  const dioceseCounts = new Map(dioceses.map(d => [d.name, d.count]));
  const labelled = ALL_DIOCESES.filter(d => dioceseCounts.has(d));
  const missing = ALL_DIOCESES.filter(d => !dioceseCounts.has(d));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Thanh công cụ */}
      <div style={{ ...card, padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <select value={province} onChange={e => setProvince(e.target.value)} style={{ ...input, width: 'auto', minWidth: '260px' }}>
          <option value="">-- Chọn Tỉnh / Thành ({total} nhà thờ) --</option>
          {provinces.map(p => <option key={p.name} value={p.name}>{p.name} ({p.count})</option>)}
        </select>

        <input placeholder="Tìm nhà thờ / địa chỉ..." value={q} onChange={e => setQ(e.target.value)}
          disabled={!province} style={{ ...input, width: 'auto', flex: '1 1 200px' }} />

        <button onClick={() => setDraft({ ...EMPTY, province })} style={btn('#059669')}>
          <Plus size={16} /> Thêm
        </button>
        <button onClick={handleImport} disabled={!!busy} style={btn(busy ? '#9CA3AF' : '#2563EB')}
          title="Nhập từ public/giole.json (chạy scripts/scrape_giole.py để tạo file)">
          <Download size={16} /> {busy?.startsWith('import') ? busy : 'Nhập từ giole.json'}
        </button>
        <button onClick={() => run('meta', async () => { await refreshFacets(); loadFacets(); })}
          disabled={!!busy} style={btn('#6B7280')} title="Đếm lại số nhà thờ mỗi tỉnh/giáo phận">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Tiến độ gắn nhãn giáo phận */}
      <details style={{ ...card, padding: '16px 20px' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#111827' }}>
          Giáo phận đã gắn nhãn: {labelled.length}/27
          {missing.length > 0 && <span style={{ color: '#B45309', fontWeight: 400 }}> — còn thiếu {missing.length}</span>}
        </summary>
        <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {ALL_DIOCESES.map(d => {
            const n = dioceseCounts.get(d) ?? 0;
            return (
              <span key={d} style={{
                padding: '4px 10px', borderRadius: '999px', fontSize: '0.85rem',
                backgroundColor: n ? '#D1FAE5' : '#FEF3C7', color: n ? '#065F46' : '#92400E'
              }}>
                {d}{n ? ` (${n})` : ''}
              </span>
            );
          })}
        </div>
        <p style={{ marginTop: '12px', fontSize: '0.85rem', color: '#6B7280' }}>
          Nguồn giole.vn (phần lớn dữ liệu) không có trường Giáo phận, nên nhà thờ vẫn
          tra cứu được theo Tỉnh/Thành nhưng chưa gắn giáo phận. Sửa từng bản ghi ở dưới
          để bổ sung.
        </p>
      </details>

      {error && (
        <div style={{ padding: '16px', backgroundColor: '#FEE2E2', color: '#B91C1C', borderRadius: '12px' }}>
          {error}
        </div>
      )}

      {/* Form thêm/sửa */}
      {draft && (
        <div style={{ ...card, padding: '20px', border: '2px solid #059669' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 'bold', color: '#111827' }}>
              {draft.id ? 'Sửa nhà thờ' : 'Thêm nhà thờ mới'}
            </h3>
            <button onClick={() => setDraft(null)} style={btn('#F3F4F6', '#4B5563')}><X size={16} /></button>
          </div>

          {draft.byDay && (
            <div style={{
              padding: '12px 14px', backgroundColor: '#FEF3C7', color: '#92400E',
              borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem'
            }}>
              Nhà thờ này đang có giờ lễ chi tiết theo từng thứ ({Object.keys(draft.byDay).length} ngày).
              Bấm <b>Lưu</b> sẽ thay thế bằng 2 ô &quot;ngày thường / Chúa Nhật&quot; bên dưới.
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {([
              ['parish', 'Tên nhà thờ / Giáo xứ *'],
              ['province', 'Tỉnh / Thành *'],
              ['deanery', 'Giáo hạt'],
              ['address', 'Địa chỉ'],
            ] as const).map(([key, label]) => (
              <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#4B5563' }}>
                {label}
                <input value={draft[key]} onChange={e => setDraft({ ...draft, [key]: e.target.value })} style={input} />
              </label>
            ))}

            {/* Chọn từ 27 giáo phận chuẩn thay vì gõ tay — nguồn ngoài viết mỗi nơi
                một kiểu ("Giáo Phận Bà Rịa", "Buôn Ma Thuột", "Qui Nhơn"). */}
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#4B5563' }}>
              Giáo phận
              <select value={draft.diocese} onChange={e => setDraft({ ...draft, diocese: e.target.value })} style={input}>
                <option value="">-- Chưa rõ --</option>
                {ECCLESIASTICAL_PROVINCES.map(gt => (
                  <optgroup key={gt.name} label={gt.name}>
                    {gt.dioceses.map(d => <option key={d} value={d}>{dioceseLabel(d)}</option>)}
                  </optgroup>
                ))}
              </select>
            </label>

            {([
              ['weekdayMass', 'Giờ lễ ngày thường'],
              ['saturdayMass', 'Giờ lễ Thứ Bảy'],
              ['sundayMass', 'Giờ lễ Chúa Nhật'],
            ] as const).map(([key, label]) => (
              <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#4B5563' }}>
                {label} <span style={{ opacity: 0.6 }}>(cách nhau bởi dấu phẩy, vd: 5:00, 17h30)</span>
                <input defaultValue={(draft[key] ?? []).join(', ')}
                  onBlur={e => setDraft({ ...draft, [key]: parseTimes(e.target.value) })} style={input} />
              </label>
            ))}
          </div>

          <button onClick={handleSave} disabled={!!busy} style={{ ...btn('#059669'), marginTop: '16px' }}>
            <Save size={16} /> {busy === 'save' ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      )}

      {/* Danh sách */}
      {!province ? (
        <div style={{ ...card, padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          {total === 0
            ? 'Chưa có dữ liệu. Bấm "Nhập từ giole.json" để nạp dữ liệu đã cào.'
            : 'Chọn một Tỉnh / Thành để xem và chỉnh sửa danh sách nhà thờ.'}
        </div>
      ) : loading ? (
        <div style={{ ...card, padding: '40px', textAlign: 'center', color: '#6B7280' }}>Đang tải...</div>
      ) : shown.length === 0 ? (
        <div style={{ ...card, padding: '40px', textAlign: 'center', color: '#6B7280' }}>Không có nhà thờ nào.</div>
      ) : (
        shown.map(m => (
          <div key={m.id} style={{ ...card, padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 'bold', color: '#111827' }}>{m.parish}</div>
              <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '2px' }}>
                {[m.diocese, m.deanery, m.address].filter(Boolean).join(' — ') || '(chưa có địa chỉ)'}
              </div>
              <div style={{ fontSize: '0.85rem', marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <span><b style={{ color: '#B08D00' }}>Thường:</b> {m.weekdayMass?.join(' · ') || '—'}</span>
                {(m.saturdayMass?.length ?? 0) > 0 && <span><b style={{ color: '#B08D00' }}>T7:</b> {m.saturdayMass!.join(' · ')}</span>}
                <span><b style={{ color: '#B91C1C' }}>CN:</b> {m.sundayMass?.join(' · ') || '—'}</span>
                {m.byDay && <span style={{ color: '#059669', fontWeight: 600 }}>● chi tiết theo thứ</span>}
              </div>
            </div>
            <button onClick={() => setDraft({ ...m })} style={btn('#EFF6FF', '#1D4ED8')}><Pencil size={16} /></button>
            <button onClick={() => handleDelete(m)} style={btn('#FEE2E2', '#B91C1C')}><Trash2 size={16} /></button>
          </div>
        ))
      )}
    </div>
  );
}
