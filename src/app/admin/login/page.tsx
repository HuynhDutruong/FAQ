'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { LogIn, ShieldAlert, Clock, Send, LogOut, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { user, role, userStatus, loading, requestAccess, signOut } = useAuth();
  const router = useRouter();
  const [requestNote, setRequestNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    if (!loading && user && role) {
      router.push('/admin');
    }
  }, [user, role, loading, router]);

  const handleLogin = async () => {
    setLoginLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: unknown) {
      const authErr = error as { code?: string; message?: string };
      if (authErr.code === 'auth/unauthorized-domain') {
        alert('Tên miền ' + window.location.hostname + ' chưa được thêm vào Danh sách Tên miền được uỷ quyền (Authorized Domains) trên Firebase Console.\n\nVui lòng vào: Firebase Console -> Authentication -> Settings -> Authorized domains -> Thêm ' + window.location.hostname);
      } else if (authErr.code !== 'auth/popup-closed-by-user') {
        console.error("Login failed:", error);
        alert('Đăng nhập thất bại: ' + (authErr.message || 'Vui lòng thử lại.'));
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSendRequest = async () => {
    setSubmitting(true);
    try {
      await requestAccess(requestNote.trim());
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert('Không thể gửi yêu cầu: ' + msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
        color: 'var(--color-dark)', gap: '10px'
      }}>
        <Loader2 className="spin" size={24} /> Đang kiểm tra quyền truy cập...
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div className="liquid-glass" style={{
        padding: '36px 28px',
        borderRadius: '24px',
        textAlign: 'center',
        maxWidth: '440px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)'
      }}>
        <div style={{
          position: 'relative',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 16px rgba(255, 69, 58, 0.25), 0 0 0 2.5px rgba(251, 192, 45, 0.65)',
          padding: '4px',
          margin: '0 auto 16px',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
            <Image src="/logo.jpg" alt="Logo Xứ Đoàn" fill sizes="64px" style={{ objectFit: 'contain' }} priority />
          </div>
        </div>

        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px', color: 'var(--color-dark)' }}>
          Quản trị Hệ thống
        </h1>
        <p style={{ color: 'var(--color-subtle)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.4 }}>
          Đăng nhập bằng tài khoản Google để truy cập bảng điều khiển Admin.
        </p>

        {/* Chưa đăng nhập Google */}
        {!user && (
          <button
            onClick={handleLogin}
            disabled={loginLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '100%',
              padding: '13px 20px',
              backgroundColor: '#4285F4',
              color: 'white',
              borderRadius: '12px',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: loginLoading ? 'wait' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 14px rgba(66, 133, 244, 0.3)'
            }}
          >
            {loginLoading ? <Loader2 size={18} className="spin" /> : <LogIn size={18} />}
            Đăng nhập với Google
          </button>
        )}

        {/* Đã đăng nhập nhưng trạng thái là PENDING (Đang chờ duyệt) */}
        {user && userStatus === 'pending' && (
          <div style={{
            padding: '20px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '16px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D97706', fontWeight: 800, marginBottom: '8px' }}>
              <Clock size={20} />
              <span>Yêu cầu đang chờ duyệt...</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-dark)', lineHeight: 1.4, marginBottom: '12px' }}>
              Tài khoản <strong>{user.email}</strong> đã gửi yêu cầu cấp quyền Admin. Khi Host Admin duyệt, hệ thống sẽ tự động chuyển hướng bạn vào bảng quản trị ngay lập tức (Realtime).
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={signOut}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: '0.8rem', color: 'var(--color-subtle)', background: 'none', border: 'none', cursor: 'pointer'
                }}
              >
                <LogOut size={13} /> Đăng xuất tài khoản khác
              </button>
            </div>
          </div>
        )}

        {/* Đã đăng nhập nhưng chưa có trong danh sách và chưa gửi yêu cầu */}
        {user && userStatus === 'none' && !role && (
          <div style={{
            padding: '20px',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '16px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-red)', fontWeight: 800, marginBottom: '8px' }}>
              <ShieldAlert size={20} />
              <span>Chưa có trong danh sách</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-dark)', lineHeight: 1.5, marginBottom: '14px', fontWeight: 600 }}>
              Danh sách admin chưa có bạn (<strong>{user.email}</strong>), bạn muốn xét duyệt thì nhấn xét duyệt nha.
            </p>

            <input
              type="text"
              placeholder="Ghi chú (Tên / Chức vụ trong Xứ Đoàn - không bắt buộc)..."
              value={requestNote}
              onChange={(e) => setRequestNote(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid var(--color-input-border)',
                backgroundColor: 'var(--color-input-bg)',
                color: 'var(--color-input-text)',
                fontSize: '0.88rem',
                marginBottom: '12px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleSendRequest}
                disabled={submitting}
                style={{
                  flex: 1,
                  padding: '11px 14px',
                  backgroundColor: 'var(--color-red)',
                  color: 'white',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: submitting ? 'wait' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(255, 69, 58, 0.3)'
                }}
              >
                {submitting ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
                Nhấn xét duyệt
              </button>

              <button
                onClick={signOut}
                style={{
                  padding: '10px 14px',
                  backgroundColor: 'var(--color-btn-subtle-bg)',
                  color: 'var(--color-btn-subtle-text)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                title="Đăng xuất"
              >
                <LogOut size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
