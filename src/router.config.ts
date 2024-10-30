import { Routes } from '@angular/router';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { CategoryListComponent } from './app/category/category-list/category-list.component';
import { IconListComponent } from './app/category/icon-list/icon-list.component';
import { ProfileComponent } from './app/profile/profile/profile.component';
import { AllTransactionsComponent } from './app/transactions/all-transactions/all-transactions.component';
import { LoginComponent } from './app/login/login.component';
import { AuthGuard } from './app/common/guards/auth.guard';
import { EditProfileComponent } from './app/profile/edit-profile/edit-profile.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'icon-list',
    component: IconListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'category',
    component: CategoryListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'all-transactions',
    component: AllTransactionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'all-transactions/:categoryId',
    component: AllTransactionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
];
