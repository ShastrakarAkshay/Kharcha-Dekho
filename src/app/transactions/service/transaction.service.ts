import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageService } from 'src/app/common/service/storage.service';
import { ITransactionPayload } from '../transactions.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  storageKey = 'transactions';
  constructor(private _storageService: StorageService) {}

  getAllTransactions(): Observable<ITransactionPayload[]> {
    return of(this._storageService.getAll(this.storageKey));
  }

  createTransaction(
    data: ITransactionPayload
  ): Observable<ITransactionPayload> {
    this._storageService.create(this.storageKey, data);
    return of(data);
  }

  updateTransaction(
    data: ITransactionPayload
  ): Observable<ITransactionPayload> {
    this._storageService.update(this.storageKey, data.id, data);
    return of(data);
  }

  deleteTransaction(id: any): Observable<any> {
    this._storageService.delete(this.storageKey, id);
    return of({});
  }
}
