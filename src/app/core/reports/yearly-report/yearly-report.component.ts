import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExpenseCardComponent } from '../expense-card/expense-card.component';
import {
  ITransactionItem,
  TransactionComponent,
} from 'src/app/common/components/transaction/transaction.component';
import { EmptyStateComponent } from 'src/app/common/components/empty-state/empty-state.component';
import { TransactionService } from '../../transactions/service/transaction.service';
import { ITransaction } from '../../transactions/transactions.interface';
import {
  getDateRangeOfYear,
  IDateRange,
} from 'src/app/common/date-utils.constant';
import { SpinnerService } from 'src/app/common/service/spinner.service';
import { finalize } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-yearly-report',
  standalone: true,
  imports: [
    CommonModule,
    TransactionComponent,
    EmptyStateComponent,
    ExpenseCardComponent,
    MatTabsModule,
  ],
  templateUrl: './yearly-report.component.html',
  styleUrl: './yearly-report.component.scss',
})
export class YearlyReportComponent implements OnInit {
  categoryTransactions: ITransactionItem[] = [];
  monthTransactions: ITransactionItem[] = [];
  totalAmount: number = 0;
  isLoading: boolean = false;

  constructor(
    private _transactionService: TransactionService,
    private _spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    this.getYearWiseTransactions();
  }

  getYearWiseTransactions() {
    this._spinner.show();
    this.isLoading = true;
    const dateRange: IDateRange = getDateRangeOfYear(new Date().getFullYear());
    this._transactionService
      .getAllTransactions({ dateRange })
      .pipe(finalize(() => this._spinner.hide()))
      .subscribe({
        next: (res) => {
          this.groupTransactionsByMonth(res);
          this.groupCategoryWiseTransactions(res);
          this.isLoading = false;
        },
      });
  }

  groupTransactionsByMonth(transactions: any[]) {
    const grouped: any = transactions.reduce((acc, transaction) => {
      const createdAt = new Date(transaction.createdAt);
      const monthKey = new Intl.DateTimeFormat('en-US', {
        month: 'long',
      }).format(createdAt);
      // Initialize the group if it doesn't exist
      if (!acc[monthKey]) {
        acc[monthKey] = {
          transactions: [],
          totalAmount: 0,
        };
      }
      // Add the transaction to the group and update the total amount
      acc[monthKey].transactions.push(transaction);
      acc[monthKey].totalAmount += transaction.amount;

      return acc;
    }, {});

    this.monthTransactions = Object.entries(grouped)
      .map(([monthName, details]: any, index) => ({
        id: index + 1,
        label: monthName,
        amount: details.totalAmount,
      }))
      .reverse() as ITransactionItem[];
  }

  groupCategoryWiseTransactions(transactions: ITransaction[]) {
    const categories: any = {};
    transactions.forEach((item) => {
      if (categories[item.categoryId as any]) {
        categories[item.categoryId as any].amounts.push(item.amount);
      } else {
        categories[item.categoryId as any] = {
          name: item.category?.name,
          icon: item.category?.icon?.name,
          bgColor: item.category?.icon?.bgColor,
          amounts: [item.amount],
        };
      }
    });
    const txns: ITransactionItem[] = [];
    for (let key in categories) {
      const value = categories[key];
      const amount = value.amounts.reduce(
        (acc: any, item: any) => (acc += item),
        0
      );
      txns.push({
        id: key,
        label: value.name,
        subText: '',
        iconName: value.icon,
        iconBgColor: value.bgColor,
        amount,
      });
    }
    this.categoryTransactions = txns.sort((a, b) => b.amount - a.amount);
    this.totalAmount = this.categoryTransactions.reduce((total, item) => {
      total += item.amount;
      return total;
    }, 0);
  }
}
