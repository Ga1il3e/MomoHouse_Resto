'use client';

import React, { useEffect, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations, SUPPORTED_LANGUAGES } from '@/lib/i18n';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = getTranslations(language);

  const navLinks = [
    { label: t.nav.theWorld, href: '#culture' },
    { label: t.nav.theFood, href: '#momo' },
    { label: t.nav.ourHouses, href: '#houses' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[500] transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(245, 240, 232, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
            aria-label="Momo House — scroll to top"
          >
            <AppLogo size={32} />
            <div className="flex flex-col leading-none">
              <span
                className="font-display uppercase tracking-[0.15em]"
                style={{ fontSize: '0.85rem', color: 'var(--foreground)' }}
              >
                MOMO
              </span>
              <span
                className="font-editorial uppercase tracking-[0.35em]"
                style={{ fontSize: '0.55rem', color: 'var(--primary)' }}
              >
                HOUSE
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-annotation underline-expand"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + Language switcher + Mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div
              className="flex items-center"
              style={{
                border: '1px solid var(--border)',
                overflow: 'hidden',
              }}
              role="group"
              aria-label="Language selector"
            >
              {SUPPORTED_LANGUAGES.map((lang, i) => (
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
                    cursor: 'pointer',
                  }}
                  aria-label={`Switch to ${lang.label}`}
                  aria-pressed={language === lang.code}
                >
                  {lang.nativeLabel}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleNavClick('#houses')}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-annotation"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                border: '1px solid var(--primary)',
                letterSpacing: '0.1em',
              }}
              data-cursor="CHOOSE"
            >
              {t.nav.chooseYourHouse}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span
                className="block h-px w-6 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--foreground)',
                  transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
                }}
              />
              <span
                className="block h-px w-4 transition-all duration-300"
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
                  transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-[499] flex flex-col justify-center items-center gap-8 md:hidden transition-all duration-500"
        style={{
          backgroundColor: 'var(--charcoal)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-10px)',
        }}
      >
        {navLinks.map((link, i) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            className="font-display uppercase"
            style={{
              color: 'var(--primary-foreground)',
              fontSize: 'clamp(1.8rem, 8vw, 3rem)',
              letterSpacing: '-0.02em',
              transitionDelay: `${i * 60}ms`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {link.label}
          </button>
        ))}

        {/* Mobile language switcher */}
        <div
          className="flex items-center gap-0"
          style={{ border: '1px solid rgba(245,240,232,0.2)', opacity: menuOpen ? 1 : 0, transition: 'opacity 0.4s ease 0.18s' }}
          role="group"
          aria-label="Language selector"
        >
          {SUPPORTED_LANGUAGES.map((lang, i) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="text-annotation"
              style={{
                padding: '8px 16px',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                backgroundColor: language === lang.code ? 'var(--primary)' : 'transparent',
                color: language === lang.code ? 'var(--primary-foreground)' : 'rgba(245,240,232,0.5)',
                borderRight: i < SUPPORTED_LANGUAGES.length - 1 ? '1px solid rgba(245,240,232,0.2)' : 'none',
              }}
              aria-label={`Switch to ${lang.label}`}
              aria-pressed={language === lang.code}
            >
              {lang.nativeLabel}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleNavClick('#houses')}
          className="mt-4 px-8 py-3 text-annotation"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            letterSpacing: '0.12em',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.4s ease 0.2s',
          }}
        >
          {t.nav.chooseYourHouse}
        </button>
      </div>
    </>
  );
}