import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  ITransaction,
  TransactionMethod,
} from '../transactions/transactions.interface';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
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
