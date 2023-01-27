import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ApiResponse} from "../_interface/api-response";
import {FlatPage} from "../_interface/flat-page";
import {GageAddress} from "../_interface/gage-address";

const URL = 'http://localhost:8005/api/flat';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  constructor(private http: HttpClient) { }

  flatData$ = (page: number = 0, size: number = 5): Observable<ApiResponse<FlatPage>> =>
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

  getGageAddress(){
    return this.http.get<GageAddress[]>(URL + '/address');
  }

}
