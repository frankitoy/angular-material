import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { get as _get } from 'lodash';
import { AskForm } from '../../shared/models/forms/ask-form.model';
import { User } from '../../shared/models/users/user.model';
import { LoginDialogComponent } from '../../shared/components/login-dialog/login-dialog.component';
import { LandingPageService } from '../../shared/services/landing-page.service';
import { AskFormActions } from '../../actions/ask-form.actions';
import { ProfessionActions } from '../../actions/profession.actions';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'zpc-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit, OnDestroy {

  @select() readonly askForm$: Observable<AskForm>;
  @select() readonly loggedIn$: Observable<boolean>;
  @select() readonly professions$: Observable<Array<string>>;
  @select() readonly user$: Observable<User>;

  public askFormGroup: FormGroup;

  private _askForm: AskForm;
  private _loggedIn: boolean = false;
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  private _user: User;
  isAuth: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private askFormActions: AskFormActions,
    private professionActions: ProfessionActions,
    private landingPageService: LandingPageService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.landingPageService.addFix();
    this.professionActions.loadProfession();
    this._askFormSubscribe();
    this._loggedInSubscribe();
    this._userSubscribe();
    this.isAuth = this.sharedService.getCookie('authToken') ? true : false;
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  askFormUpdated($event): void {
    this.askFormActions.save($event);
    this.openLoginDialog();
  }

  openLoginDialog(): void {
    if (this._loggedIn) {
      this._handleRedirect();
    } else {
      this.dialog.open(LoginDialogComponent, {panelClass: 'custom-dialog-container'});
    }
  }

  private _askFormSubscribe(): void {
    this.askForm$
      .pipe(
        takeUntil(this._ngUnsubscribe)
      )
      .subscribe((askForm) => {
        this._askForm = askForm;
        this.askFormGroup = this._createAskForm(this._askForm);
      });
  }

  private _createAskForm(askForm?: AskForm): FormGroup {
    return this.formBuilder.group({
      profession: [_get(askForm, 'profession', null)],
      location: [_get(askForm, 'location', null)],
      additionalDetails: [_get(askForm, 'additionalDetails', null)],
      anyLocation: [_get(askForm, 'anyLocation', null)],
      durationNeededBy: [_get(askForm, 'durationNeededBy', null)],
    });
  }

  private _loggedInSubscribe(): void {
    this.loggedIn$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(loggedIn => !!loggedIn)
      )
      .subscribe((loggedIn) => this._loggedIn = loggedIn);
  }

  private _userSubscribe(): void {
    this.user$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(user => !!user)
      )
      .subscribe((user) => this._user = user);
  }

  private _handleRedirect(): void {
    if (this._user && this._user.id) {
      if (this._askForm) {
        this.router.navigateByUrl('/ask-details');
      } else {
        this.router.navigateByUrl('/profile/about');
      }
    } else {
      this.router.navigateByUrl('/welcome');
    }
  }
}
