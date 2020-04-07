import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Basic ${btoa(`${environment.username}:${environment.password}`)}`);

    const cloneReq = req.clone({headers});
    return next.handle(cloneReq);
  }
}
