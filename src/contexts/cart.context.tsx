import { createContext, PropsWithChildren, useCallback, useState } from "react";
import { Cart, Position } from "../../src/types/cart";

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

  const count = useCallback((id: string, count: number) => {
    setProducts(items => {
      return items.map(i => i.id === id ? { id, count } : i);
    });
  }, [ setProducts ]);

  const del = useCallback((id: string) => {
    setProducts(items => {
      return items.filter(i => i.id !== id);
    })
  }, [ setProducts ]);

  const clear = useCallback(() => {
    setProducts([]);
  }, [ setProducts ]);

  // console.log(products);

  const context = {
    products,
    add,
    del,
    count,
    clear
  }

  return (
    <CartContext.Provider value={context}>
      {children}
    </CartContext.Provider>
  );
}