export type Position = {
  id: string;
  count: number;
}

export type Cart = {
  products: Position[];
  add: (id: string, count?: number) => void;
  del: (id: string, count?: number) => void;
  clear: () => void;
}
