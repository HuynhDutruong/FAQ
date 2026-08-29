'use client';

import React, { useEffect, useRef } from 'react';
import { Sparkles, Lock } from 'lucide-react';

export interface PlatformVideoConfig {
  id: 'facebook' | 'messenger' | 'instagram' | 'zalo' | 'system';
  name: string;
  color: string;
  portalGlow: string;
}

interface Props {
  platform: PlatformVideoConfig;
  onFinished: () => void;
}

export default function HogwartsCinematicVideo({ platform, onFinished }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);

  const handleFinish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinished();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay fallback
      });
    }

    // Safety timeout: 2.5s maximum
    const timer = setTimeout(() => {
      handleFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(5, 3, 2, 0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        overflow: 'hidden',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      {/* Dynamic Hyperspace Ambient Glow by Platform */}
      <div
        style={{
          position: 'absolute',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${platform.portalGlow} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          opacity: 0.85,
          pointerEvents: 'none',
          animation: 'pulseGlow 2s ease-in-out infinite alternate'
        }}
      />

      {/* 60FPS Hardware-Accelerated Lightweight Video Player (< 300KB) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          aspectRatio: '1 / 1',
          borderRadius: '20px',
          overflow: 'hidden',
          border: `2px solid ${platform.color}`,
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.9), 0 0 35px ${platform.portalGlow}`,
          backgroundColor: '#070503'
        }}
      >
        <video
          ref={videoRef}
          src="/videos/hogwarts_share.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleFinish}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        {/* Dynamic Platform Color Overlay Filter */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 75% 28%, ${platform.portalGlow} 0%, transparent 60%)`,
            mixBlendMode: 'screen',
            pointerEvents: 'none'
          }}
        />

        {/* Floating Top Portal Badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 12px',
            borderRadius: '30px',
            backgroundColor: 'rgba(10, 8, 6, 0.85)',
            border: `1px solid ${platform.color}`,
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color={platform.color} />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FDE68A' }}>
              CỔNG XUYÊN KHÔNG GIAN HOGWARTS
            </span>
          </div>
          <span
            style={{
              fontSize: '0.66rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '20px',
              backgroundColor: platform.color,
              color: '#FFFFFF'
            }}
          >
            {platform.name}
          </span>
        </div>

        {/* Floating Bottom Status Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            padding: '8px 12px',
            borderRadius: '10px',
            backgroundColor: 'rgba(10, 8, 6, 0.88)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            color: '#FDE68A',
            fontSize: '0.74rem',
            fontWeight: 800
          }}
        >
          <Lock size={12} />
          <span>Cú đang bay đưa thư vào Cổng Dịch Chuyển {platform.name}...</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulseGlow {
          from { transform: scale(0.9); opacity: 0.6; }
          to { transform: scale(1.15); opacity: 0.95; }
        }
      `}</style>
    </div>
  );
}
