import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../../models/client';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import 'rxjs/add/operator/mergeMap';
import { remove } from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss'],
})
export class ClientListingComponent implements OnInit {
  displayColumns = ['firstName', 'lastName', 'email', 'action'];
  dataSource = new MatTableDataSource<Client>();
  isLoading = false;

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.clientService.getClients().subscribe(
      (data) => {
        // console.log(data);
        this.dataSource.data = data;
      },
      (error) => {
        // console.log(error);
        this.errorHandler(error, 'Something went wrong');
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  saveBtnHandler() {}

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(FormDialogComponent, {
  //     width: '400px',
  //     height: '350px',
  //   });

  //   dialogRef
  //     .afterClosed()
  //     .filter((clientParam) => typeof clientParam === 'object') // If cancel button is clicked
  //     .flatMap((result) => {
  //       return this.clientService.createClient(result);
  //     })
  //     .subscribe((data) => {
  //       this.dataSource.data.push(data);
  //       this.dataSource.data = [...this.dataSource.data];
  //       this.snackBar.open('Created Client', 'Success', {
  //         duration: 2000,
  //       });
  //     });
  //   //   .subscribe((result) => {
  //   //   console.log(result);
  //   //   this.animal = result;
  //   // });
  // }

  openDialog(clientId: string): void {
    const options = {
      width: '300px',
      height: '350px',
      data: {},
    };
    if (clientId) {
      options.data = { clientId: clientId };
    }
    let dialogRef = this.dialog.open(FormDialogComponent, options);
    dialogRef
      .afterClosed()
      .filter((clientParam) => typeof clientParam === 'object')
      .flatMap((result) => {
        return clientId
          ? this.clientService.updateClient(clientId, result)
          : this.clientService.createClient(result);
      })
      .subscribe(
        (client) => {
          let successMsg = '';
          if (clientId) {
            const index = this.dataSource.data.findIndex(
              (client) => client._id === clientId
            );
            this.dataSource.data[index] = client;
            successMsg = 'Client updated';
          } else {
            this.dataSource.data.push(client);
            successMsg = 'Client created';
          }
          this.dataSource.data = [...this.dataSource.data];
          this.snackBar.open(successMsg, 'Success', {
            duration: 2000,
          });
        },
        (err) => this.errorHandler(err, 'Failed to created Client')
      );
  }

  saveBtnHanlder() {}

  deleteBtnHandler(clientId) {
    this.clientService.deleteClient(clientId).subscribe(
      (data) => {
        const removedItems = remove(this.dataSource.data, (item) => {
          return item._id === data._id;
        });
        this.dataSource.data = [...this.dataSource.data];
        this.snackBar.open('Client deleted', 'Success', {
          duration: 2000,
        });
      },
      (err) => this.errorHandler(err, 'Failed to delete client')
    );
  }

  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
