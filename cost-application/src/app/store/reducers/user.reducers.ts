import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from 'src/app/models/user.model';
import { userActionTypes } from '../actions/user.actions';
import { logout } from '../actions/auth.actions';

export interface UserState extends EntityState<User> {}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: UserState = adapter.getInitialState({
  entities: [],
  ids: [],
});

export const userReducer = createReducer(
  initialState,

  on(userActionTypes.getAllUsersSuccess, (state, action) => {
    return adapter.setAll([...action.users], state);
  }),
  on(userActionTypes.addUserSuccess, (state, action) => {
    return adapter.addOne(action.user, state);
  }),
  on(userActionTypes.deleteUserSuccess, (state, action) => {
    return adapter.removeOne(action.userId, state);
  }),
  on(userActionTypes.updateUserSuccess, (state, { user }) => {
    return adapter.updateOne(
      { id: user.id + '', changes: JSON.parse(JSON.stringify(user)) },
      state
    );
  })
);

export const { selectAll, selectIds, selectEntities, selectTotal } = adapter.getSelectors();
