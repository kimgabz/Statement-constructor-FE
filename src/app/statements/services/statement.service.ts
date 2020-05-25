import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Statement, StatementPaginationRsp } from '../models/statement';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class StatementService {
  constructor(private httpClient: HttpClient) {}

  getStatements({
    page,
    perPage,
    sortField,
    sortDir,
    filter,
  }): Observable<StatementPaginationRsp> {
    let queryString = `${BASE_URL}/statements?page=${
      page + 1
    }&perPage=${perPage}`;
    if (sortField && sortDir) {
      queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
    }
    if (filter) {
      queryString = `${queryString}&filter=${filter}`;
    }
    return this.httpClient.get<StatementPaginationRsp>(queryString);
  }

  // getStatements({ page, perPage }): Observable<StatementPaginationRsp> {
  //   return this.httpClient.get<StatementPaginationRsp>(
  //     `${BASE_URL}/statements?page=${page + 1}&perPage=${perPage}`
  //   );
  // }

  getStatement(id: string): Observable<Statement> {
    return this.httpClient.get<Statement>(`${BASE_URL}/statements/${id}`);
  }

  createStatement(body: Statement): Observable<Statement> {
    return this.httpClient.post<Statement>(`${BASE_URL}/statements`, body);
  }

  deleteStatement(id: string): Observable<Statement> {
    return this.httpClient.delete<Statement>(`${BASE_URL}/statements/${id}`);
  }

  updateStatement(id: string, body: Statement) {
    return this.httpClient.put<Statement>(`${BASE_URL}/statements/${id}`, body);
  }

  downloadStatement(id: string) {
    return this.httpClient.get(`${BASE_URL}/statements/${id}/download`, {
      responseType: 'blob', //response type is used to read binary data
    });
  }
}
