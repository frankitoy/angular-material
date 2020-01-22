import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { select } from '@angular-redux/store';

import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { get as _get } from 'lodash';

import { Ask } from '../../shared/models/ask/ask.model';
import { AskForm } from '../../shared/models/forms/ask-form.model';
import { User } from '../../shared/models/users/user.model';

import { AskActions } from '../../actions/ask.actions';
import { AskFormActions } from '../../actions/ask-form.actions';
import { ProfessionActions } from '../../actions/profession.actions';

@Component({
  selector: 'zpc-ask-details-page',
  templateUrl: './ask-details-page.component.html'
})
export class AskDetailsPageComponent implements OnInit, OnDestroy {

  @select() readonly ask$: Observable<Ask>;
  @select() readonly askForm$: Observable<AskForm>;
  @select() readonly professions$: Observable<Array<string>>;
  @select() readonly user$: Observable<User>;

  public askFormGroup: FormGroup;
  public askForm: AskForm;
  public durationOptions = [
    '24 Hrs',
    '1 Week',
    '1 Month',
    'Anytime'
  ];
  public enabledAdditionalDetails: boolean = true;
  public formEditable: boolean = true;
  public formGroupOptional: boolean = false;
  public selectedIndex: number = 0;

  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  private _user: User;

  constructor(private formBuilder: FormBuilder,
              private renderer: Renderer2,
              private router: Router,
              private askActions: AskActions,
              private askFormActions: AskFormActions,
              private professionActions: ProfessionActions) { }

  ngOnInit() {
    this.professionActions.loadProfession();
    this._askSubscribe();
    this._askFormSubscribe();
    this._userSubscribe();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  askFormUpdated($event: AskForm): void {
    const ask: Ask = {
      user_id: this._user.id,
      address: $event.location,
      description: $event.additionalDetails,
      title: $event.profession
    };

    this.askFormActions.save($event);
    this.askActions.createAsk(ask);
  }

  private _askSubscribe(): void {
    this.ask$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(ask => !!ask)
      )
      .subscribe((ask: Ask) => this.router.navigateByUrl(`/send-profile-name/ask/${ask.id}`));
  }

  private _askFormSubscribe(): void {
    this.askForm$
      .pipe(
        takeUntil(this._ngUnsubscribe)
      )
      .subscribe((askForm) => {
        this.askForm = askForm;
        this.askFormGroup = this._createAskForm(this.askForm);
      });
  }

  private _userSubscribe(): void {
    this.user$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(user => !!user)
      )
      .subscribe((user) => {
        this._user = user;
      });
  }

  private _createAskForm(askForm?: AskForm): FormGroup {
    return this.formBuilder.group({
      profession: [_get(askForm, 'profession', null), Validators.required],
      location: [_get(askForm, 'location', null), Validators.required],
      additionalDetails: [_get(askForm, 'additionalDetails', null)],
      anyLocation: [_get(askForm, 'anyLocation', null)],
      durationNeededBy: [this.durationOptions],
      durationSelected: [_get(askForm, 'durationSelected', null)],
    });
  }
}
