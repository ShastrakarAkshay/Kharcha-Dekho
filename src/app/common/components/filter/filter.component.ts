import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FilterValuesComponent } from './filter-values/filter-values.component';
import { FilterType, IFilterOption } from './filter.interface';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  readonly FilterType = FilterType;

  @Input() label: string = 'Select';
  @Input() options: IFilterOption[] = [{ id: 1, label: 'test' }];
  @Input() type: FilterType = FilterType.MultiSelect;

  @ViewChild('picker') datePicker!: MatDatepicker<Date>;

  constructor(private _bottomSheet: MatBottomSheet) {}

  openFilterType() {
    if (this.type === FilterType.MultiSelect) {
      this._openBottomSheet();
    }
    if (this.type === FilterType.Date) {
      this._openDatepicker();
    }
  }

  private _openBottomSheet() {
    this._bottomSheet.open(FilterValuesComponent, {
      data: {
        label: this.label,
        options: this.options,
      },
    });
  }

  private _openDatepicker(): void {
    this.datePicker?.open();
  }
}
