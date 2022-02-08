import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { logout } from '../actions/auth.actions';
import { authReducer } from './auth.reducer';
import { expenseReducer } from './expense.reducer';
import { userReducer } from './user.reducers';

export const reducers: ActionReducerMap<any> = {
  users: userReducer,
  expenses: expenseReducer,
  auth: authReducer
};

const debugMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
};

const logoutMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    if (action?.type === logout.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer<any>[] = environment.production
  ? [logoutMeta]
  : [debugMeta];
