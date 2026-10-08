'use client';

import React, { createContext, useContext, useState, useSyncExternalStore, useCallback } from 'react';
import { Product } from './data';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Listeners for external store updates (supporting multi-tab and local syncing)
const listeners = new Set<() => void>();
function subscribe(callback: () => void) {
  listeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'foger-cart') {
      callback();
    }
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
    }
  };
}

function notify() {
  listeners.forEach((listener) => listener());
}

let cachedCartString: string | null = null;
let cachedCartItems: CartItem[] = [];
const SERVER_CART_SNAPSHOT: CartItem[] = [];

function getClientSnapshot(): CartItem[] {
  if (typeof window === 'undefined') return SERVER_CART_SNAPSHOT;
  try {
    const raw = localStorage.getItem('foger-cart') || '[]';
    if (raw !== cachedCartString) {
      cachedCartString = raw;
      const parsed = JSON.parse(raw);
      cachedCartItems = Array.isArray(parsed) ? parsed : [];
    }
    return cachedCartItems;
  } catch (e) {
    console.error('Failed to parse cart snapshot', e);
    return [];
  }
}

function getServerSnapshot(): CartItem[] {
  return SERVER_CART_SNAPSHOT;
}

function saveCartToStorage(items: CartItem[]) {
  try {
    const raw = JSON.stringify(items);
    cachedCartString = raw;
    cachedCartItems = items;
    if (typeof window !== 'undefined') {
      localStorage.setItem('foger-cart', raw);
    }
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
  notify();
}

const emptySubscribe = () => () => {};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const isLoaded = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    const currentItems = getClientSnapshot();
    const existing = currentItems.find((item) => item.id === product.id);
    let nextItems: CartItem[];
    if (existing) {
      nextItems = currentItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      nextItems = [...currentItems, { ...product, quantity }];
    }
    saveCartToStorage(nextItems);
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    const currentItems = getClientSnapshot();
    const nextItems = currentItems.filter((item) => item.id !== productId);
    saveCartToStorage(nextItems);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const currentItems = getClientSnapshot();
    if (quantity <= 0) {
      saveCartToStorage(currentItems.filter((item) => item.id !== productId));
      return;
    }
    const nextItems = currentItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    saveCartToStorage(nextItems);
  }, []);

  const clearCart = useCallback(() => {
    saveCartToStorage([]);
  }, []);

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
