import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/lib/cart-context';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import JsonLd from '@/components/JsonLd';

import { getSiteUrl, siteConfig } from '@/lib/site-config';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Foger Vapes US | Authentic Bit 35K & Switch Pro Distributor',
    template: '%s | Foger Vapes US'
  },
  description: 'Authorized USA distributor of authentic Foger Vape products. Shop Foger Bit 35K, Switch Pro Kits, and replacement pods with fast US shipping.',
  keywords: ['foger vape', 'foger vape flavors', 'foger', 'foggers vape', 'foger vape near me', 'foger vapes', 'foger vape usa', 'Foger Bit 35K', 'Foger Switch Pro'],
  authors: [{ name: 'Foger Vapes US Distributor' }],
  creator: 'Foger Vapes US Distributor',
  publisher: 'Foger Vapes US Distributor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  other: {
    'geo.region': 'US',
    'geo.placename': 'United States',
    'distribution': 'United States',
    'rating': 'general',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Foger Vapes US (foger-vapes.store)',
    title: 'Foger Vapes US | Authentic Bit 35K & Switch Pro Distributor',
    description: 'Authorized USA distributor of authentic Foger Vape products. 100% genuine guaranteed with fast US shipping.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Foger Vapes US Distributor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foger Vapes US | Authentic Bit 35K & Switch Pro Distributor',
    description: 'Authorized USA distributor of authentic Foger Vape products. 100% genuine guaranteed with fast US shipping.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col min-h-screen bg-black text-white antialiased selection:bg-[#facc15] selection:text-black" suppressHydrationWarning>
        <CartProvider>
          <JsonLd />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
