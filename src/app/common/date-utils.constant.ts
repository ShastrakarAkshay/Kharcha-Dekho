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

export const getCurrentYearDateRange = (): IDateRange => {
  const currentYear = new Date().getFullYear();
  const fromDate = new Date(currentYear, 0, 1);
  fromDate.setHours(0, 0, 0, 0);

  const toDate = new Date(currentYear, 11, 31);
  toDate.setHours(23, 59, 59, 999);

  return { fromDate, toDate };
};

export const getLastYearDateRange = (): IDateRange => {
  const currentYear = new Date().getFullYear() - 1;
  const fromDate = new Date(currentYear, 0, 1);
  fromDate.setHours(0, 0, 0, 0);

  const toDate = new Date(currentYear, 11, 31);
  toDate.setHours(23, 59, 59, 999);

  return { fromDate, toDate };
};
