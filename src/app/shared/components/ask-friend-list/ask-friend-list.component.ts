import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { User } from '../../models/users/user.model';
import { select } from '@angular-redux/store';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'zpc-ask-friend-list',
  templateUrl: './ask-friend-list.component.html'
})
export class AskFriendListComponent implements OnInit, OnDestroy {

  @select() readonly fbFriendsNotInMyCrowd$: Observable<Object>;

  public findUsersCtrl = new FormControl();
  public filteredUsers: Observable<Array<User>>;

  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<AskFriendListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.filteredUsers = this.findUsersCtrl.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this._filterUsers(name) : this.data.slice())
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  get totalFriends(): number {
    return this.data.length;
  }

  cancel() {
    this.dialogRef.close();
  }

  private _filterUsers(value: string): Array<User> {
    const filterValue = value.toLowerCase();
    return this.data.filter(state => state.first_name.toLowerCase().indexOf(filterValue) === 0);
  }
}
