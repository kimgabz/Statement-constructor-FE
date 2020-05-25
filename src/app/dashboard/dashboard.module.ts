import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '../shared/material.module';
import { StatementsModule } from '../statements/statements.module';
import { ClientsModule } from '../clients/clients.module';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptorService } from '../core/services/token-Interceptor.service';

@NgModule({
  declarations: [DashboardComponent, SideNavComponent, ToolbarComponent],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: TokenInterceptorService,
  //     multi: true,
  //   },
  // ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StatementsModule,
    ClientsModule,
    MaterialModule,
  ],
})
export class DashboardModule {}
