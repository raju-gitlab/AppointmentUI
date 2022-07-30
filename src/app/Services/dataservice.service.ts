import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:9000/";

  Get(urlParam: string) : Observable<any>{
    return this.http.get(this.url + urlParam);
  }
  GetLogin(urlParam: string) : Observable<any>{
    return this.http.get(this.url + urlParam);
  }
  PostRegister(data: any, urlParam: string) {
    let header = new Headers().set('Content-Type', 'application/json');
    return this.http.post(this.url + urlParam,data);
  }
  Post(data: any, urlParam: string) : Observable<any> {
    let header = new Headers().set('Content-Type', 'application/json');
    return this.http.post(this.url + urlParam,data);
  }

  put(data : any,urlparam : string) : Observable<any>
  {
    return this.http.put<any>(this.url + urlparam,data);
  }

  Delete(urlparam : string) : Observable<any>
  {
    return this.http.delete(this.url + urlparam);
  }

  // public headers() {
  //   const UserId = sessionStorage.getItem("UserGuid");
  //   const CartId = sessionStorage.getItem("CartId");
  //   const httpHeaders = new HttpHeaders({
  //     'apptype': 'Web', 'Cache-Control': 'no-cache', 'Content-Type': 'application/json; charset=utf-8', 'UserGuid': UserId,'cartid' : CartId
  //   });

  //   return httpHeaders;
  // };
}
