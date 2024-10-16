export interface ITransaction {
  icon: string;
  iconBg: string;
  categoryName: string;
  transactionMethod: TransactionMethod;
  currencySymbol: string;
  amount: number;
  percent: number;
}

export enum TransactionMethod {
  CASH = 'Cash',
  UPI = 'UPI',
  CARD = 'Card',
  CHEQUE = 'Cheque',
}
