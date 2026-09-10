'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function CultureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="culture"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--charcoal)' }}
      aria-label="Momo House cultural story"
    >
      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-display uppercase" style={{ fontSize: 'clamp(8rem, 30vw, 28rem)', lineHeight: 1, color: 'var(--primary-foreground)', opacity: 0.02, letterSpacing: '-0.06em', whiteSpace: 'nowrap' }}>
          PARIS
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <span className="text-annotation" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
            {t?.culture?.label}
          </span>
        </div>

        {/* Main headline */}
        <div className="mt-8 md:mt-12" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s' }}>
          <h2 className="font-display uppercase" style={{ fontSize: 'clamp(3rem, 10vw, 10rem)', color: 'var(--primary-foreground)', lineHeight: 0.85, letterSpacing: '-0.04em' }}>
            {t?.culture?.headline1}<br />
            <span style={{ color: 'var(--primary)', fontSize: 'clamp(1.5rem, 4vw, 4rem)', letterSpacing: '0.1em', fontWeight: 300 }}>
              {t?.culture?.headline2}
            </span><br />
            {t?.culture?.headline3}
          </h2>
        </div>

        {/* Three worlds */}
        <div className="mt-16 md:mt-24 grid md:grid-cols-3 gap-8 md:gap-12">
          {[
            { name: t?.culture?.nepal, coord: '27°42′N 85°19′E', desc: language === 'fr' ? 'Là où chaque momo a commencé.' : 'Where every momo began.' },
            { name: t?.culture?.tibet, coord: '29°39′N 91°07′E', desc: language === 'fr' ? 'La tradition dans chaque pli.' : 'The tradition in every fold.' },
            { name: t?.culture?.paris, coord: '48°52′N 2°20′E', desc: language === 'fr' ? 'L\'adresse. Le foyer.' : 'The address. The home.' },
          ]?.map((world, i) => (
            <div
              key={world?.name}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.1}s`,
              }}
            >
              <div className="h-px w-8 mb-4" style={{ backgroundColor: 'var(--primary)' }} aria-hidden="true" />
              <h3 className="font-display uppercase" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--primary-foreground)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {world?.name}
              </h3>
              <p className="text-mono-sm mt-2" style={{ color: 'rgba(245,240,232,0.3)' }}>{world?.coord}</p>
              <p className="mt-3 font-editorial" style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.5)', letterSpacing: '0.04em', lineHeight: 1.6 }}>
                {world?.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Body copy */}
        <div className="mt-16 md:mt-20 max-w-2xl" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s' }}>
          <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', fontWeight: 300, letterSpacing: '0.01em' }}>
            {t?.culture?.body1}
          </p>
          <p className="mt-4" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', lineHeight: 1.8, color: 'rgba(245,240,232,0.4)', fontWeight: 300, letterSpacing: '0.01em' }}>
            {t?.culture?.body2}
          </p>
        </div>
      </div>
    </section>
  );
}