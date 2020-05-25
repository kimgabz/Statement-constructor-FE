import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private jwtService: JwtService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    // debugger;
    const token = this.jwtService.getToken();
    if (token) {
      headersConfig['Authorization'] = `bearer ${token}`;
    }
    const _req = req.clone({ setHeaders: headersConfig });
    return next.handle(_req).do(
      (event: HttpEvent<any>) => {},
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.jwtService.destroyToken();
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }
}
