import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-category-transactions',
  templateUrl: './category-transactions.component.html',
  styleUrls: ['./category-transactions.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, AmountPipe],
})
export class CategoryTransactionsComponent implements OnInit {
  currencySymbol = 'currency_rupee';
  transactions: ICategoryTransaction[] = [];

  constructor(
    private _transactionService: TransactionService,
    private _categoryService: CategoryService
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
        console.log(this.transactions);
      },
    });
  }
}
