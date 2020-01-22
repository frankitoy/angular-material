import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
import { WindowService } from 'app/shared/services/window.service';
import { UserService } from 'app/shared/services/user.service';
import { environment } from '../../../../environments/environment';
declare var FB: any;

@Component({
  selector: 'zpc-ask-card',
  templateUrl: './ask-card.component.html'
})
export class AskCardComponent implements OnInit {
  @Input() ask;
  @Input() type = null;
  @Input() relation = null;
  @Output() archive = new EventEmitter<number>();
  isValid: boolean;
  time: string;
  userId: number;
  shareUrl: string;
  firstName: string;
  checked: boolean = true;
  tags: Array<string>;

  constructor(
    private windowService: WindowService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const { ask } = this;
    // tslint:disable-next-line:no-unused-expression
    ask && ask.expires_at && this.getTimeLeft(ask.expires_at);
    this.userId = ask && ask.user_id;
    this.shareUrl = `https://9lmzarykcf.execute-api.ap-southeast-2.amazonaws.com/dev/user/${this.userId}/share`;

    if (this.type === 'skill') {
      // tslint:disable-next-line:no-unused-expression
      ask && ask.tags && this.getTags(ask.tags);

      if (this.relation !== 'owner') {
        this.getUserById(String(this.userId));
      }
    }
  }

  archiveClick(id: number) {
    this.archive.emit(id);
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

  getUserById(userId: string) {
    this.userService.getUserById(userId).subscribe(({ response: { first_name } }: any) => {
      this.firstName = first_name;
    });
  }

  getTags(arr) {
    this.tags = arr.split(',');
  }
}
