import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZcPopupFormComponent } from './zc-popup-form.component';

describe('ZcPopupFormComponent', () => {
  let component: ZcPopupFormComponent;
  let fixture: ComponentFixture<ZcPopupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZcPopupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZcPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
