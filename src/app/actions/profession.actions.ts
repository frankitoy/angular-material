import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { defaultIfEmpty, finalize } from 'rxjs/operators';

import { IAppState } from '../store/store';
import { ProfessionService } from '../shared/services/profession.service';

@Injectable()
export class ProfessionActions {

  static LOAD_PROFESSION_START = 'LOAD_PROFESSION_START';
  static LOAD_PROFESSION_RESOLVE = 'LOAD_PROFESSION_RESOLVE';
  static LOAD_PROFESSION_END = 'LOAD_PROFESSION_END';

  constructor(private ngRedux: NgRedux<IAppState>, private professionService: ProfessionService) {}

  loadProfession() {
    this.ngRedux.dispatch({ type: ProfessionActions.LOAD_PROFESSION_START });
    return this.professionService.loadProfession()
      .pipe(
        defaultIfEmpty([]),
        finalize(() => this.ngRedux.dispatch({ type: ProfessionActions.LOAD_PROFESSION_END }))
      )
      .subscribe((professions) => this.ngRedux.dispatch({ type: ProfessionActions.LOAD_PROFESSION_RESOLVE, payload: professions }));
  }
}
