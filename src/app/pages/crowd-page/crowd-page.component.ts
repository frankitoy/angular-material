import { Component, OnInit } from '@angular/core';
import { CrowdService } from 'app/shared/services/crowd.service';
import { MatDialog } from '@angular/material';
import { CrowdZipComponent } from 'app/shared/components/crowd-zip/crowd-zip.component';
import { CreateAskRecDialogComponent } from 'app/shared/components/create-ask-rec-dialog/create-ask-rec-dialog.component';
import { CreateSkillDialogComponent } from 'app/shared/components/create-skill-dialog/create-skill-dialog.component';
import { AskService } from 'app/shared/services/ask.service';
import { SkillService } from 'app/shared/services/skill.service';
import { SharedService } from 'app/shared/services/shared.service';
import { UserActions } from '../../actions/user.actions';
import { CrowdActions } from '../../actions/crowd.actions';
import { RoutesService } from 'app/shared/services/routes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'zpc-crowd-page',
  templateUrl: './crowd-page.component.html',
  styleUrls: ['./crowd-page.component.scss']
})
export class CrowdPageComponent implements OnInit {
  userId: number;
  userToken: string;
  activeTab: number;
  isLoaded: boolean;
  isLoadingAsks: boolean;
  limit: number = 3;
  isShowMoreHidden: boolean;
  offset: number = 0;
  all: any[] = [];
  skills: any[] = [];
  asks: any[] = [];
  crowd: any[] = [];
  userType: string;

  constructor(
    private crowdService: CrowdService,
    private dialog: MatDialog,
    private askService: AskService,
    private skillService: SkillService,
    private sharedService: SharedService,
    private userActions: UserActions,
    private crowdActions: CrowdActions,
    private routesService: RoutesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const userObj = JSON.parse(localStorage.getItem('user'));
    this.userId = Number(userObj['id']);
    this.userToken = this.sharedService.getCookie('authToken');
    this.isShowMoreHidden = false;
    this.getAsks(this.userToken, this.offset, this.limit);
    this.getRouteId();
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

  async getAsks(token: string, offset?: number, limit?: number) {
    this.isLoadingAsks = true;
    this.isShowMoreHidden = false;

    const crowdF1 = await this.crowdService.getCrowd(this.userToken).toPromise().then(data => data['response']);
    const crowdF2 = await this.crowdService.getCrowdOther(this.userToken).toPromise().then(data => data['response']);


    this.crowdService.getCrowdFeed(token, offset, limit).subscribe(({ response: { skills, asks } }: any) => {
      let fetchData = [];

      const newSkills = skills.map((obj, index) => {
        if (crowdF1.find(f1 => f1.id === obj.user_id)) {
          obj.relations = 'f1';
        } else if (crowdF2.find(f2 => f2.id === obj.user_id)) {
          obj.relations = 'f2';
        } else if (this.userId === obj.user_id) {
          obj.relations = 'you';
        }
        obj.type = 'skills';
        this.skillService.getSkillRecs(obj.id).subscribe(({ response }: any) => {
          obj.totalRecs = response.length;
        });
        return obj;
      });

      const newAsks = asks.map((obj, index) => {
        if (crowdF1.find(f1 => f1.id === obj.user_id)) {
          obj.relations = 'f1';
        } else if (crowdF2.find(f2 => f2.id === obj.user_id)) {
          obj.relations = 'f2';
        } else if (this.userId === obj.user_id) {
          obj.relations = 'owner';
        }
        obj.type = 'asks';
        this.askService.getAskRecs(obj.id).subscribe(({ response }: any) => {
          obj.totalRecs = response.length;
        });
        return obj;
      });

      if (this.activeTab === 2) {
        this.skills = [...this.skills, ...newSkills];
        fetchData = this.skills;
      } else if (this.activeTab === 1) {
        this.asks = [...this.asks, ...newAsks];
        fetchData = this.asks;
      } else {
        this.all = [...this.all, ...newSkills, ...newAsks];

        const newAll = this.all.sort(function(a, b) {
          return +new Date() - +new Date(a.created_at);
        });

        fetchData = newAll;
      }

      if (fetchData.length < this.limit) {
        this.isShowMoreHidden = true;
      }

      this.crowd = fetchData;
      this.offset = fetchData.length;
      this.isLoaded = true;
      this.isLoadingAsks = false;
    });
  }

  handleChangeCrowd(type: number) {
    this.activeTab = type;
    this.isLoaded = false;
    this.all = [];
    this.skills = [];
    this.asks = [];
    this.crowd = [];
    this.getAsks(this.userToken, this.offset, this.limit);
  }

  handleOpenCrowdZip(): void {
    this.dialog.open(CrowdZipComponent, {panelClass: 'crowd-zip-container'});
  }

  handleOpenAskRec() {
    this.dialog.open(CreateAskRecDialogComponent, {panelClass: 'create-ask-rec-dialog-container'});
  }

  handleOpenSkillCard() {
    this.dialog.open(CreateSkillDialogComponent, {panelClass: 'create-skill-dialog-container'});
  }
}
