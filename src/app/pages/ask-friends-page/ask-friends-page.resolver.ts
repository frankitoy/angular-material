import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { select } from '@angular-redux/store';

import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { Ask } from '../../shared/models/ask/ask.model';
import { AskActions } from '../../actions/ask.actions';

@Injectable()
export class AskFriendsPageResolver implements Resolve<Ask> {

  @select() readonly askInfo$: Observable<Ask>;

  constructor(private askActions: AskActions) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Ask> {
    this.askActions.getAskById(route.params['postId']);
    return this.waitForAskDataToLoad();
  }

  private waitForAskDataToLoad(): Observable<Ask> {
    return this.askInfo$
      .pipe(
        filter(ask => !!ask),
        first()
      );
  }
}
