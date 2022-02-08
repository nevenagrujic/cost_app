import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';
import { expenseActionTypes } from '../actions/expense.actions';

export interface ExpenseState extends EntityState<Expense> {}

export const adapter: EntityAdapter<Expense> = createEntityAdapter<Expense>();

const initialState: ExpenseState = adapter.getInitialState({
  entities: [],
  ids: [],
});

export const expenseReducer = createReducer(
    initialState,
  
    on(expenseActionTypes.getAllExpensesSuccess, (state, action) => {
      return adapter.addMany(action.expenses, state);
    }),
    on(expenseActionTypes.addExpenseSuccess, (state, action) => {
      return adapter.addOne(action.expense, state);
    }),
    on(expenseActionTypes.deleteExpenseSuccess, (state, action) => {
      return adapter.removeOne(action.expenseId, state);
    }),
    on(expenseActionTypes.updateExpenseSuccess, (state, {expense}) => {
      return adapter.updateOne({ id: expense.id + '', changes: JSON.parse(JSON.stringify(expense)) }, state);
    }),
    // on(expenseActionTypes.selectExpense, (state, { expenseId }) => {
    //   return { ...state, selectedExpenseId: expenseId };
    // })
  );
  
  export const { selectAll, selectIds, selectTotal } = adapter.getSelectors();
  
