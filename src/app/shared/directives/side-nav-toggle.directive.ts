import { Directive, Host, Self, Optional, OnDestroy, OnInit } from '@angular/core';

import { MatSidenav } from '@angular/material';

import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { Subscription } from 'rxjs';

@Directive({
  selector: '[sideNavToggle]'
})
export class SideNavToggleDirective implements OnInit, OnDestroy {
  isMobile;
  screenSizeWatcher: Subscription;
  constructor(
    private media: ObservableMedia,
    @Host() @Self() @Optional() public sideNav: MatSidenav
  ) {
  }

  ngOnInit() {
    this.initSideNav();
  }

  ngOnDestroy() {
    if (this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe();
    }
  }

  updateSidenav() {
    const self = this;
    setTimeout(() => {
      self.sideNav.opened = !self.isMobile;
      self.sideNav.mode = self.isMobile ? 'over' : 'side';
    });
  }

  initSideNav() {
    this.isMobile = this.media.isActive('xs') || this.media.isActive('sm');
    this.updateSidenav();
    this.screenSizeWatcher = this.media.subscribe((change: MediaChange) => {
      this.isMobile = (change.mqAlias === 'xs') || (change.mqAlias === 'sm');
      this.updateSidenav();
    });
  }
}
