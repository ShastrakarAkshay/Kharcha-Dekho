import { Injectable } from '@angular/core';
import { ICategory } from '../category.interface';
import { CATEGORY_DATA } from '../category.constant';
import { EMPTY, Observable, of } from 'rxjs';
import { StorageService } from 'src/app/common/service/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _storageService: StorageService) {
    this._storageService.initialData = CATEGORY_DATA;
    this._storageService.storageKey = 'category';
  }

  getAllCategories(): Observable<ICategory[]> {
    return of(this._storageService.getAll());
  }

  createCategory(data: ICategory): Observable<ICategory> {
    this._storageService.create(data);
    return of(data);
  }

  updateCategory(data: ICategory): Observable<ICategory> {
    this._storageService.update(data.id, data);
    return of(data);
  }

  deleteCategory(id: any): Observable<any> {
    this._storageService.delete(id);
    return of({});
  }
}
