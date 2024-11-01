import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TRANSACTION_METHODS } from '../../../common/common.constants';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ScrollToTopOnFocusDirective } from '../../../common/directives/scroll-to-top.directive';
import { ICategory } from 'src/app/core/category/category.interface';
import { CategoryService } from 'src/app/core/category/service/category.service';
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
import { SpinnerService } from 'src/app/common/service/spinner.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

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
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnInit, OnDestroy {
  currencyIcon = '';
  isEdit: boolean = false;
  formSubmitted: boolean = false;
  transactionMethods = TRANSACTION_METHODS;
  categories: ICategory[] = [];
  subscriptions: Subscription[] = [];

  form: FormGroup = this._fb.group({
    amount: ['', Validators.required],
    createdAt: [new Date(), Validators.required],
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
    private _toasterService: ToasterService,
    private _spinner: SpinnerService,
    private _configService: ConfigService
  ) {
    this.currencyIcon = this._configService.currencySymbol;
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
      createdAt: new Date(data.createdAt),
    });
  }

  getAllCategories() {
    this._spinner.show();
    const sub$ = this._categoryService
      .getAllCategories()
      .pipe(finalize(() => this._spinner.hide()))
      .subscribe({
        next: (data) => {
          this.categories = data;
          this.form.patchValue({ categoryId: data.at(0)?.id });
        },
      });
    this.subscriptions.push(sub$);
  }

  addTransaction() {
    if (this.form.invalid || this.formSubmitted) return;
    this.formSubmitted = true;
    const formData = this.form.value;
    const transaction: ITransaction = {
      amount: formData.amount,
      comment: formData.comment,
      categoryId: formData.categoryId,
      transactionMethod: formData.transactionMethod,
      createdAt: formData.createdAt,
    };
    this._spinner.show();
    const $api = this.isEdit
      ? this._transactionService.updateTransaction(transaction, this.data.id)
      : this._transactionService.createTransaction(transaction);
    const sub$ = $api.subscribe({
      next: () => {
        this._bottomSheetRef.dismiss(true);
        const message = this.isEdit
          ? 'Transaction Updated'
          : 'Transaction Created';
        this._toasterService.showSuccess(message);
        this._spinner.hide();
      },
    });
    this.subscriptions.push(sub$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
