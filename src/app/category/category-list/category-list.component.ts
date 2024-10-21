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
import { CATEGORY_DATA } from '../category.constant';
import { SearchPipe } from 'src/app/common/pipes/search.pipe';
import { CategoryService } from '../service/category.service';

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
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  searchText: string = '';
  categories: ICategory[] = [];

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this._categoryService.getAllCategories().subscribe({
      next: (list) => (this.categories = list),
    });
  }

  addTransaction() {
    this._bottomSheet.open(CreateCategoryComponent);
  }

  onSearch(searchText: string) {
    this.searchText = searchText;
  }

  onEdit(category: ICategory) {
    this._bottomSheet.open(CreateCategoryComponent, {
      data: category,
    });
  }
}
