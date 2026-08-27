'use client';
import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid rgba(0,0,0,0.1)',
  backgroundColor: 'rgba(255,255,255,0.5)',
  fontSize: '1rem',
  marginBottom: '16px',
  outline: 'none',
  transition: 'border-color 0.2s'
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: '500',
  fontSize: '0.9rem',
  color: 'var(--color-dark)'
};

export default function FAQForm({ onSuccess }: { onSuccess: () => void }) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    content: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!isAnonymous && !formData.fullName.trim()) {
      return setError('Vui lòng nhập họ tên hoặc chọn Ẩn danh.');
    }
    if (!formData.phone.trim()) {
      return setError('Vui lòng nhập số điện thoại.');
    }
    if (formData.content.length < 30 || formData.content.length > 500) {
      return setError('Câu hỏi phải từ 30 đến 500 ký tự.');
    }

    // TODO: Call AI Spelling check API here
    
    try {
      await addDoc(collection(db, 'submissions'), {
        type: 'question',
        isAnonymous,
        fullName: isAnonymous ? '' : formData.fullName,
        email: formData.email,
        phone: formData.phone,
        content: formData.content,
        status: 'new',
        createdAt: serverTimestamp(),
        deletedAt: null
      });
      onSuccess();
    } catch (err) {
      console.error("Error adding document: ", err);
      setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{ color: 'var(--color-red)', marginBottom: '16px', fontSize: '0.9rem', padding: '12px', backgroundColor: 'rgba(211, 47, 47, 0.1)', borderRadius: '8px' }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input 
          type="checkbox" 
          id="anon-faq" 
          checked={isAnonymous} 
          onChange={(e) => setIsAnonymous(e.target.checked)} 
        />
        <label htmlFor="anon-faq" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>Tôi muốn gửi Ẩn danh</label>
      </div>

      {!isAnonymous && (
        <div>
          <label style={labelStyle}>Họ và Tên đầy đủ *</label>
          <input 
            style={inputStyle} 
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            placeholder="VD: Nguyễn Văn A"
          />
        </div>
      )}

      <div>
        <label style={labelStyle}>Email liên lạc (Không bắt buộc)</label>
        <input 
          type="email" 
          style={inputStyle} 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="VD: email@example.com"
        />
      </div>

      <div>
        <label style={labelStyle}>Số điện thoại *</label>
        <input 
          type="tel" 
          style={inputStyle} 
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          placeholder="VD: 0901234567"
        />
      </div>

      <div>
        <label style={labelStyle}>Câu hỏi (30 - 500 ký tự) *</label>
        <textarea 
          style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} 
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          placeholder="Nhập câu hỏi của bạn tại đây..."
        />
        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: formData.content.length < 30 || formData.content.length > 500 ? 'var(--color-red)' : 'gray', marginTop: '-12px', marginBottom: '16px' }}>
          {formData.content.length} / 500
        </div>
      </div>

      <button 
        type="submit" 
        className="liquid-glass"
        style={{
          width: '100%',
          padding: '16px',
          color: 'var(--color-white)',
          backgroundColor: 'var(--color-red)', // Overriding glass bg for CTA
          fontWeight: 'bold',
          fontSize: '1rem',
          marginTop: '8px'
        }}
      >
        GỬI CÂU HỎI
      </button>
    </form>
  );
}
