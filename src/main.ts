import { bootstrapApplication } from '@angular/platform-browser';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { provideRouter, Routes } from '@angular/router';
import { ProfileComponent } from './app/profile/profile.component';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryListComponent } from './app/category/category-list/category-list.component';
import { IconListComponent } from './app/category/icon-list/icon-list.component';

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
    path: 'icon-list',
    component: IconListComponent,
  },
  {
    path: 'category',
    component: CategoryListComponent,
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
  ],
}).catch((err) => console.log(err));
