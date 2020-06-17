import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../models/interfaces';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
  @Output() removeById = new EventEmitter<string>();
}
