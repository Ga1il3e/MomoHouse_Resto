'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';
import Image from 'next/image';

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Momo House brand story"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span className="font-display uppercase" style={{ fontSize: 'clamp(6rem, 25vw, 22rem)', lineHeight: 1, color: 'var(--foreground)', opacity: 0.025, letterSpacing: '-0.06em', whiteSpace: 'nowrap' }}>
          MOMO
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <span className="text-annotation block mb-4" style={{ color: 'var(--primary)' }}>
                {t?.brand?.label}
              </span>
              <h2 className="font-display uppercase" style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)', color: 'var(--foreground)', lineHeight: 0.85, letterSpacing: '-0.04em' }}>
                {t?.brand?.headline1}<br />
                <span style={{ color: 'var(--primary)' }}>{t?.brand?.headline2}</span><br />
                {t?.brand?.headline3}
              </h2>
            </div>

            {/* Craftsmanship image below headline */}
            <div
              className="mt-10 relative overflow-hidden"
              style={{
                height: '260px',
                border: '1px solid var(--border)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              <Image
                src="/assets/images/momo_brand_story_hands.png"
                alt="Artisan hands carefully folding and pleating a momo dumpling on a flour-dusted wooden surface"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 70%, var(--background) 100%)' }} />
              <div className="absolute bottom-3 right-4">
                <span className="text-annotation" style={{ color: 'var(--muted)', fontSize: '0.5rem', letterSpacing: '0.2em' }}>
                  {language === 'fr' ? 'L\'ART DU PLI' : 'THE ART OF THE FOLD'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s' }}>
            <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', lineHeight: 1.8, color: 'var(--muted-foreground)', fontWeight: 300, letterSpacing: '0.01em' }}>
              {t?.brand?.body1}
            </p>
            <p className="mt-5" style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--muted)', fontWeight: 300 }}>
              {t?.brand?.body2}
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 max-w-[40px]" style={{ backgroundColor: 'var(--primary)' }} aria-hidden="true" />
              <span className="text-annotation" style={{ color: 'var(--muted)', fontSize: '0.6rem', letterSpacing: '0.2em' }}>
                {t?.brand?.dividerLabel}
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} aria-hidden="true" />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                { num: t?.brand?.stat1Num, label: t?.brand?.stat1Label },
                { num: t?.brand?.stat2Num, label: t?.brand?.stat2Label },
              ]?.map((item) => (
                <div key={item?.label}>
                  <span className="font-display block" style={{ fontSize: '3rem', color: 'var(--primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {item?.num}
                  </span>
                  <span className="text-annotation block mt-1" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
                    {item?.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}