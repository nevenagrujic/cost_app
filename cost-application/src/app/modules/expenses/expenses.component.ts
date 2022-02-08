import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from 'src/app/store/actions/expense.actions';
import {
  selectExpenseByUserID,
  selectExpensesByUserId,
} from 'src/app/store/selector/expense.selector';
import { selectUserById } from 'src/app/store/selector/user.selector';
import { ExpenseActionsDialogComponent } from './actions-dialog/expense-actions-dialog.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  public form: FormGroup;
  date = new FormControl(new Date());
  displayedColumns: string[] = [
    'id',
    'date',
    'time',
    'description',
    'amount',
    'comment',
    'userId',
    'edit',
    'delete',
  ];
  expenses$ = this.store.pipe(
    select(
      selectExpenseByUserID(
        localStorage.getItem('user') != undefined
          ? JSON.parse(localStorage.getItem('user'))
          : undefined
      )
    )
  );

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.form = fb.group({
      date: [new Date()],
      descriptionFilter: [],
    });
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.expenses$ = this.store.pipe(
      select(selectExpensesByUserId(new Date(), filterValue))
    );
  }

  filterPerDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.expenses$ = this.store.pipe(
      select(selectExpensesByUserId(event.value, undefined))
    );
  }

  resetFilter() {
    this.form.reset();
  }

  update(expense: Expense): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = expense;

    const dialogRef = this.dialog.open(
      ExpenseActionsDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((expense) => {
      if (expense != undefined) {
        this.store.dispatch(updateExpense(expense));
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
      ExpenseActionsDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((expense) => {
      if (expense != undefined) {
        this.store.dispatch(addExpense(expense));
      }
    });
  }

  deleteExpense(id: number): void {
    if (id != null) {
      this.store.dispatch(deleteExpense(id));
    }
  }

  getUserByID(id: number): any {
    return this.store.pipe(select(selectUserById(id)));
  }
}
