'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import StickyMobileCTA from './StickyMobileCTA';

export default function SiteLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/landing';

  if (isLandingPage) {
    return (
      <div className="min-h-screen w-full bg-black text-ivory">
        {children}
      </div>
    );
  }

  return (
    <>
      {/* Existing Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 pt-[72px] pb-16 lg:pb-0">
        {children}
      </main>

      {/* Existing Footer */}
      <Footer />

      {/* Existing Sticky Mobile Conversion Bar */}
      <StickyMobileCTA />
    </>
  );
}
