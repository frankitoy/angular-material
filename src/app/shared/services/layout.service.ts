import { Injectable, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { getQueryParam } from '../helpers/url.helper';

import { AdjustScreenOptions } from '../models/layouts/adjust-screen-options.model';
import { LayoutConfiguration } from '../models/layouts/layout-configuration.model';
import { LayoutChangeOptions } from '../models/layouts/layout-change-options.model';

@Injectable()
export class LayoutService {

  public layoutConf: LayoutConfiguration;
  public isMobile: boolean;
  public currentRoute: string;
  public fullWidthRoutes: Array<string> = ['shop'];

  layoutConfSubject = new BehaviorSubject<LayoutConfiguration>(this.layoutConf);
  layoutConf$ = this.layoutConfSubject.asObservable();

  constructor(private router: Router) {
    this.setAppLayout();
  }

  setAppLayout() {
    this.layoutConf = {
      'navigationPos': 'side', // side, top
      'sidebarStyle': 'closed', // full, compact, closed
      'dir': 'ltr', // ltr, rtl
      'useBreadcrumb': true,
      'topbarFixed': true,
      'breadcrumb': 'title'// simple, title
    };

    this.setLayoutFromQuery();
  }

  publishLayoutChange(lc: LayoutConfiguration, opt: LayoutChangeOptions = {}) {
    const duration = opt.duration || 250;
    if (!opt.transitionClass) {
      this.layoutConf = Object.assign(this.layoutConf, lc);
      return this.layoutConfSubject.next(this.layoutConf);
    }

    this.layoutConf = Object.assign(this.layoutConf, lc, { layoutInTransition: true });
    this.layoutConfSubject.next(this.layoutConf);

    setTimeout(() => {
      this.layoutConf = Object.assign(this.layoutConf, { layoutInTransition: false });
      this.layoutConfSubject.next(this.layoutConf);
    }, duration);
  }

  setLayoutFromQuery() {
    const layoutConfString = getQueryParam('layout');
    try {
      this.layoutConf = JSON.parse(layoutConfString);
    } catch (e) { }
  }

  adjustLayout(options: AdjustScreenOptions = {}): void {
    let sidebarStyle: string;
    this.isMobile = this.isSm();
    this.currentRoute = options.route || this.currentRoute;
    sidebarStyle = this.isMobile ? 'closed' : this.layoutConf.sidebarStyle;

    if (this.currentRoute) {
      this.fullWidthRoutes.forEach(route => {
        if (this.currentRoute.indexOf(route) !== -1) {
          sidebarStyle =  'closed';
        }
      });
    }

    this.publishLayoutChange({
      isMobile: this.isMobile,
      sidebarStyle: sidebarStyle
    });
  }

  isSm() {
    return window.matchMedia(`(max-width: 959px)`).matches;
  }
}
