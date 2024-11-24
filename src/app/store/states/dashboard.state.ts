import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { DashboardTransactionModel } from '../models/dashboard.model';
import {
  GetDashboardTransaction,
  RefreshTransaction,
} from '../actions/dashboard.action';
import { finalize, of, tap } from 'rxjs';
import { TransactionService } from 'src/app/core/transactions/service/transaction.service';
import { SpinnerService } from 'src/app/common/service/spinner.service';

@State<DashboardTransactionModel>({
  name: 'DashboardTransaction',
  defaults: {
    transactions: [],
    isLoaded: false,
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
  static refreshTransaction(state: DashboardTransactionModel) {
    return !(state && state.isLoaded && state.transactions?.length);
  }

  @Action(RefreshTransaction)
  resetTransaction({
    getState,
    setState,
  }: StateContext<DashboardTransactionModel>) {
    const state = getState();
    setState({
      ...state,
      isLoaded: false,
    });
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
          isLoaded: true,
        });
      })
    );
  }
}
