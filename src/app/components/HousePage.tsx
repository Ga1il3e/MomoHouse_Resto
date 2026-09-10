'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations, SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { locations } from '@/data/locations';

// External link SVG icon
const ExternalLinkIcon = ({ size = 12 }: {size?: number;}) =>
<svg
  width={size}
  height={size}
  viewBox="0 0 12 12"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  style={{ flexShrink: 0 }}>
    <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;


const BookingReadinessBadge = ({ label, sub }: {label: string;sub: string;}) =>
<div
  className="inline-flex items-center gap-2 px-3 py-1.5"
  style={{
    border: '1px solid rgba(196,113,74,0.3)',
    backgroundColor: 'rgba(196,113,74,0.06)'
  }}
  title={sub}>
    <span
    className="inline-block rounded-full"
    style={{ width: 6, height: 6, backgroundColor: 'var(--primary)', opacity: 0.7, flexShrink: 0 }}
    aria-hidden="true" />
    <span
    className="text-annotation"
    style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: 'var(--primary)', opacity: 0.8 }}>
      {label}
    </span>
  </div>;


function isValidUrl(url: string | undefined | null): boolean {
  if (!url || url.trim() === '') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

interface ReservationCTAProps {
  url: string;
  label: string;
  fallbackLabel: string;
  fallbackSub: string;
  externalLabel: string;
  comingSoon: string;
  comingSoonSub: string;
  phone: string;
  locationName: string;
  size?: 'sm' | 'lg';
  variant?: 'primary' | 'ghost';
}

const ReservationCTA = ({
  url,
  label,
  fallbackLabel,
  fallbackSub,
  externalLabel,
  comingSoon,
  comingSoonSub,
  phone,
  locationName,
  size = 'lg',
  variant = 'primary'
}: ReservationCTAProps) => {
  const valid = isValidUrl(url);
  const px = size === 'sm' ? 'px-6 py-3' : 'px-8 py-4';

  if (!valid) {
    return (
      <div className="flex flex-col gap-3">
        <div
          className={`inline-flex items-center gap-3 ${px} text-annotation cursor-not-allowed`}
          style={{
            backgroundColor: variant === 'primary' ? 'rgba(196,113,74,0.25)' : 'transparent',
            border: variant === 'ghost' ? '1px solid rgba(245,240,232,0.15)' : 'none',
            color: 'rgba(245,240,232,0.35)',
            letterSpacing: '0.12em'
          }}
          role="status"
          aria-label={`${fallbackLabel} — ${fallbackSub}`}>
          {fallbackLabel}
          <span style={{ opacity: 0.4 }} aria-hidden="true">—</span>
        </div>
        <span className="text-annotation" style={{ fontSize: '0.6rem', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.1em' }}>
          {fallbackSub}: {phone}
        </span>
      </div>);

  }

  return (
    <div className="flex flex-col gap-3">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-3 ${px} text-annotation group`}
        style={{
          backgroundColor: variant === 'primary' ? 'var(--primary)' : 'transparent',
          border: variant === 'ghost' ? '1px solid rgba(245,240,232,0.2)' : 'none',
          color: variant === 'primary' ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
          textDecoration: 'none',
          letterSpacing: '0.12em'
        }}
        aria-label={`${label} at Momo House ${locationName} — ${externalLabel}`}>
        {label}
        <span
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex items-center"
          aria-hidden="true">
          <ExternalLinkIcon size={11} />
        </span>
      </a>
      <BookingReadinessBadge label={comingSoon} sub={comingSoonSub} />
    </div>);

};

const MomoSVG = ({ size = 80, opacity = 1 }: {size?: number;opacity?: number;}) =>
<svg width={size} height={Math.round(size * 0.65)} viewBox="0 0 120 78" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ opacity }}>
    <ellipse cx="60" cy="54" rx="54" ry="22" fill="var(--primary)" opacity="0.12" />
    <ellipse cx="60" cy="46" rx="50" ry="20" fill="var(--primary-foreground)" />
    <ellipse cx="60" cy="46" rx="50" ry="20" fill="var(--primary)" opacity="0.06" />
    <path d="M28 38 Q36 28 44 38" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M44 35 Q52 25 60 35" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M60 35 Q68 25 76 35" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M76 38 Q84 28 92 38" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M16 42 Q60 24 104 42" stroke="var(--border)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
  </svg>;


// Pleat rule divider
const PleatRule = () =>
<div className="flex items-center gap-0 w-full overflow-hidden" aria-hidden="true" style={{ height: 16, margin: '0 0 0 0' }}>
    {Array.from({ length: 40 }).map((_, i) =>
  <div
    key={i}
    style={{
      flex: 1,
      height: i % 3 === 0 ? 14 : i % 3 === 1 ? 10 : 7,
      borderLeft: '1px solid var(--border)',
      borderTop: '1px solid var(--border)',
      transform: `skewX(${i % 2 === 0 ? -12 : 12}deg)`,
      opacity: 0.5 + i % 5 * 0.1
    }} />

  )}
  </div>;


const menuItems = [
{
  category: { en: 'STEAMED', fr: 'VAPEUR' },
  items: [
  { name: 'Buff Momo', desc: { en: 'Water buffalo, ginger, coriander', fr: 'Buffle d\'eau, gingembre, coriandre' }, price: '9€' },
  { name: 'Chicken Momo', desc: { en: 'Free-range chicken, garlic, spring onion', fr: 'Poulet fermier, ail, ciboulette' }, price: '9€' },
  { name: 'Veg Momo', desc: { en: 'Seasonal vegetables, tofu, herbs', fr: 'Légumes de saison, tofu, herbes' }, price: '8€' }]

},
{
  category: { en: 'FRIED', fr: 'FRIT' },
  items: [
  { name: 'Kothey Momo', desc: { en: 'Pan-fried, crispy base, juicy inside', fr: 'Poêlé, base croustillante, juteux à l\'intérieur' }, price: '10€' },
  { name: 'Jhol Momo', desc: { en: 'Fried, served in spiced tomato broth', fr: 'Frit, servi dans un bouillon de tomate épicé' }, price: '11€' }]

},
{
  category: { en: 'SOUP', fr: 'BOUILLON' },
  items: [
  { name: 'Thukpa', desc: { en: 'Tibetan noodle soup, vegetables, broth', fr: 'Soupe de nouilles tibétaine, légumes, bouillon' }, price: '12€' },
  { name: 'Thenthuk', desc: { en: 'Hand-pulled noodles, hearty mountain broth', fr: 'Nouilles tirées à la main, bouillon de montagne' }, price: '13€' }]

}];


// Signature dishes per house with real food images
const montmartreSignature = [
{
  name: { en: 'Steamed Buff Momo', fr: 'Momo Buffle Vapeur' },
  nameNe: 'भैंसी मम:',
  desc: { en: 'Water buffalo · ginger · coriander · hand-pleated · achar sésame-tomate', fr: 'Buffle d\'eau · gingembre · coriandre · plié main · achar sésame-tomate' },
  price: '9€',
  image: '/assets/images/momo_hero_steamed.png',
  imageAlt: 'Freshly steamed buff momos in a bamboo basket, delicate pleated folds glistening with steam',
  tag: { en: 'THE CLASSIC', fr: 'LE CLASSIQUE' }
},
{
  name: { en: 'Jhol Momo', fr: 'Jhol Momo' },
  nameNe: 'झोल मम:',
  desc: { en: 'Fried · spiced tomato broth · timur · sesame · fresh herbs', fr: 'Frit · bouillon tomate épicé · timur · sésame · herbes fraîches' },
  price: '11€',
  image: '/assets/images/momo_section_assorted.png',
  imageAlt: 'Jhol momos served in a deep bowl of rich spiced tomato broth with fresh herbs and sesame',
  tag: { en: 'HOUSE FAVOURITE', fr: 'FAVORI DE LA MAISON' }
}];


const poissonniereSignature = [
{
  name: { en: 'Kothey Momo', fr: 'Kothey Momo' },
  nameNe: 'कोठे मम:',
  desc: { en: 'Pan-fried · crispy base · chicken · garlic · spring onion', fr: 'Poêlé · base croustillante · poulet · ail · ciboulette' },
  price: '10€',
  image: '/assets/images/momo_fried_crispy.png',
  imageAlt: 'Golden pan-fried kothey momos with crispy caramelised base on a dark ceramic plate',
  tag: { en: 'STREET STYLE', fr: 'STYLE RUE' }
},
{
  name: { en: 'Steamed Veg Momo', fr: 'Momo Végétarien Vapeur' },
  nameNe: 'तरकारी मम:',
  desc: { en: 'Seasonal vegetables · tofu · ginger · herbs · sesame achar', fr: 'Légumes de saison · tofu · gingembre · herbes · achar sésame' },
  price: '8€',
  image: '/assets/images/momo_hero_steamed.png',
  imageAlt: 'Delicate steamed vegetable momos arranged in a bamboo steamer basket with fresh herbs',
  tag: { en: 'VEGETARIAN', fr: 'VÉGÉTARIEN' }
}];


const montmartreGallery = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_4280b00f6-1789040460871.png",
  alt: 'Warm candlelit interior of Momo House Montmartre with wooden tables and hanging lanterns',
  caption: { en: 'The dining room at dusk', fr: 'La salle au crépuscule' },
  category: { en: 'INTERIOR', fr: 'INTÉRIEUR' },
  size: 'tall'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a534a675-1772056116211.png',
  alt: 'Close-up of freshly steamed momos in a bamboo basket, delicate pleated folds visible',
  caption: { en: 'Steamed, just lifted from the basket', fr: 'Vapeur, tout juste sortis du panier' },
  category: { en: 'FOOD', fr: 'CUISINE' },
  size: 'wide'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_183647322-1772080168639.png',
  alt: 'Two guests sharing a meal at a cozy corner table, warm amber light overhead',
  caption: { en: 'A table for two', fr: 'Une table pour deux' },
  category: { en: 'MOMENTS', fr: 'MOMENTS' },
  size: 'square'
},
{
  src: 'https://images.unsplash.com/photo-1645382615864-9af2776e5462',
  alt: 'Overhead shot of a full momo spread — steamed, fried, and soup varieties on a dark wooden table',
  caption: { en: 'The full spread', fr: 'L\'étendue complète' },
  category: { en: 'FOOD', fr: 'CUISINE' },
  size: 'square'
},
{
  src: 'https://images.unsplash.com/photo-1655475819552-4057698b162d',
  alt: 'Restaurant bar area with warm lighting, bottles and glassware reflecting amber tones',
  caption: { en: 'The bar, before service', fr: 'Le bar, avant le service' },
  category: { en: 'INTERIOR', fr: 'INTÉRIEUR' },
  size: 'wide'
},
{
  src: 'https://images.unsplash.com/photo-1607070599098-7603d649c0e6',
  alt: 'Vibrant red chili tomato dipping sauce beside a plate of golden fried momos',
  caption: { en: 'Achar — the essential companion', fr: 'Achar — l\'accompagnement essentiel' },
  category: { en: 'FOOD', fr: 'CUISINE' },
  size: 'tall'
}];


const poissonniereGallery = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_4dee0efd4-1789040459971.png",
  alt: 'Contemporary restaurant interior with exposed brick walls and industrial pendant lights',
  caption: { en: 'Urban warmth on Rue Poissonnière', fr: 'Chaleur urbaine rue Poissonnière' },
  category: { en: 'INTERIOR', fr: 'INTÉRIEUR' },
  size: 'tall'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_13b6a5abd-1772056079569.png',
  alt: 'Close-up of pan-fried kothey momos with crispy golden base on a ceramic plate',
  caption: { en: 'Kothey — crisp on the outside', fr: 'Kothey — croustillant à l\'extérieur' },
  category: { en: 'FOOD', fr: 'CUISINE' },
  size: 'wide'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fcbdab56-1772259040670.png',
  alt: 'Lively dinner service with guests at communal tables, animated conversation and shared plates',
  caption: { en: 'Friday evening energy', fr: 'L\'énergie du vendredi soir' },
  category: { en: 'MOMENTS', fr: 'MOMENTS' },
  size: 'square'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16ab38a15-1772056115407.png',
  alt: 'Bowl of thukpa noodle soup with vegetables and broth, steam rising from the surface',
  caption: { en: 'Thukpa — mountain warmth in a bowl', fr: 'Thukpa — chaleur des montagnes en bol' },
  category: { en: 'FOOD', fr: 'CUISINE' },
  size: 'square'
},
{
  src: 'https://images.unsplash.com/photo-1545659531-9a66f06e260a',
  alt: 'Open kitchen pass with chef plating dishes, steam and motion in a busy restaurant kitchen',
  caption: { en: 'Behind the pass', fr: 'Derrière le passe' },
  category: { en: 'INTERIOR', fr: 'INTÉRIEUR' },
  size: 'wide'
},
{
  src: 'https://images.unsplash.com/photo-1683367422298-54649a48ee95',
  alt: 'Assorted momo platter with three varieties, garnished with fresh herbs and chili threads',
  caption: { en: 'The tasting plate', fr: 'L\'assiette de dégustation' },
  category: { en: 'FOOD', fr: 'CUISINE' },
  size: 'tall'
}];


// Per-house about content
const houseAbout = {
  montmartre: {
    headline: { en: 'Folded by hand.\nServed with care.', fr: 'Plié à la main.\nServi avec soin.' },
    chapters: [
    {
      title: { en: 'The Fold', fr: 'Le Pli' },
      body: { en: 'Every momo begins the same way — a circle of dough, a careful spoonful of filling, and the practiced motion of pleating. Thirty-two folds seal each one. No shortcuts.', fr: 'Chaque momo commence de la même façon — un cercle de pâte, une cuillerée soigneuse de farce, et le geste maîtrisé du plissage. Trente-deux plis scellent chacun d\'eux. Pas de raccourcis.' },
      image: '/assets/images/momo_brand_story_hands.png',
      imageAlt: 'Close-up of hands carefully pleating and folding a momo dumpling, showing the traditional technique'
    },
    {
      title: { en: 'The Room', fr: 'La Salle' },
      body: { en: 'Rue Montmartre sits in the 2nd arrondissement — the old printing district, now a neighbourhood of small restaurants and covered passages. Our room is small, warm, and always full by eight.', fr: 'La rue Montmartre se trouve dans le 2e arrondissement — l\'ancien quartier de l\'imprimerie, aujourd\'hui un quartier de petits restaurants et de passages couverts. Notre salle est petite, chaleureuse, et toujours pleine à vingt heures.' },
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_479cb911a-1789036020129.png',
      imageAlt: 'The intimate dining room of Momo House Montmartre with warm amber lighting and wooden furniture'
    }],

    storefront: {
      image: '/assets/images/image-1789039985046.png',
      alt: 'Momo House Montmartre storefront with open facade, hand-painted signage, and colourful prayer flags',
      caption: { en: '85 Rue Montmartre, Paris 2e', fr: '85 Rue Montmartre, Paris 2e' }
    }
  },
  poissonniere: {
    headline: { en: 'Street energy.\nContemporary spirit.', fr: 'Énergie de rue.\nEsprit contemporain.' },
    chapters: [
    {
      title: { en: 'The Fold', fr: 'Le Pli' },
      body: { en: 'The same thirty-two pleats, the same filling, the same care — but here the energy is different. The terrace fills early. The kitchen is open. You can watch every momo being made.', fr: 'Les mêmes trente-deux plis, la même farce, le même soin — mais ici l\'énergie est différente. La terrasse se remplit tôt. La cuisine est ouverte. Vous pouvez regarder chaque momo se faire.' },
      image: '/assets/images/momo_brand_story_hands.png',
      imageAlt: 'Hands folding and pleating a momo dumpling at the open kitchen counter of Momo House Poissonnière'
    },
    {
      title: { en: 'The Terrace', fr: 'La Terrasse' },
      body: { en: 'Rue Poissonnière is a lively street with a terrace that catches the afternoon light. In summer, the whole neighbourhood seems to pass by.', fr: 'La rue Poissonnière est une rue animée avec une terrasse qui capte la lumière de l\'après-midi. En été, tout le quartier semble passer.' },
      image: 'https://images.unsplash.com/photo-1599781092575-edba9025bec8',
      imageAlt: 'The lively terrace of Momo House Poissonnière on a sunny afternoon with guests dining outside'
    }],

    storefront: {
      image: '/assets/images/image-1789039959334.png',
      alt: 'Momo House Poissonnière storefront with terrace seating, red signage, and guests dining outside',
      caption: { en: '46 Rue Poissonnière, Paris 9e', fr: '46 Rue Poissonnière, Paris 9e' }
    }
  }
};

interface HousePageProps {
  locationId: 'montmartre' | 'poissonniere';
}

export default function HousePage({ locationId }: HousePageProps) {
  const { language, setLanguage } = useLanguage();
  const t = getTranslations(language);
  const hp = t.housePage;
  const locationData = locations.find((l) => l.id === locationId)!;
  const otherLocation = locations.find((l) => l.id !== locationId)!;
  const otherHref = otherLocation.id === 'montmartre' ? '/montmartre' : '/poissonniere';

  const pageT = locationId === 'montmartre' ? t.montmartrePage : t.poissonierePage;
  const hoursText = pageT.hours;

  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselMode, setCarouselMode] = useState(false);

  const gallery = locationId === 'montmartre' ? montmartreGallery : poissonniereGallery;
  const signatureDishes = locationId === 'montmartre' ? montmartreSignature : poissonniereSignature;
  const aboutData = houseAbout[locationId];

  // Hero image: use the newly uploaded storefront photos
  const heroImage = locationId === 'montmartre' ? '/assets/images/image-1789039985046.png' : '/assets/images/image-1789039959334.png';
  const heroAlt = locationId === 'montmartre' ? 'Momo House Montmartre storefront with open facade, hand-painted signage, and colourful prayer flags' : 'Momo House Poissonnière storefront with terrace seating, red signage, and guests dining outside';

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sections = document.querySelectorAll('[data-reveal]');
    sections.forEach((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, el.getAttribute('data-reveal') || '']));
          }
        },
        { threshold: 0.08 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      {/* ── STICKY NAV ─────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-[500] transition-all duration-500"
        style={{
          backgroundColor: scrollY > 60 ? 'rgba(245, 240, 232, 0.95)' : 'transparent',
          backdropFilter: scrollY > 60 ? 'blur(16px)' : 'none',
          borderBottom: scrollY > 60 ? '1px solid var(--border)' : '1px solid transparent'
        }}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Back to Momo House">
            <AppLogo size={28} />
            <div className="flex flex-col leading-none">
              <span className="font-display uppercase tracking-[0.15em]" style={{ fontSize: '0.8rem', color: scrollY > 60 ? 'var(--foreground)' : 'var(--primary-foreground)' }}>MOMO</span>
              <span className="font-editorial uppercase tracking-[0.35em]" style={{ fontSize: '0.5rem', color: 'var(--primary)' }}>HOUSE</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center" style={{ border: '1px solid var(--border)', overflow: 'hidden' }} role="group" aria-label="Language selector">
              {SUPPORTED_LANGUAGES.map((lang, i) =>
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className="text-annotation transition-all duration-200"
                style={{
                  padding: '5px 10px',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  backgroundColor: language === lang.code ? 'var(--primary)' : 'transparent',
                  color: language === lang.code ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                  borderRight: i < SUPPORTED_LANGUAGES.length - 1 ? '1px solid var(--border)' : 'none',
                  cursor: 'pointer'
                }}
                aria-label={`Switch to ${lang.label}`}
                aria-pressed={language === lang.code}>
                  {lang.nativeLabel}
                </button>
              )}
            </div>
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 text-annotation"
              style={{ color: scrollY > 60 ? 'var(--muted-foreground)' : 'rgba(245,240,232,0.6)', letterSpacing: '0.12em', textDecoration: 'none' }}>
              ← {language === 'fr' ? 'RETOUR' : 'BACK'}
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '100svh' }} aria-label={`Momo House ${locationData.name} hero`}>
        {/* Parallax background */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.28}px)`, willChange: 'transform' }}>
          <img
            src={heroImage}
            alt={heroAlt}
            className="w-full h-full object-cover"
            style={{ transform: 'scale(1.18)', objectPosition: 'center top' }} />
          
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(26,22,20,0.45) 0%, rgba(26,22,20,0.15) 35%, rgba(26,22,20,0.8) 85%, rgba(26,22,20,0.95) 100%)' }}
            aria-hidden="true" />
          
        </div>

        {/* Floating momo decoration */}
        <div className="absolute top-1/3 right-8 md:right-16 pointer-events-none" aria-hidden="true" style={{ opacity: 0.2 }}>
          <MomoSVG size={140} opacity={1} />
        </div>

        {/* Coordinate annotation */}
        <div
          className="absolute top-24 right-6 md:right-10 text-annotation hidden md:block"
          style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.5rem', letterSpacing: '0.15em', writingMode: 'vertical-rl' }}
          aria-hidden="true">
          {locationId === 'montmartre' ? '48.8637°N · 2.3468°E' : '48.8701°N · 2.3497°E'}
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col justify-end h-full min-h-screen pb-16 md:pb-24 px-6 md:px-10 lg:px-16 pt-24">
          {/* Stamp */}
          <div
            className="mb-6"
            style={{
              border: '1.5px solid rgba(196,30,42,0.55)',
              display: 'inline-block',
              padding: '4px 10px',
              transform: 'rotate(-1.5deg)',
              width: 'fit-content',
              opacity: 0.85
            }}>
            <span className="text-annotation" style={{ color: 'var(--primary)', fontSize: '0.55rem', letterSpacing: '0.2em' }}>
              {pageT.heroTagline}
            </span>
          </div>

          <p className="text-annotation mb-3" style={{ color: 'rgba(245,240,232,0.5)', letterSpacing: '0.25em', fontSize: '0.6rem' }}>
            MOMO HOUSE
          </p>

          <h1
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(3.8rem, 13vw, 13rem)',
              color: 'var(--primary-foreground)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em'
            }}>
            {locationId === 'montmartre' ?
            <>MONT<br />MARTRE</> :

            <>POISSON<br />NIÈRE</>
            }
          </h1>

          <div className="mt-5 flex items-center gap-4">
            <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: 'rgba(245,240,232,0.2)' }} aria-hidden="true" />
            <p
              className="font-editorial uppercase"
              style={{ fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)', letterSpacing: '0.3em', color: 'rgba(245,240,232,0.45)' }}>
              {pageT.heroSubline}
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <ReservationCTA
              url={locationData.href}
              label={hp.reserveButton}
              fallbackLabel={hp.reserveFallback}
              fallbackSub={hp.reserveFallbackSub}
              externalLabel={hp.reserveExternalLabel}
              comingSoon={hp.reserveComingSoon}
              comingSoonSub={hp.reserveComingSoonSub}
              phone={locationData.phone}
              locationName={locationData.name}
              size="sm"
              variant="primary" />
            
            <Link
              href={`/${locationId}/carte`}
              className="text-annotation inline-flex items-center gap-2 group"
              style={{
                color: 'rgba(245,240,232,0.6)',
                textDecoration: 'none',
                letterSpacing: '0.15em',
                fontSize: '0.6rem',
                border: '1px solid rgba(245,240,232,0.2)',
                padding: '12px 20px',
                minHeight: 44
              }}>
              {language === 'fr' ? 'VOIR LA CARTE' : 'VIEW MENU'}
              <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Address line */}
          <div className="mt-6 flex items-center gap-3">
            <span
              style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'inline-block', flexShrink: 0 }}
              aria-hidden="true" />
            
            <span className="text-annotation" style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.55rem', letterSpacing: '0.15em' }}>
              {locationData.address} · {locationData.arrondissement}
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
          <div className="h-10 w-px" style={{ backgroundColor: 'rgba(245,240,232,0.25)' }} />
          <span className="text-annotation" style={{ color: 'rgba(245,240,232,0.25)', fontSize: '0.45rem', letterSpacing: '0.2em' }}>SCROLL</span>
        </div>
      </section>

      {/* ── STOREFRONT REVEAL ──────────────────────────────────────────── */}
      <section
        data-reveal="storefront"
        className="relative overflow-hidden"
        style={{ backgroundColor: 'var(--charcoal)' }}
        aria-label="House storefront">
        <div
          style={{
            opacity: isVisible('storefront') ? 1 : 0,
            transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
          {/* Full-bleed storefront photo */}
          <div className="relative" style={{ paddingBottom: '52%', overflow: 'hidden' }}>
            <img
              src={aboutData.storefront.image}
              alt={aboutData.storefront.alt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center center' }} />
            
            {/* Subtle vignette */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(26,22,20,0.7) 100%)' }}
              aria-hidden="true" />
            
            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-6 md:pb-10 flex items-end justify-between">
              <div>
                <span className="text-annotation block mb-1" style={{ color: 'var(--primary)', fontSize: '0.5rem', letterSpacing: '0.22em' }}>
                  {language === 'fr' ? 'LA MAISON' : 'THE HOUSE'}
                </span>
                <p className="font-editorial" style={{ color: 'rgba(245,240,232,0.85)', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', letterSpacing: '0.06em' }}>
                  {aboutData.storefront.caption[language]}
                </p>
              </div>
              <span
                className="text-annotation hidden md:block"
                style={{ color: 'rgba(245,240,232,0.25)', fontSize: '0.5rem', letterSpacing: '0.15em' }}>
                01
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLEAT RULE ─────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: 'var(--background)', padding: '0' }}>
        <PleatRule />
      </div>

      {/* ── RESTAURANT DETAILS ─────────────────────────────────────────── */}
      <section
        data-reveal="details"
        className="py-16 md:py-24"
        style={{ backgroundColor: 'var(--background)' }}
        aria-label="Restaurant details">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div
            style={{
              opacity: isVisible('details') ? 1 : 0,
              transform: isVisible('details') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
            <span className="text-annotation block mb-6" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
              {hp.restaurantDetails}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            {[
            { label: hp.address, value: `${locationData.address}\n${locationData.arrondissement}` },
            { label: hp.hours, value: hoursText },
            { label: hp.phone, value: locationData.phone }].
            map((item, i) =>
            <div
              key={item.label}
              data-reveal={`detail-${i}`}
              className="p-8 md:p-10"
              style={{
                borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
                borderTop: '1px solid var(--border)',
                opacity: isVisible(`detail-${i}`) ? 1 : 0,
                transform: isVisible(`detail-${i}`) ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`
              }}>
                <span className="text-annotation block mb-3" style={{ color: 'var(--muted-foreground)', fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                  {item.label}
                </span>
                <p className="font-editorial" style={{ fontSize: '0.9rem', color: 'var(--foreground)', lineHeight: 1.7, letterSpacing: '0.02em', whiteSpace: 'pre-line' }}>
                  {item.value}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SIGNATURE DISHES ───────────────────────────────────────────── */}
      <section
        data-reveal="signature"
        className="py-20 md:py-32 overflow-hidden"
        style={{ backgroundColor: 'var(--secondary)' }}
        aria-label="Signature dishes">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
            style={{
              opacity: isVisible('signature') ? 1 : 0,
              transform: isVisible('signature') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
            <div>
              <span className="text-annotation block mb-2" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
                {language === 'fr' ? 'SIGNATURES' : 'SIGNATURES'}
              </span>
              <h2
                className="font-display uppercase"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)', color: 'var(--foreground)', lineHeight: 0.88, letterSpacing: '-0.04em' }}>
                {language === 'fr' ? 'NOS PLATS' : 'OUR DISHES'}
              </h2>
            </div>
            <Link
              href={`/${locationId}/carte`}
              className="text-annotation inline-flex items-center gap-2 group self-start md:self-auto"
              style={{ color: 'var(--muted-foreground)', textDecoration: 'none', letterSpacing: '0.15em', fontSize: '0.6rem' }}>
              {language === 'fr' ? 'VOIR TOUTE LA CARTE' : 'VIEW FULL MENU'}
              <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Asymmetric dish layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {signatureDishes.map((dish, i) =>
            <div
              key={i}
              data-reveal={`sig-dish-${i}`}
              className="group"
              style={{
                opacity: isVisible(`sig-dish-${i}`) ? 1 : 0,
                transform: isVisible(`sig-dish-${i}`) ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s`,
                // First dish is taller, second is offset
                marginTop: i === 1 ? '2rem' : 0
              }}>
                {/* Dish image */}
                <div
                className="relative overflow-hidden"
                style={{ paddingBottom: i === 0 ? '110%' : '85%' }}>
                  <img
                  src={dish.image}
                  alt={dish.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  style={{ transform: 'scale(1.02)' }} />
                
                  {/* Tag */}
                  <div
                  className="absolute top-4 left-4"
                  style={{
                    backgroundColor: 'var(--primary)',
                    padding: '3px 8px'
                  }}>
                    <span className="text-annotation" style={{ color: 'var(--primary-foreground)', fontSize: '0.48rem', letterSpacing: '0.2em' }}>
                      {dish.tag[language]}
                    </span>
                  </div>
                  {/* Number */}
                  <div
                  className="absolute top-4 right-4 text-annotation"
                  style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.5rem', letterSpacing: '0.1em' }}
                  aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Dish info */}
                <div className="pt-5" style={{ borderTop: '1px solid var(--border)' }}>
                  {/* Devanagari name */}
                  <p
                  lang="ne"
                  style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', color: 'var(--foreground)', lineHeight: 1.25, marginBottom: 2 }}>
                    {dish.nameNe}
                  </p>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                      className="font-display"
                      style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', color: 'var(--foreground)', letterSpacing: '-0.01em', marginBottom: 6 }}>
                        {dish.name[language]}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                        {dish.desc[language]}
                      </p>
                    </div>
                    <span
                    className="font-display flex-shrink-0"
                    style={{ fontSize: '1.1rem', color: 'var(--primary)', fontVariantNumeric: 'tabular-nums' }}>
                      {dish.price}
                    </span>
                  </div>
                  <Link
                  href={`/${locationId}/carte`}
                  className="mt-4 inline-flex items-center gap-2 text-annotation group/btn"
                  style={{ color: 'var(--muted-foreground)', textDecoration: 'none', letterSpacing: '0.15em', fontSize: '0.55rem' }}>
                    {language === 'fr' ? 'COMMANDER' : 'ORDER'}
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── PLEAT RULE ─────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: 'var(--secondary)', padding: '0' }}>
        <PleatRule />
      </div>

      {/* ── ABOUT THE HOUSE ────────────────────────────────────────────── */}
      <section
        data-reveal="about-house"
        className="py-20 md:py-32"
        style={{ backgroundColor: 'var(--background)' }}
        aria-label="About the house">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          {/* Headline */}
          <div
            style={{
              opacity: isVisible('about-house') ? 1 : 0,
              transform: isVisible('about-house') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
            <span className="text-annotation block mb-4" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
              {language === 'fr' ? 'LA MAISON' : 'THE HOUSE'}
            </span>
            <h2
              className="font-display uppercase mb-16 md:mb-20"
              style={{
                fontSize: 'clamp(2.2rem, 6vw, 6rem)',
                color: 'var(--foreground)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                whiteSpace: 'pre-line'
              }}>
              {aboutData.headline[language]}
            </h2>
          </div>

          {/* Alternating chapters */}
          {aboutData.chapters.map((chapter, i) =>
          <div
            key={i}
            data-reveal={`chapter-${i}`}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-24 items-center ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}
            style={{
              opacity: isVisible(`chapter-${i}`) ? 1 : 0,
              transform: isVisible(`chapter-${i}`) ? 'translateY(0)' : 'translateY(40px)',
              transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`
            }}>
              {/* Image */}
              <div className={`relative overflow-hidden ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`} style={{ paddingBottom: '75%' }}>
                <img
                src={chapter.image}
                alt={chapter.imageAlt}
                className="absolute inset-0 w-full h-full object-cover" />
              
                {/* Caption number */}
                <div
                className="absolute bottom-4 right-4 text-annotation"
                style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.5rem', letterSpacing: '0.1em' }}
                aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              {/* Text */}
              <div className={`${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                <h3
                className="font-display uppercase mb-6"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--foreground)', letterSpacing: '-0.02em', lineHeight: 0.95 }}>
                  {chapter.title[language]}
                </h3>
                <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', lineHeight: 1.85, color: 'var(--muted-foreground)', fontWeight: 300 }}>
                  {chapter.body[language]}
                </p>
                {i === aboutData.chapters.length - 1 &&
              <Link
                href={`/${locationId}/a-propos`}
                className="mt-8 inline-flex items-center gap-2 text-annotation group"
                style={{ color: 'var(--muted-foreground)', textDecoration: 'none', letterSpacing: '0.15em', fontSize: '0.6rem' }}>
                    {language === 'fr' ? 'EN SAVOIR PLUS' : 'READ MORE'}
                    <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
                  </Link>
              }
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── MENU PREVIEW ───────────────────────────────────────────────── */}
      <section
        data-reveal="menu"
        className="py-20 md:py-28 overflow-hidden"
        style={{ backgroundColor: 'var(--secondary)' }}
        aria-label="Menu preview">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div
            style={{
              opacity: isVisible('menu') ? 1 : 0,
              transform: isVisible('menu') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
            <span className="text-annotation block mb-2" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
              {hp.menuPreview}
            </span>
            <h2
              className="font-display uppercase"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)', color: 'var(--foreground)', lineHeight: 0.88, letterSpacing: '-0.04em' }}>
              {hp.menuLabel}
            </h2>
          </div>

          <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-8 md:gap-0">
            {menuItems.map((section, si) =>
            <div
              key={si}
              data-reveal={`menu-cat-${si}`}
              className="md:p-8"
              style={{
                borderLeft: si > 0 ? '1px solid var(--border)' : 'none',
                opacity: isVisible(`menu-cat-${si}`) ? 1 : 0,
                transform: isVisible(`menu-cat-${si}`) ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${si * 0.12}s`
              }}>
                <h3
                className="text-annotation mb-6"
                style={{ color: 'var(--primary)', letterSpacing: '0.2em', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  {section.category[language]}
                </h3>
                <div className="flex flex-col gap-5">
                  {section.items.map((item, ii) =>
                <div key={ii} className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display" style={{ fontSize: '0.95rem', color: 'var(--foreground)', letterSpacing: '-0.01em' }}>
                          {item.name}
                        </p>
                        <p className="font-editorial mt-0.5" style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', letterSpacing: '0.03em' }}>
                          {item.desc[language]}
                        </p>
                      </div>
                      <span className="text-annotation flex-shrink-0" style={{ color: 'var(--primary)', fontSize: '0.7rem' }}>
                        {item.price}
                      </span>
                    </div>
                )}
                </div>
              </div>
            )}
          </div>

          <div
            data-reveal="menu-cta"
            className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{
              opacity: isVisible('menu-cta') ? 1 : 0,
              transition: 'opacity 0.7s ease 0.3s'
            }}>
            <Link
              href={`/${locationId}/carte`}
              className="inline-flex items-center gap-2 text-annotation group"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                textDecoration: 'none',
                letterSpacing: '0.15em',
                padding: '12px 24px',
                fontSize: '0.6rem',
                minHeight: 44
              }}>
              {language === 'fr' ? 'VOIR LA CARTE COMPLÈTE' : 'VIEW FULL MENU'}
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
            <a
              href={locationData.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-annotation group"
              style={{ color: 'var(--muted-foreground)', textDecoration: 'none', letterSpacing: '0.15em', fontSize: '0.6rem' }}>
              {hp.visitWebsite}
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex items-center" style={{ color: 'var(--primary)' }} aria-hidden="true">
                <ExternalLinkIcon size={10} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── ATMOSPHERE GALLERY ─────────────────────────────────────────── */}
      <section
        data-reveal="gallery"
        className="py-20 md:py-28 overflow-hidden"
        style={{ backgroundColor: 'var(--background)' }}
        aria-label="Atmosphere gallery">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
            style={{
              opacity: isVisible('gallery') ? 1 : 0,
              transform: isVisible('gallery') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
            <div>
              <span className="text-annotation block mb-2" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
                {hp.galleryLabel}
              </span>
              <h2
                className="font-display uppercase"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)', color: 'var(--foreground)', lineHeight: 0.88, letterSpacing: '-0.04em' }}>
                {hp.gallerySubLabel}
              </h2>
            </div>
            <div
              className="flex items-center gap-0"
              style={{ border: '1px solid var(--border)' }}
              role="group"
              aria-label="Gallery view toggle">
              <button
                onClick={() => setCarouselMode(false)}
                className="text-annotation transition-all duration-200"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  backgroundColor: !carouselMode ? 'var(--primary)' : 'transparent',
                  color: !carouselMode ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                  borderRight: '1px solid var(--border)',
                  cursor: 'pointer',
                  border: 'none'
                }}
                aria-pressed={!carouselMode}>
                {language === 'fr' ? 'MOSAÏQUE' : 'MOSAIC'}
              </button>
              <button
                onClick={() => setCarouselMode(true)}
                className="text-annotation transition-all duration-200"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  backgroundColor: carouselMode ? 'var(--primary)' : 'transparent',
                  color: carouselMode ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                  cursor: 'pointer',
                  border: 'none'
                }}
                aria-pressed={carouselMode}>
                {language === 'fr' ? 'ÉDITORIAL' : 'EDITORIAL'}
              </button>
            </div>
          </div>

          {/* MOSAIC MODE */}
          {!carouselMode &&
          <div style={{ opacity: isVisible('gallery') ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {/* Column 1 */}
                <div className="flex flex-col gap-3 md:gap-4">
                  {[gallery[0], gallery[3]].map((img, i) =>
                <div
                  key={`col1-${i}`}
                  data-reveal={`gallery-img-${i}`}
                  className="relative overflow-hidden group"
                  style={{
                    paddingBottom: i === 0 ? '130%' : '80%',
                    opacity: isVisible(`gallery-img-${i}`) ? 1 : 0,
                    transform: isVisible(`gallery-img-${i}`) ? 'translateY(0)' : 'translateY(24px)',
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`
                  }}>
                      <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy" />
                  
                      <div
                    className="absolute inset-0 flex flex-col justify-end p-4 md:p-5"
                    style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.75) 0%, rgba(28,28,26,0.1) 55%, transparent 100%)' }}>
                        <span className="text-annotation block mb-1" style={{ color: 'var(--primary)', fontSize: '0.48rem', letterSpacing: '0.2em' }}>
                          {img.category[language]}
                        </span>
                        <p className="font-editorial" style={{ color: 'rgba(245,240,232,0.9)', fontSize: '0.78rem', letterSpacing: '0.04em', lineHeight: 1.4 }}>
                          {img.caption[language]}
                        </p>
                      </div>
                    </div>
                )}
                </div>
                {/* Column 2 */}
                <div className="flex flex-col gap-3 md:gap-4">
                  {[gallery[1], gallery[4]].map((img, i) =>
                <div
                  key={`col2-${i}`}
                  data-reveal={`gallery-img-${i + 2}`}
                  className="relative overflow-hidden group"
                  style={{
                    paddingBottom: '100%',
                    opacity: isVisible(`gallery-img-${i + 2}`) ? 1 : 0,
                    transform: isVisible(`gallery-img-${i + 2}`) ? 'translateY(0)' : 'translateY(24px)',
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${(i + 2) * 0.1}s`
                  }}>
                      <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy" />
                  
                      <div
                    className="absolute inset-0 flex flex-col justify-end p-4 md:p-5"
                    style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.75) 0%, rgba(28,28,26,0.1) 55%, transparent 100%)' }}>
                        <span className="text-annotation block mb-1" style={{ color: 'var(--primary)', fontSize: '0.48rem', letterSpacing: '0.2em' }}>
                          {img.category[language]}
                        </span>
                        <p className="font-editorial" style={{ color: 'rgba(245,240,232,0.9)', fontSize: '0.78rem', letterSpacing: '0.04em', lineHeight: 1.4 }}>
                          {img.caption[language]}
                        </p>
                      </div>
                    </div>
                )}
                </div>
                {/* Column 3 */}
                <div className="flex flex-col gap-3 md:gap-4">
                  {[gallery[2], gallery[5]].map((img, i) =>
                <div
                  key={`col3-${i}`}
                  data-reveal={`gallery-img-${i + 4}`}
                  className="relative overflow-hidden group"
                  style={{
                    paddingBottom: i === 0 ? '80%' : '130%',
                    opacity: isVisible(`gallery-img-${i + 4}`) ? 1 : 0,
                    transform: isVisible(`gallery-img-${i + 4}`) ? 'translateY(0)' : 'translateY(24px)',
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${(i + 4) * 0.1}s`
                  }}>
                      <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy" />
                  
                      <div
                    className="absolute inset-0 flex flex-col justify-end p-4 md:p-5"
                    style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.75) 0%, rgba(28,28,26,0.1) 55%, transparent 100%)' }}>
                        <span className="text-annotation block mb-1" style={{ color: 'var(--primary)', fontSize: '0.48rem', letterSpacing: '0.2em' }}>
                          {img.category[language]}
                        </span>
                        <p className="font-editorial" style={{ color: 'rgba(245,240,232,0.9)', fontSize: '0.78rem', letterSpacing: '0.04em', lineHeight: 1.4 }}>
                          {img.caption[language]}
                        </p>
                      </div>
                    </div>
                )}
                </div>
              </div>
              {/* Category legend */}
              <div className="mt-6 flex items-center gap-6 flex-wrap">
                {[
              { key: 'INTERIOR', fr: 'INTÉRIEUR' },
              { key: 'FOOD', fr: 'CUISINE' },
              { key: 'MOMENTS', fr: 'MOMENTS' }].
              map((cat) =>
              <div key={cat.key} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--primary)' }} aria-hidden="true" />
                    <span className="text-annotation" style={{ color: 'var(--muted-foreground)', fontSize: '0.5rem', letterSpacing: '0.18em' }}>
                      {language === 'fr' ? cat.fr : cat.key}
                    </span>
                  </div>
              )}
              </div>
            </div>
          }

          {/* EDITORIAL CAROUSEL MODE */}
          {carouselMode &&
          <div style={{ opacity: isVisible('gallery') ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}>
              <div className="relative overflow-hidden" style={{ paddingBottom: '56%' }}>
                {gallery.map((img, i) =>
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: activeSlide === i ? 1 : 0, pointerEvents: activeSlide === i ? 'auto' : 'none' }}>
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                    <div
                  className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 px-6 md:px-8 py-5 md:py-7"
                  style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.88) 0%, rgba(28,28,26,0.3) 60%, transparent 100%)' }}>
                      <div>
                        <span className="text-annotation block mb-1.5" style={{ color: 'var(--primary)', fontSize: '0.5rem', letterSpacing: '0.22em' }}>
                          {img.category[language]}
                        </span>
                        <p className="font-editorial" style={{ color: 'rgba(245,240,232,0.95)', fontSize: 'clamp(0.85rem, 2vw, 1.1rem)', letterSpacing: '0.04em', lineHeight: 1.35 }}>
                          {img.caption[language]}
                        </p>
                      </div>
                      <span className="text-annotation flex-shrink-0" style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                        {String(activeSlide + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
              )}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button
                onClick={() => setActiveSlide((prev) => (prev - 1 + gallery.length) % gallery.length)}
                className="flex-shrink-0 flex items-center justify-center transition-colors duration-200"
                style={{ width: 36, height: 36, border: '1px solid var(--border)', backgroundColor: 'transparent', color: 'var(--foreground)', cursor: 'pointer' }}
                aria-label={language === 'fr' ? 'Image précédente' : 'Previous image'}>
                  ←
                </button>
                <div className="flex gap-2 flex-1 overflow-hidden">
                  {gallery.map((img, i) =>
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className="relative flex-shrink-0 overflow-hidden transition-all duration-300"
                  style={{ width: 64, height: 48, border: activeSlide === i ? '2px solid var(--primary)' : '2px solid transparent', opacity: activeSlide === i ? 1 : 0.5, cursor: 'pointer', padding: 0, background: 'none' }}
                  aria-label={`View image ${i + 1}: ${img.caption[language]}`}
                  aria-pressed={activeSlide === i}>
                      <img src={img.src} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                    </button>
                )}
                </div>
                <button
                onClick={() => setActiveSlide((prev) => (prev + 1) % gallery.length)}
                className="flex-shrink-0 flex items-center justify-center transition-colors duration-200"
                style={{ width: 36, height: 36, border: '1px solid var(--border)', backgroundColor: 'transparent', color: 'var(--foreground)', cursor: 'pointer' }}
                aria-label={language === 'fr' ? 'Image suivante' : 'Next image'}>
                  →
                </button>
              </div>
              <div className="mt-5 flex items-start justify-between gap-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex items-center gap-4">
                  {gallery.map((_, i) =>
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className="transition-all duration-300"
                  style={{ width: activeSlide === i ? 24 : 6, height: 2, backgroundColor: activeSlide === i ? 'var(--primary)' : 'var(--border)', border: 'none', cursor: 'pointer', padding: 0 }}
                  aria-label={`Go to image ${i + 1}`} />

                )}
                </div>
                <p className="font-editorial text-right" style={{ color: 'var(--muted-foreground)', fontSize: '0.72rem', letterSpacing: '0.04em', maxWidth: '40ch', lineHeight: 1.6 }}>
                  {gallery[activeSlide].alt}
                </p>
              </div>
            </div>
          }
        </div>
      </section>

      {/* ── CONTACT STRIP ──────────────────────────────────────────────── */}
      <section
        data-reveal="contact-strip"
        className="py-16 md:py-20"
        style={{ backgroundColor: 'var(--secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
        aria-label="Contact details">
        <div
          className="max-w-[1600px] mx-auto px-6 md:px-10"
          style={{
            opacity: isVisible('contact-strip') ? 1 : 0,
            transform: isVisible('contact-strip') ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {/* Address */}
            <div className="md:pr-8" style={{ borderRight: '1px solid var(--border)' }}>
              <span className="text-annotation block mb-3" style={{ color: 'var(--primary)', fontSize: '0.5rem', letterSpacing: '0.22em' }}>
                {language === 'fr' ? 'ADRESSE' : 'ADDRESS'}
              </span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(locationData.address + ', ' + locationData.arrondissement)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-editorial group"
                style={{ color: 'var(--foreground)', textDecoration: 'none', fontSize: '0.9rem', lineHeight: 1.6, display: 'block' }}>
                {locationData.address}<br />
                {locationData.arrondissement}
                <span className="block mt-1 text-annotation" style={{ color: 'var(--primary)', fontSize: '0.5rem', letterSpacing: '0.15em', opacity: 0 }}
                onMouseEnter={(e) => {(e.currentTarget as HTMLElement).style.opacity = '1';}}
                onMouseLeave={(e) => {(e.currentTarget as HTMLElement).style.opacity = '0';}}>
                  {language === 'fr' ? 'OUVRIR MAPS →' : 'OPEN MAPS →'}
                </span>
              </a>
            </div>
            {/* Phone */}
            <div className="md:px-8" style={{ borderRight: '1px solid var(--border)' }}>
              <span className="text-annotation block mb-3" style={{ color: 'var(--primary)', fontSize: '0.5rem', letterSpacing: '0.22em' }}>
                {language === 'fr' ? 'TÉLÉPHONE' : 'PHONE'}
              </span>
              <a
                href={`tel:${locationData.phone}`}
                className="font-editorial"
                style={{ color: 'var(--foreground)', textDecoration: 'none', fontSize: '0.9rem', fontVariantNumeric: 'tabular-nums' }}>
                {locationData.phone}
              </a>
            </div>
            {/* Hours */}
            <div className="md:px-8" style={{ borderRight: '1px solid var(--border)' }}>
              <span className="text-annotation block mb-3" style={{ color: 'var(--primary)', fontSize: '0.5rem', letterSpacing: '0.22em' }}>
                {language === 'fr' ? 'HORAIRES' : 'HOURS'}
              </span>
              <p className="font-editorial" style={{ color: 'var(--foreground)', fontSize: '0.85rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {hoursText}
              </p>
            </div>
            {/* Links */}
            <div className="md:pl-8">
              <span className="text-annotation block mb-3" style={{ color: 'var(--primary)', fontSize: '0.5rem', letterSpacing: '0.22em' }}>
                {language === 'fr' ? 'LIENS' : 'LINKS'}
              </span>
              <div className="flex flex-col gap-2">
                <Link
                  href={`/${locationId}/contact`}
                  className="text-annotation inline-flex items-center gap-1 group"
                  style={{ color: 'var(--muted-foreground)', textDecoration: 'none', letterSpacing: '0.12em', fontSize: '0.6rem' }}>
                  {language === 'fr' ? 'NOUS TROUVER' : 'FIND US'}
                  <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
                </Link>
                <Link
                  href={`/${locationId}/carte`}
                  className="text-annotation inline-flex items-center gap-1 group"
                  style={{ color: 'var(--muted-foreground)', textDecoration: 'none', letterSpacing: '0.12em', fontSize: '0.6rem' }}>
                  {language === 'fr' ? 'LA CARTE' : 'THE MENU'}
                  <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
                </Link>
                <Link
                  href={`/${locationId}/a-propos`}
                  className="text-annotation inline-flex items-center gap-1 group"
                  style={{ color: 'var(--muted-foreground)', textDecoration: 'none', letterSpacing: '0.12em', fontSize: '0.6rem' }}>
                  {language === 'fr' ? 'À PROPOS' : 'ABOUT'}
                  <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESERVATION CTA ────────────────────────────────────────────── */}
      <section
        data-reveal="reservation"
        className="py-20 md:py-28 overflow-hidden"
        style={{ backgroundColor: 'var(--charcoal)' }}
        aria-label="Make a reservation">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div
              style={{
                opacity: isVisible('reservation') ? 1 : 0,
                transform: isVisible('reservation') ? 'translateX(0)' : 'translateX(-40px)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
              <span className="text-annotation block mb-4" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
                {hp.reservationCta}
              </span>
              <h2
                className="font-display uppercase"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)', color: 'var(--primary-foreground)', lineHeight: 0.88, letterSpacing: '-0.04em' }}>
                {hp.reservationLabel}
              </h2>
            </div>
            <div
              style={{
                opacity: isVisible('reservation') ? 1 : 0,
                transform: isVisible('reservation') ? 'translateX(0)' : 'translateX(40px)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s'
              }}>
              <p className="font-editorial" style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(245,240,232,0.55)', letterSpacing: '0.02em' }}>
                {hp.reservationBody}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <ReservationCTA
                  url={locationData.href}
                  label={hp.reserveButton}
                  fallbackLabel={hp.reserveFallback}
                  fallbackSub={hp.reserveFallbackSub}
                  externalLabel={hp.reserveExternalLabel}
                  comingSoon={hp.reserveComingSoon}
                  comingSoonSub={hp.reserveComingSoonSub}
                  phone={locationData.phone}
                  locationName={locationData.name}
                  size="lg"
                  variant="primary" />
                
                <div className="flex items-center gap-3">
                  <div className="h-px w-6" style={{ backgroundColor: 'rgba(245,240,232,0.2)' }} aria-hidden="true" />
                  <span className="text-annotation" style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.6rem' }}>
                    {locationData.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION MAP ───────────────────────────────────────────────── */}
      <section
        data-reveal="location"
        className="py-20 md:py-28"
        style={{ backgroundColor: 'var(--background)' }}
        aria-label="Location map">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div
            style={{
              opacity: isVisible('location') ? 1 : 0,
              transform: isVisible('location') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
            <span className="text-annotation block mb-4" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
              {hp.locationLabel}
            </span>
            <h2
              className="font-display uppercase mb-8"
              style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', color: 'var(--foreground)', lineHeight: 0.88, letterSpacing: '-0.04em' }}>
              {locationData.address}<br />
              <span style={{ color: 'var(--muted-foreground)', fontSize: '0.6em', fontWeight: 300, letterSpacing: '0.02em' }}>
                {locationData.arrondissement}
              </span>
            </h2>
          </div>

          <div
            data-reveal="map-embed"
            className="relative overflow-hidden"
            style={{
              paddingBottom: '45%',
              border: '1px solid var(--border)',
              opacity: isVisible('map-embed') ? 1 : 0,
              transition: 'opacity 0.9s ease 0.2s'
            }}>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(locationData.address + ', ' + locationData.arrondissement)}&output=embed`}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0, filter: 'grayscale(0.3) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing Momo House ${locationData.name} at ${locationData.address}`} />
            
          </div>

          <div
            data-reveal="address-card"
            className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6"
            style={{
              border: '1px solid var(--border)',
              opacity: isVisible('address-card') ? 1 : 0,
              transition: 'opacity 0.7s ease 0.3s'
            }}>
            <div>
              <p className="text-annotation" style={{ color: 'var(--primary)', fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                MOMO HOUSE {locationData.name.toUpperCase()}
              </p>
              <p className="font-editorial mt-1" style={{ fontSize: '0.9rem', color: 'var(--foreground)', letterSpacing: '0.02em' }}>
                {locationData.address}, {locationData.arrondissement}
              </p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(locationData.address + ', ' + locationData.arrondissement)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-annotation group"
              style={{ color: 'var(--muted-foreground)', textDecoration: 'none', letterSpacing: '0.12em' }}>
              {language === 'fr' ? 'OUVRIR DANS MAPS' : 'OPEN IN MAPS'}
              <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── EXPLORE OTHER HOUSE ────────────────────────────────────────── */}
      <section
        data-reveal="other-house"
        className="py-20 md:py-28 overflow-hidden"
        style={{ backgroundColor: 'var(--charcoal)' }}
        aria-label="Explore the other Momo House location">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 text-center">
          <div
            style={{
              opacity: isVisible('other-house') ? 1 : 0,
              transform: isVisible('other-house') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
            <span className="text-annotation block mb-4" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
              {hp.exploreOther}
            </span>
            <h2
              className="font-display uppercase mb-8"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)', color: 'var(--primary-foreground)', lineHeight: 0.88, letterSpacing: '-0.04em' }}>
              MOMO HOUSE<br />
              <span style={{ color: 'var(--primary)' }}>{otherLocation.name.toUpperCase()}</span>
            </h2>
            <p className="font-editorial mb-8" style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', letterSpacing: '0.04em' }}>
              {otherLocation.address}, {otherLocation.arrondissement}
            </p>
            <Link
              href={otherHref}
              className="inline-flex items-center gap-3 px-8 py-4 text-annotation group"
              style={{ border: '1px solid rgba(245,240,232,0.2)', color: 'var(--primary-foreground)', textDecoration: 'none', letterSpacing: '0.12em' }}>
              {t.locations.explorePrefix} {otherLocation.name.toUpperCase()}
              <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MINI FOOTER ────────────────────────────────────────────────── */}
      <div
        className="px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--charcoal)', borderTop: '1px solid rgba(245,240,232,0.06)' }}>
        <Link href="/" className="flex items-center gap-2.5" aria-label="Back to Momo House">
          <AppLogo size={24} />
          <span className="font-display uppercase tracking-[0.15em]" style={{ fontSize: '0.7rem', color: 'var(--primary-foreground)' }}>MOMO HOUSE</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/mentions-legales" className="text-annotation" style={{ color: 'rgba(245,240,232,0.25)', fontSize: '0.5rem', letterSpacing: '0.1em', textDecoration: 'none' }}>
            {language === 'fr' ? 'MENTIONS LÉGALES' : 'LEGAL NOTICE'}
          </Link>
          <Link href="/confidentialite" className="text-annotation" style={{ color: 'rgba(245,240,232,0.25)', fontSize: '0.5rem', letterSpacing: '0.1em', textDecoration: 'none' }}>
            {language === 'fr' ? 'CONFIDENTIALITÉ' : 'PRIVACY'}
          </Link>
        </div>
        <span className="text-annotation" style={{ color: 'rgba(245,240,232,0.2)', fontSize: '0.55rem', letterSpacing: '0.08em' }}>
          © 2025 Momo House Paris
        </span>
      </div>
    </div>);

}