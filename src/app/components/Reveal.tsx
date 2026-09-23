'use client';

import React, {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';

const VARIANT_CLASS = {
  up: 'reveal-up',
  left: 'reveal-left',
  right: 'reveal-right',
  clip: 'clip-reveal',
} as const;

type RevealVariant = keyof typeof VARIANT_CLASS;

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  variant?: RevealVariant;
  delay?: number;
  as?: ElementType;
  threshold?: number;
  id?: string;
};

export default function Reveal({
  children,
  className = '',
  style,
  variant = 'up',
  delay = 0,
  as: Tag = 'div',
  threshold = 0.12,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${VARIANT_CLASS[variant]} ${visible ? 'visible' : ''} ${className}`.trim()}
      style={{
        ...style,
        ...(delay ? { transitionDelay: `${delay}s` } : null),
      }}
    >
      {children}
    </Tag>
  );
}
