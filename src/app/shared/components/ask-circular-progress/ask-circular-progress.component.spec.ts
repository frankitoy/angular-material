import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskCircularProgressComponent } from './ask-circular-progress.component';

describe('AskCircularProgressComponent', () => {
  let component: AskCircularProgressComponent;
  let fixture: ComponentFixture<AskCircularProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskCircularProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskCircularProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
