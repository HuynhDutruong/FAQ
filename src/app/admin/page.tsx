'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  useAuth,
  isSuperAdminRole,
  hasPhungVuRole,
  hasGiaoLyFaqRole,
  hasTruyenThongRole,
  ADMIN_ROLES_CONFIG
} from '@/lib/AuthContext';
import { useFacebookPosts } from '@/lib/useFacebookPosts';
import {
  ChevronRight,
  Church,
  Clock,
  Crown,
  HelpCircle,
  LogOut,
  Mail,
  MessageSquare,
  Phone,
  Share2,
  Star,
  Trash2,
  User as UserIcon,
  Users,
  FileText,
  TrendingUp,
  BookOpen,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp, where, doc, deleteDoc, limit } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import SystemHealthPanel from '@/components/SystemHealthPanel';

/**
 * Bảy bảng quản trị nạp động.
 *
 * Trước đây cả bảy import tĩnh nên mở trang Admin là tải hết ~250KB mã nguồn
 * của mọi ban, dù người dùng chỉ xem đúng một tab và phần lớn tài khoản chỉ có
 * quyền vào một ban. Nay mỗi bảng chỉ tải khi thực sự mở tab tương ứng.
 */
const panelLoading = () => (
  <div style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--color-text-subtle)', fontSize: '0.9rem' }}>
    Đang tải bảng điều khiển…
  </div>
);

const PostSubmissionsAdmin = dynamic(() => import('@/components/PostSubmissionsAdmin'), { ssr: false, loading: panelLoading });
const PostIntelDashboard = dynamic(() => import('@/components/PostIntelDashboard'), { ssr: false, loading: panelLoading });
const UnifiedMassManagement = dynamic(() => import('@/components/UnifiedMassManagement'), { ssr: false, loading: panelLoading });
const AdminUsersManagement = dynamic(() => import('@/components/AdminUsersManagement'), { ssr: false, loading: panelLoading });
const FacebookAdmin = dynamic(() => import('@/components/FacebookAdmin'), { ssr: false, loading: panelLoading });
const RatingsAdmin = dynamic(() => import('@/components/RatingsAdmin'), { ssr: false, loading: panelLoading });
const PrayerAndFaqAdmin = dynamic(() => import('@/components/PrayerAndFaqAdmin'), { ssr: false, loading: panelLoading });


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

type TabType =
  | 'quanly_admin'
  | 'giole'
  | 'kinhnguyen_vandap'
  | 'donggop_baiviet'
  | 'facebook'
  | 'thongke_truyenthong'
  | 'faq'
  | 'feedback'
  | 'danhgia'
  | 'history';

interface NavItemConfig {
  key: TabType;
  label: string;
  icon: React.ElementType;
  badge?: number;
  committee: string;
  visible: boolean;
}

