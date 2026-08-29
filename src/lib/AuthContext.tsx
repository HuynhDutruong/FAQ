'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

export type AdminRole =
  | 'super_admin'
  | 'phung_vu'
  | 'giao_ly_faq'
  | 'truyen_thong'
  | 'host'
  | 'admin';

export interface AdminUserDoc {
  email: string;
  role: AdminRole;
  status: 'active' | 'pending' | 'disabled';
  displayName?: string;
  photoURL?: string;
  requestNote?: string;
  createdAt?: Timestamp | null;
  approvedAt?: Timestamp | null;
  approvedBy?: string;
}

export interface RoleConfig {
  id: AdminRole;
  label: string;
  shortLabel: string;
  description: string;
  badgeBg: string;
  badgeColor: string;
  badgeBorder: string;
  iconName: string;
}

export const ADMIN_ROLES_CONFIG: Record<string, RoleConfig> = {
  super_admin: {
    id: 'super_admin',
    label: 'Super Admin (Tổng Quản Trị)',
    shortLabel: 'Super Admin',
    description: 'Toàn quyền cấu hình hệ thống, quản trị tài khoản và tất cả các ban ngành.',
    badgeBg: 'rgba(220, 38, 38, 0.15)',
    badgeColor: '#DC2626',
    badgeBorder: 'rgba(220, 38, 38, 0.35)',
    iconName: 'Crown'
  },
  phung_vu: {
    id: 'phung_vu',
    label: 'Ban Quản Lý Phụng Vụ',
    shortLabel: 'Ban Phụng Vụ',
    description: 'Quản lý Giờ Thánh Lễ Chánh Tòa & 3.600+ nhà thờ, duyệt đóng góp giờ lễ, địa chỉ và lịch phụng vụ.',
    badgeBg: 'rgba(217, 119, 6, 0.15)',
    badgeColor: '#D97706',
    badgeBorder: 'rgba(217, 119, 6, 0.35)',
    iconName: 'Church'
  },
  giao_ly_faq: {
    id: 'giao_ly_faq',
    label: 'Ban Mục Vụ Giáo Lý, Đối Thoại & Giải Đáp',
    shortLabel: 'Ban Giáo Lý & Giải Đáp',
    description: 'Quản trị Kinh Nguyện, Vấn Đáp Đức Tin, duyệt câu hỏi FAQ, tiếp nhận ý kiến đóng góp và đánh giá.',
    badgeBg: 'rgba(5, 150, 105, 0.15)',
    badgeColor: '#059669',
    badgeBorder: 'rgba(5, 150, 105, 0.35)',
    iconName: 'HelpCircle'
  },
  truyen_thong: {
    id: 'truyen_thong',
    label: 'Ban Truyền Thông & Báo Chí',
    shortLabel: 'Ban Truyền Thông',
    description: 'Kiểm duyệt bài viết đóng góp từ cộng đoàn, quản lý Fanpage Facebook và xem thống kê truyền thông.',
    badgeBg: 'rgba(37, 99, 235, 0.15)',
    badgeColor: '#2563EB',
    badgeBorder: 'rgba(37, 99, 235, 0.35)',
    iconName: 'FileText'
  }
};

/** Quyền kiểm tra các vai trò */
export function isSuperAdminRole(role: AdminRole | null): boolean {
  return role === 'super_admin' || role === 'host';
}

export function hasPhungVuRole(role: AdminRole | null): boolean {
  return isSuperAdminRole(role) || role === 'phung_vu' || role === 'admin';
}

export function hasGiaoLyFaqRole(role: AdminRole | null): boolean {
  return isSuperAdminRole(role) || role === 'giao_ly_faq' || role === 'admin';
}

export function hasTruyenThongRole(role: AdminRole | null): boolean {
  return isSuperAdminRole(role) || role === 'truyen_thong' || role === 'admin';
}

interface AuthContextType {
  user: User | null;
  role: AdminRole | null;
  userStatus: 'active' | 'pending' | 'none';
  loading: boolean;
  requestAccess: (note?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const PRIMARY_HOST_EMAIL = 'notification2411.huynhdutruong@gmail.com';

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  userStatus: 'none',
  loading: true,
  requestAccess: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AdminRole | null>(null);
  const [userStatus, setUserStatus] = useState<'active' | 'pending' | 'none'>('none');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (unsubscribeDoc) {
        unsubscribeDoc();
        unsubscribeDoc = null;
      }

      if (currentUser && currentUser.email) {
        const emailLower = currentUser.email.toLowerCase();

        // Primary Host Account check
        if (emailLower === PRIMARY_HOST_EMAIL.toLowerCase()) {
          setRole('host');
          setUserStatus('active');
          setLoading(false);
          return;
        }

        // Realtime listener on user doc in Firestore
        const userDocRef = doc(db, 'users', emailLower);
        unsubscribeDoc = onSnapshot(userDocRef, (snap) => {
          if (snap.exists()) {
            const data = snap.data() as AdminUserDoc;
            if (data.status === 'active') {
              setRole(data.role || 'admin');
              setUserStatus('active');
            } else if (data.status === 'pending') {
              setRole(null);
              setUserStatus('pending');
            } else {
              setRole(null);
              setUserStatus('none');
            }
          } else {
            setRole(null);
            setUserStatus('none');
          }
          setLoading(false);
        }, (err) => {
          console.error("Error listening to user doc:", err);
          setRole(null);
          setUserStatus('none');
          setLoading(false);
        });

      } else {
        setRole(null);
        setUserStatus('none');
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, []);

  const requestAccess = async (note?: string) => {
    if (!user || !user.email) return;
    const emailLower = user.email.toLowerCase();
    const userDocRef = doc(db, 'users', emailLower);
    
    await setDoc(userDocRef, {
      email: emailLower,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      role: 'admin',
      status: 'pending',
      requestNote: note || '',
      createdAt: serverTimestamp()
    }, { merge: true });
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setRole(null);
    setUserStatus('none');
  };

  return (
    <AuthContext.Provider value={{ user, role, userStatus, loading, requestAccess, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
