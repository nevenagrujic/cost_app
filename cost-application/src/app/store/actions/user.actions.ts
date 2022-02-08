import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { Update } from '@ngrx/entity';

export enum UserActionTypes {
  ACTION_GET_ALL = '[User] Get all users',
  ACTION_GET_ALL_SUCCESS = '[User] Get all users success',
  ACTION_ADD_USER = '[User] Add user',
  ACTION_ADD_USER_SUCCESS = '[User] Add user success',
  ACTION_DELETE_USER = '[User] Delete user',
  ACTION_DELETE_USER_SUCCESS = '[User] Delete user success',
  ACTION_UPDATE_USER = '[User] Update user',
  ACTION_UPDATE_USER_SUCCESS = '[User] Update user success',
  ACTION_SELECT_USER = '[User] Select user',
}

export const getAllUsers = createAction(UserActionTypes.ACTION_GET_ALL);

export const getAllUsersSuccess = createAction(
  UserActionTypes.ACTION_GET_ALL_SUCCESS,
  (users: Array<User>) => ({ users })
);

export const addUser = createAction(
  UserActionTypes.ACTION_ADD_USER,
  (user: User) => ({ user })
);

export const addUserSuccess = createAction(
  UserActionTypes.ACTION_ADD_USER_SUCCESS,
  (user: User) => ({ user })
);

export const deleteUser = createAction(
  UserActionTypes.ACTION_DELETE_USER,
  (userId: number) => ({ userId })
);

export const deleteUserSuccess = createAction(
  UserActionTypes.ACTION_DELETE_USER_SUCCESS,
  (userId: number) => ({ userId })
);

export const updateUser = createAction(
  UserActionTypes.ACTION_UPDATE_USER,
  (user: User) => ({
    user,
  })
);

export const updateUserSuccess = createAction(
  UserActionTypes.ACTION_UPDATE_USER_SUCCESS,
  (user: User) => ({ user })
);

export const selectUser = createAction(
  UserActionTypes.ACTION_SELECT_USER,
  (userId: number) => ({ userId })
);

export const userActionTypes = {
  getAllUsers,
  getAllUsersSuccess,
  addUser,
  addUserSuccess,
  deleteUser,
  deleteUserSuccess,
  updateUser,
  updateUserSuccess,
  selectUser,
};
