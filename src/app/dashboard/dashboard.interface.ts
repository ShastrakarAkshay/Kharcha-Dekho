export interface IDWMReport {
  type: DWMReportType;
  amount: number;
  currencyIcon: string;
}

export enum DWMReportType {
  DAY = 'Day',
  WEEK = 'Week',
  MONTH = 'Month',
}
