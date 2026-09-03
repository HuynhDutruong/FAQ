'use client';

import React from 'react';
import { X, ExternalLink, BookOpen, Bookmark } from 'lucide-react';
import { BibleCharacter } from '@/lib/bible/bibleCharacters';

interface CharacterProfileModalProps {
  character: BibleCharacter | null;
  onClose: () => void;
}

export default function CharacterProfileModal({ character, onClose }: CharacterProfileModalProps) {
  if (!character) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '24px',
          border: '1px solid rgba(217, 119, 6, 0.2)', // subtle gold border
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.3s ease-out'
        }}
      >
        {/* Header section with Image Background */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '240px',
            backgroundColor: '#111',
            flexShrink: 0
          }}
        >
          <img
            src={character.imageUrl}
            alt={character.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              display: 'block'
            }}
            onError={(e) => {
              // Fallback gradient if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #451a03 0%, #1c1917 100%)';
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, var(--color-card-bg) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)'
            }}
          />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              backdropFilter: 'blur(4px)'
            }}
          >
            <X size={18} />
          </button>

          {/* Title Area */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '24px',
              right: '24px',
              zIndex: 5
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: '8px',
                backgroundColor: 'rgba(217, 119, 6, 0.15)', // Amber transparent
                border: '1px solid rgba(217, 119, 6, 0.4)',
                color: '#FDE68A',
                fontSize: '0.75rem',
                fontWeight: 700,
                marginBottom: '8px',
                backdropFilter: 'blur(4px)'
              }}
            >
              {character.role}
            </div>
            <h2
              style={{
                fontSize: '1.8rem',
                fontWeight: 900,
                color: 'var(--color-dark)',
                margin: 0,
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              {character.name}
            </h2>
            {character.aliases.length > 0 && (
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-subtle)', fontStyle: 'italic' }}>
                Hay còn gọi: {character.aliases.join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          
          {/* Quick Summary */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ 
              fontSize: '1.05rem', 
              fontWeight: 600, 
              color: 'var(--color-dark)', 
              lineHeight: 1.5,
              margin: 0
            }}>
              {character.shortSummary}
            </p>
          </div>

          {/* Detailed History */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 800, 
              color: 'var(--color-red)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              marginBottom: '12px',
              borderBottom: '1px solid var(--color-border-subtle)',
              paddingBottom: '8px'
            }}>
              <BookOpen size={18} /> Lịch sử chi tiết
            </h3>
            <div style={{
              fontSize: '0.95rem',
              lineHeight: 1.65,
              color: 'var(--color-dark)',
              opacity: 0.9,
              whiteSpace: 'pre-line' // Important for rendering newlines from the data
            }}>
              {character.detailedHistory}
            </div>
          </div>

          {/* References Section */}
          <div style={{ 
            backgroundColor: 'var(--color-input-bg)', 
            borderRadius: '12px', 
            padding: '16px',
            border: '1px solid var(--color-border-subtle)'
          }}>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: 800, 
              color: 'var(--color-dark)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              margin: '0 0 12px 0'
            }}>
              <Bookmark size={16} color="var(--color-subtle)" /> Nguồn tham khảo Kinh Thánh
            </h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {character.references.map((ref, index) => (
                <li key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '0.85rem'
                }}>
                  <div style={{
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    color: 'var(--color-red)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    marginTop: '2px'
                  }}>
                    {ref.source}
                  </div>
                  <div style={{ color: 'var(--color-subtle)', lineHeight: 1.5 }}>
                    {ref.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {character.imageCaption && (
             <div style={{
               textAlign: 'center',
               marginTop: '20px',
               fontSize: '0.75rem',
               color: 'var(--color-subtle)',
               fontStyle: 'italic'
             }}>
               * Ảnh minh họa: {character.imageCaption}
             </div>
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}} />
    </div>
  );
}
