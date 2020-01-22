import { TestBed, inject } from '@angular/core/testing';
import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/testing';

import { ApplicationActions } from './application.actions';

describe('ApplicationActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxTestingModule
      ],
      providers: [
        ApplicationActions
      ]
    });
  });

  it('should be created', inject([ApplicationActions], (actions: ApplicationActions) => {
    expect(actions).toBeTruthy();
  }));

  describe('pageLoaded()', () => {
    it('should dispatch the page loaded action', inject([ApplicationActions], (actions: ApplicationActions) => {
      // Given
      const dispatch = spyOn(MockNgRedux.getInstance(), 'dispatch');

      // When
      actions.markAppAsLoaded();

      // Then
      expect(dispatch).toHaveBeenCalledWith({ type: ApplicationActions.PAGE_LOAD_END });
    }));
  });

  afterEach(() => MockNgRedux.reset());
});
