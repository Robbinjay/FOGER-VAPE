'use client';

import { useCart } from '@/lib/cart-context';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-md"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black">
              <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
                <ShoppingBag className="w-5 h-5 text-[#facc15]" /> Your Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-[#facc15] transition-colors rounded-full hover:bg-white/5"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-zinc-950">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                  <ShoppingBag className="w-16 h-16 text-gray-800" />
                  <p className="text-lg font-bold text-gray-600 uppercase tracking-widest">Your cart is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="px-8 py-3 bg-[#facc15] text-black rounded-full font-black uppercase tracking-widest hover:bg-yellow-300 transition-colors mt-4 shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map(item => (
                    <li key={item.id} className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0 flex items-center justify-center p-1">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="96px"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-black text-white line-clamp-1 pr-4 tracking-tight uppercase">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-[#facc15] font-black uppercase tracking-widest">{item.category}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-white/20 rounded-lg bg-black">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-colors rounded-l-lg"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-colors rounded-r-lg"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-black text-white">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 bg-black shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 font-bold uppercase tracking-widest">Subtotal</span>
                  <span className="text-3xl font-black text-[#facc15]">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-6 font-medium">Shipping, taxes, and discounts calculated at checkout.</p>
                <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                  <button className="w-full py-5 bg-[#facc15] text-black rounded-xl font-black text-lg hover:bg-yellow-300 transition-all shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] flex items-center justify-center gap-2 uppercase tracking-widest">
                    Checkout Now
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
