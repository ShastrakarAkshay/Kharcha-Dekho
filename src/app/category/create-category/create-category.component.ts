import { Component } from '@angular/core';
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
export class CreateCategoryComponent {
  showIconList: boolean = false;
  selectedIcon: IIcon = {
    icon: 'upload',
    bgColor: '#ececec',
    label: 'Select Icon',
  };

  form = this._fb.group({
    name: ['', Validators.required],
    description: [''],
    icon: [''],
    iconBgColor: [''],
  });

  constructor(
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _bottomSheetRef: MatBottomSheetRef<CreateCategoryComponent>
  ) {}

  openIconList() {
    this.showIconList = true;
  }

  onIconSelect(icon: IIcon) {
    this.showIconList = false;
    this.selectedIcon = icon;
    this.form.patchValue({
      icon: icon.icon,
      iconBgColor: icon.bgColor,
    });
  }

  onCreate() {
    if (this.form.invalid) return;
    const category: ICategory = this.form.value as ICategory;
    this._categoryService.createCategory(category).subscribe({
      next: () => {
        this._bottomSheetRef.dismiss();
        this._snackBar.open('Category Created', 'Success', {
          duration: 2000,
        });
      },
    });
  }
}
