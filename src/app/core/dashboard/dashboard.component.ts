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
import { finalize, Observable, Subscription } from 'rxjs';
import { SpinnerComponent } from '../../common/components/spinner/spinner.component';
import { AmountPipe } from '../../common/pipes/amount.pipe';
import { SpinnerService } from '../../common/service/spinner.service';
import { Router } from '@angular/router';
import { EmptyStateComponent } from '../../common/components/empty-state/empty-state.component';
import { BarChartComponent, ChartType } from './bar-chart/bar-chart.component';
import { Select, select, Store } from '@ngxs/store';
import {
  GetDashboardTransaction,
  RefreshTransaction,
} from 'src/app/store/actions/dashboard.action';
import { DashboardTransactionState } from 'src/app/store/states/dashboard.state';

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
    EmptyStateComponent,
    BarChartComponent,
  ],
  providers: [DatePipe],
})
export class DashboardComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  dwmReport: IDWMReport[] = DMA_REPORT_CONFIG;
  transactions: ITransaction[] = [];
  transactionItems: ITransactionItem[] = [];
  subscriptions: Subscription[] = [];

  filters: IFilter = {
    month: new Date().getMonth(),
  };
  chartType: ChartType = 'bar';

  @Select(DashboardTransactionState.getDashboardTransactions)
  dashboardTransactions$!: Observable<ITransaction[]>;

  @Select(DashboardTransactionState.refreshTransaction)
  isTransactionLoaded$!: Observable<boolean>;

  get currencySymbol() {
    return this._configService.currencySymbol;
  }

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _transactionService: TransactionService,
    private _spinnerService: SpinnerService,
    private _datePipe: DatePipe,
    private _router: Router,
    private _configService: ConfigService,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this.getAllTransactions();
    this.getTransactionFromStore();
  }

  onMonthChange(month: IMonth) {
    this.filters.month = month.id;
    this.getAllTransactions(true);
  }

  getTransactionFromStore() {
    this.isLoading = true;
    const sub$ = this.dashboardTransactions$
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((transactions) => {
        if (transactions) {
          this.transactions = transactions;
          this.updateCategoryWiseTransactions();
          this.updateDayAmount();
          this.updateWeekAmount();
          this.updateMonthAmount();
          this._spinnerService.hide();
        }
      });
    this.subscriptions.push(sub$);
  }

  getAllTransactions(refresh?: boolean) {
    const sub$ = this.isTransactionLoaded$.subscribe((reload) => {
      if (reload || refresh) {
        this._spinnerService.show();
        this._store.dispatch(new GetDashboardTransaction(this.filters));
      }
    });
    this.subscriptions.push(sub$);
  }

  addTransaction() {
    const sub$ = this._bottomSheet
      .open(AddTransactionComponent)
      .afterDismissed()
      .subscribe();
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
    this.transactionItems = txns.sort((a, b) => b.amount - a.amount);
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
    const date = new Date();
    const dayOfWeek = date.getDay();
    const startDiff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const endDiff = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

    const monday = new Date(date);
    monday.setDate(date.getDate() + startDiff);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(date);
    sunday.setDate(date.getDate() + endDiff);
    sunday.setHours(23, 59, 59, 999);

    const amount = this.transactions
      .filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= monday && itemDate <= sunday;
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
    this._router.navigate(['core/all-transactions', categoryId]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
