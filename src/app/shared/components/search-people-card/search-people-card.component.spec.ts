import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPeopleCardComponent } from './search-people-card.component';

describe('SearchPeopleCardComponent', () => {
  let component: SearchPeopleCardComponent;
  let fixture: ComponentFixture<SearchPeopleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPeopleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPeopleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
