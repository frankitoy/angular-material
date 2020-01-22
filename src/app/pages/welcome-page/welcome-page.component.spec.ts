// import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { AuthService } from 'angularx-social-login';
//
// import * as servicesStubs from '../../../test/helpers/services-stub';
//
// import { WelcomePageComponent } from './welcome-page.component';
//
// @Component({
//   selector: 'circle-progress',
//   template: ''
// })
// class MockCircularProgressComponent {
// }
//
// describe('WelcomePageComponent', () => {
//   let component: WelcomePageComponent;
//   let fixture: ComponentFixture<WelcomePageComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         {
//           provide: AuthService,
//           useClass: servicesStubs.MockAuthService
//         }
//       ],
//       declarations: [
//         MockCircularProgressComponent,
//         WelcomePageComponent
//       ],
//       schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(WelcomePageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
