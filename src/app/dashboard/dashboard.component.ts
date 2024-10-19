import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TransactionsComponent } from '../transactions/transactions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DWMReportType, IDWMReport } from './dashboard.interface';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { IconsComponent } from '../icons/icons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AddTransactionComponent } from '../transactions/add-transaction/add-transaction.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TransactionsComponent,
    IconsComponent,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    AddTransactionComponent,
    MatButtonModule,
  ],
})
export class DashboardComponent {
  dwmReport: IDWMReport[] = [
    {
      type: DWMReportType.DAY,
      amount: 10,
      currencyIcon: 'currency_rupee',
    },
    {
      type: DWMReportType.MONTH,
      amount: 20,
      currencyIcon: 'currency_rupee',
    },
    {
      type: DWMReportType.WEEK,
      amount: 50,
      currencyIcon: 'currency_rupee',
    },
  ];
  constructor(private _bottomSheet: MatBottomSheet) {}

  addTransaction() {
    this._bottomSheet.open(AddTransactionComponent);
  }
}
