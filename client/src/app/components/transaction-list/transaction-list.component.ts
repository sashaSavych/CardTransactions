import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  readonly transactions$ = this.transactionsService.transactions$;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactionsService.getAll();
  }

  removeItem(id: string): void {
    this.transactionsService.removeById(id);
  }
}
