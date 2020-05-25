import { Injectable } from '@angular/core';
import { Statement } from '../models/statement';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { StatementService } from './statement.service';
import { Observable } from 'rxjs/Observable';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EditStatementResolverService implements Resolve<Statement> {
  constructor(
    private statementService: StatementService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Statement> {
    let id = route.paramMap.get('id');
    return this.statementService.getStatement(id).pipe(
      take(1),
      map((statement) => {
        // debugger;
        if (statement) {
          return statement;
        } else {
          this.router.navigate(['/dashboard', 'statements']);
          return null;
        }
      })
    );
  }
}
