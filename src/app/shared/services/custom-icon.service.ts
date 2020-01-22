import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CustomIconService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  init() {
    this.matIconRegistry.addSvgIcon(
      'crowd-share',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/social/crowd.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `fb-share`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/social/fb-share.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `messenger`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/social/messenger.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `whatsapp`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/social/whatsapp.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `visibility`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/social/visibility.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `shares`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/social/shares.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `group`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/social/group.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `record_voice_over`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/social/record_voice_over.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `skill-recs`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/skill-recs-icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `check-circle-outline`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/check-circle-outline.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `claps`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/claps.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `ask-recs`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/ask-recs.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `ellipse`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/ellipse.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `given-recs`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/given-recs.svg')
    );
  }
}
