// src/context/CartContext.tsx
'use client';

import { createContext, useState, useCallback, ReactNode } from 'react';

interface CartContextType {
  itemCount: number;
  addItem: () => void;
  removeItem: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itemCount, setItemCount] = useState(0);

  const addItem = useCallback(() => setItemCount((c) => c + 1), []);
  const removeItem = useCallback(() => setItemCount((c) => Math.max(0, c - 1)), []);

  return (
    <CartContext.Provider value={{ itemCount, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}