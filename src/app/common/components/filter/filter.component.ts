import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FilterValuesComponent } from './filter-values/filter-values.component';
import { IFilterOption } from './filter.interface';

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
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Input() label: string = 'Select';
  @Input() options: IFilterOption[] = [{ id: 1, label: 'test' }];

  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet() {
    this._bottomSheet.open(FilterValuesComponent, { data: this.options });
  }
}
