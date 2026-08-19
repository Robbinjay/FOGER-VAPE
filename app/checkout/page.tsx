'use client';

import { useCart } from '@/lib/cart-context';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const tax = cartTotal * 0.08;
  const shipping = cartTotal > 50 || cartTotal === 0 ? 0 : 5.99;
  const total = cartTotal + tax + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-sm">
          <ShieldCheck className="w-12 h-12" />
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center tracking-tight">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-10 text-center max-w-md leading-relaxed font-medium">
          Thank you for your purchase. Your order has been securely received and is now being processed.
        </p>
        <Link 
          href="/products"
          className="px-10 py-5 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-gray-50">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Your Cart is Empty</h1>
        <p className="text-lg text-gray-600 mb-8 font-medium">Looks like you haven&apos;t added anything to your cart yet.</p>
        <Link href="/products" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 flex items-center gap-2 transition-all shadow-sm">
          Browse Products <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Checkout Form */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-10 tracking-tight">Checkout</h1>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-wide">Contact Information</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email address</label>
                    <input type="email" id="email" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" placeholder="you@example.com" />
                  </div>
                  <div className="flex items-center mt-4">
                    <input type="checkbox" id="offers" className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600" />
                    <label htmlFor="offers" className="ml-3 text-sm font-medium text-gray-600">Keep me up to date on news and exclusive offers</label>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-wide">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">First name</label>
                    <input type="text" id="firstName" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-gray-50 focus:bg-white" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">Last name</label>
                    <input type="text" id="lastName" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-gray-50 focus:bg-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                    <input type="text" id="address" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="Street address or P.O. Box" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-2">City</label>
                    <input type="text" id="city" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-gray-50 focus:bg-white" />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-bold text-gray-700 mb-2">State / Province</label>
                    <input type="text" id="state" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-gray-50 focus:bg-white" />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-bold text-gray-700 mb-2">Postal code</label>
                    <input type="text" id="zip" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-gray-50 focus:bg-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-wide">Payment</h2>
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
                <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-xl mb-8 text-center">
                  <p className="text-sm text-indigo-800 font-bold tracking-wide uppercase">This is a secure demo checkout.</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-bold text-gray-700 mb-2">Name on card</label>
                    <input type="text" id="cardName" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-gray-50 focus:bg-white" />
                  </div>
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-bold text-gray-700 mb-2">Card number</label>
                    <input type="text" id="cardNumber" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="exp" className="block text-sm font-bold text-gray-700 mb-2">Exp (MM/YY)</label>
                      <input type="text" id="exp" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-bold text-gray-700 mb-2">CVC</label>
                      <input type="text" id="cvc" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center tracking-wide"
              >
                {isSubmitting ? (
                  <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Complete Order • ${total.toFixed(2)}</>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[450px] shrink-0">
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-wide">Order Summary</h2>
              
              <ul className="space-y-6 mb-8">
                {items.map(item => (
                  <li key={item.id} className="flex gap-5">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-950 border border-gray-200 shrink-0 flex items-center justify-center p-1">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 text-black text-xs font-black rounded-full flex items-center justify-center shadow">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug pr-2">{item.name}</h3>
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mt-1.5">{item.category}</p>
                    </div>
                    <div className="font-black text-gray-900 text-base flex items-center">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="space-y-4 pt-8 border-t border-gray-100 text-base">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Shipping</span>
                  <span className="font-bold text-gray-900">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Estimated taxes</span>
                  <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mt-8 pt-8 border-t border-gray-200">
                <span className="text-xl font-extrabold text-gray-900">Total</span>
                <span className="text-4xl font-black text-gray-900">
                  <span className="text-sm font-bold text-gray-400 mr-2 uppercase">USD</span>
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
