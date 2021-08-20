import { useCallback, useEffect, useMemo, useState } from "react";
import { Service } from "rest/common";

export function useData<T extends { _id?: string }>(user: string, name: string) {
  const [ db, setDb ] = useState<T[]>([]);

  const service = useMemo(() => new Service<T>(name), [name]);

  const getDB = useCallback(() => {
    service.findItems({ user } as any).then(setDb);
  }, [ service, user, setDb ]);

  const clearDB = useCallback(() => {
    service.clearItems({ user } as any).then(getDB);
  }, [ service, user, getDB ]);

  const uploadDB = useCallback((data: T[]) => {
    service.putItems(data.map(i => ({ ...i, user }))).then(getDB);
  }, [ service, user, getDB ]);

  const editDB = useCallback((product: Partial<T>) => {
    service.patchItem({ ...product, user }).then(getDB);
  }, [ service, user, getDB ]);

  const addDB = useCallback((product: T) => {
    service.addItem({ ...product, user }).then(getDB);
  }, [ service, user, getDB ]);

  const removeDB = useCallback((product: T) => {
    service.removeItem(product._id!).then(getDB);
  }, [ service, getDB ]);

  useEffect(getDB, [ getDB ]);

  return { db, getDB, clearDB, uploadDB, editDB, addDB, removeDB };
}