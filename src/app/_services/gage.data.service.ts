import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../_interface/api-response";
import {UserPage} from "../_interface/user-page";

const URL = 'http://localhost:8005/api/gage-data/user';

//URL  baseUrl: string = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class GageDataService {

  constructor(private http: HttpClient) {
  }

  gageData$ = (serialNumber: string = '', page: number = 0, size: number = 10): Observable<ApiResponse<UserPage>> =>
    this.http.get<ApiResponse<UserPage>>(URL + `?serialNumber=${serialNumber}&page=${page}&size=${size}`);

  /*getGageData(page:number = 0, size: number = 0):Observable<ApiResponse<Page>>{
    return this.http.get<ApiResponse<Page>>(URL+`?page=${page}&size=${size}`);
  }*/

  postGageData(data: any) {
    return this.http.post<any>(URL + '/new', data);
  }

    canAddGageData() {
      this.http.get<Boolean>(URL + '/can-add')
    return this.http.get<Boolean>(URL + '/can-add');
  }

}
