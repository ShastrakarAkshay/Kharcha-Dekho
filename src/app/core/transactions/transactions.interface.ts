import { IFilterOption } from 'src/app/common/components/filter/filter.interface';
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
  createdAt?: any;
  updatedAt?: any;
}

export enum TransactionMethod {
  CASH = 'Cash',
  UPI = 'UPI',
  CARD = 'Card',
  CHEQUE = 'Cheque',
}

export interface IFilter {
  month?: number;
  categoryId?: string;
  pageSize?: number;
}

export const MONTHS: IFilterOption[] = [
  { id: 0, label: 'January' },
  { id: 1, label: 'February' },
  { id: 2, label: 'March' },
  { id: 3, label: 'April' },
  { id: 4, label: 'May' },
  { id: 5, label: 'June' },
  { id: 6, label: 'July' },
  { id: 7, label: 'August' },
  { id: 8, label: 'September' },
  { id: 9, label: 'October' },
  { id: 10, label: 'November' },
  { id: 11, label: 'December' },
];
