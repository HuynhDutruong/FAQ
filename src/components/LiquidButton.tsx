'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  label: string;
  variant?: 'red' | 'yellow';
}

export default function LiquidButton({ icon: Icon, label, variant = 'red', className, ...props }: LiquidButtonProps) {
  const accentColor = variant === 'red' ? 'var(--color-red)' : 'var(--color-yellow)';
  
  return (
    <button 
      className={`liquid-glass ${className || ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '24px',
        width: 'clamp(150px, 42vw, 200px)',
        height: 'clamp(150px, 42vw, 200px)',
        color: accentColor,
        fontSize: 'clamp(16px, 4vw, 20px)',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}
      {...props}
    >
      {Icon && <Icon size={48} strokeWidth={1.5} />}
      <span>{label}</span>
    </button>
  );
}
