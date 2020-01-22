import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskCardComponent } from './ask-card.component';

describe('AskCardComponent', () => {
  let component: AskCardComponent;
  let fixture: ComponentFixture<AskCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
