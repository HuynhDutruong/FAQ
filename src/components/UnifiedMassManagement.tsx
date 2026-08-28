'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  AlertCircle,
  BarChart3,
  Check,
  CheckCircle,
  CheckSquare,
  Church,
  Clock,
  Edit3,
  ExternalLink,
  Inbox,
  Loader2,
  MapPin,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Search,
  StickyNote,
  Trash2,
  User,
  X,
  XCircle
} from 'lucide-react';
import {
  MassTime,
  MassTimeFeedback,
  Bucket,
  getFacets,
  getByProvince,
  getByDiocese,
  createMass,
  updateMass,
  deleteMass,
  refreshFacets,
  approveMassTimeFeedback,
  rejectMassTimeFeedback,
  deleteMassTimeFeedback,
  parseTimes,
  removeAccents
} from '@/lib/massTimes';
import { ALL_DIOCESES, dioceseLabel } from '@/lib/dioceses';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/lib/AuthContext';

type SubViewType = 'requests' | 'database' | 'stats';
type Draft = Omit<MassTime, 'id'> & { id?: string };

const EMPTY_DRAFT: Draft = {
  parish: '',
  diocese: '',
  deanery: '',
  province: '',
  address: '',
  weekdayMass: [],
  saturdayMass: [],
  sundayMass: []
};

