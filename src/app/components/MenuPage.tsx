'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

import { getMenuByHouse, formatPrice, MENU_CATEGORIES, type Dish, ALLERGEN_LABELS } from '@/data/menu';
import Navbar from '@/app/components/Navbar';
import Footer from '@/components/Footer';

type HouseId = 'montmartre' | 'poissonniere';

const SPICE_LABELS = ['', '🌶', '🌶🌶', '🌶🌶🌶'];
const SPICE_TEXT = ['', 'Mild', 'Medium', 'Hot'];

function SpiceMarks({ level }: { level: 0 | 1 | 2 | 3 }) {
  if (level === 0) return null;
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`Spice level: ${SPICE_TEXT[level]}`}
      title={SPICE_TEXT[level]}
    >
      {Array.from({ length: level }).map((_, i) => (
        <span
          key={i}
          style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'inline-block', opacity: 0.7 + i * 0.1 }}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">{SPICE_TEXT[level]}</span>
    </span>
  );
}

function DietBadge({ diet }: { diet: ('vegetarian' | 'vegan')[] }) {
  if (diet.includes('vegan')) {
    return (
      <span
        className="text-annotation"
        style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: '#1F7F79', border: '1px solid #1F7F79', padding: '1px 5px' }}
        aria-label="Vegan"
      >
        VG
      </span>
    );
  }
  if (diet.includes('vegetarian')) {
    return (
      <span
        className="text-annotation"
        style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: '#1F7F79', border: '1px solid #1F7F79', padding: '1px 5px' }}
        aria-label="Vegetarian"
      >
        V
      </span>
    );
  }
  return null;
}

interface DishRowProps {
  dish: Dish;
  locale: 'fr' | 'en';
  onAdd: (dish: Dish, variantId?: string) => void;
  onOpen: (dish: Dish) => void;
}

