import { ILinks } from './profile.interface';

export const Links: ILinks[] = [
  { id: 1, label: 'Edit Profile', path: '', icon: 'account_circle' },
  {
    id: 2,
    label: 'All Transactions',
    path: 'core/all-transactions',
    icon: 'swap_horiz',
  },
  { id: 3, label: 'Icons', path: 'core/icons', icon: 'interests' },
];

export const Currencies = [
  { icon: 'currency_rupee', name: 'Rupee' },
  { icon: 'attach_money', name: 'Dollar' },
  { icon: 'currency_pound', name: 'Pound' },
  { icon: 'currency_yen', name: 'Yen' },
  { icon: 'euro', name: 'Euro' },
];
