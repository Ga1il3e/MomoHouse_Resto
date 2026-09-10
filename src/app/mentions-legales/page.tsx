'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/components/Footer';

export default function MentionsLegalesPage() {
  const { language } = useLanguage();
  const locale = language as 'fr' | 'en';

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '5rem' }}>
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* DRAFT watermark */}
          <div
            style={{
              padding: '12px 16px',
              border: '2px solid var(--primary)',
              backgroundColor: 'rgba(196,30,42,0.04)',
              marginBottom: 32,
            }}
          >
            <p
              className="text-annotation"
              style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--primary)', textAlign: 'center' }}
            >
              ⚠ DRAFT — À FAIRE RÉVISER PAR UN PROFESSIONNEL / TO BE REVIEWED BY A PROFESSIONAL
            </p>
          </div>

          <h1
            className="font-display"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: 'var(--foreground)', letterSpacing: '-0.03em', marginBottom: 32 }}
          >
            {locale === 'fr' ? 'Mentions Légales' : 'Legal Notice'}
          </h1>

          <div style={{ fontSize: '0.85rem', color: 'var(--foreground)', lineHeight: 1.8 }} className="prose">
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? 'Éditeur du site' : 'Site Publisher'}
            </h2>
            <p>
              {locale === 'fr' ? 'Raison sociale : [VERIFY — Nom de la société ou du propriétaire]' : 'Company name: [VERIFY — Company or owner name]'}<br />
              {locale === 'fr' ? 'Forme juridique : [VERIFY]' : 'Legal form: [VERIFY]'}<br />
              {locale === 'fr' ? 'Capital social : [VERIFY]' : 'Share capital: [VERIFY]'}<br />
              {locale === 'fr' ? 'Siège social : [VERIFY]' : 'Registered address: [VERIFY]'}<br />
              {locale === 'fr' ? 'SIRET : [VERIFY]' : 'SIRET: [VERIFY]'}<br />
              {locale === 'fr' ? 'Numéro TVA intracommunautaire : [VERIFY]' : 'VAT number: [VERIFY]'}<br />
              {locale === 'fr' ? 'Directeur de la publication : [VERIFY]' : 'Publication director: [VERIFY]'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? 'Hébergement' : 'Hosting'}
            </h2>
            <p>
              {locale === 'fr' ? 'Hébergeur : [VERIFY — Nom et adresse de l\'hébergeur]' : 'Host: [VERIFY — Host name and address]'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? 'Contact' : 'Contact'}
            </h2>
            <p>
              {locale === 'fr' ? 'Email : [VERIFY]' : 'Email: [VERIFY]'}<br />
              {locale === 'fr' ? 'Téléphone : [VERIFY]' : 'Phone: [VERIFY]'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? 'Propriété intellectuelle' : 'Intellectual Property'}
            </h2>
            <p>
              {locale === 'fr' ?'L\'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels…) est la propriété exclusive de Momo House, à l\'exception des marques, logos ou contenus appartenant à d\'autres sociétés partenaires ou auteurs. [DRAFT — à vérifier]'
                : 'All content on this site (text, images, graphics, logo, icons, sounds, software…) is the exclusive property of Momo House, except for trademarks, logos or content belonging to other partner companies or authors. [DRAFT — to be verified]'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? 'Données personnelles' : 'Personal Data'}
            </h2>
            <p>
              {locale === 'fr' ?'Pour toute information sur le traitement de vos données personnelles, consultez notre ' :'For information on how we process your personal data, see our '}
              <Link href="/confidentialite" style={{ color: 'var(--primary)' }}>
                {locale === 'fr' ? 'politique de confidentialité' : 'privacy policy'}
              </Link>.
            </p>
          </div>

          <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            <Link
              href="/"
              className="text-annotation underline-expand"
              style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--muted-foreground)' }}
            >
              ← {locale === 'fr' ? 'RETOUR À L\'ACCUEIL' : 'BACK TO HOME'}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
