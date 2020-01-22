import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAskRecDialogComponent } from './create-ask-rec-dialog.component';

describe('CreateAskRecDialogComponent', () => {
  let component: CreateAskRecDialogComponent;
  let fixture: ComponentFixture<CreateAskRecDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAskRecDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAskRecDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
