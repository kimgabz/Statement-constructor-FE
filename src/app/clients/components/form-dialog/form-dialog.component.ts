import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../../service/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  clientForm: FormGroup;
  title = 'New Client';
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initClientForm();
    if (this.data && this.data.clientId) {
      this.setClientToForm(this.data.clientId);
    }
  }

  private setClientToForm(clientId) {
    this.title = 'Edit Client';
    this.clientService.getClient(clientId).subscribe(
      (client) => {
        this.clientForm.patchValue(client);
      },
      (err) => this.errorHandler(err, 'Failed to load client')
    );
  }

  private initClientForm() {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
