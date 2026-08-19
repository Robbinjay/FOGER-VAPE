'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Search, 
  User, 
  ChevronDown, 
  Menu, 
  X,
  BatteryCharging,
  Cable,
  Flame,
  Sparkles,
  ArrowRight,
  Zap,
  Layers,
  Droplets
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccessoriesDropdownOpen, setIsAccessoriesDropdownOpen] = useState(false);
  const [isMobileAccessoriesExpanded, setIsMobileAccessoriesExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsAccessoriesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsAccessoriesDropdownOpen(false);
    }, 150);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 px-4 font-bold text-xs sm:text-sm tracking-wide">
        $9 Flat Rate Shipping or Free Shipping on Orders Over $99
      </div>
      
      {/* Second Banner */}
      <div className="bg-[#f1f1f1] text-black text-center py-2 px-4 text-xs font-medium border-b border-gray-200">
        Due to high order volume, some orders are experiencing delays. Your order is our priority and will ship as quickly as possible.
      </div>
      
      {/* Main Header */}
      <header className="bg-white sticky top-0 z-40 w-full shadow-sm">
        <div className="container mx-auto px-4 py-3.5 lg:py-5 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-8">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start leading-none shrink-0 group">
            <span className="text-3xl lg:text-4xl font-black italic tracking-tighter text-black uppercase group-hover:text-yellow-500 transition-colors">Foger</span>
            <span className="text-3xl lg:text-4xl font-black italic tracking-tighter text-black uppercase -mt-2 group-hover:text-yellow-500 transition-colors">Vapes</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-3xl flex-1 relative order-3 md:order-2">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 30+ Foger Bit 35K flavors, Switch Pro kits, pods, chargers..." 
              className="w-full pl-5 pr-12 py-2.5 sm:py-3 rounded-full border border-gray-300 focus:outline-none focus:border-black transition-colors bg-white text-gray-900 text-sm"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 shrink-0 order-2 md:order-3">
            <Link href="/products" className="hidden md:flex items-center space-x-2 bg-black text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors">
              <User className="w-4 h-4" />
              <span>SHOP</span>
            </Link>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 bg-black text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>CART</span>
              {cartCount > 0 && (
                <span className="ml-1 flex items-center justify-center w-5 h-5 text-xs font-black text-black bg-[#facc15] rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              className="md:hidden p-2 text-black ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-black text-white hidden md:block border-t border-zinc-800 relative">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-center space-x-6 py-2.5 text-xs font-bold uppercase tracking-wider">
              <Link href="/products?category=Foger+Bit+35K" className="flex items-center hover:text-yellow-400 transition-colors py-1">
                Foger Bit 35K (30 Flavors)
              </Link>
              <Link href="/products?category=Foger+Switch+Pro" className="flex items-center hover:text-cyan-400 transition-colors py-1">
                Switch Pro Kit (52 Flavors)
              </Link>
              <Link href="/products?category=Switch+Pro+Pods" className="flex items-center hover:text-purple-400 transition-colors py-1">
                Switch Pro Pods (54 Flavors)
              </Link>
              
              {/* ACCESSORIES HOVER DROPDOWN TRIGGER */}
              <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  href="/products?category=Accessories" 
                  className={`flex items-center gap-1.5 py-1 transition-colors ${
                    isAccessoriesDropdownOpen ? 'text-yellow-400' : 'hover:text-yellow-400 text-gray-200'
                  }`}
                >
                  <span>Accessories</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAccessoriesDropdownOpen ? 'rotate-180 text-yellow-400' : 'text-gray-400'}`} />
                </Link>

                {/* HOVER DROPDOWN MENU */}
                <AnimatePresence>
                  {isAccessoriesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[420px]"
                    >
                      <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl shadow-2xl overflow-hidden p-3 backdrop-blur-xl ring-1 ring-white/10">
                        {/* Dropdown Header */}
                        <div className="px-3 py-2 border-b border-zinc-800/70 flex items-center justify-between mb-1">
                          <span className="text-[11px] font-black uppercase tracking-widest text-yellow-400 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            <span>Accessories & Gear</span>
                          </span>
                          <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                            15 Official Items
                          </span>
                        </div>

                        {/* Subcategories Grid / List */}
                        <div className="flex flex-col space-y-1">
                          {/* Switch Pro Battery */}
                          <Link
                            href="/products?category=Accessories&subcategory=Switch+Pro+Battery"
                            onClick={() => setIsAccessoriesDropdownOpen(false)}
                            className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-900/90 transition-all border border-transparent hover:border-yellow-400/20"
                          >
                            <div className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-center justify-center shrink-0 group-hover/item:bg-yellow-400 group-hover/item:text-black transition-colors">
                              <BatteryCharging className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-extrabold text-sm text-white group-hover/item:text-yellow-400 transition-colors uppercase tracking-tight">
                                  Switch Pro Battery
                                </h4>
                                <span className="text-[10px] bg-yellow-400/20 text-yellow-400 font-black px-2 py-0.5 rounded-full border border-yellow-400/30">
                                  1200mAh
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                                Smart charging docks in Obsidian, Cyan & Purple
                              </p>
                            </div>
                          </Link>

                          {/* Chargers & Cables */}
                          <Link
                            href="/products?category=Accessories&subcategory=Chargers+%26+Cables"
                            onClick={() => setIsAccessoriesDropdownOpen(false)}
                            className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-900/90 transition-all border border-transparent hover:border-cyan-400/20"
                          >
                            <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center shrink-0 group-hover/item:bg-cyan-400 group-hover/item:text-black transition-colors">
                              <Cable className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-extrabold text-sm text-white group-hover/item:text-cyan-400 transition-colors uppercase tracking-tight">
                                  Chargers & Cables
                                </h4>
                                <span className="text-[10px] bg-cyan-400/20 text-cyan-300 font-black px-2 py-0.5 rounded-full border border-cyan-400/30">
                                  5 Items
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                                25W Dual Port wall chargers, braided Type-C & 4-pin docks
                              </p>
                            </div>
                          </Link>

                          {/* Foger Flavor Drops */}
                          <Link
                            href="/products?category=Accessories&subcategory=Foger+Flavor+Drops"
                            onClick={() => setIsAccessoriesDropdownOpen(false)}
                            className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-900/90 transition-all border border-transparent hover:border-rose-400/20"
                          >
                            <div className="w-9 h-9 rounded-xl bg-rose-400/10 border border-rose-400/30 text-rose-400 flex items-center justify-center shrink-0 group-hover/item:bg-rose-400 group-hover/item:text-black transition-colors">
                              <Droplets className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-extrabold text-sm text-white group-hover/item:text-rose-400 transition-colors uppercase tracking-tight">
                                  Foger Flavor Drops
                                </h4>
                                <span className="text-[10px] bg-rose-500/20 text-rose-300 font-black px-2 py-0.5 rounded-full border border-rose-400/30">
                                  6 Drops
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                                Concentrated 30ml micro-drip bottles: Menthol, Candy, Sour, Mango & Jam
                              </p>
                            </div>
                          </Link>

                          {/* Lanyards & Gear */}
                          <Link
                            href="/products?category=Accessories&subcategory=Lanyards+%26+Gear"
                            onClick={() => setIsAccessoriesDropdownOpen(false)}
                            className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-900/90 transition-all border border-transparent hover:border-emerald-400/20"
                          >
                            <div className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-400 group-hover/item:text-black transition-colors">
                              <Sparkles className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-extrabold text-sm text-white group-hover/item:text-emerald-400 transition-colors uppercase tracking-tight">
                                  Lanyards & Gear
                                </h4>
                                <span className="text-[10px] bg-zinc-800 text-gray-300 font-bold px-2 py-0.5 rounded-full">
                                  Gear
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                                Official silicone ring holders & neck straps
                              </p>
                            </div>
                          </Link>
                        </div>

                        {/* View All Accessories CTA */}
                        <div className="mt-2 pt-2 border-t border-zinc-800/80">
                          <Link
                            href="/products?category=Accessories"
                            onClick={() => setIsAccessoriesDropdownOpen(false)}
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-zinc-900 hover:bg-yellow-400 hover:text-black text-gray-200 font-black text-xs uppercase tracking-wider rounded-xl transition-colors"
                          >
                            <span>Browse All Accessories Collection</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/products" className="hover:text-gray-300 transition-colors py-1">
                Full Catalog
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 md:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-84 bg-zinc-950 text-white shadow-2xl z-50 p-6 flex flex-col md:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                <span className="font-black text-xl italic uppercase tracking-tighter">Foger Vapes</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 rounded-full hover:bg-zinc-900 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex flex-col space-y-3 text-sm font-bold uppercase tracking-wider">
                <Link 
                  href="/products?category=Foger+Bit+35K" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="border-b border-zinc-900 pb-3 flex justify-between items-center hover:text-yellow-400"
                >
                  <span>Foger Bit 35K</span>
                  <span className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full font-black">30 Flavors</span>
                </Link>
                <Link 
                  href="/products?category=Foger+Switch+Pro" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="border-b border-zinc-900 pb-3 flex justify-between items-center hover:text-cyan-400"
                >
                  <span>Switch Pro Kit</span>
                  <span className="text-xs bg-cyan-400 text-black px-2 py-0.5 rounded-full font-black">52 Flavors</span>
                </Link>
                <Link 
                  href="/products?category=Switch+Pro+Pods" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="border-b border-zinc-900 pb-3 flex justify-between items-center hover:text-purple-400"
                >
                  <span>Switch Pro Pods</span>
                  <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full font-black">54 Pods</span>
                </Link>
                
                {/* Mobile Accessories Section with subcategories */}
                <div className="border-b border-zinc-900 pb-3">
                  <div 
                    onClick={() => setIsMobileAccessoriesExpanded(!isMobileAccessoriesExpanded)}
                    className="flex justify-between items-center cursor-pointer text-yellow-400 py-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      <span>Accessories</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileAccessoriesExpanded ? 'rotate-180' : ''}`} />
                  </div>

                  {isMobileAccessoriesExpanded && (
                    <div className="pl-4 pr-1 mt-2 space-y-2 text-xs font-semibold normal-case">
                      <Link 
                        href="/products?category=Accessories&subcategory=Switch+Pro+Battery" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 text-gray-200 hover:text-yellow-400"
                      >
                        <span className="flex items-center gap-2 font-bold uppercase tracking-tight">
                          <BatteryCharging className="w-3.5 h-3.5 text-yellow-400" />
                          Switch Pro Battery (1200mAh)
                        </span>
                        <span className="text-[10px] text-yellow-400 font-bold">1200mAh</span>
                      </Link>

                      <Link 
                        href="/products?category=Accessories&subcategory=Chargers+%26+Cables" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 text-gray-200 hover:text-cyan-400"
                      >
                        <span className="flex items-center gap-2 font-bold uppercase tracking-tight">
                          <Cable className="w-3.5 h-3.5 text-cyan-400" />
                          Chargers & Cables
                        </span>
                        <span className="text-[10px] bg-cyan-400/20 text-cyan-300 px-1.5 py-0.5 rounded font-black">5 Items</span>
                      </Link>

                      <Link 
                        href="/products?category=Accessories&subcategory=Foger+Flavor+Drops" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 text-gray-200 hover:text-rose-400"
                      >
                        <span className="flex items-center gap-2 font-bold uppercase tracking-tight">
                          <Droplets className="w-3.5 h-3.5 text-rose-400" />
                          Foger Flavor Drops
                        </span>
                        <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-black">6 Drops</span>
                      </Link>

                      <Link 
                        href="/products?category=Accessories&subcategory=Lanyards+%26+Gear" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 text-gray-200 hover:text-emerald-400"
                      >
                        <span className="flex items-center gap-2 font-bold uppercase tracking-tight">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          Lanyards & Gear
                        </span>
                        <span className="text-[10px] text-gray-400">Silicone</span>
                      </Link>

                      <Link 
                        href="/products?category=Accessories" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-center py-2 text-yellow-400 text-[11px] font-bold uppercase tracking-wider hover:underline"
                      >
                        View All 15 Accessories &rsaquo;
                      </Link>
                    </div>
                  )}
                </div>

                <Link 
                  href="/products" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="border-b border-zinc-900 pb-3 hover:text-yellow-400"
                >
                  All Products
                </Link>
                
                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsCartOpen(true);
                    }} 
                    className="w-full flex items-center justify-center space-x-2 bg-yellow-400 text-black font-black py-3 rounded-full uppercase tracking-wider text-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>VIEW CART ({cartCount})</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

