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
import { SharedService } from 'app/shared/services/shared.service';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'zpc-login-dialog',
  templateUrl: './login-dialog.component.html'
})
export class LoginDialogComponent implements OnInit, OnDestroy {

  @select() readonly askForm$: Observable<AskForm>;
  @select() readonly user$: Observable<User>;

  LoginProviderType = LoginProviderType;

  private _askForm: AskForm;
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  private _user: User;
  isAuthenticating: boolean;

  constructor(private router: Router,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sessionActions: SessionActions,
    private dialog: MatDialog,
    private sharedService: SharedService,
    private authService: AuthService,
    private userService: UserService
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
    this.sharedService.setLogin(true);
    const socialPlatformProvider = socialPlatform ? GoogleLoginProvider.PROVIDER_ID : FacebookLoginProvider.PROVIDER_ID;
    this.authService.signIn(socialPlatformProvider).then((data) => {
      this.isAuthenticating = true;
      this.auth();
    });
  }

  auth(): void {
    this.sharedService.loginObs.subscribe((resData) => {
      if (resData) {
        if (!this.sharedService.getCookie('authToken')) {
          this.authService.authState.subscribe((res) => {
            this.userService.login(res).subscribe(({ response: { id, first_name, last_name }}: any) => {
              const data = {
                firstName: first_name,
                lastName: last_name,
                id
              };
              localStorage.setItem('user', JSON.stringify(data));
              this.sharedService.setCookie('authToken', res.authToken, 1);
              this.router.navigate(['/profile/about']);
            });
          });
        }
      }
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
    if (this._user && this._user.id) {
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
