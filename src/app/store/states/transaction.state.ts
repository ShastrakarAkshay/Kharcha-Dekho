import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TransactionModel } from '../models/transaction.model';
import { Injectable } from '@angular/core';
import { GetTransactions } from '../actions/transaction.action';

@State<TransactionModel>({
  name: 'transaction',
  defaults: {
    transactions: [],
  },
})
@Injectable()
export class TransactionState {
  @Selector()
  static getTransactionList(state: TransactionModel) {
    return state.transactions;
  }

  @Action(GetTransactions)
  getTransaction({ getState, setState }: StateContext<TransactionModel>) {}
}
