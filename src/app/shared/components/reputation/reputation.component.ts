import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReputationService } from 'app/shared/services/reputation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'zpc-reputation',
  templateUrl: './reputation.component.html',
  styleUrls: ['./reputation.component.scss']
})
export class ReputationComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  reputation: number;
  isLoaded: boolean;
  userId: number;

  constructor(
    private route: Router,
    private reputationService: ReputationService
  ) { }

  ngOnInit() {
    const userObj = JSON.parse(localStorage.getItem('user'));
    this.userId = Number(userObj['id']);
    this.getReputation(this.userId);
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  getReputation(userId: number) {
    this.reputationService.getReputation(userId)
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe((res) => {
        this.reputation = res['response']['reputation'];
        this.isLoaded = true;
      });
  }

  onReputation() {
    this.route.navigate(['/profile/recs']);
  }
}
