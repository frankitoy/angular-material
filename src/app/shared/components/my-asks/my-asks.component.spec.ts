import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAsksComponent } from './my-asks.component';

describe('MyAsksComponent', () => {
  let component: MyAsksComponent;
  let fixture: ComponentFixture<MyAsksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAsksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAsksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
