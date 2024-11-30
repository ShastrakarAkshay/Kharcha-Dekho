import { Route, Routes } from '@angular/router';
import { DashboardComponent } from './app/core/dashboard/dashboard.component';
import { CategoryListComponent } from './app/core/category/category-list/category-list.component';
import { IconListComponent } from './app/core/category/icon-list/icon-list.component';
import { ProfileComponent } from './app/core/profile/profile/profile.component';
import { AllTransactionsComponent } from './app/core/transactions/all-transactions/all-transactions.component';
import { LoginComponent } from './app/login/login.component';
import { AuthGuard } from './app/common/guards/auth.guard';
import { EditProfileComponent } from './app/core/profile/edit-profile/edit-profile.component';
import { CoreComponent } from './app/core/core.component';
import { PageNotFoundComponent } from './app/common/components/page-not-found/page-not-found.component';
import { YearlyReportComponent } from './app/core/reports/yearly-report/yearly-report.component';
import { MonthlyReportComponent } from './app/core/reports/monthly-report/monthly-report.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'core',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./app/core/core.component').then((x) => x.CoreComponent),
    children: [
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
        path: 'icons',
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
        path: 'all-transactions/:categoryId',
        component: AllTransactionsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
      {
        path: 'yearly-report',
        component: YearlyReportComponent,
      },
      {
        path: 'monthly-report',
        component: MonthlyReportComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
