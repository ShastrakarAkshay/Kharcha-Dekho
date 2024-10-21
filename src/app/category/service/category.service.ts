import { Injectable } from '@angular/core';
import { ICategory } from '../category.interface';
import { CATEGORY_DATA } from '../category.constant';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryList: ICategory[] = CATEGORY_DATA;

  constructor() {}

  getAllCategories(): Observable<ICategory[]> {
    return of(this.categoryList);
  }

  createCategory(data: ICategory): Observable<ICategory> {
    this.categoryList.push(data);
    return of(data);
  }

  updateCategory(data: ICategory): Observable<ICategory> {
    this.categoryList = this.categoryList.map((item) => {
      if (item.id === data.id) {
        item = data;
      }
      return item;
    });
    return of(data);
  }
}
