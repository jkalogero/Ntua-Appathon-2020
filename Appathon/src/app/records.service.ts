import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private _http: HttpClient) { }

  apiEndpoint = '../assets/'

  getData(){    
    const path = this.apiEndpoint + 'sample.xml';
    var a = this._http.get(path);
    // console.log(XMLDocument.(a));
    return this._http.get(path);
  }
}
