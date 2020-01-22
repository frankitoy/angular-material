import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { apiConstants } from '../constants/api.constant';

@Injectable()
export class ProfessionService {

  static DATA_URL = 'data/skills.json';

  constructor(private http: HttpClient, @Inject(apiConstants.config.professionUrl) private professionsUrl: string) { }

  loadProfession(): Observable<Object> {
    const url = `${ this.professionsUrl }/${ ProfessionService.DATA_URL }`;
    const headers = {};

    return of(['Hairdresser', 'Personal Trainer', 'Babysitter', 'Accountant', 'Bookeeper']);
    // return this.http.get(url, { headers, withCredentials: false })
    //   .pipe(
    //     catchError((error: HttpErrorResponse) => {
    //       if (error.status === 404) {
    //         return EMPTY;
    //       }
    //
    //       error.error.errors = [];
    //
    //       throw error;
    //     })
    //   );
  }

  loadProfessionWithIcons(): Observable<Object> {
    const url = `${ this.professionsUrl }/${ ProfessionService.DATA_URL }`;
    const headers = {};

    const data = [
      {
        title: 'Hairdresser',
        img: 'ic-hairdresser.svg'
      },
      {
        title: 'Personal Trainer',
        img: 'ic-ptrainer.svg'
      },
      {
        title: 'Babysitter',
        img: 'ic-babysitter.svg'
      },
      {
        title: 'Accountant',
        img: 'ic-accountant.svg'
      },
      {
        title: 'Bookeeper',
        img: 'ic-bookeeper.svg'
      }
    ];

    return of(data);
  }
}
