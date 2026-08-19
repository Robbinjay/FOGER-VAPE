export interface FlavorTheme {
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
  badgeBg: string;
  badgeText: string;
  type: 'mint' | 'berry' | 'citrus' | 'tropical' | 'dessert' | 'candy' | 'ice' | 'classic';
}

export function getFlavorTheme(flavorName?: string, category?: string): FlavorTheme {
  const name = (flavorName || '').toLowerCase();

  // Mint / Menthol / Ice
  if (name.includes('mint') || name.includes('wintergreen') || name.includes('spearmint')) {
    return {
      primaryColor: '#10b981',
      secondaryColor: '#06b6d4',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      badgeText: 'Arctic Mint',
      type: 'mint'
    };
  }

  if (name.includes('blue razz') || name.includes('blue rancher') || name.includes('blue sour') || name.includes('blue dragon')) {
    return {
      primaryColor: '#0ea5e9',
      secondaryColor: '#3b82f6',
      glowColor: 'rgba(14, 165, 233, 0.3)',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      badgeText: 'Blue Razz Iced',
      type: 'berry'
    };
  }

  if (name.includes('watermelon') || name.includes('melon')) {
    return {
      primaryColor: '#f43f5e',
      secondaryColor: '#10b981',
      glowColor: 'rgba(244, 63, 94, 0.25)',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      badgeText: 'Lush Watermelon',
      type: 'tropical'
    };
  }

  if (name.includes('banana')) {
    return {
      primaryColor: '#eab308',
      secondaryColor: '#facc15',
      glowColor: 'rgba(234, 179, 8, 0.25)',
      badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      badgeText: 'Sweet Banana',
      type: 'candy'
    };
  }

  if (name.includes('cherry')) {
    return {
      primaryColor: '#e11d48',
      secondaryColor: '#9f1239',
      glowColor: 'rgba(225, 29, 72, 0.3)',
      badgeBg: 'bg-red-500/20 text-red-300 border-red-500/30',
      badgeText: 'Rich Cherry',
      type: 'berry'
    };
  }

  if (name.includes('grape')) {
    return {
      primaryColor: '#a855f7',
      secondaryColor: '#7c3aed',
      glowColor: 'rgba(168, 85, 247, 0.3)',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      badgeText: 'Juicy Grape',
      type: 'candy'
    };
  }

  if (name.includes('peach')) {
    return {
      primaryColor: '#fb923c',
      secondaryColor: '#f43f5e',
      glowColor: 'rgba(251, 146, 60, 0.25)',
      badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      badgeText: 'Orchard Peach',
      type: 'tropical'
    };
  }

  if (name.includes('strawberry') || name.includes('berry')) {
    return {
      primaryColor: '#f43f5e',
      secondaryColor: '#be123c',
      glowColor: 'rgba(244, 63, 94, 0.25)',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      badgeText: 'Wild Berry',
      type: 'berry'
    };
  }

  if (name.includes('mango') || name.includes('pineapple') || name.includes('passion') || name.includes('tropical') || name.includes('kiwi')) {
    return {
      primaryColor: '#f59e0b',
      secondaryColor: '#ea580c',
      glowColor: 'rgba(245, 158, 11, 0.25)',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      badgeText: 'Tropical Exotic',
      type: 'tropical'
    };
  }

  if (name.includes('lemon') || name.includes('orange') || name.includes('citrus') || name.includes('lime')) {
    return {
      primaryColor: '#eab308',
      secondaryColor: '#84cc16',
      glowColor: 'rgba(234, 179, 8, 0.25)',
      badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      badgeText: 'Zesty Citrus',
      type: 'citrus'
    };
  }

  if (name.includes('fab') || name.includes('burst') || name.includes('candy') || name.includes('cotton candy') || name.includes('gush')) {
    return {
      primaryColor: '#ec4899',
      secondaryColor: '#8b5cf6',
      glowColor: 'rgba(236, 72, 153, 0.3)',
      badgeBg: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
      badgeText: 'Rainbow Candy',
      type: 'candy'
    };
  }

  if (name.includes('coffee') || name.includes('chocolate') || name.includes('cupcake') || name.includes('vanilla')) {
    return {
      primaryColor: '#d97706',
      secondaryColor: '#78350f',
      glowColor: 'rgba(217, 119, 6, 0.2)',
      badgeBg: 'bg-amber-800/30 text-amber-200 border-amber-700/40',
      badgeText: 'Gourmet Dessert',
      type: 'dessert'
    };
  }

  // Default by Category
  if (category === 'Foger Switch Pro' || category === 'Switch Pro Pods') {
    return {
      primaryColor: '#facc15',
      secondaryColor: '#eab308',
      glowColor: 'rgba(250, 204, 21, 0.2)',
      badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      badgeText: 'Switch Pro 30K',
      type: 'classic'
    };
  }

  if (category === 'Accessories') {
    return {
      primaryColor: '#38bdf8',
      secondaryColor: '#0284c7',
      glowColor: 'rgba(56, 189, 248, 0.2)',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      badgeText: 'Hardware Gear',
      type: 'classic'
    };
  }

  return {
    primaryColor: '#facc15',
    secondaryColor: '#fb923c',
    glowColor: 'rgba(250, 204, 21, 0.2)',
    badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    badgeText: 'Foger Bit 35K',
    type: 'classic'
  };
}
