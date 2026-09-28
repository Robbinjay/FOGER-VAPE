import { Suspense } from 'react';
import { Metadata } from 'next';
import { products } from '@/lib/data';
import { ProductsCatalog } from '@/components/ProductsCatalog';

export const metadata: Metadata = {
  title: 'Shop All Foger Vapes | Bit 35K, Switch Pro & Refill Pods',
  description: 'Browse the full collection of 30+ Foger Bit 35K Puffs flavors, Switch Pro rechargeable kits, and Foger vape refill pods. Authorized Foger distributor.',
  keywords: ['foger vape', 'foger vapes', 'foger vape flavors', 'foger bit 35k', 'foger switch pro', 'foger vape refill', 'foggers vape'],
};

export default function ProductsPage() {
  return (
    <div className="bg-black min-h-screen py-10 sm:py-16">
      <Suspense fallback={
        <div className="container mx-auto px-4 max-w-7xl py-20 text-center text-white">
          <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Loading Catalog...</p>
        </div>
      }>
        <ProductsCatalog initialProducts={products} />
      </Suspense>
    </div>
  );
}
