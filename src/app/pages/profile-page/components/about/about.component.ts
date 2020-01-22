import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { CrowdZipComponent } from 'app/shared/components/crowd-zip/crowd-zip.component';
import { User } from 'app/shared/models/users/user.model';

@Component({
  selector: 'zpc-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @select() readonly user$: Observable<User>;
  @select() readonly otherUser$: Observable<User>;
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  userAbout: string;
  user: any;
  userSocial: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this._userSubscribe();
  }

  private _userSubscribe(): void {
    this.otherUser$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(user => !!user)
      )
      .subscribe((user) => {
        this.user = user;
        this.userAbout = this.user.about;
        if (this.user.social) { this.getSocial(JSON.parse(this.user.social)); }
      });
  }

  getSocial(usocial: any) {

    const social = {
      'website': 'ic-web',
      'facebook': 'ic-fb',
      'linkedin': 'ic-linkend',
      'twitter' : 'ic-twitter',
      'youtube' : 'ic-youtube',
      'instagram' : 'ic-instagram',
      'default': 'ic-people-off'
    };

    this.userSocial = Object.entries(usocial).filter((key) => key[1] !== '').map(function(obj) { return {icon: social[obj[0]] || social['default'], name: obj[0], link: obj[1]}; });
    // console.log('getSocial result',this.userSocial);
  }

  openCrowdZip(): void {
    this.dialog.open(CrowdZipComponent, {panelClass: 'crowd-zip-container'});
  }
}
