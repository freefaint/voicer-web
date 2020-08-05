// Rest
import { get, post, patch, del } from './common';

// Types
import { IResume } from 'types/resume';

export const getItem = (id: string) => {
  return get('/resume/' + id);
}

export const updateItem = (id: string, data: IResume) => {
  return patch('/resume/' + id, data);
}

export const findItems = (data: IResume): Promise<IResume[]> => {
  return post('/resume/find/', data);
}

export const getItems = (): Promise<IResume[]> => {
  return get('/resume/');
}

export const addItem = (data: IResume) => {
  return post('/resume', data);
}

export const removeItem = (id: string) => {
  return del('/resume/' + id);
}