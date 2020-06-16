import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './services/transactions.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  totalNumber = 0;
  totalAmount = 0;
  averageAmount = 0;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactionsService.transactions$
      .pipe(
        map(transactions => transactions.map(({ amount }) => ({ amount: +amount })))
      )
      .subscribe((transactions) => {
        this.totalNumber = transactions.length;
        this.totalAmount = transactions.reduce((acc, { amount }) => acc += amount, 0);
        this.averageAmount = this.totalNumber ? this.totalAmount / this.totalNumber : 0;
      });
  }
}
