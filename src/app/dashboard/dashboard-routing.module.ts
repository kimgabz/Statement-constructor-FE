import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { StatementListingComponent } from '../statements/components/statement-listing/statement-listing.component';
import { ClientListingComponent } from '../clients/components/client-listing/client-listing.component';
import { StatementFormComponent } from '../statements/components/statement-form/statement-form.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { EditStatementResolverService } from '../statements/services/edit-statement-resolver.service';
import { StatementViewComponent } from '../statements/components/statement-view/statement-view.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'statements',
        component: StatementListingComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'statements/new',
        component: StatementFormComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'statements/:id/view',
        component: StatementViewComponent,
        canActivateChild: [AuthGuardService],
        resolve: {
          statement: EditStatementResolverService,
        },
      },
      {
        path: 'statements/:id',
        component: StatementFormComponent,
        canActivateChild: [AuthGuardService],
        resolve: {
          statement: EditStatementResolverService,
        },
      },
      {
        path: 'clients',
        component: ClientListingComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: '**',
        redirectTo: 'statements',
        canActivateChild: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
