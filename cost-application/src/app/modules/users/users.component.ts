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
import Utils from 'src/app/utlis/utils';
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
  private loggedUser: User = null;

  constructor(
    private store: Store<any>,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedUser =
      localStorage.getItem('user') != undefined
        ? JSON.parse(localStorage.getItem('user'))
        : undefined;

    this.users$.pipe().subscribe((users) => {
      let userDelitetd: boolean = false;
      let loggedUserEdited: User = undefined;
      if (users != undefined && this.loggedUser != undefined) {
        userDelitetd = Utils.isLoggedUserDeleted(users, this.loggedUser.id);
        loggedUserEdited = Utils.isLoggedUserEdited(users, this.loggedUser);
      }

      if (userDelitetd) {
        this.store.dispatch(logout());
      }

      if (loggedUserEdited != undefined) {
        this.store.dispatch(login(loggedUserEdited));
        this.router.navigateByUrl('/users');
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
    setTimeout(() => {
      if (id === this.loggedUser.id) {
        this.store.dispatch(logout());
        this.router.navigateByUrl('/login');
      }
    }, 2000);
  }

  isAdminOrLoggedInUser(user: User): boolean {
    return (
      Utils.isAdmin(this.loggedUser) ||
      Utils.isLoggedUser(
        user,
        this.loggedUser != undefined ? this.loggedUser.id : -1
      )
    );
  }

  isAdmin(): boolean {
    return Utils.isAdmin(this.loggedUser);
  }

  logout() {}
}