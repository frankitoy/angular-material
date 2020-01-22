import { Injectable } from '@angular/core';

import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../store/store';

import { AskForm } from '../shared/models/forms/ask-form.model';

@Injectable()
export class AskFormActions {

  static SAVE_ASK_FORM = 'SAVE_ASK_FORM';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  save(askForm: AskForm): void {
    this.ngRedux.dispatch({ type: AskFormActions.SAVE_ASK_FORM, payload: askForm });
  }
}
