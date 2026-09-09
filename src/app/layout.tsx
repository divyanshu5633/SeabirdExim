import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#12372A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://seabirdexim.com'),
  title: {
    default: 'Seabird EXIM | Psyllium Husk Exporter from India',
    template: '%s | Seabird EXIM',
  },
  description:
    'Seabird EXIM connects global B2B buyers with quality-verified Indian Psyllium Husk (85% to 99% purity) and export-ready agricultural commodity supply. Sourcing & trade operations based in Surat, Gujarat.',
  keywords: [
    'Psyllium Husk Exporter India',
    'Plantago ovata supplier',
    'Psyllium Husk 95 purity',
    'Psyllium Husk 99 purity',
    'Bulk Psyllium Husk export',
    'Organic Psyllium Husk India',
    'Psyllium dietary fiber B2B',
    'Seabird EXIM Surat Gujarat',
  ],
  authors: [{ name: 'Seabird EXIM', url: 'https://seabirdexim.com' }],
  creator: 'Seabird EXIM',
  publisher: 'Seabird EXIM',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'Seabird EXIM | Psyllium Husk Exporter from India',
    description:
      'Specification-focused Psyllium Husk sourcing and bulk export solutions from India to international food, nutraceutical, and pharmaceutical buyers.',
    url: 'https://seabirdexim.com',
    siteName: 'Seabird EXIM',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seabird EXIM | Psyllium Husk Exporter from India',
    description:
      'Quality from India. Built for Global Buyers. Specification-focused Psyllium Husk export solutions.',
  },
  alternates: {
    canonical: 'https://seabirdexim.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      data-scroll-behavior="smooth" 
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} scroll-smooth`}
    >
      <body 
        suppressHydrationWarning 
        className="min-h-screen flex flex-col bg-ivory text-charcoal antialiased selection:bg-forest selection:text-ivory"
      >
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 pt-[72px] pb-16 lg:pb-0">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Sticky Mobile Conversion Bar */}
        <StickyMobileCTA />
      </body>
    </html>
  );
}
