import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { getAllUsers } from 'src/app/store/actions/user.actions';
import { usersSelector } from 'src/app/store/selector/user.selector';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  users$ = this.store.pipe(select(usersSelector));
  public form: FormGroup;
  // private count: number;
  roles: string[] = ['BASIC', 'ADMIN'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<any>,
    private userService: UserService
  ) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identityCardNumber: [null, Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roles: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  signUp() {
    const user: User = this.form.value;
    this.userService
      .add(user)
      .pipe()
      .subscribe((data) => {
        if (data) {
          this.router.navigateByUrl('/login');
        }
      });
  }
}
