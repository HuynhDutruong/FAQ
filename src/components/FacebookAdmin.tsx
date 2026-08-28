'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';
import {
  Send,
  Loader2,
  ExternalLink,
  Trash2,
  RefreshCw,
  Share2
} from 'lucide-react';

interface FacebookPage {
  id: string;
  name: string;
  category?: string;
  access_token: string;
}

interface FacebookSettings {
  connected: boolean;
  connectedAt?: string;
  selectedPageId?: string;
  selectedPageName?: string;
  selectedPageToken?: string;
  pages?: FacebookPage[];
}

export default function FacebookAdmin() {
  const [fbSettings, setFbSettings] = useState<FacebookSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [fbLoading, setFbLoading] = useState(false);

  // Form soạn bài đăng
  const [postMessage, setPostMessage] = useState('');
  const [postLink, setPostLink] = useState('');
  const [posting, setPosting] = useState(false);
  const [postResult, setPostResult] = useState<{ success: boolean; message: string; postId?: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'facebook'), (snap) => {
      if (snap.exists()) {
        setFbSettings(snap.data() as FacebookSettings);
      } else {
        setFbSettings(null);
      }
      setLoading(false);
    }, (err) => {
      console.error('Error reading facebook settings:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFacebookLogin = () => {
    setFbLoading(true);
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const redirectUri = encodeURIComponent(`${origin}/api/facebook/callback`);
    const scope = 'public_profile,pages_show_list,pages_read_engagement';

    window.location.href = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  const handleSwitchPage = async (page: FacebookPage) => {
    try {
      await updateDoc(doc(db, 'settings', 'facebook'), {
        selectedPageId: page.id,
        selectedPageName: page.name,
        selectedPageToken: page.access_token
      });
    } catch (err: unknown) {
      console.error(err);
      alert('Không thể chuyển trang.');
    }
  };

  const handleDisconnect = async () => {
    if (!confirm('Bạn có chắc chắn muốn huỷ kết nối Fanpage Facebook này?')) return;
    try {
      await deleteDoc(doc(db, 'settings', 'facebook'));
      setPostResult(null);
    } catch (err: unknown) {
      console.error(err);
      alert('Lỗi khi huỷ kết nối.');
    }
  };

  const handlePublishPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postMessage.trim()) {
      alert('Vui lòng nhập nội dung bài viết.');
      return;
    }

    setPosting(true);
    setPostResult(null);

    try {
      const res = await fetch('/api/facebook/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: postMessage.trim(),
          link: postLink.trim() || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Đăng bài thất bại');
      }

      setPostResult({
        success: true,
        message: ` Đã đăng bài viết thành công lên Fanpage ${data.pageName}!`,
        postId: data.postId
      });
      setPostMessage('');
      setPostLink('');

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi không xác định';
      setPostResult({
        success: false,
        message: `❌ ${msg}`
      });
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <Loader2 className="spin" size={20} /> Đang kiểm tra trạng thái Fanpage...
      </div>
    );
  }

  const isConnected = fbSettings?.connected && fbSettings.selectedPageId;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. Trạng thái kết nối */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', margin: 0, marginBottom: '6px' }}>
              Quản lý Fanpage Facebook
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: 0 }}>
              Kết nối và đồng bộ bài đăng, giải đáp thắc mắc và giờ lễ tự động lên Fanpage Xứ Đoàn.
            </p>
          </div>

          {isConnected && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleFacebookLogin}
                style={{
                  padding: '7px 12px',
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
                title="Làm mới lại token kết nối"
              >
                <RefreshCw size={13} /> Kết nối lại
              </button>

              <button
                onClick={handleDisconnect}
                style={{
                  padding: '7px 12px',
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  borderRadius: '8px',
                  border: '1px solid #FCA5A5',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Trash2 size={13} /> Huỷ kết nối
              </button>
            </div>
          )}
        </div>

        <div style={{ marginTop: '18px' }}>
          {isConnected ? (
            <div style={{
              padding: '16px 20px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  backgroundColor: '#1877F2', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem'
                }}>
                  f
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#065F46' }}>
                      {fbSettings.selectedPageName}
                    </span>
                    <span style={{
                      backgroundColor: '#10B981', color: 'white', padding: '2px 8px', borderRadius: '999px',
                      fontSize: '0.7rem', fontWeight: 800
                    }}>
                      ĐÃ KẾT NỐI
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: '2px' }}>
                    Page ID: <code>{fbSettings.selectedPageId}</code>
                  </div>
                </div>
              </div>

              {/* Danh sách các page khác nếu có */}
              {fbSettings.pages && fbSettings.pages.length > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#065F46', fontWeight: 600 }}>Đổi Page:</span>
                  <select
                    value={fbSettings.selectedPageId}
                    onChange={(e) => {
                      const p = fbSettings.pages?.find(x => x.id === e.target.value);
                      if (p) handleSwitchPage(p);
                    }}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      border: '1px solid #6EE7B7',
                      fontSize: '0.82rem',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    {fbSettings.pages.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ) : (
            <div style={{
              padding: '24px',
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '0.92rem' }}>
                Hệ thống chưa kết nối với Fanpage nào. Nhấn nút bên dưới để cấp quyền quản lý Fanpage.
              </p>
              <button
                onClick={handleFacebookLogin}
                disabled={fbLoading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#1877F2',
                  color: 'white',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: fbLoading ? 'wait' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)'
                }}
              >
                {fbLoading ? <Loader2 size={18} className="spin" /> : <Share2 size={18} />}
                Đăng nhập & Kết nối Fanpage Facebook
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Soạn & Đăng bài viết lên Fanpage */}
      {isConnected && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Send size={18} color="var(--color-red)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Đăng bài viết mới lên Fanpage
            </h3>
          </div>

          {postResult && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: postResult.success ? '#ECFDF5' : '#FEE2E2',
              border: `1px solid ${postResult.success ? '#10B981' : '#EF4444'}`,
              borderRadius: '10px',
              color: postResult.success ? '#065F46' : '#B91C1C',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px'
            }}>
              <span>{postResult.message}</span>
              {postResult.postId && (
                <a
                  href={`https://facebook.com/${postResult.postId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#1D4ED8',
                    fontWeight: 700,
                    textDecoration: 'underline'
                  }}
                >
                  Xem bài viết <ExternalLink size={13} />
                </a>
              )}
            </div>
          )}

          <form onSubmit={handlePublishPost} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Nội dung bài đăng (*):
              </label>
              <textarea
                required
                rows={4}
                placeholder="Nhập nội dung thông báo, câu Lời Chúa hoặc giải đáp thắc mắc để đăng lên Fanpage..."
                value={postMessage}
                onChange={(e) => setPostMessage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.92rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Đường dẫn liên kết đính kèm (Link - tuỳ chọn):
              </label>
              <input
                type="url"
                placeholder="https://chanhtoa.tnttgiaophanmytho.online/gio-le"
                value={postLink}
                onChange={(e) => setPostLink(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '6px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setPostMessage('🔔 THÔNG BÁO GIỜ LỄ GIÁO XỨ CHÁNH TOÀ MỸ THO:\n⏰ Chúa Nhật: 05g15, 07g30, 16g30, 18g30\n⏰ Ngày thường: 05g15, 17g45\n\nTra cứu thêm 3.300+ nhà thờ toàn quốc tại:');
                    setPostLink(window.location.origin + '/gio-le');
                  }}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#F3F4F6',
                    color: '#374151',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  📋 Mẫu: Giờ Lễ
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPostMessage('🕊️ LỜI CHÚA HÔM NAY:\n"Với Đấng ban sức mạnh cho tôi, tôi chịu được hết mọi sự." (Pl 4, 13)\n\nChúc cộng đoàn một ngày mới tràn đầy hồng ân Chúa!');
                  }}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#F3F4F6',
                    color: '#374151',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  ✨ Mẫu: Lời Chúa
                </button>
              </div>

              <button
                type="submit"
                disabled={posting}
                style={{
                  padding: '11px 22px',
                  backgroundColor: '#1877F2',
                  color: 'white',
                  borderRadius: '10px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: posting ? 'wait' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)'
                }}
              >
                {posting ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
                Đăng bài lên Fanpage
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
