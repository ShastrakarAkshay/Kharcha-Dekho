import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IDWMReport } from './dashboard.interface';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { AddTransactionComponent } from '../transactions/add-transaction/add-transaction.component';
import { HeaderComponent } from '../common/components/header/header.component';
import { DropdownComponent } from '../common/components/dropdown/dropdown.component';
import { TransactionService } from '../transactions/service/transaction.service';
import { TransactionComponent } from '../common/components/transaction/transaction.component';
import { DMA_REPORT_CONFIG } from './dashboard.constant';
import { ConfigService } from '../common/service/config.service';
import { ITransaction } from '../transactions/transactions.interface';
import { Subscription } from 'rxjs';

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
  ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  readonly currencySymbol = ConfigService.currencySymbol;
  transactions: ITransaction[] = [];
  dwmReport: IDWMReport[] = DMA_REPORT_CONFIG;
  subscriptions: Subscription[] = [];

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    const sub$ = this._transactionService.getAllTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
