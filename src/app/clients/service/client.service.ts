import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/client';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${BASE_URL}/client`);
  }
  createClient(body: Client): Observable<Client> {
    return this.httpClient.post<Client>(`${BASE_URL}/client`, body);
  }
  deleteClient(id: string): Observable<Client> {
    return this.httpClient.delete<Client>(`${BASE_URL}/client/${id}`);
  }
  getClient(id: string): Observable<Client> {
    return this.httpClient.get<Client>(`${BASE_URL}/client/${id}`);
  }
  updateClient(id: string, body: Client): Observable<Client> {
    return this.httpClient.put<Client>(`${BASE_URL}/client/${id}`, body);
  }
}
