import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

export interface IMonth {
  id: any;
  name: string;
}
@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatSelectModule,
  ],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  selectedMonth: IMonth = { id: -1, name: 'Month' };
  months: IMonth[] = [
    { id: 0, name: 'January' },
    { id: 1, name: 'February' },
    { id: 2, name: 'March' },
    { id: 3, name: 'April' },
    { id: 4, name: 'May' },
    { id: 5, name: 'June' },
    { id: 6, name: 'July' },
    { id: 7, name: 'August' },
    { id: 8, name: 'September' },
    { id: 9, name: 'October' },
    { id: 10, name: 'November' },
    { id: 11, name: 'December' },
  ];

  @Output() monthChange = new EventEmitter<IMonth>();

  ngOnInit(): void {
    this.emitCurrentMonth();
  }

  emitCurrentMonth() {
    const currentMonth = new Date().getMonth();
    this.selectedMonth = this.months.find(
      (x) => x.id === currentMonth
    ) as IMonth;
    this.monthChange.emit(this.selectedMonth);
  }

  onMonthSelect(month: IMonth) {
    this.selectedMonth = month;
    this.monthChange.emit(month);
  }
}
