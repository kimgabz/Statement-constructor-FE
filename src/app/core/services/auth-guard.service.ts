import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (this.jwtService.getToken()) {
      return Observable.of(true);
    }

    //extract the token
    const token = route.queryParamMap.get('token');
    // debugger;
    if (token) {
      return this.authService.isAuthenticated(token).pipe(
        map((authenticated) => {
          if (authenticated === true) {
            this.jwtService.seToken(token);
            this.router.navigate(['/dashboard', 'statements']);
            return true;
          }
          this.router.navigate(['/login']);
          return false;
        }),
        catchError((err: any) => {
          this.router.navigate(['/login']);
          return ObservableOf(false);
        })
      );
    } else {
      this.router.navigate(['/login']);
      return ObservableOf(false);
    }
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
