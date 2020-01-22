import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CrowdService } from 'app/shared/services/crowd.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'zpc-crowd-recs',
  templateUrl: './crowd-recs.component.html',
  styleUrls: ['./crowd-recs.component.scss']
})
export class CrowdRecsComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  givenRecs: number;
  receivedRecs: number;
  isLoaded: boolean;
  userId: string;

  constructor(
    private route: Router,
    private crowdService: CrowdService
  ) { }

  ngOnInit() {
    const userObj = JSON.parse(localStorage.getItem('user'));
    this.userId = userObj['id'];
    this.getCrowdRecs(this.userId);
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  getCrowdRecs(token: string) {
    this.crowdService.getCrowdRecs(token)
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe((res) => {
        this.givenRecs = res['response']['given'];
        this.receivedRecs = res['response']['received'];
        this.isLoaded = true;
      });
  }

  onSubmit() {
    this.route.navigate(['/profile/crowd']);
  }
}
