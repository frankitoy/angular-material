import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import { select } from '@angular-redux/store';

import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

import { LoginProviderType } from '../../enum/login-provider-type.enum';

import { SessionActions } from '../../../actions/session.actions';

import { AskForm } from '../../models/forms/ask-form.model';
import { User } from '../../models/users/user.model';
import { LoginConfirmationDialogComponent } from '../../../shared/components/login-confirmation-dialog/login-confirmation-dialog.component';

@Component({
  selector: 'zpc-ask-rec-social-dialog',
  templateUrl: './ask-rec-social-dialog.component.html',
  styleUrls: ['./ask-rec-social-dialog.component.scss']
})
export class AskRecSocialDialogComponent implements OnInit, OnDestroy {

  @select() readonly askForm$: Observable<AskForm>;
  @select() readonly user$: Observable<User>;

  LoginProviderType = LoginProviderType;

  private _askForm: AskForm;
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  private _user: User;

  constructor(private router: Router,
              public dialogRef: MatDialogRef<AskRecSocialDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sessionActions: SessionActions,
              private socialAuthService: AuthService,
              private dialog: MatDialog
            ) { }

  ngOnInit() {
    this._askFormSubscribe();
    this._userSubscribe();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  socialSignIn(socialPlatform: LoginProviderType) {
    let socialPlatformProvider: string;

    switch (socialPlatform) {
      case LoginProviderType.FACEBOOK: {
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        break;
      }

      case LoginProviderType.GOOGLE: {
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        break;
      }
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(({ firstName, lastName, photoUrl, authToken, email }) => {
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('photoUrl', photoUrl);
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('email', email);
      this.dialogRef.close();
    });
  }

  cancelLogin() {
    this.dialogRef.close();
  }

  private _askFormSubscribe(): void {
    this.askForm$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(askForm => !!askForm)
      )
      .subscribe((askForm) => this._askForm = askForm);
  }

  private _userSubscribe(): void {
    this.user$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(user => !!user)
      )
      .subscribe((user) => {
        this._user = user;
        this.dialogRef.close();
        this._handleRedirect();
      });
  }

  private _handleRedirect(): void {
    if (this._user) {
      if (this._askForm) {
        this.router.navigateByUrl('/ask-details');
      } else {
        this.router.navigateByUrl('/profile/about');
      }
    } else {
      this.router.navigateByUrl('/profile/about');
    }
  }
}
