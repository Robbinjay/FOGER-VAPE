import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/lib/cart-context';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import JsonLd from '@/components/JsonLd';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Foger Vape Distributor | Authentic Bit 35K & Switch Pro',
    template: '%s | Foger Vape Distributor'
  },
  description: 'Authorized distributor of authentic Foger Vape products. Shop Foger Bit 35K, Switch Pro Kits, and replacement pods. 100% genuine guaranteed with fast shipping.',
  keywords: ['foger vape', 'foger vape flavors', 'foger', 'foggers vape', 'foger vape near me', 'foger vapes', 'foger vape refill', 'Foger Bit 35K', 'Foger Switch Pro'],
  authors: [{ name: 'Foger Vapes Distributor' }],
  creator: 'Foger Vapes Distributor',
  publisher: 'Foger Vapes Distributor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://foger-vapes.store',
    siteName: 'Foger Vapes Distributor',
    title: 'Foger Vapes Distributor | Authentic Bit 35K & Switch Pro',
    description: 'Authorized distributor of authentic Foger Vape products. 100% genuine guaranteed.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Foger Vapes Distributor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foger Vapes Distributor | Authentic Bit 35K & Switch Pro',
    description: 'Authorized distributor of authentic Foger Vape products. 100% genuine guaranteed.',
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
