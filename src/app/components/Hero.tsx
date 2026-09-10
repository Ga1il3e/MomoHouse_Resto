'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';
import Image from 'next/image';

// SVG Momo shape component
const MomoSVG = ({
  size = 120,
  opacity = 1,
  className = '',
}: {
  size?: number;
  opacity?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={Math.round(size * 0.65)}
    viewBox="0 0 120 78"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ opacity }}
    aria-hidden="true"
  >
    <ellipse cx="60" cy="54" rx="54" ry="22" fill="var(--primary)" opacity="0.12" />
    <ellipse cx="60" cy="46" rx="50" ry="20" fill="var(--primary-foreground)" />
    <ellipse cx="60" cy="46" rx="50" ry="20" fill="var(--primary)" opacity="0.06" />
    <path d="M28 38 Q36 28 44 38" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M44 35 Q52 25 60 35" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M60 35 Q68 25 76 35" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M76 38 Q84 28 92 38" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M16 42 Q60 24 104 42" stroke="var(--border)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    <ellipse cx="60" cy="64" rx="40" ry="5" fill="var(--charcoal)" opacity="0.06" />
  </svg>
);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const onMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouse.current = {
        x: (e.clientX / w - 0.5) * 2,
        y: (e.clientY / h - 0.5) * 2,
      };
    };

    const animate = () => {
      setParallax((prev) => ({
        x: prev.x + (mouse.current.x * 18 - prev.x) * 0.06,
        y: prev.y + (mouse.current.y * 12 - prev.y) * 0.06,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const onScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--background)', paddingTop: '80px' }}
      aria-label="Momo House — Enter the world"
    >
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E\")",
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      {/* Floating momo elements */}
      <div
        ref={heroRef}
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      >
        <div className="absolute momo-float" style={{ top: '12%', left: '6%', transform: `translate(${parallax.x * -1.4}px, ${parallax.y * -1.2}px)` }}>
          <MomoSVG size={90} opacity={0.35} />
        </div>
        <div className="absolute momo-float-delayed" style={{ top: '8%', right: '8%', transform: `translate(${parallax.x * 1.8}px, ${parallax.y * 1.0}px)` }}>
          <MomoSVG size={130} opacity={0.2} />
        </div>
        <div className="absolute momo-drift" style={{ bottom: '15%', left: '3%', transform: `translate(${parallax.x * -2.0}px, ${parallax.y * -0.8}px)` }}>
          <MomoSVG size={160} opacity={0.15} />
        </div>
        <div className="absolute momo-float" style={{ bottom: '20%', right: '5%', transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.6}px)` }}>
          <MomoSVG size={100} opacity={0.25} />
        </div>
        <div className="absolute momo-float-delayed hidden md:block" style={{ top: '45%', right: '15%', transform: `translate(${parallax.x * 1.2}px, ${parallax.y * -1.4}px)` }}>
          <MomoSVG size={60} opacity={0.3} />
        </div>

        {/* Momo food image — editorial float */}
        <div
          className="absolute hidden lg:block"
          style={{
            top: '18%',
            right: '4%',
            width: '320px',
            height: '400px',
            transform: `translate(${parallax.x * 1.6}px, ${parallax.y * 1.2}px)`,
          }}
        >
          <div className="relative w-full h-full" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <Image
              src="/assets/images/momo_hero_steamed.png"
              alt="Steamed Nepali momos with delicate pleated folds on a dark slate plate"
              fill
              className="object-cover"
              style={{ opacity: 0.85 }}
              priority
            />
            {/* Overlay tint to match brand palette */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, var(--background) 100%)', opacity: 0.6 }} />
            {/* Editorial label */}
            <div className="absolute bottom-3 left-3">
              <span className="text-annotation" style={{ color: 'var(--primary)', fontSize: '0.5rem', letterSpacing: '0.2em' }}>STEAMED / VAPEUR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial annotations */}
      <div className="absolute top-24 right-8 md:right-16 flex flex-col items-end gap-1 pointer-events-none" aria-hidden="true">
        <span className="text-annotation" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>PARIS</span>
        <span className="text-annotation" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>{language === 'fr' ? 'NÉPAL' : 'NEPAL'}</span>
        <span className="text-annotation" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>TIBET</span>
        <div className="h-8 w-px mt-1" style={{ backgroundColor: 'var(--primary)', opacity: 0.4 }} />
      </div>

      {/* Coordinates */}
      <div className="absolute bottom-24 left-6 md:left-10 pointer-events-none" aria-hidden="true">
        <span className="text-mono-sm" style={{ color: 'var(--muted)', opacity: 0.6 }}>48°52′N 2°20′E</span>
      </div>

      {/* Red stamp element */}
      <div
        className="absolute top-28 left-6 md:left-12 pointer-events-none"
        aria-hidden="true"
        style={{ border: '1.5px solid var(--primary)', padding: '4px 8px', opacity: 0.5, transform: 'rotate(-3deg)' }}
      >
        <span className="text-annotation" style={{ color: 'var(--primary)', fontSize: '0.55rem' }}>EST. PARIS</span>
      </div>

      {/* Main typographic composition */}
      <div
        ref={titleRef}
        className="relative z-10 px-6 md:px-10 lg:px-16 flex flex-col"
        style={{ transform: `translate(${parallax.x * 4}px, ${parallax.y * 3}px)`, transition: 'transform 0.05s linear', willChange: 'transform' }}
      >
        <h1 className="text-hero font-display select-none" style={{ color: 'var(--foreground)', lineHeight: 0.82 }}>
          MOMO
        </h1>
        <div className="flex items-baseline gap-4 md:gap-8 mt-2 md:mt-0">
          <div className="w-12 md:w-20 h-0.5 flex-shrink-0" style={{ backgroundColor: 'var(--primary)', marginBottom: '0.15em' }} aria-hidden="true" />
          <span className="text-hero font-display select-none" style={{ color: 'var(--primary)', lineHeight: 0.82 }}>
            HOUSE
          </span>
        </div>

        {/* Tagline */}
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <p
            className="font-editorial uppercase"
            style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)', letterSpacing: '0.3em', color: 'var(--muted-foreground)' }}
          >
            {t.hero.tagline}
          </p>
          <div className="hidden sm:block h-px flex-1 max-w-[80px]" style={{ backgroundColor: 'var(--border)' }} aria-hidden="true" />
          <p
            className="font-editorial uppercase"
            style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)', letterSpacing: '0.2em', color: 'var(--muted)' }}
          >
            {t.hero.subTagline}
          </p>
        </div>

        {/* Scroll CTA */}
        <div className="mt-12 md:mt-16 flex items-center gap-3">
          <div className="h-px w-8" style={{ backgroundColor: 'var(--primary)' }} aria-hidden="true" />
          <span className="text-annotation" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>
            {t.hero.scrollCta}
          </span>
        </div>
      </div>
    </section>
  );
}