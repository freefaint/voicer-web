import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "types/product";

import { useCommand } from "../hooks/useCommand";
import { useData } from "../hooks/useData";
import { useTimeout } from "../hooks/useTimeout";

import { Shop } from "../types/shop";

import { CartContext } from "./cart.context";
import { SpeechContext } from "./speech.context";

export const ShopContext = createContext<Shop>({
  demo: false,
  products: [],
  // currentId,
  count: () => void 0,
  close: () => void 0,
  clear: () => void 0,
  resetDemoTimer: () => void 0,
  add: () => void 0,
  remove: () => void 0,
  setCurrentId: () => void 0,
  clearDB: () => void 0,
  uploadDB: () => void 0,
  removeDB: () => void 0,
  addDB: () => void 0,
  editDB: () => void 0,
});

export const ShopProvider = ({ children, user, onLogout }: PropsWithChildren<{ onLogout: () => void; user: string }>) => {
  const { db: products, clearDB, uploadDB, editDB, addDB, removeDB } = useData<Product>(user, "products");
  
  const { seconds, reset: resetTimer } = useTimeout(60);
  const [ demo, setDemo ] = useState(true);

  useCommand('мексиканский член', () => {
    onLogout();
  });

  const [currentId, setCurrentId] = useState<string>();

  const speech = useContext(SpeechContext);
  const cart = useContext(CartContext);

  const reset = useCallback(() => {
    setDemo(false);
    resetTimer();
  }, [resetTimer]);

  const setCurrent = useCallback((id?: string) => {
    if (currentId !== id) {
      setCurrentId(id);
    }
    reset();
  }, [setCurrentId, reset, currentId]);

  const close = useCallback(() => {
    reset();
    setCurrentId(undefined);
  }, [setCurrentId, reset]);

  const add = useCallback((id: string, count?: number) => {
    reset();
    cart.add(id, count);
    close();
  }, [cart, reset, close]);

  const remove = useCallback((id: string) => {
    reset();
    cart.del(id);
  }, [cart, reset]);

  const count = useCallback((id: string, count: number) => {
    reset();
    cart.count(id, count);
  }, [cart, reset]);

  const clear = useCallback(() => {
    reset();
    cart.clear();
  }, [reset, cart]);

  useEffect(() => {
    if (!seconds) {
      cart.clear();
      close();
      setDemo(true);
    }
  }, [cart, close, setDemo, seconds]);

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
              ok: k.toLowerCase().indexOf(j.toLowerCase().trim()) !== -1
            }))
          }))
        ]
      }))
      .filter(i => i.results?.find(j => j.results?.find(k => k.ok)))
      .sort((a, b) => {
        const first = Math.max(...a.results.filter(i => i.results?.find(j => j.ok)).map(i => i.name.length));
        const second = Math.max(...b.results.filter(i => i.results?.find(j => j.ok)).map(i => i.name.length));

        return first > second ? -1 : first < second ? 1 : 0;
      });

    console.log('VARIANTS', variants);

    const target = variants[0];

    if (target) {
      setCurrent(target._id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speech, products]);

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

  const context = useMemo(() => ({
    demo,
    products,
    currentId,
    count,
    close,
    clear,
    resetDemoTimer: reset,
    add,
    remove,
    setCurrentId: setCurrent,
    clearDB,
    uploadDB,
    removeDB,
    addDB,
    editDB,
  }), [products, currentId, demo, count, close, clear, reset, add, remove, setCurrent, clearDB, uploadDB, removeDB, addDB, editDB]);
  
  return (
    <ShopContext.Provider value={context}>
      {children}
    </ShopContext.Provider>
  );
}