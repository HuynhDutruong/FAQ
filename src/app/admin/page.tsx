'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useAuth } from '@/lib/AuthContext';
import { LogOut, Trash2, CheckCircle, Clock } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, Timestamp } from 'firebase/firestore';
import MassTimeAdmin from '@/components/MassTimeAdmin';

interface Submission {
  id: string;
  type: 'faq' | 'feedback';
  isAnonymous: boolean;
  fullName: string;
  phone?: string;
  email?: string;
  content: string;
  status: 'new' | 'reviewed' | 'deleted';
  createdAt: Timestamp;
}

type TabType = 'faq' | 'feedback' | 'giole' | 'history' | 'facebook';

export default function AdminDashboard() {
  const { user, role, loading, signOut } = useAuth();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('facebook');
  const [fbLoading, setFbLoading] = useState(false);

  const handleFacebookLogin = () => {
    setFbLoading(true);
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const redirectUri = encodeURIComponent('http://localhost:3000/api/facebook/callback');
    const scope = 'pages_show_list,pages_manage_posts,pages_read_engagement';
    
    // Chuyển hướng trình duyệt sang trang uỷ quyền của Facebook (Server-side flow)
    window.location.href = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  useEffect(() => {
    if (!loading && (!user || !role)) {
      router.push('/admin/login');
      return;
    }

    if (user && role) {
      // Fetch submissions
      const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Submission));
        setSubmissions(data);
        setDataLoading(false);
      }, (err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setDataLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user, role, loading, router]);

  if (loading || !user || !role) return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải...</div>;

  return (
    <div>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>
          FAQ & Feedback Dashboard
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: '500', color: '#374151' }}>{user.displayName || user.email}</div>
            <div style={{ fontSize: '0.8rem', color: '#6B7280', textTransform: 'uppercase' }}>
              Vai trò: {role}
            </div>
          </div>
          <button 
            onClick={signOut}
            style={{
              padding: '8px',
              backgroundColor: '#F3F4F6',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#4B5563'
            }}
            title="Đăng xuất"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Tab Bar */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          borderBottom: '1px solid #E5E7EB',
          paddingBottom: '2px'
        }}>
          {(['faq', 'feedback', 'giole', 'history', 'facebook'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '3px solid #EF4444' : '3px solid transparent',
                color: activeTab === tab ? '#EF4444' : '#6B7280',
                fontWeight: activeTab === tab ? 'bold' : '500',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase'
              }}
            >
              {tab === 'faq' ? 'Vấn đáp' : tab === 'feedback' ? 'Phản hồi' : tab === 'giole' ? 'Giờ lễ' : tab === 'history' ? 'Lịch sử' : 'Facebook'}
            </button>
          ))}
        </div>
        
        {error ? (
          <div style={{ padding: '24px', backgroundColor: '#FEE2E2', color: '#B91C1C', borderRadius: '12px' }}>
            <strong>Lỗi tải dữ liệu:</strong> {error}
            <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>
              Nếu thấy lỗi "Missing or insufficient permissions", có nghĩa là Firestore Security Rules đang khoá quyền đọc. Vui lòng cập nhật luật thành <code>allow read, write: if true;</code> trên Firebase Console.
            </p>
          </div>
        ) : activeTab === 'giole' ? (
          <MassTimeAdmin />
        ) : dataLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
            Đang tải dữ liệu từ Firestore...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeTab === 'facebook' ? (
              <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>Quản lý Fanpage Facebook</h3>
                <div style={{ padding: '16px', backgroundColor: '#ECFDF5', color: '#065F46', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={20} />
                  <span>Đã cấu hình App ID và Secret thành công.</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
                  <p style={{ color: '#374151' }}>Bước tiếp theo: Hãy cấp quyền quản trị Fanpage cho hệ thống.</p>
                  <button 
                    onClick={handleFacebookLogin}
                    disabled={fbLoading}
                    style={{
                    padding: '12px',
                    backgroundColor: fbLoading ? '#9CA3AF' : '#1877F2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: fbLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    {fbLoading ? (
                      'Đang kết nối...'
                    ) : (
                      <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24 12.073C24 5.405 18.627 0 12 0C5.373 0 0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24V15.562H7.078V12.073H10.125V9.413C10.125 6.408 11.916 4.75 14.657 4.75C15.97 4.75 17.344 4.984 17.344 4.984V7.937H15.83C14.338 7.937 13.875 8.864 13.875 9.815V12.073H17.203L16.67 15.562H13.875V24C19.612 23.094 24 18.1 24 12.073Z" />
                        </svg>
                        Đăng nhập & Cấp quyền Facebook
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : activeTab === 'history' ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280', backgroundColor: 'white', borderRadius: '12px' }}>
                <Clock size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <h3>Lịch sử hoạt động</h3>
                <p>Tính năng lưu vết thao tác (Audit Logs) đang được xây dựng...</p>
              </div>
            ) : submissions.filter(s => s.type === activeTab).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280', backgroundColor: 'white', borderRadius: '12px' }}>
                Chưa có dữ liệu ở mục này.
              </div>
            ) : (
              submissions.filter(s => s.type === activeTab).map((sub) => (
                <div key={sub.id} style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderLeft: `4px solid ${sub.type === 'faq' ? '#4285F4' : '#F4B400'}`,
                  opacity: sub.status === 'deleted' ? 0.5 : 1
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <span style={{ 
                        padding: '4px 8px', 
                        backgroundColor: sub.type === 'faq' ? '#E8F0FE' : '#FEF7E0',
                        color: sub.type === 'faq' ? '#1967D2' : '#B08D00',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        marginRight: '8px'
                      }}>
                        {sub.type === 'faq' ? 'VẤN ĐÁP' : 'PHẢN HỒI'}
                      </span>
                      <span style={{ fontWeight: '600', color: '#111827' }}>
                        {sub.isAnonymous ? 'Người dùng Ẩn danh' : sub.fullName}
                      </span>
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '0.85rem' }}>
                      {sub.createdAt?.toDate().toLocaleString('vi-VN')}
                    </div>
                  </div>
                  
                  <div style={{ 
                    color: '#374151', 
                    backgroundColor: '#F9FAFB', 
                    padding: '16px', 
                    borderRadius: '8px',
                    marginBottom: '16px',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {sub.content}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                      {sub.type === 'faq' && sub.phone && <div>📞 {sub.phone}</div>}
                      {sub.type === 'faq' && sub.email && <div>✉️ {sub.email}</div>}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {sub.status !== 'deleted' && (
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: '#FEE2E2',
                          color: '#B91C1C',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <Trash2 size={16} /> Xoá
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
