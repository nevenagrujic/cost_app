import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-actions-dialog',
  templateUrl: './user-actions-dialog.component.html',
  styleUrls: ['./user-actions-dialog.component.css'],
})
export class UserActionsDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;
  roles: string[] = ['BASIC', 'ADMIN'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserActionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) user: User
  ) {
    this.form = fb.group({
      id: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identityCardNumber: [null, Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roles: [null, Validators.required],
    });
    if (user != null) {
      this.isEditMode = true;
      this.fillData(user);
    }
  }

  ngOnInit(): void {}

  fillData(user: User) {
    this.form.get('id').setValue(user.id);
    this.form.get('firstName').setValue(user.firstName);
    this.form.get('lastName').setValue(user.lastName);
    this.form.get('identityCardNumber').setValue(user.identityCardNumber);
    this.form.get('email').setValue(user.email);
    this.form.get('password').setValue(user.password);
    this.form.get('roles').setValue(user.roles);
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close(undefined);
  }

}
