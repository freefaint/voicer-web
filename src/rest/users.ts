// Rest
import { get, post } from './common';

// Types
import { IUser } from '../types/users';

export const getItem = (id: string) => {
  return get('/users/' + id);
}

export const getItems = (): Promise<IUser[]> => {
  return get('/users/');
}

export const findItems = (data: IUser): Promise<IUser[]> => {
  return post('/users/find/', data);
}

export const addItem = (data: IUser) => {
  return post('/users', data);
}