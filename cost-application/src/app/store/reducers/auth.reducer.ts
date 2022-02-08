import { User } from 'src/app/models/user.model';
import { AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  loggedIn: Boolean;
  user: User;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined,
};

export function authReducer(state = initialAuthState, action: any): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login:
      return {
        loggedIn: true,
        user: JSON.parse(JSON.stringify(action.user)), // the date || Array [object] entity cannot process
      };
    case AuthActionTypes.Logout:
      localStorage.removeItem('user');
      return {
        loggedIn: false,
        user: undefined,
      };

    default:
      return state;
  }
}
