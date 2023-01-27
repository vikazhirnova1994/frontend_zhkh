import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../_interface/api-response";
import {UserPage} from "../_interface/user-page";

const URL = 'http://localhost:8005/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userData$ = (page: number = 0, size: number = 10): Observable<ApiResponse<UserPage>> =>
    this.http.get<ApiResponse<UserPage>>(URL + `?page=${page}&size=${size}`);

  postUser(data: any) {
    return this.http.post<any>(URL + '/new', data);
  }

  putUser(data: any, id: string){
    return this.http.put<any>(URL + `/` + id +`/edit`, data);
  }

  getRoles() {
    return this.http.get<String[]>(URL + '/roles');
  }

  getContractNumbers() {
    return this.http.get<String[]>(URL + '/contractNumber');
  }

  deleteUser(deleteId: string) {
    console.log('????', URL + `/` + deleteId)
    return this.http.delete<void>(URL + `/` + deleteId);
  }
}
