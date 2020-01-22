import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { map, startWith, filter, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { User } from '../../models/users/user.model';
import { Recommendations } from '../../models/recommendations/recommendations.model';
import { select } from '@angular-redux/store';
import { UserActions } from '../../../actions/user.actions';
import { CrowdActions } from '../../../actions/crowd.actions';
import { environment } from '../../../../environments/environment';
import { WindowService } from '../../services/window.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CrowdService } from 'app/shared/services/crowd.service';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'zpc-crowd-zip',
  templateUrl: './crowd-zip.component.html',
  styleUrls: ['./crowd-zip.component.scss']
})
export class CrowdZipComponent implements OnInit, OnDestroy {

  @select() readonly fbFriendsNotInMyCrowd$: Observable<Object>;
  @select() readonly user$: Observable<User>;
  @select() readonly crowdOther$: Observable<Recommendations>;
  @select() readonly crowd$: Observable<any>;

  f1Crowd: any[];
  crowdOthers: any[];
  filteredF2: Observable<string[]>;
  filteredF2Count: number;
  isLoadedF2: boolean;
  myControl = new FormControl();
  authToken: string;
  userId: number;
  shareUrl: string;
  isSmallScreen: boolean;
  provider: string;
  crowds: any[];

  filteredFB: Observable<string[]>;
  filteredFBCount: number;
  fbCrowd: any[] = [];
  isLoadedFB: boolean;

  friendName1: string;
  friendName2: string;
  isOtherFriendsVisible: boolean;

  // public filteredUsers: Observable<Array<User>>;
  public filteredUsers: any;

  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<CrowdZipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userActions: UserActions,
    private crowdActions: CrowdActions,
    private windowService: WindowService,
    private breakpointObserver: BreakpointObserver,
    private crowdService: CrowdService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    const userObj = JSON.parse(localStorage.getItem('user'));
    this.userId = userObj['id'];
    this.provider = userObj['provider'];
    this.authToken = this.sharedService.getCookie('authToken');
    this.crowdActions.getCrowd(this.authToken);
    this.crowdActions.getCrowdOther(this.authToken);

    if (this.provider === 'FACEBOOK') {
      this.getFbFriends();
    }

    this.crowd();
    this.breakPointChecker();
    this.crowdOthers = [];
    this.handleCrowdFilter();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  handleCrowdFilter(): void {
    this.filteredF2 = this.myControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        startWith(''),
        map(value => this.filter(value))
      );

