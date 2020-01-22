import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class LandingPageService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  addFix(): void {
    this.document.documentElement.classList.add('landing');
    this.document.body.classList.add('landing');
  }

  removeFix(): void {
    this.document.documentElement.classList.remove('landing');
    this.document.body.classList.remove('landing');
  }
}
