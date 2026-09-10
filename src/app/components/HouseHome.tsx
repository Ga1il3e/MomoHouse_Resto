'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/components/Footer';
import { locations } from '@/data/locations';
import { getMenuByHouse, formatPrice } from '@/data/menu';

type HouseId = 'montmartre' | 'poissonniere';

interface HouseHomeProps {
  houseId: HouseId;
}

export default function HouseHome({ houseId }: HouseHomeProps) {
  const { language } = useLanguage();
  const locale = language as 'fr' | 'en';
  const location = locations.find(l => l.id === houseId)!;
  const houseName = houseId === 'montmartre' ? 'Montmartre' : 'Poissonnière';
  const sisterHouseId = houseId === 'montmartre' ? 'poissonniere' : 'montmartre';
  const sisterHouseName = houseId === 'montmartre' ? 'Poissonnière' : 'Montmartre';

  const dishes = getMenuByHouse(houseId);
  const signatureDishes = dishes.filter(d => d.signature).slice(0, 2);

  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setVisible(prev => ({ ...prev, [e.target.id]: true }));
        });
      },
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };

  // Per-house CTA order: Montmartre leads with Order, Poissonnière leads with Visit
  const primaryCta = houseId === 'montmartre'
    ? { label: locale === 'fr' ? 'COMMANDER' : 'ORDER', href: `/${houseId}/carte` }
    : { label: locale === 'fr' ? 'NOUS RENDRE VISITE' : 'VISIT US', href: `/${houseId}/contact` };
  const secondaryCta = houseId === 'montmartre'
    ? { label: locale === 'fr' ? 'NOUS RENDRE VISITE' : 'VISIT US', href: `/${houseId}/contact` }
    : { label: locale === 'fr' ? 'COMMANDER' : 'ORDER', href: `/${houseId}/carte` };

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>

        {/* ── 1. ARRIVAL ─────────────────────────────────────────────────── */}
        <section
          id="arrival"
          ref={setRef('arrival')}
          style={{
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            borderBottom: '1px solid var(--border)',
            paddingTop: '6rem',
            opacity: visible['arrival'] ? 1 : 0,
            transform: visible['arrival'] ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="max-w-6xl mx-auto w-full">
            {/* Portal link */}
            <div style={{ marginBottom: 24 }}>
              <Link
                href="/"
                className="text-annotation underline-expand"
                style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)' }}
              >
                ← MOMO HOUSE PARIS
              </Link>
            </div>

            {/* House name */}
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(3.5rem, 14vw, 12rem)',
                color: 'var(--foreground)',
                letterSpacing: '-0.04em',
                lineHeight: 0.85,
                marginBottom: 24,
              }}
            >
              {houseName.toUpperCase()}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              {/* Address + status */}
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>
                  {location.address} · {location.arrondissement}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'inline-block' }}
                    aria-hidden="true"
                  />
                  <span className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--muted-foreground)' }}>
                    {/* TODO: Replace with live getStatus() once hours are confirmed */}
                    {locale === 'fr' ? 'HORAIRES À CONFIRMER [VERIFY]' : 'HOURS TO BE CONFIRMED [VERIFY]'}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={primaryCta.href}
                  className="text-annotation"
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    padding: '14px 28px',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    textDecoration: 'none',
                    display: 'inline-block',
                    minHeight: 44,
                  }}
                >
                  {primaryCta.label} →
                </Link>
                <Link
                  href={secondaryCta.href}
                  className="text-annotation"
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    padding: '14px 28px',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                    textDecoration: 'none',
                    display: 'inline-block',
                    minHeight: 44,
                  }}
                >
                  {secondaryCta.label} →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. SIGNATURE DISHES ────────────────────────────────────────── */}
        <section
          id="signature"
          ref={setRef('signature')}
          style={{
            padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3rem)',
            borderBottom: '1px solid var(--border)',
            opacity: visible['signature'] ? 1 : 0,
            transform: visible['signature'] ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          <div className="max-w-6xl mx-auto">
            <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--primary)', marginBottom: 24 }}>
              {locale === 'fr' ? 'SIGNATURES' : 'SIGNATURES'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {signatureDishes.length > 0 ? signatureDishes.map((dish, i) => (
                <div
                  key={dish.id}
                  style={{
                    borderTop: '1px solid var(--border)',
                    paddingTop: 24,
                    transitionDelay: `${i * 0.08}s`,
                  }}
                >
                  {/* Dish image placeholder */}
                  <div
                    style={{
                      aspectRatio: '4/5',
                      backgroundColor: 'var(--secondary)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                      padding: '1rem',
                    }}
                    role="img"
                    aria-label={`PLACEHOLDER — ${dish.name[locale]}, 45°, bowl edge in frame, 4:5`}
                  >
                    <p
                      className="text-annotation"
                      style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'var(--muted-foreground)', textAlign: 'center', lineHeight: 1.6 }}
                    >
                      PLACEHOLDER — {dish.name[locale]}, 45°, bowl edge in frame, 4:5
                    </p>
                  </div>

                  {/* Devanagari name */}
                  {dish.nameNe && (
                    <p
                      lang="ne"
                      style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--foreground)', lineHeight: 1.3, marginBottom: 4 }}
                    >
                      {dish.nameNe.text}
                      {!dish.nameNe.verified && (
                        <span className="text-annotation" style={{ fontSize: '0.45rem', color: 'var(--muted-foreground)', marginLeft: 8 }}>
                          [unverified]
                        </span>
                      )}
                    </p>
                  )}
                  <p
                    className="font-display"
                    style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'var(--foreground)', letterSpacing: '-0.01em', marginBottom: 8 }}
                  >
                    {dish.name[locale]}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', lineHeight: 1.5, marginBottom: 12 }}>
                    {dish.description[locale]}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="font-display"
                      style={{ fontSize: '1.1rem', color: 'var(--foreground)', fontVariantNumeric: 'tabular-nums' }}
                    >
                      {formatPrice(dish.price, locale)}
                    </span>
                    <Link
                      href={`/${houseId}/carte`}
                      className="text-annotation"
                      style={{
                        fontSize: '0.55rem',
                        letterSpacing: '0.15em',
                        padding: '8px 14px',
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                        textDecoration: 'none',
                        minHeight: 44,
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      {locale === 'fr' ? 'AJOUTER' : 'ADD'}
                    </Link>
                  </div>
                </div>
              )) : (
                <div style={{ gridColumn: '1 / -1' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                    {locale === 'fr' ?'PLACEHOLDER — Plats signatures à confirmer avec le propriétaire' :'PLACEHOLDER — Signature dishes to be confirmed with owner'}
                  </p>
                </div>
              )}
            </div>

            <div style={{ marginTop: 32 }}>
              <Link
                href={`/${houseId}/carte`}
                className="text-annotation underline-expand"
                style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--primary)' }}
              >
                {locale === 'fr' ? 'VOIR TOUTE LA CARTE →' : 'VIEW FULL MENU →'}
              </Link>
            </div>
          </div>
        </section>

        {/* ── 3. THE ROOM ────────────────────────────────────────────────── */}
        <section
          id="room"
          ref={setRef('room')}
          style={{
            padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3rem)',
            borderBottom: '1px solid var(--border)',
            opacity: visible['room'] ? 1 : 0,
            transform: visible['room'] ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s',
          }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Wide room photo placeholder */}
            <div
              style={{
                aspectRatio: '16/7',
                backgroundColor: 'var(--secondary)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                padding: '1.5rem',
              }}
              role="img"
              aria-label={`PLACEHOLDER — ${houseName} dining room, wide establishing shot, 16:7`}
            >
              <p
                className="text-annotation"
                style={{ fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)', textAlign: 'center', lineHeight: 1.6 }}
              >
                PLACEHOLDER — {houseName} dining room, wide establishing shot, 16:7
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <p
                style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  color: 'var(--muted-foreground)',
                  lineHeight: 1.6,
                  maxWidth: '55ch',
                }}
              >
                {/* TODO: Replace with real copy from owner interview */}
                {locale === 'fr' ?'PLACEHOLDER — Une phrase vraie sur la salle, à fournir par le propriétaire après entretien.' :'PLACEHOLDER — One true sentence about the room, to be provided by owner after interview.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  href={`/${houseId}/a-propos`}
                  className="text-annotation underline-expand"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--foreground)' }}
                >
                  {locale === 'fr' ? 'À PROPOS →' : 'ABOUT →'}
                </Link>
                <Link
                  href={`/${houseId}/contact`}
                  className="text-annotation underline-expand"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--foreground)' }}
                >
                  {locale === 'fr' ? 'NOUS TROUVER →' : 'FIND US →'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER STRIP ───────────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 3rem)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              {/* Hours summary */}
              <div>
                <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', marginBottom: 4 }}>
                  {locale === 'fr' ? 'HORAIRES' : 'HOURS'}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--foreground)' }}>
                  {locale === 'fr' ? '[VERIFY horaires avec le propriétaire]' : '[VERIFY hours with owner]'}
                </p>
              </div>

              {/* Sister house */}
              <div>
                <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', marginBottom: 4 }}>
                  {locale === 'fr' ? 'MAISON SŒUR' : 'SISTER HOUSE'}
                </p>
                <Link
                  href={`/${sisterHouseId}`}
                  className="text-annotation underline-expand"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--primary)' }}
                >
                  {locale === 'fr'
                    ? `Complet ? Momo House ${sisterHouseName} est à quelques minutes. [VERIFY] →`
                    : `Full here? Momo House ${sisterHouseName} is a few minutes away. [VERIFY] →`}
                </Link>
              </div>

              {/* Portal link */}
              <div>
                <Link
                  href="/"
                  className="text-annotation underline-expand"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--muted-foreground)' }}
                >
                  ← MOMO HOUSE PARIS
                </Link>
              </div>
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap gap-4 mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
              {[
                { href: '/mentions-legales', labelFr: 'Mentions légales', labelEn: 'Legal notice' },
                { href: '/cgv', labelFr: 'CGV', labelEn: 'Terms of sale' },
                { href: '/confidentialite', labelFr: 'Confidentialité', labelEn: 'Privacy' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-annotation underline-expand"
                  style={{ fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)' }}
                >
                  {locale === 'fr' ? link.labelFr : link.labelEn}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
