import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import {
  ITransactionItem,
  TransactionComponent,
} from 'src/app/common/components/transaction/transaction.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DialogService } from 'src/app/common/service/dialog.service';
import { ToasterService } from 'src/app/common/service/toaster.service';
import { TransactionService } from '../service/transaction.service';
import { ITransaction } from '../transactions.interface';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { finalize, Subscription } from 'rxjs';
import { SpinnerComponent } from 'src/app/common/components/spinner/spinner.component';
import { SpinnerService } from 'src/app/common/service/spinner.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-all-transactions',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TransactionComponent,
    TransactionComponent,
    SpinnerComponent,
    MatExpansionModule,
    MatAccordion,
  ],
  providers: [DatePipe, provideNativeDateAdapter()],
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss'],
})
export class AllTransactionsComponent implements OnInit, OnDestroy {
  transactions: ITransaction[] = [];
  transactionList: any[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private _transactionService: TransactionService,
    private _bottomSheet: MatBottomSheet,
    private _toasterService: ToasterService,
    private _dialogService: DialogService,
    private _spinnerService: SpinnerService,
    private _datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this._spinnerService.show();
    const sub$ = this._transactionService
      .getAllTransactions()
      .pipe(finalize(() => this._spinnerService.hide()))
      .subscribe({
        next: (transactions) => {
          this.transactions = transactions;
          this.groupByCreatedDate();
        },
      });
    this.subscriptions.push(sub$);
  }

  groupByCreatedDate() {
    const group = this.transactions.reduce((acc: any, item) => {
      const date = new Date(item.createdAt);
      date.setHours(0, 0, 0, 0);
      const dateKey = date.toString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    }, {});
    const transactionList = [];
    for (var [key, value] of Object.entries(group)) {
      const txns = value as ITransaction[];
      const txnList = txns.map((item) => {
        return {
          id: item.id,
          label: item.category?.name,
          subText: item.comment || '-',
          amount: item.amount,
          iconName: item.category?.icon?.name,
          iconBgColor: item.category?.icon?.bgColor,
          rightSubText: item.transactionMethod,
        } as ITransactionItem;
      });
      transactionList.push({
        date: this._datePipe.transform(new Date(key), 'dd MMM yyyy'),
        list: txnList,
      });
      this.transactionList = transactionList;
    }
  }

  onEdit(id: string) {
    const txn = this.transactions.find((x) => x.id === id);
    const sub$ = this._bottomSheet
      .open(AddTransactionComponent, { data: txn })
      .afterDismissed()
      .subscribe({
        next: () => {
          this.getAllTransactions();
        },
      });
    this.subscriptions.push(sub$);
  }

  onDelete(id: string) {
    const txn = this.transactions.find((x) => x.id === id);
    const sub$ = this._dialogService
      .confirm()
      .afterClosed()
      .subscribe({
        next: (isConfirm) => {
          if (isConfirm) {
            this._spinnerService.show();
            const sub$ = this._transactionService
              .deleteTransaction(txn?.id)
              .subscribe({
                next: () => {
                  this._toasterService.showSuccess('Transaction Deleted');
                  this.getAllTransactions();
                },
              });
            this.subscriptions.push(sub$);
          }
        },
      });
    this.subscriptions.push(sub$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
