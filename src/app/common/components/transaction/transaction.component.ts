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
  @Input() transactions: ITransaction[] = [];
  @Input() showActions: boolean = false;

  @Output() editClick = new EventEmitter<ITransaction>();
  @Output() deleteClick = new EventEmitter<ITransaction>();

  constructor() {}

  onEdit(txn: ITransaction) {
    this.editClick.emit(txn);
  }

  onDelete(txn: ITransaction) {
    this.deleteClick.emit(txn);
  }
}
