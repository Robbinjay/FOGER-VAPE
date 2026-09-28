import { Metadata } from 'next';
import Image from 'next/image';
import { ShieldCheck, Truck, Award, CheckCircle2, Flame, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Authorized Foger Vape Distributor',
  description: 'Learn about our mission as a leading distributor of authentic Foger Vape products. We provide genuine Bit 35K, Switch Pro, and accessories with fast shipping.',
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Foger Vapes Distributor",
      "description": "Authorized distributor of authentic Foger Vape products including the Bit 35K and Switch Pro series.",
      "url": "https://fogervapes.org",
      "logo": "https://fogervapes.org/logo.png"
    }
  };

  return (
    <div className="bg-black min-h-screen pt-24 pb-16 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
            Your Trusted <span className="text-[#facc15]">Foger</span> Partner
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed">
            Leading the way in distributing authentic, high-performance Foger Vape technology across the nation.
          </p>
        </div>

        {/* Distributor Status & Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(250,204,21,0.1)]">
            <Image 
              src="https://picsum.photos/seed/fogerdistributor/1200/900" 
              alt="Authentic Foger Vape Distribution" 
              fill 
              className="object-cover mix-blend-luminosity opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="inline-flex items-center gap-2 bg-[#facc15] text-black px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-4">
                <Award className="w-4 h-4" />
                <span>Authorized Distributor</span>
              </div>
              <h3 className="text-2xl font-black uppercase text-white">100% Genuine Products</h3>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <span className="text-[#facc15] font-black tracking-widest uppercase text-sm">Who We Are</span>
              <h2 className="text-4xl md:text-5xl font-black mt-2 mb-4 uppercase tracking-tight">Authentic Foger Distribution</h2>
            </div>
            <p className="text-gray-300 font-medium text-lg leading-relaxed">
              Welcome to your premier destination for authentic Foger Vape products. As a dedicated <strong>authorized distributor</strong>, we specialize in bringing the full lineup of genuine Foger hardware and accessories directly to you.
            </p>
            <p className="text-gray-300 font-medium text-lg leading-relaxed">
              We are not the official manufacturer, but we are their most trusted distribution partner. Our mission is to ensure that every vaper has access to the cutting-edge technology that Foger is known for—without the worry of counterfeits.
            </p>
            <div className="pt-4">
              <Link href="/products" className="inline-flex items-center gap-2 bg-[#facc15] text-black px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-[#eab308] transition-all shadow-lg shadow-yellow-400/10">
                <span>Shop Authentic Collection</span>
                <Zap className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-zinc-950 p-10 rounded-3xl border border-white/10 group hover:border-[#facc15]/50 transition-colors">
            <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8 text-[#facc15]" />
            </div>
            <h3 className="text-xl font-black uppercase mb-3 text-white">Guaranteed Authentic</h3>
            <p className="text-gray-400 font-medium leading-relaxed">
              Every Bit 35K and Switch Pro kit we sell comes directly from the factory with verifiable security codes.
            </p>
          </div>
          <div className="bg-zinc-950 p-10 rounded-3xl border border-white/10 group hover:border-[#facc15]/50 transition-colors">
            <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Truck className="w-8 h-8 text-[#facc15]" />
            </div>
            <h3 className="text-xl font-black uppercase mb-3 text-white">Rapid Nationwide Shipping</h3>
            <p className="text-gray-400 font-medium leading-relaxed">
              Our optimized logistics network ensures your Foger favorites arrive quickly and securely at your doorstep.
            </p>
          </div>
          <div className="bg-zinc-950 p-10 rounded-3xl border border-white/10 group hover:border-[#facc15]/50 transition-colors">
            <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-8 h-8 text-[#facc15]" />
            </div>
            <h3 className="text-xl font-black uppercase mb-3 text-white">Expert Product Support</h3>
            <p className="text-gray-400 font-medium leading-relaxed">
              Our team knows Foger hardware inside and out. We&apos;re here to help you get the best experience from your device.
            </p>
          </div>
        </div>

        {/* Product Focus Section */}
        <div className="bg-zinc-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-l from-[#facc15] to-transparent" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
              The Best of <span className="text-[#facc15]">Foger</span> In One Place
            </h2>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#facc15] flex-shrink-0 mt-1 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-white">Foger Bit 35K</h4>
                  <p className="text-gray-400 text-sm">Industry-leading puff capacity with dynamic OLED displays.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#facc15] flex-shrink-0 mt-1 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-white">Switch Pro Eco-System</h4>
                  <p className="text-gray-400 text-sm">Reusable batteries and magnetic pods for a sustainable premium vape.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#facc15] flex-shrink-0 mt-1 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-white">Official Accessories</h4>
                  <p className="text-gray-400 text-sm">Flavor drops, chargers, and replacement batteries for maximum longevity.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="bg-white text-black px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-gray-200 transition-all">
                View Full Catalog
              </Link>
              <Link href="/contact" className="border border-white/20 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-white/10 transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-24 text-center">
          <p className="text-sm font-black text-gray-500 uppercase tracking-[0.3em] mb-8">Trusted by thousands of vapers</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {/* Placeholder for partner/brand logos if needed, or just icons */}
            <div className="flex items-center gap-2">
              <Flame className="w-8 h-8" />
              <span className="text-2xl font-black uppercase">Authentic</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-8 h-8" />
              <span className="text-2xl font-black uppercase">Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-8 h-8" />
              <span className="text-2xl font-black uppercase">Secured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
