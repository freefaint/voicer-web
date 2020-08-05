// Libs
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Redux
import { IState } from './state';
import { Reducer } from './reducer';

export interface IStore {
  store: IState;
}

// Compose reducers
const reducers = combineReducers({
  store: Reducer,
});

// Apply middlewares
let enhancer = applyMiddleware(thunkMiddleware);

export const Store = createStore(reducers, enhancer);
