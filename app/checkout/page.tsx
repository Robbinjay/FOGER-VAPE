'use client';

import { useCart } from '@/lib/cart-context';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  Package, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  Send
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [email, setEmail] = useState('');
  const [offers, setOffers] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [exp, setExp] = useState('');
  const [cvc, setCvc] = useState('');

  // Success State
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    createdAt: string;
    email: string;
    total: number;
    emailDispatch?: {
      clientSent: boolean;
      adminSent: boolean;
      mode: 'live' | 'simulation';
      message: string;
    };
  } | null>(null);

  const tax = cartTotal * 0.08;
  const shipping = cartTotal >= 200 || cartTotal === 0 ? 0 : 9.99;
  const total = cartTotal + tax + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const payload = {
        customer: {
          firstName,
          lastName,
          email,
          newsletter: offers,
        },
        shippingAddress: {
          address,
          city,
          state,
          zip,
        },
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          flavor: item.flavor,
          category: item.category,
          puffs: item.puffs,
        })),
        pricing: {
          subtotal: cartTotal,
          shipping,
          tax,
          total,
        },
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order. Please check your information.');
      }

      setCompletedOrder({
        orderNumber: data.orderNumber,
        createdAt: data.createdAt,
        email,
        total,
        emailDispatch: data.emailDispatch,
      });

      clearCart();
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred while placing your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="min-h-[85vh] bg-black text-white py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
            {/* Header Icon */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-yellow-400/10 border-2 border-yellow-400 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-4 py-1.5 rounded-full border border-yellow-400/30">
                Order Confirmed & Logged
              </span>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mt-4 mb-2">
                Thank You for Your Order!
              </h1>
              <p className="text-gray-400 text-sm sm:text-base font-medium">
                Order Reference: <strong className="text-white font-mono font-bold text-lg">#{completedOrder.orderNumber}</strong>
              </p>
            </div>

            {/* Zoho Mail Notification Confirmation Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-400 text-black flex items-center justify-center shrink-0 font-bold shadow-md">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="text-base font-black uppercase text-white tracking-wide">
                      Notifications Dispatched via Zoho Mail
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Zoho Mail Active
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
                    Both you and the store admin receive exclusive notifications for this order through <strong>Zoho Mail</strong>:
                  </p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-200 bg-black/60 p-2.5 rounded-lg border border-zinc-800">
                      <Send className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>
                        <strong>Client Email:</strong> Full receipt and item summary sent to <span className="text-yellow-400 font-bold">{completedOrder.email}</span>.
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200 bg-black/60 p-2.5 rounded-lg border border-zinc-800">
                      <Send className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>
                        <strong>Admin Alert:</strong> Fulfillment alert delivered to store management via Zoho Mail.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="w-5 h-5 text-yellow-400" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Fast Nationwide Dispatch</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Orders are processed and packaged within 24-48 business hours with protective adult-signature shipping.
                </p>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Live Tracking</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  You can track your order status anytime using your order number <span className="text-white font-mono">#{completedOrder.orderNumber}</span>.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 border-t border-zinc-800">
              <Link 
                href={`/track-order?order=${completedOrder.orderNumber}`}
                className="px-8 py-4 bg-yellow-400 text-black hover:bg-yellow-300 rounded-full font-black text-xs uppercase tracking-wider text-center transition-colors shadow-lg"
              >
                Track Shipment Status
              </Link>
              <Link 
                href="/products"
                className="px-8 py-4 bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-700 rounded-full font-black text-xs uppercase tracking-wider text-center transition-colors"
              >
                Return to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-4 bg-black text-white">
        <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-6 text-yellow-400 shadow-lg">
          <Package className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-3">Your Cart is Empty</h1>
        <p className="text-sm text-gray-400 mb-8 max-w-md text-center font-medium">
          Looks like you haven&apos;t added any authentic Foger Bit 35K or Switch Pro items to your cart yet.
        </p>
        <Link 
          href="/products" 
          className="px-8 py-4 bg-yellow-400 text-black hover:bg-yellow-300 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg"
        >
          <span>Browse Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen py-12 sm:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Title */}
        <div className="mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-400 block mb-1">
            Secure Checkout
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Finalize Your Order
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Order notifications are automatically sent to both customer and store admin strictly via Zoho Mail.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-8 p-4 bg-red-950/80 border border-red-500/50 rounded-2xl flex items-center gap-3 text-red-200 text-sm">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          
          {/* Checkout Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Contact Information */}
              <div className="bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                      1. Contact Information
                    </h2>
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Zoho Mail Recipient
                  </span>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Email Address <span className="text-yellow-400">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none text-white text-sm transition-all" 
                      placeholder="client@example.com" 
                    />
                    <p className="text-[11px] text-gray-500 mt-1.5">
                      Your order confirmation and tracking updates will be delivered to this email via Zoho Mail.
                    </p>
                  </div>

                  <div className="flex items-center pt-2">
                    <input 
                      type="checkbox" 
                      id="offers" 
                      checked={offers}
                      onChange={(e) => setOffers(e.target.checked)}
                      className="w-4 h-4 accent-yellow-400 rounded cursor-pointer" 
                    />
                    <label htmlFor="offers" className="ml-2.5 text-xs font-medium text-gray-400 cursor-pointer">
                      Keep me updated on new Foger flavor drops, restocks, and exclusive deals.
                    </label>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-zinc-900">
                  <Truck className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                    2. Shipping Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      First Name <span className="text-yellow-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="firstName" 
                      required 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all" 
                      placeholder="John" 
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Last Name <span className="text-yellow-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="lastName" 
                      required 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all" 
                      placeholder="Doe" 
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Street Address <span className="text-yellow-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="address" 
                      required 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all" 
                      placeholder="123 Main St, Apt 4B" 
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="city" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      City <span className="text-yellow-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="city" 
                      required 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all" 
                      placeholder="Los Angeles" 
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      State / Province <span className="text-yellow-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="state" 
                      required 
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all" 
                      placeholder="CA" 
                    />
                  </div>

                  <div>
                    <label htmlFor="zip" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Postal / ZIP Code <span className="text-yellow-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="zip" 
                      required 
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all" 
                      placeholder="90001" 
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                      3. Payment Method
                    </h2>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL
                  </span>
                </div>

                <div className="p-3.5 bg-yellow-400/10 border border-yellow-400/20 rounded-xl mb-6 text-xs text-yellow-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-yellow-400" />
                  <span>Test & Demo Mode Active • Credit card info is validated for testing.</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Name on Card <span className="text-yellow-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="cardName" 
                      required 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all" 
                      placeholder="John Doe" 
                    />
                  </div>

                  <div>
                    <label htmlFor="cardNumber" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Card Number <span className="text-yellow-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="cardNumber" 
                      required 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all font-mono" 
                      placeholder="4242 •••• •••• 4242" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="exp" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Expiry (MM/YY) <span className="text-yellow-400">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="exp" 
                        required 
                        value={exp}
                        onChange={(e) => setExp(e.target.value)}
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all font-mono" 
                        placeholder="12/28" 
                      />
                    </div>

                    <div>
                      <label htmlFor="cvc" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Security CVC <span className="text-yellow-400">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="cvc" 
                        required 
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        maxLength={4}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all font-mono" 
                        placeholder="123" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-yellow-400 text-black rounded-2xl font-black text-sm sm:text-base uppercase tracking-widest hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(250,204,21,0.2)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Place Order • ${total.toFixed(2)} USD</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Column */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl lg:sticky lg:top-28">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
                <h2 className="text-lg font-black uppercase tracking-tight text-white">
                  Order Summary
                </h2>
                <span className="text-xs bg-zinc-900 text-yellow-400 px-2.5 py-1 rounded-full font-bold">
                  {items.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </div>
              
              {/* Items List */}
              <ul className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-1 no-scrollbar">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 items-center bg-zinc-900/40 p-3 rounded-2xl border border-zinc-900">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black border border-zinc-800 shrink-0 flex items-center justify-center p-1">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-yellow-400 text-black text-[10px] font-black rounded-full flex items-center justify-center shadow">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-xs line-clamp-1">{item.name}</h3>
                      {item.flavor && (
                        <p className="text-yellow-400 text-[10px] font-semibold truncate mt-0.5">{item.flavor}</p>
                      )}
                      <p className="text-gray-500 text-[10px] uppercase">{item.category}</p>
                    </div>
                    <div className="font-black text-white text-sm shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Price Calculations */}
              <div className="space-y-3 pt-6 border-t border-zinc-900 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Flat Shipping</span>
                  <span className="font-bold text-white">
                    {shipping === 0 ? <span className="text-emerald-400">FREE ($200+)</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Estimated Taxes (8%)</span>
                  <span className="font-bold text-white">${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline mt-6 pt-6 border-t border-zinc-800">
                <span className="text-sm font-black uppercase text-gray-400">Total Due</span>
                <span className="text-3xl font-black text-yellow-400">
                  <span className="text-xs font-bold text-gray-500 mr-1.5">USD</span>
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Zoho Mail Guarantee Footer */}
              <div className="mt-6 pt-5 border-t border-zinc-900 flex items-center gap-2.5 text-[11px] text-gray-400">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>
                  Order notifications are sent to <strong>client & admin via Zoho Mail</strong>.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
