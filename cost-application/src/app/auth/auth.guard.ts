import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable, tap } from "rxjs";
import { AuthState } from "src/app/store/reducers/auth.reducer";
import { isLoggedIn } from "src/app/store/selector/auth.selector";

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private store: Store<AuthState>, private router: Router) {

  }


  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean>  {

    return this.store
      .pipe(
        select(isLoggedIn),
        tap(loggedIn => {

          if (!loggedIn) {
            this.router.navigateByUrl('/login');
          }

        })
    );

  }

}