import { ICategory } from '../category/category.interface';

export interface ITransactionPayload {
  id: any;
  amount: number;
  comment: string;
  transactionMethod: TransactionMethod;
  categoryId?: any;
}

export interface ICategoryTransaction extends ITransactionPayload {
  category: ICategory;
  percent?: number;
}

export enum TransactionMethod {
  CASH = 'Cash',
  UPI = 'UPI',
  CARD = 'Card',
  CHEQUE = 'Cheque',
}
