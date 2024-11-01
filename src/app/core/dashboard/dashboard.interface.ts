export interface IDWMReport {
  type: DWMReportType;
  amount: number;
}

export enum DWMReportType {
  DAY = 'Day',
  WEEK = 'Week',
  MONTH = 'Month',
}
