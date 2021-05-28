import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";

import { useCommand } from "../hooks/useCommand";
import { useSpeech } from "../hooks/useSpeech";
import { useTimeout } from "../hooks/useTimeout";

import { Product } from "../types/product";
import { Shop } from "../types/shop";

import { CartContext } from "./cart.context";

export const ShopContext = createContext<Shop | undefined>(undefined);

export const ShopProvider = ({ children, products }: PropsWithChildren<{ products: Product[] }>) => {
  const { seconds, reset } = useTimeout(180);

  const [ currentId, setCurrentId ] = useState<string>();

  const speech = useSpeech();
  const cart = useContext(CartContext);

  const close = useCallback(() => {
    reset();
    setCurrentId(undefined);
  }, [ setCurrentId, reset ]);

  const selectRandom = useCallback(() => {
    setCurrentId(products[Math.ceil(Math.random() * products.length) - 1].id);
  }, [ setCurrentId, products ]);

  const add = useCallback((id: string, count?: number) => {
    reset();
    cart?.add(id, count);
    close();
  }, [ cart, reset, close ]);

  const remove = useCallback((id: string) => {
    reset();
    cart?.del(id);
  }, [ cart, reset ]);

  const count = useCallback((id: string, count: number) => {
    reset();
    cart?.count(id, count);
  }, [cart, reset]);

  const clear = useCallback(() => {
    reset();
    cart?.clear();
  }, [ reset, cart ]);

  useEffect(() => {
    if (!seconds) {
      cart?.clear();
      selectRandom();
      reset();
    }
  }, [cart, reset, seconds, selectRandom]);

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

  useCommand('закрыть', close);

  useCommand('добавить', _command => {
    if (currentId) {
      add(currentId, 1);  
    }
  });

  useCommand('удалить', () => {
    if (currentId) {
      remove(currentId);
    }
  });

  useCommand('очистить корзину', clear);

  const context = {
    products,
    currentId,
    count,
    close,
    clear,
    resetDemoTimer: reset,
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