import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
import { WindowService } from 'app/shared/services/window.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

declare var FB: any;
@Component({
  selector: 'zpc-crowdfeed-card',
  templateUrl: './crowdfeed-card.component.html',
  styleUrls: ['./crowdfeed-card.component.scss']
})
export class CrowdfeedCardComponent implements OnInit {
  @Input() data;
  isValid: boolean;
  time: string;
  userId: number;
  shareUrl: string;

  constructor(
    private windowService: WindowService,
    private router: Router
  ) { }

  ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    this.data && this.data.expires_at && this.getTimeLeft(this.data.expires_at);

    this.userId = this.data && this.data.user_id;
    // this.shareUrl = `https://9lmzarykcf.execute-api.ap-southeast-2.amazonaws.com/dev/user/${this.userId}/share`;
  }

  getTimeLeft(expirationDate) {
    const expiration = moment(expirationDate);
    const currentDate = moment(new Date());
    const milliSeconds = expiration.diff(currentDate);
    const d = moment.duration(milliSeconds);
    const years = d.years() ? `${this.formatNumber(d.years().toString())}Y` : '';
    const months = d.months() ? `${this.formatNumber(d.months().toString())}M` : '';
    const days = d.days() ? `${this.formatNumber(d.days().toString())}D ` : ' ';
    const hours = d.hours() ? `${this.formatNumber(d.hours().toString())}:` : '00:';
    const minutes = d.minutes() ? `${this.formatNumber(d.minutes().toString())}` : '00';
    const date = [years, months, days].join(' ');
    const time = [hours, minutes].join('');
    this.isValid = date.concat(time).includes('-');
    this.time = date.concat(time);
  }

  formatNumber(num) {
    return num.padStart(2, '0');
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

  handleRedirect(): void {
    this.router.navigate(['user', this.userId, 'ask', this.data.id]);
  }
}
