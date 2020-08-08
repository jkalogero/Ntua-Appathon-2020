import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, shareReplay } from 'rxjs/operators';
import { forkJoin, EMPTY, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private _http: HttpClient) { }

  apiEndpoint = 'http://127.0.0.1:5000/'

  getTopDrugs(parameters){  
    console.log(JSON.stringify(parameters))  
    const path = this.apiEndpoint + 'TopDrugs' + '?condition='+parameters['condition'];
    return this._http.get(path).pipe(
      retry(4),
      catchError(() => {
        return EMPTY;
      }),
      shareReplay()
    );
  }
}
