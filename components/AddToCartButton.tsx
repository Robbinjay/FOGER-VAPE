'use client';

import { useState } from 'react';
import { ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { Product } from '@/lib/data';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <div className="flex items-center border-2 border-white/20 rounded-xl bg-black shrink-0 h-16 shadow-[0_0_20px_rgba(250,204,21,0.05)]">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-5 h-full text-gray-400 hover:text-[#facc15] hover:bg-white/5 transition-colors rounded-l-xl flex items-center justify-center"
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="w-16 text-center text-xl font-black text-white">{quantity}</span>
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className="px-5 h-full text-gray-400 hover:text-[#facc15] hover:bg-white/5 transition-colors rounded-r-xl flex items-center justify-center"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <button 
        onClick={handleAdd}
        className="flex-1 h-16 bg-[#facc15] text-black rounded-xl font-black text-lg hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(250,204,21,0.2)] hover:shadow-[0_0_40px_rgba(250,204,21,0.4)] flex items-center justify-center gap-3 uppercase tracking-widest"
      >
        <ShoppingBag className="w-6 h-6" />
        Add to Cart - ${(product.price * quantity).toFixed(2)}
      </button>
    </div>
  );
}
