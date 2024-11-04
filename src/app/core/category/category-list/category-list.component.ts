import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { SearchComponent } from 'src/app/common/components/search/search.component';
import { ICategory } from '../category.interface';
import { SearchPipe } from 'src/app/common/pipes/search.pipe';
import { CategoryService } from '../service/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import {
  DialogService,
  IConfirmData,
} from 'src/app/common/service/dialog.service';
import { finalize, Subscription } from 'rxjs';
import { SpinnerComponent } from 'src/app/common/components/spinner/spinner.component';
import { ToasterService } from 'src/app/common/service/toaster.service';
import { SpinnerService } from 'src/app/common/service/spinner.service';
import { EmptyStateComponent } from 'src/app/common/components/empty-state/empty-state.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatMenuModule,
    CreateCategoryComponent,
    SearchComponent,
    SearchPipe,
    MatSnackBarModule,
    HeaderComponent,
    SpinnerComponent,
    EmptyStateComponent,
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  searchText: string = '';
  categories: ICategory[] = [];
  subscription: Subscription[] = [];
  isLoading: boolean = false;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _categoryService: CategoryService,
    private _dialogService: DialogService,
    private _toaster: ToasterService,
    private _spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this._spinner.show();
    this.isLoading = true;
    const sub$ = this._categoryService
      .getAllCategories()
      .pipe(finalize(() => this._spinner.hide()))
      .subscribe({
        next: (list) => {
          this.categories = list;
          this.isLoading = false;
        },
      });
    this.subscription.push(sub$);
  }

  openCreateCategoryComponent(data?: ICategory) {
    const sub$ = this._bottomSheet
      .open(CreateCategoryComponent, {
        data,
      })
      .afterDismissed()
      .subscribe({
        next: (refresh: boolean) => {
          if (refresh) {
            this.getAllCategories();
          }
        },
      });
    this.subscription.push(sub$);
  }

  onSearch(searchText: string) {
    this.searchText = searchText;
  }

  createCategory() {
    this.openCreateCategoryComponent();
  }

  onEdit(category: ICategory) {
    this.openCreateCategoryComponent(category);
  }

  onDelete(category: ICategory) {
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
            this._spinner.show();
            this._categoryService.deleteCategory(category.id).then(() => {
              this._toaster.showSuccess('Category Deleted');
              this.getAllCategories();
              this._spinner.hide();
            });
          }
        },
      });
    this.subscription.push(sub$);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
