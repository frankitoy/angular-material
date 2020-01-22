import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { select } from '@angular-redux/store';

import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AskForm } from '../../shared/models/forms/ask-form.model';
import { User } from '../../shared/models/users/user.model';

import { UserActions } from '../../actions/user.actions';

@Component({
  selector: 'zpc-welcome-page',
  templateUrl: './welcome-page.component.html'
})
export class WelcomePageComponent implements OnInit, OnDestroy {

  @select() readonly askForm$: Observable<AskForm>;
  @select() readonly user$: Observable<User>;
  @select() readonly updatedUser$: Observable<boolean>;
  @select() readonly updatingUser$: Observable<boolean>;

  public welcomeFormGroup: FormGroup;

  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  private _user: User;

  constructor(private formBuilder: FormBuilder, private router: Router, private userActions: UserActions) { }

  ngOnInit() {
    this._userSubscribe();
    this._userUpdatedSubscribe();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  handleAddressChange($event): void {
    const { formatted_address } = $event;
    this.welcomeFormGroup.get('location').setValue(formatted_address);
  }

  submitForm($event): void {
    $event.preventDefault();
    if (this.welcomeFormGroup.valid) {
      this._user.first_name = this.welcomeFormGroup.get('firstName').value;
      this._user.last_name = this.welcomeFormGroup.get('lastName').value;
      this._user.city = this.welcomeFormGroup.get('location').value;
      this.userActions.updateUser(this._user);
    }
  }

  private _createWelcomeForm(): FormGroup {
    return this.formBuilder.group({
      firstName: [this._user.first_name, Validators.required],
      lastName: [this._user.last_name, Validators.required],
      location: [this._user.city, Validators.required]
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
        this.welcomeFormGroup = this._createWelcomeForm();
      });
  }

  private _userUpdatedSubscribe(): void {
    this.updatedUser$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(updatedUser => !!updatedUser)
      )
      .subscribe(() => this.router.navigateByUrl('/ask-details'));
  }
}
