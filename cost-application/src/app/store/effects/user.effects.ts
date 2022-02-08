import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user/user.service';
import { EMPTY } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
import {
  addUser,
  addUserSuccess,
  deleteUser,
  deleteUserSuccess,
  getAllUsers,
  getAllUsersSuccess,
  updateUser,
  updateUserSuccess,
} from '../actions/user.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { logout } from '../actions/auth.actions';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(getAllUsers),
      exhaustMap(() =>
        this.userService.getAll().pipe(
          map((users) => {
            return getAllUsersSuccess(users);
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(addUser),
      tap((user) => console.log(user)),
      concatMap(({ user }) =>
        this.userService.add(user).pipe(
          map((newUser) => addUserSuccess(newUser)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteUser),
      mergeMap(({ userId }) =>
        this.userService.delete(userId).pipe(
          map(() => {
            return deleteUserSuccess(userId);
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateUser),
      concatMap(({ user }) =>
        this.userService.update(user).pipe(
          map(
            () => {
              return updateUserSuccess(user);
            },
            catchError(() => EMPTY)
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private userService: UserService,
    private router: Router,
    private store: Store<UserEffects>
  ) {}
}
