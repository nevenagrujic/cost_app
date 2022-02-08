import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  selectUsersByEmailAndName,
  usersSelector,
} from 'src/app/store/selector/user.selector';
import { User } from 'src/app/models/user.model';
import { UserActionsDialogComponent } from './actions-dialog/user-actions-dialog.component';
import {
  addUser,
  deleteUser,
  updateUser,
} from 'src/app/store/actions/user.actions';
import Utils from 'src/app/utils/utils';
import { login, logout } from 'src/app/store/actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'password',
    'identityCardNumber',
    'roles',
    'edit',
    'delete',
  ];
  users$ = this.store.pipe(select(usersSelector));

  constructor(
    private store: Store<any>,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users$.pipe().subscribe((users) => {
      let userDelitetd: boolean = false;
      const loggedUser: User =
        localStorage.getItem('user') != undefined
          ? JSON.parse(localStorage.getItem('user'))
          : undefined;
      if (users != undefined && loggedUser != undefined) {
        userDelitetd = Utils.isLoggedUserDeleted(users, loggedUser.id);
      }

      if (userDelitetd) {
        this.store.dispatch(logout());
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users$ = this.store.pipe(
      select(selectUsersByEmailAndName(filterValue, filterValue))
    );
  }

  update(user: User): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = user;

    const dialogRef = this.dialog.open(
      UserActionsDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((user) => {
      if (user != undefined) {
        this.store.dispatch(updateUser(user));
      }
    });
  }

  add(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = null;

    const dialogRef = this.dialog.open(
      UserActionsDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((user) => {
      if (user != undefined) {
        this.store.dispatch(addUser(user));
      }
    });
  }

  deleteUser(id: number): void {
    this.store.dispatch(deleteUser(id));
  }

  isAdminOrLoggedInUser(user: User): boolean {
    const loggedUser: User =
      localStorage.getItem('user') != undefined
        ? JSON.parse(localStorage.getItem('user'))
        : undefined;
    return (
      Utils.isAdmin(loggedUser) ||
      Utils.isLoggedUser(user, loggedUser != undefined ? loggedUser.id : -1)
    );
  }

  isAdmin(): boolean {
    const loggedUser: User =
      localStorage.getItem('user') != undefined
        ? JSON.parse(localStorage.getItem('user'))
        : undefined;
    return Utils.isAdmin(loggedUser);
  }

  logout() {}
}
