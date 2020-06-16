import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  readonly baseUrl = '/api/transactions/';
  transactions$ = new BehaviorSubject<Transaction[]>([]);

  constructor(private httClient: HttpClient) { }

  getAll(): void {
    this.httClient.get<Transaction[]>(`${this.baseUrl}all`)
      .subscribe(transactions => this.transactions$.next(transactions));
  }

  uploadFile(fileToUpload: File): void {
    const formData: FormData = new FormData();
    formData.append('transactionsFile', fileToUpload, fileToUpload.name);

    this.httClient.post(`${this.baseUrl}save`, formData)
      .subscribe(() => this.getAll());
  }

  removeById(id: string): void {
    this.httClient.delete(`${this.baseUrl}remove/${id}`)
      .subscribe(() => this.getAll());
  }
}
