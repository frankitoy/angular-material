import { Injectable } from '@angular/core';

import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../store/store';

import { User } from '../shared/models/users/user.model';

import { AuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class SessionActions {

  static LOGOUT_END = 'LOGOUT_END';

  static GET_SESSION_START = 'GET_SESSION_START';

  constructor(private ngRedux: NgRedux<IAppState>, private socialAuthService: AuthService) { }

  logout(): void {
    this.ngRedux.dispatch({ type: SessionActions.LOGOUT_END });
    localStorage.removeItem('user');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('photoUrl');
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');

    this.socialAuthService.signOut();
  }

  loadSession(user: User): void {
    if (user) {
      const data = {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        token: user.token,
        provider: user.provider,
        authToken: user.token
      };
      localStorage.setItem('user', JSON.stringify(data));
    }
    // session service to call api to save or not to save
    this.ngRedux.dispatch({ type: SessionActions.GET_SESSION_START, payload: user });
  }
}
