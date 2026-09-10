'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/app/components/Navbar';
import InquiryForm from '@/app/components/InquiryForm';
import Footer from '@/components/Footer';
import { locations } from '@/data/locations';

type HouseId = 'montmartre' | 'poissonniere';

// TODO: Verify all hours with owner
const HOURS_PLACEHOLDER = [
  { day: { fr: 'Lundi', en: 'Monday' },    ranges: ['[VERIFY]'] },
  { day: { fr: 'Mardi', en: 'Tuesday' },   ranges: ['[VERIFY]'] },
  { day: { fr: 'Mercredi', en: 'Wednesday' }, ranges: ['[VERIFY]'] },
  { day: { fr: 'Jeudi', en: 'Thursday' },  ranges: ['[VERIFY]'] },
  { day: { fr: 'Vendredi', en: 'Friday' }, ranges: ['[VERIFY]'] },
  { day: { fr: 'Samedi', en: 'Saturday' }, ranges: ['[VERIFY]'] },
  { day: { fr: 'Dimanche', en: 'Sunday' }, ranges: ['[VERIFY]'] },
];

interface ContactPageProps {
  houseId: HouseId;
}

export default function ContactPage({ houseId }: ContactPageProps) {
  const { language } = useLanguage();
  const locale = language as 'fr' | 'en';
  const location = locations.find(l => l.id === houseId)!;
  const houseName = houseId === 'montmartre' ? 'Montmartre' : 'Poissonnière';
  const sisterHouseId = houseId === 'montmartre' ? 'poissonniere' : 'montmartre';
  const sisterHouseName = houseId === 'montmartre' ? 'Poissonnière' : 'Montmartre';

  const [todayIndex] = useState(() => new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const mapsUrl = location.mapsUrl;

  return (
    <>
      <Navbar variant="house" houseId={houseId} />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '5rem' }}>
        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid var(--border)', padding: '1rem 1.5rem' }}>
          <div className="max-w-5xl mx-auto flex items-center gap-3">
            <Link
              href={`/${houseId}`}
              className="text-annotation underline-expand"
              style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)' }}
            >
              ← {houseName.toUpperCase()}
            </Link>
            <span style={{ color: 'var(--border)', fontSize: '0.6rem' }}>·</span>
            <span className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--primary)' }}>
              {locale === 'fr' ? 'CONTACT' : 'CONTACT'}
            </span>
          </div>
        </div>

        {/* Above the fold — address, phone, status */}
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 1.5rem', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-5xl mx-auto">
            <h1
              className="font-display"
              style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', color: 'var(--foreground)', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: 32 }}
            >
              {locale === 'fr' ? 'Nous Trouver' : 'Find Us'}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Address */}
              <div>
                <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
                  {locale === 'fr' ? 'ADRESSE' : 'ADDRESS'}
                </p>
                <a
                  href={`https://maps.apple.com/?q=${encodeURIComponent(location.address + ', ' + location.arrondissement)}`}
                  className="block"
                  style={{ textDecoration: 'none' }}
                  aria-label={`Open ${location.address} in Maps`}
                >
                  <p
                    className="font-display"
                    style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--foreground)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
                  >
                    {location.address}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: 4 }}>
                    {location.arrondissement}
                    {houseId === 'poissonniere' && (
                      <span className="text-annotation" style={{ fontSize: '0.45rem', marginLeft: 6, color: 'var(--muted-foreground)' }}>
                        [VERIFY postcode]
                      </span>
                    )}
                  </p>
                  <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--primary)', marginTop: 8 }}>
                    {locale === 'fr' ? 'OUVRIR DANS MAPS →' : 'OPEN IN MAPS →'}
                  </p>
                </a>
              </div>

              {/* Phone */}
              <div>
                <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
                  {locale === 'fr' ? 'TÉLÉPHONE' : 'PHONE'}
                </p>
                <a
                  href={`tel:${location.phone.replace(/\s/g, '')}`}
                  style={{ textDecoration: 'none' }}
                  aria-label={`Call ${location.phone}`}
                >
                  <p
                    className="font-display"
                    style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--foreground)', letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}
                  >
                    {location.phone}
                    {houseId === 'montmartre' && (
                      <span className="text-annotation" style={{ fontSize: '0.45rem', marginLeft: 8, color: 'var(--muted-foreground)' }}>
                        [VERIFY]
                      </span>
                    )}
                  </p>
                  <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--primary)', marginTop: 8 }}>
                    {locale === 'fr' ? 'APPELER →' : 'CALL →'}
                  </p>
                </a>
              </div>

              {/* Status */}
              <div>
                <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
                  {locale === 'fr' ? 'STATUT' : 'STATUS'}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'inline-block' }}
                    aria-hidden="true"
                  />
                  <span style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>
                    {/* TODO: Replace with live getStatus() once hours are confirmed */}
                    {locale === 'fr' ? 'Horaires à confirmer [VERIFY]' : 'Hours to be confirmed [VERIFY]'}
                  </span>
                </div>
              </div>

              {/* Reservations */}
              <div>
                <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
                  {locale === 'fr' ? 'RÉSERVATIONS' : 'RESERVATIONS'}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--foreground)', lineHeight: 1.5, marginBottom: 12 }}>
                  {locale === 'fr'
                    ? `Réservez une table à Momo House ${houseName} — la maison est déjà sélectionnée.`
                    : `Reserve a table at Momo House ${houseName} — this house is already selected.`}
                </p>
                <a
                  href="#reserve"
                  className="text-annotation"
                  style={{
                    fontSize: '0.55rem',
                    letterSpacing: '0.15em',
                    color: 'var(--primary)',
                    textDecoration: 'none',
                  }}
                >
                  {locale === 'fr' ? 'FORMULAIRE ↓' : 'FORM ↓'}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Hours block */}
        <section
          ref={sectionRef}
          style={{
            padding: 'clamp(2rem, 5vw, 4rem) 1.5rem',
            borderBottom: '1px solid var(--border)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="max-w-5xl mx-auto">
            <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', marginBottom: 16 }}>
              {locale === 'fr' ? 'HORAIRES D\'OUVERTURE' : 'OPENING HOURS'}
            </p>
            <div
              style={{
                padding: '10px 14px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--secondary)',
                marginBottom: 16,
              }}
            >
              <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)' }}>
                ⚠ {locale === 'fr' ? 'Horaires à confirmer avec le propriétaire [VERIFY]' : 'Hours to be confirmed with owner [VERIFY]'}
              </p>
            </div>
            <div style={{ border: '1px solid var(--border)' }}>
              {HOURS_PLACEHOLDER.map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between"
                  style={{
                    padding: '10px 16px',
                    borderBottom: i < HOURS_PLACEHOLDER.length - 1 ? '1px solid var(--border)' : 'none',
                    backgroundColor: i === todayIndex ? 'rgba(196,30,42,0.04)' : 'transparent',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: i === todayIndex ? 'var(--foreground)' : 'var(--muted-foreground)',
                      fontWeight: i === todayIndex ? 700 : 400,
                    }}
                  >
                    {row.day[locale]}
                    {i === todayIndex && (
                      <span className="text-annotation" style={{ fontSize: '0.45rem', marginLeft: 6, color: 'var(--primary)' }}>
                        {locale === 'fr' ? 'AUJOURD\'HUI' : 'TODAY'}
                      </span>
                    )}
                  </span>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--muted-foreground)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {row.ranges.join(' · ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Getting there */}
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 1.5rem', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', marginBottom: 16 }}>
              {locale === 'fr' ? 'Y ACCÉDER' : 'GETTING THERE'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--foreground)', marginBottom: 8 }}>
                  {locale === 'fr' ? 'MÉTRO' : 'METRO'}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                  {locale === 'fr' ?'Station(s) la plus proche : [VERIFY]' :'Nearest station(s): [VERIFY]'}
                </p>
              </div>
              <div>
                <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--foreground)', marginBottom: 8 }}>
                  {locale === 'fr' ? 'MAISON SŒUR' : 'SISTER HOUSE'}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                  {locale === 'fr'
                    ? `Momo House ${sisterHouseName} : [VERIFY temps de marche]`
                    : `Momo House ${sisterHouseName}: [VERIFY walking time]`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 1.5rem', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', marginBottom: 16 }}>
              {locale === 'fr' ? 'CARTE' : 'MAP'}
            </p>
            {/* Static map placeholder — no iframe on first load */}
            <div
              style={{
                aspectRatio: '16/7',
                backgroundColor: 'var(--secondary)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}
              role="img"
              aria-label={`Map placeholder for Momo House ${houseName}`}
            >
              <p
                className="text-annotation"
                style={{ fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)', textAlign: 'center' }}
              >
                PLACEHOLDER — {locale === 'fr' ? 'Illustration de quartier à créer' : 'Neighbourhood illustration to be created'}
                <br />
                {location.address}, {location.arrondissement}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-annotation"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  padding: '8px 16px',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  textDecoration: 'none',
                }}
              >
                {locale === 'fr' ? 'OUVRIR DANS MAPS →' : 'OPEN IN MAPS →'}
              </a>
            </div>
          </div>
        </section>

        {/* Contact channels */}
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 1.5rem', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', marginBottom: 16 }}>
              {locale === 'fr' ? 'NOUS CONTACTER' : 'CONTACT US'}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href={`tel:${location.phone.replace(/\s/g, '')}`}
                className="text-annotation underline-expand"
                style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--foreground)' }}
              >
                {locale === 'fr' ? 'TÉLÉPHONE' : 'PHONE'} — {location.phone}
              </a>
              <span style={{ color: 'var(--border)' }}>·</span>
              <span className="text-annotation" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--muted-foreground)' }}>
                EMAIL — [VERIFY]
              </span>
              <span style={{ color: 'var(--border)' }}>·</span>
              <span className="text-annotation" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--muted-foreground)' }}>
                INSTAGRAM — [VERIFY @handle]
              </span>
            </div>
          </div>
        </section>

        {/* Sister house */}
        <section style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
              {locale === 'fr' ? 'NOTRE MAISON SŒUR' : 'OUR SISTER HOUSE'}
            </p>
            <Link
              href={`/${sisterHouseId}/contact`}
              className="text-annotation underline-expand"
              style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--primary)' }}
            >
              {locale === 'fr' ? `CONTACT ${sisterHouseName.toUpperCase()} →` : `${sisterHouseName.toUpperCase()} CONTACT →`}
            </Link>
          </div>
        </section>

        <InquiryForm houseId={houseId} />
      </main>
      <Footer />
    </>
  );
}
