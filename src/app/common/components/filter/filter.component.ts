import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
  input,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FilterValuesComponent } from './filter-values/filter-values.component';
import { Filter, FilterType } from './filter.interface';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

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
    FormsModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterComponent),
      multi: true,
    },
  ],
})
export class FilterComponent implements OnInit, ControlValueAccessor {
  readonly FilterType = FilterType;

  private onChange: (value: Filter) => void = () => {};
  private onTouched: () => void = () => {};
  private oldValue!: Filter;

  label = input<string>('Select');
  @Input() value!: Filter;
  @Input() type: FilterType = FilterType.MultiSelect;

  @Output() valueChange = new EventEmitter();
  @ViewChild('picker') datePicker!: MatDatepicker<Date>;

  constructor(private _bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {}

  writeValue(value: Filter): void {
    if (this.type === FilterType.MultiSelect && !value) {
      this.value = [];
    }
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  openFilterType() {
    const typeMap: any = {
      [FilterType.MultiSelect]: this._openBottomSheet.bind(this, true),
      [FilterType.SingleSelect]: this._openBottomSheet.bind(this, false),
      [FilterType.Date]: this._openDatepicker.bind(this),
    };
    typeMap[this.type]();
  }

  onDateChange() {
    this.onChange(this.value);
    this.valueChange.emit();
  }

  private _openBottomSheet(multi?: boolean) {
    this.oldValue = structuredClone(this.value);
    this._bottomSheet
      .open(FilterValuesComponent, {
        data: {
          label: this.label(),
          options: this.value,
          multi,
        },
        hasBackdrop: true,
        disableClose: true,
      })
      .afterDismissed()
      .subscribe((res) => {
        if (JSON.stringify(res) !== JSON.stringify(this.oldValue)) {
          this.onChange(this.value);
          this.valueChange.emit();
        }
      });
  }

  private _openDatepicker(): void {
    this.datePicker?.open();
  }
}
