import { Component } from '@angular/core';

import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { Observable } from 'rxjs';

@Component({
  selector: 'zpc-media-query-status',
  templateUrl: './media-query-status.component.html'
})
export class MediaQueryStatusComponent {

  public media$: Observable<MediaChange> = this.mediaService.asObservable();

  constructor(private mediaService: ObservableMedia) {}

  extractQuery(change: MediaChange): string {
    return change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
  }
}
