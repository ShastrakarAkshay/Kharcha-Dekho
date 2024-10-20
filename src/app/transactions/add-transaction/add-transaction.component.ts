import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TRANSACTION_METHODS } from '../../common/common.constants';
import { FormsModule } from '@angular/forms';
import { ScrollToTopOnFocusDirective } from '../../common/directives/scroll-to-top.directive';
import { ICategory } from 'src/app/category/category.interface';
import { CATEGORY_DATA } from 'src/app/category/category.constant';

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
  readonly currencyIcon = 'currency_rupee';
  transactionMethods = TRANSACTION_METHODS;
  selectedMethod = TRANSACTION_METHODS[0].id;
  categories: ICategory[] = CATEGORY_DATA;
  selectedCategory = CATEGORY_DATA[0].name;

  ngOnInit(): void {}
}
