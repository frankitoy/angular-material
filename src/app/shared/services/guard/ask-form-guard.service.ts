import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { select } from '@angular-redux/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AskFormGuardService implements CanActivate {

  @select() readonly loggedIn$: Observable<boolean>;

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // combineLatest
    return this.loggedIn$
      .pipe(
        map((loggedIn) => {
          if (!loggedIn) {
            this.router.navigate(['home']);
            return false;
          }
          return true;
        })
      );
  }
}
