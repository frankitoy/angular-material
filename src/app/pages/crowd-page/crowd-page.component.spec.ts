import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdPageComponent } from './crowd-page.component';

describe('CrowdPageComponent', () => {
  let component: CrowdPageComponent;
  let fixture: ComponentFixture<CrowdPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
