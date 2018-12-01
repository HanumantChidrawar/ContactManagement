import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  public baseUrl = "../assets";

  constructor(private _http: HttpClient) { }

  public getContacts(): Observable<any> {

    return this._http.get(`${this.baseUrl}/contacts_file.json`);

  }//end getContacts

  public getCountryNames(): Observable<any> {

    return this._http.get(`${this.baseUrl}/countryList.json`);

  }//end getCountryNames

  public getCountryNumbers(): Observable<any> {

    return this._http.get(`${this.baseUrl}/countryCodes.json`);

  }//end getCountryNumbers


}
