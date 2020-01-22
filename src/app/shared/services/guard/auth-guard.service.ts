import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private sharedService: SharedService
  ) { }

  canActivate(): Observable<boolean> {
    if (this.sharedService.getCookie('authToken')) {
      return of(true);
    } else {
      this.router.navigate(['home']);
      return of(false);
    }
  }
}
