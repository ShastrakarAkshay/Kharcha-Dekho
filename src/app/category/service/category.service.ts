import { Injectable } from '@angular/core';
import { ICategory } from '../category.interface';
import { CATEGORY_DATA } from '../category.constant';
import { delay, EMPTY, Observable, of } from 'rxjs';
import { StorageService } from 'src/app/common/service/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  storageKey = 'category';

  constructor(private _storageService: StorageService) {}

  getAllCategories(): Observable<ICategory[]> {
    return of(this._storageService.getAll(this.storageKey));
  }

  createCategory(data: ICategory): Observable<ICategory> {
    this._storageService.create(this.storageKey, data);
    return of(data);
  }

  updateCategory(data: ICategory): Observable<ICategory> {
    this._storageService.update(this.storageKey, data.id, data);
    return of(data);
  }

  deleteCategory(id: any): Observable<any> {
    this._storageService.delete(this.storageKey, id);
    return of({});
  }
}