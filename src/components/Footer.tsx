'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { locations } from '@/data/locations';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations, SUPPORTED_LANGUAGES } from '@/lib/i18n';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [year, setYear] = useState('2026');
  const { language, setLanguage } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    setYear(new Date()?.getFullYear()?.toString());
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (footerRef?.current) observer?.observe(footerRef?.current);
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReduced || !marqueeRef?.current) return;

    const onScroll = () => {
      if (!marqueeRef?.current || !footerRef?.current) return;
      const rect = footerRef?.current?.getBoundingClientRect();
      if (rect?.top < window.innerHeight) {
        const progress = (window.innerHeight - rect?.top) / (window.innerHeight + rect?.height);
        marqueeRef.current.style.transform = `translateX(-${progress * 8}%)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden" style={{ backgroundColor: 'var(--charcoal)' }}>
      {/* Opening question */}
      <div className="pt-16 md:pt-24 pb-10 md:pb-14 px-6 md:px-10 text-center border-b" style={{ borderColor: 'rgba(245,240,232,0.06)' }}>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <p className="font-editorial uppercase mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--primary)' }}>
            {t?.footer?.question}
          </p>
          <h2 className="font-display uppercase" style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', color: 'var(--primary-foreground)', letterSpacing: '-0.03em', lineHeight: 0.88 }}>
            {t?.footer?.headline?.split('\n')?.map((line, i) => (
              <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
            ))}
          </h2>
        </div>

        {/* Two location CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s' }}>
          {locations?.map((loc, i) => (
            <Link
              key={loc?.id}
              href={loc.href}
              className="group inline-flex items-center gap-3 px-7 py-3.5 transition-all duration-300"
              style={{
                backgroundColor: i === 0 ? 'var(--primary)' : 'transparent',
                border: `1px solid ${i === 0 ? 'var(--primary)' : 'rgba(245,240,232,0.2)'}`,
                color: 'var(--primary-foreground)',
                textDecoration: 'none',
              }}
              aria-label={`Go to Momo House ${loc?.name}`}
            >
              <span className="text-annotation" style={{ letterSpacing: '0.12em' }}>
                {loc?.name?.toUpperCase()}
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: i === 0 ? 'rgba(245,240,232,0.7)' : 'var(--primary)' }} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Giant scrolling wordmark */}
      <div className="overflow-hidden py-8 border-b" style={{ borderColor: 'rgba(245,240,232,0.04)' }}>
        <div ref={marqueeRef} className="select-none whitespace-nowrap" style={{ willChange: 'transform', transition: 'transform 0.1s linear' }} aria-hidden="true">
          <span className="font-display uppercase inline-block" style={{ fontSize: 'clamp(5rem, 18vw, 16rem)', lineHeight: 0.85, letterSpacing: '-0.04em', color: 'transparent', WebkitTextStroke: '1px rgba(245,240,232,0.08)' }}>
            MOMO HOUSE · PARIS ·&nbsp;
          </span>
          <span className="font-display uppercase inline-block" style={{ fontSize: 'clamp(5rem, 18vw, 16rem)', lineHeight: 0.85, letterSpacing: '-0.04em', color: 'transparent', WebkitTextStroke: '1px rgba(245,240,232,0.08)' }}>
            NEPAL · TIBET ·
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Momo House — home" style={{ textDecoration: 'none' }}>
          <AppLogo size={28} />
          <div className="flex flex-col leading-none">
            <span className="font-display uppercase tracking-[0.15em]" style={{ fontSize: '0.75rem', color: 'var(--primary-foreground)' }}>MOMO</span>
            <span className="font-editorial uppercase tracking-[0.35em]" style={{ fontSize: '0.45rem', color: 'var(--primary)' }}>HOUSE</span>
          </div>
        </Link>

        {/* Language switcher in footer */}
        <div className="flex items-center gap-0" style={{ border: '1px solid rgba(245,240,232,0.15)' }} role="group" aria-label="Language selector">
          {SUPPORTED_LANGUAGES?.map((lang, i) => (
            <button
              key={lang?.code}
              onClick={() => setLanguage(lang?.code)}
              className="text-annotation transition-all duration-200"
              style={{
                padding: '5px 10px',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                backgroundColor: language === lang?.code ? 'var(--primary)' : 'transparent',
                color: language === lang?.code ? 'var(--primary-foreground)' : 'rgba(245,240,232,0.4)',
                borderRight: i < SUPPORTED_LANGUAGES?.length - 1 ? '1px solid rgba(245,240,232,0.15)' : 'none',
              }}
              aria-label={`Switch to ${lang?.label}`}
              aria-pressed={language === lang?.code}
            >
              {lang?.nativeLabel}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-annotation underline-expand" style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.65rem', letterSpacing: '0.12em' }} aria-label="Momo House on Instagram">INSTAGRAM</a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-annotation underline-expand" style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.65rem', letterSpacing: '0.12em' }} aria-label="Momo House on Facebook">FACEBOOK</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="/mentions-legales" className="text-annotation underline-expand" style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
            {language === 'fr' ? 'Mentions légales' : 'Legal notice'}
          </a>
          <span style={{ color: 'rgba(245,240,232,0.15)', fontSize: '0.6rem' }}>·</span>
          <a href="/cgv" className="text-annotation underline-expand" style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
            {language === 'fr' ? 'CGV' : 'Terms'}
          </a>
          <span style={{ color: 'rgba(245,240,232,0.15)', fontSize: '0.6rem' }}>·</span>
          <a href="/confidentialite" className="text-annotation underline-expand" style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
            {t?.footer?.privacy}
          </a>
          <span style={{ color: 'rgba(245,240,232,0.15)', fontSize: '0.6rem' }}>·</span>
          <span className="text-annotation" style={{ color: 'rgba(245,240,232,0.25)', fontSize: '0.6rem', letterSpacing: '0.08em' }}>
            {t?.footer?.copyright?.replace('{year}', year)}
          </span>
        </div>
      </div>
    </footer>
  );
}