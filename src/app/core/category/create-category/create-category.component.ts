import { Component, DestroyRef, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
import { ToasterService } from 'src/app/common/service/toaster.service';
import { Observable } from 'rxjs';
import { SpinnerComponent } from 'src/app/common/components/spinner/spinner.component';
import { emptySpaceValidator } from 'src/app/common/validators/empty-space.validator';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { CategoryState } from 'src/app/store/states/category.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    IconComponent,
    MatBottomSheetModule,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  isEdit: boolean = false;
  isLoading: boolean = false;
  formSubmitted: boolean = false;
  selectedIcon?: IIcon;
  selectedId?: string;

  private _destroyRef$ = Inject(DestroyRef);
  private _categoryList = signal<ICategory[]>([]);

  @Select(CategoryState.getCategoryList) categoryList$!: Observable<
    ICategory[]
  >;

  form = this._fb.group({
    name: [
      '',
      [
        Validators.required,
        emptySpaceValidator(),
        this._duplicateNameValidator(),
      ],
    ],
    description: ['', emptySpaceValidator()],
  });

  constructor(
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private _bottomSheetRef: MatBottomSheetRef<CreateCategoryComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ICategory,
    private _toasterService: ToasterService,
    private _dialog: MatDialog
  ) {
    this.onEdit(data);
  }

  ngOnInit(): void {
    this.getCategoryListFromStore();
  }

  getCategoryListFromStore() {
    this.categoryList$.pipe(takeUntilDestroyed(this._destroyRef$)).subscribe({
      next: (data) => {
        this._categoryList.set(data);
      },
    });
  }

  onEdit(data: ICategory) {
    if (!data) return;
    this.isEdit = true;
    this.selectedId = data.id;
    this.form.setValue({
      name: data.name,
      description: data.description || '',
    });
    this.selectedIcon = data.icon;
  }

  openIconList() {
    this._dialog
      .open(IconListComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        panelClass: 'dialog-bg',
      })
      .afterClosed()
      .subscribe({
        next: (icon) => {
          this.selectedIcon = icon;
        },
      });
  }

  onCreate() {
    if (this.form.invalid || this.formSubmitted) return;
    this.formSubmitted = true;
    this.isLoading = true;
    const formData = this.form.value;
    const category: ICategory = {
      icon: this.selectedIcon ?? null,
      name: formData.name,
      description: formData.description,
    } as ICategory;
    const $api = this.isEdit
      ? this._categoryService.updateCategory(category, this.data.id)
      : this._categoryService.createCategory(category);
    this.isLoading = true;
    $api.pipe(takeUntilDestroyed(this._destroyRef$)).subscribe({
      next: (res) => {
        const message = this.isEdit ? 'Category Updated' : 'Category Created';
        this._toasterService.showSuccess(message);
        this._bottomSheetRef.dismiss(true);
        this.isLoading = false;
      },
    });
  }

  private _duplicateNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const list = this.isEdit
        ? this._categoryList().filter((x) => x.id !== this.selectedId)
        : this._categoryList();
      const hasName = list.some((x) => {
        return (
          x?.name?.toLowerCase()?.trim() ===
          control?.value?.toLowerCase()?.trim()
        );
      });
      return hasName ? { duplicateName: true } : null;
    };
  }
}
