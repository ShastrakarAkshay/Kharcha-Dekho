import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AddTransactionComponent } from 'src/app/transactions/add-transaction/add-transaction.component';
import { AmountPipe } from '../../pipes/amount.pipe';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { HeaderComponent } from '../header/header.component';
import { ConfigService } from '../../service/config.service';
import { ITransaction } from 'src/app/transactions/transactions.interface';

export interface ITransactionItem {
  id: any;
  label: string;
  subText: string;
  iconName?: any;
  iconBgColor?: any;
  amount: number;
  rightSubText?: any;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    AmountPipe,
    MatMenuModule,
    MatButtonModule,
    MatBottomSheetModule,
    AddTransactionComponent,
    DropdownComponent,
    HeaderComponent,
  ],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  readonly currencySymbol = ConfigService.currencySymbol;
  @Input() transactions: ITransactionItem[] = [];
  @Input() showActions: boolean = false;

  @Output() editClick = new EventEmitter<string>();
  @Output() deleteClick = new EventEmitter<string>();

  constructor() {}

  onEdit(txn: string) {
    this.editClick.emit(txn);
  }

  onDelete(txn: string) {
    this.deleteClick.emit(txn);
  }
}
