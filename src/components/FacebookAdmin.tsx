'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { authedFetch } from '@/lib/authedFetch';
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
  Heart,
  Globe,
  X,
  Sparkles,
  Key,
  HelpCircle
} from 'lucide-react';
import Image from 'next/image';
import { FbPostSkeleton } from '@/components/Skeleton';

interface FacebookPage {
  id: string;
  name: string;
}

interface FacebookSettings {
  connected: boolean;
  selectedPageId?: string;
  selectedPageName?: string;
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
  const [statusMsg, setStatusMsg] = useState('');
  const [tokenExpiry, setTokenExpiry] = useState<{ expiresAt: number | null; neverExpires: boolean; expiringSoon: boolean } | null>(null);

  // Feed Posts
  const [posts, setPosts] = useState<FBPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);

  // Form soạn bài đăng mới
  const [composerOpen, setComposerOpen] = useState(false);
  const [menuPostId, setMenuPostId] = useState<string | null>(null);
  const [postMessage, setPostMessage] = useState('');
  const [postLink, setPostLink] = useState('');
  const [postPhotoUrl, setPostPhotoUrl] = useState('');
  const [postVideoUrl, setPostVideoUrl] = useState('');
  const [mediaTab, setMediaTab] = useState<'link' | 'photo' | 'video'>('link');
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

  // Đóng menu ⋯ khi bấm ra ngoài, giống hành vi của Facebook
  useEffect(() => {
    if (!menuPostId) return;
    const close = () => setMenuPostId(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [menuPostId]);

  const showToast = (text: string, success = true) => {
    setToastMsg({ text, success });
    setTimeout(() => setToastMsg(null), 4000);
  };

  const fetchPosts = useCallback(async () => {
    setPostsLoading(true);
    try {
      const res = await authedFetch('/api/facebook/posts');
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

  // Kiểm tra trạng thái + tính hiệu lực của Token qua API (nguồn sự thật duy nhất)
  const checkStatus = useCallback(async () => {
    try {
      const res = await authedFetch('/api/facebook/status');
      const data = await res.json();
      if (data.connected && data.pageId) {
        setStatusMsg('');
        setTokenExpiry({
          expiresAt: data.expiresAt ?? null,
          neverExpires: !!data.neverExpires,
          expiringSoon: !!data.expiringSoon
        });
        setFbSettings({
          connected: true,
          selectedPageId: data.pageId,
          selectedPageName: data.pageName || 'Fanpage Xứ Đoàn',
          pages: data.pages || []
        });
        fetchPosts();
      } else {
        setStatusMsg(data.message || data.error || '');
        setTokenExpiry(null);
        setFbSettings(null);
        setPosts([]);
      }
    } catch (e) {
      console.warn('Cannot check facebook status:', e);
      setStatusMsg('Không kết nối được tới máy chủ.');
    } finally {
      setLoading(false);
    }
  }, [fetchPosts]);

  useEffect(() => {
    // Chờ Firebase Auth sẵn sàng rồi mới gọi API (mọi API đều cần ID Token của Admin)
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        checkStatus();
      } else {
        setStatusMsg('Bạn cần đăng nhập tài khoản quản trị.');
        setLoading(false);
      }
    });
  }, [checkStatus]);

  // Cấu hình thủ công Page Token
  const handleSaveManualToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualPageToken.trim()) {
      alert('Vui lòng nhập Page Access Token.');
      return;
    }

    setSavingManual(true);
    try {
      const res = await authedFetch('/api/facebook/connect-token', {
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

      showToast(`Kết nối thành công với Fanpage: ${data.pageName}!`);
      setShowManualForm(false);
      setManualPageId('');
      setManualPageToken('');
      setManualPageName('');
      checkStatus();

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi kết nối';
      alert(msg);
    } finally {
      setSavingManual(false);
    }
  };

  const handleSwitchPage = async (page: FacebookPage) => {
    try {
      const res = await authedFetch('/api/facebook/connect-token', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId: page.id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Không thể chuyển trang.');
      showToast(`Đã chuyển sang Fanpage: ${page.name}`);
      checkStatus();
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Không thể chuyển trang.');
    }
  };

  const handleDisconnect = async () => {
    if (!confirm('Bạn có chắc chắn muốn huỷ kết nối Fanpage Facebook này?')) return;
    try {
      const res = await authedFetch('/api/facebook/connect-token', { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi khi huỷ kết nối.');
      setPosts([]);
      showToast('Đã huỷ kết nối Fanpage.');
      checkStatus();
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Lỗi khi huỷ kết nối.');
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
      const payload: Record<string, string> = {
        message: postMessage.trim()
      };
      if (mediaTab === 'link' && postLink.trim()) {
        payload.link = postLink.trim();
      } else if (mediaTab === 'photo' && postPhotoUrl.trim()) {
        payload.photoUrl = postPhotoUrl.trim();
      } else if (mediaTab === 'video' && postVideoUrl.trim()) {
        payload.videoUrl = postVideoUrl.trim();
      }

      const res = await authedFetch('/api/facebook/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Đăng bài thất bại');

      showToast(`Đã đăng bài viết thành công lên Fanpage ${data.pageName || ''}!`);
      setPostMessage('');
      setPostLink('');
      setPostPhotoUrl('');
      setPostVideoUrl('');
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
      const res = await authedFetch(`/api/facebook/posts?postId=${postId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Không thể xoá bài viết');

      showToast('Đã xoá bài viết khỏi Fanpage.');
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
      const res = await authedFetch('/api/facebook/posts', {
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
      const res = await authedFetch(`/api/facebook/comments?postId=${post.id}`);
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
      const res = await authedFetch('/api/facebook/comments', {
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
      <div className="fb">
        <div className="fb-card">
          <div className="fb-status">
            <div className="skeleton skel-circle" style={{ width: '40px', height: '40px' }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton skel-line" style={{ width: '220px' }} />
              <div className="skeleton skel-line" style={{ width: '120px', height: '10px' }} />
            </div>
          </div>
        </div>
        <FbPostSkeleton />
        <FbPostSkeleton />
      </div>
    );
  }

  const isConnected = fbSettings?.connected && fbSettings.selectedPageId;
  const expiringSoon = !!tokenExpiry?.expiringSoon;
  const pageName = fbSettings?.selectedPageName || 'Fanpage';
  const initial = pageName.trim().charAt(0).toUpperCase();

  const timeAgo = (iso: string) => {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60) return 'Vừa xong';
    if (diff < 3600) return `${Math.floor(diff / 60)} phút`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} ngày`;
    return new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const Avatar = ({ name, small }: { name: string; small?: boolean }) => (
    <div
      className={small ? 'fb-avatar fb-avatar-sm' : 'fb-avatar'}
      style={{ display: 'grid', placeItems: 'center', fontWeight: 700, color: 'var(--fb-text-2)' }}
      aria-hidden
    >
      {name.trim().charAt(0).toUpperCase() || '?'}
    </div>
  );

  const PageAvatar = ({ small }: { small?: boolean }) => (
    <div className={small ? 'fb-avatar fb-avatar-sm' : 'fb-avatar'} style={{ position: 'relative', overflow: 'hidden' }}>
      <Image src="/logo.jpg" alt={pageName} fill sizes="40px" style={{ objectFit: 'cover' }} />
    </div>
  );

  return (
    <div className="fb">
      {toastMsg && (
        <div className={`fb-toast ${toastMsg.success ? 'fb-toast-ok' : 'fb-toast-err'}`}>
          {toastMsg.text}
        </div>
      )}

      {/* Thanh trang: giống hàng thông tin Trang của Facebook */}
      <div className="fb-card">
        <div className="fb-status">
          {isConnected ? <PageAvatar /> : (
            <div className="fb-avatar" style={{ display: 'grid', placeItems: 'center', background: 'var(--fb-blue)', color: '#fff', fontWeight: 900 }}>f</div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="fb-name">{isConnected ? pageName : 'Chưa kết nối Fanpage'}</div>
            <div className="fb-sub" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '3px' }}>
              {isConnected ? (
                <>
                  <span className="fb-chip fb-chip-ok">● Đang kết nối</span>
                  {tokenExpiry?.neverExpires && <span className="fb-chip">Token vĩnh viễn</span>}
                  {expiringSoon && <span className="fb-chip fb-chip-warn">Token sắp hết hạn</span>}
                </>
              ) : (
                <span>{statusMsg || 'Dán Access Token để bắt đầu quản lý.'}</span>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {isConnected && (
              <button className="fb-btn" onClick={() => { checkStatus(); fetchPosts(); }} title="Tải lại">
                <RefreshCw size={16} /> Tải lại
              </button>
            )}
            <button className="fb-btn" onClick={() => setShowManualForm(v => !v)}>
              <Key size={16} /> {isConnected ? 'Đổi token' : 'Kết nối'}
            </button>
          </div>
        </div>

        {isConnected && fbSettings.pages && fbSettings.pages.length > 1 && (
          <div style={{ padding: '0 16px 12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {fbSettings.pages.map(pg => (
              <button
                key={pg.id}
                className="fb-btn"
                style={pg.id === fbSettings.selectedPageId ? { background: 'var(--fb-blue)', color: '#fff' } : undefined}
                onClick={() => handleSwitchPage(pg)}
              >
                {pg.name}
              </button>
            ))}
          </div>
        )}

        {showManualForm && (
          <form onSubmit={handleSaveManualToken} style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--fb-divider)', paddingTop: '14px' }}>
            <div className="fb-sub" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HelpCircle size={14} /> Dán Page Access Token hoặc User Access Token (EAA…). Hệ thống tự đổi sang token dài hạn.
            </div>
            <textarea
              className="fb-composer-input"
              style={{ borderRadius: '8px', minHeight: '80px' }}
              value={manualPageToken}
              onChange={e => setManualPageToken(e.target.value)}
              placeholder="Access Token…"
            />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input className="fb-reply-input" value={manualPageId} onChange={e => setManualPageId(e.target.value)} placeholder="Page ID (tuỳ chọn)" />
              <input className="fb-reply-input" value={manualPageName} onChange={e => setManualPageName(e.target.value)} placeholder="Tên Fanpage (tuỳ chọn)" />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="fb-btn fb-btn-primary" disabled={savingManual}>
                {savingManual ? <Loader2 size={16} className="spin" /> : <Sparkles size={16} />} Kết nối
              </button>
              {isConnected && (
                <button type="button" className="fb-btn fb-btn-danger" onClick={handleDisconnect}>
                  <X size={16} /> Huỷ kết nối
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {!isConnected ? (
        <div className="fb-card fb-empty">
          Kết nối Fanpage để soạn bài, xem tương tác và trả lời bình luận ngay tại đây.
        </div>
      ) : (
        <>
          {/* Ô soạn bài giống khung "Bạn đang nghĩ gì?" */}
          <div className={`fb-card fb-composer ${composerOpen ? 'fb-composer-open' : ''}`}>
            <form onSubmit={handlePublishPost}>
              <div className="fb-composer-row" style={{ alignItems: composerOpen ? 'flex-start' : 'center' }}>
                <PageAvatar />
                <textarea
                  className="fb-composer-input"
                  value={postMessage}
                  onFocus={() => setComposerOpen(true)}
                  onChange={e => setPostMessage(e.target.value)}
                  placeholder={`${pageName} ơi, bạn muốn thông báo điều gì?`}
                  rows={composerOpen ? 4 : 1}
                />
              </div>

              {composerOpen && (
                <>
                  {/* Media Tab Selector */}
                  <div style={{ display: 'flex', gap: '6px', marginTop: '12px', borderBottom: '1px solid var(--fb-divider)', paddingBottom: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setMediaTab('link')}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        backgroundColor: mediaTab === 'link' ? 'var(--fb-blue)' : 'transparent',
                        color: mediaTab === 'link' ? '#FFF' : 'inherit'
                      }}
                    >
                      🔗 Link Website / Báo chí
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaTab('photo')}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        backgroundColor: mediaTab === 'photo' ? 'var(--fb-blue)' : 'transparent',
                        color: mediaTab === 'photo' ? '#FFF' : 'inherit'
                      }}
                    >
                      🖼️ Ảnh trực tiếp (Photo URL)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaTab('video')}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        backgroundColor: mediaTab === 'video' ? 'var(--fb-blue)' : 'transparent',
                        color: mediaTab === 'video' ? '#FFF' : 'inherit'
                      }}
                    >
                      🎥 Video trực tiếp (URL)
                    </button>
                  </div>

                  {mediaTab === 'link' && (
                    <input
                      className="fb-reply-input"
                      style={{ marginTop: '10px', width: '100%' }}
                      value={postLink}
                      onChange={e => setPostLink(e.target.value)}
                      placeholder="Dán link bài viết Website (ví dụ: https://chanhtoa.tnttgiaophanmytho.online/bai-viet/...)"
                    />
                  )}

                  {mediaTab === 'photo' && (
                    <input
                      className="fb-reply-input"
                      style={{ marginTop: '10px', width: '100%' }}
                      value={postPhotoUrl}
                      onChange={e => setPostPhotoUrl(e.target.value)}
                      placeholder="Dán URL hình ảnh trực tiếp (https://...jpg/png)"
                    />
                  )}

                  {mediaTab === 'video' && (
                    <input
                      className="fb-reply-input"
                      style={{ marginTop: '10px', width: '100%' }}
                      value={postVideoUrl}
                      onChange={e => setPostVideoUrl(e.target.value)}
                      placeholder="Dán URL video trực tiếp (https://...mp4)"
                    />
                  )}

                  {/* SEO Suggestion Checklist */}
                  <div
                    style={{
                      marginTop: '10px',
                      padding: '8px 12px',
                      backgroundColor: 'rgba(24, 119, 242, 0.06)',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>💡 Gợi ý SEO:</span>
                    <span style={{ color: postMessage.length > 50 ? '#059669' : '#D97706' }}>
                      {postMessage.length > 50 ? '✓ Độ dài tốt' : '⚠ Nên viết chi tiết hơn'}
                    </span>
                    <span style={{ color: /[A-ZÀ-Ỹ]{3,}/.test(postMessage) ? '#059669' : '#64748B' }}>
                      {/[A-ZÀ-Ỹ]{3,}/.test(postMessage) ? '✓ Có tiêu đề nổi bật' : '○ Thêm tiêu đề in hoa'}
                    </span>
                    <span style={{ color: /#(thongbao|tntt|mytho|chanhtoa)/i.test(postMessage) ? '#059669' : '#64748B' }}>
                      {/#(thongbao|tntt|mytho|chanhtoa)/i.test(postMessage) ? '✓ Có Hashtag' : '○ Thêm #TNTT #MyTho #ChanhToa'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button type="submit" className="fb-btn fb-btn-primary fb-btn-block" disabled={posting || !postMessage.trim()}>
                      {posting ? <Loader2 size={16} className="spin" /> : <Send size={16} />} Đăng lên Fanpage
                    </button>
                    <button
                      type="button"
                      className="fb-btn"
                      onClick={() => {
                        setComposerOpen(false);
                        setPostMessage('');
                        setPostLink('');
                        setPostPhotoUrl('');
                        setPostVideoUrl('');
                      }}
                    >
                      Huỷ
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          {postsLoading && posts.length === 0 && (
            <>
              <FbPostSkeleton />
              <FbPostSkeleton />
              <FbPostSkeleton />
            </>
          )}

          {!postsLoading && posts.length === 0 && (
            <div className="fb-card fb-empty">Fanpage chưa có bài viết nào.</div>
          )}

          {posts.map(post => {
            const open = activeCommentPost?.id === post.id;
            const editing = editingPost?.id === post.id;
            const reactions = post.likesCount;
            const webArticleUrl = `https://chanhtoa.tnttgiaophanmytho.online/bai-viet/${encodeURIComponent(post.id)}`;

            return (
              <div key={post.id} className="fb-card" style={{ position: 'relative' }}>
                <div className="fb-post-head">
                  <PageAvatar />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="fb-name">{pageName}</div>
                    <div className="fb-sub" title={new Date(post.created_time).toLocaleString('vi-VN')}>
                      {timeAgo(post.created_time)} · <Globe size={12} style={{ verticalAlign: '-1px' }} />
                    </div>
                  </div>
                  <button
                    className="fb-action"
                    style={{ flex: 'none', width: '36px', height: '36px', borderRadius: '50%', fontSize: '18px' }}
                    onClick={e => { e.stopPropagation(); setMenuPostId(menuPostId === post.id ? null : post.id); }}
                    aria-label="Tuỳ chọn bài viết"
                  >
                    ⋯
                  </button>
                </div>

                {menuPostId === post.id && (
                  <div className="fb-menu">
                    <button onClick={() => {
                      navigator.clipboard.writeText(webArticleUrl);
                      showToast('Đã sao chép liên kết Website bài viết!');
                      setMenuPostId(null);
                    }}>
                      <Share2 size={17} /> Copy Link Web (SEO 2 chiều)
                    </button>
                    <button onClick={() => {
                      window.open(`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(webArticleUrl)}`, '_blank');
                      setMenuPostId(null);
                    }}>
                      <Sparkles size={17} /> Kiểm tra thẻ SEO (FB Debugger)
                    </button>
                    <button onClick={() => { setEditingPost(post); setEditMessage(post.message); setMenuPostId(null); }}>
                      <Edit3 size={17} /> Chỉnh sửa bài viết
                    </button>
                    <button onClick={() => { window.open(post.permalink_url, '_blank'); setMenuPostId(null); }}>
                      <ExternalLink size={17} /> Mở trên Facebook
                    </button>
                    <button onClick={() => { handleDeletePost(post.id); setMenuPostId(null); }} style={{ color: 'var(--fb-red)' }}>
                      <Trash2 size={17} /> Xoá bài viết
                    </button>
                  </div>
                )}

                {editing ? (
                  <form onSubmit={handleSaveEdit} style={{ padding: '8px 16px 14px' }}>
                    <textarea
                      className="fb-composer-input"
                      style={{ borderRadius: '8px', minHeight: '140px', width: '100%' }}
                      value={editMessage}
                      onChange={e => setEditMessage(e.target.value)}
                    />
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <button type="submit" className="fb-btn fb-btn-primary" disabled={savingEdit}>
                        {savingEdit ? <Loader2 size={16} className="spin" /> : null} Lưu
                      </button>
                      <button type="button" className="fb-btn" onClick={() => setEditingPost(null)}>Huỷ</button>
                    </div>
                  </form>
                ) : (
                  <div className="fb-post-text">{post.message}</div>
                )}

                {post.full_picture && !editing && (
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1.91 / 1' }}>
                    <Image src={post.full_picture} alt="" fill sizes="680px" style={{ objectFit: 'cover' }} className="fb-post-img" />
                  </div>
                )}

                {/* 2-Way Link Bar */}
                <div
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    borderTop: '1px solid var(--fb-divider)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: 'var(--color-text-muted)'
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    🔗 Link Web: <code style={{ backgroundColor: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px' }}>/bai-viet/{post.id.slice(-8)}</code>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(webArticleUrl);
                      showToast('Đã copy link bài viết để đăng/share Facebook!');
                    }}
                    style={{
                      border: '1px solid var(--fb-divider)',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    Copy Link
                  </button>
                </div>

                <div className="fb-stats">
                  <span className="fb-reactions">
                    <span className="fb-reaction-icon" style={{ background: 'var(--fb-blue)' }}>
                      <ThumbsUp size={10} strokeWidth={3} fill="currentColor" />
                    </span>
                    <span className="fb-reaction-icon" style={{ background: '#F3425F', marginLeft: '-8px' }}>
                      <Heart size={10} strokeWidth={3} fill="currentColor" />
                    </span>
                    <span style={{ marginLeft: '4px' }}>{reactions}</span>
                  </span>
                  <span>
                    {post.commentsCount} bình luận · {post.sharesCount} lượt chia sẻ
                  </span>
                </div>

                <div className="fb-actions">
                  <button className="fb-action" onClick={() => (open ? setActiveCommentPost(null) : loadComments(post))}>
                    <MessageSquare size={18} /> Bình luận
                  </button>
                  <button className="fb-action" onClick={() => { setEditingPost(post); setEditMessage(post.message); }}>
                    <Edit3 size={18} /> Sửa
                  </button>
                  <button className="fb-action fb-action-danger" onClick={() => handleDeletePost(post.id)}>
                    <Trash2 size={18} /> Xoá
                  </button>
                </div>

                {open && (
                  <div className="fb-comments">
                    {commentsLoading ? (
                      <div className="fb-sub" style={{ padding: '10px 0', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Loader2 size={15} className="spin" /> Đang tải bình luận…
                      </div>
                    ) : comments.length === 0 ? (
                      <div className="fb-sub" style={{ padding: '10px 0' }}>Chưa có bình luận nào.</div>
                    ) : comments.map(c => (
                      <div key={c.id}>
                        <div className="fb-comment">
                          <Avatar name={c.from?.name || '?'} small />
                          <div style={{ minWidth: 0 }}>
                            <div className="fb-bubble">
                              <div className="fb-name">{c.from?.name || 'Người dùng Facebook'}</div>
                              <p>{c.message}</p>
                            </div>
                            <div className="fb-comment-meta">
                              <span>{timeAgo(c.created_time)}</span>
                              {!!c.like_count && <span><ThumbsUp size={11} style={{ verticalAlign: '-1px' }} /> {c.like_count}</span>}
                            </div>
                          </div>
                        </div>
                        {c.comments?.data?.map(r => (
                          <div key={r.id} className="fb-comment fb-reply-list">
                            <Avatar name={r.from?.name || '?'} small />
                            <div style={{ minWidth: 0 }}>
                              <div className="fb-bubble">
                                <div className="fb-name">{r.from?.name || 'Người dùng Facebook'}</div>
                                <p>{r.message}</p>
                              </div>
                              <div className="fb-comment-meta"><span>{timeAgo(r.created_time)}</span></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    <form onSubmit={handleSendReply} className="fb-reply-form">
                      <PageAvatar small />
                      <input
                        className="fb-reply-input"
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        placeholder="Viết bình luận dưới danh nghĩa Fanpage…"
                      />
                      <button type="submit" className="fb-btn fb-btn-primary" disabled={sendingReply || !replyText.trim()}>
                        {sendingReply ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
