import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SkillService } from 'app/shared/services/skill.service';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'zpc-skill-cards',
  templateUrl: './skill-cards.component.html',
  styleUrls: ['./skill-cards.component.scss']
})
export class SkillCardsComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  skillCards: Array<any>;
  open: number;
  closed: number;
  isLoaded: boolean;

  constructor(
    private skillService: SkillService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    const token = this.sharedService.getCookie('authToken');
    this.getSkillCards(token);
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  getSkillCards(token: string) {
    this.skillService.getSkillCards(token)
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe((res) => {
        this.open = res['response']['open'] || 0;
        this.closed = res['response']['closed'] || 0;
        this.skillCards = res['response']['skills'];
        this.isLoaded = true;
      });
  }

}
