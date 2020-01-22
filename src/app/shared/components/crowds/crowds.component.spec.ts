import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdsComponent } from './crowds.component';

describe('CrowdsComponent', () => {
  let component: CrowdsComponent;
  let fixture: ComponentFixture<CrowdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
