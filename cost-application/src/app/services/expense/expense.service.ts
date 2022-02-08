import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { ApiActions } from '../api-actions';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService implements ApiActions<Expense>{
  private url = 'api/expenses';
  constructor(private http: HttpClient) { }

  add(data: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.url, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  update(expense: Expense):Observable<Expense> {
    return this.http.put<Expense>(`${this.url}/${expense.id}`, expense).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  delete(id: Number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getById(id: Number): Observable<Expense> {
    return this.http.get<Expense>(`${this.url}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getAll(): Observable<Array<Expense>> {
    return this.http.get<Array<Expense>>(this.url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message));
      })
    );
  }
  
}
