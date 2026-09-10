'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations, SUPPORTED_LANGUAGES } from '@/lib/i18n';

export type HouseId = 'montmartre' | 'poissonniere';

type NavbarProps = {
  variant?: 'portal' | 'house';
  houseId?: HouseId;
};

export default function Navbar({ variant = 'portal', houseId }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = getTranslations(language);
  const pathname = usePathname();
  const isHouse = variant === 'house' && houseId;
  const isHome = pathname === '/';
  const sisterId: HouseId | null = houseId
    ? houseId === 'montmartre'
      ? 'poissonniere'
      : 'montmartre'
    : null;

  const portalLinks = [
    { label: t.nav.theWorld, href: isHome ? '#culture' : '/#culture' },
    { label: t.nav.theFood, href: isHome ? '#momo' : '/#momo' },
    { label: t.nav.ourHouses, href: isHome ? '#houses' : '/#houses' },
    {
      label: language === 'fr' ? 'Réserver' : 'Reserve',
      href: isHome ? '#reserve' : '/#reserve',
    },
  ];

  const houseLinks = houseId
    ? [
        {
          label: language === 'fr' ? 'Portail' : 'Portal',
          href: '/',
        },
        {
          label: language === 'fr' ? 'Commandes' : 'Order',
          href: `/${houseId}/carte`,
        },
        {
          label: language === 'fr' ? 'Réserver' : 'Reserve',
          href: `/${houseId}#reserve`,
        },
        {
          label: language === 'fr' ? 'À propos' : 'About',
          href: `/${houseId}/a-propos`,
        },
        {
          label: language === 'fr' ? 'Contact' : 'Contact',
          href: `/${houseId}/contact`,
        },
        {
          label:
            sisterId === 'montmartre' ? 'Montmartre' : 'Poissonnière',
          href: `/${sisterId}`,
        },
      ]
    : [];

  const navLinks = isHouse ? houseLinks : portalLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handlePortalHash = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ctaHref = isHouse
    ? `/${houseId}/carte`
    : isHome
      ? '#houses'
      : '/#houses';
  const ctaLabel = isHouse
    ? language === 'fr'
      ? 'Commandes'
      : 'Order'
    : t.nav.chooseYourHouse;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[500] transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? 'rgba(245, 240, 232, 0.94)'
            : 'rgba(245, 240, 232, 0.72)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled
            ? '1px solid var(--border)'
            : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-10">
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="Momo House — home"
            onClick={() => setMenuOpen(false)}
          >
            <AppLogo size={32} />
            <div className="flex flex-col leading-none">
              <span
                className="font-display tracking-[0.15em] uppercase"
                style={{ fontSize: '0.85rem', color: 'var(--foreground)' }}
              >
                MOMO
              </span>
              <span
                className="font-editorial tracking-[0.35em] uppercase"
                style={{ fontSize: '0.55rem', color: 'var(--primary)' }}
              >
                HOUSE
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) =>
              link.href.startsWith('#') ? (
                <button
                  key={link.href + link.label}
                  type="button"
                  onClick={() => handlePortalHash(link.href)}
                  className="text-annotation underline-expand"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-annotation underline-expand"
                  style={{
                    color:
                      link.href === '/'
                        ? pathname === '/'
                          ? 'var(--primary)'
                          : 'var(--muted-foreground)'
                        : pathname === link.href ||
                            pathname.startsWith(`${link.href}/`)
                          ? 'var(--primary)'
                          : 'var(--muted-foreground)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex items-center overflow-hidden"
              style={{ border: '1px solid var(--border)' }}
              role="group"
              aria-label="Language selector"
            >
              {SUPPORTED_LANGUAGES.map((lang, i) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className="text-annotation transition-all duration-200"
                  style={{
                    padding: '5px 10px',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    backgroundColor:
                      language === lang.code ? 'var(--primary)' : 'transparent',
                    color:
                      language === lang.code
                        ? 'var(--primary-foreground)'
                        : 'var(--muted-foreground)',
                    borderRight:
                      i < SUPPORTED_LANGUAGES.length - 1
                        ? '1px solid var(--border)'
                        : 'none',
                    cursor: 'pointer',
                  }}
                  aria-label={`Switch to ${lang.label}`}
                  aria-pressed={language === lang.code}
                >
                  {lang.nativeLabel}
                </button>
              ))}
            </div>

            {ctaHref.startsWith('#') ? (
              <button
                type="button"
                onClick={() => handlePortalHash(ctaHref)}
                className="text-annotation hidden items-center gap-2 px-5 py-2.5 sm:flex"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: '1px solid var(--primary)',
                  letterSpacing: '0.1em',
                }}
              >
                {ctaLabel}
              </button>
            ) : (
              <Link
                href={ctaHref}
                className="text-annotation hidden items-center gap-2 px-5 py-2.5 sm:flex"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: '1px solid var(--primary)',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                }}
              >
                {ctaLabel}
              </Link>
            )}

            <button
              type="button"
              className="flex flex-col gap-1.5 p-2 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className="block h-px w-6 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--foreground)',
                  transform: menuOpen
                    ? 'rotate(45deg) translate(3px, 3px)'
                    : 'none',
                }}
              />
              <span
                className="block h-px transition-all duration-300"
                style={{
                  backgroundColor: 'var(--foreground)',
                  opacity: menuOpen ? 0 : 1,
                  width: menuOpen ? '0' : '1rem',
                }}
              />
              <span
                className="block h-px w-6 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--foreground)',
                  transform: menuOpen
                    ? 'rotate(-45deg) translate(3px, -3px)'
                    : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      <div
        className="fixed inset-0 z-[499] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden"
        style={{
          backgroundColor: 'var(--charcoal)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-10px)',
        }}
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="text-annotation"
          style={{
            color: 'rgba(245,240,232,0.55)',
            letterSpacing: '0.2em',
            textDecoration: 'none',
          }}
        >
          ← MOMO HOUSE PARIS
        </Link>

        {navLinks.map((link, i) =>
          link.href.startsWith('#') ? (
            <button
              key={link.href + link.label}
              type="button"
              onClick={() => handlePortalHash(link.href)}
              className="font-display uppercase"
              style={{
                color: 'var(--primary-foreground)',
                fontSize: 'clamp(1.6rem, 7vw, 2.6rem)',
                letterSpacing: '-0.02em',
                transitionDelay: `${i * 60}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              {link.label}
            </button>
          ) : (
            <Link
              key={link.href + link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display uppercase"
              style={{
                color: 'var(--primary-foreground)',
                fontSize: 'clamp(1.6rem, 7vw, 2.6rem)',
                letterSpacing: '-0.02em',
                textDecoration: 'none',
                transitionDelay: `${i * 60}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              {link.label}
            </Link>
          ),
        )}

        {!ctaHref.startsWith('#') ? (
          <Link
            href={ctaHref}
            onClick={() => setMenuOpen(false)}
            className="text-annotation mt-2 px-8 py-3"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              letterSpacing: '0.12em',
              textDecoration: 'none',
            }}
          >
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </>
  );
}
