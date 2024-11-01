import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

export interface IConfirmData {
  heading: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private _dialog: MatDialog) {}

  confirm(data?: IConfirmData) {
    return this._dialog.open(ConfirmDialogComponent, { data });
  }
}
