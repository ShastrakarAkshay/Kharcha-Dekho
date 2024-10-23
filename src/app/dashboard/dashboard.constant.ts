import { DWMReportType } from './dashboard.interface';

export const DMA_REPORT_CONFIG = [
  {
    type: DWMReportType.DAY,
    amount: 10,
  },
  {
    type: DWMReportType.MONTH,
    amount: 20,
  },
  {
    type: DWMReportType.WEEK,
    amount: 50,
  },
];
