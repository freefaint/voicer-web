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
  const [ count, setCount ] = useState(1);

  const speech = useSpeech();
  const cart = useContext(CartContext);

  const close = useCallback(() => {
    setCurrentId(undefined);
  }, [ setCurrentId ]);

  const selectRandom = useCallback(() => {
    setCurrentId(products[Math.ceil(Math.random() * products.length) - 1].id);
  }, [ setCurrentId, products ]);

  const add = useCallback((id: string) => cart?.add(id), [ cart ]);

  useEffect(() => {
    if (!demoTimer.seconds) {
      cart?.clear();
      selectRandom();
      demoTimer.reset();
    }
  }, [ demoTimer.seconds ]);

  useEffect(() => {
    let target;
    let variants = products.map(i => ({
      ...i,
      mainResults: speech?.results.map(k => ({ speech: k, ok: k.toLowerCase().indexOf(i.name.replace(/[\(\)]/, '').toLowerCase()) !== -1 }) ),
      namesResults: i.names.map(j => ({ name: j, results: speech?.results.map(k => ({ speech: k, ok: k.toLowerCase().indexOf(j.toLowerCase()) !== -1 }) ) }) )
    }) ).filter(i => 
      i.mainResults?.find(j => j.ok) ||
      i.namesResults?.find(j => j.results?.find(k => k.ok)));
    
    console.log('VARIANTS', variants);
    
    if (variants.find(i => i.mainResults?.find(j => j.ok))) {
      variants = variants.filter(i => i.mainResults?.find(j => j.ok)).sort((a, b) => a.name.replace(/[\(\)]/, '').length > b.name.replace(/[\(\)]/, '').length ? -1 : 1);
    } else {
      variants = variants.sort((a, b) => {
        const first = Math.max(...a.namesResults.filter(i => i.results?.find(j => j.ok)).map(i => i.name.length));
        const second = Math.max(...b.namesResults.filter(i => i.results?.find(j => j.ok)).map(i => i.name.length));

        return first > second ? -1 : first < second ? 1 : 0;
      });
    }
    
    console.log('SORTED VARIANTS', variants);
    console.log('FINAL VARIANT', variants[0]);

    target = variants[0];

    if (target && currentId !== target.id) {
      setCurrentId(target.id);
    }
  }, [ speech, products, currentId ]);

  useEffect(() => {
    setCount(1);
  }, [ currentId ]);

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

  useCommand('очистить корзину', command => {
    demoTimer.reset();
    cart?.clear();
  });

  const context = {
    products,
    currentId,
    count,
    close,
    resetDemoTimer: demoTimer.reset,
    add,
  }

  return (
    <ShopContext.Provider value={context}>
      {children}
    </ShopContext.Provider>
  );
}