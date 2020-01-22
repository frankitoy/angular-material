import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as data from '../../pages/dashboard-page/user-data.json';

const results = (<any>data).results;

@Injectable({
  providedIn: 'root'
})
export class DunUserDataService {

  constructor(private http: HttpClient) { }

  loadDumUserData() {
    return results;
  }

}
