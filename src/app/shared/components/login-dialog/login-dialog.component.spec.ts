// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
//
// import { NgReduxModule } from '@angular-redux/store';
// import { NgReduxTestingModule } from '@angular-redux/store/testing';
//
// import { AuthService } from 'angularx-social-login';
//
// import { ProfessionActions } from '../../../actions/profession.actions';
// import { SessionActions } from '../../../actions/session.actions';
//
// import * as servicesStubs from '../../../../test/helpers/services-stub';
//
// import { LoginDialogComponent } from './login-dialog.component';
// import { SharedModule } from '../../shared.module';
//
// describe('LoginDialogComponent', () => {
//   let component: LoginDialogComponent;
//   let fixture: ComponentFixture<LoginDialogComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,
//         NgReduxModule,
//         NgReduxTestingModule,
//         RouterTestingModule,
//         SharedModule
//       ],
//       providers: [
//         {
//           provide: AuthService,
//           useClass: servicesStubs.MockAuthService
//         },
//         {
//           provide: ProfessionActions,
//           useClass: servicesStubs.MockProfessionActions
//         },
//         {
//           provide: SessionActions,
//           useClass: servicesStubs.MockSessionActions
//         }
//       ]
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginDialogComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
