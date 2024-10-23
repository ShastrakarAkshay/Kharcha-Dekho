import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { CategoryTransactionsComponent } from '../category-transactions/category-transactions.component';
import { TransactionComponent } from 'src/app/common/components/transaction/transaction.component';

@Component({
  selector: 'app-all-transactions',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TransactionComponent,
    CategoryTransactionsComponent,
  ],
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss'],
})
export class AllTransactionsComponent {}
