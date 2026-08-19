import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/lib/data';
import { AddToCartButton } from '@/components/AddToCartButton';
import ProductImage from '@/components/ProductImage';
import { 
  Check, 
  Shield, 
  Truck, 
  RotateCcw, 
  ArrowLeft, 
  Zap, 
  Sparkles, 
  Flame, 
  Layers, 
  ChevronRight,
  ShieldCheck,
  BatteryCharging,
  ArrowRight,
  Cable,
  Droplets
} from 'lucide-react';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Official Foger Vapes`,
    description: product.description,
  };
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Related products from the same category or series
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  // Category & subcategory flags
  const isBit35K = product.category === 'Foger Bit 35K';
  const isSwitchPro = product.category === 'Foger Switch Pro';
  const isSwitchProPod = product.category === 'Switch Pro Pods';
  const isBattery = product.subCategory === 'Switch Pro Battery' || product.slug.includes('battery');
  const isCharger = product.subCategory === 'Chargers & Cables' || product.slug.includes('charger') || product.slug.includes('cable');
  const isFlavorDrops = product.subCategory === 'Foger Flavor Drops' || product.slug.includes('flavor-drops') || product.slug.includes('drops');
  const isAccessory = product.category === 'Accessories';

  const otherBitFlavors = isBit35K
    ? products.filter((p) => p.category === 'Foger Bit 35K' && p.flavor)
    : [];

  const otherSwitchProFlavors = isSwitchPro
    ? products.filter((p) => p.category === 'Foger Switch Pro' && p.flavor && p.id !== 'foger-switch-pro-main-kit')
    : [];

  const otherSwitchProPods = isSwitchProPod
    ? products.filter((p) => p.category === 'Switch Pro Pods' && p.flavor && p.id !== 'foger-switch-pro-main-pod')
    : [];

  const batteryVariants = isBattery
    ? products.filter((p) => p.category === 'Accessories' && p.subCategory === 'Switch Pro Battery')
    : [];

  const chargerVariants = isCharger
    ? products.filter((p) => p.category === 'Accessories' && p.subCategory === 'Chargers & Cables')
    : [];

  const flavorDropsVariants = isFlavorDrops
    ? products.filter((p) => p.category === 'Accessories' && p.subCategory === 'Foger Flavor Drops')
    : [];

  return (
    <div className="bg-black min-h-screen py-10 lg:py-16 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 mb-8 overflow-x-auto pb-2 no-scrollbar">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-white transition-colors">
            {product.category}
          </Link>
          {product.subCategory && (
            <>
              <span>/</span>
              <Link 
                href={`/products?category=${encodeURIComponent(product.category)}&subcategory=${encodeURIComponent(product.subCategory)}`} 
                className="hover:text-white transition-colors"
              >
                {product.subCategory}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-yellow-400 font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Product Image Stage */}
          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="relative aspect-square bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 flex items-center justify-center p-8 shadow-2xl">
              {/* Puff / Badge Overlay */}
              <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
                <span className="text-black font-black tracking-wider uppercase text-xs bg-[#facc15] px-3.5 py-1.5 rounded-full shadow-lg">
                  {product.subCategory || product.category}
                </span>
                {product.puffs && (
                  <span className="bg-zinc-900/90 text-white font-bold text-xs px-3 py-1 rounded-full border border-white/10">
                    {product.puffs}
                  </span>
                )}
              </div>

              {/* In Stock Badge */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-black uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>In Stock</span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              
              <ProductImage 
                src={product.image} 
                alt={product.name}
                flavor={product.flavor}
                category={product.category}
                subCategory={product.subCategory}
                width={550}
                height={550}
                showAura={true}
                className="max-h-[85%]"
                priority
              />
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-3 gap-3">
              {isBattery ? (
                <>
                  <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-1">CAPACITY</span>
                    <span className="text-sm font-black text-yellow-400">1200mAh Dock</span>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-1">CHARGING</span>
                    <span className="text-sm font-black text-white">USB Type-C</span>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-1">COMPATIBILITY</span>
                    <span className="text-sm font-black text-emerald-400">54 Pods</span>
                  </div>
                </>
              ) : isCharger ? (
                <>
                  <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-1">POWER SPEC</span>
                    <span className="text-sm font-black text-cyan-400">{product.puffs || '25W / 5V-1A'}</span>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-1">INTERFACE</span>
                    <span className="text-sm font-black text-white">Type-C Safe</span>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-1">PROTECTION</span>
                    <span className="text-sm font-black text-emerald-400">Surge Proof</span>
                  </div>
                </>
              ) : isFlavorDrops ? (
                <>
                  <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-1">BOTTLE SIZE</span>
                    <span className="text-sm font-black text-rose-400">{product.puffs || '30ml Volume'}</span>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-1">FORMULATION</span>
                    <span className="text-sm font-black text-white">0% Nicotine</span>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-1">DISPENSER</span>
                    <span className="text-sm font-black text-emerald-400">Micro-Drip Tip</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-1">NICOTINE</span>
                    <span className="text-sm font-black text-white">{product.nicotine || '5% (50mg)'}</span>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-1">PUFF CAPACITY</span>
                    <span className="text-sm font-black text-yellow-400">{product.puffs || 'Up to 35K'}</span>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-1">AUTHENTICITY</span>
                    <span className="text-sm font-black text-emerald-400">100% Genuine</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Product Details & Purchase Panel */}
          <div className="flex flex-col">
            {product.subCategory && (
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-yellow-400 mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Category: Accessories &rsaquo; {product.subCategory}</span>
              </div>
            )}

            {product.flavor && (
              <div className="inline-flex items-center gap-2 text-gray-300 font-bold uppercase tracking-wider text-xs mb-2">
                <Flame className="w-4 h-4 text-yellow-400" />
                <span>{isBattery ? `Finish / Style: ${product.flavor}` : `Flavor Profile: ${product.flavor}`}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tighter uppercase leading-tight">
              {product.name}
            </h1>

            {/* Price block */}
            <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-zinc-800">
              <span className="text-4xl sm:text-5xl font-black text-[#facc15]">
                ${product.price.toFixed(2)}
              </span>
              {isBattery && (
                <span className="text-sm text-gray-500 line-through font-bold">
                  $14.99
                </span>
              )}
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Tax calculated at checkout • Flat $9 shipping
              </span>
            </div>
            
            {/* Description */}
            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Battery Color / Style Switcher */}
            {isBattery && batteryVariants.length > 0 && (
              <div className="mb-8 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <BatteryCharging className="w-3.5 h-3.5 text-yellow-400" />
                    Available Battery Finishes ({batteryVariants.length})
                  </span>
                  <Link href="/products?category=Accessories&subcategory=Switch+Pro+Battery" className="text-xs text-yellow-400 hover:underline font-bold">
                    View All Batteries
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {batteryVariants.map((batt) => {
                    const isActive = batt.slug === product.slug;
                    return (
                      <Link
                        key={batt.id}
                        href={`/products/${batt.slug}`}
                        className={`text-xs px-4 py-2 rounded-full font-bold uppercase transition-all ${
                          isActive
                            ? 'bg-yellow-400 text-black font-black shadow-md'
                            : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 hover:text-white border border-white/5'
                        }`}
                      >
                        {batt.flavor || batt.name.replace('Foger Switch Pro Battery - ', '')}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Compatible Pods Callout for Battery */}
            {isBattery && (
              <div className="mb-8 p-5 bg-gradient-to-r from-purple-950/40 to-zinc-950 border border-purple-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 block mb-1">
                    Pair With Switch Pro Pods
                  </span>
                  <h4 className="text-sm font-black text-white uppercase">
                    54 Gourmet Pod Flavors Ready To Snap On
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Magnetic 30,000 puff pre-filled replacement pods in stock.
                  </p>
                </div>
                <Link
                  href="/products?category=Switch+Pro+Pods"
                  className="shrink-0 px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white font-black text-xs uppercase tracking-wider rounded-full flex items-center gap-1.5 transition-colors"
                >
                  <span>Shop Pods</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Charger Cable & Adapter Switcher */}
            {isCharger && chargerVariants.length > 0 && (
              <div className="mb-8 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Cable className="w-3.5 h-3.5 text-cyan-400" />
                    Charging Accessories Collection ({chargerVariants.length})
                  </span>
                  <Link href="/products?category=Accessories&subcategory=Chargers+%26+Cables" className="text-xs text-cyan-400 hover:underline font-bold">
                    View All Chargers
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {chargerVariants.map((chg) => {
                    const isActive = chg.slug === product.slug;
                    return (
                      <Link
                        key={chg.id}
                        href={`/products/${chg.slug}`}
                        className={`text-xs px-4 py-2 rounded-full font-bold uppercase transition-all ${
                          isActive
                            ? 'bg-cyan-400 text-black font-black shadow-md'
                            : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 hover:text-white border border-white/5'
                        }`}
                      >
                        {chg.name.replace('Foger ', '')}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Device Safe Compatibility Callout for Chargers */}
            {isCharger && (
              <div className="mb-8 p-5 bg-gradient-to-r from-cyan-950/40 to-zinc-950 border border-cyan-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block mb-1">
                    Safe Vape Charging Certified
                  </span>
                  <h4 className="text-sm font-black text-white uppercase">
                    100% Calibrated For Foger Switch Pro & Bit 35K
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Safe 5V/1A current regulation protects internal battery cells from high-wattage damage.
                  </p>
                </div>
                <Link
                  href="/products?category=Accessories"
                  className="shrink-0 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-wider rounded-full flex items-center gap-1.5 transition-colors"
                >
                  <span>All Accessories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Foger Flavor Drops Switcher */}
            {isFlavorDrops && flavorDropsVariants.length > 0 && (
              <div className="mb-8 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-rose-400" />
                    Foger Flavor Drops Lineup ({flavorDropsVariants.length})
                  </span>
                  <Link href="/products?category=Accessories&subcategory=Foger+Flavor+Drops" className="text-xs text-rose-400 hover:underline font-bold">
                    View All Drops
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {flavorDropsVariants.map((drp) => {
                    const isActive = drp.slug === product.slug;
                    return (
                      <Link
                        key={drp.id}
                        href={`/products/${drp.slug}`}
                        className={`text-xs px-4 py-2 rounded-full font-bold uppercase transition-all ${
                          isActive
                            ? 'bg-rose-500 text-white font-black shadow-md'
                            : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 hover:text-white border border-white/5'
                        }`}
                      >
                        {drp.flavor || drp.name.replace('Foger Flavor Drops - ', '')}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Flavor Drops Dosage & Usage Callout */}
            {isFlavorDrops && (
              <div className="mb-8 p-5 bg-gradient-to-r from-rose-950/40 to-zinc-950 border border-rose-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block mb-1">
                    Concentrated Micro-Dosing Guide
                  </span>
                  <h4 className="text-sm font-black text-white uppercase">
                    1-2 Drops For Maximum Flavor Intensity
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Precision needle dropper allows micro-dosing to boost chill, candy sweetness, sour tang, or fruit notes. 100% 0% nicotine formulation.
                  </p>
                </div>
                <Link
                  href="/products?category=Accessories"
                  className="shrink-0 px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white font-black text-xs uppercase tracking-wider rounded-full flex items-center gap-1.5 transition-colors"
                >
                  <span>All Accessories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
            {isBit35K && otherBitFlavors.length > 0 && (
              <div className="mb-8 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                    Available 35K Flavors ({otherBitFlavors.length})
                  </span>
                  <Link href="/products?category=Foger+Bit+35K" className="text-xs text-yellow-400 hover:underline font-bold">
                    View All Flavors
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1 no-scrollbar">
                  {otherBitFlavors.map((flv) => {
                    const isActive = flv.slug === product.slug;
                    return (
                      <Link
                        key={flv.id}
                        href={`/products/${flv.slug}`}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold uppercase transition-all ${
                          isActive
                            ? 'bg-yellow-400 text-black font-black shadow-md'
                            : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 hover:text-white border border-white/5'
                        }`}
                      >
                        {flv.flavor || flv.name.replace(' - Foger Bit 35K', '')}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Flavor Quick Switcher (If Switch Pro Kit) */}
            {isSwitchPro && otherSwitchProFlavors.length > 0 && (
              <div className="mb-8 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Available Switch Pro Kit 30K Flavors ({otherSwitchProFlavors.length})
                  </span>
                  <Link href="/products?category=Foger+Switch+Pro" className="text-xs text-cyan-400 hover:underline font-bold">
                    View All 52 Kits
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-1 no-scrollbar">
                  {otherSwitchProFlavors.map((flv) => {
                    const isActive = flv.slug === product.slug;
                    return (
                      <Link
                        key={flv.id}
                        href={`/products/${flv.slug}`}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold uppercase transition-all ${
                          isActive
                            ? 'bg-cyan-400 text-black font-black shadow-md'
                            : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 hover:text-white border border-white/5'
                        }`}
                      >
                        {flv.flavor || flv.name.replace(' - Foger Switch Pro Kit 30K', '')}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Flavor Quick Switcher (If Switch Pro Replacement Pods) */}
            {isSwitchProPod && otherSwitchProPods.length > 0 && (
              <div className="mb-8 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Available Switch Pro 30K Pod Flavors ({otherSwitchProPods.length})
                  </span>
                  <Link href="/products?category=Switch+Pro+Pods" className="text-xs text-purple-400 hover:underline font-bold">
                    View All 54 Pods
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-1 no-scrollbar">
                  {otherSwitchProPods.map((flv) => {
                    const isActive = flv.slug === product.slug;
                    return (
                      <Link
                        key={flv.id}
                        href={`/products/${flv.slug}`}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold uppercase transition-all ${
                          isActive
                            ? 'bg-purple-500 text-white font-black shadow-md'
                            : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 hover:text-white border border-white/5'
                        }`}
                      >
                        {flv.flavor || flv.name.replace(' - Foger Switch Pro Pod 30K', '')}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Key Features List */}
            <div className="mb-8">
              <h3 className="text-xs font-black text-white uppercase mb-4 tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Performance & Hardware Features</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-200 bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-800 text-xs sm:text-sm">
                    <Check className="w-4 h-4 text-[#facc15] mr-2.5 shrink-0" />
                    <span className="font-bold">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart Component */}
            <div className="bg-zinc-950 p-6 rounded-3xl border border-zinc-800 mb-8">
              <AddToCartButton product={product} />
            </div>

            {/* Trust and Delivery Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800">
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-zinc-950/50">
                <Truck className="w-6 h-6 text-yellow-400 mb-2" />
                <span className="text-[11px] font-black text-white uppercase tracking-wider">Fast Dispatch</span>
                <span className="text-[10px] text-gray-500">$9 Flat / Free $99+</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-zinc-950/50">
                <ShieldCheck className="w-6 h-6 text-yellow-400 mb-2" />
                <span className="text-[11px] font-black text-white uppercase tracking-wider">Age Verified</span>
                <span className="text-[10px] text-gray-500">21+ Adult Signature</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-zinc-950/50">
                <RotateCcw className="w-6 h-6 text-yellow-400 mb-2" />
                <span className="text-[11px] font-black text-white uppercase tracking-wider">Authentic</span>
                <span className="text-[10px] text-gray-500">Direct From Factory</span>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-black text-yellow-400 uppercase tracking-widest block mb-1">More In This Lineup</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  You May Also Like
                </h2>
              </div>
              <Link 
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-xs sm:text-sm font-black uppercase text-yellow-400 hover:underline flex items-center gap-1"
              >
                <span>View Category</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <Link 
                  key={rel.id} 
                  href={`/products/${rel.slug}`}
                  className="group bg-zinc-950 rounded-2xl border border-zinc-800 p-5 hover:border-yellow-400/60 transition-all duration-300 flex flex-col hover:-translate-y-1"
                >
                  <div className="aspect-square bg-zinc-900/60 rounded-xl p-4 flex items-center justify-center mb-4 overflow-hidden">
                    <ProductImage
                      src={rel.image}
                      alt={rel.name}
                      flavor={rel.flavor}
                      category={rel.category}
                      subCategory={rel.subCategory}
                      width={200}
                      height={200}
                      showAura={true}
                      className="group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-sm font-black text-white group-hover:text-yellow-400 uppercase tracking-tight line-clamp-1 mb-1">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-1 mb-3">
                    {rel.flavor || rel.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-900">
                    <span className="text-base font-black text-white">${rel.price.toFixed(2)}</span>
                    <span className="text-[10px] font-black text-black bg-yellow-400 px-3 py-1 rounded-full uppercase">
                      View
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
