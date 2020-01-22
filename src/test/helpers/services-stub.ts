import { Injectable } from '@angular/core';

import { MediaChange } from '@angular/flex-layout';

import { of } from 'rxjs';

/* istanbul ignore next */
@Injectable()
export class MockRoutePartsService {
  isEnabled() {}
}

/* istanbul ignore next */
@Injectable()
export class MockAuthService {
  authState = of({});

  signIn() {}

  signOut() {}
}

/* istanbul ignore next */
@Injectable()
export class MockProfessionActions {
  loadProfession() {}
}

/* istanbul ignore next */
@Injectable()
export class MockSessionActions {
  loadSession() {}
}


/* istanbul ignore next */
@Injectable()
export class MockObservableMediaService {
  isActive(query: string) {}
  asObservable() {}
  subscribe(next?: (value: MediaChange) => void, error?: (error: any) => void, complete?: () => void) {}
}

/* istanbul ignore next */
@Injectable()
export class MockMatDialog {

  open() {}
  /**
   * Closes all of the currently-open dialogs.
   */
  closeAll() {}
  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById(id: string) {}
}
