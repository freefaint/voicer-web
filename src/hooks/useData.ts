import { useCallback, useEffect, useState } from "react";
import * as ProductsService from '../rest/products';
import { Product } from "../types/product";


export const useData = (user: string) => {
  const [ db, setDb ] = useState<Product[]>([]);

  const getDB = useCallback(() => {
    ProductsService.findItems({ user }).then(setDb);
  }, [ user ]);

  const clearDB = useCallback(() => {
    ProductsService.clearItems({ user }).then(getDB);
  }, [ user, getDB ]);

  const uploadDB = useCallback((data: Product[]) => {
    ProductsService.putItems(data.map(i => ({ ...i, user }))).then(getDB);
  }, [ user, getDB ]);

  const editDB = useCallback((product: Partial<Product>) => {
    ProductsService.patchItem({ ...product, user }).then(getDB);
  }, [ user, getDB ]);

  const addDB = useCallback((product: Product) => {
    ProductsService.addItem({ ...product, user }).then(getDB);
  }, [ user, getDB ]);

  const removeDB = useCallback((product: Product) => {
    ProductsService.removeItem(product._id!).then(getDB);
  }, [ getDB ]);

  useEffect(getDB, [ getDB ]);

  return { db, getDB, clearDB, uploadDB, editDB, addDB, removeDB };
}