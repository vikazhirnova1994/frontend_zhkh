import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../_interface/api-response";
import {UserGagePage} from "../_interface/user-gage-page";

const URL = 'http://localhost:8005/api/gage-data';

@Injectable({
  providedIn: 'root'
})
export class GageDataService {

  constructor(private http: HttpClient) { }

  userGageData$ = (serialNumber: string = '', page: number = 0, size: number = 10): Observable<ApiResponse<UserGagePage>> =>
    this.http.get<ApiResponse<UserGagePage>>(URL + `/user?serialNumber=${serialNumber}&page=${page}&size=${size}`);

  gageData$ = (contractNumber: string = '', serialNumber: string = '', page: number = 0, size: number = 10): Observable<ApiResponse<UserGagePage>> =>
    this.http.get<ApiResponse<UserGagePage>>(URL + `?contractNumber=${contractNumber}&serialNumber=${serialNumber}&page=${page}&size=${size}`);

  getGageDataForExportToExcel() {
    return this.http.get<any[]>(URL + `/excel`);
  }

  postGageData(data: any) {
    return this.http.post<any>(URL + '/new', data);
  }

    canAddGageData() {
      this.http.get<Boolean>(URL + '/can-add')
    return this.http.get<Boolean>(URL + '/can-add');
  }

}
