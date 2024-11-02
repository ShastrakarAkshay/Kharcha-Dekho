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
      id: 1,
      icon: 'home',
      label: 'Home',
      path: 'core/dashboard',
      active: false,
    },
    {
      id: 2,
      icon: 'category',
      label: 'Category',
      path: 'core/category',
      active: false,
    },
    {
      id: 3,
      icon: 'person',
      label: 'Account',
      path: 'core/profile',
      active: false,
    },
  ];

  navigate(menu: any) {
    this.menus.forEach((x) => (x.active = x.id === menu.id));
    this._router.navigate([menu.path]);
  }
}
