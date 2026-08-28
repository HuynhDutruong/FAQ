'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

export interface AdminUserDoc {
  email: string;
  role: 'host' | 'admin';
  status: 'active' | 'pending' | 'disabled';
  displayName?: string;
  photoURL?: string;
  requestNote?: string;
  createdAt?: Timestamp | null;
  approvedAt?: Timestamp | null;
  approvedBy?: string;
}

interface AuthContextType {
  user: User | null;
  role: 'host' | 'admin' | null;
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
  const [role, setRole] = useState<'host' | 'admin' | null>(null);
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
