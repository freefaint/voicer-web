import { Product } from "types/product";

export function group(arr: Product[]) {
  return arr.reduce<Record<string, Product[]>>((record, item) => {
    if (!record[item.category]) {
      record[item.category] = [ item ];
    } else {
      record[item.category].push(item);
    }

    return record;
  }, {});
}