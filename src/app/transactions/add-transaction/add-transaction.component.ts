import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TRANSACTION_METHODS } from '../../common/common.constants';
import { FormsModule } from '@angular/forms';
import { CATEGORIES } from './add-transaction.constant';
import { ScrollToTopOnFocusDirective } from '../../common/directives/scroll-to-top.directive';
import { ICategory } from 'src/app/category/category-list/category-list.interface';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ScrollToTopOnFocusDirective,
  ],
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnInit {
  transactionMethods = TRANSACTION_METHODS;
  selectedMethod = TRANSACTION_METHODS[0].id;
  currencyIcon = 'currency_rupee';
  categories: ICategory[] = CATEGORIES;
  selectedCategory = CATEGORIES[0].name;
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  ngOnInit(): void {}
}
