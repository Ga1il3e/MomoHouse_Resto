import React from 'react';

const TICKER_ITEMS = [
  'HANDMADE',
  'NEPAL',
  'TIBET',
  'PARIS',
  'MOMOS',
  'STEAMED',
  'FRIED',
  'SPICY',
  'SOUP',
  'DEUX MAISONS',
  'AUTHENTIQUE',
  'FAIT MAISON',
  'KATHMANDU',
  'MONTMARTRE',
  'POISSONNIÈRE',
];

export default function ManifestoStrip() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section
      className="overflow-hidden py-4"
      style={{ backgroundColor: 'var(--primary)' }}
      aria-label="Momo House — handmade Nepalese and Tibetan dumplings in Paris"
    >
      <div className="ticker-track ticker-animate select-none" aria-hidden="true">
        {items?.map((item, i) => (
          <span
            key={i}
            className="text-ticker inline-flex items-center gap-6 pr-6"
            style={{ color: 'var(--primary-foreground)' }}
          >
            {item}
            <span style={{ opacity: 0.5, fontSize: '0.4rem' }}>◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}