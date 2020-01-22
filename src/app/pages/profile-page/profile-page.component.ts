import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SocialShareDialogComponent } from 'app/shared/components/social-share-dialog/social-share-dialog.component';
import { select } from '@angular-redux/store';
import { UserActions } from '../../actions/user.actions';
import { CrowdActions } from '../../actions/crowd.actions';

import { User } from '../../shared/models/users/user.model';

import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RoutesService } from 'app/shared/services/routes.service';
import { SharedService } from 'app/shared/services/shared.service';
import { CreateSkillDialogComponent } from 'app/shared/components/create-skill-dialog/create-skill-dialog.component';
import { CreateAskRecDialogComponent } from 'app/shared/components/create-ask-rec-dialog/create-ask-rec-dialog.component';

@Component({
  selector: 'zpc-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  @select() readonly user$: Observable<User>;
  _ngUnsubscribe: Subject<void> = new Subject<void>();
  navLinks: any[];
  userType: string;

  constructor(
    private dialog: MatDialog,
    private userActions: UserActions,
    private crowdActions: CrowdActions,
    private route: ActivatedRoute,
    private routesService: RoutesService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getRouteId();

    this.navLinks = [
      {
        label: 'About',
        link: './about'
      },
      {
        label: 'Skills',
        link: './skills'
      },
      {
        label: 'Asks',
        link: './asks'
      },
      {
        label: 'Recs',
        link: './recs'
      },
      {
        label: 'Crowd',
        link: './crowd'
      }
    ];

    localStorage.removeItem('isIntroLoaded');
    localStorage.setItem('isIntroLoaded', '0');
    this.dialog.closeAll();

    if (localStorage.getItem('type')) {
      setTimeout(() => {
        if (localStorage.getItem('ask') === 'true') {
          this.dialog.open(CreateAskRecDialogComponent, {panelClass: 'create-ask-rec-dialog-container'});
        } else {
          this.dialog.open(CreateSkillDialogComponent, {panelClass: 'create-skill-dialog-container'});
        }
      }, 400);
    }
    localStorage.removeItem('ask');
  }

  getRouteId() {
    this.routesService.getRelationRoutes(this.route).subscribe(({type, userId}: any) => {
      this.fetchData(type, userId);
      this.userType = type;
    });
  }

  fetchData(type: string, userId: number): void {
    this.userActions.getUserSkillsById(userId);
    this.userActions.getUserReputationById(userId);
    this.userActions.getUserRecommendationsById(userId);
    this.userActions.getUserRelation(userId, type);
    this.userActions.getOtherUser(userId);

    if (type === 'owner') {
      const token = this.sharedService.getCookie('authToken');
      this.crowdActions.getCrowd(token);
      this.crowdActions.getCrowdOther(token);
    }
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  openSocialShareDialog(): void {
    this.dialog.open(SocialShareDialogComponent, {panelClass: 'custom-dialog-share-container'});
  }

  zipToCrowd(): void {
    console.log('zip to my crowd clicked!');
  }
}
