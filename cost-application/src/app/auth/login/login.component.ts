import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user/user.service';
import { login } from 'src/app/store/actions/auth.actions';
import { AuthState } from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private store: Store<AuthState>
  ) {
    this.form = fb.group({
      email: ['nevena.grujic25@gmail.com', [Validators.required]],
      password: ['123', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    const formValues = this.form.value;

    this.userService
      .getAll()
      .pipe()
      .subscribe((users) => {
        let isLoggedIn: Boolean;
        users.forEach((user) => {
          if (
            formValues.email === user.email &&
            formValues.password === user.password
          ) {
            isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify(user));
            this.store.dispatch(login(user));
            this.router.navigateByUrl('/home');
          }
        });
        if (!isLoggedIn) {
          this.form.setErrors({ invalid: 'Wrong credentials.' });
        }
      });
  }

  signUp() {
    this.router.navigateByUrl('/sign-up');
  }
}
