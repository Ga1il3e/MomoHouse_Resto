'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';
import { locations } from '@/data/locations';

const LOCATIONS = locations.map((loc) => ({
  id: loc.id,
  name: loc.name,
  address: `${loc.address}, ${loc.arrondissement}`,
  googleMapsUrl: loc.mapsUrl,
  // Query-based embeds avoid hard-coding unverified postcodes
  embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(
    `${loc.address}, ${loc.arrondissement}`,
  )}&output=embed`,
}));

// Single embed showing both locations
const COMBINED_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d4189.2!2d2.3483!3d48.8679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sMomo+House+Paris!5e0!3m2!1sen!2sfr!4v1699000000000!5m2!1sen!2sfr';

export default function ParisMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
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

  const currentEmbed = activeLocation
    ? LOCATIONS.find((l) => l.id === activeLocation)?.embedUrl ?? COMBINED_EMBED_URL
    : COMBINED_EMBED_URL;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Paris map — find Momo House locations"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <span className="text-annotation block mb-3" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
              {t?.map?.label}
            </span>
            <h2 className="font-display uppercase" style={{ fontSize: 'clamp(2.25rem, 6vw, 6rem)', color: 'var(--foreground)', lineHeight: 0.88, letterSpacing: '-0.04em' }}>
              {t?.map?.headline?.split('\n')?.map((line: string, i: number) => (
                <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
              ))}
            </h2>
          </div>
          <p className="md:max-w-[280px] font-editorial" style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--muted-foreground)', letterSpacing: '0.02em', opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}>
            {t?.map?.body}
          </p>
        </div>

        {/* Map + Locations */}
        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.9s ease 0.3s' }}>
          {/* Map image */}
          <div
            className="relative w-full overflow-hidden"
            style={{ height: '480px', border: '1px solid var(--border)' }}
          >
            <img
              src="/assets/images/image-1789038332971.png"
              alt="Paris map showing Momo House locations"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Location cards below map */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {LOCATIONS.map((loc) => (
              <a
                key={loc.id}
                href={loc.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 transition-all duration-300 group"
                style={{
                  border: `1px solid ${activeLocation === loc.id ? 'var(--primary)' : 'var(--border)'}`,
                  backgroundColor: activeLocation === loc.id ? 'rgba(200,16,46,0.03)' : 'transparent',
                  textDecoration: 'none',
                }}
                onMouseEnter={() => setActiveLocation(loc.id)}
                onMouseLeave={() => setActiveLocation(null)}
                aria-label={`Open ${loc.name} location in Google Maps`}
              >
                <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }} aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-annotation" style={{ color: 'var(--primary)', fontSize: '0.55rem', letterSpacing: '0.2em' }}>MOMO HOUSE</p>
                  <h3 className="font-display uppercase mt-0.5" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
                    {loc.name.toUpperCase()}
                  </h3>
                  <p className="font-editorial mt-1" style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', letterSpacing: '0.04em' }}>
                    {loc.address}
                  </p>
                </div>
                {/* Arrow indicator */}
                <div
                  className="flex-shrink-0 mt-1 transition-transform duration-300"
                  style={{ transform: activeLocation === loc.id ? 'translateX(4px)' : 'translateX(0)' }}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}