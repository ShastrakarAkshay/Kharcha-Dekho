export interface IDateRange {
  fromDate: Date;
  toDate: Date;
}

export const getTodayDateRange = (): IDateRange => {
  const fromDate = new Date();
  fromDate.setHours(0, 0, 0, 0);

  const toDate = new Date();
  toDate.setHours(23, 59, 59, 999);

  return { fromDate, toDate };
};

export const getLast7DayDateRange = (): IDateRange => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 6);
  fromDate.setHours(0, 0, 0, 0);

  const toDate = new Date();
  toDate.setHours(23, 59, 59, 999);

  return { fromDate, toDate };
};

export const getLast30DayDateRange = (): IDateRange => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 30);
  fromDate.setHours(0, 0, 0, 0);

  const toDate = new Date();
  toDate.setHours(23, 59, 59, 999);

  return { fromDate, toDate };
};

export const getMonthsDateRange = (month: number): IDateRange => {
  const year = new Date().getFullYear();

  const fromDate = new Date(year, month, 1);
  fromDate.setHours(0, 0, 0, 0);

  const toDate = new Date(year, month + 1, 0);
  toDate.setHours(23, 59, 59, 999);

  return { fromDate, toDate };
};

export const getDateRangeOfYear = (year: number) => {
  const fromDate = new Date(year, 0, 1);
  fromDate.setHours(0, 0, 0, 0);
  const toDate = new Date(year, 11, 31);
  toDate.setHours(23, 59, 59, 999);
  return { fromDate, toDate };
};

export const getDDMMYYYYDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
