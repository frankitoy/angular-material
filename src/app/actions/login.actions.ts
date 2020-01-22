import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { defaultIfEmpty, finalize } from 'rxjs/operators';

import { IAppState } from '../store/store';
import { ProfessionService } from '../shared/services/profession.service';

@Injectable()
export class LoginActions {

  static LOGIN_START = 'LOGIN_START';
  static LOGIN_RESOLVE = 'LOGIN_RESOLVE';
  static LOGIN_END = 'LOGIN_END';

  constructor(private ngRedux: NgRedux<IAppState>, private professionService: ProfessionService) {}

  login() {
    console.log('login.action login()');
    this.ngRedux.dispatch({ type: LoginActions.LOGIN_START });
    return this.professionService.loadProfession()
      .pipe(
        defaultIfEmpty([]),
        finalize(() => this.ngRedux.dispatch({ type: LoginActions.LOGIN_END }))
      )
      .subscribe((professions) => this.ngRedux.dispatch({ type: LoginActions.LOGIN_RESOLVE, payload: professions }));
  }
}
