'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && role) {
      router.push('/admin');
    }
  }, [user, role, loading, router]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // AuthContext will handle checking if the user is in whitelist
    } catch (error) {
      console.error("Login failed:", error);
      alert('Đăng nhập thất bại.');
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Đang kiểm tra...</div>;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>
          Quản trị Hệ thống
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '24px' }}>
          Đăng nhập bằng tài khoản Google đã được cấp quyền.
        </p>

        {user && !role && (
          <div style={{ padding: '12px', backgroundColor: '#FEE2E2', color: '#B91C1C', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem' }}>
            Tài khoản <b>{user.email}</b> chưa được cấp quyền truy cập. Vui lòng liên hệ Host Admin.
          </div>
        )}

        <button
          onClick={handleLogin}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '12px 24px',
            backgroundColor: '#4285F4',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          <LogIn size={20} />
          Đăng nhập với Google
        </button>
      </div>
    </div>
  );
}
