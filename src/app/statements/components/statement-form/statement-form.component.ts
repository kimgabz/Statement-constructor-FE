import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatementService } from '../../services/statement.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Statement } from '../../models/statement';
import { ClientService } from 'src/app/clients/service/client.service';
import { Client } from 'src/app/clients/models/client';

@Component({
  selector: 'app-statement-form',
  templateUrl: './statement-form.component.html',
  styleUrls: ['./statement-form.component.scss'],
})
export class StatementFormComponent implements OnInit {
  statementForm: FormGroup;
  statement: Statement;

  clients: Client[] = [];
  title = 'New Statement';

  constructor(
    private fb: FormBuilder,
    private statementService: StatementService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.setStatementToForm();
    this.setClients();
  }

  private setStatementToForm() {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      // console.log(id);
      if (!id) {
        return;
      }
      this.title = 'Edit Statement';
      // this.statementService.getStatement(id).subscribe(
      //   (statement) => {
      //     this.statement = statement;
      //     this.statementForm.patchValue(this.statement);
      //   },
      //   (error) => this.errorHandler(error, 'Failed to get Statement')
      // );
      this.route.data.subscribe((data: { statement: Statement }) => {
        this.statement = data.statement;
        this.statementForm.patchValue(this.statement);
      });
    });
  }

  private setClients() {
    this.clientService.getClients().subscribe(
      (clients) => {
        this.clients = clients;
      },
      (err) => this.errorHandler(err, 'Failed to get Clients')
    );
  }

  private createForm() {
    this.statementForm = this.fb.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
      due: ['', Validators.required],
      qty: ['', Validators.required],
      client: ['', Validators.required],
      rate: '',
      tax: '',
    });
  }

  onSubmit() {
    // debugger;
    // console.log(this.statementForm.value);
    if (this.statement) {
      this.statementService
        .updateStatement(this.statement._id, this.statementForm.value)
        .subscribe(
          (data) => {
            this.snackBar.open('Statement updated', 'Success', {
              duration: 2000,
            });
            this.statementForm.reset();
            this.router.navigate(['dashboard', 'statements']);
          },
          (error) => this.errorHandler(error, 'Update statement failed')
        );
    } else {
      this.statementService.createStatement(this.statementForm.value).subscribe(
        (data) => {
          this.snackBar.open('Statement created', 'Success', {
            duration: 2000,
          });
          this.statementForm.reset();
          this.router.navigate(['dashboard', 'statements']);
          // console.log(data);
        },
        (error) => this.errorHandler(error, 'Create statement Failed')
      );
    }
  }

  private errorHandler(error, message) {
    console.log(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
