import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs'; // only need to import from rxjs
import { Observable } from 'rxjs/Rx';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = environment.apiBaseUrl;
  private cache: any = {};


  constructor(private http: HttpClient) { }

  getData(route: string, refresh: any) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return Observable.of(this.cache[route]);
    } else { 
      return this.http.get<any>(this.baseUrl + route)
      .pipe(
        map((response: any) => {
          this.cache[route] = response;
          return response;
        })
      )
    }
  }

  getDataWithParams(route: string, params: any, refresh: any) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return Observable.of(this.cache[route]);
    } else { 
      return this.http.get<any>(this.baseUrl + route, { params: params }).map((response: any) => {
        this.cache[route] = response;
        return response;
      });
    }
  }

  getRecord(route: string) {
    return this.http.get<any>(this.baseUrl + route);
  }

  getRecordWithParams(route: string, params: any) {
    return this.http.get<any>(this.baseUrl + route, { params: params });
  }

  post(route: string, data: any) {
    let headers = new HttpHeaders();
    // headers = headers.set('SessionId', '62');
    return this.http.post<any>(this.baseUrl + route, data,);
    // { headers: headers }
  }
  
  put(route: string, data: any) {
    let headers = new HttpHeaders();
    // headers = headers.set('SessionId', '62');
    return this.http.put<any>(this.baseUrl + route, data,);
    // { headers: headers }
  }

  delete(route: string) {
    return this.http.delete(this.baseUrl + route).map((response: any) => {
      return response;
    });
  }

  getReport(route: string) {
    return this.http.get(this.baseUrl + route, { responseType: 'blob' });
  }

  getExternalData(route: string) {
    return this.http.get<any>(route).map((response: any) => {
      return response;
    });
  }

  dataForRouteIsCached(route: string, refresh: boolean | undefined) {
    return this.cache[route] && (refresh === false || refresh === undefined);
  }

  clearCache() {
    this.cache = {};
  }

  clearRouteCache(route: string | number) {
    this.cache[route] = null;
  }

}
