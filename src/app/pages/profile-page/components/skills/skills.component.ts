import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateSkillDialogComponent } from 'app/shared/components/create-skill-dialog/create-skill-dialog.component';
import { Router } from '@angular/router';

import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { User } from 'app/shared/models/users/user.model';
import { takeUntil, filter } from 'rxjs/operators';
import { SkillService } from 'app/shared/services/skill.service';
import { Relation } from 'app/shared/models/relation/relation.model';


@Component({
  selector: 'zpc-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy {
  @select() readonly otherUser$: Observable<User>;
  @select() readonly userRelation$: Observable<Relation>;

  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  userId: number;
  showAddMore: number = 0;
  limit: number = 3;
  skillsOpen: Array<any> = [];
  skillsClose: Array<any> = [];
  isLoaded: boolean;
  isLoadingSkills: boolean;
  user: any;
  _relation: Relation;
  checked: boolean = false;

  constructor(private dialog: MatDialog, private skillService: SkillService, private router: Router) { }

  ngOnInit() {
    this.userRelation();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  userRelation() {
    this.userRelation$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(relation => !!relation)
      )
      .subscribe((relation) => {
        this._relation = relation;
        this._userSubscribe();
        // console.log('userRelation', this._relation);
      });
  }

  private _userSubscribe(): void {
    this.otherUser$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(user => !!user)
      )
      .subscribe((user) => {
        this.userId = +user.id;
        // this.userId = +275;
        this.user = user;
       // console.log('Skills tab: user', user);
        this.getSkills(this.userId);
      });
  }

  getSkills(userId: number) {
    this.isLoadingSkills = true;
    this.skillService.getSkillByUserId(userId).subscribe((res: any) => {
      const { response: data } = res;

     // this.skills = data.slice(0, this.limit);
     // console.log(data);

      if (data.length < this.limit) {
        this.showAddMore =  this.limit - data.length;
      }

     this.skillsOpen = data.filter(key => !!key.active).slice(0, this.limit);
     this.skillsClose = data.filter(key => !key.active).slice(0, this.limit);

     this.isLoaded = true;
     this.isLoadingSkills = false;

    });
  }

  handleOpenSkillCard() {
    this.dialog.open(CreateSkillDialogComponent, {panelClass: 'create-skill-dialog-container'});
  }

  handleRedirect(skillId: number): void {
    this.router.navigate(['user', this.user.id, 'skill', skillId]);
    console.log(['user', this.user.id, 'skill', skillId]);
  }

  handleOpenToOffers(): void {
    this.checked = !this.checked;
    console.log('handleOpenToOffers', this.checked);
  }
}
