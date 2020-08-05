// Rest
import { get, post, patch, del } from './common';

// Types
import { IVacancy } from 'types/vacancy';

export const getItem = (id: string) => {
  return get('/vacancy/' + id);
}

export const updateItem = (id: string, data: IVacancy) => {
  return patch('/vacancy/' + id, data);
}

export const findItems = (data: IVacancy): Promise<IVacancy[]> => {
  return post('/vacancy/find/', data);
}

export const getItems = (): Promise<IVacancy[]> => {
  return get('/vacancy/');
}

export const addItem = (data: IVacancy) => {
  return post('/vacancy', data);
}

export const removeItem = (id: string) => {
  return del('/vacancy' + id);
}