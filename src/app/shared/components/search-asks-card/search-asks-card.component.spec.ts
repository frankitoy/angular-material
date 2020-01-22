import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAsksCardComponent } from './search-asks-card.component';

describe('SearchAsksCardComponent', () => {
  let component: SearchAsksCardComponent;
  let fixture: ComponentFixture<SearchAsksCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAsksCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAsksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