export default function UnifiedMassManagement() {
  const { user } = useAuth();
  const [subView, setSubView] = useState<SubViewType>('requests');

  // Toast Notification System
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  }, []);

  // ==========================================
  // 1. STATE: FEEDBACK REQUESTS (YÊU CẦU DUYỆT)
  // ==========================================
  const [requests, setRequests] = useState<MassTimeFeedback[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [requestFilter, setRequestFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [requestSearch, setRequestSearch] = useState('');
  const [busyRequestId, setBusyRequestId] = useState<string | null>(null);

  // Edit draft for feedback before approve
  const [editingFeedbackId, setEditingFeedbackId] = useState<string | null>(null);
  const [feedbackDraft, setFeedbackDraft] = useState<Partial<MassTimeFeedback>>({});
  const [fbWeekdayStr, setFbWeekdayStr] = useState('');
  const [fbSatStr, setFbSatStr] = useState('');
  const [fbSunStr, setFbSunStr] = useState('');

  // ==========================================
  // 2. STATE: DATABASE (DANH SÁCH NHÀ THỜ)
  // ==========================================
  const [provinces, setProvinces] = useState<Bucket[]>([]);
  const [dioceses, setDioceses] = useState<Bucket[]>([]);
  const [selectedDiocese, setSelectedDiocese] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [churchRows, setChurchRows] = useState<MassTime[]>([]);
  const [churchSearch, setChurchSearch] = useState('');
  const [dbLoading, setDbLoading] = useState(false);
  const [churchDraft, setChurchDraft] = useState<Draft | null>(null);
  const [churchDraftOpen, setChurchDraftOpen] = useState(false);
  const [dbBusy, setDbBusy] = useState<string | null>(null);

  // Draft string inputs
  const [draftWeekdayStr, setDraftWeekdayStr] = useState('');
  const [draftSatStr, setDraftSatStr] = useState('');
  const [draftSunStr, setDraftSunStr] = useState('');

  // ==========================================
  // DATA SUBSCRIPTIONS & FETCHING
  // ==========================================
  // Listen to Feedback collection in real-time
  useEffect(() => {
    const q = query(collection(db, 'massTimeFeedback'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as MassTimeFeedback));
        setRequests(data);
        setRequestsLoading(false);
      },
      (err) => {
        console.error('Error listening to massTimeFeedback:', err);
        setRequestsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Load facets
  const loadFacets = useCallback(() => {
    getFacets()
      .then((f) => {
        setProvinces(f.provinces);
        setDioceses(f.dioceses);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    loadFacets();
  }, [loadFacets]);

  // Load churches when diocese or province changes
  const loadChurchesByDiocese = useCallback((d: string) => {
    if (!d) {
      setChurchRows([]);
      return;
    }
    setDbLoading(true);
    getByDiocese(d)
      .then(setChurchRows)
      .catch((e) => showToast(e.message, 'error'))
      .finally(() => setDbLoading(false));
  }, [showToast]);

  const loadChurchesByProvince = useCallback((p: string) => {
    if (!p) {
      setChurchRows([]);
      return;
    }
    setDbLoading(true);
    getByProvince(p)
      .then(setChurchRows)
      .catch((e) => showToast(e.message, 'error'))
      .finally(() => setDbLoading(false));
  }, [showToast]);

  const pendingCount = useMemo(
    () => requests.filter((r) => r.status === 'pending').length,
    [requests]
  );

  const totalChurchesCount = useMemo(
    () => dioceses.reduce((acc, b) => acc + (b.count || 0), 0),
    [dioceses]
  );

  // Filtered requests
  const filteredRequests = useMemo(() => {
    let list = requests;
    if (requestFilter !== 'all') {
      list = list.filter((r) => r.status === requestFilter);
    }
    if (requestSearch.trim()) {
      const q = removeAccents(requestSearch.trim());
      list = list.filter(
        (r) =>
          removeAccents(r.parish).includes(q) ||
          removeAccents(r.address || '').includes(q) ||
          removeAccents(r.diocese || '').includes(q) ||
          removeAccents(r.contactName || '').includes(q)
      );
    }
    return list;
  }, [requests, requestFilter, requestSearch]);

  // Filtered churches
  const filteredChurches = useMemo(() => {
    if (!churchSearch.trim()) return churchRows;
    const q = removeAccents(churchSearch.trim());
    return churchRows.filter(
      (c) =>
        removeAccents(c.parish).includes(q) ||
        removeAccents(c.address || '').includes(q) ||
        removeAccents(c.deanery || '').includes(q)
    );
  }, [churchRows, churchSearch]);

  // ==========================================
  // HANDLERS: FEEDBACK ACTIONS
  // ==========================================
  const handleStartEditFeedback = (item: MassTimeFeedback) => {
    setEditingFeedbackId(item.id);
    setFeedbackDraft({ ...item });
    setFbWeekdayStr((item.weekdayMass || []).join(', '));
    setFbSatStr((item.saturdayMass || []).join(', '));
    setFbSunStr((item.sundayMass || []).join(', '));
  };

  const handleApproveFeedback = async (item: MassTimeFeedback) => {
    if (!confirm(`Xác nhận duyệt và cập nhật giờ lễ cho giáo xứ "${item.parish}"?`)) return;

    setBusyRequestId(item.id);
    try {
      const isEditing = editingFeedbackId === item.id;
      const dataToApply = isEditing
        ? {
            ...item,
            ...feedbackDraft,
            weekdayMass: parseTimes(fbWeekdayStr),
            saturdayMass: parseTimes(fbSatStr),
            sundayMass: parseTimes(fbSunStr)
          }
        : item;

      await approveMassTimeFeedback(
        item.id,
        dataToApply,
        user?.displayName || user?.email || 'Admin'
      );

      setEditingFeedbackId(null);
      showToast(`Đã duyệt và cập nhật thành công cho "${item.parish}"!`, 'success');
      loadFacets();
      if (selectedDiocese) loadChurchesByDiocese(selectedDiocese);
    } catch (err: unknown) {
      console.error(err);
      showToast(err instanceof Error ? err.message : 'Lỗi khi duyệt', 'error');
    } finally {
      setBusyRequestId(null);
    }
  };

  const handleRejectFeedback = async (item: MassTimeFeedback) => {
    const reason = prompt('Nhập lý do từ chối (tuỳ chọn):', '') ?? undefined;
    if (reason === undefined) return;

    setBusyRequestId(item.id);
    try {
      await rejectMassTimeFeedback(item.id, reason, user?.displayName || user?.email || 'Admin');
      showToast(`Đã từ chối yêu cầu của "${item.parish}".`, 'info');
    } catch (err: unknown) {
      console.error(err);
      showToast(err instanceof Error ? err.message : 'Lỗi khi từ chối', 'error');
    } finally {
      setBusyRequestId(null);
    }
  };

  const handleDeleteFeedback = async (item: MassTimeFeedback) => {
    if (!confirm(`Xoá vĩnh viễn yêu cầu của "${item.parish}"?`)) return;
    setBusyRequestId(item.id);
    try {
      await deleteMassTimeFeedback(item.id);
      showToast('Đã xoá yêu cầu thành công.', 'info');
    } catch (err: unknown) {
      console.error(err);
      showToast(err instanceof Error ? err.message : 'Lỗi khi xoá', 'error');
    } finally {
      setBusyRequestId(null);
    }
  };

  // ==========================================
  // HANDLERS: DATABASE CHURCH ACTIONS
  // ==========================================
  const handleOpenAddChurch = () => {
    setChurchDraft({
      ...EMPTY_DRAFT,
      diocese: selectedDiocese || '',
      province: selectedProvince || ''
    });
    setDraftWeekdayStr('');
    setDraftSatStr('');
    setDraftSunStr('');
    setChurchDraftOpen(true);
  };

  const handleOpenEditChurch = (church: MassTime) => {
    setChurchDraft({ ...church });
    setDraftWeekdayStr((church.weekdayMass || []).join(', '));
    setDraftSatStr((church.saturdayMass || []).join(', '));
    setDraftSunStr((church.sundayMass || []).join(', '));
    setChurchDraftOpen(true);
  };

  const handleSaveChurch = async () => {
    if (!churchDraft) return;
    if (!churchDraft.parish.trim() || !churchDraft.province.trim()) {
      showToast('Vui lòng nhập Tên nhà thờ và Tỉnh / Thành.', 'error');
      return;
    }

    setDbBusy('saving');
    try {
      const payload = {
        ...churchDraft,
        parish: churchDraft.parish.trim(),
        diocese: (churchDraft.diocese || '').trim(),
        deanery: (churchDraft.deanery || '').trim(),
        province: churchDraft.province.trim(),
        address: (churchDraft.address || '').trim(),
        weekdayMass: parseTimes(draftWeekdayStr),
        saturdayMass: parseTimes(draftSatStr),
        sundayMass: parseTimes(draftSunStr),
        byDay: null
      };

      if (churchDraft.id) {
        await updateMass(churchDraft.id, payload);
        showToast(`Đã cập nhật "${payload.parish}"!`, 'success');
      } else {
        await createMass(payload);
        showToast(`Đã thêm mới "${payload.parish}"!`, 'success');
      }

      await refreshFacets();
      setChurchDraftOpen(false);
      setChurchDraft(null);
      loadFacets();
      if (selectedDiocese) loadChurchesByDiocese(selectedDiocese);
      else if (selectedProvince) loadChurchesByProvince(selectedProvince);
    } catch (err: unknown) {
      console.error(err);
      showToast(err instanceof Error ? err.message : 'Lỗi khi lưu', 'error');
    } finally {
      setDbBusy(null);
    }
  };

  const handleDeleteChurch = async (church: MassTime) => {
    if (!confirm(`Xoá vĩnh viễn nhà thờ "${church.parish}" khỏi hệ thống? Thao tác này không thể hoàn tác.`)) return;

    setDbBusy(church.id);
    try {
      await deleteMass(church.id);
      await refreshFacets();
      showToast(`Đã xoá "${church.parish}".`, 'info');
      loadFacets();
      if (selectedDiocese) loadChurchesByDiocese(selectedDiocese);
      else if (selectedProvince) loadChurchesByProvince(selectedProvince);
    } catch (err: unknown) {
      console.error(err);
      showToast(err instanceof Error ? err.message : 'Lỗi khi xoá', 'error');
    } finally {
      setDbBusy(null);
    }
  };

  const handleRefreshAllFacets = async () => {
    setDbBusy('facets');
    try {
      await refreshFacets();
      loadFacets();
      showToast('Đã tính toán và đồng bộ lại thống kê số lượng nhà thờ!', 'success');
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Lỗi tính toán', 'error');
    } finally {
      setDbBusy(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* =========================================================================
          FLOATING DYNAMIC TOAST (LIQUID GLASS IOS27)
          ========================================================================= */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 999999,
            background: toast.type === 'error'
              ? 'rgba(239, 68, 68, 0.95)'
              : toast.type === 'info'
              ? 'rgba(31, 41, 55, 0.95)'
              : 'rgba(16, 185, 129, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: '#FFFFFF',
            padding: '12px 22px',
            borderRadius: '999px',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
            animation: 'slideUpCenter 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            maxWidth: '90vw'
          }}
        >
          {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* =========================================================================
          SMART PENDING ALERT BANNER (IF PENDING REQUESTS EXIST)
          ========================================================================= */}
      {pendingCount > 0 && subView !== 'requests' && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(245, 158, 11, 0.12) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '20px',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.12)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              backgroundColor: '#EF4444', color: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 12px rgba(239, 68, 68, 0.5)'
            }}>
              <Inbox size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: 'var(--color-dark)', fontSize: '0.95rem' }}>
                Có <span style={{ color: '#EF4444' }}>{pendingCount}</span> yêu cầu đóng góp giờ lễ mới đang chờ duyệt!
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                Cộng đồng giáo dân đã gửi góp ý và báo sai giờ lễ nhà thờ.
              </div>
            </div>
          </div>

          <button
            onClick={() => setSubView('requests')}
            style={{
              padding: '8px 18px',
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              borderRadius: '999px',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0
            }}
          >
            <CheckSquare size={15} /> Xem & Duyệt Ngay
          </button>
        </div>
      )}

      {/* =========================================================================
          LIQUID GLASS IOS27 SEGMENTED CONTROL (SUB-TABS)
          ========================================================================= */}
      <div
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '6px',
          borderRadius: '20px',
          border: '1px solid var(--glass-border)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: 'var(--glass-shadow)',
          alignSelf: 'flex-start',
          maxWidth: '100%',
          overflowX: 'auto'
        }}
      >
        {/* Tab 1: Yêu Cầu Duyệt */}
        <button
          onClick={() => setSubView('requests')}
          style={{
            padding: '10px 20px',
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 800,
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.25s ease',
            backgroundColor: subView === 'requests' ? 'var(--color-red)' : 'transparent',
            color: subView === 'requests' ? '#FFFFFF' : 'var(--color-dark)',
            boxShadow: subView === 'requests' ? '0 4px 14px rgba(211, 47, 47, 0.35)' : 'none'
          }}
        >
          <Inbox size={17} />
          <span>Yêu Cầu Duyệt & Đóng Góp</span>
          {pendingCount > 0 && (
            <span
              style={{
                backgroundColor: subView === 'requests' ? '#FFFFFF' : '#EF4444',
                color: subView === 'requests' ? '#DC2626' : '#FFFFFF',
                padding: '2px 7px',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 900
              }}
            >
              {pendingCount}
            </span>
          )}
        </button>

        {/* Tab 2: 3.300+ Nhà Thờ & Giờ Lễ */}
        <button
          onClick={() => setSubView('database')}
          style={{
            padding: '10px 20px',
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 800,
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.25s ease',
            backgroundColor: subView === 'database' ? 'var(--color-red)' : 'transparent',
            color: subView === 'database' ? '#FFFFFF' : 'var(--color-dark)',
            boxShadow: subView === 'database' ? '0 4px 14px rgba(211, 47, 47, 0.35)' : 'none'
          }}
        >
          <Church size={17} />
          <span>Danh Sách Nhà Thờ</span>
          <span
            style={{
              backgroundColor: subView === 'database' ? 'rgba(255,255,255,0.25)' : 'var(--color-btn-subtle-bg)',
              color: subView === 'database' ? '#FFFFFF' : 'var(--color-dark)',
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 800
            }}
          >
            {totalChurchesCount > 0 ? totalChurchesCount.toLocaleString('vi-VN') : '3.300+'}
          </span>
        </button>

        {/* Tab 3: Thống Kê & Đồng Bộ */}
        <button
          onClick={() => setSubView('stats')}
          style={{
            padding: '10px 20px',
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 800,
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.25s ease',
            backgroundColor: subView === 'stats' ? 'var(--color-red)' : 'transparent',
            color: subView === 'stats' ? '#FFFFFF' : 'var(--color-dark)',
            boxShadow: subView === 'stats' ? '0 4px 14px rgba(211, 47, 47, 0.35)' : 'none'
          }}
        >
          <BarChart3 size={17} />
          <span>Thống Kê & Đồng Bộ</span>
        </button>
      </div>

      {/* =========================================================================
          SUB-VIEW 1: YÊU CẦU DUYỆT & ĐÓNG GÓP (COMMUNITY REQUESTS)
          ========================================================================= */}
      {subView === 'requests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Filter Bar */}
          <div
            className="liquid-glass"
            style={{
              padding: '14px 18px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            {/* Status Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(['pending', 'approved', 'rejected', 'all'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setRequestFilter(st)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid var(--color-border-subtle)',
                    backgroundColor: requestFilter === st ? 'var(--color-dark)' : 'var(--color-input-bg)',
                    color: requestFilter === st ? 'var(--background)' : 'var(--color-dark)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {st === 'pending' && `Chờ duyệt (${pendingCount})`}
                  {st === 'approved' && 'Đã duyệt'}
                  {st === 'rejected' && 'Đã từ chối'}
                  {st === 'all' && `Tất cả (${requests.length})`}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div style={{ position: 'relative', minWidth: '240px', flex: '1 1 200px', maxWidth: '350px' }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input
                type="text"
                placeholder="Tìm theo giáo xứ, địa chỉ, người gửi..."
                value={requestSearch}
                onChange={(e) => setRequestSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-input-border)',
                  backgroundColor: 'var(--color-input-bg)',
                  fontSize: '0.85rem',
                  color: 'var(--color-dark)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Request Items List */}
          {requestsLoading ? (
            <div style={{ textAlign: 'center', padding: '50px', color: 'var(--color-subtle)' }}>
              <Loader2 size={32} className="spin" style={{ margin: '0 auto 12px' }} />
              <div>Đang tải danh sách yêu cầu đóng góp...</div>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div
              className="liquid-glass"
              style={{
                padding: '48px 20px',
                textAlign: 'center',
                borderRadius: '20px',
                color: 'var(--color-subtle)'
              }}
            >
              <Inbox size={48} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
              <h3 style={{ color: 'var(--color-dark)', marginBottom: '4px' }}>Không có yêu cầu nào</h3>
              <p style={{ fontSize: '0.88rem', margin: 0 }}>
                {requestFilter === 'pending'
                  ? 'Hiện không có yêu cầu đóng góp nào đang chờ duyệt.'
                  : 'Không tìm thấy dữ liệu phù hợp với bộ lọc.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredRequests.map((req) => {
                const isBusy = busyRequestId === req.id;
                const isEditing = editingFeedbackId === req.id;

                return (
                  <div
                    key={req.id}
                    className="liquid-glass"
                    style={{
                      padding: '22px',
                      borderRadius: '22px',
                      borderLeft: `5px solid ${
                        req.status === 'approved' ? '#10B981' : req.status === 'rejected' ? '#EF4444' : '#F59E0B'
                      }`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      opacity: isBusy ? 0.6 : 1,
                      position: 'relative'
                    }}
                  >
                    {/* Header of Item */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            backgroundColor: req.type === 'suggest_new' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                            color: req.type === 'suggest_new' ? '#059669' : '#2563EB'
                          }}
                        >
                          {req.type === 'suggest_new'
                            ? <><Plus size={12} strokeWidth={3} style={{ verticalAlign: '-2px', marginRight: '3px' }} />Đóng Góp Mới</>
                            : <><Pencil size={12} strokeWidth={2.5} style={{ verticalAlign: '-2px', marginRight: '3px' }} />Báo Sai / Cập Nhật</>}
                        </span>

                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: 'var(--color-dark)' }}>
                          {req.parish}
                        </h3>

                        {req.diocese && (
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-red)' }}>
                            • GP {dioceseLabel(req.diocese)}
                          </span>
                        )}
                        {req.deanery && (
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-subtle)' }}>
                            ({req.deanery})
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            padding: '3px 10px',
                            borderRadius: '999px',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            backgroundColor:
                              req.status === 'approved'
                                ? 'rgba(16, 185, 129, 0.15)'
                                : req.status === 'rejected'
                                ? 'rgba(239, 68, 68, 0.15)'
                                : 'rgba(245, 158, 11, 0.15)',
                            color:
                              req.status === 'approved'
                                ? '#059669'
                                : req.status === 'rejected'
                                ? '#DC2626'
                                : '#D97706'
                          }}
                        >
                          {req.status === 'approved'
                            ? <><Check size={12} strokeWidth={3} style={{ verticalAlign: '-2px', marginRight: '3px' }} />Đã Duyệt</>
                            : req.status === 'rejected'
                              ? <><X size={12} strokeWidth={3} style={{ verticalAlign: '-2px', marginRight: '3px' }} />Đã Từ Chối</>
                              : <><Clock size={12} strokeWidth={2.5} style={{ verticalAlign: '-2px', marginRight: '3px' }} />Chờ Duyệt</>}
                        </span>

                        <span style={{ fontSize: '0.78rem', color: 'var(--color-subtle)' }}>
                          {req.createdAt?.toDate().toLocaleString('vi-VN')}
                        </span>
                      </div>
                    </div>

                    {/* Address info */}
                    {req.address && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: 'var(--color-dark)' }}>
                        <MapPin size={15} color="#d32f2f" style={{ flexShrink: 0 }} />
                        <span>{req.address} {req.province ? `(${req.province})` : ''}</span>
                      </div>
                    )}

                    {/* Mass Times Comparison / Schedule View */}
                    {!isEditing ? (
                      <div
                        style={{
                          background: 'var(--color-input-bg)',
                          padding: '14px 16px',
                          borderRadius: '14px',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                          gap: '12px',
                          border: '1px solid var(--color-border-subtle)'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-red)', textTransform: 'uppercase', marginBottom: '4px' }}>
                            Chúa Nhật
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {req.sundayMass && req.sundayMass.length > 0 ? (
                              req.sundayMass.map((t) => (
                                <span key={t} style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: 'rgba(211, 47, 47, 0.15)', color: 'var(--color-red)', fontWeight: 800, fontSize: '0.85rem' }}>
                                  {t}
                                </span>
                              ))
                            ) : (
                              <span style={{ fontSize: '0.82rem', color: 'var(--color-subtle)' }}>Trống</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', marginBottom: '4px' }}>
                            Thứ Bảy (Lễ Vọng)
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {req.saturdayMass && req.saturdayMass.length > 0 ? (
                              req.saturdayMass.map((t) => (
                                <span key={t} style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706', fontWeight: 800, fontSize: '0.85rem' }}>
                                  {t}
                                </span>
                              ))
                            ) : (
                              <span style={{ fontSize: '0.82rem', color: 'var(--color-subtle)' }}>Trống</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', marginBottom: '4px' }}>
                            Ngày Thường
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {req.weekdayMass && req.weekdayMass.length > 0 ? (
                              req.weekdayMass.map((t) => (
                                <span key={t} style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#2563EB', fontWeight: 800, fontSize: '0.85rem' }}>
                                  {t}
                                </span>
                              ))
                            ) : (
                              <span style={{ fontSize: '0.82rem', color: 'var(--color-subtle)' }}>Trống</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* INLINE EDIT MODE BEFORE APPROVAL */
                      <div
                        style={{
                          background: 'var(--color-input-bg)',
                          padding: '16px',
                          borderRadius: '16px',
                          border: '2px solid var(--color-red)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px'
                        }}
                      >
                        <div style={{ fontWeight: 800, color: 'var(--color-red)', fontSize: '0.9rem' }}>
                          <Pencil size={13} strokeWidth={2} style={{ verticalAlign: '-2px', marginRight: '5px' }} />Chỉnh sửa giờ lễ trước khi duyệt:
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                          <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Chúa Nhật (cách nhau dấu phẩy):</label>
                            <input
                              type="text"
                              value={fbSunStr}
                              onChange={(e) => setFbSunStr(e.target.value)}
                              placeholder="05:00, 07:00, 17:30"
                              style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', marginTop: '4px' }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Thứ Bảy (Lễ Vọng):</label>
                            <input
                              type="text"
                              value={fbSatStr}
                              onChange={(e) => setFbSatStr(e.target.value)}
                              placeholder="17:30"
                              style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', marginTop: '4px' }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Ngày thường:</label>
                            <input
                              type="text"
                              value={fbWeekdayStr}
                              onChange={(e) => setFbWeekdayStr(e.target.value)}
                              placeholder="05:00, 17:30"
                              style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', marginTop: '4px' }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Note & Sender details */}
                    {(req.note || req.contactName || req.contactPhone) && (
                      <div style={{ fontSize: '0.84rem', color: 'var(--color-subtle)', display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                        {req.note && <div><StickyNote size={13} strokeWidth={2} style={{ verticalAlign: '-2px', marginRight: '5px' }} /><strong>Ghi chú:</strong> {req.note}</div>}
                        {req.contactName && <div><User size={13} strokeWidth={2} style={{ verticalAlign: '-2px', marginRight: '5px' }} /><strong>Người gửi:</strong> {req.contactName}</div>}
                        {req.contactPhone && <div><Phone size={13} strokeWidth={2} style={{ verticalAlign: '-2px', marginRight: '5px' }} /><strong>SĐT:</strong> {req.contactPhone}</div>}
                      </div>
                    )}

                    {/* Action Buttons Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--color-border-subtle)' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {req.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveFeedback(req)}
                              disabled={isBusy}
                              style={{
                                padding: '7px 16px',
                                background: 'linear-gradient(135deg, #059669, #10B981)',
                                color: '#FFFFFF',
                                borderRadius: '10px',
                                fontSize: '0.84rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                border: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)'
                              }}
                            >
                              <CheckCircle size={14} /> Duyệt & Áp Dụng Ngay
                            </button>

                            {!isEditing ? (
                              <button
                                onClick={() => handleStartEditFeedback(req)}
                                style={{
                                  padding: '7px 12px',
                                  backgroundColor: 'var(--color-btn-subtle-bg)',
                                  color: 'var(--color-dark)',
                                  borderRadius: '10px',
                                  fontSize: '0.84rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  border: '1px solid var(--color-border-subtle)',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <Edit3 size={13} /> Sửa
                              </button>
                            ) : (
                              <button
                                onClick={() => setEditingFeedbackId(null)}
                                style={{
                                  padding: '7px 12px',
                                  backgroundColor: '#E5E7EB',
                                  color: '#374151',
                                  borderRadius: '10px',
                                  fontSize: '0.84rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  border: 'none'
                                }}
                              >
                                Huỷ sửa
                              </button>
                            )}

                            <button
                              onClick={() => handleRejectFeedback(req)}
                              disabled={isBusy}
                              style={{
                                padding: '7px 12px',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                color: '#DC2626',
                                borderRadius: '10px',
                                fontSize: '0.84rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                border: '1px solid rgba(239, 68, 68, 0.2)'
                              }}
                            >
                              <XCircle size={13} /> Từ chối
                            </button>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteFeedback(req)}
                        disabled={isBusy}
                        style={{
                          padding: '6px 10px',
                          color: '#9CA3AF',
                          backgroundColor: 'transparent',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          border: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        title="Xoá vĩnh viễn"
                      >
                        <Trash2 size={13} /> Xoá
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SUB-VIEW 2: QUẢN LÝ 3.300+ NHÀ THỜ & GIỜ LỄ (FULL DATABASE CRUD)
          ========================================================================= */}
      {subView === 'database' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Top Control Bar */}
          <div
            className="liquid-glass"
            style={{
              padding: '16px 20px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            {/* Filter Selects */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flex: 1 }}>
              {/* Diocese Select */}
              <select
                value={selectedDiocese}
                onChange={(e) => {
                  setSelectedDiocese(e.target.value);
                  setSelectedProvince('');
                  loadChurchesByDiocese(e.target.value);
                }}
                style={{
                  padding: '9px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--color-input-border)',
                  backgroundColor: 'var(--color-input-bg)',
                  color: 'var(--color-dark)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  outline: 'none',
                  minWidth: '180px'
                }}
              >
                <option value="">-- Lọc theo Giáo Phận --</option>
                {dioceses.map((d) => (
                  <option key={d.name} value={d.name}>
                    {dioceseLabel(d.name)} ({d.count} NT)
                  </option>
                ))}
              </select>

              {/* Province Select */}
              <select
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e.target.value);
                  setSelectedDiocese('');
                  loadChurchesByProvince(e.target.value);
                }}
                style={{
                  padding: '9px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--color-input-border)',
                  backgroundColor: 'var(--color-input-bg)',
                  color: 'var(--color-dark)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  outline: 'none',
                  minWidth: '180px'
                }}
              >
                <option value="">-- Lọc theo Tỉnh / Thành --</option>
                {provinces.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name} ({p.count} NT)
                  </option>
                ))}
              </select>

              {/* Search Box */}
              <div style={{ position: 'relative', minWidth: '200px', flex: 1 }}>
                <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                <input
                  type="text"
                  placeholder="Tìm giáo xứ, địa chỉ..."
                  value={churchSearch}
                  onChange={(e) => setChurchSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 34px',
                    borderRadius: '12px',
                    border: '1px solid var(--color-input-border)',
                    backgroundColor: 'var(--color-input-bg)',
                    fontSize: '0.88rem',
                    color: 'var(--color-dark)',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Add Church Button */}
            <button
              onClick={handleOpenAddChurch}
              style={{
                padding: '9px 18px',
                background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
                color: '#FFFFFF',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(211, 47, 47, 0.35)',
                flexShrink: 0
              }}
            >
              <Plus size={16} /> Thêm Nhà Thờ Mới
            </button>
          </div>

          {/* Church Table & List */}
          {dbLoading ? (
            <div style={{ textAlign: 'center', padding: '50px', color: 'var(--color-subtle)' }}>
              <Loader2 size={32} className="spin" style={{ margin: '0 auto 12px' }} />
              <div>Đang tải dữ liệu nhà thờ từ Firestore...</div>
            </div>
          ) : !selectedDiocese && !selectedProvince ? (
            <div
              className="liquid-glass"
              style={{
                padding: '40px 20px',
                textAlign: 'center',
                borderRadius: '20px'
              }}
            >
              <Church size={44} style={{ margin: '0 auto 12px', opacity: 0.4, color: 'var(--color-red)' }} />
              <h3 style={{ color: 'var(--color-dark)', marginBottom: '6px' }}>Chọn Giáo Phận hoặc Tỉnh/Thành</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-subtle)', maxWidth: '460px', margin: '0 auto 18px' }}>
                Hệ thống lưu trữ hơn 3.300 giáo xứ toàn quốc. Vui lòng chọn một Giáo phận để tải nhanh danh sách.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '600px', margin: '0 auto' }}>
                {dioceses.slice(0, 10).map((d) => (
                  <button
                    key={d.name}
                    onClick={() => {
                      setSelectedDiocese(d.name);
                      loadChurchesByDiocese(d.name);
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '999px',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'var(--color-input-bg)',
                      color: 'var(--color-dark)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {dioceseLabel(d.name)} ({d.count})
                  </button>
                ))}
              </div>
            </div>
          ) : filteredChurches.length === 0 ? (
            <div className="liquid-glass" style={{ padding: '36px', textAlign: 'center', borderRadius: '20px', color: 'var(--color-subtle)' }}>
              Không tìm thấy nhà thờ nào phù hợp.
            </div>
          ) : (
            <div className="liquid-glass" style={{ borderRadius: '20px', overflow: 'hidden', padding: '6px' }}>
              <div style={{ padding: '12px 16px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-dark)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Hiển thị {filteredChurches.length} nhà thờ</span>
                {selectedDiocese && <span>Giáo phận {dioceseLabel(selectedDiocese)}</span>}
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-input-bg)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800, color: 'var(--color-dark)' }}>Giáo Xứ</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800, color: 'var(--color-dark)' }}>Địa Chỉ</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800, color: 'var(--color-red)' }}>Chúa Nhật</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800, color: '#2563EB' }}>Ngày Thường</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 800, color: 'var(--color-dark)' }}>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredChurches.map((ch, idx) => (
                      <tr
                        key={ch.id}
                        style={{
                          borderBottom: '1px solid var(--color-border-subtle)',
                          backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)'
                        }}
                      >
                        <td style={{ padding: '12px 14px', fontWeight: 800, color: 'var(--color-dark)' }}>
                          <div>{ch.parish}</div>
                          {ch.deanery && <span style={{ fontSize: '0.75rem', color: 'var(--color-subtle)', fontWeight: 600 }}>Hạt {ch.deanery}</span>}
                        </td>
                        <td style={{ padding: '12px 14px', color: 'var(--color-subtle)', maxWidth: '240px' }}>
                          {ch.address || '—'}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {ch.sundayMass && ch.sundayMass.length > 0 ? (
                              ch.sundayMass.map((t) => (
                                <span key={t} style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(211, 47, 47, 0.12)', color: 'var(--color-red)', fontWeight: 800, fontSize: '0.8rem' }}>
                                  {t}
                                </span>
                              ))
                            ) : (
                              <span style={{ color: 'var(--color-subtle)', fontSize: '0.8rem' }}>—</span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {ch.weekdayMass && ch.weekdayMass.length > 0 ? (
                              ch.weekdayMass.map((t) => (
                                <span key={t} style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(59, 130, 246, 0.12)', color: '#2563EB', fontWeight: 700, fontSize: '0.8rem' }}>
                                  {t}
                                </span>
                              ))
                            ) : (
                              <span style={{ color: 'var(--color-subtle)', fontSize: '0.8rem' }}>—</span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            <a
                              href={`/gio-le/${ch.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                padding: '5px 8px',
                                backgroundColor: 'var(--color-input-bg)',
                                color: 'var(--color-dark)',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                border: '1px solid var(--color-border-subtle)'
                              }}
                              title="Xem Thẻ Giờ Lễ công khai"
                            >
                              <ExternalLink size={12} /> Xem
                            </a>

                            <button
                              onClick={() => handleOpenEditChurch(ch)}
                              style={{
                                padding: '5px 8px',
                                backgroundColor: 'var(--color-btn-subtle-bg)',
                                color: 'var(--color-dark)',
                                borderRadius: '8px',
                                border: '1px solid var(--color-border-subtle)',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                fontSize: '0.78rem',
                                fontWeight: 700
                              }}
                              title="Sửa thông tin"
                            >
                              <Pencil size={12} /> Sửa
                            </button>

                            <button
                              onClick={() => handleDeleteChurch(ch)}
                              style={{
                                padding: '5px 8px',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                color: '#DC2626',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}
                              title="Xoá nhà thờ"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SUB-VIEW 3: THỐNG KÊ & ĐỒNG BỘ DỮ LIỆU (STATS & RETALLY)
          ========================================================================= */}
      {subView === 'stats' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Overall Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div className="liquid-glass" style={{ padding: '22px', borderRadius: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-subtle)', textTransform: 'uppercase' }}>Tổng Số Nhà Thờ</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-red)', margin: '6px 0' }}>
                {totalChurchesCount.toLocaleString('vi-VN')}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)' }}>Đã đồng bộ trên Firestore</div>
            </div>

            <div className="liquid-glass" style={{ padding: '22px', borderRadius: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-subtle)', textTransform: 'uppercase' }}>Số Giáo Phận</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#2563EB', margin: '6px 0' }}>
                {dioceses.length} / 27
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)' }}>Trải khắp 3 Giáo tỉnh</div>
            </div>

            <div className="liquid-glass" style={{ padding: '22px', borderRadius: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-subtle)', textTransform: 'uppercase' }}>Tỉnh / Thành Phố</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#059669', margin: '6px 0' }}>
                {provinces.length}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)' }}>Toàn quốc</div>
            </div>
          </div>

          {/* Sync & Re-tally Actions */}
          <div
            className="liquid-glass"
            style={{
              padding: '22px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px'
            }}
          >
            <div>
              <h3 style={{ margin: 0, color: 'var(--color-dark)', fontSize: '1.05rem', fontWeight: 800 }}>
                <RefreshCw size={13} strokeWidth={2} style={{ verticalAlign: '-2px', marginRight: '5px' }} />Tính Lại Thống Kê Số Lượng (Re-tally Facets)
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-subtle)' }}>
                Quét lại toàn bộ 3.300+ document trên Firestore để cập nhật chính xác số lượng nhà thờ theo từng Giáo phận và Tỉnh/Thành.
              </p>
            </div>

            <button
              onClick={handleRefreshAllFacets}
              disabled={dbBusy === 'facets'}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
                color: '#FFFFFF',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(211, 47, 47, 0.35)'
              }}
            >
              <RefreshCw size={16} className={dbBusy === 'facets' ? 'spin' : ''} />
              <span>{dbBusy === 'facets' ? 'Đang tính toán...' : 'Chạy Tính Lại Thống Kê'}</span>
            </button>
          </div>

          {/* Dioceses Grid */}
          <div className="liquid-glass" style={{ padding: '22px', borderRadius: '20px' }}>
            <h3 style={{ margin: '0 0 16px', color: 'var(--color-dark)', fontSize: '1.05rem', fontWeight: 800 }}>
              <Church size={13} strokeWidth={2} style={{ verticalAlign: '-2px', marginRight: '5px' }} />Phân Bố Nhà Thờ Theo 27 Giáo Phận
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
              {dioceses.map((d) => (
                <div
                  key={d.name}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-input-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-dark)' }}>
                    {dioceseLabel(d.name)}
                  </span>
                  <span style={{ fontWeight: 900, color: 'var(--color-red)', fontSize: '0.9rem' }}>
                    {d.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: THÊM / SỬA NHÀ THỜ (CHURCH DRAFT MODAL)
          ========================================================================= */}
      {churchDraftOpen && churchDraft && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '16px'
          }}
          onClick={() => setChurchDraftOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
              padding: '26px 24px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(211, 47, 47, 0.12)', color: 'var(--color-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Church size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#111827' }}>
                    {churchDraft.id ? 'Sửa Thông Tin Nhà Thờ' : 'Thêm Nhà Thờ Mới'}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                    {churchDraft.id ? `ID: ${churchDraft.id}` : 'Nhập thông tin để thêm vào cơ sở dữ liệu'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setChurchDraftOpen(false)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', backgroundColor: '#F3F4F6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4B5563' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                  Tên Giáo Xứ / Nhà Thờ *
                </label>
                <input
                  type="text"
                  value={churchDraft.parish}
                  onChange={(e) => setChurchDraft({ ...churchDraft, parish: e.target.value })}
                  placeholder="VD: Giáo xứ Chánh Tòa Mỹ Tho"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.92rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                    Giáo Phận
                  </label>
                  <select
                    value={churchDraft.diocese}
                    onChange={(e) => setChurchDraft({ ...churchDraft, diocese: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  >
                    <option value="">-- Chọn Giáo Phận --</option>
                    {ALL_DIOCESES.map((d) => (
                      <option key={d} value={d}>{dioceseLabel(d)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                    Giáo Hạt
                  </label>
                  <input
                    type="text"
                    value={churchDraft.deanery || ''}
                    onChange={(e) => setChurchDraft({ ...churchDraft, deanery: e.target.value })}
                    placeholder="VD: Mỹ Tho"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                    Tỉnh / Thành Phố *
                  </label>
                  <input
                    type="text"
                    value={churchDraft.province}
                    onChange={(e) => setChurchDraft({ ...churchDraft, province: e.target.value })}
                    placeholder="VD: Tiền Giang, TP. Hồ Chí Minh..."
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                    Địa Chỉ Chi Tiết
                  </label>
                  <input
                    type="text"
                    value={churchDraft.address || ''}
                    onChange={(e) => setChurchDraft({ ...churchDraft, address: e.target.value })}
                    placeholder="VD: 32 Hùng Vương..."
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              {/* Mass Times Inputs */}
              <div style={{ padding: '14px', backgroundColor: '#F9FAFB', borderRadius: '14px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#111827', textTransform: 'uppercase' }}>
                  <Clock size={13} strokeWidth={2} style={{ verticalAlign: '-2px', marginRight: '5px' }} />Lịch Giờ Thánh Lễ (Cách nhau bằng dấu phẩy)
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#DC2626', marginBottom: '2px' }}>
                    Chúa Nhật:
                  </label>
                  <input
                    type="text"
                    value={draftSunStr}
                    onChange={(e) => setDraftSunStr(e.target.value)}
                    placeholder="VD: 05:00, 07:00, 17:30, 19:00"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#D97706', marginBottom: '2px' }}>
                    Chiều Thứ Bảy (Lễ Vọng):
                  </label>
                  <input
                    type="text"
                    value={draftSatStr}
                    onChange={(e) => setDraftSatStr(e.target.value)}
                    placeholder="VD: 17:30"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#2563EB', marginBottom: '2px' }}>
                    Ngày Thường (Thứ Hai – Thứ Bảy):
                  </label>
                  <input
                    type="text"
                    value={draftWeekdayStr}
                    onChange={(e) => setDraftWeekdayStr(e.target.value)}
                    placeholder="VD: 05:00, 17:30"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={() => setChurchDraftOpen(false)}
                  style={{ padding: '10px 18px', backgroundColor: '#F3F4F6', color: '#4B5563', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', border: 'none' }}
                >
                  Huỷ
                </button>
                <button
                  onClick={handleSaveChurch}
                  disabled={dbBusy === 'saving'}
                  style={{
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(211, 47, 47, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {dbBusy === 'saving' ? <Loader2 size={16} className="spin" /> : <Check size={16} />}
                  <span>{churchDraft.id ? 'Cập Nhật Nhà Thờ' : 'Lưu Nhà Thờ Mới'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
