import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public currencySymbol = 'currency_rupee';
  public userId: string = '';

  constructor() {
    this.userId = localStorage.getItem('uid') || '';
  }
}
