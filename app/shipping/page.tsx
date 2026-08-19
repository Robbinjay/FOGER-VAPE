import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns | Foger Vapes',
  description: 'Information about Foger Vapes shipping policies and return procedures.',
};

export default function ShippingPage() {
  return (
    <div className="bg-black min-h-screen py-24 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">Shipping & Returns</h1>
        </div>

        <div className="bg-zinc-950 p-10 rounded-3xl border border-white/10 space-y-12">
          <section>
            <h2 className="text-3xl font-black mb-6 uppercase tracking-tight text-[#facc15]">Shipping Policy</h2>
            <div className="space-y-4 text-gray-300 font-medium leading-relaxed">
              <p>We strive to process and ship all orders as quickly as possible. Orders are typically processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email.</p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3 uppercase tracking-wider">Domestic Shipping Rates and Estimates</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Standard Shipping:</strong> 3-5 business days. Free for orders over $50.</li>
                <li><strong>Expedited Shipping:</strong> 2-3 business days. Rates calculated at checkout.</li>
              </ul>
              <p className="mt-4">Please note that due to PACT Act regulations, an adult signature (21+) is required upon delivery for all vaping products. A fee for this service may be applied at checkout.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-6 uppercase tracking-tight text-[#facc15]">Return Policy</h2>
            <div className="space-y-4 text-gray-300 font-medium leading-relaxed">
              <p>We accept returns up to 30 days after delivery, if the item is unused and in its original condition, and we will refund the full order amount minus the shipping costs for the return.</p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3 uppercase tracking-wider">Defective Products</h3>
              <p>If your device is dead on arrival (DOA) or malfunctions within 48 hours of delivery, please contact our support team immediately with your order number and a video demonstrating the issue. We will arrange a replacement or refund for verified defective items.</p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3 uppercase tracking-wider">Exceptions</h3>
              <p>For sanitary and safety reasons, we cannot accept returns on opened e-liquids, disposable vapes that have been used, or replacement pods/coils.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
