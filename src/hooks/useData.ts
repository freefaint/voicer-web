import { useCallback, useEffect, useState } from "react";
import * as ProductsService from '../rest/products';
import { Product } from "../types/product";


export const useData = (user: string) => {
  const [ db, setDb ] = useState<Product[]>([]);

  const getDB = useCallback(() => {
    ProductsService.findItems({ user }).then(setDb);
  }, [ user ]);

  const clearDB = useCallback(() => {
    ProductsService.findItems({ user }).then(setDb);
  }, [ user ]);

  const uploadDB = useCallback((data: Product[]) => {
    ProductsService.findItems({ user }).then(setDb);
  }, [ user ]);

  const editDB = useCallback((product: Partial<Product>) => {
    ProductsService.findItems({ user }).then(setDb);
  }, [ user ]);

  const addDB = useCallback((product: Product) => {
    ProductsService.findItems({ user }).then(setDb);
  }, [ user ]);

  const removeDB = useCallback((product: Product) => {
    ProductsService.findItems({ user }).then(setDb);
  }, [ user ]);

  useEffect(getDB, [ getDB ]);

  return { db, getDB, clearDB, uploadDB, editDB, addDB, removeDB };
}