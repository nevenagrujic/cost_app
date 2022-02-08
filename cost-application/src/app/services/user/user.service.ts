import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { ApiActions } from '../api-actions';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService implements ApiActions<User> {
  private url = 'api/users/';
  constructor(private http: HttpClient) {}

  add(data: User): Observable<User> {
    return this.http.post<User>(this.url, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  update(data: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${data.id}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  delete(id: Number) {
    return this.http.delete(`${this.url}${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getById(id: Number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>('api/users/').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
}
