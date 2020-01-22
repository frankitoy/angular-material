import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { select } from '@angular-redux/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements OnInit, CanActivate {

  @select() readonly loggedIn$: Observable<boolean>;

  constructor(private router: Router) { }

  ngOnInit() {
    // check if new user or not
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.loggedIn$
      .pipe(
        map((loggedIn) => {
          if (loggedIn) {
            this.router.navigate(['welcome']);
            return false;
          }
          return true;
        })
      );
  }
}
