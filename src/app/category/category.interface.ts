import { IIcon } from './icon-list/icon-list.interface';

export interface ICategory {
  id?: any;
  name: string;
  icon: IIcon;
  description?: string;
  userId?: string;
  createdDate?: string;
  updatedDate?: string;
}
