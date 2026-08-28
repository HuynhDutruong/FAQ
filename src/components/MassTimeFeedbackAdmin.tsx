'use client';
import { useState, useEffect } from 'react';
import {
  MassTimeFeedback,
  approveMassTimeFeedback,
  rejectMassTimeFeedback,
  deleteMassTimeFeedback,
  parseTimes
} from '@/lib/massTimes';
import { ALL_DIOCESES, dioceseLabel } from '@/lib/dioceses';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import {
  CheckCircle,
  XCircle,
  Trash2,
  MapPin,
  AlertCircle,
  PlusCircle,
  Edit3,
  Loader2,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function MassTimeFeedbackAdmin() {
  const { user } = useAuth();
  const [items, setItems] = useState<MassTimeFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [busyId, setBusyId] = useState<string | null>(null);

  // Editing state for an item before approving
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<MassTimeFeedback>>({});
  const [weekdayStr, setWeekdayStr] = useState('');
  const [satStr, setSatStr] = useState('');
  const [sunStr, setSunStr] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'massTimeFeedback'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as MassTimeFeedback));
        setItems(data);
        setLoading(false);
      },
      (err) => {
        console.error('Error listening to massTimeFeedback:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleStartEdit = (item: MassTimeFeedback) => {
    setEditingId(item.id);
    setEditDraft({ ...item });
    setWeekdayStr((item.weekdayMass || []).join(', '));
    setSatStr((item.saturdayMass || []).join(', '));
    setSunStr((item.sundayMass || []).join(', '));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditDraft({});
  };

  const handleApprove = async (item: MassTimeFeedback) => {
    if (!confirm(`Xác nhận duyệt và áp dụng giờ lễ cho "${item.parish}"?`)) return;

    setBusyId(item.id);
    setError(null);

    try {
      // Build final data
      const isCurrentlyEditing = editingId === item.id;
      const dataToApply = isCurrentlyEditing ? {
        ...item,
        ...editDraft,
        weekdayMass: parseTimes(weekdayStr),
        saturdayMass: parseTimes(satStr),
        sundayMass: parseTimes(sunStr)
      } : item;

      await approveMassTimeFeedback(
        item.id,
        dataToApply,
        user?.displayName || user?.email || 'Admin'
      );

      setEditingId(null);
    } catch (err: unknown) {
      console.error('Error approving feedback:', err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (item: MassTimeFeedback) => {
    const reason = prompt('Nhập lý do từ chối (tuỳ chọn):', '') ?? undefined;
    if (reason === undefined) return; // User pressed Cancel

    setBusyId(item.id);
    setError(null);

    try {
      await rejectMassTimeFeedback(
        item.id,
        reason,
        user?.displayName || user?.email || 'Admin'
      );
    } catch (err: unknown) {
      console.error('Error rejecting feedback:', err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (item: MassTimeFeedback) => {
    if (!confirm(`Xoá vĩnh viễn yêu cầu của "${item.parish}"?`)) return;

    setBusyId(item.id);
    setError(null);

    try {
      await deleteMassTimeFeedback(item.id);
    } catch (err: unknown) {
      console.error('Error deleting feedback:', err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusyId(null);
    }
  };

  const filteredItems = items.filter((item) => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const pendingCount = items.filter((i) => i.status === 'pending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Filter Bar */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '16px 20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827' }}>
            Duyệt Đóng Góp & Phản Hồi Giờ Lễ
          </h2>
          {pendingCount > 0 && (
            <span
              style={{
                backgroundColor: '#EF4444',
                color: 'white',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 700
              }}
            >
              {pendingCount} chờ duyệt
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {(['pending', 'approved', 'rejected', 'all'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: filterStatus === st ? '#1F2937' : '#F3F4F6',
                color: filterStatus === st ? 'white' : '#4B5563',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {st === 'pending'
                ? `Chờ duyệt (${items.filter((i) => i.status === 'pending').length})`
                : st === 'approved'
                ? `Đã duyệt (${items.filter((i) => i.status === 'approved').length})`
                : st === 'rejected'
                ? `Đã từ chối (${items.filter((i) => i.status === 'rejected').length})`
                : `Tất cả (${items.length})`}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#FEE2E2',
            color: '#991B1B',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', color: '#6B7280' }}>
          <Loader2 size={28} className="spin" style={{ margin: '0 auto 12px' }} />
          Đang tải danh sách phản hồi từ Firestore...
        </div>
      ) : filteredItems.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            color: '#6B7280'
          }}
        >
          <CheckCircle size={44} style={{ margin: '0 auto 12px', color: '#10B981', opacity: 0.6 }} />
          <p style={{ fontWeight: 600 }}>Không có yêu cầu nào trong danh mục này.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredItems.map((item) => {
            const isEditing = editingId === item.id;
            const isBusy = busyId === item.id;

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderLeft: `5px solid ${
                    item.status === 'pending'
                      ? '#F59E0B'
                      : item.status === 'approved'
                      ? '#10B981'
                      : '#EF4444'
                  }`,
                  padding: '20px'
                }}
              >
                {/* Header Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor:
                          item.type === 'suggest_new'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : 'rgba(59, 130, 246, 0.15)',
                        color: item.type === 'suggest_new' ? '#065F46' : '#1E40AF',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {item.type === 'suggest_new' ? (
                        <>
                          <PlusCircle size={13} /> Thêm Giáo Xứ Mới
                        </>
                      ) : (
                        <>
                          <Edit3 size={13} /> Cập Nhật / Báo Sai
                        </>
                      )}
                    </span>

                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor:
                          item.status === 'pending'
                            ? '#FEF3C7'
                            : item.status === 'approved'
                            ? '#D1FAE5'
                            : '#FEE2E2',
                        color:
                          item.status === 'pending'
                            ? '#B45309'
                            : item.status === 'approved'
                            ? '#065F46'
                            : '#B91C1C'
                      }}
                    >
                      {item.status === 'pending'
                        ? 'Chờ duyệt'
                        : item.status === 'approved'
                        ? 'Đã duyệt'
                        : 'Đã từ chối'}
                    </span>

                    <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                      {item.createdAt?.toDate().toLocaleString('vi-VN')}
                    </span>
                  </div>

                  {item.reviewedBy && (
                    <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                      Duyệt bởi: <strong>{item.reviewedBy}</strong> ({item.reviewedAt?.toDate().toLocaleString('vi-VN')})
                    </div>
                  )}
                </div>

                {/* Edit Form OR View Info */}
                {isEditing ? (
                  <div
                    style={{
                      backgroundColor: '#F9FAFB',
                      padding: '16px',
                      borderRadius: '8px',
                      marginBottom: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.95rem' }}>
                      Chỉnh sửa thông tin trước khi duyệt:
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Tên Giáo xứ</label>
                        <input
                          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                          value={editDraft.parish || ''}
                          onChange={(e) => setEditDraft({ ...editDraft, parish: e.target.value })}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Giáo phận</label>
                        <select
                          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                          value={editDraft.diocese || ''}
                          onChange={(e) => setEditDraft({ ...editDraft, diocese: e.target.value })}
                        >
                          {ALL_DIOCESES.map((d) => (
                            <option key={d} value={d}>
                              {dioceseLabel(d)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Giáo hạt</label>
                        <input
                          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                          value={editDraft.deanery || ''}
                          onChange={(e) => setEditDraft({ ...editDraft, deanery: e.target.value })}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Tỉnh / Thành</label>
                        <input
                          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                          value={editDraft.province || ''}
                          onChange={(e) => setEditDraft({ ...editDraft, province: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Địa chỉ</label>
                      <input
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                        value={editDraft.address || ''}
                        onChange={(e) => setEditDraft({ ...editDraft, address: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Giờ lễ ngày thường</label>
                        <input
                          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                          value={weekdayStr}
                          onChange={(e) => setWeekdayStr(e.target.value)}
                          placeholder="VD: 05:00, 17:30"
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Giờ lễ chiều Thứ Bảy</label>
                        <input
                          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                          value={satStr}
                          onChange={(e) => setSatStr(e.target.value)}
                          placeholder="VD: 18:00"
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Giờ lễ Chúa Nhật</label>
                        <input
                          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                          value={sunStr}
                          onChange={(e) => setSunStr(e.target.value)}
                          placeholder="VD: 05:00, 07:00, 17:00"
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <button
                        onClick={handleCancelEdit}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#E5E7EB',
                          color: '#374151',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.85rem'
                        }}
                      >
                        Huỷ sửa
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>
                      {item.parish}
                    </h3>

                    <div style={{ fontSize: '0.85rem', color: '#4B5563', marginBottom: '12px' }}>
                      {[item.diocese && dioceseLabel(item.diocese), item.deanery && `Hạt ${item.deanery}`, item.province].filter(Boolean).join(' · ')}
                    </div>

                    {item.address && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#374151', marginBottom: '12px' }}>
                        <MapPin size={16} color="#6B7280" />
                        <span>{item.address}</span>
                      </div>
                    )}

                    {/* Mass Times Comparison */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '12px',
                        backgroundColor: '#F9FAFB',
                        padding: '14px',
                        borderRadius: '8px',
                        marginBottom: '14px'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Lễ Ngày Thường
                        </div>
                        <div style={{ fontWeight: 700, color: '#1F2937' }}>
                          {item.weekdayMass?.length ? item.weekdayMass.join('  •  ') : '—'}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Lễ Chiều Thứ Bảy
                        </div>
                        <div style={{ fontWeight: 700, color: '#1F2937' }}>
                          {item.saturdayMass?.length ? item.saturdayMass.join('  •  ') : '—'}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Lễ Chúa Nhật
                        </div>
                        <div style={{ fontWeight: 700, color: '#DC2626' }}>
                          {item.sundayMass?.length ? item.sundayMass.join('  •  ') : '—'}
                        </div>
                      </div>
                    </div>

                    {/* User Note & Contact */}
                    {(item.note || item.contactName || item.contactPhone) && (
                      <div
                        style={{
                          backgroundColor: '#FFFBEB',
                          border: '1px solid #FDE68A',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          fontSize: '0.85rem',
                          color: '#92400E',
                          marginBottom: '14px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}
                      >
                        {item.note && (
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                            <MessageSquare size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
                            <span><strong>Ghi chú:</strong> {item.note}</span>
                          </div>
                        )}
                        {(item.contactName || item.contactPhone) && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', opacity: 0.9 }}>
                            {item.contactName && <span>👤 {item.contactName}</span>}
                            {item.contactPhone && <span>📞 {item.contactPhone}</span>}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Actions Toolbar */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                    paddingTop: '12px',
                    borderTop: '1px solid #E5E7EB'
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {!isEditing && (
                      <button
                        onClick={() => handleStartEdit(item)}
                        disabled={isBusy}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#F3F4F6',
                          color: '#374151',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Edit3 size={14} /> Sửa trước khi duyệt
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {item.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleReject(item)}
                          disabled={isBusy}
                          style={{
                            padding: '8px 14px',
                            backgroundColor: '#FEE2E2',
                            color: '#991B1B',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: isBusy ? 'not-allowed' : 'pointer',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <XCircle size={16} /> Từ chối
                        </button>

                        <button
                          onClick={() => handleApprove(item)}
                          disabled={isBusy}
                          style={{
                            padding: '8px 18px',
                            backgroundColor: '#10B981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: isBusy ? 'not-allowed' : 'pointer',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)'
                          }}
                        >
                          {isBusy ? <Loader2 size={16} className="spin" /> : <CheckCircle size={16} />}
                          Duyệt & Áp dụng ngay
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleDelete(item)}
                      disabled={isBusy}
                      style={{
                        padding: '8px 10px',
                        backgroundColor: '#F3F4F6',
                        color: '#6B7280',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: isBusy ? 'not-allowed' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Xoá vĩnh viễn"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
