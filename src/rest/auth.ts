// Rest
import { get, post, patch } from '.';

// Types
import { IUser } from '../types/users';

export const login = (data: { login: string; password: string }): Promise<IUser> => {
  return post('/auth', data);
}

export const register = (user: IUser): Promise<IUser> => {
  return post('/register', user);
}

export const getUser = (): Promise<IUser> => {
  return get('/user');
}

export const updateUser = (user: IUser): Promise<null> => {
  return patch('/user', user);
}

export const verify = (user: IUser): Promise<null> => {
  return post('/verify', user);
}

export const logout = (): Promise<null> => {
  return get('/logout');
}