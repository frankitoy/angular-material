import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSkillsCardComponent } from './search-skills-card.component';

describe('SearchSkillsCardComponent', () => {
  let component: SearchSkillsCardComponent;
  let fixture: ComponentFixture<SearchSkillsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSkillsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSkillsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
