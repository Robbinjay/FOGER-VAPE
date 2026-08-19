import Link from 'next/link';
import Image from 'next/image';
import { RevSlider } from '@/components/RevSlider';
import { products } from '@/lib/data';
import ProductImage from '@/components/ProductImage';
import { ArrowRight, ShieldCheck, Zap, Sparkles, CheckCircle2, Flame, ShoppingBag } from 'lucide-react';

export default function HomePage() {
  // Select top featured items across the Bit 35K, Switch Pro, and popular flavors
  const bit35KFlavors = products.filter(p => p.category === 'Foger Bit 35K').slice(0, 8);
  const switchProKitHero = products.find(p => p.id === 'foger-switch-pro-main-kit') || products[0];
  const switchProFlavors = products.filter(p => p.category === 'Foger Switch Pro' && p.id !== 'foger-switch-pro-main-kit').slice(0, 8);
  const switchProPods = products.filter(p => p.category === 'Switch Pro Pods' && p.id !== 'foger-switch-pro-main-pod').slice(0, 8);

  return (
    <div className="flex flex-col bg-white min-h-screen text-black">
      {/* Breadcrumb & Live Status Bar */}
      <div className="container mx-auto px-4 py-2.5 text-xs sm:text-sm text-gray-600 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hover:underline hover:text-black font-medium">Home</Link>
          <span className="text-gray-400">\</span>
          <span className="text-gray-900 font-semibold">Official Foger Bit 35K & Switch Pro Collection</span>
        </div>
        <div className="hidden sm:flex items-center space-x-3 text-xs text-gray-500 font-medium">
          <span className="flex items-center text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            30 Bit 35K • 52 Kits • 54 Pod Flavors In Stock
          </span>
          <span>•</span>
          <span>Fast $9 Flat Shipping</span>
        </div>
      </div>

      {/* Hero Revolution Slider */}
      <section className="w-full relative bg-black">
        <RevSlider />
      </section>

      {/* Category Quick Navigation Grid */}
      <section className="bg-zinc-50 border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
            <Link 
              href="/products?category=Foger+Bit+35K" 
              className="bg-white hover:bg-black hover:text-white p-4 rounded-2xl border border-gray-200 shadow-sm transition-all duration-200 flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-yellow-100 group-hover:bg-yellow-400 text-yellow-800 group-hover:text-black flex items-center justify-center font-black text-sm shrink-0 transition-colors">
                35K
              </div>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-tight">Foger Bit 35K</h4>
                <p className="text-xs text-gray-500 group-hover:text-gray-300">30 Authentic Flavors</p>
              </div>
            </Link>

            <Link 
              href="/products?category=Foger+Switch+Pro" 
              className="bg-white hover:bg-black hover:text-white p-4 rounded-2xl border border-gray-200 shadow-sm transition-all duration-200 flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-100 group-hover:bg-cyan-400 text-cyan-800 group-hover:text-black flex items-center justify-center font-black text-sm shrink-0 transition-colors">
                30K
              </div>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-tight">Switch Pro Kit</h4>
                <p className="text-xs text-gray-500 group-hover:text-gray-300">Reusable Base + Pods</p>
              </div>
            </Link>

            <Link 
              href="/products?category=Switch+Pro+Pods" 
              className="bg-white hover:bg-black hover:text-white p-4 rounded-2xl border border-gray-200 shadow-sm transition-all duration-200 flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 group-hover:bg-purple-400 text-purple-800 group-hover:text-black flex items-center justify-center font-black text-sm shrink-0 transition-colors">
                POD
              </div>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-tight">Switch Pro Pods</h4>
                <p className="text-xs text-gray-500 group-hover:text-gray-300">Magnetic 30K Pods</p>
              </div>
            </Link>

            <Link 
              href="/products?category=Accessories&subcategory=Switch+Pro+Battery" 
              className="bg-white hover:bg-black hover:text-white p-4 rounded-2xl border border-gray-200 shadow-sm transition-all duration-200 flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-yellow-100 group-hover:bg-yellow-400 text-yellow-800 group-hover:text-black flex items-center justify-center font-black text-sm shrink-0 transition-colors">
                BAT
              </div>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-tight">Switch Pro Battery</h4>
                <p className="text-xs text-gray-500 group-hover:text-gray-300">1200mAh Power Docks</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Foger Bit 35K Special Collection Banner & Flavor Carousel */}
      <section className="py-14 sm:py-20 bg-zinc-950 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-zinc-800 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-black text-xs font-black tracking-widest uppercase mb-3">
                <Flame className="w-3.5 h-3.5" />
                <span>Featured Collection</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
                Foger Bit 35K Puffs Lineup
              </h2>
              <p className="text-gray-400 text-sm sm:text-base font-medium mt-1">
                Explore all 30 scraped flavors with 360° curved OLED display, dual mesh coils, and 35K puff longevity.
              </p>
            </div>

            <Link 
              href="/products?category=Foger+Bit+35K" 
              className="inline-flex items-center space-x-2 font-black text-sm uppercase tracking-wider text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <span>Explore All 30 Flavors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bit35KFlavors.map((product) => (
              <div 
                key={product.id} 
                className="group bg-zinc-900/80 rounded-2xl border border-zinc-800 overflow-hidden hover:border-yellow-400/80 transition-all duration-300 flex flex-col hover:-translate-y-1 shadow-lg"
              >
                {/* Product Card Image */}
                <Link href={`/products/${product.slug}`} className="relative aspect-square bg-black/40 flex items-center justify-center p-6 overflow-hidden">
                  <span className="absolute top-3 left-3 z-10 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {product.puffs || '35,000 PUFFS'}
                  </span>
                  
                  <ProductImage 
                    src={product.image} 
                    alt={product.name}
                    flavor={product.flavor}
                    category={product.category}
                    subCategory={product.subCategory}
                    width={280}
                    height={280}
                    showAura={true}
                    className="group-hover:scale-105"
                  />
                </Link>

                {/* Product Card Details */}
                <div className="p-5 flex flex-col flex-1">
                  {product.flavor && (
                    <span className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider mb-1 line-clamp-1">
                      {product.flavor}
                    </span>
                  )}
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-black text-base text-white group-hover:text-yellow-400 transition-colors uppercase tracking-tight line-clamp-1 mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-gray-400 text-xs line-clamp-2 mb-4 flex-1 font-medium leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price & Action Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800 mt-auto">
                    <div>
                      <span className="text-xs text-gray-500 font-bold block uppercase">Price</span>
                      <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
                    </div>

                    <Link 
                      href={`/products/${product.slug}`}
                      className="px-4 py-2 bg-yellow-400 text-black hover:bg-yellow-300 font-black text-xs uppercase tracking-wider rounded-full transition-colors flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link 
              href="/products?category=Foger+Bit+35K"
              className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider shadow-lg transition-all"
            >
              <span>View All 30 Foger Bit 35K Flavors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Switch Pro Ecosystem Showcase */}
      <section className="py-14 sm:py-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-zinc-800 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400 text-black text-xs font-black tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Switch Pro 30K Ecosystem</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
                Foger Switch Pro Kit 30K Lineup
              </h2>
              <p className="text-gray-400 text-sm sm:text-base font-medium mt-1">
                Explore all 52 official flavors featuring reusable smart battery docks, magnetic lock pods, and dual power modes.
              </p>
            </div>

            <Link 
              href="/products?category=Foger+Switch+Pro" 
              className="inline-flex items-center space-x-2 font-black text-sm uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Explore All 52 Kits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Switch Pro Flavors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {switchProFlavors.map((product) => (
              <div 
                key={product.id} 
                className="group bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden hover:border-cyan-400/80 transition-all duration-300 flex flex-col hover:-translate-y-1 shadow-lg"
              >
                {/* Product Card Image */}
                <Link href={`/products/${product.slug}`} className="relative aspect-square bg-black/40 flex items-center justify-center p-6 overflow-hidden">
                  <span className="absolute top-3 left-3 z-10 bg-cyan-400 text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {product.puffs || '30,000 PUFFS'}
                  </span>
                  
                  <ProductImage 
                    src={product.image} 
                    alt={product.name}
                    flavor={product.flavor}
                    category={product.category}
                    subCategory={product.subCategory}
                    width={280}
                    height={280}
                    showAura={true}
                    className="group-hover:scale-105"
                  />
                </Link>

                {/* Product Card Details */}
                <div className="p-5 flex flex-col flex-1">
                  {product.flavor && (
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1 line-clamp-1">
                      {product.flavor}
                    </span>
                  )}
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-black text-base text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight line-clamp-1 mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-gray-400 text-xs line-clamp-2 mb-4 flex-1 font-medium leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price & Action Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800 mt-auto">
                    <div>
                      <span className="text-xs text-gray-500 font-bold block uppercase">Kit Price</span>
                      <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
                    </div>

                    <Link 
                      href={`/products/${product.slug}`}
                      className="px-4 py-2 bg-cyan-400 text-black hover:bg-cyan-300 font-black text-xs uppercase tracking-wider rounded-full transition-colors flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link 
              href="/products?category=Foger+Switch+Pro"
              className="inline-flex items-center space-x-2 bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider shadow-lg transition-all"
            >
              <span>View All 52 Foger Switch Pro Flavors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Switch Pro Pods 30K Showcase */}
      <section className="py-14 sm:py-20 bg-zinc-950 text-white border-t border-zinc-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-zinc-800 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-black tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Replacement Pods • 30,000 Puffs</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
                Switch Pro Pod 30K Puffs
              </h2>
              <p className="text-gray-400 text-sm sm:text-base font-medium mt-1">
                Explore all 54 magnetic pre-filled replacement pods. Seamlessly snap onto any Switch Pro battery dock.
              </p>
            </div>

            <Link 
              href="/products?category=Switch+Pro+Pods" 
              className="inline-flex items-center space-x-2 font-black text-sm uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors"
            >
              <span>Explore All 54 Pods</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Switch Pro Pods Flavors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {switchProPods.map((product) => (
              <div 
                key={product.id} 
                className="group bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden hover:border-purple-500/80 transition-all duration-300 flex flex-col hover:-translate-y-1 shadow-lg"
              >
                {/* Product Card Image */}
                <Link href={`/products/${product.slug}`} className="relative aspect-square bg-black/40 flex items-center justify-center p-6 overflow-hidden">
                  <span className="absolute top-3 left-3 z-10 bg-purple-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {product.puffs || '30,000 PUFFS'}
                  </span>
                  
                  <ProductImage 
                    src={product.image} 
                    alt={product.name}
                    flavor={product.flavor}
                    category={product.category}
                    subCategory={product.subCategory}
                    width={280}
                    height={280}
                    showAura={true}
                    className="group-hover:scale-105"
                  />
                </Link>

                {/* Product Card Details */}
                <div className="p-5 flex flex-col flex-1">
                  {product.flavor && (
                    <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-1 line-clamp-1">
                      {product.flavor}
                    </span>
                  )}
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-black text-base text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight line-clamp-1 mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-gray-400 text-xs line-clamp-2 mb-4 flex-1 font-medium leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price & Action Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800 mt-auto">
                    <div>
                      <span className="text-xs text-gray-500 font-bold block uppercase">Pod Price</span>
                      <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
                    </div>

                    <Link 
                      href={`/products/${product.slug}`}
                      className="px-4 py-2 bg-purple-500 text-white hover:bg-purple-400 font-black text-xs uppercase tracking-wider rounded-full transition-colors flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link 
              href="/products?category=Switch+Pro+Pods"
              className="inline-flex items-center space-x-2 bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider shadow-lg transition-all"
            >
              <span>View All 54 Switch Pro Pods</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Technology Highlights */}
      <section className="py-16 bg-black text-white border-t border-zinc-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">
              Engineered For Pure Performance
            </h2>
            <p className="text-gray-400 font-medium text-sm sm:text-base">
              Foger revolutionizes the disposable and reusable vape market with clear tank transparency and dual core architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black mb-6 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-2">35,000 Puffs Massive Capacity</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Dual power modes allow seamless switching between 35K Normal mode and 25K Boost mode for customizable vapor density.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 mt-auto">
                <CheckCircle2 className="w-4 h-4" />
                <span>Norm & Boost Modes</span>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-cyan-400 text-black flex items-center justify-center font-black mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-2">360° Curved OLED Screen</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Real-time tracking of active battery percentage, e-liquid level indicators, and power wattage on dynamic digital displays.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mt-auto">
                <CheckCircle2 className="w-4 h-4" />
                <span>Real-Time Battery & Juice Display</span>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-pink-400 text-black flex items-center justify-center font-black mb-6 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-2">Texas Compliant & Anti-Leak</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Manufactured with premium food-grade materials, anti-spitback internal mesh, and fully certified lab test purity.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-pink-400 mt-auto">
                <CheckCircle2 className="w-4 h-4" />
                <span>Rigorous Quality Inspection</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
