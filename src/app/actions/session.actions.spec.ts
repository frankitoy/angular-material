// import { TestBed, inject } from '@angular/core/testing';
// import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/lib/testing';
//
// import { SessionActions } from './session.actions';
//
// describe('SessionActions', () => {
//   const emptyContext = {
//   } as any;
//
//   let dispatchSpy: jasmine.Spy;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         NgReduxTestingModule
//       ],
//       providers: [
//         SessionActions
//       ]
//     });
//   });
//
//   beforeEach(() => {
//     dispatchSpy = spyOn(MockNgRedux.getInstance(), 'dispatch');
//   });
//
//   it('should be created', inject([SessionActions], (actions: SessionActions) => {
//     expect(actions).toBeTruthy();
//   }));
//
//   describe('sessionContextUpdated()', () => {
//
//     it('should dispatch the account updated action with the provided account', inject([SessionActions], (actions: SessionActions) => {
//       // Given
//       const sessionContext = { ...emptyContext } as any;
//
//       // When
//       actions.sessionContextUpdated(sessionContext);
//
//       // Then
//       expect(dispatchSpy).toHaveBeenCalledWith({ type: SessionActions.ACCOUNT_UPDATED, payload: emptyContext });
//     }));
//   });
//
//   afterEach(() => {
//     MockNgRedux.reset();
//   });
// });
