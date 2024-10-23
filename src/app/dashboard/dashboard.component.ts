import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DWMReportType, IDWMReport } from './dashboard.interface';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { AddTransactionComponent } from '../transactions/add-transaction/add-transaction.component';
import { HeaderComponent } from '../common/components/header/header.component';
import { DropdownComponent } from '../common/components/dropdown/dropdown.component';
import { TransactionService } from '../transactions/service/transaction.service';
import { TransactionComponent } from '../common/components/transaction/transaction.component';
import { forkJoin } from 'rxjs';
import { ICategory } from '../category/category.interface';
import { ITransaction } from '../common/components/transaction/transaction.interface';
import { ITransactionPayload } from '../transactions/transactions.interface';
import { CategoryService } from '../category/service/category.service';
import { DMA_REPORT_CONFIG } from './dashboard.constant';
import { ConfigService } from '../common/service/config.service';

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
export class DashboardComponent implements OnInit {
  readonly currencySymbol = ConfigService.currencySymbol;
  transactions: ITransaction[] = [];
  dwmReport: IDWMReport[] = DMA_REPORT_CONFIG;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _transactionService: TransactionService,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    forkJoin([
      this._transactionService.getAllTransactions(),
      this._categoryService.getAllCategories(),
    ]).subscribe({
      next: ([transactions, categories]: [
        ITransactionPayload[],
        ICategory[]
      ]) => {
        this.transactions = transactions.map((item: ITransactionPayload) => {
          const category = categories.find((x) => x.id === item.categoryId);
          const txn: ITransaction = {
            id: item.id,
            label: category?.name || '',
            subLabel: item.transactionMethod,
            icon: category?.icon?.name || '',
            iconBgColor: category?.icon?.bgColor || '',
            amount: item.amount,
          };
          return txn;
        });
      },
    });
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
}
