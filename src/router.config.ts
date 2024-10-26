import { Routes } from '@angular/router';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { CategoryListComponent } from './app/category/category-list/category-list.component';
import { IconListComponent } from './app/category/icon-list/icon-list.component';
import { ProfileComponent } from './app/profile/profile.component';
import { AllTransactionsComponent } from './app/transactions/all-transactions/all-transactions.component';
import { LoginComponent } from './app/login/login.component';
import { AuthService } from './app/common/service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
  {
    path: 'login',
    component: LoginComponent,
  },
];
