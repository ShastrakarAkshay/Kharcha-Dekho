import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BottomMenuComponent } from './common/components/bottom-menu/bottom-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, BottomMenuComponent],
})
export class AppComponent implements OnInit {
  title = 'kharcha dekho';

  ngOnInit() {}
}
