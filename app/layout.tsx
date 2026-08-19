import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/lib/cart-context';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Foger Vapes | Premium SEO eCommerce',
  description: 'Production-Ready SEO eCommerce Website for fogervapes.org featuring optimized product pages and lightning-fast speeds.',
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
