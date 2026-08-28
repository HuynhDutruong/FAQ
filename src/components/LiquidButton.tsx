'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  label: string;
  variant?: 'red' | 'yellow' | 'blue' | 'green' | 'beige';
}

const variantStyles = {
  red: {
    color: 'var(--color-red)',
    badgeBg: 'rgba(255, 69, 58, 0.12)',
    badgeBorder: 'rgba(255, 69, 58, 0.25)',
    glowHover: 'rgba(255, 69, 58, 0.25)'
  },
  yellow: {
    color: 'var(--color-yellow)',
    badgeBg: 'rgba(255, 159, 10, 0.12)',
    badgeBorder: 'rgba(255, 159, 10, 0.25)',
    glowHover: 'rgba(255, 159, 10, 0.25)'
  },
  blue: {
    color: '#0A84FF',
    badgeBg: 'rgba(10, 132, 255, 0.12)',
    badgeBorder: 'rgba(10, 132, 255, 0.25)',
    glowHover: 'rgba(10, 132, 255, 0.25)'
  },
  green: {
    color: '#30D158',
    badgeBg: 'rgba(48, 209, 88, 0.12)',
    badgeBorder: 'rgba(48, 209, 88, 0.25)',
    glowHover: 'rgba(48, 209, 88, 0.25)'
  },
  beige: {
    color: 'var(--color-dark)',
    badgeBg: 'rgba(120, 120, 128, 0.12)',
    badgeBorder: 'rgba(120, 120, 128, 0.2)',
    glowHover: 'rgba(120, 120, 128, 0.2)'
  }
};

export default function LiquidButton({
  icon: Icon,
  label,
  variant = 'red',
  className,
  style,
  ...props
}: LiquidButtonProps) {
  const v = variantStyles[variant] || variantStyles.red;

  return (
    <button
      className={`liquid-glass apple-tile ${className || ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '24px 18px',
        width: '100%',
        minHeight: '165px',
        borderRadius: '22px',
        cursor: 'pointer',
        textAlign: 'center',
        ...style
      }}
      {...props}
    >
      {Icon && (
        <div
          className="icon-container"
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            backgroundColor: v.badgeBg,
            border: `1px solid ${v.badgeBorder}`,
            color: v.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: `0 4px 16px ${v.badgeBg}`
          }}
        >
          <Icon size={32} strokeWidth={2} />
        </div>
      )}
      <span
        style={{
          color: 'var(--color-dark)',
          fontSize: 'clamp(0.92rem, 3vw, 1.05rem)',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          lineHeight: 1.25
        }}
      >
        {label}
      </span>
    </button>
  );
}
