import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { logout } from './store/actions/auth.actions';
import { getAllExpenses } from './store/actions/expense.actions';
import { getAllUsers } from './store/actions/user.actions';
import { isLoggedIn, isLoggedOut, loggedUser } from './store/selector/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cost-application';

  isLoggedIn$: Observable<boolean>;
  isLoggedIn: boolean;

  loggedUser$: Observable<User>;
  isLoggedOut$: Observable<boolean>;

  constructor(private store: Store<any>, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.loggedUser$ = this.store.pipe(select(loggedUser));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));

    this.isLoggedIn$.pipe().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.store.dispatch(getAllUsers());
        this.store.dispatch(getAllExpenses());
      }
    });
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigateByUrl('/login');
  }
}
