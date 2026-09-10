'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { getLocation } from '@/data/locations';
import { formatPrice, getMenuByHouse } from '@/data/menu';

type HouseId = 'montmartre' | 'poissonniere';

interface HouseHomeProps {
  houseId: HouseId;
}

export default function HouseHome({ houseId }: HouseHomeProps) {
  const { language } = useLanguage();
  const locale = language as 'fr' | 'en';
  const location = getLocation(houseId);
  const houseName = location.name;
  const sisterHouseId: HouseId =
    houseId === 'montmartre' ? 'poissonniere' : 'montmartre';
  const sister = getLocation(sisterHouseId);

  const dishes = getMenuByHouse(houseId);
  const featured = [
    ...dishes.filter((d) => d.signature),
    ...dishes.filter((d) => !d.signature && d.category === 'momos'),
    ...dishes.filter((d) => d.category !== 'momos'),
  ]
    .filter(
      (d, i, arr) => arr.findIndex((x) => x.id === d.id) === i,
    )
    .slice(0, 6);

  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisible((prev) => ({ ...prev, [e.target.id]: true }));
        });
      },
      { threshold: 0.12 },
    );
    Object.values(refs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    refs.current[id] = el;
  };

  const reveal = (id: string) => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? 'translateY(0)' : 'translateY(24px)',
    transition:
      'opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)',
  });

  return (
    <>
      <Navbar variant="house" houseId={houseId} />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
        {/* Hero with storefront */}
        <section
          id="arrival"
          ref={setRef('arrival')}
          className="relative overflow-hidden"
          style={{ minHeight: '88svh', ...reveal('arrival') }}
        >
          <div className="absolute inset-0">
            <Image
              src={location.storefrontImage}
              alt={`${location.fullName} storefront`}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(28,28,26,0.92) 0%, rgba(28,28,26,0.45) 45%, rgba(28,28,26,0.25) 100%)',
              }}
            />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-6 pb-12 pt-28 md:px-10 md:pb-16">
            <Link
              href="/"
              className="text-annotation mb-6 w-fit"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: 'rgba(245,240,232,0.65)',
                textDecoration: 'none',
              }}
            >
              ← MOMO HOUSE PARIS
            </Link>

            <p
              className="text-annotation mb-3"
              style={{ color: 'var(--primary)', letterSpacing: '0.22em' }}
            >
              MOMO HOUSE
            </p>
            <h1
              className="font-display uppercase"
              style={{
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                color: 'var(--primary-foreground)',
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                marginBottom: 20,
              }}
            >
              {houseName}
            </h1>
            <p
              className="mb-8 max-w-xl"
              style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                color: 'rgba(245,240,232,0.75)',
                lineHeight: 1.55,
              }}
            >
              {locale === 'fr' ? location.descriptionFr : location.description}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`/${houseId}/carte`}
                className="text-annotation inline-flex min-h-11 items-center justify-center px-7 py-3.5"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  letterSpacing: '0.14em',
                  textDecoration: 'none',
                  fontSize: '0.65rem',
                }}
              >
                {locale === 'fr' ? 'COMMANDES →' : 'ORDER →'}
              </Link>
              <Link
                href={`/${houseId}/contact`}
                className="text-annotation inline-flex min-h-11 items-center justify-center px-7 py-3.5"
                style={{
                  border: '1px solid rgba(245,240,232,0.35)',
                  color: 'var(--primary-foreground)',
                  letterSpacing: '0.14em',
                  textDecoration: 'none',
                  fontSize: '0.65rem',
                }}
              >
                {locale === 'fr' ? 'NOUS TROUVER →' : 'FIND US →'}
              </Link>
              <Link
                href={`/${houseId}/a-propos`}
                className="text-annotation underline-expand sm:ml-2"
                style={{
                  color: 'rgba(245,240,232,0.7)',
                  letterSpacing: '0.14em',
                  fontSize: '0.6rem',
                  textDecoration: 'none',
                }}
              >
                {locale === 'fr' ? 'À PROPOS' : 'ABOUT'}
              </Link>
            </div>
          </div>
        </section>

        {/* Practical info */}
        <section
          id="info"
          ref={setRef('info')}
          style={{
            padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 4vw, 3rem)',
            borderBottom: '1px solid var(--border)',
            ...reveal('info'),
          }}
        >
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            <div
              style={{
                border: '1px solid var(--border)',
                backgroundColor: 'var(--card)',
                padding: '1.5rem',
              }}
            >
              <p
                className="text-annotation mb-3"
                style={{ color: 'var(--primary)', letterSpacing: '0.18em' }}
              >
                {locale === 'fr' ? 'ADRESSE' : 'ADDRESS'}
              </p>
              <p style={{ color: 'var(--foreground)', fontSize: '1rem', lineHeight: 1.5 }}>
                {location.address}
                <br />
                {location.arrondissement}
              </p>
              <p
                className="mt-3"
                style={{ color: 'var(--muted-foreground)', fontSize: '0.8rem' }}
              >
                {location.metro[locale]}
              </p>
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-annotation mt-5 inline-block"
                style={{
                  color: 'var(--primary)',
                  letterSpacing: '0.12em',
                  fontSize: '0.6rem',
                }}
              >
                {locale === 'fr' ? 'ITINÉRAIRE →' : 'DIRECTIONS →'}
              </a>
            </div>

            <div
              style={{
                border: '1px solid var(--border)',
                backgroundColor: 'var(--card)',
                padding: '1.5rem',
              }}
            >
              <p
                className="text-annotation mb-3"
                style={{ color: 'var(--primary)', letterSpacing: '0.18em' }}
              >
                {locale === 'fr' ? 'HORAIRES' : 'HOURS'}
              </p>
              <ul className="space-y-2">
                {location.hoursLines[locale].map((line) => (
                  <li
                    key={line}
                    style={{
                      color: 'var(--muted-foreground)',
                      fontSize: '0.85rem',
                      lineHeight: 1.45,
                    }}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                border: '1px solid var(--border)',
                backgroundColor: 'var(--card)',
                padding: '1.5rem',
              }}
            >
              <p
                className="text-annotation mb-3"
                style={{ color: 'var(--primary)', letterSpacing: '0.18em' }}
              >
                CONTACT
              </p>
              <a
                href={`tel:${location.phone.replace(/\s/g, '')}`}
                style={{
                  color: 'var(--foreground)',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                {location.phone}
              </a>
              <p
                className="mt-3"
                style={{ color: 'var(--muted-foreground)', fontSize: '0.8rem' }}
              >
                {locale === 'fr'
                  ? 'Appelez pour groupes & demandes spéciales.'
                  : 'Call for groups & special requests.'}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {location.personality.map((tag) => (
                  <span
                    key={tag}
                    className="text-annotation px-2 py-1"
                    style={{
                      border: '1px solid var(--border)',
                      color: 'var(--muted-foreground)',
                      fontSize: '0.5rem',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Menu preview */}
        <section
          id="menu-preview"
          ref={setRef('menu-preview')}
          style={{
            padding: 'clamp(3rem, 7vw, 5.5rem) clamp(1.5rem, 4vw, 3rem)',
            borderBottom: '1px solid var(--border)',
            ...reveal('menu-preview'),
          }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p
                  className="text-annotation mb-3"
                  style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}
                >
                  {locale === 'fr' ? 'LA CARTE' : 'THE MENU'}
                </p>
                <h2
                  className="font-display uppercase"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    color: 'var(--foreground)',
                    letterSpacing: '-0.03em',
                    lineHeight: 0.92,
                  }}
                >
                  {locale === 'fr' ? 'Ce que l\'on plie ici' : 'What we fold here'}
                </h2>
              </div>
              <Link
                href={`/${houseId}/carte`}
                className="text-annotation"
                style={{
                  color: 'var(--primary)',
                  letterSpacing: '0.14em',
                  fontSize: '0.65rem',
                  textDecoration: 'none',
                }}
              >
                {locale === 'fr' ? 'VOIR LES COMMANDES →' : 'VIEW FULL MENU →'}
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((dish) => (
                <article
                  key={dish.id}
                  style={{
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--card)',
                    overflow: 'hidden',
                  }}
                >
                  <div className="relative aspect-[4/3] bg-[var(--secondary)]">
                    {dish.image ? (
                      <Image
                        src={dish.image}
                        alt={dish.name[locale]}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <p
                      className="text-annotation mb-2"
                      style={{
                        color: 'var(--muted-foreground)',
                        fontSize: '0.5rem',
                        letterSpacing: '0.16em',
                      }}
                    >
                      {dish.category.toUpperCase()}
                      {dish.signature
                        ? ` · ${locale === 'fr' ? 'SIGNATURE' : 'SIGNATURE'}`
                        : ''}
                    </p>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '1.15rem',
                        color: 'var(--foreground)',
                        letterSpacing: '-0.02em',
                        marginBottom: 8,
                      }}
                    >
                      {dish.name[locale]}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--muted-foreground)',
                        lineHeight: 1.5,
                        marginBottom: 14,
                        minHeight: '2.4em',
                      }}
                    >
                      {dish.description[locale]}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="font-display"
                        style={{
                          fontSize: '1rem',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {formatPrice(dish.price, locale)}
                      </span>
                      <Link
                        href={`/${houseId}/carte`}
                        className="text-annotation"
                        style={{
                          fontSize: '0.55rem',
                          letterSpacing: '0.12em',
                          padding: '8px 12px',
                          backgroundColor: 'var(--primary)',
                          color: 'var(--primary-foreground)',
                          textDecoration: 'none',
                        }}
                      >
                        {locale === 'fr' ? 'COMMANDER' : 'ORDER'}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Atmosphere */}
        <section
          id="room"
          ref={setRef('room')}
          style={{
            padding: 'clamp(3rem, 7vw, 5.5rem) clamp(1.5rem, 4vw, 3rem)',
            borderBottom: '1px solid var(--border)',
            ...reveal('room'),
          }}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden border border-[var(--border)] md:aspect-[5/6]">
              <Image
                src={location.roomImage}
                alt={`${houseName} atmosphere`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p
                className="text-annotation mb-4"
                style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}
              >
                {locale === 'fr' ? 'LA SALLE' : 'THE ROOM'}
              </p>
              <h2
                className="font-display uppercase mb-5"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.92,
                  color: 'var(--foreground)',
                }}
              >
                {locale === 'fr'
                  ? 'Une table, deux maisons'
                  : 'One table, two houses'}
              </h2>
              <p
                style={{
                  color: 'var(--muted-foreground)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  marginBottom: 28,
                  maxWidth: '38ch',
                }}
              >
                {locale === 'fr' ? location.descriptionFr : location.description}{' '}
                {locale === 'fr'
                  ? 'Momos pliés à la main, service rapide, ambiance chaude — venez pour le goût himalayen au cœur de Paris.'
                  : 'Hand-folded momos, quick service, warm room — Himalayan flavour in the heart of Paris.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${houseId}/a-propos`}
                  className="text-annotation inline-flex min-h-11 items-center px-6 py-3"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                    letterSpacing: '0.12em',
                    textDecoration: 'none',
                    fontSize: '0.6rem',
                  }}
                >
                  {locale === 'fr' ? 'À PROPOS →' : 'ABOUT →'}
                </Link>
                <Link
                  href={`/${sisterHouseId}`}
                  className="text-annotation inline-flex min-h-11 items-center px-6 py-3"
                  style={{
                    color: 'var(--primary)',
                    letterSpacing: '0.12em',
                    textDecoration: 'none',
                    fontSize: '0.6rem',
                  }}
                >
                  {locale === 'fr'
                    ? `Maison sœur · ${sister.name} →`
                    : `Sister house · ${sister.name} →`}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom strip */}
        <section
          style={{
            padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 3rem)',
            backgroundColor: 'var(--secondary)',
          }}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p
                className="text-annotation mb-2"
                style={{
                  color: 'var(--muted-foreground)',
                  letterSpacing: '0.16em',
                  fontSize: '0.55rem',
                }}
              >
                {location.fullName}
              </p>
              <p style={{ color: 'var(--foreground)', fontSize: '0.95rem' }}>
                {location.address}, {location.arrondissement}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="text-annotation inline-flex min-h-11 items-center px-5 py-3"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  fontSize: '0.6rem',
                }}
              >
                ← {locale === 'fr' ? 'PORTAIL' : 'PORTAL'}
              </Link>
              <Link
                href={`/${houseId}/panier`}
                className="text-annotation inline-flex min-h-11 items-center px-5 py-3"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  fontSize: '0.6rem',
                }}
              >
                {locale === 'fr' ? 'PANIER' : 'CART'}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
