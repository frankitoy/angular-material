import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareRecommendationsComponent } from './share-recommendations.component';

describe('ShareRecommendationsComponent', () => {
  let component: ShareRecommendationsComponent;
  let fixture: ComponentFixture<ShareRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
