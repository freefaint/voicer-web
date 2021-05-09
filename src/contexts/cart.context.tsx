import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Cart, Position } from "../types/cart";

export const CartContext = createContext<Cart | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const [ products, setProducts ] = useState<Position[]>([]);

  const add = useCallback((id: string, count?: number) => {
    setProducts(items => {
      return !items.find(i => i.id === id)
        ? [ ...items, { id, count: count ?? 1 } ]
        : items.map(i => i.id === id ? { id, count: i.count + (count ?? 1) } : i);
    });
  }, [ setProducts ]);

  const del = useCallback((id: string, count?: number) => {
    setProducts(items => {
      const item = items.find(i => i.id === id);

      if (!item) {
        return items;
      }

      const result = item.count === 1 || item.count === count ? items.filter(i => i.id !== id) : items.map(i => i.id === id ? { id, count: i.count - (count ?? i.count) } : i);

      return result.filter(i => i.count);
    })
  }, [ setProducts ]);

  const clear = useCallback(() => {
    setProducts([]);
  }, [ setProducts ]);

  console.log(products);

  const context = {
    products,
    add,
    del,
    clear
  }

  return (
    <CartContext.Provider value={context}>
      {children}
    </CartContext.Provider>
  );
}