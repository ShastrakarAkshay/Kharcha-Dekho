import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { TransactionComponent } from 'src/app/common/components/transaction/transaction.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CategoryService } from 'src/app/category/service/category.service';
import { DialogService } from 'src/app/common/service/dialog.service';
import { ToasterService } from 'src/app/common/service/toaster.service';
import { TransactionService } from '../service/transaction.service';
import { forkJoin } from 'rxjs';
import {
  ICategoryTransaction,
  ITransactionPayload,
} from '../transactions.interface';
import { ICategory } from 'src/app/category/category.interface';
import { ITransaction } from 'src/app/common/components/transaction/transaction.interface';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';

@Component({
  selector: 'app-all-transactions',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TransactionComponent,
    TransactionComponent,
  ],
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss'],
})
export class AllTransactionsComponent implements OnInit {
  transactions: ITransaction[] = [];
  categoryTransactions: ICategoryTransaction[] = [];

  constructor(
    private _transactionService: TransactionService,
    private _categoryService: CategoryService,
    private _bottomSheet: MatBottomSheet,
    private _toasterService: ToasterService,
    private _dialogService: DialogService
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
        this.categoryTransactions = transactions.map(
          (item: ITransactionPayload) => {
            const category = categories.find((x) => x.id === item.categoryId);
            return { ...item, percent: 23, category } as ICategoryTransaction;
          }
        );
      },
    });
  }

  onEdit(txn: ITransaction) {
    const transaction = this.categoryTransactions.find((x) => x.id === txn.id);
    this._bottomSheet
      .open(AddTransactionComponent, { data: transaction })
      .afterDismissed()
      .subscribe({
        next: () => {
          this.getAllTransactions();
        },
      });
  }

  onDelete(txn: ITransaction) {
    this._dialogService
      .confirm()
      .afterClosed()
      .subscribe({
        next: (isConfirm) => {
          if (isConfirm) {
            this._transactionService.deleteTransaction(txn.id).subscribe({
              next: () => {
                this._toasterService.showSuccess('Transaction Deleted');
                this.getAllTransactions();
              },
            });
          }
        },
      });
  }
}
