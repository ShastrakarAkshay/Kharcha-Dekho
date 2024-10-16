import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { bootstrapApplication } from '@angular/platform-browser';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { provideRouter, Routes } from '@angular/router';
import { ProfileComponent } from './app/profile/profile.component';
import { AppComponent } from './app/app.component';
import { IconsComponent } from './app/icons/icons.component';
import { CategoryListComponent } from './app/category-list/category-list.component';

const routes: Routes = [
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
    component: ProfileComponent,
  },
  {
    path: 'icons',
    component: IconsComponent,
  },
  {
    path: 'category',
    component: CategoryListComponent,
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.log(err));
