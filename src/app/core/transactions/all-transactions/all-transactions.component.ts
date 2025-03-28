import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import {
  ITransactionItem,
  TransactionComponent,
} from 'src/app/common/components/transaction/transaction.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {
  DialogService,
  IConfirmData,
} from 'src/app/common/service/dialog.service';
import { ToasterService } from 'src/app/common/service/toaster.service';
import { TransactionService } from '../service/transaction.service';
import { ITransaction, ITransactionFilter } from '../transactions.interface';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { finalize, Observable, Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/common/service/spinner.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { EmptyStateComponent } from 'src/app/common/components/empty-state/empty-state.component';
import { FilterComponent } from 'src/app/common/components/filter/filter.component';
import { Select, Store } from '@ngxs/store';
import { GetCategory } from 'src/app/store/actions/category.action';
import { CategoryState } from 'src/app/store/states/category.state';
import { ICategory } from '../../category/category.interface';
import {
  FilterType,
  IFilterOption,
} from 'src/app/common/components/filter/filter.interface';
import { FormsModule } from '@angular/forms';
import { MODIFIED } from '../transactions.constant';

@Component({
  selector: 'app-all-transactions',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TransactionComponent,
    MatExpansionModule,
    MatAccordion,
    MatChipsModule,
    EmptyStateComponent,
    FilterComponent,
    FormsModule,
  ],
  providers: [DatePipe, provideNativeDateAdapter()],
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss'],
})
export class AllTransactionsComponent implements OnInit, OnDestroy {
  // received from route path
  @Input('categoryId') categoryId?: string;

  categoryName: string = '';
  collectionDataEnd: boolean = false;
  isLoading: boolean = false;
  transactions: ITransaction[] = [];
  transactionList: any[] = [];
  subscriptions: Subscription[] = [];
  filterType = FilterType;

  filterOptions: any = {
    categories: [],
    modified: [],
  };

  filters: ITransactionFilter = {
    pageSize: 10,
    categoryIds: [],
  };

  @Select(CategoryState.getCategoryList) categories$!: Observable<ICategory[]>;
  @Select(CategoryState.isCategoryLoaded)
  isCategoryLoaded!: Observable<boolean>;

  constructor(
    private _transactionService: TransactionService,
    private _bottomSheet: MatBottomSheet,
    private _toasterService: ToasterService,
    private _dialogService: DialogService,
    private _spinnerService: SpinnerService,
    private _datePipe: DatePipe,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this._transactionService.lastDoc = null;
    this.transactions = [];
    this.filterOptions.modified = structuredClone(MODIFIED);
    if (this.categoryId) {
      this.filters.categoryIds = [this.categoryId];
    }
    this.getAllCategoryFromStore();
    this.getAllTransactions();
  }

  getAllCategoryFromStore() {
    const sub$1 = this.isCategoryLoaded.subscribe((loaded) => {
      if (!loaded) {
        this._store.dispatch(new GetCategory());
      }
    });

    const sub$2 = this.categories$.subscribe({
      next: (categories) => {
        this.filterOptions.categories = categories.map((x) => {
          return {
            id: x.id,
            label: x.name,
            selected: this.categoryId ? x.id === this.categoryId : false,
            icon: x.icon?.name,
            value: x.id,
          } as IFilterOption;
        });
      },
    });

    this.subscriptions.push(sub$1, sub$2);
  }

  getAllTransactions() {
    this._spinnerService.show();
    this.isLoading = true;
    const sub$ = this._transactionService
      .getAllTransactions(this.filters)
      .pipe(finalize(() => this._spinnerService.hide()))
      .subscribe({
        next: (transactions) => {
          this.collectionDataEnd = !transactions.length;
          this.transactions.push(...transactions);
          this.groupByCreatedDate();
          this.isLoading = false;
        },
      });
    this.subscriptions.push(sub$);
  }

  groupByCreatedDate() {
    const group = this.transactions.reduce((acc: any, item) => {
      const date = new Date(item.createdAt);
      date.setHours(0, 0, 0, 0);
      const dateKey = date.toString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    }, {});
    const transactionList = [];
    for (var [key, value] of Object.entries(group)) {
      const txns = value as ITransaction[];
      const txnList = txns.map((item) => {
        return {
          id: item.id,
          label: item.category?.name,
          subText: item.comment || '-',
          amount: item.amount,
          iconName: item.category?.icon?.name,
          iconBgColor: item.category?.icon?.bgColor,
          rightSubText: item.transactionMethod,
        } as ITransactionItem;
      });
      transactionList.push({
        date: this._datePipe.transform(new Date(key), 'dd MMM yyyy'),
        list: txnList,
      });
      this.transactionList = transactionList;
    }
  }

  onEdit(id: string) {
    const txn = this.transactions.find((x) => x.id === id);
    const sub$ = this._bottomSheet
      .open(AddTransactionComponent, { data: txn })
      .afterDismissed()
      .subscribe({
        next: (refresh: boolean) => {
          if (refresh) {
            this.transactions = [];
            this._transactionService.lastDoc = null;
            this.getAllTransactions();
          }
        },
      });
    this.subscriptions.push(sub$);
  }

  onDelete(id: string) {
    const txn = this.transactions.find((x) => x.id === id);
    const data: IConfirmData = {
      heading: 'Delete',
      message: 'Do you want to delete?',
    };
    const sub$ = this._dialogService
      .confirm(data)
      .afterClosed()
      .subscribe({
        next: (isConfirm) => {
          if (isConfirm) {
            this._spinnerService.show();
            const sub$ = this._transactionService
              .deleteTransaction(txn?.id)
              .subscribe({
                next: () => {
                  this._toasterService.showSuccess('Transaction Deleted');
                  this.transactions = [];
                  this._transactionService.lastDoc = null;
                  this.getAllTransactions();
                },
              });
            this.subscriptions.push(sub$);
          }
        },
      });
    this.subscriptions.push(sub$);
  }

  @HostListener('document:scrollend', ['$event'])
  public onViewportScroll(event: Event) {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100 && !this.collectionDataEnd) {
      this.getAllTransactions();
    }
  }

  private _onFilterValueChange() {
    this.transactions = [];
    this.transactionList = [];
    this._transactionService.lastDoc = null;
    this.getAllTransactions();
  }

  onModifiedFilterChange(values: any[]) {
    const dateRange = values.filter((x: any) => x.selected)?.at(0)?.value;
    this.filters.dateRange = dateRange;
    this._onFilterValueChange();
  }

  onCategoryFilterChange(values: any[]) {
    const categoryIds = values
      .filter((x: any) => x.selected)
      ?.map((x: any) => x.id);
    this.filters.categoryIds = categoryIds;
    this._onFilterValueChange();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
