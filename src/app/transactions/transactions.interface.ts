import { ICategory } from '../category/category.interface';

export interface ITransaction {
  id?: any;
  amount: number;
  comment: string;
  transactionMethod: TransactionMethod;
  userId?: any;
  categoryId?: any;
  category?: ICategory;
  percent?: number;
}

export enum TransactionMethod {
  CASH = 'Cash',
  UPI = 'UPI',
  CARD = 'Card',
  CHEQUE = 'Cheque',
}
