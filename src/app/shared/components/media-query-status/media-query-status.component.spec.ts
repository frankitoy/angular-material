import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableMedia } from '@angular/flex-layout';

import { MediaQueryStatusModule } from './media-query-status.module';
import { MediaQueryStatusComponent } from './media-query-status.component';
import * as servicesStubs from '../../../../test/helpers/services-stub';

describe('MediaQueryStatusComponent', () => {
  let component: MediaQueryStatusComponent;
  let fixture: ComponentFixture<MediaQueryStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MediaQueryStatusModule
      ],
      declarations: [],
      providers: [
        {
          provide: ObservableMedia,
          useClass: servicesStubs.MockObservableMediaService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaQueryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
