import { CommonModule } from '@angular/common';
import { Component, Inject, Input, signal } from '@angular/core';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { FilterComponent } from '../filter.component';
import { IFilterOption } from '../filter.interface';

@Component({
  selector: 'app-filter-values',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCheckboxModule],
  templateUrl: './filter-values.component.html',
  styleUrl: './filter-values.component.scss',
})
export class FilterValuesComponent {
  readonly task = signal<any>({
    name: 'Parent task',
    completed: false,
    subtasks: [
      { name: 'Child task 1', completed: false },
      { name: 'Child task 2', completed: false },
      { name: 'Child task 3', completed: false },
    ],
  });

  options: IFilterOption[] = [];

  constructor(
    private _ref: MatBottomSheetRef<FilterComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: IFilterOption[]
  ) {
    this.options = data;
  }

  onClose() {
    this._ref.dismiss();
  }
}
