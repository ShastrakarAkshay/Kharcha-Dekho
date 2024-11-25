export interface IFilterOption {
  id: any;
  label: string;
  selected: boolean;
}

export enum FilterType {
  MultiSelect = 'MultiSelect',
  SingleSelect = 'SingleSelect',
  Date = 'Date',
  Text = 'Text',
  Number = 'Number',
  Boolean = 'Boolean',
}

export type Filter = IFilterOption[] | Date;
