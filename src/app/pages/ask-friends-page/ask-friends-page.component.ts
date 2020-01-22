import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

import { select } from '@angular-redux/store';

import { MatDialog } from '@angular/material';

import { SocialUser } from 'angularx-social-login';

import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Ask } from '../../shared/models/ask/ask.model';
import { User } from '../../shared/models/users/user.model';

import { UserService } from '../../shared/services/user.service';



import { CrowdActions } from '../../actions/crowd.actions';
import { UserActions } from '../../actions/user.actions';

import { StepperState } from '../../shared/enum/stepper-state.enum';
import { AskActions } from '../../actions/ask.actions';

import { environment } from '../../../environments/environment';
import { SocialLoginProviderType } from '../../shared/models/social/social-login-provider-type.enum';
// import { CrowdZipComponent } from 'app/shared/components/crowd-zip/crowd-zip.component';

@Component({
  selector: 'zpc-ask-friends-page',
  templateUrl: './ask-friends-page.component.html',
  styleUrls: ['./ask-friends-page.component.scss']
})
export class AskFriendsPageComponent implements OnInit, OnDestroy {

  @select() readonly crowd$: Observable<Array<User>>;
  @select() readonly getCrowd$: Observable<boolean>;
  @select() readonly user$: Observable<User>;

  public enabledAdditionalDetails: boolean = false;
  public formEditable: boolean = false;
  public formGroupOptional: boolean = false;
  public selectedIndex: number = 1;

  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  private _currentUser: User;
  private _user: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private platformLocation: PlatformLocation,
              private userService: UserService,
              private askActions: AskActions,
              private userActions: UserActions,
              private crowdActions: CrowdActions,
              private dialog: MatDialog) { }

  ngOnInit() {
    this._currentLoggedInUserSubscribe();
    this.userService.getUserById('' + this.askInfo.user_id)
      .subscribe((user: any) => this._user = user.response);

    this._crowdSubscribe();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  get askInfo(): Ask {
    if (this.route.snapshot.data.askInfo) {
      return this.route.snapshot.data.askInfo;
    }
  }

  get currentUrl(): string {
    const platformLocation = this.platformLocation as any;
    return platformLocation.location.href;
  }

  get user(): User {
    if (this._user) {
      return this._user;
    }
  }

  askMyCrowdEmitted($event): void {
    this.crowdActions.getCrowd(this._user.token);
  }

  stepperEmitted($event): void {
    switch ($event) {
      case StepperState.ASK_DETAILS: {
        this.askActions.resetAsk();
        this.router.navigateByUrl('/ask-details');
        break;
      }

      case StepperState.ALL_DONE: {
        this.router.navigateByUrl('/profile/about');
        break;
      }
    }
  }

  private _currentLoggedInUserSubscribe(): void {
    this.user$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(user => !!user)
      )
      .subscribe((user) => this._currentUser = user);
  }

  private _crowdSubscribe() {
    this.crowd$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(crowd => !!crowd)
      )
      .subscribe((crowd: any) => {
        if (this._currentUser.provider === SocialLoginProviderType.FACEBOOK) {
          const socialUser = {
            id: this._currentUser.id,
            authToken: this._currentUser.token
          };
          this.userActions.getFbFriendsNotInMyCrowd(<any><SocialUser>socialUser);
        }
        // this.dialog.open(CrowdZipComponent, {
        //   data: crowd,
        //   panelClass: 'custom-dialog-container'
        // });
      });
  }
}
