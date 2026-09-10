'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';
import Image from 'next/image';

export default function MomoSection() {
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
      id="momo"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--secondary)' }}
      aria-label="The Momo — our food"
    >
      {/* Giant background MOMO text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-display uppercase" style={{ fontSize: 'clamp(10rem, 40vw, 38rem)', lineHeight: 1, color: 'var(--foreground)', opacity: 0.03, letterSpacing: '-0.06em' }}>
          MOMO
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <span className="text-annotation" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
            {t?.momo?.label}
          </span>
        </div>

        {/* Asymmetric layout */}
        <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-start">
          {/* Left: Giant headline */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-40px)', transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s' }}>
            <h2 className="font-display uppercase" style={{ fontSize: 'clamp(3.5rem, 12vw, 12rem)', color: 'var(--foreground)', lineHeight: 0.82, letterSpacing: '-0.04em' }}>
              {t?.momo?.headline1}<br />
              {t?.momo?.headline2}<br />
              <span style={{ color: 'var(--primary)' }}>{t?.momo?.headline3}</span><br />
              {t?.momo?.headline4}
            </h2>
          </div>

          {/* Right: Description */}
          <div className="md:max-w-[280px] md:pt-8" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }}>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--muted-foreground)', fontWeight: 300, letterSpacing: '0.01em' }}>
              {t?.momo?.description}
            </p>
          </div>
        </div>

        {/* Momo food images — editorial duo */}
        <div
          className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s' }}
        >
          {/* Image 1 — assorted overhead */}
          <div className="relative overflow-hidden" style={{ height: '340px', border: '1px solid var(--border)' }}>
            <Image
              src="/assets/images/image-1789037989311.png"
              alt="Freshly steamed Nepali momos served in a bowl with dipping sauce, soft and delicate"
              fill
              className="object-cover"
              style={{ transition: 'transform 0.6s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
            <div className="absolute bottom-4 left-4">
              <span className="text-annotation" style={{ color: 'var(--primary)', fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                {language === 'fr' ? 'ASSORTIMENT' : 'ASSORTED'}
              </span>
            </div>
          </div>

          {/* Image 2 — fried momos */}
          <div className="relative overflow-hidden" style={{ height: '340px', border: '1px solid var(--border)' }}>
            <Image
              src="/assets/images/momo_fried_crispy.png"
              alt="Golden crispy fried momos on a dark plate with vibrant red chili dipping sauce"
              fill
              className="object-cover"
              style={{ transition: 'transform 0.6s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
            <div className="absolute bottom-4 left-4">
              <span className="text-annotation" style={{ color: 'var(--primary)', fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                {language === 'fr' ? 'FRIT / CROUSTILLANT' : 'FRIED / CRISPY'}
              </span>
            </div>
          </div>
        </div>

        {/* Momo types — editorial grid */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-0">
          {t?.momo?.types?.map((type, i) => (
            <div
              key={type?.name}
              className="relative p-6 md:p-8"
              style={{
                borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
                borderTop: '1px solid var(--border)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.08}s`,
              }}
            >
              <span className="text-annotation block mb-3" style={{ color: 'var(--primary)', fontSize: '0.55rem' }}>
                {String(i + 1)?.padStart(2, '0')}
              </span>
              <h3 className="font-display uppercase" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', color: 'var(--foreground)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {type?.name}
              </h3>
              <p className="mt-3 font-editorial" style={{ fontSize: '0.8rem', color: 'var(--muted)', letterSpacing: '0.04em', lineHeight: 1.6 }}>
                {type?.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}