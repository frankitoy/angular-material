import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CrowdZipComponent } from 'app/shared/components/crowd-zip/crowd-zip.component';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CrowdService } from 'app/shared/services/crowd.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'zpc-crowd-trust',
  templateUrl: './crowd.component.html',
  styleUrls: ['./crowd.component.scss']
})
export class CrowdComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  isLoaded: boolean;
  crowdITrust: Array<any>;
  crowdTrustMe: Array<any>;
  totalCrowdsITrust: number;
  totalCrowdsTrustMe: number;

  constructor(
    private dialog: MatDialog,
    private crowdService: CrowdService,
    private sanitize: DomSanitizer,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    const token = this.sharedService.getCookie('authToken');
    this.fetchCrowd(token);
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  fetchCrowd(token: string) {
    forkJoin(this.crowdService.getCrowdITrust(token), this.crowdService.getCrowdTrustMe(token))
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(([iTrustResp, trustMeResp]) => {
        this.crowdITrust = iTrustResp['response'];
        this.totalCrowdsITrust = this.countNewCrowd(this.crowdITrust);
        this.crowdTrustMe = trustMeResp['response'];
        this.totalCrowdsTrustMe = this.countNewCrowd(this.crowdTrustMe);
        this.isLoaded = true;
      });
  }

  setAvatar(image: string) {
    let imageUrl;
    if (image.includes('http')) {
      imageUrl = image;
    } else {
      imageUrl = 'https://c.disquscdn.com/uploads/users/6382/7253/avatar92.jpg';
    }
    return this.sanitize.bypassSecurityTrustUrl(imageUrl);
  }

  countNewCrowd(crowds) {
    return crowds.reduce((total, crowd) => crowd.new ? total + 1 : total, 0);
  }

  openCrowdZip() {
    this.dialog.open(CrowdZipComponent, {panelClass: 'crowd-zip-container'}); // this.route.navigate(['/profile/crowd']);
  }
}
