import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  static readonly currencySymbol = 'currency_rupee';
  static readonly userId = 'expense_tracker_user_1';
}
