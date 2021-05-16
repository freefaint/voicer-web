import { Product } from "./product";

export interface Shop {
  products: Product[];
  currentId?: string;
  count?: number;
  close: () => void;
  add: (id: string) => void;
  resetDemoTimer: () => void;
}