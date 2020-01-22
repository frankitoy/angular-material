import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdfeedHeaderCardComponent } from './crowdfeed-header-card.component';

describe('CrowdfeedHeaderCardComponent', () => {
  let component: CrowdfeedHeaderCardComponent;
  let fixture: ComponentFixture<CrowdfeedHeaderCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdfeedHeaderCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowdfeedHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
