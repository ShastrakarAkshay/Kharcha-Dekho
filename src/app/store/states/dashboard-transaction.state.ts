import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { DashboardTransactionModel } from '../models/dashboard-transaction.model';
import { GetDashboardTransaction } from '../actions/dashboard-transaction.action';
import { finalize, of, tap } from 'rxjs';
import { TransactionService } from 'src/app/core/transactions/service/transaction.service';
import { SpinnerService } from 'src/app/common/service/spinner.service';

@State<DashboardTransactionModel>({
  name: 'DashboardTransaction',
  defaults: {
    transactions: [],
    transactionLoaded: false,
  },
})
@Injectable()
export class DashboardTransactionState {
  constructor(
    private _transactionService: TransactionService,
    private _spinner: SpinnerService
  ) {}

  @Selector()
  static getDashboardTransactions(state: DashboardTransactionModel) {
    return state?.transactions;
  }

  @Selector()
  static isTransactionLoaded(state: DashboardTransactionModel) {
    return state?.transactionLoaded;
  }

  @Action(GetDashboardTransaction)
  getDashboardTransaction(
    { getState, setState }: StateContext<DashboardTransactionModel>,
    { filters }: GetDashboardTransaction
  ) {
    return this._transactionService.getAllTransactions(filters).pipe(
      tap((data) => {
        const state = getState();
        setState({
          ...state,
          transactions: data,
          transactionLoaded: true,
        });
      })
    );
  }
}
