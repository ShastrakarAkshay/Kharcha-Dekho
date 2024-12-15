import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  ITransactionItem,
  TransactionComponent,
} from 'src/app/common/components/transaction/transaction.component';

@Component({
  selector: 'app-monthly-report',
  standalone: true,
  imports: [CommonModule, MatIconModule, TransactionComponent],
  templateUrl: './monthly-report.component.html',
  styleUrl: './monthly-report.component.scss',
})
export class MonthlyReportComponent {
  transactionItems: ITransactionItem[] = [];
}
