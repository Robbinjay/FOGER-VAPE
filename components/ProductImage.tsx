'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getFlavorTheme } from '@/lib/flavor-themes';

interface ProductImageProps {
  src: string;
  alt: string;
  flavor?: string;
  category?: string;
  subCategory?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  showAura?: boolean;
}

export default function ProductImage({
  src,
  alt,
  flavor,
  category,
  subCategory,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  sizes,
  showAura = false,
}: ProductImageProps) {
  const getFallbackSrc = () => {
    if (subCategory === 'Switch Pro Battery') return '/images/switch-battery.jpg';
    if (subCategory === 'Chargers & Cables') return '/images/charger-cable.jpg';
    if (subCategory === 'Foger Flavor Drops') return '/images/flavor-drops.jpg';
    if (category === 'Foger Switch Pro') return '/images/switch-pro-kit.jpg';
    if (category === 'Switch Pro Pods') return '/images/switch-pro-pod.jpg';
    return '/images/foger-bit-35k.jpg';
  };

  const initialSrc = src && !src.includes('picsum.photos') ? src : getFallbackSrc();
  
  // Track previous src to reset error when src prop changes (React recommended pattern)
  const [prevSrc, setPrevSrc] = useState(src);
  const [errorSrc, setErrorSrc] = useState<string | null>(null);

  if (prevSrc !== src) {
    setPrevSrc(src);
    setErrorSrc(null);
  }

  const theme = getFlavorTheme(flavor, category);
  const currentSrc = errorSrc || initialSrc;

  const handleError = () => {
    const fallback = getFallbackSrc();
    if (currentSrc !== fallback) {
      setErrorSrc(fallback);
    }
  };

  return (
    <div className="relative flex items-center justify-center overflow-hidden w-full h-full">
      {/* Dynamic Flavor Aura Glow */}
      {showAura && (
        <div
          className="absolute inset-0 pointer-events-none opacity-40 blur-2xl transition-all duration-700 z-0"
          style={{
            background: `radial-gradient(circle, ${theme.glowColor} 0%, rgba(0,0,0,0) 70%)`,
          }}
        />
      )}

      {fill ? (
        <Image
          src={currentSrc}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          onError={handleError}
          className={`object-contain transition-transform duration-500 z-10 ${className}`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <Image
          src={currentSrc}
          alt={alt}
          width={width || 400}
          height={height || 400}
          priority={priority}
          onError={handleError}
          className={`w-auto h-auto max-w-full max-h-full object-contain transition-transform duration-500 z-10 ${className}`}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}
