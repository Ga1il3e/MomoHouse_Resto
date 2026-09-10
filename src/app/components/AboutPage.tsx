'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/components/Footer';

type HouseId = 'montmartre' | 'poissonniere';

const INTERVIEW_QUESTIONS = [
  'Who cooks — is it a family kitchen, or do you have a team?',
  'Where does your family come from, and how did you end up in Paris?',
  'What is the dish regulars always order?',
  'What makes this room different from the sister house?',
  'What do Nepali customers say about the food?',
  'How did you learn to fold momos — who taught you?',
  'What does a typical morning look like before service?',
  'Is there a dish on the menu that means something personal to you?',
  'What ingredients do you source specially, and where from?',
  'What would you want a first-time customer to know before they sit down?',
  'How has the neighbourhood changed since you opened?',
  'What is the one thing you would never change about this place?',
];

interface AboutPageProps {
  houseId: HouseId;
}

export default function AboutPage({ houseId }: AboutPageProps) {
  const { language } = useLanguage();
  const locale = language as 'fr' | 'en';
  const houseName = houseId === 'montmartre' ? 'Montmartre' : 'Poissonnière';
  const sisterHouseId = houseId === 'montmartre' ? 'poissonniere' : 'montmartre';
  const sisterHouseName = houseId === 'montmartre' ? 'Poissonnière' : 'Montmartre';

  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setVisible(prev => ({ ...prev, [e.target.id]: true }));
        });
      },
      { threshold: 0.15 }
    );
    Object.values(refs.current).forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };

  const chapters = [
    {
      id: 'fold',
      titleFr: 'Le Pli',
      titleEn: 'The Fold',
      bodyFr: 'PLACEHOLDER — Contenu à fournir par le propriétaire après entretien. Décrivez comment les momos sont pliés à la main, la technique, la tradition.',
      bodyEn: 'PLACEHOLDER — Content to be provided by owner after interview. Describe how momos are folded by hand, the technique, the tradition.',
      imagePlaceholder: 'PLACEHOLDER — Hands pleating momo dough, close-up, warm light, 4:5',
      imageLeft: true,
    },
    {
      id: 'kitchen',
      titleFr: 'La Cuisine',
      titleEn: 'The Kitchen',
      bodyFr: 'PLACEHOLDER — Contenu à fournir par le propriétaire après entretien. Décrivez la cuisine, les ingrédients, la préparation quotidienne.',
      bodyEn: 'PLACEHOLDER — Content to be provided by owner after interview. Describe the kitchen, the ingredients, the daily preparation.',
      imagePlaceholder: 'PLACEHOLDER — Kitchen interior, steam rising, morning prep, 4:5',
      imageLeft: false,
    },
    {
      id: 'room',
      titleFr: 'La Salle',
      titleEn: 'The Room',
      bodyFr: 'PLACEHOLDER — Contenu à fournir par le propriétaire après entretien. Décrivez l\'atmosphère, les détails, ce qui rend cet endroit unique.',
      bodyEn: 'PLACEHOLDER — Content to be provided by owner after interview. Describe the atmosphere, the details, what makes this place unique.',
      imagePlaceholder: `PLACEHOLDER — ${houseName} dining room, wide shot, natural light, 16:9`,
      imageLeft: true,
    },
    {
      id: 'neighbourhood',
      titleFr: 'Le Quartier',
      titleEn: 'The Neighbourhood',
      bodyFr: houseId === 'montmartre' ?'PLACEHOLDER — Rue Montmartre, 2e arrondissement (Sentier / Montorgueil). Contenu à fournir par le propriétaire.' :'PLACEHOLDER — Rue Poissonnière, Paris. Contenu à fournir par le propriétaire.',
      bodyEn: houseId === 'montmartre' ?'PLACEHOLDER — Rue Montmartre, 2nd arrondissement (Sentier / Montorgueil). Content to be provided by owner.' :'PLACEHOLDER — Rue Poissonnière, Paris. Content to be provided by owner.',
      imagePlaceholder: `PLACEHOLDER — ${houseName} street facade, daytime, 4:3`,
      imageLeft: false,
    },
  ];

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
              {locale === 'fr' ? 'À PROPOS' : 'ABOUT'}
            </span>
          </div>
        </div>

        {/* Opening statement */}
        <section
          id="about-hero"
          ref={setRef('about-hero')}
          style={{
            padding: 'clamp(3rem, 8vw, 6rem) 1.5rem',
            borderBottom: '1px solid var(--border)',
            opacity: visible['about-hero'] ? 1 : 0,
            transform: visible['about-hero'] ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="max-w-5xl mx-auto">
            <p className="text-annotation" style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--primary)', marginBottom: 16 }}>
              MOMO HOUSE {houseName.toUpperCase()}
            </p>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                color: 'var(--foreground)',
                letterSpacing: '-0.03em',
                lineHeight: 0.9,
                maxWidth: '14ch',
              }}
            >
              {/* TODO: Replace with real statement from owner interview */}
              PLACEHOLDER — {locale === 'fr' ? 'Une phrase forte, vraie, de l\'entretien propriétaire.' : 'A strong, true statement from the owner interview.'}
            </h1>
          </div>
        </section>

        {/* Chapters */}
        {chapters.map((chapter, i) => (
          <section
            key={chapter.id}
            id={`chapter-${chapter.id}`}
            ref={setRef(`chapter-${chapter.id}`)}
            style={{
              borderBottom: '1px solid var(--border)',
              padding: 'clamp(2.5rem, 6vw, 5rem) 1.5rem',
              opacity: visible[`chapter-${chapter.id}`] ? 1 : 0,
              transform: visible[`chapter-${chapter.id}`] ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            }}
          >
            <div className={`max-w-5xl mx-auto flex flex-col ${chapter.imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-start`}>
              {/* Image placeholder */}
              <div
                className="w-full md:w-5/12 flex-shrink-0"
                style={{
                  aspectRatio: '4/5',
                  backgroundColor: 'var(--secondary)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                }}
                role="img"
                aria-label={chapter.imagePlaceholder}
              >
                <p
                  className="text-annotation"
                  style={{ fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)', textAlign: 'center', lineHeight: 1.6 }}
                >
                  {chapter.imagePlaceholder}
                </p>
              </div>

              {/* Text */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--primary)', marginBottom: 12 }}>
                  0{i + 1}
                </p>
                <h2
                  className="font-display"
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--foreground)', letterSpacing: '-0.02em', marginBottom: 16 }}
                >
                  {locale === 'fr' ? chapter.titleFr : chapter.titleEn}
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', lineHeight: 1.7, maxWidth: '45ch' }}>
                  {locale === 'fr' ? chapter.bodyFr : chapter.bodyEn}
                </p>
              </div>
            </div>
          </section>
        ))}

        {/* Closing links */}
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 1.5rem', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${houseId}/carte`}
              className="text-annotation"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                padding: '14px 28px',
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              {locale === 'fr' ? 'VOIR LA CARTE →' : 'VIEW THE MENU →'}
            </Link>
            <Link
              href={`/${houseId}/contact`}
              className="text-annotation"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                padding: '14px 28px',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              {locale === 'fr' ? 'NOUS TROUVER →' : 'FIND US →'}
            </Link>
          </div>
        </section>

        {/* Sister house */}
        <section style={{ padding: '2rem 1.5rem' }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-annotation" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
              {locale === 'fr' ? 'NOTRE MAISON SŒUR' : 'OUR SISTER HOUSE'}
            </p>
            <Link
              href={`/${sisterHouseId}/a-propos`}
              className="text-annotation underline-expand"
              style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--primary)' }}
            >
              {locale === 'fr' ? `DÉCOUVRIR ${sisterHouseName.toUpperCase()} →` : `DISCOVER ${sisterHouseName.toUpperCase()} →`}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
