import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResponseMessage, Transaction } from '../models/interfaces';
import { MaterializeService } from './materialize.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  readonly baseUrl = '/api/transactions/';
  transactions$ = new BehaviorSubject<Transaction[]>([]);

  constructor(private httClient: HttpClient) { }

  loadAll(): void {
    this.httClient.get<Transaction[]>(this.baseUrl)
      .subscribe(
        transactions => this.transactions$.next(transactions),
        error => MaterializeService.showToastMessage(this.retrieveErrorMessage(error)));
  }

  uploadFile(fileToUpload: File): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-type', 'multipart/form-data');

    const formData: FormData = new FormData();
    formData.append('transactionsFile', fileToUpload, fileToUpload.name);

    this.httClient.post<ResponseMessage>(this.baseUrl, formData, { headers })
      .subscribe(
        ({ message }) => {
          MaterializeService.showToastMessage(message);
          this.loadAll();
        },
          error => MaterializeService.showToastMessage(this.retrieveErrorMessage(error)));
  }

  removeById(id: string): void {
    this.httClient.delete<ResponseMessage>(`${this.baseUrl}/${id}`)
      .subscribe(
        ({ message }) => {
          MaterializeService.showToastMessage(message);
          this.loadAll();
        },
        error => MaterializeService.showToastMessage(this.retrieveErrorMessage(error)));
  }

  private retrieveErrorMessage(error: HttpErrorResponse): string {
    return error.error.message || error.message;
  }
}
