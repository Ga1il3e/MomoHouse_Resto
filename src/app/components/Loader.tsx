'use client';

import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState<'momo' | 'steam' | 'text' | 'exit'>('momo');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setPhase('steam'), 400);
    const t2 = setTimeout(() => setPhase('text'), 800);
    const t3 = setTimeout(() => setPhase('exit'), 1800);
    const t4 = setTimeout(() => onComplete(), 2300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        backgroundColor: 'var(--charcoal)',
        opacity: phase === 'exit' ? 0 : 1,
        transition: phase === 'exit' ? 'opacity 0.5s ease-out' : 'none',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* SVG Momo Illustration */}
      <div
        style={{
          opacity: phase === 'momo' || phase === 'steam' || phase === 'text' ? 1 : 0,
          transform: phase === 'momo' ? 'scale(0.8)' : 'scale(1)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <svg width="80" height="56" viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Steam lines */}
          {(phase === 'steam' || phase === 'text') && (
            <>
              <line x1="28" y1="8" x2="26" y2="-2" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"
                style={{ animation: 'steamRise 2s ease-out infinite' }} />
              <line x1="40" y1="4" x2="40" y2="-6" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"
                style={{ animation: 'steamRise 2s ease-out infinite', animationDelay: '0.3s' }} />
              <line x1="52" y1="8" x2="54" y2="-2" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"
                style={{ animation: 'steamRise 2s ease-out infinite', animationDelay: '0.6s' }} />
            </>
          )}
          {/* Momo body */}
          <ellipse cx="40" cy="38" rx="36" ry="16" fill="var(--primary-foreground)" opacity="0.95" />
          {/* Fold marks */}
          <path d="M22 30 Q28 22 34 30" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M34 28 Q40 20 46 28" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M46 30 Q52 22 58 30" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Seam line */}
          <path d="M18 32 Q40 18 62 32" stroke="var(--border)" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* Bottom shadow */}
          <ellipse cx="40" cy="50" rx="28" ry="4" fill="var(--charcoal)" opacity="0.12" />
        </svg>
      </div>

      {/* Text reveal */}
      {(phase === 'text' || phase === 'exit') && (
        <div className="mt-6 text-center" style={{ animation: 'loaderReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
          <div
            className="font-display tracking-widest uppercase"
            style={{ color: 'var(--primary-foreground)', fontSize: '1.5rem', letterSpacing: '0.4em' }}
          >
            MOMO
          </div>
          <div
            className="font-editorial tracking-[0.6em] uppercase"
            style={{ color: 'var(--primary)', fontSize: '0.7rem', letterSpacing: '0.6em', marginTop: '2px' }}
          >
            HOUSE
          </div>
        </div>
      )}
    </div>
  );
}