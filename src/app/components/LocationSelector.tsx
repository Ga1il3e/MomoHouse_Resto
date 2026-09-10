'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { locations } from '@/data/locations';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function LocationSelector() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(locations[0]?.id ?? null);
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
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getLeftWidth = () => {
    if (isMobile) return '100%';
    if (hovered === 'montmartre') return '58%';
    if (hovered === 'poissonniere') return '42%';
    return '50%';
  };

  return (
    <section
      id="houses"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100svh', backgroundColor: 'var(--charcoal)' }}
      aria-label="Choose your Momo House location"
    >
      <div
        className="pointer-events-none absolute top-8 left-1/2 z-20 -translate-x-1/2 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translateX(-50%) translateY(${visible ? 0 : -16}px)`,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <span
          className="text-annotation block"
          style={{ color: 'var(--primary)', letterSpacing: '0.22em' }}
        >
          {t?.locations?.label}
        </span>
        <p
          className="mt-2 font-editorial"
          style={{
            color: 'rgba(245,240,232,0.45)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
          }}
        >
          {language === 'fr'
            ? 'Deux maisons. Une cuisine.'
            : 'Two houses. One kitchen.'}
        </p>
      </div>

      {!isMobile ? (
        <div className="flex" style={{ minHeight: '100svh' }}>
          {locations.map((loc, idx) => {
            const active = hovered === loc.id || (!hovered && idx === 0);
            const width =
              loc.id === 'montmartre' ? getLeftWidth() : undefined;
            const desc =
              language === 'fr' ? loc.descriptionFr : loc.description;

            return (
              <div
                key={loc.id}
                className="relative flex flex-col justify-end overflow-hidden"
                style={{
                  width: loc.id === 'montmartre' ? width : undefined,
                  flex: loc.id === 'poissonniere' ? 1 : undefined,
                  transition: 'width 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                  backgroundColor: '#1C1C1A',
                }}
                onMouseEnter={() => setHovered(loc.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: active ? 0.55 : 0.32,
                    transition: 'opacity 0.65s ease',
                  }}
                >
                  <Image
                    src={loc.storefrontImage}
                    alt={`${loc.fullName} storefront`}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(28,28,26,0.94) 0%, rgba(28,28,26,0.35) 48%, rgba(28,28,26,0.2) 100%)',
                  }}
                  aria-hidden
                />
                {idx === 0 ? (
                  <div
                    className="pointer-events-none absolute top-0 right-0 z-10 h-full w-px"
                    style={{ backgroundColor: 'var(--primary)', opacity: 0.55 }}
                    aria-hidden
                  />
                ) : null}

                <div className="relative z-10 p-10 pb-14 md:p-14">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {loc.personality.map((tag) => (
                      <span
                        key={tag}
                        className="text-annotation px-2 py-1"
                        style={{
                          border: '1px solid rgba(245,240,232,0.22)',
                          color: 'rgba(245,240,232,0.55)',
                          fontSize: '0.5rem',
                          letterSpacing: '0.14em',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p
                    className="text-annotation mb-3"
                    style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}
                  >
                    MOMO HOUSE
                  </p>
                  <h2
                    className="font-display uppercase"
                    style={{
                      fontSize: active
                        ? 'clamp(2.4rem, 5.5vw, 5rem)'
                        : 'clamp(2rem, 4vw, 3.75rem)',
                      color: 'var(--primary-foreground)',
                      lineHeight: 0.88,
                      letterSpacing: '-0.04em',
                      transition: 'font-size 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {loc.name}
                  </h2>

                  <p
                    className="mt-4 font-editorial"
                    style={{
                      fontSize: '0.85rem',
                      letterSpacing: '0.04em',
                      color: 'rgba(245,240,232,0.65)',
                    }}
                  >
                    {loc.address} — {loc.arrondissement}
                  </p>
                  <p
                    className="mt-2 max-w-sm font-editorial"
                    style={{
                      fontSize: '0.8rem',
                      letterSpacing: '0.03em',
                      color: 'rgba(245,240,232,0.42)',
                      lineHeight: 1.5,
                    }}
                  >
                    {desc}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href={loc.href}
                      className="text-annotation inline-flex min-h-11 items-center gap-2 px-6 py-3"
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                        letterSpacing: '0.14em',
                        textDecoration: 'none',
                        fontSize: '0.62rem',
                      }}
                      aria-label={`Explore Momo House ${loc.name}`}
                    >
                      {t?.locations?.explorePrefix} {loc.name.toUpperCase()}
                      <span aria-hidden>→</span>
                    </Link>
                    <Link
                      href={`${loc.href}/carte`}
                      className="text-annotation inline-flex min-h-11 items-center px-5 py-3"
                      style={{
                        border: '1px solid rgba(245,240,232,0.28)',
                        color: 'var(--primary-foreground)',
                        letterSpacing: '0.12em',
                        textDecoration: 'none',
                        fontSize: '0.6rem',
                      }}
                    >
                      {language === 'fr' ? 'COMMANDES' : 'ORDER'}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col pt-20" style={{ minHeight: '100svh' }}>
          {locations.map((loc) => {
            const isOpen = expanded === loc.id;
            const desc =
              language === 'fr' ? loc.descriptionFr : loc.description;

            return (
              <div
                key={loc.id}
                className="relative flex flex-col justify-end overflow-hidden"
                style={{
                  flex: isOpen ? 2 : 1,
                  minHeight: isOpen ? '58vh' : '32vh',
                  transition:
                    'flex 0.55s cubic-bezier(0.16, 1, 0.3, 1), min-height 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
                  backgroundColor: 'var(--charcoal)',
                }}
              >
                <button
                  type="button"
                  className="absolute inset-0 z-[1]"
                  aria-expanded={isOpen}
                  aria-label={`${loc.name} details`}
                  onClick={() => setExpanded(isOpen ? null : loc.id)}
                />
                <div
                  className="absolute inset-0"
                  style={{ opacity: isOpen ? 0.5 : 0.28 }}
                >
                  <Image
                    src={loc.storefrontImage}
                    alt={`${loc.fullName} storefront`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(28,28,26,0.94) 0%, rgba(28,28,26,0.25) 60%, transparent 100%)',
                  }}
                  aria-hidden
                />

                <div className="relative z-10 p-6 pb-8">
                  <p
                    className="text-annotation mb-2"
                    style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}
                  >
                    MOMO HOUSE
                  </p>
                  <h2
                    className="font-display uppercase"
                    style={{
                      fontSize: isOpen
                        ? 'clamp(2.2rem, 9vw, 3.4rem)'
                        : 'clamp(1.7rem, 7vw, 2.4rem)',
                      color: 'var(--primary-foreground)',
                      lineHeight: 0.88,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {loc.name}
                  </h2>

                  <p
                    className="mt-2 font-editorial"
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(245,240,232,0.5)',
                    }}
                  >
                    {loc.address} — {loc.arrondissement}
                  </p>

                  {isOpen ? (
                    <div className="relative z-20 mt-4">
                      <p
                        className="font-editorial mb-4"
                        style={{
                          fontSize: '0.8rem',
                          color: 'rgba(245,240,232,0.4)',
                          lineHeight: 1.5,
                        }}
                      >
                        {desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={loc.href}
                          className="text-annotation inline-flex min-h-11 items-center px-5 py-3"
                          style={{
                            backgroundColor: 'var(--primary)',
                            color: 'var(--primary-foreground)',
                            letterSpacing: '0.12em',
                            textDecoration: 'none',
                            fontSize: '0.6rem',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t?.locations?.explorePrefix} {loc.name.toUpperCase()} →
                        </Link>
                        <Link
                          href={`${loc.href}/carte`}
                          className="text-annotation inline-flex min-h-11 items-center px-5 py-3"
                          style={{
                            border: '1px solid rgba(245,240,232,0.28)',
                            color: 'var(--primary-foreground)',
                            letterSpacing: '0.12em',
                            textDecoration: 'none',
                            fontSize: '0.6rem',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {language === 'fr' ? 'COMMANDES' : 'ORDER'}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <p
                      className="mt-3 font-editorial"
                      style={{
                        fontSize: '0.7rem',
                        color: 'rgba(245,240,232,0.35)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {t?.locations?.tapToExplore}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
