import { IIcon } from './icon-list/icon-list.interface';

export interface ICategory {
  id?: string | number;
  name: string;
  icon: IIcon;
  description?: string;
}
