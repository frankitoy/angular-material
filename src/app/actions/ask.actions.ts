import { Injectable } from '@angular/core';

import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../store/store';

import { Ask } from '../shared/models/ask/ask.model';
import { AskService } from '../shared/services/ask.service';

@Injectable({
  providedIn: 'root'
})
export class AskActions {

  static ASK_POST_START = 'ASK_POST_START';
  static ASK_POST_RESOLVE = 'ASK_POST_RESOLVE';
  static ASK_POST_ERROR = 'ASK_POST_ERROR';

  static GET_ASK_START = 'GET_ASK_START';
  static GET_ASK_RESOLVE = 'GET_ASK_RESOLVE';
  static GET_ASK_ERROR = 'GET_ASK_ERROR';

  static RESET_ASK = 'RESET_ASK';

  constructor(private ngRedux: NgRedux<IAppState>, private askService: AskService) { }

  createAsk(ask: Ask): void {
    this.ngRedux.dispatch({ type: AskActions.ASK_POST_START });
    this.askService.create(ask)
      .subscribe(
        (askResponse: any) => this.ngRedux.dispatch({type: AskActions.ASK_POST_RESOLVE, payload: askResponse.response }),
        () => this.ngRedux.dispatch({ type: AskActions.ASK_POST_ERROR })

      );
  }

  getAskById(askId: string): void {
    this.ngRedux.dispatch({ type: AskActions.GET_ASK_START });
    this.askService.getAskById(askId)
      .subscribe(
        (askResponse: any) => this.ngRedux.dispatch({type: AskActions.GET_ASK_RESOLVE, payload: askResponse.response }),
        () => this.ngRedux.dispatch({ type: AskActions.GET_ASK_ERROR })
      );
  }

  resetAsk(): void {
    this.ngRedux.dispatch({ type: AskActions.RESET_ASK });
  }
}
