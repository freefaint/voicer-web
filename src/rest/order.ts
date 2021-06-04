// Rest
import { get, post, patch, put, del } from './common';

// Types
import { Order } from '../types/order';

export const getItem = (id: string) => {
  return get('/order/' + id);
}

export const getItems = (): Promise<Order[]> => {
  return get('/order/');
}

export const findItems = (data: Partial<Order>): Promise<Order[]> => {
  return post('/order/find/', data);
}

export const addItem = (data: Order) => {
  return post('/order', data);
}

export const putItems = (data: Order[]) => {
  return put('/order', data);
}

export const patchItem = (data: Partial<Order>) => {
  return patch(`/order/${data._id}`, data);
}

export const removeItem = (id: string) => {
  return del(`/order/${id}`);
}

export const clearItems = (product: Partial<Order>) => {
  return del(`/order`, product);
}

export const getLatest = (): Promise<Order> => {
  return patch(`/order`);
}