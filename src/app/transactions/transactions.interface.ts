import { ICategory } from '../category/category.interface';

export interface ITransaction {
  icon: string;
  iconBg: string;
  categoryName: string;
  transactionMethod: TransactionMethod;
  currencySymbol: string;
  amount: number;
  percent: number;
}

export interface ITransactionNew {
  id: any;
  amount: number;
  comment: string;
  transactionMethod: TransactionMethod;
  categoryId?: any;
}

export interface ICategoryTransaction extends ITransactionNew {
  category: ICategory;
  percent?: number;
}

export enum TransactionMethod {
  CASH = 'Cash',
  UPI = 'UPI',
  CARD = 'Card',
  CHEQUE = 'Cheque',
}
