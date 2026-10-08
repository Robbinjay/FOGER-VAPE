import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns | Fast Delivery from Foger Distributor',
  description: 'View our shipping rates, delivery times, and return policies for Foger Bit 35K and Switch Pro products. Normal ($9.99 / Free over $200), Express ($30), International ($40), and Ultra Fast Same Day ($70).',
  keywords: ['foger vape', 'foger shipping policy', 'foger returns', 'vape shipping US', 'foger delivery time', 'foger vape near me'],
};

export default function ShippingPage() {
  return (
    <div className="bg-black min-h-screen py-24 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">Shipping & Returns</h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Transparent shipping tiers, nationwide courier dispatch, and instant order notifications via Zoho Mail.
          </p>
        </div>

        <div className="bg-zinc-950 p-10 rounded-3xl border border-white/10 space-y-12">
          {/* Order Requirements */}
          <section>
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-[#facc15]">Order Minimum & Free Shipping</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                <span className="text-xs uppercase font-black text-yellow-400 block mb-1">Minimum Order</span>
                <span className="text-xl font-black text-white">$100.00 USD</span>
                <p className="text-xs text-gray-400 mt-1">To ensure optimal wholesale logistics, all carts must reach a minimum subtotal of $100.</p>
              </div>
              <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                <span className="text-xs uppercase font-black text-emerald-400 block mb-1">Free Shipping Perk</span>
                <span className="text-xl font-black text-white">Orders Over $200.00</span>
                <p className="text-xs text-gray-400 mt-1">Free Standard Shipping ($9.99 value) is automatically applied when cart subtotal reaches $200. Express, International, and Ultra Fast shipping remain at regular rates.</p>
              </div>
            </div>
          </section>

          {/* Shipping Rates Table */}
          <section>
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-[#facc15]">Shipping Methods & Rates</h2>
            <div className="space-y-3">
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm uppercase">Standard Shipping (Normal)</h4>
                  <p className="text-xs text-gray-400">Standard carrier transit (3-5 business days)</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-white text-base">$9.99</span>
                  <span className="text-[10px] text-emerald-400 font-bold block">FREE on $200+</span>
                </div>
              </div>

              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm uppercase">Express Shipping</h4>
                  <p className="text-xs text-gray-400">Expedited air priority handling (1-2 business days)</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-white text-base">$30.00</span>
                </div>
              </div>

              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm uppercase">International Shipping</h4>
                  <p className="text-xs text-gray-400">Worldwide tracked door-to-door delivery</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-white text-base">$40.00</span>
                </div>
              </div>

              <div className="p-4 bg-zinc-900 rounded-xl border border-yellow-400/40 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-yellow-400 text-sm uppercase">Ultra Fast Same Day Shipping</h4>
                    <span className="bg-red-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">Priority</span>
                  </div>
                  <p className="text-xs text-gray-400">Immediate warehouse packaging & same-day carrier handoff</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-white text-base">$70.00</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              *Adult signature (21+) with valid government-issued ID is strictly required upon carrier handover in accordance with PACT Act regulations.
            </p>
          </section>

          {/* Payment Methods */}
          <section>
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-[#facc15]">Accepted Payment Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-300">
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                <strong className="text-white block uppercase mb-1">Apple Pay</strong>
                Instant one-touch biometric authorization from your iOS or macOS device.
              </div>
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                <strong className="text-white block uppercase mb-1">Cryptocurrency</strong>
                USDT (TRC-20/ERC-20), Bitcoin (BTC), and Ethereum (ETH) with zero processing fees.
              </div>
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                <strong className="text-white block uppercase mb-1">Chime</strong>
                Direct instant mobile transfers via Chime $tag member-to-member network.
              </div>
            </div>
          </section>

          {/* Return Policy */}
          <section>
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-[#facc15]">Return & Defect Policy</h2>
            <div className="space-y-4 text-gray-300 font-medium leading-relaxed text-sm">
              <p>We accept returns up to 30 days after delivery if the merchandise remains sealed, un-tampered, and in its original authentic factory packaging.</p>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Defective Hardware</h3>
              <p>If your device is non-functional upon delivery, notify our customer support team within 48 hours of carrier drop-off with your order number for an immediate replacement voucher or refund.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
