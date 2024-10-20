import { Component } from '@angular/core';
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
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  categories: ICategory[] = CATEGORY_DATA;

  constructor(private _bottomSheet: MatBottomSheet) {}

  addTransaction() {
    this._bottomSheet.open(CreateCategoryComponent);
  }
}
