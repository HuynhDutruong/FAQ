'use client';
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Đóng modal khi bấm Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-wrapper" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      padding: '16px',
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)'
    }}>
      {/* Overlay */}
      <div 
        className="modal-overlay"
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1
        }}
      />
      
      {/* Modal Content */}
      <div
        className="liquid-glass modal-content-container"
        style={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '16px',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          padding: '24px',
          maxWidth: '520px',
          width: '100%',
          maxHeight: '88vh',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ 
            fontSize: '1.35rem', 
            fontWeight: 800,
            color: 'var(--color-red)',
            margin: 0
          }}>
            {title}
          </h2>
          <button 
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-input-bg)',
              border: '1px solid var(--color-border-subtle)',
              color: 'var(--color-dark)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>
        
        {children}
      </div>
    </div>
  );
}
