import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { Relation } from 'app/shared/models/relation/relation.model';
import { Skills } from 'app/shared/models/skills/skills.model';
import { takeUntil, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SkillService } from 'app/shared/services/skill.service';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'zpc-skill-page',
  templateUrl: './skill-page.component.html',
  styleUrls: ['./skill-page.component.scss']
})
export class SkillPageComponent implements OnInit {
  @select() readonly userRelation$: Observable<Relation>;
  _ngUnsubscribe: Subject<void> = new Subject<void>();
  _relation: Relation;

  skillId: number;
  skill: Skills;
  title: string;
  skillStats: any;
  totalRecs: number;
  recommendations: any;
  firstName: string;

  constructor(
    private route: ActivatedRoute,
    private skillService: SkillService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.skillId = +this.route.snapshot.paramMap.get('skillId');
    this.userRelation();
    this.getAskStats(this.skillId);
    this.getRecommendations(this.skillId);
  }

  userRelation() {
    this.userRelation$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(relation => !!relation)
      )
      .subscribe((relation) => {
        this._relation = relation;
        this.getSkill(this.skillId);
      });
  }

  getSkill(skillId: number) {
    this.skillService.getSkillById(skillId).subscribe(({ response }: any) => {
      this.skill = response;
      this.title = response.title;

      if (this._relation.rel !== 'owner') {
        this.getUserById(response.user_id);
      }
    });
  }

  getAskStats(skillId: number) {
    this.skillService.getSkillStatsById(skillId).subscribe(({response}: any) => {
      this.skillStats = response;
    });
  }

  getRecommendations(skillId: number) {
    let arrayLocal = {};
    this.skillService.getSkillRecs(skillId).subscribe(({response}: any) => {
      this.totalRecs = response.length;
      response.map(({managed_crowd_id, user_id, updated_at}) => {
        arrayLocal = {
          ...arrayLocal,
          [managed_crowd_id]: [...(arrayLocal[managed_crowd_id] || []), { id: user_id, date: updated_at }]
        };
      });

      this.recommendations = Object.keys(arrayLocal).map((key) => {
        return { id: key, child: arrayLocal[key], state: false };
      });
    });
  }

  panelState(recId: number, status: boolean) {
    this.recommendations.map((item) => {
      if (item.id === recId) {
        item.state = status;
      }
    });
  }

  getUserById(userId: string) {
    this.userService.getUserById(userId).subscribe(({ response: { first_name } }: any) => {
      this.firstName = first_name;
    });
  }
}
