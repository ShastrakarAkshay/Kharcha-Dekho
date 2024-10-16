import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ITransaction, TransactionMethod } from './transactions.interface';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class TransactionsComponent {
  transactions: ITransaction[] = [
    {
      icon: 'home',
      iconBg: '#c7ffcd',
      categoryName: 'Shopping',
      transactionMethod: TransactionMethod.CASH,
      currencySymbol: '$',
      amount: 498.0,
      percent: 32,
    },
    {
      icon: 'home',
      iconBg: '#e9e0ff',
      categoryName: 'Gifts',
      transactionMethod: TransactionMethod.CARD,
      currencySymbol: '$',
      amount: 300.0,
      percent: 32,
    },
    {
      icon: 'home',
      iconBg: '#ffe0d7',
      categoryName: 'Food',
      transactionMethod: TransactionMethod.UPI,
      currencySymbol: '$',
      amount: 200.0,
      percent: 12,
    },
    {
      icon: 'home',
      iconBg: '#c7ffcd',
      categoryName: 'Shopping',
      transactionMethod: TransactionMethod.CHEQUE,
      currencySymbol: '$',
      amount: 498.0,
      percent: 32,
    },
    {
      icon: 'home',
      iconBg: '#e9e0ff',
      categoryName: 'Gifts',
      transactionMethod: TransactionMethod.CARD,
      currencySymbol: '$',
      amount: 300.0,
      percent: 32,
    },
    {
      icon: 'home',
      iconBg: '#ffe0d7',
      categoryName: 'Food',
      transactionMethod: TransactionMethod.UPI,
      currencySymbol: '$',
      amount: 200.0,
      percent: 12,
    },
    {
      icon: 'home',
      iconBg: '#c7ffcd',
      categoryName: 'Shopping',
      transactionMethod: TransactionMethod.CARD,
      currencySymbol: '$',
      amount: 498.0,
      percent: 32,
    },
    {
      icon: 'home',
      iconBg: '#e9e0ff',
      categoryName: 'Gifts',
      transactionMethod: TransactionMethod.CARD,
      currencySymbol: '$',
      amount: 300.0,
      percent: 32,
    },
    {
      icon: 'home',
      iconBg: '#ffe0d7',
      categoryName: 'Food',
      transactionMethod: TransactionMethod.CARD,
      currencySymbol: '$',
      amount: 200.0,
      percent: 12,
    },
  ];
}
