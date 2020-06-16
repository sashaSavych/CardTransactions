import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/interfaces';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  tempVal: Transaction[] = [
    {
      _id: '_1',
      id: '1',
      cardHolderHash: '',
      datetime: '2018-08-15 10:22:23 GMT+0300',
      amount: 1200.9
    }
  ];
  transactions$ = new BehaviorSubject<Transaction[]>(this.tempVal);

  constructor(private httClient: HttpClient) { }

  getAll(): Observable<Transaction[]> {
    return this.httClient.get<Transaction[]>('test');
  }

  uploadFile(fileToUpload: File): void {
    const formData: FormData = new FormData();
    formData.append('transactionsFile', fileToUpload, fileToUpload.name);

    this.httClient.post('test', formData)
      .pipe(
        switchMap(() => this.getAll())
      )
      .subscribe(transactions => this.transactions$.next(transactions));
  }

  removeById(id: string): void {
    const params = { id };

    this.httClient.delete('test', { params })
      .pipe(
        switchMap(() => this.getAll())
      )
      .subscribe(transactions => this.transactions$.next(transactions));
  }
}
