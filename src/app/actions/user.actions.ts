import { Injectable } from '@angular/core';

import { NgRedux } from '@angular-redux/store';

import { defaultIfEmpty, finalize } from 'rxjs/operators';

import { IAppState } from '../store/store';

import { User } from '../shared/models/users/user.model';
import { UserService } from '../shared/services/user.service';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserActions {

  static USER_UPDATE_START = 'USER_UPDATE_START';
  static USER_UPDATE_RESOLVE = 'USER_UPDATE_RESOLVE';
  static USER_UPDATE_ERROR = 'USER_UPDATE_ERROR';

  static USER_GET_SKILLS_START = 'USER_GET_SKILL_START';
  static USER_GET_SKILLS_RESOLVE = 'USER_GET_SKILL_RESOLVE';

  static USER_GET_RECOMMENDATIONS_START = 'USER_GET_RECOMMENDATIONS_START';
  static USER_GET_RECOMMENDATIONS_RESOLVE = 'USER_GET_RECOMMENDATIONS_RESOLVE';

  static USER_GET_REPUTATION_START = 'USER_GET_REPUTATION_START';
  static USER_GET_REPUTATION_RESOLVE = 'USER_GET_REPUTATION_START_RESOLVE';

  static GET_FB_FRIENDS_NOT_IN_CROWD_START = 'GET_FB_FRIENDS_NOT_IN_CROWD_START';
  static GET_FB_FRIENDS_NOT_IN_CROWD_RESOLVE = 'GET_FB_FRIENDS_NOT_IN_CROWD_RESOLVE';
  static GET_FB_FRIENDS_NOT_IN_CROWD_ERROR = 'GET_FB_FRIENDS_NOT_IN_CROWD_ERROR';

  static USER_GET_RELATION_START = 'USER_GET_RELATION_START';
  static USER_GET_RELATION_RESOLVE = 'USER_GET_RELATION_RESOLVE';

  static GET_OTHER_USER_START = 'GET_OTHER_USER_START';
  static GET_OTHER_USER_RESOLVE = 'GET_OTHER_USER_RESOLVE';

  constructor(private ngRedux: NgRedux<IAppState>, private userService: UserService) { }

  updateUser(user: User): void {
    this.ngRedux.dispatch({ type: UserActions.USER_UPDATE_START });
    this.userService.update(user)
      .subscribe(
        () => this.ngRedux.dispatch({ type: UserActions.USER_UPDATE_RESOLVE, payload: user }),
        () => this.ngRedux.dispatch({ type: UserActions.USER_UPDATE_ERROR })
      );
  }

  getFbFriendsNotInMyCrowd(authToken): void {
    this.ngRedux.dispatch({ type: UserActions.GET_FB_FRIENDS_NOT_IN_CROWD_START });
    if (authToken) {
    this.userService.getFbFriendsNotInMyCrowd(authToken)
      .pipe(
        defaultIfEmpty([])
      ).subscribe(({friends: { data }}: any) => {
        this.getFBFriendEmailViaFBId(data, authToken);
        return this.ngRedux.dispatch({ type: UserActions.GET_FB_FRIENDS_NOT_IN_CROWD_RESOLVE, payload: data });
      });
    }
  }

  getFBFriendEmailViaFBId(data: any[], authToken: string) {
    FB.api(`/me?fields=email?access_token=${authToken}`, { locale: 'en_US', fields: 'name, email' },
      (response) => {
      }
    );
  }

  getUserSkillsById(userId: number) {
    this.ngRedux.dispatch({ type: UserActions.USER_GET_SKILLS_START });
    return this.userService.getUserSkillsById(userId)
      .pipe(
        defaultIfEmpty([])
      ).subscribe((skills) => this.ngRedux.dispatch({ type: UserActions.USER_GET_SKILLS_RESOLVE, payload: skills }));
  }

  getUserRecommendationsById(userId: number) {
    this.ngRedux.dispatch({ type: UserActions.USER_GET_RECOMMENDATIONS_START });
    return this.userService.getUserRecommendationsById(userId)
      .pipe(
        defaultIfEmpty([])
      )
      .subscribe((recommendations) => this.ngRedux.dispatch({ type: UserActions.USER_GET_RECOMMENDATIONS_RESOLVE, payload: recommendations }));
  }

  getUserReputationById(userId: number) {
    this.ngRedux.dispatch({ type: UserActions.USER_GET_REPUTATION_START });
    return this.userService.getUserReputationById(userId)
      .pipe(
        defaultIfEmpty([])
      )
      .subscribe((recommendations) => this.ngRedux.dispatch({ type: UserActions.USER_GET_REPUTATION_RESOLVE, payload: recommendations }));
  }

  getUserRelation(userId: number, type: string) {
    this.ngRedux.dispatch({ type: UserActions.USER_GET_RELATION_START });
    if (!!type) {
      const payload = {
        userId,
        rel: type // guest or owner
      };
      return this.ngRedux.dispatch({ type: UserActions.USER_GET_RELATION_RESOLVE, payload });
    } else {
      this.userService.getUserRelation(userId)
      .pipe(
        defaultIfEmpty([])
      ).subscribe(({ response }: any) => {
        const payload = {
          userId,
          rel: response ? response : 'others'
        };
        return this.ngRedux.dispatch({ type: UserActions.USER_GET_RELATION_RESOLVE, payload });
      });
    }
  }

  getOtherUser(userId: number) {
    this.ngRedux.dispatch({ type: UserActions.GET_OTHER_USER_START });
    return this.userService.getOtherUser(userId)
      .pipe(
        defaultIfEmpty([])
      ).subscribe((user) => {
        this.ngRedux.dispatch({ type: UserActions.GET_OTHER_USER_RESOLVE, payload: user['response'] });
      });
  }
}
