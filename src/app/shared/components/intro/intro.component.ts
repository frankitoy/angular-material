import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

// Redux
import { select } from '@angular-redux/store';

import { User } from '../../models/users/user.model';
import { Skills } from '../../models/skills/skills.model';
import { Recommendations } from '../../models/recommendations/recommendations.model';
import { Relation } from '../../models/relation/relation.model';

import { Observable, Subject,  } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { SocialShareDialogComponent } from 'app/shared/components/social-share-dialog/social-share-dialog.component';
import { UserService } from 'app/shared/services/user.service';
import { RoutesService } from 'app/shared/services/routes.service';

@Component({
  selector: 'zpc-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit, OnDestroy {
  @select() readonly otherUser$: Observable<User>;
  @select() readonly skills$: Observable<Skills>;
  @select() readonly recommendations$: Observable<Recommendations>;
  @select() readonly crowd$: Observable<Recommendations>;
  @select() readonly crowdOther$: Observable<Recommendations>;
  @select() readonly userReputation$: Observable<Recommendations>;
  @select() readonly userRelation$: Observable<Relation>;

  _relation: Relation;
  _skills: Skills;
  _recommendations: Recommendations;
  _ngUnsubscribe: Subject<void> = new Subject<void>();
  recCount: Number;
  crowdCount: Number;
  crowdOtherCount: Number;
  reputationCount: Number;
  isLoaded: boolean;
  isUserLoaded: boolean;
  timer: any;
  userId: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  phone: any;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private routesService: RoutesService
  ) { }

  ngOnInit() {
    const userObj = JSON.parse(localStorage.getItem('user'));
    this.userId = userObj['id'];
    this.userRelation();
    this.userSkills();
    this.userRecommendations();
    this.userReputation();
    this.routesService.getOtherUserId.subscribe((userId) => {
      this.getUserById(userId);
    });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
    localStorage.removeItem('isIntroLoaded');
    clearTimeout(this.timer);
  }

  getUserById(userId) {
    this.userService.getUserById(userId).subscribe(({ response: { first_name, last_name, avatar, email, phone } }: any) => {
      this.firstName = first_name;
      this.lastName = last_name;
      this.avatar = avatar;
      this.email = email;
      this.phone = phone;
      this.isUserLoaded = true;
    });
  }

  userRelation() {
    this.userRelation$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(relation => !!relation)
      )
      .subscribe((relation) => {
        this._relation = relation;
        if (this._relation.rel === 'owner') {
          this.getCrowd();
          this.getCrowdOther();
        }
        this.displayLoader();
      });
  }

  userSkills() {
    this.skills$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(skills => !!skills)
      )
      .subscribe((skills) => {
        this._skills = skills['response'];
        this.introLoaderStorage();
      });
  }

  userRecommendations() {
    this.recommendations$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(recommendations => !!recommendations)
      )
      .subscribe((recommendations) => {
        // Uncomment this line to for dynamic data
        // this._recommendations = recommendations['response'];
        this.recCount = 54;
        this.introLoaderStorage();
      });
  }

  userReputation() {
    this.userReputation$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(reputation => !!reputation)
      )
      .subscribe((reputation) => {
        this.reputationCount = reputation['response'];
        this.introLoaderStorage();
      });
  }

  getCrowd() {
    this.crowd$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(crowd => !!crowd)
      )
      .subscribe((crowd: any) => {
        this.crowdCount = crowd && crowd.length;
        this.introLoaderStorage();
      });
  }

  getCrowdOther() {
    this.crowdOther$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(crowdOther => !!crowdOther)
      )
      .subscribe((crowdOther: any) => {
        this.crowdOtherCount = crowdOther && crowdOther.length;
        this.introLoaderStorage();
      });
  }

  introLoaderStorage(): void {
    const newVal = Number(localStorage.getItem('isIntroLoaded')) + 1;
    localStorage.setItem('isIntroLoaded', `${newVal}`);
  }

  displayLoader(): void {
    const httpCalls = this._relation && this._relation.rel === 'owner' ? 5 : 3;
    console.log('httpCalls', httpCalls);
    if (Number(localStorage.getItem('isIntroLoaded')) >= httpCalls) {
      this.isLoaded = true;
    } else {
      this.timer = setTimeout(() => {
        this.displayLoader();
      }, 200);
    }
  }

  openSocialShareDialog(): void {
    this.dialog.open(SocialShareDialogComponent, {panelClass: 'custom-dialog-share-container'});
  }
}
