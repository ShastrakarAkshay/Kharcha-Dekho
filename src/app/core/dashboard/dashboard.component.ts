import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DWMReportType, IDWMReport } from './dashboard.interface';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { AddTransactionComponent } from '../transactions/add-transaction/add-transaction.component';
import { HeaderComponent } from '../../common/components/header/header.component';
import {
  DropdownComponent,
  IMonth,
} from '../../common/components/dropdown/dropdown.component';
import { TransactionService } from '../transactions/service/transaction.service';
import {
  ITransactionItem,
  TransactionComponent,
} from '../../common/components/transaction/transaction.component';
import { DMA_REPORT_CONFIG } from './dashboard.constant';
import { ConfigService } from '../../common/service/config.service';
import { IFilter, ITransaction } from '../transactions/transactions.interface';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from '../../common/components/spinner/spinner.component';
import { AmountPipe } from '../../common/pipes/amount.pipe';
import { SpinnerService } from '../../common/service/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    AddTransactionComponent,
    MatButtonModule,
    HeaderComponent,
    DropdownComponent,
    TransactionComponent,
    SpinnerComponent,
    AmountPipe,
  ],
  providers: [DatePipe],
})
export class DashboardComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  dwmReport: IDWMReport[] = DMA_REPORT_CONFIG;
  transactions: ITransaction[] = [];
  transactionItems: ITransactionItem[] = [];
  subscriptions: Subscription[] = [];

  filters: IFilter = {};

  get currencySymbol() {
    return this._configService.currencySymbol;
  }

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _transactionService: TransactionService,
    private _spinnerService: SpinnerService,
    private _datePipe: DatePipe,
    private _router: Router,
    private _configService: ConfigService
  ) {}

  ngOnInit(): void {}

  onMonthChange(month: IMonth) {
    this.filters.month = month.id;
    this.getAllTransactions();
  }

  getAllTransactions() {
    this._spinnerService.show();
    const sub$ = this._transactionService
      .getAllTransactions(this.filters)
      .subscribe({
        next: (transactions) => {
          this.transactions = transactions;
          this.updateCategoryWiseTransactions();
          this.updateDayAmount();
          this.updateWeekAmount();
          this.updateMonthAmount();
          this._spinnerService.hide();
        },
      });
    this.subscriptions.push(sub$);
  }

  addTransaction() {
    const sub$ = this._bottomSheet
      .open(AddTransactionComponent)
      .afterDismissed()
      .subscribe({
        next: (refresh: boolean) => {
          if (refresh) {
            this.getAllTransactions();
          }
        },
      });
    this.subscriptions.push(sub$);
  }

  updateCategoryWiseTransactions() {
    const categories: any = {};
    this.transactions.forEach((item) => {
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
    this.transactionItems = txns;
  }

  updateDayAmount() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const amount = this.transactions
      .filter((item) => {
        const itemDate = new Date(item?.createdAt);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === currentDate.getTime();
      })
      .reduce((acc, item) => (acc += item.amount), 0);
    this.dwmReport.forEach((item) => {
      if (item.type === DWMReportType.DAY) {
        item.amount = amount;
      }
    });
  }

  updateWeekAmount() {
    const currentDate = new Date();

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const amount = this.transactions
      .filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
      })
      .reduce((acc, item) => (acc += item.amount), 0);

    this.dwmReport.forEach((item) => {
      if (item.type === DWMReportType.WEEK) {
        item.amount = amount;
      }
    });
  }

  updateMonthAmount() {
    const amount = this.transactions.reduce(
      (acc, item) => (acc += item.amount),
      0
    );
    this.dwmReport.forEach((item) => {
      if (item.type === DWMReportType.MONTH) {
        item.amount = amount;
      }
    });
  }

  onCategoryClick(categoryId: string) {
    this._transactionService.lastDoc = null;
    this._router.navigate(['core/all-transactions', categoryId]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