function DishRow({ dish, locale, onAdd, onOpen }: DishRowProps) {
  const [selectedVariant, setSelectedVariant] = useState(dish.variants?.[0]?.id ?? '');
  const priceToShow = dish.variants
    ? dish.price + (dish.variants.find(v => v.id === selectedVariant)?.priceDelta ?? 0)
    : dish.price;

  return (
    <li
      className="group"
      style={{
        borderBottom: '1px solid var(--border)',
        opacity: dish.available ? 1 : 0.5,
      }}
    >
      <div className="flex items-start gap-4 py-5 px-0">
        {/* Main info — clickable to open detail */}
        <button
          className="flex-1 text-left"
          onClick={() => onOpen(dish)}
          aria-label={`View details for ${dish.name[locale]}`}
        >
          <div className="flex items-start gap-2 mb-1">
            <span
              className="font-display"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: 'var(--foreground)', letterSpacing: '-0.01em' }}
            >
              {dish.name[locale]}
            </span>
            {dish.signature && (
              <span
                className="text-annotation"
                style={{ fontSize: '0.45rem', letterSpacing: '0.2em', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '1px 4px', marginTop: 2, flexShrink: 0 }}
              >
                SIGNATURE
              </span>
            )}
            {dish.sampleOnly && (
              <span
                className="text-annotation"
                style={{ fontSize: '0.45rem', letterSpacing: '0.15em', color: 'var(--muted-foreground)', border: '1px solid var(--border)', padding: '1px 4px', marginTop: 2, flexShrink: 0 }}
              >
                SAMPLE
              </span>
            )}
          </div>
          {dish.nameNe && (
            <div
              lang="ne"
              style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', lineHeight: 1.5, marginBottom: 4 }}
            >
              {dish.nameNe.text}
              {!dish.nameNe.verified && (
                <span className="text-annotation" style={{ fontSize: '0.45rem', color: 'var(--muted-foreground)', marginLeft: 4 }}>
                  [unverified]
                </span>
              )}
            </div>
          )}
          <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', lineHeight: 1.5, marginBottom: 6 }}>
            {dish.description[locale]}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <SpiceMarks level={dish.spice} />
            <DietBadge diet={dish.diet} />
            {dish.allergens.length > 0 && (
              <span style={{ fontSize: '0.55rem', color: 'var(--muted-foreground)', letterSpacing: '0.08em' }}>
                {dish.allergens.map(a => ALLERGEN_LABELS[a].abbr).join(' · ')}
              </span>
            )}
          </div>
        </button>

        {/* Variant selector + price + add */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0" style={{ minWidth: 80 }}>
          {dish.variants && dish.variants.length > 1 && (
            <div className="flex flex-wrap gap-1 justify-end">
              {dish.variants.map(v => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className="text-annotation"
                  style={{
                    fontSize: '0.5rem',
                    letterSpacing: '0.12em',
                    padding: '2px 6px',
                    border: `1px solid ${selectedVariant === v.id ? 'var(--primary)' : 'var(--border)'}`,
                    backgroundColor: selectedVariant === v.id ? 'var(--primary)' : 'transparent',
                    color: selectedVariant === v.id ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                    cursor: 'pointer',
                  }}
                  aria-pressed={selectedVariant === v.id}
                >
                  {v.label[locale]}
                </button>
              ))}
            </div>
          )}
          <span
            className="font-display"
            style={{ fontSize: '1rem', color: 'var(--foreground)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}
          >
            {formatPrice(priceToShow, locale)}
          </span>
          {dish.available && dish.orderable ? (
            <button
              onClick={() => onAdd(dish, selectedVariant || undefined)}
              className="text-annotation"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                padding: '5px 10px',
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                border: 'none',
                cursor: 'pointer',
                minHeight: 32,
                minWidth: 44,
              }}
              aria-label={`Add ${dish.name[locale]} to order`}
            >
              {locale === 'fr' ? 'AJOUTER' : 'ADD'}
            </button>
          ) : !dish.available ? (
            <span
              className="text-annotation"
              style={{ fontSize: '0.5rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)', padding: '5px 0' }}
            >
              {locale === 'fr' ? 'ÉPUISÉ' : 'SOLD OUT'}
            </span>
          ) : (
            <span
              className="text-annotation"
              style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'var(--muted-foreground)', padding: '5px 0', textAlign: 'right', maxWidth: 80 }}
            >
              {locale === 'fr' ? 'Sur place uniquement' : 'In restaurant only'}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

interface DishSheetProps {
  dish: Dish | null;
  locale: 'fr' | 'en';
  onClose: () => void;
  onAdd: (dish: Dish, variantId?: string) => void;
}

