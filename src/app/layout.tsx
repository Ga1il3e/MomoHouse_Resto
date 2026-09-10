import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/tailwind.css';
import { LanguageProvider } from '@/context/LanguageContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Momo House — Nepalese & Tibetan Restaurant in Paris',
  description: 'Momo House brings handmade Nepalese and Tibetan dumplings to the heart of Paris. Two locations: Montmartre and Poissonnière. Steamed, fried, soup, and spicy momos made fresh every day.',
  openGraph: {
    title: 'Momo House — Two Houses, One World',
    description: 'Handmade Nepalese & Tibetan dumplings in Paris. Choose your house: Montmartre or Poissonnière.',
    type: 'website',
    locale: 'en_FR',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className={plusJakartaSans.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
</body>
    </html>
  );
}