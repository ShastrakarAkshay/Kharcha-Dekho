import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bottom-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRippleModule],
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent {
  constructor(private _router: Router) {}
  menus = [
    {
      icon: 'home',
      label: 'Home',
      path: 'core/dashboard',
    },
    {
      icon: 'category',
      label: 'Category',
      path: 'core/category',
    },
    {
      icon: 'person',
      label: 'Account',
      path: 'core/profile',
    },
  ];

  navigate(menu: any) {
    this._router.navigate([menu.path]);
  }
}
