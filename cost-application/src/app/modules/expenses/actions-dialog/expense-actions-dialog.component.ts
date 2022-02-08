import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';
import { User } from 'src/app/models/user.model';
import { UserState } from 'src/app/store/reducers/user.reducers';
import { usersSelector } from 'src/app/store/selector/user.selector';
import Utils from 'src/app/utils/utils';

@Component({
  selector: 'app-expense-actions-dialog',
  templateUrl: './expense-actions-dialog.component.html',
  styleUrls: ['./expense-actions-dialog.component.css'],
})
export class ExpenseActionsDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;
  loggedUser: User;
  users$ = this.store.pipe(select(usersSelector));

  constructor(
    private store: Store<UserState>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExpenseActionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) expense: Expense
  ) {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.form = fb.group({
      id: [],
      date: [new Date(), Validators.required],
      time: ['', Validators.required],
      description: [null, Validators.required],
      amount: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      userId: [this.loggedUser?.id, Validators.required],
    });
    if (expense != null) {
      this.isEditMode = true;
      this.fillData(expense);
    }
  }

  ngOnInit(): void {}

  fillData(expense: Expense) {
    const date: Date = new Date(expense.date);
    this.form.get('id').setValue(expense.id);
    this.form.get('date').setValue(date);
    this.form.get('time').setValue(expense.time);
    this.form.get('description').setValue(expense.description);
    this.form.get('amount').setValue(expense.amount);
    this.form.get('comment').setValue(expense.comment);
    this.form.get('userId').setValue(this.loggedUser?.id);
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close(undefined);
  }

  isAdmin(): boolean {
    return Utils.isAdmin(this.loggedUser);
  }
}
