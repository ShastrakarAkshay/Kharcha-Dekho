import { Injectable } from '@angular/core';
import { IUser } from 'src/app/core/profile/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  get userId() {
    return localStorage.getItem('uid') || '';
  }

  get currencySymbol() {
    return this.userInfo?.currency || 'currency_rupee';
  }

  get userInfo() {
    return JSON.parse(localStorage.getItem('userInfo') as string);
  }

  set userInfo(data: IUser) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
}
