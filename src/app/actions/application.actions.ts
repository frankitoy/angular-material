import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../store/store';

@Injectable({
  providedIn: 'root'
})
export class ApplicationActions {

  static PAGE_LOAD_START = 'PAGE_LOAD_START';
  static PAGE_LOAD_END = 'PAGE_LOAD_END';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  startAppLoading(): void {
    this.ngRedux.dispatch({ type: ApplicationActions.PAGE_LOAD_START });
  }

  markAppAsLoaded(): void {
    this.ngRedux.dispatch({ type: ApplicationActions.PAGE_LOAD_END });
  }


}
