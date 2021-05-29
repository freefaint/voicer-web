// Rest
import { get, post } from './common';

// Types
import { Product } from '../types/product';

export const getItem = (id: string) => {
  return get('/products/' + id);
}

export const getItems = (): Promise<Product[]> => {
  return get('/products/');
}

export const findItems = (data: Partial<Product>): Promise<Product[]> => {
  return post('/products/find/', data);
}

export const addItem = (data: Product) => {
  return post('/products', data);
}