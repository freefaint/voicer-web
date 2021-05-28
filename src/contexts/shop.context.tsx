import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";

import { useCommand } from "../hooks/useCommand";
import { useSpeech } from "../hooks/useSpeech";
import { useTimeout } from "../hooks/useTimeout";

import { Product } from "../types/product";
import { Shop } from "../types/shop";

import { CartContext } from "./cart.context";

export const ShopContext = createContext<Shop | undefined>(undefined);

export const ShopProvider = ({ children, products }: PropsWithChildren<{ products: Product[] }>) => {
  const demoTimer = useTimeout(180);

  const [ currentId, setCurrentId ] = useState<string>();

  const speech = useSpeech();
  const cart = useContext(CartContext);

  const close = useCallback(() => {
    demoTimer.reset();
    setCurrentId(undefined);
  }, [ setCurrentId, demoTimer ]);

  const selectRandom = useCallback(() => {
    setCurrentId(products[Math.ceil(Math.random() * products.length) - 1].id);
  }, [ setCurrentId, products ]);

  const add = useCallback((id: string, count?: number) => {
    demoTimer.reset();
    cart?.add(id, count);
    close();
  }, [ cart, demoTimer, close ]);

  const remove = useCallback((id: string) => {
    demoTimer.reset();
    cart?.del(id);
  }, [ cart, demoTimer ]);

  const count = useCallback((id: string, count: number) => {
    demoTimer.reset();
    cart?.count(id, count);
  }, [cart, demoTimer]);

  useEffect(() => {
    if (!demoTimer.seconds) {
      cart?.clear();
      selectRandom();
      demoTimer.reset();
    }
  }, [cart, demoTimer, demoTimer.seconds, selectRandom]);

  useEffect(() => {
    const variants = products
      .map(i => ({
        ...i,
        results: [
          {
            name: i.name, 

            results: speech?.results.map(k => ({
              speech: k,
              ok: k.toLowerCase().indexOf(i.name.replace(/[()"«»]/, '').toLowerCase().trim()) !== -1 
            }))
          },

          ...i.names.map(j => ({
            name: j,
            
            results: speech?.results.map(k => ({
              speech: k,
              ok: k.toLowerCase().indexOf(j.toLowerCase().trim()) !== -1 }) )
            }))
        ]
      }) )
      .filter(i => i.results?.find(j => j.results?.find(k => k.ok)))
      .sort((a, b) => {
        const first = Math.max(...a.results.filter(i => i.results?.find(j => j.ok)).map(i => i.name.length));
        const second = Math.max(...b.results.filter(i => i.results?.find(j => j.ok)).map(i => i.name.length));
  
        return first > second ? -1 : first < second ? 1 : 0;
      });

    console.log('VARIANTS', variants);

    const target = variants[0];

    if (target && currentId !== target.id) {
      setCurrentId(target.id);
    }
  }, [ speech, products, currentId ]);

  useCommand('закрыть', () => {
    demoTimer.reset();
    close()
  });

  useCommand('добавить', command => {
    if (currentId) {
      demoTimer.reset();
      cart?.add(currentId, 1);
    }
  });

  useCommand('удалить', command => {
    if (currentId) {
      demoTimer.reset();
      cart?.del(currentId);
    }
  });

  const clear = useCallback(() => {
    demoTimer.reset();
    cart?.clear();
  }, [ demoTimer, cart ]);

  useCommand('очистить корзину', command => {
    demoTimer.reset();
    cart?.clear();
  });

  const context = {
    products,
    currentId,
    count,
    close,
    clear,
    resetDemoTimer: demoTimer.reset,
    add,
    remove,
    setCurrentId,
  }

  return (
    <ShopContext.Provider value={context}>
      {children}
    </ShopContext.Provider>
  );
}