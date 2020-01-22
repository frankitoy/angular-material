import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreteSkillDialogComponent } from './crete-skill-dialog.component';

describe('CreteSkillDialogComponent', () => {
  let component: CreteSkillDialogComponent;
  let fixture: ComponentFixture<CreteSkillDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreteSkillDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreteSkillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
