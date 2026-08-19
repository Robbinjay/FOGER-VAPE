import { Metadata } from 'next';
import { PackageSearch } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Track Order | Foger Vapes',
  description: 'Track the status of your Foger Vapes order.',
};

export default function TrackOrderPage() {
  return (
    <div className="bg-black min-h-screen py-24 text-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">Track Order</h1>
          <p className="text-xl text-gray-400 font-medium">Enter your order details below to see the current status of your shipment.</p>
        </div>

        <div className="bg-zinc-950 p-10 rounded-3xl border border-white/10">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-black border border-white/10 rounded-full flex items-center justify-center text-[#facc15] shadow-[0_0_30px_rgba(250,204,21,0.1)]">
              <PackageSearch className="w-10 h-10" />
            </div>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Order Number</label>
              <input type="text" id="orderNumber" placeholder="e.g. FG123456789" className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15] outline-none text-white transition-all placeholder-gray-700" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Email Address</label>
              <input type="email" id="email" placeholder="Email used for the order" className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15] outline-none text-white transition-all placeholder-gray-700" />
            </div>
            <button type="button" className="w-full py-5 bg-[#facc15] text-black rounded-xl font-black text-lg hover:bg-yellow-300 transition-all uppercase tracking-widest">
              Track My Order
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-medium">If you have an account, you can also <a href="#" className="text-[#facc15] hover:underline">log in</a> to view your order history.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
