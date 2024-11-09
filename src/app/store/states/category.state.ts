import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CategoryModel } from '../models/category.model';
import { Injectable } from '@angular/core';
import { GetCategory } from '../actions/category.action';
import { CategoryService } from 'src/app/core/category/service/category.service';
import { finalize, tap } from 'rxjs';
import { SpinnerService } from 'src/app/common/service/spinner.service';

@State<CategoryModel>({
  name: 'category',
  defaults: {
    categories: [],
    categoryLoaded: false,
  },
})
@Injectable()
export class CategoryState {
  constructor(
    private _categoryService: CategoryService,
    private _spinner: SpinnerService
  ) {}

  @Selector()
  static getCategoryList(state: CategoryModel) {
    return state?.categories;
  }

  @Selector()
  static isCategoryLoaded(state: CategoryModel) {
    return state.categoryLoaded;
  }

  @Action(GetCategory)
  getCategory({ getState, setState }: StateContext<CategoryModel>) {
    this._spinner.show();
    return this._categoryService.getAllCategories().pipe(
      tap((res) => {
        const state = getState();
        setState({
          ...state,
          categories: res,
          categoryLoaded: true,
        });
      }),
      finalize(() => this._spinner.hide())
    );
  }
}
