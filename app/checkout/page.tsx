'use client';

import { useCart } from '@/lib/cart-context';
import { 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  Package, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  Send,
  Zap,
  Coins,
  Smartphone,
  Copy,
  Check,
  Globe,
  Clock,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type PaymentType = 'APPLE_PAY' | 'CRYPTO' | 'CHIME';

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  icon: typeof Truck;
  badge?: string;
  isSameDay?: boolean;
}

const SHIPPING_TIERS: ShippingOption[] = [
  {
    id: 'normal',
    name: 'Standard Shipping (Normal)',
    description: 'Standard carrier ground transit (3-5 business days). Eligible for FREE shipping on orders over $200.',
    basePrice: 9.99,
    icon: Truck,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Expedited air priority handling (1-2 business days). Flat rate $30.00 (Exempt from free shipping waiver).',
    basePrice: 30.00,
    icon: Zap,
    badge: 'Popular',
  },
  {
    id: 'international',
    name: 'International Shipping',
    description: 'Worldwide tracked door-to-door delivery. Flat rate $40.00 (Exempt from free shipping waiver).',
    basePrice: 40.00,
    icon: Globe,
  },
  {
    id: 'same-day',
    name: 'Ultra Fast Same Day Shipping',
    description: 'Priority warehouse processing & immediate courier dispatch. Flat rate $70.00 (Exempt from free shipping waiver).',
    basePrice: 70.00,
    icon: Clock,
    badge: '⚡ Ultra Fast',
    isSameDay: true,
  },
];

