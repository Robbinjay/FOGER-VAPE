import Link from 'next/link';
import { CloudLightning, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-black text-white tracking-tighter uppercase">
            <CloudLightning className="w-8 h-8 text-[#facc15]" />
            <span>FogerVapes</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed font-medium">
            Premium vaping experiences delivered straight to your door. Quality, flavor, and innovation in every puff.
          </p>
          <div className="flex space-x-5">
            <a href="#" className="text-gray-400 hover:text-[#facc15] transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-[#facc15] transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-[#facc15] transition-colors"><Facebook className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div>
          <h3 className="text-white font-black mb-6 tracking-widest uppercase text-sm">Shop</h3>
          <ul className="space-y-4 text-sm text-gray-400 font-medium">
            <li><Link href="/products?category=Foger+Bit+35K" className="hover:text-[#facc15] transition-colors">Foger Bit 35K</Link></li>
            <li><Link href="/products?category=Foger+Switch+Pro" className="hover:text-[#facc15] transition-colors">Switch Pro Kits (30K)</Link></li>
            <li><Link href="/products?category=Switch+Pro+Pods" className="hover:text-[#facc15] transition-colors">Switch Pro Pods (54 Flavors)</Link></li>
            <li><Link href="/products?category=Accessories&subcategory=Switch+Pro+Battery" className="hover:text-[#facc15] transition-colors">Switch Pro Battery (1200mAh)</Link></li>
            <li><Link href="/products?category=Accessories&subcategory=Chargers+%26+Cables" className="hover:text-[#facc15] transition-colors">Chargers & Cables</Link></li>
            <li><Link href="/products?category=Accessories&subcategory=Foger+Flavor+Drops" className="hover:text-[#facc15] transition-colors">Foger Flavor Drops (30ml)</Link></li>
            <li><Link href="/products?category=Accessories" className="hover:text-[#facc15] transition-colors">All Accessories & Gear</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-black mb-6 tracking-widest uppercase text-sm">Support</h3>
          <ul className="space-y-4 text-sm text-gray-400 font-medium">
            <li><Link href="/faq" className="hover:text-[#facc15] transition-colors">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-[#facc15] transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/contact" className="hover:text-[#facc15] transition-colors">Contact Us</Link></li>
            <li><Link href="/track-order" className="hover:text-[#facc15] transition-colors">Track Order</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-black mb-6 tracking-widest uppercase text-sm">Legal</h3>
          <ul className="space-y-4 text-sm text-gray-400 mb-8 font-medium">
            <li><Link href="/terms" className="hover:text-[#facc15] transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-[#facc15] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/age-verification" className="hover:text-[#facc15] transition-colors">Age Verification</Link></li>
          </ul>
          <div className="p-4 bg-zinc-900 rounded-xl border border-white/5 text-center">
            <p className="text-xs text-white font-black uppercase tracking-wider">
              WARNING: This product contains nicotine. Nicotine is an addictive chemical. You must be 21+ to purchase.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-sm text-center text-gray-500 font-medium">
        &copy; {new Date().getFullYear()} FogerVapes.org. All rights reserved.
      </div>
    </footer>
  );
}
