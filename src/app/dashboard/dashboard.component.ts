import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DWMReportType, IDWMReport } from './dashboard.interface';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { AddTransactionComponent } from '../transactions/add-transaction/add-transaction.component';
import { HeaderComponent } from '../common/components/header/header.component';
import {
  DropdownComponent,
  IMonth,
} from '../common/components/dropdown/dropdown.component';
import { TransactionService } from '../transactions/service/transaction.service';
import { TransactionComponent } from '../common/components/transaction/transaction.component';
import { DMA_REPORT_CONFIG } from './dashboard.constant';
import { ConfigService } from '../common/service/config.service';
import { ITransaction } from '../transactions/transactions.interface';
import { finalize, Subscription } from 'rxjs';
import { SpinnerComponent } from '../common/components/spinner/spinner.component';
import { AmountPipe } from '../common/pipes/amount.pipe';

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
})
export class DashboardComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  readonly currencySymbol = ConfigService.currencySymbol;
  dwmReport: IDWMReport[] = DMA_REPORT_CONFIG;
  transactions: ITransaction[] = [];
  subscriptions: Subscription[] = [];

  filters = {
    month: null,
  };

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _transactionService: TransactionService
  ) {}

  ngOnInit(): void {}

  onMonthChange(month: IMonth) {
    this.filters.month = month.id;
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.isLoading = true;
    const sub$ = this._transactionService
      .getAllTransactions(this.filters)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (transactions) => {
          this.transactions = transactions;
          console.log(transactions);
          this.updateDayAmount();
          this.updateWeekAmount();
          this.updateMonthAmount();
        },
      });
    this.subscriptions.push(sub$);
  }

  addTransaction() {
    this._bottomSheet
      .open(AddTransactionComponent)
      .afterDismissed()
      .subscribe({
        next: () => {
          this.getAllTransactions();
        },
      });
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
