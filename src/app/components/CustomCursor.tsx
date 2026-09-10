'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const cursorLabel = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorLabel) {
        setLabel(cursorLabel);
        setIsLarge(true);
      }
    };

    const handleLeave = () => {
      setLabel('');
      setIsLarge(false);
    };

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseenter', handleEnter, true);
    document.addEventListener('mouseleave', handleLeave, true);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', handleEnter, true);
      document.removeEventListener('mouseleave', handleLeave, true);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
      style={{
        width: isLarge ? '80px' : '12px',
        height: isLarge ? '80px' : '12px',
        backgroundColor: isLarge ? 'var(--primary)' : 'var(--primary)',
        borderRadius: '50%',
        transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        mixBlendMode: isLarge ? 'normal' : 'difference',
      }}
    >
      {label && (
        <span
          className="text-annotation text-center leading-tight"
          style={{ color: 'var(--primary-foreground)', fontSize: '0.55rem', letterSpacing: '0.12em' }}
        >
          {label}
        </span>
      )}
    </div>
  );
}