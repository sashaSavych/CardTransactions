import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './services/transactions.service';
import { map } from 'rxjs/operators';
import { Transaction } from './models/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  transactions: Transaction[] = [];
  totalNumber = 0;
  totalAmount = 0;
  averageAmount = 0;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactionsService.loadAll();

    this.transactionsService.transactions$
      .subscribe((transactions) => {
        this.transactions = transactions;
        this.calculateWidgetValues();
      });
  }

  removeItem(id: string): void {
    this.transactionsService.removeById(id);
  }

  private calculateWidgetValues(): void {
    this.totalNumber = this.transactions.length;
    this.totalAmount = this.transactions.reduce((acc, { amount }) => acc += +amount, 0);
    this.averageAmount = this.totalNumber ? this.totalAmount / this.totalNumber : 0;
  }
}
