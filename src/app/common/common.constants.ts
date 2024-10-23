import { TransactionMethod } from '../transactions/transactions.interface';

export const TRANSACTION_METHODS = [
  { id: TransactionMethod.CASH, name: TransactionMethod.CASH },
  { id: TransactionMethod.CARD, name: TransactionMethod.CARD },
  { id: TransactionMethod.CHEQUE, name: TransactionMethod.CHEQUE },
  { id: TransactionMethod.UPI, name: TransactionMethod.UPI },
];

export const COLLECTIONS = {
  Categories: 'CATEGORIES',
  Transactions: 'TRANSACTIONS',
};
