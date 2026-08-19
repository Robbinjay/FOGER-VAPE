'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Flame,
  Layers,
  RotateCcw
} from 'lucide-react';

export interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  image: string;
  accentColor: string;
  glowColor: string;
  specs: { label: string; value: string; icon: string }[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const SLIDES: SlideData[] = [
  {
    id: 'bit-35k',
    title: 'FOGER BIT 35K',
    subtitle: 'CLEAR TANK TELLS IT ALL',
    tagline: 'Featuring 360° Curved Screen, Dual Mesh Coils & 35,000 Massive Puffs',
    badge: 'FLAGSHIP INNOVATION • IN STOCK',
    image: '/foger-bit-35k-banner.webp',
    accentColor: '#facc15', // Gold / Yellow
    glowColor: 'rgba(250, 204, 21, 0.4)',
    specs: [
      { label: 'PUFF CAPACITY', value: '35K / 25K', icon: 'zap' },
      { label: 'DISPLAY', value: '360° Curved OLED', icon: 'sparkles' },
      { label: 'COIL TECH', value: 'Dual Mesh Coil', icon: 'flame' },
      { label: 'AIRFLOW', value: 'Adjustable Switch', icon: 'rotate' },
    ],
    primaryCta: { label: 'SHOP BIT 35K', href: '/products/foger-bit-35k-puffs' },
    secondaryCta: { label: 'EXPLORE ALL FLAVORS', href: '/products' },
  },
  {
    id: 'switch-pro-30k',
    title: 'FOGER SWITCH PRO 30K',
    subtitle: 'REUSABLE SMART BATTERY & PODS',
    tagline: 'Switch The Pod, Keep The Power. The Texas Compliant Reusable Ecosystem.',
    badge: 'ECOSYSTEM SYSTEM • 30K PUFFS',
    image: '/foger-switch-pro-banner.jpg',
    accentColor: '#06b6d4', // Cyan
    glowColor: 'rgba(6, 182, 212, 0.4)',
    specs: [
      { label: 'POD SYSTEM', value: 'Magnetic Quick-Swap', icon: 'layers' },
      { label: 'PUFF COUNT', value: '30,000 Puffs', icon: 'zap' },
      { label: 'BATTERY', value: 'Smart Reusable Base', icon: 'shield' },
      { label: 'COMPLIANCE', value: 'Texas Compliant', icon: 'shield' },
    ],
    primaryCta: { label: 'SHOP SWITCH PRO KIT', href: '/products/foger-switch-pro-kit-30k-puffs' },
    secondaryCta: { label: 'REPLACEMENT PODS', href: '/products/foger-switch-pro-pod-30k-puffs' },
  },
  {
    id: 'new-flavors-lineup',
    title: 'EXPLORE 100+ EXOTIC FLAVORS',
    subtitle: 'EXTREME ICED FLAVOR ARSENAL',
    tagline: 'Ultra Smooth Vapor, Intense Chill & Pure Taste from First Puff to Last.',
    badge: 'NEW RELEASES • PREMIUM E-LIQUID',
    image: '/foger-flavors-banner.jpg',
    accentColor: '#ec4899', // Pink / Magenta
    glowColor: 'rgba(236, 72, 153, 0.4)',
    specs: [
      { label: 'NICOTINE', value: '5% Premium Salt', icon: 'zap' },
      { label: 'FLAVOR VARIETY', value: '100+ Master Blends', icon: 'sparkles' },
      { label: 'E-LIQUID', value: 'Ultra Clear Pure Tank', icon: 'flame' },
      { label: 'SHIPPING', value: '$9 Flat / Free $99+', icon: 'rotate' },
    ],
    primaryCta: { label: 'SHOP ALL FLAVORS', href: '/products' },
    secondaryCta: { label: 'VIEW PRODUCT CATALOG', href: '/products' },
  },
];

const AUTOPLAY_DURATION = 6000; // 6 seconds

export function RevSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  // Autoplay timer with progressive bar
  useEffect(() => {
    if (!isPlaying) return;

    const intervalStep = 50; // ms
    const increment = (intervalStep / AUTOPLAY_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = SLIDES[currentIndex];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'zap':
        return <Zap className="w-4 h-4" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'flame':
        return <Flame className="w-4 h-4" />;
      case 'shield':
        return <ShieldCheck className="w-4 h-4" />;
      case 'layers':
        return <Layers className="w-4 h-4" />;
      default:
        return <RotateCcw className="w-4 h-4" />;
    }
  };

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.8, ease: 'easeOut' },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 30 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  return (
    <div 
      id="rev-slider-container"
      className="relative w-full bg-black overflow-hidden select-none group min-h-[500px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[720px] xl:min-h-[780px]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Slides with AnimatePresence */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* Main Background Image with Ken-Burns subtle zoom */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 7, ease: 'linear' }}
            className="relative w-full h-full"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              className="object-cover object-center"
              priority
              referrerPolicy="no-referrer"
              sizes="100vw"
            />
            {/* Dynamic Vignette & Overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 md:from-black/90 md:via-black/40 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent hidden md:block" />
          </motion.div>

          {/* Slide Text Content & Overlays (Revolution Slider Layer Animation) */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
              <div className="max-w-2xl text-white">
                {/* Badge Layer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 backdrop-blur-md text-xs sm:text-sm font-black tracking-widest uppercase"
                  style={{
                    backgroundColor: `${currentSlide.accentColor}18`,
                    borderColor: `${currentSlide.accentColor}55`,
                    color: currentSlide.accentColor,
                    boxShadow: `0 0 20px ${currentSlide.glowColor}`,
                  }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentSlide.accentColor }} />
                  <span>{currentSlide.badge}</span>
                </motion.div>

                {/* Subtitle / Big Highlight Layer */}
                <motion.h2
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white mb-2 leading-tight drop-shadow-md"
                >
                  {currentSlide.title}
                </motion.h2>

                {/* Main Hero Title Layer */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black italic uppercase tracking-tighter mb-4 leading-none"
                  style={{
                    textShadow: `0 0 35px ${currentSlide.glowColor}`,
                  }}
                >
                  <span 
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage: `linear-gradient(135deg, #ffffff 30%, ${currentSlide.accentColor} 100%)`,
                    }}
                  >
                    {currentSlide.subtitle}
                  </span>
                </motion.h1>

                {/* Tagline Layer */}
                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="text-sm sm:text-base lg:text-lg text-gray-200 font-medium mb-6 max-w-xl leading-relaxed drop-shadow"
                >
                  {currentSlide.tagline}
                </motion.p>

                {/* Specs / Feature Pills Layer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8 max-w-xl"
                >
                  {currentSlide.specs.map((spec, i) => (
                    <div 
                      key={i}
                      className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2.5 flex flex-col justify-center"
                    >
                      <div className="flex items-center gap-1 text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                        <span style={{ color: currentSlide.accentColor }}>{renderIcon(spec.icon)}</span>
                        <span>{spec.label}</span>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-white truncate">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Action Buttons Layer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <Link
                    href={currentSlide.primaryCta.href}
                    className="px-7 py-3.5 rounded-full font-black text-sm tracking-wider uppercase flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                    style={{
                      backgroundColor: currentSlide.accentColor,
                      color: '#000000',
                      boxShadow: `0 0 25px ${currentSlide.glowColor}`,
                    }}
                  >
                    <span>{currentSlide.primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={currentSlide.secondaryCta.href}
                    className="px-6 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all transform hover:scale-105 active:scale-95"
                  >
                    {currentSlide.secondaryCta.label}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* RevSlider Left & Right Arrow Navigation Controls */}
      <div className="absolute inset-y-0 left-0 right-0 z-30 pointer-events-none flex items-center justify-between px-3 sm:px-6">
        <button
          id="rev-slider-prev-btn"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="pointer-events-auto w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-90 shadow-xl group"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          id="rev-slider-next-btn"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="pointer-events-auto w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-90 shadow-xl group"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* RevSlider Bottom Control Bar (Tab Selectors, Slide Numbers & Autoplay Progress) */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 px-4 sm:px-8">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Slide Tab Selectors (Revolution Slider style preview tabs) */}
          <div className="flex items-center gap-2 sm:gap-3 bg-black/60 backdrop-blur-md p-1.5 sm:p-2 rounded-full border border-white/10 shadow-2xl">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  id={`rev-slide-tab-${index + 1}`}
                  onClick={() => goToSlide(index)}
                  className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive 
                      ? 'text-black font-black' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={{
                    backgroundColor: isActive ? slide.accentColor : 'transparent',
                  }}
                >
                  <span className={`text-[10px] ${isActive ? 'text-black' : 'text-gray-500'}`}>
                    0{index + 1}
                  </span>
                  <span className="hidden md:inline uppercase tracking-wider text-[11px]">
                    {slide.id === 'bit-35k' ? 'Bit 35K' : slide.id === 'switch-pro-30k' ? 'Switch Pro' : 'All Flavors'}
                  </span>

                  {/* Active Slide Timer Line */}
                  {isActive && isPlaying && (
                    <span 
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-black/30 rounded-full overflow-hidden"
                    >
                      <span 
                        className="block h-full bg-black"
                        style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Slider Meta Controls (Play/Pause + Slide Index Counter) */}
          <div className="hidden sm:flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-xs font-bold shadow-2xl">
            {/* Play / Pause Autoplay button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 pr-2 border-r border-white/20"
              title={isPlaying ? 'Pause auto-slider' : 'Play auto-slider'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#facc15]" />}
              <span className="text-[10px] uppercase tracking-wider">{isPlaying ? 'Auto' : 'Paused'}</span>
            </button>

            {/* Slide Counter */}
            <div className="flex items-center gap-1 tracking-widest text-[11px]">
              <span className="text-white font-black text-sm">0{currentIndex + 1}</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-400">0{SLIDES.length}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
