import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { TransactionComponent } from 'src/app/common/components/transaction/transaction.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DialogService } from 'src/app/common/service/dialog.service';
import { ToasterService } from 'src/app/common/service/toaster.service';
import { TransactionService } from '../service/transaction.service';
import { ITransaction } from '../transactions.interface';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { finalize, Subscription } from 'rxjs';
import { SpinnerComponent } from 'src/app/common/components/spinner/spinner.component';
import { SpinnerService } from 'src/app/common/service/spinner.service';

@Component({
  selector: 'app-all-transactions',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TransactionComponent,
    TransactionComponent,
    SpinnerComponent,
  ],
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss'],
})
export class AllTransactionsComponent implements OnInit, OnDestroy {
  transactions: ITransaction[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private _transactionService: TransactionService,
    private _bottomSheet: MatBottomSheet,
    private _toasterService: ToasterService,
    private _dialogService: DialogService,
    private _spinnerService: SpinnerService
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
          console.log(transactions);
        },
      });
    this.subscriptions.push(sub$);
  }

  onEdit(txn: ITransaction) {
    this._bottomSheet.open(AddTransactionComponent, { data: txn });
  }

  onDelete(txn: ITransaction) {
    const sub$ = this._dialogService
      .confirm()
      .afterClosed()
      .subscribe({
        next: (isConfirm) => {
          if (isConfirm) {
            this._spinnerService.show();
            const sub$ = this._transactionService
              .deleteTransaction(txn.id)
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
