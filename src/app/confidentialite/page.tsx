'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/components/Footer';

export default function ConfidentialitePage() {
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
            {locale === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
          </h1>

          <div style={{ fontSize: '0.85rem', color: 'var(--foreground)', lineHeight: 1.8 }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '1. Responsable du traitement' : '1. Data Controller'}
            </h2>
            <p>
              {locale === 'fr' ?'[VERIFY — Nom et coordonnées du responsable du traitement]' :'[VERIFY — Name and contact details of the data controller]'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '2. Données collectées' : '2. Data Collected'}
            </h2>
            <p>
              {locale === 'fr' ?'Dans le cadre des commandes en ligne, nous collectons : prénom, numéro de téléphone, adresse email. Ces données sont utilisées uniquement pour le traitement de votre commande et la communication relative à celle-ci. [DRAFT]' :'For online orders, we collect: first name, phone number, email address. This data is used solely for processing your order and related communications. [DRAFT]'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '3. Base légale' : '3. Legal Basis'}
            </h2>
            <p>
              {locale === 'fr' ?'Le traitement est fondé sur l\'exécution du contrat (article 6(1)(b) du RGPD). [DRAFT — à vérifier]'
                : 'Processing is based on contract performance (Article 6(1)(b) GDPR). [DRAFT — to be verified]'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '4. Durée de conservation' : '4. Retention Period'}
            </h2>
            <p>
              {locale === 'fr' ?'Les données de commande sont conservées [VERIFY durée] conformément aux obligations légales. [DRAFT]' :'Order data is retained for [VERIFY period] in accordance with legal obligations. [DRAFT]'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '5. Vos droits' : '5. Your Rights'}
            </h2>
            <p>
              {locale === 'fr' ?'Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification, d\'effacement, de limitation, de portabilité et d\'opposition. Pour exercer ces droits, contactez-nous à [VERIFY email]. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr). [DRAFT]'
                : 'Under GDPR, you have the right to access, rectify, erase, restrict, port and object to your data. To exercise these rights, contact us at [VERIFY email]. You may also lodge a complaint with the CNIL (www.cnil.fr). [DRAFT]'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '6. Cookies' : '6. Cookies'}
            </h2>
            <p>
              {locale === 'fr' ?'Ce site utilise uniquement des cookies techniques nécessaires au fonctionnement. Aucun cookie analytique ou publicitaire n\'est utilisé sans votre consentement. [DRAFT — à vérifier selon les outils réellement utilisés]'
                : 'This site uses only technical cookies necessary for operation. No analytics or advertising cookies are used without your consent. [DRAFT — to be verified based on tools actually used]'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '7. Paiement en ligne' : '7. Online Payment'}
            </h2>
            <p>
              {locale === 'fr' ?'Les paiements en ligne sont traités par [VERIFY — prestataire de paiement, ex. Stripe]. Aucune donnée bancaire ne transite par nos serveurs. [DRAFT — à activer en Phase 3]' :'Online payments are processed by [VERIFY — payment provider, e.g. Stripe]. No card data passes through our servers. [DRAFT — to be activated in Phase 3]'}
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
