'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';
import {
  Send,
  Loader2,
  ExternalLink,
  Trash2,
  RefreshCw,
  Share2,
  Edit3,
  MessageSquare,
  ThumbsUp,
  X,
  Sparkles,
  Key,
  HelpCircle
} from 'lucide-react';
import Image from 'next/image';

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

interface FBPost {
  id: string;
  message: string;
  created_time: string;
  full_picture?: string | null;
  permalink_url: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

interface FBComment {
  id: string;
  message: string;
  created_time: string;
  from?: { name?: string; id?: string };
  like_count?: number;
  comments?: { data?: FBComment[] };
}

export default function FacebookAdmin() {
  const [fbSettings, setFbSettings] = useState<FacebookSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [fbLoading, setFbLoading] = useState(false);

  // Feed Posts
  const [posts, setPosts] = useState<FBPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);

  // Form soạn bài đăng mới
  const [postMessage, setPostMessage] = useState('');
  const [postLink, setPostLink] = useState('');
  const [posting, setPosting] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Manual Token Form
  const [manualPageId, setManualPageId] = useState('');
  const [manualPageToken, setManualPageToken] = useState('');
  const [manualPageName, setManualPageName] = useState('');
  const [savingManual, setSavingManual] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);

  // Edit Post Modal
  const [editingPost, setEditingPost] = useState<FBPost | null>(null);
  const [editMessage, setEditMessage] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);

  // Comments Modal
  const [activeCommentPost, setActiveCommentPost] = useState<FBPost | null>(null);
  const [comments, setComments] = useState<FBComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  const showToast = (text: string, success = true) => {
    setToastMsg({ text, success });
    setTimeout(() => setToastMsg(null), 4000);
  };

  const fetchPosts = useCallback(async () => {
    setPostsLoading(true);
    try {
      const res = await fetch('/api/facebook/posts');
      const data = await res.json();
      if (res.ok && data.posts) {
        setPosts(data.posts);
      } else {
        console.warn('Cannot load posts:', data.error);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setPostsLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'facebook'), (snap) => {
      if (snap.exists()) {
        const data = snap.data() as FacebookSettings;
        setFbSettings(data);
        if (data.connected && data.selectedPageId) {
          fetchPosts();
        }
      } else {
        setFbSettings(null);
      }
      setLoading(false);
    }, (err) => {
      console.error('Error reading facebook settings:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchPosts]);

  const handleFacebookLogin = () => {
    setFbLoading(true);
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const redirectUri = encodeURIComponent(`${origin}/api/facebook/callback`);
    const scope = 'public_profile,pages_show_list,pages_read_engagement,pages_manage_posts';

    // auth_type=rerequest bắt buộc Facebook hiển thị lại màn hình chọn Fanpage
    window.location.href = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&auth_type=rerequest`;
  };

  // Cấu hình thủ công Page Token
  const handleSaveManualToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualPageId.trim() || !manualPageToken.trim()) {
      alert('Vui lòng nhập Page ID và Page Access Token.');
      return;
    }

    setSavingManual(true);
    try {
      const res = await fetch('/api/facebook/connect-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId: manualPageId.trim(),
          pageToken: manualPageToken.trim(),
          pageName: manualPageName.trim() || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Không thể kết nối');

      showToast(` Kết nối thành công với Fanpage: ${data.pageName}!`);
      setShowManualForm(false);
      setManualPageId('');
      setManualPageToken('');
      setManualPageName('');
      fetchPosts();

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi kết nối';
      alert(msg);
    } finally {
      setSavingManual(false);
    }
  };

  const handleSwitchPage = async (page: FacebookPage) => {
    try {
      await updateDoc(doc(db, 'settings', 'facebook'), {
        selectedPageId: page.id,
        selectedPageName: page.name,
        selectedPageToken: page.access_token
      });
      showToast(`Đã chuyển sang Fanpage: ${page.name}`);
      fetchPosts();
    } catch (err: unknown) {
      console.error(err);
      alert('Không thể chuyển trang.');
    }
  };

  const handleDisconnect = async () => {
    if (!confirm('Bạn có chắc chắn muốn huỷ kết nối Fanpage Facebook này?')) return;
    try {
      await deleteDoc(doc(db, 'settings', 'facebook'));
      setPosts([]);
      showToast('Đã huỷ kết nối Fanpage.');
    } catch (err: unknown) {
      console.error(err);
      alert('Lỗi khi huỷ kết nối.');
    }
  };

  // Đăng bài viết mới
  const handlePublishPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postMessage.trim()) {
      alert('Vui lòng nhập nội dung bài viết.');
      return;
    }

    setPosting(true);
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
      if (!res.ok) throw new Error(data.error || 'Đăng bài thất bại');

      showToast(` Đã đăng bài viết thành công lên Fanpage ${data.pageName}!`);
      setPostMessage('');
      setPostLink('');
      fetchPosts();

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi không xác định';
      showToast(msg, false);
    } finally {
      setPosting(false);
    }
  };

  // Xoá bài viết
  const handleDeletePost = async (postId: string) => {
    if (!confirm('Bạn có chắc muốn xoá bài viết này trên Fanpage? Thao tác này không thể hoàn tác.')) return;

    try {
      const res = await fetch(`/api/facebook/posts?postId=${postId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Không thể xoá bài viết');

      showToast('🗑️ Đã xoá bài viết thành công khỏi Fanpage.');
      setPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi khi xoá';
      alert(msg);
    }
  };

  // Lưu sửa bài viết
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editMessage.trim()) return;

    setSavingEdit(true);
    try {
      const res = await fetch('/api/facebook/posts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: editingPost.id,
          message: editMessage.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Không thể cập nhật bài viết');

      showToast(' Đã chỉnh sửa nội dung bài viết thành công!');
      setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, message: editMessage.trim() } : p));
      setEditingPost(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi khi sửa';
      alert(msg);
    } finally {
      setSavingEdit(false);
    }
  };

  // Tải bình luận
  const loadComments = async (post: FBPost) => {
    setActiveCommentPost(post);
    setCommentsLoading(true);
    setComments([]);
    try {
      const res = await fetch(`/api/facebook/comments?postId=${post.id}`);
      const data = await res.json();
      if (res.ok && data.comments) {
        setComments(data.comments);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCommentsLoading(false);
    }
  };

  // Trả lời bình luận
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCommentPost || !replyText.trim()) return;

    setSendingReply(true);
    try {
      const res = await fetch('/api/facebook/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetId: activeCommentPost.id,
          message: replyText.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Không thể gửi bình luận');

      showToast(' Đã phản hồi bình luận thành công!');
      setReplyText('');
      loadComments(activeCommentPost);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi khi gửi phản hồi';
      alert(msg);
    } finally {
      setSendingReply(false);
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Toast Alert */}
      {toastMsg && (
        <div style={{
          padding: '12px 18px',
          backgroundColor: toastMsg.success ? '#ECFDF5' : '#FEE2E2',
          border: `1px solid ${toastMsg.success ? '#10B981' : '#EF4444'}`,
          borderRadius: '12px',
          color: toastMsg.success ? '#065F46' : '#B91C1C',
          fontWeight: 700,
          fontSize: '0.9rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          {toastMsg.text}
        </div>
      )}

      {/* 1. Header Quản lý & Trạng thái kết nối */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                backgroundColor: '#1877F2', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900
              }}>
                f
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                Quản lý & Tương tác Fanpage Facebook
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0 40px' }}>
              Soạn bài, thống kê lượt tương tác, sửa/xoá bài và trả lời bình luận trực tiếp ngay trên hệ thống.
            </p>
          </div>

          {isConnected && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={fetchPosts}
                disabled={postsLoading}
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
                title="Tải lại danh sách bài viết"
              >
                <RefreshCw size={13} className={postsLoading ? 'spin' : ''} /> Làm mới bài viết
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

              {fbSettings.pages && fbSettings.pages.length > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#065F46', fontWeight: 600 }}>Chuyển Trang:</span>
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
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {/* Cách 1: Đăng nhập Facebook tự động */}
              <div style={{ textAlign: 'center', paddingBottom: '16px', borderBottom: '1px dashed #D1D5DB' }}>
                <p style={{ color: '#374151', marginBottom: '14px', fontSize: '0.92rem', fontWeight: 600 }}>
                  Cách 1: Đăng nhập trực tiếp tài khoản Facebook quản trị Fanpage
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

              {/* Cách 2: Nhập trực tiếp Page Token & Page ID */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1F2937', fontWeight: 700, fontSize: '0.92rem' }}>
                    <Key size={16} color="#D97706" />
                    <span>Cách 2: Cấu hình nhanh bằng Page ID & Page Access Token</span>
                  </div>
                  <button
                    onClick={() => setShowManualForm(!showManualForm)}
                    style={{
                      fontSize: '0.82rem', color: '#2563EB', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer'
                    }}
                  >
                    {showManualForm ? 'Ẩn form nhập' : 'Hiển thị form nhập'}
                  </button>
                </div>

                {showManualForm && (
                  <form onSubmit={handleSaveManualToken} style={{
                    display: 'flex', flexDirection: 'column', gap: '12px',
                    backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB'
                  }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                        Facebook Page ID (*):
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: 1029384756..."
                        value={manualPageId}
                        onChange={(e) => setManualPageId(e.target.value)}
                        style={{
                          width: '100%', padding: '9px 12px', borderRadius: '8px',
                          border: '1px solid #D1D5DB', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                        Page Access Token (*):
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Dán mã Page Access Token (EAA...)..."
                        value={manualPageToken}
                        onChange={(e) => setManualPageToken(e.target.value)}
                        style={{
                          width: '100%', padding: '9px 12px', borderRadius: '8px',
                          border: '1px solid #D1D5DB', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                        Tên Fanpage (Tuỳ chọn):
                      </label>
                      <input
                        type="text"
                        placeholder="VD: Xứ Đoàn Các Thánh Tử Đạo Việt Nam..."
                        value={manualPageName}
                        onChange={(e) => setManualPageName(e.target.value)}
                        style={{
                          width: '100%', padding: '9px 12px', borderRadius: '8px',
                          border: '1px solid #D1D5DB', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <a
                        href="https://developers.facebook.com/tools/explorer/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.78rem', color: '#2563EB', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <HelpCircle size={13} /> Lấy Page Token từ Graph API Explorer
                      </a>

                      <button
                        type="submit"
                        disabled={savingManual}
                        style={{
                          padding: '9px 18px', backgroundColor: '#059669', color: 'white',
                          borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '0.88rem',
                          cursor: savingManual ? 'wait' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px'
                        }}
                      >
                        {savingManual ? <Loader2 size={15} className="spin" /> : <Key size={15} />}
                        Lưu & Kết nối Fanpage ngay
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Soạn thảo & Đăng bài mới */}
      {isConnected && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Send size={18} color="var(--color-red)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Soạn bài viết mới lên Fanpage
            </h3>
          </div>

          <form onSubmit={handlePublishPost} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <textarea
                required
                rows={4}
                placeholder="Nhập nội dung thông báo, câu Lời Chúa, giải đáp thắc mắc để đăng lên Fanpage..."
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
              <input
                type="url"
                placeholder="Đường dẫn đính kèm (vd: https://chanhtoa.tnttgiaophanmytho.online/gio-le)..."
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
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
                  <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} /> Mẫu: Lời Chúa
                </button>
              </div>

              <button
                type="submit"
                disabled={posting}
                style={{
                  padding: '10px 22px',
                  backgroundColor: '#1877F2',
                  color: 'white',
                  borderRadius: '10px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: posting ? 'wait' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)'
                }}
              >
                {posting ? <Loader2 size={15} className="spin" /> : <Send size={15} />}
                Đăng bài lên Fanpage
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. Danh sách Bài viết & Thống kê Tương tác Trực tiếp */}
      {isConnected && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Danh sách bài viết & Thống kê trên Fanpage ({posts.length})
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
              Tự động cập nhật lượt Thích & Bình luận
            </span>
          </div>

          {postsLoading ? (
            <div style={{ padding: '36px', textAlign: 'center', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Loader2 className="spin" size={18} /> Đang tải dữ liệu bài viết từ Fanpage...
            </div>
          ) : posts.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#6B7280', fontSize: '0.9rem' }}>
              Chưa có bài viết nào trên Fanpage hoặc quyền truy cập bài viết đang được đồng bộ.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {posts.map(post => (
                <div key={post.id} style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  backgroundColor: '#FAFAFA'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        margin: 0,
                        color: '#1F2937',
                        fontSize: '0.92rem',
                        lineHeight: 1.5,
                        whiteSpace: 'pre-wrap',
                        fontWeight: 500
                      }}>
                        {post.message}
                      </p>
                      <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '6px' }}>
                        🕒 {new Date(post.created_time).toLocaleString('vi-VN')}
                      </div>
                    </div>

                    {post.full_picture && (
                      <div style={{
                        position: 'relative',
                        width: '80px',
                        height: '80px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}>
                        <Image
                          src={post.full_picture}
                          alt="Thumbnail bài viết"
                          fill
                          sizes="80px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Thống kê & Phím chức năng */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #E5E7EB',
                    paddingTop: '12px',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    {/* Thống kê */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#2563EB', fontSize: '0.85rem', fontWeight: 700 }}>
                        <ThumbsUp size={15} />
                        <span>{post.likesCount} Thích</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#059669', fontSize: '0.85rem', fontWeight: 700 }}>
                        <MessageSquare size={15} />
                        <span>{post.commentsCount} Bình luận</span>
                      </div>
                      {post.sharesCount > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#7C3AED', fontSize: '0.85rem', fontWeight: 700 }}>
                          <Share2 size={15} />
                          <span>{post.sharesCount} Chia sẻ</span>
                        </div>
                      )}
                    </div>

                    {/* Phím hành động */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => loadComments(post)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#EEF2FF',
                          color: '#4F46E5',
                          borderRadius: '6px',
                          border: '1px solid #C7D2FE',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <MessageSquare size={13} /> Trả lời bình luận
                      </button>

                      <button
                        onClick={() => {
                          setEditingPost(post);
                          setEditMessage(post.message);
                        }}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: '#F3F4F6',
                          color: '#374151',
                          borderRadius: '6px',
                          border: '1px solid #D1D5DB',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        title="Sửa nội dung bài viết"
                      >
                        <Edit3 size={13} /> Sửa
                      </button>

                      <button
                        onClick={() => handleDeletePost(post.id)}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: '#FEE2E2',
                          color: '#DC2626',
                          borderRadius: '6px',
                          border: '1px solid #FCA5A5',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        title="Xoá bài viết này trên Fanpage"
                      >
                        <Trash2 size={13} /> Xoá
                      </button>

                      <a
                        href={post.permalink_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '6px 10px',
                          backgroundColor: '#F3F4F6',
                          color: '#4B5563',
                          borderRadius: '6px',
                          border: '1px solid #D1D5DB',
                          fontSize: '0.8rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          textDecoration: 'none'
                        }}
                        title="Mở bài viết trên Facebook"
                      >
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: Chỉnh sửa bài viết */}
      {editingPost && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '520px',
            padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#111827' }}>
                ✏️ Chỉnh sửa bài viết Fanpage
              </h3>
              <button onClick={() => setEditingPost(null)} style={{ color: '#9CA3AF', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <textarea
                rows={5}
                required
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                style={{
                  width: '100%', padding: '12px', borderRadius: '10px',
                  border: '1px solid #D1D5DB', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  style={{
                    padding: '8px 16px', backgroundColor: '#F3F4F6', color: '#374151',
                    borderRadius: '8px', border: '1px solid #D1D5DB', fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Huỷ
                </button>

                <button
                  type="submit"
                  disabled={savingEdit}
                  style={{
                    padding: '8px 20px', backgroundColor: '#1877F2', color: 'white',
                    borderRadius: '8px', border: 'none', fontWeight: 700, cursor: savingEdit ? 'wait' : 'pointer'
                  }}
                >
                  {savingEdit ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Xem & Trả lời Bình luận */}
      {activeCommentPost && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '580px',
            maxHeight: '85vh', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)', overflow: 'hidden'
          }}>
            <div style={{
              padding: '16px 20px', borderBottom: '1px solid #E5E7EB',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#111827' }}>
                  💬 Bình luận trên bài viết
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px', maxWidth: '440px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {activeCommentPost.message}
                </div>
              </div>
              <button onClick={() => setActiveCommentPost(null)} style={{ color: '#9CA3AF', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Comment list */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {commentsLoading ? (
                <div style={{ padding: '30px', textAlign: 'center', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Loader2 className="spin" size={16} /> Đang tải bình luận...
                </div>
              ) : comments.length === 0 ? (
                <div style={{ padding: '30px', textAlign: 'center', color: '#6B7280', fontSize: '0.88rem' }}>
                  Chưa có bình luận nào trên bài viết này. Hãy là người đầu tiên trả lời!
                </div>
              ) : (
                comments.map(c => (
                  <div key={c.id} style={{
                    padding: '10px 14px', backgroundColor: '#F3F4F6', borderRadius: '12px',
                    display: 'flex', flexDirection: 'column', gap: '4px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.85rem' }}>
                        {c.from?.name || 'Người dùng Facebook'}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                        {new Date(c.created_time).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#374151', whiteSpace: 'pre-wrap' }}>
                      {c.message}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Reply Input Box */}
            <form onSubmit={handleSendReply} style={{
              padding: '14px 20px', borderTop: '1px solid #E5E7EB', backgroundColor: '#FAFAFA',
              display: 'flex', gap: '8px', alignItems: 'center'
            }}>
              <input
                type="text"
                required
                placeholder="Nhập câu trả lời dưới danh nghĩa Fanpage..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                style={{
                  flex: 1, padding: '10px 14px', borderRadius: '10px',
                  border: '1px solid #D1D5DB', fontSize: '0.88rem', outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={sendingReply}
                style={{
                  padding: '10px 16px', backgroundColor: '#1877F2', color: 'white',
                  borderRadius: '10px', border: 'none', fontWeight: 700, fontSize: '0.85rem',
                  cursor: sendingReply ? 'wait' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px'
                }}
              >
                {sendingReply ? <Loader2 size={14} className="spin" /> : <Send size={14} />}
                Gửi
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
