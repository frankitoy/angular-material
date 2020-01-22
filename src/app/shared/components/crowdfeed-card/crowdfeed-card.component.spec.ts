import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdfeedCardComponent } from './crowdfeed-card.component';

describe('CrowdfeedCardComponent', () => {
  let component: CrowdfeedCardComponent;
  let fixture: ComponentFixture<CrowdfeedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdfeedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowdfeedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
