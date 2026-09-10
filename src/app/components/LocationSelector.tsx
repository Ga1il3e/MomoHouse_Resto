'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { locations } from '@/data/locations';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function LocationSelector() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  const montmartre = locations?.[0];
  const poissonniere = locations?.[1];

  const getLeftWidth = () => {
    if (isMobile) return '100%';
    if (hovered === 'montmartre') return '65%';
    if (hovered === 'poissonniere') return '35%';
    return '50%';
  };

  const montDesc = language === 'fr' ? t?.locations?.montmartre?.description : montmartre?.description;
  const poisDesc = language === 'fr' ? t?.locations?.poissonniere?.description : poissonniere?.description;

  return (
    <section
      id="houses"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100svh' }}
      aria-label="Choose your Momo House location">

      {/* Section label */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translateX(-50%) translateY(${visible ? 0 : -20}px)`,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
        <span className="text-annotation" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
          {t?.locations?.label}
        </span>
      </div>

      {/* Desktop: Side-by-side split */}
      {!isMobile ?
      <div className="flex h-full" style={{ minHeight: '100svh' }}>
          {/* MONTMARTRE */}
          <div
          className="relative overflow-hidden flex flex-col justify-end cursor-none"
          style={{
            width: getLeftWidth(),
            transition: 'width 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            backgroundColor: hovered === 'montmartre' ? '#2A1F1A' : '#1C1C1A'
          }}
          onMouseEnter={() => setHovered('montmartre')}
          onMouseLeave={() => setHovered(null)}
          data-cursor="EXPLORE">
          
            <div className="absolute inset-0" style={{ opacity: hovered === 'montmartre' ? 0.45 : 0.2, transition: 'opacity 0.7s ease' }}>
              <img src="/assets/images/montmartre-1789036940381.png" alt="Momo House Montmartre storefront with open facade and prayer flags" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.9) 0%, rgba(28,28,26,0.3) 50%, rgba(28,28,26,0.15) 100%)' }} aria-hidden="true" />
            <div className="absolute top-0 right-0 w-px h-full z-10 pointer-events-none" style={{ backgroundColor: 'var(--primary)', opacity: 0.6 }} aria-hidden="true" />

            <div className="relative z-10 p-10 md:p-14 pb-16">
              <div className="mb-6" style={{ opacity: hovered === 'montmartre' ? 1 : 0, transform: hovered === 'montmartre' ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s' }}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {montmartre?.personality?.map((tag) =>
                    <span key={tag} className="text-annotation px-2 py-1" style={{ border: '1px solid rgba(245,240,232,0.2)', color: 'rgba(245,240,232,0.5)', fontSize: '0.55rem', letterSpacing: '0.15em' }}>{tag}</span>
                  )}
                </div>
              </div>

              <p className="text-annotation mb-3" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>MOMO HOUSE</p>

              <h2 className="font-display uppercase" style={{ fontSize: hovered === 'montmartre' ? 'clamp(3rem, 7vw, 7rem)' : 'clamp(2rem, 4vw, 4.5rem)', color: 'var(--primary-foreground)', lineHeight: 0.85, letterSpacing: '-0.04em', transition: 'font-size 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                MONT<br />MARTRE
              </h2>

              <div style={{ opacity: hovered === 'montmartre' ? 1 : 0, transform: hovered === 'montmartre' ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s' }}>
                <p className="mt-4 font-editorial" style={{ fontSize: '0.8rem', letterSpacing: '0.05em', color: 'rgba(245,240,232,0.5)' }}>
                  {montmartre?.address} — {montmartre?.arrondissement}
                </p>
                <p className="mt-1 font-editorial" style={{ fontSize: '0.75rem', letterSpacing: '0.04em', color: 'rgba(245,240,232,0.35)' }}>
                  {montDesc}
                </p>
                <Link
                  href="/montmartre"
                  className="inline-flex items-center gap-3 mt-6 group"
                  style={{ textDecoration: 'none' }}
                  aria-label="Explore Momo House Montmartre restaurant"
                >
                  <span className="text-annotation" style={{ color: 'var(--primary-foreground)', letterSpacing: '0.15em' }}>
                    {t?.locations?.explorePrefix} MONTMARTRE
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-2" style={{ color: 'var(--primary)', fontSize: '1.1rem' }} aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* POISSONNIÈRE */}
          <div
          className="relative overflow-hidden flex flex-col justify-end cursor-none"
          style={{ flex: 1, transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)', backgroundColor: hovered === 'poissonniere' ? '#1A1520' : '#1C1C1A' }}
          onMouseEnter={() => setHovered('poissonniere')}
          onMouseLeave={() => setHovered(null)}
          data-cursor="EXPLORE">
          
            <div className="absolute inset-0" style={{ opacity: hovered === 'poissonniere' ? 0.45 : 0.2, transition: 'opacity 0.7s ease' }}>
              <img src="/assets/images/poissoniere-1789036940323.png" alt="Momo House Poissonnière storefront with terrace seating" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.9) 0%, rgba(28,28,26,0.3) 50%, rgba(28,28,26,0.15) 100%)' }} aria-hidden="true" />

            <div className="relative z-10 p-10 md:p-14 pb-16">
              <div className="mb-6" style={{ opacity: hovered === 'poissonniere' ? 1 : 0, transform: hovered === 'poissonniere' ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s' }}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {poissonniere?.personality?.map((tag) =>
                    <span key={tag} className="text-annotation px-2 py-1" style={{ border: '1px solid rgba(245,240,232,0.2)', color: 'rgba(245,240,232,0.5)', fontSize: '0.55rem', letterSpacing: '0.15em' }}>{tag}</span>
                  )}
                </div>
              </div>

              <p className="text-annotation mb-3" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>MOMO HOUSE</p>

              <h2 className="font-display uppercase" style={{ fontSize: hovered === 'poissonniere' ? 'clamp(2.2rem, 5vw, 5.5rem)' : 'clamp(2rem, 4vw, 4.5rem)', color: 'var(--primary-foreground)', lineHeight: 0.85, letterSpacing: '-0.04em', transition: 'font-size 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                POISSON<br />NIÈRE
              </h2>

              <div style={{ opacity: hovered === 'poissonniere' ? 1 : 0, transform: hovered === 'poissonniere' ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s' }}>
                <p className="mt-4 font-editorial" style={{ fontSize: '0.8rem', letterSpacing: '0.05em', color: 'rgba(245,240,232,0.5)' }}>
                  {poissonniere?.address} — {poissonniere?.arrondissement}
                </p>
                <p className="mt-1 font-editorial" style={{ fontSize: '0.75rem', letterSpacing: '0.04em', color: 'rgba(245,240,232,0.35)' }}>
                  {poisDesc}
                </p>
                <Link
                  href="/poissonniere"
                  className="inline-flex items-center gap-3 mt-6 group"
                  style={{ textDecoration: 'none' }}
                  aria-label="Explore Momo House Poissonnière restaurant"
                >
                  <span className="text-annotation" style={{ color: 'var(--primary-foreground)', letterSpacing: '0.15em' }}>
                    {t?.locations?.explorePrefix} POISSONNIÈRE
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-2" style={{ color: 'var(--primary)', fontSize: '1.1rem' }} aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div> : (

      /* Mobile: Stacked */
      <div className="flex flex-col" style={{ minHeight: '100svh' }}>
          {[montmartre, poissonniere]?.map((loc, idx) => {
          const isOpen = expanded === loc?.id;
          const bgImage = idx === 0 ?
          '/assets/images/montmartre-1789036940381.png' : '/assets/images/poissoniere-1789036940323.png';
          const bgAlt = idx === 0 ?
          'Momo House Montmartre storefront with open facade and prayer flags' : 'Momo House Poissonnière storefront with terrace seating';
          const locDesc = idx === 0 ? montDesc : poisDesc;
          const locHref = idx === 0 ? '/montmartre' : '/poissonniere';

          return (
            <div
              key={loc?.id}
              className="relative overflow-hidden flex flex-col justify-end"
              style={{ flex: isOpen ? 2 : 1, minHeight: isOpen ? '55vh' : '30vh', transition: 'flex 0.6s cubic-bezier(0.16, 1, 0.3, 1), min-height 0.6s cubic-bezier(0.16, 1, 0.3, 1)', backgroundColor: 'var(--charcoal)' }}
              onClick={() => setExpanded(isOpen ? null : loc?.id)}>

              <div className="absolute inset-0" style={{ opacity: isOpen ? 0.45 : 0.2, transition: 'opacity 0.6s ease' }}>
                <img src={bgImage} alt={bgAlt} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.92) 0%, rgba(28,28,26,0.2) 60%, transparent 100%)' }} aria-hidden="true" />
              {idx === 0 && <div className="absolute bottom-0 left-0 right-0 h-px z-10" style={{ backgroundColor: 'var(--primary)', opacity: 0.5 }} aria-hidden="true" />}

              <div className="relative z-10 p-6 pb-8">
                <p className="text-annotation mb-2" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>MOMO HOUSE</p>
                <h2 className="font-display uppercase" style={{ fontSize: isOpen ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(1.8rem, 7vw, 2.5rem)', color: 'var(--primary-foreground)', lineHeight: 0.85, letterSpacing: '-0.03em', transition: 'font-size 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  {loc?.name?.toUpperCase()}
                </h2>

                {isOpen &&
                  <div style={{ animation: 'loaderReveal 0.4s ease forwards' }}>
                    <div className="flex flex-wrap gap-2 mt-3 mb-3">
                      {loc?.personality?.map((tag) =>
                        <span key={tag} className="text-annotation px-2 py-1" style={{ border: '1px solid rgba(245,240,232,0.2)', color: 'rgba(245,240,232,0.5)', fontSize: '0.55rem', letterSpacing: '0.12em' }}>{tag}</span>
                      )}
                    </div>
                    <p className="font-editorial" style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.5)', letterSpacing: '0.04em' }}>
                      {loc?.address} — {loc?.arrondissement}
                    </p>
                    <p className="mt-1 font-editorial" style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.35)', letterSpacing: '0.04em' }}>
                      {locDesc}
                    </p>
                    <Link
                      href={locHref}
                      className="inline-flex items-center gap-2 mt-4"
                      style={{ textDecoration: 'none' }}
                      onClick={(e) => e?.stopPropagation()}
                      aria-label={`Explore Momo House ${loc?.name}`}
                    >
                      <span className="text-annotation" style={{ color: 'var(--primary-foreground)', letterSpacing: '0.12em' }}>
                        {t?.locations?.explorePrefix} {loc?.name?.toUpperCase()}
                      </span>
                      <span style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
                    </Link>
                  </div>
                }

                {!isOpen &&
                  <p className="mt-2 font-editorial" style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.35)', letterSpacing: '0.08em' }}>
                    {t?.locations?.tapToExplore}
                  </p>
                }
              </div>
            </div>
          );
        })}
        </div>)
      }
    </section>
  );
}
