import { useEffect, useState } from "react";


export const useDB = <T>(data: T[], source: () => Promise<T[]>) => {
  const [ db, setDb ] = useState<T[]>(data);

  useEffect(() => {
    setInterval(async () => {
      try {
        const products = await source();
        
        setDb(products);
      } catch (e) {
        console.log('no data');
      }
    }, 10000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return db;
}