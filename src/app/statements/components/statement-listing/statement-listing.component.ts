import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { StatementService } from '../../services/statement.service';
import { Statement } from '../../models/statement';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { remove } from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import 'rxjs/Rx';

import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { merge } from 'rxjs/observable/merge';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-statement-listing',
  templateUrl: './statement-listing.component.html',
  styleUrls: ['./statement-listing.component.scss'],
})
export class StatementListingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'item',
    'date',
    'due',
    // 'qty',
    // 'rate',
    // 'tax',
    'action',
  ];

  dataSource = new MatTableDataSource<Statement>(); //Statement[] = [];
  resultsLength = 0;
  isLoading = false;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private statementService: StatementService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.populateStatements();
  }

  ngAfterViewInit() {
    // this.paginator.page
    //   .flatMap((data) => {
    //     // console.log(data);
    //     this.isLoading = true;
    //     const index = data.pageIndex;
    //     const size = data.pageSize;
    //     return this.statementService.getStatements({
    //       page: index,
    //       perPage: size,
    //       sortField: this.sort.active,
    //       sortDir: this.sort.direction,
    //     });
    //   })
    //   .subscribe(
    //     (data) => {
    //       console.log(data);
    //       this.dataSource = data.docs;
    //       this.resultsLength = data.total;
    //       this.isLoading = false;
    //     },
    //     (error) => {
    //       this.errorHandler(error, 'Get statement failed');
    //     }
    //   );
    // this.sort.sortChange
    //   .flatMap(() => {
    //     // console.log(data);
    //     this.isLoading = true;
    //     const index = this.paginator.pageIndex;
    //     const size = this.paginator.pageSize;
    //     return this.statementService.getStatements({
    //       page: index,
    //       perPage: size,
    //       sortField: this.sort.active,
    //       sortDir: this.sort.direction,
    //     });
    //   })
    //   .subscribe((data) => {
    //     console.log(data);
    //     this.dataSource = data.docs;
    //     this.resultsLength = data.total;
    //     this.isLoading = false;
    //   });
    // this.populateStatements();
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.statementService.getStatements({
            page: this.paginator.pageIndex,
            perPage: this.paginator.pageSize,
            sortField: this.sort.active,
            sortDir: this.sort.direction,
            filter: '',
          });
        }),
        map((data) => {
          this.isLoading = false;
          this.resultsLength = data.total;
          return data.docs;
        }),
        catchError(() => {
          this.isLoading = false;
          this.errorHandler('Failed to fetch statements', 'Error');
          return observableOf([]);
        })
      )
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  filterText(filterValue: string) {
    this.isLoading = true;
    filterValue = filterValue.trim();
    this.paginator.pageIndex = 0;
    this.statementService
      .getStatements({
        page: this.paginator.pageIndex,
        perPage: this.paginator.pageSize,
        sortField: this.sort.active,
        sortDir: this.sort.direction,
        filter: filterValue,
      })
      .subscribe(
        (data) => {
          this.dataSource.data = data.docs;
          this.resultsLength = data.total;
          this.isLoading = false;
        },
        (err) => this.errorHandler(err, 'Failed to filter statements')
      );
  }
  // private populateStatements() {
  //   this.isLoading = true;
  //   this.statementService
  //     .getStatements({
  //       page: this.paginator.pageIndex,
  //       perPage: this.paginator.pageSize,
  //       sortField: this.sort.active,
  //       sortDir: this.sort.direction,
  //     })
  //     .subscribe(
  //       (data) => {
  //         this.dataSource = data.docs;
  //         this.resultsLength = data.total;
  //         this.isLoading = false;
  //         // console.log(data);
  //       },
  //       (error: any) => {
  //         this.errorHandler(error, 'Get all statement failed');
  //       }
  //     );
  // }

  saveBtnHandler() {
    this.router.navigate(['dashboard', 'statements', 'new']);
  }

  editBtnHandler(id: string) {
    this.router.navigate(['dashboard', 'statements', id]);
  }

  deleteBtnHandler(id: string) {
    // console.log(id);
    this.statementService.deleteStatement(id).subscribe(
      (data) => {
        // console.log(data);
        const removedItems = remove(this.dataSource.data, (item) => {
          return item._id === data._id;
        });
        this.dataSource.data = [...this.dataSource.data];
        this.snackBar.open('Statement deleted', 'Success', {
          duration: 2000,
        });
      },
      (error) => this.errorHandler(error, 'Delete statement failed')
    );
  }

  private errorHandler(error: string, message: string) {
    this.isLoading = false;
    console.log(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
