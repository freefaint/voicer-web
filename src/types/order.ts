export interface Order {
  _id?: String;

  orderNumber: number;
  date: string;
  shop?: string;
  export?: boolean;
  total: number;
  bill?: Buffer;

  products: {
    id: string;
    name: string;
    cost: number;
    count: number;
  }[];
}