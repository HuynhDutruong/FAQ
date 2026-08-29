'use client';

import React, { useState } from 'react';
import {
  X,
  Send,
  Loader2,
  Image as ImageIcon,
  Video,
  Link2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileText,
  User,
  Phone,
  Tag
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PostSubmissionModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [authorName, setAuthorName] = useState('');
  const [authorContact, setAuthorContact] = useState('');
  const [authorRole, setAuthorRole] = useState('Đoàn sinh / Giáo dân');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sinh hoạt Giáo xứ');
  const [content, setContent] = useState('');
  const [mediaUrlInput, setMediaUrlInput] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAddMedia = () => {
    if (!mediaUrlInput.trim()) return;
    if (!mediaUrls.includes(mediaUrlInput.trim())) {
      setMediaUrls([...mediaUrls, mediaUrlInput.trim()]);
    }
    setMediaUrlInput('');
  };

  const handleRemoveMedia = (url: string) => {
    setMediaUrls(mediaUrls.filter((u) => u !== url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !title.trim() || !content.trim()) {
      setError('Vui lòng điền Họ tên, Tiêu đề và Nội dung bài viết.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const finalMedia = [...mediaUrls];
      if (mediaUrlInput.trim() && !finalMedia.includes(mediaUrlInput.trim())) {
        finalMedia.push(mediaUrlInput.trim());
      }

      const res = await fetch('/api/post-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: authorName.trim(),
          authorContact: authorContact.trim(),
          authorRole,
          title: title.trim(),
          category,
          content: content.trim(),
          mediaUrls: finalMedia,
          source: source.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Không thể gửi bài');

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Lỗi khi gửi bài');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAuthorName('');
    setAuthorContact('');
    setAuthorRole('Đoàn sinh / Giáo dân');
    setTitle('');
    setContent('');
    setMediaUrls([]);
    setMediaUrlInput('');
    setSource('');
    setError(null);
    setSuccess(false);
  };

  return (
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
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 20px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-bg-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(211, 47, 47, 0.12)',
                color: 'var(--color-primary)',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text)', margin: 0 }}>
                Đóng Góp Tin Tức & Bài Viết
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Gửi bài viết, hình ảnh sinh hoạt để Ban Biên Tập duyệt đăng lên Website & Fanpage
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  display: 'grid',
                  placeItems: 'center',
                  margin: '0 auto 16px auto'
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '8px' }}>
                Gửi Bài Viết Thành Công!
              </h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 24px auto' }}>
                Cảm ơn bạn đã đóng góp tin tức cho Xứ Đoàn. Ban Biên Tập sẽ xem xét, chuẩn hóa bài viết và đăng tải trong thời gian sớm nhất.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Gửi bài viết khác
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFF',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Hoàn tất
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {error && (
                <div
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FCA5A5',
                    borderRadius: '8px',
                    color: '#DC2626',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              {/* Tác giả & Liên hệ */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                    Họ và tên của bạn <span style={{ color: 'var(--color-primary)' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Ví dụ: Giuse Nguyễn Văn A"
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 34px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg-secondary)',
                        color: 'var(--color-text)',
                        fontSize: '0.9rem'
                      }}
                    />
                    <User size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--color-text-muted)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                    Số điện thoại / Zalo / Email (nếu cần)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={authorContact}
                      onChange={(e) => setAuthorContact(e.target.value)}
                      placeholder="Để Ban Biên Tập liên hệ"
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 34px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg-secondary)',
                        color: 'var(--color-text)',
                        fontSize: '0.9rem'
                      }}
                    />
                    <Phone size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--color-text-muted)' }} />
                  </div>
                </div>
              </div>

              {/* Vai trò & Chuyên mục */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                    Bạn là:
                  </label>
                  <select
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      color: 'var(--color-text)',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="Đoàn sinh TNTT">Đoàn sinh TNTT</option>
                    <option value="Huynh trưởng / Trợ tá">Huynh trưởng / Trợ tá</option>
                    <option value="Giáo dân Chánh Tòa">Giáo dân Chánh Tòa</option>
                    <option value="Giáo dân Giáo Phận Mỹ Tho">Giáo dân Giáo Phận Mỹ Tho</option>
                    <option value="Cộng tác viên truyền thông">Cộng tác viên truyền thông</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                    Chuyên mục:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      color: 'var(--color-text)',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="Sinh hoạt Xứ Đoàn TNTT">Sinh hoạt Xứ Đoàn TNTT</option>
                    <option value="Sinh hoạt Giáo xứ Chánh Tòa">Sinh hoạt Giáo xứ Chánh Tòa</option>
                    <option value="Tin Giáo Phận Mỹ Tho">Tin Giáo Phận Mỹ Tho</option>
                    <option value="Thông báo Phụng Vụ">Thông báo Phụng Vụ</option>
                    <option value="Gương Sống Đức Tin & Suy Niệm">Gương Sống Đức Tin & Suy Niệm</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div>

              {/* Tiêu đề bài viết */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  Tiêu đề bài viết <span style={{ color: 'var(--color-primary)' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Thánh Lễ Khai Giảng Năm Học Giáo Lý 2026 - 2027"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text)',
                    fontSize: '0.95rem',
                    fontWeight: 600
                  }}
                />
              </div>

              {/* Nội dung bài viết */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  Nội dung chi tiết <span style={{ color: 'var(--color-primary)' }}>*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Nhập nội dung bài viết, diễn biến sự kiện, thời gian, địa điểm, cảm nhận..."
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

              {/* Hình ảnh / Video / Link */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  Đính kèm liên kết Hình ảnh / Video / Album (tuỳ chọn)
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="url"
                    value={mediaUrlInput}
                    onChange={(e) => setMediaUrlInput(e.target.value)}
                    placeholder="Dán link ảnh Google Drive, YouTube, Facebook hoặc link ảnh công khai..."
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      color: 'var(--color-text)',
                      fontSize: '0.85rem'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddMedia}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    + Thêm link
                  </button>
                </div>

                {mediaUrls.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                    {mediaUrls.map((url, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '6px 10px',
                          backgroundColor: 'var(--color-bg-secondary)',
                          borderRadius: '6px',
                          fontSize: '0.8rem'
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '85%' }}>
                          🔗 {url}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveMedia(url)}
                          style={{ border: 'none', background: 'none', color: '#EF4444', cursor: 'pointer' }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Nguồn / Bản quyền */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  Nguồn tin tức / Tác giả hình ảnh (nếu có)
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Ví dụ: Ban Truyền Thông Xứ Đoàn / Ảnh: Anh Trưởng..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFF',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {loading ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
                  Gửi Bài Duyệt
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
