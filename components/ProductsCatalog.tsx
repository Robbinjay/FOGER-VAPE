'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Product, CATEGORIES, ACCESSORY_SUBCATEGORIES } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import ProductImage from '@/components/ProductImage';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Flame, 
  Zap, 
  ShoppingBag,
  SlidersHorizontal,
  X,
  BatteryCharging,
  Layers,
  Cable,
  Droplets
} from 'lucide-react';

interface ProductsCatalogProps {
  initialProducts: Product[];
}

export function ProductsCatalog({ initialProducts }: ProductsCatalogProps) {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category');
  const initialSubcategoryParam = searchParams.get('subcategory') || searchParams.get('sub');
  const initialSearchParam = searchParams.get('search');

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (!initialCategoryParam) {
      if (initialSubcategoryParam) return 'Accessories';
      return 'All';
    }
    const match = CATEGORIES.find(
      (c) => c.toLowerCase().replace(/\s+/g, '-') === initialCategoryParam.toLowerCase() ||
             c.toLowerCase() === initialCategoryParam.toLowerCase() ||
             (initialCategoryParam.toLowerCase().includes('bit') && c === 'Foger Bit 35K') ||
             (initialCategoryParam.toLowerCase().includes('switch') && c === 'Foger Switch Pro') ||
             (initialCategoryParam.toLowerCase().includes('pod') && c === 'Switch Pro Pods') ||
             (initialCategoryParam.toLowerCase().includes('access') && c === 'Accessories')
    );
    return match || 'All';
  });

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(() => {
    if (!initialSubcategoryParam) return 'All Accessories';
    const match = ACCESSORY_SUBCATEGORIES.find(
      (sc) => sc.toLowerCase().replace(/[\s&]+/g, '-') === initialSubcategoryParam.toLowerCase() ||
              sc.toLowerCase() === initialSubcategoryParam.toLowerCase() ||
              (initialSubcategoryParam.toLowerCase().includes('battery') && sc === 'Switch Pro Battery') ||
              ((initialSubcategoryParam.toLowerCase().includes('charger') || initialSubcategoryParam.toLowerCase().includes('cable')) && sc === 'Chargers & Cables') ||
              ((initialSubcategoryParam.toLowerCase().includes('flavor') || initialSubcategoryParam.toLowerCase().includes('drop')) && sc === 'Foger Flavor Drops') ||
              (initialSubcategoryParam.toLowerCase().includes('lanyard') && sc === 'Lanyards & Gear')
    );
    return match || 'All Accessories';
  });

  const [searchQuery, setSearchQuery] = useState(() => initialSearchParam || '');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    let list = initialProducts.filter((product) => {
      // Category filter
      const categoryMatch = 
        selectedCategory === 'All' || 
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      // Subcategory filter (applicable when Accessories is selected or subcategory is specified)
      let subcategoryMatch = true;
      if (selectedCategory === 'Accessories' && selectedSubcategory !== 'All Accessories') {
        subcategoryMatch = product.subCategory?.toLowerCase() === selectedSubcategory.toLowerCase();
      }

      // Search filter
      const queryMatch = 
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.flavor && product.flavor.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

      return categoryMatch && subcategoryMatch && queryMatch;
    });

    // Sorting
    if (sortBy === 'price-low') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [initialProducts, selectedCategory, selectedSubcategory, searchQuery, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedSlug(product.slug);
    setTimeout(() => setAddedSlug(null), 1800);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialProducts.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = initialProducts.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [initialProducts]);

  // Subcategory counts for Accessories
  const subcategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Accessories': initialProducts.filter((p) => p.category === 'Accessories').length,
    };
    ACCESSORY_SUBCATEGORIES.forEach((subCat) => {
      if (subCat !== 'All Accessories') {
        counts[subCat] = initialProducts.filter(
          (p) => p.category === 'Accessories' && p.subCategory === subCat
        ).length;
      }
    });
    return counts;
  }, [initialProducts]);

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      {/* Page Header */}
      <div className="mb-10 pb-6 border-b border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-yellow-400 text-xs font-black tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Foger Product Catalog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              {selectedCategory === 'All' 
                ? 'All Products' 
                : selectedCategory === 'Accessories' && selectedSubcategory !== 'All Accessories'
                ? `${selectedSubcategory}`
                : selectedCategory}
            </h1>
            <p className="text-gray-400 font-medium text-sm sm:text-base mt-2 max-w-2xl">
              {selectedCategory === 'Foger Bit 35K' 
                ? 'Explore all 30 authentic Foger Bit 35K flavors featuring 360° curved OLED displays, dual mesh coils, and 35K puff longevity.'
                : selectedCategory === 'Foger Switch Pro'
                ? 'Explore all 52 flavors of the Foger Switch Pro Kit 30K featuring the reusable smart battery dock, magnetic lock pods, and dual power modes.'
                : selectedCategory === 'Switch Pro Pods'
                ? 'Shop all 54 authentic 30,000 puff magnetic replacement pods for the Foger Switch Pro ecosystem.'
                : selectedCategory === 'Accessories'
                ? selectedSubcategory === 'Switch Pro Battery'
                  ? 'Official Foger Switch Pro 1200mAh reusable charging docks with USB-C fast charging, overcharging protection, and encrypted pod recognition.'
                  : selectedSubcategory === 'Chargers & Cables'
                  ? 'Official Foger 25W Dual Port wall adapters, heavy-duty nylon braided Type-C cables, and 4-pin magnetic dock chargers.'
                  : selectedSubcategory === 'Foger Flavor Drops'
                  ? 'Official Foger concentrated 30ml flavor drops formulated to boost sweetness, icy menthol freeze, sour punch, or tropical fruit notes.'
                  : 'Official Foger Switch Pro 1200mAh smart batteries, chargers, braided cables, flavor drops, and accessories.'
                : 'Browse our complete selection of authentic Foger hardware, long-lasting disposable vapes, and reusable kits.'}
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flavor or product..."
              className="w-full bg-zinc-900 text-white placeholder-gray-500 border border-zinc-800 rounded-full py-3 pl-11 pr-10 text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  if (cat !== 'Accessories') {
                    setSelectedSubcategory('All Accessories');
                  }
                }}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-[#facc15] text-black shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                    : 'bg-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isSelected ? 'bg-black text-white font-bold' : 'bg-black/40 text-gray-400'}`}>
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* ACCESSORIES SUBCATEGORY PILLS */}
        {selectedCategory === 'Accessories' && (
          <div className="mt-4 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-black uppercase tracking-wider text-yellow-400 flex items-center gap-1.5 shrink-0">
              <Layers className="w-3.5 h-3.5" />
              <span>Subcategories:</span>
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {ACCESSORY_SUBCATEGORIES.map((subCat) => {
                const isSubSelected = selectedSubcategory === subCat;
                return (
                  <button
                    key={subCat}
                    onClick={() => setSelectedSubcategory(subCat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                      isSubSelected
                        ? 'bg-white text-black shadow-md'
                        : 'bg-zinc-950 text-gray-400 hover:text-white hover:bg-zinc-900 border border-zinc-800'
                    }`}
                  >
                    {subCat === 'Switch Pro Battery' && <BatteryCharging className="w-3.5 h-3.5 text-yellow-500" />}
                    {subCat === 'Chargers & Cables' && <Cable className="w-3.5 h-3.5 text-cyan-400" />}
                    {subCat === 'Foger Flavor Drops' && <Droplets className="w-3.5 h-3.5 text-rose-400" />}
                    <span>{subCat}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[9px] ${isSubSelected ? 'bg-black text-white font-bold' : 'bg-zinc-900 text-gray-400'}`}>
                      {subcategoryCounts[subCat] || 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Control Bar: Results count + Sort selection */}
      <div className="flex items-center justify-between gap-4 mb-8 text-sm">
        <div className="text-gray-400 font-medium">
          Showing <span className="text-white font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'item' : 'items'}
          {searchQuery && <span> matching &ldquo;<span className="text-yellow-400">{searchQuery}</span>&rdquo;</span>}
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-gray-400 hidden sm:inline flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-yellow-400"
          >
            <option value="featured">Featured</option>
            <option value="name">Name (A - Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-12 text-center my-8">
          <div className="w-16 h-16 rounded-full bg-zinc-900 text-gray-400 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">No Products Found</h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
            We couldn&apos;t find any items matching your criteria. Try adjusting your search query or selecting another category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 bg-yellow-400 text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-yellow-300 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isJustAdded = addedSlug === product.slug;
            return (
              <div 
                key={product.id}
                className="group bg-zinc-950 rounded-2xl border border-zinc-800/80 hover:border-yellow-400/60 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 shadow-lg hover:shadow-2xl"
              >
                {/* Product Card Image */}
                <Link href={`/products/${product.slug}`} className="relative aspect-square bg-zinc-900/60 p-6 flex items-center justify-center overflow-hidden">
                  {/* Category / Puff Tag */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
                    <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10">
                      {product.subCategory || product.puffs || product.category}
                    </span>
                  </div>

                  {product.category === 'Foger Bit 35K' && (
                    <span className="absolute top-3 right-3 z-10 bg-yellow-400 text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                      35K
                    </span>
                  )}
                  {product.subCategory === 'Switch Pro Battery' && (
                    <span className="absolute top-3 right-3 z-10 bg-yellow-400 text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                      <BatteryCharging className="w-2.5 h-2.5" />
                      1200mAh
                    </span>
                  )}
                  {product.subCategory === 'Chargers & Cables' && (
                    <span className="absolute top-3 right-3 z-10 bg-cyan-400 text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Cable className="w-2.5 h-2.5" />
                      Power
                    </span>
                  )}
                  {product.subCategory === 'Foger Flavor Drops' && (
                    <span className="absolute top-3 right-3 z-10 bg-rose-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Droplets className="w-2.5 h-2.5" />
                      30ml Drop
                    </span>
                  )}

                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    flavor={product.flavor}
                    category={product.category}
                    subCategory={product.subCategory}
                    width={260}
                    height={260}
                    showAura={true}
                    className="group-hover:scale-105"
                  />
                </Link>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Flavor badge if available */}
                  {product.flavor && (
                    <div className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider mb-1 line-clamp-1">
                      {product.flavor}
                    </div>
                  )}

                  {/* Title */}
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-base font-black text-white group-hover:text-yellow-400 transition-colors uppercase tracking-tight line-clamp-1 mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-gray-400 text-xs font-medium line-clamp-2 leading-relaxed mb-4 flex-1">
                    {product.description}
                  </p>

                  {/* Quick Feature Pills */}
                  <div className="flex flex-wrap gap-1 mb-5">
                    {product.features.slice(0, 2).map((feat, i) => (
                      <span key={i} className="bg-zinc-900 border border-white/5 text-gray-300 text-[9px] font-bold px-2 py-0.5 rounded-md">
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Price & Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 mt-auto gap-2">
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold block uppercase">Price</span>
                      <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`p-2.5 rounded-full text-xs font-black uppercase transition-all flex items-center justify-center ${
                          isJustAdded
                            ? 'bg-emerald-500 text-white'
                            : 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-md'
                        }`}
                        title="Add to cart"
                      >
                        {isJustAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                      </button>

                      <Link
                        href={`/products/${product.slug}`}
                        className="px-3 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-black uppercase tracking-wider border border-white/10 flex items-center gap-1 transition-colors"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
