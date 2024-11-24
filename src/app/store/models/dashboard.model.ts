import { ITransaction } from 'src/app/core/transactions/transactions.interface';

export class DashboardTransactionModel {
  transactions!: ITransaction[];
  isLoaded!: boolean;
}
