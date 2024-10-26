import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private config: MatSnackBarConfig = {
    duration: 2000,
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string) {
    this.snackBar.open(message, 'Success', this.config);
  }

  showError(message: string) {
    this.snackBar.open(message, 'Error', this.config);
  }
}
