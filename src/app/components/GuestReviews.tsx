'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

const StarRating = ({ rating, visible, delay }: { rating: number; visible: boolean; delay: number }) => (
  <div
    className="flex gap-1 mb-5"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    }}
    aria-label={`${rating} out of 5 stars`}
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        aria-hidden="true"
      >
        <polygon
          points="5,0.5 6.18,3.82 9.76,3.82 6.9,5.9 7.94,9.24 5,7.2 2.06,9.24 3.1,5.9 0.24,3.82 3.82,3.82"
          fill={i < rating ? 'var(--primary)' : 'var(--border)'}
        />
      </svg>
    ))}
  </div>
);

export default function GuestReviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  const reviews = t?.reviews?.items ?? [];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--charcoal)' }}
      aria-label="Guest reviews"
    >
      {/* Ghost watermark */}
      <div
        className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display uppercase"
          style={{
            fontSize: 'clamp(6rem, 22vw, 20rem)',
            lineHeight: 0.85,
            color: 'var(--primary-foreground)',
            opacity: 0.018,
            letterSpacing: '-0.06em',
            whiteSpace: 'nowrap',
            paddingRight: '2vw',
            paddingBottom: '0',
          }}
        >
          GUESTS
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Header row */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div>
            <span className="text-annotation block mb-4" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
              {t?.reviews?.label}
            </span>
            <h2
              className="font-display uppercase"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 8rem)',
                color: 'var(--primary-foreground)',
                lineHeight: 0.85,
                letterSpacing: '-0.04em',
              }}
            >
              {t?.reviews?.headline1}
              <br />
              <span style={{ color: 'var(--primary)' }}>{t?.reviews?.headline2}</span>
            </h2>
          </div>

          {/* Aggregate score pill */}
          <div
            className="flex items-center gap-3 self-start md:self-auto"
            style={{
              border: '1px solid rgba(245,240,232,0.12)',
              padding: '10px 18px',
              opacity: visible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
          >
            <span
              className="font-display"
              style={{ fontSize: '2.2rem', color: 'var(--primary)', lineHeight: 1, letterSpacing: '-0.04em' }}
            >
              4.9
            </span>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <polygon
                      points="5,0.5 6.18,3.82 9.76,3.82 6.9,5.9 7.94,9.24 5,7.2 2.06,9.24 3.1,5.9 0.24,3.82 3.82,3.82"
                      fill="var(--primary)"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-annotation" style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.5rem' }}>
                {t?.reviews?.aggregateLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Reviews grid — asymmetric bento layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-px" style={{ border: '1px solid rgba(245,240,232,0.08)', backgroundColor: 'rgba(245,240,232,0.08)' }}>
          {reviews.map((review: { quote: string; author: string; location: string; rating: number; tag: string }, i: number) => {
            // Asymmetric column spans: 5 / 7 / 4 / 8 alternating
            const spans = ['md:col-span-5', 'md:col-span-7', 'md:col-span-8', 'md:col-span-4'];
            const span = spans[i % spans.length];
            const isLarge = i % 4 === 1 || i % 4 === 2;

            return (
              <div
                key={i}
                className={`${span} relative group`}
                style={{
                  backgroundColor: 'var(--charcoal)',
                  padding: isLarge ? 'clamp(2rem, 4vw, 3.5rem)' : 'clamp(1.5rem, 3vw, 2.5rem)',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s`,
                }}
              >
                {/* Hover accent line */}
                <div
                  className="absolute top-0 left-0 w-0 group-hover:w-full h-px"
                  style={{
                    backgroundColor: 'var(--primary)',
                    transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  aria-hidden="true"
                />

                {/* Tag */}
                <span
                  className="text-annotation block mb-5"
                  style={{ color: 'rgba(245,240,232,0.25)', fontSize: '0.5rem', letterSpacing: '0.25em' }}
                >
                  {review.tag}
                </span>

                {/* Stars */}
                <StarRating rating={review.rating} visible={visible} delay={0.15 + i * 0.08} />

                {/* Opening quote mark */}
                <div
                  aria-hidden="true"
                  className="font-display"
                  style={{
                    fontSize: isLarge ? '5rem' : '3.5rem',
                    color: 'var(--primary)',
                    lineHeight: 0.6,
                    marginBottom: '0.5rem',
                    opacity: 0.6,
                    letterSpacing: '-0.04em',
                  }}
                >
                  "
                </div>

                {/* Quote */}
                <blockquote
                  style={{
                    fontSize: isLarge ? 'clamp(1rem, 1.8vw, 1.35rem)' : 'clamp(0.875rem, 1.4vw, 1.05rem)',
                    lineHeight: 1.65,
                    color: 'rgba(245,240,232,0.75)',
                    fontWeight: 300,
                    letterSpacing: '0.01em',
                    fontStyle: 'italic',
                    margin: 0,
                  }}
                >
                  {review.quote}
                </blockquote>

                {/* Attribution */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px w-5" style={{ backgroundColor: 'var(--primary)', opacity: 0.6 }} aria-hidden="true" />
                  <div>
                    <span
                      className="text-annotation block"
                      style={{ color: 'var(--primary-foreground)', fontSize: '0.6rem', letterSpacing: '0.15em' }}
                    >
                      {review.author}
                    </span>
                    <span
                      className="text-mono-sm block mt-0.5"
                      style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.5rem' }}
                    >
                      {review.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div
          className="mt-8 flex items-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
          }}
        >
          <div className="h-px w-8" style={{ backgroundColor: 'var(--primary)', opacity: 0.5 }} aria-hidden="true" />
          <span className="text-annotation" style={{ color: 'rgba(245,240,232,0.25)', fontSize: '0.5rem', letterSpacing: '0.2em' }}>
            {t?.reviews?.footerNote}
          </span>
        </div>
      </div>
    </section>
  );
}
