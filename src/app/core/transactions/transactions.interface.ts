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
  pageSize?: number | undefined | null;
  categories?: IFilterOption[];
  months?: IFilterOption[];
  fromDate?: Date | null;
  toDate?: Date | null;
}

export const MONTHS: IFilterOption[] = [
  { id: 0, label: 'January', selected: true },
  { id: 1, label: 'February', selected: true },
  { id: 2, label: 'March', selected: true },
  { id: 3, label: 'April', selected: true },
  { id: 4, label: 'May', selected: true },
  { id: 5, label: 'June', selected: true },
  { id: 6, label: 'July', selected: true },
  { id: 7, label: 'August', selected: true },
  { id: 8, label: 'September', selected: true },
  { id: 9, label: 'October', selected: true },
  { id: 10, label: 'November', selected: true },
  { id: 11, label: 'December', selected: true },
];
