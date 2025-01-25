import { ITransactionFilter } from 'src/app/core/transactions/transactions.interface';

export class GetDashboardTransaction {
  static readonly type = '[Dashboard] transaction';
  constructor(public filters: ITransactionFilter) {}
}

export class RefreshTransaction {
  static readonly type = '[Dashboard] refresh';
}
