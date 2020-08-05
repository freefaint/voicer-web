// Rest
import { get, post, patch } from './common';

// Types
import { IUser } from 'types/users';
import { IMessage } from 'types/messages';

export const getDialogs = (): Promise<IUser[]> => {
  return get('/messages');
}

export const getDialog = (id: string): Promise<IMessage[]> => {
  return get(`/messages/${id}`);
}

export const send = (id: string, data: { text: string }) => {
  return post('/messages/' + id, data);
}

export const read = (id: string) => {
  return patch('/messages/' + id);
}