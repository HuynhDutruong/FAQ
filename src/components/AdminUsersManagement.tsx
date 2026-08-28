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
import { useAuth, AdminUserDoc } from '@/lib/AuthContext';
import {
  UserPlus,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  User as UserIcon,
  Crown,
  Loader2,
  Trash2
} from 'lucide-react';

const PRIMARY_HOST_EMAIL = 'notification2411.huynhdutruong@gmail.com';

export default function AdminUsersManagement() {
  const { user: currentUser } = useAuth();
  const [usersList, setUsersList] = useState<AdminUserDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form Thêm mới Admin
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'host'>('admin');
  const [adding, setAdding] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({
        email: d.id,
        ...d.data()
      } as AdminUserDoc));
      setUsersList(docs);
      setLoading(false);
    }, (err) => {
      console.error("Error listening to users collection:", err);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
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
      await setDoc(doc(db, 'users', emailClean), {
        email: emailClean,
        role: newRole,
        status: 'active',
        approvedAt: serverTimestamp(),
        approvedBy: currentUser?.email || 'Host',
        createdAt: serverTimestamp()
      }, { merge: true });

      setNewEmail('');
      showSuccess(` Đã cấp quyền ${newRole.toUpperCase()} thành công cho ${emailClean}!`);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert('Lỗi thêm admin: ' + msg);
    } finally {
      setAdding(false);
    }
  };

  // 2. Duyệt yêu cầu cấp quyền
  const handleApprove = async (targetEmail: string, roleToAssign: 'admin' | 'host') => {
    try {
      await updateDoc(doc(db, 'users', targetEmail.toLowerCase()), {
        status: 'active',
        role: roleToAssign,
        approvedAt: serverTimestamp(),
        approvedBy: currentUser?.email || 'Host'
      });
      showSuccess(` Đã duyệt quyền ${roleToAssign.toUpperCase()} cho ${targetEmail}!`);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert('Lỗi khi duyệt: ' + msg);
    }
  };

  // 3. Từ chối hoặc thu hồi quyền (Xoá)
  const handleRejectOrDelete = async (targetEmail: string) => {
    if (targetEmail.toLowerCase() === PRIMARY_HOST_EMAIL.toLowerCase()) {
      alert('Không thể thu hồi tài khoản Host sáng lập!');
      return;
    }

    if (!confirm(`Bạn có chắc chắn muốn xoá/thu hồi quyền của ${targetEmail}?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', targetEmail.toLowerCase()));
      showSuccess(`🗑️ Đã thu hồi quyền của ${targetEmail}.`);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert('Lỗi: ' + msg);
    }
  };

  // 4. Thay đổi vai trò (Host <-> Admin)
  const handleToggleRole = async (targetEmail: string, currentTargetRole: 'admin' | 'host') => {
    if (targetEmail.toLowerCase() === PRIMARY_HOST_EMAIL.toLowerCase()) {
      alert('Không thể thay đổi vai trò của Host sáng lập!');
      return;
    }

    const nextRole = currentTargetRole === 'admin' ? 'host' : 'admin';
    try {
      await updateDoc(doc(db, 'users', targetEmail.toLowerCase()), {
        role: nextRole
      });
      showSuccess(` Đã đổi vai trò của ${targetEmail} thành ${nextRole.toUpperCase()}.`);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert('Lỗi: ' + msg);
    }
  };

  const pendingUsers = usersList.filter(u => u.status === 'pending');
  const activeUsers = usersList.filter(u => u.status === 'active' && u.email.toLowerCase() !== PRIMARY_HOST_EMAIL.toLowerCase());

  if (loading) {
    return (
      <div style={{ padding: '36px', textAlign: 'center', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <Loader2 className="spin" size={20} /> Đang tải danh sách Quản trị viên...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Toast Alert */}
      {successMsg && (
        <div style={{
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
        }}>
          <CheckCircle size={18} color="#10B981" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div style={{
          padding: '12px 18px',
          backgroundColor: '#FEE2E2',
          border: '1px solid #EF4444',
          borderRadius: '12px',
          color: '#B91C1C',
          fontWeight: 600
        }}>
          Lỗi: {error}
        </div>
      )}

      {/* Form Thêm Admin Mới */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '20px 24px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: 'rgba(211, 47, 47, 0.1)', color: 'var(--color-red)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <UserPlus size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Cấp quyền Admin mới bằng Email
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0 }}>
              Thêm trực tiếp email tài khoản Google vào hệ thống mà không cần chỉnh sửa database.
            </p>
          </div>
        </div>

        <form onSubmit={handleAddAdmin} style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ flex: '1 1 260px', position: 'relative' }}>
            <Mail size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="email"
              required
              placeholder="Nhập email Google (vd: example@gmail.com)..."
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 36px',
                borderRadius: '10px',
                border: '1px solid #D1D5DB',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ minWidth: '130px' }}>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as 'admin' | 'host')}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #D1D5DB',
                fontSize: '0.9rem',
                backgroundColor: 'white',
                outline: 'none',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
            >
              <option value="admin">Vai trò: Admin</option>
              <option value="host">Vai trò: Host</option>
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
              fontSize: '0.9rem',
              cursor: adding ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(211, 47, 47, 0.25)'
            }}
          >
            {adding ? <Loader2 size={16} className="spin" /> : <UserPlus size={16} />}
            Thêm & Cấp quyền ngay
          </button>
        </form>
      </div>

      {/* Danh sách Yêu cầu chờ duyệt */}
      {pendingUsers.length > 0 && (
        <div style={{
          backgroundColor: '#FFFBEB',
          borderRadius: '16px',
          padding: '20px 24px',
          border: '1px solid #FCD34D',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B45309', fontWeight: 800, fontSize: '1rem' }}>
              <Clock size={20} />
              <span>Yêu cầu đăng nhập chờ duyệt ({pendingUsers.length})</span>
            </div>
            <span style={{
              backgroundColor: '#F59E0B', color: 'white', padding: '2px 8px', borderRadius: '999px',
              fontSize: '0.75rem', fontWeight: 800
            }}>
              Realtime
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pendingUsers.map(u => (
              <div key={u.email} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '14px 16px',
                border: '1px solid #FDE68A',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FEF3C7',
                      color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800
                    }}>
                      {u.displayName ? u.displayName.charAt(0) : u.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.92rem' }}>
                        {u.displayName || u.email}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                        {u.email}
                      </div>
                    </div>
                  </div>

                  {u.requestNote && (
                    <div style={{ marginTop: '6px', fontSize: '0.82rem', color: '#92400E', fontStyle: 'italic' }}>
                      💬 Ghi chú: &quot;{u.requestNote}&quot;
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handleApprove(u.email, 'admin')}
                    style={{
                      padding: '7px 12px',
                      backgroundColor: '#10B981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CheckCircle size={14} /> Duyệt Admin
                  </button>

                  <button
                    onClick={() => handleApprove(u.email, 'host')}
                    style={{
                      padding: '7px 12px',
                      backgroundColor: '#6366F1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Crown size={14} /> Duyệt Host
                  </button>

                  <button
                    onClick={() => handleRejectOrDelete(u.email)}
                    style={{
                      padding: '7px 12px',
                      backgroundColor: '#FEE2E2',
                      color: '#DC2626',
                      border: '1px solid #FCA5A5',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <XCircle size={14} /> Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Danh sách Admin đang hoạt động */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        border: '1px solid #E5E7EB',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
      }}>
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            Danh sách Quản trị viên đang hoạt động ({activeUsers.length + 1})
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Cập nhật theo thời gian thực</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Tài khoản Host Sáng Lập (Primary) */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid #F3F4F6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#F9FAFB'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FEF3C7',
                color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Crown size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>
                    {PRIMARY_HOST_EMAIL}
                  </span>
                  <span style={{
                    backgroundColor: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '999px',
                    fontSize: '0.72rem', fontWeight: 800, border: '1px solid #FCD34D'
                  }}>
                    👑 HOST SÁNG LẬP
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                  Toàn quyền hệ thống cao nhất
                </div>
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.82rem', color: '#9CA3AF', fontStyle: 'italic' }}>Mặc định cố định</span>
            </div>
          </div>

          {/* Danh sách các Admin khác */}
          {activeUsers.map((u, idx) => (
            <div key={u.email} style={{
              padding: '16px 24px',
              borderBottom: idx < activeUsers.length - 1 ? '1px solid #F3F4F6' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  backgroundColor: u.role === 'host' ? '#EEF2FF' : '#F3F4F6',
                  color: u.role === 'host' ? '#4F46E5' : '#4B5563',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800
                }}>
                  {u.displayName ? u.displayName.charAt(0) : <UserIcon size={20} />}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>
                      {u.email}
                    </span>
                    <span style={{
                      backgroundColor: u.role === 'host' ? '#EEF2FF' : '#F3F4F6',
                      color: u.role === 'host' ? '#4F46E5' : '#4B5563',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      border: u.role === 'host' ? '1px solid #C7D2FE' : '1px solid #E5E7EB',
                      textTransform: 'uppercase'
                    }}>
                      {u.role === 'host' ? '⭐ HOST' : 'ADMIN'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                    {u.displayName ? `Tên: ${u.displayName} · ` : ''}
                    {u.approvedBy ? `Duyệt bởi: ${u.approvedBy}` : 'Được cấp quyền'}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => handleToggleRole(u.email, u.role)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#F3F4F6',
                    color: '#374151',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  title="Chuyển đổi vai trò Admin / Host"
                >
                  Đổi sang {u.role === 'admin' ? 'Host' : 'Admin'}
                </button>

                <button
                  onClick={() => handleRejectOrDelete(u.email)}
                  style={{
                    padding: '6px 10px',
                    backgroundColor: '#FEE2E2',
                    color: '#DC2626',
                    border: '1px solid #FCA5A5',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Thu hồi quyền truy cập"
                >
                  <Trash2 size={13} /> Thu hồi
                </button>
              </div>
            </div>
          ))}

          {activeUsers.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#6B7280', fontSize: '0.88rem' }}>
              Chưa có tài khoản phụ nào. Bạn có thể thêm email ở trên để cấp quyền nhanh.
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
