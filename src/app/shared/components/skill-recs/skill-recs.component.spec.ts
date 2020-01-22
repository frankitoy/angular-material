import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillRecsComponent } from './skill-recs.component';

describe('SkillRecsComponent', () => {
  let component: SkillRecsComponent;
  let fixture: ComponentFixture<SkillRecsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillRecsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillRecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
