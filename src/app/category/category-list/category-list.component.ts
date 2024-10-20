import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Icon, IconsComponent } from 'src/app/icons/icons.component';
import {
  ITransaction,
  TransactionMethod,
} from 'src/app/transactions/transactions.interface';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { SearchComponent } from 'src/app/common/components/search/search.component';
import { getIcons } from 'src/app/icons/icons.constant';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatMenuModule,
    CreateCategoryComponent,
    SearchComponent,
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  icons: Icon[] = getIcons();
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

  constructor(private _bottomSheet: MatBottomSheet) {}

  addTransaction() {
    this._bottomSheet.open(CreateCategoryComponent);
  }
}
