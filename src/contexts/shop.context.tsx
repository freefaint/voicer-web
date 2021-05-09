import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";

import { useCommand } from "../hooks/useCommand";
import { useDB } from "../hooks/useDB";
import { useSpeech } from "../hooks/useSpeech";

import { Cart, Position } from "../types/cart";
import { Product } from "../types/product";
import { Shop } from "../types/shop";

import { CartContext } from "./cart.context";

export const ShopContext = createContext<Shop | undefined>(undefined);

export const ShopProvider = ({ children, products }: PropsWithChildren<{ products: Product[] }>) => {
  const [ currentId, setCurrentId ] = useState<string>();
  const [ count, setCount ] = useState(1);

  const speech = useSpeech();
  const cart = useContext(CartContext);

  useEffect(() => {
    console.log(speech);
    const target = products.find(i => i.names.find(j => speech?.results.find(k => k.indexOf(j) !== -1)));

    if (target) {
      setCurrentId(target.id);
    }
  }, [ speech, products ]);

  useEffect(() => {
    setCount(1);
  }, [ currentId ]);

  const clear = useCallback(() => {
    setCurrentId(undefined);
  }, [ setCurrentId ]);

  useCommand('закрыть', clear);

  useCommand('добавить', command => {
    if (currentId) {
      cart?.add(currentId, 1);
    }
  });

  useCommand('удалить', command => {
    if (currentId) {
      cart?.del(currentId);
    }
  });

  useCommand('очистить корзину', command => {
    cart?.clear();
  });

  const context = {
    products,
    current: currentId ? products.find(i => i.id === currentId) : undefined,
    count,
    clear,
  }

  return (
    <ShopContext.Provider value={context}>
      {children}
    </ShopContext.Provider>
  );
}