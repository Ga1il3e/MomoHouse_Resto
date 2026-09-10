'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/components/Footer';

export default function CGVPage() {
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
            {locale === 'fr' ? 'Conditions Générales de Vente' : 'Terms of Sale'}
          </h1>

          <div style={{ fontSize: '0.85rem', color: 'var(--foreground)', lineHeight: 1.8 }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '1. Objet' : '1. Purpose'}
            </h2>
            <p>
              {locale === 'fr' ?'Les présentes conditions générales de vente régissent les ventes de produits alimentaires effectuées via le site internet de Momo House. [DRAFT — à compléter et vérifier par un professionnel]' :'These terms of sale govern the sale of food products made through the Momo House website. [DRAFT — to be completed and verified by a professional]'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '2. Produits et prix' : '2. Products and Prices'}
            </h2>
            <p>
              {locale === 'fr' ?'Les prix sont indiqués en euros, toutes taxes comprises (TTC). [VERIFY taux de TVA avec le comptable]. Momo House se réserve le droit de modifier ses prix à tout moment.' :'Prices are shown in euros, including all taxes (TTC). [VERIFY VAT rates with accountant]. Momo House reserves the right to change prices at any time.'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '3. Commandes' : '3. Orders'}
            </h2>
            <p>
              {locale === 'fr' ?'Les commandes sont passées en ligne pour un retrait en restaurant (click & collect). [DRAFT — modèle de commande à confirmer avec le propriétaire : A, B ou C]' :'Orders are placed online for restaurant pickup (click & collect). [DRAFT — ordering model to be confirmed with owner: A, B or C]'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '4. Allergènes' : '4. Allergens'}
            </h2>
            <p>
              {locale === 'fr' ?'Conformément au règlement UE 1169/2011, les informations sur les 14 allergènes réglementés sont disponibles pour chaque plat vendu en ligne. Notre cuisine manipule l\'ensemble de ces allergènes. En cas d\'allergie, contactez-nous par téléphone avant de passer commande.' :'In accordance with EU Regulation 1169/2011, information on the 14 regulated allergens is available for every dish sold online. Our kitchen handles all of these allergens. In case of allergy, contact us by phone before ordering.'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '5. Droit de rétractation' : '5. Right of Withdrawal'}
            </h2>
            <p>
              {locale === 'fr' ?'[DRAFT — À vérifier avec un professionnel du droit. Le droit de rétractation de 14 jours ne s\'applique généralement pas aux denrées alimentaires périssables (article L221-28 du Code de la consommation). Cette mention doit être confirmée par le comptable ou l\'avocat du propriétaire avant publication.]'
                : '[DRAFT — To be verified by a legal professional. The 14-day right of withdrawal generally does not apply to perishable food items (Article L221-28 of the French Consumer Code). This statement must be confirmed by the owner\'s accountant or lawyer before publication.]'}
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '6. Données personnelles' : '6. Personal Data'}
            </h2>
            <p>
              {locale === 'fr' ?'Le traitement de vos données personnelles est décrit dans notre ' :'The processing of your personal data is described in our '}
              <Link href="/confidentialite" style={{ color: 'var(--primary)' }}>
                {locale === 'fr' ? 'politique de confidentialité' : 'privacy policy'}
              </Link>.
            </p>

            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
              {locale === 'fr' ? '7. Droit applicable' : '7. Applicable Law'}
            </h2>
            <p>
              {locale === 'fr' ?'Les présentes CGV sont soumises au droit français. [DRAFT — à vérifier]' :'These terms are governed by French law. [DRAFT — to be verified]'}
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
