// Rest
import { get, post, patch, put, del } from '.';

// Types
import { Group } from '../types/group';

export const getItem = (id: string) => {
  return get('/groups/' + id);
}

export const getItems = (): Promise<Group[]> => {
  return get('/groups/');
}

export const findItems = (data: Partial<Group>): Promise<Group[]> => {
  return post('/groups/find/', data);
}

export const addItem = (data: Group) => {
  return post('/groups', data);
}

export const putItems = (data: Group[]) => {
  return put('/groups', data);
}

export const patchItem = (data: Partial<Group>) => {
  return patch(`/groups/${data._id}`, data);
}

export const removeItem = (id: string) => {
  return del(`/groups/${id}`);
}

export const clearItems = (item: Partial<Group>) => {
  return post(`/groups/remove`, item);
}