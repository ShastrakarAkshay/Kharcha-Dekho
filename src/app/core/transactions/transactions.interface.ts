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
  modified?: IFilterOption[];
}

export const MODIFIED: IFilterOption[] = [
  { id: 1, label: 'Today', selected: false },
  { id: 2, label: 'Last 7 days', selected: false },
  { id: 3, label: 'Last 30 days', selected: false },
  { id: 4, label: `This year (${new Date().getFullYear()})`, selected: false },
  {
    id: 5,
    label: `Last year (${new Date().getFullYear() - 1})`,
    selected: false,
  },
  { id: 6, label: 'Custom', selected: false },
];

export const MONTHS: IFilterOption[] = [
  { id: 0, label: 'January', selected: false },
  { id: 1, label: 'February', selected: false },
  { id: 2, label: 'March', selected: false },
  { id: 3, label: 'April', selected: false },
  { id: 4, label: 'May', selected: false },
  { id: 5, label: 'June', selected: false },
  { id: 6, label: 'July', selected: false },
  { id: 7, label: 'August', selected: false },
  { id: 8, label: 'September', selected: false },
  { id: 9, label: 'October', selected: false },
  { id: 10, label: 'November', selected: false },
  { id: 11, label: 'December', selected: false },
];
