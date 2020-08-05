// Types
import { IUser } from 'types/users';

// Redux
import { ActionTypes } from './action-types';
import { createAction, ActionsUnion } from './common';

export const actions = {
  error: (error?: any) => createAction(ActionTypes.ERROR, { error }),
  fetch: (fetching?: boolean) => createAction(ActionTypes.FETCH, { fetching }),
  logout: () => createAction(ActionTypes.LOGOUT),
  getUser: (user: IUser) => createAction(ActionTypes.GET_USER, { user }),
  accessDenied: () => createAction(ActionTypes.ACCESS_DENIED),
  badCredentials: (badCredentials?: boolean) => createAction(ActionTypes.BAD_CREDENTIALS, { badCredentials }),
};

export type Actions = ActionsUnion<typeof actions>;
