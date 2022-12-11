import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtResponse} from "./jwt-response";

const AUTH_API = 'http://localhost:8005/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>( AUTH_API + 'signin', {username, password,},  httpOptions );
  }

  register(username: string, contractNumber: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(AUTH_API + 'signup', {username, contractNumber, password, },  httpOptions );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  refreshToken() {
    return this.http.post(AUTH_API + 'refreshtoken', {}, httpOptions);
  }
}
