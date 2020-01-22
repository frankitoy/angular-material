import { Component, OnInit, Input } from '@angular/core';
import { WindowService } from 'app/shared/services/window.service';
import { environment } from '../../../../environments/environment';
declare var FB: any;

@Component({
  selector: 'zpc-share-recommendations',
  templateUrl: './share-recommendations.component.html',
  styleUrls: ['./share-recommendations.component.scss']
})
export class ShareRecommendationsComponent implements OnInit {
  @Input() userId: string;
  @Input() type: string = null;
  shareUrl: string;

  constructor(private windowService: WindowService) { }

  ngOnInit() {
    this.shareUrl = `https://9lmzarykcf.execute-api.ap-southeast-2.amazonaws.com/dev/user/${this.userId}/share`;
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