export default function CheckoutPage() {
  const { items, cartTotal, clearCart, isLoaded } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Customer Contact & Shipping Information
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('United States');
  const [orderNotes, setOrderNotes] = useState('');
  const [offers, setOffers] = useState(true);

  // Selected Shipping Method
  const [selectedShippingId, setSelectedShippingId] = useState<string>('normal');

  // Selected Payment Method
  const [selectedPayment, setSelectedPayment] = useState<PaymentType>('APPLE_PAY');

  // Payment Specific State
  const [cryptoCoin, setCryptoCoin] = useState<'BTC' | 'USDT' | 'ETH'>('USDT');
  const [cryptoTxHash, setCryptoTxHash] = useState('');
  const [chimeHandle, setChimeHandle] = useState('');
  const [applePayAuthorized, setApplePayAuthorized] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Success State
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    createdAt: string;
    email: string;
    shippingName: string;
    paymentLabel: string;
    total: number;
  } | null>(null);

  // Pricing Calculations
  const MINIMUM_ORDER = 100.00;
  const FREE_SHIPPING_THRESHOLD = 200.00;
  const isMinimumMet = cartTotal >= MINIMUM_ORDER;
  const isFreeShippingEligible = cartTotal >= FREE_SHIPPING_THRESHOLD;

  const currentShippingOption = SHIPPING_TIERS.find((s) => s.id === selectedShippingId) || SHIPPING_TIERS[0];
  
  // Free shipping ($200+ subtotal) is strictly available ONLY for Standard/Normal shipping ($9.99 waived).
  // Express ($30.00), International ($40.00), and Ultra Fast Same Day ($70.00) are NEVER free.
  const isStandardShipping = currentShippingOption.id === 'normal';
  const isFreeShippingApplied = isStandardShipping && isFreeShippingEligible;
  
  const shippingFee = isFreeShippingApplied 
    ? 0 
    : currentShippingOption.basePrice;

  const tax = cartTotal * 0.08;
  const total = cartTotal + tax + shippingFee;

  const cryptoWallets = {
    BTC: 'bc1qfoger98x27vape834k9811authentickit729',
    USDT: 'TKhFogerVapesOfficialTRC20Network9381k72P',
    ETH: '0x71F09E839Da5F84b39FogerVapesDistributor01',
  };

  const handleCopyWallet = (addressToCopy: string) => {
    navigator.clipboard.writeText(addressToCopy);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isMinimumMet) {
      setErrorMessage(`Minimum order amount is $100.00. Please add $${(MINIMUM_ORDER - cartTotal).toFixed(2)} more to checkout.`);
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('Please provide a contact phone number for carrier delivery.');
      return;
    }

    setIsSubmitting(true);

    try {
      let paymentLabel = 'Apple Pay (Manual)';
      let paymentRef = 'Manual Payment - Email Instructions Pending';
      let paymentDetails = 'Place order, an email will be sent with payment instructions to complete payment for order.';

      if (selectedPayment === 'CRYPTO') {
        paymentLabel = `Crypto (${cryptoCoin}) (Manual)`;
        paymentRef = cryptoTxHash.trim() || `Manual ${cryptoCoin} Transfer`;
        paymentDetails = 'Place order, an email will be sent with payment instructions to complete payment for order.';
      } else if (selectedPayment === 'CHIME') {
        paymentLabel = 'Chime (Manual)';
        paymentRef = chimeHandle.trim() || 'Manual Chime Transfer';
        paymentDetails = 'Place order, an email will be sent with payment instructions to complete payment for order.';
      }

      const payload = {
        customer: {
          firstName,
          lastName,
          email,
          phone,
          newsletter: offers,
        },
        shippingAddress: {
          address,
          city,
          state,
          zip,
          country,
          orderNotes,
        },
        shippingMethod: {
          id: currentShippingOption.id,
          name: currentShippingOption.name,
          price: shippingFee,
        },
        paymentMethod: {
          type: selectedPayment,
          label: paymentLabel,
          reference: paymentRef,
          details: paymentDetails,
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
          shipping: shippingFee,
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
        throw new Error(data.error || 'Failed to place order. Please review your information.');
      }

      setCompletedOrder({
        orderNumber: data.orderNumber,
        createdAt: data.createdAt,
        email,
        shippingName: currentShippingOption.name,
        paymentLabel,
        total,
      });

      clearCart();
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred while placing your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (completedOrder) {
    return (
      <div className="min-h-[85vh] bg-black text-white py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
            {/* Header Icon */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-yellow-400/10 border-2 border-yellow-400 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-4 py-1.5 rounded-full border border-yellow-400/30">
                Order Confirmed
              </span>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-4 mb-2">
                Thank You For Your Order!
              </h1>
              <p className="text-gray-400 text-sm sm:text-base font-medium">
                Order ID: <strong className="text-white font-mono text-lg">#{completedOrder.orderNumber}</strong>
              </p>
            </div>

            {/* Zoho Mail Dual-Notification Status */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-400 text-black flex items-center justify-center shrink-0 font-bold shadow-md">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="text-base font-black uppercase text-white tracking-wide">
                      Zoho Mail Notifications Dispatched
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-yellow-400 text-black px-2.5 py-1 rounded-full font-mono flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Payment Email Sent
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-yellow-400 font-bold leading-relaxed mb-3">
                    Place order, an email will be sent with payment instructions to complete payment for order.
                  </p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-200 bg-black/60 p-2.5 rounded-lg border border-zinc-800">
                      <Send className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>
                        <strong>Client Payment Instructions:</strong> We sent the itemized order summary and payment instructions to <span className="text-yellow-400 font-bold">{completedOrder.email}</span>. Please complete your payment using the instructions in the email.
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200 bg-black/60 p-2.5 rounded-lg border border-zinc-800">
                      <Send className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>
                        <strong>Admin Notification:</strong> Store administration notified of new pending order #{completedOrder.orderNumber} via Zoho Mail.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="w-5 h-5 text-yellow-400" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Selected Shipping</h4>
                </div>
                <p className="text-xs text-white font-bold">{completedOrder.shippingName}</p>
                <p className="text-[11px] text-gray-400 mt-1">Package prepared with required 21+ adult signature verification.</p>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Coins className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Payment Method</h4>
                </div>
                <p className="text-xs text-white font-bold">{completedOrder.paymentLabel}</p>
                <p className="text-[11px] text-gray-400 mt-1">Total: ${completedOrder.total.toFixed(2)} USD</p>
              </div>
            </div>

            {/* Action Buttons */}
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

  // LOADING STATE (Ensures 100% hydration consistency between SSR and Client)
  if (!isLoaded) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-4 bg-black text-white">
        <div className="w-12 h-12 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Loading Order...</p>
      </div>
    );
  }

  // EMPTY CART VIEW
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
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-yellow-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Express Checkout</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Complete Your Order
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Order notifications for client and store admin are delivered automatically via <strong>Zoho Mail</strong>.
          </p>
        </div>

        {/* MINIMUM ORDER AMOUNT WARNING ($100 MINIMUM) */}
        {!isMinimumMet && (
          <div className="mb-8 p-5 bg-amber-950/80 border-2 border-yellow-500 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-white uppercase text-sm tracking-wide">
                  Minimum Order Requirement: $100.00
                </h4>
                <p className="text-xs text-yellow-200/90 mt-1">
                  Your current subtotal is <strong>${cartTotal.toFixed(2)}</strong>. Please add <strong>${(MINIMUM_ORDER - cartTotal).toFixed(2)}</strong> more to proceed to payment.
                </p>
                {/* Progress Bar */}
                <div className="w-full sm:w-80 h-2 bg-black/60 rounded-full mt-3 overflow-hidden border border-yellow-500/30">
                  <div 
                    className="h-full bg-yellow-400 transition-all duration-300" 
                    style={{ width: `${Math.min(100, (cartTotal / MINIMUM_ORDER) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
            <Link 
              href="/products" 
              className="shrink-0 px-6 py-3 bg-yellow-400 text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-yellow-300 transition-colors flex items-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add More Products</span>
            </Link>
          </div>
        )}

        {/* FREE SHIPPING PROGRESS BANNER ($200 FREE SHIPPING) */}
        {isMinimumMet && !isFreeShippingEligible && (
          <div className="mb-8 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 text-gray-300">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>
                Add <strong>${(FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2)}</strong> more to unlock <strong>FREE Standard Shipping</strong>!
              </span>
            </div>
            <Link href="/products" className="text-yellow-400 font-bold hover:underline">
              Add Items &rsaquo;
            </Link>
          </div>
        )}

        {isFreeShippingEligible && (
          <div className="mb-8 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Free Shipping Unlocked!</strong> Your order qualifies for free <strong>Standard Shipping</strong> ($9.99 waived). Express and Ultra Fast shipping remain available at their regular rates.
            </span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-8 p-4 bg-red-950/80 border border-red-500/50 rounded-2xl flex items-center gap-3 text-red-200 text-sm">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          
          {/* Main Checkout Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* 1. Customer Information */}
              <div className="bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                      1. Customer Information
                    </h2>
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Recipient Details
                  </span>
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

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Email Address (For Zoho Mail Confirmation) <span className="text-yellow-400">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all" 
                      placeholder="client@example.com" 
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Phone Number (For Delivery & Chime Matching) <span className="text-yellow-400">*</span>
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all" 
                      placeholder="(555) 000-0000" 
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
                      placeholder="123 Main Street, Apt 4B" 
                    />
                  </div>

                  <div>
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

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="state" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        State <span className="text-yellow-400">*</span>
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
                        ZIP Code <span className="text-yellow-400">*</span>
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

                  <div className="sm:col-span-2">
                    <label htmlFor="country" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Country
                    </label>
                    <input 
                      type="text" 
                      id="country" 
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all" 
                      placeholder="United States" 
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="orderNotes" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Order Notes (Optional)
                    </label>
                    <input 
                      type="text" 
                      id="orderNotes" 
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-yellow-400 outline-none text-white text-sm transition-all" 
                      placeholder="Gate code, specific delivery instructions, etc." 
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Options Selection */}
              <div className="bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                      2. Select Shipping Method
                    </h2>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    {isFreeShippingEligible ? 'Free Standard Shipping Unlocked ($200+)' : 'Free Standard Shipping on $200+'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SHIPPING_TIERS.map((tier) => {
                    const isSelected = selectedShippingId === tier.id;
                    const tierIcon = tier.icon;
                    const IconComponent = tierIcon;

                    // Free shipping strictly applies to Standard/Normal shipping only, never Express, International, or Ultra
                    const isTierStandard = tier.id === 'normal';
                    const effectivePrice = (isTierStandard && isFreeShippingEligible) ? 0 : tier.basePrice;

                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedShippingId(tier.id)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-zinc-900 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.15)] ring-1 ring-yellow-400'
                            : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                        }`}
                      >
                        {tier.badge && (
                          <span className={`absolute top-3 right-3 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                            tier.isSameDay 
                              ? 'bg-red-500 text-white animate-pulse' 
                              : 'bg-yellow-400 text-black'
                          }`}>
                            {tier.badge}
                          </span>
                        )}

                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-yellow-400 text-black font-black' : 'bg-black text-gray-400'
                            }`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <h4 className="font-extrabold text-sm text-white uppercase tracking-tight">
                              {tier.name}
                            </h4>
                          </div>

                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {tier.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                          <span className="text-xs text-gray-400 font-medium">Delivery Rate:</span>
                          <span className="text-base font-black text-white">
                            {effectivePrice === 0 ? (
                              <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                                <Check className="w-4 h-4" /> FREE
                              </span>
                            ) : (
                              `$${effectivePrice.toFixed(2)}`
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Payment Method: APPLE PAY, CRYPTO, CHIME (Manual Payments) */}
              <div className="bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-900">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                      3. Select Payment Option
                    </h2>
                  </div>
                  <span className="text-[11px] font-black text-yellow-400 uppercase tracking-wider bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                    Manual Payment
                  </span>
                </div>

                {/* Prominent Payment Description Banner */}
                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-4 mb-6 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-black uppercase text-yellow-400 tracking-wider">
                      Payment Instructions
                    </div>
                    <p className="text-sm font-bold text-white mt-0.5 leading-snug">
                      Place order, an email will be sent with payment instructions to complete payment for order.
                    </p>
                  </div>
                </div>

                {/* Payment Option Selector Tabs */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {/* APPLE PAY */}
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('APPLE_PAY')}
                    className={`py-4 px-3 rounded-2xl border font-black text-xs uppercase tracking-wider flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      selectedPayment === 'APPLE_PAY'
                        ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                        : 'bg-zinc-900 text-gray-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span>Apple Pay</span>
                    <span className="text-[9px] opacity-75 font-semibold">Manual</span>
                  </button>

                  {/* CRYPTO */}
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('CRYPTO')}
                    className={`py-4 px-3 rounded-2xl border font-black text-xs uppercase tracking-wider flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      selectedPayment === 'CRYPTO'
                        ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)]'
                        : 'bg-zinc-900 text-gray-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <Coins className="w-5 h-5" />
                    <span>Crypto</span>
                    <span className="text-[9px] opacity-75 font-semibold">Manual</span>
                  </button>

                  {/* CHIME */}
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('CHIME')}
                    className={`py-4 px-3 rounded-2xl border font-black text-xs uppercase tracking-wider flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      selectedPayment === 'CHIME'
                        ? 'bg-emerald-400 text-black border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.2)]'
                        : 'bg-zinc-900 text-gray-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <Zap className="w-5 h-5" />
                    <span>Chime</span>
                    <span className="text-[9px] opacity-75 font-semibold">Manual</span>
                  </button>
                </div>

                {/* MANUAL PAYMENT METHOD DETAILS */}

                {/* APPLE PAY PANEL */}
                {selectedPayment === 'APPLE_PAY' && (
                  <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-white" />
                        <span className="font-extrabold text-sm uppercase text-white">Apple Pay (Manual Payment)</span>
                      </div>
                      <span className="text-[10px] bg-white/20 text-white font-black px-2.5 py-0.5 rounded-full uppercase border border-white/30">
                        Manual Processing
                      </span>
                    </div>

                    <div className="bg-black/80 p-4 rounded-xl border border-zinc-800">
                      <p className="text-xs sm:text-sm font-bold text-yellow-400 leading-relaxed">
                        Place order, an email will be sent with payment instructions to complete payment for order.
                      </p>
                      <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                        After Placing your order, we will send an email with our Apple Pay recipient contact details and your unique Order Reference. You will send payment manually from your Apple device.
                      </p>
                    </div>

                    <div className="p-4 bg-black rounded-xl border border-zinc-800 flex items-center justify-between">
                      <div className="text-xs text-gray-400">Total Order Amount to Pay:</div>
                      <div className="text-xl font-black text-white">${total.toFixed(2)} USD</div>
                    </div>
                  </div>
                )}

                {/* CRYPTO PANEL */}
                {selectedPayment === 'CRYPTO' && (
                  <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-yellow-400" />
                        <span className="font-extrabold text-sm uppercase text-yellow-400">Crypto (Manual Payment)</span>
                      </div>
                      <span className="text-[10px] bg-yellow-400/20 text-yellow-400 font-black px-2.5 py-0.5 rounded-full uppercase border border-yellow-400/30">
                        Manual Processing
                      </span>
                    </div>

                    <div className="bg-black/80 p-4 rounded-xl border border-zinc-800">
                      <p className="text-xs sm:text-sm font-bold text-yellow-400 leading-relaxed">
                        Place order, an email will be sent with payment instructions to complete payment for order.
                      </p>
                      <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                        After Placing your order, we will send an email with our Crypto recipient contact details and your unique Order Reference. You will send payment manually from your crypto wallet.
                      </p>
                    </div>

                    {/* Preferred Coin Selector */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Preferred Cryptocurrency:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['USDT', 'BTC', 'ETH'] as const).map((coin) => (
                          <button
                            key={coin}
                            type="button"
                            onClick={() => setCryptoCoin(coin)}
                            className={`py-2 px-3 rounded-xl text-xs font-black uppercase transition-all ${
                              cryptoCoin === coin
                                ? 'bg-yellow-400 text-black shadow-md'
                                : 'bg-black text-gray-300 border border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            {coin}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-black rounded-xl border border-zinc-800 flex items-center justify-between">
                      <div className="text-xs text-gray-400">Total Order Amount to Pay:</div>
                      <div className="text-xl font-black text-yellow-400">${total.toFixed(2)} USD</div>
                    </div>
                  </div>
                )}

                {/* CHIME PANEL */}
                {selectedPayment === 'CHIME' && (
                  <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-400" />
                        <span className="font-extrabold text-sm uppercase text-white">Chime (Manual Payment)</span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-black px-2.5 py-0.5 rounded-full uppercase border border-emerald-500/30">
                        Manual Processing
                      </span>
                    </div>

                    <div className="bg-black/80 p-4 rounded-xl border border-zinc-800">
                      <p className="text-xs sm:text-sm font-bold text-yellow-400 leading-relaxed">
                        Place order, an email will be sent with payment instructions to complete payment for order.
                      </p>
                      <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                        After Placing your order, we will send an email with our Chime recipient contact details and your unique Order Reference. You will send payment manually from your Chime app.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="chimeHandle" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Your Chime Sign ($tag) or Phone (Optional reference)
                      </label>
                      <input
                        type="text"
                        id="chimeHandle"
                        value={chimeHandle}
                        onChange={(e) => setChimeHandle(e.target.value)}
                        placeholder="e.g. $YourName or (555) 123-4567"
                        className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 text-white text-sm outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div className="p-4 bg-black rounded-xl border border-zinc-800 flex items-center justify-between">
                      <div className="text-xs text-gray-400">Total Order Amount to Pay:</div>
                      <div className="text-xl font-black text-emerald-400">${total.toFixed(2)} USD</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="space-y-3">
                <button 
                  type="submit" 
                  disabled={isSubmitting || !isMinimumMet}
                  className={`w-full py-5 rounded-2xl font-black text-base sm:text-lg uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(250,204,21,0.2)] flex items-center justify-center gap-3 cursor-pointer ${
                    !isMinimumMet
                      ? 'bg-zinc-800 text-gray-500 cursor-not-allowed shadow-none'
                      : 'bg-yellow-400 text-black hover:bg-yellow-300'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
                  ) : !isMinimumMet ? (
                    <span>Minimum $100.00 Required to Order</span>
                  ) : (
                    <>
                      <span>Place Order • ${total.toFixed(2)} USD</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs font-bold text-yellow-400/90 leading-relaxed px-2">
                  Place order, an email will be sent with payment instructions to complete payment for order.
                </p>

                <div className="text-center text-xs text-gray-500 pt-1">
                  🔒 All orders protected by 256-bit SSL encryption. Zoho Mail order receipt sent immediately upon placement.
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Sticky Column */}
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
              <ul className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-1 no-scrollbar">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 items-center bg-zinc-900/40 p-3 rounded-2xl border border-zinc-900">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black border border-zinc-800 shrink-0 flex items-center justify-center p-1">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        width={64}
                        height={64}
                        unoptimized
                        className="w-full h-full object-contain p-1"
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
                  <span>Shipping ({currentShippingOption.name})</span>
                  <span className="font-bold text-white">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 font-extrabold">FREE ($200+ Standard Waiver)</span>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Estimated Taxes (8%)</span>
                  <span className="font-bold text-white">${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total Due */}
              <div className="flex justify-between items-baseline mt-6 pt-6 border-t border-zinc-800">
                <span className="text-sm font-black uppercase text-gray-400">Total Due</span>
                <span className="text-3xl font-black text-yellow-400">
                  <span className="text-xs font-bold text-gray-500 mr-1.5">USD</span>
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Zoho Mail Notification Guarantee */}
              <div className="mt-6 pt-5 border-t border-zinc-900 flex items-start gap-2.5 text-[11px] text-gray-400">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Zoho Mail Delivery Guarantee:</strong> Both client and admin receive live order notifications with full parcel tracking details.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
