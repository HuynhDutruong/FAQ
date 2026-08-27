'use client';
import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '@/lib/i18n/LanguageContext';

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

export default function FeedbackForm({ onSuccess }: { onSuccess: () => void }) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    content: ''
  });
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isAnonymous && !formData.fullName.trim()) {
      return setError(t.errorName);
    }
    if (!formData.content.trim() || formData.content.length < 30 || formData.content.length > 500) {
      return setError(t.errorContent);
    }

    try {
      await addDoc(collection(db, 'submissions'), {
        type: 'feedback',
        isAnonymous,
        fullName: isAnonymous ? '' : formData.fullName,
        content: formData.content,
        status: 'new',
        createdAt: serverTimestamp(),
        deletedAt: null
      });
      onSuccess();
    } catch (err) {
      console.error("Error adding document: ", err);
      setError(t.errorSubmit);
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
          id="anon-feedback" 
          checked={isAnonymous} 
          onChange={(e) => setIsAnonymous(e.target.checked)} 
        />
        <label htmlFor="anon-feedback" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>{t.formAnon}</label>
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
        <label style={labelStyle}>{t.formContentFeedback}</label>
        <textarea 
          style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }} 
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          placeholder={t.formPlaceholderFeedback}
        />
      </div>

      <button 
        type="submit" 
        className="liquid-glass"
        style={{
          width: '100%',
          padding: '16px',
          color: 'var(--color-dark)',
          backgroundColor: 'var(--color-yellow)', // Overriding glass bg for CTA
          fontWeight: 'bold',
          fontSize: '1rem',
          marginTop: '8px'
        }}
      >
        {t.formSubmitFeedback}
      </button>
    </form>
  );
}
