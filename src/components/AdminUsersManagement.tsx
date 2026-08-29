'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query
} from 'firebase/firestore';
import {
  useAuth,
  AdminUserDoc,
  AdminRole,
  ADMIN_ROLES_CONFIG,
  RoleConfig
} from '@/lib/AuthContext';
import {
  CheckCircle,
  Clock,
  Crown,
  Church,
  HelpCircle,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  Trash2,
  UserPlus,
  XCircle,
  ShieldCheck,
  Filter,
  Search
} from 'lucide-react';

const PRIMARY_HOST_EMAIL = 'notification2411.huynhdutruong@gmail.com';

const ROLE_ICONS: Record<string, React.ReactNode> = {
  super_admin: <Crown size={15} />,
  host: <Crown size={15} />,
  phung_vu: <Church size={15} />,
  giao_ly_faq: <HelpCircle size={15} />,
  truyen_thong: <FileText size={15} />,
  admin: <ShieldCheck size={15} />
};

export default function AdminUsersManagement() {
  const { user: currentUser } = useAuth();
  const [usersList, setUsersList] = useState<AdminUserDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form Thêm mới Admin
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<AdminRole>('phung_vu');
  const [adding, setAdding] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Filter & Search
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map(
          (d) =>
            ({
              email: d.id,
              ...d.data()
            } as AdminUserDoc)
        );
        setUsersList(docs);
        setLoading(false);
      },
      (err) => {
        console.error('Error listening to users collection:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  // 1. Thêm Admin trực tiếp bằng Email
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailClean = newEmail.trim().toLowerCase();
    if (!emailClean || !emailClean.includes('@')) {
      alert('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }

    setAdding(true);
    try {
      await setDoc(
        doc(db, 'users', emailClean),
        {
          email: emailClean,
          role: newRole,
          status: 'active',
          approvedAt: serverTimestamp(),
          approvedBy: currentUser?.email || 'Super Admin',
          createdAt: serverTimestamp()
        },
        { merge: true }
      );

      setNewEmail('');
      const roleCfg = ADMIN_ROLES_CONFIG[newRole];
      showSuccess(` Đã cấp quyền ${roleCfg?.label || newRole} thành công cho ${emailClean}!`);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert('Lỗi thêm admin: ' + msg);
    } finally {
      setAdding(false);
    }
  };

  // 2. Duyệt yêu cầu cấp quyền
  const handleApprove = async (targetEmail: string, roleToAssign: AdminRole) => {
    try {
      await updateDoc(doc(db, 'users', targetEmail.toLowerCase()), {
        status: 'active',
        role: roleToAssign,
        approvedAt: serverTimestamp(),
        approvedBy: currentUser?.email || 'Super Admin'
      });
      const roleCfg = ADMIN_ROLES_CONFIG[roleToAssign];
      showSuccess(` Đã duyệt quyền [${roleCfg?.shortLabel || roleToAssign}] cho ${targetEmail}!`);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert('Lỗi khi duyệt: ' + msg);
    }
  };

  // 3. Từ chối hoặc thu hồi quyền (Xoá)
  const handleRejectOrDelete = async (targetEmail: string) => {
    if (targetEmail.toLowerCase() === PRIMARY_HOST_EMAIL.toLowerCase()) {
      alert('Không thể thu hồi tài khoản Super Admin sáng lập!');
      return;
    }

    if (!confirm(`Bạn có chắc chắn muốn xoá / thu hồi quyền quản trị của ${targetEmail}?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', targetEmail.toLowerCase()));
      showSuccess(` Đã thu hồi quyền quản trị của ${targetEmail}.`);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert('Lỗi: ' + msg);
    }
  };

  // 4. Thay đổi vai trò cho Admin đang hoạt động
  const handleChangeRole = async (targetEmail: string, nextRole: AdminRole) => {
    if (targetEmail.toLowerCase() === PRIMARY_HOST_EMAIL.toLowerCase()) {
      alert('Không thể thay đổi vai trò của Super Admin sáng lập!');
      return;
    }

    try {
      await updateDoc(doc(db, 'users', targetEmail.toLowerCase()), {
        role: nextRole
      });
      const roleCfg = ADMIN_ROLES_CONFIG[nextRole];
      showSuccess(` Đã chuyển vai trò của ${targetEmail} thành [${roleCfg?.label || nextRole}].`);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert('Lỗi: ' + msg);
    }
  };

  const pendingUsers = usersList.filter((u) => u.status === 'pending');
  const activeUsers = usersList.filter(
    (u) => u.status === 'active' && u.email.toLowerCase() !== PRIMARY_HOST_EMAIL.toLowerCase()
  );

  // Filtered active users
  const filteredActiveUsers = activeUsers.filter((u) => {
    const matchRole =
      roleFilter === 'all' ||
      u.role === roleFilter ||
      (roleFilter === 'super_admin' && (u.role === 'host' || u.role === 'super_admin'));
    const matchSearch =
      !searchQuery.trim() ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.displayName && u.displayName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchRole && matchSearch;
  });

  if (loading) {
    return (
      <div
        style={{
          padding: '36px',
          textAlign: 'center',
          color: 'var(--color-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        <Loader2 className="spin" size={20} /> Đang tải danh sách Quản trị viên...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Toast Alert */}
      {successMsg && (
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: '#ECFDF5',
            border: '1px solid #10B981',
            borderRadius: '12px',
            color: '#065F46',
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle size={18} color="#10B981" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: '#FEE2E2',
            border: '1px solid #EF4444',
            borderRadius: '12px',
            color: '#B91C1C',
            fontWeight: 600
          }}
        >
          Lỗi: {error}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. BẢNG MÔ TẢ 4 VAI TRÒ / BAN NGÀNH QUẢN TRỊ */}
      {/* ========================================================================= */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '12px'
        }}
      >
        {Object.values(ADMIN_ROLES_CONFIG).map((r) => (
          <div
            key={r.id}
            style={{
              padding: '14px 16px',
              borderRadius: '14px',
              backgroundColor: 'var(--color-card-bg)',
              border: `1.5px solid ${r.badgeBorder}`,
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: r.badgeColor, fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>
              {ROLE_ICONS[r.id]}
              <span>{r.shortLabel}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--color-subtle)', lineHeight: 1.45 }}>
              {r.description}
            </p>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 2. FORM THÊM ADMIN MỚI VÀ GÁN VAI TRÒ */}
      {/* ========================================================================= */}
      <div
        style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '16px',
          padding: '20px 24px',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
              color: 'var(--color-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <UserPlus size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark)', margin: 0 }}>
              Cấp quyền Quản trị viên mới theo Ban Ngành
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-subtle)', margin: 0 }}>
              Thêm tài khoản Google và phân quyền trực tiếp vào Ban chuyên trách.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleAddAdmin}
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          <div style={{ flex: '1 1 260px', position: 'relative' }}>
            <Mail
              size={16}
              color="var(--color-subtle)"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="email"
              required
              placeholder="Nhập email Google (vd: huynh_truong@gmail.com)..."
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 36px',
                borderRadius: '10px',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-input-bg)',
                color: 'var(--color-dark)',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ minWidth: '220px' }}>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as AdminRole)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-dark)',
                fontSize: '0.88rem',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="super_admin">👑 Super Admin (Tổng Quản Trị)</option>
              <option value="phung_vu">⛪ Ban Quản Lý Phụng Vụ</option>
              <option value="giao_ly_faq">📖 Ban Giáo Lý &amp; Giải Đáp</option>
              <option value="truyen_thong">📰 Ban Truyền Thông &amp; Báo Chí</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={adding}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--color-red)',
              color: 'white',
              borderRadius: '10px',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: adding ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(211, 47, 47, 0.25)'
            }}
          >
            {adding ? <Loader2 size={16} className="spin" /> : <UserPlus size={16} />}
            <span>Thêm &amp; Cấp Quyền</span>
          </button>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* 3. DANH SÁCH YÊU CẦU ĐĂNG NHẬP CHỜ DUYỆT */}
      {/* ========================================================================= */}
      {pendingUsers.length > 0 && (
        <div
          style={{
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            borderRadius: '16px',
            padding: '20px 24px',
            border: '1.5px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.06)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B45309', fontWeight: 800, fontSize: '1rem' }}>
              <Clock size={20} />
              <span>Yêu cầu đăng nhập chờ duyệt ({pendingUsers.length})</span>
            </div>
            <span
              style={{
                backgroundColor: '#F59E0B',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 800
              }}
            >
              Realtime
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pendingUsers.map((u) => (
              <div
                key={u.email}
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#FEF3C7',
                        color: '#D97706',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800
                      }}
                    >
                      {u.displayName ? u.displayName.charAt(0) : u.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--color-dark)', fontSize: '0.92rem' }}>
                        {u.displayName || u.email}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)' }}>{u.email}</div>
                    </div>
                  </div>

                  {u.requestNote && (
                    <div style={{ marginTop: '6px', fontSize: '0.8rem', color: '#92400E', fontStyle: 'italic' }}>
                      <MessageSquare size={13} style={{ verticalAlign: '-2px', marginRight: '4px' }} />
                      Ghi chú: &quot;{u.requestNote}&quot;
                    </div>
                  )}
                </div>

                {/* Chọn ban ngành và duyệt */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleApprove(u.email, 'phung_vu')}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#D97706',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Church size={13} /> Duyệt Phụng Vụ
                  </button>

                  <button
                    onClick={() => handleApprove(u.email, 'giao_ly_faq')}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <HelpCircle size={13} /> Duyệt Giáo Lý &amp; FAQ
                  </button>

                  <button
                    onClick={() => handleApprove(u.email, 'truyen_thong')}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#2563EB',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <FileText size={13} /> Duyệt Truyền Thông
                  </button>

                  <button
                    onClick={() => handleApprove(u.email, 'super_admin')}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#DC2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Crown size={13} /> Super Admin
                  </button>

                  <button
                    onClick={() => handleRejectOrDelete(u.email)}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                      color: '#DC2626',
                      border: '1px solid rgba(220, 38, 38, 0.3)',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <XCircle size={13} /> Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. DANH SÁCH QUẢN TRỊ VIÊN ĐANG HOẠT ĐỘNG & BỘ LỌC ROLE */}
      {/* ========================================================================= */}
      <div
        style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '16px',
          border: '1px solid var(--color-border-subtle)',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark)', margin: 0 }}>
              Danh sách Quản trị viên đang hoạt động ({activeUsers.length + 1})
            </h3>
            <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--color-subtle)' }}>
              Phân quyền chi tiết theo 4 ban ngành Xứ Đoàn
            </p>
          </div>

          {/* Search & Filter by Role */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', minWidth: '180px' }}>
              <Search size={14} color="var(--color-subtle)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input
                type="text"
                placeholder="Tìm email, tên..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px 7px 30px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: 'var(--color-input-bg)',
                  color: 'var(--color-dark)',
                  fontSize: '0.82rem'
                }}
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{
                padding: '7px 12px',
                borderRadius: '8px',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-input-bg)',
                color: 'var(--color-dark)',
                fontSize: '0.82rem',
                fontWeight: 700
              }}
            >
              <option value="all">Tất cả ban ngành</option>
              <option value="super_admin">Super Admin</option>
              <option value="phung_vu">Ban Phụng Vụ</option>
              <option value="giao_ly_faq">Ban Giáo Lý &amp; FAQ</option>
              <option value="truyen_thong">Ban Truyền Thông</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Tài khoản Super Admin Sáng Lập (Primary) */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--color-border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(220, 38, 38, 0.03)',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(220, 38, 38, 0.15)',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900
                }}
              >
                <Crown size={18} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--color-dark)', fontSize: '0.92rem' }}>
                    {PRIMARY_HOST_EMAIL}
                  </span>
                  <span
                    style={{
                      backgroundColor: 'rgba(220, 38, 38, 0.15)',
                      color: '#DC2626',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      border: '1px solid rgba(220, 38, 38, 0.3)'
                    }}
                  >
                    👑 SUPER ADMIN SÁNG LẬP
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-subtle)' }}>
                  Toàn quyền hệ thống tối cao • Bảo vệ vĩnh viễn
                </div>
              </div>
            </div>

            <span style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', fontStyle: 'italic' }}>
              Không thể thu hồi
            </span>
          </div>

          {/* Các Quản trị viên khác */}
          {filteredActiveUsers.map((u) => {
            const roleKey = u.role === 'host' ? 'super_admin' : u.role === 'admin' ? 'phung_vu' : u.role;
            const rConfig = ADMIN_ROLES_CONFIG[roleKey] || ADMIN_ROLES_CONFIG.phung_vu;

            return (
              <div
                key={u.email}
                style={{
                  padding: '14px 20px',
                  borderBottom: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: rConfig.badgeBg,
                      color: rConfig.badgeColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800
                    }}
                  >
                    {ROLE_ICONS[roleKey]}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 800, color: 'var(--color-dark)', fontSize: '0.92rem' }}>
                        {u.displayName || u.email}
                      </span>
                      <span
                        style={{
                          backgroundColor: rConfig.badgeBg,
                          color: rConfig.badgeColor,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          border: `1px solid ${rConfig.badgeBorder}`
                        }}
                      >
                        {rConfig.shortLabel}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--color-subtle)' }}>{u.email}</div>
                  </div>
                </div>

                {/* Chuyển đổi vai trò & Thu hồi */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <select
                    value={roleKey}
                    onChange={(e) => handleChangeRole(u.email, e.target.value as AdminRole)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'var(--color-input-bg)',
                      color: 'var(--color-dark)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <option value="super_admin">👑 Super Admin</option>
                    <option value="phung_vu">⛪ Ban Phụng Vụ</option>
                    <option value="giao_ly_faq">📖 Ban Giáo Lý &amp; FAQ</option>
                    <option value="truyen_thong">📰 Ban Truyền Thông</option>
                  </select>

                  <button
                    onClick={() => handleRejectOrDelete(u.email)}
                    style={{
                      padding: '5px 8px',
                      backgroundColor: 'rgba(220, 38, 38, 0.08)',
                      color: '#DC2626',
                      border: '1px solid rgba(220, 38, 38, 0.25)',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Thu hồi quyền"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
