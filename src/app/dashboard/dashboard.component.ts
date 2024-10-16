import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TransactionsComponent } from '../transactions/transactions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DWMReportType, IDWMReport } from './dashboard.interface';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TransactionsComponent,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
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
}
