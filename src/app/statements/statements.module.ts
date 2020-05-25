import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementListingComponent } from './components/statement-listing/statement-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
import { StatementService } from './services/statement.service';
import { StatementFormComponent } from './components/statement-form/statement-form.component';
import { EditStatementResolverService } from './services/edit-statement-resolver.service';
import { StatementViewComponent } from './components/statement-view/statement-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    StatementListingComponent,
    StatementFormComponent,
    StatementViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [StatementListingComponent, StatementFormComponent],
  providers: [StatementService, EditStatementResolverService],
})
export class StatementsModule {}
