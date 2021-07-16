// Rest
import { get, post, patch, put, del } from './common';

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

export const putItems = (data: Product[]) => {
  return put('/products', data);
}

export const patchItem = (data: Partial<Product>) => {
  return patch(`/products/${data._id}`, data);
}

export const removeItem = (id: string) => {
  return del(`/products/${id}`);
}

export const clearItems = (product: Partial<Product>) => {
  return post(`/products/remove`, product);
}