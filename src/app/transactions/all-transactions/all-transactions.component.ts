import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { CategoryTransactionsComponent } from '../category-transactions/category-transactions.component';

@Component({
  selector: 'app-all-transactions',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CategoryTransactionsComponent],
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss'],
})
export class AllTransactionsComponent {}
