import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskCardHeaderComponent } from './ask-card-header.component';

describe('AskCardHeaderComponent', () => {
  let component: AskCardHeaderComponent;
  let fixture: ComponentFixture<AskCardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskCardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
