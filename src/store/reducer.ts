// Redux
import { Actions } from './actions';
import { ActionTypes } from './action-types';
import { IState, InitialState } from './state';

export function Reducer(state: IState = InitialState, action?: Actions): IState {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case ActionTypes.FETCH: {
      const { fetching } = action.payload;

      return {
        ...state,

        fetching,
      };
    }

    case ActionTypes.ERROR: {
      const { error } = action.payload;

      return {
        ...state,

        error,
      };
    }

    case ActionTypes.GET_USER: {
      const { user } = action.payload;

      return {
        ...state,

        user,

        loaded: true,

        userDisabled: undefined,
        badCredentials: undefined,
      };
    }

    case ActionTypes.LOGOUT: {
      return {
        ...state,

        user: undefined,
        badCredentials: undefined,
        userDisabled: undefined,
      };
    }

    case ActionTypes.ACCESS_DENIED: {
      return {
        ...state,

        loaded: true,

        user: undefined,
      };
    }

    case ActionTypes.BAD_CREDENTIALS: {
      const { badCredentials } = action.payload;

      return {
        ...state,

        badCredentials,
      };
    }

    default:
      return state;
  }
}
