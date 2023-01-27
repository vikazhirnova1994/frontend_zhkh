import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../_interface/api-response";
import {UserClaimPage} from "../_interface/user-claim-page";

const URL = 'http://localhost:8005/api/claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http: HttpClient) { }

  userClaimData$ = (page: number = 0, size: number = 10): Observable<ApiResponse<UserClaimPage>> =>
    this.http.get<ApiResponse<UserClaimPage>>(URL + `/user?page=${page}&size=${size}`);

  claimData$ = (status: string = '', page: number = 0, size: number = 10): Observable<ApiResponse<UserClaimPage>> =>
    this.http.get<ApiResponse<UserClaimPage>>(URL + `?status=${status}&page=${page}&size=${size}`);

  postClam(data: any) {
    return this.http.post<any>(URL + '/user/new', data);
  }

  putClamStatus(data: any, id: string) {
    return this.http.put<any>(URL + `/` + id + `/edit`, data);
  }

  completeClaim(id: any) {
    console.log('????', URL + `/` + id)
    return this.http.delete<void>(URL + `/` + id);
  }

  getClaimsForExportToExcel() {
    return this.http.get<any[]>(URL + `/excel`);
  }
}
