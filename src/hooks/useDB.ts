import { useEffect, useState } from "react";


export const useDB = <T>(data: T[]) => {
  const [ db, setDb ] = useState<T[]>(data);

  useEffect(() => {
    setInterval(async () => {
      try {
        setDb(await fetch('/products.json').then(resp => resp.json()));
      } catch (e) {
        console.log('no data');
      }
    }, 10000);
  }, []);

  return db;
}