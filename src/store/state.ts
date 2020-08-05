// Types
import { IUser } from 'types/users';

export interface IState {
  error?: string;
  fetching?: boolean;
  user?: IUser;
  loaded?: boolean;
  userDisabled?: boolean;
  badCredentials?: boolean;
}

export const InitialState: IState = {};
