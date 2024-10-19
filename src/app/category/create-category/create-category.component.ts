import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ScrollToTopOnFocusDirective } from 'src/app/common/directives/scroll-to-top.directive';
import { TRANSACTION_METHODS } from 'src/app/common/common.constants';
import { ICategory } from '../category-list/category-list.interface';
import { CATEGORIES } from 'src/app/transactions/add-transaction/add-transaction.constant';

@Component({
  selector: 'app-create-category',
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
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent {
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
