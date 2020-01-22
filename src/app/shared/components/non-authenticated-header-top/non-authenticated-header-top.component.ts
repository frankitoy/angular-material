import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material';

import { select } from '@angular-redux/store';

import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { User } from '../../../shared/models/users/user.model';

import { LoginDialogComponent } from '../../../shared/components/login-dialog/login-dialog.component';
import { AskForm } from '../../models/forms/ask-form.model';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'zpc-non-authenticated-header-top',
  templateUrl: './non-authenticated-header-top.component.html',
})
export class NonAuthenticatedHeaderTopComponent implements OnInit, OnDestroy {

  @select() readonly askForm$: Observable<AskForm>;
  @select() readonly loggedIn$: Observable<boolean>;
  @select() readonly user$: Observable<User>;

  public sidenavOpen: boolean = false;

  private _loggedIn: boolean = false;
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  private _user: User;
  isAuth: boolean;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private dialog: MatDialog,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this._loggedInSubscribe();
    this._userSubscribe();
    this.isAuth = this.sharedService.getCookie('authToken') ? true : false;
    if (this.isAuth) {
      this.router.navigate(['/crowdfeed']);
    }
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  openLoginDialog(): void {
    if (this._loggedIn) {
      this._handleRedirect();
    } else {
      this.dialog.open(LoginDialogComponent, {
        panelClass: 'custom-dialog-container'
      });
    }
  }

  private _loggedInSubscribe(): void {
    this.loggedIn$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(loggedIn => !!loggedIn)
      )
      .subscribe((loggedIn) => this._loggedIn = loggedIn);
  }

  private _handleRedirect(): void {
    if (this._user && this._user.id) {
      this.router.navigateByUrl('/profile/about');
    } else {
      this.router.navigateByUrl('/welcome');
    }
  }

  private _userSubscribe(): void {
    this.user$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(user => !!user)
      )
      .subscribe((user) => this._user = user);
  }
}

