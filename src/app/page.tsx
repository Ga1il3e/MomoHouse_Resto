'use client';

import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ManifestoStrip from './components/ManifestoStrip';
import MomoSection from './components/MomoSection';
import CultureSection from './components/CultureSection';
import LocationSelector from './components/LocationSelector';
import ParisMap from './components/ParisMap';
import BrandStory from './components/BrandStory';
import GuestReviews from './components/GuestReviews';
import EditorialStories from './components/EditorialStories';
import InquiryForm from './components/InquiryForm';
import Footer from '@/components/Footer';
import CustomCursor from './components/CustomCursor';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.6s ease',
          pointerEvents: loading ? 'none' : 'all',
        }}
      >
        <CustomCursor />
        <Navbar />

        <main>
          <Hero />
          <ManifestoStrip />
          <MomoSection />
          <CultureSection />
          <LocationSelector />
          <ParisMap />
          <BrandStory />
          <GuestReviews />
          <EditorialStories />
          <InquiryForm />
        </main>

        <Footer />
      </div>
    </>
  );
}