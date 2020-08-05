// Libs
import { Dispatch } from 'redux';

// Redux
import { IStore } from 'store';
import { actions } from './actions';

// Types
import { IUser } from 'types/users';

// Rest
import * as AuthService from 'rest/auth';

export const getUser = () => (dispatch: Dispatch, getState: () => IStore) => {
  return AuthService.getUser().then(resp => dispatch(actions.getUser(resp)));
};

export const logout = () => (dispatch: Dispatch, getState: () => IStore) => {
  return AuthService.logout()
    .then(() => dispatch(actions.logout()))
    .catch(e => dispatch(actions.error(e)));
};

export const login = (data: { login: string; password: string }) => (
  dispatch: Dispatch,
  getState: () => IStore,
) => {
  dispatch(actions.fetch(true));
  dispatch(actions.badCredentials(false));

  AuthService.login(data)
    .then(() => {
      dispatch(actions.fetch(false));

      getUser()(dispatch, getState);
    })
    .catch(() => {
      dispatch(actions.fetch(false));
      dispatch(actions.badCredentials(true));
    });
};

export const verify = (data: { code: string }) => (
  dispatch: Dispatch,
  getState: () => IStore,
) => {
  dispatch(actions.fetch(true));
  dispatch(actions.badCredentials(false));

  AuthService.verify(data)
    .then(() => {
      dispatch(actions.fetch(false));

      getUser()(dispatch, getState);
    })
    .catch(() => {
      dispatch(actions.fetch(false));
      dispatch(actions.badCredentials(true));
    });
};

export const updateUser = (data: IUser) => (
  dispatch: Dispatch,
  getState: () => IStore,
) => {
  dispatch(actions.fetch(true));
  dispatch(actions.badCredentials(false));

  AuthService.updateUser(data)
    .then(() => {
      dispatch(actions.fetch(false));

      getUser()(dispatch, getState);
    })
    .catch(() => {
      dispatch(actions.fetch(false));
      dispatch(actions.badCredentials(true));
    });
};

export const register = (user: IUser) => (
  dispatch: Dispatch,
  getState: () => IStore,
) => {
  dispatch(actions.fetch(true));

  AuthService.register(user)
    .then(() => {
      dispatch(actions.fetch(false));

      getUser()(dispatch, getState);
    })
    .catch(() => {
      dispatch(actions.fetch(false));
    });
};