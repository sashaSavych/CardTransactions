import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  readonly baseUrl = '/api/transactions/';
  transactions$ = new BehaviorSubject<Transaction[]>([]);

  constructor(private httClient: HttpClient) { }

  loadAll(): void {
    this.httClient.get<Transaction[]>(`${this.baseUrl}all`)
      .subscribe(transactions => this.transactions$.next(transactions));
  }

  uploadFile(fileToUpload: File): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-type', 'multipart/form-data');

    const formData: FormData = new FormData();
    formData.append('transactionsFile', fileToUpload, fileToUpload.name);

    this.httClient.post(`${this.baseUrl}save`, formData, { headers })
      .subscribe(() => this.loadAll());
  }

  removeById(id: string): void {
    this.httClient.delete(`${this.baseUrl}remove/${id}`)
      .subscribe(() => this.loadAll());
  }
}
