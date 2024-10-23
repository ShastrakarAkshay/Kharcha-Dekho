import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  ICategoryTransaction,
  ITransactionNew,
} from '../transactions.interface';
import { forkJoin } from 'rxjs';
import { ICategory } from 'src/app/category/category.interface';
import { CategoryService } from 'src/app/category/service/category.service';
import { TransactionService } from '../service/transaction.service';
import { AmountPipe } from 'src/app/common/pipes/amount.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { ToasterService } from 'src/app/common/service/toaster.service';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';
import { HeaderComponent } from 'src/app/common/components/header/header.component';

@Component({
  selector: 'app-category-transactions',
  templateUrl: './category-transactions.component.html',
  styleUrls: ['./category-transactions.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    AmountPipe,
    MatMenuModule,
    MatButtonModule,
    MatBottomSheetModule,
    AddTransactionComponent,
    DropdownComponent,
    HeaderComponent,
  ],
})
export class CategoryTransactionsComponent implements OnInit {
  @Input() showActions: boolean = false;

  currencySymbol = 'currency_rupee';
  transactions: ICategoryTransaction[] = [];

  constructor(
    private _transactionService: TransactionService,
    private _categoryService: CategoryService,
    private _bottomSheet: MatBottomSheet,
    private _toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    forkJoin([
      this._transactionService.getAllTransactions(),
      this._categoryService.getAllCategories(),
    ]).subscribe({
      next: ([txns, categories]: [ITransactionNew[], ICategory[]]) => {
        this.transactions = txns.map((item: ITransactionNew) => {
          const category = categories.find((x) => x.id === item.categoryId);
          return { ...item, percent: 23, category } as ICategoryTransaction;
        });
      },
    });
  }

  onEdit(txn: ICategoryTransaction) {
    this._bottomSheet
      .open(AddTransactionComponent, { data: txn })
      .afterDismissed()
      .subscribe({
        next: () => {
          this.getTransactions();
        },
      });
  }

  onDelete(txn: ICategoryTransaction) {
    this._transactionService.deleteTransaction(txn.id).subscribe({
      next: () => {
        this._toasterService.showSuccess('Transaction Deleted');
        this.getTransactions();
      },
    });
  }
}
