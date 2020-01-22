import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AskService } from 'app/shared/services/ask.service';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'zpc-my-asks',
  templateUrl: './my-asks.component.html',
  styleUrls: ['./my-asks.component.scss']
})
export class MyAsksComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  myAsks: Array<any>;
  open: number;
  closed: number;
  isLoaded: boolean;

  constructor(
    private askService: AskService,
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
    this.askService.getAskCards(token)
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe((res) => {
        this.open = res['response']['open'] || 0;
        this.closed = res['response']['closed'] || 0;
        this.myAsks = res['response']['skills'];
        this.isLoaded = true;
      });
  }

}