export default function AdminDashboard() {
  const { user, role, loading, signOut } = useAuth();
  const router = useRouter();
  const { posts: fbPosts } = useFacebookPosts();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pendingFeedbackCount, setPendingFeedbackCount] = useState(0);
  const [pendingUserCount, setPendingUserCount] = useState(0);
  const [pendingSubmissionsCount, setPendingSubmissionsCount] = useState(0);

  // Role checking
  const isSuperAdmin = isSuperAdminRole(role);
  const hasPhungVu = hasPhungVuRole(role);
  const hasGiaoLyFaq = hasGiaoLyFaqRole(role);
  const hasTruyenThong = hasTruyenThongRole(role);

  // Tab configurations grouped by committee
  const allNavItems: NavItemConfig[] = useMemo(() => [
    // 1. TỔNG QUẢN TRỊ
    {
      key: 'quanly_admin',
      label: 'Quản Lý Admin & Phân Quyền',
      icon: Users,
      badge: pendingUserCount,
      committee: 'Tổng Quản Trị',
      visible: isSuperAdmin
    },
    // 2. BAN PHỤNG VỤ
    {
      key: 'giole',
      label: 'Quản Lý Giờ Lễ & Phụng Vụ',
      icon: Church,
      badge: pendingFeedbackCount,
      committee: 'Ban Phụng Vụ',
      visible: hasPhungVu
    },
    // 3. BAN GIÁO LÝ & GIẢI ĐÁP
    {
      key: 'kinhnguyen_vandap',
      label: 'Kinh Nguyện & Vấn Đáp (CRUD)',
      icon: BookOpen,
      committee: 'Ban Mục Vụ Giáo Lý',
      visible: hasGiaoLyFaq
    },
    {
      key: 'faq',
      label: 'Hộp Thư Vấn Đáp Đức Tin',
      icon: HelpCircle,
      committee: 'Ban Mục Vụ Giáo Lý',
      visible: hasGiaoLyFaq
    },
    {
      key: 'feedback',
      label: 'Ý Kiến Phản Hồi Cộng Đoàn',
      icon: MessageSquare,
      committee: 'Ban Mục Vụ Giáo Lý',
      visible: hasGiaoLyFaq
    },
    {
      key: 'danhgia',
      label: 'Đánh Giá & Nhận Xét',
      icon: Star,
      committee: 'Ban Mục Vụ Giáo Lý',
      visible: hasGiaoLyFaq
    },
    // 4. BAN TRUYỀN THÔNG
    {
      key: 'donggop_baiviet',
      label: 'Kiểm Duyệt Bài Viết',
      icon: FileText,
      badge: pendingSubmissionsCount,
      committee: 'Ban Truyền Thông',
      visible: hasTruyenThong
    },
    {
      key: 'facebook',
      label: 'Fanpage Facebook',
      icon: Share2,
      committee: 'Ban Truyền Thông',
      visible: hasTruyenThong
    },
    {
      key: 'thongke_truyenthong',
      label: 'Thống Kê & Hiệu Quả',
      icon: TrendingUp,
      committee: 'Ban Truyền Thông',
      visible: hasTruyenThong
    }
  ], [isSuperAdmin, hasPhungVu, hasGiaoLyFaq, hasTruyenThong, pendingUserCount, pendingFeedbackCount, pendingSubmissionsCount]);

  const visibleNavItems = useMemo(() => allNavItems.filter((i) => i.visible), [allNavItems]);

  const [activeTab, setActiveTab] = useState<TabType>('giole');

  // Initial tab detection or fallback
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as TabType;
      if (tabParam && visibleNavItems.some((i) => i.key === tabParam)) {
        setActiveTab(tabParam);
        return;
      }
    }

    if (visibleNavItems.length > 0 && !visibleNavItems.some((i) => i.key === activeTab)) {
      setActiveTab(visibleNavItems[0].key);
    }
  }, [visibleNavItems, activeTab]);

  useEffect(() => {
    if (!loading && (!user || !role)) {
      router.push('/admin/login');
      return;
    }

    if (user && role) {
      // Fetch submissions
      // Giới hạn 300 mục gần nhất. Trước đây truy vấn không giới hạn nên mỗi
      // lần mở trang Admin là đọc TOÀN BỘ collection và giữ listener thời gian
      // thực trên đó — chi phí tăng mãi theo số lượt gửi và ăn hạn mức Firestore.
      const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'), limit(300));
      const unsubscribeSubmissions = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Submission));
          setSubmissions(data);
          setDataLoading(false);
        },
        (err) => {
          console.error('Error fetching data:', err);
          setError(err.message);
          setDataLoading(false);
        }
      );

      // Listen to pending mass time feedbacks count
      const qFeedback = query(collection(db, 'massTimeFeedback'), where('status', '==', 'pending'));
      const unsubscribeFeedback = onSnapshot(
        qFeedback,
        (snapshot) => {
          setPendingFeedbackCount(snapshot.size);
        },
        (err) => {
          console.error('Error counting pending feedback:', err);
        }
      );

      // Listen to pending admin user requests count
      const qUsers = query(collection(db, 'users'), where('status', '==', 'pending'));
      const unsubscribeUsers = onSnapshot(
        qUsers,
        (snapshot) => {
          setPendingUserCount(snapshot.size);
        },
        (err) => {
          console.error('Error counting pending users:', err);
        }
      );

      // Listen to pending post submissions count
      const qSubmissions = query(collection(db, 'postSubmissions'), where('status', '==', 'pending'));
      const unsubscribePostSubmissions = onSnapshot(
        qSubmissions,
        (snapshot) => {
          setPendingSubmissionsCount(snapshot.size);
        },
        (err) => {
          console.error('Error counting pending post submissions:', err);
        }
      );

      return () => {
        unsubscribeSubmissions();
        unsubscribeFeedback();
        unsubscribeUsers();
        unsubscribePostSubmissions();
      };
    }
  }, [user, role, loading, router]);

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xoá vĩnh viễn mục này? Thao tác này không thể hoàn tác.')) return;
    try {
      await deleteDoc(doc(db, 'submissions', id));
    } catch (err: unknown) {
      console.error('Error deleting submission:', err);
      const msg = err instanceof Error ? err.message : 'Lỗi khi xoá';
      alert('Không thể xoá: ' + msg);
    }
  };

  if (loading || !user || !role) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          color: 'var(--color-dark)',
          gap: '10px'
        }}
      >
        Đang tải bảng điều khiển Admin...
      </div>
    );
  }

  const roleKey = role === 'host' ? 'super_admin' : role === 'admin' ? 'phung_vu' : role;
  const currentRoleCfg = ADMIN_ROLES_CONFIG[roleKey] || ADMIN_ROLES_CONFIG.phung_vu;
  const currentTabObj = visibleNavItems.find((n) => n.key === activeTab) || visibleNavItems[0];

  return (
    <div
      className="admin-container"
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        color: 'var(--color-dark)'
      }}
    >
      {/* =========================================================================
          LEFT SIDEBAR (CỐ ĐỊNH TRÊN DESKTOP & TABLET)
          ========================================================================= */}
      <aside
        className="admin-sidebar"
        style={{
          width: '280px',
          flexShrink: 0,
          backgroundColor: 'var(--color-card-bg)',
          borderRight: '1px solid var(--color-border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 50,
          backdropFilter: 'blur(24px)'
        }}
      >
        {/* Top: Logo & Nav items */}
        <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Brand Header */}
          <div
            style={{
              padding: '24px 20px 18px',
              borderBottom: '1px solid var(--color-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'white',
                boxShadow: '0 4px 12px rgba(255, 69, 58, 0.2), 0 0 0 2px rgba(251, 192, 45, 0.6)',
                padding: '3px',
                flexShrink: 0
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src="/logo.jpg"
                  alt="Logo Xứ Đoàn"
                  fill
                  sizes="42px"
                  style={{ objectFit: 'contain', borderRadius: '50%' }}
                />
              </div>
            </div>

            <div>
              <h2
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 900,
                  color: 'var(--color-red)',
                  margin: 0,
                  lineHeight: 1.2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px'
                }}
              >
                Bảng Quản Trị
              </h2>
              <span style={{ fontSize: '0.74rem', color: 'var(--color-subtle)', fontWeight: 600 }}>
                Xứ Đoàn Các Thánh Tử Đạo
              </span>
            </div>
          </div>

          {/* User Role Badge in Sidebar */}
          <div style={{ padding: '12px 16px 4px' }}>
            <div
              style={{
                padding: '8px 12px',
                borderRadius: '10px',
                backgroundColor: currentRoleCfg.badgeBg,
                border: `1px solid ${currentRoleCfg.badgeBorder}`,
                color: currentRoleCfg.badgeColor,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.78rem',
                fontWeight: 800
              }}
            >
              {isSuperAdmin ? <Crown size={15} /> : <ShieldCheck size={15} />}
              <span>{currentRoleCfg.shortLabel}</span>
            </div>
          </div>

          {/* Navigation Menu Grouped */}
          <nav style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    backgroundColor: isActive ? 'var(--color-red)' : 'transparent',
                    color: isActive ? 'white' : 'var(--color-dark)',
                    border: 'none',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive ? '0 4px 12px rgba(255, 69, 58, 0.3)' : 'none',
                    textAlign: 'left'
                  }}
                  className={!isActive ? 'admin-nav-item' : ''}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      style={{
                        backgroundColor: isActive ? 'white' : '#EF4444',
                        color: isActive ? 'var(--color-red)' : 'white',
                        padding: '2px 6px',
                        borderRadius: '999px',
                        fontSize: '0.7rem',
                        fontWeight: 900
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: User Info & Log out */}
        <div
          style={{
            padding: '14px 16px',
            borderTop: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-input-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: currentRoleCfg.badgeBg,
                color: currentRoleCfg.badgeColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                flexShrink: 0
              }}
            >
              {user.displayName ? user.displayName.charAt(0) : user.email?.charAt(0).toUpperCase()}
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: 'var(--color-dark)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {user.displayName || user.email}
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  color: currentRoleCfg.badgeColor,
                  fontWeight: 800
                }}
              >
                {currentRoleCfg.shortLabel}
              </div>
            </div>
          </div>

          <button
            onClick={signOut}
            style={{
              padding: '8px',
              backgroundColor: 'var(--color-btn-subtle-bg)',
              color: 'var(--color-red)',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            title="Đăng xuất"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT CONTENT AREA
          ========================================================================= */}
      <div
        className="admin-content-wrapper"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: '100vh'
        }}
      >
        {/* Mobile Top Header */}
        <div
          className="admin-mobile-header"
          style={{
            padding: '12px 16px',
            backgroundColor: 'var(--color-card-bg)',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'white',
                position: 'relative',
                overflow: 'hidden',
                padding: '2px'
              }}
            >
              <Image src="/logo.jpg" alt="Logo" fill sizes="32px" style={{ objectFit: 'contain', borderRadius: '50%' }} />
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-red)' }}>
                ADMIN
              </span>
              <span style={{ fontSize: '0.72rem', color: currentRoleCfg.badgeColor, marginLeft: '6px', fontWeight: 700 }}>
                ({currentRoleCfg.shortLabel})
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={signOut}
              style={{
                padding: '6px',
                backgroundColor: 'var(--color-btn-subtle-bg)',
                color: 'var(--color-red)',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
              title="Đăng xuất"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

        {/* Mobile Scrollable Tabs Bar */}
        <div
          className="admin-mobile-tabs"
          style={{
            display: 'none',
            overflowX: 'auto',
            padding: '10px 14px',
            backgroundColor: 'var(--color-input-bg)',
            borderBottom: '1px solid var(--color-border-subtle)',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                style={{
                  padding: '7px 12px',
                  borderRadius: '999px',
                  backgroundColor: isActive ? 'var(--color-red)' : 'var(--color-card-bg)',
                  color: isActive ? 'white' : 'var(--color-dark)',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Icon size={14} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    style={{
                      backgroundColor: isActive ? 'white' : '#EF4444',
                      color: isActive ? 'var(--color-red)' : 'white',
                      padding: '1px 5px',
                      borderRadius: '999px',
                      fontSize: '0.66rem',
                      fontWeight: 900
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Top Breadcrumb & Status Bar on Desktop */}
        <header
          className="admin-desktop-topbar"
          style={{
            padding: '16px 36px',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--color-card-bg)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-subtle)', fontWeight: 600 }}>Quản Trị</span>
            <ChevronRight size={14} color="var(--color-subtle)" />
            <span style={{ fontSize: '0.82rem', color: currentRoleCfg.badgeColor, fontWeight: 700 }}>
              {currentTabObj?.committee || 'Hệ thống'}
            </span>
            <ChevronRight size={14} color="var(--color-subtle)" />
            <h1 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-dark)', margin: 0 }}>
              {currentTabObj?.label}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                backgroundColor: currentRoleCfg.badgeBg,
                color: currentRoleCfg.badgeColor,
                border: `1px solid ${currentRoleCfg.badgeBorder}`,
                fontSize: '0.76rem',
                fontWeight: 800
              }}
            >
              {currentRoleCfg.label}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-subtle)', fontWeight: 600 }}>
              {new Date().toLocaleDateString('vi-VN', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main
          style={{
            flex: 1,
            padding: '24px 36px',
            maxWidth: '1320px',
            width: '100%',
            boxSizing: 'border-box'
          }}
          className="admin-main-body"
        >
          {/* Chẩn đoán hạ tầng — đặt trên cùng để sự cố không còn hỏng âm thầm. */}
          <SystemHealthPanel />

          {error ? (
            <div style={{ padding: '24px', backgroundColor: '#FEE2E2', color: '#B91C1C', borderRadius: '12px' }}>
              <strong>Lỗi tải dữ liệu:</strong> {error}
            </div>
          ) : activeTab === 'quanly_admin' && isSuperAdmin ? (
            <AdminUsersManagement />
          ) : activeTab === 'giole' && hasPhungVu ? (
            <UnifiedMassManagement />
          ) : activeTab === 'kinhnguyen_vandap' && hasGiaoLyFaq ? (
            <PrayerAndFaqAdmin />
          ) : activeTab === 'donggop_baiviet' && hasTruyenThong ? (
            <PostSubmissionsAdmin />
          ) : activeTab === 'facebook' && hasTruyenThong ? (
            <FacebookAdmin />
          ) : activeTab === 'thongke_truyenthong' && hasTruyenThong ? (
            <PostIntelDashboard posts={fbPosts} />
          ) : activeTab === 'danhgia' && hasGiaoLyFaq ? (
            <RatingsAdmin />
          ) : (activeTab === 'faq' || activeTab === 'feedback') && hasGiaoLyFaq ? (
            dataLoading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-subtle)' }}>
                Đang tải dữ liệu từ Firestore...
              </div>
            ) : submissions.filter((s) => s.type === activeTab).length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: 'var(--color-subtle)',
                  backgroundColor: 'var(--color-card-bg)',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                Chưa có dữ liệu ở mục này.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {submissions
                  .filter((s) => s.type === activeTab)
                  .map((sub) => (
                    <div
                      key={sub.id}
                      style={{
                        backgroundColor: 'var(--color-card-bg)',
                        padding: '20px',
                        borderRadius: '16px',
                        border: '1px solid var(--color-border-subtle)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                        borderLeft: `4px solid ${sub.type === 'faq' ? '#4285F4' : '#F4B400'}`,
                        opacity: sub.status === 'deleted' ? 0.5 : 1
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div>
                          <span
                            style={{
                              padding: '4px 8px',
                              backgroundColor: sub.type === 'faq' ? '#E8F0FE' : '#FEF7E0',
                              color: sub.type === 'faq' ? '#1967D2' : '#B08D00',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 800,
                              marginRight: '8px'
                            }}
                          >
                            {sub.type === 'faq' ? 'VẤN ĐÁP' : 'PHẢN HỒI'}
                          </span>
                          <span style={{ fontWeight: 800, color: 'var(--color-dark)' }}>
                            {sub.isAnonymous ? 'Người dùng Ẩn danh' : sub.fullName}
                          </span>
                        </div>
                        <div style={{ color: 'var(--color-subtle)', fontSize: '0.82rem' }}>
                          {sub.createdAt?.toDate().toLocaleString('vi-VN')}
                        </div>
                      </div>

                      <div
                        style={{
                          color: 'var(--color-dark)',
                          backgroundColor: 'var(--color-input-bg)',
                          padding: '16px',
                          borderRadius: '10px',
                          marginBottom: '16px',
                          whiteSpace: 'pre-wrap',
                          lineHeight: 1.5,
                          fontSize: '0.92rem'
                        }}
                      >
                        {sub.content}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-subtle)' }}>
                          {sub.type === 'faq' && sub.phone && (
                            <div>
                              <Phone size={13} style={{ verticalAlign: '-2px', marginRight: '5px' }} />
                              {sub.phone}
                            </div>
                          )}
                          {sub.type === 'faq' && sub.email && (
                            <div>
                              <Mail size={13} style={{ verticalAlign: '-2px', marginRight: '5px' }} />
                              {sub.email}
                            </div>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {sub.status !== 'deleted' && (
                            <button
                              onClick={() => handleDeleteSubmission(sub.id)}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: '#FEE2E2',
                                color: '#B91C1C',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Trash2 size={14} /> Xoá
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '50px 20px',
                color: 'var(--color-subtle)',
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: '16px',
                border: '1px solid var(--color-border-subtle)'
              }}
            >
              <ShieldCheck size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <h3 style={{ color: 'var(--color-dark)', margin: '0 0 8px' }}>Giới Hạn Quyền Truy Cập</h3>
              <p style={{ margin: 0, fontSize: '0.88rem' }}>
                Tài khoản của bạn ({currentRoleCfg.shortLabel}) chỉ có quyền truy cập vào các chức năng được phân công.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Responsive Styles for Layout */}
      <style jsx global>{`
        @media (min-width: 769px) {
          .admin-sidebar {
            display: flex !important;
          }
          .admin-mobile-header,
          .admin-mobile-tabs {
            display: none !important;
          }
          .admin-desktop-topbar {
            display: flex !important;
          }
        }

        @media (max-width: 768px) {
          .admin-container {
            flex-direction: column !important;
          }
          .admin-sidebar {
            display: none !important;
          }
          .admin-mobile-header {
            display: flex !important;
          }
          .admin-mobile-tabs {
            display: flex !important;
          }
          .admin-desktop-topbar {
            display: none !important;
          }
          .admin-main-body {
            padding: 16px 14px !important;
          }
        }

        .admin-nav-item:hover {
          background-color: var(--color-btn-subtle-bg) !important;
          color: var(--color-red) !important;
        }
      `}</style>
    </div>
  );
}
