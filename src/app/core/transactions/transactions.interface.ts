import { IFilterOption } from 'src/app/common/components/filter/filter.interface';
import { ICategory } from '../category/category.interface';
import { IDateRange } from 'src/app/common/date-utils.constant';

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

export interface ITransactionFilter {
  pageSize?: number | undefined | null;
  dateRange?: IDateRange;
  categoryIds?: string[];
}
