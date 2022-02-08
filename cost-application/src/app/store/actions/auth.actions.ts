import { Action, createAction } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export enum AuthActionTypes {
  Login = '[Login] Login',
  Logout = '[Auth] Logout',
}

export const login = createAction(AuthActionTypes.Login, (user: User) => ({
  user,
}));

export const logout = createAction(AuthActionTypes.Logout);

export const authActions = {
  login,
  logout,
};
