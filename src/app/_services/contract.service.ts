import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../_interface/api-response";
import {ContractPage} from "../_interface/contract-page";

const URL = 'http://localhost:8005/api/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }

  contractData$ = (page: number = 0, size: number = 5): Observable<ApiResponse<ContractPage>> =>
    this.http.get<ApiResponse<ContractPage>>(URL + `?page=${page}&size=${size}`);

  postContract(data: any) {
    return this.http.post<any>(URL + '/new', data);
  }

  deleteContract(deleteId: string) {
    console.log('????', URL + `/` + deleteId)
    return this.http.delete<void>(URL + `/` + deleteId);
  }
}
