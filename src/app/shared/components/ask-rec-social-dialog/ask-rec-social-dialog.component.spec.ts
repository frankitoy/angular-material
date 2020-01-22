import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskRecSocialDialogComponent } from './ask-rec-social-dialog.component';

describe('AskRecSocialDialogComponent', () => {
  let component: AskRecSocialDialogComponent;
  let fixture: ComponentFixture<AskRecSocialDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskRecSocialDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskRecSocialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
