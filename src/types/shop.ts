import { Product } from "./product";

export interface Shop {
  products: Product[];
  currentId?: string;
  count: (id: string, count: number) => void;
  close: () => void;
  clear: () => void;
  add: (id: string, count?: number) => void;
  remove: (is: string) => void;
  resetDemoTimer: () => void;
  setCurrentId: (id: string) => void;
}