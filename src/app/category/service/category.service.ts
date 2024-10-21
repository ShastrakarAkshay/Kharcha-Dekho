import { Injectable } from '@angular/core';
import { ICategory } from '../category.interface';
import { CATEGORY_DATA } from '../category.constant';
import { EMPTY, Observable, of } from 'rxjs';

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
      return item.id === data.id ? data : item;
    });
    console.log(this.categoryList);
    return of(data);
  }

  deleteCategory(id: any): Observable<any> {
    this.categoryList = this.categoryList.filter((item) => item.id !== id);
    return of({});
  }
}
