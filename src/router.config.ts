import { Routes } from '@angular/router';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { CategoryListComponent } from './app/category/category-list/category-list.component';
import { IconListComponent } from './app/category/icon-list/icon-list.component';
import { ProfileComponent } from './app/profile/profile.component';
import { CategoryTransactionsComponent } from './app/transactions/category-transactions/category-transactions.component';
import { AllTransactionsComponent } from './app/transactions/all-transactions/all-transactions.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'profile',
    component: CategoryTransactionsComponent,
  },
  {
    path: 'icon-list',
    component: IconListComponent,
  },
  {
    path: 'category',
    component: CategoryListComponent,
  },
  {
    path: 'all-transactions',
    component: AllTransactionsComponent,
  },
];
