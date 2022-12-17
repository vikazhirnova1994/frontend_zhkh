import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  postFlat(data:any) {
    return this.http.post<any>(this.baseUrl + '/api/flat', data);
  }
 getAllFlat() {
    return this.http.get<any>(this.baseUrl + '/api/flat/');
  }

  deleteFlat(id: any) {
    return this.http.delete<any>(this.baseUrl + '/api/flat/' + id);
  }

//  updateStudent(flatModel: any, id: number) {
    //return this.http.put<any>(this.baseUrl + '/api/flat/' + id, flatModel);
 // }
}
