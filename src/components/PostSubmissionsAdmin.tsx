'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { authedFetch } from '@/lib/authedFetch';
import {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Phone,
  Tag,
  Edit3,
  Trash2,
  Send,
  Loader2,
  ExternalLink,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Eye,
  X
} from 'lucide-react';

interface Submission {
  id: string;
  authorName: string;
  authorContact?: string;
  authorRole?: string;
  title: string;
  category: string;
  content: string;
  mediaUrls?: string[];
  source?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  publishedPostId?: string;
  rejectionReason?: string;
}

export default function PostSubmissionsAdmin() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);

  // Edit Modal State
  const [editingSub, setEditingSub] = useState<Submission | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editSource, setEditSource] = useState('');
  const [editMediaInput, setEditMediaInput] = useState('');
  const [editMediaUrls, setEditMediaUrls] = useState<string[]>([]);
  const [savingEdit, setSavingEdit] = useState(false);

  // Action states
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<{ text: string; success: boolean } | null>(null);

  const showToast = (text: string, success = true) => {
    setToastMsg({ text, success });
    setTimeout(() => setToastMsg(null), 4000);
  };

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authedFetch('/api/post-submissions');
      const data = await res.json();
      if (res.ok && data.submissions) {
        setSubmissions(data.submissions);
      }
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Open Edit Modal
  const openEditModal = (sub: Submission) => {
    setEditingSub(sub);
    setEditTitle(sub.title);
    setEditContent(sub.content);
    setEditCategory(sub.category);
    setEditSource(sub.source || '');
    setEditMediaUrls(sub.mediaUrls || []);
    setEditMediaInput('');
  };

  // Save Edit
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSub) return;

    setSavingEdit(true);
    try {
      const finalMedia = [...editMediaUrls];
      if (editMediaInput.trim() && !finalMedia.includes(editMediaInput.trim())) {
        finalMedia.push(editMediaInput.trim());
      }

      const res = await authedFetch('/api/post-submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingSub.id,
          title: editTitle.trim(),
          content: editContent.trim(),
          category: editCategory.trim(),
          source: editSource.trim(),
          mediaUrls: finalMedia
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi khi lưu chỉnh sửa');

      showToast('Đã lưu bài viết chuẩn hóa thành công!');
      setEditingSub(null);
      fetchSubmissions();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi lưu bài');
    } finally {
      setSavingEdit(false);
    }
  };

  // Approve and optionally publish to Facebook
  const handleApprove = async (sub: Submission, publishToFb: boolean) => {
    const confirmMsg = publishToFb
      ? 'Bạn có muốn phê duyệt bài viết này và ĐĂNG NGAY lên Fanpage Facebook?'
      : 'Phê duyệt lưu trữ bài viết này?';
    if (!confirm(confirmMsg)) return;

    setActionLoadingId(sub.id);
    try {
      const res = await authedFetch('/api/post-submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: sub.id,
          status: 'approved',
          publishToFacebook: publishToFb
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi khi phê duyệt');

      showToast(
        publishToFb && data.publishedPostId
          ? 'Đã phê duyệt và đăng bài lên Fanpage Facebook thành công!'
          : 'Đã phê duyệt bài viết!'
      );
      fetchSubmissions();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi duyệt bài');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Reject
  const handleReject = async (sub: Submission) => {
    const reason = prompt('Nhập lý do từ chối (tuỳ chọn):', 'Nội dung chưa phù hợp với quy chuẩn Xứ Đoàn');
    if (reason === null) return;

    setActionLoadingId(sub.id);
    try {
      const res = await authedFetch('/api/post-submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: sub.id,
          status: 'rejected',
          rejectionReason: reason
        })
      });

      if (!res.ok) throw new Error('Lỗi khi từ chối bài');

      showToast('Đã chuyển bài viết sang trạng thái từ chối');
      fetchSubmissions();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi từ chối');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa vĩnh viễn bài đóng góp này?')) return;

    setActionLoadingId(id);
    try {
      const res = await authedFetch(`/api/post-submissions?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Không thể xóa bài');

      showToast('Đã xóa bài viết đóng góp.');
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (selectedSub?.id === id) setSelectedSub(null);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi xóa bài');
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredList = submissions.filter((s) => {
    if (activeFilter === 'all') return true;
    return s.status === activeFilter;
  });

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 99999,
            padding: '12px 20px',
            backgroundColor: toastMsg.success ? '#059669' : '#DC2626',
            color: '#FFF',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}
        >
          {toastMsg.text}
        </div>
      )}

      {/* Top Bar with Filter Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          backgroundColor: 'var(--color-surface)',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid var(--color-border)'
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveFilter('pending')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              backgroundColor: activeFilter === 'pending' ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
              color: activeFilter === 'pending' ? '#FFF' : 'var(--color-text)'
            }}
          >
            Chờ duyệt ({pendingCount})
          </button>
          <button
            onClick={() => setActiveFilter('approved')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              backgroundColor: activeFilter === 'approved' ? '#059669' : 'var(--color-bg-secondary)',
              color: activeFilter === 'approved' ? '#FFF' : 'var(--color-text)'
            }}
          >
            Đã duyệt ({submissions.filter((s) => s.status === 'approved').length})
          </button>
          <button
            onClick={() => setActiveFilter('rejected')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              backgroundColor: activeFilter === 'rejected' ? '#DC2626' : 'var(--color-bg-secondary)',
              color: activeFilter === 'rejected' ? '#FFF' : 'var(--color-text)'
            }}
          >
            Từ chối ({submissions.filter((s) => s.status === 'rejected').length})
          </button>
          <button
            onClick={() => setActiveFilter('all')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              backgroundColor: activeFilter === 'all' ? '#475569' : 'var(--color-bg-secondary)',
              color: activeFilter === 'all' ? '#FFF' : 'var(--color-text)'
            }}
          >
            Tất cả ({submissions.length})
          </button>
        </div>

        <button
          onClick={fetchSubmissions}
          disabled={loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-text)',
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          Làm mới
        </button>
      </div>

      {/* Submissions List */}
      {loading && submissions.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          <Loader2 size={24} className="spin" style={{ margin: '0 auto 8px auto' }} />
          Đang tải danh sách bài viết đóng góp...
        </div>
      ) : filteredList.length === 0 ? (
        <div
          style={{
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: 'var(--color-surface)',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)'
          }}
        >
          <CheckCircle2 size={32} style={{ margin: '0 auto 8px auto', color: '#059669' }} />
          Không có bài viết nào trong mục này.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredList.map((sub) => {
            const isLoading = actionLoadingId === sub.id;

            return (
              <div
                key={sub.id}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                {/* Header info */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {sub.status === 'pending' && (
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#FEF3C7',
                          color: '#D97706',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                      >
                        ● Chờ duyệt
                      </span>
                    )}
                    {sub.status === 'approved' && (
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#ECFDF5',
                          color: '#059669',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                      >
                        ✓ Đã duyệt
                      </span>
                    )}
                    {sub.status === 'rejected' && (
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#FEF2F2',
                          color: '#DC2626',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                      >
                        ✕ Từ chối
                      </span>
                    )}

                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--color-bg-secondary)',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      {sub.category}
                    </span>

                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {new Date(sub.createdAt).toLocaleString('vi-VN')}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => openEditModal(sub)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-surface)',
                        color: 'var(--color-text)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <Edit3 size={14} /> Chỉnh sửa / Chuẩn hóa
                    </button>

                    {sub.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(sub, true)}
                          disabled={isLoading}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: '#1877F2',
                            color: '#FFF',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          <Send size={14} /> Duyệt & Đăng FB
                        </button>

                        <button
                          onClick={() => handleReject(sub)}
                          disabled={isLoading}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid #FCA5A5',
                            backgroundColor: '#FEF2F2',
                            color: '#DC2626',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          Từ chối
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleDelete(sub.id)}
                      disabled={isLoading}
                      title="Xóa bài viết"
                      style={{
                        padding: '6px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: 'var(--color-text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Author Info */}
                <div
                  style={{
                    padding: '8px 12px',
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap'
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <User size={14} /> Người gửi: {sub.authorName} ({sub.authorRole || 'Giáo dân'})
                  </span>
                  {sub.authorContact && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)' }}>
                      <Phone size={14} /> Liên hệ: {sub.authorContact}
                    </span>
                  )}
                  {sub.source && (
                    <span style={{ color: 'var(--color-text-muted)' }}>Nguồn: {sub.source}</span>
                  )}
                </div>

                {/* Title and Content */}
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--color-text)' }}>
                    {sub.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--color-text)',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                      margin: 0
                    }}
                  >
                    {sub.content}
                  </p>
                </div>

                {/* Media Links */}
                {sub.mediaUrls && sub.mediaUrls.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                      Tài liệu / Ảnh đính kèm ({sub.mediaUrls.length}):
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {sub.mediaUrls.map((url, i) => (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '4px 10px',
                            backgroundColor: 'rgba(24, 119, 242, 0.08)',
                            color: '#1877F2',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          🔗 Mở link {i + 1} <ExternalLink size={11} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Edit & Curate Submission Modal (Admin CRUD) */}
      {editingSub && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setEditingSub(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '720px',
              maxHeight: '90vh',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--color-bg-secondary)'
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--color-text)' }}>
                Biên Tập & Chuẩn Hóa Bài Viết (Admin CRUD)
              </h3>
              <button
                onClick={() => setEditingSub(null)}
                style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  Tiêu đề bài viết (Chuẩn hóa chữ hoa):
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text)',
                    fontSize: '0.95rem',
                    fontWeight: 700
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  Nội dung bài viết (Chỉnh sửa câu cú, bổ sung thông tin):
                </label>
                <textarea
                  required
                  rows={8}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                    Chuyên mục:
                  </label>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                    Nguồn / Bản quyền:
                  </label>
                  <input
                    type="text"
                    value={editSource}
                    onChange={(e) => setEditSource(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  Thêm URL ảnh / video trực tiếp:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="url"
                    value={editMediaInput}
                    onChange={(e) => setEditMediaInput(e.target.value)}
                    placeholder="https://...jpg/png"
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      fontSize: '0.85rem'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (editMediaInput.trim() && !editMediaUrls.includes(editMediaInput.trim())) {
                        setEditMediaUrls([...editMediaUrls, editMediaInput.trim()]);
                        setEditMediaInput('');
                      }
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    + Thêm
                  </button>
                </div>

                {editMediaUrls.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                    {editMediaUrls.map((url, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '4px 8px',
                          backgroundColor: 'var(--color-bg-secondary)',
                          borderRadius: '6px',
                          fontSize: '0.78rem'
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '85%' }}>
                          🔗 {url}
                        </span>
                        <button
                          type="button"
                          onClick={() => setEditMediaUrls(editMediaUrls.filter((u) => u !== url))}
                          style={{ border: 'none', background: 'none', color: '#EF4444', cursor: 'pointer' }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setEditingSub(null)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFF',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {savingEdit ? <Loader2 size={16} className="spin" /> : <CheckCircle2 size={16} />}
                  Lưu Bài Viết
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
