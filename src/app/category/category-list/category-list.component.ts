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
import { DialogService } from 'src/app/common/service/dialog.service';
import { finalize, Subscription } from 'rxjs';
import { SpinnerComponent } from 'src/app/common/components/spinner/spinner.component';

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
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  searchText: string = '';
  categories: ICategory[] = [];
  subscription: Subscription[] = [];

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.isLoading = true;
    const sub$ = this._categoryService
      .getAllCategories()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (list) => {
          this.categories = list;
        },
      });
    this.subscription.push(sub$);
  }

  openCreateCategoryComponent(data?: ICategory) {
    this._bottomSheet
      .open(CreateCategoryComponent, { data })
      .afterDismissed()
      .subscribe({
        next: () => {
          this.getAllCategories();
        },
      });
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
    this._dialogService
      .confirm()
      .afterClosed()
      .subscribe({
        next: (isConfirm) => {
          if (isConfirm) {
            this.isLoading = true;
            const sub$ = this._categoryService
              .deleteCategory(category.id)
              .pipe(finalize(() => (this.isLoading = false)))
              .subscribe({
                next: () => {
                  this._snackBar.open('Category Deleted', 'Success', {
                    duration: 2000,
                  });
                  this.getAllCategories();
                },
              });
            this.subscription.push(sub$);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
