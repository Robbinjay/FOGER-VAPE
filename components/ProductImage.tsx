'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getFlavorTheme } from '@/lib/flavor-themes';
import { Sparkles } from 'lucide-react';

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
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (src && !src.includes('picsum.photos')) return src;
    // Map to clean local assets
    if (subCategory === 'Switch Pro Battery') return '/images/switch-battery.jpg';
    if (subCategory === 'Chargers & Cables') return '/images/charger-cable.jpg';
    if (subCategory === 'Foger Flavor Drops') return '/images/flavor-drops.jpg';
    if (category === 'Foger Switch Pro') return '/images/switch-pro-kit.jpg';
    if (category === 'Switch Pro Pods') return '/images/switch-pro-pod.jpg';
    return '/images/foger-bit-35k.jpg';
  });

  const [hasError, setHasError] = useState(false);
  const theme = getFlavorTheme(flavor, category);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (category === 'Foger Switch Pro') {
        setImgSrc('/images/switch-pro-kit.jpg');
      } else if (category === 'Switch Pro Pods') {
        setImgSrc('/images/switch-pro-pod.jpg');
      } else if (subCategory === 'Switch Pro Battery') {
        setImgSrc('/images/switch-battery.jpg');
      } else if (subCategory === 'Chargers & Cables') {
        setImgSrc('/images/charger-cable.jpg');
      } else if (subCategory === 'Foger Flavor Drops') {
        setImgSrc('/images/flavor-drops.jpg');
      } else {
        setImgSrc('/images/foger-bit-35k.jpg');
      }
    }
  };

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${fill ? 'w-full h-full' : ''}`}>
      {/* Dynamic Flavor Aura Glow */}
      {showAura && (
        <div
          className="absolute inset-0 pointer-events-none opacity-40 blur-2xl transition-all duration-700 -z-0"
          style={{
            background: `radial-gradient(circle, ${theme.glowColor} 0%, rgba(0,0,0,0) 70%)`,
          }}
        />
      )}

      {fill ? (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          onError={handleError}
          className={`object-contain transition-transform duration-500 relative z-10 ${className}`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          width={width || 300}
          height={height || 300}
          priority={priority}
          onError={handleError}
          className={`object-contain transition-transform duration-500 relative z-10 ${className}`}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}
