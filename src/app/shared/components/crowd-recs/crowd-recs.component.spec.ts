import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdRecsComponent } from './crowd-recs.component';

describe('CrowdRecsComponent', () => {
  let component: CrowdRecsComponent;
  let fixture: ComponentFixture<CrowdRecsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdRecsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowdRecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
