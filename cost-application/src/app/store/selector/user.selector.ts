import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { selectAll, selectTotal, UserState } from '../reducers/user.reducers';

export const usersFeatureSelector = createFeatureSelector<UserState>('users');

export const usersSelector = createSelector(usersFeatureSelector, selectAll);

export const countUsersSelector = createSelector(
  usersFeatureSelector,
  selectTotal
);

export const selectUsersByEmailAndName = (name: string, email: string) =>
  createSelector(usersFeatureSelector, (users) => {
    const usersData = JSON.parse(JSON.stringify(users.entities));
    const result = [];
    for (const key in usersData) {
      const user: User = usersData[key];
      if (
        (user.firstName != undefined && user.firstName.includes(name)) ||
        (user.email != undefined && user.email.includes(email))
      ) {
        result.push(user);
      }
    }

    return result;
  });

export const selectUserById = (userId: number) =>
  createSelector(usersFeatureSelector, (users) => {
    const usersData = JSON.parse(JSON.stringify(users.entities));
    const result = [];
    for (const key in usersData) {
      const user: User = usersData[key];
      if (user.id == userId) {
        return user;
      }
    }

    return result;
  });
