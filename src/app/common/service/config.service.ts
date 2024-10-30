import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public currencySymbol = 'currency_rupee';

  get userId() {
    return localStorage.getItem('uid') || '';
  }
}
