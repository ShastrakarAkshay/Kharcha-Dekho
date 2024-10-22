import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TRANSACTION_METHODS } from '../../common/common.constants';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ScrollToTopOnFocusDirective } from '../../common/directives/scroll-to-top.directive';
import { ICategory } from 'src/app/category/category.interface';
import { CategoryService } from 'src/app/category/service/category.service';
import { ITransactionNew, TransactionMethod } from '../transactions.interface';
import { TransactionService } from '../service/transaction.service';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnInit {
  readonly currencyIcon = 'currency_rupee';
  categories: ICategory[] = [];
  transactionMethods = TRANSACTION_METHODS;
  isEdit: boolean = false;

  form: FormGroup = this._fb.group({
    amount: ['', Validators.required],
    comment: [''],
    categoryId: ['', Validators.required],
    transactionMethod: [TransactionMethod.CASH, Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _categoryService: CategoryService,
    private _transactionService: TransactionService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ITransactionNew,
    private _bottomSheetRef: MatBottomSheetRef<AddTransactionComponent>
  ) {
    this.onEdit(data);
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  onEdit(data: ITransactionNew) {
    if (!data) return;
    this.isEdit = true;
    this.form.setValue({
      amount: data.amount,
      comment: data.comment,
      categoryId: data.categoryId,
      transactionMethod: data.transactionMethod,
    });
  }

  getAllCategories() {
    this._categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.form.patchValue({ categoryId: data.at(0)?.id });
      },
    });
  }

  addTransaction() {
    if (this.form.invalid) return;
    const id = this.isEdit ? this.data.id : new Date().getTime();
    const transaction: ITransactionNew = {
      ...this.form.value,
      id,
    };
    const $api = this.isEdit
      ? this._transactionService.updateTransaction(transaction)
      : this._transactionService.createTransaction(transaction);
    $api.subscribe({
      next: () => {
        this._bottomSheetRef.dismiss();
        const message = this.isEdit
          ? 'Transaction Updated'
          : 'Transaction Created';
        this._snackBar.open(message, 'Success', {
          duration: 2000,
        });
      },
    });
  }
}
