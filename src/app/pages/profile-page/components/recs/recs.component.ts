import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { Relation } from 'app/shared/models/relation/relation.model';
import { takeUntil, filter } from 'rxjs/operators';
import { SkillService } from 'app/shared/services/skill.service';
import { AskService } from 'app/shared/services/ask.service';
import { UserService } from 'app/shared/services/user.service';
import { User } from 'app/shared/models/users/user.model';

@Component({
  selector: 'zpc-recs',
  templateUrl: './recs.component.html',
  styleUrls: ['./recs.component.scss']
})
export class RecsComponent implements OnInit {
  @select() readonly userRelation$: Observable<Relation>;
  @select() readonly otherUser$: Observable<User>;
  _ngUnsubscribe: Subject<void> = new Subject<void>();
  _relation: Relation;
  skills: any;
  skillsLoaded: boolean;
  asks: any;
  asksLoaded: boolean;
  recsLoaded: boolean;
  recsGiven: any;
  name: string;

  constructor(
    private skillService: SkillService,
    private askService: AskService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
    this.userRelation();
  }

  getUser() {
    this.otherUser$
      .pipe(
        takeUntil(this._ngUnsubscribe)
      )
      .subscribe(({ first_name }: any) => this.name = first_name);
  }

  userRelation() {
    this.userRelation$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(relation => !!relation)
      )
      .subscribe((relation) => {
        this._relation = relation;
        this.getUserSkill(this._relation.userId);
        this.getUserAsk(this._relation.userId);
        this.getRecsGiven(this._relation.userId);
      });
  }

  getUserSkill(userId: number) {
    this.skillService.getSkillByUserId(userId, 0, 3).subscribe(({ response }: any) => {
      this.skills = response;
      this.skillsLoaded = true;
    });
  }

  getUserAsk(userId: number) {
    this.askService.getAsksByUserId(userId).subscribe(({ response }: any) => {
      this.asks = response;
      this.asksLoaded = true;
    });
  }

  getRecsGiven(userId: number) {
    let arrayLocal = {};
    this.userService.getUserRecsGiven(userId).subscribe(({ response }: any) => {
      response.map(({managed_crowd_id, user_id, updated_at}) => {
        arrayLocal = {
          ...arrayLocal,
          [managed_crowd_id]: [...(arrayLocal[managed_crowd_id] || []), { id: user_id, date: updated_at }]
        };
      });

      this.recsGiven = Object.keys(arrayLocal).map((key) => {
        return { id: key, child: arrayLocal[key], state: false };
      });

      this.recsLoaded = true;
    });
  }

  panelState(recId: number, status: boolean) {
    this.recsGiven.map((item) => {
      if (item.id === recId) {
        item.state = status;
      }
    });
  }

}
