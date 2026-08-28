'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  label: string;
  variant?: 'red' | 'yellow' | 'beige';
}

export default function LiquidButton({ icon: Icon, label, variant = 'red', className, style, ...props }: LiquidButtonProps) {
  const accentColor = variant === 'red' ? 'var(--color-red)' : variant === 'yellow' ? 'var(--color-yellow)' : '#8B5A2B';
  const bgGlow = variant === 'red' ? 'rgba(211, 47, 47, 0.05)' : variant === 'yellow' ? 'rgba(217, 119, 6, 0.05)' : 'rgba(139, 90, 43, 0.05)';

  return (
    <button 
      className={`liquid-glass ${className || ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        padding: '20px 16px',
        width: '100%',
        aspectRatio: '1 / 1',
        color: accentColor,
        backgroundColor: bgGlow,
        fontSize: 'clamp(14px, 3.5vw, 18px)',
        fontWeight: 800,
        textTransform: 'uppercase',
        textAlign: 'center',
        letterSpacing: '0.8px',
        cursor: 'pointer',
        ...style
      }}
      {...props}
    >
      {Icon && (
        <div style={{
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={46} strokeWidth={1.8} />
        </div>
      )}
      <span style={{ lineHeight: 1.25 }}>{label}</span>
    </button>
  );
}
