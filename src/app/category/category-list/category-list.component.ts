import { Component, OnInit } from '@angular/core';
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
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  searchText: string = '';
  categories: ICategory[] = [];

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
    this._categoryService.getAllCategories().subscribe({
      next: (list) => {
        this.categories = list;
      },
    });
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
            this._categoryService.deleteCategory(category.id).subscribe({
              next: () => {
                this._snackBar.open('Category Deleted', 'Success', {
                  duration: 2000,
                });
                this.getAllCategories();
              },
            });
          }
        },
      });
  }
}
