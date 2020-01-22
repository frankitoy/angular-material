import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { defaultIfEmpty, finalize } from 'rxjs/operators';

import { IAppState } from '../store/store';

import { CrowdService } from '../shared/services/crowd.service';


@Injectable()
export class CrowdActions {

  static GET_CROWD_START = 'GET_CROWD_START';
  static GET_CROWD_RESOLVE = 'GET_CROWD_RESOLVE';

  static GET_CROWD_OTHER_START = 'GET_CROWD_OTHER_START';
  static GET_CROWD_OTHER_RESOLVE = 'GET_CROWD_OTHER_RESOLVE';

  static ADD_CROWD_TO_F1_START = 'GET_CROWD_OTHER_START';
  static ADD_CROWD_TO_F1_RESOLVE = 'ADD_CROWD_TO_F1_RESOLVE';

  static ADD_FB_FRIEND_TO_START = 'ADD_FB_FRIEND_TO_START';
  static ADD_FB_FRIEND_TO_RESOLVE = 'ADD_FB_FRIEND_TO_RESOLVE';

  constructor(private ngRedux: NgRedux<IAppState>, private crowdService: CrowdService) {}

  getCrowd(token: string) {
    this.ngRedux.dispatch({ type: CrowdActions.GET_CROWD_START });
    return this.crowdService.getCrowd(token)
      .pipe(
        defaultIfEmpty([])
      )
      .subscribe((crowd: any) => this.ngRedux.dispatch({ type: CrowdActions.GET_CROWD_RESOLVE, payload: crowd.response }));
  }

  getCrowdOther(token: string) {
    this.ngRedux.dispatch({ type: CrowdActions.GET_CROWD_OTHER_START });
    return this.crowdService.getCrowdOther(token)
      .pipe(
        defaultIfEmpty([])
      )
      .subscribe((crowdOther: any) => this.ngRedux.dispatch({ type: CrowdActions.GET_CROWD_OTHER_RESOLVE, payload: crowdOther.response }));
  }

  addCrowdToF1(userId: number, token: string) {
    this.ngRedux.dispatch({ type: CrowdActions.ADD_CROWD_TO_F1_START });
    return this.crowdService.addCrowdToF1(userId, token)
      .pipe(
        defaultIfEmpty([])
      )
      .subscribe((crowdOther: any) => this.ngRedux.dispatch({ type: CrowdActions.ADD_CROWD_TO_F1_RESOLVE, payload: crowdOther.response }));
  }

  addFBFriendtoCrowd(fbID: number, token: string) {
    this.ngRedux.dispatch({ type: CrowdActions.ADD_FB_FRIEND_TO_START });
    return this.crowdService.addFBFriendtoCrowd(fbID, token)
      .pipe(
        defaultIfEmpty([])
      )
      .subscribe((fb: any) => this.ngRedux.dispatch({ type: CrowdActions.ADD_FB_FRIEND_TO_RESOLVE, payload: fb.response }));
  }
}
