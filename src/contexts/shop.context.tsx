import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";

import { useCommand } from "../hooks/useCommand";
import { useSpeech } from "../hooks/useSpeech";
import { useTimeout } from "../hooks/useTimeout";

import { Product } from "../types/product";
import { Shop } from "../types/shop";

import { CartContext } from "./cart.context";

export const ShopContext = createContext<Shop | undefined>(undefined);

export const ShopProvider = ({ children, products }: PropsWithChildren<{ products: Product[] }>) => {
  const demoTimer = useTimeout(60);

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
    console.log(speech);
    const target = products.find(i => speech?.results.find(k => k.toLowerCase().indexOf(i.name.toLowerCase()) !== -1) || i.names.find(j => speech?.results.find(k => k.toLowerCase().indexOf(j.toLowerCase()) !== -1)));

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