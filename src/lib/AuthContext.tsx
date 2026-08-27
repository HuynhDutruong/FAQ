'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  role: 'host' | 'admin' | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'host' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // [CẤP QUYỀN TRỰC TIẾP] Bỏ qua kiểm tra Firestore đối với tài khoản chính
        if (currentUser.email === 'notification2411.huynhdutruong@gmail.com') {
          setRole('host');
          setLoading(false);
          return;
        }

        // Lấy quyền (role) từ Firestore cho các tài khoản khác
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.email || ''));
          if (userDoc.exists()) {
            setRole(userDoc.data().role);
          } else {
            // Nếu không có trong whitelist, từ chối quyền
            setRole(null);
            await firebaseSignOut(auth); // Ép đăng xuất ngay
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole(null);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
