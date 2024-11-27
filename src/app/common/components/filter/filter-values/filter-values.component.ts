import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { FilterComponent } from '../filter.component';
import { FilterType, IFilterOption } from '../filter.interface';
import { FormsModule } from '@angular/forms';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { IDateRange } from 'src/app/common/date-utils.constant';

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
    MatButtonModule,
    MatDateRangePicker,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './filter-values.component.html',
  styleUrl: './filter-values.component.scss',
})
export class FilterValuesComponent implements OnInit {
  label = signal<string>('');
  options: IFilterOption[] = [];
  multi: boolean = true;

  filterType = FilterType;

  dateRange: IDateRange = {
    fromDate: new Date(),
    toDate: new Date(),
  };

  @ViewChild('picker') datePicker!: MatDatepicker<Date>;

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

  showClearBtn() {
    return this.options.some((x) => x.selected);
  }

  onClear() {
    this.options.forEach((x) => (x.selected = false));
  }

  onClose() {
    this._ref.dismiss(this.options);
  }

  onOptionClick(showDateRange: boolean) {
    if (showDateRange) {
      this.datePicker?.open();
    }
  }

  onDateRangeChange() {
    const { fromDate, toDate } = this.dateRange;
    fromDate?.setHours(0, 0, 0, 0);
    toDate?.setHours(23, 59, 59, 999);

    this.options.forEach((x) => {
      x.value =
        x.type === FilterType.DateRange ? { fromDate, toDate } : (null as any);
    });
  }
}
