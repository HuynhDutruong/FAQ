'use client';
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Rating({ onSubmit }: { onSubmit: (rating: number) => void }) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const { t } = useLanguage();

  return (
    <div style={{ textAlign: 'center', padding: '24px 0' }}>
      <h3 style={{ marginBottom: '16px', color: 'var(--color-dark)', fontSize: '1.1rem' }}>
        {t.ratingTitle}
      </h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            style={{ padding: '4px', cursor: 'pointer', transition: 'transform 0.1s' }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Star 
              size={36} 
              fill={(hover || rating) >= star ? 'var(--color-yellow)' : 'transparent'}
              color={(hover || rating) >= star ? 'var(--color-yellow)' : 'gray'}
            />
          </button>
        ))}
      </div>
      <button 
        className="liquid-glass"
        disabled={rating === 0}
        onClick={() => onSubmit(rating)}
        style={{
          padding: '12px 24px',
          backgroundColor: rating > 0 ? 'var(--color-red)' : 'rgba(0,0,0,0.1)',
          color: rating > 0 ? 'white' : 'gray',
          fontWeight: 'bold',
          cursor: rating > 0 ? 'pointer' : 'not-allowed',
          opacity: rating > 0 ? 1 : 0.5
        }}
      >
        {t.ratingSubmitText}
      </button>
    </div>
  );
}
