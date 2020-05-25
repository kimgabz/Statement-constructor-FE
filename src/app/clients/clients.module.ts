import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListingComponent } from './components/client-listing/client-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './service/client.service';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';

@NgModule({
  declarations: [ClientListingComponent, FormDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    // HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ClientListingComponent],
  providers: [ClientService],
  entryComponents: [FormDialogComponent],
})
export class ClientsModule {}
