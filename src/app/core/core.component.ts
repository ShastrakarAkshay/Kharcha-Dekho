import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideRouter, Route, Router, RouterModule } from '@angular/router';
import { BottomMenuComponent } from '../common/components/bottom-menu/bottom-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-core',
  standalone: true,
  imports: [CommonModule, BottomMenuComponent, RouterModule],
  providers: [],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
})
export class CoreComponent {}
