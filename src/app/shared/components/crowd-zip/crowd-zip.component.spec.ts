import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdZipComponent } from './crowd-zip.component';

describe('CrowdZipComponent', () => {
  let component: CrowdZipComponent;
  let fixture: ComponentFixture<CrowdZipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdZipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowdZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
