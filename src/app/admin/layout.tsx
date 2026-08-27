import { AuthProvider } from '@/lib/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        {children}
      </div>
    </AuthProvider>
  );
}
