import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskPageRoutingModule } from './ask-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import {
  MatButtonModule,
  MatCardModule,
  // MatFormFieldModule,
  MatIconModule,
  // MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  // MatSidenavModule,
  // MatSliderModule,
  MatToolbarModule
} from '@angular/material';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { AskPageComponent } from './ask-page.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  slidesPerView: 4,
  // slidesPerGroup: 3,
  keyboard: true,
  mousewheel: true,
  scrollbar: false,
  navigation: true,
  pagination: false,
  // observer: true,
  threshold: 50,
  a11y: true,
  // loop: false,
  // loopFillGroupWithBlank: true,

  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
  spaceBetween: 31

};

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    // MatFormFieldModule,
    MatIconModule,
    // MatInputModule,
    // MatSidenavModule,
    // MatSliderModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    SharedModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300
    }),
    AskPageRoutingModule,
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  declarations: [
    AskPageComponent
  ],
  exports: [
    AskPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AskPageModule { }
