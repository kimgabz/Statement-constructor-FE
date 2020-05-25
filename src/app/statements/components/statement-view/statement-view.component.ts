import { Component, OnInit } from '@angular/core';
import { Statement } from '../../models/statement';
import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';
import { StatementService } from '../../services/statement.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-statement-view',
  templateUrl: './statement-view.component.html',
  styleUrls: ['./statement-view.component.scss'],
})
export class StatementViewComponent implements OnInit {
  statement: Statement;
  total: number;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private statementService: StatementService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { statement: Statement }) => {
      this.statement = data.statement;
      // console.log(this.statement);
      if (
        typeof this.statement.qty !== 'undefined' &&
        typeof this.statement.rate !== 'undefined'
      ) {
        this.total = this.statement.qty * this.statement.rate;
      }
      let salesTax = 0;
      if (typeof this.statement.tax !== 'undefined') {
        salesTax = (this.total * this.statement.tax) / 100;
      }
      this.total += salesTax;
    });
  }

  downloadHandler(id: string) {
    console.log(id);

    this.isLoading = true;
    this.statementService.downloadStatement(id).subscribe(
      (data) => {
        console.log(data);
        saveAs(data, this.statement.item);
      },
      (error) => {
        this.errorHandler(error, 'Error while downloading statement');
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  private errorHandler(error, message) {
    console.error(error);
    this.isLoading = false;
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
