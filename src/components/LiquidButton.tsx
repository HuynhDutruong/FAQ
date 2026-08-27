'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  label: string;
  variant?: 'red' | 'yellow' | 'beige';
}

export default function LiquidButton({ icon: Icon, label, variant = 'red', className, ...props }: LiquidButtonProps) {
  const accentColor = variant === 'red' ? 'var(--color-red)' : variant === 'yellow' ? 'var(--color-yellow)' : '#8B5A2B';
  
  return (
    <button 
      className={`liquid-glass ${className || ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '16px',
        width: '100%',
        aspectRatio: '1 / 1',
        color: accentColor,
        fontSize: 'clamp(14px, 3.5vw, 18px)',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        letterSpacing: '1px',
      }}
      {...props}
    >
      {Icon && <Icon size={48} strokeWidth={1.5} />}
      <span>{label}</span>
    </button>
  );
}
