import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AmountPipe } from '../../pipes/amount.pipe';
import { ConfigService } from '../../service/config.service';

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
  ],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  currencySymbol = '';

  showActions = input<boolean>(false);
  transactions = input<ITransactionItem[]>([]);

  itemClick = output<string>();
  editClick = output<string>();
  deleteClick = output<string>();

  constructor(private _configService: ConfigService) {
    this.currencySymbol = this._configService.currencySymbol;
  }

  onEdit(txnId: string) {
    this.editClick.emit(txnId);
  }

  onDelete(txnId: string) {
    this.deleteClick.emit(txnId);
  }

  onLabelClick(txnId: string) {
    this.itemClick.emit(txnId);
  }
}
