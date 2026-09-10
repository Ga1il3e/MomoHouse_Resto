'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/components/Footer';
import { locations } from '@/data/locations';
import { formatPrice } from '@/data/menu';

type HouseId = 'montmartre' | 'poissonniere';

interface CartItem {
  id: string;
  name: { fr: string; en: string };
  variant?: string;
  quantity: number;
  unitPrice: number; // cents
}

// Sample cart items for Phase 1 UI demonstration
const SAMPLE_ITEMS: CartItem[] = [
  { id: 'buff-momo', name: { fr: 'Momo Buffle', en: 'Buff Momo' }, variant: 'Steamed', quantity: 2, unitPrice: 0 },
  { id: 'thukpa', name: { fr: 'Thukpa', en: 'Thukpa' }, quantity: 1, unitPrice: 0 },
];

interface CartPageProps {
  houseId: HouseId;
}

export default function CartPage({ houseId }: CartPageProps) {
  const { language } = useLanguage();
  const locale = language as 'fr' | 'en';
  const location = locations.find(l => l.id === houseId)!;
  const houseName = houseId === 'montmartre' ? 'Montmartre' : 'Poissonnière';

  const [items, setItems] = useState<CartItem[]>(SAMPLE_ITEMS);
  const [note, setNote] = useState('');
  const [pickupSlot, setPickupSlot] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [allergenAck, setAllergenAck] = useState(false);
  const [liveMsg, setLiveMsg] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const updateQty = (id: string, delta: number) => {
    setItems(prev =>
      prev
        .map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item)
        .filter(item => item.quantity > 0)
    );
    const msg = delta > 0
      ? (locale === 'fr' ? 'Quantité augmentée' : 'Quantity increased')
      : (locale === 'fr' ? 'Quantité diminuée' : 'Quantity decreased');
    setLiveMsg(msg);
    setTimeout(() => setLiveMsg(''), 2000);
  };

  const removeItem = (id: string) => {
    const item = items.find(i => i.id === id);
    setItems(prev => prev.filter(i => i.id !== id));
    const msg = locale === 'fr'
      ? `${item?.name.fr} retiré`
      : `${item?.name.en} removed`;
    setLiveMsg(msg);
    setTimeout(() => setLiveMsg(''), 2000);
  };

  const isFormValid = firstName.trim() && phone.trim() && email.trim() && pickupSlot && allergenAck && items.length > 0;

  return (
    <>
      <Navbar variant="house" houseId={houseId} />
      <div aria-live="polite" aria-atomic="true" className="sr-only">{liveMsg}</div>

      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '5rem' }}>
        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid var(--border)', padding: '1rem 1.5rem' }}>
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Link
              href={`/${houseId}/carte`}
              className="text-annotation underline-expand"
              style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)' }}
            >
              ← {locale === 'fr' ? 'CARTE' : 'MENU'}
            </Link>
            <span style={{ color: 'var(--border)', fontSize: '0.6rem' }}>·</span>
            <span className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--primary)' }}>
              {locale === 'fr' ? 'PANIER' : 'CART'}
            </span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1
            className="font-display"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: 'var(--foreground)', letterSpacing: '-0.03em', marginBottom: 8 }}
          >
            {locale === 'fr' ? 'Votre Commande' : 'Your Order'}
          </h1>
          <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--muted-foreground)', marginBottom: 24 }}>
            MOMO HOUSE {houseName.toUpperCase()} — {locale === 'fr' ? 'CLICK & COLLECT' : 'CLICK & COLLECT'}
          </p>

          {/* Phase 1 notice */}
          <div
            style={{
              padding: '10px 14px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--secondary)',
              marginBottom: 24,
            }}
          >
            <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)' }}>
              ⚠ {locale === 'fr' ?'PHASE 1 — Interface de démonstration. Le paiement en ligne sera activé après validation du modèle de commande avec le propriétaire.' :'PHASE 1 — Demo interface. Online payment will be enabled after ordering model is confirmed with owner.'}
            </p>
          </div>

          {items.length === 0 ? (
            <div style={{ padding: '3rem 0', textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', marginBottom: 16 }}>
                {locale === 'fr' ? 'Votre panier est vide.' : 'Your steamer is empty.'}
              </p>
              <Link
                href={`/${houseId}/carte`}
                className="text-annotation"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  padding: '10px 20px',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  textDecoration: 'none',
                }}
              >
                {locale === 'fr' ? 'VOIR LA CARTE →' : 'VIEW MENU →'}
              </Link>
            </div>
          ) : (
            <>
              {/* Line items */}
              <section aria-label={locale === 'fr' ? 'Articles' : 'Items'} style={{ marginBottom: 24 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, border: '1px solid var(--border)' }}>
                  {items.map((item, i) => (
                    <li
                      key={item.id}
                      style={{
                        padding: '14px 16px',
                        borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <div className="flex-1">
                        <p style={{ fontSize: '0.85rem', color: 'var(--foreground)', marginBottom: 2 }}>
                          {item.name[locale]}
                        </p>
                        {item.variant && (
                          <p className="text-annotation" style={{ fontSize: '0.5rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)' }}>
                            {item.variant}
                          </p>
                        )}
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-0" style={{ border: '1px solid var(--border)' }}>
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          style={{ width: 44, height: 44, fontSize: '1rem', color: 'var(--foreground)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                          aria-label={`Decrease quantity of ${item.name[locale]}`}
                        >
                          −
                        </button>
                        <span
                          style={{ width: 32, textAlign: 'center', fontSize: '0.85rem', fontVariantNumeric: 'tabular-nums' }}
                          aria-label={`Quantity: ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          style={{ width: 44, height: 44, fontSize: '1rem', color: 'var(--foreground)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                          aria-label={`Increase quantity of ${item.name[locale]}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Line price */}
                      <span
                        style={{ fontSize: '0.9rem', color: 'var(--foreground)', fontVariantNumeric: 'tabular-nums', minWidth: 48, textAlign: 'right' }}
                      >
                        {formatPrice(item.unitPrice * item.quantity, locale)}
                      </span>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 8px', minHeight: 44 }}
                        aria-label={`Remove ${item.name[locale]}`}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Note field */}
              <div style={{ marginBottom: 24 }}>
                <label
                  htmlFor="order-note"
                  className="text-annotation"
                  style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', display: 'block', marginBottom: 8 }}
                >
                  {locale === 'fr' ? 'NOTE (optionnel)' : 'NOTE (optional)'}
                </label>
                <textarea
                  id="order-note"
                  value={note}
                  onChange={e => setNote(e.target.value.slice(0, 140))}
                  maxLength={140}
                  rows={2}
                  placeholder={locale === 'fr' ? 'Ex : extra achar, sans piment...' : 'E.g. extra achar, no chilli...'}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    fontSize: '0.8rem',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
                <p style={{ fontSize: '0.6rem', color: 'var(--muted-foreground)', marginTop: 4 }}>
                  {note.length}/140 — {locale === 'fr' ?'Cette note ne garantit pas la sécurité allergénique.' :'This note does not guarantee allergen safety.'}
                </p>
              </div>

              {/* Pickup time */}
              <div style={{ marginBottom: 24 }}>
                <label
                  htmlFor="pickup-slot"
                  className="text-annotation"
                  style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', display: 'block', marginBottom: 8 }}
                >
                  {locale === 'fr' ? 'HEURE DE RETRAIT' : 'PICKUP TIME'}
                </label>
                {/* TODO: Replace with dynamic slot picker from getStatus() once hours are confirmed */}
                <div
                  style={{
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--secondary)',
                    marginBottom: 8,
                  }}
                >
                  <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)' }}>
                    ⚠ {locale === 'fr' ?'Créneaux dynamiques à activer une fois les horaires confirmés [VERIFY]' :'Dynamic slots to be enabled once hours are confirmed [VERIFY]'}
                  </p>
                </div>
                <select
                  id="pickup-slot"
                  value={pickupSlot}
                  onChange={e => setPickupSlot(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    fontSize: '0.8rem',
                    fontFamily: 'inherit',
                    minHeight: 44,
                  }}
                  aria-required="true"
                >
                  <option value="">{locale === 'fr' ? 'Choisir un créneau...' : 'Choose a slot...'}</option>
                  <option value="asap">{locale === 'fr' ? 'Dès que possible (~20 min) [VERIFY]' : 'As soon as possible (~20 min) [VERIFY]'}</option>
                  <option value="later">{locale === 'fr' ? 'Plus tard aujourd\'hui [VERIFY]' : 'Later today [VERIFY]'}</option>
                </select>
              </div>

              {/* Customer details */}
              <section aria-label={locale === 'fr' ? 'Vos coordonnées' : 'Your details'} style={{ marginBottom: 24 }}>
                <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', marginBottom: 12 }}>
                  {locale === 'fr' ? 'VOS COORDONNÉES' : 'YOUR DETAILS'}
                </p>
                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      style={{ fontSize: '0.7rem', color: 'var(--foreground)', display: 'block', marginBottom: 4 }}
                    >
                      {locale === 'fr' ? 'Prénom' : 'First name'} *
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit',
                        minHeight: 44,
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      style={{ fontSize: '0.7rem', color: 'var(--foreground)', display: 'block', marginBottom: 4 }}
                    >
                      {locale === 'fr' ? 'Téléphone' : 'Phone'} *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit',
                        minHeight: 44,
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      style={{ fontSize: '0.7rem', color: 'var(--foreground)', display: 'block', marginBottom: 4 }}
                    >
                      {locale === 'fr' ? 'Email' : 'Email'} *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      autoComplete="email"
                      inputMode="email"
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit',
                        minHeight: 44,
                      }}
                    />
                  </div>
                </div>
              </section>

              {/* Totals */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginBottom: 24 }}>
                <div className="flex justify-between" style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                    {locale === 'fr' ? 'Sous-total' : 'Subtotal'}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontVariantNumeric: 'tabular-nums' }}>
                    {formatPrice(subtotal, locale)}
                  </span>
                </div>
                <div className="flex justify-between" style={{ borderTop: '1px solid var(--border)', paddingTop: 8 }}>
                  <span className="font-display" style={{ fontSize: '1rem', color: 'var(--foreground)', letterSpacing: '-0.01em' }}>
                    {locale === 'fr' ? 'Total TTC' : 'Total incl. tax'}
                  </span>
                  <span className="font-display" style={{ fontSize: '1rem', color: 'var(--foreground)', letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>
                    {formatPrice(subtotal, locale)}
                  </span>
                </div>
              </div>

              {/* Allergen notice */}
              <div
                style={{
                  padding: '12px 14px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--secondary)',
                  marginBottom: 16,
                }}
              >
                <p style={{ fontSize: '0.75rem', color: 'var(--foreground)', lineHeight: 1.6 }}>
                  {locale === 'fr' ?'Notre cuisine manipule les 14 allergènes majeurs. En cas d\'allergie, appelez-nous avant de commander.' :'Our kitchen handles all 14 major allergens. Tell us about any allergy by phone before ordering.'}
                </p>
              </div>

              {/* Allergen acknowledgement */}
              <div style={{ marginBottom: 24 }}>
                <label
                  className="flex items-start gap-3"
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="checkbox"
                    checked={allergenAck}
                    onChange={e => setAllergenAck(e.target.checked)}
                    style={{ marginTop: 2, width: 18, height: 18, flexShrink: 0 }}
                    aria-required="true"
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--foreground)', lineHeight: 1.5 }}>
                    {locale === 'fr' ?'J\'ai lu l\'avis sur les allergènes et je comprends que la cuisine manipule les 14 allergènes majeurs.' :'I have read the allergen notice and understand the kitchen handles all 14 major allergens.'}
                  </span>
                </label>
              </div>

              {/* CGV link */}
              <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', marginBottom: 16 }}>
                {locale === 'fr' ? 'En passant commande, vous acceptez nos ' : 'By placing an order, you accept our '}
                <Link
                  href="/cgv"
                  style={{ color: 'var(--primary)', textDecoration: 'underline' }}
                >
                  {locale === 'fr' ? 'conditions générales de vente' : 'terms of sale'}
                </Link>.
              </p>

              {/* Place order button */}
              <button
                disabled={!isFormValid}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  backgroundColor: isFormValid ? 'var(--primary)' : 'var(--border)',
                  color: isFormValid ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                  border: 'none',
                  cursor: isFormValid ? 'pointer' : 'not-allowed',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  minHeight: 52,
                  transition: 'background-color 0.2s ease',
                }}
                aria-disabled={!isFormValid}
              >
                {locale === 'fr' ? 'PASSER LA COMMANDE' : 'PLACE ORDER'}
              </button>
              <p style={{ fontSize: '0.6rem', color: 'var(--muted-foreground)', marginTop: 8, textAlign: 'center' }}>
                {locale === 'fr' ?'Paiement en ligne activé en Phase 3 — modèle à confirmer avec le propriétaire' :'Online payment enabled in Phase 3 — model to be confirmed with owner'}
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
