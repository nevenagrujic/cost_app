import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';
import { User } from 'src/app/models/user.model';
import Utils from 'src/app/utlis/utils';
import {
  ExpenseState,
  selectAll,
  selectTotal,
} from '../reducers/expense.reducer';

export const expensesFeatureSelector =
  createFeatureSelector<ExpenseState>('expenses');

export const expesesSelector = createSelector(
  expensesFeatureSelector,
  selectAll
);

export const countExpensesSelector = createSelector(
  expensesFeatureSelector,
  selectTotal
);

export const selectExpenseById = (id: number) =>
  createSelector(expensesFeatureSelector, (expenses) => expenses.entities[id]);

export const selectExpenseByUserID = (user: User) =>
  createSelector(expensesFeatureSelector, (expenses) => {
    const expensesData = JSON.parse(JSON.stringify(expenses.entities));
    let isAdmin = Utils.isAdmin(user);
    const result = [];
    for (const key in expensesData) {
      const expense: Expense = expensesData[key];
      if (!isAdmin && user.id == expense.userId) {
        result.push(expense);
      } else if (isAdmin) {
        result.push(expense);
      }
    }

    return result;
  });

export const selectExpensesByUserId = (
  requestedDate: Date,
  description: string
) =>
  createSelector(expensesFeatureSelector, (expenses) => {
    const result = [];
    const expensesData = JSON.parse(JSON.stringify(expenses.entities));
    for (const key in expensesData) {
      const expense: Expense = expensesData[key];
      const expenseDate =
        expense.date != undefined ? new Date(expense.date) : undefined;
      if (
        (requestedDate && expenseDate && description) != undefined &&
        requestedDate.getDate() === expenseDate.getDate() &&
        expense.description.includes(description)
      ) {
        result.push(expense);
      } else if (
        description == undefined &&
        (requestedDate && expenseDate) != undefined &&
        requestedDate.getDate() === expenseDate.getDate()
      ) {
        result.push(expense);
      } else if (
        requestedDate == undefined &&
        (expense.description && description) != undefined &&
        expense.description.includes(description)
      ) {
        result.push(expense);
      }
    }
    return result;
  });
