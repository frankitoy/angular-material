import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SocialUser } from 'angularx-social-login';

import { SocialLoginProviderType } from '../models/social/social-login-provider-type.enum';
import { User } from '../models/users/user.model';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { LoginConfirmationDialogComponent } from '../../shared/components/login-confirmation-dialog/login-confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) { }

  login(user: SocialUser): Observable<Object> {
    const usersInfo: User = {
      email: user.email,
      token: user.authToken,
      provider: this._getProvider(user.provider),
      first_name: user.firstName,
      last_name: user.lastName,
      avatar: user.photoUrl,
      fb_id: user.id
    };
    return this._doLogin(usersInfo);
  }

  update(user): Observable<any> {
    return this.httpClient.put(`${environment.api}/dev/user`, user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }

  getUserById(userId: string): Observable<Object> {
    return this.httpClient.get(`${environment.api}/dev/user?id=${userId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }

  getUserSkillsById(userId: number): Observable<Object> {
    return this.httpClient.get(`${environment.api}/dev/skill/user/${userId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }

  getUserRecommendationsById(userId: number): Observable<Object> {
    return this.httpClient.get(`${environment.api}/dev/skill/user/${userId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }

  getUserReputationById(userId: number): Observable<Object> {
    return this.httpClient.get(`${environment.api}/dev/reputations/${userId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }

  getFbFriendsNotInMyCrowd(authToken): Observable<Object> {
    if (authToken) {
    const url = `https://graph.facebook.com/me?fields=friends&access_token=${authToken}`;
    return this.httpClient.get(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
    } else {
      of([]);
    }
  }

  private _doLogin(usersInfo): Observable<any> {
    return this.httpClient.post(`${environment.api}/dev/login`, usersInfo)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        }),
        map((response: any) => {
          if (!response.response) {
            this.router.navigateByUrl('/profile/about');
            this.dialog.open(LoginConfirmationDialogComponent, {panelClass: 'login-confirm-dialog'});
          } else {
            if (localStorage.getItem('type')) {
              this.router.navigateByUrl('/profile/about');
            }
          }
          if (response && response.response && usersInfo) {
            Object.assign(response.response, usersInfo);
          }
          return response;
        })
      );
  }

  private _getProvider(provider: string): SocialLoginProviderType {
    return (provider === SocialLoginProviderType.FACEBOOK) ?
      SocialLoginProviderType.FACEBOOK : SocialLoginProviderType.GOOGLE;
  }

  getUserRelation(userId: number): Observable<Object> {
    const url = `${environment.api}/dev/crowd/relations/${userId}`;
    return this.httpClient.get(url, {
      headers: new HttpHeaders({
        Authorization: this.getCookie('authToken')
      })
    })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }

  getCookie(name: string) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
 }

  getOtherUser(userId: number): Observable<Object> {
    const url = `${environment.api}/dev/user?id=${userId}`;
    return this.httpClient.get(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }
  deleteUser(userId: number, token: string): Observable<Object> {
    return this.httpClient.delete(`${environment.api}/dev/user/${userId}`, this.setHeader(token))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw error;
        })
      );
  }

  setHeader(token: string) {
    return {
      headers: new HttpHeaders({
        Authorization: token
      })
    };
  }

  getUserRecsGiven(userId: number) {
    return this.httpClient.get(`${environment.api}/dev/recs/user/${userId}/given`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }
}
