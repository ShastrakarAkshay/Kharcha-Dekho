import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { ITransaction, TransactionMethod } from '../transactions.interface';
import { TransactionService } from '../service/transaction.service';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ToasterService } from 'src/app/common/service/toaster.service';
import { ConfigService } from 'src/app/common/service/config.service';
import { finalize, Subscription } from 'rxjs';
import { SpinnerComponent } from 'src/app/common/components/spinner/spinner.component';

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
    SpinnerComponent,
  ],
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnInit, OnDestroy {
  isEdit: boolean = false;
  isLoading: boolean = false;
  readonly currencyIcon = ConfigService.currencySymbol;
  transactionMethods = TRANSACTION_METHODS;
  categories: ICategory[] = [];
  subscriptions: Subscription[] = [];

  form: FormGroup = this._fb.group({
    amount: ['', Validators.required],
    comment: [''],
    categoryId: ['', Validators.required],
    transactionMethod: [TransactionMethod.CASH, Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _transactionService: TransactionService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ITransaction,
    private _bottomSheetRef: MatBottomSheetRef<AddTransactionComponent>,
    private _toasterService: ToasterService
  ) {
    this.onEdit(data);
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  onEdit(data: ITransaction) {
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
    this.isLoading = true;
    const sub$ = this._categoryService
      .getAllCategories()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (data) => {
          this.categories = data;
          this.form.patchValue({ categoryId: data.at(0)?.id });
        },
      });
    this.subscriptions.push(sub$);
  }

  addTransaction() {
    if (this.form.invalid) return;
    const formData = this.form.value;
    const transaction: ITransaction = {
      amount: formData.amount,
      comment: formData.comment,
      categoryId: formData.categoryId,
      transactionMethod: formData.transactionMethod,
    };
    this.isLoading = true;
    const $api = this.isEdit
      ? this._transactionService.updateTransaction(transaction, this.data.id)
      : this._transactionService.createTransaction(transaction);
    const sub$ = $api.pipe(finalize(() => (this.isLoading = false))).subscribe({
      next: () => {
        this._bottomSheetRef.dismiss();
        const message = this.isEdit
          ? 'Transaction Updated'
          : 'Transaction Created';
        this._toasterService.showSuccess(message);
      },
    });
    this.subscriptions.push(sub$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
