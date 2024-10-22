import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ScrollToTopOnFocusDirective } from 'src/app/common/directives/scroll-to-top.directive';
import { IconComponent } from 'src/app/common/components/icon/icon.component';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { IconListComponent } from '../icon-list/icon-list.component';
import { IIcon } from '../icon-list/icon-list.interface';
import { CategoryService } from '../service/category.service';
import { ICategory } from '../category.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ScrollToTopOnFocusDirective,
    IconComponent,
    MatBottomSheetModule,
    IconListComponent,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  showIconList: boolean = false;
  isEdit: boolean = false;
  selectedIcon: IIcon = {
    name: 'upload',
    bgColor: '#ececec',
    label: 'Select Icon',
  };
  iconSelected: boolean = false;

  form = this._fb.group({
    name: ['', Validators.required],
    description: [''],
  });

  ngOnInit(): void {}

  constructor(
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _bottomSheetRef: MatBottomSheetRef<CreateCategoryComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ICategory
  ) {
    this.onEdit(data);
  }

  onEdit(data: ICategory) {
    if (!data) return;
    this.isEdit = true;
    this.form.setValue({
      name: data.name,
      description: data.description || '',
    });
    this.selectedIcon = data.icon ?? this.selectedIcon;
  }

  openIconList() {
    this.showIconList = true;
  }

  onIconSelect(icon: IIcon) {
    this.showIconList = false;
    this.iconSelected = true;
    this.selectedIcon = icon;
  }

  onCreate() {
    if (this.form.invalid) return;
    const id = this.isEdit ? this.data.id : new Date().getTime();
    const category: ICategory = {
      ...this.form.value,
      icon: this.iconSelected ? this.selectedIcon : null,
      id,
    } as ICategory;
    const $api = this.isEdit
      ? this._categoryService.updateCategory(category)
      : this._categoryService.createCategory(category);

    $api.subscribe({
      next: () => {
        this._bottomSheetRef.dismiss();
        const message = this.isEdit ? 'Category Updated' : 'Category Created';
        this._snackBar.open(message, 'Success', {
          duration: 2000,
        });
      },
    });
  }
}
