import { Update } from "@ngrx/entity";
import { Observable } from "rxjs";

export interface ApiActions<T> {

    add(data: T): Observable<T>;

    update(data: T): Observable<T>;

    delete(id: Number);

    getById(id: Number): Observable<T>;

    getAll(): Observable<Array<T>>;
   
}