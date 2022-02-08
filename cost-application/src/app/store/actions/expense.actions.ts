import { Update } from '@ngrx/entity';
import { createAction } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';

export enum ExpenseActionTypes {
  ACTION_GET_ALL = '[Expense] Get all expenses',
  ACTION_GET_ALL_SUCCESS = '[Expense] Get all expenses success',
  ACTION_ADD_EXPENSE = '[Expense] Add expense',
  ACTION_ADD_EXPENSE_SUCCESS = '[Expense] Add expense success',
  ACTION_DELETE_EXPENSE = '[Expense] Delete expense',
  ACTION_DELETE_EXPENSE_SUCCESS = '[Expense] Delete expense success',
  ACTION_UPDATE_EXPENSE = '[Expense] Update expense',
  ACTION_UPDATE_EXPENSE_SUCCESS = '[Expense] Update expense success',
  ACTION_SELECT_EXPENSE = '[Expense] Select expense',
}

export const getAllExpenses = createAction(ExpenseActionTypes.ACTION_GET_ALL);

export const getAllExpensesSuccess = createAction(
  ExpenseActionTypes.ACTION_GET_ALL_SUCCESS,
  (expenses: Array<Expense>) => ({ expenses })
);

export const addExpense = createAction(
  ExpenseActionTypes.ACTION_ADD_EXPENSE,
  (expense: Expense) => ({ expense })
);

export const addExpenseSuccess = createAction(
  ExpenseActionTypes.ACTION_ADD_EXPENSE_SUCCESS,
  (expense: Expense) => ({ expense })
);

export const deleteExpense = createAction(
  ExpenseActionTypes.ACTION_DELETE_EXPENSE,
  (expenseId: number) => ({ expenseId })
);

export const deleteExpenseSuccess = createAction(
  ExpenseActionTypes.ACTION_DELETE_EXPENSE_SUCCESS,
  (expenseId: number) => ({ expenseId })
);

export const updateExpense = createAction(
  ExpenseActionTypes.ACTION_UPDATE_EXPENSE,
  (expense: Expense) => ({
    expense,
  })
);

export const updateExpenseSuccess = createAction(
  ExpenseActionTypes.ACTION_UPDATE_EXPENSE_SUCCESS,
  (expense: Expense) => ({ expense })
);

export const selectExpense = createAction(
  ExpenseActionTypes.ACTION_SELECT_EXPENSE,
  (expenseId: number) => ({ expenseId })
);

export const expenseActionTypes = {
  getAllExpenses,
  getAllExpensesSuccess,
  addExpense,
  addExpenseSuccess,
  deleteExpense,
  deleteExpenseSuccess,
  updateExpense,
  updateExpenseSuccess,
  selectExpense,
};
