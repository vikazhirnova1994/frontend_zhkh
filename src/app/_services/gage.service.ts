import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../_interface/api-response";
import {GagePage} from "../_interface/gage-page";
import {TypeGage} from "../_interface/type-gage";

const URL = 'http://localhost:8005/api/gage';

@Injectable({
  providedIn: 'root'
})
export class GageService {

  constructor(private http: HttpClient) { }

  gageData$ = (page: number = 0, size: number = 5): Observable<ApiResponse<GagePage>> =>
    this.http.get<ApiResponse<GagePage>>(URL + `?page=${page}&size=${size}`);

  postGage(data: any) {
    return this.http.post<any>(URL + '/new', data);
  }

  getTypeGages() {
    return this.http.get<TypeGage[]>(URL + '/type-gages');
  }

  deleteGage(deleteId: string) {
    console.log('????', URL + `/` + deleteId)
    return this.http.delete<void>(URL + `/` + deleteId);
  }
}
