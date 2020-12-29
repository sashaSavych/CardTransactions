import {Component, OnDestroy, OnInit} from '@angular/core';
import { TransactionsService } from './services/transactions.service';
import { Transaction } from './models/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  totalNumber = 0;
  totalAmount = 0;
  averageAmount = 0;

  private subscription: Subscription;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactionsService.loadAll();
    this.handleTransactions();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeItem(id: string): void {
    this.transactionsService.removeById(id);
  }

  private handleTransactions(): void {
    this.subscription = this.transactionsService.transactions$
      .subscribe((transactions) => {
        this.transactions = transactions;
        this.calculateWidgetValues();
      });
  }

  private calculateWidgetValues(): void {
    this.totalNumber = this.transactions.length;
    this.totalAmount = this.transactions.reduce((acc, { amount }) => acc += +amount, 0);
    this.averageAmount = this.totalNumber ? this.totalAmount / this.totalNumber : 0;
  }
}
