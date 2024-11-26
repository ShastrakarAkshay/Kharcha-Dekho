import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { FilterComponent } from '../filter.component';
import { IFilterOption } from '../filter.interface';
import { FormsModule } from '@angular/forms';
import { MatListOption, MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-filter-values',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectionList,
    MatListOption,
  ],

  templateUrl: './filter-values.component.html',
  styleUrl: './filter-values.component.scss',
})
export class FilterValuesComponent implements OnInit {
  label = signal<string>('');
  options: IFilterOption[] = [];
  multi: boolean = true;

  constructor(
    private _ref: MatBottomSheetRef<FilterComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.label.set(data.label);
    this.options = data.options;
    this.multi = data.multi;
  }

  ngOnInit(): void {
    this._ref.backdropClick().subscribe(() => {
      this.onClose();
    });
  }

  onClose() {
    this._ref.dismiss(this.options);
  }
}
