import { IFilterOption } from 'src/app/common/components/filter/filter.interface';
import { ICategory } from '../category/category.interface';
import {
  getCurrentYearDateRange,
  getLast30DayDateRange,
  getLast7DayDateRange,
  getLastYearDateRange,
  getTodayDateRange,
} from 'src/app/common/date-utils.constant';

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
  modified?: IFilterOption[];
}
