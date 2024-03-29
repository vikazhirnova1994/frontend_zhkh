import {Injectable} from '@angular/core';
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent,
  HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {StorageService} from "../_services/storage.service";
import {AuthService} from "../_services/auth.service";
import {EventData} from "./event.class";
import {EventBusService} from "./event-bus.service";

const TOKEN_HEADER_KEY = 'Authorization'

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor( private storageService: StorageService,  private authService: AuthService,  private eventBusService: EventBusService ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    if (this.storageService.getToken() != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' +  this.storageService.getToken()) });
    }
    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/signin') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.storageService.isLoggedIn()) {
        return this.authService.refreshToken().pipe(
          switchMap(() => {
            this.isRefreshing = false;
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '403') {
              this.eventBusService.emit(new EventData('logout', null));
            }
            return throwError(() => error);
          })
        );
      }
    }
    return next.handle(request);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];

