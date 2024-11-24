export interface IFilterOption {
  id: any;
  label: string;
}

export enum FilterType {
  MultiSelect = 'MultiSelect',
  SingleSelect = 'SingleSelect',
  Date = 'Date',
  Text = 'Text',
  Number = 'Number',
  Boolean = 'Boolean',
}
