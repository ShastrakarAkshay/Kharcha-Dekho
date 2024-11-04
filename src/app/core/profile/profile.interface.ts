export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  mobile: number;
  currency: string;
  imageUrl?: string;
}

export interface ILinks {
  id: number;
  label: string;
  path: string;
  icon: string;
}
