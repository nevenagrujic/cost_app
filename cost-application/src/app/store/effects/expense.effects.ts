import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  EMPTY,
  exhaustMap,
  map,
  mergeMap,
  tap,
} from 'rxjs';
import { ExpenseService } from 'src/app/services/expense/expense.service';
import {
  addExpense,
  addExpenseSuccess,
  deleteExpense,
  deleteExpenseSuccess,
  getAllExpenses,
  getAllExpensesSuccess,
  updateExpense,
  updateExpenseSuccess,
} from '../actions/expense.actions';

@Injectable()
export class ExpenseEffects {
  loadExpense$ = createEffect(() =>
    this.action$.pipe(
      ofType(getAllExpenses),
      exhaustMap(() =>
        this.expenseService.getAll().pipe(
          map((expenses) => {
            return getAllExpensesSuccess(expenses);
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addExpense$ = createEffect(() =>
    this.action$.pipe(
      ofType(addExpense),
      tap((expense) => console.log(expense)),
      concatMap(({ expense }) =>
        this.expenseService.add(expense).pipe(
          map((newExpense) => addExpenseSuccess(newExpense)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteExpense$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteExpense),
      mergeMap(({ expenseId }) =>
        this.expenseService.delete(expenseId).pipe(
          map(() => deleteExpenseSuccess(expenseId)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateExpense$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateExpense),
      concatMap(({expense}) =>
        this.expenseService.update(expense).pipe(
          map(
            () => updateExpenseSuccess(expense),
            catchError(() => EMPTY)
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private expenseService: ExpenseService
  ) {}
}