function DishSheet({ dish, locale, onClose, onAdd }: DishSheetProps) {
  const [selectedVariant, setSelectedVariant] = useState('');
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (dish) {
      setSelectedVariant(dish.variants?.[0]?.id ?? '');
      closeRef.current?.focus();
    }
  }, [dish]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!dish) return null;

  const priceToShow = dish.variants
    ? dish.price + (dish.variants.find(v => v.id === selectedVariant)?.priceDelta ?? 0)
    : dish.price;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dish.name[locale]}
      className="fixed inset-0 z-[600] flex items-end md:items-center justify-center"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(28,28,26,0.6)' }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full md:max-w-lg mx-auto"
        style={{
          backgroundColor: 'var(--background)',
          borderTop: '1px solid var(--border)',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '2rem 1.5rem',
        }}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-4 right-4 text-annotation"
          style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--muted-foreground)' }}
          aria-label="Close"
        >
          ✕ {locale === 'fr' ? 'FERMER' : 'CLOSE'}
        </button>

        <div className="mb-1">
          {dish.sampleOnly && (
            <p
              className="text-annotation"
              style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: 'var(--muted-foreground)', marginBottom: 8 }}
            >
              ⚠ {locale === 'fr' ? 'CONTENU EXEMPLE — prix à confirmer' : 'SAMPLE CONTENT — price to be confirmed'}
            </p>
          )}
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: 'var(--foreground)', letterSpacing: '-0.02em', marginBottom: 4 }}
          >
            {dish.name[locale]}
          </h2>
          {dish.nameNe && (
            <p lang="ne" style={{ fontSize: '1.1rem', color: 'var(--muted-foreground)', lineHeight: 1.5, marginBottom: 8 }}>
              {dish.nameNe.text}
              {!dish.nameNe.verified && (
                <span className="text-annotation" style={{ fontSize: '0.45rem', color: 'var(--muted-foreground)', marginLeft: 6 }}>
                  [{locale === 'fr' ? 'non vérifié' : 'unverified'}]
                </span>
              )}
            </p>
          )}
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', lineHeight: 1.6, marginBottom: 16 }}>
          {dish.description[locale]}
        </p>

        {/* Allergens — full names */}
        {dish.allergens.length > 0 && (
          <div style={{ marginBottom: 16, padding: '10px 12px', border: '1px solid var(--border)', backgroundColor: 'var(--secondary)' }}>
            <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--muted-foreground)', marginBottom: 4 }}>
              {locale === 'fr' ? 'ALLERGÈNES' : 'ALLERGENS'}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--foreground)' }}>
              {dish.allergens.map(a => ALLERGEN_LABELS[a][locale]).join(', ')}
            </p>
          </div>
        )}

        {/* Variants */}
        {dish.variants && dish.variants.length > 1 && (
          <div style={{ marginBottom: 16 }}>
            <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
              {locale === 'fr' ? 'STYLE' : 'STYLE'}
            </p>
            <div className="flex flex-wrap gap-2">
              {dish.variants.map(v => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className="text-annotation"
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    padding: '6px 12px',
                    border: `1px solid ${selectedVariant === v.id ? 'var(--primary)' : 'var(--border)'}`,
                    backgroundColor: selectedVariant === v.id ? 'var(--primary)' : 'transparent',
                    color: selectedVariant === v.id ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                    cursor: 'pointer',
                    minHeight: 44,
                  }}
                  aria-pressed={selectedVariant === v.id}
                >
                  {v.label[locale]}
                  {v.priceDelta > 0 && ` +${formatPrice(v.priceDelta, locale)}`}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <span
            className="font-display"
            style={{ fontSize: '1.5rem', color: 'var(--foreground)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}
          >
            {formatPrice(priceToShow, locale)}
          </span>
          {dish.available && dish.orderable && (
            <button
              onClick={() => { onAdd(dish, selectedVariant || undefined); onClose(); }}
              className="text-annotation"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                padding: '12px 24px',
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                border: 'none',
                cursor: 'pointer',
                minHeight: 44,
              }}
            >
              {locale === 'fr' ? 'AJOUTER À LA COMMANDE' : 'ADD TO ORDER'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface MenuPageProps {
  houseId: HouseId;
}

export default function MenuPage({ houseId }: MenuPageProps) {
  const { language } = useLanguage();
  const locale = language as 'fr' | 'en';
  const dishes = getMenuByHouse(houseId);
  const [activeCategory, setActiveCategory] = useState('momos');
  const [filters, setFilters] = useState<{ vegetarian: boolean; vegan: boolean; spicy: boolean }>({
    vegetarian: false,
    vegan: false,
    spicy: false,
  });
  const [openDish, setOpenDish] = useState<Dish | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [liveMsg, setLiveMsg] = useState('');
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  const houseName = houseId === 'montmartre' ? 'Montmartre' : 'Poissonnière';
  const sisterHouseId = houseId === 'montmartre' ? 'poissonniere' : 'montmartre';
  const sisterHouseName = houseId === 'montmartre' ? 'Poissonnière' : 'Montmartre';

  const categories = [...new Set(dishes.map(d => d.category))];

  const filteredDishes = (cat: string) =>
    dishes.filter(d => {
      if (d.category !== cat) return false;
      if (filters.vegetarian && !d.diet.includes('vegetarian')) return false;
      if (filters.vegan && !d.diet.includes('vegan')) return false;
      if (filters.spicy && d.spice === 0) return false;
      return true;
    });

  const handleAdd = (dish: Dish, _variantId?: string) => {
    setCartCount(c => c + 1);
    const msg = locale === 'fr'
      ? `${dish.name.fr} ajouté à la commande`
      : `${dish.name.en} added to order`;
    setLiveMsg(msg);
    setTimeout(() => setLiveMsg(''), 3000);
  };

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat);
    const el = categoryRefs.current[cat];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Navbar />
      <div aria-live="polite" aria-atomic="true" className="sr-only">{liveMsg}</div>

      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '5rem' }}>
        {/* Page header */}
        <header style={{ borderBottom: '1px solid var(--border)', padding: '2rem 1.5rem 1.5rem' }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Link
                href={`/${houseId}`}
                className="text-annotation underline-expand"
                style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)' }}
              >
                ← {houseName.toUpperCase()}
              </Link>
              <span style={{ color: 'var(--border)', fontSize: '0.6rem' }}>·</span>
              <span className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--primary)' }}>
                {locale === 'fr' ? 'CARTE' : 'MENU'}
              </span>
            </div>
            <h1
              className="font-display"
              style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', color: 'var(--foreground)', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: 8 }}
            >
              {locale === 'fr' ? 'La Carte' : 'The Menu'}
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', letterSpacing: '0.05em' }}>
              {/* TODO: Verify this claim with owner before publishing */}
              {locale === 'fr' ?'Momo House '+ houseName + ' — Contenu exemple, prix à confirmer' :'Momo House ' + houseName + ' — Sample content, prices to be confirmed'}
            </p>
          </div>
        </header>

        {/* Sticky category bar */}
        <div
          className="sticky top-16 md:top-20 z-40"
          style={{ backgroundColor: 'var(--background)', borderBottom: '1px solid var(--border)' }}
        >
          <div className="max-w-4xl mx-auto">
            <div
              className="flex gap-0 overflow-x-auto"
              role="tablist"
              aria-label={locale === 'fr' ? 'Catégories' : 'Categories'}
              style={{ scrollbarWidth: 'none' }}
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => scrollToCategory(cat)}
                  className="text-annotation flex-shrink-0"
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    padding: '14px 20px',
                    borderBottom: `2px solid ${activeCategory === cat ? 'var(--primary)' : 'transparent'}`,
                    color: activeCategory === cat ? 'var(--primary)' : 'var(--muted-foreground)',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {MENU_CATEGORIES[cat]?.[locale] ?? cat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 px-0 py-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {[
                { key: 'vegetarian', labelFr: 'Végétarien', labelEn: 'Vegetarian' },
                { key: 'vegan', labelFr: 'Vegan', labelEn: 'Vegan' },
                { key: 'spicy', labelFr: 'Épicé', labelEn: 'Spicy' },
              ].map(f => {
                const active = filters[f.key as keyof typeof filters];
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilters(prev => ({ ...prev, [f.key]: !prev[f.key as keyof typeof filters] }))}
                    className="text-annotation flex-shrink-0"
                    style={{
                      fontSize: '0.55rem',
                      letterSpacing: '0.12em',
                      padding: '4px 10px',
                      border: `1px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                      backgroundColor: active ? 'var(--primary)' : 'transparent',
                      color: active ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                      cursor: 'pointer',
                      minHeight: 28,
                    }}
                    aria-pressed={active}
                  >
                    {locale === 'fr' ? f.labelFr : f.labelEn}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sample content notice */}
        <div className="max-w-4xl mx-auto px-4 pt-4">
          <div
            style={{
              padding: '10px 14px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--secondary)',
              marginBottom: 8,
            }}
          >
            <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)' }}>
              ⚠ {locale === 'fr' ?'CONTENU EXEMPLE — La carte réelle sera fournie par le propriétaire. Les prix sont à confirmer.' :'SAMPLE CONTENT — Real menu to be provided by owner. Prices to be confirmed.'}
            </p>
          </div>
        </div>

        {/* Allergen notice */}
        <div className="max-w-4xl mx-auto px-4 pb-2">
          <div
            style={{
              padding: '10px 14px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--secondary)',
            }}
          >
            <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
              {locale === 'fr' ?'Notre cuisine manipule les 14 allergènes majeurs. En cas d\'allergie, appelez-nous avant de commander.' :'Our kitchen handles all 14 major allergens. Tell us about any allergy by phone before ordering.'}
            </p>
          </div>
        </div>

        {/* Dish lists by category */}
        <div className="max-w-4xl mx-auto px-4 pb-24">
          {categories.map(cat => {
            const catDishes = filteredDishes(cat);
            return (
              <section
                key={cat}
                ref={el => { categoryRefs.current[cat] = el; }}
                aria-labelledby={`cat-${cat}`}
                style={{ paddingTop: '2rem' }}
              >
                <h2
                  id={`cat-${cat}`}
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                    color: 'var(--foreground)',
                    letterSpacing: '-0.02em',
                    marginBottom: 4,
                    paddingBottom: 12,
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {MENU_CATEGORIES[cat]?.[locale] ?? cat}
                </h2>
                {catDishes.length === 0 ? (
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', padding: '20px 0' }}>
                    {locale === 'fr' ? 'Aucun plat ne correspond aux filtres.' : 'No dishes match the current filters.'}
                  </p>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {catDishes.map(dish => (
                      <DishRow
                        key={dish.id}
                        dish={dish}
                        locale={locale}
                        onAdd={handleAdd}
                        onOpen={setOpenDish}
                      />
                    ))}
                  </ul>
                )}
              </section>
            );
          })}

          {/* Sister house link */}
          <div
            style={{
              marginTop: '3rem',
              padding: '1.5rem',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--secondary)',
            }}
          >
            <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
              {locale === 'fr' ? 'NOTRE MAISON SŒUR' : 'OUR SISTER HOUSE'}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--foreground)', marginBottom: 12 }}>
              {locale === 'fr'
                ? `Complet ici ? Momo House ${sisterHouseName} est à quelques minutes. [VERIFY distance]`
                : `Full here? Momo House ${sisterHouseName} is a few minutes away. [VERIFY distance]`}
            </p>
            <Link
              href={`/${sisterHouseId}/carte`}
              className="text-annotation underline-expand"
              style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--primary)' }}
            >
              {locale === 'fr' ? `VOIR LA CARTE ${sisterHouseName.toUpperCase()}` : `VIEW ${sisterHouseName.toUpperCase()} MENU`} →
            </Link>
          </div>
        </div>
      </main>

      {/* Cart bar */}
      {cartCount > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          style={{ backgroundColor: 'var(--charcoal)', borderTop: '1px solid rgba(245,240,232,0.1)', padding: '12px 20px' }}
        >
          <Link
            href={`/${houseId}/panier`}
            className="flex items-center justify-between w-full"
            style={{ color: 'var(--primary-foreground)', textDecoration: 'none' }}
          >
            <span className="text-annotation" style={{ fontSize: '0.6rem', letterSpacing: '0.15em' }}>
              {cartCount} {locale === 'fr' ? 'article(s)' : 'item(s)'}
            </span>
            <span className="text-annotation" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--primary)' }}>
              {locale === 'fr' ? 'VOIR LA COMMANDE →' : 'VIEW ORDER →'}
            </span>
          </Link>
        </div>
      )}

      <DishSheet dish={openDish} locale={locale} onClose={() => setOpenDish(null)} onAdd={handleAdd} />
      <Footer />
    </>
  );
}
