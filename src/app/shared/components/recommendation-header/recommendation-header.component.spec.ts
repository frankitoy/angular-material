import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationHeaderComponent } from './recommendation-header.component';

describe('RecommendationHeaderComponent', () => {
  let component: RecommendationHeaderComponent;
  let fixture: ComponentFixture<RecommendationHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
