import { IDateRange } from '../../date-utils.constant';

export interface IFilterOption {
  id: any;
  label: string;
  icon?: string;
  selected: boolean;
  value?: IDateRange;
  type?: FilterType;
}

export enum FilterType {
  MultiSelect = 'MultiSelect',
  SingleSelect = 'SingleSelect',
  Date = 'Date',
  DateRange = 'DateRange',
  Text = 'Text',
  Number = 'Number',
  Boolean = 'Boolean',
}

export type Filter = IFilterOption[] | Date;
