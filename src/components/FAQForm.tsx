'use client';
import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid var(--color-input-border)',
  backgroundColor: 'var(--color-input-bg)',
  color: 'var(--color-input-text)',
  fontSize: '1rem',
  marginBottom: '16px',
  outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
  boxSizing: 'border-box' as const
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: '600',
  fontSize: '0.9rem',
  color: 'var(--color-dark)'
};

export default function FAQForm({ onSuccess, onCancel }: { onSuccess: () => void; onCancel?: () => void }) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    content: ''
  });
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!isAnonymous && !formData.fullName.trim()) {
      return setError(t.errorName);
    }
    if (!formData.phone.trim()) {
      return setError(t.errorPhone);
    }
    if (formData.content.length < 30 || formData.content.length > 500) {
      return setError(t.errorContent);
    }

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'question',
          isAnonymous,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          content: formData.content
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.errorSubmit);

      onSuccess();
    } catch (err: any) {
      console.error("Error submitting question:", err);
      setError(err?.message || t.errorSubmit);
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
        <label htmlFor="anon-faq" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>{t.formAnon}</label>
      </div>

      {!isAnonymous && (
        <div>
          <label style={labelStyle}>{t.formNameReq}</label>
          <input 
            style={inputStyle} 
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            placeholder={t.formPlaceholderName}
          />
        </div>
      )}

      <div>
        <label style={labelStyle}>{t.formEmailLabel}</label>
        <input 
          type="email" 
          style={inputStyle} 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder={t.formPlaceholderEmail}
        />
      </div>

      <div>
        <label style={labelStyle}>{t.formPhoneReq}</label>
        <input 
          type="tel" 
          style={inputStyle} 
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          placeholder={t.formPlaceholderPhone}
        />
      </div>

      <div>
        <label style={labelStyle}>{t.formContentFAQ}</label>
        <textarea 
          style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} 
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          placeholder={t.formPlaceholderFAQ}
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
        {t.formSubmitFAQ}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          style={{
            width: '100%', marginTop: '10px', padding: '10px',
            fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-subtle)'
          }}
        >
          Huỷ
        </button>
      )}
    </form>
  );
}
