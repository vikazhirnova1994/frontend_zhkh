import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ApiResponse} from "../_interface/api-response";
import {UserPage} from "../_interface/user-page";
import {FlatPage} from "../_interface/flat-page";


const URL = 'http://localhost:8005/api/flat';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

 getAllFlat() {
    return this.http.get<any>(this.baseUrl + '/api/flat/');
  }

  flatData$ = (page: number = 0, size: number = 10): Observable<ApiResponse<FlatPage>> =>
    this.http.get<ApiResponse<FlatPage>>(URL + `?page=${page}&size=${size}`);

  postFlat(data: any) {
    return this.http.post<any>(URL + '/new', data);
  }

  putFlat(data: any, id: string){
    return this.http.put<any>(URL + `/` + id +`/edit`, data);
  }

  deleteFlat(id: any) {
    console.log('????', URL + `/` + id)
    return this.http.delete<void>(URL + `/` + id);
  }
}
