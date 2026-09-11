import React from 'react';
import type { Metadata } from 'next';
import CinematicFilmExperience from '@/components/landing/CinematicFilmExperience';

export const metadata: Metadata = {
  title: 'Seabird EXIM | Global Trade Gateway',
  description:
    'Experience the cinematic journey of international trade. Seabird EXIM connects Indian agricultural commodities and export operations with global markets across 40+ countries.',
  openGraph: {
    title: 'Seabird EXIM | Global Trade Journey & Gateway',
    description:
      'A cinematic visual journey of export and ocean transport: Connecting Indian commodities with global buyers.',
    url: 'https://seabirdexim.com/landing',
    siteName: 'Seabird EXIM',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://seabirdexim.com/landing',
  },
};

export default function LandingPage() {
  return <CinematicFilmExperience />;
}
