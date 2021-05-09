import { Product } from "./product";

export interface Shop {
  products: Product[];
  current?: Product;
  count?: number;
  clear: () => void;
}