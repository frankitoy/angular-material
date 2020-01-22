import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { WindowService } from '../../services/window.service';
import { environment } from '../../../../environments/environment';

import { select } from '@angular-redux/store';
import { User } from '../../models/users/user.model';

declare var FB: any;

@Component({
  selector: 'zpc-social-share-dialog',
  templateUrl: './social-share-dialog.component.html',
  styleUrls: ['./social-share-dialog.component.scss']
})
export class SocialShareDialogComponent implements OnInit {
  @select() readonly user$: Observable<User>;
  userId: number;
  shareUrl: string;
  isSmallScreen: boolean;
  _ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<SocialShareDialogComponent>,
    private breakpointObserver: BreakpointObserver,
    private windowService: WindowService
  ) {}

  ngOnInit() {
    this.breakPointChecker();
    this.userSubscribe();
  }

  breakPointChecker(): void {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).
    pipe(
      takeUntil(this._ngUnsubscribe),
      filter(result => !!result && !!result.matches)
    ).
    subscribe(_ => this.isSmallScreen = true);
  }

  userSubscribe() {
    this.user$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(user => !!user)
      )
      .subscribe((user) => {
        this.userId = Number(user.id);
        this.shareUrl   = `${environment.api}/dev/user/${user.id}/share`;
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  handleFacebookShare(): void {
    FB.ui({
      method: 'share',
      href: this.shareUrl
    });
  }

  handleMessengerShare(): void {
    FB.ui({
      method: 'send',
      link: this.shareUrl
    });
  }

  handleWhatsAppShare(screen: string): void {
    if (screen === 'pc') {
      this.windowService.nativeWindow.open(`https://web.whatsapp.com/send?text=${environment.api}/dev/user/${this.userId}/share`);
    } else {
      this.windowService.nativeWindow.open(`whatsapp://send?text=${environment.api}/dev/user/${this.userId}/share`);
    }
  }
}