    this.filteredF2.subscribe((data) => this.filteredF2Count = data && data.length);
  }

  handleSearchOnBlur(): void {
    this.myControl.setValue('');
  }

  filter(value: any): any {
    this.crowdService.usersFilter(value, this.authToken).subscribe(({response}: any) => {
      this.crowdActions.getCrowd(this.authToken);
      this.crowdActions.getCrowdOther(this.authToken);
      if (value) {
        let f1 = [];
        let f2 = [];

        if (this.f1Crowd) {
          this.f1Crowd.map((f1s) => {
            f1 = [...f1, f1s.id];
          });
        }

        if (this.crowdOthers) {
          this.crowdOthers.map((f2s) => {
            f2 = [...f2, f2s.id];
          });
        }

        let users = [];

        if (response) {
          response.map((all) => {
            if (f1.includes(all.id)) {
              users = [...users, {...all, 'relation': 'f1'}];
            } else if (f2.includes(all.id)) {
              users = [...users, {...all, 'relation': 'f2'}];
            } else if (all.id === Number(this.userId)) {
              users = [...users, {...all, 'relation': 'me'}];
            } else {
              users = [...users, {...all, 'relation': 'others'}];
            }
          });
          this.crowds = users;
        }
      } else {
        this.crowds = [];
      }
    });
  }

  crowd(): void {
    this.crowd$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(crowd => !!crowd)
      )
      .subscribe((crowd: any) => {
        this.f1Crowd = crowd;
        this.crowdOther(this.f1Crowd);
        this.fbFriendsNotInMyCrowd(this.f1Crowd);
      });
  }

  crowdOther(f1Crowd: any): void {
    this.crowdOther$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(crowd => !!crowd)
      )
      .subscribe((crowd: any) => {
        // Get all ids from F1 Crowd
        let f1CrowdArr = [];
        f1Crowd.map(({id}: any) => {
          f1CrowdArr = [...f1CrowdArr, id];
        });

        // Push to crowdF2 if id is not included in f1CrowdArr
        let crowdF2 = [];
        crowd.map((f2) => {
          if (!f1CrowdArr.includes(f2.id)) {
            crowdF2 = [...crowdF2, f2];
          }
        });

        this.crowdOthers = crowdF2;
        this.isLoadedF2 = true;
      });
  }

  breakPointChecker(): void {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).
    pipe(
      takeUntil(this._ngUnsubscribe),
      filter(result => !!result && !!result.matches)
    ).
    subscribe(_ => this.isSmallScreen = true);
  }

  cancel(): void {
    this.dialogRef.close();
    this.crowdOthers = [];
  }

  handleF2Zip(event: any, deleteId: number): void {
    event.stopPropagation();
    this.crowdActions.addCrowdToF1(deleteId, this.authToken);

    this.filteredF2 = this.filteredF2.pipe(
      map((data: any) => {
        return data.filter(({id}: any) => {
          return id !== deleteId;
        });
      }),
      startWith(this.crowdOthers)
    );

    this.filteredF2.subscribe((data) => this.filteredF2Count = data && data.length);
  }

  handleF2ZipViaSearch(event: any, deleteId: number): void {
    event.stopPropagation();
    this.crowdActions.addCrowdToF1(deleteId, this.authToken);
    const objIndex = this.crowds.findIndex(obj => obj.id === deleteId);
    const updatedObj = { ...this.crowds[objIndex], relation: 'f1'};

    const updatedCrowds = [
      ...this.crowds.slice(0, objIndex),
      updatedObj,
      ...this.crowds.slice(objIndex + 1),
    ];

    this.crowds = updatedCrowds;
  }

  getFbFriends(): void {
    this.userActions.getFbFriendsNotInMyCrowd(this.authToken);
  }

  handleFBInvite() {
    FB.ui({
      method: 'share',
      href: `${environment.api}/dev/ask/${this.userId}/share`
    });
  }

  handleMessengerInvite(): void {
    FB.ui({
      method: 'send',
      link: `${environment.api}/dev/ask/${this.userId}/share`
    });
  }

  handleWhatsAppInvite(screen: string): void {
    if (screen === 'pc') {
      this.windowService.nativeWindow.open(`https://web.whatsapp.com/send?text=${environment.api}/dev/user/${this.userId}/share`);
    } else {
      this.windowService.nativeWindow.open(`whatsapp://send?text=${environment.api}/dev/user/${this.userId}/share`);
    }
  }

  // FB
  fbFriendsNotInMyCrowd(f1Crowd): void {
    this.fbFriendsNotInMyCrowd$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(crowd => !!crowd)
      )
      .subscribe((crowd: any) => {
        // Get all ids from F1 Crowd
        let f1CrowdArr = [];
        f1Crowd.map(({invitation_token}: any) => {
          if (invitation_token) {
            f1CrowdArr = [...f1CrowdArr, invitation_token];
          }
        });

        // Push to crowdFB if fbid is not included in f1CrowdArr
        let crowdFB = [];
        crowd.map((fb) => {
          if (!f1CrowdArr.includes(fb.id)) {
            crowdFB = [...crowdFB, fb];
          }
        });

        this.fbCrowd = crowdFB;
        this.isLoadedFB = true;

        if (this.fbCrowd.length > 2) {
          this.friendName1 = this.fbCrowd[0].name.split(' ')[0];
          this.friendName2 = this.fbCrowd[1].name.split(' ')[0];
          this.isOtherFriendsVisible = true;
        }

        this.handleCrowdFilterFB();
      });
  }

  handleCrowdFilterFB(): void {
    this.filteredFB = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterFB(value)),
        startWith(this.fbCrowd),
      );

    this.filteredFB.subscribe((data) => this.filteredFBCount = data && data.length);
  }

  filterFB(value: any): any {
    return this.fbCrowd && this.fbCrowd.filter(({name}): any => {
      return name.toLowerCase().includes(value.toLowerCase());
    });
  }

  handleFBZip(event: any, fbID: number): void {
    event.stopPropagation();
    this.crowdActions.addFBFriendtoCrowd(fbID, this.authToken);

    this.filteredFB = this.filteredFB.pipe(
      map((data: any) => {
        return data.filter(({id}: any) => {
          return id !== fbID;
        });
      }),
      startWith(this.fbCrowd)
    );

    this.filteredFB.subscribe((data) => this.filteredFBCount = data && data.length);
  }
}
